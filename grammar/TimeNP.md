---
title: "TimeNP"
type: "canto-span-construction"
construction: "TimeNP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-10"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 4
source_ids: ["SRC-TANG-2024-CANTONESE-GRAMMAR-GUIDE", "SRC-WONG-2002-CANTONESE-ADVERBS", "SRC-YIP-2024-TEMPORAL-ADVERBIAL-CLAUSES", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
runtime_code_references: 4
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10"]
---

# TimeNP

## Plain-language claim

Cantonese may instantiate the structural family represented by TimeNP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-TANG-2024-CANTONESE-GRAMMAR-GUIDE

- Citation: [Tang, Jason. 2024. Guide to Cantonese Grammar. Version dated 22 January 2024.](https://ywjt2.user.srcf.net/cantonese/guide_to_cantonese_grammar.pdf)
- Locator: pp. 35-37
- Verification: `VERIFIED_AUTHOR_FULL_TEXT`
- What it supports: The guide lists conventional day, week, month, and year expressions with differing morphology.
- Limit: Do not infer a complete productive paradigm from a short pedagogical inventory.

### SRC-WONG-2002-CANTONESE-ADVERBS

- Citation: [Wong, Lai-yin. 2002. The Morphology, Syntax, and Semantics of Adverbs in Cantonese. MPhil thesis, The University of Hong Kong.](https://hub.hku.hk/bitstream/10722/33936/1/FullText.pdf)
- Locator: PDF pp. 25-26 (printed pp. 18-19)
- Verification: `VERIFIED_OFFICIAL_REPOSITORY_FULL_TEXT`
- What it supports: The same class of time words can occupy several syntactic functions.
- Limit: Do not hard-code every TimeNP as an adverb, topic, or when-role solely from lexical membership.

### SRC-YIP-2024-TEMPORAL-ADVERBIAL-CLAUSES

- Citation: [Yip, Ka-Fai. 2024. Two Types of Temporal Adverbial Clauses in Cantonese. In Proceedings of the 39th West Coast Conference on Formal Linguistics, ed. Robert Autry et al., 687-694. Cascadilla Proceedings Project.](https://www.lingref.com/cpp/wccfl/39/paper3689.pdf)
- Locator: pp. 687-690; examples (3)-(4)
- Verification: `VERIFIED_OFFICIAL_PUBLISHER_FULL_TEXT`
- What it supports: Yip’s temporal adverbial clauses contain an embedded predication plus an overt temporal introducer and, for 喺-TACs, a time head.
- Limit: Do not label a bare date, day, or period expression as a temporal adverbial clause.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 11, PDF pp. 65-66 (printed pp. 52-53)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The grammar places temporal expressions before the verb phrase and illustrates sentence-initial temporal framing.
- Limit: Do not infer that every initial time expression forms a subordinate TemporalClause.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_REJECTED_SURFACE_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 0 accepted; 1 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-naturalness-conflict-dispositions.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `test-data/pre-intermediate-gold-corpus.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by TimeNP?

## Related constructions

- [[NominalPredicateClause]]
- [[TimeToActionFrame]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
