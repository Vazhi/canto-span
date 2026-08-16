#!/usr/bin/env python3
"""Temporary helper for the verified 嚟講 lexical-expression batch."""
from pathlib import Path

explicit = Path("src/runtime-resources/lexicon/token-lexicon/explicit-analyses.js")
test = Path("tests/tooling/lexicon/vernacular-component-coverage.test.js")

text = explicit.read_text(encoding="utf-8")
if "lex:嚟講:perspective_lai4_gong2" not in text:
    anchor = '  "咋": Object.freeze(['
    block = '''  "嚟講": Object.freeze([
    Object.freeze({
      id: "lex:嚟講:perspective_lai4_gong2",
      label: "func",
      pos: "function",
      jyutping: "lai4 gong2",
      syntax: "perspective_topic_frame_marker",
      senses: Object.freeze([{ gloss: "in terms of / regarding / ... speaking; marks topic, aspect, perspective, or manner" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
    Object.freeze({
      id: "lex:嚟講:perspective_lei4_gong2",
      label: "func",
      pos: "function",
      jyutping: "lei4 gong2",
      syntax: "perspective_topic_frame_marker",
      senses: Object.freeze([{ gloss: "in terms of / regarding / ... speaking; attested lei4 pronunciation variant" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
  ]),
'''
    if anchor not in text:
        raise RuntimeError("explicit-analysis anchor missing")
    text = text.replace(anchor, block + anchor, 1)
    explicit.write_text(text, encoding="utf-8")

body = test.read_text(encoding="utf-8")
if "嚟講 preserves its dedicated perspective expression and both attested readings" not in body:
    body += '''\n
test("嚟講 preserves its dedicated perspective expression and both attested readings", () => {
  const analyses = buildLexicalAnalysisIndex(tokenEntries);
  assert.ok(tokenLexicon["嚟講"], "嚟講: exact lexicalized perspective expression exists");
  assert.equal(tokenLexicon["嚟講"].jyutping, "lai4 gong2");
  assert.equal(tokenLexicon["嚟講"].syntax, "perspective_topic_frame_marker");
  assert.deepEqual(new Set((analyses["嚟講"] || []).map((row) => row.jyutping)), new Set(["lai4 gong2", "lei4 gong2"]));
  assert.ok((analyses["嚟講"] || []).every((row) => row.pos === "function"));
});
'''
    test.write_text(body, encoding="utf-8")
