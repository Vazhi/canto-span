---
title: "OrdinalClassifierNP"
type: "canto-span-construction"
construction: "OrdinalClassifierNP"
status: "unsupported_generalization"
confidence: "headed_runtime_profile_headless_and_lexical_sense_split_required"
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
code_document_review_commit: "working-tree-v0.5.213-r3"
code_document_code_locations: ["main.js:579-581", "main.js:2038-2050", "main.js:3520-3536"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/OrdinalClassifierNP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 1
standard_implementation_probe_count: 1
standard_executable_test_count: 3
source_ids: ["SRC-LAM-LAU-LEE-2024-SEGMENTATION", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 12
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# OrdinalClassifierNP

## Plain-language claim

Checked evidence distinguishes true ordinal determination from lexicalized or contextual `第二` expressions meaning next, another, or other. The runtime retains its headed ordinal + classifier + noun path, while source-attested headless `第二個` choice uses do not enter `OrdinalClassifierNP`.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `headed_runtime_profile_headless_and_lexical_sense_split_required`
- Current action: `retain_headed_runtime_path_and_keep_headless_ordinal_versus_alternative_split_explicit`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-23

## Sources

### SRC-LAM-LAU-LEE-2024-SEGMENTATION

- Citation: [Lam, Charles, Chaak Ming Lau, and Jackson L. Lee. 2024. Multi-Tiered Cantonese Word Segmentation. Proceedings of LREC-COLING 2024, 11993-12002.](https://aclanthology.org/2024.lrec-main.1047/)
- Locator: PDF p. 5 section 4.4.3; 第-二-隻
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: 第-二-隻 is glossed “second one”, with the omitted referent constrained by classifier compatibility.
- Limit: Do not require an overt head noun or invent the omitted referent.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: printed p. 44; 第二個禮拜, 問第二個, 有冇第二啲嘢, 第二時
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The coursebook explicitly says these 第二 nominal structures do not express ordinal sequencing.
- Limit: Do not label every 第二 as “second” or treat lexicalized next/other uses as ordinals.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/OrdinalClassifierNP.json`
- Evidence state: `source_linked_headless_ordinal_positive_plus_nonordinal_second_go_boundary`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `v0.5.213_r3_headed_and_bounded_headless_profiles`
- Visible/focused tests: `1_source_linked_headless_positive_and_1_nonordinal_boundary`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `PASS_FOR_HEADED_PATH_AND_NONORDINAL_SECOND_GO_BOUNDARY`

## Open questions and blockers

- The current headed `第二 + classifier + noun` runtime path remains implementation-only.
- Published `第二隻` now has a bounded headless ordinal-classifier implementation; broader classifier compatibility and context licensing remain unresolved.
- Coursebook `問第二個` and `搵第二個都得` support a nonordinal “another/other one” profile and must not be admitted to `OrdinalClassifierNP` from token identity alone.

## Related constructions

- [[DiMarkedNP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## CP037 implementation reachability

- Implementation-only reachability: `NOMWRAP-001` with `第二個故仔。`
- The probe protects the exact current ordinal + classifier + overt-head wrapper.
- Its linguistic evidence weight is **0**; it does not generalize lexicalized `第二` uses or establish productive ordinal semantics.

## v0.5.213-r3 lexical-sense boundary

- Headless `第二個` is tokenized as a contextual choice NP only when no overt nominal head follows.
- `搵第二個都得` therefore feeds ordinary action-object composition and the bounded `AcceptabilityClause` matcher without asserting ordinal semantics.
- Before an overt noun, as in `第二個故仔`, the parser still exposes `第二` + `個` + `故仔` and retains the existing `OrdinalClassifierNP` implementation path.
- This lexical-sense boundary remains separate from the independently attested true headless ordinal `第二隻` implemented below.

## v0.5.213-r3 bounded headless ordinal

- Published `第二隻` is an executable positive for `OrdinalClassifierNP`.
- The node preserves overt `第二` and `隻`, records a headless subtype, and inserts no nominal head or referent.
- The matcher is surface-bounded to `第二隻`; it does not license arbitrary ordinal-classifier ellipsis.
- `問第二個` is an executable absence boundary for the nonordinal “another/other one” use.
