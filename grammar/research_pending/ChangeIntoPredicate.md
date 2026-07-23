---
title: "ChangeIntoPredicate"
type: "canto-span-construction"
construction: "ChangeIntoPredicate"
status: "research_pending"
confidence: "research_pending"
claim_layer: "language"
lane: "LANE-05"
last_reviewed: "2026-07-23"
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
code_document_reconciled: true
code_document_review_date: "2026-07-23"
code_document_review_commit: null
code_document_code_locations: []
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/ChangeIntoPredicate.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 3
source_ids: ["SRC-LAI-PANG-2023", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 4
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-05", "canto-span/workflow/archived"]
---

# ChangeIntoPredicate

## Plain-language claim

Cantonese may instantiate the structural family represented by ChangeIntoPredicate; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `research_pending`
- Current action: retain the exact source-linked `變成 + 點` predicate profile
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LAI-PANG-2023

- Citation: [Lai, Ryan Ka Yau, and Michelle Man-Long Pang. 2023. Rethinking the Description and Typology of Cantonese Causative–Resultative Constructions: A Dynamic Constructionist Lens. Languages 8(2):151. DOI: 10.3390/languages8020151.](https://www.mdpi.com/2226-471X/8/2/151)
- Locator: article typology and schema
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT`
- What it supports: The lexical predicate is one strategy among a broader set.
- Limit: Do not collapse 變成, V1-V2 CRC, V到, and 變咗做.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: same exact example
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: At least wh and nominal-result profiles must be separated or represented compositionally.
- Limit: Do not silently coerce 點 into a nominal entity result.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ChangeIntoPredicate.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ChangeIntoPredicate?

## Related constructions

- [[CausativeResultFrame]]
- [[CausativeResultPredicate]]
- [[DisposalChangeIntoResultFrame]]
- [[ModalChangeIntoResultFrame]]
- [[PerfectiveObjectResultPredicate]]
- [[PerfectiveVP]]
- [[ResultStateClause]]
- [[SeemingPerfectiveResultClause]]
- [[TransformationResultFrame]]
- [[TransformationResultPredicate]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Implementation reachability audit

- Checkpoint: [CP036-P1 result and change-state wrapper audit](../../docs/research/CP036-P1-RESULT-CHANGE-STATE-WRAPPER-AUDIT-R1.md).
- Implementation-only reachability: `RESCHG-002B`.
- These probes protect current parser reachability only; their linguistic evidence weight is **0**.
- They do not change the construction status, source count, panel evidence, or promotion eligibility.

## v0.5.214-r1 source/runtime reconciliation

The runtime now retains only the exact source-linked lexical predicate
`變成 + 點` inside the attested modal question `成個社會會變成點？`. The
subject and modal remain available to ordinary clause composition; the parser
does not add a dedicated modal-change outer wrapper.

Executable boundaries keep aspectual `變咗做` and two-verb causative-result
`整冧咗` outside this node. Nominal complements, other wh complements, disposal
frames, and productive complement selection remain research questions.
