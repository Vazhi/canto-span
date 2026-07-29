#!/usr/bin/env node
"use strict";

const assert = require("assert/strict");
const fs = require("fs");
const path = require("path");
const test = require("node:test");
const { loadRuntimeApi } = require("../../lib/runtime-api");

const root = path.resolve(__dirname, "../../..");
const api = loadRuntimeApi({
  apiNames: [
    "analyzeLine",
    "diagnosticFinalRows",
    "jyutpingAuditSummary",
    "TOKEN_LEXICON",
    "PRODUCTIVE_VO",
    "COMPOSITIONAL_LEXICAL_PHRASES",
    "JYUTPING_REVIEW_EXPECTATIONS",
    "LEARNER_SURFACE_GLOSSES",
  ],
});
const hobbyJyutping = new Map([
  ["睇戲", "tai2 hei3"],
  ["行山", "haang4 saan1"],
  ["游水", "jau4 seoi2"],
  ["跑步", "paau2 bou6"],
  ["影相", "jing2 soeng2"],
  ["聽歌", "teng1 go1"],
  ["睇書", "tai2 syu1"],
  ["打機", "daa2 gei1"],
  ["煮嘢食", "zyu2 je5 sik6"],
  ["唱K", "coeng3 kei1"],
  ["行街", "haang4 gaai1"],
  ["去沙灘", "heoi3 saa1 taan1"],
  ["做運動", "zou6 wan6 dung6"],
  ["畫畫", "waak6 waa2"],
  ["踢波", "tek3 bo1"],
  ["打波", "daa2 bo1"],
  ["彈琴", "taan4 kam4"],
  ["釣魚", "diu3 jyu4"],
  ["旅行", "leoi5 hang4"],
  ["唱歌", "coeng3 go1"],
  ["睇波", "tai2 bo1"],
  ["瑜伽", "jyu4 gaa1"],
  ["露營", "lou6 jing4"],
  ["下棋", "haa5 kei2"],
  ["行公園", "haang4 gung1 jyun2"],
]);
const numberJyutping = new Map([
  ["一百萬", "jat1 baak3 maan6"],
  ["二百萬", "ji6 baak3 maan6"],
  ["三百萬", "saam1 baak3 maan6"],
  ["四百萬", "sei3 baak3 maan6"],
  ["五百萬", "ng5 baak3 maan6"],
  ["六百萬", "luk6 baak3 maan6"],
  ["七百萬", "cat1 baak3 maan6"],
  ["八百萬", "baat3 baak3 maan6"],
  ["九百萬", "gau2 baak3 maan6"],
  ["一千萬", "jat1 cin1 maan6"],
]);
const sourceForms = [...hobbyJyutping.keys(), ...numberJyutping.keys()];

function finalRows(surface) {
  return api.diagnosticFinalRows(api.analyzeLine(surface));
}

function tokenRows(surface) {
  return finalRows(surface).filter((row) => row.kind === "token");
}

function joinedJyutping(surface) {
  return tokenRows(surface)
    .map((row) => String(row.jyutping || "").trim())
    .filter(Boolean)
    .join(" ");
}

function constructions(surface) {
  return finalRows(surface)
    .filter((row) => row.kind === "construction")
    .map((row) => row.internal_construction || row.construction || row.type || "");
}

const validation = {
  schema: "canto-span-glossika-week16-runtime-lexicon-validation-v1",
  source_form_count: sourceForms.length,
  hobby_form_count: hobbyJyutping.size,
  number_form_count: numberJyutping.size,
  status: "pass",
  checks: {},
  limitations: [
    "Lexical and pronunciation coverage does not establish frequency or unrestricted productivity.",
    "Glossika's diu3 jyu2 source spelling for 釣魚 was not imported; the runtime retains 魚 jyu4.",
  ],
};

test("all 35 authorized Week 16 forms have complete runtime Jyutping", () => {
  for (const [surface, expected] of [...hobbyJyutping, ...numberJyutping]) {
    const analysis = api.analyzeLine(surface);
    const audit = api.jyutpingAuditSummary(analysis);
    assert.equal(audit.missing_jyutping_count, 0, `${surface}: missing Jyutping`);
    assert.equal(joinedJyutping(surface), expected, `${surface}: runtime Jyutping`);
  }
  validation.checks.complete_jyutping = true;
});

test("hobby phrases use reviewed project-native lexical structures", () => {
  const productive = [
    "睇戲", "游水", "跑步", "影相", "聽歌", "睇書", "打機", "煮嘢食",
    "唱K", "做運動", "踢波", "打波", "彈琴", "釣魚", "唱歌", "睇波", "下棋",
  ];
  for (const surface of productive) {
    assert.ok(api.PRODUCTIVE_VO[surface], `${surface}: PRODUCTIVE_VO entry`);
    assert.ok(constructions(surface).includes("ProductiveVO"), `${surface}: ProductiveVO output`);
  }
  for (const surface of ["行山", "行街", "畫畫", "旅行", "露營", "行公園", "瑜伽"]) {
    assert.ok(api.TOKEN_LEXICON[surface], `${surface}: atomic lexical entry`);
  }
  assert.ok(constructions("去沙灘").includes("MotionGoalVP"));
  const beach = tokenRows("去沙灘").find((row) => row.surface === "沙灘");
  assert.equal(beach && beach.role, "where");
  assert.equal(beach && beach.jyutping, "saa1 taan1");
  validation.checks.project_native_structures = true;
});

test("lexical collision boundaries remain protected", () => {
  assert.ok(!api.TOKEN_LEXICON["嘢食"], "嘢食 must remain phrase-local rather than a global atomic token");
  assert.deepEqual(Array.from(tokenRows("有冇嘢食啊？"), (row) => row.surface), ["有冇", "嘢", "食", "啊"]);
  assert.ok(!constructions("下棋").includes("TemporalClause"), "下棋 must not be parsed as a temporal clause");
  assert.equal(tokenRows("下棋").find((row) => row.surface === "下").jyutping, "haa5");
  assert.equal(api.TOKEN_LEXICON["魚"].jyutping, "jyu4", "Glossika jyu2 must not replace the reviewed fish reading");
  validation.checks.collision_boundaries = true;
});

test("reviewed reading corrections and variants are explicit", () => {
  assert.equal(api.TOKEN_LEXICON["畫"].jyutping, "waak6");
  assert.equal(api.TOKEN_LEXICON["畫畫"].jyutping, "waak6 waa2");
  assert.equal(api.TOKEN_LEXICON["公園"].jyutping, "gung1 jyun2");
  assert.deepEqual(Array.from(api.JYUTPING_REVIEW_EXPECTATIONS["公園"]), ["gung1 jyun2", "gung1 jyun4"]);
  validation.checks.reviewed_readings = true;
});

test("million entries are registered but remain compositionally visible", () => {
  for (const surface of numberJyutping.keys()) {
    assert.ok(api.TOKEN_LEXICON[surface], `${surface}: lexical registration`);
    assert.ok(api.COMPOSITIONAL_LEXICAL_PHRASES.has(surface), `${surface}: compositional guardrail`);
    assert.ok(tokenRows(surface).length >= 3, `${surface}: visible numerical components`);
  }
  validation.checks.compositional_numbers = true;
});

test("all 25 hobby surfaces have learner-facing glosses", () => {
  for (const surface of hobbyJyutping.keys()) {
    const gloss = api.LEARNER_SURFACE_GLOSSES[surface];
    assert.ok(Array.isArray(gloss) && gloss.length >= 1 && gloss[0], `${surface}: learner gloss`);
  }
  validation.checks.learner_glosses = true;
});

test.after(() => {
  const outputDir = path.join(root, "validation", "current");
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(
    path.join(outputDir, "glossika-week16-runtime-lexicon.json"),
    JSON.stringify(validation, null, 2) + "\n"
  );
});
