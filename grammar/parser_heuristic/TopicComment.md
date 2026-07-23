---
title: "TopicComment"
type: "canto-span-construction"
construction: "TopicComment"
status: "parser_heuristic"
confidence: "low"
claim_layer: "internal"
lane: "LANE-10"
last_reviewed: "2026-07-23"
last_status_migrated: "2026-07-21"
source_count: 1
verified_source_count: 1
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
code_document_code_locations: ["main.js:2275-2295", "main.js:11435-11505", "main.js:15250-15270"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: false
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/TopicComment.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 2
standard_implementation_probe_count: 1
standard_executable_test_count: 4
source_ids: ["SRC-FUNG-2007-TOPIC-FOCUS"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 10
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/parser_heuristic", "canto-span/lane/lane-10", "canto-span/workflow/archived"]
---

# TopicComment

## Plain-language claim

Cantonese may instantiate the structural family represented by TopicComment; exact productivity and boundaries require pattern-specific independent evidence.

This is an internal parser representation. It does not independently license a Cantonese construction claim.

## Current status

- Linguistic status: `parser_heuristic`
- Linguistic confidence: `low`
- Current action: `retain_as_representation_only`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-FUNG-2007-TOPIC-FOCUS

- Citation: [Fung, Suet-man. 2007. *Topic and focus in Cantonese: an OT-LFG account*. MPhil thesis, The University of Hong Kong.](https://hub.hku.hk/handle/10722/53148)
- Locator: official HKU record, abstract, and full-text deposit; DOI `10.5353/th_b3872511`
- Verification: `VERIFIED_OFFICIAL_METADATA_AND_ABSTRACT; FULL_TEXT_RUNTIME_PROPOSITION_NOT_YET_MAPPED`
- What it supports: Cantonese topic/comment and topic/focus distinctions are a direct research domain, so the parser representation cannot be retired as if no Cantonese-specific phenomenon existed.
- Limit: The OT-LFG analysis, subject/topic distinction, topicalization constraints, and exact runtime template have not been reconciled proposition by proposition; this source does not license the current node.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/TopicComment.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `tests/fixtures/regression-snapshots.json`

## Implementation state

- Lifecycle: `runtime_referenced_with_accepted_fixtures`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `not_applicable_or_internal`

## Open questions and blockers

- internal engineering claim cannot by itself establish Cantonese grammar
- Runtime metadata and current governance agree in v0.5.184.
- Research question: record implementation provenance and keep separate from Cantonese-language evidence

## Related constructions

- [[Topic]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: internal parser representation, subsystem, diagnostic state, or compatibility role
- Research finding: Currently internal with no mapped source, but direct Cantonese topic/focus research exists (Fung 2007 and later left-periphery work).
- Recommended disposition: Do not retire. First map Cantonese-specific topic/focus evidence, inspect the runtime example, and decide whether this is a language construction, a discourse-role representation, or both.
- Retirement safeguard: Hard research gate: retirement is forbidden until direct Cantonese topic-comment literature and competing subject/dislocation analyses are reviewed.
- Final disposition: **quarantine and retain internally** pending direct topic/focus reconciliation; retirement is rejected.
- Runtime/reach: templates and fallback are `main.js:2275-2295`, `main.js:11435-11505`, and `main.js:15250-15270`; they preserve overt topic and comment children while excluding subject/co-participant/stance-holder starts.
- Stable semantics: the node records an overt two-part information-structure hypothesis and licenses no missing subject, dislocation, or language-wide topic rule. `ONTO-D03-TOPIC-COMMENT` asserts the serialized grouping.
- A1/schema: preserve `TopicComment` at `parser_heuristic`; do not promote or retire before Fung’s full analysis and competing subject/dislocation accounts are mapped to runtime propositions.
- Open/release: full-text source mapping, topic versus subject/dislocation, discourse accessibility, and panel/corpus work remain open; this note, source link, shared probe inventory, generated tests/index, baseline, and release audit record the decision.
