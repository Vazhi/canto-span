# YUE-JUDGMENT-PILOT-01 stopping rule and item-audit protocol

This document defines the current stopping rule and item-level audit required before `YUE-JUDGMENT-PILOT-01` can be used as project evidence, revised into a follow-up instrument, locked, generated, deployed, or cited as final support for a construction.

It does not analyze current responses, change the live SoSci instrument, weight any respondent, promote any construction, revise runtime behavior, or create a follow-up survey.

## Authority and scope

Canonical current-state dependency: `docs/current/PROJECT-STATE.md`.

The survey is currently active and anonymous. It targets native or childhood Cantonese speakers. All eligible respondents form one role-neutral panel. No named person, relationship, recruitment path, channel, or reviewer status receives special weight.

This protocol owns only the gating process between collection and evidence use. It does not own:

- survey response data;
- live survey editing;
- construction identity or status;
- parser/runtime behavior;
- corpus classifications;
- native-panel weighting;
- held-out validation;
- release or deployment state.

## Stopping rule

Collection may close only after all of the following are true:

1. **Minimum total usable responses:** at least 50 usable complete responses after exclusion.
2. **Minimum item exposure:** every judgment item intended for analysis has at least 30 usable responses after item-level exclusion.
3. **Native/childhood Cantonese eligibility:** at least 30 usable complete responses come from respondents who identify as native or childhood Cantonese speakers.
4. **Recruitment-source sanity check:** no single recruitment source or personally connected path dominates the usable dataset so strongly that it makes item-level results nonportable without a separate limitation note.
5. **Control-item sanity check:** stable control items do not show a project-breaking failure pattern. A project-breaking failure means an item expected to be broadly acceptable or unacceptable receives enough contrary responses or comments to call participant understanding, wording, display order, translation, or response-scale orientation into question.
6. **Comment review capacity:** open-text comments can be reviewed item by item before any conclusion is drawn.
7. **Data export integrity:** the exported data, values, variables, and codebook files are available together and can be matched to the live instrument version.

If the pilot reaches 100 usable complete responses before the above checks expose no fatal problem, collection may close unless a specific underrepresented item, region, speaker background, or recruitment imbalance justifies a written extension.

If collection remains low after a reasonable recruitment period, the pilot may be frozen as **exploratory only**. In that case, it may inform instrument redesign and candidate questions, but it may not provide construction-level support.

## Response-level exclusion checks

A response must be excluded from construction-level analysis when any of the following is true:

- the respondent is not an adult or does not meet the survey’s stated eligibility rule;
- the respondent does not identify as a native or childhood Cantonese speaker, unless the analysis is explicitly marked as non-core exploratory feedback;
- the response is incomplete beyond the survey’s acceptable missingness threshold;
- the response duration is implausibly short for reading the items;
- repeated straight-line answers, contradictory control responses, or comments indicate the task was not understood;
- the respondent reports answering for a dialect, language, or orthographic expectation that does not match the item’s intended Cantonese target without a separable analysis plan;
- duplicate or near-duplicate submissions can be identified without deanonymizing participants.

Excluded responses must be counted and categorized, not silently deleted from reporting.

## Item-level audit checks

Before using any item as evidence, audit that item for:

1. **Wording:** the Cantonese sentence is readable and does not contain unintended Mandarin, translationese, typos, missing particles, or unnatural lexical choices unrelated to the target construction.
2. **Target clarity:** the item actually tests the intended construction rather than a neighboring construction, lexical choice, punctuation cue, register effect, or pragmatic context.
3. **Scale orientation:** the response scale is displayed in the intended order on mobile and desktop. Any reversed display must be documented and corrected before follow-up use.
4. **Forced-choice pressure:** the item allows uncertainty or neutral judgments where required. Binary natural/unnatural results must not be treated as fine-grained acceptability evidence.
5. **Interpretation comments:** comments are reviewed for alternative readings, regional/register notes, missing context, lexical objections, and respondent uncertainty.
6. **Stable controls:** baseline items behave as expected. If stable controls split unexpectedly, first suspect item design, context, scale orientation, or respondent interpretation before treating the split as a linguistic discovery.
7. **Negative boundaries:** boundary items are checked separately from positive examples. A rejected boundary can support a narrower profile only when the positive control and interpretation are also stable.
8. **Regional and background effects:** responses are compared by reported speaker background only descriptively unless the cell sizes justify a separate analysis.
9. **Item exposure:** every reported percentage includes the usable `n` for that item after item-level exclusions.

## Evidence interpretation levels

Use these evidence levels for pilot outcomes:

### Instrument problem

Use when responses or comments indicate wording, display, scale, context, lexical choice, or target clarity is unreliable. Instrument-problem items may guide redesign but must not support construction claims.

### Exploratory signal

Use when an item has enough usable responses to suggest a possible split, ambiguity, or boundary, but lacks stable controls, sufficient comments, region/background checks, or independent corroboration. Exploratory signals may generate research questions.

### Pilot-supported item pattern

Use when a specific item has adequate usable responses, stable controls, reviewed comments, and no major design defect. This supports the item-level observation only. It does not promote a construction.

### Construction-level evidence candidate

Use only when multiple controlled items for the same construction show a coherent pattern across positives, negative boundaries, comments, and eligibility checks. Even then, the result remains a candidate until compared with sources, corpus evidence, native-panel review, and held-out validation.

## What the pilot may support

After the stopping rule and item audit pass, the pilot may support:

- identifying defective items;
- prioritizing follow-up contrasts;
- detecting possible regional, register, lexical, or contextual sensitivity;
- distinguishing strong baseline controls from unstable target items;
- generating bounded research questions;
- deciding which items should be revised, dropped, retained, or split in a follow-up.

## What the pilot may not support by itself

The pilot may not by itself:

- promote any construction to `supported_productive`;
- allocate or retire UUIDs;
- change parser/runtime behavior;
- override stronger source, corpus, native-panel, or held-out evidence;
- infer dialect-wide productivity from raw percentages;
- treat one split item as proof of a construction;
- treat publication attestation or corpus presence as validated merely because an item received positive judgments;
- give special weight to a named reviewer, spouse, friend, recruitment channel, or teacher/expert label.

## Required audit output after closure

A closure audit must produce a dated report that records:

- survey instrument version and export date;
- total responses and usable complete responses;
- exclusion counts by reason;
- item-level usable `n`;
- response distribution per item;
- comment themes per item;
- stable-control behavior;
- item-quality status: retain, revise, drop, split, or needs context;
- construction-level interpretation status, if any;
- limitations by recruitment, region, script, device, completion, comments, and scale behavior;
- recommended follow-up items, if justified;
- explicit null outcomes where no construction consequence follows.

## Follow-up instrument gate

A follow-up survey may be revised or deployed only after the closure audit assigns each carried-forward item one of these states:

- `retain_as_stable_control`
- `retain_as_target_contrast`
- `revise_wording`
- `split_into_minimal_pair`
- `add_context_prompt`
- `drop_item`
- `research_before_resurvey`

No follow-up item should be included merely because it was interesting, controversial, easy to ask, or already present in the pilot.

## Current non-actions

This protocol makes no finding about the current response data. It does not close the pilot, revise the live survey, deploy a follow-up, or change construction evidence. Those actions require separately scoped work after the stopping rule and item audit are satisfied.
