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

test("AA11 exposes an exact bounded 變成 + 點 matcher contract", () => {
  const rows = rowsOfType("變成點？", "ChangeIntoPredicate");
  assert.equal(rows.length, 1);
  const row = rows[0];
  const trace = row.trace_detail;
  assert.equal(rowSurface(row), "變成點");
  assert.equal(trace.template_family, "construction_template");
  assert.equal(trace.structural_scope, "vp");
  assert.equal(trace.rule, "exact adjacent 變成 + 點");
  assert.deepEqual(Array.from(trace.constraints.slot_surface_in.change_verb), ["變成"]);
  assert.deepEqual(Array.from(trace.constraints.slot_surface_in.result_complement), ["點"]);
  assert.equal(trace.constraints.exact_adjacent_surface, true);
  assert.equal(trace.result_profile, "dim_result_state_or_outcome_wh");
  assert.equal(trace.binding_contract_status, "complete");
});

test("AA11 span excludes subject, higher modal, and final particle", () => {
  const subjectRow = rowsOfType("佢變成點？", "ChangeIntoPredicate")[0];
  assert(subjectRow);
  assert.equal(rowSurface(subjectRow), "變成點");
  assert.equal(subjectRow.trace_detail.construction_provenance.source_span.start, 1);
  assert.equal(subjectRow.trace_detail.construction_provenance.source_span.end, 4);

  const modalRows = rowsOfType("成個社會會變成點呀？", "ChangeIntoPredicate");
  assert.equal(modalRows.length, 1);
  assert.equal(rowSurface(modalRows[0]), "變成點");
  assert.equal(modalRows[0].internal_parent || modalRows[0].parent, "ModalVP");
});

test("AA11 remains the narrow inner VP inside an independently typed cognition embedding frame", () => {
  const source = "我知成個社會會變成點。";
  const rows = constructionRows(source);
  const aa11 = rows.filter((row) => internalConstruction(row) === "ChangeIntoPredicate");
  const cognition = rows.filter((row) => internalConstruction(row) === "CognitionContentFrame");

  assert.equal(aa11.length, 1);
  assert.equal(rowSurface(aa11[0]), "變成點");
  assert.equal(aa11[0].trace_detail.structural_scope, "vp");
  assert.equal(aa11[0].trace_detail.binding_contract_status, "complete");
  assert.equal(cognition.length, 1, "expected independently typed CognitionContentFrame embedding");
  assert.ok(rowSurface(cognition[0]).includes("成個社會會變成點"));

  const innerSpan = aa11[0].trace_detail.construction_provenance.source_span;
  const outerSpan = cognition[0].trace_detail.construction_provenance.source_span;
  assert.ok(outerSpan.start <= innerSpan.start);
  assert.ok(outerSpan.end >= innerSpan.end);
  assert.ok(outerSpan.start < innerSpan.start || outerSpan.end > innerSpan.end);
});

test("AA11 does not inherit neighboring wh or lexical result complements", () => {
  for (const source of [
    "佢會變成點樣？",
    "佢會變成乜嘢？",
    "佢會變成點樣嘅人？",
    "佢變成老師。",
    "佢變成咗老師。",
    "佢變咗做老師。",
    "佢變緊做老師。",
    "佢成為咗老師。",
    "佢變高咗。",
  ]) {
    assert.equal(rowsOfType(source, "ChangeIntoPredicate").length, 0, source);
  }
});

test("AA11 requires overt adjacent 點 and does not match through interveners", () => {
  for (const source of [
    "佢會變成？",
    "佢會變成快啲點？",
  ]) {
    assert.equal(rowsOfType(source, "ChangeIntoPredicate").length, 0, source);
  }
});
