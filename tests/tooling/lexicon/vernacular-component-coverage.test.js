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
