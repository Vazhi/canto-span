# Glossika Week 14 corpus ingress

## Scope

This package records the complete source content of Glossika Cantonese (HK) A1 Week 14, “Making Plans & Appointments,” under stable source ID `GLOSSIKA-YUEHK-A1-W14-20260621`.

The user states that Glossika granted permission to use all lesson data in this non-commercial private-use Canto Span project.

## Source extraction result

The source email was decomposed into **61 stable records**:

| Source section | Records |
| --- | ---: |
| Functional language | 8 |
| Work and office vocabulary | 25 |
| Numbers | 10 |
| Situation patterns | 4 |
| Mini-dialog | 4 |
| Grammar examples | 2 |
| Phonics pairs | 8 |

Every record preserves source order, section, source text, Jyutping, English material, register where supplied, and a hash of its source fields. The item payload hash is `sha256:8b539f409e0cd61bea4832edfa6ec1c607e8d18cd9f429ddbab954b36920102f`.

`source.json` and `items.tsv` remain byte-identical to the accepted source archive and are bound by both local package integrity metadata and `config/pedagogical-corpus-source-locks.json`.

## Original completion defect

Merged PR #160 completed source preservation but did not complete the issue's required repository-wide review. Its retained `review.json` still showed `reviewedCount: 0`, `unreviewedCount: 61`, and placeholder `unreviewed` duplicate and ingress states for every record.

Later Week 14 research under issue #126 and merged PR #262 supplied useful lexical-owner, compositional-numeral, discrepancy, and follow-up records, but it did not update the canonical corpus package or classify all 61 records.

Issue #131 was therefore correctly reopened. This repair completes the omitted review rather than regenerating or replacing the source archive.

## Review method

The completed review separates three layers:

1. **Immutable source layer** — exact source values, order, stable IDs, source hashes, and payload hash.
2. **Mechanical cross-reference layer** — deterministic exact and normalized repository-match candidates plus accepted later Week 14 research links. Search hits are candidates, not decisions.
3. **Expert review layer** — one reviewed duplicate status, one terminal ingress classification, one evidence-use disposition, explicit discrepancy details, and a reviewer note for every record.

Accepted duplicate targets must be supported by either a deterministic exact candidate or an explicit later runtime-owner record. Repository mentions, tests, generated examples, research prose, and pedagogical repetition do not by themselves establish duplicate ownership.

## Terminal review result

All **61 / 61** records are reviewed, with no remaining placeholder states:

| Terminal classification | Count |
| --- | ---: |
| Exact duplicate | 5 |
| Lexical-only attestation | 27 |
| New corpus or pronunciation attestation | 23 |
| Pronunciation discrepancy | 2 |
| Translation or lexical-gloss discrepancy | 4 |
| Normalized duplicate | 0 |
| Naturalness-review candidate | 0 |
| Unusable | 0 |

Duplicate disposition:

- accepted exact duplicate: **5**;
- no accepted duplicate: **56**;
- accepted normalized duplicate: **0**.

No reviewed source replacement was asserted.

## Accepted exact duplicates

The five accepted exact duplicates are:

- `I011 公司` → existing runtime lexicon owner;
- `I013 老闆` → existing runtime lexicon owner;
- `I026 準時` → existing runtime lexicon owner;
- `I031 文件` → existing runtime lexicon owner;
- `I043 十萬` → exact independent Week 15 pedagogical source.

All other exact or normalized repository hits remain non-binding mechanical candidates.

## Lexical and numeral disposition

The 27 lexical-only records remain pedagogical lexical attestations rather than grammar evidence or automatic runtime additions.

The later Week 14 lexical ledger supports:

- 18 lexical-ingress candidates that require a separate implementation decision;
- four exact runtime owners accepted as duplicates above;
- ten large-number records, with `十萬` already preserved by an independent source and the other nine retained as compositional attestations rather than opaque whole-form lexicon entries.

No runtime lexicon change occurs in this repair.

## Source discrepancies

Six records preserve an explicit unresolved source discrepancy without silent correction:

1. `I001 唔好意思` — the source-final `si1` reading requires independent lexical verification;
2. `I015 出糧` — “to get paid” is perspective-bound;
3. `I017 打工` — the parenthetical “part-time” restriction is too narrow for unrestricted reuse;
4. `I021 見工` — the English gloss fixes one participant perspective;
5. `I057 聲 seng1` — the supplied IPA `/sɐŋ/` conflicts with the Jyutping vowel and claimed contrast;
6. `I060 翻 faan1` — the orthography and English gloss “to return” require lexical-sense verification.

The review asserts no replacement Jyutping, orthography, gloss, or phonics value.

## Phonics disposition

Six internally coherent source pairs are retained only as pedagogical pronunciation attestations:

- `三／心`;
- `間／根`;
- `擔／耽`;
- `殺／失`;
- `夾／急`;
- `藍／林`.

They are not adopted as preferred learner-facing pronunciation evidence without independent lexical verification. The `聲` and `翻` records remain terminal discrepancy records.

## Evidence boundary

Glossika is retained as pedagogical and lexical attestation. This package does not establish:

- grammatical productivity;
- frequency;
- construction identity;
- dialect-wide naturalness;
- preferred Jyutping or phonological analysis;
- parser correctness;
- runtime acceptance;
- linguistic status promotion.

Later research links remain bounded follow-up information and do not convert source items into independent grammar evidence.

## Permanent verification

The reusable verifier checks:

- external and local immutable-file hashes;
- source, TSV, cross-reference, review, and expert-TSV IDs and order;
- source hashes and record counts;
- deterministic cross-reference regeneration;
- separation of mechanical candidates from expert decisions;
- allowed terminal and duplicate states;
- evidence-backed duplicate targets;
- explicit discrepancy details;
- absence of silent reviewed replacements;
- exact summary projections.

Commands:

```bash
python3 tests/tooling/research/pedagogical-corpus-review.test.py
npm run verify:pedagogical-corpus-review
npm run verify:research
```

The focused mutation suite deliberately tests source mutation, incomplete review, unsupported classifications, fabricated duplicate targets, unrecorded replacements, ID/count drift, expert decisions leaking into the mechanical packet, and missing duplicate targets.

## Protected state

This review changes no parser behavior, runtime lexicon, runtime version, construction identity, linguistic status, native-panel evidence, survey state, release state, deployment state, or merge authorization.
