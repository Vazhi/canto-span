---
title: "PerfectiveDirectionalVP"
type: "canto-span-construction"
construction: "PerfectiveDirectionalVP"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-05"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 4
source_ids: ["SRC-SHAN-JIN-2025-MOTION-TYPOLOGY", "SRC-SIO-BOND-2025", "SRC-YIU-2016-DIRECTIONAL-ASPECT", "SRC-ZHANG-1970-PREDICATIVE-SUFFIXES"]
runtime_active: true
runtime_code_references: 1
accepted_fixtures: 2
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-05"]
---

# PerfectiveDirectionalVP

## Plain-language claim

Cantonese may instantiate the structural family represented by PerfectiveDirectionalVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-SHAN-JIN-2025-MOTION-TYPOLOGY

- Citation: [Shan, Yunming and Jin, Lixin. 2025. 粵語位移事件編碼類型再探 [Revisiting the Encoding Typology of Motion Events in Cantonese]. Language and Linguistics 26(2).](https://doi.org/10.1075/lali.00202.sha)
- Locator: §§3.1-3.3; examples 1-20
- Verification: `VERIFIED_FULL_TEXT_AUTHOR_UPLOAD_AND_PUBLISHER_METADATA`
- What it supports: The source rejects a homogeneous atomic treatment of all motion-looking strings.
- Limit: Do not collapse 入/落 and 嚟/去 into one unanalyzed lexical token.

### SRC-SIO-BOND-2025

- Citation: [Sio, Joanna Ut-Seong and Francis Bond. 2025. Inner and outer aspect in Cantonese. HPSG 2025 conference paper.](https://dkaramasov.github.io/hpsg2025/assets/pdf/7-inner-and-outer-aspect-in-cantonese.pdf)
- Locator: PDF pp. 2-4
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Aspect attaches to a verbal predicate; the paper does not posit a dedicated PerfectiveDirectionalVP category.
- Limit: Do not present the runtime label as an externally established Cantonese construction name.

### SRC-YIU-2016-DIRECTIONAL-ASPECT

- Citation: [Yiu, Carine Yuk-man (姚玉敏). 2016. 粵語繼續體「落去」和開始體「起嚟」的產生. In 漢語研究的新貌：方言、語法與文獻 / New Horizons in the Study of Chinese: Dialectology, Grammar, and Philology, pp. 261-284.](https://www.cuhk.edu.hk/ics/clrc/yue/20_carine_yiu.pdf)
- Locator: pp. 263-270; examples 10-45
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The deictic contrast and directional ordering are independently motivated.
- Limit: Do not treat 嚟/去 as freely interchangeable or as mere perfective auxiliaries.

### SRC-ZHANG-1970-PREDICATIVE-SUFFIXES

- Citation: [Zhang, Hongnian 張洪年. 1970. 粵語中常見的謂詞詞尾. 中國文化研究所學報 3(2):459-488.](https://www.cuhk.edu.hk/ics/journal/articles/v05p459.pdf)
- Locator: p. 464: 佢嚟咗喇; 佢去咗喇
- Verification: `VERIFIED_OFFICIAL_ARCHIVE_FULL_TEXT`
- What it supports: The source supports motion predicates bearing 咗 but not the runtime exact three-token directional complex.
- Limit: Do not convert these examples into direct evidence for 入咗嚟 or 落咗去.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 2 total; 2 accepted; 0 rejected.
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by PerfectiveDirectionalVP?

## Related constructions

- [[ProgressiveDirectionalVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
