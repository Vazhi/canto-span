#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const reviewed = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r501-750-reviewed");
const runtimePolicy = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r501-750-runtime-policy");
const { buildLexicalAnalysisIndex } = require("../../../src/runtime-resources/lexicon/lexical-analyses");

const root = path.resolve(__dirname, "../../..");
const tokenLexicon = Object.fromEntries(tokenEntries);
const analyses = buildLexicalAnalysisIndex(tokenEntries);
const dynamic = reviewed.buildExplicitAnalyses(tokenEntries);

function cifuBandSurfaces() {
  const file = path.join(root, "data", "lexical-frequency", "cifu-spoken-top-2000.tsv");
  const lines = fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "").trimEnd().split(/\r?\n/);
  const header = lines.shift().split("\t");
  const ix = Object.fromEntries(header.map((name, index) => [name, index]));
  return lines
    .map((line) => line.split("\t"))
    .filter((row) => Number(row[ix.rank]) >= 501 && Number(row[ix.rank]) <= 750)
    .map((row) => row[ix.word]);
}

function ids(surface) {
  return (analyses[surface] || []).map((row) => row.id);
}

function readings(surface) {
  return (analyses[surface] || []).map((row) => row.jyutping);
}

test("ranks 501-750 retain complete exact-surface coverage", () => {
  const surfaces = cifuBandSurfaces();
  assert.equal(surfaces.length, 250);
  assert.equal(new Set(surfaces).size, 250);
  for (const surface of surfaces) assert.ok(tokenLexicon[surface], `${surface}: exact runtime surface`);
});

test("runtime policy exposes the audited 45 promotion / 30 blocked / 45 candidate partition", () => {
  assert.equal(Object.keys(reviewed.PROMOTIONS).length, 45);
  assert.equal(reviewed.BLOCKED_ATOMIC_SURFACES.size, 30);
  assert.equal(reviewed.TRANSPARENT_SINGLE_CANDIDATES.size, 9);
  assert.equal(runtimePolicy.EXTRA_CANDIDATE_ONLY_SURFACES.size, 1);
  assert.ok(runtimePolicy.EXTRA_CANDIDATE_ONLY_SURFACES.has("跟"));
  assert.equal(runtimePolicy.EFFECTIVE_CANDIDATE_ONLY_SURFACES.size, 45);
  assert.deepEqual(new Set(Object.keys(runtimePolicy.DEFAULT_READING_OVERRIDES)), new Set(["着", "轉彎"]));
  assert.ok(!Object.prototype.hasOwnProperty.call(runtimePolicy.DEFAULT_READING_OVERRIDES, "直行"));

  const promotionSet = new Set(Object.keys(reviewed.PROMOTIONS));
  assert.deepEqual([...promotionSet].filter((surface) => reviewed.BLOCKED_ATOMIC_SURFACES.has(surface)), []);
  assert.deepEqual([...promotionSet].filter((surface) => runtimePolicy.EFFECTIVE_CANDIDATE_ONLY_SURFACES.has(surface)), []);
  assert.deepEqual([...reviewed.BLOCKED_ATOMIC_SURFACES].filter((surface) => runtimePolicy.EFFECTIVE_CANDIDATE_ONLY_SURFACES.has(surface)), []);
});

test("45 direct neutral gaps are typed with reviewed provenance", () => {
  for (const [surface, promotion] of Object.entries(reviewed.PROMOTIONS)) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: promoted runtime entry exists`);
    assert.ok(!reviewed.isNeutralLexicalEntry(entry), `${surface}: direct promotion is no longer neutral`);
    assert.equal(entry.label, promotion.label, `${surface}: reviewed label`);
    assert.equal(entry.pos, promotion.pos, `${surface}: reviewed POS`);
    assert.equal(entry.syntax, promotion.syntax, `${surface}: reviewed syntax`);
    assert.equal(entry.provenance && entry.provenance.kind, "reviewed_lexical_promotion", `${surface}: reviewed provenance`);
  }
});

test("all 45 default-sensitive candidates remain neutral token defaults", () => {
  for (const surface of runtimePolicy.EFFECTIVE_CANDIDATE_ONLY_SURFACES) {
    assert.ok(reviewed.isNeutralLexicalEntry(tokenLexicon[surface]), `${surface}: default remains neutral`);
    assert.equal(analyses[surface][0].id, `lex:${surface}:default`, `${surface}: stable default analysis ID`);
    assert.equal(analyses[surface][0].pos, "lexical_item", `${surface}: default analysis remains neutral`);
    assert.ok(analyses[surface].slice(1).some((row) => row.provenance && row.provenance.kind === "reviewed_lexical_analysis"), `${surface}: reviewed whole-form alternative exists`);
  }
  assert.equal(tokenLexicon["着"].jyutping, "zoek3");
  assert.equal(tokenLexicon["着"].provenance.kind, "reviewed_candidate_default_pronunciation");
  assert.equal(tokenLexicon["轉彎"].jyutping, "zyun3 waan1");
  assert.equal(tokenLexicon["轉彎"].provenance.kind, "reviewed_candidate_default_pronunciation");
  assert.ok(!reviewed.isNeutralLexicalEntry(tokenLexicon["直行"]), "直行: existing typed default remains typed");
  assert.equal(tokenLexicon["直行"].jyutping, "zik6 haang4");
});

test("blocked atomic rows receive no new lexical promotion or explicit alternative", () => {
  const structuredExisting = [];
  for (const surface of reviewed.BLOCKED_ATOMIC_SURFACES) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: blocked exact surface retained`);
    assert.notEqual(entry.provenance && entry.provenance.kind, "reviewed_lexical_promotion", `${surface}: not promoted by this band`);
    assert.ok(!dynamic[surface], `${surface}: no ranks 501-750 explicit atomic analyses`);
    if (!reviewed.isNeutralLexicalEntry(entry)) structuredExisting.push(surface);
  }
  assert.deepEqual(new Set(structuredExisting), new Set(["一次", "第二個"]));
});

test("101 reviewed alternative surfaces preserve normalized current defaults", () => {
  assert.equal(Object.keys(reviewed.ALTERNATIVE_SPECS).length, 101);
  assert.equal(Object.keys(dynamic).length, 101);
  const seen = new Set();
  for (const [surface, rows] of Object.entries(dynamic)) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: dynamic analysis surface exists`);
    assert.ok(rows.length >= 2, `${surface}: default plus reviewed alternative(s)`);
    assert.equal(rows[0].id, `lex:${surface}:default`, `${surface}: preserved default first`);
    assert.equal(rows[0].label, entry.label || "neutral", `${surface}: normalized default label preserved`);
    assert.equal(rows[0].pos, entry.pos || "lexical_item", `${surface}: normalized default POS preserved`);
    assert.equal(rows[0].syntax, entry.syntax || "lexical_candidate", `${surface}: normalized default syntax preserved`);
    assert.equal(rows[0].jyutping, entry.jyutping || "", `${surface}: default reading preserved`);
    assert.deepEqual(ids(surface), rows.map((row) => row.id), `${surface}: dynamic records are the effective analysis index`);
    for (const row of rows) {
      assert.ok(row.jyutping, `${row.id}: non-empty Jyutping`);
      assert.ok(!seen.has(row.id), `${row.id}: unique stable ID within ranks 501-750`);
      seen.add(row.id);
    }
  }
});

test("R2 reading/function refinements are represented without Cifu reading collapse", () => {
  const lok = new Set(readings("樂"));
  assert.ok(lok.has("lok6"));
  assert.ok(lok.has("ngok6"));
  assert.ok(lok.has("ngaau6"));

  const bong = new Set(readings("磅"));
  assert.ok(bong.has("bong6"));
  assert.ok(bong.has("bong2"));

  const zikHang = new Set(readings("直行"));
  assert.deepEqual(zikHang, new Set(["zik6 haang4", "zik6 hong4"]));
  assert.ok(!zikHang.has("zik6hong4"));
});

test("CI-exposed omissions are represented from accepted evidence", () => {
  assert.ok(ids("轉彎").includes("lex:轉彎:r625:turn_verb"));
  assert.ok(readings("轉彎").includes("zyun3 waan1"));
  assert.ok(ids("早").includes("lex:早:r647:early_stative"));
  assert.ok(ids("早").includes("lex:早:r647:early_adverb"));
  assert.ok(ids("早").includes("lex:早:r647:morning_temporal"));
  assert.ok(readings("早").every((reading) => reading === "zou2"));
});

test("high-value R1 reading splits survive as explicit alternatives", () => {
  assert.ok(readings("地").includes("dei6"));
  assert.ok(readings("地").includes("dei2"));
  assert.ok(readings("坐").includes("co5"));
  assert.ok(readings("坐").includes("zo6"));
  assert.ok(readings("今年").includes("gam1 nin4"));
  assert.ok(readings("今年").includes("gam1 nin2"));
  assert.ok(readings("女").includes("neoi2"));
  assert.ok(readings("女").includes("neoi5"));
  assert.ok(readings("男人").includes("naam4 jan2"));
  assert.ok(readings("男人").includes("naam4 jan4"));
  assert.ok(readings("慢慢").includes("maan6 maan2"));
  assert.ok(readings("慢慢").includes("maan6 maan1"));
  assert.ok(readings("着").includes("zoek3"));
  assert.ok(readings("着").includes("zoek6"));
});

test("previous-band stable IDs and defaults survive ranks 501-750 composition", () => {
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
  assert.deepEqual(ids("唔係"), ["lex:唔係:default", "lex:唔係:otherwise_conjunction"]);
  assert.deepEqual(ids("成"), [
    "lex:成:default",
    "lex:成:success_completion_verb",
    "lex:成:seng4_quantifier",
    "lex:成:seng4_result_suffix",
    "lex:成:tenth_measure",
  ]);
  assert.equal(analyses["喀"][0].jyutping, "haak1");
});
