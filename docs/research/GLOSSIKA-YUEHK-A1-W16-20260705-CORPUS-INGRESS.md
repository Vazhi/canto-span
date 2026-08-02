# Glossika Week 16 corpus-ingress final review

- Source ID: `GLOSSIKA-YUEHK-A1-W16-20260705`
- Intake: #133
- Original source ingress: #274 / merged PR #275
- Runtime lexical coverage: #119 / merged PR #121
- Completed review: #475 / PR #476
- Status: 59-record expert review complete; awaiting merge approval

## Terminal outcome

- 59 of 59 records reviewed;
- 35 lexical-only attestations with separate implementation crosswalk targets;
- 20 new sentence, dialog, or pronunciation attestations;
- 4 naturalness/register review candidates;
- 59 records with no accepted corpus-duplicate owner;
- 35 records linked to the merged runtime implementation;
- 11 records with explicit source discrepancies;
- 0 reviewed source replacements.

Runtime representation remains separate from corpus duplicate identity. PR #121 establishes bounded implementation and lexical coverage only; it does not automatically validate Glossika readings, glosses, segmentation, lexical category, naturalness, or corpus ownership.

## Source/runtime reconciliation

Five lexical differences remain explicit without rewriting the source:

- `釣魚`: source `diu3 jyu2` versus reviewed runtime 魚 `jyu4`;
- `畫畫`: verbal/noun distinction `waak6 waa2`;
- `行公園`: embedded `公園` defaults to changed-tone `gung1 jyun2`, with `gung1 jyun4` retained as a review variant;
- `煮嘢食`: phrase-local food-object tokenization preserves global 嘢食 behavior;
- `下棋`: reviewed runtime reading `haa5 kei2`.

The six phonics rows remain unverified pedagogical pronunciation material. The `/ɔː/ versus /uː/` heading is not adopted as a verified description of every pair.

## Nonlexical boundary

Four formula/register records remain independent speaker or corpus review candidates. Other sentence and dialog records remain pedagogical attestations. Source register labels and generic negation prose are not adopted as unrestricted Cantonese rules.

## Permanent integrity

The shared verifier protects immutable source hashes; all source/review/TSV IDs, hashes, order, and dispositions; the 35-record PR #121 crosswalk; separation of duplicate and implementation targets; evidence-backed implementation paths; discrepancy projections; deterministic candidates; and package documentation.

Week 16 is registered with Weeks 14 and 15 in npm, the research profile, focused mutation tests, and the path-scoped research workflow.

## Protected state

No parser behavior, runtime lexicon/version, construction identity/status, native-panel evidence, survey state, release state, deployment state, or merge authorization changes.
