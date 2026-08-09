#!/usr/bin/env node
"use strict";

const { loadRuntimeApi } = require("../../lib/runtime-api");
const api = loadRuntimeApi();

const cases = [
  "慢慢",
  "傻傻哋",
  "大大力",
  "細細聲",
  "慢慢噉行。",
  "慢慢噉食飯。",
  "慢慢噉食咗飯。",
  "傻傻哋咁笑。",
  "大大力咁踢個波。",
  "細細聲咁講俾我聽啦。",
  "慢慢行。",
  "乖乖地食飯先。",
  "今日凍凍地。",
  "日日行。",
  "慢慢慢慢玩。"
];

function compactRow(row) {
  const detail = row.trace_detail || {};
  return {
    depth: Number(row.depth || 0),
    kind: row.kind,
    construction: row.construction || row.internal_construction || "",
    surface: row.surface || row.display_surface || "",
    label: row.label || "",
    syntax: row.syntax || "",
    slots: row.slots || [],
    trace_kind: detail.kind || row.trace || "",
    template_family: detail.template_family || "",
    assigned_slots: detail.assigned_slots || [],
    structural_scope: detail.structural_scope || "",
    binding_status: detail.binding_contract_status || ""
  };
}

const output = cases.map((source) => {
  const analysis = api.analyzeLine(source);
  return {
    source,
    top_constructions: api.diagnosticSummary(analysis).top_constructions || [],
    rows: api.diagnosticFinalRows(analysis).map(compactRow)
  };
});

console.log(JSON.stringify({ schema: "aa84-modifier-probe-v1", output }, null, 2));
process.exit(1);
