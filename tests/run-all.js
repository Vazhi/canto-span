#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("node:child_process");
const { loadRuntimeApi } = require("./lib/runtime-api");

const root = path.resolve(__dirname, "..");
const api = loadRuntimeApi();
const commands = [
  ["regression", path.join(root, "tests", "run-regression.js")],
  ["np_subsystem", path.join(root, "tests", "run-np-subsystem.js")],
  ["construction_files", path.join(root, "tests", "run-constructions.js")],
  ["glossika_week16_lexicon", path.join(root, "tests", "tooling", "lexicon", "glossika-week16-runtime-lexicon.test.js")],
  ["unit_word_evidence", path.join(root, "tests", "tooling", "runtime", "unit-word-evidence.test.js")],
  ["label_transition_policy", path.join(root, "tests", "tooling", "runtime", "label-transition-policy.test.js")],
  ["ab33_outer_question_composition", path.join(root, "tests", "tooling", "runtime", "ab33-outer-question-composition.test.js")],
  ["aa11_change_into_dim_boundary", path.join(root, "tests", "tooling", "runtime", "aa11-change-into-dim-boundary.test.js")],
  ["aa49_independent_motion_boundary", path.join(root, "tests", "tooling", "runtime", "aa49-independent-motion-boundary.test.js")],
  ["ab45_quantified_classifier_boundary", path.join(root, "tests", "tooling", "runtime", "ab45-quantified-classifier-boundary.test.js")],
  ["ab78_transitive_boundary", path.join(root, "tests", "tooling", "runtime", "ab78-transitive-boundary.test.js")],
  ["aa61_experiential_question_boundary", path.join(root, "tests", "tooling", "runtime", "aa61-experiential-question-boundary.test.js")],
  ["aa84_marked_manner_boundary", path.join(root, "tests", "tooling", "runtime", "aa84-marked-manner-boundary.test.js")],
  ["parser_coverage_auditor", path.join(root, "tests", "tooling", "parser-coverage", "coverage.test.js")],
  ["parser_coverage_enhanced", path.join(root, "tests", "tooling", "parser-coverage", "enhanced.test.js")],
  ["parser_architecture_audit", path.join(root, "tests", "tooling", "parser-coverage", "architecture-audit.test.js")],
  ["parser_work_prioritizer", path.join(root, "tests", "tooling", "parser-coverage", "prioritizer.test.js")],
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
