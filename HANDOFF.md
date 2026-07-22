# Handoff

## Restore first

```bash
cd canto-span
./tools/verify-repository.sh
git status
git log --oneline --decorate -5
```

The recovery ZIP must include `.git/`.

## Binding state

- runtime: **v0.5.201**
- runtime labels / current construction notes: **166 / 166**
- workflow: **2 active / 164 archived**
- retired labels: **15**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **61**
- active constructions: PFV and RUL, both `research_pending`

## Panel evidence model

The fixed two-person workflow is retired. All qualified respondents use the same locked instrument and criteria. The user's wife receives no private form, named role, special weight, or separate evidentiary status.

Promotion thresholds are based on the minimum usable adjudicated judgments per critical item: 10 for `provisional`, 30 for `supported_productive` from a locked clean instrument.

## Current evidence

- PFV: 11 historical responses from mixed legacy instruments; zero clean critical-item coverage under panel-v2.
- RUL: 23 committed pilot responses; the user reports 50 live responses, but additional rows are not canonical until snapshotted and adjudicated.
- Neither current instrument can satisfy promotion.

## Read next

1. `docs/current/PROJECT-STATE.md`
2. `docs/current/TESTING.md`
3. `docs/current/DEFINITION-OF-DONE.md`
4. `docs/current/SURVEY-BATCHING.md`
5. `docs/current/NATIVE-SPEAKER-REVIEW.md`
6. `docs/research/CP032-P1-RUL01-SURVEY-READINESS-R1.md`
7. `docs/research/CP043-P1-PASSIVE-PERMISSIVE-BEI-RECONCILIATION-R1.md`
8. `docs/research/CP042-P1-MANNER-ADVERBIAL-RECONCILIATION-R1.md`
9. `docs/research/CP041-COMMENT-RETIREMENT-R1.md`
10. `docs/research/CP041-PERFECTIVERESULTPREDICATE-RETIREMENT-R1.md`

## Next substantive work

Continue ranking the remaining 60 implementation-only labels by source/runtime mismatch and learner impact. `MannerAdverbialVP` and `PassivePermissiveRelation` now have narrow source-linked positive fixtures; their broader productivity and negative boundaries remain unresolved. The full dormant-label review is complete; no active label remains uncovered. RUL and PFV survey integration stays paused while collection proceeds. When native-panel evidence becomes blocking again, remind the user to provide the survey-guidance prompt before drafting or revising the instrument.
