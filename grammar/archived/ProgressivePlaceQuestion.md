---
title: "ProgressivePlaceQuestion"
type: "canto-span-construction"
construction: "ProgressivePlaceQuestion"
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
negative_cases_drafted: false
negative_tests_executable: false
negative_tests_passing: false
corpus_evidence_used: false
corpus_hits_reviewed: false
code_document_reconciled: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v1"
standard_test_file: "tests/constructions/ProgressivePlaceQuestion.json"
standard_test_coverage: "no_direct_cases"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_executable_test_count: 0
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-LIANG-MAI-2026-GRAMMAR-CODING"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 3
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-07", "canto-span/workflow/archived"]
---

# ProgressivePlaceQuestion

## Plain-language claim

Cantonese may instantiate the structural family represented by ProgressivePlaceQuestion; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-ALDERETE-ETAL-2017-SYNOPSIS

- Citation: [Alderete, John, Queenie Chan, Macarius Chan, Gloria Fan, and Olivia Nickel. 2017. Cantonese Grammar Synopsis.](https://www.sfu.ca/~alderete/pubs/aldereteEtal2017_cantgsyn2017-10-31.pdf)
- Locator: p. 42, wh-question summary
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The synopsis explicitly includes adverbial wh questions in the in-situ system.
- Limit: Do not posit obligatory fronting or a hidden locative operator.

### SRC-LIANG-MAI-2026-GRAMMAR-CODING

- Citation: [Liang, Yuqing, and Ziyin Mai. 2026 [published online 2025]. Grammatical development of the native L1 in Cantonese-English bilingual children: early costs and long-term gains. Bilingualism: Language and Cognition 29(3):795-808. Supplementary coding scheme.](https://doi.org/10.1017/S1366728925100412)
- Locator: supplement pp. 9-10, wh-question coding
- Verification: `VERIFIED_OFFICIAL_ARTICLE_AND_SUPPLEMENT_FULL_TEXT`
- What it supports: The coding scheme treats Cantonese wh forms as in-situ questions, including location-related examples.
- Limit: Do not infer a special progressive-place construction merely from co-occurrence.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ProgressivePlaceQuestion.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ProgressivePlaceQuestion?

## Related constructions

- [[IdentityWhQuestion]]
- [[LocativeWhQuestion]]
- [[OpinionQuestion]]
- [[ProgressiveWhObjectQuestion]]
- [[ScalarValueQuestion]]
- [[SchedulingQuestion]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
