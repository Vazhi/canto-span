---
title: "LocativeFrameClause"
type: "canto-span-construction"
construction: "LocativeFrameClause"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-10"
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
standard_test_file: "tests/constructions/LocativeFrameClause.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 4
standard_boundary_test_count: 0
standard_implementation_probe_count: 0
standard_executable_test_count: 4
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-LUI-2020-LOCATIVE-INVERSION", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 10
accepted_fixtures: 4
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10", "canto-span/workflow/archived"]
---

# LocativeFrameClause

## Plain-language claim

Cantonese may instantiate the structural family represented by LocativeFrameClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-ALDERETE-ETAL-2017-SYNOPSIS

- Citation: [Alderete, John, Queenie Chan, Macarius Chan, Gloria Fan, and Olivia Nickel. 2017. Cantonese Grammar Synopsis.](https://www.sfu.ca/~alderete/pubs/aldereteEtal2017_cantgsyn2017-10-31.pdf)
- Locator: pp. 24 and 27; property predication and degree marking
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Copula-less property predicates are independently available; no postverbal theme or positioning verb is involved.
- Limit: Do not infer inversion, existence, or a hidden located entity from place + property order.

### SRC-LUI-2020-LOCATIVE-INVERSION

- Citation: [Lui, Wilson. 2020. Locative Inversion in Cantonese. In Miriam Butt and Ida Toivonen (eds.), Proceedings of the LFG’20 Conference, 250-267. Stanford: CSLI Publications.](https://web.stanford.edu/group/cslipublications/cslipublications/LFG/LFG-2020/lfg2020-lui.pdf)
- Locator: pp. 250-256 and paper aims
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT_AND_METADATA`
- What it supports: The paper reviews long-standing debate and proposes an LFG analysis rather than reporting a settled consensus.
- Limit: Do not label the place expression as syntactic subject, topic, or oblique solely from this source.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: printed weather lesson pp. 95-102 and locative teaching sections
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The textbook separately teaches place expressions, ambient descriptions, and lexical weather events.
- Limit: Do not insert a weather event, hidden subject, copula, or postverbal theme.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/LocativeFrameClause.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/development-baseline.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by LocativeFrameClause?

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
