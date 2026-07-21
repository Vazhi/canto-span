---
title: "PriorityMarkerClause"
type: "canto-span-construction"
construction: "PriorityMarkerClause"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-03"
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
source_ids: ["SRC-SYBESMA-2013", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE", "SRC-ZHOU-2018-POSTVERBAL-SIN1"]
runtime_active: true
runtime_code_references: 6
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-03"]
---

# PriorityMarkerClause

## Plain-language claim

Cantonese may instantiate the structural family represented by PriorityMarkerClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-SYBESMA-2013

- Citation: [Sybesma, Rint. 2013. Cantonese sin1 先 and the question of microvariation and macrovariation. In Guangshun Cao, Hilary Chappell, Redouane Djamouri, and Thekla Wiebusch (eds.), Breaking Down the Barriers: Interdisciplinary Studies in Chinese Linguistics and Beyond, 971-994. Taipei: Academia Sinica.](https://www.researchgate.net/publication/305411096_Cantonese_sin_xian_and_the_question_of_microvariation_and_macrovariation)
- Locator: author-uploaded chapter abstract and full discussion
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Postverbal 先 is not one homogeneous item or distribution.
- Limit: Do not import the contact analysis or assume universal speaker behavior.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: 第二時先啦 explanation; 落定啲訂先 and 開會前睇定啲文件先
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: Visible 先 participates in particleized and preparatory patterns not reducible to generic action-first sequencing.
- Limit: Do not label all postverbal 先 as the same construction or meaning.

### SRC-ZHOU-2018-POSTVERBAL-SIN1

- Citation: [Zhou, Yang. 2018. Exploring the emergence of the postverbal sin1 先 in Cantonese. Language and Linguistics 19(2):333-375. DOI: 10.1075/lali.00012.zho.](https://www.jbe-platform.com/content/journals/10.1075/lali.00012.zho)
- Locator: official abstract and article introduction
- Verification: `VERIFIED_OFFICIAL_PUBLISHER_ABSTRACT_AND_FULL_TEXT`
- What it supports: The article identifies postverbal placement as prominent for the priority meaning and emphasizes polysemy.
- Limit: Do not convert the diachronic account into a free parser template.

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by PriorityMarkerClause?

## Related constructions

- [[CompletionThenClause]]
- [[TemporalAdverbialClause]]
- [[TemporalClause]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
