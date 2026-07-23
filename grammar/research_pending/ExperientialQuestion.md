---
title: "ExperientialQuestion"
type: "canto-span-construction"
construction: "ExperientialQuestion"
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
standard_test_file: "tests/constructions/ExperientialQuestion.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 3
source_ids: ["SRC-MATTHEWS-YIP-2011-ASPECT-MULTIMEDIA", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 3
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-05", "canto-span/workflow/archived"]
---

# ExperientialQuestion

## Plain-language claim

Cantonese may instantiate the structural family represented by ExperientialQuestion; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `research_pending`
- Current action: retain the source-linked final-`未` experiential question profile
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-MATTHEWS-YIP-2011-ASPECT-MULTIMEDIA

- Citation: [Matthews, Stephen and Virginia Yip. 2011. Cantonese: A Comprehensive Grammar, 2nd ed. Multimedia supplement, Chapter 11: Aspect and verbal particles. Chinese University of Hong Kong.](https://www.cuhk.edu.hk/lin/cbrc/CantoneseGrammar/multimedia/11.htm)
- Locator: section 11.2.5, 你食過醉雞未呀
- Verification: `VERIFIED_UNIVERSITY_HOSTED_REFERENCE_SUPPLEMENT`
- What it supports: The example combines experiential 過 with final 未 and a question particle.
- Limit: Do not insert 有冇 or reinterpret 未 as simple negation.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 23, PDF pp. 134-135
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The grammar gives positive V過 and negative 未 responses to such questions.
- Limit: Do not infer yes/no, current relevance, or a specific occasion.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ExperientialQuestion.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ExperientialQuestion?

## Related constructions

- [[ExperientialClause]]
- [[ExperientialVP]]
- [[ExperientialYesNoQuestion]]
- [[NegativeExperiential]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Implementation reachability audit

- Checkpoint: [CP035-P1 experiential and delimited wrapper audit](../../docs/research/CP035-P1-EXPERIENTIAL-DELIMITED-WRAPPER-AUDIT-R1.md).
- Implementation-only reachability: `EXPDEL-002`.
- These probes protect current parser reachability only; their linguistic evidence weight is **0**.
- They do not change the construction status, source count, panel evidence, or promotion eligibility.

## v0.5.214-r2 source/runtime reconciliation

The runtime now requires overt experiential material before clause-final `未`,
with only an optional final particle following it. Executable boundaries keep
preverbal `未 + V過` statements and `有冇 + V過` questions on their separate
paths.
