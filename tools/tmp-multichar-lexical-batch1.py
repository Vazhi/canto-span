#!/usr/bin/env python3
"""Temporary one-shot helper for verified multi-character lexical batch 1."""
from pathlib import Path

EXPLICIT = Path("src/runtime-resources/lexicon/token-lexicon/explicit-analyses.js")
TEST = Path("tests/tooling/lexicon/vernacular-component-coverage.test.js")

text = EXPLICIT.read_text(encoding="utf-8")
if "lex:一時:temporal_adverb" not in text:
    anchor = '  "咋": Object.freeze(['
    block = '''  "一時": Object.freeze([
    Object.freeze({
      id: "lex:一時:temporal_adverb",
      label: "when",
      pos: "adverb",
      jyutping: "jat1 si4",
      syntax: "temporal_adjunct temporary_state_adverb",
      senses: Object.freeze([{ gloss: "for the moment / for a short while / suddenly" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
    Object.freeze({
      id: "lex:一時:alternating_connector",
      label: "func",
      pos: "conjunction",
      jyutping: "jat1 si4",
      syntax: "alternating_state_connector",
      senses: Object.freeze([{ gloss: "sometimes ... sometimes ...; alternates between two intermittent states" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
  ]),
  "幫手": Object.freeze([
    Object.freeze({
      id: "lex:幫手:help_verb",
      label: "doing",
      pos: "verb",
      jyutping: "bong1 sau2",
      syntax: "verb help_benefactive_verb",
      senses: Object.freeze([{ gloss: "help / assist / do someone a favour" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
    Object.freeze({
      id: "lex:幫手:helper_noun",
      label: "what",
      pos: "noun",
      jyutping: "bong1 sau2",
      syntax: "object_np helper_noun person_or_object_np",
      senses: Object.freeze([{ gloss: "helper; a person or thing that makes work easier" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
  ]),
'''
    if anchor not in text:
        raise RuntimeError("咋 anchor missing")
    text = text.replace(anchor, block + anchor, 1)
    EXPLICIT.write_text(text, encoding="utf-8")

test = TEST.read_text(encoding="utf-8")
if "verified multi-character lexical batch preserves dictionary-level lexicalization" not in test:
    test += '''\n
test("verified multi-character lexical batch preserves dictionary-level lexicalization", () => {
  const analyses = buildLexicalAnalysisIndex(tokenEntries);
  const expected = {
    "一早": ["jat1 zou2", "adverb"],
    "一時": ["jat1 si4", "adverb"],
    "幫手": ["bong1 sau2", "verb"],
    "好意": ["hou2 ji3", "noun"],
    "好好": ["hou2 hou2", "adverb"],
    "裏面": ["leoi5 min6", "noun"],
  };
  for (const [surface, [jyutping, pos]] of Object.entries(expected)) {
    assert.ok(tokenLexicon[surface], `${surface}: exact lexical coverage exists`);
    assert.equal(tokenLexicon[surface].jyutping, jyutping, `${surface}: reading`);
    assert.equal(tokenLexicon[surface].pos, pos, `${surface}: default POS`);
  }

  assert.deepEqual(new Set((analyses["一時"] || []).map((row) => row.pos)), new Set(["adverb", "conjunction"]));
  assert.deepEqual(new Set((analyses["一時"] || []).map((row) => row.jyutping)), new Set(["jat1 si4"]));
  assert.deepEqual(new Set((analyses["幫手"] || []).map((row) => row.pos)), new Set(["verb", "noun"]));
  assert.deepEqual(new Set((analyses["幫手"] || []).map((row) => row.jyutping)), new Set(["bong1 sau2"]));
});
'''
    TEST.write_text(test, encoding="utf-8")
