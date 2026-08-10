---
title: "DirectionalMotionVP"
type: "canto-span-construction"
construction: "DirectionalMotionVP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-09"
last_reviewed: "2026-08-10"
last_status_migrated: "2026-07-21"
source_count: 2
verified_source_count: 2
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
negative_tests_executable: true
negative_tests_passing: true
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
standard_test_file: "tests/constructions/DirectionalMotionVP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 63
standard_boundary_test_count: 14
standard_implementation_probe_count: 0
standard_executable_test_count: 77
source_ids: ["SRC-SHAN-JIN-2025-MOTION-TYPOLOGY", "SRC-YIU-2016-DIRECTIONAL-ASPECT"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 29
accepted_fixtures: 72
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-09", "canto-span/workflow/archived"]
---

# DirectionalMotionVP

## Plain-language claim

Cantonese lexical motion/path verbs can function as independent predicates. AA49 is limited to that **independently predicative motion/path role**; it is not licensed merely by the surface presence of a directional form.

Goal/location and aspect material may compose around a valid independent motion predicate where independently supported. Postverbal directional complements, compound directionals, manner + direction sequences, caused-motion directional material, and larger clause/question/discourse wrappers do not become AA49 simply because they contain `去`, `嚟`, or another directional lexeme.

The legacy runtime label `DirectionalMotionVP` is retained for compatibility and is not treated as standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_narrow_independent_motion_predicate_pending_boundary_and_runtime_alignment`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-08-10
- Source-scope decision: `RETAIN_NARROW_RESEARCH_PENDING`

## Source-bounded core

The two verified sources jointly support the distinction that matters for AA49:

1. a directional/path or motion verb may itself head an independent motion predicate;
2. the same or related directional material may instead occur as a postverbal complement or inside a larger directional complex;
3. those roles must not be collapsed by surface vocabulary alone.

Directly supported independent-predicate examples include `去`, `嚟`, `落`, and `走` profiles. Shan & Jin also discuss a broader inventory of single path verbs, but this note does not convert that broader research inventory into unrestricted runtime productivity.

Directly illustrated surroundings include endpoint/location material and perfective `咗`, for example `去北京`, `去咗辦公室`, `嚟咗辦公室`, `落咗樓下`, and `走咗`. These surroundings do not expand the AA49 identity beyond the independent predicate subspan.

Companion research records:

- `docs/research/ISSUE-712-AA49-INDEPENDENT-MOTION-SOURCE-INVENTORY-R1.md`
- `docs/research/ISSUE-712-AA49-INDEPENDENT-MOTION-PROFILES-R1.md`
- `docs/research/ISSUE-712-AA49-CURRENT-TEST-SCOPE-AUDIT-R1.md`

## Sources

### SRC-SHAN-JIN-2025-MOTION-TYPOLOGY

- Citation: [Shan, Yunming and Jin, Lixin. 2025. 粵語位移事件編碼類型再探 [Revisiting the Encoding Typology of Motion Events in Cantonese]. Language and Linguistics 26(3), 467–495.](https://doi.org/10.1075/lali.00202.sha)
- Locator: §3.1 examples 1–2; §4.1 examples 29–32; §4.3 / Table 2 discussion
- Verification: `VERIFIED_FULL_TEXT_AUTHOR_UPLOAD_AND_PUBLISHER_METADATA`
- What it supports: Cantonese directional/path verbs can function as independent predicates/path verbs; the paper separately analyzes single-verb motion encoding, serial/path encoding, and resultative encoding, including independent `走`.
- Limit: Do not infer that all general motion verbs are directional particles, that every member of the directional inventory is equally productive in every role, or that serial/compound directional material is one AA49 predicate.

### SRC-YIU-2016-DIRECTIONAL-ASPECT

- Citation: [Yiu, Carine Yuk-man (姚玉敏). 2016. 粵語繼續體「落去」和開始體「起嚟」的產生. In 漢語研究的新貌：方言、語法與文獻 / New Horizons in the Study of Chinese: Dialectology, Grammar, and Philology, pp. 261–284.](https://www.cuhk.edu.hk/ics/clrc/yue/20_carine_yiu.pdf)
- Locator: pp. 263–267; examples 10–28 and following discussion
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Yiu contrasts independent predicates such as `落咗樓下`, `去咗（辦公室）`, and `嚟咗（辦公室）` with postverbal directional-complement uses after manner or caused-motion predicates, and separately treats compound directional material.
- Limit: Do not use the surface presence of `嚟/去/落` to assign one uniform predicate/complement role or one argument structure.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 25 total; 25 accepted; 0 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

The native record therefore does not independently validate the predicate/complement analysis or the current runtime node boundaries.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/DirectionalMotionVP.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Current executable coverage: 72 positives + 2 boundaries = 74 cases.
- 2026-08-10 test-scope audit: 78 live legacy `DirectionalMotionVP` nodes across the 72 positives; only 10 are roots and 68 are nested under outer constructions.
- Observed simple live surfaces: `去` 55, `嚟` 8, `走` 4.
- Observed compound/complex live surfaces: `返嚟` 3, `落嚟` 3, `上去` 1, `返去` 1, `行入去` 1, `行出嚟` 1, `行返過嚟` 1.
- At least 12 current positive cases are outside the narrow source-bounded AA49 identity: the 11 compound/complex-directional cases plus `我帶咗三部機去啊。`, where `去` is a postverbal directional component rather than the independent motion predicate.
- The directly sourced bare independent `落` profile is not represented by a clean AA49 positive in the current fixture; observed `落` nodes are compound `落嚟`.
- The two current explicit negatives, `圖書館係乜嘢嚟㗎。` and `呢個用嚟切嘢。`, correctly show that orthographic `嚟` does not itself imply motion.
- Boundary inventory remains **incomplete** because it does not yet executable-test the central independent-predicate vs directional-complement/compound distinction.

Current fixtures remain unchanged in this research-only task. Passing historical snapshots remain implementation evidence, not linguistic evidence.

Executable or review records containing this label include:

- `review-packets/cp022-evaluation/EP-CP022-I1A-I01-D1/development-baseline.json`
- `review-packets/cp022-evaluation/EP-CP022-I1A-I02-D1/development-baseline.json`
- `review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/development-baseline.json`
- `review-packets/v0.5.181/IFR01-D1/development-baseline.json`
- `review-packets/v0.5.182/IFR02-D1/development-baseline.json`
- `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.json`
- `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.tsv`
- `test-data/WECHAT-GX-TRAVEL-002-QUEUE-D-context_disfluency_research.tsv`
- `test-data/WECHAT-GX-TRAVEL-002-QUEUE-G-grammar_research_external_evidence.tsv`
- `test-data/WECHAT-GX-TRAVEL-002-QUEUE-L-lexicon_jyutping_enrichment.tsv`
- `test-data/WECHAT-GX-TRAVEL-002-QUEUE-R-accepted_behavior_regression.tsv`
- `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.json`
- `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.tsv`
- `test-data/a1-context-status-fixture.tsv`
- `test-data/cp021b-lx1-construction-freeze-baseline.json`
- `test-data/grammar-claim-provenance-CP021B.json`
- `test-data/grammar-claim-provenance-CP021B.tsv`
- `test-data/grammar-legitimacy-audit.json`
- `test-data/grammar-legitimacy-audit.tsv`
- `test-data/native-speaker-naturalness-evidence-v1.json`
- 4 additional matching records are retained in the frozen full-schema snapshot.

## Implementation state

- Lifecycle: `runtime_referenced_with_accepted_fixtures`
- Source-scope re-audit: `completed_2026-08-10`
- Current fixture-family scope audit: `completed_2026-08-10`
- Runtime/test alignment to narrow AA49 identity: **not performed in this research task**
- Visible/focused tests: historical suite audited for evidentiary role; expectations unchanged
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: executable historical behavior retained unchanged
- Code–documentation comparison: runtime alignment remains pending because the current matcher/test family is broader than the source-bounded identity

## Open questions and blockers

- The executable boundary inventory does not yet distinguish independent motion predicates from postverbal directional complements and compound directionals.
- At least 12 historical positives require later reclassification or narrower child-span assertions.
- A clean source-linked bare `落` independent-predicate positive is missing from the current AA49 fixture family.
- The two sources do not establish the full modal, negation, particle, question, discourse, reported-speech, cognition, or clause-linking reach as AA49 linguistic evidence; those are outer-composition questions.
- Reviewed corpus evidence remains absent.
- Qualified native structural-analysis evidence remains absent.
- Held-out evidence remains absent.
- `code_document_reconciled` remains false until a separate runtime/test alignment task implements the accepted source boundary without regressing neighboring constructions.

Next action: after this source-scope re-audit is merged, open a separate accepted-specification/runtime-alignment issue that narrows the AA49 node to independently predicative single motion/path material, moves compound/complement cases to neighboring identities where possible, and adds the missing controlled positive/negative boundary matrix. Do not promote status as part of that implementation.

## Related constructions

- [[CompoundDirectionalMotionVP]]
- [[DirectedMannerMotionVP]]
- [[MotionGoalVP]]
- [[NegatedDirectionalMotionVP]]
- [[VerbComplementVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- Source-scope re-audit: issue #712 / PR #714.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
