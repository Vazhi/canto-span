#!/usr/bin/env node
"use strict";
const assert = require("node:assert/strict");
const test = require("node:test");
const tokenLexicon = Object.fromEntries(require("../../../src/runtime-resources/lexicon/token-lexicon"));
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
  const analyses = buildLexicalAnalysisIndex(require("../../../src/runtime-resources/lexicon/token-lexicon"));
  assert.deepEqual(new Set((analyses["咧"] || []).map((row) => row.jyutping)), new Set(["le4", "le5"]));
  assert.ok((analyses["咧"] || []).every((row) => row.pos === "particle"));
});
