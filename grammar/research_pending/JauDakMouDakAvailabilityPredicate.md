---
title: "JauDakMouDakAvailabilityPredicate"
type: "canto-span-construction"
construction: "JauDakMouDakAvailabilityPredicate"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language_construction"
lane: "LANE-07"
last_reviewed: "2026-08-01"
last_status_migrated: "2026-08-05"
source_count: 3
verified_source_count: 3
panel_response_count_total: 0
eligible_panel_response_count: 0
minimum_usable_judgments_per_critical_item: 0
critical_contrast_coverage: "none"
survey_instrument_version: "none"
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
negative_boundary_inventory_complete: true
corpus_evidence_used: true
corpus_hits_reviewed: true
corpus_candidate_hit_count: 95
corpus_genuine_hit_count: 68
corpus_false_positive_count: 15
corpus_ambiguous_hit_count: 9
corpus_unusable_hit_count: 3
code_document_reconciled: true
code_document_review_date: "2026-08-05"
code_document_review_commit: null
code_document_code_locations: ["src/parser/detectors/modality/availability.js", "src/runtime-resources/constructions/runtime-label-registry.js"]
current_standard_reaudit_complete: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/JauDakMouDakAvailabilityPredicate.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 4
standard_boundary_test_count: 3
standard_implementation_probe_count: 1
standard_executable_test_count: 8
source_ids: ["SRC-LAM-LAU-LEE-2024-SEGMENTATION", "SRC-HUANG-HER-KONG-2025-INTERROGATIVES", "HKCANCOR-JAU-MOU-DAK-R1"]
runtime_active: true
workflow_state: "active"
workflow_priority: null
workflow_since: "2026-08-05"
workflow_reason: "issue_597_runtime_identity_implementation"
runtime_code_references: 2
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-07", "canto-span/workflow/active"]
---

# JauDakMouDakAvailabilityPredicate

## Plain-language claim

Cantonese has a recurring preverbal availability or opportunity relation in which `有得` or `冇得` precedes an overt predicate. Affirmative `有得 + predicate` presents the event as available or possible; negative `冇得 + predicate` presents it as unavailable or impossible. The suppletive-polar surface `有冇得 + predicate` asks which availability alternative holds.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_research_pending_runtime_identity_without_status_promotion`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-08-01

## Sources

### SRC-LAM-LAU-LEE-2024-SEGMENTATION

- Citation: Lam, Lau, and Lee 2024 segmentation source as recorded by `docs/research/JAU-MOU-DAK-AVAILABILITY-IDENTITY-SPECIFICATION-R1.md`.
- Locator: project source map for the exact `有得` and `冇得` segmentation claim.
- Verification: `VERIFIED_SOURCE_USED_BY_IDENTITY_SPECIFICATION_R1`
- What it supports: Affirmative `有得` and negative `冇得` are treated as preverbal units expressing possibility or unavailability/impossibility of the following event-denoting predicate.
- Limit: The source does not by itself establish unrestricted productivity, status promotion, or panel acceptance.

### SRC-HUANG-HER-KONG-2025-INTERROGATIVES

- Citation: Huang, Her, and Kong 2025 interrogatives source as recorded by `docs/research/JAU-MOU-DAK-AVAILABILITY-IDENTITY-SPECIFICATION-R1.md`.
- Locator: project source map for suppletive `有冇` interrogative evidence.
- Verification: `VERIFIED_SOURCE_USED_BY_IDENTITY_SPECIFICATION_R1`
- What it supports: General suppletive `有冇` question-force evidence; applying it to `有冇得 + predicate` is a project inference recorded in the accepted specification.
- Limit: It does not create a second language-construction UUID for `有冇得`.

### HKCANCOR-JAU-MOU-DAK-R1

- Citation: Exhaustive HKCanCor 有得／冇得 inventory and complete review recorded in the accepted identity specification.
- Locator: `external-evidence/jau-mou-dak-hkcancor/`
- Verification: `COMPLETE_PROJECT_CORPUS_REVIEW`
- What it supports: 95 spans in 89 utterances across 38 files, including 63 transparent compositional rows and five suppletive-polar questions.
- Limit: Corpus attestation establishes recurrence in context but does not establish unrestricted predicate productivity or satisfy later panel and held-out gates.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_STARTED`
- Structural-analysis validations: 0.
- Role-neutral panel state: `NOT_STARTED`.

## Positive profile

- `有得 + overt predicate`
- `冇得 + overt predicate`
- `有冇得 + overt predicate`

The runtime span starts at the first overt availability-head token and ends at the end of the independently typed predicate phrase. Subjects, topics, locations, temporal frames, higher modals, quotation frames, embedding predicates, and final particles remain outside the narrow availability span unless separately licensed by another wrapper.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/JauDakMouDakAvailabilityPredicate.json`
- Evidence state: `source_first_runtime_identity_with_boundaries`
- Executable or review records containing this label:
  - `docs/research/JAU-MOU-DAK-AVAILABILITY-IDENTITY-SPECIFICATION-R1.md`
  - `data/research/JAU-MOU-DAK-AVAILABILITY-IDENTITY-DECISION-R1.json`

Boundaries:

- Do not match nominal possessive or existential `有／冇 + NP`.
- Do not match ordinary event-occurrence `有冇 + VP` without `得`.
- Do not match lexical `V-唔-V` questions.
- Do not match postverbal potential such as `V到／V唔到`.
- Do not license predicate omission in the context-free core.
- Quarantine fused or semi-lexical expressions such as `冇得頂`, `冇得講`, `冇得計`, `冇得搞`, and `有得諗`.

## Implementation state

- Lifecycle: `runtime_referenced_with_accepted_source_first_specification`
- Visible/focused tests: `pending_current_branch_validation`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `pending_current_branch_validation`
- Code–documentation comparison: `reconciled_for_issue_597_scope`

## Open questions and blockers

- Panel contrasts against `可以／唔可以`, postverbal potential, predicate classes, and lexicalized controls remain future work.
- Held-out validation for unseen predicate classes, host orders, tokenization variants, and lexical/discourse formulas remains future work.
- This issue does not promote the construction beyond `research_pending`.

## Related constructions

- `ModalVP`
- `M4MarkedANotAInterrogative`
- `SubjectJauPossessiveClause`
- `ExistentialQuestion`
- `PotentialResultVP`

## Migration provenance

- Candidate UUID: `4e176fe2-a147-47c7-86c8-6778a379beb2`
- Identity specification: `docs/research/JAU-MOU-DAK-AVAILABILITY-IDENTITY-SPECIFICATION-R1.md`
- Machine-readable decision: `data/research/JAU-MOU-DAK-AVAILABILITY-IDENTITY-DECISION-R1.json`
- Runtime implementation issue: #597
- Work claim: #606
