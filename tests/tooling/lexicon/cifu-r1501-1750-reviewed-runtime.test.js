#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const reviewed = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1501-1750-reviewed");
const policy = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1501-1750-runtime-policy");
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

function bandRowsFromCifu() {
  return cifuRows().filter((row) => row.rank >= 1501 && row.rank <= 1750);
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

test("ranks 1501-1750 retain all 250 exact Cantonese surfaces", () => {
  const rows = bandRowsFromCifu();
  assert.equal(rows.length, 250);
  assert.equal(new Set(rows.map((row) => row.surface)).size, 250);
  for (const { surface } of rows) assert.ok(tokenLexicon[surface], `${surface}: exact runtime surface retained`);
  assert.equal(policy.MANDARIN_ONLY_SURFACES.size, 0);
});

test("global Cifu top-2000 exact runtime coverage remains 1999/2000 with 多少 as the sole exclusion", () => {
  const rows = cifuRows();
  assert.equal(rows.length, 2000);
  const missing = rows.filter((row) => !tokenLexicon[row.surface]);
  assert.deepEqual(missing, [{ rank: 1404, surface: "多少" }]);
});

test("runtime policy exactly reflects the corrected 139 + 42 + 16 + 45 + 8 authority partition", () => {
  assert.equal(Object.keys(reviewed.PROMOTIONS).length, 139);
  assert.equal(reviewed.MULTI_SURFACES.size, 42);
  assert.equal(reviewed.READING_SPLIT_SURFACES.size, 16);
  assert.equal(Object.keys(reviewed.ALTERNATIVE_SPECS).length, 58);
  assert.equal(reviewed.CANDIDATE_ONLY_SURFACES.size, 58);
  assert.equal(reviewed.BLOCKED_ATOMIC_SURFACES.size, 45);
  assert.equal(reviewed.RESEARCH_REQUIRED_SURFACES.size, 8);
  assert.equal(139 + 42 + 16 + 45 + 8, 250);

  const sets = [
    new Set(Object.keys(reviewed.PROMOTIONS)), reviewed.MULTI_SURFACES, reviewed.READING_SPLIT_SURFACES,
    reviewed.BLOCKED_ATOMIC_SURFACES, reviewed.RESEARCH_REQUIRED_SURFACES,
  ];
  const union = new Set();
  for (const set of sets) {
    for (const surface of set) {
      assert.ok(!union.has(surface), `${surface}: authority classes must remain mutually exclusive`);
      union.add(surface);
    }
  }
  assert.equal(union.size, 250);
});

test("139 broad rows become typed without flattening richer existing defaults", () => {
  for (const [surface, promotion] of Object.entries(reviewed.PROMOTIONS)) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: runtime entry exists`);
    assert.ok(!reviewed.isNeutralLexicalEntry(entry), `${surface}: reviewed broad selection is typed`);
    if (entry.provenance && entry.provenance.source === reviewed.SOURCE && entry.provenance.kind === "reviewed_lexical_promotion") {
      assert.equal(entry.label, promotion.label, `${surface}: promoted lexical role`);
      assert.equal(entry.pos, promotion.pos, `${surface}: promoted POS`);
      assert.equal(entry.syntax, promotion.syntax, `${surface}: promoted syntax`);
    } else {
      assert.notEqual(entry.pos, "lexical_item", `${surface}: existing richer typed default remains typed`);
      assert.notEqual(entry.syntax, "lexical_item", `${surface}: existing richer syntax is preserved`);
    }
  }
});

test("eight held and 45 blocked surfaces receive no band-specific typed whole-surface fact", () => {
  assert.deepEqual(new Set(reviewed.RESEARCH_REQUIRED_SURFACES), new Set(["罷", "羅", "司", "個萍", "單仲佳", "感", "會會", "碧"]));
  for (const surface of [...reviewed.RESEARCH_REQUIRED_SURFACES, ...reviewed.BLOCKED_ATOMIC_SURFACES]) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: exact-surface coverage retained`);
    assert.ok(!dynamic[surface], `${surface}: no reviewed atomic alternative set`);
    assert.ok(!(entry.provenance && entry.provenance.source === reviewed.SOURCE), `${surface}: no band-specific default typing`);
  }
});

test("58 alternative surfaces preserve the effective default first and stable nonempty analysis IDs", () => {
  assert.equal(Object.keys(dynamic).length, 58);
  const seen = new Set();
  for (const [surface, rows] of Object.entries(dynamic)) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: runtime entry exists`);
    assert.ok(rows.length >= 2, `${surface}: default plus reviewed alternative(s)`);
    assert.equal(rows[0].id, `lex:${surface}:default`);
    assert.equal(rows[0].label, entry.label || "neutral");
    assert.equal(rows[0].pos, entry.pos || "lexical_item");
    assert.equal(rows[0].syntax, entry.syntax || "lexical_candidate");
    assert.equal(rows[0].jyutping, entry.jyutping || "");
    assert.deepEqual(ids(surface), rows.map((row) => row.id), `${surface}: reviewed alternatives are effective`);
    for (const row of rows) {
      assert.ok(row.jyutping, `${row.id}: non-empty Jyutping`);
      assert.ok(!seen.has(row.id), `${row.id}: unique stable ID`);
      seen.add(row.id);
    }
  }
});

test("reviewed pronunciation corrections replace rejected Cifu candidates", () => {
  const expected = {
    "重複": "cung4 fuk1", "唪": "fung2", "舖頭": "pou3 tau2", "壞": "waai6", "犯": "faan6", "夾": "gaap3", "柱": "cyu5",
    "細路仔": "sai3 lou6 zai2", "雀": "zoek3", "掣": "zai3", "琴晚": "kam4 maan5", "睇住": "tai2 zyu6", "溜": "lau6",
    "補充": "bou2 cung1", "遇到": "jyu6 dou2", "一號": "jat1 hou6", "人話": "jan4 waa6", "響": "hoeng2", "及": "kap6",
  };
  for (const [surface, jyutping] of Object.entries(expected)) assert.equal(tokenLexicon[surface].jyutping, jyutping, `${surface}: reviewed default reading`);
  assert.ok(!readings("舖頭").includes("pou3 tau4"), "舖頭: rejected tau4 is absent");
  assert.ok(!readings("壞").includes("waai2"), "壞: unreviewed ordinary waai2 is absent");
  assert.ok(!readings("細路仔").some((row) => /zi2/.test(row)), "細路仔: rejected zi2 is absent");
  assert.ok(!readings("掣").includes("cit3"), "掣: rejected cit3 is absent");
  assert.ok(!readings("溜").some((row) => row === "lau1" || row === "liu1"), "溜: unsupported lau1/liu1 are absent");
});

test("critical polyfunctionality and reading splits survive exactly as reviewed", () => {
  assert.ok(bandRows("重複").some((row) => row.pos === "verb" && row.jyutping === "cung4 fuk1"));
  assert.ok(bandRows("重複").some((row) => row.pos === "adverb" && row.jyutping === "cung4 fuk1"));
  assert.ok(!bandRows("重複").some((row) => row.pos === "adjective"));
  assert.ok(bandRows("焗").some((row) => row.pos === "verb" && row.jyutping === "guk6"));
  assert.ok(bandRows("焗").some((row) => row.pos === "adjective" && row.jyutping === "guk6"));
  assert.ok(bandRows("根據").some((row) => row.pos === "coverb"));
  assert.ok(bandRows("根據").some((row) => row.pos === "noun"));
  assert.ok(bandRows("根據").some((row) => row.pos === "verb"));
  assert.ok(bandRows("犯").some((row) => row.pos === "verb" && row.jyutping === "faan6"));
  assert.ok(bandRows("犯").some((row) => row.pos === "noun" && row.jyutping === "faan2"));
  assert.ok(bandRows("鋪").some((row) => row.pos === "verb" && row.jyutping === "pou1"));
  assert.ok(bandRows("鋪").some((row) => row.pos === "noun" && row.jyutping === "pou3"));
  assert.ok(bandRows("鋪").some((row) => row.pos === "classifier" && row.jyutping === "pou3"));

  const hoeng = bandRows("響");
  assert.ok(hoeng.some((row) => row.pos === "verb" && row.syntax === "sound_verb"));
  assert.ok(hoeng.some((row) => row.pos === "coverb" && row.syntax === "locative_relation_coverb"));
  assert.ok(hoeng.some((row) => row.pos === "verb" && row.syntax === "locative_existential_verb"));
  assert.ok(hoeng.every((row) => row.jyutping === "hoeng2"));

  assert.ok(bandRows("爛").some((row) => row.pos === "adjective"));
  assert.ok(bandRows("爛").some((row) => row.pos === "adverb"));
  assert.ok(!bandRows("爛").some((row) => row.pos === "noun"));
  assert.ok(bandRows("及").some((row) => row.pos === "function" && row.jyutping === "kap6"));
  assert.ok(bandRows("及").some((row) => row.pos === "bound" && row.jyutping === "kap6"));
  assert.ok(!bandRows("及").some((row) => row.pos === "verb"));
  assert.ok(bandRows("卡").some((row) => row.pos === "noun" && row.jyutping === "kaat1"));
  assert.ok(bandRows("卡").some((row) => row.pos === "classifier" && row.jyutping === "kaa1"));
  assert.ok(bandRows("卡").some((row) => row.pos === "measure" && row.jyutping === "kaa1"));
});

test("lexicalized MWE coverage coexists with independently covered component surfaces", () => {
  const mwes = {
    "搞掂": ["搞", "掂"], "出聲": ["出", "聲"], "好笑": ["好", "笑"], "收埋": ["收", "埋"], "唔錯": ["唔", "錯"],
    "幾點": ["幾", "點"], "一刻": ["一", "刻"], "好食": ["好", "食"], "好聽": ["好", "聽"], "睇住": ["睇", "住"],
    "遇到": ["遇", "到"], "一號": ["一", "號"], "人話": ["人", "話"],
  };
  for (const [surface, components] of Object.entries(mwes)) {
    assert.ok(tokenLexicon[surface], `${surface}: lexicalized/conventional whole surface retained`);
    for (const component of components) assert.ok(tokenLexicon[component], `${surface}: component ${component} remains independently covered`);
  }
});

test("ranks 1-1500 high-value analysis identities and the 多少 exclusion survive composition", () => {
  assert.deepEqual(ids("住"), ["lex:住:residence_verb", "lex:住:durative_marker"]);
  assert.deepEqual(ids("咪"), ["lex:咪:prohibitive_marker", "lex:咪:discourse_focus_marker", "lex:咪:study_verb"]);
  assert.deepEqual(ids("定"), ["lex:定:decide_fix_verb", "lex:定:alternative_connector", "lex:定:steady_stative", "lex:定:advance_adverb"]);
  assert.deepEqual(new Set(readings("魚")), new Set(["jyu2", "jyu4"]));
  assert.deepEqual(new Set(readings("直行")), new Set(["zik6 haang4", "zik6 hong4"]));
  assert.equal(analyses["喀"][0].jyutping, "haak1");
  assert.equal(tokenLexicon["多少"], undefined);
  assert.equal(analyses["多少"], undefined);
});
