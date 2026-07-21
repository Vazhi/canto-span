---
title: "AcceptabilityANotA"
type: "canto-span-construction"
construction: "AcceptabilityANotA"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-07"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 0
source_count: 1
verified_source_count: 1
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
standard_test_file: "tests/constructions/AcceptabilityANotA.json"
standard_test_coverage: "no_direct_cases"
standard_positive_test_count: 0
standard_boundary_test_count: 0
standard_executable_test_count: 0
source_ids: ["SRC-LI-2017-ANOTA"]
runtime_active: true
runtime_code_references: 3
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-07"]
---

# AcceptabilityANotA

## Plain-language claim

Cantonese may instantiate the structural family represented by AcceptabilityANotA; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LI-2017-ANOTA

- Citation: [Li, Clare. 2017. The Syntactic and Pragmatic Properties of A-not-A Question in Chinese. MA thesis, University of Canterbury.](https://ir.canterbury.ac.nz/items/0764332d-7d53-44d8-a034-a0e316f2145f)
- Locator: PDF pp. 50-51, 74-75, and 86-88; 方唔方便, 啱唔啱用, 夠唔夠
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Li attests reduced and full adjectival/evaluative A-not-A forms with convenience, suitability, and sufficiency meanings.
- Limit: Do not infer that 得唔得 has the same syntax, lexical category, or optional time/topic template as the cited adjectives.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/AcceptabilityANotA.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by AcceptabilityANotA?

## Related constructions

- [[ANotAQuestion]]
- [[CopularANotAQuestion]]
- [[ModalANotAQuestion]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
