# Parser construction source coverage — CP021B-R17

Date: 2026-07-18

This is the human-readable companion to `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R17.tsv`.

## Cumulative state

- Runtime labels: **182**
- Mapped labels: **82**
- Remaining unmapped labels: **100**
- Remaining unmapped language labels: **75**
- `supported_productive`: **0**

## R17 family

| Label | New rows | External sources | Disposition |
|---|---:|---:|---|
| `FormulaDiscourseUnit` | 16 | 4 | `SOURCE_LINKED_LEXICAL_AND_RESPONSE_SUBTYPE_SPLIT_REQUIRED` |
| `FragmentAnswer` | 15 | 5 | `SOURCE_LINKED_ELLIPSIS_SUBTYPE_SPLIT_AND_POSSESSIVE_REALIGNMENT_REQUIRED` |
| `FragmentQuestion` | 10 | 1 | `SOURCE_LINKED_THEMATIC_NE_NARROWING_WITH_BARE_FORM_GAP` |

R17 maps the selected labels at claim level but authorizes no parser change. Exact lexical formulae and response-particle uses are separated from repetition heuristics; predicate/modal answers are separated by question type, lexical head, aspect, and ellipsis licensing; possessor+`嘅` is realigned toward headless nominal analysis; thematic topic+`呢` is source-linked while exact `你呢？` and bare `呢？` remain direct-source gaps.
