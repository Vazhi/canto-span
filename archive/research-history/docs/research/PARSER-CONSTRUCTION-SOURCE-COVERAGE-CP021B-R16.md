# Parser construction source coverage — CP021B-R16

Date: 2026-07-18

- Runtime labels: **182**
- Claim-level mapped labels: **79**
- Remaining unmapped labels: **103**
- Remaining unmapped language labels: **78**
- External source records: **61**
- Internal provenance records: **16**
- Cumulative claim-source rows: **478**
- `supported_productive`: **0**

## R16 mapped family

| Label | New rows | External sources | Disposition |
|---|---:|---:|---|
| `SerialVerbPurposeChain` | 12 | 3 | `SOURCE_LINKED_SPLIT_AND_PURPOSE_LINKER_NARROWING_REQUIRED` |
| `PurposePredicate` | 6 | 2 | `INTERNAL_RELATIONAL_CHILD_MERGE_OR_RETIRE_REQUIRED` |
| `ProgressivePurposeClause` | 7 | 3 | `COMPONENTS_SOURCE_LINKED_EXACT_TEMPLATE_GAP_AND_COMPOSITION_REALIGNMENT_REQUIRED` |

## Queue rule

Continue from the TSV. Rank only rows with `mapping_status=UNMAPPED`, prefer coherent construction families over broad parser abstractions, and complete claim-level research mapping before any implementation.
