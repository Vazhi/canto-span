---
title: "AcceptabilityClause"
type: "canto-span-construction"
construction: "AcceptabilityClause"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-07"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
source_count: 2
verified_source_count: 2
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
negative_cases_drafted: false
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
code_document_reconciled: false
code_document_review_date: null
code_document_review_commit: null
code_document_code_locations: []
current_standard_reaudit_complete: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/AcceptabilityClause.json"
standard_test_coverage: "implementation_positive_only"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_implementation_probe_count: 1
standard_executable_test_count: 1
source_ids: ["SRC-CHENG-SYBESMA-2004-POSTVERBAL-DAK", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 6
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-07", "canto-span/workflow/archived"]
---

# AcceptabilityClause

## Plain-language claim

Cantonese may instantiate the structural family represented by AcceptabilityClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHENG-SYBESMA-2004-POSTVERBAL-DAK

- Citation: [Cheng, Lisa Lai-Shen, and Rint Sybesma. 2004. Postverbal can in Cantonese (and Hakka) and Agree. Lingua 114(4):419-445.](https://doi.org/10.1016/S0024-3841(03)00067-6)
- Locator: author PDF pp. 2-5 and 18-20
- Verification: `VERIFIED_AUTHOR_FULL_TEXT_AND_PUBLISHER_METADATA`
- What it supports: 得 has distinct constructions and selectional behavior; its presence does not by itself identify 都得 acceptability syntax.
- Limit: Do not use general 得 research to license the runtime’s optional-slot cross-product.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: user PDF pp. 155 and 296
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: Some 都得 clauses are licensed by explicit free-choice material over individuals, times, or places.
- Limit: Do not label every free-choice 都得 sentence as permission or hide the quantified domain.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/AcceptabilityClause.json`
- Evidence state: `none_recorded`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `runtime_referenced_without_accepted_fixtures`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `pending_current_definition_of_done_line_by_line_review`

## Open questions and blockers

- no explicit external claim-source edge
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by AcceptabilityClause?

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## CP039 evaluation/scalar/question wrapper audit

- Implementation-only reachability: `ESQWRAP-001` with `返工都得。`
- Protects the current bare 都得 route only. The probe does not establish permission, free-choice scope, or the optional-slot wrapper as one productive construction.
- Its linguistic evidence weight is **0**; reachability does not establish naturalness, productivity, construction identity, or promotion eligibility.
