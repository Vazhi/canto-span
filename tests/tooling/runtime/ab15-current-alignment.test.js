"use strict";

const assert = require("assert");
const test = require("node:test");
const { loadRuntimeApi, internalConstruction, rowSurface } = require("../../lib/runtime-api");

const api = loadRuntimeApi();

function rows(source, context = null) {
  return api.diagnosticFinalRows(api.analyzeLine(source, context)).filter((row) => row.kind === "construction");
}
function find(all, type, surface = null) {
  return all.find((row) => internalConstruction(row) === type && (surface === null || rowSurface(row) === surface));
}
function allOf(all, type) {
  return all.filter((row) => internalConstruction(row) === type);
}
function trace(row) {
  return row && row.trace_detail || {};
}

// Current AB15 conformance was reviewed against main commit
// f9700e00c1ede04a6586965a68400a222c1e204b (runtime v0.5.222).
// The permanent test intentionally protects the reviewed AB15 behavior below rather
// than pinning the repository-wide runtime semver, which may advance for unrelated work.

test("AB15 exact overt core remains visible Dem + CL + N with no hidden material", () => {
  for (const [source, surface] of [["呢本書。", "呢本書"], ["嗰間餐廳。", "嗰間餐廳"]]) {
    const all = rows(source);
    const ab15 = find(all, "OvertHeadDemonstrativeClassifierNP", surface);
    assert(ab15, `missing AB15 for ${source}`);
    assert.strictEqual(rowSurface(ab15), surface);
    assert.deepStrictEqual(Array.from(trace(ab15).template || []), ["demonstrative!", "classifier!", "head_noun!"]);
    assert.deepStrictEqual(Array.from(trace(ab15).assigned_slots || []), ["demonstrative", "classifier", "head_noun"]);
    assert.deepStrictEqual(Array.from(trace(ab15).surfaces || []), Array.from(surface === "呢本書" ? ["呢", "本", "書"] : ["嗰", "間", "餐廳"]));
    assert.strictEqual(trace(ab15).trace_binding_schema, "canto-span-trace-bindings-v1");
    assert.strictEqual(trace(ab15).binding_contract_status, "complete");
    assert.deepStrictEqual(Array.from(trace(ab15).bindings || []).map((binding) => binding.slot), ["demonstrative", "classifier", "head_noun"]);
    assert(!rowSurface(ab15).includes("一"), "AB15 must not insert a hidden numeral");
  }
});

test("AB15 sibling profiles remain separately typed rather than normalized into the minimal construction", () => {
  const quantified = rows("呢三本書。");
  assert.strictEqual(allOf(quantified, "OvertHeadDemonstrativeClassifierNP").length, 0);
  const quantifiedOuter = find(quantified, "ModifiedNP", "呢三本書");
  const quantifiedInner = find(quantified, "QuantifiedClassifierNP", "三本書");
  assert(quantifiedOuter, "missing demonstrative outer NP for 呢三本書");
  assert(quantifiedInner, "missing inner quantified classifier NP for 呢三本書");
  assert.strictEqual(quantifiedInner.internal_parent || quantifiedInner.parent, "ModifiedNP");

  const headless = rows("呢個。");
  assert.strictEqual(allOf(headless, "OvertHeadDemonstrativeClassifierNP").length, 0);
  assert(find(headless, "HeadlessDemonstrativeClassifierNP", "呢個"));

  const bare = rows("本書。");
  assert.strictEqual(allOf(bare, "OvertHeadDemonstrativeClassifierNP").length, 0);
  assert(find(bare, "ModifiedNP", "本書"));

  const numeral = rows("三本書。");
  assert.strictEqual(allOf(numeral, "OvertHeadDemonstrativeClassifierNP").length, 0);
  assert(find(numeral, "QuantifiedClassifierNP", "三本書"));

  const missingClassifier = rows("呢書。");
  assert.strictEqual(allOf(missingClassifier, "OvertHeadDemonstrativeClassifierNP").length, 0);
});

test("modifier-bearing NP remains outside AB15 while preserving the complete source span", () => {
  const source = "嗰間新開嘅意大利餐廳。";
  const all = rows(source);
  assert.strictEqual(allOf(all, "OvertHeadDemonstrativeClassifierNP").length, 0);
  const outer = find(all, "ModifierNP", "嗰間新開嘅意大利餐廳");
  assert(outer, "current broader modifier-bearing NP owner missing");
  const nested = find(all, "ModifiedNP", "嗰間新開嘅意大利");
  assert(nested, "current nested modifier-bearing NP component missing");
  assert.strictEqual(nested.internal_parent || nested.parent, "ModifierNP");
  assert.strictEqual(rowSurface(outer), "嗰間新開嘅意大利餐廳");
  assert.strictEqual(trace(outer).trace_binding_schema, "canto-span-trace-bindings-v1");
  assert.strictEqual(trace(outer).binding_contract_status, "complete");
  assert.strictEqual(trace(outer).construction_provenance.source_surface, "嗰間新開嘅意大利餐廳");
});
