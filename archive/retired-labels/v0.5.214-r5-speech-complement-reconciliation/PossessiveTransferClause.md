---
title: "PossessiveTransferClause"
type: "canto-span-construction"
construction: "PossessiveTransferClause"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-06"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
source_count: 3
verified_source_count: 3
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
standard_test_file: "tests/constructions/PossessiveTransferClause.json"
standard_test_coverage: "implementation_positive_only"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_implementation_probe_count: 1
standard_executable_test_count: 1
source_ids: ["SRC-LAM-LAU-LEE-2024-SEGMENTATION", "SRC-LI-LEE-2021-DATIVE", "SRC-LUKE-NANCARROW-1998-AUXILIARIES"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 5
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# PossessiveTransferClause

> Retired in v0.5.214-r5: component evidence did not license the combined possession-plus-transfer wrapper.

## Plain-language claim

Cantonese may instantiate the structural family represented by PossessiveTransferClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LAM-LAU-LEE-2024-SEGMENTATION

- Citation: [Lam, Charles, Chaak Ming Lau, and Jackson L. Lee. 2024. Multi-Tiered Cantonese Word Segmentation. Proceedings of LREC-COLING 2024, 11993-12002.](https://aclanthology.org/2024.lrec-main.1047/)
- Locator: PDF p. 5 section 4.5.2; explicit-subject 有 example
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The source distinguishes verbal possessive 有 with an explicit subject from existential-marker 有 without an overt subject.
- Limit: Do not treat every 有 clause as transfer or combine possession with a later modal automatically.

### SRC-LI-LEE-2021-DATIVE

- Citation: [Li, J. and Lee, P. C. 2021. Syntactic Distribution of the Semantic Classes of Dative Verbs in English and Cantonese.](https://aclanthology.org/2021.paclic-1.66/)
- Locator: pp. 628-629; examples 2-6
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper illustrates bounded lexical GIVE double-object orders and dative verb classes.
- Limit: Do not infer that every 畀 is transfer, that order is universal, or that a preceding 有+NP licenses the combined clause.

### SRC-LUKE-NANCARROW-1998-AUXILIARIES

- Citation: [Luke, K. K. and O. T. Nancarrow. 1998. Auxiliary Verbs in Cantonese. In Stephen Matthews (ed.), Studies in Cantonese Linguistics. Hong Kong: Linguistic Society of Hong Kong.](https://lshk.org/wp-content/uploads/2022/11/STUDIES-IN-CANTONESE-LINGUISTICS.pdf)
- Locator: printed pp. 81-98; core/non-core inventories and examples 41-55
- Verification: `VERIFIED_SCHOLARLY_FULL_TEXT_SCAN`
- What it supports: Luke and Nancarrow distinguish auxiliary and main-verb uses and discuss position, scope, and lexical meanings including 要.
- Limit: Do not infer obligation, intention, or one complement type from token presence alone.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/PossessiveTransferClause.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by PossessiveTransferClause?

## Related constructions

- [[PossessiveClassifierNP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## CP038 speech/transfer/complement wrapper audit

- Implementation-only reachability: `STCWRAP-003` with `我有本書要畀你。`
- The probe protects the current combined possession, nominal, modal, transfer, and recipient wrapper only. Component evidence is not combined-construction evidence.
- Its linguistic evidence weight is **0**; reachability does not establish naturalness, productivity, or promotion eligibility.
