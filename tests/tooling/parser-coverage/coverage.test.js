#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const {
  aggregateCoverage,
  buildCoverageRecord,
  categoriesForSummary,
  recordsForSentences,
  recordsFromFullDiagnostics,
} = require("../../../tools/parser-coverage-report");

test("unknown lexical traces remain distinct from structural coverage", () => {
  const summary = {
    source: "龘",
    construction_count: 0,
    trace_summary: { unknown_atomic: 1 },
    template_family_summary: {},
    root_span_coverage_status: "NO_TOP_CONSTRUCTION",
    root_top_construction_count: 0,
    semantic_acceptance_status: "BLOCKED",
  };
  const categories = categoriesForSummary(summary);
  assert(categories.includes("unknown_lexicon"));
  assert(!categories.includes("known_lexicon_unresolved_structure"));
  assert.equal(buildCoverageRecord(summary).coverage_status, "UNKNOWN_LEXICON");
});

test("known lexical material with no complete structure gets its own category", () => {
  const summary = {
    source: "known material",
    construction_count: 0,
    trace_summary: { atomic_lexicon: 2 },
    template_family_summary: {},
    root_span_coverage_status: "NO_TOP_CONSTRUCTION",
    root_top_construction_count: 0,
    semantic_acceptance_status: "BLOCKED",
  };
  const record = buildCoverageRecord(summary);
  assert(record.categories.includes("known_lexicon_unresolved_structure"));
  assert.equal(record.coverage_status, "UNRESOLVED_STRUCTURE");
});

test("specialized hand-coded traces are visible but are not automatically architectural debt", () => {
  const records = [buildCoverageRecord({
    source: "specialized",
    construction_count: 1,
    top_constructions: ["ExampleConstruction"],
    trace_summary: {
      construction_function: 2,
      surface_specific_phrase_rule: 1,
      legacy_surface_rule: 1,
    },
    template_family_summary: {},
    root_span_coverage_status: "PASS",
    root_top_construction_count: 1,
    semantic_acceptance_status: "MANUAL_REVIEW_ELIGIBLE",
  })];
  const report = aggregateCoverage(records);
  assert.deepEqual(
    report.architectural_debt_trace_counts.map((row) => row.trace_kind),
    ["legacy_surface_rule", "surface_specific_phrase_rule"],
  );
  assert.deepEqual(report.specialized_non_debt_trace_counts, [
    { trace_kind: "construction_function", count: 2 },
  ]);
  assert.equal(report.linguistic_confidence, null);
  assert.equal(report.evidence_weight, 0);
});

test("full diagnostics exports can be aggregated without rerunning the parser", () => {
  const payload = {
    schema: "canto-span-note-full-diagnostics-json-v1",
    note_path: "sample.md",
    diagnostics: [
      {
        diagnostic_index: 4,
        source: "例子",
        summary: {
          source: "例子",
          construction_count: 1,
          top_constructions: ["ExampleConstruction"],
          trace_summary: { generative_template: 1, atomic_lexicon: 1 },
          template_family_summary: { generative_template: 1 },
          root_span_coverage_status: "PASS",
          root_top_construction_count: 1,
          semantic_acceptance_status: "MANUAL_REVIEW_ELIGIBLE",
        },
        final_construction_tree: [
          {
            kind: "construction",
            construction: "ExampleConstruction",
            surface: "例子",
            depth: 0,
            trace: "generative_template",
            trace_detail: { kind: "generative_template", template_family: "generative_template" },
          },
        ],
      },
    ],
  };
  const records = recordsFromFullDiagnostics(payload, "sample.json");
  assert.equal(records.length, 1);
  assert.equal(records[0].source_artifact, "sample.json");
  assert.equal(records[0].diagnostic_index, 4);
  assert.equal(records[0].construction_traces[0].construction, "ExampleConstruction");
  assert.equal(records[0].coverage_status, "COVERED");
});

test("live source runtime produces a machine-readable coverage record", () => {
  const records = recordsForSentences(["你好。"]);
  assert.equal(records.length, 1);
  assert.equal(records[0].schema, "canto-span-parser-coverage-record-v1");
  assert.equal(records[0].source, "你好。");
  assert.equal(records[0].source_artifact, "live_source_runtime");
  assert.equal(records[0].linguistic_confidence, null);
  assert.equal(records[0].evidence_weight, 0);
  assert(records[0].trace_kind_counts && typeof records[0].trace_kind_counts === "object");
});
