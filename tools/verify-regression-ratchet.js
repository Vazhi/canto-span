#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function identity(source, contextSource = "") {
  return JSON.stringify([String(source || ""), String(contextSource || "")]);
}

function decodeIdentity(key) {
  const [source, context_source] = JSON.parse(key);
  return { source, context_source };
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), "utf8"));
}

function excludedByFixture(testCase, exclusions) {
  return exclusions.some((entry) => {
    if (typeof entry === "string") return testCase.source === entry;
    if (!entry || entry.source !== testCase.source) return false;
    if (entry.context_source === undefined) return true;
    return String(testCase.context_source || "") === String(entry.context_source || "");
  });
}

function fixtureIdentitySet(fixture) {
  if (!fixture || !Array.isArray(fixture.cases)) throw new Error("regression fixture must contain cases[]");
  const exclusions = Array.isArray(fixture.current_focused_exclusions) ? fixture.current_focused_exclusions : [];
  const identities = [];
  for (const testCase of fixture.cases) {
    if (!testCase || typeof testCase.source !== "string") throw new Error("every regression fixture case must have a source string");
    if (excludedByFixture(testCase, exclusions)) continue;
    identities.push(identity(testCase.source, testCase.context_source || ""));
  }
  const unique = new Set(identities);
  if (unique.size !== identities.length) throw new Error("regression fixture contains duplicate stable (source, context_source) identities");
  return unique;
}

function resultFailureSet(result, label) {
  if (!result || !Array.isArray(result.failures)) throw new Error(`${label} regression result must contain failures[]`);
  const failures = result.failures.map((row) => {
    if (!row || typeof row.source !== "string") throw new Error(`${label} failure row must contain a source string`);
    return identity(row.source, row.context_source || "");
  });
  const unique = new Set(failures);
  if (unique.size !== failures.length) throw new Error(`${label} regression result contains duplicate failure identities`);
  if (Number.isInteger(result.failed) && result.failed !== failures.length) {
    throw new Error(`${label} regression result failed count does not match failures[] length`);
  }
  return unique;
}

function sortedDecoded(keys) {
  return [...keys].sort().map(decodeIdentity);
}

function difference(left, right) {
  return new Set([...left].filter((key) => !right.has(key)));
}

function compareRatchet({ baselineResult, candidateResult, baselineFixture, candidateFixture, requireStrictReduction = false }) {
  const baselineCases = fixtureIdentitySet(baselineFixture);
  const candidateCases = fixtureIdentitySet(candidateFixture);
  const baselineFailures = resultFailureSet(baselineResult, "baseline");
  const candidateFailures = resultFailureSet(candidateResult, "candidate");

  const baselineOrphans = difference(baselineFailures, baselineCases);
  const candidateOrphans = difference(candidateFailures, candidateCases);
  const removedCases = difference(baselineCases, candidateCases);
  const addedCases = difference(candidateCases, baselineCases);
  const newFailures = difference(candidateFailures, baselineFailures);
  const resolvedFailures = difference(baselineFailures, candidateFailures);

  const blockers = [];
  if (baselineOrphans.size) blockers.push("baseline_result_contains_failure_outside_baseline_case_universe");
  if (candidateOrphans.size) blockers.push("candidate_result_contains_failure_outside_candidate_case_universe");
  if (removedCases.size || addedCases.size) blockers.push("regression_test_contract_changed_requires_explicit_review");
  if (newFailures.size) blockers.push("new_stable_regression_failure_identity");
  if (requireStrictReduction && resolvedFailures.size === 0) blockers.push("strict_regression_debt_reduction_required");

  return {
    schema: "canto-span-regression-debt-ratchet-v1",
    status: blockers.length ? "FAIL" : "PASS",
    require_strict_reduction: Boolean(requireStrictReduction),
    baseline: {
      case_count: baselineCases.size,
      failure_count: baselineFailures.size,
      runtime_version: baselineResult.runtime_version || "",
    },
    candidate: {
      case_count: candidateCases.size,
      failure_count: candidateFailures.size,
      runtime_version: candidateResult.runtime_version || "",
    },
    comparison: {
      new_failure_count: newFailures.size,
      resolved_failure_count: resolvedFailures.size,
      removed_case_count: removedCases.size,
      added_case_count: addedCases.size,
      new_failures: sortedDecoded(newFailures),
      resolved_failures: sortedDecoded(resolvedFailures),
      removed_cases: sortedDecoded(removedCases),
      added_cases: sortedDecoded(addedCases),
      baseline_orphan_failures: sortedDecoded(baselineOrphans),
      candidate_orphan_failures: sortedDecoded(candidateOrphans),
    },
    blockers,
  };
}

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function main() {
  const baselineResultPath = argValue("--baseline-result");
  const candidateResultPath = argValue("--candidate-result");
  const baselineFixturePath = argValue("--baseline-fixture");
  const candidateFixturePath = argValue("--candidate-fixture");
  const outputPath = argValue("--output");
  const missing = [
    ["--baseline-result", baselineResultPath],
    ["--candidate-result", candidateResultPath],
    ["--baseline-fixture", baselineFixturePath],
    ["--candidate-fixture", candidateFixturePath],
  ].filter(([, value]) => !value).map(([name]) => name);
  if (missing.length) {
    console.error(`Missing required arguments: ${missing.join(", ")}`);
    process.exit(2);
  }

  let report;
  try {
    report = compareRatchet({
      baselineResult: readJson(baselineResultPath),
      candidateResult: readJson(candidateResultPath),
      baselineFixture: readJson(baselineFixturePath),
      candidateFixture: readJson(candidateFixturePath),
      requireStrictReduction: process.argv.includes("--require-strict-reduction"),
    });
  } catch (error) {
    console.error(error && error.stack ? error.stack : String(error));
    process.exit(2);
  }

  const serialized = JSON.stringify(report, null, 2) + "\n";
  if (outputPath) {
    fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
    fs.writeFileSync(path.resolve(outputPath), serialized);
  }
  process.stdout.write(serialized);
  if (report.status !== "PASS") process.exit(1);
}

if (require.main === module) main();

module.exports = {
  compareRatchet,
  fixtureIdentitySet,
  identity,
  resultFailureSet,
};
