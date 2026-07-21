---
title: "ResultComplement"
type: "canto-span-construction"
construction: "ResultComplement"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-05"
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
standard_test_file: "tests/constructions/ResultComplement.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 1
standard_boundary_test_count: 0
standard_executable_test_count: 1
source_ids: ["SRC-CHOR-2018-DIRECTIONALS", "SRC-LAU-LEE-2021-RVC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 5
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-05", "canto-span/workflow/archived"]
---

# ResultComplement

## Plain-language claim

Cantonese may instantiate the structural family represented by ResultComplement; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHOR-2018-DIRECTIONALS

- Citation: [Chor, W. O. W. 2018. Directional Particles in Cantonese: Form, Function, and Grammaticalization. Amsterdam/Philadelphia: John Benjamins.](https://doi.org/10.1075/scld.9)
- Locator: PDF pp. 124-127 and 207-208; printed pp. 106-109 and 189-190
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: 到 has arrival/goal verb or particle uses with spatial and nonspatial distinctions.
- Limit: Do not collapse arrival, goal attainment, and resultative V-到.

### SRC-LAU-LEE-2021-RVC

- Citation: [Lau, Helena Yan Ping, and Sophia Yat Mei Lee. 2021. On Resultative Verb Compounds in Cantonese and Mandarin. Lingua Sinica 7(1):23-50.](https://doi.org/10.2478/linguasinica-2021-0002)
- Locator: pp. 33 and 41-44; V-dou3 comparisons and summary
- Verification: `VERIFIED_FULL_TEXT_AUTHOR_UPLOAD_AND_OFFICIAL_METADATA`
- What it supports: V-到 may introduce phrasal result material and occurs in structural alternatives where a lexical RVC is unavailable.
- Limit: Do not label every occurrence of 到 a result complement.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ResultComplement.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ResultComplement?

## Related constructions

- [[NegativePotentialComplement]]
- [[NegativePotentialDirectionalVP]]
- [[PotentialDirectionalVP]]
- [[PotentialResultVP]]
- [[ResultComplementVP]]
- [[VerbComplementVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
