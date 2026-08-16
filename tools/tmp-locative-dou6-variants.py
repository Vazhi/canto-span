#!/usr/bin/env python3
"""Temporary helper for locative 度/道 spelling variants."""
from pathlib import Path

lexical = Path("src/runtime-resources/lexicon/token-lexicon/lexical-coverage-additions.js")
test = Path("tests/tooling/lexicon/vernacular-component-coverage.test.js")

text = lexical.read_text(encoding="utf-8")
if '["呢道", {' not in text:
    addition = '''  ["呢道", {
    label: "where",
    jyutping: "ni1 dou6",
    syntax: "place",
    note: "Orthographic variant of 呢度 'here'; Cantonese locative 道 dou6 is independently attested as a writing variant of 度 dou6.",
  }],
  ["嗰道", {
    label: "where",
    jyutping: "go2 dou6",
    syntax: "place",
    note: "Orthographic variant of 嗰度 'there'; 粵典 explicitly lists 嗰度 / 嗰道 with the same go2 dou6 reading and locative-pronoun function.",
  }],
'''
    stripped = text.rstrip()
    if not stripped.endswith("];" ):
        raise RuntimeError("lexical additions end marker missing")
    text = stripped[:-2] + addition + "];\n"
    lexical.write_text(text, encoding="utf-8")

body = test.read_text(encoding="utf-8")
if "locative 道 spellings inherit the canonical 度 analyses" not in body:
    body += '''\n
test("locative 道 spellings inherit the canonical 度 analyses", () => {
  for (const [variant, canonical] of [["呢道", "呢度"], ["嗰道", "嗰度"]]) {
    assert.ok(tokenLexicon[variant], `${variant}: spelling variant is covered`);
    assert.ok(tokenLexicon[canonical], `${canonical}: canonical spelling remains covered`);
    assert.equal(tokenLexicon[variant].jyutping, tokenLexicon[canonical].jyutping, `${variant}: reading matches ${canonical}`);
    assert.equal(tokenLexicon[variant].label, tokenLexicon[canonical].label, `${variant}: learner role matches ${canonical}`);
    assert.equal(tokenLexicon[variant].syntax, tokenLexicon[canonical].syntax, `${variant}: locative syntax matches ${canonical}`);
    assert.match(tokenLexicon[variant].note, /variant/i);
  }
});
'''
    test.write_text(body, encoding="utf-8")
