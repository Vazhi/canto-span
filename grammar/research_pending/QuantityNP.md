---
title: "QuantityNP"
type: "canto-span-construction"
construction: "QuantityNP"
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
standard_test_file: "tests/constructions/QuantityNP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 3
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 5
source_ids: ["SRC-YIP-MATTHEWS-2000-BASIC", "SRC-BOND-SIO-2024-CLASSIFIERS", "SRC-XIA-2025-CLASSIFIERS"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 5
accepted_fixtures: 3
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# QuantityNP

## Plain-language claim

Cantonese may instantiate the structural family represented by QuantityNP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_provisional_pending_pattern_specific_attestation_and_heldout_review`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 13, printed p. 67; Yahpbihn yáuh hóu dō yéh
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The reference contains the transparent sequence quantity expression + overt noun within a full existential clause.
- Limit: Do not infer all numeral/measure expressions belong to this NP schema.

### SRC-BOND-SIO-2024-CLASSIFIERS

- Citation: [Bond, Francis and Joanna Ut-Seong Sio. 2024. A Construction-based Approach to Cantonese Classifiers. Proceedings of the 31st International Conference on Head-Driven Phrase Structure Grammar, 60-75.](https://doi.org/10.21248/hpsg.2024.4)
- Locator: pp. 61-66; Table 1; examples 1-3
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The implemented HPSG analysis separates overt classifier/noun configurations and their interpretations.
- Limit: Do not import the HPSG ontology wholesale or erase regional variation.

### SRC-XIA-2025-CLASSIFIERS

- Citation: [Xia, Hengliang. 2025. Syntax of Classifiers and Measure Words in Three Chinese Languages. Proceedings of the 2025 Annual Conference of the Canadian Linguistic Association.](https://cla-acl.ca/pdfs/actes-2025/Xia-CLA-2025.pdf)
- Locator: pp. 6-11; examples 13-15; Figures 2-3
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper uses coordination and ellipsis diagnostics to separate classifier structures.
- Limit: Do not infer a silent noun in every bare measure expression.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/QuantityNP.json`
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
- checked_exact_source;one_speaker_positive_negative_review;drafted_negative_boundaries;independent_evidence_beyond_parser_tests
- all_sources_reverified;all_used_corpus_hits_manually_classified;qualified_native_panel_threshold;executable_negative_boundaries;code_document_alignment;separate_implementation_and_linguistic_reporting;plain_language_claim
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by QuantityNP?
- Next evidence action: Reverify at least one exact source, confirm one independent native-speaker review of the relevant positive and negative examples, and draft boundaries before restoring provisional status.

## Related constructions

- [[ApproximateQuantity]]
- [[ClassifierObjectNP]]
- [[QuantifiedClassifierNP]]
- [[QuantifiedPersonNP]]
- [[QuantifiedTimeNP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
