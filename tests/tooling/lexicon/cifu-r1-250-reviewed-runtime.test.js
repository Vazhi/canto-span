#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const reviewed = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1-250-reviewed");
const nativeCorrections = require("../../../src/runtime-resources/lexicon/token-lexicon/native-review-corrections");
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
    .filter((row) => Number(row[ix.rank]) >= 1 && Number(row[ix.rank]) <= 250)
    .map((row) => row[ix.word]);
}

function ids(surface) {
  return (analyses[surface] || []).map((row) => row.id);
}

function readings(surface) {
  return (analyses[surface] || []).map((row) => row.jyutping);
}

test("ranks 1-250 retain complete exact-surface coverage", () => {
  const surfaces = cifuBandSurfaces();
  assert.equal(surfaces.length, 250);
  assert.equal(new Set(surfaces).size, 250);
  for (const surface of surfaces) assert.ok(tokenLexicon[surface], `${surface}: exact runtime surface`);
});

test("reviewed overlay exposes the audited operation sets without overlap", () => {
  assert.equal(Object.keys(reviewed.PROMOTIONS).length, 22);
  assert.equal(Object.keys(reviewed.PROTECTED_NEUTRAL_SURFACES).length, 14);
  assert.equal(reviewed.CANDIDATE_ONLY_SURFACES.size, 13);
  assert.equal(Object.keys(reviewed.CORRECTIONS).length, 5);
  const groups = [
    new Set(Object.keys(reviewed.PROMOTIONS)),
    new Set(Object.keys(reviewed.PROTECTED_NEUTRAL_SURFACES)),
    reviewed.CANDIDATE_ONLY_SURFACES,
    new Set(Object.keys(reviewed.CORRECTIONS)),
  ];
  for (let left = 0; left < groups.length; left += 1) {
    for (let right = left + 1; right < groups.length; right += 1) {
      assert.deepEqual([...groups[left]].filter((surface) => groups[right].has(surface)), []);
    }
  }
});

test("blocked and research-neutral surfaces stay neutral, including demoted typed rows", () => {
  for (const surface of Object.keys(reviewed.PROTECTED_NEUTRAL_SURFACES)) {
    assert.ok(reviewed.isNeutralFrequencyFallback(tokenLexicon[surface]), `${surface}: protected neutral surface`);
    assert.equal(tokenLexicon[surface].provenance.kind, "reviewed_neutral_surface", `${surface}: reviewed neutral provenance`);
  }
  assert.equal(tokenLexicon["係咪"].jyutping, "hai6 mai6");
  assert.equal(tokenLexicon["哩"].pos, "lexical_item");
});

test("candidate-only surfaces preserve neutral defaults plus reviewed alternatives", () => {
  for (const surface of reviewed.CANDIDATE_ONLY_SURFACES) {
    assert.ok(reviewed.isNeutralFrequencyFallback(tokenLexicon[surface]), `${surface}: candidate default remains neutral`);
    assert.equal(analyses[surface][0].id, `lex:${surface}:default`, `${surface}: stable neutral default ID`);
    assert.equal(analyses[surface][0].pos, "lexical_item", `${surface}: neutral default analysis`);
    const expectedKind = surface === "喀" ? "native_speaker_pronunciation_correction" : "neutral_frequency_fallback_preserved";
    assert.equal(analyses[surface][0].provenance.kind, expectedKind, `${surface}: neutral-default provenance`);
    assert.ok(analyses[surface].slice(1).some((row) => row.provenance.kind === "reviewed_lexical_analysis"), `${surface}: reviewed candidate exists`);
  }
  assert.ok(ids("唔係").includes("lex:唔係:otherwise_conjunction"));
  assert.ok(ids("個人").includes("lex:個人:noun"));
  assert.ok(ids("幾多").includes("lex:幾多:quantifier"));
  assert.ok(ids("都會").includes("lex:都會:metropolis_noun"));
  assert.equal(tokenLexicon["個位"].jyutping, "go3 wai2");
  assert.equal(tokenLexicon["哩個"].jyutping, "ni1 go3");
});

test("direct promotions and named corrections carry reviewed provenance", () => {
  for (const [surface, promotion] of Object.entries(reviewed.PROMOTIONS)) {
    const entry = tokenLexicon[surface];
    assert.equal(entry.label, promotion.label, `${surface}: promoted label`);
    assert.equal(entry.pos, promotion.pos, `${surface}: promoted POS`);
    assert.equal(entry.syntax, promotion.syntax, `${surface}: promoted syntax`);
    assert.equal(entry.jyutping, promotion.jyutping || "", `${surface}: promoted reviewed reading`);
    assert.equal(entry.provenance.kind, "reviewed_lexical_promotion", `${surface}: promotion provenance`);
  }
  for (const [surface, correction] of Object.entries(reviewed.CORRECTIONS)) {
    const entry = tokenLexicon[surface];
    assert.equal(entry.label, correction.label, `${surface}: corrected label`);
    assert.equal(entry.pos, correction.pos, `${surface}: corrected POS`);
    assert.equal(entry.syntax, correction.syntax, `${surface}: corrected syntax`);
    assert.equal(entry.jyutping, correction.jyutping || "", `${surface}: corrected reading`);
    assert.equal(entry.provenance.kind, "reviewed_lexical_correction", `${surface}: correction provenance`);
  }
});

test("native reviewer correction makes kak1 the default for 喀 without erasing alternatives", () => {
  assert.equal(tokenLexicon["喀"].jyutping, "kak1");
  assert.equal(tokenLexicon["喀"].provenance.kind, "native_speaker_pronunciation_correction");
  assert.equal(tokenLexicon["喀"].provenance.source, nativeCorrections.SOURCE);
  assert.equal(analyses["喀"][0].id, "lex:喀:default");
  assert.equal(analyses["喀"][0].jyutping, "kak1");
  assert.equal(analyses["喀"][0].provenance.kind, "native_speaker_pronunciation_correction");
  assert.deepEqual(new Set(readings("喀").filter(Boolean)), new Set(["kak1", "haak3", "kaa1", "kaa3"]));
  assert.ok(!readings("喀").includes("haak6"), "packet haak6 must not be promoted");
});

test("explicit analysis inventory preserves unique stable IDs and final reading boundaries", () => {
  assert.equal(Object.keys(reviewed.EXPLICIT_ANALYSES).length, 107);
  assert.equal(Object.values(reviewed.EXPLICIT_ANALYSES).reduce((sum, rows) => sum + rows.length, 0), 280);
  const seen = new Set();
  for (const [surface, rows] of Object.entries(reviewed.EXPLICIT_ANALYSES)) {
    assert.ok(tokenLexicon[surface], `${surface}: known runtime surface`);
    for (const row of rows) {
      assert.ok(!seen.has(row.id), `${row.id}: stable analysis ID unique`);
      seen.add(row.id);
    }
    assert.deepEqual(ids(surface), rows.map((row) => row.id), `${surface}: runtime index uses reviewed analyses`);
  }

  assert.deepEqual(readings("囉"), ["lo1", "lo4"]);
  assert.ok(!readings("囉").includes("lo3"), "Cifu lo3 must not be imported");
  assert.equal(analyses["韻"][0].jyutping, "wan5");
  assert.equal(analyses["廟"][0].jyutping, "miu2");
  assert.equal(analyses["戀"][0].pos, "bound");
  assert.equal(analyses["時"][0].pos, "bound");
  assert.ok(!readings("個位").includes("go3 wai6"));
});

test("existing contextual and ranks 251-500 stable IDs survive", () => {
  assert.deepEqual(ids("住"), ["lex:住:residence_verb", "lex:住:durative_marker"]);
  assert.deepEqual(ids("咪"), [
    "lex:咪:prohibitive_marker",
    "lex:咪:discourse_focus_marker",
    "lex:咪:study_verb",
  ]);
  assert.deepEqual(ids("定"), [
    "lex:定:decide_fix_verb",
    "lex:定:alternative_connector",
    "lex:定:steady_stative",
    "lex:定:advance_adverb",
  ]);
});
