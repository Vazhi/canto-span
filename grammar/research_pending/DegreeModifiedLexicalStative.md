---
title: "DegreeModifiedLexicalStative"
type: "canto-span-construction"
construction: "DegreeModifiedLexicalStative"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-10"
last_reviewed: "2026-07-22"
last_status_migrated: "2026-07-22"
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
negative_cases_drafted: true
negative_tests_executable: true
negative_tests_passing: true
negative_boundary_inventory_complete: true
corpus_evidence_used: false
corpus_hits_reviewed: false
corpus_candidate_hit_count: 0
corpus_genuine_hit_count: 0
corpus_false_positive_count: 0
corpus_ambiguous_hit_count: 0
corpus_unusable_hit_count: 0
code_document_reconciled: true
code_document_review_date: "2026-07-22"
code_document_review_commit: "v0.5.204"
code_document_code_locations: ["main.js:DegreeModifiedLexicalStative category template", "tests/fixtures/regression-snapshots.json:REG-0551"]
current_standard_reaudit_complete: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/DegreeModifiedLexicalStative.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 2
standard_implementation_probe_count: 1
standard_executable_test_count: 4
source_ids: ["SRC-LAM-LAU-LEE-2024-SEGMENTATION", "SRC-CUHK-CANTONESE-EXPRESS-DAILY05", "SRC-WORDSHK-HOUSIK"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 5
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10", "canto-span/workflow/archived"]
---

# DegreeModifiedLexicalStative

## Plain-language claim

Cantonese permits a narrow, independently attested profile in which a degree modifier precedes a dictionary-backed lexicalized stative, as in `好 + 好食`; the productive lexical and modifier range remains unresolved.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_narrow_source_linked_degree_plus_lexicalized_stative_profile_boundaries_unresolved`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-22

## Sources

### SRC-LAM-LAU-LEE-2024-SEGMENTATION

- Citation: [Lam, Charles, Chaak Ming Lau, and Jackson L. Lee. 2024. Multi-Tiered Cantonese Word Segmentation. Proceedings of LREC-COLING 2024, 11993-12002.](https://aclanthology.org/2024.lrec-main.1047/)
- Locator: p. 6 section 4.6, degree-modification discussion
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper separately segments degree modifiers such as 好, 幾, and 非常 before adjectives.
- Limit: Do not infer that 好 + 好食 specifically is licensed or pragmatically neutral from the separate general facts alone.

### SRC-CUHK-CANTONESE-EXPRESS-DAILY05

- Citation: Chinese University of Hong Kong Independent Learning Centre. *Cantonese Express / 港式粵語速遞*, Daily Conversation 5 vocabulary.
- Locator: vocabulary item 3, `好好食 hou2 hou2 sik6`
- Verification: `VERIFIED_OFFICIAL_UNIVERSITY_WEB_RESOURCE`
- What it supports: The exact surface `好好食` is presented as ordinary Cantonese meaning “very delicious / very good to eat.”
- Limit: A teaching vocabulary item attests the form but does not establish every degree modifier, every lexicalized stative, or unrestricted syntax.

### SRC-WORDSHK-HOUSIK

- Citation: Words.hk / 粵典. `好食` dictionary entry.
- Locator: adjective entry and example ending `都覺得好好食`
- Verification: `VERIFIED_CONTEMPORARY_DICTIONARY_ENTRY`
- What it supports: `好食` is independently lexicalized as an adjective, and the entry supplies an exact example with preceding degree `好`.
- Limit: Dictionary examples corroborate lexical category and exact usage; they do not alone prove productivity or negative boundaries.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/DegreeModifiedLexicalStative.json`
- Source-linked positive regression: `REG-0551` preserves `好好食。` as degree `好` plus lexicalized stative `好食`.
- Evidence state: `one_narrow_attested_profile`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `source_linked_narrow_profile_with_unresolved_productivity`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `REG-0551_PASS`
- Code–documentation comparison: `reconciled_v0.5.204`

## Open questions and blockers

- exact lexical and degree-modification attestations now linked; productive class boundaries remain unresolved
- Runtime and current governance are reconciled for the narrow attested profile in v0.5.204.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by DegreeModifiedLexicalStative?

## Related constructions

- [[ActionStativeVP]]
- [[DegreeStativePredicate]]
- [[StativePredicate]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## CP040 final reachable-wrapper audit

- Historical implementation-only reachability: `FRWRAP-004` with `好好食。`.
- v0.5.204 adds independent attestation and exact regression coverage for the same surface. The original probe remains zero-weight provenance and is not counted as linguistic evidence.
- The attested case supports only degree `好` plus lexicalized stative `好食`; unrestricted productivity, alternative degree markers, and negative boundaries remain unresolved.
