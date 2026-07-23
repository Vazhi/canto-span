---
title: "ModifiedNP"
type: "canto-span-construction"
construction: "ModifiedNP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-06"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
source_count: 2
verified_source_count: 2
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
standard_test_file: "tests/constructions/ModifiedNP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 38
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 40
source_ids: ["SRC-SIO-2011-GE3", "SRC-YU-2006-NOMINAL-MODIFIERS"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 21
accepted_fixtures: 37
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# ModifiedNP

## Plain-language claim

Cantonese may instantiate the structural family represented by ModifiedNP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_provisional_pending_pattern_specific_attestation_and_heldout_review`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-SIO-2011-GE3

- Citation: [Sio, Joanna Ut-Seong. 2011. The Cantonese ge3. In F. H. Yap, K. Grunow-Hårsta, and J. Wrona (eds.), Nominalization in Asian Languages: Diachronic and Typological Perspectives, 125-146. John Benjamins.](https://doi.org/10.1075/tsl.96.04sio)
- Locator: pp. 128-133; examples 10, 24-26
- Verification: `VERIFIED_FULL_TEXT_AND_PUBLISHER_METADATA`
- What it supports: Sio describes modifier-ge3 as a constituent and reports ordering contrasts among multiple modifiers.
- Limit: Do not infer unrestricted permutation or unlimited recursion.

### SRC-YU-2006-NOMINAL-MODIFIERS

- Citation: [Yu, Dominic. 2006. Relative clauses and nominal modifiers in Cantonese. Unpublished research paper, University of California, Berkeley.](https://linguistics.berkeley.edu/~dom/cantonese-rc.pdf)
- Locator: pp. 4-6; nominal-order and modifier examples
- Verification: `VERIFIED_FULL_TEXT_CORROBORATIVE`
- What it supports: Yu’s inventory corroborates multiple modifier placements and nominal orders.
- Limit: Do not inherit Yu’s full theoretical analysis.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_MIXED_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 7 total; 6 accepted; 1 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ModifiedNP.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/development-baseline.json`
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.json`
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-D-context_disfluency_research.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-G-grammar_research_external_evidence.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-L-lexicon_jyutping_enrichment.tsv`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-naturalness-conflict-dispositions.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ModifiedNP?
- Next evidence action: Reverify at least one exact source, confirm one independent native-speaker review of the relevant positive and negative examples, and draft boundaries before restoring provisional status.

## Related constructions

- [[ModifierNP]]
- [[RelativeClauseNP]]
- [[StativeNominalComplement]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
