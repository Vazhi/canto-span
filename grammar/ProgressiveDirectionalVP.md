---
title: "ProgressiveDirectionalVP"
type: "canto-span-construction"
construction: "ProgressiveDirectionalVP"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-05"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 3
source_ids: ["SRC-KATAOKA-2018-PROGRESSIVE-GAN", "SRC-SHAN-JIN-2025-MOTION-TYPOLOGY", "SRC-YIU-2016-DIRECTIONAL-ASPECT"]
runtime_active: true
runtime_code_references: 1
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-05"]
---

# ProgressiveDirectionalVP

## Plain-language claim

Cantonese may instantiate the structural family represented by ProgressiveDirectionalVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-KATAOKA-2018-PROGRESSIVE-GAN

- Citation: [Kataoka, Shin (片岡新). 2018. 從早期和現代語料看粵語進行體標記“緊”在複句中的功能. Current Research in Chinese Linguistics 97(1):133-141.](https://www.cuhk.edu.hk/ics/clrc/crcl_97_1/kataoka.pdf)
- Locator: p. 134, example (5)
- Verification: `VERIFIED_OFFICIAL_JOURNAL_FULL_TEXT`
- What it supports: 有架巴士嚟緊 gives a motion event under progressive aspect.
- Limit: Do not infer that every directional sequence accepts 緊 in every position.

### SRC-SHAN-JIN-2025-MOTION-TYPOLOGY

- Citation: [Shan, Yunming and Jin, Lixin. 2025. 粵語位移事件編碼類型再探 [Revisiting the Encoding Typology of Motion Events in Cantonese]. Language and Linguistics 26(2).](https://doi.org/10.1075/lali.00202.sha)
- Locator: section 3.3, complex directional examples including 爬緊返去海邊
- Verification: `VERIFIED_FULL_TEXT_AUTHOR_UPLOAD_AND_PUBLISHER_METADATA`
- What it supports: The article documents progressive aspect inside a manner-path-deictic motion sequence.
- Limit: Do not infer a free cross-product of all manner verbs and directional particles.

### SRC-YIU-2016-DIRECTIONAL-ASPECT

- Citation: [Yiu, Carine Yuk-man (姚玉敏). 2016. 粵語繼續體「落去」和開始體「起嚟」的產生. In 漢語研究的新貌：方言、語法與文獻 / New Horizons in the Study of Chinese: Dialectology, Grammar, and Philology, pp. 261-284.](https://www.cuhk.edu.hk/ics/clrc/yue/20_carine_yiu.pdf)
- Locator: pp. 263-270, directional ordering and aspect interaction examples
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The chapter documents distinct directional predicates/particles and lexical asymmetries.
- Limit: Do not treat 行緊入/出嚟/去 as an exhaustive or universally productive template.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `test-data/regression-snapshots.json`

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ProgressiveDirectionalVP?

## Related constructions

- [[PerfectiveDirectionalVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
