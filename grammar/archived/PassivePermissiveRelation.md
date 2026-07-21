---
title: "PassivePermissiveRelation"
type: "canto-span-construction"
construction: "PassivePermissiveRelation"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-01"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 0
source_count: 6
verified_source_count: 6
independent_speaker_count: 0
same_contrast_independent_speaker_count: 0
native_positive_contrasts_reviewed: false
native_negative_contrasts_reviewed: false
negative_cases_drafted: true
negative_tests_executable: false
negative_tests_passing: false
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
promotion_gate_version: "v2"
standard_test_file: "tests/constructions/PassivePermissiveRelation.json"
standard_test_coverage: "no_direct_cases"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_executable_test_count: 0
source_ids: ["SRC-BODOMO-LAM-YU-2003", "SRC-CHAN-2021-BEI", "SRC-CHIN-2011-BEI", "SRC-CHOW-2018-INDIRECT-PASSIVE", "SRC-CHOW-2019-PASSIVE-PERMISSIVE", "SRC-WONG-2023-BEI"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 4
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-01", "canto-span/workflow/archived"]
---

# PassivePermissiveRelation

## Plain-language claim

Cantonese 畀/俾 sequences can realize canonical passive, retained-object indirect passive, or permissive let/allow readings; some NP1 畀 NP2 VP strings remain contextually ambiguous.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_narrow_transparent_passive_permissive_relation_pending_rendered_and_native_analysis_validation`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-BODOMO-LAM-YU-2003

- Citation: [Bodomo, A., Lam, O. S. C., and Yu, K. M. 2003. Double Object and Serial Verb Constructions in Cantonese.](https://typo.uni-konstanz.de/lfg-proceedings/LFGprocCSLI/LFG2003/pdfs/lfg03bodomoetal.pdf)
- Locator: PDF pp. 2-5; examples 1-2, 5, and 10
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper contrasts lexical transfer 畀 with serial/benefactive 畀 forms.
- Limit: Boundary evidence does not validate every current exclusion guard.

### SRC-CHAN-2021-BEI

- Citation: [Chan, K. L. 2021. Bei2 as a Causative and Passive Marker in Cantonese.](https://icu.repo.nii.ac.jp/record/5045/files/Bei2asacausativeandpassivemarkerinCantonese.pdf)
- Locator: paper examples and six-consultant study
- Verification: `VERIFIED_PDF_BOUNDARY`
- What it supports: A small independent study documents causative and passive readings for the same form.
- Limit: Six consultants do not establish exhaustive diagnostics or population rates.

### SRC-CHIN-2011-BEI

- Citation: [Chin, A. C. 2011. Grammaticalization of the Cantonese Double Object Verb [pei35] 畀 in Typological and Areal Perspectives.](https://www.lib.eduhk.hk/pure-data/pub/201710799.pdf)
- Locator: PDF pp. 3-14
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Lexical GIVE, beneficiary, causative/permissive, and passive functions are explicitly distinguished.
- Limit: Do not infer that the source's categories are exhaustive or computationally deterministic.

### SRC-CHOW-2018-INDIRECT-PASSIVE

- Citation: [Chow, P. L. 2018. The Malefactive Topic Role in Cantonese Indirect Passives.](https://web.stanford.edu/group/cslipublications/cslipublications/LFG/LFG-2018/lfg2018-chow.pdf)
- Locator: PDF pp. 5-9
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Only 4 indirect passives occur among 61 passive 畀 sentences; the paper argues for topic/malefactive restrictions.
- Limit: Do not treat the 4/61 result as a population prevalence estimate or impose the full formal analysis categorically.

### SRC-CHOW-2019-PASSIVE-PERMISSIVE

- Citation: [Chow, P. L. 2019. Passive and Permissive Constructions in Cantonese: An LFG Account.](https://hub.hku.hk/handle/10722/280875)
- Locator: repository abstract
- Verification: `VERIFIED_OFFICIAL_ABSTRACT`
- What it supports: The dissertation abstract describes indirect passive as an object-in-situ construction distinct from permissive 畀.
- Limit: Do not use unverified chapter details or treat the abstract as an independent author family.

### SRC-WONG-2023-BEI

- Citation: [Wong, A. M. Y. 2023/2024. The bei Constructions in Cantonese: A Corpus-Driven Study.](https://doi.org/10.17501.23572744.2023.10106)
- Locator: pp. 102-103
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Causative and passive corpus classes share bei-NP-VP and are classified using context.
- Limit: The analyst taxonomy is not a context-free parser decision procedure.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/PassivePermissiveRelation.json`
- Evidence state: `CP020_FROZEN_DESIGN_AND_HELDOUT_BOUNDARIES`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-claim-source-edges-CP021A.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `runtime_referenced_without_accepted_fixtures`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `CP020_FROZEN_60_ROW_HEADLESS_REVIEW_PENDING_RENDERED_ACCEPTANCE`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `pending_current_definition_of_done_line_by_line_review`

## Open questions and blockers

- legacy claim was not demonstrably derived from the recorded sources; reconstruct the claim from screened propositions first
- checked_exact_source;one_speaker_positive_negative_review;drafted_negative_boundaries;independent_evidence_beyond_parser_tests
- all_sources_reverified;all_used_corpus_hits_manually_classified;two_independent_speakers;executable_negative_boundaries;code_document_alignment;separate_implementation_and_linguistic_reporting;plain_language_claim
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by PassivePermissiveRelation?
- Next evidence action: Reverify at least one exact source, confirm one independent native-speaker review of the relevant positive and negative examples, and draft boundaries before restoring provisional status.

## Related constructions

- [[CoverbFrame]]
- [[IntendedFunctionRelation]]
- [[LexicalGiveRelation]]
- [[PostThemeParticipantRelation]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
