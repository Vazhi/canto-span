---
title: "NegativeExperiential"
type: "canto-span-construction"
construction: "NegativeExperiential"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-05"
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
code_document_code_locations: ["main.js:NegativeExperiential template", "main.js:wrapCore experiential order fallback", "tests/constructions/NegativeExperiential.json"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/NegativeExperiential.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 3
standard_boundary_test_count: 5
standard_implementation_probe_count: 2
standard_executable_test_count: 10
source_ids: ["SRC-LAM-2018-NEGATION-ASPECT", "SRC-MATTHEWS-YIP-2011-ASPECT-MULTIMEDIA", "SRC-ZHANG-1970-PREDICATIVE-SUFFIXES", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 2
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-05", "canto-span/workflow/archived"]
---

# NegativeExperiential

## Plain-language claim

Cantonese attests preverbal `未` and `冇` before an experiential `V過` predicate. Final `未` questions, `有冇` questions, non-experiential `未V`, and general `唔`/prohibitive `咪` negation remain separate.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_narrow_source_linked_preverbal_negative_experiential`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-22

## Sources

### SRC-LAM-2018-NEGATION-ASPECT

- Citation: [Lam, Cherry Chit-Yu. 2018. On the Interaction between Negation and Aspect in Grammaticalisation: A Cross-linguistic Study of Three Chinese Varieties. Current Research in Chinese Linguistics 97(1):215-232.](https://www.cuhk.edu.hk/ics/clrc/crcl_97_1/lam.pdf)
- Locator: pp. 215-218, Table 1 and examples (1)-(3)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: 冇 has existential/possessive and aspectual-negative functions distinct from 唔.
- Limit: Do not generate *唔V過 or prohibitive 咪V過 by analogy unless independently sourced.

### SRC-MATTHEWS-YIP-2011-ASPECT-MULTIMEDIA

- Citation: [Matthews, Stephen and Virginia Yip. 2011. Cantonese: A Comprehensive Grammar, 2nd ed. Multimedia supplement, Chapter 11: Aspect and verbal particles. Chinese University of Hong Kong.](https://www.cuhk.edu.hk/lin/cbrc/CantoneseGrammar/multimedia/11.htm)
- Locator: Chapter 11, experiential 過 and final 未 examples
- Verification: `VERIFIED_UNIVERSITY_HOSTED_REFERENCE_SUPPLEMENT`
- What it supports: The reference supplement treats final 未 as an experiential question strategy.
- Limit: Do not move, duplicate, or reinterpret final 未 as a preverbal negator.

### SRC-ZHANG-1970-PREDICATIVE-SUFFIXES

- Citation: [Zhang, Hongnian 張洪年. 1970. 粵語中常見的謂詞詞尾. 中國文化研究所學報 3(2):459-488.](https://www.cuhk.edu.hk/ics/journal/articles/v05p459.pdf)
- Locator: pp. 467-468
- Verification: `VERIFIED_OFFICIAL_ARCHIVE_FULL_TEXT`
- What it supports: The article defines experiential 過 through prior-experience contrasts and question forms.
- Limit: Do not assign experiential meaning to the negator itself or erase 過.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: printed p. 192: `我冇睇過今日嘅報紙`, `我未去過美國`, `我未見過王小姐`; printed p. 188: `你有冇去過澳門呀`
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The textbook directly contrasts preverbal `冇 + V過`, preverbal `未 + V過`, and the separate `有冇 + V過` question profile.
- Limit: Do not collapse questions, negative statements, and short answers into one negator template.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/NegativeExperiential.json`
- Evidence state: `three_exact_source_positives_and_five_executable_boundaries`
- Positive statements: `我未見過王小姐`, `我冇睇過今日嘅報紙`, `我未去過美國`.
- Boundaries: final-`未` experiential question, non-experiential `未...完`, `有冇` polar question, general `唔`, and prohibitive `咪`.
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `source_linked_research_pending_runtime_path`
- Visible/focused tests: `three_source_linked_positives_and_five_boundaries_pass`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `v0.5.211_release_checks_pass`
- Code–documentation comparison: `reconciled_2026-07-22`

## Open questions and blockers

- Productive verb/object coverage remains unresolved beyond the checked examples.
- No native-speaker panel or corpus-frequency evidence has been collected.
- The parser still under-analyzes the internal NP in `今日嘅報紙`; this does not affect the checked negative-experiential label boundary.
- Research question: Which additional verbs, objects, particles, and discourse environments license preverbal `未/冇 + V過`?

## Related constructions

- [[ExperientialClause]]
- [[ExperientialQuestion]]
- [[ExperientialVP]]
- [[ExperientialYesNoQuestion]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Implementation reachability audit

- Checkpoint: [CP035-P1 experiential and delimited wrapper audit](../../docs/research/CP035-P1-EXPERIENTIAL-DELIMITED-WRAPPER-AUDIT-R1.md).
- Implementation-only reachability: `EXPDEL-001A`, `EXPDEL-001B`.
- These probes protect current parser reachability only; their linguistic evidence weight is **0**.
- They do not change the construction status, source count, panel evidence, or promotion eligibility.
- Source/runtime reconciliation: [CP055-P1 NegativeExperiential reconciliation](../../docs/research/CP055-P1-NEGATIVE-EXPERIENTIAL-RECONCILIATION-R1.md).
