#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function replaceExact(relativePath, from, to) {
  const filePath = path.join(root, relativePath);
  const original = fs.readFileSync(filePath, "utf8");
  if (!original.includes(from)) throw new Error(`${relativePath}: replacement marker missing`);
  fs.writeFileSync(filePath, original.replace(from, to));
}

replaceExact(
  "src/runtime-resources/diagnostics/trace-metadata.js",
  `      node.trace = normalizeTraceTaxonomy(node.trace || {}, { constructionType: node.type || node.compatibility_alias || "" });`,
  `      node.trace = normalizeTraceTaxonomy(node.trace || {}, { constructionType: node.compatibility_alias || node.type || "" });`,
);

replaceExact(
  "tests/tooling/parser-coverage/coverage.test.js",
  `  assert(copular.sanity_findings.some((finding) => finding.code === "template_family_missing"));`,
  `  assert.equal(copular.construction_traces[0].template_family, "generative_template");\n  assert(!copular.sanity_findings.some((finding) => finding.code === "template_family_missing"));`,
);

// Refresh only the compact regression field that intentionally changed in this
// migration. Any non-family behavior difference remains untouched and will
// still fail the normal regression suite after this helper runs.
const { loadRuntimeApi } = require("../tests/lib/runtime-api");
const api = loadRuntimeApi({ apiNames: ["analyzeLine", "diagnosticFinalRows"] });
const fixturePath = path.join(root, "tests", "fixtures", "regression-snapshots.json");
const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
let changedRows = 0;
const changedCases = new Set();
const shapeMismatches = [];

for (const testCase of fixture.cases || []) {
  const expectedTree = testCase.expected && Array.isArray(testCase.expected.tree) ? testCase.expected.tree : [];
  const actualRows = api.diagnosticFinalRows(api.analyzeLine(testCase.source, testCase.context_source || null))
    .filter((row) => row && row.kind !== "text");
  if (actualRows.length !== expectedTree.length) {
    shapeMismatches.push({ source: testCase.source, expected_rows: expectedTree.length, actual_rows: actualRows.length });
    continue;
  }
  for (let index = 0; index < expectedTree.length; index += 1) {
    const expectedRow = expectedTree[index];
    const actualRow = actualRows[index];
    const expectedDetail = expectedRow && expectedRow.trace_detail;
    const actualDetail = actualRow && actualRow.trace_detail;
    if (!expectedDetail || !actualDetail) continue;
    const expectedFamily = expectedDetail.template_family || "";
    const actualFamily = actualDetail.template_family || "";
    if (expectedFamily === actualFamily) continue;
    if (actualFamily) expectedDetail.template_family = actualFamily;
    else delete expectedDetail.template_family;
    changedRows += 1;
    changedCases.add(testCase.source);
  }
}

if (shapeMismatches.length) {
  throw new Error(`Refusing metadata refresh because ${shapeMismatches.length} regression cases changed tree row counts: ${JSON.stringify(shapeMismatches.slice(0, 10))}`);
}
fs.writeFileSync(fixturePath, JSON.stringify(fixture, null, 2) + "\n");

console.log(JSON.stringify({
  schema: "canto-span-temp-trace-taxonomy-followup-v1",
  metadata_only_regression_refresh: true,
  changed_trace_family_rows: changedRows,
  changed_case_count: changedCases.size,
  changed_cases: [...changedCases].sort(),
}, null, 2));
