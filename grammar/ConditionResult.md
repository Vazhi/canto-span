---
title: "ConditionResult"
type: "canto-span-construction"
construction: "ConditionResult"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-02"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 0
source_count: 3
verified_source_count: 3
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
source_ids: ["SRC-CHENG-2023-TP-SFP-CONDITIONAL", "SRC-LIANG-MAI-2025-GRAMMAR-CODING", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
runtime_code_references: 4
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-02"]
---

# ConditionResult

## Plain-language claim

Cantonese may instantiate the structural family represented by ConditionResult; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHENG-2023-TP-SFP-CONDITIONAL

- Citation: [Cheng, Siu-Pong. 2023. Cantonese Sentence-final Particles Pertaining to the TP Domain. Current Research in Chinese Linguistics 102(1):81-100.](https://cuhk.edu.hk/ics/clrc/crcl_102_1/cheng.pdf)
- Locator: pp. 90-91, example 12
- Verification: `VERIFIED_FULL_TEXT_AND_OFFICIAL_JOURNAL_PDF`
- What it supports: 我去嘅話我哋會見 has first-person singular in the antecedent and first-person plural in the consequent.
- Limit: Do not infer obligatory subject switching; the example only blocks forced sharing.

### SRC-LIANG-MAI-2025-GRAMMAR-CODING

- Citation: [Liang, Yuqing and Mai, Ziyin. 2025. Supplementary materials for Grammatical development of the native L1 in Cantonese-English bilingual children: early costs and long-term gains. Bilingualism: Language and Cognition.](https://static.cambridge.org/content/id/urn%3Acambridge.org%3Aid%3Aarticle%3AS1366728925100412/resource/name/S1366728925100412sup001.pdf)
- Locator: category 59, exact example
- Verification: `VERIFIED_FULL_TEXT_SUPPLEMENT`
- What it supports: The result in 如果病咗，就要去睇醫生 contains modal 要 and an action VP.
- Limit: Do not infer unrestricted consequent syntax or modal obligatoriness from one example.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: printed p. 44
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: 聽日唔得，就後日先啦 is translated as if tomorrow does not work, then the day after tomorrow, with no overt 如果 or 嘅話.
- Limit: Do not label every clause+就 sequence as conditional solely from English “if/then” translation.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ConditionResult?

## Related constructions

- [[ConditionalClause]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
