---
title: "NegatedStativePredicate"
type: "canto-span-construction"
construction: "NegatedStativePredicate"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-07"
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
code_document_code_locations: ["main.js:NegatedStativePredicate templates", "tests/constructions/NegatedStativePredicate.json"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/NegatedStativePredicate.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 1
standard_implementation_probe_count: 1
standard_executable_test_count: 3
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-YIP-1988-NEGATION"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 8
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-07", "canto-span/workflow/archived"]
---

# NegatedStativePredicate

## Plain-language claim

Cantonese attests overt `唔` directly before an independently licensed property predicate, without an inserted copula. Nominal predicates instead require an overt copular negative profile; other negators and productive lexical scope remain separate research questions.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_narrow_source_linked_m4_property_predicate`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-22

## Sources

### SRC-ALDERETE-ETAL-2017-SYNOPSIS

- Citation: [Alderete, John, Queenie Chan, Macarius Chan, Gloria Fan, and Olivia Nickel. 2017. Cantonese Grammar Synopsis.](https://www.sfu.ca/~alderete/pubs/aldereteEtal2017_cantgsyn2017-10-31.pdf)
- Locator: p. 27 entry (71), read with p. 24 entry (57)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The synopsis states that 係 is not used when the predicate is an adjective and that predicative adjectives behave verb-like.
- Limit: Do not use this general statement to license every lexical item after 唔.

### SRC-YIP-1988-NEGATION

- Citation: [Yip, Moira. 1988. Negation in Cantonese as a Lexical Rule. Bulletin of the Institute of History and Philology 59: 449-477.](https://www11.ihp.sinica.edu.tw/storage/w2_file/3407pXasnae.pdf)
- Locator: pp. 449-454
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The article analyzes distribution of Cantonese 唔 across verbs, adjectives/stative verbs, prepositions, and some adverbs.
- Limit: Do not infer that every runtime negator can negate every property predicate.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/NegatedStativePredicate.json`
- Source-linked positive: Yip’s example (7), normalized as `呢個女仔唔靚。`, directly negates a property predicate without `係`.
- Source-linked boundary: Yip’s example (8b), normalized as `佢老婆唔係廣東人。`, requires the copula for a negative nominal predicate and remains outside this label.
- Implementation-only reachability: `REACH-009` emits this label for `你好似唔開心噃。`; linguistic evidence weight is **0**; provenance: `test-data/w17-naturalized-alternatives.tsv#COR-W17-013`.
- Evidence state: `one_exact_source_positive_and_one_exact_source_boundary`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/review-only-readiness.tsv`

## Implementation state

- Lifecycle: `source_linked_research_pending_runtime_path`
- Visible/focused tests: `one_source_linked_positive_and_one_boundary_pass`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `v0.5.213_standard_suite_passes`
- Code–documentation comparison: `reconciled_2026-07-22`

## Open questions and blockers

- Productive predicate selection remains unresolved beyond the checked source example and existing dictionary-backed runtime categories.
- `冇`, `未`, `咪`, and other negative profiles require separate construction-specific evidence.
- No role-neutral native-speaker panel or corpus-frequency evidence has been collected.
- Research question: Which additional property predicates and discourse environments productively license direct `唔` negation?

## Related constructions

- [[NegatedDirectionalMotionVP]]
- [[NegatedExistentialClause]]
- [[NegatedVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Source/runtime reconciliation

- Checkpoint: [CP057-P1 NegatedStativePredicate reconciliation](../../docs/research/CP057-P1-NEGATED-STATIVE-PREDICATE-RECONCILIATION-R1.md).
- The v0.5.212 runtime template is constrained to overt `唔` and preserves the property predicate as a visible child.
- The focused cases establish a narrow researched profile only; they do not confer productive or panel-backed status.
