---
title: "AcceptabilityClause"
type: "canto-span-construction"
construction: "AcceptabilityClause"
status: "unsupported_generalization"
confidence: "source_linked_action_profile_runtime_reconciled_broader_scope_unsupported"
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
code_document_review_commit: "69f871e"
code_document_code_locations: ["main.js:6775-6865"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/AcceptabilityClause.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 2
standard_boundary_test_count: 4
standard_implementation_probe_count: 1
standard_executable_test_count: 7
source_ids: ["SRC-CHENG-SYBESMA-2004-POSTVERBAL-DAK", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 6
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-07", "canto-span/workflow/archived"]
---

# AcceptabilityClause

## Plain-language claim

The checked source directly attests overt action material followed by clause-final `都得` to mark that the action is feasible. The parser now reserves `AcceptabilityClause` for that bounded overt-action profile and does not assign it to standalone, nominal/wh-only, or overt free-choice `…都得` strings.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `source_linked_action_profile_runtime_reconciled_broader_scope_unsupported`
- Current action: `retain_bounded_action_profile_and_research_lexical_particle_scope`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-23

## Sources

### SRC-CHENG-SYBESMA-2004-POSTVERBAL-DAK

- Citation: [Cheng, Lisa Lai-Shen, and Rint Sybesma. 2004. Postverbal can in Cantonese (and Hakka) and Agree. Lingua 114(4):419-445.](https://doi.org/10.1016/S0024-3841(03)00067-6)
- Locator: author PDF pp. 2-5 and 18-20
- Verification: `VERIFIED_AUTHOR_FULL_TEXT_AND_PUBLISHER_METADATA`
- What it supports: 得 has distinct constructions and selectional behavior; its presence does not by itself identify 都得 acceptability syntax.
- Limit: Do not use general 得 research to license the runtime’s optional-slot cross-product.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: user PDF pp. 155 and 296
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: Some 都得 clauses are licensed by explicit free-choice material over individuals, times, or places.
- Limit: Do not label every free-choice 都得 sentence as permission or hide the quantified domain.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/AcceptabilityClause.json`
- Evidence state: `source_linked_action_positive_plus_wh_and_free_choice_boundaries`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `v0.5.213_r3_source_linked_action_profile_reconciled`
- Visible/focused tests: `2_source_linked_positives_and_4_executable_boundaries`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `PASS_BOUNDED_ACTION_HOST_REQUIRED`

## Open questions and blockers

- The checked source establishes exact action-feasibility examples, but not unrestricted predicate selection or every final-particle combination.
- `搵第二個都得` is retained as the source's nonordinal “another/other one” choice profile; it does not activate `OrdinalClassifierNP`.
- Overt free-choice forms with `是但` or `隨便` require their own quantificational analysis and must not be relabeled as the action-feasibility node.
- Broader promotion remains blocked on lexical scope, particle boundaries, corpus coverage, and role-neutral native-speaker review.

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## CP039 evaluation/scalar/question wrapper audit

- Implementation-only reachability: `ESQWRAP-001` with `返工都得。`
- Protects the current bare 都得 route only. The probe does not establish permission, free-choice scope, or the optional-slot wrapper as one productive construction.
- Its linguistic evidence weight is **0**; reachability does not establish naturalness, productivity, construction identity, or promotion eligibility.

## v0.5.213-r3 action-feasibility reconciliation

- Source-linked positives: `轆咭都得` and `搵第二個都得` (coursebook, user PDF pp. 90, 92, and 95).
- The runtime lexicon now recognizes overt verb `轆` and object `咭`, allowing the parser to preserve the full `轆咭都得` span instead of labeling only its tail.
- In the exact choice context, headless `第二個` is preserved as a bounded nonordinal choice NP. Before an overt noun such as `故仔`, it remains compositionally tokenized as ordinal `第二` + classifier `個` + head.
- The matcher now requires an overt parsed action predicate. It no longer constructs `AcceptabilityClause` from bare `都得` or a nominal/wh item followed by `都得`.
- Executable absence boundaries cover `邊度都得`, `是但邊個都得`, `是但幾時去都得`, and `隨便去邊度都得`.
- The broader label stays `unsupported_generalization`; the patch establishes only a bounded source-linked subtype and does not claim unrestricted productivity.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: Cantonese-language profile requiring narrow evidence-faithful scope
- Research finding: `SRC-CHENG-SYBESMA-2004-POSTVERBAL-DAK`; `SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE`. Directly attested overt action + clause-final `都得`; free-choice `…都得` is a separate domain.
- Recommended disposition: Retain or rename the bounded feasibility/permission profile; keep free-choice quantification outside it.
- Retirement safeguard: Do not retire until the source-linked action profile is either preserved under a replacement label or proven to be ordinary composition with identical learner-visible information.
- Final disposition: **retain narrow** for overt parsed action + clause-final `都得`; keep free-choice domains separate.
- Runtime/reach: `main.js:6775-6865` requires the action predicate and preserves the acceptability tail plus broad child clause.
- Evidence/boundaries: Cheng–Sybesma limits general `得` inference; the coursebook supports action and separate free-choice domains. Two positives, four free-choice/wh boundaries, and one zero-weight probe are executable.
- A1/schema: preserve `unsupported_generalization`; a future feasibility/permission rename must retain action, tail, and quantified-domain exclusions.
- Open/release: feasibility versus permission, lexical scope, corpus/panel evidence remain open; this note, baseline, and release audit record the decision.
