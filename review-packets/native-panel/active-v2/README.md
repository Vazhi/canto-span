# Native Cantonese panel workflow v2

This directory is the active owner of respondent and survey-evidence policy.
It supersedes the fixed Speaker A / Speaker B workflow under
`review-packets/native-speaker/active-v1/`, which remains frozen as historical
provenance for already-collected data.

All qualified respondents use the same survey instrument and inclusion criteria.
No respondent receives privileged status or additional weight. Evidence is counted
as usable adjudicated judgments per critical item, not as named reviewers.

Canonical files:

- `panel-policy.json` — thresholds, instrument requirements, batching, and lifecycle;
- `panel-review-state.json` — current construction-specific panel evidence;
- `followup-draft-v1-metadata.json` — non-deployable follow-up metadata using
  permanent construction identities;
- `followup-draft-v1-items.tsv` — canonical `G06–G09` and `F011–F018` item table;
- `followup-draft-v1-item-crosswalk.tsv` — explicit mapping from superseded
  Codex-local `RUL-V1-*`, `PFV-V1-*`, and `FIL-V1-*` aliases;
- `followup-draft-v1-response-template.tsv` — response-ingestion layout for both
  counterbalanced draft variants.

The follow-up draft is **not** an active or pilot-ready instrument. The current
`YUE-JUDGMENT-PILOT-01` SoSci survey must close and receive an item audit before
this draft can be revised, locked, generated as a form, or deployed. Do not add a
Google Forms script or mark survey creation complete while the specification
remains `draft_followup`.
