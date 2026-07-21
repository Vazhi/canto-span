# CP021B-R4 consolidation ledger

Date: 2026-07-18  
Lifecycle event: `RESEARCH_PROVENANCE_CONSOLIDATION`  
Runtime changes: **none**

## Inputs

| Input | SHA-256 | Role |
|---|---|---|
| `canto-span-clean-project-CP021B-R2-lane09-research-links(1).zip` | `1f75e8a91ad9d37107725f67600c49c05ae0cf1baa551d97b4aa4b780317962a` | Authoritative revised R2 Lane 09 motion/location provenance |
| `canto-span-clean-project-CP021B-R3-directional-motion-research-provenance.zip` | `b478f282d79434a21455df6fb1538e9ef99868c874f6fc512265086d1c63e42d` | R3 directional-motion delta and complete project workspace |

## Precedence

The revised R2 input is authoritative for all CP021B-R2 source records, all 62 R2 cumulative claim-source rows, all five R2 label dispositions, the 24/24 strict R2 audit, the R2 source-search gap record, and the richer 16-column coverage schema.

The R3 input remains authoritative for its five directional-motion construction maps and 21 R3 claim-source rows.

## Reconciliation performed

1. Replaced the earlier 58-row R2 variant embedded in R3 with the revised 62-row R2 matrix.
2. Replaced the earlier R2 cumulative files and audit tool with the revised R2 artifacts.
3. Archived the superseded R2 artifacts under `docs/history/CP021B-R2-PRECONSOLIDATION/`.
4. Reapplied all 21 R3 directional rows.
5. Normalized the Chor 2018 alias to `SRC-CHOR-2018-DIRECTIONALS`.
6. Kept Leung 2014 corroborative only, consistent with the revised R2 evidence rule.
7. Separated 24 external bibliography records from 4 internal project-provenance records.
8. Rebuilt the 182-label queue using the revised R2 coverage schema.
9. Added a strict R4 consolidation audit.

## Result

- External source records: **24**
- Internal provenance records: **4**
- Cumulative matrix rows: **83**
- Claim-level mapped labels: **13**
- Unmapped labels: **169**
- Unmapped language labels: **144**
- Parser behavior changed: **no**
- `supported_productive` promotions: **0**

## Non-inferences

- The R4 merge does not settle open linguistic disputes.
- An unresolved source search is not evidence of ungrammaticality.
- Internal project records are not independent linguistic authority.
- Historical R2/R3 cumulative counts are not the current counts.
- No row authorizes parser implementation without a separate frozen design and evaluation event.
