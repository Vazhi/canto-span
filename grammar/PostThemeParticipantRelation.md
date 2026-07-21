---
title: "PostThemeParticipantRelation"
type: "canto-span-construction"
construction: "PostThemeParticipantRelation"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-01"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 5
source_ids: ["SRC-BODOMO-LAM-YU-2003", "SRC-CHIN-2011-BEI", "SRC-LI-LEE-2021-DATIVE", "SRC-WONG-2023-BEI", "SRC-XU-PEYRAUBE-1997-DOC"]
runtime_active: true
runtime_code_references: 5
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-01"]
---

# PostThemeParticipantRelation

## Plain-language claim

Reviewed Cantonese predicate-theme-畀/俾-person surfaces preserve an overt post-theme participant whose exact role depends on the upstream predicate and context; no single recipient or beneficiary role is entailed.

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
- Locator: PDF pp. 5-9; proceedings pp. 62-67
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The serial examples and formal analysis treat the overt verbs as structurally material.
- Limit: No source proves that all omitted material is impossible in discourse.

### SRC-CHIN-2011-BEI

- Citation: [Chin, A. C. 2011. Grammaticalization of the Cantonese Double Object Verb [pei35] 畀 in Typological and Areal Perspectives.](https://www.lib.eduhk.hk/pure-data/pub/201710799.pdf)
- Locator: PDF pp. 5-10
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper reviews the preposition/serial-verb debate and uses valency/aspect diagnostics.
- Limit: Do not transfer a diachronic pathway directly into parser hierarchy.

### SRC-LI-LEE-2021-DATIVE

- Citation: [Li, J. and Lee, P. C. 2021. Syntactic Distribution of the Semantic Classes of Dative Verbs in English and Cantonese.](https://aclanthology.org/2021.paclic-1.66/)
- Locator: pp. 633-635
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Dative predicate classes and construction meanings differ; the double-object form is not simple marker deletion.
- Limit: Do not collapse caused possession, transfer possession, and caused motion.

### SRC-WONG-2023-BEI

- Citation: [Wong, A. M. Y. 2023/2024. The bei Constructions in Cantonese: A Corpus-Driven Study.](https://doi.org/10.17501.23572744.2023.10106)
- Locator: pp. 101-102
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The corpus class explicitly includes V-theme-bij2-NP-V with a final verb.
- Limit: The paper does not prescribe Canto Span's exact token guards or hidden-argument policy.

### SRC-XU-PEYRAUBE-1997-DOC

- Citation: [Xu, D. and Peyraube, A. 1997. On the Double Object Construction and the Oblique Construction in Cantonese.](https://doi.org/10.1075/sl.21.1.05lie)
- Locator: pp. 110-113
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper favors a prepositional analysis and discusses marker deletion.
- Limit: Do not encode PREPOSITION as settled fact.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 5 total; 5 accepted; 0 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

## Negative and boundary cases

- Evidence state: `CP021B_FROZEN_24_ROW_DESIGN_BOUNDARIES`
- Executable or review records containing this label:
  - `test-data/grammar-authority-origin-CP021B.tsv`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

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
- all_sources_reverified;all_used_corpus_hits_manually_classified;two_independent_speakers;executable_negative_boundaries;code_document_alignment;separate_implementation_and_linguistic_reporting;plain_language_claim
- Prior provisional status withdrawn until the current provisional checklist is reverified. Surface attestation is stronger than category evidence; competing analyses remain unresolved; the post-marker participant has no asserted recipient beneficiary goal agent or source role. Source-family identifiers XU_PEYRAUBE_1997 and WONG_2023_2024 correct earlier year-only metadata errors; no evidence claim changed.
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by PostThemeParticipantRelation?
- Next evidence action: Reverify at least one exact source, confirm one independent native-speaker review of the relevant positive and negative examples, and draft boundaries before restoring provisional status.

## Related constructions

- [[CoverbFrame]]
- [[IntendedFunctionRelation]]
- [[LexicalGiveRelation]]
- [[PassivePermissiveRelation]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
