---
title: "DitransitiveSpeechVP"
type: "canto-span-construction"
construction: "DitransitiveSpeechVP"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-08"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 0
source_count: 2
verified_source_count: 2
independent_speaker_count: 0
negative_cases_drafted: false
negative_tests_executable: false
negative_tests_passing: false
corpus_evidence_used: false
corpus_hits_reviewed: false
code_document_reconciled: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v1"
standard_test_file: "tests/constructions/DitransitiveSpeechVP.json"
standard_test_coverage: "no_direct_cases"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_executable_test_count: 0
source_ids: ["SRC-MATTHEWS-2006-SVC", "SRC-YIP-MATTHEWS-2017-INTERMEDIATE"]
runtime_active: true
runtime_code_references: 3
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-08"]
---

# DitransitiveSpeechVP

## Plain-language claim

Cantonese may instantiate the structural family represented by DitransitiveSpeechVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-MATTHEWS-2006-SVC

- Citation: [Matthews, S. 2006. On Serial Verb Constructions in Cantonese. In A. Y. Aikhenvald and R. M. W. Dixon (eds.), Serial Verb Constructions: A Cross-Linguistic Typology, 69-87. Oxford University Press.](https://hub.hku.hk/bitstream/10722/51758/6/FullText.pdf)
- Locator: chapter pp. 69-75
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Multiverb sequences require semantic and syntactic diagnostics and may compete with complement or other analyses.
- Limit: Do not declare every V-NP-V sequence a ditransitive or SVC.

### SRC-YIP-MATTHEWS-2017-INTERMEDIATE

- Citation: [Yip, Virginia, and Stephen Matthews. 2017. Intermediate Cantonese: A Grammar and Workbook. 2nd ed. Routledge.](https://www.routledge.com/Intermediate-Cantonese-A-Grammar-and-Workbook/Yip-Matthews/p/book/9780415815611)
- Locator: Unit 11 communication-verb section
- Verification: `VERIFIED_EXACT_TEXT_TRANSCRIPTION_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The teaching generalization names 講/話 and 聽/知, with exact examples, but does not license arbitrary substitutions.
- Limit: Do not generate every speech verb with every cognition predicate.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/DitransitiveSpeechVP.json`
- Evidence state: `none_recorded`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `runtime_referenced_without_accepted_fixtures`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `pending_current_definition_of_done_line_by_line_review`

## Open questions and blockers

- no explicit external claim-source edge
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by DitransitiveSpeechVP?

## Related constructions

- [[ReportedSpeech]]
- [[SpeechTransferClause]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
