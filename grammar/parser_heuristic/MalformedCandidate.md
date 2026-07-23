---
title: "MalformedCandidate"
type: "canto-span-construction"
construction: "MalformedCandidate"
status: "parser_heuristic"
confidence: "medium"
claim_layer: "internal"
lane: "LANE-10"
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
code_document_code_locations: ["main.js:12458-12635", "main.js:13790-13820", "main.js:14002-14045"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: false
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/MalformedCandidate.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 15
standard_boundary_test_count: 2
standard_implementation_probe_count: 1
standard_executable_test_count: 18
source_ids: []
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 13
accepted_fixtures: 15
tags: ["canto-span/grammar", "canto-span/status/parser_heuristic", "canto-span/lane/lane-10", "canto-span/workflow/archived"]
---

# MalformedCandidate

## Plain-language claim

No direct Cantonese grammar claim; this is a parser disposition for unresolved or malformed input.

This is an internal parser representation. It does not independently license a Cantonese construction claim.

## Current status

- Linguistic status: `parser_heuristic`
- Linguistic confidence: `medium`
- Current action: `retain_as_parser_disposition_only`
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

- Standard executable test file: `tests/constructions/MalformedCandidate.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/a1-context-status-fixture.tsv`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/pre-intermediate-gold-corpus.tsv`
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

- [[NeedsContext]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: internal parser representation, subsystem, diagnostic state, or compatibility role
- Research finding: Diagnostic parser disposition, not a language construction.
- Recommended disposition: Move conceptually to a diagnostics/status schema if possible while preserving serialized compatibility. Define when it differs from `NeedsContext` and ordinary parse failure.
- Retirement safeguard: Do not remove until downstream UI behavior and error rendering are migrated.
- Final disposition: **internalize** as a learner-visible malformed-order diagnostic, distinct from missing context and ordinary parse failure.
- Runtime and complete-output reach: `main.js:12458-12635`, `main.js:13790-13820`, and `main.js:14002-14045` preserve every overt problem marker and serialize malformed family/subtype, problem description, repair classes, and nonclaims.
- Stable semantics and invariant: the diagnostic cannot silently repair input, invent a result/complement, or claim a clean construction. `ONTO-C07-MALFORMED` asserts the directional-order subtype contract.
- A1/schema decision: preserve the serialized label until downstream diagnostic rendering is explicitly version-migrated.
- Evidence and unresolved work: this is a parser disposition; source or panel evidence attaches only to any claimed well-formed repair, never to the diagnostic label.
- Release files: this note, shared reachability inventory, generated tests/index, baseline, and release audit.
