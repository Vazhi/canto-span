---
title: "JauDakMouDakAvailabilityPredicate"
type: "canto-span-construction"
construction: "JauDakMouDakAvailabilityPredicate"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-10"
last_reviewed: "2026-08-01"
last_status_migrated: "2026-08-05"
source_count: 3
verified_source_count: 3
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
negative_boundary_inventory_complete: true
corpus_evidence_used: true
corpus_hits_reviewed: true
corpus_candidate_hit_count: 95
corpus_genuine_hit_count: 70
corpus_false_positive_count: 15
corpus_ambiguous_hit_count: 7
corpus_unusable_hit_count: 3
code_document_reconciled: true
code_document_review_date: "2026-08-05"
code_document_review_commit: null
code_document_code_locations: ["src/parser/detectors/modality/modal-predicates.js"]
current_standard_reaudit_complete: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/JauDakMouDakAvailabilityPredicate.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 5
standard_boundary_test_count: 8
standard_implementation_probe_count: 0
standard_executable_test_count: 13
source_ids: ["SRC-LAM-LAU-LEE-2024-SEGMENTATION", "SRC-HUANG-HER-KONG-2025-INTERROGATIVES", "HKCANCOR-JAU-MOU-DAK-R1"]
runtime_active: true
workflow_state: "available"
workflow_priority: null
workflow_since: "2026-08-05"
workflow_reason: "implemented_from_accepted_jau_mou_dak_availability_specification"
runtime_code_references: 1
accepted_fixtures: 5
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10", "canto-span/workflow/available"]
---

# JauDakMouDakAvailabilityPredicate

## Plain-language claim

Cantonese has a preverbal availability or opportunity relation headed by overt `有得` or `冇得` before an overt predicate. The affirmative profile says the predicate event is available or possible; the negative profile says it is unavailable or impossible. The suppletive-polar profile `有冇得 + predicate` asks which availability alternative holds.

This note records the runtime identity and evidence boundary for the accepted candidate UUID `4e176fe2-a147-47c7-86c8-6778a379beb2`. It does not promote the construction beyond `research_pending`.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_with_runtime_coverage_and_quarantine_boundaries`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-08-01

## Sources

### SRC-LAM-LAU-LEE-2024-SEGMENTATION

- Verification: `VERIFIED_FULL_TEXT`
- What it supports: affirmative `有得` and negative `冇得` are treated as preverbal units relating to the following event or predicate.
- Limit: This source does not establish every corpus boundary, ellipsis profile, or suppletive-polar `有冇得` case.

### SRC-HUANG-HER-KONG-2025-INTERROGATIVES

- Verification: `VERIFIED_FULL_TEXT`
- What it supports: general Cantonese `有冇` suppletive-polar question force and embedded question-force evidence.
- Limit: The application to `有冇得` is a project inference over the accepted availability identity, not an independent proof that `有冇得` requires a second UUID.

### HKCANCOR-JAU-MOU-DAK-R1

- Verification: `PROJECT_REVIEWED_CORPUS_PACKET`
- What it supports: 95 reviewed spans across 89 utterances and 38 frozen files, including 63 transparent compositional availability rows, five suppletive-polar questions, two recoverable ellipsis rows, 15 lexicalized or idiomatic rows, seven ambiguous boundaries, and three repairs or unusable rows.
- Limit: Corpus distribution establishes recurring contextual attestation and boundaries; it does not alone establish unrestricted productivity or panel sufficiency.

## Positive profile

```text
有得 + overt predicate
冇得 + overt predicate
有冇得 + overt predicate
有 + 冇得 + overt predicate
```

The narrow construction span begins at the first overt availability head token and ends at the independently licensed predicate phrase. Premarker subjects, topics, locations, temporal frames, conditions, focus markers, higher modals, quotation frames, embedding predicates, and clause-final particles remain outside the narrow node unless another transparent wrapper owns them.

## Negative and boundary cases

The productive profile must not absorb:

- AA55 possession or nominal availability such as subject + `有 + NP`;
- AA77 place existence such as place + `有／冇 + NP`;
- nominal `有冇 + NP` questions;
- ordinary event `有冇 + VP` without `得`;
- ordinary lexical `V-唔-V` A-not-A questions;
- postverbal potential such as `V到／V唔到`;
- predicate-less `有得／冇得` without uniquely recoverable discourse context;
- fused or formulaic expressions such as `冇得頂` and `冇得講`;
- repairs, interruptions, or unresolved lexical-category cases.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Implementation state

- Lifecycle: `runtime_referenced_with_accepted_fixtures`
- Standard executable test file: `tests/constructions/JauDakMouDakAvailabilityPredicate.json`
- Implementation evidence is kept separate from linguistic evidence.
- The suppletive-polar profile remains the same UUID plus question-force metadata; it does not receive a second language-construction UUID.

## Open questions and blockers

- Role-neutral panel contrasts are not complete.
- Held-out validation is not complete.
- Predicate-less ellipsis must remain context-linked and is not accepted as a context-free profile.
- Lexicalized negative expressions may need future lexical or discourse identities, but they are quarantined from this productive profile.

## Related constructions

- [[ModalAuxiliaryComplementVP]]
- [[ExistentialQuestion]]
- [[SubjectJauPossessiveClause]]
- [[PotentialResultVP]]
