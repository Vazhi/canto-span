---
title: "IdentificationFragment"
type: "canto-span-construction"
construction: "IdentificationFragment"
status: "lexicalized_only"
confidence: "medium"
claim_layer: "language"
lane: "LANE-03"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
source_count: 3
verified_source_count: 3
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
standard_test_file: "tests/constructions/IdentificationFragment.json"
standard_test_coverage: "implementation_positive_only"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_implementation_probe_count: 1
standard_executable_test_count: 1
source_ids: ["SRC-KWONG-2018-DEMONSTRATIVES", "SRC-TANG-2015-UTTERANCE-PARTICLES", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 3
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/lexicalized_only", "canto-span/lane/lane-03", "canto-span/workflow/archived"]
---

# IdentificationFragment

> Retired in v0.5.214-r6: the broad 就係 fallback did not establish autonomous fragment status.

## Plain-language claim

Particular conventional Cantonese expressions may instantiate the behavior represented by IdentificationFragment; productivity is not assumed.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `lexicalized_only`
- Linguistic confidence: `medium`
- Current action: `retain_lexicalized_and_block_productive_generalization`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-KWONG-2018-DEMONSTRATIVES

- Citation: [Kwong, Oi Yee. 2018. The Non-deictic Use of Demonstratives in Conversations and Interpreted Speeches in Contemporary Hong Kong Cantonese. Proceedings of PACLIC 32, 313-321.](https://aclanthology.org/Y18-1036/)
- Locator: p. 314, example (3)
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT_AND_METADATA`
- What it supports: The attested sequence is 我想講講呢就係嗰個少數族裔嘅福利同埋權利 in a discussion of non-deictic demonstratives.
- Limit: Do not reanalyze this full sequence as proof of isolated 就係 + arbitrary NP fragment productivity.

### SRC-TANG-2015-UTTERANCE-PARTICLES

- Citation: [Tang, Sze-Wing. 2015. A generalized syntactic schema for utterance particles in Chinese. Lingua Sinica 1:3.](https://doi.org/10.1186/s40655-015-0005-5)
- Locator: endnote g and article conclusion
- Verification: `VERIFIED_PUBLISHER_FULL_TEXT_AND_METADATA`
- What it supports: Particle-bearing utterance expressions and ordinary predicative material have different distributions even when their surfaces overlap.
- Limit: Do not import Tang’s full conjunction analysis as parser ontology.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 7; copular 係 examples
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The reference grammar treats 係 as the copula in nominal identification and classification patterns.
- Limit: Do not infer that every 就係 + NP sequence is an autonomous fragment or that the subject is always absent.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/IdentificationFragment.json`
- Implementation-only reachability: `REACH-004` emits this label for `就係冇屋就可以㗎嘛。`; linguistic evidence weight is **0**; provenance: `test-data/natural-corpus-wechat-father-daughter-001-units.tsv#U059`.
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

- no explicit external claim-source edge
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by IdentificationFragment?

## Related constructions

- [[ComplementEllipsisFragment]]
- [[FragmentAnswer]]
- [[FragmentQuestion]]
- [[LocativeFragment]]
- [[NegatedExistentialFragment]]
- [[NegativeCognitionFragment]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
