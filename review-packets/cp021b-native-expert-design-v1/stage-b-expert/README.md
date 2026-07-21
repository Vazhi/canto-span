# Stage B — Expert Adjudication After Native Responses Lock

Do not begin until all Stage A responses for the review set are immutable and their SHA-256 values are recorded.

Review the locked native responses, CP021B source-derived claims and proposition edges, contradiction register, and the design-row mapping. Do not inspect CP021B parser output or held-out rows.

Use these controlled values where applicable:

- `surface_status`: `ATTESTED_AS_GIVEN`, `ATTESTED_WITH_CONTEXT`, `MARKED_OR_SPEAKER_VARIABLE`, `UNACCEPTABLE_AS_GIVEN`, `UNRESOLVED`
- `lexical_give_status`: `YES`, `NO`, `AMBIGUOUS`, `NOT_APPLICABLE`, `UNRESOLVED`
- `post_theme_relation_status`: `YES`, `NO`, `AMBIGUOUS`, `NOT_APPLICABLE`, `UNRESOLVED`
- `upstream_predicate_dependence`: `REQUIRED`, `SUPPORTED_NOT_REQUIRED`, `NOT_SUPPORTED`, `UNRESOLVED`
- `structural_category_confidence`: `HIGH`, `MODERATE`, `LOW`, `NO_CATEGORY_CLAIM`

Free-text analysis must:

- distinguish an observable role or reading from a theoretical category;
- preserve speaker disagreement and context dependence;
- avoid assigning a recipient from position alone;
- avoid a global order rule, theme-length threshold, or hidden participant;
- state when the evidence does not decide among prepositional, serial, complex-predicate, constructional, or other analyses.

`parser_safe_observable` should state only what a later parser design may preserve without claiming more than the reviewed evidence. It is not implementation authorization.
