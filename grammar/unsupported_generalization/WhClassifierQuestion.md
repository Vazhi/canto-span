---
title: "WhClassifierQuestion"
type: "canto-span-construction"
construction: "WhClassifierQuestion"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-06"
last_reviewed: "2026-07-23"
last_status_migrated: "2026-07-21"
source_count: 3
verified_source_count: 3
panel_response_count_total: 1
eligible_panel_response_count: 0
minimum_usable_judgments_per_critical_item: 0
critical_contrast_coverage: "none"
survey_instrument_version: "pre-panel-v2-unstandardized"
survey_instrument_status: "legacy_limited"
survey_instrument_quality_resolved: false
quality_screen_status: "not_started"
panel_adjudication_status: "not_started"
recruitment_channels: []
respondent_role_neutral: false
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
code_document_review_commit: "583035c"
code_document_code_locations: ["main.js:3475-3500", "main.js:5935-5950", "main.js:19195-19225"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/WhClassifierQuestion.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 3
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 5
source_ids: ["SRC-WONG-2023-LANGUAGE-SAMPLE", "SRC-XIA-2025-CLASSIFIERS", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 4
accepted_fixtures: 3
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# WhClassifierQuestion

## Plain-language claim

The checked profile contains overt `邊 + classifier (+ noun)` nominal material in wh-in-situ questions. The outer question wrapper does not license or reconstruct a hidden noun.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-WONG-2023-LANGUAGE-SAMPLE

- Citation: [Wong, Anita Mei-Yin. 2023. Understanding Development and Disorder in Cantonese Using Language Sample Analysis. Routledge.](https://doi.org/10.4324/9780367824013)
- Locator: book p. 67; 你想要邊部車呀
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The monograph explicitly identifies 邊+CL as a which-question form and gives an overt-head example.
- Limit: Do not reduce the overt noun to a hidden complement or standalone fragment.

### SRC-XIA-2025-CLASSIFIERS

- Citation: [Xia, Hengliang. 2025. Syntax of Classifiers and Measure Words in Three Chinese Languages. Proceedings of the 2025 Annual Conference of the Canadian Linguistic Association.](https://cla-acl.ca/pdfs/actes-2025/Xia-CLA-2025.pdf)
- Locator: pp. 6-11; Cantonese classifier and measure-word distributions
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper documents structured classifier/measure-word distributions and limits on nominal composition.
- Limit: Do not generate every 邊+classifier combination because individual examples exist.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: user PDF p. 134 (printed p. 112); 佢哋想要邊張枱呀
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The exercise uses 邊張枱 with an overt table noun.
- Limit: Do not infer a dedicated standalone WhClassifierQuestion node from the embedded NP.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/WhClassifierQuestion.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `tests/fixtures/regression-snapshots.json`

## Implementation state

- Lifecycle: `runtime_referenced_with_accepted_fixtures`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `pending_current_definition_of_done_line_by_line_review`

## Open questions and blockers

- no explicit external claim-source edge
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by WhClassifierQuestion?

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: Cantonese-language profile requiring narrow evidence-faithful scope
- Research finding: `SRC-WONG-2023-LANGUAGE-SAMPLE`; `SRC-XIA-2025-CLASSIFIERS`; coursebook evidence directly support `邊 + classifier + noun` with wh-in-situ.
- Recommended disposition: Move the wh-classifier NP into the NP subsystem and compose it with question structure; preserve overt-head and headless distinctions.
- Retirement safeguard: Strong retirement veto on the source-backed nominal profile; only a redundant question wrapper may disappear.
- Final disposition: **quarantine** the question-level wrapper and **decompose/replace** it with wh-classifier NP plus an independently typed question layer.
- Runtime and complete-output reach: `main.js:3475-3500` defines the headless template; `main.js:5935-5950` implements the bounded `邊間呀` fragment; complete-output consumers are enumerated at `main.js:19195-19225`.
- Checked scope and boundaries: Wong, Xia, and the coursebook support overt-head `邊 + classifier + noun` and wh-in-situ. Three positives and two question-family boundaries protect the profile without licensing every classifier combination.
- Migration map: distinguish overt-head and genuinely headless NP subtypes, preserve the wh nominal role, and compose question force outside the NP.
- A1/schema decision: preserve the compatibility wrapper at `unsupported_generalization` for v0.5.216; no hidden noun or status promotion.
- Unresolved work and release files: headless licensing, classifier compatibility, question composition, corpus review, and clean panel evidence remain open; this note, NP documentation, baseline, and release audit record the decision.
