---
title: "StativePredicate"
type: "canto-span-construction"
construction: "StativePredicate"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-10"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 1
source_count: 3
source_ids: ["SRC-ALDERETE-ETAL-2017-SYNOPSIS", "SRC-FRANCIS-MATTHEWS-2005-VERB-CATEGORY", "SRC-YIP-1988-NEGATION"]
runtime_active: true
runtime_code_references: 14
accepted_fixtures: 6
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-10"]
---

# StativePredicate

## Plain-language claim

Cantonese may instantiate the structural family represented by StativePredicate; exact productivity and boundaries require pattern-specific independent evidence.

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
- Locator: p. 24 entry (57)
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: The synopsis describes predicative adjectives as requiring an adverb of degree and gives (very) comfortable as illustration.
- Limit: Do not convert the synopsis generalization into a categorical ban on all contextually licensed bare property predicates.

### SRC-FRANCIS-MATTHEWS-2005-VERB-CATEGORY

- Citation: [Francis, Elaine J., and Stephen Matthews. 2005. A multi-dimensional approach to the category verb in Cantonese. Journal of Linguistics 41(2):269-305.](https://doi.org/10.1017/S0022226705003270)
- Locator: official abstract
- Verification: `VERIFIED_OFFICIAL_ABSTRACT_AND_METADATA`
- What it supports: The article reports complex overlap among purported adjective/adjectival-verb categories and proposes interacting syntactic, semantic, morphological, and phonological features.
- Limit: Do not import the article’s full feature analysis or claim that all Cantonese adjectives are syntactically identical.

### SRC-YIP-1988-NEGATION

- Citation: [Yip, Moira. 1988. Negation in Cantonese as a Lexical Rule. Bulletin of the Institute of History and Philology 59: 449-477.](https://www11.ihp.sinica.edu.tw/storage/w2_file/3407pXasnae.pdf)
- Locator: p. 452 example Ni go neujai m leng; pp. 449-454 discussion
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Yip gives a copula-less adjective predicate directly preceded by 唔 and treats adjectives/stative verbs among the categories negated by 唔.
- Limit: Do not infer that the lexical-prefix analysis is the only valid syntax or that all negators are interchangeable.

## Native-speaker review

- Independent speaker records: **1**
- Scope: `ONE_SPEAKER_SENTENCE_NATURALNESS_ONLY_NOT_ANALYSIS_VALIDATION`
- Surface judgments: 1 total; 1 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Evidence state: `fixture_level_not_provenance_linked`
- Executable or review records containing this label:
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.json`
  - `test-data/WECHAT-GX-TRAVEL-002-ADJUDICATION-MATRIX.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-L-lexicon_jyutping_enrichment.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-QUEUE-R-accepted_behavior_regression.tsv`
  - `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.json`
  - `test-data/WECHAT-GX-TRAVEL-002-REGRESSION-REMEDIATION-READINESS-R2.tsv`
  - `test-data/a1-context-status-fixture.tsv`
  - `test-data/cp021b-lx1-construction-freeze-baseline.json`
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`
  - `test-data/native-speaker-naturalness-evidence-v1.json`
  - `test-data/native-speaker-naturalness-evidence-v1.tsv`
  - `test-data/regression-snapshots.json`
  - `test-data/review-only-readiness.tsv`

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
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by StativePredicate?

## Related constructions

- [[ActionStativeVP]]
- [[DegreeModifiedLexicalStative]]
- [[DegreeStativePredicate]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
