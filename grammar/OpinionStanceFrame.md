---
title: "OpinionStanceFrame"
type: "canto-span-construction"
construction: "OpinionStanceFrame"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-08"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 3
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-YAP-WONG-CHOR-2014-STANCE", "SRC-YIP-MATTHEWS-2000-BASIC"]
runtime_active: true
runtime_code_references: 10
accepted_fixtures: 15
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-08"]
---

# OpinionStanceFrame

## Plain-language claim

Cantonese may instantiate the structural family represented by OpinionStanceFrame; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_and_research_before_retention`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-ALDERETE-ETAL-2017-SYNOPSIS

- Citation: [Alderete, John, Queenie Chan, Macarius Chan, Gloria Fan, and Olivia Nickel. 2017. Cantonese Grammar Synopsis.](https://www.sfu.ca/~alderete/pubs/aldereteEtal2017_cantgsyn2017-10-31.pdf)
- Locator: p. 29, example (76)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The example overtly separates experiencer, cognition predicate, and embedded recommendation.
- Limit: Do not infer that the embedded proposition is true or accepted by the speaker.

### SRC-YAP-WONG-CHOR-2014-STANCE

- Citation: [Yap, Foong Ha, Tak-sum Wong, and Winnie Oi-wan Chor. 2014. Clause-medial particles and stance marking in Cantonese.](https://ira.lib.polyu.edu.hk/bitstream/10397/6984/1/Yap_Clause-medial_Particles_Stance-marking.pdf)
- Locator: slides 4, 7, and 32
- Verification: `VERIFIED_INSTITUTIONAL_FULL_TEXT`
- What it supports: The source presents a synchronic continuum from lexical meaning through doubt/attitude marking.
- Limit: Do not expose a disputed grammaticalization stage as a categorical learner label.

### SRC-YIP-MATTHEWS-2000-BASIC

- Citation: [Yip, V. and Matthews, S. 2000. Basic Cantonese: A Grammar and Workbook. London/New York: Routledge.](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf)
- Locator: Unit 25, printed p. 131; 你以為我傻嘅咩
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The reference grammar gives 以為 followed by a subject-predicate proposition.
- Limit: Do not equate 以為 with 覺得 in evidential or factivity meaning.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 5 total; 5 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
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
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by OpinionStanceFrame?

## Related constructions

- [[CognitionContentFrame]]
- [[CognitionDelimitedObjectVP]]
- [[CognitionDelimitedVP]]
- [[CognitionStatementClause]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
