#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { loadRuntimeApi } = require("./lib/runtime-api");

const root = path.resolve(__dirname, "..");
const api = loadRuntimeApi(path.join(root, "main.js"));
const commands = [
  ["regression", path.join(root, "tests", "run-regression.js")],
  ["np_subsystem", path.join(root, "tests", "run-np-subsystem.js")],
  ["construction_files", path.join(root, "tests", "run-constructions.js")],
];
const commandResults = [];
let failed = false;
for (const [name, script] of commands) {
  const run = spawnSync(process.execPath, [script], { cwd: root, encoding: "utf8" });
  commandResults.push({ name, exit_code: run.status, signal: run.signal || "" });
  if (run.status !== 0) {
    failed = true;
    process.stderr.write(`\n[${name}] failed\n`);
    if (run.stdout) process.stderr.write(run.stdout);
    if (run.stderr) process.stderr.write(run.stderr);
  }
}

function readJson(rel) { return JSON.parse(fs.readFileSync(path.join(root, rel), "utf8")); }
const regression = readJson("validation/regression-suite.json");
const np = readJson(`validation/v${api.runtimeVersion}/np-subsystem-results.json`);
const construction = readJson(`validation/v${api.runtimeVersion}/construction-tests.json`);
const output = {
  schema: "canto-span-standard-test-suite-summary-v1",
  runtime_version: api.runtimeVersion,
  status: failed ? "FAIL" : "PASS",
  commands: commandResults,
  regression: { total: regression.total, passed: regression.passed, failed: regression.failed },
  np_subsystem: { total: np.total, passed: np.passed, failed: np.failed },
  construction_files: {
    files: construction.construction_file_count,
    executable_references: construction.executable_reference_count,
    passed: construction.passed,
    failed: construction.failed,
    coverage: construction.coverage,
    uncovered_constructions: construction.uncovered_construction_count,
  },
};
const outputPath = path.join(root, "validation", `v${api.runtimeVersion}`, "standard-test-suite-summary.json");
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify(output, null, 2));
if (failed) process.exit(1);
