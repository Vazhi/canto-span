#!/usr/bin/env python3
"""One-shot patch helper closing the final in-scope top-2000 functional gap."""
from pathlib import Path

lexical = Path("src/runtime-resources/lexicon/token-lexicon/lexical-coverage-additions.js")
explicit = Path("src/runtime-resources/lexicon/token-lexicon/explicit-analyses.js")
test = Path("tests/tooling/lexicon/vernacular-component-coverage.test.js")

text = lexical.read_text(encoding="utf-8")
if '["好意思", {' not in text:
    addition = '''  ["好意思", {
    label: "how",
    pos: "adverb",
    jyutping: "hou2 ji3 si1",
    syntax: "rhetorical_shame_or_nerve_adverb",
    note: "have the nerve / have the cheek; dedicated Cantonese rhetorical expression independently attested with hou2 ji3 si1 and hou2 ji3 si3 readings.",
  }],
'''
    stripped = text.rstrip()
    if not stripped.endswith("];" ):
        raise RuntimeError("lexical additions end marker missing")
    text = stripped[:-2] + addition + "];\n"
    lexical.write_text(text, encoding="utf-8")

text = explicit.read_text(encoding="utf-8")
if "lex:好意思:nerve_adverb_si1" not in text:
    anchor = '  "咋": Object.freeze(['
    block = '''  "好意思": Object.freeze([
    Object.freeze({
      id: "lex:好意思:nerve_adverb_si1",
      label: "how",
      pos: "adverb",
      jyutping: "hou2 ji3 si1",
      syntax: "rhetorical_shame_or_nerve_adverb",
      senses: Object.freeze([{ gloss: "have the nerve / have the cheek; feel no shame in doing something" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
    Object.freeze({
      id: "lex:好意思:nerve_adverb_si3",
      label: "how",
      pos: "adverb",
      jyutping: "hou2 ji3 si3",
      syntax: "rhetorical_shame_or_nerve_adverb",
      senses: Object.freeze([{ gloss: "have the nerve / have the cheek; attested si3 reading variant" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
  ]),
'''
    if anchor not in text:
        raise RuntimeError("explicit-analysis anchor missing")
    text = text.replace(anchor, block + anchor, 1)
    explicit.write_text(text, encoding="utf-8")

body = test.read_text(encoding="utf-8")
if "好意思 closes the final in-scope functional top-2000 lexical gap" not in body:
    body += '''\n
test("好意思 closes the final in-scope functional top-2000 lexical gap", () => {
  const analyses = buildLexicalAnalysisIndex(tokenEntries);
  assert.ok(tokenLexicon["好意思"], "好意思: exact lexicalized rhetorical expression exists");
  assert.equal(tokenLexicon["好意思"].jyutping, "hou2 ji3 si1");
  assert.equal(tokenLexicon["好意思"].pos, "adverb");
  assert.equal(tokenLexicon["好意思"].syntax, "rhetorical_shame_or_nerve_adverb");
  assert.deepEqual(new Set((analyses["好意思"] || []).map((row) => row.jyutping)), new Set(["hou2 ji3 si1", "hou2 ji3 si3"]));
  assert.ok((analyses["好意思"] || []).every((row) => row.pos === "adverb"));
});
'''
    test.write_text(body, encoding="utf-8")
