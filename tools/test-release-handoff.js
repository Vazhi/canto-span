#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { LINGUISTIC_STATUSES } = require("./construction-notes-lib");
const { validateStatusBaselineSnapshot, validateReleaseAudit } = require("./release-handoff-lib");

const root = path.resolve(__dirname, "..");
const cases = JSON.parse(fs.readFileSync(path.join(root, "test-data", "release-handoff-gate-v3.json"), "utf8"));
const baseAudit = {
  schema: "canto-span-release-handoff-audit-v3",
  release_id: "test",
  base_status_snapshot: {
    path: "data/release-baselines/v0.5.206-construction-statuses.json",
    sha256: "6f994ec02d8330bb51ba796d5d4e474c0839cc7efa087665dcba51f48933d482",
    runtime_version: "0.5.206"
  },
  handoff_sequence: 9,
  status_changes: [],
  changed_construction_audit: [],
  supported_productive_pending_reaudit: [],
  implementation_validation: "PASS implementation",
  linguistic_confidence: "No linguistic status changed",
  code_analysis_overclaim_review: true,
  overclaim_review_scope: "Reviewed code and release claims.",
  external_audit_ready: true
};
const baseRetirement = {
  schema: "canto-span-retirement-review-cadence-v1",
  last_full_review_sequence: 3,
  current_handoff_sequence: 9,
  hard_interval_max: 20
};
const results = [];
for (const item of cases) {
  const audit = {...baseAudit, ...(item.audit_overrides || {})};
  const retirement = {...baseRetirement, ...(item.retirement_overrides || {})};
  const result = validateReleaseAudit({
    audit,
    actualChanges: item.actual_changes,
    supportedPending: item.supported_pending,
    retirement
  });
  let pass;
  if (item.expected_failures) pass = JSON.stringify(result.failures) === JSON.stringify(item.expected_failures);
  else if (item.expected_failure) pass = result.failures.includes(item.expected_failure);
  else pass = result.failures.some((value) => value.startsWith(item.expected_failure_prefix));
  results.push({name: item.name, pass, failures: result.failures});
}

const emptyCounts = Object.fromEntries(LINGUISTIC_STATUSES.map((status) => [status, 0]));
const validSnapshot = {
  schema: "canto-span-construction-status-baseline-v1",
  runtime_version: "0.5.206",
  construction_count: 1,
  status_counts: {...emptyCounts, research_pending: 1},
  statuses: [{construction: "Example", status: "research_pending"}]
};
const snapshotCases = [
  {name: "valid checked-in status baseline passes", snapshot: validSnapshot, expected: []},
  {name: "duplicate baseline construction fails", snapshot: {...validSnapshot, construction_count: 2, status_counts: {...emptyCounts, research_pending: 2}, statuses: [...validSnapshot.statuses, ...validSnapshot.statuses]}, expected: ["status_baseline_duplicate_construction:Example"]},
  {name: "baseline count mismatch fails", snapshot: {...validSnapshot, construction_count: 2}, expected: ["status_baseline_count_mismatch:2!=1"]},
  {name: "unknown baseline status fails", snapshot: {...validSnapshot, status_counts: emptyCounts, statuses: [{construction: "Example", status: "invented"}]}, expected: ["status_baseline_invalid_status:Example:invented"]}
];
for (const item of snapshotCases) {
  const failures = validateStatusBaselineSnapshot(item.snapshot);
  const pass = item.expected.every((failure) => failures.includes(failure))
    && (item.expected.length > 0 || failures.length === 0);
  results.push({name: item.name, pass, failures});
}

const failed = results.filter((item) => !item.pass).length;
const report = {
  schema: "canto-span-release-handoff-gate-tests-v3",
  total: results.length,
  passed: results.length - failed,
  failed,
  status: failed ? "FAIL" : "PASS",
  results
};
const outDir = path.join(root, "validation", "current");
fs.mkdirSync(outDir, {recursive: true});
fs.writeFileSync(path.join(outDir, "release-handoff-gate-tests.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failed) process.exit(1);
