---
title: "EvaluationWithDouSyun"
type: "canto-span-construction"
construction: "EvaluationWithDouSyun"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-10"
last_reviewed: "2026-07-22"
last_status_migrated: "2026-07-21"
source_count: 4
verified_source_count: 4
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
standard_test_file: "tests/constructions/EvaluationWithDouSyun.json"
standard_test_coverage: "implementation_positive_only"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_implementation_probe_count: 1
standard_executable_test_count: 1
source_ids: ["SRC-LAM-2014-SURPASS-COMPARATIVE", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE", "SRC-WORDSHK-SYUN3", "SRC-POLYU-TAI-O-837295"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 3
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-10", "canto-span/workflow/archived"]
---

# EvaluationWithDouSyun

## Plain-language claim

Cantonese attests lexical evaluation with `算`, including ordinary
subject/topic + `都算` + evaluative-predicate examples. The current runtime's
price-noun-specific wrapper is not established by that evidence, and the exact
constituency, complement classes, productivity, and boundaries remain unresolved.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `retain_quarantine_research_general_evaluation_before_replacing_or_retiring_price_wrapper`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-22

## Sources

### SRC-LAM-2014-SURPASS-COMPARATIVE

- Citation: [Lam, Charles. 2014. A Unified Analysis to Surpass Comparative and Experiential Aspect. Proceedings of PACLIC 28, 368-377.](https://aclanthology.org/Y14-1043/)
- Locator: pp. 368-376
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT`
- What it supports: Scalarity is a semantic property and does not settle the constituency of 都, 算, or a price noun.
- Limit: Do not infer the runtime wrapper from general scalar semantics.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: user PDF p. 340
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: This supports a lexical 算 evaluation component but not the runtime 都算 price wrapper.
- Limit: Do not use 唔算貴 as direct attestation of 都算 + price noun.

### SRC-WORDSHK-SYUN3

- Citation: [Words.hk / 粵典. `算` dictionary entry.](https://words.hk/zidin/%E7%AE%97)
- Locator: verb sense `當成`; examples `我都算好彩`, `近來生意都算唔錯`, and `佢啲成績都算唔差㗎喇`
- Verification: `VERIFIED_CONTEMPORARY_DICTIONARY_ENTRY`
- What it supports: Lexical evaluative `算` and multiple exact subject/topic + `都算` + predicate attestations with positive and negated evaluative predicates.
- Limit: Dictionary examples do not establish a mandatory price noun, unrestricted predicate selection, parser constituency, discourse conditions, or productivity.

### SRC-POLYU-TAI-O-837295

- Citation: [Hong Kong Polytechnic University School of Design. *Tai O Project GRF 1560621*, Case 837295 interview transcript, 16 August 2022.](https://prod-dcd-datasets-public-files-eu-west-1.s3.eu-west-1.amazonaws.com/e24f131a-8077-41a0-b17c-b41b697344d2)
- Locator: transcript around 00:24:37; `都算好彩啦`, `都算好彩，有瓦遮頭`, and `都算好嘢㗎啦`
- Verification: `VERIFIED_PUBLIC_NATURAL_SPEECH_TRANSCRIPT`
- What it supports: Naturally produced predicate-initial/context-recovered `都算` evaluation with overt evaluative complements.
- Limit: One interview passage does not settle an omitted subject's syntax, complement productivity, price-domain behavior, or the runtime node boundary.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/EvaluationWithDouSyun.json`
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

- Direct external evidence now establishes lexical `都算` evaluation, but not the current price-noun-specific registry and fallback.
- Determine whether `都` is an ordinary scoped adverb or belongs inside any dedicated evaluation node.
- Determine the licensed complement classes, subject/topic and fragment profiles, negation boundaries, particles, and relation to [[ScalarEvaluation]].
- Replace or retire the price-specific wrapper only after source-linked positive and boundary cases define a narrower parser contract.

## Related constructions

- [[ScalarEvaluation]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## CP039 evaluation/scalar/question wrapper audit

- Implementation-only reachability: `ESQWRAP-002` with `都算中等價位。`
- Protects the current 都 + 算 + price-domain heuristic only. Checked 算 evidence does not establish this exact wrapper.
- Its linguistic evidence weight is **0**; reachability does not establish naturalness, productivity, construction identity, or promotion eligibility.

## CP053 external-evidence follow-up

- Words.hk and a public natural-speech transcript independently attest ordinary
  `都算` evaluation with overt predicates.
- Neither source attests the probe `都算中等價位。` or supports the runtime's
  mandatory price-domain wrapper.
- Disposition: retain the label in quarantine while researching a source-linked
  general evaluation analysis; do not promote, broaden, replace, or retire the
  runtime in this evidence-only slice.
