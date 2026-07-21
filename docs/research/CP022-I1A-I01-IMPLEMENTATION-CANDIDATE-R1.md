# CP022-I1A-I01-R1 implementation candidate

## Change

Five historical clause-wrapper labels are normalized internally to `ClauseSpan`:

- `SubjectPredicateClause`
- `SubjectModalPredicateClause`
- `LocativeModalPredicateClause`
- `TopicModalPredicateClause`
- `CoordinatedSubjectModalPredicateClause`

Each historical label remains public compatibility metadata. `ClauseSpan` is an internal overt-span container only.

## Guards

Every `ClauseSpan` records that it cannot independently license grammar, insert subjects or topics, license argument omission or context resolution, select predicate subtype, or license modal meaning. Typed children remain authoritative.

## Evaluation state

Visible packet, regression, I02 preservation, legitimacy, semantic, and corpus gates pass. Six prospective held-out cases remain sealed. Candidate is render-pending and unaccepted.
