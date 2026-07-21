# Canonical target ontology and cross-label consolidation (CP021B-R35)

Date: 2026-07-19  
Parent: CP021B-R34  
Scope: design consolidation only. **R35 changes no parser behavior, lexicon, Jyutping, fixtures, manifest data, accepted behavior, or held-out file.** LX1 remains render-pending and unaccepted.

## Result

The fully dispositioned 182-label runtime registry is consolidated into **53 target families**:

- internal architecture or diagnostic families: **8**
- language/compositional/lexicalized target families: **45**
- target families already exercised somewhere in the accepted regression tree: **46**
- labels promoted to `supported_productive`: **0**

This is a migration ontology, not a claim that all 53 families are valid productive Cantonese constructions.

## Label-level action totals

| Target action | Count |
|---|---:|
| `DECOMPOSE_IMPLEMENTATION_UMBRELLA` | 11 |
| `DIAGNOSTIC_ONLY` | 2 |
| `MERGE_INTERNAL_WRAPPER` | 8 |
| `MERGE_TRANSPARENT_COMPOSITION` | 27 |
| `QUARANTINE_EXACT_GAP` | 10 |
| `QUARANTINE_INTERNAL_MATCHER` | 3 |
| `RENAME_INTERNAL` | 5 |
| `RETAIN_INTERNAL` | 6 |
| `RETAIN_LEXICALIZED_PROFILE` | 8 |
| `RETAIN_OR_SPLIT_NARROW_SUBTYPE` | 99 |
| `RETIRE` | 3 |

## Consolidation-class totals

| Class | Count |
|---|---:|
| `diagnostic_only` | 2 |
| `implementation_umbrella` | 11 |
| `internal_architecture` | 11 |
| `lexicalized_profile` | 8 |
| `merge_or_retire` | 3 |
| `quarantined_exact_gap` | 13 |
| `split_required` | 99 |
| `transparent_wrapper` | 35 |

## Design rules

1. **Internal containers do not license language.** Clause, relation, particle-scope, nominal-span, topic/comment, and complement-grouping wrappers inherit all linguistic content from source-linked children or subtypes.
2. **Transparent composition replaces wrapper proliferation.** Aspect plus direction, negation plus motion, progressive plus object, modal plus change, topic plus predicate, and similar combinations should not receive a separate node unless the combination contributes an independently supported relation.
3. **Broad umbrellas are decomposed, not promoted.** `ProductiveVO`, broad `TransitiveVP`/`IntransitiveVP`, `VerbComplementVP`, `ModifiedNP`, `ModalVP`, `StativePredicate`, and related labels are architecture problems, not productive-construction findings.
4. **Lexicalized profiles remain lexicalized.** Formulae, selected 返 profiles, `諗住` intention, lexicalized negated statives, address terms, and price-range expressions do not imply unrestricted templates.
5. **Exact-template gaps remain quarantined.** R35 does not fill missing evidence by combining supported components.
6. **Migration aliases preserve history, not ontology.** Retired names may remain as compatibility metadata while tests and diagnostics migrate.

## Highest-risk reconstruction families

The architecture-level families that should not be implemented until evaluation packets exist are:

- `ValencyAndArgumentStructure`
- `Modality`
- `StativePredication`
- `ComplementGrouping`
- result/change and purpose-serial families where argument structure or relation attachment changes

## Safe first cleanup candidates

The first implementation stage may remove or merge wrappers that add no independent relation, including combined subject/topic/locative modal wrappers, `Comment`, `ModifierPhrase`, transparent aspect-direction wrappers, transparent result frames, and dormant duplicate labels. Surface behavior must remain frozen unless a separately scoped patch says otherwise.

## Files

- `PARSER-CONSTRUCTION-CANONICAL-CONSOLIDATION-MATRIX-CP021B-R35.tsv`: all 182 labels
- `CANONICAL-TARGET-ONTOLOGY-CP021B-R35.tsv`: 53 target families
- `CANONICAL-ONTOLOGY-DEPENDENCY-GRAPH-CP021B-R35.tsv`: implementation dependencies
