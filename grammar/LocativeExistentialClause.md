---
title: "LocativeExistentialClause"
type: "canto-span-construction"
construction: "LocativeExistentialClause"
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
standard_test_file: "tests/constructions/LocativeExistentialClause.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 6
standard_boundary_test_count: 0
standard_executable_test_count: 6
source_ids: ["SRC-LAM-2018-NEGATION-ASPECT", "SRC-LAM-LAU-LEE-2024-SEGMENTATION", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
runtime_code_references: 8
accepted_fixtures: 6
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10"]
---

# LocativeExistentialClause

## Plain-language claim

Cantonese may instantiate the structural family represented by LocativeExistentialClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LAM-2018-NEGATION-ASPECT

- Citation: [Lam, Cherry Chit-Yu. 2018. On the Interaction between Negation and Aspect in Grammaticalisation: A Cross-linguistic Study of Three Chinese Varieties. Current Research in Chinese Linguistics 97(1):215-232.](https://www.cuhk.edu.hk/ics/clrc/crcl_97_1/lam.pdf)
- Locator: p. 217 example (1b)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: 課室/課室度 + 冇 + 鉛筆 is given as a Hong Kong Cantonese negative existential.
- Limit: Do not insert positive 有 after 冇 or merge this with non-locative possession.

### SRC-LAM-LAU-LEE-2024-SEGMENTATION

- Citation: [Lam, Charles, Chaak Ming Lau, and Jackson L. Lee. 2024. Multi-Tiered Cantonese Word Segmentation. Proceedings of LREC-COLING 2024, 11993-12002.](https://aclanthology.org/2024.lrec-main.1047/)
- Locator: section 4.5.2, PDF p. 5
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The segmentation scheme distinguishes possession with explicit subject from existential introduction without overt subject, exemplified by 有個男仔孭我走喇.
- Limit: Do not infer one homogeneous 有 construction from shared spelling.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 6, PDF p. 40 / printed p. 28
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The reference states that no preposition is needed and the sentence begins with the place expression.
- Limit: Do not fabricate there/expletive material or force one syntactic theory.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/LocativeExistentialClause.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by LocativeExistentialClause?

## Related constructions

- [[ExistentialClause]]
- [[ExistentialPresentationalClause]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
