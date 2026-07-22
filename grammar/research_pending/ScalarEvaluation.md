---
title: "ScalarEvaluation"
type: "canto-span-construction"
construction: "ScalarEvaluation"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-10"
last_reviewed: "2026-07-22"
last_status_migrated: "2026-07-22"
source_count: 5
verified_source_count: 5
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
code_document_review_date: "2026-07-22"
code_document_review_commit: null
code_document_code_locations: ["main.js:ScalarEvaluation negative evaluation template", "main.js:wrapCore negative 算 fallback", "tests/constructions/ScalarEvaluation.json"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/ScalarEvaluation.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 3
standard_boundary_test_count: 1
standard_implementation_probe_count: 1
standard_executable_test_count: 5
source_ids: ["SRC-LAM-2014-SURPASS-COMPARATIVE", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE", "SRC-WORDSHK-GAACING", "SRC-CUHK-CANTONESE-ONLINE-B6", "SRC-LEGCO-1995-D90-SYUN3-HOU2-CAA1"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 8
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10", "canto-span/workflow/archived"]
---

# ScalarEvaluation

## Plain-language claim

Cantonese attests negative lexical `算` evaluation with an overt property
predicate, including `唔算貴`, `都唔算貴`, and degree-modified examples. The
productive predicate inventory, discourse scope, and full boundaries remain
unresolved.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_narrow_source_linked_negative_syun_evaluation`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-22

## Sources

### SRC-LAM-2014-SURPASS-COMPARATIVE

- Citation: [Lam, Charles. 2014. A Unified Analysis to Surpass Comparative and Experiential Aspect. Proceedings of PACLIC 28, 368-377.](https://aclanthology.org/Y14-1043/)
- Locator: pp. 368-376
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT`
- What it supports: Scalar semantics does not by itself establish a generic evaluation construction or a price-specific constituent.
- Limit: Do not import the paper’s formal analysis as proof of the runtime ScalarEvaluation node.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: same exact example
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: Price arises from the discourse referent and 貴, not from a mandatory price-noun slot.
- Limit: Do not insert an unspoken 價錢 or 價位 node.

### SRC-WORDSHK-GAACING

- Citation: [Words.hk / CantoWords. `價錢` dictionary entry.](https://cantowords.com/dictionary/%E5%83%B9%E9%8C%A2)
- Locator: noun entry; exact examples `價錢唔算貴` and `中等價錢`
- Verification: `VERIFIED_CONTEMPORARY_DICTIONARY_ENTRY`
- What it supports: An overt price topic followed by negative `算` evaluation, plus a contrasting ordinary nominal price-range expression.
- Limit: A dictionary entry does not establish unrestricted predicate selection, discourse scope, or productive syntax.

### SRC-CUHK-CANTONESE-ONLINE-B6

- Citation: [Chinese University of Hong Kong Independent Learning Centre. *粵語網路課堂*, hotel-booking dialogue.](https://www.ilc.cuhk.edu.hk/workshop/Chinese/Cantonese/OnlineTutorial/courseList_b6.aspx)
- Locator: 李廣越 response `都唔算貴，四星級，兩百零蚊一晚，乾淨企理`
- Verification: `VERIFIED_OFFICIAL_UNIVERSITY_WEB_RESOURCE`
- What it supports: Focus-adverb `都` before negative `唔算貴` in a contextualized price evaluation.
- Limit: One teaching dialogue does not establish all focus particles, complements, or registers.

### SRC-LEGCO-1995-D90-SYUN3-HOU2-CAA1

- Citation: [Hong Kong Legislative Council. Hansard, 8 November 1995.](https://www.legco.gov.hk/yr95-96/chinese/lc_sitg/hansard/951108fc.pdf)
- Locator: quoted assessment `都唔算好差`
- Verification: `VERIFIED_OFFICIAL_PUBLIC_TRANSCRIPT`
- What it supports: Negative `算` evaluation can take a degree-modified non-price property predicate.
- Limit: The current parser does not recognize this exact complement; the example establishes an undercoverage question, not a licensed runtime cross-product.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ScalarEvaluation.json`
- Evidence state: `three_source_linked_positives_one_nominal_boundary`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `source_linked_negative_evaluation_profile_with_unresolved_productivity`
- Visible/focused tests: `three_positive_and_one_boundary_passing`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `reconciled_v0.5.210`

## Open questions and blockers

- The former scalar-value-noun + stative-predicate profile was unrelated to lexical `算` evaluation and has been removed.
- The runtime still recognizes category-compatible property predicates beyond the three source-linked positives; their lexical and discourse boundaries remain research-pending.
- `都唔算好差` is independently attested but currently undercovered because the complement is not assembled as the required property predicate.
- No panel evidence establishes productive acceptance or a complete negative boundary inventory.

## Related constructions

- [[EvaluationWithDouSyun]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## CP039 evaluation/scalar/question wrapper audit

- Implementation-only reachability: `ESQWRAP-003` with `唔算貴。`
- Protects the exact negative 算 evaluation route only. Surface attestation does not validate one broad scalar-evaluation ontology.
- Its linguistic evidence weight is **0**; reachability does not establish naturalness, productivity, construction identity, or promotion eligibility.

## CP054 source/runtime reconciliation

- Three independently sourced negative-`算` surfaces now have focused positive tests.
- `中等價錢` is an executable nominal boundary and remains `ModifierNP` rather than `ScalarEvaluation`.
- The unrelated price-noun predication template and semantic-domain aliases were removed.
- Status moved to `research_pending`; no productive or panel-backed promotion is claimed.
