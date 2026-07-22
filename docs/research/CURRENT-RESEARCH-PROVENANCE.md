# Current research and provenance

## Governance counts

- active labels: **171**
- `supported_productive`: **0**
- `provisional_reaudit`: **2**
- `provisional`: **0**
- `research_pending`: **58**
- `unsupported_generalization`: **87**
- `lexicalized_only`: **3**
- `parser_heuristic`: **21**

`PostverbalZoPerfectiveVP` and `ResourceUseLaiFunctionRelation` remain under re-audit. Historical acceptance files are not current status authority.

## Current evidence records

- active construction records: [`../../GRAMMAR-INDEX.md`](../../GRAMMAR-INDEX.md) and the union of `grammar/<linguistic-status>/*.md`
- [`SECOND-SPEAKER-REVIEW-QUEUE-v0.5.184-R1.tsv`](SECOND-SPEAKER-REVIEW-QUEUE-v0.5.184-R1.tsv)
- [`SECOND-SPEAKER-WORK-FREEZE-2026-07-21.md`](SECOND-SPEAKER-WORK-FREEZE-2026-07-21.md)
- [`RETIRED-CONSTRUCTION-ARCHIVE-v0.5.186-R1.tsv`](RETIRED-CONSTRUCTION-ARCHIVE-v0.5.186-R1.tsv)
- frozen pre-migration registry: `../../archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json`

Source registers, matrices, and detailed review files in this directory support the construction notes but do not independently own status.

## Postverbal `咗` result

The re-audit verified four sources, manually reviewed five published exact examples, removed evidence weight from the untraceable six-hit corpus count, and recorded one completed Speaker A review. The v0.5.184 runtime now recognizes 4 of 6 controlled target forms after compositional NP integration. The remaining failures are `一篇文` lexical/category coverage and preservation through the final-`未` question wrapper; the aspectual claim remains under re-audit.

The implementation defect is now understood as partly a shared NP-assembly problem. The current remedy is **not** a list of source-example objects or example-specific lexical additions. The binding design is [`../current/NOUN-PHRASE-SUBSYSTEM.md`](../current/NOUN-PHRASE-SUBSYSTEM.md): build and independently test reusable NP structure, then integrate the perfective consumer without broadening its aspectual claim.

## Resource + `用嚟／用來` result

The earlier three-natural-attestation claim was withdrawn. Current reviewed evidence consists of one direct quotation, one editorial interview-derived instance, one published illustrative example, a purposive/conventionalization description, and a broader boundary source. The runtime has semantic overbreadth, coordination undercoverage, and token/NP coverage gaps.

## Current implementation priority

Infrastructure migration Phase 2 is complete. The next project task is Phase 3: remove authoring-time evidence metadata from `main.js`, retain minimal runtime label data and parser logic, and prove parser output is unchanged. Further NP expansion is deferred until the mechanical promotion validator is in place.

## Frozen work

- All second-speaker recruitment, scheduling, packet creation, and requests are frozen until the user explicitly unfreezes them. The two-speaker promotion requirement remains binding.
- DEMO01 is abandoned. Its historical visible materials are archived; no held-out result was opened or used, and no render work remains active.
- The ResourceUse Speaker A form remains optional deferred user-dependent work.
