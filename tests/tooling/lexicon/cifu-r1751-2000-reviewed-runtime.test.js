#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const reviewed = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1751-2000-reviewed");
const policy = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1751-2000-runtime-policy");
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
  return cifuRows().filter((row) => row.rank >= 1751 && row.rank <= 2000);
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

test("ranks 1751-2000 retain all 250 exact Cantonese surfaces", () => {
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

test("runtime policy exactly reflects the final 143 + 45 + 23 + 37 + 2 authority partition", () => {
  assert.equal(Object.keys(reviewed.PROMOTIONS).length, 143);
  assert.equal(reviewed.MULTI_SURFACES.size, 45);
  assert.equal(reviewed.READING_SPLIT_SURFACES.size, 23);
  assert.equal(Object.keys(reviewed.ALTERNATIVE_SPECS).length, 68);
  assert.equal(reviewed.CANDIDATE_ONLY_SURFACES.size, 68);
  assert.equal(reviewed.BLOCKED_ATOMIC_SURFACES.size, 37);
  assert.equal(reviewed.RESEARCH_REQUIRED_SURFACES.size, 2);
  assert.equal(143 + 45 + 23 + 37 + 2, 250);

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
  assert.deepEqual(union, new Set(bandRowsFromCifu().map((row) => row.surface)));
});

test("143 broad rows become typed without flattening richer existing defaults", () => {
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

test("two held and 37 blocked surfaces receive no band-specific typed whole-surface fact", () => {
  assert.deepEqual(new Set(reviewed.RESEARCH_REQUIRED_SURFACES), new Set(["山個", "猷"]));
  for (const surface of [...reviewed.RESEARCH_REQUIRED_SURFACES, ...reviewed.BLOCKED_ATOMIC_SURFACES]) {
    const entry = tokenLexicon[surface];
    assert.ok(entry, `${surface}: exact-surface coverage retained`);
    assert.ok(!dynamic[surface], `${surface}: no reviewed atomic alternative set`);
    assert.ok(!(entry.provenance && entry.provenance.source === reviewed.SOURCE), `${surface}: no band-specific default typing`);
  }
});

test("68 alternative surfaces preserve the effective default first and stable nonempty analysis IDs", () => {
  assert.equal(Object.keys(dynamic).length, 68);
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
    "正版":"zing3 baan2", "老細":"lou5 sai3", "初頭":"co1 tau4", "晏晝":"aan3 zau3", "細妹":"sai3 mui2", "燕梳":"jin3 so1",
    "擦紙膠":"caat3 zi2 gaau1", "出邊":"ceot1 bin6", "全名":"cyun4 meng2", "好味":"hou2 mei6", "有份":"jau5 fan2", "判斷":"pun3 dyun3",
    "兔仔":"tou3 zai2", "呢邊":"ni1 bin1", "界定":"gaai3 deng6", "紅籌":"hung4 cau2", "唔知幾":"m4 zi1 gei2", "孭":"me1",
    "梳打":"so1 daa2", "硬係":"ngaang2 hai6", "傾計":"king1 gai2", "撈":"lou1",
  };
  for (const [surface, jyutping] of Object.entries(expected)) assert.equal(tokenLexicon[surface].jyutping, jyutping, `${surface}: reviewed default reading`);

  assert.ok(!readings("細妹").some((row) => /mui6/.test(row)), "細妹: rejected default mui6 is absent");
  assert.ok(!readings("黏").includes("zim1"), "黏: unreviewed zim1 candidate is absent");
  assert.ok(!readings("判斷").includes("pun3 tyun5"), "判斷: rejected tyun5 is absent");
  assert.ok(!readings("兔仔").some((row) => /zi2/.test(row)), "兔仔: rejected zi2 is absent");
  assert.ok(!readings("界定").includes("gaai3 ding6"), "界定: rejected ordinary ding6 is absent");
  assert.ok(!readings("傾計").includes("king1 gai3"), "傾計: rejected gai3 is absent");
  assert.ok(!readings("撈").includes("lou4"), "撈: rejected Cifu lou4 is absent");
});

test("critical polyfunctionality and reading splits survive exactly as reviewed", () => {
  assert.ok(bandRows("必要").some((row) => row.pos === "adjective"));
  assert.ok(bandRows("必要").some((row) => row.pos === "noun"));
  assert.ok(bandRows("咀").some((row) => row.pos === "noun" && row.jyutping === "zeoi2"));
  assert.ok(bandRows("咀").some((row) => row.pos === "verb" && row.jyutping === "zeoi2"));
  assert.ok(bandRows("活動").some((row) => row.pos === "noun"));
  assert.ok(bandRows("活動").some((row) => row.pos === "verb"));
  assert.ok(bandRows("一邊").some((row) => row.pos === "localizer"));
  assert.ok(bandRows("一邊").some((row) => row.pos === "function" && row.syntax === "simultaneous_pair_member"));
  assert.ok(bandRows("味").some((row) => row.pos === "noun"));
  assert.ok(bandRows("味").some((row) => row.pos === "verb"));
  assert.ok(bandRows("味").some((row) => row.pos === "classifier"));

  assert.ok(bandRows("拃").some((row) => row.pos === "classifier" && row.jyutping === "zaa6"));
  assert.ok(bandRows("拃").some((row) => row.pos === "measure" && row.jyutping === "zaa3"));
  assert.ok(bandRows("梗").some((row) => row.pos === "noun" && row.jyutping === "kwaang2"));
  assert.ok(bandRows("黏").some((row) => row.pos === "verb" && row.jyutping === "nim4"));
  assert.ok(bandRows("黏").some((row) => row.pos === "adjective" && row.jyutping === "nim1"));
  assert.ok(bandRows("傳").some((row) => row.pos === "verb" && row.jyutping === "cyun4"));
  assert.ok(bandRows("傳").some((row) => row.pos === "noun" && row.jyutping === "zyun6"));
  assert.ok(bandRows("撈").some((row) => row.pos === "verb" && row.jyutping === "lou1"));
  assert.ok(bandRows("撈").some((row) => row.pos === "verb" && row.jyutping === "laau4"));
});

test("Mandarin-contaminated analyses remain excluded while valid Cantonese surfaces stay typed", () => {
  assert.ok(tokenLexicon["在"]);
  assert.equal(tokenLexicon["在"].pos, "coverb");
  assert.equal(tokenLexicon["在"].syntax, "locative_relation_coverb");
  assert.ok(!/progress/i.test(`${tokenLexicon["在"].syntax} ${tokenLexicon["在"].note}`));

  assert.ok(tokenLexicon["校"]);
  assert.ok(bandRows("校").some((row) => row.pos === "noun" && row.jyutping === "haau6"));
  assert.ok(bandRows("校").some((row) => row.pos === "verb" && row.jyutping === "gaau3"));
  assert.ok(!bandRows("校").some((row) => row.pos === "classifier"));

  assert.ok(tokenLexicon["嘴"]);
  assert.equal(tokenLexicon["嘴"].pos, "noun");
  assert.ok(!bandRows("嘴").some((row) => row.pos === "classifier"));
});

test("lexicalized MWE coverage coexists with independently covered component surfaces", () => {
  const mwes = {
    "好味": ["好", "味"], "實際上": ["實際", "上"], "轉頭": ["轉", "頭"], "一模一樣": ["一", "模", "一樣"], "上堂": ["上", "堂"],
    "行路": ["行", "路"], "使錢": ["使", "錢"], "呢邊": ["呢", "邊"], "唔知幾": ["唔", "知", "幾"], "得滯": ["得", "滯"], "連埋": ["連", "埋"], "開會": ["開", "會"],
  };
  for (const [surface, components] of Object.entries(mwes)) {
    assert.ok(tokenLexicon[surface], `${surface}: lexicalized/conventional whole surface retained`);
    for (const component of components) assert.ok(tokenLexicon[component], `${surface}: component ${component} remains independently covered`);
  }
});

test("ranks 1-1750 high-value analysis identities and the 多少 exclusion survive final-band composition", () => {
  assert.deepEqual(ids("住"), ["lex:住:residence_verb", "lex:住:durative_marker"]);
  assert.deepEqual(ids("咪"), ["lex:咪:prohibitive_marker", "lex:咪:discourse_focus_marker", "lex:咪:study_verb"]);
  assert.deepEqual(ids("定"), ["lex:定:decide_fix_verb", "lex:定:alternative_connector", "lex:定:steady_stative", "lex:定:advance_adverb"]);
  assert.ok(ids("響").some((id) => id.includes("r1729")));
  assert.deepEqual(new Set(readings("魚")), new Set(["jyu2", "jyu4"]));
  assert.deepEqual(new Set(readings("直行")), new Set(["zik6 haang4", "zik6 hong4"]));
  assert.equal(analyses["喀"][0].jyutping, "haak1");
  assert.equal(tokenLexicon["多少"], undefined);
  assert.equal(analyses["多少"], undefined);
});
