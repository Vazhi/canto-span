---
title: "AssociativeNP"
type: "canto-span-construction"
construction: "AssociativeNP"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-06"
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
standard_test_file: "tests/constructions/AssociativeNP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 3
standard_boundary_test_count: 0
standard_executable_test_count: 3
source_ids: ["SRC-SIO-2011-GE3", "SRC-YU-2006-NOMINAL-MODIFIERS"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 4
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# AssociativeNP

## Plain-language claim

Cantonese may instantiate the structural family represented by AssociativeNP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-SIO-2011-GE3

- Citation: [Sio, Joanna Ut-Seong. 2011. The Cantonese ge3. In F. H. Yap, K. Grunow-Hårsta, and J. Wrona (eds.), Nominalization in Asian Languages: Diachronic and Typological Perspectives, 125-146. John Benjamins.](https://doi.org/10.1075/tsl.96.04sio)
- Locator: p. 129; examples 13b-c
- Verification: `VERIFIED_FULL_TEXT_AND_PUBLISHER_METADATA`
- What it supports: The chapter contrasts the sound of Peter’s singing with the news that someone killed themself.
- Limit: Do not derive a uniform semantic role from the linker alone.

### SRC-YU-2006-NOMINAL-MODIFIERS

- Citation: [Yu, Dominic. 2006. Relative clauses and nominal modifiers in Cantonese. Unpublished research paper, University of California, Berkeley.](https://linguistics.berkeley.edu/~dom/cantonese-rc.pdf)
- Locator: pp. 3-5; possessive and nominal-order examples
- Verification: `VERIFIED_FULL_TEXT_CORROBORATIVE`
- What it supports: Yu independently illustrates possessive nominal structures.
- Limit: Do not treat the unpublished analysis as decisive.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/AssociativeNP.json`
- Evidence state: `none_recorded`
- Executable or review records containing this label:
  - `test-data/CP023-P1-PROG01-nominal-design-cases-r3.tsv`
  - `test-data/a1-context-status-fixture.tsv`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `tests/fixtures/np-subsystem.json`
  - `test-data/pre-intermediate-gold-corpus.tsv`
  - `tests/fixtures/regression-snapshots.json`

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by AssociativeNP?

## Related constructions

- [[CoordinatedNP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
