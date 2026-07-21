---
title: "PostverbalZoPerfectiveVP"
type: "canto-span-construction"
construction: "PostverbalZoPerfectiveVP"
status: "provisional_reaudit"
confidence: "not_assigned_pending_reaudit"
claim_layer: "language"
lane: "LANE-05"
last_reviewed: "2026-07-21"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 4
verified_source_count: 4
independent_speaker_count: 1
negative_cases_drafted: true
negative_tests_executable: true
negative_tests_passing: true
corpus_evidence_used: false
corpus_hits_reviewed: false
code_document_reconciled: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v1"
source_ids: ["SRC-FAN-CHAN-2022", "SRC-SIO-BOND-2025", "SRC-SYBESMA-2013", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
runtime_code_references: 5
accepted_fixtures: 12
tags: ["canto-span/grammar", "canto-span/status/provisional_reaudit", "canto-span/lane/lane-05"]
---

# PostverbalZoPerfectiveVP

## Plain-language claim

Published Cantonese descriptions attest postverbal 咗 before an overt object as a perfective profile. Canto Span keeps completion-result, experiential, motion, object omission, and unrestricted verb-object compatibility outside this narrow label; semantic contribution and discourse effects are not reduced to a categorical no-completion or no-current-relevance claim.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `provisional_reaudit`
- Linguistic confidence: `not_assigned_pending_reaudit`
- Current action: `prior_acceptance_withdrawn_pending_current_definition_of_done_reaudit`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-21

## Sources

### SRC-FAN-CHAN-2022

- Citation: [Fan, Xiaolei and Kin Wing Kevin Chan. 2022. 香港粵語「咗」的語法特點：與北京話「了1」的比較 [Grammatical properties of zo 咗 in Hong Kong Cantonese: A comparative study with le1 了1 in Beijing Mandarin]. Language and Linguistics 23(3): 371-410.](https://www.jbe-platform.com/content/journals/10.1075/lali.00110.fan?crawler=true)
- Locator: Fan & Chan 2022, Language and Linguistics 23(3):371–410, DOI 10.1075/lali.00110.fan; article discussion and examples including p. 374 (3c)
- Verification: `PASS`
- What it supports: Describes Hong Kong Cantonese 咗 placement after the first predicate in complex verbal material, treats it as perfective, and includes simple V–咗–object and V完(咗)O examples.
- Limit: The article discusses relative-past, completion, boundedness, and current-relevance analyses; it contradicts any categorical claim that 咗 has no temporal or completion-related contribution. Its three consulted informants are source-internal evidence, not the project’s two independent speaker reviews.

### SRC-SIO-BOND-2025

- Citation: [Sio, Joanna Ut-Seong and Francis Bond. 2025. Inner and outer aspect in Cantonese. HPSG 2025 conference paper.](https://dkaramasov.github.io/hpsg2025/assets/pdf/7-inner-and-outer-aspect-in-cantonese.pdf)
- Locator: Sio & Bond, Inner and Outer Aspect in Cantonese, HPSG 2025 PDF, section 2, example (2a), Tables 1–2
- Verification: `PASS`
- What it supports: Classifies 咗 as outer perfective aspect and gives exact 我食咗麵 in V–outer-aspect–object order.
- Limit: A conference analysis and illustrative examples do not establish unrestricted predicate–object productivity or all semantic interpretations.

### SRC-SYBESMA-2013

- Citation: [Sybesma, Rint. 2013. Cantonese sin1 先 and the question of microvariation and macrovariation. In Guangshun Cao, Hilary Chappell, Redouane Djamouri, and Thekla Wiebusch (eds.), Breaking Down the Barriers: Interdisciplinary Studies in Chinese Linguistics and Beyond, 971-994. Taipei: Academia Sinica.](https://www.researchgate.net/publication/305411096_Cantonese_sin_xian_and_the_question_of_microvariation_and_macrovariation)
- Locator: Sybesma 2013, Breaking Down the Barriers, pp. 971–994; author-uploaded full text, chapter pp. 17–18, example (25a)
- Verification: `PASS`
- What it supports: States that perfective 咗 follows the verb directly except for intervening verbal particles and gives 佢食完咗啲飯.
- Limit: This is boundary evidence for V–verbal-particle–咗–object, not positive evidence for unrestricted simple V–咗–object productivity.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Basic Cantonese (Routledge, 2000), Unit 18 printed pp. 93–96 / PDF pp. 105–108; Unit 23 printed pp. 122–123 / PDF pp. 134–135
- Verification: `PASS`
- What it supports: Multiple overt V–咗–object examples; 咗 analyzed as perfective aspect; verb morphology does not locate an event in past time by itself; final 未 questions are separately illustrated.
- Limit: The source also describes the event as complete and discusses result/current relevance. It does not support the former claim that the construction lacks completion or current-relevance implications.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_INDEPENDENT_SPEAKER_CONTROLLED_NATURALNESS_REVIEW_SECOND_SPEAKER_FROZEN`
- Surface judgments: 14 total; 12 accepted; 2 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `FROZEN_BY_USER_NOT_WAIVED`.

## Negative and boundary cases

- Evidence state: `executable_boundaries_present_but_code_document_and_object_integration_repair_incomplete`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/focused-evaluation-packet.json`
  - `test-data/WECHAT-GX-TRAVEL-002-CONTROLLED-CONTRASTS-R1.tsv`
  - `test-data/grammar-authority-origin-CP021B.tsv`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-claim-source-edges-CP021A.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/regression-snapshots.json`

## Implementation state

- Lifecycle: `v0.5.184_compositional_np_object_integration_implemented_status_remains_reaudit`
- Visible/focused tests: `NP_SUBSYSTEM_INTEGRATION_PASS;PFV_CONTROLLED_POSITIVES_4_OF_6_NARROW_TARGET_PRESENT`
- Render review: `historical_render_pass_retained_software_only`
- Held-out evaluation: `PROSPECTIVE_7_OF_7_PASS_CONSUMED_SOFTWARE_ONLY`
- Regression: `545_of_545_pass`
- Code–documentation comparison: `PARTIAL_OBJECT_INTERFACE_ALIGNED;ACTION_VERB_AND_SEMANTIC_SCOPE_REAUDIT_OPEN`

## Open questions and blockers

- full current Definition of Done remains incomplete
- not_applicable_formerly_accepted_construction_remains_provisional_reaudit_under_current_rule
- second independent speaker frozen; action_verb scope justification or narrowing; remaining controlled coverage; exact semantic code-doc alignment
- Four sources and Speaker A are reverified. v0.5.184 consumes only licensed NP objects and covers 4/6 controlled target positives. The construction remains provisional_reaudit; action-verb and semantic scope remain unresolved, and second-speaker work is frozen.
- Runtime governance is aligned. The subtype consumes only licensed NP objects; controlled positive coverage is 4/6. This software improvement does not restore productive status. Second-speaker work remains frozen.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by PostverbalZoPerfectiveVP?
- Next evidence action: Continue non-speaker semantic and implementation narrowing; do not recruit or schedule Speaker B until user unfreezes second-speaker work.

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
