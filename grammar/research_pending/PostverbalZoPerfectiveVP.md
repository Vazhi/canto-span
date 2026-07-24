---
title: "AB30 ZoMarkedPerfectiveObjectVP"
type: "canto-span-construction"
construction: "PostverbalZoPerfectiveVP"
construction_uuid: "2169217f-a21d-5165-9513-eb0edee2c220"
construction_code: "AB30"
canonical_name: "ZoMarkedPerfectiveObjectVP"
legacy_runtime_label: "PostverbalZoPerfectiveVP"
status: "research_pending"
confidence: "legacy_panel_support_clean_instrument_pending"
claim_layer: "language"
lane: "LANE-05"
last_reviewed: "2026-07-21"
last_status_migrated: "2026-07-21"
source_count: 4
verified_source_count: 4
panel_response_count_total: 11
eligible_panel_response_count: 0
minimum_usable_judgments_per_critical_item: 0
critical_contrast_coverage: "partial"
survey_instrument_version: "PFV01-legacy-mixed-v1"
survey_instrument_status: "legacy_limited"
survey_instrument_quality_resolved: false
quality_screen_status: "partial"
panel_adjudication_status: "complete_historical_only"
recruitment_channels: ["private_historical", "public_social_media"]
respondent_role_neutral: false
native_positive_contrasts_reviewed: true
native_negative_contrasts_reviewed: true
panel_evidence_model_version: "v2"
panel_review_state_file: "review-packets/native-panel/active-v2/panel-review-state.json"
panel_policy_file: "review-packets/native-panel/active-v2/panel-policy.json"
panel_lifecycle_metadata_file: "review-packets/native-panel/active-v2/followup-draft-v1-metadata.json"
current_panel_instrument_id: "YUE-JUDGMENT-PILOT-01"
current_panel_instrument_status: "collection_in_progress"
followup_instrument_id: "YUE-JUDGMENT-FOLLOWUP-01-DRAFT"
followup_instrument_status: "draft_followup"
followup_deployment_allowed: false
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
accepted_corpus_packet_reviewed_count: 5
accepted_corpus_genuine_count: 2
accepted_corpus_false_positive_count: 3
accepted_corpus_ambiguous_count: 0
accepted_corpus_unusable_count: 0
corpus_decision_ledger_file: "review-packets/corpus-review/AB30/review-decisions-r1.json"
corpus_source_ledger_file: "review-packets/corpus-review/AB30/candidate-ledger.json"
corpus_readiness_effect: "partial_only"
corpus_diverse_source_gate_satisfied: false
code_document_reconciled: true
code_document_review_date: "2026-07-21"
code_document_review_commit: "d08367dcf0f13d57b39a406ddf72388ba079a9e6"
code_document_code_locations: ["main.js:3083-3103", "main.js:13644-13735", "main.js:15348-15426", "main.js:21168"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
source_verification_file: "docs/research/CP025-P1-PFV01-SOURCE-VERIFICATION-R1.tsv"
standard_test_file: "tests/constructions/PostverbalZoPerfectiveVP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 32
standard_boundary_test_count: 12
standard_implementation_probe_count: 0
standard_executable_test_count: 45
source_ids: ["SRC-FAN-CHAN-2022", "SRC-SIO-BOND-2025", "SRC-SYBESMA-2013", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
workflow_state: "active"
workflow_priority: 2
workflow_since: "2026-07-21"
workflow_reason: "secondary_construction_for_role_neutral_panel_wave_and_lexical_scope_recheck"
runtime_code_references: 5
accepted_fixtures: 12
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-05", "canto-span/workflow/active"]
---

# AB30 ZoMarkedPerfectiveObjectVP

## Canonical identity

- Construction UUID: `2169217f-a21d-5165-9513-eb0edee2c220`
- Permanent code and canonical name: `AB30 ZoMarkedPerfectiveObjectVP`
- Legacy runtime label: `PostverbalZoPerfectiveVP`, retained only for the current
  note path, runtime `construction` field, and compatibility-linked tests.

## Plain-language claim

Checked Cantonese sources support a narrow structural profile in which an overt action predicate is followed by perfective 咗 and an overt licensed noun phrase. The parser records that visible structure. It does not treat 咗 as a past-tense suffix, does not insert hidden arguments, and does not decide the full completion or current-relevance interpretation at this node. Predicate–object naturalness is evaluated separately, so a structurally transparent but semantically anomalous string can retain the perfective span inside a `NeedsContext` review result.

The existing eleven response records came from mixed legacy instruments and do not meet the role-neutral panel standard. They remain useful historical evidence, but the minimum usable judgment count from a clean instrument is zero. The construction is therefore `research_pending` until a clean survey wave supplies complete critical-item coverage.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `legacy_panel_support_clean_instrument_pending`
- Current action: `retain_structural_research_target_and_collect_clean_role_neutral_panel_evidence`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-21
- Current collection: `YUE-JUDGMENT-PILOT-01` is
  `collection_in_progress`.
- Follow-up state: `YUE-JUDGMENT-FOLLOWUP-01-DRAFT` is a non-deployable
  `draft_followup`.

## Sources

### SRC-FAN-CHAN-2022

- Citation: [Fan, Xiaolei and Kin Wing Kevin Chan. 2022. 香港粵語「咗」的語法特點：與北京話「了1」的比較 [Grammatical properties of zo 咗 in Hong Kong Cantonese: A comparative study with le1 了1 in Beijing Mandarin]. Language and Linguistics 23(3): 371-410.](https://www.jbe-platform.com/content/journals/10.1075/lali.00110.fan?crawler=true)
- Locator: Fan & Chan 2022, Language and Linguistics 23(3):371–410, DOI 10.1075/lali.00110.fan; article discussion and examples including p. 374 (3c)
- Verification: `PASS`
- What it supports: Describes Hong Kong Cantonese 咗 placement after the first predicate in complex verbal material, treats it as perfective, and includes simple V–咗–object and V完(咗)O examples.
- Limit: The article discusses relative-past, completion, boundedness, and current-relevance analyses; it contradicts any categorical claim that 咗 has no temporal or completion-related contribution. Its three consulted informants are source-internal evidence, not project panel responses collected with the locked instrument.

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

- Historical response records: **11** total across one private legacy record and ten public legacy-form responses.
- Eligible panel responses under the current role-neutral protocol: **0**.
- Minimum usable judgments per critical item from a clean instrument: **0**.
- Instrument state: `PFV01-legacy-mixed-v1`; `legacy_limited`; quality unresolved.
- The public legacy form omitted explicit native-language confirmation and anonymous-use consent, while the private record came from a differently administered instrument. Neither receives special weight or promotion credit.
- Historical results remain informative: `我食咗飯` 8/10, `我食咗麵` 9/10, `佢睇咗三個醫生` 9/10, `佢寫咗一篇文` 9/10, `我答咗你嘅問題` 8/10; `我食咗香港` was accepted by 0/10.
- Result record: `docs/research/CP029-P1-PFV01-PUBLIC-PANEL-R1-RESULT.md`.
- Current collection state and the non-deployable follow-up are recorded in
  `review-packets/native-panel/active-v2/followup-draft-v1-metadata.json`.
- The live pilot must close and receive an item audit before the follow-up draft
  may be revised, locked, generated, or deployed.

## Accepted corpus review

- Decision ledger:
  `review-packets/corpus-review/AB30/review-decisions-r1.json`.
- Mechanical source ledger:
  `review-packets/corpus-review/AB30/candidate-ledger.json`.
- Current packet: **5 reviewed; 2 genuine; 3 false positives; 0 ambiguous; 0
  unusable**.
- Readiness effect: `partial_only`. The packet establishes narrow natural
  attestation and extractor boundaries, but two small user-supplied sources do
  **not** satisfy the diverse-corpus gate or establish productivity.
- The legacy `corpus_*` readiness-gate fields remain false/zero; accepted packet
  counts are recorded separately because `partial_only` evidence cannot enter the
  diverse-corpus pass gate.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/PostverbalZoPerfectiveVP.json`
- Reviewed boundary inventory: `docs/research/CP029-P1-PFV01-BOUNDARY-INVENTORY-R1.tsv`
- Inventory status: **complete for the current narrow claim**.
- Executable exclusions cover objectless `V–咗`, `V完咗O`, motion-goal perfectives, experiential `過`, progressive `緊`, bare `VO`, placement profiles, classifier-incompatible objects, unsupported nominal structures, and unknown nominal heads.
- Selectional anomalies are not treated as construction-absence cases. The structural `V–咗–NP` span is preserved and the whole analysis is wrapped as `NeedsContext` when the high-confidence predicate–object profile is incompatible.
- The final-`未` wrapper is covered only where the object itself is licensed; the split `呢隻牌子` survey item is not used to broaden the claim.

## Implementation state

- Lifecycle: `v0.5.187_panel_model_migration_research_pending`
- Implementation validation: regression **545/545**, NP subsystem **43/43**, and construction assertions pass independently of linguistic status.
- Code–documentation review: **PASS** against commit `d08367dcf0f13d57b39a406ddf72388ba079a9e6`.
- Reviewed code locations: `main.js:3083-3103`, `main.js:13644-13735`, `main.js:15348-15426`, and `main.js:21168`.
- Structural rule: overt parser action verb + perfective 咗 + overt licensed NP object.
- Semantic rule: high-confidence incompatible predicate–object combinations are separately wrapped as `NeedsContext`; unknown combinations are not asserted to be natural merely because the structural span exists.
- Completion semantics: the node creates no separate completion/result construction, but the documentation does not deny completion, boundedness, temporal, or current-relevance interpretations of 咗.

## Open questions and blockers

- The current action-verb inventory is broader than the exact verbs independently attested in the checked sources.
- The parser's licensed-NP inventory is deliberately bounded and does not establish the complete Cantonese object system.
- The split `呢隻牌子` question needs a better lexical and contextual instrument before it can extend the claim.
- Mixed legacy instruments cannot satisfy the panel threshold, regardless of the total number of historical responses.
- `provisional` requires at least 10 usable adjudicated judgments per critical positive and boundary item from one clean role-neutral instrument.
- Next panel action: await closure and item-level audit of
  `YUE-JUDGMENT-PILOT-01` before revising the non-deployable follow-up draft; do
  not grant any respondent special status.
- Next corpus action: expand independent source diversity. The accepted
  `partial_only` packet does not complete corpus readiness.

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
