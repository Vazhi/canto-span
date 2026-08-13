#!/usr/bin/env node
"use strict";

const assert = require("assert/strict");
const test = require("node:test");
const { compareSuiteRatchet } = require("../../../tools/verify-regression-ratchet");

function regressionFixture(cases) {
  return { cases, current_focused_exclusions: [] };
}

function regressionResult(failures) {
  return {
    runtime_version: "test",
    failed: failures.length,
    failures: failures.map(([source, context_source = ""]) => ({ source, context_source })),
  };
}

function npFixture(cases) {
  return { cases };
}

function npResult(ids) {
  return {
    runtime_version: "test",
    failed: ids.length,
    failures: ids.map((id) => ({ id })),
  };
}

function constructionSpecs(cases) {
  return [{
    construction: "DemoConstruction",
    snapshot_cases: cases.snapshot || [],
    focused_cases: cases.focused || [],
    implementation_probe_cases: cases.probes || [],
    np_cases: cases.np || [],
  }];
}

function constructionResult(failures) {
  return {
    runtime_version: "test",
    failed: failures.length,
    failures,
  };
}

const regressionCases = [
  { source: "A。", context_source: "", expected: "alpha" },
  { source: "B。", context_source: "", expected: "beta" },
  { source: "C。", context_source: "context", expected: "gamma" },
];

test("regression subset candidate failures pass and resolved debt is reported", () => {
  const report = compareSuiteRatchet({
    suite: "regression",
    baselineResult: regressionResult([["A。"], ["B。"]]),
    candidateResult: regressionResult([["B。"]]),
    baselineUniverse: regressionFixture(regressionCases),
    candidateUniverse: regressionFixture(regressionCases),
  });

  assert.equal(report.status, "PASS");
  assert.equal(report.comparison.new_failure_count, 0);
  assert.equal(report.comparison.resolved_failure_count, 1);
  assert.deepEqual(report.comparison.resolved_failures, [{ source: "A。", context_source: "" }]);
});

test("equal raw regression failure count still fails when one stable identity is swapped", () => {
  const report = compareSuiteRatchet({
    suite: "regression",
    baselineResult: regressionResult([["A。"]]),
    candidateResult: regressionResult([["B。"]]),
    baselineUniverse: regressionFixture(regressionCases),
    candidateUniverse: regressionFixture(regressionCases),
  });

  assert.equal(report.status, "FAIL");
  assert.equal(report.baseline.failure_count, report.candidate.failure_count);
  assert.equal(report.comparison.new_failure_count, 1);
  assert.equal(report.comparison.resolved_failure_count, 1);
  assert.ok(report.blockers.includes("new_stable_failure_identity"));
});

test("same regression identity with changed executable contract blocks automatic acceptance", () => {
  const changed = regressionCases.map((row) => ({ ...row }));
  changed[0].expected = "changed";
  const report = compareSuiteRatchet({
    suite: "regression",
    baselineResult: regressionResult([["A。"]]),
    candidateResult: regressionResult([]),
    baselineUniverse: regressionFixture(regressionCases),
    candidateUniverse: regressionFixture(changed),
  });

  assert.equal(report.status, "FAIL");
  assert.equal(report.comparison.changed_case_count, 1);
  assert.ok(report.blockers.includes("test_contract_changed_requires_explicit_review"));
});

test("strict regression reduction rejects an unchanged inherited failure set", () => {
  const report = compareSuiteRatchet({
    suite: "regression",
    baselineResult: regressionResult([["A。"]]),
    candidateResult: regressionResult([["A。"]]),
    baselineUniverse: regressionFixture(regressionCases),
    candidateUniverse: regressionFixture(regressionCases),
    requireStrictReduction: true,
  });

  assert.equal(report.status, "FAIL");
  assert.equal(report.comparison.new_failure_count, 0);
  assert.equal(report.comparison.resolved_failure_count, 0);
  assert.ok(report.blockers.includes("strict_debt_reduction_required"));
});

test("NP subsystem uses stable fixture ids and accepts a true subset", () => {
  const matrix = npFixture([
    { id: "NP-A", surface: "A。", expected_internal: "A" },
    { id: "NP-B", surface: "B。", expected_internal: "B" },
  ]);
  const report = compareSuiteRatchet({
    suite: "np_subsystem",
    baselineResult: npResult(["NP-A", "NP-B"]),
    candidateResult: npResult(["NP-B"]),
    baselineUniverse: matrix,
    candidateUniverse: matrix,
  });

  assert.equal(report.status, "PASS");
  assert.deepEqual(report.comparison.resolved_failures, [{ id: "NP-A" }]);
});

test("NP subsystem blocks new failure ids and same-id fixture changes", () => {
  const baseline = npFixture([
    { id: "NP-A", surface: "A。", expected_internal: "A" },
    { id: "NP-B", surface: "B。", expected_internal: "B" },
  ]);
  const candidate = npFixture([
    { id: "NP-A", surface: "A。", expected_internal: "changed" },
    { id: "NP-B", surface: "B。", expected_internal: "B" },
  ]);
  const report = compareSuiteRatchet({
    suite: "np_subsystem",
    baselineResult: npResult(["NP-A"]),
    candidateResult: npResult(["NP-A", "NP-B"]),
    baselineUniverse: baseline,
    candidateUniverse: candidate,
  });

  assert.equal(report.status, "FAIL");
  assert.equal(report.comparison.new_failure_count, 1);
  assert.equal(report.comparison.changed_case_count, 1);
  assert.ok(report.blockers.includes("new_stable_failure_identity"));
  assert.ok(report.blockers.includes("test_contract_changed_requires_explicit_review"));
});

test("construction suite keys executions by construction, case id, and category", () => {
  const specs = constructionSpecs({
    snapshot: [{ case_id: "C-A", source: "A。" }],
    focused: [{ case_id: "C-B", source: "B。", assertion: "construction_present" }],
  });
  const baselineFailures = [
    { construction: "DemoConstruction", case_id: "C-A", category: "exact_snapshot_positive" },
    { construction: "DemoConstruction", case_id: "C-B", category: "focused_positive_or_boundary" },
  ];
  const candidateFailures = [baselineFailures[1]];
  const report = compareSuiteRatchet({
    suite: "construction_files",
    baselineResult: constructionResult(baselineFailures),
    candidateResult: constructionResult(candidateFailures),
    baselineUniverse: specs,
    candidateUniverse: specs,
  });

  assert.equal(report.status, "PASS");
  assert.deepEqual(report.comparison.resolved_failures, [{
    construction: "DemoConstruction",
    case_id: "C-A",
    category: "exact_snapshot_positive",
  }]);
});

test("construction suite blocks test-universe drift and modified same-id assertions", () => {
  const baseline = constructionSpecs({
    focused: [{ case_id: "C-A", source: "A。", assertion: "construction_present" }],
  });
  const candidate = constructionSpecs({
    focused: [
      { case_id: "C-A", source: "A。", assertion: "construction_absent" },
      { case_id: "C-B", source: "B。", assertion: "construction_present" },
    ],
  });
  const report = compareSuiteRatchet({
    suite: "construction_files",
    baselineResult: constructionResult([]),
    candidateResult: constructionResult([]),
    baselineUniverse: baseline,
    candidateUniverse: candidate,
  });

  assert.equal(report.status, "FAIL");
  assert.equal(report.comparison.added_case_count, 1);
  assert.equal(report.comparison.changed_case_count, 1);
  assert.ok(report.blockers.includes("test_contract_changed_requires_explicit_review"));
});
