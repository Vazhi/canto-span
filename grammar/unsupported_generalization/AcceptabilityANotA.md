---
title: "AcceptabilityANotA"
type: "canto-span-construction"
construction: "AcceptabilityANotA"
status: "unsupported_generalization"
confidence: "unsupported_narrow_profile_reconciled"
claim_layer: "language"
lane: "LANE-07"
last_reviewed: "2026-07-23"
last_status_migrated: "2026-07-21"
source_count: 3
verified_source_count: 3
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
negative_boundary_inventory_complete: false
corpus_evidence_used: false
corpus_hits_reviewed: false
corpus_candidate_hit_count: 0
corpus_genuine_hit_count: 0
corpus_false_positive_count: 0
corpus_ambiguous_hit_count: 0
corpus_unusable_hit_count: 0
code_document_reconciled: true
code_document_review_date: "2026-07-22"
code_document_review_commit: "v0.5.206"
code_document_code_locations: ["main.js:2457-2462", "main.js:15926-15952", "main.js:21258"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
source_verification_file: "docs/research/CP049-P1-ANOTA-ACCEPTABILITY-SOURCE-VERIFICATION-R1.tsv"
standard_test_file: "tests/constructions/AcceptabilityANotA.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 1
standard_boundary_test_count: 1
standard_implementation_probe_count: 1
standard_executable_test_count: 3
source_ids: ["SRC-LI-2017-ANOTA", "SRC-LUI-2023-PREVERBAL-DAK", "SRC-SYBESMA-2013"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "narrow_source_runtime_profile_reconciled_status_and_panel_work_unresolved"
runtime_code_references: 3
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-07", "canto-span/workflow/archived"]
---

# AcceptabilityANotA

## Plain-language claim

The runtime recognizes an overt adjacent `得唔得` sequence when it is terminal,
including the checked source example `而家問題係佢嗰度得唔得先。` with
postposed `先`.  It must not treat preverbal restrictive-focus `得` as the same
construction merely because another `得` and `唔` occur later in the clause.

This is a narrow reconciled runtime profile, not a claim that every expression
ending in `得唔得`, every possible prefix, or every discourse use belongs to one
productive linguistic construction.  The label remains
`unsupported_generalization` because lexical, discourse, regional, and
speaker-judgment boundaries are incomplete.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported_narrow_profile_reconciled`
- Current action: `retain_narrow_terminal_dak_m_dak_profile_and_complete_boundaries_before_any_status_change`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-22

## Sources

### SRC-LI-2017-ANOTA

- Citation: [Li, Clare. 2017. The Syntactic and Pragmatic Properties of A-not-A Question in Chinese. MA thesis, University of Canterbury.](https://ir.canterbury.ac.nz/items/0764332d-7d53-44d8-a034-a0e316f2145f)
- Locator: PDF pp. 50-51, 74-75, and 86-88; `方唔方便`, `啱唔啱用`, and `夠唔夠`
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Attests reduced and full adjectival/evaluative A-not-A forms with convenience, suitability, and sufficiency meanings.
- Limit: It does not independently establish that `得唔得` has the same lexical category, syntax, or discourse distribution as those adjectival examples.

### SRC-LUI-2023-PREVERBAL-DAK

- Citation: [Lui, Marco Wing Yin. 2023. Preverbal Dak1 in Cantonese. Current Research in Chinese Linguistics 102(1): 67-82.](https://www.cuhk.edu.hk/ics/clrc/crcl_102_1/lui.pdf)
- Locator: article p. 71 / PDF p. 5, example (10b)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Explicitly marks `*得唔得三個鐘你可以瞓？` unavailable for questioning the preverbal restrictive-focus `得` in `得三個鐘你可以瞓`.
- Limit: This is a boundary on preverbal restrictive-focus `得`; it does not reject ordinary terminal `得唔得` questions.

### SRC-SYBESMA-2013

- Citation: [Sybesma, Rint. 2013. Cantonese sin 先 and the question of microvariation and macrovariation. In Breaking Down the Barriers: Interdisciplinary Studies in Chinese Linguistics and Beyond, 971-994. Taipei: Academia Sinica.](https://www.researchgate.net/publication/305411096_Cantonese_sin_xian_and_the_question_of_microvariation_and_macrovariation)
- Locator: author-uploaded chapter p. 10, example (11c)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Gives exact `而家問題係佢嗰度得唔得先。`, with adjacent `得唔得` immediately before postposed `先`.
- Limit: One checked example does not establish unrestricted subject, complement, particle, or standalone productivity.

## Native-speaker review

- Independent role-neutral panel records: **0**.
- Eligible responses under the current protocol: **0**.
- Positive and negative contrasts reviewed by the panel: **no**.
- No individual speaker is assigned special reviewer status.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/AcceptabilityANotA.json`
- Canonical focused packet: `review-packets/cp049-p1-anota-acceptability-r1/focused-evaluation-packet.json`
- Positive source-linked case: `而家問題係佢嗰度得唔得先。`
- Negative source-linked boundary: `得唔得三個鐘你可以瞓？`
- Historical implementation-only probe: `得唔得？`; linguistic evidence weight **0**.
- Current standardized coverage: **1 positive, 1 boundary, 1 zero-weight implementation probe**.
- Boundary inventory remains incomplete for different prefixes, particles, discourse functions, and regional judgments.

## Implementation state

- Generative route: adjacent `得 + 唔 + 得` with an optional ordinary final particle.
- Narrow legacy fallback: requires adjacent `得唔得` in terminal position and permits only the checked postposed `先` after it.
- The former token-co-occurrence fallback accepted any core containing two `得` tokens and one `唔`; v0.5.206 removes that overmatch.
- Code-document comparison: **PASS for the narrow runtime description above**.
- Implementation validation is reported separately from linguistic confidence.

## Open questions and blockers

- Which prefixes and discourse frames can naturally host terminal `得唔得`?
- Which final particles and `先` readings form the same profile rather than a separate wrapper?
- How should modal ability, permission, acceptability, and evaluative uses be distinguished?
- Does a role-neutral panel support the same positive and negative contrasts across relevant Cantonese varieties?
- No promotion is permitted until the current Definition of Done thresholds are met.

## Related constructions

- [[ANotAQuestion]]
- [[CopularANotAQuestion]]
- [[ModalANotAQuestion]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- Reconciliation checkpoint: `docs/research/CP049-P1-ANOTA-ACCEPTABILITY-RECONCILIATION-R1.md`.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: Cantonese-language profile requiring narrow evidence-faithful scope
- Research finding: `SRC-LI-2017-ANOTA`; `SRC-LUI-2023-PREVERBAL-DAK`; `SRC-SYBESMA-2013`. Current note already narrows the runtime to terminal adjacent `得唔得`, including checked postposed `先`, and excludes preverbal restrictive-focus `得`.
- Recommended disposition: Retain the narrow profile; consider a clearer learner-facing name. Keep `unsupported_generalization` or `research_pending` until lexical, discourse, regional, and panel boundaries are complete.
- Retirement safeguard: Do not retire unless the exact terminal profile can be represented transparently by another A-not-A node without loss of its `得`-specific boundary.
- Status effect: This note-only research sweep does not promote or retire the label. The current status remains unchanged until runtime, contract, and release records are reconciled in the implementation track.
