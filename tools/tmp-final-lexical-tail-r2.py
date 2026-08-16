#!/usr/bin/env python3
"""One-shot helper for the active top-2000 vernacular lexical reconciliation.

This file is temporary and must be removed by the same verified batch that uses it.
"""
from __future__ import annotations

import csv
import json
import re
import sys
import unicodedata
from pathlib import Path

EXPLICIT = Path("src/runtime-resources/lexicon/token-lexicon/explicit-analyses.js")
TEST = Path("tests/tooling/lexicon/vernacular-component-coverage.test.js")


def insert_before_block_end(text: str, surface: str, next_surface: str, addition: str, guard: str) -> str:
    if guard in text:
        return text
    start = text.index(f'  "{surface}": Object.freeze([')
    end = text.index(f'  "{next_surface}": Object.freeze([', start)
    segment = text[start:end]
    marker = "  ]),\n"
    pos = segment.rfind(marker)
    if pos < 0:
        raise RuntimeError(f"closing marker missing for {surface}")
    segment = segment[:pos] + addition + segment[pos:]
    return text[:start] + segment + text[end:]


def patch() -> None:
    text = EXPLICIT.read_text(encoding="utf-8")

    text = insert_before_block_end(
        text,
        "粒",
        "超",
        '''    Object.freeze({
      id: "lex:粒:grain_noun_nap1",
      label: "what",
      pos: "noun",
      jyutping: "nap1",
      syntax: "object_np grain_granule_noun",
      senses: Object.freeze([{ gloss: "grain / granule / pellet" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
    Object.freeze({
      id: "lex:粒:grain_noun_lap1",
      label: "what",
      pos: "noun",
      jyutping: "lap1",
      syntax: "object_np grain_granule_noun",
      senses: Object.freeze([{ gloss: "grain / granule / pellet; l-initial pronunciation variant" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
''',
        "lex:粒:grain_noun_nap1",
    )

    text = insert_before_block_end(
        text,
        "超",
        "米",
        '''    Object.freeze({
      id: "lex:超:disdain_interjection_ciu1",
      label: "particle",
      pos: "interjection",
      jyutping: "ciu1",
      syntax: "disdain_interjection",
      senses: Object.freeze([{ gloss: "interjection expressing disdain" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
    Object.freeze({
      id: "lex:超:disdain_interjection_ciu2",
      label: "particle",
      pos: "interjection",
      jyutping: "ciu2",
      syntax: "disdain_interjection",
      senses: Object.freeze([{ gloss: "interjection expressing disdain; changed-tone variant" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
    Object.freeze({
      id: "lex:超:glare_verb",
      label: "doing",
      pos: "verb",
      jyutping: "ciu1",
      syntax: "verb glare_verb slang",
      senses: Object.freeze([{ gloss: "glare at someone in an unfriendly way" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
    Object.freeze({
      id: "lex:超:sunglasses_noun",
      label: "what",
      pos: "noun",
      jyutping: "ciu1",
      syntax: "object_np sunglasses_noun slang",
      senses: Object.freeze([{ gloss: "sunglasses" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
''',
        "lex:超:disdain_interjection_ciu1",
    )

    text = insert_before_block_end(
        text,
        "堆",
        "咋",
        '''    Object.freeze({
      id: "lex:堆:pile_verb",
      label: "doing",
      pos: "verb",
      jyutping: "deoi1",
      syntax: "verb pile_stack_verb",
      senses: Object.freeze([{ gloss: "pile up / heap up / stack up" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
''',
        "lex:堆:pile_verb",
    )

    if "lex:哎吔:interjection_ai1_jaa3" not in text:
        anchor = '  "咋": Object.freeze(['
        block = '''  "哎吔": Object.freeze([
    Object.freeze({
      id: "lex:哎吔:interjection_ai1_jaa3",
      label: "particle",
      pos: "interjection",
      jyutping: "ai1 jaa3",
      syntax: "pain_surprise_annoyance_interjection",
      senses: Object.freeze([{ gloss: "ouch / oh no; pain, surprise, annoyance, complaint, or sudden realization" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
    Object.freeze({
      id: "lex:哎吔:interjection_ai1_jaa5",
      label: "particle",
      pos: "interjection",
      jyutping: "ai1 jaa5",
      syntax: "pain_surprise_annoyance_interjection",
      senses: Object.freeze([{ gloss: "ouch / oh no; attested reading variant" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
    Object.freeze({
      id: "lex:哎吔:interjection_ai1_jaak3",
      label: "particle",
      pos: "interjection",
      jyutping: "ai1 jaak3",
      syntax: "pain_surprise_annoyance_interjection",
      senses: Object.freeze([{ gloss: "ouch / oh no; attested reading variant" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
    Object.freeze({
      id: "lex:哎吔:interjection_ai1_jaa6",
      label: "particle",
      pos: "interjection",
      jyutping: "ai1 jaa6",
      syntax: "pain_surprise_annoyance_interjection",
      senses: Object.freeze([{ gloss: "ouch / oh no; attested reading variant" }]),
      provenance: Object.freeze({ kind: "external_vernacular_lexical_analysis", source: VERNACULAR_SOURCE }),
    }),
  ]),
'''
        if anchor not in text:
            raise RuntimeError("咋 anchor missing")
        text = text.replace(anchor, block + anchor, 1)

    EXPLICIT.write_text(text, encoding="utf-8")

    test = TEST.read_text(encoding="utf-8")
    if "corrected final lexical tail preserves verified alternatives" not in test:
        test += '''\n
test("corrected final lexical tail preserves verified alternatives", () => {
  const analyses = buildLexicalAnalysisIndex(tokenEntries);
  const rows = (surface) => analyses[surface] || [];
  const readings = (surface) => new Set(rows(surface).map((row) => row.jyutping));
  const pos = (surface) => new Set(rows(surface).map((row) => row.pos));

  assert.equal(tokenLexicon["簿"].jyutping, "bou2", "簿: verified standalone Cantonese reading overrides Sheet bou6");

  assert.deepEqual(readings("粒"), new Set(["nap1", "lap1"]));
  assert.ok(pos("粒").has("classifier"));
  assert.ok(pos("粒").has("noun"));

  assert.deepEqual(readings("超"), new Set(["ciu1", "ciu2"]));
  for (const category of ["adverb", "verb", "interjection", "noun"]) {
    assert.ok(pos("超").has(category), `超: ${category} analysis`);
  }

  assert.deepEqual(pos("米"), new Set(["classifier", "noun"]));
  assert.deepEqual(readings("米"), new Set(["mai5"]));

  assert.deepEqual(pos("堆"), new Set(["classifier", "noun", "verb"]));
  assert.deepEqual(readings("堆"), new Set(["deoi1"]));

  assert.deepEqual(readings("哎吔"), new Set(["ai1 jaa3", "ai1 jaa5", "ai1 jaak3", "ai1 jaa6"]));
  assert.ok(rows("哎吔").every((row) => row.pos === "interjection"));
});
'''
        TEST.write_text(test, encoding="utf-8")


def tombstone(surface: str) -> bool:
    value = surface.lower()
    return value == "del" or re.search(r"(^|[-\s?])del($|[-\s?])", value) is not None


def audit(csv_path: str, keys_path: str) -> None:
    rows = list(csv.DictReader(Path(csv_path).open(encoding="utf-8-sig", newline="")))
    seen: set[str] = set()
    bounded: list[dict[str, str]] = []
    for row in rows:
        surface = unicodedata.normalize("NFC", (row.get("Word") or "").strip())
        if not surface or tombstone(surface) or surface in seen:
            continue
        seen.add(surface)
        bounded.append({
            "surface": surface,
            "pronunciation": row.get("Pronunciation") or "",
            "meaning": row.get("Meaning") or "",
            "example": row.get("Sentence1") or "",
        })
        if len(bounded) == 2000:
            break

    keys = set(json.loads(Path(keys_path).read_text(encoding="utf-8")))
    missing = [row for row in bounded if row["surface"] not in keys]
    single = [row for row in missing if len(row["surface"]) == 1]
    allowed = {"M", "D", "Y", "R", "P", "Q", "這"}
    genuine = [row["surface"] for row in single if row["surface"] not in allowed]

    print("BOUNDED", len(bounded))
    print("MISSING_EXACT", len(missing))
    print("REMAINING_SINGLE_EXACT_GAPS", json.dumps([r["surface"] for r in single], ensure_ascii=False))
    if genuine:
        raise SystemExit(f"genuine single-character lexical gaps remain: {', '.join(genuine)}")

    lexicalish = []
    pronoun_start = re.compile(r"^(我|你|佢|我哋|你哋|佢哋)")
    clause_start = re.compile(r"^(係|唔係|有|冇|要|想|知|講|去|返|睇|做|食|用|可以|應該|會)")
    for row in missing:
        surface = row["surface"]
        if len(surface) <= 1 or pronoun_start.search(surface) or clause_start.search(surface):
            continue
        if re.search(r"[A-Za-z0-9]", surface):
            continue
        lexicalish.append(row)
    print("LEXICALISH_MULTI_CANDIDATES", len(lexicalish))
    print("LEXICALISH_TOP80_JSON")
    print(json.dumps(lexicalish[:80], ensure_ascii=False, indent=2))


if __name__ == "__main__":
    if len(sys.argv) == 1:
        patch()
    elif len(sys.argv) == 4 and sys.argv[1] == "--audit":
        audit(sys.argv[2], sys.argv[3])
    else:
        raise SystemExit("usage: tmp-final-lexical-tail-r2.py [--audit SOURCE.csv KEYS.json]")
