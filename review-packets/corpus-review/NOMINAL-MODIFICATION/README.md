# Nominal-modification corpus review packet R1

This packet closes the compact-corpus dependency from issues #315 and #268 without
changing construction identity, linguistic status, runtime behavior, fixtures,
corpus source files, survey state, release state, or deployment state.

The row classifications are bounded expert corpus findings, not native-speaker
acceptability judgments and not authorization for status promotion.

## Preserved issue-315 exports

| File | Data rows | SHA-256 |
|---|---:|---|
| `issue-315/AA07-compact-review.tsv` | 960 | `9452e2079bc9fb9aa593c077bbb40e1cb0c566f5cfc00a81e3aec547e3921023` |
| `issue-315/AA91-compact-review.tsv` | 78 | `4d5d12b616f80c724ed80b65c2f4113088b460590c2f4113088b460590c2c3f6564809389805ddef8` |

The files above are exact reconstructions of the human-supplied compact exports and
match their supplied SHA-256 values. They remain unclassified and preserve the ten
requested source/context columns.

## AA91 full review

`AA91-full-review-r1.tsv` classifies all 78 mechanical candidates:

- genuine: 5
- false positive: 71
- ambiguous: 2
- unusable: 0

Coverage: 40 source files and 11 participants.

The result confirms that unrestricted `好 + X + NOUN-tagged token` adjacency is not
an AA91 licensing condition. Genuine rows require a degree-marked property expression
directly modifying an overt noun head.

## AA07 deterministic bounded review

`AA07-selected-review-r1.tsv` contains 64 candidates frozen by stable candidate ID:
eight candidates in each of eight required coverage strata.

Selection strata:

- pronoun or nominal possessors;
- common-noun and proper-name modifiers;
- adjective or property modifiers;
- verbal or clausal material;
- relative-clause candidates;
- head or attachment ambiguity;
- repair, annotation, or missing-context boundaries;
- lexicalized or localizer boundaries.

Classification totals:

- genuine: 28
- false positive: 24
- ambiguous: 6
- unusable: 6

Coverage: 33 source files and 9 participants.

The remaining 896 AA07 candidates are **unreviewed**, not negative evidence. They are
preserved losslessly in the issue-315 export and are not silently filtered or
reclassified.

## Family disposition

- Retain AA07 as narrow overt `modifier + 嘅 + overt noun`.
- Retain AA91 as narrow direct `degree-property + overt noun` without `嘅`.
- Keep AB10 retired; no successor umbrella or new UUID is justified.
- Relative clauses, temporal clauses, classifier-linked structures, comparatives,
  quantity expressions, repairs, and compound-internal matches remain outside these
  two narrow profiles unless independently licensed.
- No status promotion or runtime change follows from this packet alone.

## Verification

Run from the repository root:

```bash
python3 review-packets/corpus-review/NOMINAL-MODIFICATION/verify-nominal-modification-review-r1.py
```
