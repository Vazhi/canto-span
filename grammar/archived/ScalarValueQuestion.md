---
title: "ScalarValueQuestion"
type: "canto-span-construction"
construction: "ScalarValueQuestion"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-07"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 0
source_count: 2
verified_source_count: 2
independent_speaker_count: 0
same_contrast_independent_speaker_count: 0
native_positive_contrasts_reviewed: false
native_negative_contrasts_reviewed: false
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
promotion_gate_version: "v2"
standard_test_file: "tests/constructions/ScalarValueQuestion.json"
standard_test_coverage: "no_direct_cases"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_executable_test_count: 0
source_ids: ["SRC-YIP-MATTHEWS-2000-BASIC", "SRC-TAM-2021-DOZE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 11
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-07", "canto-span/workflow/archived"]
---

# ScalarValueQuestion

## Plain-language claim

Cantonese may instantiate the structural family represented by ScalarValueQuestion; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 24, printed p. 127
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: 幾多錢 contains quantity and currency material; 幾長 contains a scalar predicate.
- Limit: Shared English how much/how does not prove one Cantonese construction.

### SRC-TAM-2021-DOZE

- Citation: [Tam, Wing Yu (譚詠瑜). 2021. 香港粵語利益性接收標記「多謝」的話語功能及其語法浮現 [The emergence of a beneficial reception marker: The discourse-pragmatic functions of doze in Hong Kong Cantonese]. Tsing Hua Journal of Chinese Studies 51(3): 539-585.](https://doi.org/10.6503/THJCS.202109_51(3).0004)
- Locator: p. 557, example (21): 幾錢呀 / 五毫子
- Verification: `VERIFIED_PUBLISHER_FULL_TEXT`
- What it supports: A historical-film corpus exchange contains the exact price question 幾錢呀 and the amount response 五毫子.
- Limit: Do not infer current frequency, arbitrary optional arguments, or a general scalar syntax from one exchange.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ScalarValueQuestion.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ScalarValueQuestion?

## Related constructions

- [[IdentityWhQuestion]]
- [[LocativeWhQuestion]]
- [[OpinionQuestion]]
- [[ProgressivePlaceQuestion]]
- [[ProgressiveWhObjectQuestion]]
- [[SchedulingQuestion]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
