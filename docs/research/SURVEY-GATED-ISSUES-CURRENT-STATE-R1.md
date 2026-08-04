# Survey-gated issue current-state disposition R1

Parent issues: #343, #442, #443, #444, #445  
Work claim: #557  
Date: 2026-08-04

## Decision

Close the current open survey-dependent issues as **lifecycle-gated current-state records**, not as completed linguistic research.

The substantive research/redesign questions in these issues remain valid research triggers, but the issues themselves require evidence that does not exist yet in the current project state: the `YUE-JUDGMENT-PILOT-01` stopping rule must be met, a frozen item-level export must be produced, and the item-level audit must be accepted.

Until those gates happen, the current issues cannot produce their requested terminal linguistic or survey-design conclusions without violating their own prerequisites.

## Current authoritative project state reviewed

`docs/current/PROJECT-STATE.md` states that:

- `YUE-JUDGMENT-PILOT-01` remains the active SoSci collection instrument;
- the follow-up draft remains non-deployable;
- the pilot must close and receive item-level audit before a follow-up is revised, locked, generated, deployed, or treated as final evidence;
- the current work order says to keep the pilot in collection until its stopping rule is met, then audit item wording, eligibility, exclusions, quality, comments, interpretations, controls, and regional limitations before drawing conclusions or revising a follow-up.

That current state directly blocks the requested endpoints of #343, #442, #443, #444, and #445.

## Assumption-level review

### Assumption A — interim pilot findings can close the linguistic research questions

Not supported.

The open issues explicitly say the interim observations are triggers only. They require final frozen audit data, exclusions, item versions, interpretation coding, and quality review before structural conclusions can be drawn.

### Assumption B — the follow-up survey can be redesigned now

Not supported.

#445 explicitly depends on the pilot stopping rule, accepted final item-level audit, and the research dispositions from #343 and #442–#444. The current project state says the follow-up draft is non-deployable and the pilot remains active.

### Assumption C — closing the issues means discarding the research

No.

The issue bodies and this current-state disposition preserve the research triggers. Closure here means the currently open issues have reached a terminal queue state: not executable until a later lifecycle event creates the missing evidence. A future issue may be opened after the final audit exists.

### Assumption D — a new replacement issue should be opened now

No.

Opening new issues now would recreate the same blocked queue because the required frozen audit does not yet exist. The correct next action is not a new issue; it is the separate survey lifecycle event: close collection when the stopping rule is met, export, audit, and then open fresh bounded research/design issues from the audited data.

## Issue dispositions

### #343 — Interpret survey-split aspect boundaries in `用嚟` and `V完咗O`

Current-state disposition: lifecycle-gated, no current terminal linguistic conclusion.

Reason:

- depends on stopping rule and frozen item-level audit;
- requires recomputed counts, exclusions, item versions, interpretations, and subgroup limitations;
- interim observations cannot decide aspect scope or structural licensing.

Future trigger:

- open a new audit issue after a frozen export and accepted item-level audit exist.

### #442 — Human-NP `用嚟` role boundaries

Current-state disposition: lifecycle-gated, no current terminal role map.

Reason:

- depends on final audit and adjudicated interpretation themes;
- requires matched human/nonhuman contrasts and bounded corpus inventory;
- interim pooled ratings cannot be converted into a role rule.

Future trigger:

- open a new role-boundary issue after final G01D coding exists.

### #443 — Subjectless `用嚟 VP` discourse licensing

Current-state disposition: lifecycle-gated, no current terminal context contract.

Reason:

- depends on final G04C audit and interpretation coding;
- requires matched overt-context and no-context contrasts;
- current no-context data cannot distinguish ellipsis, fragment, topic drop, or implicit argument.

Future trigger:

- open a new context-licensing issue after final G04C coding exists.

### #444 — Objectless `V咗喇` readings

Current-state disposition: lifecycle-gated, no current terminal valency/aspect map.

Reason:

- depends on final G05D audit and interpretation coding;
- requires verb-class contrasts and context-bearing corpus examples;
- interim acceptability and split interpretations cannot justify hidden-object reconstruction.

Future trigger:

- open a new object-omission issue after final G05D coding exists.

### #445 — Redesign post-pilot follow-up survey

Current-state disposition: lifecycle-gated, no current follow-up redesign.

Reason:

- explicitly depends on final pilot audit and research dispositions from #343, #442, #443, and #444;
- the current follow-up draft remains non-deployable;
- redesigning now would bake interim instrument artifacts into the next survey.

Future trigger:

- open a new follow-up-design issue only after the final audit and retained research dispositions are available.

## Terminal queue outcome

The current issues close because they are not currently executable and cannot reach their requested substantive endpoint from the evidence available now.

They do **not** close because the linguistic questions are settled.

The correct future workflow is:

1. keep `YUE-JUDGMENT-PILOT-01` active until its stopping rule is met;
2. produce a frozen export;
3. perform the item-level audit;
4. open fresh bounded issues for the surviving research questions and follow-up survey design.

## Protected-state disposition

This packet changes no live survey, survey closure state, stopping rule, item-level audit state, participant text, follow-up draft, survey deployment state, parser behavior, construction identity/status, runtime, release, or deployment state.

## Source pointers

- `docs/current/PROJECT-STATE.md`, Native-panel and survey state
- `docs/current/PROJECT-STATE.md`, Current work order
