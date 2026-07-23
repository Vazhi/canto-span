---
title: "SourceMotionClause"
type: "canto-span-construction"
construction: "SourceMotionClause"
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
code_document_code_locations: ["main.js:13440-13470", "main.js:13870-13890"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/SourceMotionClause.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 4
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 6
source_ids: ["SRC-LEUNG-2014-COVERBS", "SRC-LEUNG-2026-MOTION", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 7
accepted_fixtures: 4
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-09", "canto-span/workflow/archived"]
---

# SourceMotionClause

## Plain-language claim

Cantonese may instantiate the structural family represented by SourceMotionClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LEUNG-2014-COVERBS

- Citation: [Leung, H. H. 2014. Cantonese Coverbs: A Syntactic Reanalysis. MA qualifying paper, University of California, Berkeley.](https://linguistics.berkeley.edu/~herman/documents/CantoneseCoverbs_MAPaper_Leung.pdf)
- Locator: pp. 1-3
- Verification: `VERIFIED_FULL_TEXT_CORROBORATIVE`
- What it supports: The coverb inventory includes 由 for source, and the described coverb phrase precedes the main verb.
- Limit: Do not treat the unpublished paper's syntactic analysis as settled or sufficient by itself.

### SRC-LEUNG-2026-MOTION

- Citation: [Leung, J. R. 2026. Detecting paths of change in the heritage context: Directional motion event expression in Cantonese spoken in Toronto and Hong Kong. Asia-Pacific Language Variation 11(1-2).](https://doi.org/10.1075/aplv.25004.leu)
- Locator: accepted manuscript pp. 26-28
- Verification: `VERIFIED_ACCEPTED_MANUSCRIPT`
- What it supports: The study includes a motion expression with 由香港 as source and 台灣 as the later destination.
- Limit: One corpus example does not establish unrestricted optional subjects, time phrases, predicates, or place nouns.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: PDF p. 80; Unit 13
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The reference grammar gives source-to-goal movement examples, including from Taiwan to Hong Kong and from here to Sydney.
- Limit: Descriptive examples do not justify arbitrary material between source, predicate, and goal.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 4 total; 4 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/SourceMotionClause.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by SourceMotionClause?

## Related constructions

- [[ExperientialMotionGoalVP]]
- [[GoalAttainmentMotionVP]]
- [[MotionGoalVP]]
- [[PathPhrase]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: Cantonese-language profile requiring narrow evidence-faithful scope
- Research finding: `SRC-LEUNG-2014-COVERBS`; `SRC-LEUNG-2026-MOTION`; `SRC-YIP-MATTHEWS-2000-BASIC`. Sources directly attest preverbal `由` source and source-to-goal movement.
- Recommended disposition: Retain a typed source-motion relation or compose source PP + motion predicate + optional goal while preserving token order.
- Retirement safeguard: Do not retire the source relation; only remove a redundant clause wrapper after composition is proven.
- Final disposition: **retain narrow**, pending source-PP + motion + optional-goal composition.
- Runtime/reach: builders at `main.js:13440-13470` and `main.js:13870-13890` preserve subject/time, overt `由`, source location, predicate, and goal order.
- Evidence/boundaries: Leung 2014/2026 and Yip–Matthews attest preverbal source and source-to-goal motion while limiting arbitrary material. Four positives and two nonmotion boundaries are executable.
- A1/schema: keep `unsupported_generalization` until compositional output is identical; do not infer a source, subject, or goal.
- Open/release: optionality, place/predicate breadth, coverb analysis, corpus/panel evidence remain open; this note, baseline, and release audit record the decision.
