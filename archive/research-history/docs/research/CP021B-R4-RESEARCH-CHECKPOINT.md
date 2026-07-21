# CP021B-R4 research checkpoint: consolidated Lane 09 provenance

Date: 2026-07-18  
Lifecycle event: `RESEARCH_PROVENANCE_CONSOLIDATION`  
Runtime changes: **none**

## Completed

- Made the user-supplied revised CP021B-R2 checkpoint authoritative.
- Preserved its 20 external sources, 62 claim-source rows, five Lane 09 dispositions, and 24/24 strict audit.
- Reapplied all 21 CP021B-R3 directional-motion rows.
- Resolved the Chor 2018 source-ID alias.
- Reclassified the unpublished Leung 2014 paper as corroborative only in the R3 directional row.
- Separated external bibliography from internal project provenance.
- Rebuilt the cumulative matrix and complete 182-label queue.
- Archived the superseded pre-consolidation R2 artifacts.

## Current provenance state

- External sources: **24**
- Internal provenance records: **4**
- Cumulative claim-source rows: **83**
- Mapped parser labels: **13**
- Remaining unmapped labels: **169**
- Remaining unmapped language labels: **144**
- Productive grammar promotions: **0**

## Runtime freeze

Accepted parser behavior remains `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`.

- `main.js` SHA-256: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`
- `manifest.json` SHA-256: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`

No parser rule, fixture, manifest version, registry status, or accepted behavior changed.

## Continuity

Use these as the current authoritative research-provenance files:

1. `CP021B-R4-CONSOLIDATION-LEDGER.md`
2. `PARSER-CONSTRUCTION-SOURCE-LINKS-CP021B-R4.md`
3. `PARSER-CONSTRUCTION-SOURCE-REGISTER-CP021B-R4.tsv`
4. `PARSER-CONSTRUCTION-INTERNAL-PROVENANCE-REGISTER-CP021B-R4.tsv`
5. `PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R4.tsv`
6. `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R4.tsv`
7. `validation/cp021b-r4/consolidated-source-audit.json`

The R2 and R3 construction-specific maps remain supporting historical/delta artifacts. Their older cumulative counts must not override R4.

## Validation

- Revised R2 audit: **24/24 PASS**
- R3 directional audit: **27/27 PASS**
- R4 consolidation audit: **46/46 PASS**
- All project JSON files parse; build and audit scripts pass syntax checks; `main.js` passes syntax checking.

## Next event

Rank the remaining 169 unmapped labels by runtime references and accepted-fixture impact, then select one coherent family for claim-first research. Do not implement Lane 09 remediation without a separate frozen design event.
