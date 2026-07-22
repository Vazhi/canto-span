---
title: "ANotAQuestion"
type: "canto-span-construction"
construction: "ANotAQuestion"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-07"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
source_count: 5
verified_source_count: 5
panel_response_count_total: 1
eligible_panel_response_count: 0
minimum_usable_judgments_per_critical_item: 0
critical_contrast_coverage: "none"
survey_instrument_version: "pre-panel-v2-unstandardized"
survey_instrument_status: "legacy_limited"
survey_instrument_quality_resolved: false
quality_screen_status: "not_started"
panel_adjudication_status: "not_started"
recruitment_channels: []
respondent_role_neutral: false
native_positive_contrasts_reviewed: false
native_negative_contrasts_reviewed: false
panel_evidence_model_version: "v2"
panel_review_state_file: "review-packets/native-panel/active-v2/panel-review-state.json"
panel_policy_file: "review-packets/native-panel/active-v2/panel-policy.json"
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
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/ANotAQuestion.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 10
standard_boundary_test_count: 0
standard_implementation_probe_count: 0
standard_executable_test_count: 10
source_ids: ["SRC-FAN-2026-JAU-VP", "SRC-HARA-2023-POLAR", "SRC-LAW-2001-ANOTA", "SRC-LI-2017-ANOTA", "SRC-YIP-1988-NEGATION"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 11
accepted_fixtures: 10
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-07", "canto-span/workflow/archived"]
---

# ANotAQuestion

## Plain-language claim

Cantonese may instantiate the structural family represented by ANotAQuestion; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-FAN-2026-JAU-VP

- Citation: [Fan, Xiaolei. 2026. The Modal Meaning of the jau5 (有) have+VP in Hong Kong Cantonese. Journal of Chinese Linguistics 54(2): 458-479.](https://jcl.fah.um.edu.mo/the-modal-meaning-of-the-jau5-%E6%9C%89havevp-in-hong-kong-cantonese/)
- Locator: official abstract; JCL 54(2):458-479
- Verification: `VERIFIED_OFFICIAL_ABSTRACT_AND_METADATA`
- What it supports: Fan describes nonpossessive auxiliary/modal 有 + dynamic VP and reports preference in polar questions, conditionals, and negatives.
- Limit: Do not infer full syntactic details, unrestricted VP selection, or exact question templates from an abstract.

### SRC-HARA-2023-POLAR

- Citation: [Hara, Yurie. 2023. Cantonese Question Particles. In Discourse Particles in Asian Languages, Volume I: East Asia. Routledge.](https://yuriehara.github.io/website/download/RoutledgeCantoneseParticle.pdf)
- Locator: author PDF pp. 1-2 and 13-17; Figure 2 and conclusion
- Verification: `VERIFIED_FULL_TEXT_AND_PUBLISHER_METADATA`
- What it supports: Hara’s experiments favor A-not-A in neutral contexts, while the discussion allows cases where private belief is not overtly expressed.
- Limit: Do not encode “neutral only” as an absolute grammar rule or infer speaker beliefs from surface form alone.

### SRC-LAW-2001-ANOTA

- Citation: [Law, Ann. 2001. A-not-A Questions in Cantonese. UCL Working Papers in Linguistics 13: 295-318.](https://www.phon.ucl.ac.uk/publications/WPL/01papers/law.pdf)
- Locator: pp. 297-298, example (8)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Law contrasts neutral 去唔去巴黎 with biased me1 particle questions.
- Limit: Do not reject a structurally valid A-not-A question solely because discourse bias is possible.

### SRC-LI-2017-ANOTA

- Citation: [Li, Clare. 2017. The Syntactic and Pragmatic Properties of A-not-A Question in Chinese. MA thesis, University of Canterbury.](https://ir.canterbury.ac.nz/items/0764332d-7d53-44d8-a034-a0e316f2145f)
- Locator: PDF pp. 50-51 and 86-87; examples 可唔可以 and 方唔方便
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The film sample attests a-not-AB and a-not-A patterns in which only the first syllable of a disyllabic predicate occurs in the affirmative arm.
- Limit: Do not generate arbitrary truncations; the source does not establish a free syllable-deletion algorithm for every disyllabic item.

### SRC-YIP-1988-NEGATION

- Citation: [Yip, Moira. 1988. Negation in Cantonese as a Lexical Rule. Bulletin of the Institute of History and Philology 59: 449-477.](https://www11.ihp.sinica.edu.tw/storage/w2_file/3407pXasnae.pdf)
- Locator: p. 449 abstract; discussion of yau 有 and its negative form
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Yip identifies 有 as having a special suppletive negative form rather than ordinary 唔-prefixation.
- Limit: Do not infer that suppletion determines whether a use is possessive, existential, experiential, or event-occurrence.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 2 total; 2 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ANotAQuestion.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `test-data/pre-intermediate-gold-corpus.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ANotAQuestion?

## Related constructions

- [[AcceptabilityANotA]]
- [[CopularANotAQuestion]]
- [[ModalANotAQuestion]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
