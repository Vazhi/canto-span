"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const legacy = require("../../../src/runtime-resources/lexicon/productive-vo");
const compounds = require("../../../src/runtime-resources/lexicon/verb-object-compounds");
const { loadRuntimeApi, internalConstruction, rowSurface } = require("../../lib/runtime-api");

const api = loadRuntimeApi();
const EXPECTED_LEGACY = [
  "食飯","煮飯","摘芒果","買嘢","食嘢","飲水","寫字","寫名","睇書","聽歌","睇戲","跑步","影相","打機","煮嘢食","唱K","做運動","踢波","打波","彈琴","釣魚","唱歌","睇波","下棋","講嘢","打電話","打籃球","聽電話","返學","放學","瞓覺","洗手","曬太陽","打麻雀","默書","炒股票","發脾氣","食意粉","Book枱"
];
function rows(source) { return api.diagnosticFinalRows(api.analyzeLine(source)).filter((row) => row.kind === "construction"); }
function byType(source, type) { return rows(source).filter((row) => internalConstruction(row) === type); }
function bindingMap(row) { return Object.fromEntries(Array.from(row.trace_detail && row.trace_detail.bindings || []).map((binding) => [binding.slot, binding.source_surface])); }

test("做功課 is removed only from legacy AB35/ProductiveVO compatibility ownership", () => {
  assert.deepEqual(legacy.map(([surface]) => surface), EXPECTED_LEGACY);
  assert.equal(legacy.length, 39);
  assert.equal(legacy.some(([surface]) => surface === "做功課"), false);
  assert.deepEqual(compounds.map(([surface]) => surface), ["飲茶", "游水", "沖涼"]);
});

test("bare 做功課 is typed AB78 with an ordinary overt object binding", () => {
  assert.equal(byType("做功課。", "ProductiveVO").length, 0);
  const transitive = byType("做功課。", "TransitiveVP");
  assert.equal(transitive.length, 1);
  assert.equal(rowSurface(transitive[0]), "做功課");
  assert.equal(transitive[0].trace_detail.kind, "generative_template");
  const bindings = bindingMap(transitive[0]);
  assert.equal(bindings.action_verb, "做");
  assert.equal(bindings.object, "功課");
  assert.equal(transitive[0].slots.includes("object"), true);
});

test("outer sequence composition keeps AB78 ownership of 做功課 without stealing 食飯", () => {
  let transitive = byType("再做功課。", "TransitiveVP");
  assert.equal(transitive.length, 1);
  assert.equal(rowSurface(transitive[0]), "做功課");
  assert.notEqual(transitive[0].internal_parent || transitive[0].parent, "", "sequence material must remain outside the AB78 VP");
  assert.equal(byType("再做功課。", "ProductiveVO").length, 0);
  const mixed = rows("我先食飯，再做功課。");
  const productives = mixed.filter((row) => internalConstruction(row) === "ProductiveVO");
  assert.equal(productives.some((row) => rowSurface(row) === "食飯"), true);
  assert.equal(productives.some((row) => rowSurface(row) === "做功課"), false);
  assert.equal(mixed.filter((row) => internalConstruction(row) === "TransitiveVP" && rowSurface(row) === "做功課").length, 1);
});

test("the three source-linked AB35 seeds remain unchanged", () => {
  for (const surface of ["飲茶", "游水", "沖涼"]) {
    const matches = byType(`${surface}。`, "ProductiveVO").filter((row) => row.trace_detail && row.trace_detail.kind === "source_linked_runtime_matcher");
    assert.equal(matches.length, 1, surface);
    assert.equal(matches[0].trace_detail.matcher_variant_id, "ProductiveVO.source_linked_verb_object_compound_seed");
    assert.equal(Array.from(matches[0].trace_detail.bindings || []).length, 0);
  }
});

test("representative unresolved legacy entries stay on the legacy ProductiveVO path", () => {
  for (const surface of ["食飯", "打電話", "打籃球"]) {
    const matches = byType(`${surface}。`, "ProductiveVO");
    assert.equal(matches.length, 1, surface);
    assert.equal(matches[0].trace_detail.kind, "generative_template");
    assert.equal(matches[0].trace_detail.matcher_variant_id, "ProductiveVO.legacy_whitelist_object_relation");
  }
});
