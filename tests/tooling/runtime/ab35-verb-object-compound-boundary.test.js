"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const compounds = require("../../../src/runtime-resources/lexicon/verb-object-compounds");
const legacy = require("../../../src/runtime-resources/lexicon/productive-vo");
const { loadRuntimeApi, internalConstruction, rowSurface } = require("../../lib/runtime-api");

const api = loadRuntimeApi();
const SEEDS = ["飲茶", "游水", "沖涼"];

function constructionRows(source) {
  return api.diagnosticFinalRows(api.analyzeLine(source)).filter((row) => row.kind === "construction");
}
function productiveRows(source) {
  return constructionRows(source).filter((row) => internalConstruction(row) === "ProductiveVO");
}
function sourceLinkedRows(source) {
  return productiveRows(source).filter((row) => row.trace_detail && row.trace_detail.kind === "source_linked_runtime_matcher");
}
function assertSeed(source, surface) {
  const rows = sourceLinkedRows(source);
  assert.equal(rows.length, 1, source);
  const row = rows[0];
  assert.equal(rowSurface(row), surface);
  assert.equal(row.trace_detail.structural_scope, "vp");
  assert.equal(row.trace_detail.lexical_compound_profile, "contiguous_source_linked_seed");
  assert.equal(row.trace_detail.template_family_applicability, "not_applicable");
  assert.equal(row.trace_detail.binding_contract_status, "not_applicable");
  assert.equal(Array.from(row.trace_detail.bindings || []).length, 0);
  assert.equal(row.trace_detail.matcher_variant_id, "ProductiveVO.source_linked_verb_object_compound_seed");
  assert.equal(row.slots.includes("object"), false);
  assert.equal(row.slots.includes("productive_vo"), true);
  assert.equal(row.slots.includes("verb_object_compound"), true);
  const components = row.trace_detail.components || [];
  assert.equal(components.length, 2);
  assert.equal(components.map((item) => item.source_surface).join(""), surface);
  for (const component of components) {
    assert.equal(component.source_span.status, "unique");
    assert.equal(component.source_span.relative_to, "raw_source");
  }
  assert.ok(String(row.trace_detail.source_specification || "").includes("ISSUE-753-AB35-LEXICAL-VO-RUNTIME-CONTRACT-R1.md"));
  return row;
}

test("AB35 source-linked seed is exactly the three reviewed current-whitelist compounds", () => {
  assert.deepEqual(compounds.map(([surface]) => surface), SEEDS);
  assert.equal(legacy.length, 39);
  for (const seed of SEEDS) assert.equal(legacy.some(([surface]) => surface === seed), false, seed);
  assertSeed("飲茶。", "飲茶");
  assertSeed("游水。", "游水");
  assertSeed("沖涼。", "沖涼");
});

test("AB35 seed remains VP-sized under existing outer composition", () => {
  let row = assertSeed("我飲茶。", "飲茶");
  assert.equal(row.internal_parent || row.parent, "ClauseSpan");
  row = assertSeed("我會游水。", "游水");
  assert.equal(row.internal_parent || row.parent, "ModalVP");
  row = assertSeed("我想沖涼。", "沖涼");
  assert.equal(row.internal_parent || row.parent, "DesiderativeVP");
  row = assertSeed("你飲茶咩？", "飲茶");
  assert.notEqual(row.internal_parent || row.parent, "", "question material must remain outside the compound");
});

test("legacy and unresolved ProductiveVO surfaces do not inherit the source-linked compound trace", () => {
  for (const source of ["做功課。", "食飯。", "打電話。", "打籃球。", "飲水。", "做運動。", "下棋。", "煮嘢食。"]) {
    assert.equal(sourceLinkedRows(source).length, 0, source);
  }
  assert.equal(productiveRows("做功課。").length, 0);
  assert.equal(productiveRows("飲水。").some((row) => row.trace_detail.kind === "generative_template"), true);
});

test("separated seed components do not receive contiguous lexical-compound identity", () => {
  for (const source of ["飲咗茶。", "游咗水。", "沖咗涼。"]) {
    assert.equal(sourceLinkedRows(source).length, 0, source);
  }
});

test("generic AB78 semantics never leak into the source-linked compound trace", () => {
  for (const source of ["飲茶。", "游水。", "沖涼。"]) {
    const row = assertSeed(source, source.slice(0, -1));
    assert.equal((row.trace_detail.assigned_slots || []).length, 0);
    assert.equal((row.trace_detail.bindings || []).some((binding) => binding.slot === "object" || binding.slot === "patient"), false);
  }
});
