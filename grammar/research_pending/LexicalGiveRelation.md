---
title: "LexicalGiveRelation"
type: "canto-span-construction"
construction: "LexicalGiveRelation"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-08"
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
standard_test_file: "tests/constructions/LexicalGiveRelation.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 4
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 6
source_ids: ["SRC-BODOMO-LAM-YU-2003", "SRC-CHIN-2011-BEI", "SRC-LI-LEE-2021-DATIVE", "SRC-NGAI-2023-BEI", "SRC-WONG-2023-BEI", "SRC-XU-PEYRAUBE-1997-DOC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 6
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-08", "canto-span/workflow/archived"]
---

# LexicalGiveRelation

## Plain-language claim

Lexical Cantonese 畀/俾 can occur with two overt postverbal nominal spans; the reviewed theme-before-person profile supports bounded candidate roles, while person-before-thing order remains role-unresolved and speaker-variable.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_bounded_authority_origin_design_pending_heldout_and_native_analysis_validation`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-BODOMO-LAM-YU-2003

- Citation: [Bodomo, A., Lam, O. S. C., and Yu, K. M. 2003. Double Object and Serial Verb Constructions in Cantonese.](https://typo.uni-konstanz.de/lfg-proceedings/LFGprocCSLI/LFG2003/pdfs/lfg03bodomoetal.pdf)
- Locator: PDF pp. 2-4; examples 1-2
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The lexical bij2 example places the theme before the beneficiary/recipient.
- Limit: Do not inherit the paper's full LFG analysis or pronoun restrictions as parser rules.

### SRC-CHIN-2011-BEI

- Citation: [Chin, A. C. 2011. Grammaticalization of the Cantonese Double Object Verb [pei35] 畀 in Typological and Areal Perspectives.](https://www.lib.eduhk.hk/pure-data/pub/201710799.pdf)
- Locator: PDF p. 3
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: A modern lexical-GIVE example has NP1-bij2-theme-recipient order.
- Limit: One example does not establish frequency or exclusivity.

### SRC-LI-LEE-2021-DATIVE

- Citation: [Li, J. and Lee, P. C. 2021. Syntactic Distribution of the Semantic Classes of Dative Verbs in English and Cantonese.](https://aclanthology.org/2021.paclic-1.66/)
- Locator: pp. 628-629 and 633-635
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper distinguishes construction types and meanings rather than treating all surface orders as one derivation.
- Limit: The source does not prescribe Canto Span slots or validate the name LexicalGiveRelation.

### SRC-NGAI-2023-BEI

- Citation: [Ngai, S. 2023. Haplology of Cantonese BEI: Evidence in Production.](https://scholarworks.iu.edu/journals/index.php/iulcwp/article/download/34845/39969/100290)
- Locator: p. 16 and pp. 16-18
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The distance coefficient is nonsignificant; tokens above four syllables are sparse and postselected.
- Limit: A null result does not prove that weight never matters.

### SRC-WONG-2023-BEI

- Citation: [Wong, A. M. Y. 2023/2024. The bei Constructions in Cantonese: A Corpus-Driven Study.](https://doi.org/10.17501.23572744.2023.10106)
- Locator: pp. 98-99
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Only eight long-object corpus tokens were available, split across the two orders.
- Limit: Do not estimate a threshold or preference from the sparse cell.

### SRC-XU-PEYRAUBE-1997-DOC

- Citation: [Xu, D. and Peyraube, A. 1997. On the Double Object Construction and the Oblique Construction in Cantonese.](https://doi.org/10.1075/sl.21.1.05lie)
- Locator: pp. 105-113
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Order, lexical choice, thematic role, weight, and competing category analyses interact.
- Limit: This conservative parser policy is a project inference, not a published analysis.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_MIXED_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 6 total; 5 accepted; 1 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/LexicalGiveRelation.json`
- Evidence state: `CP021B_FROZEN_24_ROW_DESIGN_BOUNDARIES`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-authority-origin-CP021B.tsv`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
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

- current provisional checklist remains incomplete
- checked_exact_source;one_speaker_positive_negative_review;drafted_negative_boundaries;independent_evidence_beyond_parser_tests
- all_sources_reverified;all_used_corpus_hits_manually_classified;qualified_native_panel_threshold;executable_negative_boundaries;code_document_alignment;separate_implementation_and_linguistic_reporting;plain_language_claim
- Prior provisional status withdrawn until the current provisional checklist is reverified. One Guangzhou speaker supplied surface judgments only; alternative order is mixed; no native structural-analysis or human-expert validation; source claims do not establish free alternation or a weight threshold.
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by LexicalGiveRelation?
- Next evidence action: Reverify at least one exact source, confirm one independent native-speaker review of the relevant positive and negative examples, and draft boundaries before restoring provisional status.

## Related constructions

- [[CoverbFrame]]
- [[IntendedFunctionRelation]]
- [[PassivePermissiveRelation]]
- [[PostThemeParticipantRelation]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
