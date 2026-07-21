---
title: "DurativeVP"
type: "canto-span-construction"
construction: "DurativeVP"
status: "research_pending"
confidence: "not_assigned_research_pending"
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
standard_test_file: "tests/constructions/DurativeVP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 1
standard_boundary_test_count: 0
standard_executable_test_count: 1
source_ids: ["SRC-FAN-2024-JAU-VP-ASPECT", "SRC-KATAOKA-2018-PROGRESSIVE-GAN", "SRC-MATTHEWS-YIP-2011-ASPECT-MULTIMEDIA", "SRC-SIO-BOND-2025"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 4
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-05", "canto-span/workflow/archived"]
---

# DurativeVP

## Plain-language claim

Cantonese may instantiate the structural family represented by DurativeVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-FAN-2024-JAU-VP-ASPECT

- Citation: [Fan, Xiaolei (范曉蕾). 2024. 香港粵語“有 VP”的時體意義——兼論普通話的“沒”. Current Research in Chinese Linguistics 103(1):1-30. DOI: 10.29499/CrCL.202401_103(1).00012.](https://www.cuhk.edu.hk/ics/clrc/crcl_103_1/fan.pdf)
- Locator: pp. 8-9, discussion after examples (7)-(9)
- Verification: `VERIFIED_OFFICIAL_JOURNAL_FULL_TEXT`
- What it supports: The paper reports restrictions with dynamically changing predicates and special licensing in subordinate/irrealis environments.
- Limit: Do not generalize from a few examples to all verbs or clause types.

### SRC-KATAOKA-2018-PROGRESSIVE-GAN

- Citation: [Kataoka, Shin (片岡新). 2018. 從早期和現代語料看粵語進行體標記“緊”在複句中的功能. Current Research in Chinese Linguistics 97(1):133-141.](https://www.cuhk.edu.hk/ics/clrc/crcl_97_1/kataoka.pdf)
- Locator: p. 134, examples (3)-(4)
- Verification: `VERIFIED_OFFICIAL_JOURNAL_FULL_TEXT`
- What it supports: 着緊 means the dressing event is in progress; 着住 means wearing/remaining in the state.
- Limit: Do not translate both with one undifferentiated English gloss.

### SRC-MATTHEWS-YIP-2011-ASPECT-MULTIMEDIA

- Citation: [Matthews, Stephen and Virginia Yip. 2011. Cantonese: A Comprehensive Grammar, 2nd ed. Multimedia supplement, Chapter 11: Aspect and verbal particles. Chinese University of Hong Kong.](https://www.cuhk.edu.hk/lin/cbrc/CantoneseGrammar/multimedia/11.htm)
- Locator: section 11.2.3, 陪住你
- Verification: `VERIFIED_UNIVERSITY_HOSTED_REFERENCE_SUPPLEMENT`
- What it supports: The reference supplement gives 我想以後成日陪住你.
- Limit: Do not infer that every action_verb + 住 + object is licensed.

### SRC-SIO-BOND-2025

- Citation: [Sio, Joanna Ut-Seong and Francis Bond. 2025. Inner and outer aspect in Cantonese. HPSG 2025 conference paper.](https://dkaramasov.github.io/hpsg2025/assets/pdf/7-inner-and-outer-aspect-in-cantonese.pdf)
- Locator: pp. 2-3, Tables 1-2
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper lists 住 as continuous activity/state without change and 緊 as progressive.
- Limit: Do not collapse 住 into generic progressive aspect.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/DurativeVP.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by DurativeVP?

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
