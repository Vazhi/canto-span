---
title: "GoalAttainmentMotionVP"
type: "canto-span-construction"
construction: "GoalAttainmentMotionVP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-09"
last_reviewed: "unknown"
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
code_document_reconciled: false
code_document_review_date: null
code_document_review_commit: null
code_document_code_locations: []
current_standard_reaudit_complete: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/GoalAttainmentMotionVP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 2
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 4
source_ids: ["SRC-SHAN-JIN-2025-MOTION-TYPOLOGY", "SRC-WONG-2023-LANGUAGE-SAMPLE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 4
accepted_fixtures: 2
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-09", "canto-span/workflow/archived"]
---

# GoalAttainmentMotionVP

## Plain-language claim

Cantonese may instantiate the structural family represented by GoalAttainmentMotionVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-SHAN-JIN-2025-MOTION-TYPOLOGY

- Citation: [Shan, Yunming and Jin, Lixin. 2025. 粵語位移事件編碼類型再探 [Revisiting the Encoding Typology of Motion Events in Cantonese]. Language and Linguistics 26(2).](https://doi.org/10.1075/lali.00202.sha)
- Locator: §4.1, examples 33-35
- Verification: `VERIFIED_FULL_TEXT_AUTHOR_UPLOAD_AND_PUBLISHER_METADATA`
- What it supports: The article uses whether aspect occurs between or after the verbs as a diagnostic and gives 我爬到咗山頂 for resultative goal attainment.
- Limit: Do not treat this diagnostic as universally decisive or force all sources into the article’s serial-versus-resultative theory.

### SRC-WONG-2023-LANGUAGE-SAMPLE

- Citation: [Wong, Anita Mei-Yin. 2023. Understanding Development and Disorder in Cantonese Using Language Sample Analysis. Routledge.](https://doi.org/10.4324/9780367824013)
- Locator: book pp. 47-48; example 21
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: 返到學校未呀你 is glossed as asking whether the addressee has arrived at school, and 到 is discussed in the resultative inventory.
- Limit: Do not infer a generic V + 到 + place rule from one example or erase the contribution of 返.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/GoalAttainmentMotionVP.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by GoalAttainmentMotionVP?

## Related constructions

- [[ExperientialMotionGoalVP]]
- [[MotionGoalVP]]
- [[PathPhrase]]
- [[SourceMotionClause]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
