---
title: "PostverbalZoPerfectiveVP"
type: "canto-span-construction"
construction: "PostverbalZoPerfectiveVP"
status: "provisional"
confidence: "moderate_narrow_structural_profile"
claim_layer: "language"
lane: "LANE-05"
last_reviewed: "2026-07-21"
last_status_migrated: "2026-07-21"
speaker_count: 11
source_count: 4
verified_source_count: 4
independent_speaker_count: 11
promotion_eligible_independent_speaker_count: 1
same_contrast_independent_speaker_count: 1
native_positive_contrasts_reviewed: true
native_negative_contrasts_reviewed: true
pilot_panel_response_count: 10
negative_cases_drafted: true
negative_tests_executable: true
negative_tests_passing: true
negative_boundary_inventory_complete: true
corpus_evidence_used: false
corpus_hits_reviewed: false
corpus_candidate_hit_count: 0
corpus_genuine_hit_count: 0
corpus_false_positive_count: 0
corpus_ambiguous_hit_count: 0
corpus_unusable_hit_count: 0
code_document_reconciled: true
code_document_review_date: "2026-07-21"
code_document_review_commit: "d08367dcf0f13d57b39a406ddf72388ba079a9e6"
code_document_code_locations: ["main.js:3083-3103", "main.js:13644-13735", "main.js:15348-15426", "main.js:21168"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v2"
native_review_protocol_version: "v1"
native_review_state_file: "review-packets/native-speaker/active-v1/active-review-state.json"
native_form_spec_file: "review-packets/native-speaker/active-v1/form-specs.json"
source_verification_file: "docs/research/CP025-P1-PFV01-SOURCE-VERIFICATION-R1.tsv"
speaker_a_state: "complete_counted"
speaker_b_state: "legacy_panel_counted_exception"
standard_test_file: "tests/constructions/PostverbalZoPerfectiveVP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 32
standard_boundary_test_count: 12
standard_executable_test_count: 45
source_ids: ["SRC-FAN-CHAN-2022", "SRC-SIO-BOND-2025", "SRC-SYBESMA-2013", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
workflow_state: "active"
workflow_priority: 1
workflow_since: "2026-07-21"
workflow_reason: "current_reaudit_non_speaker_semantic_and_implementation_narrowing"
runtime_code_references: 5
accepted_fixtures: 12
tags: ["canto-span/grammar", "canto-span/status/provisional", "canto-span/lane/lane-05", "canto-span/workflow/active"]
---

# PostverbalZoPerfectiveVP

## Plain-language claim

Checked Cantonese sources and controlled native-speaker evidence support a narrow structural profile in which an overt action predicate is followed by perfective 咗 and an overt licensed noun phrase. The parser records that visible structure. It does not treat 咗 as a past-tense suffix, does not insert hidden arguments, and does not decide the full completion or current-relevance interpretation at this node. Predicate–object naturalness is evaluated separately, so a structurally transparent but semantically anomalous string can retain the perfective span inside a `NeedsContext` review result.

The evidence does not establish unrestricted productivity across every parser action verb, every noun phrase, every discourse setting, or every final-question form. The construction is therefore `provisional`, not `supported_productive`.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `provisional`
- Linguistic confidence: `moderate_narrow_structural_profile`
- Current action: `retain_narrow_structural_profile_and_research_lexical_scope_before_productive_promotion`
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

- Controlled promotion-eligible speaker records: **1** (Speaker A).
- Grandfathered legacy public-panel records: **10**, all complete and independently submitted across the same six positive and eight comparison items.
- Total counted external speaker records: **11**.
- Promotion-eligible same-contrast speaker count: **1**.
- The legacy panel remains outside the clean promotion gate because the old form did not explicitly collect native-language confirmation or anonymous-use consent.
- Core positive results: `我食咗飯` 8/10, `我食咗麵` 9/10, `佢睇咗三個醫生` 9/10, `佢寫咗一篇文` 9/10, `我答咗你嘅問題` 8/10.
- Split item: `你買咗呢隻牌子未呀` 5/10; it is excluded from the narrow core claim.
- Selectional anomaly: `我食咗香港` 0/10 accepted, supporting a separate semantic-review layer rather than suppression of the visible structural span.
- Result record: `docs/research/CP029-P1-PFV01-PUBLIC-PANEL-R1-RESULT.md`.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/PostverbalZoPerfectiveVP.json`
- Reviewed boundary inventory: `docs/research/CP029-P1-PFV01-BOUNDARY-INVENTORY-R1.tsv`
- Inventory status: **complete for the current narrow claim**.
- Executable exclusions cover objectless `V–咗`, `V完咗O`, motion-goal perfectives, experiential `過`, progressive `緊`, bare `VO`, placement profiles, classifier-incompatible objects, unsupported nominal structures, and unknown nominal heads.
- Selectional anomalies are not treated as construction-absence cases. The structural `V–咗–NP` span is preserved and the whole analysis is wrapped as `NeedsContext` when the high-confidence predicate–object profile is incompatible.
- The final-`未` wrapper is covered only where the object itself is licensed; the split `呢隻牌子` survey item is not used to broaden the claim.

## Implementation state

- Lifecycle: `v0.5.186_narrow_provisional_reaudit_closed`
- Implementation validation: regression **545/545**, NP subsystem **43/43**, and construction assertions pass independently of linguistic status.
- Code–documentation review: **PASS** against commit `d08367dcf0f13d57b39a406ddf72388ba079a9e6`.
- Reviewed code locations: `main.js:3083-3103`, `main.js:13644-13735`, `main.js:15348-15426`, and `main.js:21168`.
- Structural rule: overt parser action verb + perfective 咗 + overt licensed NP object.
- Semantic rule: high-confidence incompatible predicate–object combinations are separately wrapped as `NeedsContext`; unknown combinations are not asserted to be natural merely because the structural span exists.
- Completion semantics: the node creates no separate completion/result construction, but the documentation does not deny completion, boundedness, temporal, or current-relevance interpretations of 咗.

## Open questions and blockers

- The current action-verb inventory is broader than the exact verbs independently attested in the checked sources and speaker packet.
- The parser's licensed-NP inventory is deliberately bounded and does not establish the complete Cantonese object system.
- The split `呢隻牌子` question needs a better lexical and contextual instrument before it can extend the claim.
- The ten-person legacy panel is valuable external evidence but is not clean promotion-gating evidence.
- Promotion to `supported_productive` requires at least one additional clean independent same-contrast speaker record and stronger evidence for the productive lexical scope.
- Next evidence action: run the revised controlled PFV instrument only when expanding beyond the current narrow provisional claim; do not reopen the entire archived grammar backlog for this purpose.

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
