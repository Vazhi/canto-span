---
title: "ConditionalClause"
type: "canto-span-construction"
construction: "ConditionalClause"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-02"
last_reviewed: "2026-07-23"
last_status_migrated: "2026-07-21"
source_count: 4
verified_source_count: 4
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
code_document_reconciled: false
code_document_review_date: null
code_document_review_commit: null
code_document_code_locations: []
current_standard_reaudit_complete: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/ConditionalClause.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 4
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 6
source_ids: ["SRC-CHENG-2023-TP-SFP-CONDITIONAL", "SRC-IIDA-2009-CONDITIONAL-GE3", "SRC-LIANG-MAI-2025-GRAMMAR-CODING", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 5
accepted_fixtures: 4
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-02", "canto-span/workflow/archived"]
---

# ConditionalClause

## Plain-language claim

Cantonese may instantiate the structural family represented by ConditionalClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHENG-2023-TP-SFP-CONDITIONAL

- Citation: [Cheng, Siu-Pong. 2023. Cantonese Sentence-final Particles Pertaining to the TP Domain. Current Research in Chinese Linguistics 102(1):81-100.](https://cuhk.edu.hk/ics/clrc/crcl_102_1/cheng.pdf)
- Locator: pp. 91-92, examples 13-16
- Verification: `VERIFIED_FULL_TEXT_AND_OFFICIAL_JOURNAL_PDF`
- What it supports: The tendency is explicitly stated for the author’s accent and some informants, and the paper calls for future research.
- Limit: Do not impose a categorical indicative/counterfactual parser rule across speakers.

### SRC-IIDA-2009-CONDITIONAL-GE3

- Citation: [Iida, Maki. 2009. The Conditional Marker “ge3” in Cantonese [粵語的條件分句標記“嘅”]. Media and Communication Studies 57:21-33.](https://cir.nii.ac.jp/crid/1050587981436942848)
- Locator: official abstract, final comparison
- Verification: `VERIFIED_OFFICIAL_METADATA_AND_ABSTRACT`
- What it supports: Bare 嘅 is described as less grammaticalized and retaining stronger generic/law-like semantic and syntactic constraints.
- Limit: Do not infer that every 嘅話 conditional is generic or every generic clause uses bare 嘅.

### SRC-LIANG-MAI-2025-GRAMMAR-CODING

- Citation: [Liang, Yuqing and Mai, Ziyin. 2025. Supplementary materials for Grammatical development of the native L1 in Cantonese-English bilingual children: early costs and long-term gains. Bilingualism: Language and Cognition.](https://static.cambridge.org/content/id/urn%3Acambridge.org%3Aid%3Aarticle%3AS1366728925100412/resource/name/S1366728925100412sup001.pdf)
- Locator: category 59, PDF p. 11
- Verification: `VERIFIED_FULL_TEXT_SUPPLEMENT`
- What it supports: 如果病咗，就要去睇醫生 overtly contains an antecedent followed by a distinct 就-marked consequent.
- Limit: Do not insert a hidden result or treat a result-less antecedent as a complete condition-result pair.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: printed p. 188
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: 唔啱心水嘅，就儘快去叩門 is translated conditionally: if it is not satisfactory, then promptly try another school.
- Limit: Do not infer unrestricted bare-嘅 productivity or treat the textbook translation as a unique syntactic analysis.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ConditionalClause.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `test-data/pre-intermediate-gold-corpus.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ConditionalClause?

## Related constructions


## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: Cantonese-language profile requiring narrow evidence-faithful scope
- Research finding: Four verified source records plus extensive `UC-RQ-*` and `PRQ2-*` clause-relation packages. Existing research distinguishes conditional markers, relation members, and marker-specific subtypes.
- Recommended disposition: Retain narrow source-backed conditional subtypes while using `ClauseRelationEdge`/`Graph` as internal infrastructure. Avoid one undifferentiated optional-slot wrapper.
- Retirement safeguard: Strong retirement veto: conditionality is well established. Only redundant wrapper labels may retire after subtype and A1 migration.
- Status effect: This note-only research sweep does not promote or retire the label. The current status remains unchanged until runtime, contract, and release records are reconciled in the implementation track.
