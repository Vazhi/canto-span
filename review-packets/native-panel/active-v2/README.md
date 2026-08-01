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
- `panel-review-state.json` — current construction-specific panel evidence,
  permanent identity tuples, and instrument-lifecycle references;
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

Every entry in `panel-review-state.json` is keyed by its complete permanent
identity tuple: `construction_uuid`, `construction_code`, `canonical_name`, and
`legacy_runtime_label`. The legacy label is retained only to resolve the current
grammar-note path and runtime `construction` field; new analysis uses the
permanent code and canonical name.

The lifecycle block in `panel-review-state.json` is the canonical owner of pilot
collection (`active` or `closed`) and item-level audit (`not_started`,
`in_progress`, or `accepted`) state. `followup-draft-v1-metadata.json` owns the
follow-up identity, lifecycle (`draft`, `locked`, `generated`, or `deployed`),
and tracked artifacts. Compatibility-status fields preserve existing note links
but do not control the deployment gate.

The deterministic lock permits `locked`, `generated`, or `deployed` only when
pilot collection is `closed` and the item-level audit is `accepted`. It also
rejects generated or deployable artifacts while the follow-up lifecycle remains
`draft`. The current state is `active` / `not_started` / `draft`, and all tracked
artifacts are non-deployable draft sources. Reported live responses that have not
been exported, screened, and adjudicated are not accepted panel evidence.

The AB30 active note links the accepted decision ledger and its mechanical source
ledger. Its five reviewed candidates (two genuine and three false positives)
have `partial_only` readiness effect and do not satisfy the diverse-corpus gate.

## Interim survey exports

- [`YUE-JUDGMENT-PILOT-01` — 2026-07-31 aggregate snapshot](interim-exports/YUE-JUDGMENT-PILOT-01-2026-07-31/) preserves privacy-safe condition, item, and interpretation statistics plus a descriptive pilot report and source hashes. The raw participant-level export and open text remain private. This snapshot does not change the current `active` / `not_started` / `draft` lifecycle or count as final adjudicated panel evidence.
