---
title: "ClassifierObjectNP"
type: "canto-span-construction"
construction: "ClassifierObjectNP"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-06"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 4
verified_source_count: 4
independent_speaker_count: 1
negative_cases_drafted: true
negative_tests_executable: false
negative_tests_passing: false
corpus_evidence_used: false
corpus_hits_reviewed: false
code_document_reconciled: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v1"
standard_test_file: "tests/constructions/ClassifierObjectNP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 2
standard_boundary_test_count: 0
standard_executable_test_count: 2
source_ids: ["SRC-BOND-SIO-2024-CLASSIFIERS", "SRC-CHENG-SYBESMA-1999-NP", "SRC-SIMPSON-SOH-NOMOTO-2011-BARE-CL", "SRC-XIA-2025-CLASSIFIERS"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 8
accepted_fixtures: 4
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# ClassifierObjectNP

## Plain-language claim

Cantonese may instantiate the structural family represented by ClassifierObjectNP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-BOND-SIO-2024-CLASSIFIERS

- Citation: [Bond, Francis and Joanna Ut-Seong Sio. 2024. A Construction-based Approach to Cantonese Classifiers. Proceedings of the 31st International Conference on Head-Driven Phrase Structure Grammar, 60-75.](https://doi.org/10.21248/hpsg.2024.4)
- Locator: p. 62; Table 1 and ex. 1c
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: C-N is one of the four Cantonese NP schemata and may be definite or indefinite in object position.
- Limit: Do not promote “object” as part of the language construction, infer one fixed definiteness value, or treat all classifier+noun combinations as interchangeable.

### SRC-CHENG-SYBESMA-1999-NP

- Citation: [Cheng, Lisa Lai-Shen and Rint Sybesma. 1999. Bare and Not-So-Bare Nouns and the Structure of NP. Linguistic Inquiry 30(4): 509-542.](https://doi.org/10.1162/002438999554192)
- Locator: pp. 509-515 and 526-530; Cantonese Cl+N discussion
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Cantonese classifier+noun phrases are analyzed as nominal constituents with distribution and interpretation beyond a single object frame.
- Limit: Do not promote “object” as part of the language construction, infer one fixed definiteness value, or treat all classifier+noun combinations as interchangeable.

### SRC-SIMPSON-SOH-NOMOTO-2011-BARE-CL

- Citation: [Simpson, Andrew, Hooi Ling Soh, and Hiroki Nomoto. 2011. Bare classifiers and definiteness: A cross-linguistic investigation. Studies in Language 35(1): 168-193.](https://doi.org/10.1075/sl.35.1.10sim)
- Locator: pp. 169-171; examples 1a-c
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Bare classifier forms are defined as classifier+noun without a numeral and are illustrated in both subject and object environments with definite and indefinite readings.
- Limit: Do not promote “object” as part of the language construction, infer one fixed definiteness value, or treat all classifier+noun combinations as interchangeable.

### SRC-XIA-2025-CLASSIFIERS

- Citation: [Xia, Hengliang. 2025. Syntax of Classifiers and Measure Words in Three Chinese Languages. Proceedings of the 2025 Annual Conference of the Canadian Linguistic Association.](https://cla-acl.ca/pdfs/actes-2025/Xia-CLA-2025.pdf)
- Locator: pp. 6-7; Table 1 and example 13
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Cantonese permits pre- and postverbal bare CL-N and coordinated CL-N object constituents.
- Limit: Do not promote “object” as part of the language construction, infer one fixed definiteness value, or treat all classifier+noun combinations as interchangeable.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 2 total; 2 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ClassifierObjectNP.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ClassifierObjectNP?

## Related constructions

- [[ApproximateQuantity]]
- [[QuantifiedClassifierNP]]
- [[QuantifiedPersonNP]]
- [[QuantifiedTimeNP]]
- [[QuantityNP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
