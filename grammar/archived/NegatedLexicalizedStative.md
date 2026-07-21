---
title: "NegatedLexicalizedStative"
type: "canto-span-construction"
construction: "NegatedLexicalizedStative"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-07"
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
standard_test_file: "tests/constructions/NegatedLexicalizedStative.json"
standard_test_coverage: "no_direct_cases"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_implementation_probe_count: 0
standard_executable_test_count: 0
source_ids: ["SRC-CHIN-2018-PROHIBITIVES", "SRC-LAM-LAU-LEE-2024-SEGMENTATION", "SRC-YIP-1988-NEGATION"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 10
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-07", "canto-span/workflow/archived"]
---

# NegatedLexicalizedStative

## Plain-language claim

Cantonese may instantiate the structural family represented by NegatedLexicalizedStative; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHIN-2018-PROHIBITIVES

- Citation: [Chin, Chi On. 2018. 唔好客氣 vs. 咪走寶: A corpus-based study of Cantonese prohibitive markers. Paper presented at the 18th Workshop on Cantonese, Chinese University of Hong Kong.](https://repository.eduhk.hk/en/publications/%E5%94%94%E5%A5%BD%E5%AE%A2%E6%B0%A3-vs-%E5%92%AA%E8%B5%B0%E5%AF%B6-a-corpus-based-study-of-cantonese-prohibitive-markers/)
- Locator: official repository abstract
- Verification: `VERIFIED_OFFICIAL_ABSTRACT_AND_METADATA`
- What it supports: The study distinguishes prohibitive 咪/唔好 from the ordinary negation marker 唔.
- Limit: Do not infer that every string beginning 唔好 is prohibitive or that the abstract resolves all tokenization contexts.

### SRC-LAM-LAU-LEE-2024-SEGMENTATION

- Citation: [Lam, Charles, Chaak Ming Lau, and Jackson L. Lee. 2024. Multi-Tiered Cantonese Word Segmentation. Proceedings of LREC-COLING 2024, 11993-12002.](https://aclanthology.org/2024.lrec-main.1047/)
- Locator: p. 6 lines 696-706
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper distinguishes compositional and opaque adjective-verb combinations and notes that annotators often disambiguate them in context.
- Limit: Do not infer that the paper specifically adjudicates 唔好食 or supplies the plugin’s contextual decision rules.

### SRC-YIP-1988-NEGATION

- Citation: [Yip, Moira. 1988. Negation in Cantonese as a Lexical Rule. Bulletin of the Institute of History and Philology 59: 449-477.](https://www11.ihp.sinica.edu.tw/storage/w2_file/3407pXasnae.pdf)
- Locator: pp. 449-454
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Yip documents 唔 before verbs and adjective/stative predicates.
- Limit: Do not infer that Yip specifically attests 唔好食 or validates the plugin’s label name.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/NegatedLexicalizedStative.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by NegatedLexicalizedStative?

## Related constructions

- [[NegatedDirectionalMotionVP]]
- [[NegatedExistentialClause]]
- [[NegatedStativePredicate]]
- [[NegatedVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
