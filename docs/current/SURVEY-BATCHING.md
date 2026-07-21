# Survey batching and release methodology

## Respondent model

All qualified respondents use the same locked survey instrument and the same
inclusion criteria. The user's wife, public recruits, and any other qualified
participant are ordinary members of the same anonymized panel. No respondent
has a privileged role, special evidentiary status, or additional weight.

## When a survey may be released

A construction becomes survey-ready only after checked sources have narrowed
the claim, the unresolved contrasts are explicit, and ambiguous strings have
interpretation questions rather than naturalness questions alone.

Use this lifecycle:

1. `research_question`
2. `source_narrowed`
3. `pilot_ready`
4. `pilot_collection`
5. `instrument_audit`
6. `instrument_locked`
7. `collection`
8. `mid_collection_audit`
9. `adjudicated`
10. `construction_disposition`
11. `closed`

A live locked survey must not be edited in place. A substantive wording,
context, scale, filler, branching, or randomization change creates a new
instrument version.

## Batch composition

A public wave normally contains two or three focal constructions that use a
compatible response architecture. Do not create a wave containing only many
visibly related examples of one marker. Interleave focal items with unrelated
natural, degraded, context-dependent, and semantically implausible fillers.

Recommended per participant:

- 2–3 focal constructions;
- 24–36 rated items total;
- 8–15 unrelated fillers and calibration items;
- no more than two consecutive items from one focal construction.

Counterbalance lexical sets so that one participant does not see every near-
duplicate contrast. Record assigned list and actual presentation order.

## Instrument requirements

A clean instrument should include:

- a graded naturalness scale;
- a genuine context-needed or uncertain option;
- randomized or counterbalanced item order;
- unrelated natural and degraded fillers;
- context for ellipsis-dependent items;
- interpretation questions for structurally ambiguous strings;
- separate semantic-plausibility diagnostics where needed;
- an optional correction or context field adjacent to each item.

## Evidence thresholds

These are project governance thresholds, not universal statistical laws.

- Pilot: 5–10 usable judgments per item, used only to find instrument defects.
- `provisional`: at least 10 usable adjudicated judgments per critical positive
  and boundary item from a clean instrument with no unresolved instrument
  failure.
- `supported_productive`: at least 30 usable adjudicated judgments per critical
  item from a locked clean instrument, in addition to every other requirement
  in `DEFINITION-OF-DONE.md`.

Report the minimum usable item-level sample size and the numerator and
denominator for each critical item. Total survey submissions do not substitute
for per-item coverage.

## Mid-collection audit

After approximately ten usable responses per counterbalanced list, inspect
completion, calibration, response time, list balance, missing interpretation
answers, patterned responding, and free-text reports of misunderstood items.
Do not alter the live instrument after this audit. Close it and version a
replacement if the defect is material.
