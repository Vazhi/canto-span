---
title: "ClauseRelationMemberSpan"
type: "canto-span-construction"
construction: "ClauseRelationMemberSpan"
status: "parser_heuristic"
confidence: "medium"
claim_layer: "internal"
lane: "LANE-02"
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
code_document_review_commit: "ac35fe9563f192f14a8842c2dd547f1466fab213"
code_document_code_locations: ["main.js:15867-15919"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: false
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/ClauseRelationMemberSpan.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 30
standard_boundary_test_count: 2
standard_implementation_probe_count: 1
standard_executable_test_count: 33
source_ids: []
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 3
accepted_fixtures: 30
tags: ["canto-span/grammar", "canto-span/status/parser_heuristic", "canto-span/lane/lane-02", "canto-span/workflow/archived"]
---

# ClauseRelationMemberSpan

## Plain-language claim

Canto Span does not claim that ClauseRelationMemberSpan is a canonical Cantonese construction name; it is an internal structural representation.

This is an internal parser representation. It does not independently license a Cantonese construction claim.

## Current status

- Linguistic status: `parser_heuristic`
- Linguistic confidence: `medium`
- Current action: `retain_as_bounded_internal_representation_only`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

No pattern-specific external source is currently mapped.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 7 total; 7 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ClauseRelationMemberSpan.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-I1A-I02-D1/focused-evaluation-packet.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

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

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: internal parser representation, subsystem, diagnostic state, or compatibility role
- Research finding: Internal member boundary preserving each clause/member analysis.
- Recommended disposition: Retain as infrastructure. Document span identity, child ownership, and nonempty-member invariant.
- Retirement safeguard: Do not flatten if doing so loses independent subjects, predicates, or relation boundaries.
- Final disposition: **retain narrow** as a transparent internal relation-member span.
- Runtime and complete-output reach: `main.js:15867-15919` constructs nonempty left/right members, preserves source order and child constructions, and serializes member role, relation ID, overt-subject state, and linker ownership.
- Stable semantics and invariant: the member inherits, but never creates, its relation subtype; it cannot fabricate a clause, subject, linker, or context resolution. `ONTO-C02-RELATION-MEMBER` asserts these fields.
- A1/schema decision: preserve `ClauseRelationMemberSpan` internally and `ClauseRelationMember` only as compatibility metadata.
- Evidence and unresolved work: no language claim or panel requirement attaches to the container; subtype evidence belongs to the consuming relation rule.
- Release files: this note, the shared reachability inventory, generated construction tests/index, baseline, and release audit.
