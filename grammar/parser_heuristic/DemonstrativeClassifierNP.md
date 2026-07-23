---
title: "DemonstrativeClassifierNP"
type: "canto-span-construction"
construction: "DemonstrativeClassifierNP"
status: "parser_heuristic"
confidence: "high"
claim_layer: "internal"
lane: "LANE-06"
last_reviewed: "2026-07-23"
last_status_migrated: "2026-07-21"
source_count: 0
verified_source_count: 0
panel_response_count_total: 0
eligible_panel_response_count: 0
minimum_usable_judgments_per_critical_item: 0
critical_contrast_coverage: "none"
survey_instrument_version: null
survey_instrument_status: "not_started"
survey_instrument_quality_resolved: false
quality_screen_status: "not_started"
panel_adjudication_status: "not_started"
recruitment_channels: []
respondent_role_neutral: true
native_positive_contrasts_reviewed: false
native_negative_contrasts_reviewed: false
panel_evidence_model_version: "v2"
panel_review_state_file: "review-packets/native-panel/active-v2/panel-review-state.json"
panel_policy_file: "review-packets/native-panel/active-v2/panel-policy.json"
negative_cases_drafted: true
negative_tests_executable: false
negative_tests_passing: false
negative_boundary_inventory_complete: false
corpus_evidence_used: false
corpus_hits_reviewed: false
corpus_candidate_hit_count: 0
corpus_genuine_hit_count: 0
corpus_false_positive_count: 0
corpus_ambiguous_hit_count: 0
corpus_unusable_hit_count: 0
code_document_reconciled: true
code_document_review_date: "2026-07-23"
code_document_review_commit: "ac35fe9563f192f14a8842c2dd547f1466fab213"
code_document_code_locations: ["main.js:1307-1309", "main.js:1417", "main.js:5478-5504", "main.js:6922-6998", "main.js:7105-7117"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: false
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/DemonstrativeClassifierNP.json"
standard_test_coverage: "compatibility_alias_only"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_implementation_probe_count: 1
standard_executable_test_count: 1
source_ids: []
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 14
accepted_fixtures: 30
tags: ["canto-span/grammar", "canto-span/status/parser_heuristic", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# DemonstrativeClassifierNP

## Plain-language claim

No independent Cantonese-language claim is attached to the broad compatibility name DemonstrativeClassifierNP.

This is an internal parser representation. It does not independently license a Cantonese construction claim.

## Current status

- Linguistic status: `parser_heuristic`
- Linguistic confidence: `high`
- Current action: `compatibility_alias_only_no_independent_licensing`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

No pattern-specific external source is currently mapped.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/DemonstrativeClassifierNP.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-I1A-I01-D1/development-baseline.json`
  - `review-packets/v0.5.181/IFR01-D1/development-baseline.json`
  - `review-packets/v0.5.182/IFR02-D1/development-baseline.json`
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.json`
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-D-context_disfluency_research.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-G-grammar_research_external_evidence.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-L-lexicon_jyutping_enrichment.tsv`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-authority-origin-CP021B.tsv`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-claim-source-edges-CP021A.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `tests/fixtures/np-subsystem.json`
  - `test-data/pre-intermediate-gold-corpus.tsv`
  - `tests/fixtures/regression-snapshots.json`

## Implementation state

- Lifecycle: `runtime_referenced_with_accepted_fixtures`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_APPLICABLE_COMPATIBILITY_ALIAS`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `not_applicable_or_internal`

## Open questions and blockers

- internal engineering claim cannot by itself establish Cantonese grammar
- Runtime metadata and current governance agree in v0.5.184.
- Research question: record implementation provenance and keep separate from Cantonese-language evidence

## Related constructions


## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## CP037 compatibility-alias audit

- Compatibility-only reachability: `NOMWRAP-003` with `呢本書。`
- Complete output uses internal `OvertHeadDemonstrativeClassifierNP` and exposes `DemonstrativeClassifierNP` only as its public compatibility alias.
- This probe has linguistic evidence weight **0** and does not create a separate linguistic construction claim.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: internal parser representation, subsystem, diagnostic state, or compatibility role
- Research finding: Explicit compatibility alias only; 30 accepted fixtures but no independent licensing.
- Recommended disposition: Keep as deprecated compatibility alias or version it out. Canonical analysis should use overt-head/headless demonstrative-classifier NP subtypes in the NP subsystem.
- Retirement safeguard: Do not delete until all A1 consumers and stored snapshots are migrated.
- Final disposition: **retain narrow** as a deprecated compatibility alias only.
- Runtime and complete-output reach: registry and alias mapping occur at `main.js:1307-1309` and `main.js:1417`; NP licensing is assigned at `main.js:5478-5504`; `main.js:6922-6998` emits canonical overt-head/headless subtypes and exposes the compatibility alias; token trace compatibility is preserved at `main.js:7105-7117`.
- Stable semantics and invariant: the alias has no constructor, independent licensing, positive linguistic case, or headless/overt-head collapse. `NOMWRAP-003` asserts alias-only exposure over `OvertHeadDemonstrativeClassifierNP`.
- A1/schema decision: preserve the alias for v0.5.216; version it out only after all stored snapshots and consumers use the canonical subtypes.
- Evidence and unresolved work: classifier research belongs to the canonical NP rules. The alias carries zero linguistic evidence and cannot broaden them.
- Release files: this note, NP documentation, existing alias probe, baseline, and release audit.
