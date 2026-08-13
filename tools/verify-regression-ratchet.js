#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const SUITES = new Set(["regression", "np_subsystem", "construction_files"]);

function stableKey(parts) {
  return JSON.stringify(parts.map((part) => String(part ?? "")));
}

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), "utf8"));
}

function excludedRegressionCase(testCase, exclusions) {
  return exclusions.some((entry) => {
    if (typeof entry === "string") return testCase.source === entry;
    if (!entry || entry.source !== testCase.source) return false;
    if (entry.context_source === undefined) return true;
    return String(testCase.context_source || "") === String(entry.context_source || "");
  });
}

function addContractRow(rows, key, display, contract, label) {
  if (rows.has(key)) throw new Error(`${label} contains duplicate stable identity ${key}`);
  rows.set(key, { display, fingerprint: canonicalJson(contract) });
}

function regressionContract(fixture) {
  if (!fixture || !Array.isArray(fixture.cases)) throw new Error("regression fixture must contain cases[]");
  const exclusions = Array.isArray(fixture.current_focused_exclusions) ? fixture.current_focused_exclusions : [];
  const rows = new Map();
  for (const testCase of fixture.cases) {
    if (!testCase || typeof testCase.source !== "string") throw new Error("every regression fixture case must have a source string");
    if (excludedRegressionCase(testCase, exclusions)) continue;
    const display = { source: testCase.source, context_source: String(testCase.context_source || "") };
    addContractRow(rows, stableKey([display.source, display.context_source]), display, testCase, "regression fixture");
  }
  return rows;
}

function npContract(matrix) {
  if (!matrix || !Array.isArray(matrix.cases)) throw new Error("NP subsystem fixture must contain cases[]");
  const rows = new Map();
  for (const testCase of matrix.cases) {
    if (!testCase || typeof testCase.id !== "string" || !testCase.id) throw new Error("every NP subsystem case must have an id");
    const display = { id: testCase.id };
    addContractRow(rows, stableKey([testCase.id]), display, testCase, "NP subsystem fixture");
  }
  return rows;
}

const CONSTRUCTION_CASE_GROUPS = Object.freeze([
  ["snapshot_cases", "exact_snapshot_positive"],
  ["focused_cases", "focused_positive_or_boundary"],
  ["implementation_probe_cases", "implementation_reachability_zero_evidence_weight"],
  ["np_cases", "np_subsystem"],
]);

function constructionContractFromSpecs(specs) {
  const rows = new Map();
  for (const spec of specs) {
    if (!spec || typeof spec.construction !== "string" || !spec.construction) throw new Error("construction spec requires construction");
    for (const [field, category] of CONSTRUCTION_CASE_GROUPS) {
      const cases = Array.isArray(spec[field]) ? spec[field] : [];
      for (const testCase of cases) {
        if (!testCase || typeof testCase.case_id !== "string" || !testCase.case_id) {
          throw new Error(`${spec.construction} ${field} case requires case_id`);
        }
        const display = { construction: spec.construction, case_id: testCase.case_id, category };
        addContractRow(
          rows,
          stableKey([spec.construction, testCase.case_id, category]),
          display,
          testCase,
          "construction test specs",
        );
      }
    }
  }
  return rows;
}

function readConstructionSpecs(directoryPath) {
  const absolute = path.resolve(directoryPath);
  const files = fs.readdirSync(absolute).filter((name) => name.endsWith(".json")).sort();
  return files.map((name) => readJson(path.join(absolute, name)));
}

function contractForSuite(suite, universeSource) {
  if (suite === "regression") return regressionContract(universeSource);
  if (suite === "np_subsystem") return npContract(universeSource);
  if (suite === "construction_files") return constructionContractFromSpecs(universeSource);
  throw new Error(`unsupported debt suite ${suite}`);
}

function failureIdentity(suite, row, label) {
  if (!row || typeof row !== "object") throw new Error(`${label} failure row must be an object`);
  if (suite === "regression") {
    if (typeof row.source !== "string") throw new Error(`${label} regression failure requires source`);
    return {
      key: stableKey([row.source, row.context_source || ""]),
      display: { source: row.source, context_source: String(row.context_source || "") },
    };
  }
  if (suite === "np_subsystem") {
    if (typeof row.id !== "string" || !row.id) throw new Error(`${label} NP failure requires id`);
    return { key: stableKey([row.id]), display: { id: row.id } };
  }
  if (suite === "construction_files") {
    for (const key of ["construction", "case_id", "category"]) {
      if (typeof row[key] !== "string" || !row[key]) throw new Error(`${label} construction failure requires ${key}`);
    }
    return {
      key: stableKey([row.construction, row.case_id, row.category]),
      display: { construction: row.construction, case_id: row.case_id, category: row.category },
    };
  }
  throw new Error(`unsupported debt suite ${suite}`);
}

function resultFailureMap(suite, result, label) {
  if (!result || !Array.isArray(result.failures)) throw new Error(`${label} ${suite} result must contain failures[]`);
  const rows = new Map();
  for (const row of result.failures) {
    const { key, display } = failureIdentity(suite, row, label);
    if (rows.has(key)) throw new Error(`${label} ${suite} result contains duplicate failure identity ${key}`);
    rows.set(key, display);
  }
  if (Number.isInteger(result.failed) && result.failed !== rows.size) {
    throw new Error(`${label} ${suite} result failed count does not match failures[] length`);
  }
  return rows;
}

function differenceKeys(left, right) {
  return new Set([...left.keys()].filter((key) => !right.has(key)));
}

function changedContractKeys(baseline, candidate) {
  return new Set([...baseline.keys()].filter((key) => candidate.has(key) && baseline.get(key).fingerprint !== candidate.get(key).fingerprint));
}

function displays(keys, primary, fallback = null) {
  return [...keys].sort().map((key) => (primary.get(key) || (fallback && fallback.get(key)) || { display: { identity: key } }).display || primary.get(key) || fallback.get(key));
}

function compareSuiteRatchet({
  suite,
  baselineResult,
  candidateResult,
  baselineUniverse,
  candidateUniverse,
  requireStrictReduction = false,
}) {
  if (!SUITES.has(suite)) throw new Error(`unsupported debt suite ${suite}`);
  const baselineCases = contractForSuite(suite, baselineUniverse);
  const candidateCases = contractForSuite(suite, candidateUniverse);
  const baselineFailures = resultFailureMap(suite, baselineResult, "baseline");
  const candidateFailures = resultFailureMap(suite, candidateResult, "candidate");

  const baselineOrphans = differenceKeys(baselineFailures, baselineCases);
  const candidateOrphans = differenceKeys(candidateFailures, candidateCases);
  const removedCases = differenceKeys(baselineCases, candidateCases);
  const addedCases = differenceKeys(candidateCases, baselineCases);
  const changedCases = changedContractKeys(baselineCases, candidateCases);
  const newFailures = differenceKeys(candidateFailures, baselineFailures);
  const resolvedFailures = differenceKeys(baselineFailures, candidateFailures);

  const blockers = [];
  if (baselineOrphans.size) blockers.push("baseline_result_contains_failure_outside_baseline_case_universe");
  if (candidateOrphans.size) blockers.push("candidate_result_contains_failure_outside_candidate_case_universe");
  if (removedCases.size || addedCases.size || changedCases.size) blockers.push("test_contract_changed_requires_explicit_review");
  if (newFailures.size) blockers.push("new_stable_failure_identity");
  if (requireStrictReduction && resolvedFailures.size === 0) blockers.push("strict_debt_reduction_required");

  return {
    schema: "canto-span-runtime-debt-ratchet-v1",
    suite,
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
      changed_case_count: changedCases.size,
      new_failures: displays(newFailures, candidateFailures),
      resolved_failures: displays(resolvedFailures, baselineFailures),
      removed_cases: displays(removedCases, baselineCases),
      added_cases: displays(addedCases, candidateCases),
      changed_cases: displays(changedCases, candidateCases, baselineCases),
      baseline_orphan_failures: displays(baselineOrphans, baselineFailures),
      candidate_orphan_failures: displays(candidateOrphans, candidateFailures),
    },
    blockers,
  };
}

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

function loadUniverse(suite, sourcePath) {
  return suite === "construction_files" ? readConstructionSpecs(sourcePath) : readJson(sourcePath);
}

function main() {
  const suite = argValue("--suite");
  const baselineResultPath = argValue("--baseline-result");
  const candidateResultPath = argValue("--candidate-result");
  const baselineUniversePath = argValue("--baseline-universe");
  const candidateUniversePath = argValue("--candidate-universe");
  const outputPath = argValue("--output");
  const missing = [
    ["--suite", suite],
    ["--baseline-result", baselineResultPath],
    ["--candidate-result", candidateResultPath],
    ["--baseline-universe", baselineUniversePath],
    ["--candidate-universe", candidateUniversePath],
  ].filter(([, value]) => !value).map(([name]) => name);
  if (missing.length) {
    console.error(`Missing required arguments: ${missing.join(", ")}`);
    process.exit(2);
  }

  let report;
  try {
    report = compareSuiteRatchet({
      suite,
      baselineResult: readJson(baselineResultPath),
      candidateResult: readJson(candidateResultPath),
      baselineUniverse: loadUniverse(suite, baselineUniversePath),
      candidateUniverse: loadUniverse(suite, candidateUniversePath),
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
  canonicalJson,
  compareSuiteRatchet,
  constructionContractFromSpecs,
  npContract,
  regressionContract,
  stableKey,
};
