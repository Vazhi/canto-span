#!/usr/bin/env node
"use strict";

const { loadRuntimeApi } = require("../../lib/runtime-api");

const api = loadRuntimeApi({ apiNames: ["analyzeLine", "diagnosticFinalRows"] });
const cases = [
  "因為落雨，所以我冇去。",
  "呢個用嚟切嘢。",
  "一見到佢，我笑。",
  "我覺得啱。",
  "我知。",
  "我知佢唔嚟。",
  "我買嘅書好貴。",
  "我行學校去。",
  "给你水。",
  "我叫 Chris。"
];

function compactBinding(binding) {
  return {
    slot: binding.slot || "",
    binding_scope: binding.binding_scope || "",
    parser_surface: binding.parser_surface || "",
    display_surface: binding.display_surface || "",
    parser_span: binding.parser_span || null,
    source_span: binding.source_span || null,
    relative_source_span: binding.relative_source_span || null,
    provenance: binding.provenance || "",
  };
}

function pick(row) {
  const detail = row.trace_detail || {};
  return {
    depth: row.depth,
    parent: row.parent || "",
    construction: row.construction || row.internal_construction || "",
    surface: row.display_surface || row.surface || row.parser_surface || "",
    parser_surface: row.parser_surface || row.surface || "",
    trace_kind: detail.kind || row.trace || "",
    binding_schema: detail.trace_binding_schema || "",
    binding_status: detail.binding_contract_status || "",
    binding_resolution: detail.binding_resolution || "",
    assigned_slots: Array.isArray(detail.assigned_slots) ? detail.assigned_slots : [],
    legacy_surface_count: Array.isArray(detail.surfaces) ? detail.surfaces.length : 0,
    component_count: Array.isArray(detail.components) ? detail.components.length : 0,
    components: (detail.components || []).map((component) => ({
      index: component.index,
      kind: component.kind,
      parser_surface: component.parser_surface,
      display_surface: component.display_surface,
      parser_span: component.parser_span,
      source_span: component.source_span,
    })),
    bindings: (detail.bindings || []).map(compactBinding),
  };
}

const output = cases.map((source) => {
  const analysis = api.analyzeLine(source);
  const rows = api.diagnosticFinalRows(analysis);
  return {
    source,
    parser_shadow_source: analysis.parser_shadow_source,
    alignment: analysis.trace_binding_provenance,
    rows: rows.filter((row) => row && row.kind === "construction").map(pick),
  };
});

const allRows = output.flatMap((item) => item.rows);
const statusCounts = {};
for (const row of allRows) statusCounts[row.binding_status || "missing"] = (statusCounts[row.binding_status || "missing"] || 0) + 1;

console.log(JSON.stringify({
  schema: "canto-span-trace-binding-probe-v2",
  runtime_version: api.runtimeVersion,
  construction_rows: allRows.length,
  binding_status_counts: statusCounts,
  unresolved: allRows.filter((row) => row.binding_status === "legacy_unresolved").map((row) => ({ construction: row.construction, source: output.find((item) => item.rows.includes(row))?.source || "" })),
  cases: output,
}, null, 2));

// Temporary branch-only probe: deliberately fail after emitting the report so
// Actions retains it in the standard runtime-test failure output. Remove before PR readiness.
process.exit(1);
