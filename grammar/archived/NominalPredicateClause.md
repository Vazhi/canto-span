---
title: "NominalPredicateClause"
type: "canto-span-construction"
construction: "NominalPredicateClause"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-10"
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
standard_test_file: "tests/constructions/NominalPredicateClause.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 12
standard_boundary_test_count: 0
standard_executable_test_count: 12
source_ids: ["SRC-YIP-MATTHEWS-2000-BASIC", "SRC-TAM-2021-DOZE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 3
accepted_fixtures: 12
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10", "canto-span/workflow/archived"]
---

# NominalPredicateClause

## Plain-language claim

Cantonese may instantiate the structural family represented by NominalPredicateClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 24, printed p. 127; 幾多錢, 幾多歲, 幾長
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The reference treats price, age, and length questions as related question phrases with different overt lexical material.
- Limit: Do not treat all scalar domains as one syntactic template merely because English uses how.

### SRC-TAM-2021-DOZE

- Citation: [Tam, Wing Yu (譚詠瑜). 2021. 香港粵語利益性接收標記「多謝」的話語功能及其語法浮現 [The emergence of a beneficial reception marker: The discourse-pragmatic functions of doze in Hong Kong Cantonese]. Tsing Hua Journal of Chinese Studies 51(3): 539-585.](https://doi.org/10.6503/THJCS.202109_51(3).0004)
- Locator: p. 556, example (20): 係一百蚊嚟㗎
- Verification: `VERIFIED_PUBLISHER_FULL_TEXT`
- What it supports: A corpus example overtly marks a price amount with 係.
- Limit: One overt-係 example does not prove that 係 is obligatory or establish a free alternation rate.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/NominalPredicateClause.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by NominalPredicateClause?

## Related constructions

- [[TimeNP]]
- [[TimeToActionFrame]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
