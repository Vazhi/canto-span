#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const registryPath = path.join(root, "data", "parked-constructions.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));
const identities = JSON.parse(
  fs.readFileSync(path.join(root, "data", "construction-identities.json"), "utf8")
);
const notes = loadConstructionNotes(root);
const notesByLegacy = new Map(
  notes.map((note) => [note.frontmatter.construction, note])
);
const identitiesByUuid = new Map(
  identities.records.map((record) => [record.construction_uuid, record])
);

const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  const row = { name, pass, ...(detail ? { detail } : {}) };
  checks.push(row);
  if (!pass) failures.push(row);
}

check(
  "registry schema is current",
  registry.schema === "canto-span-parked-constructions-v1",
  String(registry.schema)
);
check(
  "unlisted constructions are available by default",
  registry.default_state === "available",
  String(registry.default_state)
);
check("parked records are an array", Array.isArray(registry.records));

const records = Array.isArray(registry.records) ? registry.records : [];
const seenUuids = new Set();
const seenCodes = new Set();
const seenLegacyLabels = new Set();

for (const record of records) {
  const label = record.legacy_runtime_label || record.construction_code || "<unknown>";
  for (const field of [
    "construction_uuid",
    "construction_code",
    "canonical_name",
    "legacy_runtime_label",
    "parked_since",
    "reason",
    "review_trigger",
  ]) {
    check(
      `${label} has ${field}`,
      typeof record[field] === "string" && record[field].length > 0,
      String(record[field])
    );
  }
  check(
    `${label} parked date is valid`,
    /^\d{4}-\d{2}-\d{2}$/.test(String(record.parked_since)),
    String(record.parked_since)
  );
  check(`${label} UUID is unique`, !seenUuids.has(record.construction_uuid));
  check(`${label} code is unique`, !seenCodes.has(record.construction_code));
  check(`${label} legacy label is unique`, !seenLegacyLabels.has(record.legacy_runtime_label));
  seenUuids.add(record.construction_uuid);
  seenCodes.add(record.construction_code);
  seenLegacyLabels.add(record.legacy_runtime_label);

  const identity = identitiesByUuid.get(record.construction_uuid);
  check(`${label} resolves to a permanent identity`, Boolean(identity));
  if (identity) {
    check(`${label} code matches identity`, record.construction_code === identity.construction_code);
    check(`${label} canonical name matches identity`, record.canonical_name === identity.canonical_name);
    check(
      `${label} legacy label matches identity`,
      Array.isArray(identity.legacy_labels) && identity.legacy_labels.includes(record.legacy_runtime_label)
    );
    check(`${label} is a current construction note`, notesByLegacy.has(record.legacy_runtime_label));
  }
}

const parkedLabels = new Set(records.map((record) => record.legacy_runtime_label));
const available = notes.filter((note) => !parkedLabels.has(note.frontmatter.construction));
const report = {
  schema: "canto-span-parked-constructions-validation-v1",
  default_state: registry.default_state,
  current_construction_notes: notes.length,
  available_count: available.length,
  parked_count: records.length,
  parked_constructions: records.map((record) => ({
    construction_uuid: record.construction_uuid,
    construction_code: record.construction_code,
    canonical_name: record.canonical_name,
    legacy_runtime_label: record.legacy_runtime_label,
    reason: record.reason,
    review_trigger: record.review_trigger,
  })),
  check_count: checks.length,
  passed: checks.filter((row) => row.pass).length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};

const outDir = path.join(root, "validation", "current");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "parked-constructions.json"),
  JSON.stringify(report, null, 2) + "\n"
);
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
