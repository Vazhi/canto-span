#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { loadRuntimeApi } = require("../../lib/runtime-api");
const { enhanceCoverageRecord, aggregateCoverage } = require("../../../tools/parser-coverage-enhanced");

const root = path.resolve(__dirname, "../../..");
const api = loadRuntimeApi({ apiNames: ["analyzeLine", "diagnosticSummary", "diagnosticFinalRows"] });

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

const corpus = new Map();
function add(source, contextSource, origin) {
  if (!source || typeof source !== "string") return;
  const context = contextSource || "";
  const key = `${context}\u0000${source}`;
  if (!corpus.has(key)) corpus.set(key, { source, context_source: context, origins: new Set() });
  corpus.get(key).origins.add(origin);
}

const regression = readJson("tests/fixtures/regression-snapshots.json");
for (const row of regression.cases || []) add(row.source, row.context_source, "regression");
const np = readJson("tests/fixtures/np-subsystem.json");
for (const row of np.cases || []) add(row.surface, "", "np");
const constructionDir = path.join(root, "tests", "constructions");
for (const file of fs.readdirSync(constructionDir).filter((name) => name.endsWith(".json")).sort()) {
  const spec = JSON.parse(fs.readFileSync(path.join(constructionDir, file), "utf8"));
  for (const group of ["snapshot_cases", "focused_cases", "implementation_probe_cases", "np_cases"]) {
    for (const row of spec[group] || []) add(row.source, row.context_source, `construction:${spec.construction}:${group}`);
  }
}

const expectedCounts = {
  "OpinionStanceFrame.stance_gokdak": 14,
  "OpinionStanceFrame.stance_jiwai": 1,
  "OpinionStanceFrame.stance_soengseon": 1,
  "SubjectPredicateClause.predicate_allowlist_nonnegative": 91,
  "SubjectPredicateClause.predicate_unconstrained": 16,
  "SubjectPredicateClause.predicate_allowlist_negative": 11,
  "DemonstrativeClassifierNP.slot_exclusion_guarded": 37,
  "DemonstrativeClassifierNP.slot_exclusion_unconstrained": 6,
  "HeadNP.child_slot_exclusion_guarded": 40,
  "HeadNP.child_slot_exclusion_unconstrained": 2,
  "TransitiveVP.object_shape_guarded": 57,
  "TransitiveVP.object_shape_unconstrained": 7,
};
const expectedIds = new Set(Object.keys(expectedCounts));

const records = [];
const parseFailures = [];
const taxonomyIssues = {};
let constructionRows = 0;
let requiredTraceCount = 0;
let coordinatedNpVariantRequiredCount = 0;
const requiredWithoutId = [];
const unexpectedVariantIds = [];

function bump(target, key) {
  target[key] = (target[key] || 0) + 1;
}

for (const item of corpus.values()) {
  try {
    const analysis = api.analyzeLine(item.source, item.context_source || null);
    const rows = api.diagnosticFinalRows(analysis);
    const record = enhanceCoverageRecord(api.diagnosticSummary(analysis), rows, { source: item.source });
    records.push(record);
    for (const trace of record.construction_traces || []) {
      constructionRows += 1;
      if (trace.taxonomy_status === "invalid") {
        for (const issue of trace.taxonomy_issues || []) bump(taxonomyIssues, issue.code || "unknown");
      }
      if (trace.matcher_variant_applicability === "required") {
        requiredTraceCount += 1;
        if (!trace.matcher_variant_id && requiredWithoutId.length < 20) {
          requiredWithoutId.push({ source: item.source, construction: trace.construction, matcher_id: trace.matcher_id || "" });
        }
      }
      if (trace.construction === "CoordinatedNP" && trace.matcher_variant_applicability === "required") {
        coordinatedNpVariantRequiredCount += 1;
      }
      if (trace.matcher_variant_id && !expectedIds.has(trace.matcher_variant_id) && unexpectedVariantIds.length < 20) {
        unexpectedVariantIds.push({ source: item.source, construction: trace.construction, matcher_variant_id: trace.matcher_variant_id });
      }
    }
  } catch (error) {
    parseFailures.push({ source: item.source, context_source: item.context_source, error: error.message || String(error) });
  }
}

const report = aggregateCoverage(records);
const actualCounts = report.matcher_variant_counts || {};
const countMismatches = [];
for (const [id, expected] of Object.entries(expectedCounts)) {
  const actual = Number(actualCounts[id] || 0);
  if (actual !== expected) countMismatches.push({ matcher_variant_id: id, expected, actual });
}
for (const id of Object.keys(actualCounts)) {
  if (!expectedIds.has(id)) countMismatches.push({ matcher_variant_id: id, expected: 0, actual: actualCounts[id] });
}

const expectedRequiredTraceCount = Object.values(expectedCounts).reduce((sum, count) => sum + count, 0);
const blockingCount = parseFailures.length
  + Object.values(taxonomyIssues).reduce((sum, count) => sum + count, 0)
  + requiredWithoutId.length
  + unexpectedVariantIds.length
  + coordinatedNpVariantRequiredCount
  + countMismatches.length
  + Number(report.required_matcher_variant_missing_count || 0)
  + (report.matcher_variant_fingerprint_conflicts || []).length
  + (report.matcher_fingerprint_variant_conflicts || []).length
  + (report.matcher_variant_consistency_status === "PASS" ? 0 : 1)
  + (requiredTraceCount === expectedRequiredTraceCount ? 0 : 1);

console.log(JSON.stringify({
  schema: "canto-span-matcher-variant-acceptance-v2",
  runtime_version: api.runtimeVersion,
  corpus: {
    unique_source_context_pairs: corpus.size,
    analyzed: corpus.size - parseFailures.length,
    parse_failures: parseFailures.length,
    construction_rows: constructionRows,
  },
  reviewed_variant_family_count: 5,
  reviewed_variant_definition_count: expectedIds.size,
  expected_required_trace_count: expectedRequiredTraceCount,
  required_trace_count: requiredTraceCount,
  matcher_variant_counts: actualCounts,
  count_mismatches: countMismatches,
  required_without_id_count: requiredWithoutId.length,
  required_without_id: requiredWithoutId,
  unexpected_variant_id_count: unexpectedVariantIds.length,
  unexpected_variant_ids: unexpectedVariantIds,
  coordinated_np_variant_required_count: coordinatedNpVariantRequiredCount,
  taxonomy_issue_counts: taxonomyIssues,
  required_matcher_variant_missing_count: report.required_matcher_variant_missing_count || 0,
  matcher_variant_fingerprint_conflict_count: (report.matcher_variant_fingerprint_conflicts || []).length,
  matcher_variant_fingerprint_conflicts: report.matcher_variant_fingerprint_conflicts || [],
  matcher_fingerprint_variant_conflict_count: (report.matcher_fingerprint_variant_conflicts || []).length,
  matcher_fingerprint_variant_conflicts: report.matcher_fingerprint_variant_conflicts || [],
  matcher_variant_consistency_status: report.matcher_variant_consistency_status,
  blocking_count: blockingCount,
  parse_failures: parseFailures.slice(0, 20),
  note: "Authored matcher variants distinguish only reviewed same-visible-rule controlled runtime definitions. Fingerprints remain machine integrity provenance; neither is linguistic evidence. This temporary probe deliberately exits nonzero after printing acceptance results.",
}, null, 2));

process.exit(1);
