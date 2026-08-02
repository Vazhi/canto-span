# Glossika Week 15 corpus ingress

## Scope

This package records the authorized Glossika Cantonese (HK) A1 Week 15 lesson, “Directions & Places,” under stable source ID `GLOSSIKA-YUEHK-A1-W15-20260628`.

The user states that Glossika granted permission to use all lesson data in this non-commercial private-use Canto Span project.

## Source archive

The accepted source archive contains **65 stable records**:

| Record type | Count |
| --- | ---: |
| Sentence | 16 |
| Dialog turn | 4 |
| Lexical entry | 39 |
| Phonics row | 6 |

The archive preserves source order, text, Jyutping, English material, source claims, section metadata, record hashes, and the incomplete final `— / 平` phonics row. Its source payload hash is `sha256:0e57454b530e1a50bfc4a4cf9cedada7fcf87f194f290251dc2f3e4f9aaa65e8`.

`source.json` and `items.tsv` are bound by local package integrity metadata and `config/pedagogical-corpus-source-locks.json`. This repair does not regenerate or alter them.

## Original completion defect

Merged PR #271 preserved the source and created mechanical path inventories, but its retained review remained explicitly incomplete:

- `reviewedCount: 0`;
- `unreviewedCount: 65`;
- every record remained mechanically triaged rather than expert-reviewed;
- path lists included archives, generated outputs, quoted prose, research mentions, and other occurrences that were not necessarily duplicate owners.

Later Week 15 research under issue #127 and merged PR #273 supplied a stronger bounded basis:

- 10 exact existing canonical lexical owners;
- 20 lexical-ingress candidates;
- 9 compositional numerals without opaque whole-form ingress;
- route, spatial, question, formula, and phonics follow-up questions.

It did not update the canonical corpus package or terminally review all 65 records. Issue #132 was therefore correctly reopened.

## Review method

The repair separates three layers:

1. **Immutable source layer** — exact source values, IDs, order, hashes, payload hash, and the incomplete final row.
2. **Mechanical cross-reference layer** — deterministic current-repository candidates and explicit later Week 15 research links. Archives, generated bundles, package review outputs, and the package's own final report are excluded.
3. **Expert review layer** — one duplicate status, terminal ingress classification, evidence-use disposition, discrepancy record where applicable, and reviewer note for every record.

A repository occurrence is not an accepted duplicate. Exact duplicate status requires an explicit later canonical owner or another evidence-backed target accepted by the expert layer.

## Terminal result

All **65 / 65** records are reviewed:

| Terminal classification | Count |
| --- | ---: |
| Exact duplicate | 10 |
| Lexical-only attestation | 29 |
| New corpus or pronunciation attestation | 21 |
| Naturalness-review candidate | 1 |
| Pronunciation discrepancy | 1 |
| Translation or lexical-gloss discrepancy | 2 |
| Unusable incomplete source | 1 |

Duplicate disposition:

- accepted exact duplicate: **10**;
- no accepted duplicate: **55**;
- accepted normalized duplicate: **0**.

Four records contain explicit source discrepancies. No source replacement was asserted.

## Accepted exact owners

The expert layer accepts the explicit later canonical owners for:

- `I011 附近`;
- `I012 遠`;
- `I013 近`;
- `I014 上面`;
- `I016 入面`;
- `I018 地鐵站`;
- `I020 醫院`;
- `I021 公園`;
- `I024 街`;
- `I047 一百萬`.

The first nine resolve to the current token lexicon. `一百萬` resolves to the canonical compositional lexical-phrase owner. The source package remains provenance only and creates no new runtime entries.

## Lexical and numeral disposition

The remaining place, route, and landmark terms are retained as lexical-only pedagogical attestations and possible later lexical-ingress candidates.

The nine uncovered multiples from `十萬` through `九十萬` remain compositional attestations. They do not justify nine opaque runtime entries. `一百萬` is already represented by current canonical lexical resources.

No lexical implementation occurs in this repair.

## Formula, route, and question disposition

Most sentence and dialog records are retained as pedagogical corpus attestations linked to bounded later research.

Two require a narrower terminal disposition:

- `I003 唔使唔該` remains a naturalness/register review candidate. It is not marked rejected, and the source label is not accepted as a sociolinguistic conclusion.
- `I056 你食飯咩` is a translation-pragmatics discrepancy. The English polar-question gloss does not preserve the expectation, surprise, challenge, or negative-presupposition force associated with final `me1`. No replacement translation is asserted.

The other route, spatial, arrival-`到`, sentence-final-particle, A-not-A, and wh-question examples remain attestations or research probes. They do not establish a catch-all route construction, interchangeable question strategies, or parser behavior.

## Phonics disposition

Three complete rows are retained only as pedagogical pronunciation attestations:

- `些／四`;
- `借／字`;
- `踢／滴`.

The remaining rows have these dispositions:

- `I062 靚／令` — pronunciation discrepancy requiring independent phonological and lexical verification;
- `I064 錫／識` — translation/lexical-gloss discrepancy because “tin; to kiss” combines distinct readings;
- `I065 — / 平` — unusable as a pair because the A-side word, Jyutping, gloss, and IPA member are absent.

The incomplete row remains preserved exactly. No missing source is invented.

## Source-claim boundary

The source's lesson-wide statements about register, final `咩` or `呀` question formation, and the phonics contrast are preserved as source claims but are not adopted as unrestricted linguistic rules.

Glossika remains pedagogical and lexical attestation. This package does not establish:

- grammatical productivity;
- frequency;
- construction identity;
- dialect-wide naturalness;
- preferred Jyutping or phonological analysis;
- parser correctness;
- runtime acceptance;
- linguistic status promotion.

## Permanent verification

The shared verifier now checks Week 14 and Week 15 through one contract:

- external and local immutable-file hashes;
- source, TSV, cross-reference, review, and expert-TSV IDs and order;
- source hashes and record counts;
- deterministic cross-reference regeneration;
- separation of candidates from expert decisions;
- allowed terminal and duplicate states;
- evidence-backed duplicate targets;
- discrepancy details and incomplete-source handling;
- absence of silent reviewed replacements;
- source-derived documentation projections.

Commands:

```bash
python3 tests/tooling/research/pedagogical-corpus-review.test.py
npm run verify:pedagogical-corpus-review
npm run verify:research
```

## Protected state

No parser behavior, runtime lexicon, runtime version, construction identity, linguistic status, native-panel evidence, survey state, release state, deployment state, or merge authorization changed.
