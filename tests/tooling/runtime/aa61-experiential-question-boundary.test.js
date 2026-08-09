"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { loadRuntimeApi, internalConstruction, rowSurface } = require("../../lib/runtime-api");

const api = loadRuntimeApi();

function constructionRows(source, contextSource = null) {
  return api.diagnosticFinalRows(api.analyzeLine(source, contextSource))
    .filter((row) => row.kind === "construction");
}

function rowsOfType(source, type, contextSource = null) {
  return constructionRows(source, contextSource).filter((row) => internalConstruction(row) === type);
}

test("AA61 overt-object template is bounded to final 未 and an overt typed experiential domain", () => {
  const rows = rowsOfType("你飲過茶未？", "ExperientialQuestion");
  assert.equal(rows.length, 1);
  assert.equal(rowSurface(rows[0]), "你飲過茶未");
  assert.equal(rows[0].trace_detail.template_family, "construction_template");
  assert.deepEqual(rows[0].trace_detail.constraints.slot_surface_in, { question_marker: ["未"] });
  assert.deepEqual(rows[0].trace_detail.constraints.slot_must_have_any_slots, {
    experiential_vp: ["object", "goal", "location"],
  });
  assert.equal(rows[0].trace_detail.structural_scope, "clause");
  assert(rowsOfType("你飲過茶未？", "TransitiveVP").some((row) => rowSurface(row) === "飲過茶"));
});

test("AA61 supports typed motion-goal experiential material without surface-only 過 inference", () => {
  const rows = rowsOfType("你去過美國未呀？", "ExperientialQuestion");
  assert.equal(rows.length, 1);
  assert.equal(rowSurface(rows[0]), "你去過美國未呀");
  assert(rowsOfType("你去過美國未呀？", "ExperientialMotionGoalVP").length > 0);
});

test("AA61 objectless 食過未 requires explicit compatible discourse and inserts no hidden object", () => {
  assert.equal(rowsOfType("你食過未？", "ExperientialQuestion").length, 0);
  const unresolved = rowsOfType("你食過未？", "NeedsContext");
  assert.equal(unresolved.length, 1);
  assert.equal(unresolved[0].trace_detail.candidate_construction_type, "ExperientialQuestion");
  assert.equal(unresolved[0].trace_detail.context_requirement_status, "context_required");

  const linked = rowsOfType("你食過未？", "ExperientialQuestion", "頭先講緊食飯。");
  assert.equal(linked.length, 1);
  const trace = linked[0].trace_detail;
  assert.equal(trace.context_requirement_status, "context_licensed");
  assert.equal(trace.event_head_surface, "食");
  assert.equal(trace.event_domain_antecedent_surface, "飯");
  assert.equal(trace.hidden_object_insertion, false);
  assert.equal(trace.source_backed_short_profile, "SRC-WFB-K3-NOODLES-2025");
  assert.equal(trace.structural_scope, "clause");
  assert.equal(rowSurface(linked[0]), "你食過未");
});

test("AA61 does not treat arbitrary supplied context or unsupported short verbs as discourse license", () => {
  assert.equal(rowsOfType("你食過未？", "ExperientialQuestion", "我今日返屋企。").length, 0);
  assert.equal(rowsOfType("你去過未？", "ExperientialQuestion", "頭先講緊去美國。").length, 0);
});

test("AA61 rejects completion and unrelated/intervening/tail collisions", () => {
  for (const source of [
    "你食咗飯未？",
    "你飲過茶琴日未？",
    "你飲過茶我返屋企未？",
    "你飲過茶未今日？",
    "我未去過美國。",
    "你有冇去過澳門呀？",
  ]) {
    assert.equal(rowsOfType(source, "ExperientialQuestion").length, 0, source);
  }
});
