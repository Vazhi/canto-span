---
title: "ProgressivePurposeClause"
type: "canto-span-construction"
construction: "ProgressivePurposeClause"
status: "unsupported_generalization"
confidence: "unsupported"
claim_layer: "language"
lane: "LANE-09"
last_reviewed: "unknown"
last_status_migrated: "2026-07-21"
speaker_count: 0
source_count: 3
source_ids: ["SRC-CHOR-2018-DIRECTIONALS", "SRC-LAM-BODOMO-2003-VERB-ORDER", "SRC-MATTHEWS-2006-SVC"]
runtime_active: true
runtime_code_references: 5
accepted_fixtures: 0
tags: ["canto-span/grammar", "canto-span/status/unsupported_generalization", "canto-span/lane/lane-09"]
---

# ProgressivePurposeClause

## Plain-language claim

Cantonese may instantiate the structural family represented by ProgressivePurposeClause; exact productivity and boundaries require pattern-specific independent evidence.

This is a linguistic claim only to the extent allowed by the status and evidence below. The runtime label is not assumed to be standard linguistic terminology.

## Current status

- Linguistic status: `unsupported_generalization`
- Linguistic confidence: `unsupported`
- Current action: `quarantine_unexercised_runtime_path`
- Productive acceptance eligible: **no**
- Last linguistic review: not recorded

## Sources

### SRC-CHOR-2018-DIRECTIONALS

- Citation: [Chor, W. O. W. 2018. Directional Particles in Cantonese: Form, Function, and Grammaticalization. Amsterdam/Philadelphia: John Benjamins.](https://doi.org/10.1075/scld.9)
- Locator: printed p. 95, example 21
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: 佢擔住一擔水去淋菜 has 住-marked carrying followed by 去 and a watering purpose.
- Limit: Do not collapse 緊, 住, 喺度, and purpose into one fixed clause template.

### SRC-LAM-BODOMO-2003-VERB-ORDER

- Citation: [Lam, Olivia S.-C., and Adams B. Bodomo. 2003. Modeling Verb Order in Complex Multi-Verbal Predicate Constructions. Proceedings of PACLIC 17, 328-338.](https://aclanthology.org/Y03-1037/)
- Locator: pp. 331-332, examples 14-15
- Verification: `VERIFIED_OFFICIAL_FULL_TEXT_AND_METADATA`
- What it supports: The paper explicitly rejects some permutations of the three VPs in its Cantonese example.
- Limit: Do not generate arbitrary reorderings of progressive, motion/linker, and purpose VPs.

### SRC-MATTHEWS-2006-SVC

- Citation: [Matthews, S. 2006. On Serial Verb Constructions in Cantonese. In A. Y. Aikhenvald and R. M. W. Dixon (eds.), Serial Verb Constructions: A Cross-Linguistic Typology, 69-87. Oxford University Press.](https://hub.hku.hk/bitstream/10722/51758/6/FullText.pdf)
- Locator: chapter pp. 72-74 and 82-84
- Verification: `VERIFIED_FULL_TEXT`
- What it supports: Multiverb sequences can differ in clause unity, complement status, event sequence, and purpose, and combinations remain semantically/pragmatically constrained.
- Limit: Do not insert English “to/in order to” merely because two predicates are adjacent.

## Native-speaker review

- Independent speaker records: **0**
- Scope: `NOT_ESTABLISHED`
- Surface judgments: 0 total; 0 accepted; 0 rejected.
- Structural-analysis validations: 0.

## Negative and boundary cases

- Evidence state: `none_recorded`
- Executable or review records containing this label:
  - `test-data/grammar-claim-provenance-CP021B.json`
  - `test-data/grammar-claim-provenance-CP021B.tsv`
  - `test-data/grammar-legitimacy-audit.json`
  - `test-data/grammar-legitimacy-audit.tsv`

## Implementation state

- Lifecycle: `runtime_referenced_without_accepted_fixtures`
- Visible/focused tests: `not_assessed_in_current_definition_of_done_review`
- Render review: `not_assessed_in_current_definition_of_done_review`
- Held-out evaluation: `NOT_ESTABLISHED`
- Regression: `not_assessed_in_current_definition_of_done_review`
- Code–documentation comparison: `pending_current_definition_of_done_line_by_line_review`

## Open questions and blockers

- no explicit external claim-source edge
- Runtime metadata and current governance agree in v0.5.184.
- Research question: Which externally documented Cantonese constructions, if any, justify the scope and boundaries currently represented by ProgressivePurposeClause?

## Related constructions

- [[MotionDelimitedVP]]
- [[MotionPurposeChain]]
- [[PurposePredicate]]
- [[SerialVerbPurposeChain]]

## Migration provenance

- Full pre-migration record: `archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`
- Status migration date: 2026-07-21.
- The frozen JSON preserves the former wide schema; this note is the active authoring record.
