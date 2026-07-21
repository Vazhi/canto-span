---
title: "PolarQuestionFrame"
type: "canto-span-construction"
construction: "PolarQuestionFrame"
status: "parser_heuristic"
confidence: "medium"
claim_layer: "internal"
lane: "LANE-07"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 0
verified_source_count: 0
independent_speaker_count: 1
negative_cases_drafted: true
negative_tests_executable: false
negative_tests_passing: false
corpus_evidence_used: false
corpus_hits_reviewed: false
code_document_reconciled: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: false
promotion_gate_version: "v1"
standard_test_file: "tests/constructions/PolarQuestionFrame.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 6
standard_boundary_test_count: 0
standard_executable_test_count: 6
source_ids: []
runtime_active: true
runtime_code_references: 10
accepted_fixtures: 6
tags: ["canto-span/grammar", "canto-span/status/parser_heuristic", "canto-span/lane/lane-07"]
---

# PolarQuestionFrame

## Plain-language claim

Cantonese may instantiate the structural family represented by PolarQuestionFrame; exact productivity and boundaries require pattern-specific independent evidence.

This is an internal parser representation. It does not independently license a Cantonese construction claim.

## Current status

- Linguistic status: `parser_heuristic`
- Linguistic confidence: `medium`
- Current action: `retain_as_representation_only`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

No pattern-specific external source is currently mapped.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/PolarQuestionFrame.json`
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
- Code–documentation comparison: `not_applicable_or_internal`

## Open questions and blockers

- internal engineering claim cannot by itself establish Cantonese grammar
- Runtime metadata and current governance agree in v0.5.184.
- Research question: record implementation provenance and keep separate from Cantonese-language evidence

## Related constructions

- [[DiscourseParticleFrame]]
- [[FocusParticleFrame]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
