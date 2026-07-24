#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const registryPath = path.join(root, "data", "construction-identities.json");
const sweepPath = path.join(root, "data", "construction-label-sweep.json");
const retiredPath = path.join(root, "docs", "research", "RETIRED-CONSTRUCTION-ARCHIVE-v0.5.186-R1.tsv");
const reportPath = path.join(root, "docs", "research", "FULL-REPO-LABEL-SWEEP-BASELINE-R1.md");
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const CODE_RE = /^[A-Z]{2}[0-9]{2}$/;

function parseTsv(file) {
  const text = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd();
  if (!text) return [];
  const lines = text.split(/\r?\n/);
  const headers = lines.shift().split("\t");
  return lines.filter(Boolean).map((line) => {
    const values = line.split("\t");
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
  });
}

const failures = [];
const checks = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail ? { detail } : {}) });
  if (!pass) failures.push({ name, detail });
}

for (const file of [registryPath, sweepPath, retiredPath, reportPath]) {
  check(`required file exists: ${path.relative(root, file)}`, fs.existsSync(file));
}
if (failures.length) {
  console.error(JSON.stringify({ status: "FAIL", failures }, null, 2));
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const sweep = JSON.parse(fs.readFileSync(sweepPath, "utf8"));
const currentNotes = loadConstructionNotes(root);
const retiredRows = parseTsv(retiredPath);

check("registry schema", registry.schema === "canto-span-construction-identity-registry-v1", String(registry.schema));
check("registry count", registry.record_count === registry.records.length, `${registry.record_count} != ${registry.records.length}`);
check("current count", registry.current_record_count === registry.records.filter((r) => r.lifecycle_state === "current").length);
check("retired count", registry.retired_record_count === registry.records.filter((r) => r.lifecycle_state === "retired").length);
check("sweep schema", sweep.schema === "canto-span-full-repo-label-sweep-v1", String(sweep.schema));
check("sweep count", sweep.record_count === sweep.records.length && sweep.records.length === registry.records.length);

const byUuid = new Map();
const byCode = new Map();
const byLegacy = new Map();
for (const record of registry.records) {
  check(`valid UUID: ${record.canonical_name}`, UUID_RE.test(record.construction_uuid), record.construction_uuid);
  check(`unique UUID: ${record.construction_uuid}`, !byUuid.has(record.construction_uuid), record.canonical_name);
  byUuid.set(record.construction_uuid, record);
  if (record.construction_code !== null) {
    check(`valid code: ${record.canonical_name}`, CODE_RE.test(record.construction_code), String(record.construction_code));
    check(`unique code: ${record.construction_code}`, !byCode.has(record.construction_code), record.canonical_name);
    byCode.set(record.construction_code, record);
  } else {
    check(`null code only for candidate: ${record.canonical_name}`, record.lifecycle_state === "candidate", record.lifecycle_state);
  }
  check(`profile description present: ${record.canonical_name}`, typeof record.profile_description === "string" && record.profile_description.trim().length > 0);
  check(`record revision valid: ${record.canonical_name}`, Number.isInteger(record.record_revision) && record.record_revision >= 1);
  check(`label review present: ${record.canonical_name}`, record.label_review && typeof record.label_review === "object");
  for (const label of record.legacy_labels || []) {
    check(`unique legacy label: ${label}`, !byLegacy.has(label), record.canonical_name);
    byLegacy.set(label, record);
  }
}

for (const note of currentNotes) {
  const name = String(note.frontmatter.construction);
  const record = byLegacy.get(name);
  check(`current label has identity: ${name}`, Boolean(record));
  if (!record) continue;
  check(`current lifecycle: ${name}`, record.lifecycle_state === "current", record.lifecycle_state);
  check(`current status aligned: ${name}`, record.linguistic_status === note.frontmatter.status, `${record.linguistic_status} != ${note.frontmatter.status}`);
  check(`current source path aligned: ${name}`, record.source_path === path.relative(root, note.file).replace(/\\/g, "/"), record.source_path);
}

for (const row of retiredRows) {
  const name = row.runtime_label;
  const record = byLegacy.get(name);
  check(`retired label has identity: ${name}`, Boolean(record));
  if (!record) continue;
  check(`retired lifecycle: ${name}`, record.lifecycle_state === "retired", record.lifecycle_state);
}

const discoveredLabels = new Set([
  ...currentNotes.map((note) => String(note.frontmatter.construction)),
  ...retiredRows.map((row) => row.runtime_label),
]);
for (const record of registry.records) {
  const represented = (record.legacy_labels || []).some((label) => discoveredLabels.has(label));
  check(
    `orphan state allowed: ${record.canonical_name}`,
    represented || ["candidate", "superseded"].includes(record.lifecycle_state),
    record.lifecycle_state
  );
}
check("discovered count covered", discoveredLabels.size === currentNotes.length + retiredRows.length, String(discoveredLabels.size));
check("baseline has 181 discovered labels", discoveredLabels.size === 181, String(discoveredLabels.size));

const sweepByUuid = new Map(sweep.records.map((record) => [record.construction_uuid, record]));
check("sweep UUID count", sweepByUuid.size === registry.records.length, String(sweepByUuid.size));
for (const record of registry.records) {
  const row = sweepByUuid.get(record.construction_uuid);
  check(`sweep row exists: ${record.canonical_name}`, Boolean(row));
  if (!row) continue;
  check(`sweep code aligned: ${record.canonical_name}`, row.construction_code === record.construction_code);
  check(`sweep name aligned: ${record.canonical_name}`, row.canonical_name === record.canonical_name);
  check(`sweep review aligned: ${record.canonical_name}`, row.review_state === record.label_review.review_state);
}

const lockRun = spawnSync(process.execPath, [path.join(__dirname, "build-construction-identity-lock.js")], {
  cwd: root,
  encoding: "utf8",
});
check("identity lock passes", lockRun.status === 0, `${lockRun.stdout || ""}${lockRun.stderr || ""}`);

const generatorRun = spawnSync(process.execPath, [path.join(__dirname, "generate-construction-identities.js")], {
  cwd: root,
  encoding: "utf8",
});
check("generated identity files current", generatorRun.status === 0, `${generatorRun.stdout || ""}${generatorRun.stderr || ""}`);

const result = {
  schema: "canto-span-construction-identity-verification-v1",
  registry_records: registry.records.length,
  current_records: currentNotes.length,
  retired_records: retiredRows.length,
  checks: checks.length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
