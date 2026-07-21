# Parser construction source coverage — CP021B-R18

Date: 2026-07-18

This is the human-readable companion to `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R18.tsv`.

## Cumulative state

- Runtime labels: **182**
- Mapped labels: **87**
- Remaining unmapped labels: **95**
- Remaining unmapped language labels: **70**
- `supported_productive`: **0**

## R18 family

| Label | New rows | External sources | Disposition |
|---|---:|---:|---|
| `IdentificationFragment` | 7 | 3 | `COMPONENTS_LINKED_EXACT_FRAGMENT_AND_PARTICLE_SLOT_GAP` |
| `LocativeFragment` | 7 | 3 | `COMPONENTS_LINKED_STANDALONE_FRAGMENT_ELLIPSIS_GAP` |
| `PossessiveNominalFragment` | 6 | 2 | `HEADLESS_POSSESSIVE_NOMINAL_LINKED_DORMANT_LABEL_MERGE_OR_RETIRE` |
| `ModalResponseFragment` | 6 | 2 | `SELECTIVE_AUXILIARY_ELLIPSIS_LINKED_DORMANT_LABEL_MERGE_OR_RETIRE` |
| `ProhibitiveFragment` | 6 | 2 | `PROHIBITIVE_MARKERS_LINKED_DORMANT_DUPLICATE_LABEL_MERGE_OR_RETIRE` |

R18 source-links the component grammar while refusing to promote the runtime wrappers. `IdentificationFragment` and `LocativeFragment` remain active composition/ellipsis problems with exact-template gaps. The other three labels are dormant duplicates: headless possessor+`嘅`, selective auxiliary ellipsis, and prohibitive marker+predicate constructions are real, but they do not require separate fragment nodes.

## Held-out access incident

During runtime/fixture-impact ranking, a broad search printed three pre-existing locative rows from a held-out TSV. They were not used as linguistic evidence, did not affect any claim or disposition, and no held-out file was changed. R18 therefore records `held_out_opened: true` rather than repeating the earlier unopened claim.
