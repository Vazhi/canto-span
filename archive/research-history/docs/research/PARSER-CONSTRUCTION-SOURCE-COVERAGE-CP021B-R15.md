# Parser construction source coverage — CP021B-R15

Date: 2026-07-18

- Runtime labels: **182**
- Claim-level mapped labels: **76**
- Remaining unmapped labels: **106**
- Remaining unmapped language labels: **81**
- External source records: **60**
- Internal provenance records: **15**
- Cumulative claim-source rows: **453**
- `supported_productive`: **0**

## R15 mapped family

| Label | New rows | External sources | Disposition |
|---|---:|---:|---|
| `ReportedSpeech` | 10 | 5 | `SOURCE_LINKED_SPLIT_AND_ANALYSIS_NEUTRAL_REQUIRED` |
| `OpinionStanceFrame` | 9 | 3 | `SOURCE_LINKED_LEXICAL_COMPLEMENT_AND_STANCE_MARKER_SPLIT_REQUIRED` |
| `CognitionContentFrame` | 8 | 3 | `SOURCE_LINKED_LEXICAL_SELECTION_AND_COMPLEMENT_TYPE_NARROWING_REQUIRED` |
| `CognitionStatementClause` | 6 | 2 | `GENERAL_BARE_COGNITION_LINKED_EXACT_POSITIVE_PROFILE_GAP` |
| `NegativeCognitionFragment` | 7 | 1 | `SOURCE_LINKED_POLYFUNCTIONALITY_AND_CONTEXT_SPLIT_REQUIRED` |

## Queue rule

Continue from the TSV. Rank only rows with `mapping_status=UNMAPPED`, prefer coherent construction families over broad parser abstractions, and complete claim-level research mapping before any implementation.
