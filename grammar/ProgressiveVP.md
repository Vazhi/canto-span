---
title: "ProgressiveVP"
type: "canto-span-construction"
construction: "ProgressiveVP"
status: "research_pending"
confidence: "not_assigned_research_pending"
claim_layer: "language"
lane: "LANE-05"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 5
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-FAN-2024-JAU-VP-ASPECT", "SRC-KATAOKA-2018-PROGRESSIVE-GAN", "SRC-MATTHEWS-YIP-2011-ASPECT-MULTIMEDIA", "SRC-SIO-BOND-2025"]
runtime_active: true
runtime_code_references: 5
accepted_fixtures: 6
tags: ["canto-span/grammar", "canto-span/status/research_pending", "canto-span/lane/lane-05"]
---

# ProgressiveVP

## Plain-language claim

Cantonese may instantiate the structural family represented by ProgressiveVP; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `research_pending`
- Linguistic confidence: `not_assigned_research_pending`
- Current action: `retain_but_quarantine_from_new_grammar_acceptance`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-ALDERETE-ETAL-2017-SYNOPSIS

- Citation: [Alderete, John, Queenie Chan, Macarius Chan, Gloria Fan, and Olivia Nickel. 2017. Cantonese Grammar Synopsis.](https://www.sfu.ca/~alderete/pubs/aldereteEtal2017_cantgsyn2017-10-31.pdf)
- Locator: pp. 38-39, example (108)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The synopsis gives VP → V Asp (NP) with 做緊功課 and lists 緊 as progressive.
- Limit: Do not infer unrestricted compatibility with every verb or object profile.

### SRC-FAN-2024-JAU-VP-ASPECT

- Citation: [Fan, Xiaolei (范曉蕾). 2024. 香港粵語“有 VP”的時體意義——兼論普通話的“沒”. Current Research in Chinese Linguistics 103(1):1-30. DOI: 10.29499/CrCL.202401_103(1).00012.](https://www.cuhk.edu.hk/ics/clrc/crcl_103_1/fan.pdf)
- Locator: pp. 6-8 and Table 1
- Verification: `VERIFIED_OFFICIAL_JOURNAL_FULL_TEXT`
- What it supports: Fan treats 喺度 VP and V緊 as different aspectual expressions with different distributional properties.
- Limit: Do not infer synonymy, free alternation, or a hidden 喺度 in V緊.

### SRC-KATAOKA-2018-PROGRESSIVE-GAN

- Citation: [Kataoka, Shin (片岡新). 2018. 從早期和現代語料看粵語進行體標記“緊”在複句中的功能. Current Research in Chinese Linguistics 97(1):133-141.](https://www.cuhk.edu.hk/ics/clrc/crcl_97_1/kataoka.pdf)
- Locator: p. 134, examples (3)-(4)
- Verification: `VERIFIED_OFFICIAL_JOURNAL_FULL_TEXT`
- What it supports: 着緊 describes the dressing event in progress; 着住 describes the resulting continuing state of wearing.
- Limit: Do not gloss both uniformly as English -ing or treat them as interchangeable.

### SRC-MATTHEWS-YIP-2011-ASPECT-MULTIMEDIA

- Citation: [Matthews, Stephen and Virginia Yip. 2011. Cantonese: A Comprehensive Grammar, 2nd ed. Multimedia supplement, Chapter 11: Aspect and verbal particles. Chinese University of Hong Kong.](https://www.cuhk.edu.hk/lin/cbrc/CantoneseGrammar/multimedia/11.htm)
- Locator: section 11.2.2, 起緊 example
- Verification: `VERIFIED_UNIVERSITY_HOSTED_REFERENCE_SUPPLEMENT`
- What it supports: The reference supplement presents the overt progressive marker attached to the verb without a hidden time word.
- Limit: Do not equate progressive aspect with present tense.

### SRC-SIO-BOND-2025

- Citation: [Sio, Joanna Ut-Seong and Francis Bond. 2025. Inner and outer aspect in Cantonese. HPSG 2025 conference paper.](https://dkaramasov.github.io/hpsg2025/assets/pdf/7-inner-and-outer-aspect-in-cantonese.pdf)
- Locator: pp. 2-3 and 6-7; Tables 1-2
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The paper lists 緊 as progressive and discusses incompatibility with certain situation types and inner-aspect combinations.
- Limit: Do not generalize from the illustrative HPSG subset to a complete acceptability lexicon.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 3 total; 3 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `review-packets/cp022-evaluation/EP-CP022-P1-PFV01-D1/development-baseline.json`
  - `review-packets/cp023-p1-prog01/PROG01-R1/README.md`
  - `review-packets/cp023-p1-prog01/PROG01-R1/focused-research-packet.json`
  - `review-packets/cp023-p1-prog01/PROG01-R2/README.md`
  - `review-packets/cp023-p1-prog01/PROG01-R2/focused-research-packet.json`
  - `review-packets/cp023-p1-prog01/PROG01-R3/focused-research-packet.json`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `test-data/pre-intermediate-gold-corpus.tsv`
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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ProgressiveVP?

## Related constructions

- [[ProgressiveTransitivePredicate]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
