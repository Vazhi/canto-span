---
title: "CompoundDirectionalMotionVP"
type: "canto-span-construction"
construction: "CompoundDirectionalMotionVP"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-09"
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
source_ids: ["SRC-CHOR-2018-DIRECTIONALS", "SRC-WONG-2023-LANGUAGE-SAMPLE", "SRC-YIU-2016-DIRECTIONAL-ASPECT"]
runtime_active: true
runtime_code_references: 4
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-09"]
---

# CompoundDirectionalMotionVP

## Plain-language claim

Cantonese may instantiate the structural family represented by CompoundDirectionalMotionVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHOR-2018-DIRECTIONALS

- Citation: [Chor, W. O. W. 2018. Directional Particles in Cantonese: Form, Function, and Grammaticalization. Amsterdam/Philadelphia: John Benjamins.](https://doi.org/10.1075/scld.9)
- Locator: book pp. 42-45 / PDF pp. 59-63; directional sequence cases
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The monograph describes postverbal directional strings of up to three directional verbs and gives 佢行返過嚟, with 返 first and 嚟/去 final in the three-member directional string.
- Limit: Do not classify the entire four-token predicate as a bare compound directional without recording the manner component.

### SRC-WONG-2023-LANGUAGE-SAMPLE

- Citation: [Wong, Anita Mei-Yin. 2023. Understanding Development and Disorder in Cantonese Using Language Sample Analysis. Routledge.](https://doi.org/10.4324/9780367824013)
- Locator: book pp. 48-49; directional-particle inventory and examples
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The monograph distinguishes simple, disyllabic compound, and tri-syllabic directionals, with tri-syllabic forms combining 返 with a disyllabic form; examples include 返上嚟/返上去.
- Limit: Do not infer that every 返 + directional sequence has identical constituency or that all combinations are equally productive.

### SRC-YIU-2016-DIRECTIONAL-ASPECT

- Citation: [Yiu, Carine Yuk-man (姚玉敏). 2016. 粵語繼續體「落去」和開始體「起嚟」的產生. In 漢語研究的新貌：方言、語法與文獻 / New Horizons in the Study of Chinese: Dialectology, Grammar, and Philology, pp. 261-284.](https://www.cuhk.edu.hk/ics/clrc/yue/20_carine_yiu.pdf)
- Locator: pp. 266-269; examples 28-45
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Yiu documents compound directionals, 返 combined before them, object-order differences, and asymmetries such as 起嚟 versus 落去.
- Limit: Do not generate arbitrary return + direction + deictic strings or assume all directionals share the same potential and object behavior.

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by CompoundDirectionalMotionVP?

## Related constructions

- [[DirectedMannerMotionVP]]
- [[DirectionalMotionVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
