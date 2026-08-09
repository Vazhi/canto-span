---
title: "MannerAdverbialVP"
type: "canto-span-construction"
construction: "MannerAdverbialVP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-09"
last_reviewed: "2026-07-22"
last_status_migrated: "2026-07-21"
source_count: 2
verified_source_count: 2
panel_response_count_total: 0
eligible_panel_response_count: 0
minimum_usable_judgments_per_critical_item: 0
critical_contrast_coverage: "none"
survey_instrument_version: null
survey_instrument_status: "not_started"
survey_instrument_quality_resolved: false
quality_screen_status: "not_started"
panel_adjudication_status: "not_started"
recruitment_channels: []
respondent_role_neutral: true
native_positive_contrasts_reviewed: false
native_negative_contrasts_reviewed: false
panel_evidence_model_version: "v2"
panel_review_state_file: "review-packets/native-panel/active-v2/panel-review-state.json"
panel_policy_file: "review-packets/native-panel/active-v2/panel-policy.json"
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
code_document_review_date: "2026-08-09"
code_document_review_commit: "ec8468014d38a9445891a164b403bf49bc7eb9d6"
code_document_code_locations: ["src/parser/detectors/manner/adjustment.js:markedMannerVPForCore", "src/parser/detectors/manner/adjustment.js:mannerAdverbialVPFallback", "main.js:mannerAdverbialVPFallback"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
standard_test_file: "tests/constructions/MannerAdverbialVP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 4
standard_boundary_test_count: 14
standard_implementation_probe_count: 0
standard_executable_test_count: 18
source_ids: ["SRC-LEUNG-2014-COVERBS", "SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 4
accepted_fixtures: 1
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-09", "canto-span/workflow/archived"]
---

# MannerAdverbialVP

## Plain-language claim

Cantonese permits a reduplicated manner expression followed by overt 咁／噉 before a following action VP in source-attested manner-adverbial examples. AA84 is restricted to this overt marked relation; bare `慢慢 + VP`, bare AABB forms, and `AA地 + VP` do not inherit AA84 automatically.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_narrow_source_linked_overt_adverbializer_path`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-22
- Runtime-boundary reconciliation: 2026-08-09 from the accepted #611 / PR #613 research packet; no status or evidence promotion was made.

## Sources

### SRC-LEUNG-2014-COVERBS

- Citation: [Leung, H. H. 2014. Cantonese Coverbs: A Syntactic Reanalysis. MA qualifying paper, University of California, Berkeley.](https://linguistics.berkeley.edu/~herman/documents/CantoneseCoverbs_MAPaper_Leung.pdf)
- Locator: pp. 13-15, examples (29a-b) and discussion
- Verification: `VERIFIED_FULL_TEXT_CORROBORATIVE`
- What it supports: 琴日慢慢噉食飯 is contrasted with a disfavored reverse order.
- Limit: Do not label time adverbs as manner or convert a theory-specific height analysis into parser truth.

### SRC-ZHENG-ZHANG-GAO-2021-HK-CANTONESE-COURSE

- Citation: [鄭定歐、張勵妍、高石英. 2021. 粵語（香港話）教程（修訂版）（錄音掃碼即聽版）. 香港: 三聯書店.](https://www.jointpublishing.com/publishing/%E7%B2%B5%E8%AA%9E%EF%BC%88%E9%A6%99%E6%B8%AF%E8%A9%B1%EF%BC%89%E6%95%99%E7%A8%8B/)
- Locator: printed p. 336: 慢慢噉形成咗一套較為完善嘅公屋制度
- Verification: `VERIFIED_USER_PROVIDED_FULL_TEXT_AND_OFFICIAL_PUBLISHER_METADATA`
- What it supports: The expression includes repeated 慢, overt 噉, and an aspect-marked predicate.
- Limit: Do not infer that every repeated property form combines with every predicate or aspect.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/MannerAdverbialVP.json`.
- Accepted regression: `佢慢慢噉食飯。` preserves an outer `SubjectPredicateClause` with nested `MannerAdverbialVP` spanning only `慢慢噉食飯`; the subject no longer belongs to the AA84 VP node.
- Positive composition coverage includes direct object-bearing VP, perfective VP, and an outer temporal frame over nested AA84.
- Bare `佢慢慢行。` is now an explicit outside-AA84 boundary rather than a zero-evidence reachability positive.
- Collision coverage rejects or leaves outside AA84: bare `AA地`, property predication, frequency repetition, fourfold repetition/repair-like material, unknown repeated material, incomplete marked forms, unsupported postverbal order, unrelated temporal intervention, and documented complex marked forms whose modifier/VP prerequisites are not yet independently typed by the runtime.
- Evidence state: `narrow_overt_marked_runtime_reconciled_with_controlled_boundaries`.
- Executable or review records containing this label or prior hypotheses:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/pre-intermediate-gold-corpus.tsv`

## Implementation state

- Lifecycle: `runtime_referenced_with_narrow_source_linked_fixture`
- Runtime invariant: independently typed source-linked reduplicated manner constituent + overt `咁／噉` + independently typed following VP.
- Generic bare `A + A + VP`: removed from AA84.
- Raw equality of arbitrary repeated token surfaces: not a licensing rule.
- Clause composition: subject and temporal material are kept outside AA84 by transparent outer wrappers; final particles remain outside the narrow VP span.
- Inner VP preservation: object-bearing and perfective VP structure remains nested rather than being rebuilt from leftover tokens.
- Visible/focused tests: 4 positive references and 14 explicit boundaries; no zero-evidence implementation reachability probe remains.
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Code–documentation comparison: `reconciled_to_issue_611_accepted_boundary_2026_08_09`

## Open questions and blockers

- The exact lexical productivity of reduplicated manner forms remains untested.
- Bare lexical `慢慢 + VP` is supported as a neighboring lexical adverbial profile but remains outside AA84; this implementation creates no new bare-manner identity.
- Documented `AA地咁／噉`, `大大力咁`, and `細細聲咁` variants require independently typed modifier constituents and typed following VPs before the current AA84 matcher may consume them.
- Speaker-panel, reviewed corpus, and held-out evidence remain absent; promotion is not eligible.
- Research question: Which externally documented Cantonese constructions, if any, justify broader typed modifier profiles without weakening the current AA84 boundary?

## Related constructions

- [[DegreeMannerAdverbial]]
- [[DegreeMannerModifiedVP]]
- [[ReduplicatedVP]]

## Migration provenance

- Accepted boundary packet: `docs/research/ISSUE-611-REDUPLICATED-MANNER-PROFILES-R1.md` and its source inventory.
- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
