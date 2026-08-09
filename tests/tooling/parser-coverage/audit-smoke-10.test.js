#!/usr/bin/env node
"use strict";

const test = require("node:test");
const {
  aggregateCoverage,
  recordsForSentences,
} = require("../../../tools/parser-coverage-report");

const PHRASES = [
  "你好。",
  "我食飯。",
  "我食咗飯。",
  "我係老師。",
  "我有一本書。",
  "我唔食飯。",
  "我要飲水。",
  "你食唔食飯？",
  "佢喺屋企。",
  "我想睇電視。",
];

test("temporary detailed audit smoke output for the original 10 phrases", () => {
  const records = recordsForSentences(PHRASES);
  const aggregate = aggregateCoverage(records, { sampleLimit: 10 });
  const payload = {
    aggregate: {
      analysis_count: aggregate.analysis_count,
      implementation_covered_count: aggregate.implementation_covered_count,
      coverage_status_counts: aggregate.coverage_status_counts,
      category_counts: aggregate.category_counts,
      trace_kind_counts: aggregate.trace_kind_counts,
      template_family_counts: aggregate.template_family_counts,
      top_construction_counts: aggregate.top_construction_counts,
      architectural_debt_trace_counts: aggregate.architectural_debt_trace_counts,
      specialized_non_debt_trace_counts: aggregate.specialized_non_debt_trace_counts,
      sanity_finding_counts: aggregate.sanity_finding_counts,
      sanity_samples: aggregate.sanity_samples,
    },
    records: records.map((record) => ({
      source: record.source,
      coverage_status: record.coverage_status,
      categories: record.categories,
      top_constructions: record.top_constructions,
      root_span_coverage_status: record.root_span_coverage_status,
      construction_traces: record.construction_traces.map((trace) => ({
        construction: trace.construction,
        surface: trace.surface,
        depth: trace.depth,
        parent: trace.parent,
        parent_surface: trace.parent_surface,
        parent_relative_span: trace.parent_relative_span,
        trace_kind: trace.trace_kind,
        template_family: trace.template_family,
        rule: trace.rule,
        assigned_slots: trace.assigned_slots,
        slot_bindings: trace.slot_bindings,
      })),
      token_provenance: record.token_provenance.map((token) => ({
        surface: token.surface,
        parent: token.parent,
        label: token.label,
        role: token.role,
        trace_kind: token.trace_kind,
        lexical_status: token.lexical_status,
      })),
      sanity_findings: record.sanity_findings,
    })),
  };

  throw new Error(`AUDIT_SMOKE_10_JSON\n${JSON.stringify(payload, null, 2)}`);
});
