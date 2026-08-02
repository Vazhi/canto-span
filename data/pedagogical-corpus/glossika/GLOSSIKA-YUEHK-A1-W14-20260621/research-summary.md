# Week 14 corpus-ingress review summary

Source ID: `GLOSSIKA-YUEHK-A1-W14-20260621`  
Review date: `2026-08-02`  
Review authority: project expert systematic review  
Related research: issue #126 and merged PR #262

## Outcome

All **61** preserved records now have terminal ingress decisions. The original source archive, source hashes, order, Jyutping, English glosses, phonics fields, and payload hash remain unchanged.

| Terminal class | Count |
| --- | ---: |
| Exact duplicate | 5 |
| Lexical-only attestation | 27 |
| New corpus/pronunciation attestation | 23 |
| Pronunciation discrepancy | 2 |
| Translation or lexical-gloss discrepancy | 4 |
| Normalized duplicate | 0 |
| Naturalness-review candidate | 0 |
| Unusable | 0 |

Duplicate status:

- accepted exact duplicate: **5**;
- no accepted duplicate: **56**;
- accepted normalized duplicate: **0**.

Source discrepancies: **6**.  
Reviewed replacement values asserted: **0**.

## Accepted exact duplicates

The review accepts five exact duplicates with concrete evidence-backed targets:

- `I011 公司` — existing runtime lexicon owner;
- `I013 老闆` — existing runtime lexicon owner;
- `I026 準時` — existing runtime lexicon owner;
- `I031 文件` — existing runtime lexicon owner;
- `I043 十萬` — exact independent Week 15 pedagogical source.

Other repository matches remain mechanical candidates or research mentions. They do not establish duplicate ownership.

## Lexical and numeral disposition

The remaining ordinary vocabulary records are lexical-only attestations. Later Week 14 research distinguishes:

- 18 lexical-ingress candidates that are not implemented by this package;
- four current exact runtime owners listed above;
- ten large-numeral forms, of which `十萬` is an accepted exact pedagogical duplicate and the other nine remain compositional attestations rather than opaque whole-form lexical entries.

The package does not infer grammar or parser licensing from lexical presence.

## Source discrepancies retained without silent correction

The immutable source values remain visible. The review records these problems separately and asserts no replacement:

1. `I001 唔好意思` — source-final `si1` reading flagged for independent lexical verification;
2. `I015 出糧` — English gloss “to get paid” is perspective-bound;
3. `I017 打工` — parenthetical “part-time” restriction is narrower than later research supports;
4. `I021 見工` — English gloss fixes one participant perspective;
5. `I057 聲 seng1` — source IPA `/sɐŋ/` conflicts with the supplied Jyutping vowel and intended short-/ɐ/ contrast;
6. `I060 翻 faan1` — orthography and the gloss “to return” require lexical-sense verification.

## Phonics disposition

Six internally coherent long-/aː/ versus short-/ɐ/ pairs are retained as new pedagogical pronunciation attestations only:

- `三／心`;
- `間／根`;
- `擔／耽`;
- `殺／失`;
- `夾／急`;
- `藍／林`.

They are not adopted as learner-facing pronunciation evidence until each lexical member is independently verified. `聲` and `翻` remain discrepancy records as described above.

## Sentence and dialog evidence

The 18 sentence/dialog records are retained as pedagogical corpus attestations except `I001`, whose pronunciation discrepancy is terminally recorded. Later Week 14 research links apology pragmatics, gratitude semantics, occupational predicates, workplace locatives, clause-final particles, and degree `幾` to bounded follow-up questions. These links do not convert the source items into grammar proof, naturalness decisions, parser tests, or construction identities.

## Integrity model

- `source.json` and `items.tsv` are byte-locked locally and in `config/pedagogical-corpus-source-locks.json`;
- `mechanical-cross-reference-r1.json` is regenerated deterministically from the current repository and accepted later research;
- expert decisions remain only in `review.json` and `expert-review-r1.tsv`;
- accepted duplicate targets must be present in the mechanical exact candidates or accepted later runtime-owner links;
- source discrepancies and reviewed replacements remain separate from immutable source values;
- the focused mutation suite and recurring research profile enforce these invariants.

## No protected-state change

No parser behavior, runtime lexicon, runtime version, construction identity, linguistic status, native-panel evidence, survey state, release state, deployment state, or merge authorization changed.
