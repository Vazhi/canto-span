---
title: "NegatedExistentialFragment"
type: "canto-span-construction"
construction: "NegatedExistentialFragment"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-03"
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
standard_test_file: "tests/constructions/NegatedExistentialFragment.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 11
standard_boundary_test_count: 0
standard_executable_test_count: 11
source_ids: ["SRC-LAM-2018-NEGATION-ASPECT", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 6
accepted_fixtures: 11
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-03", "canto-span/workflow/archived"]
---

# NegatedExistentialFragment

## Plain-language claim

Cantonese may instantiate the structural family represented by NegatedExistentialFragment; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_provisional_pending_pattern_specific_attestation_and_heldout_review`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LAM-2018-NEGATION-ASPECT

- Citation: [Lam, Cherry Chit-Yu. 2018. On the Interaction between Negation and Aspect in Grammaticalisation: A Cross-linguistic Study of Three Chinese Varieties. Current Research in Chinese Linguistics 97(1):215-232.](https://www.cuhk.edu.hk/ics/clrc/crcl_97_1/lam.pdf)
- Locator: pp. 216-218, Table 1 and examples (1)-(3)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: 冇 occurs across negative existential, possessive, and perfective-predicate environments.
- Limit: Do not classify every isolated or clause-internal 冇 token as a negated existential fragment.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 6, PDF p. 41 / printed p. 29
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The auxiliary question dialogues answer with 有 or 冇 while optionally repeating parenthetical predicate material.
- Limit: Do not treat a bare answer as a context-free complete possession/existence clause.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 2 total; 2 accepted; 0 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/NegatedExistentialFragment.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/a1-context-status-fixture.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by NegatedExistentialFragment?
- Next evidence action: Reverify at least one exact source, confirm one independent native-speaker review of the relevant positive and negative examples, and draft boundaries before restoring provisional status.

## Related constructions

- [[ComplementEllipsisFragment]]
- [[FragmentAnswer]]
- [[FragmentQuestion]]
- [[IdentificationFragment]]
- [[LocativeFragment]]
- [[NegativeCognitionFragment]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
