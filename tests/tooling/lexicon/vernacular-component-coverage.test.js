#!/usr/bin/env node
"use strict";
const assert = require("node:assert/strict");
const test = require("node:test");
const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const tokenLexicon = Object.fromEntries(tokenEntries);
const { READINGS, applyVernacularComponentCoverage } = require("../../../src/runtime-resources/lexicon/token-lexicon/vernacular-component-coverage");
const { buildLexicalAnalysisIndex } = require("../../../src/runtime-resources/lexicon/lexical-analyses");

test("source-backed vernacular reading batch contains exactly 284 simple single-character readings", () => {
  assert.equal(Object.keys(READINGS).length, 284);
  for (const [surface, jyutping] of Object.entries(READINGS)) {
    assert.equal(Array.from(surface).length, 1, `${surface}: single-character component`);
    assert.match(jyutping, /^[a-z]+[1-6]$/u, `${surface}: simple Jyutping`);
    assert.ok(tokenLexicon[surface], `${surface}: runtime entry exists`);
    assert.ok(tokenLexicon[surface].jyutping, `${surface}: runtime has a reading`);
  }
});

test("reading overlay preserves richer pre-existing readings", () => {
  const sample = [["世", { label: "what", pos: "noun", syntax: "common_noun", jyutping: "KEEP", note: "existing" }]];
  const out = Object.fromEntries(applyVernacularComponentCoverage(sample));
  assert.equal(out["世"].jyutping, "KEEP");
  assert.equal(out["世"].pos, "noun");
});

test("咧 preserves both supported Cantonese particle readings", () => {
  const analyses = buildLexicalAnalysisIndex(tokenEntries);
  assert.deepEqual(new Set((analyses["咧"] || []).map((row) => row.jyutping)), new Set(["le4", "le5"]));
  assert.ok((analyses["咧"] || []).every((row) => row.pos === "particle"));
});

test("strong source split batch fills only the three audited missing readings", () => {
  const analyses = buildLexicalAnalysisIndex(tokenEntries);

  assert.deepEqual(new Set((analyses["嘅"] || []).map((row) => row.jyutping)), new Set(["ge2", "ge3"]));
  const ge2 = (analyses["嘅"] || []).find((row) => row.id === "lex:嘅:doubt_question_particle_ge2");
  assert.ok(ge2);
  assert.equal(ge2.pos, "particle");
  assert.equal(ge2.syntax, "sentence_final_doubt_or_question_particle");

  assert.deepEqual(new Set((analyses["呀"] || []).map((row) => row.jyutping)), new Set(["aa1", "aa3"]));
  assert.ok((analyses["呀"] || []).some((row) => row.pos === "interjection" && row.jyutping === "aa1"));
  assert.ok((analyses["呀"] || []).some((row) => row.pos === "particle" && row.jyutping === "aa3"));

  assert.deepEqual(new Set((analyses["會"] || []).map((row) => row.jyutping)), new Set(["wui2", "wui5", "wui6"]));
  assert.equal((analyses["會"] || []).find((row) => row.id === "lex:會:meeting_noun").jyutping, "wui2");
  assert.equal((analyses["會"] || []).find((row) => row.id === "lex:會:assemble_verb").jyutping, "wui6");
});

test("verified bundled-reading batch adds seven missing Cantonese readings without replacing defaults", () => {
  const analyses = buildLexicalAnalysisIndex(tokenEntries);
  const readings = (surface) => new Set((analyses[surface] || []).map((row) => row.jyutping));

  assert.deepEqual(readings("行"), new Set(["haang4", "hang4", "hong4", "hang6"]));
  assert.equal((analyses["行"] || [])[0].id, "lex:行:default");
  assert.equal((analyses["行"] || [])[0].jyutping, "haang4");
  assert.ok((analyses["行"] || []).some((row) => row.id === "lex:行:industry_noun_hong4" && row.pos === "noun"));
  assert.ok((analyses["行"] || []).some((row) => row.id === "lex:行:row_classifier_hong4" && row.pos === "classifier"));
  assert.ok((analyses["行"] || []).some((row) => row.id === "lex:行:conduct_bound_hang6" && row.pos === "bound"));

  assert.deepEqual(readings("知"), new Set(["zi1", "zi3"]));
  assert.equal((analyses["知"] || [])[0].jyutping, "zi1");
  assert.ok((analyses["知"] || []).some((row) => row.id === "lex:知:knowledge_bound_zi3" && row.pos === "bound"));

  assert.deepEqual(readings("難"), new Set(["naan4", "naan6"]));
  assert.equal((analyses["難"] || [])[0].jyutping, "naan4");
  assert.ok((analyses["難"] || []).some((row) => row.id === "lex:難:calamity_bound_naan6" && row.pos === "bound"));

  assert.deepEqual(readings("兩"), new Set(["loeng2", "loeng5"]));
  assert.equal((analyses["兩"] || [])[0].jyutping, "loeng5");
  assert.ok((analyses["兩"] || []).some((row) => row.id === "lex:兩:tael_measure_loeng2" && row.pos === "classifier"));

  assert.deepEqual(readings("咋"), new Set(["zaa3", "zaa4"]));
  assert.equal((analyses["咋"] || [])[0].jyutping, "zaa3");
  assert.ok((analyses["咋"] || []).some((row) => row.id === "lex:咋:rhetorical_final_particle_zaa4" && row.pos === "particle"));
});

test("first whole-form batch adds four independently supported lexical defaults", () => {
  const expected = {
    "爸": ["baa4", "noun"],
    "阿爸": ["aa3 baa4", "noun"],
    "打算": ["daa2 syun3", "verb"],
    "由於": ["jau4 jyu1", "preposition"],
  };
  for (const [surface, [jyutping, pos]] of Object.entries(expected)) {
    assert.ok(tokenLexicon[surface], `${surface}: exact lexical entry exists`);
    assert.equal(tokenLexicon[surface].jyutping, jyutping, `${surface}: reviewed default reading`);
    assert.equal(tokenLexicon[surface].pos, pos, `${surface}: reviewed default POS`);
  }
  assert.notEqual(tokenLexicon["爸"].jyutping, "ba1", "爸: Sheet romanization does not override verified vernacular baa4");
  assert.ok(tokenLexicon["一陣"], "一陣: pre-existing exact lexical coverage remains available");
});

test("informal 地 spellings map to the canonical plural-pronoun analyses", () => {
  const pairs = [
    ["我地", "我哋"],
    ["你地", "你哋"],
    ["佢地", "佢哋"],
  ];
  for (const [variant, canonical] of pairs) {
    assert.ok(tokenLexicon[variant], `${variant}: informal orthographic variant is covered`);
    assert.ok(tokenLexicon[canonical], `${canonical}: canonical pronoun remains covered`);
    assert.equal(tokenLexicon[variant].jyutping, tokenLexicon[canonical].jyutping, `${variant}: same pronunciation as ${canonical}`);
    assert.equal(tokenLexicon[variant].syntax, tokenLexicon[canonical].syntax, `${variant}: same pronoun syntax as ${canonical}`);
    assert.equal(tokenLexicon[variant].label, tokenLexicon[canonical].label, `${variant}: same learner role as ${canonical}`);
    assert.match(tokenLexicon[variant].note, /variant/i, `${variant}: explicitly marked as an orthographic variant`);
  }
});

test("verified top-2000 lexical batch fills common whole-form and component gaps", () => {
  const expected = {
    "老婆": ["lou5 po4", "who", "noun"],
    "父母": ["fu6 mou5", "who", "noun"],
    "警察": ["ging2 caat3", "who", "noun"],
    "兄弟": ["hing1 dai6", "who", "noun"],
    "心情": ["sam1 cing4", "what", "noun"],
    "應承": ["jing1 sing4", "doing", "verb"],
    "今朝": ["gam1 ziu1", "when", "noun"],
    "尋晚": ["cam4 maan5", "when", "noun"],
    "即時": ["zik1 si4", "how", "adjective"],
    "媽": ["maa1", "who", "noun"],
    "紅": ["hung4", "like", "adjective"],
    "球": ["kau4", "what", "noun"],
  };
  for (const [surface, [jyutping, label, pos]] of Object.entries(expected)) {
    assert.ok(tokenLexicon[surface], `${surface}: exact lexical coverage exists`);
    assert.equal(tokenLexicon[surface].jyutping, jyutping, `${surface}: verified reading`);
    assert.equal(tokenLexicon[surface].label, label, `${surface}: learner role`);
    assert.equal(tokenLexicon[surface].pos, pos, `${surface}: lexical category`);
  }
});

test("source-attested spelling variants inherit the canonical lexical analysis", () => {
  const pairs = [
    ["乜野", "乜嘢"],
    ["人地", "人哋"],
    ["中意", "鍾意"],
  ];
  for (const [variant, canonical] of pairs) {
    assert.ok(tokenLexicon[variant], `${variant}: variant is covered`);
    assert.ok(tokenLexicon[canonical], `${canonical}: canonical form remains covered`);
    assert.equal(tokenLexicon[variant].jyutping, tokenLexicon[canonical].jyutping, `${variant}: reading matches canonical form`);
    assert.equal(tokenLexicon[variant].label, tokenLexicon[canonical].label, `${variant}: learner role matches canonical form`);
    assert.equal(tokenLexicon[variant].syntax, tokenLexicon[canonical].syntax, `${variant}: syntax matches canonical form`);
    assert.match(tokenLexicon[variant].note, /variant/i, `${variant}: explicitly documented as a spelling variant`);
  }
});

test("corrected final lexical tail preserves only independently supported alternatives", () => {
  const analyses = buildLexicalAnalysisIndex(tokenEntries);
  const rows = (surface) => analyses[surface] || [];
  const readings = (surface) => new Set(rows(surface).map((row) => row.jyutping));
  const pos = (surface) => new Set(rows(surface).map((row) => row.pos));

  assert.equal(tokenLexicon["簿"].jyutping, "bou2", "簿: bou2 remains the useful standalone default");
  assert.deepEqual(readings("簿"), new Set(["bou2", "bou6"]));
  assert.deepEqual(pos("簿"), new Set(["noun"]));

  assert.deepEqual(readings("粒"), new Set(["nap1", "lap1"]));
  assert.deepEqual(pos("粒"), new Set(["classifier"]));

  assert.deepEqual(readings("超"), new Set(["ciu1", "ciu2"]));
  for (const category of ["adverb", "verb", "interjection", "noun"]) {
    assert.ok(pos("超").has(category), `超: ${category} analysis`);
  }

  assert.deepEqual(pos("米"), new Set(["classifier", "noun"]));
  assert.deepEqual(readings("米"), new Set(["mai5"]));

  assert.deepEqual(pos("堆"), new Set(["classifier", "noun", "verb"]));
  assert.deepEqual(readings("堆"), new Set(["deoi1"]));

  assert.deepEqual(readings("哎吔"), new Set(["ai1 jaa1", "ai1 jaa3", "ai1 jaa5", "ai1 jaak3", "ai1 jaa6"]));
  assert.ok(pos("哎吔").has("interjection"));
  assert.ok(rows("哎吔").some((row) => row.id === "lex:哎吔:nonliteral_kinship_modifier" && row.pos === "adjective"));
});


test("verified multi-character lexical batch preserves dictionary-level lexicalization", () => {
  const analyses = buildLexicalAnalysisIndex(tokenEntries);
  const expected = {
    "一早": ["jat1 zou2", "adverb"],
    "一時": ["jat1 si4", "adverb"],
    "幫手": ["bong1 sau2", "verb"],
    "好意": ["hou2 ji3", "noun"],
    "好好": ["hou2 hou2", "adverb"],
    "裏面": ["leoi5 min6", "noun"],
  };
  for (const [surface, [jyutping, pos]] of Object.entries(expected)) {
    assert.ok(tokenLexicon[surface], `${surface}: exact lexical coverage exists`);
    assert.equal(tokenLexicon[surface].jyutping, jyutping, `${surface}: reading`);
    assert.equal(tokenLexicon[surface].pos, pos, `${surface}: default POS`);
  }

  assert.deepEqual(new Set((analyses["一時"] || []).map((row) => row.pos)), new Set(["adverb", "conjunction"]));
  assert.deepEqual(new Set((analyses["一時"] || []).map((row) => row.jyutping)), new Set(["jat1 si4"]));
  assert.deepEqual(new Set((analyses["幫手"] || []).map((row) => row.pos)), new Set(["verb", "noun"]));
  assert.deepEqual(new Set((analyses["幫手"] || []).map((row) => row.jyutping)), new Set(["bong1 sau2"]));
});


test("嚟講 preserves its dedicated perspective expression and both attested readings", () => {
  const analyses = buildLexicalAnalysisIndex(tokenEntries);
  assert.ok(tokenLexicon["嚟講"], "嚟講: exact lexicalized perspective expression exists");
  assert.equal(tokenLexicon["嚟講"].jyutping, "lai4 gong2");
  assert.equal(tokenLexicon["嚟講"].syntax, "perspective_topic_frame_marker");
  assert.deepEqual(new Set((analyses["嚟講"] || []).map((row) => row.jyutping)), new Set(["lai4 gong2", "lei4 gong2"]));
  assert.ok((analyses["嚟講"] || []).every((row) => row.pos === "function"));
});


test("locative 道 spellings inherit the canonical 度 analyses", () => {
  for (const [variant, canonical] of [["呢道", "呢度"], ["嗰道", "嗰度"]]) {
    assert.ok(tokenLexicon[variant], `${variant}: spelling variant is covered`);
    assert.ok(tokenLexicon[canonical], `${canonical}: canonical spelling remains covered`);
    assert.equal(tokenLexicon[variant].jyutping, tokenLexicon[canonical].jyutping, `${variant}: reading matches ${canonical}`);
    assert.equal(tokenLexicon[variant].label, tokenLexicon[canonical].label, `${variant}: learner role matches ${canonical}`);
    assert.equal(tokenLexicon[variant].syntax, tokenLexicon[canonical].syntax, `${variant}: locative syntax matches ${canonical}`);
    assert.match(tokenLexicon[variant].note, /variant/i);
  }
});


test("好意思 closes the final in-scope functional top-2000 lexical gap", () => {
  const analyses = buildLexicalAnalysisIndex(tokenEntries);
  assert.ok(tokenLexicon["好意思"], "好意思: exact lexicalized rhetorical expression exists");
  assert.equal(tokenLexicon["好意思"].jyutping, "hou2 ji3 si1");
  assert.equal(tokenLexicon["好意思"].pos, "adverb");
  assert.equal(tokenLexicon["好意思"].syntax, "rhetorical_shame_or_nerve_adverb");
  assert.deepEqual(new Set((analyses["好意思"] || []).map((row) => row.jyutping)), new Set(["hou2 ji3 si1", "hou2 ji3 si3"]));
  assert.ok((analyses["好意思"] || []).every((row) => row.pos === "adverb"));
});


test("independent pronunciation-quality batch preserves spoken defaults and supported variants", () => {
  const analyses = buildLexicalAnalysisIndex(tokenEntries);
  const readings = (surface) => new Set((analyses[surface] || []).map((row) => row.jyutping));

  assert.equal(tokenLexicon["爸爸"].jyutping, "baa4 baa1", "爸爸: ordinary spoken default");
  assert.deepEqual(readings("爸爸"), new Set(["baa4 baa1", "baa4 baa4", "baa1 baa1"]));
  assert.ok((analyses["爸爸"] || []).some((row) => row.id.includes("father_written") && row.jyutping === "baa1 baa1"));

  assert.equal(tokenLexicon["時間"].jyutping, "si4 gaan3");
  assert.deepEqual(readings("時間"), new Set(["si4 gaan3", "si4 gaan1"]));

  assert.equal(tokenLexicon["處理"].jyutping, "cyu5 lei5");
  assert.deepEqual(readings("處理"), new Set(["cyu5 lei5", "cyu2 lei5"]));

  assert.equal(tokenLexicon["嘛"].jyutping, "maa5", "嘛: existing runtime variant remains default");
  assert.deepEqual(readings("嘛"), new Set(["maa5", "maa3"]));
  assert.ok(!readings("嘛").has("maa4"), "嘛: lama-only maa4 is not promoted as the final-particle reading");
});
