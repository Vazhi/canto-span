---
title: "ReportedSpeech"
type: "canto-span-construction"
construction: "ReportedSpeech"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-08"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 5
verified_source_count: 5
independent_speaker_count: 1
negative_cases_drafted: true
negative_tests_executable: false
negative_tests_passing: false
corpus_evidence_used: false
corpus_hits_reviewed: false
code_document_reconciled: false
implementation_validation_separate: true
independent_evidence_beyond_internal_tests: true
promotion_gate_version: "v1"
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-LUI-2025-REPORTED-THOUGHT", "SRC-MATTHEWS-2021-COMPLEMENTIZER-PROBLEMS", "SRC-YAP-WONG-CHOR-2014-STANCE", "SRC-YEUNG-2006-WAA6-COMPLEMENTIZER"]
runtime_active: true
runtime_code_references: 8
accepted_fixtures: 7
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-08"]
---

# ReportedSpeech

## Plain-language claim

Cantonese may instantiate the structural family represented by ReportedSpeech; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_provisional_pending_pattern_specific_attestation_and_heldout_review`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-ALDERETE-ETAL-2017-SYNOPSIS

- Citation: [Alderete, John, Queenie Chan, Macarius Chan, Gloria Fan, and Olivia Nickel. 2017. Cantonese Grammar Synopsis.](https://www.sfu.ca/~alderete/pubs/aldereteEtal2017_cantgsyn2017-10-31.pdf)
- Locator: p. 27, examples (69ii-iii)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The synopsis gives Wah says [self will manage] and Grandma says [Ming does not know how to take care of self].
- Limit: Do not infer a quotation boundary, complementizer, addressee, or truth commitment.

### SRC-LUI-2025-REPORTED-THOUGHT

- Citation: [Lui, Pun Ho. 2025. Reported Thought in Cantonese. Asian Languages and Linguistics, accepted preprint.](https://www.researchgate.net/publication/391644894_Reported_Thought_in_Cantonese)
- Locator: sections 1 and 5
- Verification: `VERIFIED_AUTHOR_ACCEPTED_PREPRINT`
- What it supports: Reported constructions introduce attributed speech or thought content as distinct discourse acts.
- Limit: Do not paraphrase reported content as speaker-confirmed fact.

### SRC-MATTHEWS-2021-COMPLEMENTIZER-PROBLEMS

- Citation: [Matthews, Stephen. 2021. Some unresolved problems in Cantonese grammar. Seminar paper, Lund Circle of East Asian Linguistics, 18 October 2021.](https://hub.hku.hk/handle/10722/312156)
- Locator: official abstract, example 佢同我講話冇錢喎
- Verification: `VERIFIED_OFFICIAL_REPOSITORY_ABSTRACT`
- What it supports: Matthews notes conflict among CP proposals and cites evidence against forming a CP with the following clause.
- Limit: Do not present complementizer status as settled Cantonese fact.

### SRC-YAP-WONG-CHOR-2014-STANCE

- Citation: [Yap, Foong Ha, Tak-sum Wong, and Winnie Oi-wan Chor. 2014. Clause-medial particles and stance marking in Cantonese.](https://ira.lib.polyu.edu.hk/bitstream/10397/6984/1/Yap_Clause-medial_Particles_Stance-marking.pdf)
- Locator: slides 33 and 37-41
- Verification: `VERIFIED_INSTITUTIONAL_FULL_TEXT`
- What it supports: The presentation gives lexical 人哋話… and earlier 聽講話… patterns in a grammaticalization account.
- Limit: Do not turn a diachronic pathway into a synchronic free alternation.

### SRC-YEUNG-2006-WAA6-COMPLEMENTIZER

- Citation: [Yeung, Ka-Wai. 2006. On the Status of the Complementizer WAA6 in Cantonese. Taiwan Journal of Linguistics 4(1):1-48.](https://toaj.stpi.niar.org.tw/index/journal/volume/article/4b1141f983eb49dc0183f05012b40332)
- Locator: official abstract
- Verification: `VERIFIED_OFFICIAL_ABSTRACT`
- What it supports: The proposed waa6_3 selects an IP and differs from lexical speech verb waa6_1.
- Limit: Do not infer that the runtime lexical-speech template covers complementizer-like sequences.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 2 total; 2 accepted; 0 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

## Negative and boundary cases

- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
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
  - `test-data/regression-snapshots.json`

## Implementation state

- Lifecycle: `runtime_referenced_with_accepted_fixtures`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `pending_current_definition_of_done_line_by_line_review`

## Open questions and blockers

- no explicit external claim-source edge
- checked_exact_source;one_speaker_positive_negative_review;drafted_negative_boundaries;independent_evidence_beyond_parser_tests
- all_sources_reverified;all_used_corpus_hits_manually_classified;two_independent_speakers;executable_negative_boundaries;code_document_alignment;separate_implementation_and_linguistic_reporting;plain_language_claim
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ReportedSpeech?
- Next evidence action: Reverify at least one exact source, confirm one independent native-speaker review of the relevant positive and negative examples, and draft boundaries before restoring provisional status.

## Related constructions

- [[DitransitiveSpeechVP]]
- [[SpeechTransferClause]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
