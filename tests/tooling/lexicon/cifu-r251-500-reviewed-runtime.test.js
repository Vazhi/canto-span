#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const reviewed = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r251-500-reviewed");
const { buildLexicalAnalysisIndex } = require("../../../src/runtime-resources/lexicon/lexical-analyses");

const root = path.resolve(__dirname, "../../..");
const tokenLexicon = Object.fromEntries(tokenEntries);
const analyses = buildLexicalAnalysisIndex(tokenEntries);

function cifuBandSurfaces() {
  const file = path.join(root, "data", "lexical-frequency", "cifu-spoken-top-2000.tsv");
  const lines = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
  const header = lines.shift().split("\t");
  const ix = Object.fromEntries(header.map((name, index) => [name, index]));
  return lines
    .map((line) => line.split("\t"))
    .filter((row) => Number(row[ix.rank]) >= 251 && Number(row[ix.rank]) <= 500)
    .map((row) => row[ix.word]);
}

function ids(surface) {
  return (analyses[surface] || []).map((row) => row.id);
}

function readings(surface) {
  return (analyses[surface] || []).map((row) => row.jyutping);
}

test("ranks 251-500 retain complete exact-surface coverage", () => {
  const surfaces = cifuBandSurfaces();
  assert.equal(surfaces.length, 250);
  assert.equal(new Set(surfaces).size, 250);
  for (const surface of surfaces) assert.ok(tokenLexicon[surface], `${surface}: exact runtime surface`);
});

test("reviewed overlay has the audited 71/18/7 partition", () => {
  assert.equal(Object.keys(reviewed.PROMOTIONS).length, 71);
  assert.equal(reviewed.BLOCKED_ATOMIC_SURFACES.size, 18);
  assert.equal(reviewed.CANDIDATE_ONLY_SURFACES.size, 7);
  for (const surface of reviewed.BLOCKED_ATOMIC_SURFACES) {
    assert.ok(!reviewed.PROMOTIONS[surface], `${surface}: blocked surface must not be promoted`);
    assert.ok(reviewed.isNeutralFrequencyFallback(tokenLexicon[surface]), `${surface}: blocked surface remains neutral`);
  }
  for (const surface of reviewed.CANDIDATE_ONLY_SURFACES) {
    assert.ok(!reviewed.PROMOTIONS[surface], `${surface}: candidate-only surface must not be promoted`);
    assert.ok(reviewed.isNeutralFrequencyFallback(tokenLexicon[surface]), `${surface}: candidate-only base remains neutral`);
  }
});

test("all 71 reviewed neutral gaps are promoted without laundering unsupported readings", () => {
  for (const [surface, promotion] of Object.entries(reviewed.PROMOTIONS)) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: promoted entry exists`);
    assert.ok(!reviewed.isNeutralFrequencyFallback(entry), `${surface}: no longer neutral fallback`);
    assert.equal(entry.label, promotion.label, `${surface}: reviewed label`);
    assert.equal(entry.pos, promotion.pos, `${surface}: reviewed POS`);
    assert.equal(entry.syntax, promotion.syntax, `${surface}: reviewed syntax`);
    assert.equal(entry.provenance && entry.provenance.source, reviewed.SOURCE, `${surface}: reviewed provenance`);
    if (promotion.jyutping) {
      assert.equal(entry.jyutping, promotion.jyutping, `${surface}: independently reviewed reading`);
      assert.equal(entry.provenance.pronunciation_status, "reviewed_in_final_adjudication");
    } else {
      assert.equal(entry.provenance.pronunciation_status, "inherited_runtime_candidate_not_independently_promoted");
    }
  }
});

test("explicit analysis inventory exactly matches the 82 reviewed split/candidate surfaces", () => {
  assert.equal(Object.keys(reviewed.EXPLICIT_ANALYSES).length, 82);
  const seen = new Set();
  for (const [surface, rows] of Object.entries(reviewed.EXPLICIT_ANALYSES)) {
    assert.ok(rows.length >= 2, `${surface}: explicit analyses must preserve alternatives`);
    assert.ok(tokenLexicon[surface], `${surface}: explicit analyses reference known surface`);
    for (const row of rows) {
      assert.ok(!seen.has(row.id), `${row.id}: stable analysis ID unique`);
      seen.add(row.id);
      assert.equal(row.surface, undefined, `${row.id}: surface is supplied by analysis index, not duplicated`);
    }
    assert.deepEqual(ids(surface), rows.map((row) => row.id), `${surface}: runtime analysis index uses reviewed records`);
  }
});

test("mixed multiword lexemes preserve neutral default plus reviewed whole-form candidates", () => {
  const expected = new Set(["仲有", "今次", "得到", "出去", "唔記得", "入去", "讀書"]);
  assert.deepEqual(new Set(reviewed.CANDIDATE_ONLY_SURFACES), expected);
  for (const surface of expected) {
    assert.equal(analyses[surface][0].id, `lex:${surface}:default`, `${surface}: stable neutral default ID`);
    assert.equal(analyses[surface][0].pos, "lexical_item", `${surface}: neutral default remains explicit`);
    assert.equal(analyses[surface][0].provenance.kind, "neutral_frequency_fallback_preserved", `${surface}: neutral provenance`);
    assert.ok(analyses[surface].slice(1).some((row) => row.provenance.kind === "reviewed_lexical_analysis"), `${surface}: reviewed candidate exists`);
  }
  assert.deepEqual(readings("得到"), ["dak1 dou2", "dak1 dou3"]);
  assert.ok(ids("得到").includes("lex:得到:obtain_verb"));
});

test("orthography and high-value reading splits match the final adjudication", () => {
  assert.equal(tokenLexicon["只"].jyutping, "zi2");
  assert.ok(!readings("只").includes("zek3"), "traditional 只 must not import the 隻 classifier reading");
  assert.deepEqual(readings("份"), ["fan6", "fan2"]);
  assert.deepEqual(new Set(readings("掂")), new Set(["dim6", "dim3", "dim1"]));
  assert.deepEqual(new Set(readings("頂")), new Set(["ding2", "deng2"]));
  assert.deepEqual(new Set(readings("斜")), new Set(["ce4", "ce3"]));
  assert.equal(tokenLexicon["彭"].jyutping, "paang4");
  assert.equal(tokenLexicon["裏邊"].jyutping, "leoi5 bin6");
});

test("existing contextual analysis IDs survive while later reviewed alternatives may coexist", () => {
  assert.deepEqual(ids("住"), ["lex:住:residence_verb", "lex:住:durative_marker"]);
  assert.ok(ids("咪").includes("lex:咪:prohibitive_marker"));
  assert.ok(ids("咪").includes("lex:咪:discourse_focus_marker"));
  assert.deepEqual(ids("定"), [
    "lex:定:decide_fix_verb",
    "lex:定:alternative_connector",
    "lex:定:steady_stative",
    "lex:定:advance_adverb",
  ]);
});
