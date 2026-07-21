---
title: "ProductiveVO"
type: "canto-span-construction"
construction: "ProductiveVO"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-10"
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
standard_test_file: "tests/constructions/ProductiveVO.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 20
standard_boundary_test_count: 0
standard_executable_test_count: 20
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-WONG-2023-LANGUAGE-SAMPLE"]
runtime_active: true
runtime_code_references: 44
accepted_fixtures: 20
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10"]
---

# ProductiveVO

## Plain-language claim

Cantonese may instantiate the structural family represented by ProductiveVO; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-ALDERETE-ETAL-2017-SYNOPSIS

- Citation: [Alderete, John, Queenie Chan, Macarius Chan, Gloria Fan, and Olivia Nickel. 2017. Cantonese Grammar Synopsis.](https://www.sfu.ca/~alderete/pubs/aldereteEtal2017_cantgsyn2017-10-31.pdf)
- Locator: printed p. 37 and simple VP inventory
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The synopsis gives separate VP schemata and NP-complement profiles.
- Limit: Do not infer valency from token order alone or assume one object slot covers all complements.

### SRC-WONG-2023-LANGUAGE-SAMPLE

- Citation: [Wong, Anita Mei-Yin. 2023. Understanding Development and Disorder in Cantonese Using Language Sample Analysis. Routledge.](https://doi.org/10.4324/9780367824013)
- Locator: official PDF pp. 32-34, lines 1020-1056 and later developmental sections
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: GACS scores multiple unique exemplars to estimate a child’s abstract knowledge and developmental use.
- Limit: Do not convert a clinical scoring term into unrestricted parser productivity.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 6 total; 6 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ProductiveVO.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-I1A-I01-D1/development-baseline.json`
  - `review-packets/cp022-evaluation/EP-CP022-I1A-I02-D1/development-baseline.json`
  - `review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/development-baseline.json`
  - `test-data/a1-context-status-fixture.tsv`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `test-data/pre-intermediate-gold-corpus.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ProductiveVO?

## Related constructions

- [[IntransitiveVP]]
- [[TransitiveVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
