---
title: "VerbComplementVP"
type: "canto-span-construction"
construction: "VerbComplementVP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-05"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 3
source_ids: ["SRC-CHENG-SYBESMA-2004-POSTVERBAL-DAK", "SRC-LAU-LEE-2021-RVC", "SRC-SHAN-JIN-2025-MOTION-TYPOLOGY"]
runtime_active: true
runtime_code_references: 15
accepted_fixtures: 9
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-05"]
---

# VerbComplementVP

## Plain-language claim

Cantonese may instantiate the structural family represented by VerbComplementVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_provisional_pending_pattern_specific_attestation_and_heldout_review`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHENG-SYBESMA-2004-POSTVERBAL-DAK

- Citation: [Cheng, Lisa Lai-Shen, and Rint Sybesma. 2004. Postverbal can in Cantonese (and Hakka) and Agree. Lingua 114(4):419-445.](https://doi.org/10.1016/S0024-3841(03)00067-6)
- Locator: author PDF footnote 6, pp. 4-5
- Verification: `VERIFIED_AUTHOR_FULL_TEXT_AND_PUBLISHER_METADATA`
- What it supports: The paper identifies a separate construction linking a verb to a postverbal descriptive modifier.
- Limit: Do not infer that every postverbal modifier is a potential complement.

### SRC-LAU-LEE-2021-RVC

- Citation: [Lau, Helena Yan Ping, and Sophia Yat Mei Lee. 2021. On Resultative Verb Compounds in Cantonese and Mandarin. Lingua Sinica 7(1):23-50.](https://doi.org/10.2478/linguasinica-2021-0002)
- Locator: pp. 23-25 and 33-44
- Verification: `VERIFIED_FULL_TEXT_AUTHOR_UPLOAD_AND_OFFICIAL_METADATA`
- What it supports: Result complementation cannot serve as an unrestricted residual category for all postverbal material.
- Limit: Do not use VerbComplementVP as proof of a general complement schema.

### SRC-SHAN-JIN-2025-MOTION-TYPOLOGY

- Citation: [Shan, Yunming and Jin, Lixin. 2025. 粵語位移事件編碼類型再探 [Revisiting the Encoding Typology of Motion Events in Cantonese]. Language and Linguistics 26(2).](https://doi.org/10.1075/lali.00202.sha)
- Locator: sections 3.1-3.3 and 4.1; examples 1-20 and 29-35
- Verification: `VERIFIED_FULL_TEXT_AUTHOR_UPLOAD_AND_PUBLISHER_METADATA`
- What it supports: The motion study distinguishes single-verb, path-verb/serial, and resultative motion encodings.
- Limit: Do not collapse competing complement and serial-verb analyses under one language claim.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 5 total; 5 accepted; 0 rejected.
- Structural-analysis validations: 0.
- Second-speaker state: `NOT_RECORDED`.

## Negative and boundary cases

- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `review-packets/v0.5.181/IFR01-D1/development-baseline.json`
  - `review-packets/v0.5.182/IFR02-D1/development-baseline.json`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/grammar-legitimacy-source-register.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `test-data/pre-intermediate-gold-corpus.tsv`
  - `test-data/regression-snapshots.json`
  - `test-data/w17-corpus-semantic-disposition.tsv`

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by VerbComplementVP?
- Next evidence action: Reverify at least one exact source, confirm one independent native-speaker review of the relevant positive and negative examples, and draft boundaries before restoring provisional status.

## Related constructions

- [[NegativePotentialComplement]]
- [[NegativePotentialDirectionalVP]]
- [[PotentialDirectionalVP]]
- [[PotentialResultVP]]
- [[ResultComplement]]
- [[ResultComplementVP]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
