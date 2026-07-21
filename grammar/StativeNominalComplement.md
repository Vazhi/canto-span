---
title: "StativeNominalComplement"
type: "canto-span-construction"
construction: "StativeNominalComplement"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-06"
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
standard_test_file: "tests/constructions/StativeNominalComplement.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 1
standard_boundary_test_count: 0
standard_executable_test_count: 1
source_ids: ["SRC-SIO-2011-GE3"]
runtime_active: true
runtime_code_references: 7
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-06"]
---

# StativeNominalComplement

## Plain-language claim

Cantonese may instantiate the structural family represented by StativeNominalComplement; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-SIO-2011-GE3

- Citation: [Sio, Joanna Ut-Seong. 2011. The Cantonese ge3. In F. H. Yap, K. Grunow-Hårsta, and J. Wrona (eds.), Nominalization in Asian Languages: Diachronic and Typological Perspectives, 125-146. John Benjamins.](https://doi.org/10.1075/tsl.96.04sio)
- Locator: p. 133; representation in example 27
- Verification: `VERIFIED_FULL_TEXT_AND_PUBLISHER_METADATA`
- What it supports: Sio proposes an empty nominal after headless modifier-ge3 to represent a familiar set.
- Limit: Do not convert an abstract syntactic analysis into a hidden parser token or recovered lexical head.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/StativeNominalComplement.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by StativeNominalComplement?

## Related constructions

- [[ModifiedNP]]
- [[ModifierNP]]
- [[RelativeClauseNP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
