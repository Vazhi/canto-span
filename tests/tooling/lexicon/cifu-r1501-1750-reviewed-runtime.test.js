#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const reviewed = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1501-1750-reviewed");
const { buildLexicalAnalysisIndex } = require("../../../src/runtime-resources/lexicon/lexical-analyses");

const root = path.resolve(__dirname, "../../..");
const tokenLexicon = Object.fromEntries(tokenEntries);
const analyses = buildLexicalAnalysisIndex(tokenEntries);
const dynamic = reviewed.buildExplicitAnalyses(tokenEntries);

function cifuRows() {
  const lines = fs.readFileSync(path.join(root, "data", "lexical-frequency", "cifu-spoken-top-2000.tsv"), "utf8")
    .replace(/^\uFEFF/u, "").trimEnd().split(/\r?\n/u);
  const header = lines.shift().split("\t");
  const ix = Object.fromEntries(header.map((name, index) => [name, index]));
  return lines.map((line) => {
    const row = line.split("\t");
    return { rank: Number(row[ix.rank]), surface: row[ix.word] };
  });
}
function bandRowsFromCifu() { return cifuRows().filter((row) => row.rank >= 1501 && row.rank <= 1750); }
function ids(surface) { return (analyses[surface] || []).map((row) => row.id); }
function readings(surface) { return (analyses[surface] || []).map((row) => row.jyutping); }
function bandRows(surface) { return (analyses[surface] || []).slice(1).filter((row) => row.provenance && row.provenance.source === reviewed.SOURCE); }

test("rank-1501-1750 authority classes are disjoint and cover the source band", () => {
  const rows = bandRowsFromCifu();
  assert.equal(rows.length, 250);
  assert.equal(new Set(rows.map((row) => row.surface)).size, 250);
  const sets = [
    new Set(Object.keys(reviewed.PROMOTIONS)),
    reviewed.MULTI_SURFACES,
    reviewed.READING_SPLIT_SURFACES,
    reviewed.BLOCKED_ATOMIC_SURFACES,
    reviewed.RESEARCH_REQUIRED_SURFACES,
  ];
  const union = new Set();
  for (const set of sets) {
    for (const surface of set) {
      assert.ok(!union.has(surface), `${surface}: authority-class overlap`);
      union.add(surface);
    }
  }
  assert.deepEqual(union, new Set(rows.map((row) => row.surface)));
});

test("broad reviewed rows are typed without flattening richer existing defaults", () => {
  for (const [surface, promotion] of Object.entries(reviewed.PROMOTIONS)) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: runtime entry exists`);
    assert.ok(!reviewed.isNeutralLexicalEntry(entry), `${surface}: reviewed broad selection is typed`);
    if (entry.provenance && entry.provenance.source === reviewed.SOURCE && entry.provenance.kind === "reviewed_lexical_promotion") {
      assert.equal(entry.label, promotion.label);
      assert.equal(entry.pos, promotion.pos);
      assert.equal(entry.syntax, promotion.syntax);
    } else {
      assert.notEqual(entry.pos, "lexical_item");
      assert.notEqual(entry.syntax, "lexical_item");
    }
  }
});

test("held and blocked rows receive no band-specific atomic fact", () => {
  for (const surface of [...reviewed.RESEARCH_REQUIRED_SURFACES, ...reviewed.BLOCKED_ATOMIC_SURFACES]) {
    assert.ok(!dynamic[surface], `${surface}: no reviewed atomic alternative set`);
    const entry = tokenLexicon[surface];
    if (entry) assert.ok(!(entry.provenance && entry.provenance.source === reviewed.SOURCE), `${surface}: no band-specific default typing`);
  }
});

test("reviewed alternatives preserve the effective default first and stable IDs", () => {
  assert.deepEqual(new Set(Object.keys(dynamic)), new Set(Object.keys(reviewed.ALTERNATIVE_SPECS)));
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
    assert.deepEqual(ids(surface), rows.map((row) => row.id));
    for (const row of rows) {
      assert.ok(row.jyutping, `${row.id}: non-empty Jyutping`);
      assert.ok(!seen.has(row.id), `${row.id}: unique stable ID`);
      seen.add(row.id);
    }
  }
});

test("reviewed pronunciation corrections replace rejected source candidates", () => {
  const expected = {
    "重複": "cung4 fuk1", "唪": "fung2", "舖頭": "pou3 tau2", "壞": "waai6", "犯": "faan6", "夾": "gaap3", "柱": "cyu5",
    "細路仔": "sai3 lou6 zai2", "雀": "zoek3", "掣": "zai3", "琴晚": "kam4 maan5", "睇住": "tai2 zyu6", "溜": "lau6",
    "補充": "bou2 cung1", "遇到": "jyu6 dou2", "一號": "jat1 hou6", "人話": "jan4 waa6", "響": "hoeng2", "及": "kap6",
  };
  for (const [surface, jyutping] of Object.entries(expected)) assert.equal(tokenLexicon[surface].jyutping, jyutping, `${surface}: reviewed default reading`);
  assert.ok(!readings("舖頭").includes("pou3 tau4"));
  assert.ok(!readings("壞").includes("waai2"));
  assert.ok(!readings("細路仔").some((row) => /zi2/u.test(row)));
  assert.ok(!readings("掣").includes("cit3"));
  assert.ok(!readings("溜").some((row) => row === "lau1" || row === "liu1"));
});

test("critical polyfunctionality and reading splits survive as reviewed", () => {
  assert.ok(bandRows("重複").some((row) => row.pos === "verb" && row.jyutping === "cung4 fuk1"));
  assert.ok(bandRows("重複").some((row) => row.pos === "adverb" && row.jyutping === "cung4 fuk1"));
  assert.ok(!bandRows("重複").some((row) => row.pos === "adjective"));
  assert.ok(bandRows("焗").some((row) => row.pos === "verb"));
  assert.ok(bandRows("焗").some((row) => row.pos === "adjective"));
  assert.ok(bandRows("根據").some((row) => row.pos === "coverb"));
  assert.ok(bandRows("根據").some((row) => row.pos === "noun"));
  assert.ok(bandRows("根據").some((row) => row.pos === "verb"));
  assert.ok(bandRows("犯").some((row) => row.pos === "verb" && row.jyutping === "faan6"));
  assert.ok(bandRows("犯").some((row) => row.pos === "noun" && row.jyutping === "faan2"));
  assert.ok(bandRows("鋪").some((row) => row.pos === "verb" && row.jyutping === "pou1"));
  assert.ok(bandRows("鋪").some((row) => row.pos === "noun" && row.jyutping === "pou3"));
  assert.ok(bandRows("鋪").some((row) => row.pos === "classifier" && row.jyutping === "pou3"));
  assert.ok(bandRows("響").some((row) => row.pos === "coverb" && row.syntax === "locative_relation_coverb"));
  assert.ok(bandRows("響").every((row) => row.jyutping === "hoeng2"));
  assert.ok(bandRows("及").some((row) => row.pos === "function"));
  assert.ok(bandRows("及").some((row) => row.pos === "bound"));
  assert.ok(!bandRows("及").some((row) => row.pos === "verb"));
});

test("lexicalized MWEs coexist with independently covered component surfaces", () => {
  const mwes = {
    "搞掂": ["搞", "掂"], "出聲": ["出", "聲"], "好笑": ["好", "笑"], "收埋": ["收", "埋"], "唔錯": ["唔", "錯"],
    "幾點": ["幾", "點"], "一刻": ["一", "刻"], "好食": ["好", "食"], "好聽": ["好", "聽"], "睇住": ["睇", "住"],
    "遇到": ["遇", "到"], "一號": ["一", "號"], "人話": ["人", "話"],
  };
  for (const [surface, components] of Object.entries(mwes)) {
    assert.ok(tokenLexicon[surface], `${surface}: whole surface retained`);
    for (const component of components) assert.ok(tokenLexicon[component], `${surface}: component ${component} covered`);
  }
});

test("earlier protected analysis identities survive rank-1501-1750 composition", () => {
  assert.deepEqual(ids("住"), ["lex:住:residence_verb", "lex:住:durative_marker"]);
  assert.deepEqual(ids("咪"), ["lex:咪:prohibitive_marker", "lex:咪:discourse_focus_marker", "lex:咪:study_verb"]);
  assert.deepEqual(ids("定"), ["lex:定:decide_fix_verb", "lex:定:alternative_connector", "lex:定:steady_stative", "lex:定:advance_adverb"]);
  assert.deepEqual(new Set(readings("魚")), new Set(["jyu2", "jyu4"]));
  assert.deepEqual(new Set(readings("直行")), new Set(["zik6 haang4", "zik6 hong4"]));
  assert.equal(analyses["喀"][0].jyutping, "haak1");
});
