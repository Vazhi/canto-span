#!/usr/bin/env node
"use strict";

const assert = require("assert");
const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const baselineCommit = "6502742";
const fixture = JSON.parse(fs.readFileSync(path.join(root, "test-data", "regression-snapshots.json"), "utf8"));

function loadApi(source, filename) {
  class Plugin {} class PluginSettingTab {} class Setting {} class Notice {}
  const moduleRecord = { exports: {} };
  const context = {
    module: moduleRecord, exports: moduleRecord.exports,
    require: (id) => id === "obsidian" ? { Plugin, PluginSettingTab, Setting, Notice } : require(id),
    console, setTimeout, clearTimeout, Buffer,
  };
  vm.runInNewContext(source + `
module.exports.__equivalenceApi = {
  analyzeLine, diagnosticSummary, diagnosticFinalRows,
  runtimeVersion: CANTO_SPAN_RUNTIME_VERSION,
};`, context, { filename });
  return moduleRecord.exports.__equivalenceApi;
}

function normalize(value) {
  if (Array.isArray(value)) return value.map(normalize);
  if (!value || typeof value !== "object") return value;
  const out = {};
  for (const [key, child] of Object.entries(value)) {
    if (["grammar_legitimacy", "runtime_registry", "grammar_freeze_active"].includes(key)) continue;
    out[key] = normalize(child);
  }
  return out;
}

const baselineSource = childProcess.execFileSync("git", ["show", `${baselineCommit}:main.js`], { cwd: root, encoding: "utf8", maxBuffer: 20 * 1024 * 1024 });
const currentSource = fs.readFileSync(path.join(root, "main.js"), "utf8");
const forbiddenRuntimeMetadata = [
  "GRAMMAR_LEGITIMACY_BY_CONSTRUCTION",
  "external_corpus_candidate_hit_count",
  "native_naturalness_judgment_count",
  "held_out_performance",
  "productive_acceptance_eligible",
  "grammar_legitimacy:",
];
const metadataLeaks = forbiddenRuntimeMetadata.filter((term) => currentSource.includes(term));
const baseline = loadApi(baselineSource, `${baselineCommit}:main.js`);
const current = loadApi(currentSource, "main.js");
const failures = [];

for (const testCase of fixture.cases) {
  const context = testCase.context_source || null;
  try {
    const beforeAnalysis = normalize(JSON.parse(JSON.stringify(baseline.analyzeLine(testCase.source, context))));
    const afterAnalysis = normalize(JSON.parse(JSON.stringify(current.analyzeLine(testCase.source, context))));
    assert.deepStrictEqual(afterAnalysis, beforeAnalysis);

    const beforeSummary = normalize(JSON.parse(JSON.stringify(baseline.diagnosticSummary(baseline.analyzeLine(testCase.source, context)))));
    const afterSummary = normalize(JSON.parse(JSON.stringify(current.diagnosticSummary(current.analyzeLine(testCase.source, context)))));
    assert.deepStrictEqual(afterSummary, beforeSummary);

    const beforeRows = normalize(JSON.parse(JSON.stringify(baseline.diagnosticFinalRows(baseline.analyzeLine(testCase.source, context)))));
    const afterRows = normalize(JSON.parse(JSON.stringify(current.diagnosticFinalRows(current.analyzeLine(testCase.source, context)))));
    assert.deepStrictEqual(afterRows, beforeRows);
  } catch (error) {
    failures.push({ source: testCase.source, context_source: testCase.context_source || "", error: error.message || String(error) });
  }
}

const result = {
  schema: "canto-span-phase3-runtime-equivalence-v1",
  baseline_commit: baselineCommit,
  baseline_runtime_version: baseline.runtimeVersion,
  current_runtime_version: current.runtimeVersion,
  baseline_main_js_bytes: Buffer.byteLength(baselineSource),
  current_main_js_bytes: Buffer.byteLength(currentSource),
  removed_bytes: Buffer.byteLength(baselineSource) - Buffer.byteLength(currentSource),
  metadata_leaks: metadataLeaks,
  compared_cases: fixture.cases.length,
  authoring_fields_intentionally_removed: ["grammar_legitimacy", "grammar_freeze_active"],
  runtime_field_intentionally_added: "runtime_registry.active",
  passed: fixture.cases.length - failures.length,
  failed: failures.length,
  status: failures.length || metadataLeaks.length ? "FAIL" : "PASS",
  failures,
};
const outDir = path.join(root, "validation", "v0.5.185");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "runtime-equivalence-v0.5.184.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length || metadataLeaks.length) process.exit(1);
