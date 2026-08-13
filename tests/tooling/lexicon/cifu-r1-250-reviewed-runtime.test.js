#!/usr/bin/env node
"use strict";

const assert = require("assert/strict");
const test = require("node:test");
const { loadRuntimeApi } = require("../../lib/runtime-api");
const TOKEN_LEXICON_ENTRIES = require("../../../src/runtime-resources/lexicon/token-lexicon");
const FREQUENCY_FALLBACK = require("../../../src/runtime-resources/lexicon/token-lexicon/frequency-gap-fill-r7");
const REVIEWED = require("../../../src/runtime-resources/lexicon/token-lexicon/cifu-r1-250-reviewed");
const { buildLexicalAnalysisIndex } = require("../../../src/runtime-resources/lexicon/lexical-analyses");

const api = loadRuntimeApi({ apiNames: ["analyzeLine", "diagnosticFinalRows", "TOKEN_LEXICON"] });
const tokenLexicon = Object.fromEntries(TOKEN_LEXICON_ENTRIES);
const analysisIndex = buildLexicalAnalysisIndex(TOKEN_LEXICON_ENTRIES);
const fallbackSurfaces = new Set(FREQUENCY_FALLBACK.map(([surface]) => surface));

function isNeutralFrequencyFallback(entry = {}) {
  return String(entry.pos || "") === "lexical_item"
    && String(entry.syntax || "").split(/\s+/u).includes("lexical_item")
    && String(entry.note || "").includes("Exact surface retained as neutral lexical coverage");
}

function tokenSurfaces(surface) {
  return api.diagnosticFinalRows(api.analyzeLine(surface))
    .filter((row) => row.kind === "token")
    .map((row) => row.surface);
}

function readings(surface) {
  return new Set((analysisIndex[surface] || []).map((row) => row.jyutping));
}

function ids(surface) {
  return new Set((analysisIndex[surface] || []).map((row) => row.id));
}

test("neutral frequency coverage cannot overwrite a typed/reviewed same-surface entry", () => {
  const overlappingTypedSurfaces = new Set(
    TOKEN_LEXICON_ENTRIES
      .filter(([surface, entry]) => fallbackSurfaces.has(surface) && !isNeutralFrequencyFallback(entry))
      .map(([surface]) => surface),
  );

  assert.ok(overlappingTypedSurfaces.size >= 20, "test must exercise a meaningful set of same-surface overlaps");
  for (const surface of overlappingTypedSurfaces) {
    assert.equal(
      isNeutralFrequencyFallback(tokenLexicon[surface]),
      false,
      `${surface}: final same-surface entry must not be the neutral frequency fallback`,
    );
  }
});

test("reviewed #792 corrections replace stale active Cifu-derived metadata", () => {
  const expected = new Map([
    ["誒", ["e6", "interjection"]],
    ["嘛", ["maa5", "particle"]],
    ["嗯", ["m6", "interjection"]],
    ["哩個", ["ni1 go3", "pronoun"]],
    ["個位", ["go3 wai2", "noun"]],
    ["戀", ["lyun2", "morpheme"]],
    ["韻", ["wan5", "noun"]],
    ["廟", ["miu2", "noun"]],
    ["幾多", ["gei2 do1", "pronoun"]],
  ]);

  for (const [surface, [jyutping, pos]] of expected) {
    assert.equal(tokenLexicon[surface].jyutping, jyutping, `${surface}: reviewed Jyutping`);
    assert.equal(tokenLexicon[surface].pos, pos, `${surface}: reviewed POS/category`);
    assert.equal(tokenLexicon[surface].review, "reviewed_cifu_r1_250", `${surface}: review provenance`);
  }
});

test("reviewed multiple analyses preserve independently supported category and reading families", () => {
  assert.deepEqual(readings("嗯"), new Set(["m6", "m3", "m2"]));
  assert.deepEqual(readings("右邊"), new Set(["jau6 bin1", "jau6 bin6"]));
  assert.deepEqual(readings("左邊"), new Set(["zo2 bin1", "zo2 bin6"]));
  assert.deepEqual(readings("廟"), new Set(["miu2", "miu6"]));
  assert.deepEqual(readings("韻"), new Set(["wan5", "wan6"]));
  assert.ok(ids("咪").has("lex:咪:study_cram_verb"));
  assert.equal((analysisIndex["等"] || []).length, 4, "等 must preserve conjunction/verb/noun/list-suffix analyses");
  assert.equal((analysisIndex["成"] || []).length, 6, "成 must preserve the reviewed reading/category families");
  assert.equal((analysisIndex["位"] || []).length, 4, "位 must keep wai2 and wai6 category distinctions");
});

test("mixed lexical/compositional decisions are represented without forcing every occurrence atomic", () => {
  assert.ok(ids("唔見").has("lex:唔見:lexicalized_verb"), "唔見 lexicalized verb analysis must be represented");
  assert.ok(ids("都會").has("lex:都會:metropolis_noun"), "都會 metropolis analysis must be represented");
  assert.ok(ids("一樣").has("lex:一樣:adjective"), "一樣 same/alike analysis must be represented");

  assert.deepEqual(tokenSurfaces("唔見"), ["唔", "見"], "ordinary bare 唔見 remains compositionally available by default");
  assert.deepEqual(tokenSurfaces("都會"), ["都", "會"], "bare 都會 retains compositional dou1+wui5 default absent noun context");
  assert.deepEqual(tokenSurfaces("一樣"), ["一", "樣"], "literal bare 一樣 remains compositionally visible by default");
});

test("blocked_atomic and unresolved whole-form surfaces stay neutral exact-surface coverage", () => {
  const surfaces = [
    "一個", "落去", "穿過", "兩個", "上去", "有個", "唔到",
    "第一", "兜過", "冇乜", "出嚟", "返去",
  ];
  const reviewedEntrySurfaces = new Set(REVIEWED.entries.map(([surface]) => surface));

  for (const surface of surfaces) {
    assert.ok(fallbackSurfaces.has(surface), `${surface}: exact neutral frequency coverage retained`);
    assert.equal(reviewedEntrySurfaces.has(surface), false, `${surface}: must not be promoted by the reviewed entry layer`);
    assert.equal(isNeutralFrequencyFallback(tokenLexicon[surface]), true, `${surface}: active whole-form record remains neutral coverage`);
  }
});

test("reviewed runtime records cite #792 adjudication rather than Cifu gloss authority", () => {
  for (const [surface, entry] of REVIEWED.entries) {
    assert.equal(entry.review, "reviewed_cifu_r1_250", `${surface}: reviewed marker`);
    assert.equal(entry.provenance && entry.provenance.source, "github_issue_792", `${surface}: adjudication provenance`);
    assert.ok(Number.isInteger(entry.provenance.rank) && entry.provenance.rank >= 1 && entry.provenance.rank <= 250, `${surface}: rank provenance`);
    assert.ok(entry.provenance.decision_comment, `${surface}: decision comment provenance`);
    assert.equal(String(entry.note || "").includes("Cifu SpokenAdult rank"), false, `${surface}: reviewed note must not copy Cifu gloss metadata`);
  }
});
