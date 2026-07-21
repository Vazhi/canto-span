---
title: "ProgressiveTransitivePredicate"
type: "canto-span-construction"
construction: "ProgressiveTransitivePredicate"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-05"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 0
source_count: 2
verified_source_count: 2
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
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-FAN-2024-JAU-VP-ASPECT"]
runtime_active: true
runtime_code_references: 5
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-05"]
---

# ProgressiveTransitivePredicate

## Plain-language claim

Cantonese may instantiate the structural family represented by ProgressiveTransitivePredicate; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-ALDERETE-ETAL-2017-SYNOPSIS

- Citation: [Alderete, John, Queenie Chan, Macarius Chan, Gloria Fan, and Olivia Nickel. 2017. Cantonese Grammar Synopsis.](https://www.sfu.ca/~alderete/pubs/aldereteEtal2017_cantgsyn2017-10-31.pdf)
- Locator: pp. 38-39, V Asp (NP)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The grammar synopsis makes the object optional in the general aspect pattern.
- Limit: Do not assume an overt object is required by 緊.

### SRC-FAN-2024-JAU-VP-ASPECT

- Citation: [Fan, Xiaolei (范曉蕾). 2024. 香港粵語“有 VP”的時體意義——兼論普通話的“沒”. Current Research in Chinese Linguistics 103(1):1-30. DOI: 10.29499/CrCL.202401_103(1).00012.](https://www.cuhk.edu.hk/ics/clrc/crcl_103_1/fan.pdf)
- Locator: p. 8, example (6b)
- Verification: `VERIFIED_OFFICIAL_JOURNAL_FULL_TEXT`
- What it supports: 我而家食緊飯 exemplifies a main-clause transitive V緊O progressive.
- Limit: Do not infer that all transitive verbs accept 緊.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Evidence state: `none_recorded`
- Executable or review records containing this label:
  - `review-packets/cp023-p1-prog01/PROG01-R2/focused-research-packet.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ProgressiveTransitivePredicate?

## Related constructions

- [[ProgressiveVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
