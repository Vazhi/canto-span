#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { loadRuntimeApi } = require("./lib/runtime-api");

const root = path.resolve(__dirname, "..");
const api = loadRuntimeApi(path.join(root, "main.js"));
const commands = [
  ["regression", path.join(root, "tests", "run-regression.js")],
  ["np_subsystem", path.join(root, "tests", "run-np-subsystem.js")],
  ["construction_files", path.join(root, "tests", "run-constructions.js")],
  ["glossika_week16_lexicon", path.join(root, "tests", "tooling", "lexicon", "glossika-week16-runtime-lexicon.test.js")],
];
const generatedPaths = [
  "validation/current/regression-suite.json",
  "validation/current/np-subsystem-results.json",
  "validation/current/construction-tests.json",
];
const originalGeneratedFiles = new Map(
  generatedPaths.map((relativePath) => {
    const absolutePath = path.join(root, relativePath);
    return [
      absolutePath,
      fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath) : null,
    ];
  }),
);
const results = [];
let failed = false;

try {
  for (const [name, script] of commands) {
    const run = spawnSync(process.execPath, [script], { cwd: root, encoding: "utf8" });
    const result = {
      name,
      exit_code: run.status,
      signal: run.signal || "",
      status: run.status === 0 ? "PASS" : "FAIL",
    };
    if (run.status !== 0) {
      failed = true;
      result.stdout = run.stdout || "";
      result.stderr = run.stderr || "";
      process.stderr.write(`\n[${name}] failed\n${result.stdout}${result.stderr}`);
    }
    results.push(result);
  }
} finally {
  for (const [absolutePath, original] of originalGeneratedFiles) {
    if (original === null) {
      fs.rmSync(absolutePath, { force: true });
    } else {
      fs.mkdirSync(path.dirname(absolutePath), { recursive: true });
      fs.writeFileSync(absolutePath, original);
    }
  }
}

console.log(JSON.stringify({
  schema: "canto-span-standard-test-suite-summary-v2",
  runtime_version: api.runtimeVersion,
  status: failed ? "FAIL" : "PASS",
  commands: results,
  generated_outputs_restored: generatedPaths,
}, null, 2));
if (failed) process.exit(1);
