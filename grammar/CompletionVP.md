---
title: "CompletionVP"
type: "canto-span-construction"
construction: "CompletionVP"
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
source_ids: ["SRC-FAN-CHAN-2022", "SRC-SIO-BOND-2025", "SRC-SYBESMA-2013", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
runtime_code_references: 19
accepted_fixtures: 7
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-05"]
---

# CompletionVP

## Plain-language claim

Published Cantonese analyses and independently sourced examples attest V + 完 + 咗 + object ordering, with 完 inside the perfective scope; exact lexical, discourse, and speaker-variation boundaries remain research-pending.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_externally_attested_V完咗O_family_quarantine_only_rejected_surface_context_and_continue_analysis_validation`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-FAN-CHAN-2022

- Citation: [Fan, Xiaolei and Kin Wing Kevin Chan. 2022. 香港粵語「咗」的語法特點：與北京話「了1」的比較 [Grammatical properties of zo 咗 in Hong Kong Cantonese: A comparative study with le1 了1 in Beijing Mandarin]. Language and Linguistics 23(3): 371-410.](https://www.jbe-platform.com/content/journals/10.1075/lali.00110.fan?crawler=true)
- Locator: p. 374, example (3c); publisher crawler text
- Verification: `VERIFIED_PUBLISHER_TEXT_AND_METADATA`
- What it supports: 琴日佢做完(咗)功課喇 independently attests the form with an overt object and final particle.
- Limit: Do not infer free optionality of 咗 outside the cited sentence type or override conflicting native-surface judgments.

### SRC-SIO-BOND-2025

- Citation: [Sio, Joanna Ut-Seong and Francis Bond. 2025. Inner and outer aspect in Cantonese. HPSG 2025 conference paper.](https://dkaramasov.github.io/hpsg2025/assets/pdf/7-inner-and-outer-aspect-in-cantonese.pdf)
- Locator: PDF pp. 2-3; section 2; example (2a-c); Table 1
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper distinguishes outer aspect from individual-predicative and event-linked inner material, and explicitly notes that the simple resultative/phase dichotomy is problematic.
- Limit: Do not adopt the paper’s exact three-way HPSG inventory as exhaustive or classify every current runtime completion_marker by analogy.

### SRC-SYBESMA-2013

- Citation: [Sybesma, Rint. 2013. Cantonese sin1 先 and the question of microvariation and macrovariation. In Guangshun Cao, Hilary Chappell, Redouane Djamouri, and Thekla Wiebusch (eds.), Breaking Down the Barriers: Interdisciplinary Studies in Chinese Linguistics and Beyond, 971-994. Taipei: Academia Sinica.](https://www.researchgate.net/publication/305411096_Cantonese_sin_xian_and_the_question_of_microvariation_and_macrovariation)
- Locator: author PDF chapter pp. 17-18; example (25a)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: 佢食完咗啲飯 independently attests V完咗O.
- Limit: Do not infer universal naturalness or speaker agreement; retain the project’s one-speaker conflict as surface-variation evidence.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 23, printed pp. 122-123; PDF pp. 134-135
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The source distinguishes verbal particles such as 飽 and 完 from aspect markers 咗 and 過 when describing completion questions.
- Limit: Do not infer a complete theoretical classification or place 晒 in the same category without separate evidence.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_MIXED_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 7 total; 4 accepted; 3 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Evidence state: `two_project_boundary_probes_recorded_not_independent_ungrammaticality_evidence`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/development-baseline.json`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-claim-source-edges-CP021A.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/grammar-legitimacy-source-register.tsv`
  - `test-data/native-naturalness-conflict-dispositions.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `test-data/regression-snapshots.json`

## Implementation state

- Lifecycle: `runtime_referenced_with_accepted_fixtures`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `CANDIDATE_HEADLESS_4_OF_4_INDEPENDENT_POSITIVES_PASS_RENDERED_PENDING`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `pending_current_definition_of_done_line_by_line_review`

## Open questions and blockers

- legacy claim was not demonstrably derived from the recorded sources; reconstruct the claim from screened propositions first
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by CompletionVP?

## Related constructions

- [[CompletionQuestion]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
