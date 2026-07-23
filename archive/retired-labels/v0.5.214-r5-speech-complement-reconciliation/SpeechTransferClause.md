---
title: "SpeechTransferClause"
type: "canto-span-construction"
construction: "SpeechTransferClause"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-08"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
source_count: 2
verified_source_count: 2
panel_response_count_total: 0
eligible_panel_response_count: 0
minimum_usable_judgments_per_critical_item: 0
critical_contrast_coverage: "none"
survey_instrument_version: null
survey_instrument_status: "not_started"
survey_instrument_quality_resolved: false
quality_screen_status: "not_started"
panel_adjudication_status: "not_started"
recruitment_channels: []
respondent_role_neutral: true
native_positive_contrasts_reviewed: false
native_negative_contrasts_reviewed: false
panel_evidence_model_version: "v2"
panel_review_state_file: "review-packets/native-panel/active-v2/panel-review-state.json"
panel_policy_file: "review-packets/native-panel/active-v2/panel-policy.json"
negative_cases_drafted: false
negative_tests_executable: false
negative_tests_passing: false
negative_boundary_inventory_complete: false
corpus_evidence_used: false
corpus_hits_reviewed: false
corpus_candidate_hit_count: 0
corpus_genuine_hit_count: 0
corpus_false_positive_count: 0
corpus_ambiguous_hit_count: 0
corpus_unusable_hit_count: 0
code_document_reconciled: false
code_document_review_date: null
code_document_review_commit: null
code_document_code_locations: []
current_standard_reaudit_complete: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/SpeechTransferClause.json"
standard_test_coverage: "implementation_positive_only"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_implementation_probe_count: 1
standard_executable_test_count: 1
source_ids: ["SRC-MATTHEWS-2006-SVC", "SRC-YIP-MATTHEWS-2017-INTERMEDIATE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 2
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-08", "canto-span/workflow/archived"]
---

# SpeechTransferClause

> Retired in v0.5.214-r5: the outer wrapper duplicated ordinary clause composition and had no independent source-backed licensing profile.

## Plain-language claim

Cantonese may instantiate the structural family represented by SpeechTransferClause; exact productivity and boundaries require pattern-specific independent evidence.

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
- What it supports: The chapter’s diagnostics distinguish multiverb predicate structure from independent clauses and other relations.
- Limit: Do not duplicate a single predicate as both special VP and special clause without evidence.

### SRC-YIP-MATTHEWS-2017-INTERMEDIATE

- Citation: [Yip, Virginia, and Stephen Matthews. 2017. Intermediate Cantonese: A Grammar and Workbook. 2nd ed. Routledge.](https://www.routledge.com/Intermediate-Cantonese-A-Grammar-and-Workbook/Yip-Matthews/p/book/9780415815611)
- Locator: Unit 11 explanation and examples
- Verification: `VERIFIED_EXACT_TEXT_TRANSCRIPTION_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: No special clause marker distinguishes SpeechTransferClause from an ordinary clause headed by the communication predicate.
- Limit: Do not convert pedagogical semantic grouping into a required parser node.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/SpeechTransferClause.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by SpeechTransferClause?

## Related constructions

- [[DitransitiveSpeechVP]]
- [[ReportedSpeech]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## CP038 speech/transfer/complement wrapper audit

- Implementation-only reachability: `STCWRAP-001A` with `我唔話你知。`
- The probe protects the current outer negative-clause wrapper only. The exact surface is attested, but no independent marker establishes that this extra clause node is linguistically necessary.
- Its linguistic evidence weight is **0**; reachability does not establish naturalness, productivity, or promotion eligibility.
