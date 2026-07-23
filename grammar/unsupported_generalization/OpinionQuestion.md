---
title: "OpinionQuestion"
type: "canto-span-construction"
construction: "OpinionQuestion"
status: "unsupported_generalization"
confidence: "source_linked_jyutgok_dimjoeng_profile_broader_complement_scope_unsupported"
claim_layer: "language"
lane: "LANE-07"
last_reviewed: "2026-07-23"
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
code_document_review_commit: "working-tree-v0.5.213-r4"
code_document_code_locations: ["main.js:2180-2195"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/OpinionQuestion.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 3
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 2
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-07", "canto-span/workflow/archived"]
---

# OpinionQuestion

## Plain-language claim

The checked source directly attests `你覺得佢哋點樣？`, with an overt experiencer, cognition predicate, evaluated referent, and evaluative wh predicate. The parser retains that exact structural profile while leaving other cognition-question complement types to independent composition.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `source_linked_jyutgok_dimjoeng_profile_broader_complement_scope_unsupported`
- Current action: `retain_exact_profile_and_research_cognition_question_complement_ontology`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-23

## Sources

### SRC-ALDERETE-ETAL-2017-SYNOPSIS

- Citation: [Alderete, John, Queenie Chan, Macarius Chan, Gloria Fan, and Olivia Nickel. 2017. Cantonese Grammar Synopsis.](https://www.sfu.ca/~alderete/pubs/aldereteEtal2017_cantgsyn2017-10-31.pdf)
- Locator: printed pp. 37-42; cognition and wh summaries
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The independently supported components favor ordinary complement composition over a special OpinionQuestion node.
- Limit: Do not import a silent complementizer or assume unrestricted lexical selection.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: user PDF pp. 205, 243, 270, and 391
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: Cognition predicates can embed or frame several independently formed question types, not only 點樣 evaluation.
- Limit: Do not force these forms into one evaluation-question slot or erase their overt question morphology.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/OpinionQuestion.json`
- Evidence state: `source_linked_exact_positive_plus_subject_referent_and_lexeme_scope_boundaries`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `v0.5.213_r4_source_linked_exact_profile`
- Visible/focused tests: `1_source_linked_positive_and_2_executable_boundaries`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `PASS_EXACT_OVERT_JYUTGOK_DIMJOENG_PROFILE`

## Open questions and blockers

- The exact `覺得 … 點樣` evaluation profile is source-linked, but this does not establish a universal opinion-question construction.
- Other attested complements—locative wh, alternative, identificational wh, and final-`未` questions—must retain their own question structure.
- Lexical extension beyond `覺得`, subject or referent omission, evaluation-versus-manner readings of `點樣`, corpus coverage, and role-neutral panel evidence remain unresolved.

## Related constructions

- [[IdentityWhQuestion]]
- [[LocativeWhQuestion]]
- [[ProgressivePlaceQuestion]]
- [[ProgressiveWhObjectQuestion]]
- [[ScalarValueQuestion]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## CP039 evaluation/scalar/question wrapper audit

- Historical implementation-only reachability used `ESQWRAP-006` with `你覺得呢個點樣？`.
- v0.5.213-r4 retires that zero-weight probe because it protected broader referent scope than the exact source. The source-linked positive below now owns current executable coverage.

## v0.5.213-r4 exact-profile reconciliation

- Source-linked positive: `你覺得佢哋點樣？` (coursebook, user PDF p. 256).
- The generative template now requires an overt subject, exact predicate `覺得`, an overt evaluated referent, and exact wh predicate `點樣`.
- The former token-cooccurrence fallback has been removed.
- The broader zero-weight `你覺得呢個點樣？` reachability probe has been removed rather than forcing the source-narrowed matcher to preserve it.
- `覺得點樣？` and `你認為佢哋點樣？` are executable absence boundaries for this narrow node; they are not grammaticality rejections.
- The broader label remains `unsupported_generalization` pending a composition-versus-wrapper decision across independently typed question complements.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: Cantonese-language profile requiring narrow evidence-faithful scope
- Research finding: Current note already retains exact source-linked `你覺得佢哋點樣？` with 2 executable boundaries. Other cognition-question types compose differently.
- Recommended disposition: Retain the exact profile or decompose into cognition predicate + evaluated referent + wh predicate. Keep broader complement ontology unresolved.
- Retirement safeguard: Do not retire the sourced profile merely because the outer label may be redundant.
- Status effect: This note-only research sweep does not promote or retire the label. The current status remains unchanged until runtime, contract, and release records are reconciled in the implementation track.
