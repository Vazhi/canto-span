# Glossika Cantonese (HK) A1 Week 15 corpus ingress

Source ID: `GLOSSIKA-YUEHK-A1-W15-20260628`  
Source date: `2026-06-28`  
Ingress issue: `#132`  
Original source-ingress claim: `#270`  
Completed review claim: `#473`

This directory preserves the authorized Glossika lesson “Directions & Places” and its completed record-level review.

## Files

- `source.json` — immutable source records.
- `items.tsv` — immutable tabular source projection.
- `package-integrity-r1.json` — local immutable-file bindings.
- `mechanical-cross-reference-r1.json` — deterministic candidates and later-research links; no expert decisions.
- `review.json` — completed terminal expert review.
- `expert-review-r1.tsv` — deterministic review projection.
- `research-summary.md` — human-readable result and evidence boundaries.

The external source lock is `config/pedagogical-corpus-source-locks.json`.

## Coverage

- 16 sentences;
- 4 dialog turns;
- 39 lexical entries;
- 6 phonics rows, including the incomplete final `— / 平` source row.

Total: **65 source records**.

## Review status

All 65 records are terminally reviewed with **0 unreviewed records** and no silent source replacement. Mechanical path occurrences remain candidates until the expert layer accepts an evidence-backed owner.

Glossika remains pedagogical and lexical attestation. The package does not establish productivity, frequency, construction identity, dialect-wide naturalness, preferred pronunciation, parser correctness, or linguistic status.

Run the permanent shared check with:

```bash
npm run verify:pedagogical-corpus-review
```
