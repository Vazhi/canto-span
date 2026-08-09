#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const {
  aggregateCoverage,
  buildCoverageRecord,
  categoriesForSummary,
  formatRecordDetails,
  recordsForSentences,
  recordsFromFullDiagnostics,
  structuralSanityFindings,
  uniqueRelativeSpan,
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
            trace_detail: {
              kind: "generative_template",
              template_family: "generative_template",
              assigned_slots: ["subject", "predicate"],
              surfaces: ["例", "子"],
            },
          },
          {
            kind: "token",
            surface: "例",
            depth: 1,
            parent: "ExampleConstruction",
            trace: "atomic_lexicon",
            label: "who",
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
  assert.equal(records[0].construction_traces[0].slot_bindings[0].slot, "subject");
  assert.deepEqual(records[0].construction_traces[0].slot_bindings[0].relative_span, {
    status: "unique",
    start: 0,
    end: 1,
  });
  assert.equal(records[0].token_provenance[0].lexical_status, "known_lexicon");
  assert.equal(records[0].coverage_status, "COVERED");
});

test("parent-relative construction spans are exposed when uniquely locatable", () => {
  const record = buildCoverageRecord(
    {
      source: "我食飯",
      construction_count: 2,
      top_constructions: ["SubjectPredicateClause"],
      trace_summary: { generative_template: 2, atomic_lexicon: 3 },
      template_family_summary: { generative_template: 2 },
      root_span_coverage_status: "PASS",
      root_top_construction_count: 1,
      semantic_acceptance_status: "MANUAL_REVIEW_ELIGIBLE",
    },
    [
      {
        kind: "construction",
        construction: "SubjectPredicateClause",
        surface: "我食飯",
        depth: 0,
        trace: "generative_template",
        trace_detail: {
          kind: "generative_template",
          template_family: "generative_template",
          assigned_slots: ["subject", "predicate"],
          surfaces: ["我", "食飯"],
        },
      },
      {
        kind: "construction",
        construction: "ProductiveVO",
        surface: "食飯",
        depth: 1,
        parent: "SubjectPredicateClause",
        trace: "generative_template",
        trace_detail: {
          kind: "generative_template",
          template_family: "generative_template",
          assigned_slots: ["verb", "object"],
          surfaces: ["食", "飯"],
        },
      },
    ],
  );
  assert.deepEqual(record.construction_traces[1].parent_relative_span, {
    status: "unique",
    start: 1,
    end: 3,
  });
  assert.equal(record.sanity_findings.length, 0);
});

test("structural sanity checks surface provenance inconsistencies", () => {
  const summary = {
    root_span_coverage_status: "PASS",
    unwrapped_root_surfaces: ["尾"],
  };
  const findings = structuralSanityFindings(summary, [
    {
      construction: "ModalVP",
      surface: "我要飲水",
      depth: 0,
      parent: "",
      parent_surface: "",
      parent_relative_span: { status: "root", start: 0, end: 4 },
      trace_kind: "generative_template",
      template_family: "",
      assigned_slots: ["subject", "modal", "vp"],
      slot_surfaces: ["我", "要"],
      slot_bindings: [
        { slot: "subject", surface: "我", relative_span: { status: "unique", start: 0, end: 1 } },
        { slot: "modal", surface: "要", relative_span: { status: "unique", start: 1, end: 2 } },
      ],
    },
  ]);
  assert.deepEqual(
    findings.map((finding) => finding.code).sort(),
    [
      "pass_with_unwrapped_root_surface",
      "root_vp_binds_subject",
      "slot_surface_count_mismatch",
      "template_family_missing",
    ].sort(),
  );
});

test("child construction outside parent and slot surface outside construction are flagged", () => {
  const findings = structuralSanityFindings({}, [
    {
      construction: "ChildVP",
      surface: "飲水",
      depth: 1,
      parent: "ParentClause",
      parent_surface: "我食飯",
      parent_relative_span: { status: "not_found", start: null, end: null },
      trace_kind: "generative_template",
      template_family: "generative_template",
      assigned_slots: ["verb"],
      slot_surfaces: ["睇"],
      slot_bindings: [
        { slot: "verb", surface: "睇", relative_span: { status: "not_found", start: null, end: null } },
      ],
    },
  ]);
  assert.deepEqual(
    findings.map((finding) => finding.code).sort(),
    ["child_surface_outside_parent", "slot_surface_outside_construction"].sort(),
  );
});

test("relative span helper refuses ambiguous repeated surfaces", () => {
  assert.deepEqual(uniqueRelativeSpan("食食飯", "食"), {
    status: "ambiguous",
    start: null,
    end: null,
  });
});

test("detailed human output exposes slots and sanity findings", () => {
  const record = buildCoverageRecord(
    {
      source: "我係老師",
      construction_count: 1,
      top_constructions: ["CopularIdentificationFrame"],
      trace_summary: { generative_template: 1 },
      template_family_summary: {},
      root_span_coverage_status: "PASS",
      root_top_construction_count: 1,
      semantic_acceptance_status: "MANUAL_REVIEW_ELIGIBLE",
    },
    [
      {
        kind: "construction",
        construction: "CopularIdentificationFrame",
        surface: "我係老師",
        depth: 0,
        trace: "generative_template",
        trace_detail: {
          kind: "generative_template",
          assigned_slots: ["subject", "copula", "predicate"],
          surfaces: ["我", "係", "老師"],
        },
      },
    ],
  );
  const text = formatRecordDetails(record);
  assert(text.includes("slot subject = [我]"));
  assert(text.includes("template_family_missing"));
});

test("live source runtime exposes slot provenance for the basic smoke anomalies", () => {
  const records = recordsForSentences(["我要飲水。", "我想睇電視。", "我係老師。"]).toSorted((a, b) => a.source.localeCompare(b.source));
  const modal = records.find((record) => record.source === "我要飲水。");
  const desiderative = records.find((record) => record.source === "我想睇電視。");
  const copular = records.find((record) => record.source === "我係老師。");

  assert(modal.construction_traces[0].slot_bindings.some((binding) => binding.slot === "subject"));
  assert(modal.sanity_findings.some((finding) => finding.code === "root_vp_binds_subject"));
  assert(desiderative.construction_traces[0].slot_bindings.some((binding) => binding.slot === "subject"));
  assert(desiderative.sanity_findings.some((finding) => finding.code === "root_vp_binds_subject"));
  assert.equal(copular.construction_traces[0].template_family, "generative_template");
  assert(!copular.sanity_findings.some((finding) => finding.code === "template_family_missing"));
});
