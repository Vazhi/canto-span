#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { loadConstructionNotes } = require("./construction-notes-lib");
const { countVerifiedSourceRecords } = require("./promotion-gate-lib");

const root = path.resolve(__dirname, "..");
const notes = loadConstructionNotes(root);
const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail ? { detail } : {}) });
  if (!pass) failures.push({ name, detail });
}

function loadRuntime() {
  class Plugin {}
  class PluginSettingTab {}
  class Setting {}
  class Notice {}
  const moduleObject = { exports: {} };
  const context = {
    module: moduleObject,
    exports: moduleObject.exports,
    require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id),
    console, setTimeout, clearTimeout, Buffer,
  };
  const file = path.join(root, "main.js");
  vm.runInNewContext(
    fs.readFileSync(file, "utf8") + "\nmodule.exports.__notesAudit={runtimeVersion:CANTO_SPAN_RUNTIME_VERSION,labels:[...CONSTRUCTION_LABEL_REGISTRY]};",
    context,
    { filename: file }
  );
  return moduleObject.exports.__notesAudit;
}

const runtime = loadRuntime();
const byLabel = new Map();
for (const note of notes) {
  const fm = note.frontmatter;
  const label = fm.construction;
  if (byLabel.has(label)) failures.push({ name: "unique construction", detail: label });
  byLabel.set(label, note);
  const filename = path.basename(note.file, ".md");
  check(`filename matches construction: ${filename}`, filename === label, `${filename} != ${label}`);
  for (const field of ["title", "type", "construction", "status", "confidence", "claim_layer", "lane", "last_reviewed", "speaker_count", "source_count", "verified_source_count", "independent_speaker_count", "negative_cases_drafted", "negative_tests_executable", "negative_tests_passing", "corpus_evidence_used", "corpus_hits_reviewed", "code_document_reconciled", "implementation_validation_separate", "independent_evidence_beyond_internal_tests", "promotion_gate_version", "source_ids", "runtime_active"]) {
    check(`${label} has ${field}`, Object.prototype.hasOwnProperty.call(fm, field));
  }
  check(`${label} type is construction`, fm.type === "canto-span-construction", String(fm.type));
  check(`${label} source count matches IDs`, Number(fm.source_count) === (Array.isArray(fm.source_ids) ? fm.source_ids.length : -1));
  const verificationCount = countVerifiedSourceRecords(note);
  check(`${label} verified source count matches source records`, Number(fm.verified_source_count) === verificationCount, `${fm.verified_source_count} != ${verificationCount}`);
  check(`${label} independent speaker count matches speaker count`, Number(fm.independent_speaker_count) === Number(fm.speaker_count), `${fm.independent_speaker_count} != ${fm.speaker_count}`);
  check(`${label} promotion gate version`, fm.promotion_gate_version === "v1", String(fm.promotion_gate_version));
  check(`${label} passing boundaries require executable boundaries`, fm.negative_tests_passing !== true || fm.negative_tests_executable === true);
  check(`${label} executable boundaries require drafted boundaries`, fm.negative_tests_executable !== true || fm.negative_cases_drafted === true);
  check(`${label} has plain-language claim`, /## Plain-language claim\n\n\S/.test(note.body));
  check(`${label} has boundary section`, /## Negative and boundary cases/.test(note.body));
  check(`${label} has no aliased wiki links`, !/\[\[[^\]]+\|[^\]]+\]\]/.test(note.text));
}

const runtimeLabels = new Set(runtime.labels);
const noteLabels = new Set(byLabel.keys());
check("exactly 171 construction notes", notes.length === 171, String(notes.length));
check("runtime has 171 active labels", runtimeLabels.size === 171, String(runtimeLabels.size));
check("notes exactly match runtime labels", noteLabels.size === runtimeLabels.size && [...runtimeLabels].every((label) => noteLabels.has(label)));
check("all notes are runtime active", notes.every((note) => note.frontmatter.runtime_active === true));

for (const note of notes) {
  for (const target of [...note.text.matchAll(/\[\[([^\]|]+)\]\]/g)].map((m) => m[1])) {
    check(`${note.frontmatter.construction} link target exists: ${target}`, noteLabels.has(target), target);
  }
}

const snapshotFile = path.join(root, "archive", "registry-pre-obsidian-v0.5.184", "full-construction-registry.json");
check("frozen full-schema snapshot exists", fs.existsSync(snapshotFile));
if (fs.existsSync(snapshotFile)) {
  const snapshot = JSON.parse(fs.readFileSync(snapshotFile, "utf8"));
  check("snapshot has 171 records", snapshot.records?.length === 171, String(snapshot.records?.length));
}

const counts = {};
for (const note of notes) counts[note.frontmatter.status] = (counts[note.frontmatter.status] || 0) + 1;
const expectedCounts = {
  research_pending: 58,
  unsupported_generalization: 87,
  parser_heuristic: 21,
  lexicalized_only: 3,
  provisional_reaudit: 2,
};
check("status counts remain unchanged after runtime-metadata removal", JSON.stringify(counts) === JSON.stringify(expectedCounts), JSON.stringify(counts));

const result = {
  schema: "canto-span-construction-notes-validation-v1",
  runtime_version: runtime.runtimeVersion,
  construction_notes: notes.length,
  status_counts: counts,
  total: checks.length,
  passed: checks.filter((c) => c.pass).length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};
const outDir = path.join(root, "validation", `v${runtime.runtimeVersion}`);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "construction-notes.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
