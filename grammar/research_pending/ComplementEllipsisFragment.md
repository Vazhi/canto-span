---
title: "ComplementEllipsisFragment"
type: "canto-span-construction"
construction: "ComplementEllipsisFragment"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-04"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
source_count: 6
verified_source_count: 6
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
standard_test_file: "tests/constructions/ComplementEllipsisFragment.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 5
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 7
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-CHENG-2022-HAI6-RESPONSE", "SRC-LEE-PAN-2024-VP-ELLIPSIS", "SRC-LUKE-NANCARROW-1998-AUXILIARIES", "SRC-YIP-MATTHEWS-2000-SYNTACTIC-TRANSFER", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 7
accepted_fixtures: 5
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-04", "canto-span/workflow/archived"]
---

# ComplementEllipsisFragment

## Plain-language claim

Cantonese may instantiate the structural family represented by ComplementEllipsisFragment; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-ALDERETE-ETAL-2017-SYNOPSIS

- Citation: [Alderete, John, Queenie Chan, Macarius Chan, Gloria Fan, and Olivia Nickel. 2017. Cantonese Grammar Synopsis.](https://www.sfu.ca/~alderete/pubs/aldereteEtal2017_cantgsyn2017-10-31.pdf)
- Locator: printed p. 42 and inherited cognition-predicate examples
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The synopsis treats cognition predicates including 覺得 as taking a proposition.
- Limit: Do not infer exact complement ellipsis from general proposition selection.

### SRC-CHENG-2022-HAI6-RESPONSE

- Citation: [Cheng, Lisa Lai-Shen. 2022. Response particles hai6 in Cantonese. Journal of Chinese Linguistics 50(2): 532-544.](https://cup.cuhk.edu.hk/image/catalog/journal/jpreview/JCL_50.2_532-544NEW.pdf)
- Locator: pp. 532-533, examples (1)-(2), and official abstract
- Verification: `VERIFIED_OFFICIAL_PUBLISHER_PREVIEW_AND_METADATA`
- What it supports: 係 is analyzed as a positive response particle with 唔係 as its negative counterpart; exact 係啊 responses are documented.
- Limit: Do not classify every syntactic 係 or 唔係 as a response particle.

### SRC-LEE-PAN-2024-VP-ELLIPSIS

- Citation: [Lee, Tommy Tsz-Ming, and Victor Junnan Pan. 2024. Licensing VP Movement and Ellipsis in Mandarin and Cantonese. Proceedings of the 40th West Coast Conference on Formal Linguistics, 192-201.](https://www.lingref.com/cpp/wccfl/40/paper3711.pdf)
- Locator: pp. 193-196
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT_AND_METADATA`
- What it supports: The paper’s licensing examples involve aspectual/perfective 有/冇 with an elided VP, not an unspecified existential nominal domain.
- Limit: Do not collapse all 有/冇 ellipsis into one existential construction.

### SRC-LUKE-NANCARROW-1998-AUXILIARIES

- Citation: [Luke, K. K. and O. T. Nancarrow. 1998. Auxiliary Verbs in Cantonese. In Stephen Matthews (ed.), Studies in Cantonese Linguistics. Hong Kong: Linguistic Society of Hong Kong.](https://lshk.org/wp-content/uploads/2022/11/STUDIES-IN-CANTONESE-LINGUISTICS.pdf)
- Locator: printed pp. 81-98, especially sections 2-3
- Verification: `VERIFIED_SCHOLARLY_FULL_TEXT_SCAN`
- What it supports: Core auxiliaries generally do not take NP objects or stand alone except where an understood complement is licensed.
- Limit: Do not extend auxiliary behavior to copulas, existential predicates, or every action verb.

### SRC-YIP-MATTHEWS-2000-SYNTACTIC-TRANSFER

- Citation: [Yip, Virginia, and Stephen Matthews. 2000. Syntactic transfer in a Cantonese–English bilingual child. Bilingualism: Language and Cognition 3(3):193-208. DOI: 10.1017/S136672890000033X.](https://talkbank.org/childes/access/Biling/0docs/Yip2000.pdf)
- Locator: article pp. 195-196, example (5)
- Verification: `VERIFIED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The reply 我鍾意 omits an object whose referent is supplied by the preceding discourse.
- Limit: Do not adopt the paper’s null-topic representation as the parser’s only ontology.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: printed p. 219, 傳意項目介紹：同意
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The table pairs an assertion with 係呀 as agreement and gives 我就話唔係喎 as disagreement.
- Limit: Do not infer corpus frequency, universal final-particle interchangeability, or embedded 覺得 compatibility.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ComplementEllipsisFragment.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ComplementEllipsisFragment?

## Related constructions

- [[FragmentAnswer]]
- [[FragmentQuestion]]
- [[IdentificationFragment]]
- [[LocativeFragment]]
- [[NegatedExistentialFragment]]
- [[NegativeCognitionFragment]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
