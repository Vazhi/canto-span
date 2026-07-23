---
title: "PoliteImperativeClause"
type: "canto-span-construction"
construction: "PoliteImperativeClause"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-10"
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
negative_boundary_inventory_complete: true
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
code_document_code_locations: ["main.js:2545-2560", "main.js:10445-10505"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/PoliteImperativeClause.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 2
standard_implementation_probe_count: 1
standard_executable_test_count: 4
source_ids: ["SRC-CHOW-2007-CANTONESE-EVERYONE", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 5
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-10", "canto-span/workflow/archived"]
---

# PoliteImperativeClause

## Plain-language claim

Cantonese may instantiate the structural family represented by PoliteImperativeClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `retain_narrow_source_linked_request_profile_boundaries_unresolved`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-22

## Sources

### SRC-CHOW-2007-CANTONESE-EVERYONE

- Citation: [Chow, Bun-Ching. 2007. Cantonese for Everyone (Jyutping version) / 大家嘅廣東話. Hong Kong: The Commercial Press. ISBN 978-962-07-1824-3.](https://openlibrary.org/books/OL23210061M/Cantonese_for_everyone)
- Locator: printed pp. 23-25 classroom expressions
- Verification: `VERIFIED_USER_PROVIDED_SCAN_AND_BIBLIOGRAPHIC_METADATA`
- What it supports: Polite directive force can be expressed with a conventional interaction formula distinct from 請.
- Limit: Do not treat 請 and 唔該 as freely interchangeable syntax.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: dialogues including 麻煩你哋填一下 and 唔該你快啲
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: Request strategies differ lexically and pragmatically.
- Limit: Do not infer identical register, syntax, or social meaning across markers.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/PoliteImperativeClause.json`
- Source-linked positive regression: `REG-0549` preserves `唔該你快啲。` as a transparent `PoliteImperativeClause` with nested `FormulaDiscourseUnit` and `DegreeMannerAdverbial`.
- Evidence state: `one_narrow_attested_request_profile`
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
- Regression: `REG-0549_PASS`
- Code–documentation comparison: `pending_current_definition_of_done_line_by_line_review`

## Open questions and blockers

- no explicit external claim-source edge
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by PoliteImperativeClause?

## Related constructions

- [[ProhibitiveImperative]]
- [[SuggestionQuestion]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## CP040 final reachable-wrapper audit

- Implementation-only reachability: `FRWRAP-007` with `請你沿住馬路行。`
- Protects the narrow path-command constructor only. It does not establish broad polite-imperative syntax or generalize beyond the reviewed shape.
- Its linguistic evidence weight is **0**; reachability does not establish naturalness, productivity, construction identity, or promotion eligibility.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: Cantonese-language profile requiring narrow evidence-faithful scope
- Research finding: Two verified pedagogical sources distinguish `唔該`, `麻煩`, `請`, and other request strategies in lexical and pragmatic force.
- Recommended disposition: Retain a narrow request/directive profile or represent conventional formulas plus imperative force separately. Avoid treating politeness as one interchangeable marker slot.
- Retirement safeguard: Do not retire the source-linked request profile. A wrapper may be decomposed only after formula, directive, and manner material remain visible.
- Final disposition: **retain narrow and decompose** formula, directive force, and manner material.
- Runtime/reach: template and request builders are `main.js:2545-2560` and `main.js:10445-10505`; all overt markers/addressees/predicates remain visible.
- Evidence/boundaries: Chow and the coursebook distinguish `唔該`, `麻煩`, `請`, and other strategies. One positive, two nondirective boundaries, and one zero-weight probe do not make markers interchangeable.
- A1/schema: preserve `unsupported_generalization`; future decomposition must retain formula, addressee, directive, and manner roles.
- Open/release: lexical/pragmatic force, register, broader strategies, corpus/panel evidence remain open; this note, baseline, and release audit record the decision.
