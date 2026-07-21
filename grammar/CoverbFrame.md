---
title: "CoverbFrame"
type: "canto-span-construction"
construction: "CoverbFrame"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-01"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 5
source_ids: ["SRC-FRANCIS-MATTHEWS-2006-COVERBS", "SRC-KWAN-2010-LOCATIVE", "SRC-LEUNG-2014-COVERBS", "SRC-WONG-2023-LANGUAGE-SAMPLE", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
runtime_code_references: 11
accepted_fixtures: 5
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-01"]
---

# CoverbFrame

## Plain-language claim

Cantonese may instantiate the structural family represented by CoverbFrame; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-FRANCIS-MATTHEWS-2006-COVERBS

- Citation: [Francis, Elaine J. and Stephen Matthews. 2006. Categoriality and Object Extraction in Cantonese Serial Verb Constructions. Natural Language & Linguistic Theory 24(3): 751-801.](https://doi.org/10.1007/s11049-006-0005-3)
- Locator: official HKU abstract; NLLT 24(3):751-801
- Verification: `VERIFIED_OFFICIAL_ABSTRACT_AND_METADATA`
- What it supports: The article treats the coverb construction as serial-verb-like, reports experimental extraction contrasts, and argues that coverbs display verbal morphosyntax.
- Limit: Do not import the authors’ proposed syntax or generalize abstract-level findings to every runtime marker.

### SRC-KWAN-2010-LOCATIVE

- Citation: [Kwan, S. W. M. 2010. The Placement of Locative Prepositional Phrases in Cantonese: Processing and Iconicity. Taiwan Journal of Linguistics 8(2): 163-198.](https://ah.lib.nccu.edu.tw/item?item_id=113083)
- Locator: journal pp. 163-169, examples 1-6
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The article distinguishes preverbal event-location placement from postverbal result-location profiles.
- Limit: Do not turn a dominant order into an exceptionless parser rule or cover all locative constructions with this label.

### SRC-LEUNG-2014-COVERBS

- Citation: [Leung, H. H. 2014. Cantonese Coverbs: A Syntactic Reanalysis. MA qualifying paper, University of California, Berkeley.](https://linguistics.berkeley.edu/~herman/documents/CantoneseCoverbs_MAPaper_Leung.pdf)
- Locator: pp. 9 and 11-16, examples (19), (22), and (26)-(31)
- Verification: `VERIFIED_FULL_TEXT_CORROBORATIVE`
- What it supports: The paper allows manner/coverb alternation in the inspected examples but places temporal material structurally higher and reports degraded reverse ordering.
- Limit: Do not infer free permutation of time, focus, manner, and coverb phrases or adopt the proposed tree as settled.

### SRC-WONG-2023-LANGUAGE-SAMPLE

- Citation: [Wong, Anita Mei-Yin. 2023. Understanding Development and Disorder in Cantonese Using Language Sample Analysis. Routledge.](https://doi.org/10.4324/9780367824013)
- Locator: p. 58: 我同佢哋玩
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The source glosses 同 as with/together with and notes that it can have other lexical functions in other contexts.
- Limit: Do not identify every preverbal 同 NP as together-with solely from the marker.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: printed pp. 106-107 and 297-298: 同 as 跟/替; 問下人然後同大家講講
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The coursebook supplies exact addressee/interpersonal speech use and separately teaches multiple 同 relations.
- Limit: Do not hard-code the relation from verb class alone or translate every 同 as with/together.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 3 total; 3 accepted; 0 rejected.
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by CoverbFrame?

## Related constructions

- [[IntendedFunctionRelation]]
- [[LexicalGiveRelation]]
- [[PassivePermissiveRelation]]
- [[PostThemeParticipantRelation]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
