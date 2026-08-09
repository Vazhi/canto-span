#!/usr/bin/env node
"use strict";

const { recordsForSentences, aggregateCoverage } = require("../../../tools/parser-coverage-enhanced");

const sentences = [
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

const records = recordsForSentences(sentences);
const report = aggregateCoverage(records);
const compact = {
  schema: "canto-span-same-ten-enhanced-smoke-v1",
  analysis_count: report.analysis_count,
  implementation_covered_count: report.implementation_covered_count,
  coverage_status_counts: report.coverage_status_counts,
  sanity_finding_counts: report.sanity_finding_counts,
  architectural_debt_trace_counts: report.architectural_debt_trace_counts,
  slot_span_resolution_counts: report.slot_span_resolution_counts,
  unresolved_slot_span_count: report.unresolved_slot_span_count,
  matcher_counts: report.matcher_counts,
  records: records.map((record) => ({
    source: record.source,
    coverage_status: record.coverage_status,
    root_span_coverage_status: record.root_span_coverage_status,
    top_constructions: record.top_constructions,
    sanity_findings: record.sanity_findings.map((finding) => finding.code),
    constructions: record.construction_traces.map((trace) => ({
      construction: trace.construction,
      surface: trace.surface,
      source_span: trace.source_span,
      matcher_id: trace.matcher_id,
      rule_descriptor: trace.rule_descriptor,
      rule_descriptor_source: trace.rule_descriptor_source,
      template_family: trace.template_family,
      slots: trace.slot_bindings.map((binding) => ({
        slot: binding.slot,
        surface: binding.surface,
        span: binding.relative_span,
      })),
    })),
  })),
};

console.log(JSON.stringify(compact, null, 2));
// Deliberate failure so tests/run-all.js prints stdout into the Actions log.
process.exitCode = 1;
