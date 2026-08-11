---
title: "ProductiveVO"
type: "canto-span-construction"
construction: "ProductiveVO"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-10"
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
current_standard_reaudit_complete: true
source_scope_matches_claim: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/ProductiveVO.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 25
standard_boundary_test_count: 2
standard_implementation_probe_count: 0
standard_executable_test_count: 27
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-WONG-2023-LANGUAGE-SAMPLE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 44
accepted_fixtures: 22
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10", "canto-span/workflow/archived"]
---

# ProductiveVO

## Canonical identity and runtime compatibility

- Permanent identity: **AB35 `VerbObjectCompound`**.
- Permanent UUID: `1dcefdcf-a978-5cf5-8045-26db1d6f5c1a`.
- Legacy runtime label and note path: `ProductiveVO`.
- Accepted profile: `LexicallyRestrictedVerbObjectCompoundPredicate`.
- Runtime migration: **pending**; the current 43-entry legacy whitelist remains broader than the canonical linguistic identity.
- Ordinary transparent V–NP behavior belongs to the separately adjudicated AB78 domain where independently justified.

## Plain-language claim

AB35 represents the independently supported Cantonese lexical verb–object-compound domain. Membership is lexical and item-specific: V–O surface order alone does not establish compound identity, unrestricted productivity, separability, or an ordinary semantic object relation between the visible components.

The current `ProductiveVO` runtime compatibility list is broader than this canonical claim and still mixes source-backed compounds with ordinary V–NP and unresolved activity expressions. Runtime behavior therefore remains intentionally unreconciled pending the separately specified migration.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `canonical_identity_narrowed_runtime_migration_pending`
- Behavior/source disposition: `NARROW_VERB_OBJECT_COMPOUND_IDENTITY_ACCEPTED_RUNTIME_BROADER`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-08-10
- Runtime/test frequency carries independent linguistic evidence weight: **0**

## Sources

### SRC-ALDERETE-ETAL-2017-SYNOPSIS

- Citation: [Alderete, John, Queenie Chan, Macarius Chan, Gloria Fan, and Olivia Nickel. 2017. Cantonese Grammar Synopsis.](https://www.sfu.ca/~alderete/pubs/aldereteEtal2017_cantgsyn2017-10-31.pdf)
- Locator: printed pp. 21–24, §3.3 and §4.1; printed p. 37, §5.2 simple VP inventory.
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The synopsis separately analyzes Cantonese V–O compounds and ordinary verb subcategorization. V–O compounds include `讀書` and lexical `飲茶` ‘have dim sum’; ordinary transitive syntax is `[V (Asp) NP]`, with `做緊功課` directly illustrated as an ordinary VP.
- Limit: V–O surface order alone does not establish compound status or valency. Do not use this source to turn a closed lexical list into an unrestricted V+noun grammar rule.

### SRC-WONG-2023-LANGUAGE-SAMPLE

- Citation: [Wong, Anita Mei-Yin, with Candice Chi-Hang Cheung, Jessica Man-Wai Lo, and Emily Ka-Hei Wan. 2022. Grammatical Analysis of Cantonese Samples. In Understanding Development and Disorder in Cantonese Using Language Sample Analysis. Routledge.](https://doi.org/10.4324/9780367824013-2)
- Locator: Chapter 2, p. 23, §2.3 “A type-based scoring system”.
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: GACS scores up to four unique exemplars of an item as a practical developmental/clinical indicator that a child has some abstract grammatical knowledge.
- Limit: GACS “productive” is a language-sample scoring concept. It does not establish an adult Cantonese construction named ProductiveVO, unrestricted lexical productivity, or the compound status of a particular V–O surface.

## Independent primary-source cross-checks from the 2026-08-10 re-audit

These sources are recorded in the issue #744 research inventory as independent checks. They do not change the canonical `source_ids` in this task.

- Bodomo, Adams, So-sum Yu & Dewei Che. 2017. “Verb-Object Compounds and Idioms in Chinese.” DOI `10.1007/978-3-319-69805-2_27`.
  - Direct Cantonese diagnostics contrast ordinary V–NP `爬山`-type phrases with lexical V–O compounds and analyze `游水` as a Cantonese VOC whose components may be separated while retaining unitary lexical semantics.
- Chan, Sheila S. L. & Lawrence Y. L. Cheung. 2020. “Morpho-Syntax of Non-VO Separable Compound Verbs in Cantonese.” DOI `10.2478/scl-2020-0007`.
  - Cantonese VO-compound separability is lexically variable rather than governed by one unrestricted rule; their Cantonese study collected 878 VO compounds and found only 62% separable under the study criterion.

See:

- `docs/research/ISSUE-744-AB35-PRODUCTIVE-VO-SOURCE-INVENTORY-R1.md`
- `docs/research/ISSUE-744-AB35-PRODUCTIVE-VO-BEHAVIOR-PROFILES-R1.md`
- `docs/research/ISSUE-744-AB35-CURRENT-TEST-SCOPE-AUDIT-R1.md`

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 6 total; 6 accepted; 0 rejected.
- Structural-analysis validations: 0.
- These naturalness judgments do not decide ordinary-transitive versus lexical-compound analysis.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/ProductiveVO.json`
- Evidence state: `historical_implementation_family_not_behaviorally_controlled`
- Current fixture: 22 snapshot positives and 2 boundaries.
- The positives use only six recurring V–O-shaped lexical surfaces (`食飯`, `做功課`, `打電話`, `飲水`, `摘芒果`, `打籃球`) under many outer wrappers.
- The only explicit boundaries are stative `佢好高` and locative `喺屋企`; they do not test the decisive ordinary-transitive versus lexical-V–O-compound distinction.
- Several source-backed Cantonese V–O compounds already present in the runtime whitelist (`飲茶`, `游水`, `沖涼`) are not directly exercised by the standard positive fixture.

Executable or review records containing this label include:

- `review-packets/cp022-evaluation/EP-CP022-I1A-I01-D1/development-baseline.json`
- `review-packets/cp022-evaluation/EP-CP022-I1A-I02-D1/development-baseline.json`
- `review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/development-baseline.json`
- `test-data/a1-context-status-fixture.tsv`
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
- Runtime resource: `src/runtime-resources/lexicon/productive-vo.js`
- Runtime implementation is a closed lexical surface list, not an unrestricted V+noun generator.
- The list mixes transparent object-taking VPs, source-backed lexical V–O compounds, and unresolved activity expressions.
- Code–documentation reconciliation remains **false** because issue #744 is research-only and intentionally defers runtime rehoming.
- Held-out evaluation: `NOT_ESTABLISHED`

## Behavior-first 2026-08-10 disposition

### Ordinary transitive domain

Transparent predicate–object material belongs to the ordinary transitive behavior domain when an independently typed NP object is present. `做功課` is directly source-illustrated as ordinary `[V Asp NP]`; current whitelist membership does not create a second ProductiveVO analysis.

### Lexical V–O-compound domain

Cantonese independently has V–O compounds with mixed lexical/phrasal behavior. Source-backed examples include `飲茶`, `游水`, and `沖涼`. Compound membership and separability are item-specific and may require lexical diagnostics.

### Unresolved activity expressions

Current high-frequency AB35 surfaces such as `食飯`, `打電話`, and `打籃球` are not assigned a compound analysis merely from intuition, fixture repetition, or usefulness as learner vocabulary. `打籃球` remains independently attested as an embedded activity VP, but that does not prove V–O-compound status or a generic `打 + noun` construction.

### Higher composition

Modal, question, particle, locative, temporal, reported-speech, manner, serial, sequencing, motion/purpose, and permissive wrappers remain outer composition. Their presence in historical ProductiveVO snapshots does not broaden the embedded lexical identity.

## Open questions and blockers

- Migrate the broad legacy `ProductiveVO` whitelist without turning all 43 historical entries into `VerbObjectCompound` positives.
- Implement the initial source-linked current-whitelist compound seed only for `飲茶`, `游水`, and `沖涼`; `讀書` remains a source-backed research example until runtime lexicon expansion is separately authorized.
- Preserve visible compound components without deriving an ordinary semantic `object` role merely from their V–O order.
- Rehome directly supported ordinary V–NP material such as `做功課` through AB78 in a separate runtime task.
- Resolve `煮嘢食`, `下棋`, and `做運動` independently before removing legacy compatibility behavior that still covers them.
- Keep `食飯`, `打電話`, `打籃球`, and other conventionalized activity candidates unresolved until item-specific evidence settles their analysis.
- Complete corpus, role-neutral panel, negative-boundary, and held-out gates before any linguistic promotion.

## Related constructions

- [[IntransitiveVP]]
- [[TransitiveVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.

## v0.5.200 reviewed activity-VP addition

- `打籃球` was added to the constrained reviewed runtime surface inventory because it was independently attested as the embedded activity VP in a permissive 畀 construction.
- The addition preserves visible verb and object children and prevents `籃球` from being misreported as a retained patient of the surrounding 畀 relation.
- The 2026-08-10 re-audit clarifies the evidentiary limit: this supports that embedded activity VP in context, **not** a V–O-compound classification, arbitrary `打 + noun`, or a generic ProductiveVO construction.
