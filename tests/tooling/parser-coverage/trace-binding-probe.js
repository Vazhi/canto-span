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

function pick(row) {
  const detail = row.trace_detail || {};
  return {
    kind: row.kind,
    depth: row.depth,
    parent: row.parent || "",
    surface: row.display_surface || row.surface || row.parser_surface || "",
    parser_surface: row.parser_surface || row.surface || "",
    construction: row.construction || row.internal_construction || "",
    internal_construction: row.internal_construction || "",
    trace_kind: detail.kind || row.trace || "",
    assigned_slots: Array.isArray(detail.assigned_slots) ? detail.assigned_slots : [],
    surfaces: Array.isArray(detail.surfaces) ? detail.surfaces : [],
    rule: detail.rule || "",
    template: Array.isArray(detail.template) ? detail.template : [],
    trace_detail: detail,
  };
}

const output = cases.map((source) => {
  const rows = api.diagnosticFinalRows(api.analyzeLine(source));
  return {
    source,
    rows: rows.filter((row) => row && row.kind === "construction").map(pick),
  };
});

console.log(JSON.stringify({
  schema: "canto-span-trace-binding-probe-v1",
  runtime_version: api.runtimeVersion,
  cases: output,
}, null, 2));

// Temporary branch-only probe: deliberately fail after emitting the report so
// Actions retains it in the standard runtime-test failure output. Remove before PR readiness.
process.exit(1);
