#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const reviewed = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1-250-reviewed");
const candidateDefaults = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1-250-candidate-defaults");
const runtimePolicy = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1-250-runtime-policy");
const nativeCorrections = require("../../../src/runtime-resources/lexicon/token-lexicon/native-review-corrections");
const { buildLexicalAnalysisIndex } = require("../../../src/runtime-resources/lexicon/lexical-analyses");

const root = path.resolve(__dirname, "../../..");
const tokenLexicon = Object.fromEntries(tokenEntries);
const analyses = buildLexicalAnalysisIndex(tokenEntries);

function cifuRows() {
  const file = path.join(root, "data", "lexical-frequency", "cifu-spoken-top-2000.tsv");
  const lines = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
  const header = lines.shift().split("\t");
  const ix = Object.fromEntries(header.map((name, index) => [name, index]));
  return lines.map((line) => {
    const row = line.split("\t");
    return { rank: Number(row[ix.rank]), surface: row[ix.word] };
  });
}

function bandSurfaces() {
  return cifuRows().filter((row) => row.rank >= 1 && row.rank <= 250).map((row) => row.surface);
}

function ids(surface) {
  return (analyses[surface] || []).map((row) => row.id);
}

function readings(surface) {
  return (analyses[surface] || []).map((row) => row.jyutping);
}

test("ranks 1-250 retain complete exact-surface coverage", () => {
  const surfaces = bandSurfaces();
  assert.equal(surfaces.length, 250);
  assert.equal(new Set(surfaces).size, 250);
  for (const surface of surfaces) assert.ok(tokenLexicon[surface], `${surface}: exact runtime surface`);
});

test("effective reviewed operation sets remain bounded and non-overlapping", () => {
  const promotions = new Set(Object.keys(reviewed.PROMOTIONS));
  const corrections = new Set(Object.keys(reviewed.CORRECTIONS));
  const candidateOnly = reviewed.CANDIDATE_ONLY_SURFACES;
  const protectedNeutral = new Set(Object.keys(reviewed.PROTECTED_NEUTRAL_SURFACES));

  assert.deepEqual([...promotions].filter((surface) => corrections.has(surface)), []);
  assert.deepEqual([...promotions].filter((surface) => candidateOnly.has(surface)), []);
  assert.deepEqual([...promotions].filter((surface) => protectedNeutral.has(surface)), []);
  assert.deepEqual([...corrections].filter((surface) => candidateOnly.has(surface)), []);
  assert.deepEqual([...corrections].filter((surface) => protectedNeutral.has(surface)), []);
});

test("blocked and research-neutral surfaces stay neutral, including adjudicated demotions", () => {
  for (const surface of Object.keys(reviewed.PROTECTED_NEUTRAL_SURFACES)) {
    const entry = tokenLexicon[surface];
    assert.equal(entry.label, "lex", `${surface}: neutral label`);
    assert.equal(entry.pos, "lexical_item", `${surface}: neutral POS`);
    assert.equal(entry.syntax, "lexical_item", `${surface}: neutral syntax`);
    assert.ok(!(entry.provenance && entry.provenance.source === reviewed.SOURCE), `${surface}: no ranks 1-250 promotion provenance`);
  }
});

test("candidate-only surfaces preserve neutral defaults plus reviewed alternatives", () => {
  for (const surface of reviewed.CANDIDATE_ONLY_SURFACES) {
    assert.ok(tokenLexicon[surface], `${surface}: runtime entry exists`);
    assert.equal(analyses[surface][0].id, `lex:${surface}:default`, `${surface}: neutral default remains first`);
    assert.equal(analyses[surface][0].pos, "lexical_item", `${surface}: default POS remains neutral`);
    assert.ok(analyses[surface].slice(1).some((row) => row.provenance && row.provenance.source === reviewed.SOURCE), `${surface}: reviewed alternative exists`);
  }
});

test("唔係 preserves its typed negated-copula default plus the reviewed conjunction alternative", () => {
  assert.deepEqual(ids("唔係"), ["lex:唔係:default", "lex:唔係:otherwise_conjunction"]);
  assert.equal(analyses["唔係"][0].syntax, tokenLexicon["唔係"].syntax);
  assert.equal(analyses["唔係"][1].pos, "conjunction");
});

test("成 stays neutral by default while preserving the four #792 analysis families", () => {
  assert.equal(tokenLexicon["成"].pos, "lexical_item");
  assert.deepEqual(ids("成"), [
    "lex:成:default",
    "lex:成:success_completion_verb",
    "lex:成:seng4_quantifier",
    "lex:成:seng4_result_suffix",
    "lex:成:tenth_measure",
  ]);
});

test("direct promotions and named corrections carry reviewed provenance", () => {
  for (const [surface, spec] of Object.entries(reviewed.PROMOTIONS)) {
    const entry = tokenLexicon[surface];
    assert.equal(entry.label, spec.label, `${surface}: reviewed label`);
    assert.equal(entry.pos, spec.pos, `${surface}: reviewed POS`);
    assert.equal(entry.syntax, spec.syntax, `${surface}: reviewed syntax`);
    assert.equal(entry.provenance && entry.provenance.source, reviewed.SOURCE, `${surface}: reviewed provenance`);
  }
  for (const [surface, spec] of Object.entries(reviewed.CORRECTIONS)) {
    const entry = tokenLexicon[surface];
    assert.equal(entry.label, spec.label, `${surface}: corrected label`);
    assert.equal(entry.pos, spec.pos, `${surface}: corrected POS`);
    assert.equal(entry.syntax, spec.syntax, `${surface}: corrected syntax`);
    assert.equal(entry.jyutping, spec.jyutping, `${surface}: corrected reading`);
    assert.equal(entry.provenance && entry.provenance.source, reviewed.SOURCE, `${surface}: correction provenance`);
  }
});

test("native reviewer correction makes haak1 the default for 喀 while retaining attested alternatives", () => {
  assert.equal(tokenLexicon["喀"].jyutping, "haak1");
  assert.equal(tokenLexicon["喀"].provenance.source, nativeCorrections.SOURCE);
  assert.equal(analyses["喀"][0].id, "lex:喀:default");
  assert.equal(analyses["喀"][0].jyutping, "haak1");
  assert.equal(analyses["喀"][0].provenance.kind, "native_speaker_pronunciation_correction");
  assert.deepEqual(new Set(readings("喀").filter(Boolean)), new Set(["haak1", "haak3", "kaa1", "kaa3", "kak1"]));
  assert.ok(!readings("喀").includes("haak6"), "packet haak6 must not be promoted");
});

test("reviewed analysis inventory preserves unique stable IDs and final reading boundaries", () => {
  assert.equal(Object.keys(reviewed.EXPLICIT_ANALYSES).length, 102);
  assert.equal(Object.values(reviewed.EXPLICIT_ANALYSES).reduce((sum, rows) => sum + rows.length, 0), 270);
  const seen = new Set();
  for (const [surface, rows] of Object.entries(reviewed.EXPLICIT_ANALYSES)) {
    assert.ok(tokenLexicon[surface], `${surface}: known runtime surface`);
    for (const row of rows) {
      assert.ok(!seen.has(row.id), `${row.id}: stable analysis ID unique within reviewed source`);
      seen.add(row.id);
    }
    const effectiveRows = runtimePolicy.EXPLICIT_ANALYSIS_OVERRIDES[surface]
      || nativeCorrections.EXPLICIT_ANALYSES[surface]
      || candidateDefaults.EXPLICIT_ANALYSES[surface]
      || rows;
    if (surface === "嘅") {
      const supplementalId = "lex:嘅:doubt_question_particle_ge2";
      const effectiveRuntimeIds = ids(surface);
      assert.deepEqual(
        effectiveRuntimeIds.filter((id) => id !== supplementalId),
        effectiveRows.map((row) => row.id),
        "嘅: all reviewed Cifu analyses survive alongside the independently sourced ge2 supplement",
      );
      assert.ok(effectiveRuntimeIds.includes(supplementalId), "嘅: independently sourced ge2 analysis is retained");
    } else {
      assert.deepEqual(ids(surface), effectiveRows.map((row) => row.id), `${surface}: runtime index uses effective reviewed analyses`);
    }
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
  assert.ok(readings("魚").includes("jyu2"));
  assert.ok(readings("魚").includes("jyu4"));
});
