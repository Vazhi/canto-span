# Parser construction source coverage (CP021B-R8)

Date: 2026-07-18  
Scope: cumulative claim-level source mapping; no runtime authorization.

- Total labels: **182**
- Mapped labels: **33**
- Unmapped labels: **149**
- Unmapped language labels: **124**

## Newly mapped stative-predication labels

| Label | Claim-source rows | External sources | Disposition |
|---|---:|---:|---|
| `StativePredicate` | 8 | 3 | `SOURCE_LINKED_SPLIT_REQUIRED` |
| `DegreeStativePredicate` | 6 | 2 | `SOURCE_LINKED_NARROWING_REQUIRED` |
| `NegatedStativePredicate` | 5 | 2 | `SOURCE_LINKED_NEGATOR_NARROWING_REQUIRED` |
| `DegreeModifiedLexicalStative` | 4 | 1 | `LEXICAL_UNIT_SUPPORTED_EXACT_COMBINATION_GAP` |
| `NegatedLexicalizedStative` | 7 | 3 | `SOURCE_LINKED_SPLIT_AND_LABEL_RETIRE_REQUIRED` |
| `AdjectivalPredicateClause` | 4 | 2 | `LANGUAGE_FORM_SUPPORTED_DORMANT_LABEL_MERGE_OR_RETIRE` |

The complete queue remains in `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R8.tsv`. Source mapping does not authorize parser implementation or promotion.
