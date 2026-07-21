---
title: "DisposalChangeIntoResultFrame"
type: "canto-span-construction"
construction: "DisposalChangeIntoResultFrame"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-05"
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
standard_test_file: "tests/constructions/DisposalChangeIntoResultFrame.json"
standard_test_coverage: "no_direct_cases"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_executable_test_count: 0
source_ids: ["SRC-MATTHEWS-YIP-2011-ASPECT-MULTIMEDIA", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
runtime_code_references: 4
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-05"]
---

# DisposalChangeIntoResultFrame

## Plain-language claim

Cantonese may instantiate the structural family represented by DisposalChangeIntoResultFrame; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-MATTHEWS-YIP-2011-ASPECT-MULTIMEDIA

- Citation: [Matthews, Stephen and Virginia Yip. 2011. Cantonese: A Comprehensive Grammar, 2nd ed. Multimedia supplement, Chapter 11: Aspect and verbal particles. Chinese University of Hong Kong.](https://www.cuhk.edu.hk/lin/cbrc/CantoneseGrammar/multimedia/11.htm)
- Locator: Chapter 8 section 8.3.3
- Verification: `VERIFIED_UNIVERSITY_HOSTED_REFERENCE_SUPPLEMENT`
- What it supports: The disposal marker and object ordering are externally attested independently of 變成.
- Limit: Do not infer the exact full runtime frame from a different 將 predicate.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: PDF p. 323 / printed p. 301
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: Modal change predication is independently visible without 將.
- Limit: Do not claim the sources directly attest 會將X變成Y.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/DisposalChangeIntoResultFrame.json`
- Evidence state: `none_recorded`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by DisposalChangeIntoResultFrame?

## Related constructions

- [[CausativeResultFrame]]
- [[CausativeResultPredicate]]
- [[ChangeIntoPredicate]]
- [[ModalChangeIntoResultFrame]]
- [[PerfectiveObjectResultPredicate]]
- [[PerfectiveResultPredicate]]
- [[ResultStateClause]]
- [[SeemingPerfectiveResultClause]]
- [[TransformationResultFrame]]
- [[TransformationResultPredicate]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
