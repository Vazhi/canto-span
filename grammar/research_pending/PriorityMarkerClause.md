---
title: "PriorityMarkerClause"
type: "canto-span-construction"
construction: "PriorityMarkerClause"
status: "research_pending"
confidence: "research_pending"
claim_layer: "language"
lane: "LANE-03"
last_reviewed: "2026-07-23"
last_status_migrated: "2026-07-21"
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
standard_test_file: "tests/constructions/PriorityMarkerClause.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 3
source_ids: ["SRC-SYBESMA-2013", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE", "SRC-ZHOU-2018-POSTVERBAL-SIN1"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 6
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-03", "canto-span/workflow/archived"]
---

# PriorityMarkerClause

## Plain-language claim

Cantonese may instantiate the structural family represented by PriorityMarkerClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `research_pending`
- Current action: `retain_exact_source_linked_postverbal_profile`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-23

## Sources

### SRC-SYBESMA-2013

- Citation: [Sybesma, Rint. 2013. Cantonese sin1 先 and the question of microvariation and macrovariation. In Guangshun Cao, Hilary Chappell, Redouane Djamouri, and Thekla Wiebusch (eds.), Breaking Down the Barriers: Interdisciplinary Studies in Chinese Linguistics and Beyond, 971-994. Taipei: Academia Sinica.](https://www.researchgate.net/publication/305411096_Cantonese_sin_xian_and_the_question_of_microvariation_and_macrovariation)
- Locator: author-uploaded chapter abstract and full discussion
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Postverbal 先 is not one homogeneous item or distribution.
- Limit: Do not import the contact analysis or assume universal speaker behavior.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: 第二時先啦 explanation; 落定啲訂先 and 開會前睇定啲文件先
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: Visible 先 participates in particleized and preparatory patterns not reducible to generic action-first sequencing.
- Limit: Do not label all postverbal 先 as the same construction or meaning.

### SRC-ZHOU-2018-POSTVERBAL-SIN1

- Citation: [Zhou, Yang. 2018. Exploring the emergence of the postverbal sin1 先 in Cantonese. Language and Linguistics 19(2):333-375. DOI: 10.1075/lali.00012.zho.](https://www.jbe-platform.com/content/journals/10.1075/lali.00012.zho)
- Locator: official abstract and article introduction
- Verification: `VERIFIED_OFFICIAL_PUBLISHER_ABSTRACT_AND_FULL_TEXT`
- What it supports: The article identifies postverbal placement as prominent for the priority meaning and emphasizes polysemy.
- Limit: Do not convert the diachronic account into a free parser template.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/PriorityMarkerClause.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by PriorityMarkerClause?

## Related constructions

- [[TemporalClause]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
