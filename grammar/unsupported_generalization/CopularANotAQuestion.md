---
title: "CopularANotAQuestion"
type: "canto-span-construction"
construction: "CopularANotAQuestion"
status: "unsupported_generalization"
confidence: "unsupported_narrow_profile_reconciled"
claim_layer: "language"
lane: "LANE-07"
last_reviewed: "2026-07-23"
last_status_migrated: "2026-07-21"
source_count: 4
verified_source_count: 4
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
code_document_review_date: "2026-07-23"
code_document_review_commit: "5d0ee01"
code_document_code_locations: ["main.js:9290-9330", "main.js:19018"]
current_standard_reaudit_complete: true
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v3"
source_verification_file: "docs/research/CP051-P1-COPULAR-ANOTA-SOURCE-VERIFICATION-R1.tsv"
standard_test_file: "tests/constructions/CopularANotAQuestion.json"
standard_test_coverage: "positive_and_boundary"
standard_positive_test_count: 2
standard_boundary_test_count: 1
standard_implementation_probe_count: 1
standard_executable_test_count: 4
source_ids: ["SRC-LAW-2001-ANOTA", "SRC-LI-2017-ANOTA", "SRC-WONG-2023-LANGUAGE-SAMPLE", "SRC-YIP-1988-NEGATION"]
runtime_active: true
workflow_state: "archived"
workflow_priority: null
workflow_since: "2026-07-21"
workflow_reason: "narrow_full_hai6_m4_hai6_complement_and_tag_profile_reconciled_status_and_panel_work_unresolved"
runtime_code_references: 5
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-07", "canto-span/workflow/archived"]
---

# CopularANotAQuestion

## Plain-language claim

The runtime recognizes overt full `係唔係` when it is followed by an explicit
complement that is either a typed predicate/clause or a bounded nominal or
possessive expression. It does not use this label for utterance-final
`係唔係` tags with no following complement.

The checked positive evidence covers predicate/clause complements. The existing
nominal/possessive path is retained as a narrow implementation profile, not
promoted to independently established language evidence. Contracted `係咪` is
reported by the source as related but remains represented through the separate
internal `PolarQuestionFrame` path.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported_narrow_profile_reconciled`
- Current action: `retain_narrow_full_form_profile_and_complete_complement_contraction_tag_and_panel_boundaries`
- Productive acceptance eligible: **no**
- Last linguistic review: 2026-07-22

## Sources

### SRC-LAW-2001-ANOTA

- Citation: [Law, Ann. 2001. A-not-A Questions in Cantonese. UCL Working Papers in Linguistics 13: 295-318.](https://www.phon.ucl.ac.uk/publications/WPL/01papers/law.pdf)
- Locator: examples (60) and (63), article pp. 315-316 / PDF pp. 20-21
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Full overt `係唔係` before an overt clause or predicate complement.
- Limit: Law's uniform copular analysis is contested; the executable character forms normalize source romanization and do not establish every complement class.

### SRC-LI-2017-ANOTA

- Citation: [Li, Clare. 2017. The Syntactic and Pragmatic Properties of A-not-A Question in Chinese. MA thesis, University of Canterbury.](https://ir.canterbury.ac.nz/items/0764332d-7d53-44d8-a034-a0e316f2145f)
- Locator: PDF pp. 52-55 and 74-75
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Records competing analyses and distinguishes tag uses from regular A-not-A questions.
- Limit: Absence of an ordinary `係唔係` token from the three-film sample is not evidence that the form is rare, unacceptable, or absent.

### SRC-WONG-2023-LANGUAGE-SAMPLE

- Citation: [Wong, Anita M.-Y. 2023. Language Sample Analysis in Clinical Linguistics.](https://ca.talkbank.org/0docs/book.pdf)
- Locator: copula and tag question sections, printed pp. 54-55 / PDF pp. 64-65
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Distinguishes clause-internal copula questions, with `係唔係` or contracted `係咪` before the main predicate, from utterance-final tags such as `你唔去喇，係唔係呀？`.
- Limit: The descriptive coding distinction does not establish every complement or require one internal node for the full and contracted forms.

### SRC-YIP-1988-NEGATION

- Citation: [Yip, Moira. 1988. Negation in Cantonese as a Lexical Rule. Bulletin of the Institute of History and Philology 59: 449-477.](https://www11.ihp.sinica.edu.tw/storage/w2_file/3407pXasnae.pdf)
- Locator: p. 449 and discussion of suppletive `有／冇`
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Ordinary `唔` negation in `係唔係` remains distinct from the suppletive `有／冇` family.
- Limit: It does not establish this node's complement inventory or tag boundary.

## Native-speaker review

- Independent role-neutral panel records: **0**.
- Eligible responses under the current protocol: **0**.
- Positive and negative contrasts reviewed by the panel: **no**.
- No individual speaker is assigned special reviewer status.

## Negative and boundary cases

- Standard executable test file: `tests/constructions/CopularANotAQuestion.json`
- Canonical focused packet: `review-packets/cp051-p1-copular-anota-r1/focused-evaluation-packet.json`
- Positive source-linked cases: `你係唔係識講德文咋？`; `係唔係每個學生都鍾意睇電視呀？`.
- Negative source-linked tag boundary: `你唔去喇，係唔係呀？`.
- Historical implementation-only probe: `係唔係你嘅？`; linguistic evidence weight **0**.
- Current standardized coverage: **2 positives, 1 boundary, 1 zero-weight implementation probe**.
- Boundary inventory remains incomplete for nominal/possessive support, contracted `係咪`, predicate classes, particles, discourse functions, and regional judgments.

## Implementation state

- The fallback preserves both overt copular arms in fused-token or split-token input.
- It classifies the following material as either a typed predicate/clause or a bounded nominal/possessive complement.
- It rejects a no-complement terminal tag from `CopularANotAQuestion`.
- It blocks broad NP wrappers from qualifying only through inherited predicate metadata.
- Contracted `係咪` remains on the existing `PolarQuestionFrame` path.
- Code-document comparison: **PASS for the narrow runtime description above**.
- Implementation validation is reported separately from linguistic confidence.

## Open questions and blockers

- Which nominal and possessive complement profiles have direct pattern-specific support?
- Should full `係唔係` and contracted `係咪` share a public construction while retaining different internal routes?
- Which adjective, preference, modal, and larger-clause complements belong to the same profile?
- Should terminal tags receive a separate runtime representation?
- Does a role-neutral panel support the same positive and negative contrasts across relevant Cantonese varieties?
- No promotion is permitted until the current Definition of Done thresholds are met.

## Related constructions

- [[ANotAQuestion]]
- [[AcceptabilityANotA]]
- [[ModalANotAQuestion]]
- [[PolarQuestionFrame]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- Reconciliation checkpoint: `docs/research/CP051-P1-COPULAR-ANOTA-RECONCILIATION-R1.md`.

## Evidence and ontology closure guidance

- Review date: 2026-07-23
- Ontology class: Cantonese-language profile requiring narrow evidence-faithful scope
- Research finding: Four mapped sources, including Ann Law's A-not-A analysis and source-linked full `係唔係` profiles. Current note already identifies unresolved full-form, tag, and contracted `係咪` ontology.
- Recommended disposition: Retain the narrow full-form profile. Resolve whether `係咪` is a contracted subtype, a separate lexicalized question marker, or a `PolarQuestionFrame` subtype; preserve both analyses if evidence remains mixed.
- Retirement safeguard: Strong retirement veto. No removal until full `係唔係`, contracted `係咪`, terminal tag uses, complement types, and response behavior have explicit migration tests.
- Final disposition: **retain narrow** for full overt clause-internal `係唔係`; keep contracted `係咪` and terminal tags separate.
- Runtime and complete-output reach: `main.js:9290-9330` preserves both arms, optional overt subject, complement class, and particles; copular-question context handling is at `main.js:19018`.
- Checked scope and boundaries: Law, Li, Wong, and Yip support the full form, competing analyses, tag distinction, contracted form distinction, and negation-family boundary. Two positives, one tag boundary, and one zero-weight possessive probe preserve the current split.
- A1/schema decision: preserve `CopularANotAQuestion` at `unsupported_generalization`; `係咪` remains on `PolarQuestionFrame`, and no tag/complement migration is implicit.
- Unresolved work and release files: nominal/possessive evidence, contracted ontology, response behavior, corpus review, and clean panel evidence remain open; this note, baseline, and release audit record the decision.
