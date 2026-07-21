---
title: "PossessiveClassifierNP"
type: "canto-span-construction"
construction: "PossessiveClassifierNP"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-06"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 0
source_count: 3
verified_source_count: 3
independent_speaker_count: 0
negative_cases_drafted: false
negative_tests_executable: false
negative_tests_passing: false
corpus_evidence_used: false
corpus_hits_reviewed: false
code_document_reconciled: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v1"
source_ids: ["SRC-LAM-LAU-LEE-2024-SEGMENTATION", "SRC-XIA-2025-CLASSIFIERS", "SRC-YU-2006-NOMINAL-MODIFIERS"]
runtime_active: true
runtime_code_references: 4
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-06"]
---

# PossessiveClassifierNP

## Plain-language claim

Cantonese may instantiate the structural family represented by PossessiveClassifierNP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LAM-LAU-LEE-2024-SEGMENTATION

- Citation: [Lam, Charles, Chaak Ming Lau, and Jackson L. Lee. 2024. Multi-Tiered Cantonese Word Segmentation. Proceedings of LREC-COLING 2024, 11993-12002.](https://aclanthology.org/2024.lrec-main.1047/)
- Locator: p. 11998; examples 我架車 and 樓下士多老闆架車
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: A pronoun or full nominal possessor is separated from an overt classifier+noun sequence in possessive expressions.
- Limit: Do not license possessor+arbitrary NP, infer possession solely from adjacency, or assume all number/definiteness readings.

### SRC-XIA-2025-CLASSIFIERS

- Citation: [Xia, Hengliang. 2025. Syntax of Classifiers and Measure Words in Three Chinese Languages. Proceedings of the 2025 Annual Conference of the Canadian Linguistic Association.](https://cla-acl.ca/pdfs/actes-2025/Xia-CLA-2025.pdf)
- Locator: pp. 6 and 10-11; Table 1 and modified CL-N discussion
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: POSS-CL-N is grammatical in Cantonese and grouped with definite modified CL-N phrases, distinct from Num-CL-N.
- Limit: Do not license possessor+arbitrary NP, infer possession solely from adjacency, or assume all number/definiteness readings.

### SRC-YU-2006-NOMINAL-MODIFIERS

- Citation: [Yu, Dominic. 2006. Relative clauses and nominal modifiers in Cantonese. Unpublished research paper, University of California, Berkeley.](https://linguistics.berkeley.edu/~dom/cantonese-rc.pdf)
- Locator: pp. 3-4; examples including keoi5 bun2 syu1 and keoi5 go2 bun2 syu1
- Verification: `VERIFIED_FULL_TEXT_CORROBORATIVE`
- What it supports: The paper illustrates possessor+classifier+noun “his/her book” and possessor+demonstrative+classifier+noun.
- Limit: Do not license possessor+arbitrary NP, infer possession solely from adjacency, or assume all number/definiteness readings.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Evidence state: `none_recorded`
- Executable or review records containing this label:
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

- no explicit external claim-source edge
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by PossessiveClassifierNP?

## Related constructions

- [[PossessiveTransferClause]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
