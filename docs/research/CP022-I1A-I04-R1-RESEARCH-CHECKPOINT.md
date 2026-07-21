# CP022-I1A-I04-R1 research and implementation checkpoint

Date: 2026-07-19  
Parent: CP021B-R37 authoritative I04-only packet-lock archive  
Runtime: `0.5.177`  
Candidate: `v0.5.177-cp022-i1a-i04-internal-wrapper-cleanup-r1`  
Status: **visible gates passed; focused render review pending; held-out unopened; not accepted**

## Authorized boundary

The user explicitly authorized parser changes only for `EP-R37-I04`, canonical family `I04 NominalAndMeasureSpan`. This checkpoint does not authorize any other canonical family or CP022 package. The global grammar freeze remains active outside this packet.

## Implemented

- Retired `ModifierPhrase` from the active registry and removed its remaining constructor path while preserving overt material.
- Renamed the internal `HeadNP` node to `NominalHeadSpan`.
- Preserved `HeadNP` only as diagnostic compatibility metadata; learner-facing output remains “noun phrase.”
- Marked `NominalHeadSpan`, `MeasureExpression`, and `DefinitionComplement` as bounded internal representations.
- Explicitly prevented `MeasureExpression` and `DefinitionComplement` from independently licensing grammar.
- Reduced the active construction registry from 182 to 181 labels without adding a replacement language claim.

## Unchanged boundaries

- No new Cantonese grammar was accepted or promoted.
- `supported_productive` remains zero.
- No lexicon, Jyutping, learner-role, source-claim, or external-evidence change was made.
- Public structures for all 12 visible packet cases remain byte-equivalent to the frozen preimplementation baseline.
- All five prospective held-out cases remain opaque and unopened.
- LX1 remains a separate render-pending, unaccepted candidate.

## Validation

- Current focused I04 gate: **45/45 PASS**
- Separate LX1 preservation gate: **13/13 PASS**
- Aggregate regression: **545/545 PASS**
- Grammar legitimacy: **1111/1111 PASS** across **181** active labels
- Supported productive: **0**
- Semantic acceptance fixture: **15/15 PASS**
- Pre-intermediate corpus: **80/80 PASS**
- Implementation audit: **57/57 PASS**
- Diagnostic dual-export, registry, readiness, color, syntax, and documentation gates: **PASS**

## Required next gate

Render `render-review/CP022-I1A-I04-R1-FOCUSED-RENDER-REVIEW.md` in Obsidian and inspect the eight required packet cases plus three internal-cleanup probes.

- On render acceptance: freeze this exact candidate, then open the external evaluator-custody archive for the five final I04 held-out cases.
- On render rejection: revise only within the already authorized I04 scope and keep the held-out archive closed.

No additional authorization is needed to complete render and held-out evaluation for this same I04 candidate. New explicit authorization is required before changing any different family or package.

## Recovery artifacts

- `CANTO-SPAN-CHECKPOINT-CP022-I1A-I04-R1.md`
- `canto-span-checkpoint-CP022-I1A-I04-R1.json`
- `validation/cp022-i1a-i04-r1/core-validation-summary.json`
- `validation/cp022-i1a-i04-r1/implementation-audit.json`
- `validation/cp022-i1a-i04-r1/archive-comparison.json`
- `render-review/CP022-I1A-I04-R1-FOCUSED-RENDER-REVIEW.md`
