---
title: "NegatedVP"
type: "canto-span-construction"
construction: "NegatedVP"
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
standard_test_file: "tests/constructions/NegatedVP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 1
standard_boundary_test_count: 0
standard_executable_test_count: 1
source_ids: ["SRC-LAM-2018-NEGATION-ASPECT", "SRC-YIP-1988-NEGATION", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
runtime_code_references: 7
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-07"]
---

# NegatedVP

## Plain-language claim

Cantonese may instantiate the structural family represented by NegatedVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_native_rejected_subtype_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LAM-2018-NEGATION-ASPECT

- Citation: [Lam, Cherry Chit-Yu. 2018. On the Interaction between Negation and Aspect in Grammaticalisation: A Cross-linguistic Study of Three Chinese Varieties. Current Research in Chinese Linguistics 97(1):215-232.](https://www.cuhk.edu.hk/ics/clrc/crcl_97_1/lam.pdf)
- Locator: pp. 215-218 and 227-230
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Hong Kong Cantonese maintains distinct ordinary, existential/possessive, and aspect-related negative profiles.
- Limit: Do not erase overt marker identity or infer a hidden positive structure.

### SRC-YIP-1988-NEGATION

- Citation: [Yip, Moira. 1988. Negation in Cantonese as a Lexical Rule. Bulletin of the Institute of History and Philology 59: 449-477.](https://www11.ihp.sinica.edu.tw/storage/w2_file/3407pXasnae.pdf)
- Locator: pp. 449-477; opening discussion and lexical-rule analysis
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: A general 唔-negation domain is real, but category eligibility and morphological analyses remain nontrivial.
- Limit: Do not import the lexical-rule architecture as the parser or extend 唔 to every existing VP node.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: user PDF p. 214, exact 仲未睇完
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: A not-yet completion profile uses 未 rather than demonstrating generic 唔 + completion.
- Limit: Do not replace 未 with 唔 or treat all negative markers as one slot.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_REJECTED_SURFACE_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 0 accepted; 1 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/NegatedVP.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by NegatedVP?

## Related constructions

- [[NegatedDirectionalMotionVP]]
- [[NegatedExistentialClause]]
- [[NegatedLexicalizedStative]]
- [[NegatedStativePredicate]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
