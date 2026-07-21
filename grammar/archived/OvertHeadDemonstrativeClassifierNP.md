---
title: "OvertHeadDemonstrativeClassifierNP"
type: "canto-span-construction"
construction: "OvertHeadDemonstrativeClassifierNP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-06"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 5
verified_source_count: 5
independent_speaker_count: 1
same_contrast_independent_speaker_count: 0
native_positive_contrasts_reviewed: false
native_negative_contrasts_reviewed: false
negative_cases_drafted: true
negative_tests_executable: false
negative_tests_passing: false
negative_boundary_inventory_complete: false
corpus_evidence_used: true
corpus_hits_reviewed: true
corpus_candidate_hit_count: 5
corpus_genuine_hit_count: 5
corpus_false_positive_count: 0
corpus_ambiguous_hit_count: 0
corpus_unusable_hit_count: 0
code_document_reconciled: true
code_document_review_date: null
code_document_review_commit: null
code_document_code_locations: []
current_standard_reaudit_complete: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v2"
standard_test_file: "tests/constructions/OvertHeadDemonstrativeClassifierNP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 30
standard_boundary_test_count: 0
standard_executable_test_count: 30
source_ids: ["SRC-BOND-SIO-2024-CLASSIFIERS", "SRC-LAM-LAU-LEE-2024-SEGMENTATION", "SRC-XIA-2025-CLASSIFIERS", "SRC-YU-2006-NOMINAL-MODIFIERS", "SRC-HKCANCOR-PYCANTONESE-CP024-DEMO01"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 14
accepted_fixtures: 30
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# OvertHeadDemonstrativeClassifierNP

## Plain-language claim

Reviewed sources and natural examples support overt demonstrative–classifier–noun sequences. Exact productivity, classifier compatibility, and boundaries remain research pending; no active DEMO01 promotion candidate exists.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_as_np_subsystem_structure_without_active_demo01_candidate`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-BOND-SIO-2024-CLASSIFIERS

- Citation: [Bond, Francis and Joanna Ut-Seong Sio. 2024. A Construction-based Approach to Cantonese Classifiers. Proceedings of the 31st International Conference on Head-Driven Phrase Structure Grammar, 60-75.](https://doi.org/10.21248/hpsg.2024.4)
- Locator: pp. 61-66; Table 1; examples 1-3
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Four Cantonese NP schemata D-(X)-C-N, X-C-N, C-N, and N; classifier cardinality and cognitive-status distinctions; implemented HPSG analysis.
- Limit: The HPSG analysis is one explicit formalization, not a settled universal ontology; its semantic type hierarchy should not be imported wholesale into Canto Span.

### SRC-LAM-LAU-LEE-2024-SEGMENTATION

- Citation: [Lam, Charles, Chaak Ming Lau, and Jackson L. Lee. 2024. Multi-Tiered Cantonese Word Segmentation. Proceedings of LREC-COLING 2024, 11993-12002.](https://aclanthology.org/2024.lrec-main.1047/)
- Locator: pp. 11997-11999; PDF p. 5 section 4.4.3 examples 第-一 and 第-二-隻; classifier/NP and noun-ellipsis sections; PDF pp. 5-6 sections 4.5.2 and 4.6
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Overt segmentation of classifier NPs and noun ellipsis; ordinals with 第 treated as determiners, including classifier-headed noun ellipsis; distinction between verbal possessive 有 and existential-marker 有; degree modifiers and opaque lexical adjective units.
- Limit: The paper specifies a word-segmentation annotation scheme rather than a complete syntax or semantics. Its segmentation decisions corroborate overt boundaries but do not establish all ordinal readings, argument structures, ellipsis licensing, or parser nodes.

### SRC-XIA-2025-CLASSIFIERS

- Citation: [Xia, Hengliang. 2025. Syntax of Classifiers and Measure Words in Three Chinese Languages. Proceedings of the 2025 Annual Conference of the Canadian Linguistic Association.](https://cla-acl.ca/pdfs/actes-2025/Xia-CLA-2025.pdf)
- Locator: pp. 1, 6-11; Table 1; examples 13-15; Figures 2-3
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Cantonese Num-CL-N, Dem-CL-N, bare CL-N, Poss-CL-N distribution; coordination and noun-ellipsis diagnostics; limits on inserting jat1.
- Limit: Comparative judgments and the proposed right-branching analysis are author analyses; use distributional contrasts as evidence but retain competing structural analyses.

### SRC-YU-2006-NOMINAL-MODIFIERS

- Citation: [Yu, Dominic. 2006. Relative clauses and nominal modifiers in Cantonese. Unpublished research paper, University of California, Berkeley.](https://linguistics.berkeley.edu/~dom/cantonese-rc.pdf)
- Locator: pp. 3-7; examples 3, 9, and 11-12
- Verification: `VERIFIED_FULL_TEXT_CORROBORATIVE`
- What it supports: Cantonese nominal order, possessive classifier phrases, demonstrative-classifier phrases, and headless demonstrative+classifier NPs.
- Limit: Not peer reviewed and partly theoretical; use only as corroboration or narrow evidence for explicitly illustrated forms, never as sole authority for productivity.

### SRC-HKCANCOR-PYCANTONESE-CP024-DEMO01

- Citation: HKCanCor recordings preserved through the project PyCantonese 5.0.0 evidence distribution
- Locator: FC-020_v.cha turn 445; FC-026_v2.cha turn 234; FC-046_v2.cha turn 117; FC-108c_v2.cha turn 348; FC-R017_v.cha turn 225
- Verification: `MANUALLY_REVIEWED_FIVE_RECORDS`
- What it supports: Five overt demonstrative-classifier-noun spans from five recording files and participant records.
- Limit: One corpus collection; incidental retrieval inventory; no frequency inference, arbitrary classifier-head compatibility, silent numeral, headless form, or unique syntactic theory.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 6 total; 6 accepted; 0 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `FROZEN_BY_USER_NOT_WAIVED`.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/OvertHeadDemonstrativeClassifierNP.json`
- Evidence state: `source_linked_visible_packet_headless_overt_numeral_di_wh_and_incomplete_boundaries`
- Executable or review records containing this label:
  - `test-data/grammar-authority-origin-CP021B.tsv`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-claim-source-edges-CP021A.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `tests/fixtures/np-subsystem.json`

## Implementation state

- Lifecycle: `shared_np_subsystem_component_no_active_demo01_candidate`
- Visible/focused tests: `NP_SUBSYSTEM_TESTED_WITH_COMPATIBLE_AND_INCOMPATIBLE_CLASSIFIER_HEADS`
- Render review: `NOT_APPLICABLE_NO_ACTIVE_PROMOTION_CANDIDATE`
- Held-out evaluation: `NOT_APPLICABLE_DEMO01_ABANDONED_UNUSED`
- Regression: `545_of_545_pass`
- Code–documentation comparison: `ALIGNED_AS_RESEARCH_PENDING_SHARED_NP_COMPONENT`

## Open questions and blockers

- current provisional checklist remains incomplete
- checked_exact_source;one_speaker_positive_negative_review;drafted_negative_boundaries;independent_evidence_beyond_parser_tests
- all Definition of Done linguistic gates; no active promotion candidate; second-speaker work frozen
- DEMO01 promotion, render, and held-out work was abandoned in v0.5.184. Prior evidence remains provenance for a research-pending shared NP component only. Classifier-head compatibility is bounded; no active promotion candidate or held-out claim remains.
- DEMO01 is abandoned. The reusable structural component remains research_pending; no render or held-out promotion track is active.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by OvertHeadDemonstrativeClassifierNP?
- Next evidence action: No DEMO01 action. Maintain the component through shared NP-subsystem tests; reopen linguistic promotion only by explicit future decision.

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
