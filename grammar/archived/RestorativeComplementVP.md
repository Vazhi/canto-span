---
title: "RestorativeComplementVP"
type: "canto-span-construction"
construction: "RestorativeComplementVP"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-05"
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
standard_test_file: "tests/constructions/RestorativeComplementVP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 1
standard_boundary_test_count: 0
standard_executable_test_count: 1
source_ids: ["SRC-CHOR-2013-FAAN1", "SRC-CUHK-CANTONESE-EXPRESS-DAILY09"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 3
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-05", "canto-span/workflow/archived"]
---

# RestorativeComplementVP

## Plain-language claim

Cantonese may instantiate the structural family represented by RestorativeComplementVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHOR-2013-FAAN1

- Citation: [Chor, Winnie. 2013. From 'direction' to 'positive evaluation': On the grammaticalization, subjectification and intersubjectification of faan1 'return' in Cantonese. Language and Linguistics 14(1): 91-134.](https://www.ling.sinica.edu.tw/item/zh-tw?act=journal&code=download&article_id=416)
- Locator: sections 4.1-4.3
- Verification: `VERIFIED_PUBLISHER_FULL_TEXT_AND_UNIVERSITY_METADATA`
- What it supports: The same particle has directional, resumptive, redoing, evaluative, and interpersonal functions.
- Limit: Do not interpret every occurrence of 返 before 好 or an object as restoration without considering construction and context.

### SRC-CUHK-CANTONESE-EXPRESS-DAILY09

- Citation: [Independent Learning Centre, The Chinese University of Hong Kong. Cantonese Express / 港式粵語速遞, Daily Conversation 9: 病咗睇醫生, contrast exercises.](https://www.ilc.cuhk.edu.hk/workshop/Chinese/Cantonese/CantoneseExpress/dailyConversation/09/comp_02.aspx)
- Locator: section 6 contrast set: prior separation, weight loss, stopping meat, removing lights, followed by restored state/action
- Verification: `VERIFIED_OFFICIAL_UNIVERSITY_WEB_RESOURCE`
- What it supports: The exercises explicitly pair a changed prior condition with returning to an earlier condition.
- Limit: Do not manufacture a prior event or state when context does not provide one.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/RestorativeComplementVP.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by RestorativeComplementVP?

## Related constructions

- [[RepetitiveComplementVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
