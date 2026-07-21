---
title: "LocativeWhQuestion"
type: "canto-span-construction"
construction: "LocativeWhQuestion"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-07"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 4
source_ids: ["SRC-CHOW-2007-CANTONESE-EVERYONE", "SRC-WONG-2023-LANGUAGE-SAMPLE", "SRC-YIP-MATTHEWS-2000-BASIC", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
runtime_code_references: 4
accepted_fixtures: 5
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-07"]
---

# LocativeWhQuestion

## Plain-language claim

Cantonese may instantiate the structural family represented by LocativeWhQuestion; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHOW-2007-CANTONESE-EVERYONE

- Citation: [Chow, Bun-Ching. 2007. Cantonese for Everyone (Jyutping version) / 大家嘅廣東話. Hong Kong: The Commercial Press. ISBN 978-962-07-1824-3.](https://openlibrary.org/books/OL23210061M/Cantonese_for_everyone)
- Locator: user scan PDF pp. 54 and 58; 去邊度 question and destination response
- Verification: `VERIFIED_USER_PROVIDED_SCAN_AND_BIBLIOGRAPHIC_METADATA`
- What it supports: The coursebook distinguishes asking where someone wants to go from giving the destination.
- Limit: Do not treat every 邊度 expression as a locative fragment or insert a perfective marker.

### SRC-WONG-2023-LANGUAGE-SAMPLE

- Citation: [Wong, Anita Mei-Yin. 2023. Understanding Development and Disorder in Cantonese Using Language Sample Analysis. Routledge.](https://doi.org/10.4324/9780367824013)
- Locator: book pp. 66 and 137; 擺喺邊度呢 and discussion of omitted 喺 in a where question
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The source gives an overt preposition/localizer sequence and separately treats omission of 喺 as an error in the relevant structure.
- Limit: Do not insert hidden 喺 into bare 邊度 or assume all speakers/contexts require the same surface form.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Units 11 and 23-25; locatives, motion, and in-situ wh questions
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The reference grammar/workbook documents wh-place expressions in their argument or adjunct position.
- Limit: Do not define 邊度 intrinsically as a standalone question fragment.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: user PDF p. 45; 佢去咗邊度呀
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The coursebook lists the form under questions about place.
- Limit: Do not generalize this one example to every directional/aspect combination.

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by LocativeWhQuestion?

## Related constructions

- [[IdentityWhQuestion]]
- [[OpinionQuestion]]
- [[ProgressivePlaceQuestion]]
- [[ProgressiveWhObjectQuestion]]
- [[ScalarValueQuestion]]
- [[SchedulingQuestion]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
