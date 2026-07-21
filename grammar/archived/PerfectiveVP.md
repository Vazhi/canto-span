---
title: "PerfectiveVP"
type: "canto-span-construction"
construction: "PerfectiveVP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-05"
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
standard_test_file: "tests/constructions/PerfectiveVP.json"
standard_test_coverage: "positive_only"
standard_positive_test_count: 21
standard_boundary_test_count: 0
standard_executable_test_count: 21
source_ids: ["SRC-FAN-CHAN-2022", "SRC-SIO-BOND-2025", "SRC-SYBESMA-2013", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 23
accepted_fixtures: 37
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-05", "canto-span/workflow/archived"]
---

# PerfectiveVP

## Plain-language claim

Cantonese perfective 咗 may follow an inner aspect/result element such as 完 before an overt object; broader PerfectiveVP productivity remains only provisional.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_provisional_outer_perfective_analysis_with_V完咗O_evidence_and_native_surface_variation`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-FAN-CHAN-2022

- Citation: [Fan, Xiaolei and Kin Wing Kevin Chan. 2022. 香港粵語「咗」的語法特點：與北京話「了1」的比較 [Grammatical properties of zo 咗 in Hong Kong Cantonese: A comparative study with le1 了1 in Beijing Mandarin]. Language and Linguistics 23(3): 371-410.](https://www.jbe-platform.com/content/journals/10.1075/lali.00110.fan?crawler=true)
- Locator: p. 374, example (3c); publisher crawler text
- Verification: `VERIFIED_PUBLISHER_TEXT_AND_METADATA`
- What it supports: 琴日佢做完(咗)功課喇 independently attests V完(咗)O and optionality of 咗 in that past-time sentence.
- Limit: Do not infer that 咗 is semantically vacuous, freely optional in all V完O clauses, or acceptable to every speaker in every lexical context.

### SRC-SIO-BOND-2025

- Citation: [Sio, Joanna Ut-Seong and Francis Bond. 2025. Inner and outer aspect in Cantonese. HPSG 2025 conference paper.](https://dkaramasov.github.io/hpsg2025/assets/pdf/7-inner-and-outer-aspect-in-cantonese.pdf)
- Locator: PDF p. 3; example (2c) and ordering statement immediately above it
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper states V-IAP-OAP ordering and gives 我食完(咗)麵, treating 完 as event-linked inner material and 咗 as outer perfective.
- Limit: Do not infer that 完, 飽, 好, 到, 掂, or 晒 are interchangeable or that the exact inner/outer taxonomy is exhaustive.

### SRC-SYBESMA-2013

- Citation: [Sybesma, Rint. 2013. Cantonese sin1 先 and the question of microvariation and macrovariation. In Guangshun Cao, Hilary Chappell, Redouane Djamouri, and Thekla Wiebusch (eds.), Breaking Down the Barriers: Interdisciplinary Studies in Chinese Linguistics and Beyond, 971-994. Taipei: Academia Sinica.](https://www.researchgate.net/publication/305411096_Cantonese_sin_xian_and_the_question_of_microvariation_and_macrovariation)
- Locator: author PDF chapter pp. 17-18; example (25a)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The published example 佢食完咗啲飯 independently attests 完 before 咗 and the overt object.
- Limit: Do not infer universal speaker preference, free lexical substitution, or a uniquely correct constituency from one example.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 18, printed pp. 95-96; PDF pp. 107-108; Unit 23, printed pp. 122-123; PDF pp. 134-135
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The source gives Léih sīk-jó dāng meih a? and describes answers that repeat verb+咗.
- Limit: Do not treat final 未 as proof that an unmarked preceding VP is perfective or insert an unspoken 咗.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_MIXED_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 8 total; 6 accepted; 2 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/PerfectiveVP.json`
- Evidence state: `two_project_aspect_order_boundary_probes_recorded_not_independent_ungrammaticality_evidence`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-I1A-I01-D1/development-baseline.json`
  - `review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/development-baseline.json`
  - `review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/focused-evaluation-packet.json`
  - `review-packets/v0.5.181/IFR01-D1/development-baseline.json`
  - `review-packets/v0.5.182/IFR02-D1/development-baseline.json`
  - `test-data/WECHAT-GX-TRAVEL-002-CONTROLLED-CONTRASTS-R1.tsv`
  - `test-data/a1-context-status-fixture.tsv`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-authority-origin-CP021B.tsv`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-claim-source-edges-CP021A.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/grammar-legitimacy-source-register.tsv`
  - `test-data/native-naturalness-conflict-dispositions.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `tests/fixtures/regression-snapshots.json`

## Implementation state

- Lifecycle: `runtime_referenced_with_accepted_fixtures`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `CANDIDATE_HEADLESS_4_OF_4_INDEPENDENT_COMPLETION_PERFECTIVE_POSITIVES_PASS_RENDERED_PENDING`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `pending_current_definition_of_done_line_by_line_review`

## Open questions and blockers

- legacy claim was not demonstrably derived from the recorded sources; reconstruct the claim from screened propositions first
- checked_exact_source;one_speaker_positive_negative_review;drafted_negative_boundaries;independent_evidence_beyond_parser_tests
- all_sources_reverified;all_used_corpus_hits_manually_classified;two_independent_speakers;executable_negative_boundaries;code_document_alignment;separate_implementation_and_linguistic_reporting;plain_language_claim
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by PerfectiveVP?
- Next evidence action: Reverify at least one exact source, confirm one independent native-speaker review of the relevant positive and negative examples, and draft boundaries before restoring provisional status.

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
