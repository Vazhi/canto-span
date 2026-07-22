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

- runtime: **v0.5.196**
- runtime labels / current construction notes: **168 / 168**
- workflow: **2 active / 166 archived**
- retired labels: **13**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **60**
- active constructions: PFV and RUL, both `research_pending`

## Panel evidence model

The fixed two-person workflow is retired. All qualified respondents use the same locked instrument and criteria. The user's wife receives no private form, named role, special weight, or separate evidentiary status.

Promotion thresholds are based on the minimum usable adjudicated judgments per critical item: 10 for `provisional`, 30 for `supported_productive` from a locked clean instrument.

## Current evidence

- PFV: 11 historical responses from mixed legacy instruments; zero clean critical-item coverage under panel-v2.
- RUL: 23 committed pilot responses; the user reports 50 live responses, but additional rows are not canonical until snapshotted and adjudicated.
- Neither current instrument can satisfy promotion.

## Read next

1. `docs/research/CP040-P1-FINAL-REACHABLE-WRAPPER-AUDIT-R1.md`
2. `docs/research/CP040-P1-FINAL-REACHABLE-WRAPPER-INVENTORY-R1.tsv`
3. `docs/current/PROJECT-STATE.md`
4. `docs/current/DEFINITION-OF-DONE.md`
5. `docs/current/SURVEY-BATCHING.md`
6. `docs/current/NATIVE-SPEAKER-REVIEW.md`
7. `docs/research/CP039-P1-EVALUATION-SCALAR-QUESTION-WRAPPER-AUDIT-R1.md`
8. `docs/research/CP038-P1-SPEECH-TRANSFER-COMPLEMENT-WRAPPER-AUDIT-R1.md`
9. `docs/research/CP037-P1-NOMINAL-WRAPPER-AUDIT-R1.md`
10. `docs/research/CP036-P1-RESULT-CHANGE-STATE-WRAPPER-AUDIT-R1.md`
11. `docs/research/CP035-P1-EXPERIENTIAL-DELIMITED-WRAPPER-AUDIT-R1.md`
12. `docs/research/CP034-P1-LOW-REFERENCE-WRAPPER-AUDIT-R1.md`
13. `docs/research/CP033-P1-RUNTIME-REACHABILITY-AUDIT-R1.md`
14. `docs/research/CP032-P1-RUL01-SURVEY-READINESS-R1.md`

## Next substantive work

Resolve the two constructor-shadowed labels that remain `no_direct_cases`: merge, expose narrowly, or retire `Comment` and `PerfectiveResultPredicate` without broadening grammar or changing recognized spans accidentally. The full dormant-label review is due by handoff sequence 23. When native-panel evidence becomes blocking again, remind the user to provide the survey-guidance prompt before drafting the instrument.
