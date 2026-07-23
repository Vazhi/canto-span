---
title: "ExperientialClause"
type: "canto-span-construction"
construction: "ExperientialClause"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-05"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
source_count: 4
verified_source_count: 4
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
code_document_reconciled: false
code_document_review_date: null
code_document_review_commit: null
code_document_code_locations: []
current_standard_reaudit_complete: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/ExperientialClause.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 3
source_ids: ["SRC-FAN-2024-JAU-VP-ASPECT", "SRC-SIO-BOND-2025", "SRC-ZHANG-1970-PREDICATIVE-SUFFIXES", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 2
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-05", "canto-span/workflow/archived"]
---

# ExperientialClause

## Plain-language claim

Cantonese may instantiate the structural family represented by ExperientialClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-FAN-2024-JAU-VP-ASPECT

- Citation: [Fan, Xiaolei (范曉蕾). 2024. 香港粵語“有 VP”的時體意義——兼論普通話的“沒”. Current Research in Chinese Linguistics 103(1):1-30. DOI: 10.29499/CrCL.202401_103(1).00012.](https://www.cuhk.edu.hk/ics/clrc/crcl_103_1/fan.pdf)
- Locator: pp. 4-9; examples (3)-(9), Table 1
- Verification: `VERIFIED_OFFICIAL_JOURNAL_FULL_TEXT`
- What it supports: The paper separates 過 from 咗, 緊, and 住 and discusses its interaction with 有.
- Limit: Do not infer a number of experiences, a specific past time, or current-result meaning from 過 alone.

### SRC-SIO-BOND-2025

- Citation: [Sio, Joanna Ut-Seong and Francis Bond. 2025. Inner and outer aspect in Cantonese. HPSG 2025 conference paper.](https://dkaramasov.github.io/hpsg2025/assets/pdf/7-inner-and-outer-aspect-in-cantonese.pdf)
- Locator: PDF pp. 2-4; Tables 1-2
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Experiential aspect modifies a verbal predicate and is distinct from progressive and perfective markers.
- Limit: Do not infer unrestricted selection or a dedicated clause wrapper from the inventory.

### SRC-ZHANG-1970-PREDICATIVE-SUFFIXES

- Citation: [Zhang, Hongnian 張洪年. 1970. 粵語中常見的謂詞詞尾. 中國文化研究所學報 3(2):459-488.](https://www.cuhk.edu.hk/ics/journal/articles/v05p459.pdf)
- Locator: pp. 467-468: 你飲過茶未; 有冇食過唐餐
- Verification: `VERIFIED_OFFICIAL_ARCHIVE_FULL_TEXT`
- What it supports: The source explicitly characterizes 過 as asking whether the experience occurred.
- Limit: Do not translate every V過 as a simple completed past event.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: printed p. 293
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The example contains an overt subject, two V過 predicates, and frequency phrases.
- Limit: Do not reduce the whole sentence to one opaque experiential wrapper.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ExperientialClause.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/development-baseline.json`
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
- Code–documentation comparison: `pending_current_definition_of_done_line_by_line_review`

## Open questions and blockers

- no explicit external claim-source edge
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ExperientialClause?

## Related constructions

- [[ExperientialQuestion]]
- [[ExperientialVP]]
- [[ExperientialYesNoQuestion]]
- [[NegativeExperiential]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
