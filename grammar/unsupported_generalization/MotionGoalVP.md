---
title: "MotionGoalVP"
type: "canto-span-construction"
construction: "MotionGoalVP"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-09"
last_reviewed: "2026-07-23"
last_status_migrated: "2026-07-21"
source_count: 3
verified_source_count: 3
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
code_document_code_locations: ["main.js:2915-2975", "main.js:3155-3180", "main.js:13415-13440", "main.js:13930-13975"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/MotionGoalVP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 40
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 42
source_ids: ["SRC-CHOR-2018-DIRECTIONALS", "SRC-LEUNG-2026-MOTION", "SRC-SZETO-2015-PERFECTIVE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 20
accepted_fixtures: 40
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-09", "canto-span/workflow/archived"]
---

# MotionGoalVP

## Plain-language claim

Cantonese may instantiate the structural family represented by MotionGoalVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHOR-2018-DIRECTIONALS

- Citation: [Chor, W. O. W. 2018. Directional Particles in Cantonese: Form, Function, and Grammaticalization. Amsterdam/Philadelphia: John Benjamins.](https://doi.org/10.1075/scld.9)
- Locator: PDF pp. 124-127; printed pp. 106-109
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: 到 can denote arrival at a locative goal and can also function as a directional/result element; physical and nonspatial goal uses are distinguished.
- Limit: Do not collapse all strings containing 到 into MotionGoalVP.

### SRC-LEUNG-2026-MOTION

- Citation: [Leung, J. R. 2026. Detecting paths of change in the heritage context: Directional motion event expression in Cantonese spoken in Toronto and Hong Kong. Asia-Pacific Language Variation 11(1-2).](https://doi.org/10.1075/aplv.25004.leu)
- Locator: accepted manuscript pp. 39-41 and appendix p. 60
- Verification: `VERIFIED_ACCEPTED_MANUSCRIPT`
- What it supports: The study separates spatial-displacement expressions from marked purposive 去/嚟 and discusses physical versus abstract uses.
- Limit: Do not tag every occurrence of 去 as a physical motion construction.

### SRC-SZETO-2015-PERFECTIVE

- Citation: [Szeto, P. Y. 2015. The Emergence of Perfective Aspect in Cantonese-English Bilingual Children: Bilingual Development and Language Contact. MPhil thesis, The Chinese University of Hong Kong.](https://repository.lib.cuhk.edu.hk/tc/item/cuhk-1291427)
- Locator: thesis pp. 29-30 and 45
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The three cited motion examples place 咗 immediately after the motion predicate and before the destination expression.
- Limit: Do not generalize the order to every aspect marker, directional complement, or motion predicate.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 9 total; 9 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/MotionGoalVP.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/development-baseline.json`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `tests/fixtures/regression-snapshots.json`
  - `test-data/review-only-readiness.tsv`

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by MotionGoalVP?

## Related constructions

- [[ExperientialMotionGoalVP]]
- [[GoalAttainmentMotionVP]]
- [[PathPhrase]]
- [[SourceMotionClause]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: Cantonese-language profile requiring narrow evidence-faithful scope
- Research finding: `SRC-CHOR-2018-DIRECTIONALS`; `SRC-LEUNG-2026-MOTION`; `SRC-SZETO-2015-PERFECTIVE`. Direct research distinguishes arrival goals, locative objects, deixis, abstract uses, and purposive `去/嚟`.
- Recommended disposition: Retain source-backed spatial-goal profiles; split physical goal, abstract goal, deictic direction, and purpose uses. Consider shared motion-relation infrastructure.
- Retirement safeguard: Strong retirement veto: 40 current positives and three direct sources. Remove only overbroad paths, not the goal relation.
- Final disposition: **retain narrow and decompose** physical goal, abstract goal, deictic direction, and purpose uses.
- Runtime/reach: templates and builders at `main.js:2915-2975`, `main.js:3155-3180`, `main.js:13415-13440`, and `main.js:13930-13975` preserve movement predicate, aspect, and overt goal.
- Evidence/boundaries: Chor, Leung, and Szeto support distinct arrival/goal/deictic/purpose profiles and exact perfective order. Forty positives and two nonmotion boundaries veto wholesale retirement.
- A1/schema: preserve the label at `unsupported_generalization` while adding typed roles; do not turn every `去/到` into physical motion.
- Open/release: subtype inventories, abstract uses, lexical scope, corpus/panel evidence remain open; this note, baseline, and release audit record the decision.
