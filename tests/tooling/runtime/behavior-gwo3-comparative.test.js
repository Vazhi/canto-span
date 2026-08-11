"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { loadRuntimeApi, rowSurface } = require("../../lib/runtime-api");

const api = loadRuntimeApi();

function constructionRows(source) {
  return api.diagnosticFinalRows(api.analyzeLine(source)).filter((row) => row.kind === "construction");
}

function bindingMap(row) {
  return Object.fromEntries(Array.from(row.trace_detail && row.trace_detail.bindings || []).map((binding) => [binding.slot, binding.source_surface]));
}

function comparativeRows(source) {
  return constructionRows(source).filter((row) => {
    const map = bindingMap(row);
    return map.comparison_marker === "過" && Boolean(map.comparison_predicate) && Boolean(map.comparison_standard);
  });
}

function assertComparative(source, predicate, standard) {
  const rows = comparativeRows(source);
  assert.equal(rows.length, 1, `${source}: expected one overt-standard comparative relation`);
  const row = rows[0];
  const map = bindingMap(row);
  assert.equal(map.comparison_predicate, predicate);
  assert.equal(map.comparison_marker, "過");
  assert.equal(map.comparison_standard, standard);
  assert.ok(rowSurface(row).includes(`${predicate}過`));
  assert.ok(row.slots.includes("comparison_standard"));
}

test("RED: overt-standard post-predicate 過 comparison exposes predicate, marker, and standard", () => {
  assertComparative("我高過佢。", "高", "佢");
  assertComparative("細佬矮過我。", "矮", "我");
  assertComparative("今日凍過琴日。", "凍", "琴日");
});

test("RED boundary: experiential 過 is not comparative", () => {
  for (const source of ["我食過飯。", "佢去過英國。", "食過飯。"]) assert.equal(comparativeRows(source).length, 0, source);
});

test("RED boundary: directional 過 is not comparative", () => {
  for (const source of ["我行過去。", "佢行過條橋。", "行過嚟。"]) assert.equal(comparativeRows(source).length, 0, source);
});
