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

Confidence must be derived from verified sources, manually reviewed natural examples, minimum usable panel judgments per critical item, instrument quality, unresolved analyses, and code–documentation agreement. Test counts are reported separately.

The current owner is one note per construction across [`../../grammar/active/`](../../grammar/active/) and [`../../grammar/archived/`](../../grammar/archived/), indexed by [`../../GRAMMAR-INDEX.md`](../../GRAMMAR-INDEX.md). From v0.5.185, construction-note status is the only active linguistic-status record. The runtime stores only the 170 active labels and therefore cannot drift into a contradictory linguistic status. The former wide TSV/JSON registry is frozen under `archive/registry-pre-obsidian-v0.5.184/`.


Workflow state is independent of linguistic status and runtime activity. `active` means currently selected for work; `archived` means parked without retirement or evidence loss.
