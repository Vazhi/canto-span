#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("node:child_process");
const { loadRuntimeApi } = require("./lib/runtime-api");

const root = path.resolve(__dirname, "..");
const api = loadRuntimeApi();
const allowInheritedDebt = process.argv.includes("--allow-inherited-debt");
const commands = [
  ["regression", path.join(root, "tests", "run-regression.js")],
  ["np_subsystem", path.join(root, "tests", "run-np-subsystem.js")],
  ["construction_files", path.join(root, "tests", "run-constructions.js")],
  ["lexical_authority_invariants", path.join(root, "tests", "tooling", "lexicon", "lexical-authority-invariants.test.js")],
  ["lexical_runtime_contracts", path.join(root, "tests", "tooling", "lexicon", "lexical-runtime-contracts.test.js")],
  ["lexical_ingestion_tokenization", path.join(root, "tests", "tooling", "lexicon", "lexical-ingestion-tokenization-audit.test.js")],
  ["unit_word_evidence", path.join(root, "tests", "tooling", "runtime", "unit-word-evidence.test.js")],
  ["label_transition_policy", path.join(root, "tests", "tooling", "runtime", "label-transition-policy.test.js")],
  ["ab33_outer_question_composition", path.join(root, "tests", "tooling", "runtime", "ab33-outer-question-composition.test.js")],
  ["aa11_change_into_dim_boundary", path.join(root, "tests", "tooling", "runtime", "aa11-change-into-dim-boundary.test.js")],
  ["aa49_independent_motion_boundary", path.join(root, "tests", "tooling", "runtime", "aa49-independent-motion-boundary.test.js")],
  ["ab45_quantified_classifier_boundary", path.join(root, "tests", "tooling", "runtime", "ab45-quantified-classifier-boundary.test.js")],
  ["ab78_transitive_boundary", path.join(root, "tests", "tooling", "runtime", "ab78-transitive-boundary.test.js")],
  ["ab35_verb_object_compound_boundary", path.join(root, "tests", "tooling", "runtime", "ab35-verb-object-compound-boundary.test.js")],
  ["ab35_zo_gungfo_rehome", path.join(root, "tests", "tooling", "runtime", "ab35-zo-gungfo-rehome.test.js")],
  ["behavior_gwo3_comparative", path.join(root, "tests", "tooling", "runtime", "behavior-gwo3-comparative.test.js")],
  ["aa61_experiential_question_boundary", path.join(root, "tests", "tooling", "runtime", "aa61-experiential-question-boundary.test.js")],
  ["aa84_marked_manner_boundary", path.join(root, "tests", "tooling", "runtime", "aa84-marked-manner-boundary.test.js")],
  ["parser_coverage_auditor", path.join(root, "tests", "tooling", "parser-coverage", "coverage.test.js")],
  ["parser_coverage_enhanced", path.join(root, "tests", "tooling", "parser-coverage", "enhanced.test.js")],
  ["parser_architecture_audit", path.join(root, "tests", "tooling", "parser-coverage", "architecture-audit.test.js")],
  ["parser_work_prioritizer", path.join(root, "tests", "tooling", "parser-coverage", "prioritizer.test.js")],
  ["regression_ratchet_verifier", path.join(root, "tests", "tooling", "runtime", "regression-ratchet-verifier.test.js")],
];
const debtReports = Object.freeze({
  regression: "validation/current/regression-suite.json",
  np_subsystem: "validation/current/np-subsystem-results.json",
  construction_files: "validation/current/construction-tests.json",
});
const generatedPaths = Object.values(debtReports);
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
let inheritedDebtObserved = false;

function readCurrentDebtSummary(name) {
  const relativePath = debtReports[name];
  if (!relativePath) return null;
  const reportPath = path.join(root, relativePath);
  if (!fs.existsSync(reportPath)) return null;
  try {
    const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    if (!Number.isInteger(report.failed) || report.failed <= 0) return null;
    if (report.status !== undefined && report.status !== "FAIL") return null;
    return {
      total: Number.isInteger(report.total) ? report.total : (Number.isInteger(report.executable_reference_count) ? report.executable_reference_count : null),
      passed: Number.isInteger(report.passed) ? report.passed : null,
      failed: report.failed,
    };
  } catch {
    return null;
  }
}

try {
  for (const [name, script] of commands) {
    const debtReportPath = debtReports[name] ? path.join(root, debtReports[name]) : null;
    if (allowInheritedDebt && debtReportPath) fs.rmSync(debtReportPath, { force: true });

    const run = spawnSync(process.execPath, [script], { cwd: root, encoding: "utf8" });
    const debtSummary = allowInheritedDebt && run.status !== 0 ? readCurrentDebtSummary(name) : null;
    const debtAllowed = Boolean(debtSummary);
    const result = {
      name,
      exit_code: run.status,
      signal: run.signal || "",
      status: debtAllowed ? "DEBT" : (run.status === 0 ? "PASS" : "FAIL"),
    };
    if (debtAllowed) {
      inheritedDebtObserved = true;
      result.debt_allowed = true;
      result.debt_summary = debtSummary;
      process.stderr.write(`\n[${name}] inherited debt reported; the workflow must compare its stable identities and test contract against the live baseline\n`);
    } else if (run.status !== 0) {
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
  status: failed ? "FAIL" : (inheritedDebtObserved ? "PASS_WITH_INHERITED_DEBT" : "PASS"),
  inherited_debt_requires_external_ratchet: inheritedDebtObserved,
  commands: results,
  generated_outputs_restored: generatedPaths,
}, null, 2));
if (failed) process.exit(1);