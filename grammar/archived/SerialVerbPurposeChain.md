---
title: "SerialVerbPurposeChain"
type: "canto-span-construction"
construction: "SerialVerbPurposeChain"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-09"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 3
verified_source_count: 3
independent_speaker_count: 1
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
standard_test_file: "tests/constructions/SerialVerbPurposeChain.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 5
standard_boundary_test_count: 0
standard_executable_test_count: 5
source_ids: ["SRC-CHOR-2018-DIRECTIONALS", "SRC-LAM-BODOMO-2003-VERB-ORDER", "SRC-MATTHEWS-2006-SVC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 23
accepted_fixtures: 5
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-09", "canto-span/workflow/archived"]
---

# SerialVerbPurposeChain

## Plain-language claim

Cantonese may instantiate the structural family represented by SerialVerbPurposeChain; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHOR-2018-DIRECTIONALS

- Citation: [Chor, W. O. W. 2018. Directional Particles in Cantonese: Form, Function, and Grammaticalization. Amsterdam/Philadelphia: John Benjamins.](https://doi.org/10.1075/scld.9)
- Locator: printed pp. 94-97
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Chor’s contrasts show that linker identity and context affect the purpose analysis.
- Limit: Do not gloss every serial sequence as English “to” or teach 嚟 and 去 as synonymous purpose markers.

### SRC-LAM-BODOMO-2003-VERB-ORDER

- Citation: [Lam, Olivia S.-C., and Adams B. Bodomo. 2003. Modeling Verb Order in Complex Multi-Verbal Predicate Constructions. Proceedings of PACLIC 17, 328-338.](https://aclanthology.org/Y03-1037/)
- Locator: pp. 328 and 331, examples 1 and 12-13
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT_AND_METADATA`
- What it supports: The paper analyzes ngo5 zaal1-gan2 ce1 lai4 zip3 lei5 as three VPs: drive-PROG car, come, and pick up you.
- Limit: Do not infer that every progressive VP followed by another VP has a purpose reading.

### SRC-MATTHEWS-2006-SVC

- Citation: [Matthews, S. 2006. On Serial Verb Constructions in Cantonese. In A. Y. Aikhenvald and R. M. W. Dixon (eds.), Serial Verb Constructions: A Cross-Linguistic Typology, 69-87. Oxford University Press.](https://hub.hku.hk/bitstream/10722/51758/6/FullText.pdf)
- Locator: chapter p. 71 and pp. 83-84
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Matthews notes that strictly transitive verbs may omit objects when discourse identifies them; complex SVC examples do not authorize automatic object sharing.
- Limit: Do not duplicate, corefer, or insert a hidden object by parser convention.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/SerialVerbPurposeChain.json`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by SerialVerbPurposeChain?

## Related constructions

- [[MotionDelimitedVP]]
- [[MotionPurposeChain]]
- [[ProgressivePurposeClause]]
- [[PurposePredicate]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
