---
title: "ResultComplementVP"
type: "canto-span-construction"
construction: "ResultComplementVP"
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
standard_test_file: "tests/constructions/ResultComplementVP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 3
standard_boundary_test_count: 0
standard_executable_test_count: 3
source_ids: ["SRC-LAU-LEE-2021-RVC", "SRC-SIO-BOND-2025"]
runtime_active: true
runtime_code_references: 8
accepted_fixtures: 3
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-05"]
---

# ResultComplementVP

## Plain-language claim

Cantonese may instantiate the structural family represented by ResultComplementVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LAU-LEE-2021-RVC

- Citation: [Lau, Helena Yan Ping, and Sophia Yat Mei Lee. 2021. On Resultative Verb Compounds in Cantonese and Mandarin. Lingua Sinica 7(1):23-50.](https://doi.org/10.2478/linguasinica-2021-0002)
- Locator: pp. 33 and 41-44
- Verification: `VERIFIED_FULL_TEXT_AUTHOR_UPLOAD_AND_OFFICIAL_METADATA`
- What it supports: Lexical V1-V2 compounds and V-到 constructions differ in the result material and argument configurations they admit.
- Limit: Do not use one ResultComplementVP node to imply identical syntax.

### SRC-SIO-BOND-2025

- Citation: [Sio, Joanna Ut-Seong and Francis Bond. 2025. Inner and outer aspect in Cantonese. HPSG 2025 conference paper.](https://dkaramasov.github.io/hpsg2025/assets/pdf/7-inner-and-outer-aspect-in-cantonese.pdf)
- Locator: PDF pp. 2-3; section 2 and Table 1
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper distinguishes inner result/aspect material from outer perfective 咗 and gives fixed ordering.
- Limit: Do not fuse 咗 into an undifferentiated result complement.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 2 total; 2 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ResultComplementVP.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ResultComplementVP?

## Related constructions

- [[NegativePotentialComplement]]
- [[NegativePotentialDirectionalVP]]
- [[PotentialDirectionalVP]]
- [[PotentialResultVP]]
- [[ResultComplement]]
- [[VerbComplementVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
