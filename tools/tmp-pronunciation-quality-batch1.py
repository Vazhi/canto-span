#!/usr/bin/env python3
"""One-shot helper for independently verified pronunciation-quality batch 1."""
from pathlib import Path

# Triggered after the colloquial 爸爸 default was independently corrected in source.
PEOPLE = Path("src/runtime-resources/lexicon/token-lexicon/people-and-address.js")
CIFU = Path("src/runtime-resources/lexicon/token-lexicon/cifu-r1001-1250-reviewed.js")
EXPLICIT = Path("src/runtime-resources/lexicon/token-lexicon/explicit-analyses.js")
CIFU_TEST = Path("tests/tooling/lexicon/cifu-r1001-1250-reviewed-runtime.test.js")
FOCUSED_TEST = Path("tests/tooling/lexicon/vernacular-component-coverage.test.js")
DOC = Path("docs/research/ISSUE-878-CIFU-R1001-1250-LEXICAL-ADJUDICATION-R1.md")

# 1. 爸爸: ordinary spoken default, preserving existing written and spoken alternatives.
text = PEOPLE.read_text(encoding="utf-8")
old = '["爸爸", { label: "who", jyutping: "baa1 baa1", syntax: "person_np", note: "father" }]'
new = '["爸爸", { label: "who", pos: "noun", jyutping: "baa4 baa1", syntax: "person_np", note: "father; ordinary spoken Cantonese default. baa4 baa4 and written-register baa1 baa1 remain reviewed alternatives.", provenance: { kind: "external_cantonese_pronunciation_correction", source: "Words.hk 爸爸" } }]'
if old in text:
    text = text.replace(old, new, 1)
elif 'jyutping: "baa4 baa1"' not in text:
    raise RuntimeError("爸爸 default anchor missing")
PEOPLE.write_text(text, encoding="utf-8")

# 2. 處理: keep cyu5 lei5 default but add independently confirmed cyu2 lei5 alternative in its owning Cifu inventory.
text = CIFU.read_text(encoding="utf-8")
old = '"處理": Object.freeze([alt(1123, "handle_cyu5lei5", "verb", "handle / process / deal with", "cyu5 lei5")]),'
new = '"處理": Object.freeze([alt(1123, "handle_cyu5lei5", "verb", "handle / process / deal with", "cyu5 lei5"), alt(1123, "handle_cyu2lei5", "verb", "handle / process / deal with; independently confirmed reading alternative", "cyu2 lei5")]),'
if old in text:
    text = text.replace(old, new, 1)
elif 'handle_cyu2lei5' not in text:
    raise RuntimeError("處理 alternative anchor missing")
CIFU.write_text(text, encoding="utf-8")

# 3. Time and particle reading alternatives live in the general explicit-analysis layer.
text = EXPLICIT.read_text(encoding="utf-8")
if "lex:時間:time_noun_si4_gaan1" not in text:
    anchor = '  "咋": Object.freeze(['
    block = '''  "時間": Object.freeze([
    Object.freeze({
      id: "lex:時間:default",
      label: "when",
      pos: "noun",
      jyutping: "si4 gaan3",
      syntax: "time_np",
      senses: Object.freeze([{ gloss: "time / duration" }]),
      provenance: Object.freeze({ kind: "existing_runtime_default_preserved", source: "token lexicon default before independent pronunciation cross-check" }),
    }),
    Object.freeze({
      id: "lex:時間:time_noun_si4_gaan1",
      label: "when",
      pos: "noun",
      jyutping: "si4 gaan1",
      syntax: "time_np",
      senses: Object.freeze([{ gloss: "time / duration; independently attested reading variant" }]),
      provenance: Object.freeze({ kind: "external_cantonese_pronunciation_analysis", source: "Words.hk 時間" }),
    }),
  ]),
  "嘛": Object.freeze([
    Object.freeze({
      id: "lex:嘛:default",
      label: "particle",
      pos: "particle",
      jyutping: "maa5",
      syntax: "sentence_final_particle",
      senses: Object.freeze([{ gloss: "modal/final particle; existing runtime variant reading" }]),
      provenance: Object.freeze({ kind: "existing_runtime_default_preserved", source: "rank 1-250 reviewed lexical promotion" }),
    }),
    Object.freeze({
      id: "lex:嘛:standard_particle_maa3",
      label: "particle",
      pos: "particle",
      jyutping: "maa3",
      syntax: "sentence_final_particle",
      senses: Object.freeze([{ gloss: "final/modal particle; standard Cantonese reading" }]),
      provenance: Object.freeze({ kind: "external_cantonese_pronunciation_analysis", source: "CantoDict 嘛" }),
    }),
  ]),
'''
    if anchor not in text:
        raise RuntimeError("explicit-analysis insertion anchor missing")
    text = text.replace(anchor, block + anchor, 1)
EXPLICIT.write_text(text, encoding="utf-8")

# 4. Supersede the old lower-confidence classification for 處理 with the new independent evidence.
text = DOC.read_text(encoding="utf-8")
old = '- `1123 處理`: active high-confidence Cantonese reading is `cyu5 lei5`; source-listed `cyu2 lei5` remains lower-confidence provenance and must not be exposed as an equally verified reading without stronger Cantonese-specific evidence.'
new = '- `1123 處理`: `cyu5 lei5` remains the runtime default, but a later independent Cantonese cross-check resolves the earlier evidence gap: CantoDict directly lists `處理 cyu2 lei5` (https://www.cantonese.sheik.co.uk/dictionary/words/7533/), while existing Cantonese evidence supports `cyu5 lei5`. Preserve both as reading alternatives rather than suppressing `cyu2 lei5` as source-only.'
if old in text:
    text = text.replace(old, new, 1)
elif 'CantoDict directly lists `處理 cyu2 lei5`' not in text:
    raise RuntimeError("處理 evidence-note anchor missing")
DOC.write_text(text, encoding="utf-8")

# 5. Update the Cifu invariant: default remains cyu5, independently verified alternative is now retained.
text = CIFU_TEST.read_text(encoding="utf-8")
old = '''  assert.ok(readings("處理").includes("cyu5 lei5"));
  assert.ok(!readings("處理").includes("cyu2 lei5"), "處理: lower-confidence source reading is not exposed as co-equal reviewed runtime analysis");'''
new = '''  assert.equal(tokenLexicon["處理"].jyutping, "cyu5 lei5", "處理: established runtime default remains cyu5 lei5");
  assert.deepEqual(new Set(readings("處理")), new Set(["cyu5 lei5", "cyu2 lei5"]));
  assert.ok(ids("處理").includes("lex:處理:r1123:handle_cyu2lei5"), "處理: independently confirmed cyu2 lei5 alternative survives");'''
if old in text:
    text = text.replace(old, new, 1)
elif 'handle_cyu2lei5' not in text:
    raise RuntimeError("處理 test anchor missing")
CIFU_TEST.write_text(text, encoding="utf-8")

# 6. Add one focused regression test covering all four pronunciation-quality decisions.
text = FOCUSED_TEST.read_text(encoding="utf-8")
if "independent pronunciation-quality batch preserves spoken defaults and supported variants" not in text:
    text += '''\n
test("independent pronunciation-quality batch preserves spoken defaults and supported variants", () => {
  const analyses = buildLexicalAnalysisIndex(tokenEntries);
  const readings = (surface) => new Set((analyses[surface] || []).map((row) => row.jyutping));

  assert.equal(tokenLexicon["爸爸"].jyutping, "baa4 baa1", "爸爸: ordinary spoken default");
  assert.deepEqual(readings("爸爸"), new Set(["baa4 baa1", "baa4 baa4", "baa1 baa1"]));
  assert.ok((analyses["爸爸"] || []).some((row) => row.id.includes("father_written") && row.jyutping === "baa1 baa1"));

  assert.equal(tokenLexicon["時間"].jyutping, "si4 gaan3");
  assert.deepEqual(readings("時間"), new Set(["si4 gaan3", "si4 gaan1"]));

  assert.equal(tokenLexicon["處理"].jyutping, "cyu5 lei5");
  assert.deepEqual(readings("處理"), new Set(["cyu5 lei5", "cyu2 lei5"]));

  assert.equal(tokenLexicon["嘛"].jyutping, "maa5", "嘛: existing runtime variant remains default");
  assert.deepEqual(readings("嘛"), new Set(["maa5", "maa3"]));
  assert.ok(!readings("嘛").has("maa4"), "嘛: lama-only maa4 is not promoted as the final-particle reading");
});
'''
    FOCUSED_TEST.write_text(text, encoding="utf-8")
