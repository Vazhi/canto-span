---
title: "PerfectiveResultPredicate"
type: "canto-span-construction"
construction: "PerfectiveResultPredicate"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-05"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
source_count: 2
verified_source_count: 2
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
negative_cases_drafted: false
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
standard_test_file: "tests/constructions/PerfectiveResultPredicate.json"
standard_test_coverage: "no_direct_cases"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_implementation_probe_count: 0
standard_executable_test_count: 0
source_ids: ["SRC-FAN-CHAN-2022", "SRC-KEDZIOR-2023"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 3
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-05", "canto-span/workflow/archived"]
---

# PerfectiveResultPredicate

## Plain-language claim

Cantonese may instantiate the structural family represented by PerfectiveResultPredicate; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-FAN-CHAN-2022

- Citation: [Fan, Xiaolei and Kin Wing Kevin Chan. 2022. 香港粵語「咗」的語法特點：與北京話「了1」的比較 [Grammatical properties of zo 咗 in Hong Kong Cantonese: A comparative study with le1 了1 in Beijing Mandarin]. Language and Linguistics 23(3): 371-410.](https://www.jbe-platform.com/content/journals/10.1075/lali.00110.fan?crawler=true)
- Locator: p. 374 example and article discussion
- Verification: `VERIFIED_PUBLISHER_TEXT_AND_METADATA`
- What it supports: Aspect placement may depend on predicate structure, but it does not establish this dedicated label.
- Limit: Do not infer a universal result-state node.

### SRC-KEDZIOR-2023

- Citation: [Kędzior, Adrian. 2023. Verbal Morphological Category of Aspect in the Cantonese Language. Linguistica Silesiana 44(1):47-71. DOI: 10.24425/linsi.2023.144823.](https://doi.org/10.24425/linsi.2023.144823)
- Locator: section 3 and pp. 51-53
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT`
- What it supports: Result lexical semantics and aspect morphology must be represented separately.
- Limit: Do not treat every V咗 as a resultative construction.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/PerfectiveResultPredicate.json`
- Evidence state: `none_recorded`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `runtime_referenced_without_accepted_fixtures`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `pending_current_definition_of_done_line_by_line_review`

## Open questions and blockers

- no explicit external claim-source edge
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by PerfectiveResultPredicate?

## Related constructions

- [[CausativeResultFrame]]
- [[CausativeResultPredicate]]
- [[ChangeIntoPredicate]]
- [[DisposalChangeIntoResultFrame]]
- [[ModalChangeIntoResultFrame]]
- [[PerfectiveObjectResultPredicate]]
- [[ResultStateClause]]
- [[SeemingPerfectiveResultClause]]
- [[TransformationResultFrame]]
- [[TransformationResultPredicate]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Constructor-specific reachability review

- Checkpoint: [CP036-P1 result and change-state wrapper audit](../../docs/research/CP036-P1-RESULT-CHANGE-STATE-WRAPPER-AUDIT-R1.md).
- The direct `解決 + 咗 + optional particle` fallback still exists internally, but complete parser output routes the same surface through `PerfectiveVP` before this wrapper can survive.
- No implementation-only probe was added because the label is not observed in complete output. It remains `no_direct_cases` and carries no linguistic evidence.

## Retirement record — v0.5.197

- Retired at: `v0.5.197-shadowed-wrapper-retirement`
- Final disposition: `RETIRED_FROM_ACTIVE_GRAMMAR_TABLE`
- Reason: the constructor was hard-coded to `解決咗`, was consumed by the broader `PerfectiveVP` route before complete output, and added no independently sourced boundary beyond lexical predicate plus perfective aspect composition.
- Preserved research: the mapped aspect and result-state sources remain preserved for `PerfectiveVP`, result-complement, and lexical-result research; they do not license a dedicated productive wrapper.
