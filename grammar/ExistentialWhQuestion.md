---
title: "ExistentialWhQuestion"
type: "canto-span-construction"
construction: "ExistentialWhQuestion"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-07"
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
standard_test_file: "tests/constructions/ExistentialWhQuestion.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 5
standard_boundary_test_count: 0
standard_executable_test_count: 5
source_ids: ["SRC-LIANG-MAI-2026-GRAMMAR-CODING"]
runtime_active: true
runtime_code_references: 4
accepted_fixtures: 5
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-07"]
---

# ExistentialWhQuestion

## Plain-language claim

Cantonese may instantiate the structural family represented by ExistentialWhQuestion; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LIANG-MAI-2026-GRAMMAR-CODING

- Citation: [Liang, Yuqing, and Ziyin Mai. 2026 [published online 2025]. Grammatical development of the native L1 in Cantonese-English bilingual children: early costs and long-term gains. Bilingualism: Language and Cognition 29(3):795-808. Supplementary coding scheme.](https://doi.org/10.1017/S1366728925100412)
- Locator: supplementary PDF p. 10, category 51
- Verification: `VERIFIED_OFFICIAL_ARTICLE_AND_SUPPLEMENT_FULL_TEXT`
- What it supports: The scheme lists in-situ wh forms and examples including 做乜有一個橙嘅 and 有幾多架車呀.
- Limit: Do not infer the runtime’s exact 有 + 咩 + optional NP template from different wh expressions.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 3 total; 3 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ExistentialWhQuestion.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ExistentialWhQuestion?

## Related constructions

- [[ExistentialQuestion]]
- [[PostposedExistentialQuestion]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
