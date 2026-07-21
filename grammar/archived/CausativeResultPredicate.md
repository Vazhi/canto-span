---
title: "CausativeResultPredicate"
type: "canto-span-construction"
construction: "CausativeResultPredicate"
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
standard_test_file: "tests/constructions/CausativeResultPredicate.json"
standard_test_coverage: "no_direct_cases"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_implementation_probe_count: 0
standard_executable_test_count: 0
source_ids: ["SRC-KEDZIOR-2023", "SRC-LAI-PANG-2023"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 4
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-05", "canto-span/workflow/archived"]
---

# CausativeResultPredicate

## Plain-language claim

Cantonese may instantiate the structural family represented by CausativeResultPredicate; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-KEDZIOR-2023

- Citation: [Kędzior, Adrian. 2023. Verbal Morphological Category of Aspect in the Cantonese Language. Linguistica Silesiana 44(1):47-71. DOI: 10.24425/linsi.2023.144823.](https://doi.org/10.24425/linsi.2023.144823)
- Locator: pp. 51-53, section 3 and perfective discussion
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT`
- What it supports: Separate the CRC relation from the overt perfective layer.
- Limit: Do not gloss 咗 itself as the result verb or result-state proof.

### SRC-LAI-PANG-2023

- Citation: [Lai, Ryan Ka Yau, and Michelle Man-Long Pang. 2023. Rethinking the Description and Typology of Cantonese Causative–Resultative Constructions: A Dynamic Constructionist Lens. Languages 8(2):151. DOI: 10.3390/languages8020151.](https://www.mdpi.com/2226-471X/8/2/151)
- Locator: holistic-versus-decompositional analysis
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT`
- What it supports: Runtime child slots such as causative_verb, result_verb, and object must remain theory-neutral and defeasible.
- Limit: Do not assign the object to 整 or 冧 solely from code structure.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/CausativeResultPredicate.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by CausativeResultPredicate?

## Related constructions

- [[CausativeResultFrame]]
- [[ChangeIntoPredicate]]
- [[DisposalChangeIntoResultFrame]]
- [[ModalChangeIntoResultFrame]]
- [[PerfectiveObjectResultPredicate]]
- [[PerfectiveResultPredicate]]
- [[ResultStateClause]]
- [[SeemingPerfectiveResultClause]]
- [[TransformationResultFrame]]
- [[TransformationResultPredicate]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
