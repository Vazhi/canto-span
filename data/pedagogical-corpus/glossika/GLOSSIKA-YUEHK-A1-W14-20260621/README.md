# Glossika Cantonese (HK) A1 Week 14 corpus ingress

Source ID: `GLOSSIKA-YUEHK-A1-W14-20260621`  
Source date: `2026-06-21`  
Ingress issue: `#131`  
Original source-ingress claim: `#158`  
Completed review claim: `#471`

This directory is the source-preserving corpus package for the authorized Glossika lesson “Making Plans & Appointments.”

## Files

- `source.json` — canonical immutable source records.
- `items.tsv` — deterministic tabular rendering of the same 61 source records.
- `package-integrity-r1.json` — local immutable-file byte, SHA-256, and Git-blob bindings.
- `mechanical-cross-reference-r1.json` — deterministic repository-match candidates and accepted later-research links; it contains no expert decisions.
- `review.json` — completed terminal expert review for all 61 records.
- `expert-review-r1.tsv` — deterministic tabular projection of the expert review.
- `research-summary.md` — human-readable review outcome and evidence boundaries.

The external immutable-source lock is `config/pedagogical-corpus-source-locks.json`.

## Coverage

- 8 functional-language sentences;
- 25 work-and-office lexical entries;
- 10 number entries;
- 4 situation-pattern sentences;
- 4 mini-dialog turns;
- 2 basic-word-order examples;
- 8 phonics-pair records.

Total: **61 source records**.

## Review status

All 61 records are terminally reviewed:

- 5 exact duplicates with explicit evidence-backed targets;
- 27 lexical-only attestations;
- 23 new corpus or pronunciation attestations;
- 2 pronunciation discrepancies;
- 4 translation or lexical-gloss discrepancies;
- 0 unreviewed records;
- 0 silently replaced source values.

Mechanical exact or normalized matches remain candidates until the expert review accepts a concrete target. Repository mentions alone do not establish duplicate ownership.

## Boundaries

The package preserves Glossika's source wording, Jyutping, translations, register labels, and phonics material. It does not accept them automatically as corrected, natural, productive, frequent, dialect-wide, preferred, or parser-valid.

Pedagogical attestation has no independent grammar-promotion weight. Review decisions do not change parser behavior, runtime lexicon, construction identity, linguistic status, native-panel evidence, survey state, release state, deployment state, or merge authorization.

Run the permanent check with:

```bash
npm run verify:pedagogical-corpus-review
```
