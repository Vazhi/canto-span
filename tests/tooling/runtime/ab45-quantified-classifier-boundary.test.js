"use strict";

const assert = require("assert");
const test = require("node:test");
const { loadRuntimeApi, internalConstruction, rowSurface } = require("../../lib/runtime-api");

const api = loadRuntimeApi();

function rows(source, context = null) {
  return api.diagnosticFinalRows(api.analyzeLine(source, context)).filter((row) => row.kind === "construction");
}
function find(all, type, surface) {
  return all.find((row) => internalConstruction(row) === type && (!surface || rowSurface(row) === surface));
}
function allOf(all, type) {
  return all.filter((row) => internalConstruction(row) === type);
}
function trace(row) { return row && row.trace_detail || {}; }

const overtCases = [
  ["三本書。", "三本書", "verified_compatible"],
  ["兩間屋。", "兩間屋", "verified_compatible"],
  ["三隻貓。", "三隻貓", "verified_compatible"],
  ["兩個老師。", "兩個老師", null],
];

test("AB45 overt core is numeral + classifier-class unit + overt noun", () => {
  for (const [source, surface, compatibility] of overtCases) {
    const all = rows(source);
    const qcn = find(all, "QuantifiedClassifierNP", surface);
    assert(qcn, `missing AB45 for ${source}`);
    assert.deepStrictEqual(Array.from(trace(qcn).template || []), ["quantity!", "classifier!", "head_noun!"]);
    assert.deepStrictEqual(JSON.parse(JSON.stringify(trace(qcn).constraints.slot_first_token_syntax_must_include_any)), { quantity: ["numeral"] });
    assert(Array.isArray(trace(qcn).constraints.slot_surface_in.classifier));
    assert(!trace(qcn).constraints.slot_surface_in.classifier.includes("杯"));
    assert(!trace(qcn).constraints.slot_surface_in.classifier.includes("碗"));
    if (compatibility) assert.strictEqual(trace(qcn).classifier_head_compatibility_status, compatibility);
  }
});

test("AB45 remains narrow inside demonstrative composition", () => {
  const all = rows("呢三本書。");
  const outer = find(all, "ModifiedNP", "呢三本書");
  const inner = find(all, "QuantifiedClassifierNP", "三本書");
  assert(outer, "demonstrative outer NP missing");
  assert(inner, "narrow AB45 child missing");
  assert.strictEqual(inner.internal_parent || inner.parent, "ModifiedNP");
  assert(!allOf(all, "QuantifiedClassifierNP").some((row) => rowSurface(row) === "呢三本書"));
});

test("context-free Num-CL ellipsis is NeedsContext; compatible discourse licenses it without a hidden noun", () => {
  for (const source of ["一個。", "兩部。", "一個咋。", "得一個咋。"]) {
    const all = rows(source);
    const wrapper = find(all, "NeedsContext");
    const qcn = find(all, "QuantifiedClassifierNP");
    assert(wrapper, `NeedsContext missing for ${source}`);
    assert(qcn, `typed AB45 ellipsis candidate missing for ${source}`);
    assert.strictEqual(trace(wrapper).context_requirement_status, "context_required");
    assert.deepStrictEqual(Array.from(trace(wrapper).missing_argument_slots || []), ["nominal_head"]);
    assert.strictEqual(trace(qcn).fragment_subtype, "quantified_classifier_head_ellipsis");
    assert.strictEqual(trace(qcn).np_license_status, "provisional_np_candidate");
    assert.strictEqual(trace(qcn).construction_licensing_allowed, false);
    assert(!trace(qcn).surfaces.some((surface) => !["一", "兩", "個", "部"].includes(surface)), "ellipsis candidate should expose only overt Num-CL material");
    assert(trace(wrapper).not_claims.includes("not_fabricated_nominal_head"));
  }

  const licensed = rows("兩本。", "我有三本書。");
  const qcn = find(licensed, "QuantifiedClassifierNP", "兩本");
  assert(qcn, "context-licensed AB45 missing");
  assert.strictEqual(trace(qcn).context_requirement_status, "context_licensed");
  assert.strictEqual(trace(qcn).antecedent_status, "linked");
  assert.strictEqual(trace(qcn).np_license_status, "licensed_np");
  assert.strictEqual(trace(qcn).construction_licensing_allowed, true);
  assert.strictEqual(trace(qcn).structural_np_status, "context_licensed_head_ellipsis");
  assert.deepStrictEqual(Array.from(trace(qcn).missing_argument_slots || []), ["nominal_head"]);
  assert(trace(qcn).not_claims.includes("not_fabricated_nominal_head"));
  assert.strictEqual(find(licensed, "NeedsContext"), undefined);
});

test("incompatible or mismatched discourse does not license AB45 ellipsis", () => {
  for (const [source, context] of [
    ["兩個。", "我有三本書。"],
    ["兩本。", "我有三個人。"],
    ["兩本。", "我有三本水。"],
  ]) {
    const all = rows(source, context);
    const wrapper = find(all, "NeedsContext");
    const qcn = find(all, "QuantifiedClassifierNP");
    assert(wrapper, `NeedsContext missing for ${context} -> ${source}`);
    assert(qcn, `nested candidate missing for ${context} -> ${source}`);
    assert.strictEqual(trace(wrapper).context_requirement_status, "context_incompatible");
    assert.notStrictEqual(trace(qcn).np_license_status, "licensed_np");
  }
});

test("measure, dimension, wh quantity, and bare numeral profiles remain outside AB45", () => {
  const excluded = [
    ["三杯茶。", "QuantityNP"],
    ["兩碗飯。", "QuantityNP"],
    ["飲七杯。", null],
    ["三歲。", null],
    ["五百呎。", null],
    ["呢句有幾多個字？", "QuantityNP"],
    ["兩。", null],
  ];
  for (const [source, alternative] of excluded) {
    const all = rows(source);
    assert.strictEqual(allOf(all, "QuantifiedClassifierNP").length, 0, `unexpected AB45 for ${source}`);
    if (alternative) assert(find(all, alternative), `expected ${alternative} for ${source}`);
  }
});

test("classifier-head incompatibility remains a lexical compatibility decision, not a syntax boundary", () => {
  for (const source of ["三本水。", "三間醫生。", "三隻餐廳。", "三本電話。", "三張水。"]) {
    const all = rows(source);
    const qcn = find(all, "QuantifiedClassifierNP");
    assert(qcn, `structural AB45 should remain visible for compatibility control ${source}`);
    assert.strictEqual(trace(qcn).classifier_head_compatibility_status, "incompatible");
    assert.strictEqual(trace(qcn).construction_licensing_allowed, false);
    assert.strictEqual(trace(qcn).downstream_argument_licensing, "blocked_by_conservative_policy");
  }
  assert.strictEqual(allOf(rows("三杯書。"), "QuantifiedClassifierNP").length, 0, "container measure 杯 is outside AB45 even in an incompatible pairing");
});
