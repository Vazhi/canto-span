# Native Cantonese panel review workflow

The canonical machine-readable policy is
[`../../review-packets/native-panel/active-v2/panel-policy.json`](../../review-packets/native-panel/active-v2/panel-policy.json).
Current construction-specific evidence is recorded in
[`../../review-packets/native-panel/active-v2/panel-review-state.json`](../../review-packets/native-panel/active-v2/panel-review-state.json).

## Respondent model

All eligible respondents are members of one anonymized native-Cantonese panel.
They use the same survey instrument, instructions, eligibility screen, and
quality criteria. The user's wife is an ordinary panel respondent and receives
no private form, special designation, additional weight, or evidentiary role.

Historical records using Speaker A / Speaker B terminology remain frozen as
provenance. They do not define current policy.

## Evidence unit

The evidence unit is a usable adjudicated judgment on a critical item, not a
named speaker and not the survey-wide submission count. Record:

- total responses received;
- responses passing eligibility screening;
- usable judgments for each critical item;
- the minimum usable sample size across critical items;
- instrument version and lock state;
- recruitment channels;
- quality-screen and adjudication status;
- exclusions and reasons.

## Instrument requirements

A clean instrument uses a graded naturalness scale, a genuine context-needed or
uncertain option, unrelated fillers, randomized or counterbalanced ordering,
context for ellipsis-dependent items, interpretation questions for ambiguous
strings, and an adjacent optional correction/context field for each item.
Semantic plausibility and grammatical structure must not be collapsed into one
uninterpretable rating.

Use the batching and release rules in [`SURVEY-BATCHING.md`](SURVEY-BATCHING.md).

## Screening and adjudication

Flag rather than automatically delete unfinished responses, failed eligibility
screens, likely duplicates, implausibly short completions, failed calibration,
straight-line responding, contradictory duplicates, missing interpretation
answers, and identifying free text. A recorded manual decision determines
inclusion.

No raw submission changes a construction's status automatically.

## Thresholds

- Pilot: 5–10 usable judgments per item for instrument diagnosis.
- `provisional`: at least 10 usable judgments per critical item from a clean
  role-neutral instrument with complete critical contrast coverage.
- `supported_productive`: at least 30 usable judgments per critical item from a
  locked clean instrument, plus every non-panel requirement in the Definition
  of Done.

## Current legacy evidence

PFV's mixed private/public legacy evidence and RUL's binary fixed-order pilot are
preserved. Neither satisfies the clean panel threshold. The committed RUL
snapshot contains 23 responses; the user reported 50 live responses before the
next snapshot, but uncommitted rows do not change canonical evidence counts.
