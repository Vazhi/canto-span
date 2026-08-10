---
title: "TransitiveVP"
type: "canto-span-construction"
construction: "TransitiveVP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-10"
last_reviewed: "unknown"
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
standard_test_file: "tests/constructions/TransitiveVP.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 26
standard_boundary_test_count: 7
standard_implementation_probe_count: 0
standard_executable_test_count: 33
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-WONG-2023-LANGUAGE-SAMPLE"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "not_selected_for_current_bounded_working_set"
runtime_code_references: 34
accepted_fixtures: 30
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-10", "canto-span/workflow/archived"]
---

# TransitiveVP

## Plain-language claim

Cantonese has independently documented transitive lexical predicates that relate a verbal predicate to an object constituent. The clearest directly supported surface core is `V + NP object`.

Cantonese can also realize a transitive predicate without an overt postverbal object when an independent discourse or noun-modifying relation licenses that realization. Those profiles must be represented explicitly rather than inferred from a bare action verb.

The public label `TransitiveVP` is therefore retained provisionally as an umbrella for transitive valency, but it does not authorize every historical runtime shape that happens to expose an `object`-like slot.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Source-scope decision: `RETAIN_NARROW_RESEARCH_PENDING`
- Current action: `retain_transitive_predicate_object_core_pending_runtime_alignment_and_boundary_completion`
- Productive acceptance eligible: **no**
- Current behavior-first re-audit: `docs/research/ISSUE-736-AB78-TRANSITIVE-SOURCE-INVENTORY-R1.md`
- Behavior profiles: `docs/research/ISSUE-736-AB78-TRANSITIVE-BEHAVIOR-PROFILES-R1.md`
- Runtime/test-scope audit: `docs/research/ISSUE-736-AB78-CURRENT-TEST-SCOPE-AUDIT-R1.md`

## Sources

### SRC-ALDERETE-ETAL-2017-SYNOPSIS

- Citation: [Alderete, John, Queenie Chan, Macarius Chan, Gloria Fan, and Olivia Nickel. 2017. Cantonese Grammar Synopsis.](https://www.sfu.ca/~alderete/pubs/aldereteEtal2017_cantgsyn2017-10-31.pdf)
- Locator: p. 25 §4.1 example (56); p. 38 §7 examples (104)–(105)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: a transitive `V (Asp) NP` / `VP → V NP` core; the source separately represents CP complements, ditransitives, serial-verb structures, and causative/resultative structures.
- Limit: do not assign AB78 merely because an action verb is followed somewhere by nominal, clausal, resultative, serial, or quantity-like material.

### SRC-WONG-2023-LANGUAGE-SAMPLE

- Citation: [Wong, Anita Mei-Yin. 2023. Understanding Development and Disorder in Cantonese Using Language Sample Analysis. Routledge.](https://doi.org/10.4324/9780367824013)
- Locator: Chapter 2, Section C “Sentence Structures”, especially VO, SVO, SV, Topic, Pivotal, Clausal Complement, Serial Verb, and wh-question categories
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: ordinary overt VO/SVO behavior, in-situ wh objects, and contextually recoverable object omission.
- Limit: GACS is a broad descriptive coding framework and deliberately groups some copular, existential, and reduced-ditransitive profiles under surface VO/SVO categories; those categories are not a one-to-one definition of AB78.

## Source-bounded behavioral profiles

### Overt object core

Directly supported core:

```text
lexical verbal predicate + overt NP object
```

The object may contain independently licensed NP structure such as a pronoun, numeral/classifier phrase, demonstrative phrase, or in-situ wh expression. NP-internal structure remains the responsibility of its own construction.

### Licensed non-overt realization

Independent research supports Cantonese object omission when the referent is recoverable from discourse, and Cantonese noun-modifying clauses can establish an argument relation to a head noun outside the narrow modifying clause.

These are separate realization profiles. They do not license arbitrary context-free objectless action verbs as ordinary AB78 positives, and no hidden object token should be inserted.

### Outer composition

Aspect, negation, questions, modals/desideratives, clause/discourse wrappers, and serial/purpose structures may contain a narrow transitive predicate–object relation. Their outer material does not broaden the AB78 claim.

### Neighboring structures

The attached sources distinguish simple transitive behavior from at least:

- CP/clausal complements;
- ditransitives/datives;
- pivotal structures;
- serial-verb structures as whole constructions;
- causative/resultative structures;
- existential and copular structures;
- clause-level object topicalization.

A larger structure may contain a transitive child without itself becoming AB78.

### Lexical/semantic compatibility

Structural transitivity and predicate–object semantic compatibility are separate dimensions. Semantically anomalous strings such as `食香港` or `飲香港` are not clean negative evidence for `V + NP` syntax.

### Quantity/measure material

Approximate quantity profiles such as current runtime `飲七杯度喇` are not established as the same simple `V + NP object` core by the attached evidence. Their quantity/measure and argument semantics remain unresolved relative to AB78.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_MIXED_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 13 total; 12 accepted; 1 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

These judgments do not validate the current runtime node boundaries.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/TransitiveVP.json`
- Current declared coverage: 28 historical positives + 2 explicit boundaries.
- Current source-scope audit: the 28 positive cells emit 29 live AB78 nodes; 26 bind `action_verb + object`, one noun-modifying profile binds only `action_verb`, and two approximate-measure profiles bind `consumption_verb + approximate_quantity + particle`.
- Existing explicit boundaries cover only intransitive `瞓覺` and stative `好高`.
- Boundary inventory remains **incomplete** for CP complements, ditransitives, pivotal/resultative structures, object-gap/context omission, quantity/measure material, and semantic-selection controls.
- Fixture and parser reach have linguistic evidence weight zero.

## Implementation state

- Lifecycle: `runtime_referenced_with_accepted_fixtures`
- Runtime alignment with the 2026-08-10 behavior-first re-audit: **not yet completed**.
- `code_document_reconciled`: remains false intentionally.
- Current runtime has a substantial source-compatible overt-object core, but the research audit identifies distinct non-overt and approximate-measure realization shapes that require explicit later treatment.
- No executable expectation is changed by the research re-audit itself.

## Open questions and blockers

- Decide, during a separate accepted-specification task, whether overt-object AB78 plus explicit context/gap wrappers or one umbrella transitive identity with controlled realization subtypes best fits the existing architecture.
- Audit conventional V–N activity expressions such as `講電話`, `食晏`, and `煮飯` for any lexicalization consequences relevant to parser composition.
- Establish exact context conditions for object omission before runtime licensing is generalized.
- Keep wh/quantity object profiles dependent on independently typed NP structure rather than AB78 repairing unknown material.
- Add controlled boundaries against CP complements, ditransitives, pivotal/resultative structures, and quantity/measure complements.
- Preserve semantic-selection diagnostics as lexical/semantic evidence rather than syntax evidence.
- Qualified role-neutral native panel, corpus review where relevant, and held-out evidence remain unresolved promotion gates.

## Related constructions

- [[IntransitiveVP]]
- [[ProductiveVO]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
