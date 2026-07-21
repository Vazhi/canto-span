---
title: "RelativeClauseNP"
type: "canto-span-construction"
construction: "RelativeClauseNP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-06"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 2
verified_source_count: 2
independent_speaker_count: 1
negative_cases_drafted: true
negative_tests_executable: false
negative_tests_passing: false
corpus_evidence_used: false
corpus_hits_reviewed: false
code_document_reconciled: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v1"
standard_test_file: "tests/constructions/RelativeClauseNP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 3
standard_boundary_test_count: 0
standard_executable_test_count: 3
source_ids: ["SRC-CHAN-ETAL-2018-RC", "SRC-CHAN-MATTHEWS-YIP-2011-RC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 6
accepted_fixtures: 3
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# RelativeClauseNP

## Plain-language claim

Cantonese may instantiate the structural family represented by RelativeClauseNP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHAN-ETAL-2018-RC

- Citation: [Chan, Angel, Wenchun Yang, Franklin Chang, and Evan Kidd. 2018. Four-year-old Cantonese-speaking children’s online processing of relative clauses: A permutation analysis. Journal of Child Language 45(1): 174-203.](https://doi.org/10.1017/S0305000917000198)
- Locator: publisher abstract and article metadata
- Verification: `VERIFIED_PUBLISHER_RECORD_AND_ABSTRACT`
- What it supports: The study’s motivation relies on distinct analyses for the two relative types.
- Limit: Do not encode one analysis as settled Cantonese fact.

### SRC-CHAN-MATTHEWS-YIP-2011-RC

- Citation: [Chan, Angel, Stephen Matthews, and Virginia Yip. 2011. The Acquisition of Relative Clauses in Cantonese and Mandarin. In E. Kidd (ed.), The Acquisition of Relative Clauses: Processing, Typology and Function, 197-225. John Benjamins.](https://doi.org/10.1075/tilar.8.10cha)
- Locator: pp. 198-200 and 219-222
- Verification: `VERIFIED_AUTHOR_FULL_TEXT_AND_PUBLISHER_METADATA`
- What it supports: The authors discuss internally headed and noun-modifying-construction analyses in addition to gap-based accounts.
- Limit: Do not assert a silent object gap solely from surface order.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/RelativeClauseNP.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by RelativeClauseNP?

## Related constructions

- [[ModifiedNP]]
- [[ModifierNP]]
- [[StativeNominalComplement]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
