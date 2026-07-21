# CP020R2 — Rendered Spatial / Kinship Learner-Role Correction

## Status

Candidate: `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`  
Accepted parser baseline: `v0.5.172-lane01-rendered-use-function-relation-r2`  
Status: `HEADLESS_READY_RENDERED_OBSIDIAN_REQUIRED`

## Trigger

Rendered CP020 v0.5.173 evidence confirmed the passive/permissive replacement was structurally conservative but exposed three learner-role defects inside the owning batch:

1. `上` in `貼咗上牆` retained its global temporal **when** role.
2. `牆` in the same spatial-goal sequence retained generic **what** rather than **where**.
3. `阿` in `阿媽` was colored **who**, although the prefix itself is not the person referent.

These corrections are folded into CP020 because learner-role adjustments are freeze-exempt but must not drive standalone development.

## Implementation

- In the two CP020 placement rows, `上` is contextually cloned as `func` with spatial-goal-linker provenance and `牆` as `where` with spatial-goal provenance.
- In `阿媽`, `阿` is contextually `func` as a familiar kinship/name prefix; `媽` remains `who` as the person-denoting head.
- The same `阿媽` display correction is applied to existing reported-speech rendering while preserving its original unknown-token semantic provenance and blocker counts.
- No global lexicon role is changed.
- No construction, subtype, routing boundary, legitimacy status, or semantic acceptance rule is added or relaxed.

## Preservation result

Across all 60 frozen rows:

- source order: unchanged;
- top constructions: unchanged;
- semantic acceptance objects: unchanged;
- root coverage: unchanged;
- all 31 passive/permissive relation traces and subtypes: unchanged;
- Jyutping: unchanged and complete;
- only five token occurrences change role/syntax: two `上`, two `牆`, and one `阿`.

## Validation

- CP020R2 verifier: 19/19 PASS
- current focused: 13/13 PASS
- grammar legitimacy: 1116/1116 PASS
- semantic acceptance: 15/15 PASS
- aggregate regression: 545/545 PASS
- regression exclusions: 0
- runtime labels: 182
- supported productive: 0
- native analysis validation: 0
- automatic semantic acceptance: 0

## Required rendered review

Render the v0.5.174 acceptance note and confirm:

- `上` = spatial linker/direction (`func`) and `牆` = goal (`where`) in both target rows;
- `阿` = prefix (`func`) and `媽` = person (`who`);
- all CP020 passive/permissive subtypes, statuses, blockers, review reasons, and non-target boundaries remain unchanged;
- summary and full diagnostics align;
- issue explicit PASS, REVISE, or REJECT.
