---
title: "ImpersonalEnvironmentalClause"
type: "canto-span-construction"
construction: "ImpersonalEnvironmentalClause"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-10"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 0
source_count: 3
verified_source_count: 3
independent_speaker_count: 0
negative_cases_drafted: true
negative_tests_executable: false
negative_tests_passing: false
corpus_evidence_used: false
corpus_hits_reviewed: false
code_document_reconciled: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v1"
standard_test_file: "tests/constructions/ImpersonalEnvironmentalClause.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 15
standard_boundary_test_count: 0
standard_executable_test_count: 15
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-TSUNO-2021-VOICE-TRANSITIVITY", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
runtime_code_references: 20
accepted_fixtures: 15
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10"]
---

# ImpersonalEnvironmentalClause

## Plain-language claim

Cantonese may instantiate the structural family represented by ImpersonalEnvironmentalClause; exact productivity and boundaries require pattern-specific independent evidence.

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
- Locator: pp. 24 and 27; sections on predicative adjectives/stative verbs and degree modification
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Property predication does not require an overt copula in the documented profiles.
- Limit: Do not insert 係 or posit a special environmental copula; do not infer that every degree predicate is environmental.

### SRC-TSUNO-2021-VOICE-TRANSITIVITY

- Citation: [Tsuno, Kaho. 2021. Cantonese: “Passive expression”, “Transitivity” [広東語：「ヴォイスとその周辺」「他動性」]. Journal of the Institute of Language Research 26: 201-215.](https://www.tufs.ac.jp/common/fs/ilr/contents/ronshuu/26/jilr26_sp_Cantonese17%2019_Tsuno.pdf)
- Locator: printed p. 207, item 37
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT_AND_METADATA`
- What it supports: 落雨喇 is presented with no overt nominal before the weather predicate.
- Limit: Do not claim the source proves a null expletive, zero subject, valency class, or language-wide pro-drop analysis.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: printed p. 95: 今日天陰陰，涼浸浸; 今日出熱頭; related weather descriptions
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The coursebook presents ambient qualities and weather events together pedagogically but with different overt predicate structures.
- Limit: Do not assume that 好凍, 好熱, 天陰陰, 出熱頭, 落雨, and 打風 share one argument structure.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ImpersonalEnvironmentalClause.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-I1A-I02-D1/development-baseline.json`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `tests/fixtures/regression-snapshots.json`

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ImpersonalEnvironmentalClause?

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
