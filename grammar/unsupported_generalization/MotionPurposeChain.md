---
title: "MotionPurposeChain"
type: "canto-span-construction"
construction: "MotionPurposeChain"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-09"
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
standard_test_file: "tests/constructions/MotionPurposeChain.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 3
source_ids: ["SRC-LEUNG-2026-MOTION", "SRC-MATTHEWS-2006-SVC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 16
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-09", "canto-span/workflow/archived"]
---

# MotionPurposeChain

## Plain-language claim

Cantonese may instantiate the structural family represented by MotionPurposeChain; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LEUNG-2026-MOTION

- Citation: [Leung, J. R. 2026. Detecting paths of change in the heritage context: Directional motion event expression in Cantonese spoken in Toronto and Hong Kong. Asia-Pacific Language Variation 11(1-2).](https://doi.org/10.1075/aplv.25004.leu)
- Locator: accepted manuscript pp. 26-28 and appendix p. 60
- Verification: `VERIFIED_ACCEPTED_MANUSCRIPT`
- What it supports: A purpose phrase was coded only when it immediately followed the motion clause; purposive-marker uses of 去/嚟 were treated separately.
- Limit: Do not interpret the study's annotation criterion as a universal syntactic test or ignore meaning.

### SRC-MATTHEWS-2006-SVC

- Citation: [Matthews, S. 2006. On Serial Verb Constructions in Cantonese. In A. Y. Aikhenvald and R. M. W. Dixon (eds.), Serial Verb Constructions: A Cross-Linguistic Typology, 69-87. Oxford University Press.](https://hub.hku.hk/bitstream/10722/51758/6/FullText.pdf)
- Locator: chapter pp. 69 and 72-74
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The chapter explicitly compares alternative analyses and defines serial constructions more narrowly than a sequence containing two verbs.
- Limit: Do not claim a deterministic purpose reading from word order alone.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/MotionPurposeChain.json`
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
  - `test-data/w17-corpus-semantic-disposition.tsv`

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by MotionPurposeChain?

## Related constructions

- [[MotionDelimitedVP]]
- [[ProgressivePurposeClause]]
- [[PurposePredicate]]
- [[SerialVerbPurposeChain]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
