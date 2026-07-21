#!/usr/bin/env node
"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { loadRuntimeApi, internalConstruction, rowSurface } = require("./lib/runtime-api");

const root = path.resolve(__dirname, "..");
const api = loadRuntimeApi(path.join(root, "main.js"));
const fixture = JSON.parse(fs.readFileSync(path.join(root, "tests", "fixtures", "regression-snapshots.json"), "utf8"));
const npMatrix = JSON.parse(fs.readFileSync(path.join(root, "tests", "fixtures", "np-subsystem.json"), "utf8"));
const snapshotById = new Map(fixture.cases.map((item) => [item.case_id, item]));
const npById = new Map(npMatrix.cases.map((item) => [item.id, item]));
const constructionDir = path.join(root, "tests", "constructions");
const files = fs.readdirSync(constructionDir).filter((name) => name.endsWith(".json")).sort();
const cache = new Map();

function rowsFor(source, contextSource = null) {
  const key = `${contextSource || ""}\u0000${source}`;
  if (!cache.has(key)) {
    cache.set(key, api.diagnosticFinalRows(api.analyzeLine(source, contextSource))
      .filter((row) => row.kind === "construction"));
  }
  return cache.get(key);
}
function labelsFor(source, contextSource = null) {
  return rowsFor(source, contextSource).map(internalConstruction).filter(Boolean);
}
function findExact(rows, construction, surface) {
  return rows.find((row) => internalConstruction(row) === construction && rowSurface(row) === surface);
}
function trace(row) { return row && row.trace_detail || {}; }

const results = [];
const failures = [];
const coverage = { positive_and_boundary: 0, positive_only: 0, boundary_only: 0, no_direct_cases: 0 };
let executed = 0;

function record(construction, caseId, source, category, fn) {
  executed += 1;
  try {
    fn();
    results.push({ construction, case_id: caseId, source, category, status: "PASS" });
  } catch (error) {
    const failure = { construction, case_id: caseId, source, category, status: "FAIL", error: error.message || String(error) };
    results.push(failure);
    failures.push(failure);
  }
}

for (const file of files) {
  const spec = JSON.parse(fs.readFileSync(path.join(constructionDir, file), "utf8"));
  assert.strictEqual(spec.schema, "canto-span-construction-test-file-v1");
  assert.strictEqual(file, `${spec.construction}.json`);
  coverage[spec.coverage.state] = (coverage[spec.coverage.state] || 0) + 1;

  for (const ref of spec.snapshot_cases) {
    record(spec.construction, ref.case_id, ref.source, "exact_snapshot_positive", () => {
      const canonical = snapshotById.get(ref.case_id);
      assert(canonical, `Unknown snapshot case ${ref.case_id}`);
      assert.strictEqual(canonical.source, ref.source);
      assert(labelsFor(canonical.source, canonical.context_source || null).includes(spec.construction),
        `${spec.construction} absent from ${ref.case_id}`);
    });
  }

  for (const testCase of spec.focused_cases) {
    record(spec.construction, testCase.case_id, testCase.source, "focused_positive_or_boundary", () => {
      const labels = labelsFor(testCase.source, testCase.context_source || null);
      if (testCase.assertion === "construction_present") {
        assert(labels.includes(spec.construction), `${spec.construction} should be present`);
      } else if (testCase.assertion === "construction_absent") {
        assert(!labels.includes(spec.construction), `${spec.construction} should be absent`);
      } else if (testCase.assertion === "review_only_parse_succeeds") {
        assert(Array.isArray(labels));
      } else {
        throw new Error(`Unknown focused assertion ${testCase.assertion}`);
      }
    });
  }

  for (const ref of spec.np_cases) {
    record(spec.construction, ref.case_id, ref.source, "np_subsystem", () => {
      const canonical = npById.get(ref.case_id);
      assert(canonical, `Unknown NP case ${ref.case_id}`);
      assert.strictEqual(canonical.surface, ref.source);
      const rows = rowsFor(ref.source);
      const labels = rows.map(internalConstruction).filter(Boolean);
      if (spec.construction === "PostverbalZoPerfectiveVP") {
        if (ref.assertion === "construction_present") {
          assert(labels.includes(spec.construction), `${spec.construction} should be present`);
        } else if (ref.assertion === "construction_absent") {
          assert(!labels.includes(spec.construction), `${spec.construction} should be absent`);
        } else {
          throw new Error(`Unknown PFV NP assertion ${ref.assertion}`);
        }
        return;
      }
      assert.strictEqual(ref.assertion, "np_matrix_case");
      const row = findExact(rows, ref.expected_internal, ref.expected_surface);
      assert(row, `Missing ${ref.expected_internal} span ${ref.expected_surface}`);
      if (ref.expected_license) assert.strictEqual(trace(row).np_license_status, ref.expected_license);
      if (ref.expected_classifier_compatibility) {
        assert.strictEqual(trace(row).classifier_head_compatibility_status, ref.expected_classifier_compatibility);
      }
    });
  }
}

const output = {
  schema: "canto-span-standard-construction-test-result-v1",
  runtime_version: api.runtimeVersion,
  construction_file_count: files.length,
  coverage,
  uncovered_construction_count: coverage.no_direct_cases || 0,
  executable_reference_count: executed,
  passed: executed - failures.length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};
const outputPath = path.join(root, "validation", `v${api.runtimeVersion}`, "construction-tests.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify(output, null, 2));
if (failures.length) process.exit(1);
