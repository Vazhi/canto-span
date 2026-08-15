#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const reviewed = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1251-1500-reviewed");
const policy = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1251-1500-runtime-policy");
const { buildLexicalAnalysisIndex } = require("../../../src/runtime-resources/lexicon/lexical-analyses");

const root = path.resolve(__dirname, "../../..");
const tokenLexicon = Object.fromEntries(tokenEntries);
const analyses = buildLexicalAnalysisIndex(tokenEntries);
const dynamic = reviewed.buildExplicitAnalyses(tokenEntries);

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
  return cifuRows()
    .filter((row) => row.rank >= 1251 && row.rank <= 1500)
    .map((row) => row.surface);
}

function ids(surface) {
  return (analyses[surface] || []).map((row) => row.id);
}

function readings(surface) {
  return (analyses[surface] || []).map((row) => row.jyutping);
}

function bandRows(surface) {
  return (analyses[surface] || []).slice(1).filter((row) => row.provenance && row.provenance.source === reviewed.SOURCE);
}

test("ranks 1251-1500 retain every Cantonese surface while excluding positive contamination", () => {
  const surfaces = bandSurfaces();
  assert.equal(surfaces.length, 250);
  assert.equal(new Set(surfaces).size, 250);
  for (const surface of surfaces) {
    if (surface === "多少") {
      assert.equal(tokenLexicon[surface], undefined, "多少: positive non-Cantonese surface is absent from effective runtime");
    } else {
      assert.ok(tokenLexicon[surface], `${surface}: exact runtime surface retained`);
    }
  }
  assert.ok(tokenLexicon["幾多"], "幾多: Cantonese counterpart remains covered");
});

test("Cifu top-2000 exact runtime coverage is truthfully 1999/2000 after removing 多少", () => {
  const rows = cifuRows();
  assert.equal(rows.length, 2000);
  assert.equal(new Set(rows.map((row) => row.surface)).size, 2000);
  const missing = rows.filter((row) => !tokenLexicon[row.surface]);
  assert.deepEqual(missing, [{ rank: 1404, surface: "多少" }]);
});

test("runtime policy exactly reflects the 126 + 3 + 43 + 29 + 49 authority partition", () => {
  assert.equal(Object.keys(reviewed.PROMOTIONS).length, 126);
  assert.equal(reviewed.SOURCE_ONLY_SURFACES.size, 3);
  assert.equal(reviewed.INDEPENDENT_ZERO_HIT_SURFACES.size, 37);
  assert.equal(Object.keys(reviewed.MULTI_SPECS).length, 43);
  assert.equal(Object.keys(reviewed.READING_SPECS).length, 29);
  assert.equal(Object.keys(reviewed.ALTERNATIVE_SPECS).length, 72);
  assert.equal(reviewed.CANDIDATE_ONLY_SURFACES.size, 72);
  assert.equal(reviewed.BLOCKED_ATOMIC_SURFACES.size, 49);
  assert.equal(126 + 3 + 43 + 29 + 49, 250);
  assert.deepEqual([...policy.MANDARIN_ONLY_SURFACES], ["多少"]);
  assert.ok(reviewed.BLOCKED_ATOMIC_SURFACES.has("多少"));

  const promotionSet = new Set(Object.keys(reviewed.PROMOTIONS));
  const alternativeSet = new Set(Object.keys(reviewed.ALTERNATIVE_SPECS));
  for (const surface of promotionSet) {
    assert.ok(!reviewed.SOURCE_ONLY_SURFACES.has(surface), `${surface}: pending source-only row is not promoted`);
    assert.ok(!reviewed.BLOCKED_ATOMIC_SURFACES.has(surface), `${surface}: blocked row is not promoted`);
    assert.ok(!alternativeSet.has(surface), `${surface}: broad selection is not duplicated as an alternative set`);
  }
  assert.equal(reviewed.PROMOTIONS["似乎"].pos, "function", "似乎: R3 keeps the broad epistemic/seeming family category-neutral");
  assert.equal(reviewed.PROMOTIONS["似乎"].syntax, "epistemic_seeming_expression");
});

test("126 independently supportable broad rows are typed without flattening richer existing defaults", () => {
  for (const [surface, promotion] of Object.entries(reviewed.PROMOTIONS)) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: runtime entry exists`);
    assert.ok(!reviewed.isNeutralLexicalEntry(entry), `${surface}: reviewed broad selection is typed`);
    if (entry.provenance && entry.provenance.source === reviewed.SOURCE && entry.provenance.kind === "reviewed_lexical_promotion") {
      assert.equal(entry.label, promotion.label, `${surface}: promoted lexical role`);
      assert.equal(entry.pos, promotion.pos, `${surface}: promoted POS`);
      assert.equal(entry.syntax, promotion.syntax, `${surface}: promoted syntax`);
    } else {
      assert.notEqual(entry.pos, "lexical_item", `${surface}: pre-existing richer typed default remains typed`);
      assert.notEqual(entry.syntax, "lexical_item", `${surface}: pre-existing richer syntax is preserved`);
    }
  }
});

test("three pending zero-hit rows receive no band-specific typed fact", () => {
  assert.deepEqual(new Set(reviewed.SOURCE_ONLY_SURFACES), new Set(["平排", "打直", "打斜"]));
  for (const surface of reviewed.SOURCE_ONLY_SURFACES) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: neutral exact-surface coverage retained`);
    assert.ok(!dynamic[surface], `${surface}: no reviewed alternative set`);
    assert.ok(!(entry.provenance && entry.provenance.source === reviewed.SOURCE), `${surface}: no band-specific default typing`);
  }
});

test("49 blocked rows receive no typed whole-surface analysis and 多少 alone is removed", () => {
  for (const surface of reviewed.BLOCKED_ATOMIC_SURFACES) {
    assert.ok(!dynamic[surface], `${surface}: no reviewed atomic alternative set`);
    if (surface === "多少") {
      assert.equal(tokenLexicon[surface], undefined);
      continue;
    }
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: genuine or auditable exact surface retained`);
    assert.ok(!(entry.provenance && entry.provenance.source === reviewed.SOURCE), `${surface}: not promoted by this band`);
  }
});

test("72 reviewed alternative surfaces preserve the effective default first and use stable IDs", () => {
  assert.equal(Object.keys(dynamic).length, 72);
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
    assert.deepEqual(ids(surface), rows.map((row) => row.id), `${surface}: reviewed records are effective`);
    for (const row of rows) {
      assert.ok(row.jyutping, `${row.id}: non-empty Jyutping`);
      assert.ok(!seen.has(row.id), `${row.id}: unique stable ID`);
      seen.add(row.id);
    }
  }
});

test("explicit reading corrections replace unsupported Cifu/default candidates", () => {
  const expected = {
    "下邊": "haa6 bin1",
    "收到": "sau1 dou2",
    "下下": "haa5 haa5",
    "上年": "soeng6 nin2",
    "不斷": "bat1 dyun6",
    "艾爾頓": "aai6 ji5 deon6",
    "亞視": "aa3 si6",
    "家姐": "gaa1 ze1",
    "捉": "zuk1",
    "膠袋": "gaau1 doi2",
  };
  for (const [surface, jyutping] of Object.entries(expected)) {
    assert.equal(tokenLexicon[surface].jyutping, jyutping, `${surface}: reviewed default reading`);
  }
  assert.ok(!readings("收到").some((row) => row.includes("dou3")), "收到: Cifu dou3 is not exposed as a reviewed reading");
  assert.ok(!readings("家姐").some((row) => row.includes("ze2")), "家姐: rejected ze2 is absent");
  assert.ok(!readings("捉").includes("zuk3"), "捉: unverified zuk3 is absent");
  assert.ok(!readings("膠袋").includes("gaau1 doi6"), "膠袋: verbal doi6 is not a compound-noun reading");
});

test("implementation-critical polyfunctionality and reading splits survive", () => {
  assert.ok(bandRows("公眾").some((row) => row.pos === "noun"));
  assert.ok(bandRows("公眾").some((row) => row.pos === "adjective"));
  assert.ok(bandRows("後生").some((row) => row.pos === "adjective"));
  assert.ok(bandRows("後生").some((row) => row.pos === "noun"));
  assert.ok(bandRows("花").some((row) => row.pos === "noun"));
  assert.ok(bandRows("花").some((row) => row.pos === "verb"));
  assert.ok(bandRows("花").some((row) => row.pos === "adjective"));
  assert.ok(bandRows("花").some((row) => row.pos === "bound"));
  assert.ok(bandRows("金").some((row) => row.pos === "noun"));
  assert.ok(bandRows("金").some((row) => row.pos === "bound"), "金: R3 preserves a bound/attributive family");
  assert.ok(!bandRows("金").some((row) => row.pos === "adjective"), "金: no unsupported free adjective analysis");
  assert.ok(bandRows("迫").some((row) => row.pos === "verb" && row.jyutping === "bik1"));
  assert.ok(bandRows("迫").some((row) => row.pos === "adjective" && row.jyutping === "bik1"), "迫: crowded/pressing property use is preserved separately");
  assert.ok(bandRows("迫").some((row) => row.pos === "verb" && row.jyutping === "baak1"));

  assert.deepEqual(new Set(readings("唔好意思")), new Set(["m4 hou2 ji3 si1", "m4 hou2 ji3 si3"]));
  assert.deepEqual(new Set(readings("純粹")), new Set(["seon4 seoi5", "seon4 seoi6"]));
  for (const reading of readings("著")) assert.ok(new Set(["zyu3", "zoek3", "zoek6"]).has(reading), `著: supported reading ${reading}`);
  assert.ok(readings("著").includes("zyu3"));
  assert.ok(readings("著").includes("zoek3"));
  assert.ok(readings("著").includes("zoek6"));
  for (const reading of readings("黑")) assert.ok(new Set(["haak1", "hak1"]).has(reading), `黑: supported color-family reading ${reading}`);
  assert.ok(!bandRows("黑").some((row) => row.pos === "verb"), "黑: no fabricated hack verb");
  assert.ok(readings("寧願").includes("ning4 jyun2"));
  assert.ok(readings("寧願").includes("ning4 jyun6"));
  assert.ok(readings("數").includes("sou2"));
  assert.ok(readings("數").includes("sou3"));
  assert.ok(readings("樓").includes("lau2"));
  assert.ok(readings("樓").includes("lau4"));
});

test("ranks 1-1250 stable high-value analyses survive ranks 1251-1500 composition", () => {
  assert.deepEqual(ids("住"), ["lex:住:residence_verb", "lex:住:durative_marker"]);
  assert.deepEqual(ids("咪"), ["lex:咪:prohibitive_marker", "lex:咪:discourse_focus_marker", "lex:咪:study_verb"]);
  assert.deepEqual(ids("定"), ["lex:定:decide_fix_verb", "lex:定:alternative_connector", "lex:定:steady_stative", "lex:定:advance_adverb"]);
  assert.deepEqual(new Set(readings("魚")), new Set(["jyu2", "jyu4"]));
  assert.deepEqual(new Set(readings("直行")), new Set(["zik6 haang4", "zik6 hong4"]));
  assert.equal(analyses["喀"][0].jyutping, "haak1");
});
