#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const { buildLexicalAnalysisIndex } = require("../../../src/runtime-resources/lexicon/lexical-analyses");

const tokenLexicon = Object.fromEntries(tokenEntries);
const analyses = buildLexicalAnalysisIndex(tokenEntries);

test("remaining verified CJK single-character top-2000 gaps have exact runtime coverage", () => {
  const expected = {
    "偷": ["tau1", "doing", "verb"],
    "探": ["taam3", "doing", "verb"],
    "粒": ["nap1", "measure_word", "classifier"],
    "腦": ["nou5", "what", "noun"],
    "超": ["ciu1", "how", "adverb"],
    "簿": ["bou2", "what", "noun"],
    "銀": ["ngan4", "what", "noun"],
    "米": ["mai5", "measure_word", "classifier"],
    "堆": ["deoi1", "measure_word", "classifier"],
  };

  for (const [surface, [jyutping, label, pos]] of Object.entries(expected)) {
    assert.ok(tokenLexicon[surface], `${surface}: exact lexical surface exists`);
    assert.equal(tokenLexicon[surface].jyutping, jyutping, `${surface}: verified default reading`);
    assert.equal(tokenLexicon[surface].label, label, `${surface}: learner role`);
    assert.equal(tokenLexicon[surface].pos, pos, `${surface}: lexical category`);
  }
});

test("polyfunctional single-character additions preserve independently supported alternatives", () => {
  assert.deepEqual(new Set((analyses["粒"] || []).map((row) => row.jyutping)), new Set(["nap1", "lap1"]));
  assert.ok((analyses["粒"] || []).every((row) => row.pos === "classifier"));

  assert.deepEqual(new Set((analyses["簿"] || []).map((row) => row.jyutping)), new Set(["bou2", "bou6"]));
  assert.ok((analyses["簿"] || []).every((row) => row.pos === "noun"));

  assert.ok((analyses["米"] || []).some((row) => row.id === "lex:米:metre_unit" && row.pos === "classifier"));
  assert.ok((analyses["米"] || []).some((row) => row.id === "lex:米:rice_noun" && row.pos === "noun"));

  assert.ok((analyses["堆"] || []).some((row) => row.id === "lex:堆:pile_classifier" && row.pos === "classifier"));
  assert.ok((analyses["堆"] || []).some((row) => row.id === "lex:堆:pile_noun" && row.pos === "noun"));
  assert.ok((analyses["堆"] || []).some((row) => row.id === "lex:堆:pile_verb" && row.pos === "verb"));

  assert.deepEqual(new Set((analyses["超"] || []).map((row) => row.jyutping)), new Set(["ciu1", "ciu2"]));
  for (const pos of ["adverb", "verb", "interjection", "noun"]) {
    assert.ok((analyses["超"] || []).some((row) => row.pos === pos), `超: ${pos} analysis`);
  }
});

test("哎吔 preserves both interjection variation and its nonliteral kinship-modifier use", () => {
  assert.ok(tokenLexicon["哎吔"]);
  assert.equal(tokenLexicon["哎吔"].jyutping, "ai1 jaa3");
  const rows = analyses["哎吔"] || [];
  assert.deepEqual(new Set(rows.map((row) => row.jyutping)), new Set(["ai1 jaa1", "ai1 jaa3", "ai1 jaa5", "ai1 jaak3", "ai1 jaa6"]));
  assert.ok(rows.some((row) => row.pos === "interjection" && row.jyutping === "ai1 jaa1"));
  assert.ok(rows.some((row) => row.id === "lex:哎吔:nonliteral_kinship_modifier" && row.pos === "adjective"));
});

test("source-tokenization artifacts are not admitted as Cantonese lexical entries", () => {
  for (const surface of ["M", "D", "Y", "R", "P", "Q"]) {
    assert.equal(tokenLexicon[surface], undefined, `${surface}: Latin source artifact stays outside Cantonese lexicon`);
  }
});
