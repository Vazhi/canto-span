---
title: "AB15 DemonstrativeClassifierNounNP"
type: "canto-span-construction"
construction: "OvertHeadDemonstrativeClassifierNP"
construction_uuid: "4f6df953-62d1-5036-80b3-40bc8f02937e"
construction_code: "AB15"
canonical_name: "DemonstrativeClassifierNounNP"
legacy_runtime_label: "OvertHeadDemonstrativeClassifierNP"
status: "research_pending"
confidence: "primary_source_supported_structural_boundaries_runtime_aligned"
claim_layer: "language"
lane: "LANE-06"
last_reviewed: "2026-07-31"
last_status_migrated: "2026-07-21"
source_count: 7
verified_source_count: 7
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
negative_boundary_inventory_complete: true
corpus_evidence_used: true
corpus_hits_reviewed: true
corpus_candidate_hit_count: 5
corpus_genuine_hit_count: 5
corpus_false_positive_count: 0
corpus_ambiguous_hit_count: 0
corpus_unusable_hit_count: 0
code_document_reconciled: true
code_document_review_date: "2026-07-31"
code_document_review_commit: null
code_document_code_locations: []
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
source_verification_file: "docs/research/AB15-CLASSIFIER-NP-PRIMARY-SOURCE-LEDGER-R1.tsv"
standard_test_file: "tests/constructions/OvertHeadDemonstrativeClassifierNP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 30
standard_boundary_test_count: 6
standard_implementation_probe_count: 0
standard_executable_test_count: 38
source_ids: ["SRC-BOND-SIO-2024-CLASSIFIERS", "SRC-CHENG-SYBESMA-2014-NP-STRUCTURE", "SRC-MATTHEWS-YIP-COMPREHENSIVE-CH6", "SRC-XIA-2025-CLASSIFIERS", "SRC-TSE-LI-LEUNG-2007-CLASSIFIER-ACQUISITION", "SRC-ERBAUGH-2013-CLASSIFIER-DISCOURSE", "SRC-NAGY-LO-2019-CANTONESE-CLASSIFIERS"]
runtime_active: true
workflow_state: "active"
workflow_priority: 2
workflow_since: "2026-07-21"
workflow_reason: "structural_source_audit_complete_panel_and_item_level_choice_evidence_pending"
runtime_code_references: 14
accepted_fixtures: 30
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# AB15 DemonstrativeClassifierNounNP

## Canonical identity

- Construction UUID: `4f6df953-62d1-5036-80b3-40bc8f02937e`
- Permanent identity: `AB15 DemonstrativeClassifierNounNP`
- Legacy runtime label: `OvertHeadDemonstrativeClassifierNP`
- Linguistic status: `research_pending` (unchanged)

## Plain-language claim

Primary sources support a narrow no-numeral Cantonese noun-phrase profile with an overt demonstrative, overt classifier, and overt nominal head. The runtime may represent exactly those visible components as AB15. It must not insert a hidden numeral or noun, delete an overt numeral, absorb a modifier-bearing phrase into AB15, or infer item-level classifier compatibility from the structural template.

A source analysis assigning semantic cardinality one does not license an unpronounced numeral in the parser tree.

## Verified source audit

The proposition-level ledger is `docs/research/AB15-CLASSIFIER-NP-PRIMARY-SOURCE-LEDGER-R1.tsv`. The accepted synthesis is `docs/research/AB15-DEMONSTRATIVE-CLASSIFIER-NOUN-SCOPE-R1.md`.

Seven verified source records support the structural core and its limits. Bond and Sio distinguish D-(X)-C-N, X-C-N, and C-N profiles. Cheng and Sybesma permit numeral omission after a demonstrative while requiring the overt classifier in the ordinary headed profile and treating noun ellipsis separately. Matthews and Yip directly attest multiple no-numeral Dem-CL-N examples. The remaining sources document classifier/measure distinctions, general-classifier use, alternatives, and population or discourse variation; they do not define a universal pair-level compatibility table.

## Executable boundary matrix

| Surface/profile | Runtime disposition |
|---|---|
| `呢本書`, `嗰間餐廳` | direct AB15: overt Dem + CL + N, no overt numeral |
| `呢三本書` | existing demonstrative-bearing composition containing an overt `QuantifiedClassifierNP`; numeral retained; not AB15 |
| `呢個` | headless demonstrative-classifier sibling; no hidden noun; not AB15 |
| `本書` | established bare classifier-noun NP behavior; no hidden demonstrative or numeral; not AB15 |
| `三本書` | existing `QuantifiedClassifierNP`; not AB15 |
| `呢書` | outside AB15; no hidden-classifier repair |
| `嗰間新開嘅意大利餐廳` | transparent modifier-bearing `ModifiedNP`; demonstrative, classifier, modifier, `嘅`, nominal modifier, and head noun retained; not AB15 |

Classifier versus measure-word typing and item-level classifier–noun choice remain separate evidence questions. Absence from the current compatibility table is not categorical ungrammaticality.

## Implementation state

- The existing narrow AB15 template remains unchanged.
- New exact modifier-bearing `ModifiedNP` compositions preserve every overt component and prevent the longer phrase from flattening into AB15.
- Existing bare classifier-noun and quantified-classifier runtime behavior is preserved rather than retyped.
- Missing-classifier strings remain outside AB15 with no repair.
- The twelve-rule unit-word evidence model and classifier-head compatibility arrays are unchanged.
- Parser tests establish implementation behavior only and add no independent linguistic evidence.

## Panel, corpus, and promotion limits

The single historical speaker record is not a clean role-neutral panel. The older HKCanCor examples remain occurrence evidence, not a productivity estimate. No clean panel threshold, held-out gate, frequency claim, dialect-wide naturalness claim, or status promotion is established.

## Open questions

- The merged bounded pair review in `docs/research/OBSERVED-UNIT-WORD-NOUN-MISMATCH-MATRIX-R1.md` records pair-specific evidence and unresolved choices without authorizing further runtime changes.
- `呢啲魚`, `呢班人`, alternative classifiers, mensural profiles, and discourse-conditioned choices require separate item/profile analysis.
- Clean role-neutral panel evidence and held-out validation remain incomplete.
