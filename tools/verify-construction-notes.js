#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const {
  loadConstructionNotes,
  LINGUISTIC_STATUSES,
} = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const outputIndex = process.argv.indexOf("--output");
const outputPath = outputIndex >= 0
  ? path.resolve(process.cwd(), process.argv[outputIndex + 1] || "")
  : null;
if (outputIndex >= 0 && !process.argv[outputIndex + 1]) {
  console.error("--output requires a file path");
  process.exit(2);
}

function loadRuntimeLabels() {
  class Plugin {}
  class PluginSettingTab {}
  class Setting {}
  class Notice {}
  const moduleObject = { exports: {} };
  const context = {
    module: moduleObject,
    exports: moduleObject.exports,
    require: (id) => id === "obsidian"
      ? { Plugin, PluginSettingTab, Setting, Notice }
      : require(id),
    console,
    setTimeout,
    clearTimeout,
    Buffer,
  };
  const file = path.join(root, "main.js");
  vm.runInNewContext(
    `${fs.readFileSync(file, "utf8")}\nmodule.exports.__notesAudit={runtimeVersion:CANTO_SPAN_RUNTIME_VERSION,labels:[...CONSTRUCTION_LABEL_REGISTRY]};`,
    context,
    { filename: file },
  );
  return moduleObject.exports.__notesAudit;
}

const notes = loadConstructionNotes(root);
const runtime = loadRuntimeLabels();
const failures = [];
const noteLabels = new Set();

function fail(invariant, construction, detail = "") {
  failures.push({ invariant, construction, detail });
}

for (const note of notes) {
  const fm = note.frontmatter;
  const label = fm.construction;
  if (typeof label !== "string" || !label) {
    fail("construction_field", null, note.file);
    continue;
  }
  if (noteLabels.has(label)) fail("unique_note", label, note.file);
  noteLabels.add(label);

  if (path.basename(note.file, ".md") !== label) {
    fail("filename_matches_runtime_label", label, note.file);
  }
  if (!LINGUISTIC_STATUSES.includes(fm.status)) {
    fail("controlled_status", label, String(fm.status));
  }
  if (path.dirname(note.file) !== path.join(root, "grammar", String(fm.status))) {
    fail("status_directory", label, note.file);
  }
  if (fm.runtime_active !== true) {
    fail("runtime_active", label, String(fm.runtime_active));
  }

  const expectedTestFile = `tests/constructions/${label}.json`;
  if (fm.standard_test_file !== expectedTestFile) {
    fail("canonical_test_path", label, String(fm.standard_test_file));
  }
  const testPath = path.join(root, expectedTestFile);
  if (!fs.existsSync(testPath)) {
    fail("test_file_exists", label, expectedTestFile);
    continue;
  }
  try {
    const testSpec = JSON.parse(fs.readFileSync(testPath, "utf8"));
    if (testSpec.schema !== "canto-span-construction-test-file-v1") {
      fail("test_schema", label, String(testSpec.schema));
    }
    if (testSpec.construction !== label) {
      fail("test_construction", label, String(testSpec.construction));
    }
  } catch (error) {
    fail("test_file_json", label, error.message);
  }
}

const runtimeLabels = new Set(runtime.labels);
if (
  runtimeLabels.size !== noteLabels.size
  || ![...runtimeLabels].every((label) => noteLabels.has(label))
) {
  fail(
    "runtime_labels_equal_notes",
    null,
    `runtime=${runtimeLabels.size}, notes=${noteLabels.size}`,
  );
}

const result = {
  schema: "canto-span-construction-notes-validation-v5",
  runtime_version: runtime.runtimeVersion,
  reason: "Every active runtime construction must have one correctly placed current note and one matching executable test file.",
  construction_notes: notes.length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};

if (outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
}
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
