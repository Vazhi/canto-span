# Glossika Cantonese A1 Week 19 reviewed corpus package

Source ID: `GLOSSIKA-YUEHK-A1-W19-20260726`
Source payload: `sha256:ec055012fbf34af2e99577b681c15bcd14e0a4f8e72f7f14e00c66bc8df04cdc`
Review state: **76 reviewed records, 0 unreviewed records**

This package preserves the original 76 source rows, including source `架 gaa2` and all five blank `saam-` tone cells. Reviewed corrections, role-sensitive implementation observations, research routes, and unit-word findings are separate derived layers.

## Terminal dispositions

| Disposition | Count |
|---|---:|
| Lexical-only attestation | 61 |
| New corpus/pronunciation attestation | 9 |
| Pronunciation discrepancy | 1 |
| Unusable incomplete source | 5 |

## Role-sensitive result

- 10 classifier rows have an observed current classifier rule.
- `枝`, `對`, `把`, and `條` remain classifier-rule gaps.
- Orthographic token occurrence, pronunciation ownership, role-specific rules, homographs, and parser hints are separate.
- The unit-word matrix has 44 reviewed surfaces, 9 controlled-specification candidates, and 0 promoted noun pairs.
- Source `架 gaa2` is preserved; reviewed classifier `gaa3` is recorded separately from direct retained research.
- All 12 follow-up routes are owned by issue #484; only the item-level `架` pronunciation route is completed in this review.

## Files

- `source.json`, `items.tsv`: immutable source archive
- `crosswalk.json`: original role-insensitive project crosswalk, retained as history
- `role-sensitive-crosswalk-r1.json`: token, pronunciation, role-rule, homograph, parser-hint, and unit-word dimensions
- `research-routing-r1.json`: locked Week 19 research and durable route ownership
- `mechanical-cross-reference-r1.json`: deterministic repository candidates only
- `review.json`, `expert-review-r1.tsv`: completed expert review
- `package-integrity-r1.json`: local immutable bindings
- `research-summary.md`: evidence and disposition summary

## Verification

```bash
npm run verify:pedagogical-corpus-review
python3 tests/tooling/research/pedagogical-corpus-review.test.py
```

No source archive, retained research record, unit-word matrix, parser/runtime behavior, construction identity/status, survey, release, or deployment state is changed by this review.
