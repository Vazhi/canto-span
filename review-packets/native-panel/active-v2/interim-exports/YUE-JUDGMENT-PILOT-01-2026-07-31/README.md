# YUE-JUDGMENT-PILOT-01 interim export — 2026-07-31

This directory preserves a **privacy-safe aggregate snapshot** of the active SoSci pilot export dated 31 July 2026.

## Included

- `manifest.json` — provenance, hashes, screening totals, lifecycle state, and privacy disposition;
- `pilot-analysis-report.md` — descriptive pilot report and instrument-revision findings;
- `condition-statistics.csv` — pooled G01–G05 condition summaries;
- `item-statistics.csv` — complete item-level rating summaries for 92 item IDs;
- `interpretation-statistics.csv` — aggregate counts for fixed interpretation choices.

## Intentionally excluded

The public repository does **not** include the participant-level SoSci data export, exact timestamps, case/serial identifiers, recruitment references, open correction fields, final comments, or other row-level combinations. The source export contains open text and potentially identifying or re-identifiable metadata. Its filenames, byte sizes, encodings, and SHA-256 hashes are recorded in `manifest.json` so the private source can be verified without publishing it.

## Lifecycle and evidence boundary

- The survey remains active.
- This package is interim and descriptive.
- The item-level audit is not accepted.
- No participant-level response is adjudicated as final evidence by this package.
- No parser behavior, construction identity, linguistic status, promotion state, follow-up deployment, release, or runtime version changes.
- A final frozen export and documented privacy/adjudication review are still required after the survey stopping rule is met.
