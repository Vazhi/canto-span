---
title: "ActionStativeVP"
type: "canto-span-construction"
construction: "ActionStativeVP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-10"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 4
verified_source_count: 4
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
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-BOND-SIO-2024-CLASSIFIERS", "SRC-XIA-2025-CLASSIFIERS", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
runtime_code_references: 4
accepted_fixtures: 3
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10"]
---

# ActionStativeVP

## Plain-language claim

Cantonese may instantiate the structural family represented by ActionStativeVP; exact productivity and boundaries require pattern-specific independent evidence.

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
- Locator: pp. 24, 27, 37-39
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Predicate category and complement structure require construction- and lexeme-sensitive analysis.
- Limit: Do not treat category overlap as proof that numerals or wh-duration phrases are stative predicates.

### SRC-BOND-SIO-2024-CLASSIFIERS

- Citation: [Bond, Francis and Joanna Ut-Seong Sio. 2024. A Construction-based Approach to Cantonese Classifiers. Proceedings of the 31st International Conference on Head-Driven Phrase Structure Grammar, 60-75.](https://doi.org/10.21248/hpsg.2024.4)
- Locator: pp. 61-66; Table 1
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Quantity material before classifier and noun belongs to nominal composition under the paper’s explicit grammar.
- Limit: Do not import the paper’s HPSG hierarchy wholesale or assume all classifier selection is free.

### SRC-XIA-2025-CLASSIFIERS

- Citation: [Xia, Hengliang. 2025. Syntax of Classifiers and Measure Words in Three Chinese Languages. Proceedings of the 2025 Annual Conference of the Canadian Linguistic Association.](https://cla-acl.ca/pdfs/actes-2025/Xia-CLA-2025.pdf)
- Locator: pp. 6-11; examples 13-15
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The numeral in 寫三個字 has a sourced nominal continuation rather than an independently sourced stative role.
- Limit: Do not infer one uncontested tree shape or erase lexical classifier restrictions.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: user PDF p. 54
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: 幾耐 follows 等 as overt duration-question material in a full clause.
- Limit: Do not generalize one coursebook example to every action plus scalar expression.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.json`
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-D-context_disfluency_research.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-G-grammar_research_external_evidence.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-L-lexicon_jyutping_enrichment.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-R-accepted_behavior_regression.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.json`
  - `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.tsv`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `test-data/regression-snapshots.json`
  - `test-data/w17-corpus-semantic-disposition.tsv`

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ActionStativeVP?

## Related constructions

- [[DegreeModifiedLexicalStative]]
- [[DegreeStativePredicate]]
- [[StativePredicate]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
