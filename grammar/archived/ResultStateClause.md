---
title: "ResultStateClause"
type: "canto-span-construction"
construction: "ResultStateClause"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-05"
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
standard_test_file: "tests/constructions/ResultStateClause.json"
standard_test_coverage: "no_direct_cases"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_executable_test_count: 0
source_ids: ["SRC-FRANCIS-MATTHEWS-2005-VERB-CATEGORY", "SRC-KEDZIOR-2023"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 3
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-05", "canto-span/workflow/archived"]
---

# ResultStateClause

## Plain-language claim

Cantonese may instantiate the structural family represented by ResultStateClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-FRANCIS-MATTHEWS-2005-VERB-CATEGORY

- Citation: [Francis, Elaine J., and Stephen Matthews. 2005. A multi-dimensional approach to the category verb in Cantonese. Journal of Linguistics 41(2):269-305.](https://doi.org/10.1017/S0022226705003270)
- Locator: official abstract and publication metadata
- Verification: `VERIFIED_OFFICIAL_ABSTRACT_AND_METADATA`
- What it supports: The runtime’s state_predicate/stative labels are one operational analysis, not settled ontology.
- Limit: Do not call 熟 an adjective or result verb solely from parser tags.

### SRC-KEDZIOR-2023

- Citation: [Kędzior, Adrian. 2023. Verbal Morphological Category of Aspect in the Cantonese Language. Linguistica Silesiana 44(1):47-71. DOI: 10.24425/linsi.2023.144823.](https://doi.org/10.24425/linsi.2023.144823)
- Locator: sections 3-4.1
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT`
- What it supports: 熟咗 can be investigated as lexical state/change plus overt perfective without requiring a bespoke clause type.
- Limit: Do not infer that 咗 turns every stative into a resultative.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ResultStateClause.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ResultStateClause?

## Related constructions

- [[CausativeResultFrame]]
- [[CausativeResultPredicate]]
- [[ChangeIntoPredicate]]
- [[DisposalChangeIntoResultFrame]]
- [[ModalChangeIntoResultFrame]]
- [[PerfectiveObjectResultPredicate]]
- [[PerfectiveResultPredicate]]
- [[SeemingPerfectiveResultClause]]
- [[TransformationResultFrame]]
- [[TransformationResultPredicate]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
