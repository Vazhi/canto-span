# Glossika Cantonese (HK) A1 Week 16 corpus ingress

Source ID: `GLOSSIKA-YUEHK-A1-W16-20260705`  
Source date: `2026-07-05`  
Ingress issue: `#133`  
Original source-ingress claim: `#274`  
Runtime lexical work: `#119` / PR `#121`  
Completed review claim: `#475`

This directory preserves the authorized Glossika lesson “Hobbies & Free Time,” its 35-record implementation crosswalk, and its completed corpus review.

## Files

- `source.json` and `items.tsv` — immutable source projections.
- `package-integrity-r1.json` — local immutable-file bindings.
- `runtime-crosswalk-r1.json` — preserved PR #121 implementation provenance and source/runtime differences.
- `mechanical-cross-reference-r1.json` — current candidates and crosswalk links; no expert decisions.
- `review.json` and `expert-review-r1.tsv` — completed expert review.
- `research-summary.md` — review result and evidence boundary.

## Coverage and status

- 14 sentences;
- 4 dialog turns;
- 35 lexical entries;
- 6 phonics pairs;
- 59 total records;
- 0 unreviewed records;
- 35 lexical-only attestations with separate runtime crosswalk targets;
- 20 new sentence/dialog/pronunciation attestations;
- 4 naturalness/register review candidates;
- 0 silent source replacements.

Runtime representation is not corpus duplicate identity and does not validate every source reading, gloss, segmentation, category, or naturalness claim.

Run:

```bash
npm run verify:pedagogical-corpus-review
```
