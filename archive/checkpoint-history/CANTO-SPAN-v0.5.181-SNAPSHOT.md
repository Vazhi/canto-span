# Canto Span v0.5.181 snapshot

Created: 2026-07-20T09:40:38+0900

## State

- accepted baseline: **v0.5.180**
- active candidate: **v0.5.181**
- candidate status: **render-pending; not accepted**
- target: `ResourceUseLaiFunctionRelation` (public compatibility label: `IntendedFunctionRelation`)
- parser behavior changed from v0.5.180: **yes**
- active labels: **179**
- `supported_productive`: **1** (the accepted v0.5.180 perfective subtype only)
- evaluator custody: **7 cases, sealed and unopened**

## Passing active candidate gates

- current focused: **17/17 PASS**
- packet lock: **21/21 PASS**
- visible evaluation: **83/83 PASS**
- implementation audit: **24/24 PASS**
- aggregate regression: **545/545 PASS**, zero exclusions
- I02 preservation: **24/24 PASS**
- grammar legitimacy: **1100/1100 PASS**
- semantic acceptance: **15/15 PASS**
- pre-intermediate corpus: **80/80 PASS**
- claim provenance: **231/231 PASS**
- source accounting: **PASS**, zero unaccounted active labels
- native-conflict burden: **13/13 PASS**
- documentation consistency: **PASS**, zero broken links

## Unfinished maintenance work

The user requested a snapshot before these accepted-state baseline updates were completed. They are preserved as known maintenance failures, not hidden or misreported as candidate regressions.

1. Native-speaker naturalness audit: **31/32 PASS**. The single stale assertion still expects `supported_productive = 0`, although accepted v0.5.180 correctly raised it to 1.
2. Lexicon/construction topology baseline: **529/545 PASS**. Sixteen snapshots predate v0.5.180's accepted perfective `not_claims` safeguard metadata; the semantic/parser outputs are otherwise the expected accepted analyses.

No attempt was made to repair these after the stop request.

## Evidence and source accounting

- 159 active language or lexicalized-language labels
- 158 externally mapped
- one explicit source-gap quarantine: `ScalarRangeFragment`
- all 179 active labels provenance-accounted
- v0.5.181 positive evidence remains limited to the narrow resource + `用嚟/用來` + overt function-predicate relation
- broader intended-function analyses remain provisional

## Resume order

1. Repair the two stale accepted-state maintenance baselines above.
2. Rerun the durable audit suite and `node tools/run-current-focused.js`.
3. Render and inspect all 12 rows in `render-review/CANTO-SPAN-v0.5.181-RENDER-REVIEW.md`.
4. Freeze exact runtime and diagnostic hashes only after render acceptance.
5. Open the separate seven-case evaluator custody exactly once only after the freeze.

## Packaging

- runtime snapshot ZIP: exactly `main.js`, `manifest.json`, and `styles.css`
- recovery snapshot ZIP: current project, documentation, research, validation, tools, tests, and this checkpoint
- evaluator custody is not included in either snapshot ZIP
