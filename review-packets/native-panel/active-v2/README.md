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
  permanent identity tuples, pilot collection state, and item-audit state;
- `followup-draft-v1-metadata.json` — follow-up identity, lifecycle, deployment
  permission, closed artifact inventory, artifact roles, and tracked-artifact state;
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
deployment permission, and artifact contract. Compatibility-status fields preserve
existing note links but do not control the deployment gate.

## Follow-up artifact contract

The three editable specification files have fixed source roles:

- `item_source`;
- `crosswalk_source`;
- `response_template_source`.

They must remain `draft_source` and non-deployable. Relabelling one of them as
`generated` or `deployed` does not constitute generation or deployment evidence.

Generated instruments must use role `generated_instrument` and live under
`review-packets/native-panel/active-v2/generated/`. Deployment evidence must use
role `deployment_receipt` and live under
`review-packets/native-panel/active-v2/deployment/`.

The verifier treats `active-v2` as a closed inventory. It recursively discovers
every file except four fixed control files (`README.md`, `panel-policy.json`,
`panel-review-state.json`, and `followup-draft-v1-metadata.json`) and the separate
`interim-exports/` subtree. Every other discovered file—regardless of name or
extension—must have exactly one `tracked_artifacts` declaration. This means an
arbitrarily named XML, JSON, script, form, package, or deployment file cannot be
added silently. Tracked paths must exist as regular, non-symlink files.

Lifecycle evidence is role-specific:

- `draft` and `locked` contain no generated instrument or deployment receipt;
- `generated` requires at least one `generated_instrument` and no deployment receipt;
- `deployed` requires a deployed generated instrument plus a deployment receipt;
- `deployment_allowed` is `true` exactly for `deployed` and `false` for
  `draft`, `locked`, and `generated`.

The deterministic lock permits `locked`, `generated`, or `deployed` only when
pilot collection is `closed` and the item-level audit is `accepted`. It also
rejects duplicate lifecycle declarations, cross-file state contradictions,
missing or duplicate source roles, invalid artifact directories, source-file
relabelling, untracked files, unauthorized inventory exemptions, and lifecycle
states without the required role-specific evidence.

The current state remains `active` / `not_started` / `draft` /
`deployment_allowed=false`, with three non-deployable draft sources and no
generated or deployment artifacts. Reported live responses that have not been
exported, screened, and adjudicated are not accepted panel evidence.

Run the lifecycle guard directly with:

```bash
npm run verify:native-panel-lifecycle
```

Run its mutation suite with:

```bash
npm run test:native-panel-lifecycle
```

The verifier also runs through `npm run verify:research`. It reads lifecycle and
artifact metadata only; it does not inspect respondent rows, comments,
identifiers, or open-text responses and cannot transition survey state.

The AB30 active note links the accepted decision ledger and its mechanical source
ledger. Its five reviewed candidates (two genuine and three false positives)
have `partial_only` readiness effect and do not satisfy the diverse-corpus gate.

## Interim survey exports

- [`YUE-JUDGMENT-PILOT-01` — 2026-07-31 aggregate snapshot](interim-exports/YUE-JUDGMENT-PILOT-01-2026-07-31/) preserves a disclosure-controlled historical derivative with broad non-invertible condition bands, a 92-item withholding inventory, public hashes, and explicit reproducibility limits. Exact item, condition-moment, interpretation, correction, and private-text results remain absent. This snapshot does not change the current `active` / `not_started` / `draft` lifecycle or count as final adjudicated panel evidence.
