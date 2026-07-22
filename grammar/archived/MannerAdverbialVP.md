---
title: "MannerAdverbialVP"
type: "canto-span-construction"
construction: "MannerAdverbialVP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-09"
last_reviewed: "2026-07-22"
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
code_document_reconciled: true
code_document_review_date: "2026-07-22"
code_document_review_commit: null
code_document_code_locations: ["main.js:mannerAdverbialVPFallback"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/MannerAdverbialVP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 1
standard_boundary_test_count: 0
standard_implementation_probe_count: 1
standard_executable_test_count: 2
source_ids: ["SRC-LEUNG-2014-COVERBS", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 4
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-09", "canto-span/workflow/archived"]
---

# MannerAdverbialVP

## Plain-language claim

Cantonese permits a repeated property expression followed by overt 咁／噉 before a following action VP in source-attested manner-adverbial examples. The bare repeated-property route remains an implementation hypothesis, and lexical productivity and boundaries remain unresolved.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_narrow_source_linked_overt_adverbializer_path`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-22

## Sources

### SRC-LEUNG-2014-COVERBS

- Citation: [Leung, H. H. 2014. Cantonese Coverbs: A Syntactic Reanalysis. MA qualifying paper, University of California, Berkeley.](https://linguistics.berkeley.edu/~herman/documents/CantoneseCoverbs_MAPaper_Leung.pdf)
- Locator: pp. 13-15, examples (29a-b) and discussion
- Verification: `VERIFIED_FULL_TEXT_CORROBORATIVE`
- What it supports: 琴日慢慢噉食飯 is contrasted with a disfavored reverse order.
- Limit: Do not label time adverbs as manner or convert a theory-specific height analysis into parser truth.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: printed p. 336: 慢慢噉形成咗一套較為完善嘅公屋制度
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The expression includes repeated 慢, overt 噉, and an aspect-marked predicate.
- Limit: Do not infer that every repeated property form combines with every predicate or aspect.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/MannerAdverbialVP.json`
- Implementation-only reachability: `REACH-008` emits this label for `佢慢慢行。`; linguistic evidence weight is **0**; provenance: `test-data/pre-intermediate-gold-corpus.tsv#PI-ADJ-005`.
- Accepted regression: `佢慢慢噉食飯。` emits a complete `MannerAdverbialVP` with overt `噉` and nested `ProductiveVO` over `食飯` (`v0.5.199`).
- Evidence state: `positive_source_linked_case_plus_zero_weight_implementation_probe`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/pre-intermediate-gold-corpus.tsv`

## Implementation state

- Lifecycle: `runtime_referenced_with_narrow_source_linked_fixture`
- Visible/focused tests: `one_source_linked_positive_fixture_plus_one_zero_weight_reachability_probe`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `546/546 passing at v0.5.199`
- Code–documentation comparison: `reconciled_for_overt_gam_path_at_v0.5.199`

## Open questions and blockers

- The exact lexical productivity of repeated property forms remains untested.
- The bare `慢慢行` route is still implementation-only and must not inherit the source weight of overt `咁／噉`.
- Negative boundaries and speaker-panel evidence remain absent; promotion is not eligible.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by MannerAdverbialVP?

## Related constructions

- [[DegreeMannerAdverbial]]
- [[DegreeMannerModifiedVP]]
- [[ReduplicatedVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
