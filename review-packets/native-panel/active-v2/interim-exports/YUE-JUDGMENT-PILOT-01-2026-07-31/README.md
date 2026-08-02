# YUE-JUDGMENT-PILOT-01 interim export — 2026-07-31

This directory preserves a **disclosure-controlled aggregate snapshot** of the active SoSci pilot export dated 31 July 2026. Direct-identifier removal alone is not treated as a complete privacy guarantee.

## Included

- `manifest.json` — provenance, public hashes, provisional screening totals, lifecycle state, and disclosure controls;
- `PUBLIC-DISCLOSURE-POLICY.md` — threat model, minimum cell size, suppression rules, and public-table boundaries;
- `OFFLINE-REPRODUCIBILITY.md` — current source-to-aggregate reproducibility limitation and required future authorized process;
- `pilot-analysis-report.md` — revised public fixed-choice summary, instrument observations, and clearly separated hypotheses;
- `condition-statistics.csv` — 20 condition-level denominators and continuous summary statistics;
- `item-statistics.csv` — 92 item-level denominators and continuous summary statistics;
- `qualitative-theme-disposition.csv` — generic withheld domains only; no raw text, distinctive paraphrase, or unsupported support count.

## Intentionally excluded or withdrawn

The public repository does **not** include participant-level SoSci data, exact timestamps, case/serial identifiers, recruitment references, open correction fields, final comments, participant characteristics, region-by-list cross-tabs, completion-time extremes, exact rating-category counts, correction counts, or fixed-choice interpretation counts. `interpretation-statistics.csv` was withdrawn because it contained many exact cells below the public threshold.

## Lifecycle and evidence boundary

- The survey remains active.
- The 36 records are provisionally retained for interim description, not final eligible panel evidence.
- The item-level audit is not started or accepted.
- No participant-derived qualitative theme is public without a private audited support count of at least 5.
- No parser behavior, construction identity, linguistic status, promotion state, follow-up deployment, release, or runtime version changes.
- A final frozen export, full policy screening, disclosure review, and source-to-output reproduction record remain required.

Run the public-side integrity check with:

```bash
npm run verify:interim-pilot-export
```
