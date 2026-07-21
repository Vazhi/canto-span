---
title: "NegatedDirectionalMotionVP"
type: "canto-span-construction"
construction: "NegatedDirectionalMotionVP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-09"
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
standard_test_file: "tests/constructions/NegatedDirectionalMotionVP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 10
standard_boundary_test_count: 0
standard_executable_test_count: 10
source_ids: ["SRC-LIANG-MAI-2025-GRAMMAR-CODING", "SRC-WONG-2023-LANGUAGE-SAMPLE", "SRC-YIU-2016-DIRECTIONAL-ASPECT"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 5
accepted_fixtures: 10
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-09", "canto-span/workflow/archived"]
---

# NegatedDirectionalMotionVP

## Plain-language claim

Cantonese may instantiate the structural family represented by NegatedDirectionalMotionVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_provisional_pending_pattern_specific_attestation_and_heldout_review`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LIANG-MAI-2025-GRAMMAR-CODING

- Citation: [Liang, Yuqing and Mai, Ziyin. 2025. Supplementary materials for Grammatical development of the native L1 in Cantonese-English bilingual children: early costs and long-term gains. Bilingualism: Language and Cognition.](https://static.cambridge.org/content/id/urn%3Acambridge.org%3Aid%3Aarticle%3AS1366728925100412/resource/name/S1366728925100412sup001.pdf)
- Locator: Appendix S1, Table S1, structures 11, 15, and 16
- Verification: `VERIFIED_FULL_TEXT_SUPPLEMENT`
- What it supports: Negation is coded [NegAdv-V], directionals as [V-DirPart], and potential as [V-得/唔-Part] or related orders.
- Limit: Do not count this adapted coding scheme as an independent productivity source or collapse its descriptive categories with Canto Span nodes.

### SRC-WONG-2023-LANGUAGE-SAMPLE

- Citation: [Wong, Anita Mei-Yin. 2023. Understanding Development and Disorder in Cantonese Using Language Sample Analysis. Routledge.](https://doi.org/10.4324/9780367824013)
- Locator: book pp. 44-45; negation-adverb section
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The monograph treats these forms as a closed set of negation adverbs preceding and negating an adjective phrase or verb phrase.
- Limit: Do not promote m4 + directional VP as a distinct Cantonese construction or normalize 冇/未/咪 to 唔.

### SRC-YIU-2016-DIRECTIONAL-ASPECT

- Citation: [Yiu, Carine Yuk-man (姚玉敏). 2016. 粵語繼續體「落去」和開始體「起嚟」的產生. In 漢語研究的新貌：方言、語法與文獻 / New Horizons in the Study of Chinese: Dialectology, Grammar, and Philology, pp. 261-284.](https://www.cuhk.edu.hk/ics/clrc/yue/20_carine_yiu.pdf)
- Locator: pp. 268-270; examples 37-56
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Yiu documents forms such as 行得/唔落去 and 行得/唔入嚟, while showing that 起嚟 and aspectualized uses have different or blocked potential behavior.
- Limit: Do not parse V唔directional as simple NegatedDirectionalMotionVP or assume every directional/aspectual form enters the potential construction.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 4 total; 4 accepted; 0 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/NegatedDirectionalMotionVP.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-I1A-I01-D1/development-baseline.json`
  - `review-packets/cp022-evaluation/EP-CP022-I1A-I02-D1/development-baseline.json`
  - `review-packets/v0.5.181/IFR01-D1/development-baseline.json`
  - `review-packets/v0.5.182/IFR02-D1/development-baseline.json`
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.json`
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-D-context_disfluency_research.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-G-grammar_research_external_evidence.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-R-accepted_behavior_regression.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.json`
  - `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.tsv`
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
- checked_exact_source;one_speaker_positive_negative_review;drafted_negative_boundaries;independent_evidence_beyond_parser_tests
- all_sources_reverified;all_used_corpus_hits_manually_classified;qualified_native_panel_threshold;executable_negative_boundaries;code_document_alignment;separate_implementation_and_linguistic_reporting;plain_language_claim
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by NegatedDirectionalMotionVP?
- Next evidence action: Reverify at least one exact source, confirm one independent native-speaker review of the relevant positive and negative examples, and draft boundaries before restoring provisional status.

## Related constructions

- [[NegatedExistentialClause]]
- [[NegatedLexicalizedStative]]
- [[NegatedStativePredicate]]
- [[NegatedVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
