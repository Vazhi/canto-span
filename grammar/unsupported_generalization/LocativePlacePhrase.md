---
title: "LocativePlacePhrase"
type: "canto-span-construction"
construction: "LocativePlacePhrase"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-09"
last_reviewed: "2026-07-23"
last_status_migrated: "2026-07-21"
source_count: 2
verified_source_count: 2
panel_response_count_total: 1
eligible_panel_response_count: 0
minimum_usable_judgments_per_critical_item: 0
critical_contrast_coverage: "none"
survey_instrument_version: "pre-panel-v2-unstandardized"
survey_instrument_status: "legacy_limited"
survey_instrument_quality_resolved: false
quality_screen_status: "not_started"
panel_adjudication_status: "not_started"
recruitment_channels: []
respondent_role_neutral: false
native_positive_contrasts_reviewed: false
native_negative_contrasts_reviewed: false
panel_evidence_model_version: "v2"
panel_review_state_file: "review-packets/native-panel/active-v2/panel-review-state.json"
panel_policy_file: "review-packets/native-panel/active-v2/panel-policy.json"
negative_cases_drafted: true
negative_tests_executable: true
negative_tests_passing: true
negative_boundary_inventory_complete: false
corpus_evidence_used: false
corpus_hits_reviewed: false
corpus_candidate_hit_count: 0
corpus_genuine_hit_count: 0
corpus_false_positive_count: 0
corpus_ambiguous_hit_count: 0
corpus_unusable_hit_count: 0
code_document_reconciled: true
code_document_review_date: "2026-07-23"
code_document_review_commit: "0bf3532"
code_document_code_locations: ["main.js:2740-2770", "main.js:12035-12120", "main.js:14115-14200", "main.js:17592-17605"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/LocativePlacePhrase.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 15
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 17
source_ids: ["SRC-KWAN-2010-LOCATIVE", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 16
accepted_fixtures: 14
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-09", "canto-span/workflow/archived"]
---

# LocativePlacePhrase

## Plain-language claim

Cantonese may instantiate the structural family represented by LocativePlacePhrase; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-KWAN-2010-LOCATIVE

- Citation: [Kwan, S. W. M. 2010. The Placement of Locative Prepositional Phrases in Cantonese: Processing and Iconicity. Taiwan Journal of Linguistics 8(2): 163-198.](https://ah.lib.nccu.edu.tw/item?item_id=113083)
- Locator: journal pp. 165-169; examples 2 and 6
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The article contrasts preverbal action location with postverbal resulting location and rejects the postverbal order for the same static-event reading in a cited example.
- Limit: Do not collapse both orders into one undifferentiated locative role.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: PDF p. 78; Unit 13
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The reference grammar explicitly notes both locative and progressive functions for 喺度.
- Limit: Do not label every 喺度 token locative or every 喺度 token progressive.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 2 total; 2 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/LocativePlacePhrase.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-I1A-I01-D1/development-baseline.json`
  - `review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/development-baseline.json`
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.json`
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-G-grammar_research_external_evidence.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-L-lexicon_jyutping_enrichment.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-R-accepted_behavior_regression.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.json`
  - `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.tsv`
  - `test-data/a1-context-status-fixture.tsv`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by LocativePlacePhrase?

## Related constructions

- [[LocativePostureVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: Cantonese-language profile requiring narrow evidence-faithful scope
- Research finding: `SRC-KWAN-2010-LOCATIVE`; `SRC-YIP-MATTHEWS-2000-BASIC`. Research contrasts preverbal action location, postverbal resulting/goal location, locative predicates, and progressive/locative `喺度`.
- Recommended disposition: Split by role and position: event location, predicate location, result/goal location, localizer phrase, and `喺度` ambiguity. Likely migrate to a shared spatial subsystem.
- Retirement safeguard: Strong retirement veto. The current catch-all may retire only after each supported subtype and ambiguity is preserved.
- Final disposition: **quarantine and decompose/replace** through typed spatial roles.
- Runtime/reach: templates and builders at `main.js:2740-2770`, `main.js:12035-12120`, `main.js:14115-14200`, and clause guards at `main.js:17592-17605` preserve subjects and overt localizers.
- Evidence/boundaries: Kwan distinguishes event from result location; Yip–Matthews preserves locative/progressive `喺度` ambiguity. Fifteen positives and two nonlocative boundaries protect the material, not a catch-all meaning.
- A1/schema: keep compatibility at `unsupported_generalization`; future roles must preserve position, localizer, goal/result, and ambiguity with no hidden place.
- Open/release: subtype mapping, localizer inventory, corpus/panel evidence remain open; this note, baseline, and release audit record the decision.
