# Canto Span research checkpoint — CP021B-R25

Date: 2026-07-19

## Result

Claim-level source mapping is complete for Lane 02 conditional and completion-clause linking. No parser behavior changed.

### Dispositions

- `ConditionalClause`: `SOURCE_LINKED_CONDITIONAL_MARKER_SUBTYPE_SPLIT_AND_ANTECEDENT_RESULT_ATTACHMENT_REALIGNMENT_REQUIRED`
- `ConditionResult`: `SOURCE_LINKED_CONSEQUENT_ZAU6_WITH_CONDITIONAL_TEMPORAL_SEQUENCE_SPLIT_AND_WRAPPER_REALIGNMENT_REQUIRED`
- `CompletionThenClause`: `SOURCE_LINKED_COMPLETION_SEQUENCE_WITH_ZAU6_AND_CLAUSE_BOUNDARY_REALIGNMENT_REQUIRED`

The supported core includes full `如果...就...` conditionals, clause-final `嘅話`, a constrained bare-`嘅` conditional subtype, postposed conditional clauses, and completion followed by `就` and a later clause. The evidence does not validate a one-predicate `有/冇/得嘅話` inventory as context-free complete clauses, a generic action+`就`+stative construction, stative-only consequents, shared subjects, or treating every completion+`就` sequence as conditional.

## Counts

- external source records: **80**
- internal provenance records: **25**
- cumulative claim-source rows: **794**
- new R25 rows: **30**
- mapped labels: **114 / 182**
- remaining unmapped labels: **68**
- remaining unmapped language labels: **43**
- `supported_productive`: **0**

## Integrity

- accepted parser baseline: `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`
- packaged manifest version: `0.5.175`
- `main.js` SHA-256: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`
- `manifest.json` SHA-256: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`
- parser code changed: **no**
- fixtures changed: **no**
- held-out data opened: **no**

## Resume

Continue from `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R25.tsv`. Rank the **43** remaining unmapped language labels by runtime and non-held-out fixture impact, select one coherent family, and perform claim-level source mapping before any parser change.
