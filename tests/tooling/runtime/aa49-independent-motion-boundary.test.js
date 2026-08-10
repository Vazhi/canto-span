"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { loadRuntimeApi, internalConstruction, rowSurface } = require("../../lib/runtime-api");

const api = loadRuntimeApi();

function constructionRows(source) {
  return api.diagnosticFinalRows(api.analyzeLine(source))
    .filter((row) => row.kind === "construction");
}

function rowsOfType(source, type) {
  return constructionRows(source).filter((row) => internalConstruction(row) === type);
}

function assertNoAA49(source) {
  assert.equal(rowsOfType(source, "DirectionalMotionVP").length, 0, source);
}

test("AA49 remains a one-word independent motion predicate inside goal and aspect structure", () => {
  const go = rowsOfType("我去香港。", "DirectionalMotionVP");
  assert.equal(go.length, 1);
  assert.equal(rowSurface(go[0]), "去");
  assert.equal(go[0].internal_parent || go[0].parent, "MotionGoalVP");
  const goSpan = go[0].trace_detail.construction_provenance.source_span;
  assert.equal(goSpan.status, "unique");
  assert.equal(goSpan.start, 1);
  assert.equal(goSpan.end, 2);
  assert.equal(goSpan.relative_to, "raw_source");

  const down = rowsOfType("佢落咗樓下。", "DirectionalMotionVP");
  assert.equal(down.length, 1);
  assert.equal(rowSurface(down[0]), "落");
  assert.equal(down[0].internal_parent || down[0].parent, "MotionGoalVP");
  assert.equal(down[0].trace_detail.aa49_scope, "single_independent_motion_predicate");

  const leave = rowsOfType("架車走咗。", "DirectionalMotionVP");
  assert.equal(leave.length, 1);
  assert.equal(rowSurface(leave[0]), "走");
  assert.equal(leave[0].internal_parent || leave[0].parent, "PerfectiveVP");
  assert.equal(leave[0].trace_detail.aa49_scope, "single_independent_motion_predicate");
});

test("AA49 does not own multi-part or manner-directional profiles", () => {
  for (const source of [
    "返嚟。", "返去。", "上嚟。", "落嚟。",
    "我上去。", "我落嚟。", "我返嚟。", "我返去。",
    "行入去。", "行出嚟。", "行返過嚟。",
  ]) assertNoAA49(source);

  assert.equal(rowsOfType("行入去。", "DirectedMannerMotionVP").length, 1);
  assert.equal(rowsOfType("行出嚟。", "DirectedMannerMotionVP").length, 1);
  assert.equal(rowsOfType("行返過嚟。", "DirectedMannerMotionVP").length, 1);
  assert.equal(rowsOfType("上嚟。", "TemporalClause").length, 0, "上嚟 must not fall into the temporal fallback");
  assert.equal(rowsOfType("行返過嚟。", "ExperientialVP").length, 0, "path 過 must not become experiential 過");
});

test("postverbal return-direction material remains a neighboring complement, not AA49", () => {
  for (const source of [
    "寄返去。",
    "攞返嚟。",
    "我攞本書返嚟畀你睇。",
    "我帶咗三部機去啊。",
  ]) assertNoAA49(source);

  assert.equal(rowsOfType("寄返去。", "VerbComplementVP").length, 1);
  assert.equal(rowsOfType("攞返嚟。", "VerbComplementVP").length, 1);
  assert.equal(rowsOfType("我攞本書返嚟畀你睇。", "VerbComplementVP").length, 1);
});

test("outer modifier, particle, and environmental owners retain precedence", () => {
  assert.equal(rowsOfType("快啲行上去啦。", "DegreeMannerModifiedVP").length, 1);
  assert.equal(rowsOfType("快啲行上去啦。", "DirectedMannerMotionVP").length, 1);
  assertNoAA49("快啲行上去啦。");

  const directive = rowsOfType("你走啦。", "DirectionalMotionVP");
  assert.equal(directive.length, 1);
  assert.equal(rowSurface(directive[0]), "走");
  assert.equal(rowsOfType("你走啦。", "DiscourseParticleFrame").length, 1);

  assertNoAA49("聽日會落雨。");
  assertNoAA49("會唔會落雨？");
  assert.equal(rowsOfType("聽日會落雨。", "ImpersonalEnvironmentalClause").length, 1);
  assert.equal(rowsOfType("會唔會落雨？", "ImpersonalEnvironmentalClause").length, 1);
});

test("non-motion 嚟 and reviewed historical overreach do not regain AA49 through surface matching", () => {
  for (const source of [
    "圖書館係乜嘢嚟㗎。",
    "呢個用嚟切嘢。",
    "佢會返嚟啩。",
    "我落嚟摘芒果食。",
    "落嚟摘芒果食。",
  ]) assertNoAA49(source);
});
