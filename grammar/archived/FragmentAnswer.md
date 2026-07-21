---
title: "FragmentAnswer"
type: "canto-span-construction"
construction: "FragmentAnswer"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-03"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 5
verified_source_count: 5
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
standard_test_file: "tests/constructions/FragmentAnswer.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 8
standard_boundary_test_count: 0
standard_executable_test_count: 8
source_ids: ["SRC-HUANG-HER-KONG-2025-INTERROGATIVES", "SRC-LEE-PAN-2024-VP-ELLIPSIS", "SRC-LUKE-NANCARROW-1998-AUXILIARIES", "SRC-SIO-2011-GE3", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 10
accepted_fixtures: 8
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-03", "canto-span/workflow/archived"]
---

# FragmentAnswer

## Plain-language claim

Cantonese may instantiate the structural family represented by FragmentAnswer; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-HUANG-HER-KONG-2025-INTERROGATIVES

- Citation: [Huang, Yu-hsin, One-soon Her, and Stano Kong. 2025. Revisiting the Taxonomy of Interrogatives in Cantonese. Tsing Hua Journal of Chinese Studies 55(1): 157-195.](https://onesoonher.github.io/info/publication/A88-Cantonese-Qs.pdf)
- Locator: pp. 166-168, example (5) and surrounding diagnostics
- Verification: `VERIFIED_AUTHOR_FULL_TEXT_AND_METADATA`
- What it supports: The article ties yes/no-style responses to polar-question semantics.
- Limit: Do not use a generic FragmentAnswer node to erase the question type and response strategy.

### SRC-LEE-PAN-2024-VP-ELLIPSIS

- Citation: [Lee, Tommy Tsz-Ming, and Victor Junnan Pan. 2024. Licensing VP Movement and Ellipsis in Mandarin and Cantonese. Proceedings of the 40th West Coast Conference on Formal Linguistics, 192-201.](https://www.lingref.com/cpp/wccfl/40/paper3711.pdf)
- Locator: pp. 193-194, examples (5)-(7)
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT_AND_METADATA`
- What it supports: The paper gives a Cantonese 有/冇/未 contrast and an unacceptable progressive-ellipsis example.
- Limit: Do not treat every aspectual-looking head as a standalone fragment answer.

### SRC-LUKE-NANCARROW-1998-AUXILIARIES

- Citation: [Luke, K. K. and O. T. Nancarrow. 1998. Auxiliary Verbs in Cantonese. In Stephen Matthews (ed.), Studies in Cantonese Linguistics. Hong Kong: Linguistic Society of Hong Kong.](https://lshk.org/wp-content/uploads/2022/11/STUDIES-IN-CANTONESE-LINGUISTICS.pdf)
- Locator: printed pp. 81-98, especially sections 2-3 and examples (41)-(55)
- Verification: `VERIFIED_SCHOLARLY_FULL_TEXT_SCAN`
- What it supports: The chapter separates core/non-core auxiliaries and main-verb/auxiliary contrasts for 想, 要, and 鍾意.
- Limit: Do not infer a uniform ellipsis syntax or complement type across all listed heads.

### SRC-SIO-2011-GE3

- Citation: [Sio, Joanna Ut-Seong. 2011. The Cantonese ge3. In F. H. Yap, K. Grunow-Hårsta, and J. Wrona (eds.), Nominalization in Asian Languages: Diachronic and Typological Perspectives, 125-146. John Benjamins.](https://doi.org/10.1075/tsl.96.04sio)
- Locator: printed pp. 128-133, examples 19 and 24-25
- Verification: `VERIFIED_FULL_TEXT_AND_PUBLISHER_METADATA`
- What it supports: The chapter documents headless modifier-ge3 nominals with referential interpretations.
- Limit: Do not infer an omitted noun node or classify every possessor+嘅 as FragmentAnswer.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 23, printed pp. 122-123
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The reference gives exact aspect-bearing answer patterns and a 未 reply.
- Limit: Do not strip overt aspect or treat 未 as an ordinary 唔-negated predicate.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 3 total; 3 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/FragmentAnswer.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/a1-context-status-fixture.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by FragmentAnswer?

## Related constructions

- [[ComplementEllipsisFragment]]
- [[FragmentQuestion]]
- [[IdentificationFragment]]
- [[LocativeFragment]]
- [[NegatedExistentialFragment]]
- [[NegativeCognitionFragment]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
