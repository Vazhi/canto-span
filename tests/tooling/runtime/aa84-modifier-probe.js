#!/usr/bin/env node
"use strict";

const { loadRuntimeApi } = require("../../lib/runtime-api");
const api = loadRuntimeApi();

const cases = [
  "慢慢噉食飯。",
  "佢慢慢噉食飯。",
  "慢慢噉食咗飯。",
  "慢慢噉行。",
  "我行。",
  "行。",
  "我笑。",
  "笑。",
  "琴日慢慢噉食飯。",
  "慢慢噉食飯啦。",
  "慢慢行。",
  "傻傻哋咁笑。",
  "大大力咁踢個波。",
  "細細聲咁講俾我聽啦。",
  "乖乖地食飯先。",
  "今日凍凍地。",
  "日日行。",
  "慢慢慢慢玩。",
  "甲甲咁食飯。",
  "慢慢噉。",
  "食飯慢慢噉。",
  "慢慢噉今日食飯。"
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
    template_subtype: detail.template_subtype || "",
    rule: detail.rule || "",
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

console.log(JSON.stringify({ schema: "aa84-modifier-probe-v2", output }, null, 2));
process.exit(1);
