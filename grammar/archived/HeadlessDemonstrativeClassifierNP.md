---
title: "HeadlessDemonstrativeClassifierNP"
type: "canto-span-construction"
construction: "HeadlessDemonstrativeClassifierNP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-06"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
source_count: 1
verified_source_count: 1
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
code_document_review_date: null
code_document_review_commit: null
code_document_code_locations: []
current_standard_reaudit_complete: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/HeadlessDemonstrativeClassifierNP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 2
standard_boundary_test_count: 0
standard_executable_test_count: 2
source_ids: ["SRC-YU-2006-NOMINAL-MODIFIERS"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 14
accepted_fixtures: 30
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# HeadlessDemonstrativeClassifierNP

## Plain-language claim

Cantonese independently permits headless demonstrative-classifier phrases in discourse-sensitive environments, but this runtime subtype does not assert unrestricted productivity or reconstruct an omitted noun.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_separate_and_quarantine_from_productive_promotion`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-YU-2006-NOMINAL-MODIFIERS

- Citation: [Yu, Dominic. 2006. Relative clauses and nominal modifiers in Cantonese. Unpublished research paper, University of California, Berkeley.](https://linguistics.berkeley.edu/~dom/cantonese-rc.pdf)
- Locator: pp. 3-7; examples 3, 9, and 11-12
- Verification: `VERIFIED_FULL_TEXT_CORROBORATIVE`
- What it supports: Cantonese nominal order, possessive classifier phrases, demonstrative-classifier phrases, and headless demonstrative+classifier NPs.
- Limit: Not peer reviewed and partly theoretical; use only as corroboration or narrow evidence for explicitly illustrated forms, never as sole authority for productivity.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/HeadlessDemonstrativeClassifierNP.json`
- Evidence state: `separated_from_overt_head_candidate`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-authority-origin-CP021B.tsv`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-claim-source-edges-CP021A.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `tests/fixtures/regression-snapshots.json`

## Implementation state

- Lifecycle: `shared_np_subsystem_component_research_pending`
- Visible/focused tests: `NP_SUBSYSTEM_BOUNDARY_TESTS_PRESENT`
- Render review: `NOT_APPLICABLE_NO_ACTIVE_PROMOTION_CANDIDATE`
- Held-out evaluation: `NOT_APPLICABLE_NO_ACTIVE_PROMOTION_CANDIDATE`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `ALIGNED_AS_RESEARCH_PENDING_SHARED_NP_COMPONENT`

## Open questions and blockers

- current provisional checklist remains incomplete
- Retained only as a transparent research-pending shared NP representation that prevents hidden-noun fabrication. No DEMO01 promotion candidate remains; one source does not establish broad discourse licensing or productivity.
- Retained only as a transparent headless NP representation. No DEMO01 promotion path remains active.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by HeadlessDemonstrativeClassifierNP?

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
