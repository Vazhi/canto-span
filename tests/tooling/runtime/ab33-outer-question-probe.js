#!/usr/bin/env node
"use strict";

const { loadRuntimeApi } = require("../../lib/runtime-api");

const api = loadRuntimeApi();
const cases = [
  "係唔係每個學生都鍾意睇電視呀？",
  "係唔係每個學生都鍾意音樂呀？",
  "係唔係每個學生都鍾意咗個學生呀？",
  "係唔係每個學生都鍾意燒鵝定係燒鴨多啲呀？",
  "你鍾唔鍾意睇戲呀？",
  "你鍾唔鍾意音樂呀？",
  "你鍾唔鍾意燒鵝定係燒鴨多啲呀？",
  "我鍾意食飯。",
  "我鍾意音樂。"
];

function compactRow(row) {
  const detail = row.trace_detail || {};
  return {
    depth: row.depth,
    kind: row.kind,
    construction: row.construction || "",
    internal_construction: row.internal_construction || "",
    surface: row.surface || row.display_surface || "",
    label: row.label || "",
    syntax: row.syntax || "",
    trace_kind: detail.kind || row.trace || "",
    template_family: detail.template_family || "",
    structural_scope: detail.structural_scope || "",
    matcher_variant_id: detail.matcher_variant_id || "",
    assigned_slots: detail.assigned_slots || [],
    binding_status: detail.binding_contract_status || "",
    binding_resolution: detail.binding_resolution || "",
    child_constructions: detail.child_constructions || []
  };
}

const output = cases.map((source) => {
  const analysis = api.analyzeLine(source);
  const rows = api.diagnosticFinalRows(analysis).map(compactRow);
  return {
    source,
    parser_shadow_source: analysis.parser_shadow_source || source,
    top_constructions: api.diagnosticSummary(analysis).top_constructions || [],
    rows
  };
});

console.log(JSON.stringify({ schema: "ab33-outer-question-probe-v1", output }, null, 2));
process.exit(1);
