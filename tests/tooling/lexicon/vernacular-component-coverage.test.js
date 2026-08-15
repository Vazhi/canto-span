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
