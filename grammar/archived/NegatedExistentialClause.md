---
title: "NegatedExistentialClause"
type: "canto-span-construction"
construction: "NegatedExistentialClause"
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
standard_test_file: "tests/constructions/NegatedExistentialClause.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 2
standard_boundary_test_count: 0
standard_executable_test_count: 2
source_ids: ["SRC-LAM-2018-NEGATION-ASPECT", "SRC-YIP-1988-NEGATION", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 7
accepted_fixtures: 2
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-07", "canto-span/workflow/archived"]
---

# NegatedExistentialClause

## Plain-language claim

Cantonese may instantiate the structural family represented by NegatedExistentialClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LAM-2018-NEGATION-ASPECT

- Citation: [Lam, Cherry Chit-Yu. 2018. On the Interaction between Negation and Aspect in Grammaticalisation: A Cross-linguistic Study of Three Chinese Varieties. Current Research in Chinese Linguistics 97(1):215-232.](https://www.cuhk.edu.hk/ics/clrc/crcl_97_1/lam.pdf)
- Locator: pp. 216-218, examples (1)-(3) and Table 2
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Lam separates negative existential/possessive DP complements from perfective predicate negation, despite use of the same form 冇.
- Limit: Do not classify all 冇-headed spans as existential or possessive.

### SRC-YIP-1988-NEGATION

- Citation: [Yip, Moira. 1988. Negation in Cantonese as a Lexical Rule. Bulletin of the Institute of History and Philology 59: 449-477.](https://www11.ihp.sinica.edu.tw/storage/w2_file/3407pXasnae.pdf)
- Locator: opening discussion, pp. 449-452
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Yip treats 有 as having a special suppletive negative 冇 rather than ordinary 唔-prefixation.
- Limit: Do not adopt the paper’s full lexical-rule architecture as mandatory parser design.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 6, PDF p. 39 / printed p. 27
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The grammar explicitly identifies 冇 as the negative of 有 and contrasts it with *唔有.
- Limit: Do not decompose every 冇 token into an ordinary negator plus hidden 有.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/NegatedExistentialClause.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by NegatedExistentialClause?

## Related constructions

- [[NegatedDirectionalMotionVP]]
- [[NegatedLexicalizedStative]]
- [[NegatedStativePredicate]]
- [[NegatedVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
