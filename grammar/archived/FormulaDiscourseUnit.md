---
title: "FormulaDiscourseUnit"
type: "canto-span-construction"
construction: "FormulaDiscourseUnit"
status: "lexicalized_only"
confidence: "medium"
claim_layer: "language"
lane: "LANE-03"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 4
verified_source_count: 4
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
standard_test_file: "tests/constructions/FormulaDiscourseUnit.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 31
standard_boundary_test_count: 0
standard_executable_test_count: 31
source_ids: ["SRC-CHENG-2022-HAI6-RESPONSE", "SRC-HUANG-HER-KONG-2025-INTERROGATIVES", "SRC-LI-2006-FINAL-PARTICLES", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 23
accepted_fixtures: 31
tags: ["canto-span/grammar", "canto-span/status/lexicalized_only", "canto-span/lane/lane-03", "canto-span/workflow/archived"]
---

# FormulaDiscourseUnit

## Plain-language claim

Particular conventional Cantonese expressions may instantiate the behavior represented by FormulaDiscourseUnit; productivity is not assumed.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `lexicalized_only`
- Linguistic confidence: `medium`
- Current action: `retain_lexicalized_and_block_productive_generalization`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHENG-2022-HAI6-RESPONSE

- Citation: [Cheng, Lisa Lai-Shen. 2022. Response particles hai6 in Cantonese. Journal of Chinese Linguistics 50(2): 532-544.](https://cup.cuhk.edu.hk/image/catalog/journal/jpreview/JCL_50.2_532-544NEW.pdf)
- Locator: p. 533, example (2)
- Verification: `VERIFIED_OFFICIAL_PUBLISHER_PREVIEW_AND_METADATA`
- What it supports: The response particle confirms or rejects a preceding assertion.
- Limit: Do not treat assertion response as proof of a complete omitted copular clause.

### SRC-HUANG-HER-KONG-2025-INTERROGATIVES

- Citation: [Huang, Yu-hsin, One-soon Her, and Stano Kong. 2025. Revisiting the Taxonomy of Interrogatives in Cantonese. Tsing Hua Journal of Chinese Studies 55(1): 157-195.](https://onesoonher.github.io/info/publication/A88-Cantonese-Qs.pdf)
- Locator: pp. 166-168, example (5)
- Verification: `VERIFIED_AUTHOR_FULL_TEXT_AND_METADATA`
- What it supports: The article gives exact positive and negative response pairs and explains proposition-oriented polarity.
- Limit: Do not translate 係啊 mechanically as English yes without tracking the proposition confirmed.

### SRC-LI-2006-FINAL-PARTICLES

- Citation: [Li, Boya. 2006. Chinese Final Particles and the Syntax of the Periphery. PhD dissertation, Leiden University. LOT 133.](https://www.lotpublications.nl/Documents/133_fulltext.pdf)
- Locator: printed pp. 94-95 and 117
- Verification: `VERIFIED_PUBLISHER_FULL_TEXT`
- What it supports: The dissertation distinguishes distributions and discourse effects of final particles, including 呢 and high-tone particles.
- Limit: Do not substitute one final particle for another solely because both occur in short responses.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 27, printed pp. 140-142
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The reference presents exact apology expressions and usage contrasts.
- Limit: Do not collapse every 唔好-initial string into an apology or formula.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 2 total; 2 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/FormulaDiscourseUnit.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.json`
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-D-context_disfluency_research.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-R-accepted_behavior_regression.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.json`
  - `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.tsv`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `tests/fixtures/regression-snapshots.json`
  - `test-data/review-only-readiness.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by FormulaDiscourseUnit?

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
