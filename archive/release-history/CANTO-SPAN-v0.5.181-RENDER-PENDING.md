# Canto Span v0.5.181 render-pending checkpoint

Created: 2026-07-20T10:25:08+09:00

## Candidate

- accepted baseline: **v0.5.180**
- candidate: **v0.5.181**
- internal subtype: `ResourceUseLaiFunctionRelation`
- public compatibility label: `IntendedFunctionRelation`
- status: **render-ready, not accepted**
- `supported_productive`: **1**

The candidate is limited to an overt non-person resource or artifact followed by adjacent `用嚟/用來` and an overt function predicate. Broader intended-function, actual-use, modal, copular, instrumental, general-purpose, negated, and omission profiles remain outside the candidate.

## Completed gates

- current focused: **19/19 PASS**
- packet lock: **21/21 PASS**
- visible evaluation: **83/83 PASS**
- implementation audit: **24/24 PASS**
- aggregate regression: **545/545 PASS**
- accepted-baseline topology: **545/545 PASS**
- native-speaker naturalness: **33/33 PASS**
- I02 preservation: **24/24 PASS**
- grammar legitimacy: **1100/1100 PASS**
- semantic acceptance: **15/15 PASS**
- pre-intermediate corpus: **80/80 PASS**
- claim provenance: **231/231 PASS**
- source accounting: **PASS**
- native-conflict burden: **13/13 PASS**
- documentation consistency: **PASS**

## Baseline maintenance

The earlier snapshot recorded two stale accepted-state failures. Both were repaired against the accepted v0.5.180 runtime:

1. The naturalness audit now permits independently sourced and prospectively validated productive patterns while continuing to prohibit promotion of native-conflicted patterns.
2. The topology baseline was refreshed from the accepted v0.5.180 runtime, absorbing only v0.5.180's accepted perfective safeguard metadata.

No v0.5.181 candidate output was used to define either baseline.

## Preserved corpus addendum

The recovery package also retains `WECHAT-GX-TRAVEL-002` with 12 normalized turns and 52 parser-facing units. It is not used as independent promotion evidence and does not alter candidate scoring or runtime behavior.

## Outstanding gates

1. Render all 12 rows in `render-review/CANTO-SPAN-v0.5.181-RENDER-REVIEW.md`.
2. Inspect every summary row and corresponding full tree.
3. Freeze the exact runtime, diagnostic, packet, and custody hashes.
4. Open the seven-case evaluator custody exactly once.
5. Promote or revise based on the prospective result.

Evaluator custody remains sealed and is not included in the runtime or recovery package.
