---
title: "NegativePotentialDirectionalVP"
type: "canto-span-construction"
construction: "NegativePotentialDirectionalVP"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-05"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 1
verified_source_count: 1
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
standard_test_file: "tests/constructions/NegativePotentialDirectionalVP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 2
standard_boundary_test_count: 0
standard_executable_test_count: 2
source_ids: ["SRC-CHENG-SYBESMA-2004-POSTVERBAL-DAK"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 1
accepted_fixtures: 2
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-05", "canto-span/workflow/archived"]
---

# NegativePotentialDirectionalVP

## Plain-language claim

Cantonese may instantiate the structural family represented by NegativePotentialDirectionalVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHENG-SYBESMA-2004-POSTVERBAL-DAK

- Citation: [Cheng, Lisa Lai-Shen, and Rint Sybesma. 2004. Postverbal can in Cantonese (and Hakka) and Agree. Lingua 114(4):419-445.](https://doi.org/10.1016/S0024-3841(03)00067-6)
- Locator: author PDF section 2 summary and section 4.3
- Verification: `VERIFIED_AUTHOR_FULL_TEXT_AND_PUBLISHER_METADATA`
- What it supports: The negative does not require an overt or hidden 得 after 唔.
- Limit: Do not generate V-唔-得-R as the default negative potential.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 2 total; 2 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/NegativePotentialDirectionalVP.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by NegativePotentialDirectionalVP?

## Related constructions

- [[NegativePotentialComplement]]
- [[PotentialDirectionalVP]]
- [[PotentialResultVP]]
- [[ResultComplement]]
- [[ResultComplementVP]]
- [[VerbComplementVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
