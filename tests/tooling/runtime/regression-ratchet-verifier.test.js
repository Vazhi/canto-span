#!/usr/bin/env node
"use strict";

const assert = require("assert/strict");
const test = require("node:test");
const { compareRatchet } = require("../../../tools/verify-regression-ratchet");

function fixture(cases, exclusions = []) {
  return {
    cases: cases.map(([source, context_source = ""]) => ({ source, context_source })),
    current_focused_exclusions: exclusions,
  };
}

function result(failures) {
  return {
    runtime_version: "test",
    failed: failures.length,
    failures: failures.map(([source, context_source = ""]) => ({ source, context_source })),
  };
}

const stableCases = [
  ["A。", ""],
  ["B。", ""],
  ["C。", "context"],
];

test("subset candidate failures pass and resolved debt is reported", () => {
  const report = compareRatchet({
    baselineResult: result([["A。"], ["B。"]]),
    candidateResult: result([["B。"]]),
    baselineFixture: fixture(stableCases),
    candidateFixture: fixture(stableCases),
  });

  assert.equal(report.status, "PASS");
  assert.equal(report.comparison.new_failure_count, 0);
  assert.equal(report.comparison.resolved_failure_count, 1);
  assert.deepEqual(report.comparison.resolved_failures, [{ source: "A。", context_source: "" }]);
});

test("equal raw failure count still fails when one stable identity is swapped", () => {
  const report = compareRatchet({
    baselineResult: result([["A。"]]),
    candidateResult: result([["B。"]]),
    baselineFixture: fixture(stableCases),
    candidateFixture: fixture(stableCases),
  });

  assert.equal(report.status, "FAIL");
  assert.equal(report.baseline.failure_count, report.candidate.failure_count);
  assert.equal(report.comparison.new_failure_count, 1);
  assert.equal(report.comparison.resolved_failure_count, 1);
  assert.ok(report.blockers.includes("new_stable_regression_failure_identity"));
});

test("test-universe drift blocks automatic ratchet acceptance", () => {
  const report = compareRatchet({
    baselineResult: result([["A。"]]),
    candidateResult: result([]),
    baselineFixture: fixture(stableCases),
    candidateFixture: fixture([["A。"], ["B。"], ["D。"]]),
  });

  assert.equal(report.status, "FAIL");
  assert.equal(report.comparison.removed_case_count, 1);
  assert.equal(report.comparison.added_case_count, 1);
  assert.ok(report.blockers.includes("regression_test_contract_changed_requires_explicit_review"));
});

test("strict reduction rejects an unchanged inherited failure set", () => {
  const report = compareRatchet({
    baselineResult: result([["A。"]]),
    candidateResult: result([["A。"]]),
    baselineFixture: fixture(stableCases),
    candidateFixture: fixture(stableCases),
    requireStrictReduction: true,
  });

  assert.equal(report.status, "FAIL");
  assert.equal(report.comparison.new_failure_count, 0);
  assert.equal(report.comparison.resolved_failure_count, 0);
  assert.ok(report.blockers.includes("strict_regression_debt_reduction_required"));
});

test("strict reduction passes when at least one inherited failure disappears", () => {
  const report = compareRatchet({
    baselineResult: result([["A。"], ["B。"]]),
    candidateResult: result([["B。"]]),
    baselineFixture: fixture(stableCases),
    candidateFixture: fixture(stableCases),
    requireStrictReduction: true,
  });

  assert.equal(report.status, "PASS");
  assert.equal(report.comparison.resolved_failure_count, 1);
});
