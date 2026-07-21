---
title: "DegreeMannerAdverbial"
type: "canto-span-construction"
construction: "DegreeMannerAdverbial"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-10"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 3
verified_source_count: 3
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
standard_test_file: "tests/constructions/DegreeMannerAdverbial.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 3
standard_boundary_test_count: 0
standard_executable_test_count: 3
source_ids: ["SRC-CHOW-2007-CANTONESE-EVERYONE", "SRC-WONG-2023-LANGUAGE-SAMPLE", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 4
accepted_fixtures: 3
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10", "canto-span/workflow/archived"]
---

# DegreeMannerAdverbial

## Plain-language claim

Cantonese may instantiate the structural family represented by DegreeMannerAdverbial; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHOW-2007-CANTONESE-EVERYONE

- Citation: [Chow, Bun-Ching. 2007. Cantonese for Everyone (Jyutping version) / 大家嘅廣東話. Hong Kong: The Commercial Press. ISBN 978-962-07-1824-3.](https://openlibrary.org/books/OL23210061M/Cantonese_for_everyone)
- Locator: user-provided scan PDF p. 21, printed p. 25: 唔該講慢啲
- Verification: `VERIFIED_USER_PROVIDED_SCAN_AND_BIBLIOGRAPHIC_METADATA`
- What it supports: The exact sequence is used to request a slower action.
- Limit: Do not infer a universal V + property + 啲 template from one teaching pair.

### SRC-WONG-2023-LANGUAGE-SAMPLE

- Citation: [Wong, Anita Mei-Yin. 2023. Understanding Development and Disorder in Cantonese Using Language Sample Analysis. Routledge.](https://doi.org/10.4324/9780367824013)
- Locator: p. 46: 靜啲，佢喺度畫畫
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The source translates the first unit as “Keep quiet,” not as an adverb modifying the following drawing event.
- Limit: Do not automatically attach every X啲 to the following VP across punctuation or intonational boundaries.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: printed p. 58: 行快啲
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The coursebook places 快啲 after the verb in this exact expression.
- Limit: Do not silently reanalyze the form as the preposed DegreeMannerModifiedVP order.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 2 total; 2 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/DegreeMannerAdverbial.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by DegreeMannerAdverbial?

## Related constructions

- [[DegreeMannerModifiedVP]]
- [[MannerAdverbialVP]]
- [[ReduplicatedVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
