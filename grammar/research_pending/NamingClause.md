---
title: "NamingClause"
type: "canto-span-construction"
construction: "NamingClause"
status: "research_pending"
confidence: "research_pending"
claim_layer: "language"
lane: "LANE-10"
last_reviewed: "2026-07-23"
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
code_document_review_commit: null
code_document_code_locations: []
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/NamingClause.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 3
source_ids: ["SRC-CHOW-2007-CANTONESE-EVERYONE", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 5
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10", "canto-span/workflow/archived"]
---

# NamingClause

## Plain-language claim

Cantonese may instantiate the structural family represented by NamingClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `research_pending`
- Current action: `retain_exact_source_linked_profile`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-23

## Sources

### SRC-CHOW-2007-CANTONESE-EVERYONE

- Citation: [Chow, Bun-Ching. 2007. Cantonese for Everyone (Jyutping version) / 大家嘅廣東話. Hong Kong: The Commercial Press. ISBN 978-962-07-1824-3.](https://openlibrary.org/books/OL23210061M/Cantonese_for_everyone)
- Locator: user scan PDF p. 50; personal pronoun + 叫 + full/given/surname name
- Verification: `VERIFIED_USER_PROVIDED_SCAN_AND_BIBLIOGRAPHIC_METADATA`
- What it supports: The coursebook separates giving one’s name with 叫 from introducing with 係.
- Limit: Do not substitute 叫做 or merge naming with copular identification.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: user PDF pp. 219, 256, and 339; 運動…叫做晨運, 救傷車又叫做乜嘢車, 香港叫做大食街
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The coursebook uses 叫做 to assign or discuss category labels and alternative designations.
- Limit: Do not treat every 叫做 complement as a person name.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/NamingClause.json`
- Evidence state: `positive_and_boundary`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `runtime_referenced_with_source_linked_fixture`
- Visible/focused tests: `passing`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `reconciled_2026_07_23`

## Open questions and blockers

- no explicit external claim-source edge
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by NamingClause?

## Related constructions

- [[VocativeAddressTerm]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## v0.5.214 source/runtime reconciliation

- Retained profile: personal naming with exact `叫 + name`, represented by `我叫 Chris。`
- Boundaries exclude `叫做` category-labeling and the distinct surname predicate `姓`.
- The label remains `research_pending`; broader name syntax is not licensed.
