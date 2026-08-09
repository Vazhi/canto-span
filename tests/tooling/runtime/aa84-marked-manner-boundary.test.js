"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { loadRuntimeApi } = require("../../lib/runtime-api");

const api = loadRuntimeApi();

function rowsFor(source) {
  return api.diagnosticFinalRows(api.analyzeLine(source));
}

function constructionRows(rows, type) {
  return rows.filter((row) => row.kind === "construction" && (row.construction || row.internal_construction) === type);
}

function topSurface(rows) {
  return rows.filter((row) => Number(row.depth || 0) === 0).map((row) => row.surface || row.display_surface || "").join("");
}

function assertNarrowAa84(source, expectedChild) {
  const rows = rowsFor(source);
  const [manner] = constructionRows(rows, "MannerAdverbialVP");
  assert(manner, `${source}: expected MannerAdverbialVP`);
  assert.equal(manner.surface || manner.display_surface, source.replace(/[。！？?!]+$/u, "").replace(/^佢/u, "").replace(/^琴日/u, "").replace(/[啦喇]+$/u, ""));
  assert.equal(manner.trace_detail.template_family, "construction_template");
  assert.equal(manner.trace_detail.template_subtype, "aa84_overt_gam_marked_reduplicated_manner");
  assert.equal(manner.trace_detail.rule, "typed source-linked reduplicated manner constituent + overt 咁/噉 + independently typed VP");
  assert.equal(manner.trace_detail.binding_contract_status, "complete");
  assert.equal(manner.trace_detail.structural_scope, "vp");
  assert.equal(manner.trace_detail.assigned_slots.includes("subject"), false);
  assert.equal((manner.trace_detail.template || []).some((slot) => String(slot).startsWith("subject")), false);
  assert.equal((manner.slots || []).includes("subject"), false);
  assert(constructionRows(rows, expectedChild).some((row) => Number(row.depth || 0) > Number(manner.depth || 0)), `${source}: expected nested ${expectedChild}`);
  assert.equal(topSurface(rows), source, `${source}: exact visible surface should be preserved once`);
  return rows;
}

test("AA84 begins at the marked manner constituent and keeps an overt subject outside", () => {
  const rows = assertNarrowAa84("佢慢慢噉食飯。", "ProductiveVO");
  const [outer] = constructionRows(rows, "SubjectPredicateClause");
  const [manner] = constructionRows(rows, "MannerAdverbialVP");
  assert(outer);
  assert.equal(Number(outer.depth || 0), 0);
  assert.equal(outer.trace_detail.structural_scope, "clause");
  assert.equal(outer.trace_detail.template_subtype, "aa84_subject_wrapper");
  assert.equal(Number(manner.depth || 0), 1);
  assert.equal(manner.surface || manner.display_surface, "慢慢噉食飯");
});

test("AA84 preserves independently typed object and perfective VP children", () => {
  assertNarrowAa84("慢慢噉食飯。", "ProductiveVO");
  assertNarrowAa84("慢慢噉食咗飯。", "PerfectiveVP");
});

test("overt temporal material remains outside a nested AA84 VP", () => {
  const rows = assertNarrowAa84("琴日慢慢噉食飯。", "ProductiveVO");
  const [outer] = constructionRows(rows, "TemporalClause");
  const [manner] = constructionRows(rows, "MannerAdverbialVP");
  assert(outer);
  assert.equal(Number(outer.depth || 0), 0);
  assert.equal(outer.trace_detail.template_subtype, "aa84_temporal_wrapper");
  assert.equal(Number(manner.depth || 0), 1);
  assert.equal(manner.surface || manner.display_surface, "慢慢噉食飯");
});

test("sentence-final particle stays outside narrow AA84", () => {
  const rows = assertNarrowAa84("慢慢噉食飯啦。", "ProductiveVO");
  const [manner] = constructionRows(rows, "MannerAdverbialVP");
  assert.equal(manner.surface || manner.display_surface, "慢慢噉食飯");
  const particle = rows.find((row) => Number(row.depth || 0) === 0 && (row.surface || row.display_surface) === "啦");
  assert(particle, "expected final 啦 outside AA84");
});

test("bare, collision, incomplete, reverse, and untyped documented profiles do not receive AA84", () => {
  const sources = [
    "佢慢慢行。",
    "慢慢行。",
    "乖乖地食飯先。",
    "今日凍凍地。",
    "日日行。",
    "慢慢慢慢玩。",
    "甲甲咁食飯。",
    "慢慢噉。",
    "食飯慢慢噉。",
    "慢慢噉今日食飯。",
    "傻傻哋咁笑。",
    "大大力咁踢個波。",
    "細細聲咁講俾我聽啦。",
  ];
  for (const source of sources) {
    const rows = rowsFor(source);
    assert.equal(constructionRows(rows, "MannerAdverbialVP").length, 0, `${source}: AA84 must remain absent`);
    assert.equal(topSurface(rows), source, `${source}: rejected AA84 candidate must preserve visible surface`);
  }
});
