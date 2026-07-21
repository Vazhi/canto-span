---
title: "ExistentialQuestion"
type: "canto-span-construction"
construction: "ExistentialQuestion"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-07"
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
standard_test_file: "tests/constructions/ExistentialQuestion.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 5
standard_boundary_test_count: 0
standard_executable_test_count: 5
source_ids: ["SRC-HARA-2023-POLAR", "SRC-LIANG-MAI-2026-GRAMMAR-CODING", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
runtime_code_references: 19
accepted_fixtures: 5
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-07"]
---

# ExistentialQuestion

## Plain-language claim

Cantonese may instantiate the structural family represented by ExistentialQuestion; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-HARA-2023-POLAR

- Citation: [Hara, Yurie. 2023. Cantonese Question Particles. In Discourse Particles in Asian Languages, Volume I: East Asia. Routledge.](https://yuriehara.github.io/website/download/RoutledgeCantoneseParticle.pdf)
- Locator: author PDF example (1a), p. 1
- Verification: `VERIFIED_FULL_TEXT_AND_PUBLISHER_METADATA`
- What it supports: Hara analyzes Jimmy 有冇付出過時間呀 as an A-not-A polar question over an event/experiential predicate.
- Limit: Do not conclude that all 有冇 + VP strings are grammatical or that occurrence questions are literal possession.

### SRC-LIANG-MAI-2026-GRAMMAR-CODING

- Citation: [Liang, Yuqing, and Ziyin Mai. 2026 [published online 2025]. Grammatical development of the native L1 in Cantonese-English bilingual children: early costs and long-term gains. Bilingualism: Language and Cognition 29(3):795-808. Supplementary coding scheme.](https://doi.org/10.1017/S1366728925100412)
- Locator: supplementary PDF p. 10, category 47
- Verification: `VERIFIED_OFFICIAL_ARTICLE_AND_SUPPLEMENT_FULL_TEXT`
- What it supports: The scheme defines [jau5mou5-NP] and gives 呢度有冇車車呀 as an existential question asking whether something exists.
- Limit: Do not use a child-language coding category to license unrelated VP complements or postposed forms.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 6, PDF p. 39 / printed p. 27
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The grammar explicitly states that the question form combines 有 and 冇 and contrasts it with *有唔有.
- Limit: Do not generalize ordinary V唔V copy rules to 有.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 3 total; 3 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ExistentialQuestion.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `test-data/pre-intermediate-gold-corpus.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ExistentialQuestion?

## Related constructions

- [[ExistentialWhQuestion]]
- [[PostposedExistentialQuestion]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
