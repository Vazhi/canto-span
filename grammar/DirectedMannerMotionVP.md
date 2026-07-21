---
title: "DirectedMannerMotionVP"
type: "canto-span-construction"
construction: "DirectedMannerMotionVP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-09"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 3
verified_source_count: 3
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
standard_test_file: "tests/constructions/DirectedMannerMotionVP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 6
standard_boundary_test_count: 0
standard_executable_test_count: 6
source_ids: ["SRC-LEUNG-2014-COVERBS", "SRC-SHAN-JIN-2025-MOTION-TYPOLOGY", "SRC-YIU-2016-DIRECTIONAL-ASPECT"]
runtime_active: true
runtime_code_references: 13
accepted_fixtures: 6
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-09"]
---

# DirectedMannerMotionVP

## Plain-language claim

Cantonese may instantiate the structural family represented by DirectedMannerMotionVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LEUNG-2014-COVERBS

- Citation: [Leung, H. H. 2014. Cantonese Coverbs: A Syntactic Reanalysis. MA qualifying paper, University of California, Berkeley.](https://linguistics.berkeley.edu/~herman/documents/CantoneseCoverbs_MAPaper_Leung.pdf)
- Locator: PDF pp. 1-2 and 20; coverb inventory and table 37
- Verification: `VERIFIED_FULL_TEXT_CORROBORATIVE`
- What it supports: The qualifying paper places directional 向 coverb phrases before the main verb and distinguishes them from directional main predicates.
- Limit: Do not use the English umbrella directed manner motion to erase coverb phrase order and relation type.

### SRC-SHAN-JIN-2025-MOTION-TYPOLOGY

- Citation: [Shan, Yunming and Jin, Lixin. 2025. 粵語位移事件編碼類型再探 [Revisiting the Encoding Typology of Motion Events in Cantonese]. Language and Linguistics 26(2).](https://doi.org/10.1075/lali.00202.sha)
- Locator: §3.3, examples 16-20
- Verification: `VERIFIED_FULL_TEXT_AUTHOR_UPLOAD_AND_PUBLISHER_METADATA`
- What it supports: The article gives 行埋嚟呢度, 爬緊返去海邊, 跌咗落嚟, and 漏曬出嚟 and analyzes the complex path expression as one path component relative to the manner verb.
- Limit: Do not import the article’s serial-verb ontology as settled parser truth or collapse self-motion and caused motion.

### SRC-YIU-2016-DIRECTIONAL-ASPECT

- Citation: [Yiu, Carine Yuk-man (姚玉敏). 2016. 粵語繼續體「落去」和開始體「起嚟」的產生. In 漢語研究的新貌：方言、語法與文獻 / New Horizons in the Study of Chinese: Dialectology, Grammar, and Philology, pp. 261-284.](https://www.cuhk.edu.hk/ics/clrc/yue/20_carine_yiu.pdf)
- Locator: pp. 262-265; examples 8-9 and 20-27
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Yiu explicitly contrasts self-motion examples with caused-motion examples in which an agent causes another entity to move.
- Limit: Do not assign the subject as mover in every verb-plus-directional string.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 3 total; 3 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/DirectedMannerMotionVP.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by DirectedMannerMotionVP?

## Related constructions

- [[CompoundDirectionalMotionVP]]
- [[DirectionalMotionVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
