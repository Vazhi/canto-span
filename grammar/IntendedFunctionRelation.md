---
title: "IntendedFunctionRelation"
type: "canto-span-construction"
construction: "IntendedFunctionRelation"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-01"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 0
source_count: 2
verified_source_count: 2
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
standard_test_file: "tests/constructions/IntendedFunctionRelation.json"
standard_test_coverage: "no_direct_cases"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_executable_test_count: 0
source_ids: ["SRC-MATTHEWS-2006-SVC", "SRC-WONG-2023-LANGUAGE-SAMPLE"]
runtime_active: true
runtime_code_references: 8
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-01"]
---

# IntendedFunctionRelation

## Plain-language claim

Cantonese conventionally permits 用嚟/用來 to relate an overt object, resource, or artifact to a stated use or function; intention, affordance, actual-use-event, subject/topic status, omitted-topic licensing, and broader alternative-marker boundaries remain provisional.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_one_narrow_provisional_use_function_relation_pending_rerendered_and_native_analysis_validation`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-MATTHEWS-2006-SVC

- Citation: [Matthews, S. 2006. On Serial Verb Constructions in Cantonese. In A. Y. Aikhenvald and R. M. W. Dixon (eds.), Serial Verb Constructions: A Cross-Linguistic Typology, 69-87. Oxford University Press.](https://hub.hku.hk/bitstream/10722/51758/6/FullText.pdf)
- Locator: chapter pp. 69, 72-74, 82-84
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Matthews documents optional purposive 嚟/去 and serial-verb restrictions, including indeterminate classifications.
- Limit: Do not infer one relation from token adjacency or English translation.

### SRC-WONG-2023-LANGUAGE-SAMPLE

- Citation: [Wong, Anita Mei-Yin. 2023. Understanding Development and Disorder in Cantonese Using Language Sample Analysis. Routledge.](https://doi.org/10.4324/9780367824013)
- Locator: official PDF p. 60, lines 2203-2207
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Wong explicitly notes omission or movement of the instrument in these serial-verb patterns.
- Limit: Do not force every initial NP to be a syntactic subject or every absent instrument to be licensed.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/IntendedFunctionRelation.json`
- Evidence state: `CP015_58_ROW_AND_CP019_64_ROW_FROZEN_BOUNDARIES`
- Executable or review records containing this label:
  - `review-packets/v0.5.181/IFR01-D1/development-baseline.json`
  - `review-packets/v0.5.181/IFR01-D1/focused-evaluation-packet.json`
  - `review-packets/v0.5.182/IFR02-D1/development-baseline.json`
  - `review-packets/v0.5.182/IFR02-D1/focused-evaluation-packet.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-claim-source-edges-CP021A.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `runtime_referenced_without_accepted_fixtures`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `CP019_R2_FROZEN_64_ROW_HEADLESS_REVIEW_PENDING_RENDERED_ACCEPTANCE`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `pending_current_definition_of_done_line_by_line_review`

## Open questions and blockers

- legacy claim was not demonstrably derived from the recorded sources; reconstruct the claim from screened propositions first
- checked_exact_source;one_speaker_positive_negative_review;drafted_negative_boundaries;independent_evidence_beyond_parser_tests
- all_sources_reverified;all_used_corpus_hits_manually_classified;two_independent_speakers;executable_negative_boundaries;code_document_alignment;separate_implementation_and_linguistic_reporting;plain_language_claim
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by IntendedFunctionRelation?
- Next evidence action: Reverify at least one exact source, confirm one independent native-speaker review of the relevant positive and negative examples, and draft boundaries before restoring provisional status.

## Related constructions

- [[CoverbFrame]]
- [[LexicalGiveRelation]]
- [[PassivePermissiveRelation]]
- [[PostThemeParticipantRelation]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
