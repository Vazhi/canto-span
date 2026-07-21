---
title: "ModalANotAQuestion"
type: "canto-span-construction"
construction: "ModalANotAQuestion"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-07"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 2
verified_source_count: 2
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
standard_test_file: "tests/constructions/ModalANotAQuestion.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 2
standard_boundary_test_count: 0
standard_executable_test_count: 2
source_ids: ["SRC-LAW-2001-ANOTA", "SRC-LI-2017-ANOTA"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 15
accepted_fixtures: 2
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-07", "canto-span/workflow/archived"]
---

# ModalANotAQuestion

## Plain-language claim

Cantonese may instantiate the structural family represented by ModalANotAQuestion; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-LAW-2001-ANOTA

- Citation: [Law, Ann. 2001. A-not-A Questions in Cantonese. UCL Working Papers in Linguistics 13: 295-318.](https://www.phon.ucl.ac.uk/publications/WPL/01papers/law.pdf)
- Locator: pp. 306-307 and 313-314, examples (37)-(44), (57)-(58)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Law reports contrasts among modal readings, including restrictions for epistemic-necessity 應該 while other lower modals may participate.
- Limit: Do not treat one theoretical account or judgment set as a complete modal taxonomy.

### SRC-LI-2017-ANOTA

- Citation: [Li, Clare. 2017. The Syntactic and Pragmatic Properties of A-not-A Question in Chinese. MA thesis, University of Canterbury.](https://ir.canterbury.ac.nz/items/0764332d-7d53-44d8-a034-a0e316f2145f)
- Locator: PDF pp. 50-51 and 86-87
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Li analyzes 可唔可以 as a-not-AB: first syllable in the affirmative arm and full disyllabic modal in the negative arm.
- Limit: Do not segment arbitrary fused tokens or fabricate a second syllable not present in the surface.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ModalANotAQuestion.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ModalANotAQuestion?

## Related constructions

- [[ANotAQuestion]]
- [[AcceptabilityANotA]]
- [[CopularANotAQuestion]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
