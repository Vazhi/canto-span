---
title: "CopularRelationFrame"
type: "canto-span-construction"
construction: "CopularRelationFrame"
status: "parser_heuristic"
confidence: "low"
claim_layer: "internal"
lane: "LANE-10"
last_reviewed: "2026-07-23"
last_status_migrated: "2026-07-21"
source_count: 0
verified_source_count: 0
panel_response_count_total: 1
eligible_panel_response_count: 0
minimum_usable_judgments_per_critical_item: 0
critical_contrast_coverage: "none"
survey_instrument_version: "pre-panel-v2-unstandardized"
survey_instrument_status: "legacy_limited"
survey_instrument_quality_resolved: false
quality_screen_status: "not_started"
panel_adjudication_status: "not_started"
recruitment_channels: []
respondent_role_neutral: false
native_positive_contrasts_reviewed: false
native_negative_contrasts_reviewed: false
panel_evidence_model_version: "v2"
panel_review_state_file: "review-packets/native-panel/active-v2/panel-review-state.json"
panel_policy_file: "review-packets/native-panel/active-v2/panel-policy.json"
negative_cases_drafted: true
negative_tests_executable: true
negative_tests_passing: true
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
code_document_review_commit: "5d0ee01"
code_document_code_locations: ["main.js:2590-2610", "main.js:8230-8255", "main.js:8675-8710", "main.js:10620-10660"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: false
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/CopularRelationFrame.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 2
standard_implementation_probe_count: 1
standard_executable_test_count: 4
source_ids: []
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 12
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/parser_heuristic", "canto-span/lane/lane-10", "canto-span/workflow/archived"]
---

# CopularRelationFrame

## Plain-language claim

Cantonese may instantiate the structural family represented by CopularRelationFrame; exact productivity and boundaries require pattern-specific independent evidence.

This is an internal parser representation. It does not independently license a Cantonese construction claim.

## Current status

- Linguistic status: `parser_heuristic`
- Linguistic confidence: `low`
- Current action: `retain_as_representation_only`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

No pattern-specific external source is currently mapped.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/CopularRelationFrame.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `tests/fixtures/regression-snapshots.json`

## Implementation state

- Lifecycle: `runtime_referenced_with_accepted_fixtures`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `not_applicable_or_internal`

## Open questions and blockers

- internal engineering claim cannot by itself establish Cantonese grammar
- Runtime metadata and current governance agree in v0.5.184.
- Research question: record implementation provenance and keep separate from Cantonese-language evidence

## Related constructions

- [[CopularIdentificationFrame]]
- [[DefinitionExplanatoryFrame]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: internal parser representation, subsystem, diagnostic state, or compatibility role
- Research finding: Internal copular relation wrapper, currently used for explanatory `嚟` correction.
- Recommended disposition: Retain/internalize with explicit child roles and exclusions; map underlying copular/explanatory sources without promoting the frame name.
- Retirement safeguard: Do not retire while it prevents explanatory `嚟` from being misparsed as motion.
- Final disposition: **internalize** as a typed copular relation/explanatory grouping.
- Runtime and complete-output reach: template and fallback paths are `main.js:2590-2610`, `main.js:8230-8255`, `main.js:8675-8710`, and `main.js:10620-10660`; they preserve overt copula/complement structure and keep explanatory `嚟` outside motion.
- Stable semantics and invariant: null subject status is serialized only under a licensed opinion-content host; no subject or complement is inserted. `ONTO-Q03-COPULAR-RELATION` asserts that embedded contract.
- A1/schema decision: preserve the internal object and current explanatory compatibility behavior; the frame name is nonlicensing.
- Unresolved work and release files: underlying copular/explanatory evidence and relation-versus-identification criteria remain open; this note, shared probe inventory, generated tests/index, baseline, and release audit record the decision.
