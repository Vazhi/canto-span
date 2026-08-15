#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const reviewed = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1001-1250-reviewed");
const { buildLexicalAnalysisIndex } = require("../../../src/runtime-resources/lexicon/lexical-analyses");

const root = path.resolve(__dirname, "../../..");
const tokenLexicon = Object.fromEntries(tokenEntries);
const analyses = buildLexicalAnalysisIndex(tokenEntries);
const dynamic = reviewed.buildExplicitAnalyses(tokenEntries);

function bandSurfaces() {
  const file = path.join(root, "data", "lexical-frequency", "cifu-spoken-top-2000.tsv");
  const lines = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
  const header = lines.shift().split("\t");
  const ix = Object.fromEntries(header.map((name, index) => [name, index]));
  return lines
    .map((line) => line.split("\t"))
    .filter((row) => Number(row[ix.rank]) >= 1001 && Number(row[ix.rank]) <= 1250)
    .map((row) => row[ix.word]);
}

function ids(surface) {
  return (analyses[surface] || []).map((row) => row.id);
}

function readings(surface) {
  return (analyses[surface] || []).map((row) => row.jyutping);
}

function altRows(surface) {
  return (analyses[surface] || []).slice(1).filter((row) => row.provenance && row.provenance.source === reviewed.SOURCE);
}

test("ranks 1001-1250 retain complete exact-surface coverage", () => {
  const surfaces = bandSurfaces();
  assert.equal(surfaces.length, 250);
  assert.equal(new Set(surfaces).size, 250);
  for (const surface of surfaces) assert.ok(tokenLexicon[surface], `${surface}: exact runtime surface`);
});

test("runtime policy exposes the audited 93 / 32 / 49 / 51 / 25 partition", () => {
  assert.equal(Object.keys(reviewed.PROMOTIONS).length, 93);
  assert.equal(reviewed.SOURCE_ONLY_SURFACES.size, 32);
  assert.equal(reviewed.INDEPENDENT_ZERO_HIT_SURFACES.size, 3);
  assert.equal(reviewed.BLOCKED_ATOMIC_SURFACES.size, 49);
  assert.equal(Object.keys(reviewed.MULTI_SPECS).length, 51);
  assert.equal(Object.keys(reviewed.READING_SPECS).length, 25);
  assert.equal(Object.keys(reviewed.ALTERNATIVE_SPECS).length, 76);
  assert.equal(reviewed.CANDIDATE_ONLY_SURFACES.size, 76);

  const promotionSet = new Set(Object.keys(reviewed.PROMOTIONS));
  const alternativeSet = new Set(Object.keys(reviewed.ALTERNATIVE_SPECS));
  for (const surface of promotionSet) {
    assert.ok(!reviewed.SOURCE_ONLY_SURFACES.has(surface), `${surface}: source-only row is not promoted`);
    assert.ok(!reviewed.BLOCKED_ATOMIC_SURFACES.has(surface), `${surface}: blocked row is not promoted`);
    assert.ok(!alternativeSet.has(surface), `${surface}: broad selection is not duplicated as an alternative set`);
  }
  for (const surface of alternativeSet) {
    assert.ok(!reviewed.SOURCE_ONLY_SURFACES.has(surface), `${surface}: source-only row has no new typed alternatives`);
    assert.ok(!reviewed.BLOCKED_ATOMIC_SURFACES.has(surface), `${surface}: blocked row has no new typed alternatives`);
  }
});

test("93 independently supportable broad rows are typed without flattening existing richer defaults", () => {
  for (const [surface, promotion] of Object.entries(reviewed.PROMOTIONS)) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: runtime entry exists`);
    assert.ok(!reviewed.isNeutralLexicalEntry(entry), `${surface}: broad reviewed selection is typed`);
    assert.equal(entry.label, promotion.label, `${surface}: broad lexical role matches the authority`);
    if (entry.provenance && entry.provenance.source === reviewed.SOURCE) {
      assert.equal(entry.provenance.kind, "reviewed_lexical_promotion", `${surface}: new typing is provenance-marked`);
      assert.equal(entry.pos, promotion.pos, `${surface}: promoted POS`);
    }
  }
});

test("32 source-only zero-hit rows receive no new typed fact from this band", () => {
  for (const surface of reviewed.SOURCE_ONLY_SURFACES) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: exact surface retained`);
    assert.ok(!dynamic[surface], `${surface}: no new reviewed alternative set`);
    assert.ok(!(entry.provenance && entry.provenance.source === reviewed.SOURCE), `${surface}: no new band-specific default typing`);
    assert.ok(!ids(surface).some((id) => id.includes(":r1") && id.includes("1001")), `${surface}: no accidental ranks 1001-1250 analysis ID`);
  }
});

test("49 blocked atomic rows retain coverage without a new whole-surface analysis", () => {
  for (const surface of reviewed.BLOCKED_ATOMIC_SURFACES) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: blocked exact surface retained`);
    assert.ok(!dynamic[surface], `${surface}: no new reviewed atomic analysis`);
    assert.ok(!(entry.provenance && entry.provenance.source === reviewed.SOURCE), `${surface}: not promoted by this band`);
  }
});

test("76 reviewed alternative surfaces preserve the current default first and use stable IDs", () => {
  assert.equal(Object.keys(dynamic).length, 76);
  const seen = new Set();
  for (const [surface, rows] of Object.entries(dynamic)) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: dynamic analysis surface exists`);
    assert.ok(rows.length >= 2, `${surface}: default plus reviewed alternative(s)`);
    assert.equal(rows[0].id, `lex:${surface}:default`, `${surface}: stable default remains first`);
    assert.equal(rows[0].label, entry.label || "neutral", `${surface}: default label preserved`);
    assert.equal(rows[0].pos, entry.pos || "lexical_item", `${surface}: normalized default POS preserved`);
    assert.equal(rows[0].syntax, entry.syntax || "lexical_candidate", `${surface}: normalized default syntax preserved`);
    assert.equal(rows[0].jyutping, entry.jyutping || "", `${surface}: default reading preserved`);
    assert.deepEqual(ids(surface), rows.map((row) => row.id), `${surface}: dynamic records are effective`);
    for (const row of rows) {
      assert.ok(row.jyutping, `${row.id}: non-empty Jyutping`);
      assert.ok(!seen.has(row.id), `${row.id}: unique stable ID`);
      seen.add(row.id);
    }
  }
});

test("reviewed default-reading corrections replace unsupported neutral candidates", () => {
  const expected = {
    "會考": "wui6 haau2",
    "噉樣樣": "gam2 joeng2 joeng2",
    "咯": "lok3",
    "處理": "cyu5 lei5",
    "聽眾": "ting3 zung3",
    "爭": "zaang1",
    "哩度": "ni1 dou6",
  };
  for (const [surface, jyutping] of Object.entries(expected)) {
    assert.equal(tokenLexicon[surface].jyutping, jyutping, `${surface}: reviewed default reading`);
  }
});

test("implementation-critical reading splits and supersessions survive", () => {
  assert.deepEqual(new Set(readings("網絡")), new Set(["mong5 lok3", "mong5 lok6"]));
  assert.deepEqual(new Set(readings("橋")), new Set(["kiu4", "kiu2"]));
  assert.deepEqual(new Set(readings("試")), new Set(["si3", "si5"]));
  assert.deepEqual(new Set(readings("新聞")), new Set(["san1 man4", "san1 man2"]));
  assert.deepEqual(new Set(readings("舖")), new Set(["pou3", "pou2"]));
  assert.deepEqual(new Set(readings("地下")), new Set(["dei6 haa6", "dei6 haa2"]));
  assert.deepEqual(new Set(readings("被")), new Set(["bei6", "pei5"]));
  assert.ok(readings("零").includes("ling4"));
  assert.ok(readings("零").includes("leng4"));
  assert.ok(readings("零").includes("leng2"));
  assert.ok(readings("零").includes("leng1"));

  assert.ok(readings("處理").includes("cyu5 lei5"));
  assert.ok(!readings("處理").includes("cyu2 lei5"), "處理: lower-confidence source reading is not exposed as co-equal reviewed runtime analysis");

  assert.ok(readings("拿").includes("naa4"));
  assert.ok(readings("拿").includes("laa4"));
  assert.ok(!readings("拿").includes("laa2"), "拿: unresolved packet reading is not promoted");

  assert.deepEqual(new Set(readings("兆")), new Set(["siu6"]));
  assert.ok(!readings("兆").includes("ziu6"));
});

test("好話 stays one broad lexical family rather than an invented verb split", () => {
  assert.ok(!dynamic["好話"], "好話: no separate reviewed alternative inventory");
  assert.equal(tokenLexicon["好話"].label, "what");
  assert.equal(tokenLexicon["好話"].pos, "noun");
  assert.equal(tokenLexicon["好話"].provenance && tokenLexicon["好話"].provenance.source, reviewed.SOURCE);
});

test("raw HKCanCor tag disagreement does not define the 盡量 ontology", () => {
  const rows = altRows("盡量");
  assert.ok(rows.some((row) => row.pos === "adverb"), "盡量: adverb analysis retained");
  assert.ok(rows.some((row) => row.pos === "verb"), "盡量: independently justified lexical verb-family analysis retained");
  assert.ok(rows.every((row) => row.provenance.source === reviewed.SOURCE));
});

test("ranks 1-1000 stable high-value analyses survive ranks 1001-1250 composition", () => {
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
  assert.deepEqual(new Set(readings("魚")), new Set(["jyu2", "jyu4"]));
  assert.deepEqual(new Set(readings("直行")), new Set(["zik6 haang4", "zik6 hong4"]));
  assert.equal(analyses["喀"][0].jyutping, "haak1");
});
