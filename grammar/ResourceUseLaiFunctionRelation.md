---
title: "ResourceUseLaiFunctionRelation"
type: "canto-span-construction"
construction: "ResourceUseLaiFunctionRelation"
status: "provisional_reaudit"
confidence: "not_assigned_pending_reaudit"
claim_layer: "language"
lane: "LANE-01"
last_reviewed: "2026-07-21"
last_status_migrated: "2026-07-21"
speaker_count: 0
source_count: 5
verified_source_count: 5
independent_speaker_count: 0
negative_cases_drafted: true
negative_tests_executable: false
negative_tests_passing: false
corpus_evidence_used: false
corpus_hits_reviewed: false
code_document_reconciled: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v1"
source_ids: ["SRC-CCO-LAICHIWO-VILLAGE-HOUSE", "SRC-CHEUNG-2018-LAI", "SRC-CHOR-2018-DIRECTIONAL-PARTICLES", "SRC-HKMEMORY-SHAPU-ORAL-HISTORY", "SRC-WONG-2023-LSA"]
runtime_active: true
runtime_code_references: 5
accepted_fixtures: 29
tags: ["canto-span/grammar", "canto-span/status/provisional_reaudit", "canto-span/lane/lane-01"]
---

# ResourceUseLaiFunctionRelation

## Plain-language claim

Reviewed sources attest direct resource + 用嚟/用來 + use/function predicates, but the evidence does not establish Canto Span’s full semantic resource class or all current exclusions. The runtime label remains under re-audit.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `provisional_reaudit`
- Linguistic confidence: `not_assigned_pending_reaudit`
- Current action: `prior_acceptance_withdrawn_pending_current_definition_of_done_reaudit`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-21

## Sources

### SRC-CCO-LAICHIWO-VILLAGE-HOUSE

- Citation: [Hong Kong Countryside Conservation Office. 細說村屋歷史.](https://cco.gov.hk/tc/project-stories/history-of-the-village-houses)
- Locator: quotation attributed to 屋主三民叔: 呢間屋用嚟擺嘢、養豬養牛，魚網農具都喺度
- Verification: `CURRENT_PAGE_REOPENED`
- What it supports: Directly quotes an overt house resource with 用嚟 and coordinated use predicates. The same page also has 用嚟做咗閒屋, showing broader perfective actual-use material exists outside the narrow subtype.
- Limit: The full quoted predicate is coordinated, while the frozen parser rejects or incompletely handles coordination. One quotation cannot establish unrestricted resource, predicate, or coordination productivity.

### SRC-CHEUNG-2018-LAI

- Citation: [Cheung, Hung-nin Samuel (張洪年). 2018. 緣自何來：早期粵語中「嚟」的來去踪跡. Current Research in Chinese Linguistics 97(1): 17-39.](https://www.cuhk.edu.hk/ics/clrc/crcl_97_1/cheung_hung_nin_samuel.pdf)
- Locator: PDF pp.3–4; article pp.20–21, section 5 and footnote 9
- Verification: `FULL_TEXT_REOPENED`
- What it supports: Describes V1 + 嚟 + V2 as purposive and states 用來/用嚟 has become a disyllabic expression.
- Limit: Does not establish the parser’s overt-resource subtype, no-user/no-modal/no-perfective boundaries, or productive lexical scope.

### SRC-CHOR-2018-DIRECTIONAL-PARTICLES

- Citation: Chor, Winnie Oi-Wan. 2018. Directional Particles in Cantonese. John Benjamins.
- Locator: chapter 4 purpose extension discussion; example 啲錢我用嚟買晒嗰堆嘢
- Verification: `FULL_TEXT_REOPENED`
- What it supports: Documents broader purposive 用嚟 with a separate overt user and a completed actual-use event.
- Limit: Supports exclusion of the broader frame from the narrow parser subtype; it does not prove the narrow subtype productive.

### SRC-HKMEMORY-SHAPU-ORAL-HISTORY

- Citation: [Hong Kong Memory. 紅姑—沙埔村的四進竹筒屋. New Territories West oral-history collection.](https://www.hkmemory.org/ntw/text/index.php?catId=574&p=home)
- Locator: final sentence of the descriptive paragraph: 另一邊用來儲物
- Verification: `CURRENT_PAGE_REOPENED`
- What it supports: Contains an overt spatial part followed by 用來 and the storage predicate 儲物.
- Limit: Supports this exact written spatial profile only; it is not a marked direct quotation and does not establish spoken naturalness or parser boundaries.

### SRC-WONG-2023-LSA

- Citation: Wong, Anita M.-Y. 2023. Understanding Development and Disorder in Cantonese Using Language Sample Analysis. Routledge.
- Locator: chapter 4, printed p.50; PDF p.60, Instrumental SVC section
- Verification: `FULL_TEXT_REOPENED`
- What it supports: Classifies 呢個用嚟切嘢 as an Instrumental SVC; says the instrument may be omitted or moved to subject position with 用嚟, followed by a verb specifying the action performed through use of the instrument.
- Limit: Supports the surface and a competing instrumental-SVC analysis, not a unique intended-function node, exhaustive resource classes, or the parser exclusions.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NO_COMPLETED_CONTROLLED_SPEAKER_REVIEW_SECOND_SPEAKER_FROZEN`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `FROZEN_BY_USER_NOT_WAIVED`.

## Negative and boundary cases

- Evidence state: `source_linked_profile_split_plus_v0.5.182_locked_separate_user_modal_copular_actual_use_instrumental_general_purpose_negation_A_not_A_reduplication_and_omission_boundaries`
- Executable or review records containing this label:
  - `review-packets/v0.5.181/IFR01-D1/focused-evaluation-packet.json`
  - `review-packets/v0.5.182/IFR02-D1/development-baseline.json`
  - `review-packets/v0.5.182/IFR02-D1/focused-evaluation-packet.json`
  - `test-data/grammar-authority-origin-CP021B.tsv`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-claim-source-edges-CP021A.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `v0.5.184_runtime_governance_aligned_linguistic_reaudit_open`
- Visible/focused tests: `CP026_22_CASE_PROBE_6_NARROW_TARGET;5_BROAD_ONLY;11_NO_RELATION`
- Render review: `historical_render_pass_retained_software_only`
- Held-out evaluation: `PROSPECTIVE_8_OF_8_PASS_CONSUMED_SOFTWARE_ONLY`
- Regression: `545_of_545_pass`
- Code–documentation comparison: `FAIL_CP026_SEMANTIC_RESOURCE_SCOPE_AND_COORDINATION;METADATA_NOW_ALIGNED`

## Open questions and blockers

- full current Definition of Done remains incomplete
- one independent Speaker A positive+comparison review; plain-language claim narrowed to current evidence
- first-speaker review; second independent speaker frozen; semantic resource/predicate scope; coordination coverage; exact code-doc alignment
- CP026 found one direct quote, one editorial interview-derived narrative, one published illustrative example, one purposive/conventionalization source, and one boundary source. Runtime status metadata is aligned in v0.5.184; semantic resource/predicate scope and coordinated predicate coverage remain unresolved. No speaker review; second-speaker work is frozen.
- Runtime status metadata now agrees with governance. Semantic resource/predicate licensing and coordinated source-predicate coverage remain unresolved; second-speaker work remains frozen.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ResourceUseLaiFunctionRelation?
- Next evidence action: Specify a narrower evidence-backed resource-function interface; Speaker A may be collected when convenient; keep Speaker B frozen.

## Related constructions

No same-family active construction was identified in the canonical consolidation table.

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
