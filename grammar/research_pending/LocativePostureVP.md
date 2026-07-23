---
title: "LocativePostureVP"
type: "canto-span-construction"
construction: "LocativePostureVP"
status: "research_pending"
confidence: "research_pending"
claim_layer: "language"
lane: "LANE-09"
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
standard_test_file: "tests/constructions/LocativePostureVP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 3
source_ids: ["SRC-LUI-2020-LOCATIVE-INVERSION", "SRC-WONG-2023-LANGUAGE-SAMPLE", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 4
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-09", "canto-span/workflow/archived"]
---

# LocativePostureVP

## Plain-language claim

Cantonese may instantiate the structural family represented by LocativePostureVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `research_pending`
- Current action: `retain_exact_source_linked_posture_location_profile`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-23

## Sources

### SRC-LUI-2020-LOCATIVE-INVERSION

- Citation: [Lui, Wilson. 2020. Locative Inversion in Cantonese. In Miriam Butt and Ida Toivonen (eds.), Proceedings of the LFG’20 Conference, 250-267. Stanford: CSLI Publications.](https://web.stanford.edu/group/cslipublications/cslipublications/LFG/LFG-2020/lfg2020-lui.pdf)
- Locator: pp. 251-253; five location strategies
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT_AND_METADATA`
- What it supports: The paper reports a subject-first verb + 喺 + localiser strategy as a separate location-expression method.
- Limit: Do not import the paper’s strategy name as proof that the runtime’s exact 坐/企/瞓 inventory is exhaustive or uniform.

### SRC-WONG-2023-LANGUAGE-SAMPLE

- Citation: [Wong, Anita Mei-Yin. 2023. Understanding Development and Disorder in Cantonese Using Language Sample Analysis. Routledge.](https://doi.org/10.4324/9780367824013)
- Locator: p. 57; 我喺度做功課 with two contextual interpretations
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The same overt sequence can locate the speaker or mark ongoing homework activity depending on context.
- Limit: Do not label every 喺度 after a subject or before a verb as spatial, or every 喺度 as progressive.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: printed p. 271; 啲人企晒喺度避雨
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: 企 with completive/distributive 晒 and locative 喺度 precedes a purpose/concurrent action.
- Limit: Do not delete 晒, invent a bare 企喺度 example, or treat the later 避雨 as an object.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/LocativePostureVP.json`
- Evidence state: `positive_and_boundary`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/pre-intermediate-gold-corpus.tsv`

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by LocativePostureVP?

## Related constructions

- [[LocativePlacePhrase]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
