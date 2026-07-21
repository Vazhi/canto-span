---
title: "LocativeFragment"
type: "canto-span-construction"
construction: "LocativeFragment"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-03"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 0
source_count: 3
verified_source_count: 3
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
standard_test_file: "tests/constructions/LocativeFragment.json"
standard_test_coverage: "no_direct_cases"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_executable_test_count: 0
source_ids: ["SRC-KWAN-2010-LOCATIVE", "SRC-LEE-PAN-2024-VP-ELLIPSIS", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 2
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-03", "canto-span/workflow/archived"]
---

# LocativeFragment

## Plain-language claim

Cantonese may instantiate the structural family represented by LocativeFragment; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-KWAN-2010-LOCATIVE

- Citation: [Kwan, S. W. M. 2010. The Placement of Locative Prepositional Phrases in Cantonese: Processing and Iconicity. Taiwan Journal of Linguistics 8(2): 163-198.](https://ah.lib.nccu.edu.tw/item?item_id=113083)
- Locator: journal pp. 163-169
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The source distinguishes several locative placements and functions rather than one catch-all locative category.
- Limit: Do not collapse event location, static predication, result location, source, localizers, and short answers.

### SRC-LEE-PAN-2024-VP-ELLIPSIS

- Citation: [Lee, Tommy Tsz-Ming, and Victor Junnan Pan. 2024. Licensing VP Movement and Ellipsis in Mandarin and Cantonese. Proceedings of the 40th West Coast Conference on Formal Linguistics, 192-201.](https://www.lingref.com/cpp/wccfl/40/paper3711.pdf)
- Locator: p. 194, example (6b) and footnote 2
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT_AND_METADATA`
- What it supports: The progressive reading fails in the ellipsis example, while a spatial reading remains possible as a pragmatically unusual continuation.
- Limit: Do not license progressive VP ellipsis from the spatial reading or treat all 喺度 forms as LocativeFragment.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 20, printed pp. 104-107
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The reference provides full locative and motion patterns, including subjects and location expressions.
- Limit: Do not delete an overt subject or promote every locative phrase to a fragment.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/LocativeFragment.json`
- Evidence state: `none_recorded`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-I1A-I01-D1/development-baseline.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by LocativeFragment?

## Related constructions

- [[ComplementEllipsisFragment]]
- [[FragmentAnswer]]
- [[FragmentQuestion]]
- [[IdentificationFragment]]
- [[NegatedExistentialFragment]]
- [[NegativeCognitionFragment]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
