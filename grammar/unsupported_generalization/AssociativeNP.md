---
title: "AssociativeNP"
type: "canto-span-construction"
construction: "AssociativeNP"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-06"
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
code_document_review_commit: "583035c"
code_document_code_locations: ["main.js:3520-3555", "main.js:5491-5500", "main.js:16587"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/AssociativeNP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 3
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 5
source_ids: ["SRC-SIO-2011-GE3", "SRC-YU-2006-NOMINAL-MODIFIERS"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 4
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# AssociativeNP

## Plain-language claim

The runtime label groups overt `nominal modifier + 嘅 + noun` structure. It does not denote or license the separately researched Cantonese associative-plural `X + (佢)哋` construction.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-SIO-2011-GE3

- Citation: [Sio, Joanna Ut-Seong. 2011. The Cantonese ge3. In F. H. Yap, K. Grunow-Hårsta, and J. Wrona (eds.), Nominalization in Asian Languages: Diachronic and Typological Perspectives, 125-146. John Benjamins.](https://doi.org/10.1075/tsl.96.04sio)
- Locator: p. 129; examples 13b-c
- Verification: `VERIFIED_FULL_TEXT_AND_PUBLISHER_METADATA`
- What it supports: The chapter contrasts the sound of Peter’s singing with the news that someone killed themself.
- Limit: Do not derive a uniform semantic role from the linker alone.

### SRC-YU-2006-NOMINAL-MODIFIERS

- Citation: [Yu, Dominic. 2006. Relative clauses and nominal modifiers in Cantonese. Unpublished research paper, University of California, Berkeley.](https://linguistics.berkeley.edu/~dom/cantonese-rc.pdf)
- Locator: pp. 3-5; possessive and nominal-order examples
- Verification: `VERIFIED_FULL_TEXT_CORROBORATIVE`
- What it supports: Yu independently illustrates possessive nominal structures.
- Limit: Do not treat the unpublished analysis as decisive.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/AssociativeNP.json`
- Evidence state: `none_recorded`
- Executable or review records containing this label:
  - `test-data/CP023-P1-PROG01-nominal-design-cases-r3.tsv`
  - `test-data/a1-context-status-fixture.tsv`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `tests/fixtures/np-subsystem.json`
  - `test-data/pre-intermediate-gold-corpus.tsv`
  - `tests/fixtures/regression-snapshots.json`

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by AssociativeNP?

## Related constructions

- [[CoordinatedNP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: Cantonese-language profile requiring narrow evidence-faithful scope
- Research finding: `SRC-SIO-2011-GE3`; `SRC-YU-2006-NOMINAL-MODIFIERS`. Current tests are `MODIFIER + 嘅 + NOUN` (possessive/attributive modification), not associative plural. Lui 2026 separately establishes Cantonese associative plural `X + (佢)哋`.
- Recommended disposition: Rename/decompose the current node into a `嘅`-marked modifier/possessive NP subsystem. Create only a separate research record for associative plural if runtime work is later authorized.
- Retirement safeguard: Never use the label name as evidence. Do not retire the current `嘅` structure; retire or rename only the misleading name after compatibility migration.
- Final disposition: **quarantine** the misleading public wrapper pending versioned rename/decomposition; retain every current `嘅`-marked NP surface.
- Runtime and complete-output reach: the category template at `main.js:3520-3555` requires overt modifier, linker, and head; `main.js:5491-5500` preserves documented `啲/嘅` attachment ambiguity; NP consumers include the explicit type at `main.js:16587`.
- Checked scope and boundaries: Sio and Yu support possessive/nominal modification and warn against one linker meaning. Three positives plus two executable absence boundaries protect the current span; Lui 2026 concerns a different associative-plural form.
- Migration map: replace the label with a typed `嘅`-marked modifier/possessive NP rule; create no associative-plural runtime node in this track.
- A1/schema decision: preserve the current label for v0.5.216 compatibility; no status promotion. A future rename must version all snapshots and preserve attachment metadata.
- Unresolved work and release files: recursive modification, linker semantics, role-neutral panel evidence, and the separate associative-plural research question remain open; this note, baseline, NP documentation, and release audit record the decision.
