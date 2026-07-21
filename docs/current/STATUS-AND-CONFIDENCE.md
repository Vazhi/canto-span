# Status and confidence

## Linguistic status

| Status | Meaning |
|---|---|
| `supported_productive` | The exact narrow construction satisfies every item in `DEFINITION-OF-DONE.md`. |
| `provisional_reaudit` | A formerly accepted construction whose old acceptance was withdrawn pending current-standard review. |
| `provisional` | A narrow claim meets the provisional checklist but not the productive checklist. |
| `research_pending` | A concrete research question exists, but provisional requirements are incomplete. |
| `unsupported_generalization` | The current claim has no defensible supported scope. |
| `lexicalized_only` | Only bounded lexicalized expressions are retained. |
| `parser_heuristic` | Internal software representation, not a productive language claim. |

## Implementation state

Implementation state is recorded separately and may include unimplemented, runtime-referenced, candidate, focused-test passed, render passed, held-out passed, or regression passed. None raises linguistic status by itself.

## NP structural-licensing state

NP licensing is a runtime interface, not linguistic confidence:

- `licensed_np`;
- `ambiguous_licensed_np`;
- `provisional_np_candidate`;
- `invalid_or_incomplete_np`.

Only the first two may feed an evidence-gated consumer, and an ambiguous NP may do so only when the consumer does not depend on the unresolved attachment.

## Confidence

Confidence must be derived from verified sources, manually reviewed natural examples, speaker count, unresolved analyses, and code–documentation agreement. Test counts are reported separately.

The active owner is [`../research/CONSTRUCTION-STATUS-REGISTRY-v0.5.184-R2.tsv`](../research/CONSTRUCTION-STATUS-REGISTRY-v0.5.184-R2.tsv). In v0.5.184 the runtime and registry statuses are aligned across all 171 active labels.
