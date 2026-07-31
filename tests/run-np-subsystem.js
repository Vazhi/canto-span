#!/usr/bin/env node
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const { loadRuntimeApi } = require("./lib/runtime-api");

const root = path.resolve(__dirname, "..");
const api = loadRuntimeApi();
const matrix = JSON.parse(fs.readFileSync(path.join(root, "tests", "fixtures", "np-subsystem.json"), "utf8"));
const results = [];

function constructions(surface) {
  return api.diagnosticFinalRows(api.analyzeLine(surface)).filter((row) => row.kind === "construction");
}
function internal(row) { return row.internal_construction || row.construction || row.type || ""; }
function rowSurface(row) { return row.display_surface || row.surface || ""; }
function trace(row) { return row.trace_detail || {}; }
function findExact(rows, type, surface) {
  return rows.find((row) => internal(row) === type && rowSurface(row) === surface);
}
function licensedRows(rows) {
  return rows.filter((row) => ["licensed_np", "ambiguous_licensed_np"].includes(trace(row).np_license_status));
}

for (const testCase of matrix.cases) {
  const checks = [];
  try {
    const rows = constructions(testCase.surface);
    if (testCase.expected_internal) {
      const row = findExact(rows, testCase.expected_internal, testCase.expected_surface);
      assert(row, `Missing ${testCase.expected_internal} span ${testCase.expected_surface}`);
      checks.push("expected_np_span_present");
      assert.strictEqual(trace(row).np_license_status, testCase.expected_license);
      checks.push("np_license_status_exact");
      if (testCase.expected_classifier_compatibility) {
        assert.strictEqual(trace(row).classifier_head_compatibility_status, testCase.expected_classifier_compatibility);
        checks.push("classifier_head_compatibility_exact");
      }
      for (const [fixtureKey, traceKey, checkName] of [
        ["expected_structural_np_status", "structural_np_status", "structural_np_status_exact"],
        ["expected_lexical_choice_status", "lexical_choice_status", "lexical_choice_status_exact"],
        ["expected_downstream_argument_licensing", "downstream_argument_licensing", "downstream_argument_licensing_exact"],
      ]) {
        if (testCase[fixtureKey]) {
          assert.strictEqual(trace(row)[traceKey], testCase[fixtureKey]);
          checks.push(checkName);
        }
      }
      if (testCase.expected_unit_word_type || testCase.expected_semantic_unit_relation || testCase.expected_unit_word_sense_id) {
        const compatibility = trace(row).classifier_head_compatibility || {};
        if (testCase.expected_unit_word_type) assert.strictEqual(compatibility.unit_word_type, testCase.expected_unit_word_type);
        if (testCase.expected_semantic_unit_relation) assert.strictEqual(compatibility.semantic_unit_relation, testCase.expected_semantic_unit_relation);
        if (testCase.expected_unit_word_sense_id) assert.strictEqual(compatibility.unit_word_sense_id, testCase.expected_unit_word_sense_id);
        checks.push("unit_word_evidence_metadata_exact");
      }
    }
    if (testCase.forbid_licensed_np) {
      assert.strictEqual(licensedRows(rows).length, 0, `Unexpected licensed NP: ${licensedRows(rows).map(rowSurface).join(", ")}`);
      checks.push("no_licensed_np");
    }
    if (testCase.expected_pfv_surface) {
      const pfv = findExact(rows, "PostverbalZoPerfectiveVP", testCase.expected_pfv_surface);
      assert(pfv, `Missing narrow perfective span ${testCase.expected_pfv_surface}`);
      checks.push("narrow_pfv_present");
      assert.strictEqual(trace(pfv).object_np_license_status, testCase.expected_object_license);
      assert.strictEqual(trace(pfv).object_np_construction, testCase.expected_object_internal);
      assert.strictEqual(trace(pfv).evidence_scope_unchanged, true);
      checks.push("pfv_consumes_licensed_np_without_evidence_expansion");
      const objectRow = findExact(rows, testCase.expected_object_internal, testCase.expected_object_surface);
      assert(objectRow, `Missing object NP span ${testCase.expected_object_surface}`);
      assert.strictEqual(trace(objectRow).np_license_status, testCase.expected_object_license);
      checks.push("object_np_span_exact");
    }
    if (testCase.forbid_narrow_pfv) {
      assert.strictEqual(rows.filter((row) => internal(row) === "PostverbalZoPerfectiveVP").length, 0);
      checks.push("narrow_pfv_absent");
    }
    results.push({ id: testCase.id, surface: testCase.surface, group: testCase.group, status: "PASS", checks });
  } catch (error) {
    results.push({ id: testCase.id, surface: testCase.surface, group: testCase.group, status: "FAIL", checks, error: error.message || String(error) });
  }
}
const failures = results.filter((item) => item.status === "FAIL");
const groupCounts = {};
for (const item of results) {
  groupCounts[item.group] = groupCounts[item.group] || { total: 0, passed: 0, failed: 0 };
  groupCounts[item.group].total += 1;
  groupCounts[item.group][item.status === "PASS" ? "passed" : "failed"] += 1;
}
const output = {
  schema: "canto-span-np-subsystem-test-result-v1",
  runtime_version: api.runtimeVersion,
  matrix_runtime_version: matrix.runtime_version,
  scope: matrix.scope,
  total: results.length,
  passed: results.length - failures.length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  group_counts: groupCounts,
  results,
  failures,
};
const outputPath = path.join(root, "validation", "current", "np-subsystem-results.json");
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify(output, null, 2));
if (failures.length) process.exit(1);
