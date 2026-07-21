---
title: "QuantifiedTimeNP"
type: "canto-span-construction"
construction: "QuantifiedTimeNP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-06"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
source_count: 3
verified_source_count: 3
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
standard_test_file: "tests/constructions/QuantifiedTimeNP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 13
standard_boundary_test_count: 0
standard_executable_test_count: 13
source_ids: ["SRC-TANG-2024-CANTONESE-GRAMMAR-GUIDE", "SRC-WONG-2002-CANTONESE-ADVERBS", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 10
accepted_fixtures: 13
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# QuantifiedTimeNP

## Plain-language claim

Cantonese may instantiate the structural family represented by QuantifiedTimeNP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-TANG-2024-CANTONESE-GRAMMAR-GUIDE

- Citation: [Tang, Jason. 2024. Guide to Cantonese Grammar. Version dated 22 January 2024.](https://ywjt2.user.srcf.net/cantonese/guide_to_cantonese_grammar.pdf)
- Locator: pp. 37-39
- Verification: `VERIFIED_AUTHOR_FULL_TEXT`
- What it supports: The listed duration and calendar expressions alternate between classifier-bearing and classifierless forms according to the head expression.
- Limit: Do not treat classifier presence as a stylistic option across the entire temporal lexicon.

### SRC-WONG-2002-CANTONESE-ADVERBS

- Citation: [Wong, Lai-yin. 2002. The Morphology, Syntax, and Semantics of Adverbs in Cantonese. MPhil thesis, The University of Hong Kong.](https://hub.hku.hk/bitstream/10722/33936/1/FullText.pdf)
- Locator: PDF pp. 25-26 (printed pp. 18-19)
- Verification: `VERIFIED_OFFICIAL_REPOSITORY_FULL_TEXT`
- What it supports: Time words are nominal elements that may participate in several syntactic functions.
- Limit: Do not assign a when-role or duration role solely because a quantity and time head co-occur.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 11, PDF pp. 66-67 (printed pp. 53-54)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The grammar explicitly notes that monosyllabic time units such as 日 and 年 do not take 個 after 每, unlike month/week examples.
- Limit: Do not derive every 每-time expression from 每 + optional 個 + arbitrary time head.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/QuantifiedTimeNP.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `test-data/pre-intermediate-gold-corpus.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by QuantifiedTimeNP?

## Related constructions

- [[ApproximateQuantity]]
- [[ClassifierObjectNP]]
- [[QuantifiedClassifierNP]]
- [[QuantifiedPersonNP]]
- [[QuantityNP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
