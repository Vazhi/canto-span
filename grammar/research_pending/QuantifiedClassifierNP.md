---
title: "QuantifiedClassifierNP"
type: "canto-span-construction"
construction: "QuantifiedClassifierNP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-06"
last_reviewed: "2026-08-10"
last_status_migrated: "2026-07-21"
source_count: 3
verified_source_count: 3
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
standard_test_file: "tests/constructions/QuantifiedClassifierNP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 36
standard_boundary_test_count: 10
standard_implementation_probe_count: 0
standard_executable_test_count: 46
source_ids: ["SRC-BOND-SIO-2024-CLASSIFIERS", "SRC-LAM-LAU-LEE-2024-SEGMENTATION", "SRC-XIA-2025-CLASSIFIERS"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 22
accepted_fixtures: 23
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-06", "canto-span/workflow/archived"]
---

# QuantifiedClassifierNP

## Plain-language claim

Cantonese has a well-documented **numeral + classifier + noun** NP pattern, such as `三本書` and `兩個人`. A related headless **numeral + classifier + omitted noun** profile is also independently documented when the missing noun is recoverable from context.

AB45 is limited to that classifier-NP family. Demonstratives may compose outside a quantified classifier NP, but wh quantities, container/measure expressions, age/dimension units, bare numerals, and classifier–noun incompatibility controls do not inherit AB45 evidence merely because the runtime currently exposes a similar quantity/classifier slot pattern.

The runtime name `QuantifiedClassifierNP` is a project label, not a claim that every Cantonese quantity expression has one uniform syntactic analysis.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Source-scope decision: `RETAIN_NARROW_RESEARCH_PENDING`
- Current action: `retain_narrow_classifier_np_core_pending_runtime_and_boundary_alignment`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-08-10

## Source-bounded core

### Overt Num–CL–N

The strongest shared source-supported profile is:

```text
numeral + classifier + overt noun
```

Bond & Sio explicitly list Cantonese `X-C-N` and give `一個蘋果`. Lam, Lau & Lee describe Cantonese quantity expressions as `Numeral + Classifier + Noun` and give `三本書` and `兩個人`. Xia likewise states that classifiers intervene between numeral and noun in Cantonese and separately analyzes the classifier-NP structure.

This supports ordinary, semantically compatible count-classifier NPs such as `兩本書`, `三隻貓`, and `兩個老師` when the classifier itself is independently licensed for the noun class.

### Context-linked Num–CL–ØN noun ellipsis

Lam, Lau & Lee directly contrast `佢有 *兩` with `佢有兩本` in a context where `書` is recoverable. Xia independently states that Cantonese permits the head noun in `Num-CL-N` to be elided while the classifier cannot be omitted.

This supports a related headless profile:

```text
Num + CL + ØN
```

The profile is **noun ellipsis**, not evidence that every context-free `Num + CL` string is equivalent to an overt-head classifier NP or to a bare numeral. A later runtime specification must decide whether ellipsis remains an AB45 subtype or is represented by an explicit context/ellipsis wrapper.

### Demonstrative outer composition

The sources distinguish larger demonstrative classifier phrases from the internal numeral-classifier-noun material. `呢三本書` may therefore contain a narrow AB45 child `三本書` while the demonstrative remains owned by the larger nominal structure.

Companion research records:

- `docs/research/ISSUE-724-AB45-QUANTIFIED-CLASSIFIER-SOURCE-INVENTORY-R1.md`
- `docs/research/ISSUE-724-AB45-QUANTIFIED-CLASSIFIER-PROFILES-R1.md`
- `docs/research/ISSUE-724-AB45-CURRENT-TEST-SCOPE-AUDIT-R1.md`

## Sources

### SRC-BOND-SIO-2024-CLASSIFIERS

- Citation: [Bond, Francis and Joanna Ut-Seong Sio. 2024. A Construction-based Approach to Cantonese Classifiers. Proceedings of the 31st International Conference on Head-Driven Phrase Structure Grammar, 60–75.](https://doi.org/10.21248/hpsg.2024.4)
- Locator: pp. 61–62; Table 1; example 1
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Cantonese `X-C-N` is an explicit NP schema; `一個蘋果` illustrates numeral + classifier + noun. The paper separately distinguishes `D-(X)-C-N`, `C-N`, and bare N profiles.
- Limit: The paper explicitly limits its `X` discussion to numerals. Do not infer that wh quantity, every measure expression, or every headless quantity string is the same construction; classifier choice is not unrestricted.

### SRC-LAM-LAU-LEE-2024-SEGMENTATION

- Citation: [Lam, Charles, Chaak Ming Lau, and Jackson L. Lee. 2024. Multi-Tiered Cantonese Word Segmentation. Proceedings of LREC-COLING 2024, 11993–12002.](https://aclanthology.org/2024.lrec-main.1047/)
- Locator: p. 11997, §4.3; example 1
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Cantonese quantity expressions use `Numeral + Classifier + Noun`; `三本書` and `兩個人` are explicit examples. In nominal ellipsis, `兩本` is accepted where bare `兩` is not. `哩兩個人` also illustrates demonstrative composition around quantified classifier material.
- Limit: The paper is primarily about segmentation. Do not treat its segmentation brackets as uniquely decisive syntax or turn noun ellipsis into unrestricted context-free headlessness.

### SRC-XIA-2025-CLASSIFIERS

- Citation: [Xia, Hengliang. 2025. Syntax of Classifiers and Measure Words in Three Chinese Languages. Proceedings of the 2025 Annual Conference of the Canadian Linguistic Association.](https://cla-acl.ca/pdfs/actes-2025/Xia-CLA-2025.pdf)
- Locator: pp. 1–2, 3–6, 8, 10–11; Table 1; ellipsis discussion following example 14
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Cantonese classifier NPs normally use `Num-CL-N`; head nouns may be elided while classifiers remain overt. Xia explicitly distinguishes classifiers from measure words and assigns Cantonese classifier and measure-word NPs different structural analyses.
- Limit: Do not transfer classifier-NP evidence automatically to container measures, conventional units, age/dimension expressions, or other runtime `unit_word` material.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 4 total; 4 accepted; 0 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

The native record does not independently validate the overt-head vs ellipsis analysis, classifier/measure distinction, or current runtime boundaries.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/QuantifiedClassifierNP.json`
- Evidence state: `fixture_level_not_provenance_linked`
- Current executable coverage: 44 positives + 2 explicit boundaries = 46 cases.
- 2026-08-10 fixture-scope audit, mutually exclusive research roles:
  - 19 clean overt Num–CL–N core candidates;
  - 8 headless Num–CL ellipsis candidates;
  - 3 ordinary container-measure profiles;
  - 6 classifier/measure compatibility controls;
  - 6 age/dimension profiles;
  - 1 wh-quantity profile;
  - 2 explicit non-AB45 boundaries;
  - 1 demonstrative outer-composition case.
- Current explicit negatives `本書` and `呢個` are useful but do not close the core source-backed boundaries.
- Boundary inventory remains **incomplete**.

Important boundary dispositions:

- **Wh quantity:** `幾多個字` is currently recognized by the runtime but is not established by the three attached sources as the same numeral-classifier construction. Keep unresolved pending dedicated research.
- **Container measures:** `飲七杯`, `三杯茶`, and `兩碗飯` belong to a measure-word domain in Xia’s analysis and must not count as AB45 classifier-core evidence.
- **Age/dimension:** `三歲`, `五百呎`, `張枱三呎`, and related strings are not directly classified as AB45 by the attached sources. Keep unresolved rather than forcing a replacement identity.
- **Compatibility controls:** `三本水`, `三杯書`, `三間醫生`, `三隻餐廳`, `三本電話`, and `三張水` test classifier/measure–noun selection. Their degraded status is not a clean negative boundary on Num–CL–N syntax.
- **Bare numeral:** Lam et al. directly distinguish bare `兩` from licensed ellipsis `兩本` in the tested context.

Current fixtures remain unchanged in this research-only task. Parser success and fixture frequency remain implementation evidence only.

Executable or review records containing this label include:

- `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.json`
- `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.tsv`
- `test-data/WECHAT-GX-TRAVEL-002-QUEUE-D-context_disfluency_research.tsv`
- `test-data/WECHAT-GX-TRAVEL-002-QUEUE-G-grammar_research_external_evidence.tsv`
- `test-data/WECHAT-GX-TRAVEL-002-QUEUE-L-lexicon_jyutping_enrichment.tsv`
- `test-data/WECHAT-GX-TRAVEL-002-QUEUE-R-accepted_behavior_regression.tsv`
- `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.json`
- `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.tsv`
- `test-data/cp021b-lx1-construction-freeze-baseline.json`
- `test-data/grammar-claim-provenance-CP021B.json`
- `test-data/grammar-claim-provenance-CP021B.tsv`
- `test-data/grammar-legitimacy-audit.json`
- `test-data/grammar-legitimacy-audit.tsv`
- `test-data/native-speaker-naturalness-evidence-v1.json`
- `test-data/native-speaker-naturalness-evidence-v1.tsv`
- `tests/fixtures/np-subsystem.json`
- `tests/fixtures/regression-snapshots.json`

## Implementation state

- Lifecycle: `runtime_referenced_with_accepted_fixtures`
- Source-scope re-audit: `completed_2026-08-10`
- Current fixture-family scope audit: `completed_2026-08-10`
- Runtime/test alignment to source-bounded AB45: **not performed in this research task**
- Visible/focused tests: historical suite audited for evidentiary role; expectations unchanged
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: historical behavior retained unchanged
- Code–documentation comparison: runtime alignment remains pending because the current label covers classifier, ellipsis, measure, wh, and dimension profiles beyond the source-bounded core

## Open questions and blockers

- Determine the runtime representation of context-linked Num–CL noun ellipsis without treating context-free headlessness as automatically licensed.
- Research the Cantonese wh-quantity + classifier profile independently before deciding whether it is an AB45 subtype or a sibling construction.
- Establish the correct runtime owner(s) for container measure words and conventional measure/unit expressions before removing them from AB45.
- Establish source-backed treatment of age/dimension expressions such as `三歲` and `五百呎`.
- Preserve classifier–noun compatibility controls as lexical/semantic diagnostics rather than syntax evidence.
- Reviewed corpus evidence remains absent.
- Qualified native structural-analysis evidence remains absent.
- Held-out evidence remains absent.
- `code_document_reconciled` remains false until a separate runtime/test alignment task implements the accepted boundaries.

Next action: after this research re-audit merges, defer AB45 runtime alignment until the active AA49 v0.5.221 branch is published/merged, because that branch modifies shared generic VP/template infrastructure. Then open a separate accepted-specification task that narrows AB45 to the sourced classifier core, represents ellipsis explicitly, and routes measure/wh/dimension profiles only where independently licensed. Do not promote linguistic status as part of implementation.

## Related constructions

- [[ApproximateQuantity]]
- [[ClassifierObjectNP]]
- [[QuantifiedPersonNP]]
- [[QuantifiedTimeNP]]
- [[QuantityNP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- Source-scope re-audit: issue #724 / PR #726.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
