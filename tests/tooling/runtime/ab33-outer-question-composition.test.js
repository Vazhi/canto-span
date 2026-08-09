"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const { loadRuntimeApi } = require("../../lib/runtime-api");

const api = loadRuntimeApi();

function rowsFor(source) {
  return api.diagnosticFinalRows(api.analyzeLine(source));
}

function constructions(rows) {
  return rows.filter((row) => row.kind === "construction").map((row) => row.construction || row.internal_construction || "");
}

function reconstructedSurface(rows) {
  return rows.filter((row) => Number(row.depth || 0) === 0).map((row) => row.surface || row.display_surface || "").join("");
}

function assertOuterQuestion(source, construction) {
  const rows = rowsFor(source);
  const types = constructions(rows);
  assert.ok(types.includes(construction), `${source}: expected ${construction}`);
  assert.equal(types.includes("PreferenceVP"), false, `${source}: AB33 PreferenceVP must remain absent`);
  assert.equal(
    rows.some((row) => row.kind === "construction" && row.construction === "ModifierNP" && String(row.surface || "").startsWith("鍾意")),
    false,
    `${source}: outer question must not certify a ModifierNP preference predicate`,
  );
  assert.equal(reconstructedSurface(rows), source, `${source}: diagnostic surface must be preserved exactly once`);
  return rows;
}

test("copular A-not-A preserves reviewed preference composition without ModifierNP certification", () => {
  const profiles = new Map([
    ["係唔係每個學生都鍾意睇電視呀？", "每 + subject + 都 + 鍾意 + typed VP"],
    ["係唔係每個學生都鍾意音樂呀？", "每 + subject + 都 + 鍾意 + typed NP"],
    ["係唔係每個學生都鍾意咗個學生呀？", "每 + subject + 都 + 鍾意 + 咗 + typed NP"],
    ["係唔係每個學生都鍾意燒鵝定係燒鴨多啲呀？", "每 + subject + 都 + 鍾意 + alternative material + 定係 + alternative material + 多啲"],
  ]);
  for (const [source, expectedRule] of profiles) {
    const rows = assertOuterQuestion(source, "CopularANotAQuestion");
    const boundedClause = rows.find((row) => row.kind === "construction" && row.construction === "SubjectPredicateClause");
    assert.ok(boundedClause, `${source}: expected bounded SubjectPredicateClause complement`);
    assert.equal(boundedClause.trace_detail.template_family, "construction_template");
    assert.equal(boundedClause.trace_detail.template_subtype, "copular_a_not_a_bounded_complement");
    assert.equal(boundedClause.trace_detail.rule, expectedRule);
    assert.equal(boundedClause.trace_detail.binding_contract_status, "complete");
  }
});

test("first-syllable preference A-not-A preserves typed and alternative-scalar complements outside AB33", () => {
  for (const source of [
    "你鍾唔鍾意睇戲呀？",
    "你鍾唔鍾意音樂呀？",
    "你鍾唔鍾意燒鵝定係燒鴨多啲呀？",
  ]) {
    assertOuterQuestion(source, "ANotAQuestion");
  }
});

test("malformed trailing material is still rejected", () => {
  const rows = rowsFor("你鍾唔鍾意食飯你呀？");
  assert.equal(constructions(rows).includes("ANotAQuestion"), false);
});

test("narrow AB33 core remains unchanged", () => {
  const vpRows = rowsFor("我鍾意食飯。");
  assert.ok(constructions(vpRows).includes("PreferenceVP"));

  const npRows = rowsFor("我鍾意音樂。");
  assert.equal(constructions(npRows).includes("PreferenceVP"), false);
});
