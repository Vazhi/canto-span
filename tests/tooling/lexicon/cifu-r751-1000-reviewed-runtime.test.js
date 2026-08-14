#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const reviewed = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r751-1000-reviewed");
const runtimePolicy = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r751-1000-runtime-policy");
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
    .filter((row) => Number(row[ix.rank]) >= 751 && Number(row[ix.rank]) <= 1000)
    .map((row) => row[ix.word]);
}

function ids(surface) {
  return (analyses[surface] || []).map((row) => row.id);
}

function readings(surface) {
  return (analyses[surface] || []).map((row) => row.jyutping);
}

function hasReviewedAlternative(surface) {
  return (analyses[surface] || []).slice(1).some((row) => row.provenance && row.provenance.kind === "reviewed_lexical_analysis");
}

test("ranks 751-1000 retain complete exact-surface coverage", () => {
  const surfaces = bandSurfaces();
  assert.equal(surfaces.length, 250);
  assert.equal(new Set(surfaces).size, 250);
  for (const surface of surfaces) assert.ok(tokenLexicon[surface], `${surface}: exact runtime surface`);
});

test("runtime policy exposes the audited 79 / 84 / 29 / 10 / 99 partition", () => {
  assert.equal(Object.keys(reviewed.PROMOTIONS).length, 79);
  assert.equal(reviewed.CANDIDATE_ONLY_SURFACES.size, 84);
  assert.equal(reviewed.BLOCKED_ATOMIC_SURFACES.size, 29);
  assert.equal(reviewed.RESEARCH_REQUIRED_SURFACES.size, 10);
  assert.equal(Object.keys(reviewed.ALTERNATIVE_SPECS).length, 99);
  assert.deepEqual(new Set(Object.keys(runtimePolicy.TYPED_DEFAULT_OVERRIDES)), new Set(["魚", "飛", "小心", "全"]));
  assert.deepEqual(new Set(Object.keys(reviewed.DEFAULT_READING_OVERRIDES)), new Set([
    "勇", "外", "嘍", "嘿", "礦", "行為", "棵", "只不過", "井", "圈", "衰", "愛",
  ]));

  const promotionSet = new Set(Object.keys(reviewed.PROMOTIONS));
  for (const surface of promotionSet) {
    assert.ok(!reviewed.CANDIDATE_ONLY_SURFACES.has(surface), `${surface}: promotion is not candidate-only`);
    assert.ok(!reviewed.BLOCKED_ATOMIC_SURFACES.has(surface), `${surface}: promotion is not blocked`);
    assert.ok(!reviewed.RESEARCH_REQUIRED_SURFACES.has(surface), `${surface}: promotion is not research-required`);
  }
  for (const surface of reviewed.BLOCKED_ATOMIC_SURFACES) {
    assert.ok(!reviewed.RESEARCH_REQUIRED_SURFACES.has(surface), `${surface}: blocked/research sets do not overlap`);
  }
});

test("79 neutral lexical gaps become reviewed typed defaults", () => {
  for (const [surface, promotion] of Object.entries(reviewed.PROMOTIONS)) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: promoted runtime entry exists`);
    assert.ok(!reviewed.isNeutralLexicalEntry(entry), `${surface}: direct promotion is typed`);
    assert.equal(entry.label, promotion.label, `${surface}: reviewed label`);
    assert.equal(entry.pos, promotion.pos, `${surface}: reviewed POS`);
    assert.equal(entry.syntax, promotion.syntax, `${surface}: reviewed syntax`);
    assert.equal(entry.provenance && entry.provenance.kind, "reviewed_lexical_promotion", `${surface}: reviewed provenance`);
  }
});

test("84 default-sensitive surfaces remain neutral while reviewed analyses are exposed", () => {
  for (const surface of reviewed.CANDIDATE_ONLY_SURFACES) {
    const entry = tokenLexicon[surface];
    assert.ok(reviewed.isNeutralLexicalEntry(entry), `${surface}: default remains neutral`);
    assert.equal(analyses[surface][0].id, `lex:${surface}:default`, `${surface}: stable default ID`);
    assert.equal(analyses[surface][0].pos, "lexical_item", `${surface}: default analysis remains neutral`);
    assert.ok(hasReviewedAlternative(surface), `${surface}: reviewed alternative exists`);
  }

  assert.equal(tokenLexicon["勇"].jyutping, "jung5");
  assert.equal(tokenLexicon["外"].jyutping, "ngoi6");
  assert.equal(tokenLexicon["嘍"].jyutping, "lo3");
  assert.equal(tokenLexicon["嘿"].jyutping, "hei3");
  assert.equal(tokenLexicon["行為"].jyutping, "hang4 wai4");
  assert.equal(tokenLexicon["棵"].jyutping, "po1");
});

test("four stale pre-existing typed defaults are corrected to final adjudication", () => {
  const expected = {
    "魚": ["what", "noun", "object_np fish_noun", "jyu2"],
    "飛": ["doing", "verb", "verb motion_verb lexical_verb", "fei1"],
    "小心": ["like", "adjective", "stative_predicate careful_property", "siu2 sam1"],
    "全": ["what", "determiner", "quantifier determiner universal_quantifier", "cyun4"],
  };
  for (const [surface, [label, pos, syntax, jyutping]] of Object.entries(expected)) {
    const entry = tokenLexicon[surface];
    assert.equal(entry.label, label, `${surface}: corrected label`);
    assert.equal(entry.pos, pos, `${surface}: corrected POS`);
    assert.equal(entry.syntax, syntax, `${surface}: corrected syntax`);
    assert.equal(entry.jyutping, jyutping, `${surface}: corrected reading`);
    assert.equal(entry.provenance && entry.provenance.kind, "reviewed_typed_default_correction", `${surface}: correction provenance`);
  }
  assert.ok(!/ticket/.test(tokenLexicon["飛"].note), "飛: stale ticket default is removed");
});

test("blocked and research-required rows receive no new atomic reviewed analysis", () => {
  for (const surface of reviewed.BLOCKED_ATOMIC_SURFACES) {
    assert.ok(tokenLexicon[surface], `${surface}: blocked exact surface retained`);
    assert.ok(!dynamic[surface], `${surface}: no new reviewed atomic analysis`);
    assert.notEqual(tokenLexicon[surface].provenance && tokenLexicon[surface].provenance.kind, "reviewed_lexical_promotion", `${surface}: not promoted`);
  }
  for (const surface of reviewed.RESEARCH_REQUIRED_SURFACES) {
    assert.ok(tokenLexicon[surface], `${surface}: research-required exact surface retained`);
    assert.ok(!dynamic[surface], `${surface}: no new reviewed atomic analysis`);
    assert.notEqual(tokenLexicon[surface].provenance && tokenLexicon[surface].provenance.kind, "reviewed_lexical_promotion", `${surface}: not promoted`);
  }
  assert.equal(tokenLexicon["我知"].syntax, "cognition_frame");
  assert.equal(tokenLexicon["我知"].jyutping, "ngo5 zi1");
  assert.equal(tokenLexicon["沿住"].syntax, "path_coverb");
  assert.equal(tokenLexicon["沿住"].jyutping, "jyun4 zyu6");
});

test("99 reviewed alternative surfaces preserve the effective current default first", () => {
  assert.equal(Object.keys(dynamic).length, 99);
  const seen = new Set();
  for (const [surface, rows] of Object.entries(dynamic)) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: dynamic analysis surface exists`);
    assert.ok(rows.length >= 2, `${surface}: default plus reviewed alternative(s)`);
    assert.equal(rows[0].id, `lex:${surface}:default`, `${surface}: default remains first`);
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

test("high-value reading splits and correction boundaries survive", () => {
  assert.deepEqual(new Set(readings("車")), new Set(["ce1", "geoi1"]));
  assert.ok(new Set(readings("礦")).has("kwong3"));
  assert.ok(new Set(readings("礦")).has("kong3"));
  assert.ok(new Set(readings("礦")).has("gwong3"));
  assert.deepEqual(new Set(readings("行為")), new Set(["hang4 wai4"]));
  assert.ok(!readings("行為").includes("hang6 wai4"));
  assert.deepEqual(new Set(readings("架")), new Set(["gaa3", "gaa2"]));
  assert.deepEqual(new Set(readings("魚")), new Set(["jyu2", "jyu4"]));
  assert.deepEqual(new Set(readings("房")), new Set(["fong2", "fong4"]));
  assert.deepEqual(new Set(readings("出面")), new Set(["ceot1 min6", "ceot1 min2"]));
  assert.deepEqual(new Set(readings("中文")), new Set(["zung1 man2", "zung1 man4"]));
  assert.deepEqual(new Set(readings("井")), new Set(["zeng2", "zing2"]));
  assert.deepEqual(new Set(readings("無")), new Set(["mou4", "mou5"]));
  assert.deepEqual(new Set(readings("正話")), new Set(["zing3 waa6", "zeng3 waa6"]));
});

test("detailed-pass narrowings are not silently re-broadened", () => {
  assert.equal(tokenLexicon["廣告"].pos, "noun");
  assert.ok(!dynamic["廣告"], "廣告: no unsupported free-verb alternative");
  assert.ok(reviewed.BLOCKED_ATOMIC_SURFACES.has("左手"));
  assert.ok(!dynamic["左手"]);
  assert.equal(tokenLexicon["附近"].syntax, "relative_place_expression");
  assert.ok(!dynamic["附近"], "附近: locality default is not broadened to an adverb analysis");
  assert.equal(tokenLexicon["鐘頭"].pos, "noun");
  assert.ok(!dynamic["鐘頭"], "鐘頭: no separate classifier analysis");
  assert.ok(/noun/.test(tokenLexicon["口"].syntax));
  assert.ok(!dynamic["口"], "口: no broad Mandarin-derived classifier analysis");
});

test("constructional and idiomatic rows remain default-sensitive", () => {
  for (const surface of ["來講", "令到", "掛住"]) {
    assert.ok(reviewed.isNeutralLexicalEntry(tokenLexicon[surface]), `${surface}: default remains neutral/compositional`);
    assert.ok(hasReviewedAlternative(surface), `${surface}: reviewed whole-form analysis exists`);
  }
  assert.ok(ids("掛住").some((id) => id === "lex:掛住:r951:reviewed_whole_form"));
});

test("ranks 1-750 stable lexical behavior survives ranks 751-1000 composition", () => {
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
  assert.ok(readings("樂").includes("ngaau6"));
  assert.ok(readings("磅").includes("bong2"));
  assert.deepEqual(new Set(readings("直行")), new Set(["zik6 haang4", "zik6 hong4"]));
  assert.equal(analyses["喀"][0].jyutping, "haak1");
});
