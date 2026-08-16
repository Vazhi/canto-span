#!/usr/bin/env node
"use strict";

const assert = require("node:assert/strict");
const test = require("node:test");
const tokenEntries = require("../../../src/runtime-resources/lexicon/token-lexicon");
const { buildLexicalAnalysisIndex } = require("../../../src/runtime-resources/lexicon/lexical-analyses");
const {
  ACCEPTED_READINGS,
  DISCOVERY_READING_CANDIDATES,
  ORTHOGRAPHIC_VARIANT_READINGS,
  acceptedReadingRecord,
  applyVernacularComponentCoverage,
} = require("../../../src/runtime-resources/lexicon/token-lexicon/vernacular-component-coverage");

const tokenLexicon = Object.fromEntries(tokenEntries);
const analyses = buildLexicalAnalysisIndex(tokenEntries);
const readingSet = (surface) => new Set((analyses[surface] || []).map((row) => String(row.jyutping || "")).filter(Boolean));

test("lexical analysis IDs are globally unique and attached to runtime surfaces", () => {
  const seen = new Map();
  for (const [surface, rows] of Object.entries(analyses)) {
    assert.ok(tokenLexicon[surface], `${surface}: analysis rows require a runtime surface`);
    for (const row of rows) {
      assert.ok(row.id, `${surface}: analysis row requires a stable ID`);
      assert.ok(!seen.has(row.id), `${row.id}: duplicate lexical analysis ID on ${surface} and ${seen.get(row.id)}`);
      seen.set(row.id, surface);
    }
    const defaultIndex = rows.findIndex((row) => row.id === `lex:${surface}:default`);
    if (defaultIndex >= 0) assert.equal(defaultIndex, 0, `${surface}: explicit default must remain first`);
  }
});

test("accepted component readings are frozen authority records rather than discovery values", () => {
  assert.ok(Object.keys(ACCEPTED_READINGS).length > 0);
  const synthetic = Object.entries(ACCEPTED_READINGS).map(([surface]) => [surface, {
    label: "lex", pos: "lexical_item", syntax: "lexical_item", jyutping: "",
    provenance: { kind: "synthetic_prior", source: "test" },
  }]);
  const applied = Object.fromEntries(applyVernacularComponentCoverage(synthetic));
  for (const [surface, jyutping] of Object.entries(ACCEPTED_READINGS)) {
    assert.equal(Array.from(surface).length, 1, `${surface}: component authority is character-level`);
    assert.match(jyutping, /^[a-z]+[1-6]$/u, `${surface}: accepted reading uses Jyutping`);
    assert.ok(tokenLexicon[surface], `${surface}: accepted reading has runtime coverage`);
    const authority = acceptedReadingRecord(surface);
    assert.ok(authority && authority.provenance && authority.provenance.kind && authority.provenance.source, `${surface}: accepted reading has explicit authority provenance`);
    assert.equal(authority.jyutping, jyutping, `${surface}: authority map is self-consistent`);
    assert.equal(applied[surface].jyutping, jyutping, `${surface}: blank reading is filled from accepted authority`);
    assert.equal(applied[surface].provenance.kind, authority.provenance.kind, `${surface}: applied authority provenance`);
    assert.equal(applied[surface].provenance.prior_provenance.kind, "synthetic_prior", `${surface}: prior provenance is retained`);
  }
});

test("discovery-only pronunciation candidates cannot silently become runtime authority", () => {
  for (const [surface, candidate] of Object.entries(DISCOVERY_READING_CANDIDATES)) {
    assert.ok(candidate && candidate.jyutping, `${surface}: discovery candidate has a recorded reading`);
    assert.equal(ACCEPTED_READINGS[surface], undefined, `${surface}: unresolved discovery reading is not accepted authority`);
    assert.ok(!readingSet(surface).has(candidate.jyutping), `${surface}: unresolved discovery reading is absent from runtime analyses`);
  }
});

test("orthographic variants remain explicit mappings to independently covered canonical forms", () => {
  for (const [surface, variant] of Object.entries(ORTHOGRAPHIC_VARIANT_READINGS)) {
    assert.ok(variant && variant.canonical && variant.jyutping, `${surface}: variant record is complete`);
    assert.equal(ACCEPTED_READINGS[surface], variant.jyutping, `${surface}: accepted variant reading`);
    assert.ok(tokenLexicon[surface] && tokenLexicon[variant.canonical], `${surface}: variant and canonical forms are covered`);
    assert.equal(tokenLexicon[surface].jyutping, tokenLexicon[variant.canonical].jyutping, `${surface}: variant reading matches canonical form`);
  }
});

test("pronunciation-changing reviewed runtime entries carry explicit source provenance", () => {
  for (const [surface, entry] of tokenEntries) {
    const provenance = entry && entry.provenance;
    if (!provenance || !provenance.pronunciation_status) continue;
    assert.ok(String(entry.jyutping || "").trim(), `${surface}: pronunciation-status entry has a runtime reading`);
    assert.ok(String(provenance.kind || "").trim(), `${surface}: pronunciation change has a provenance kind`);
    assert.ok(String(provenance.source || "").trim(), `${surface}: pronunciation change has a provenance source`);
  }
  for (const [surface, rows] of Object.entries(analyses)) {
    for (const row of rows) {
      const provenance = row && row.provenance;
      if (!provenance || !provenance.pronunciation_status) continue;
      assert.ok(String(row.jyutping || "").trim(), `${row.id}: pronunciation-status analysis has a reading`);
      assert.ok(String(provenance.kind || "").trim(), `${row.id}: pronunciation analysis has a provenance kind`);
      assert.ok(String(provenance.source || "").trim(), `${row.id}: pronunciation analysis has a provenance source`);
    }
  }
});
