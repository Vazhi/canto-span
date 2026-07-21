# Canto Span checkpoint — CP022-I1A-I02-R1

Date: 2026-07-19  
Parent: `CP022-I1A-I02-D1`  
Accepted runtime: `v0.5.177-cp022-i1a-i04-internal-wrapper-cleanup-r1`  
Candidate: `v0.5.178-cp022-i1a-i02-clause-relation-graph-cleanup-r1`  
Implementation authorized: **yes, I02 only**  
Accepted: **no — rendered and held-out review remain**

## Work completed

The authorized I02 cleanup is code-complete for visible evaluation. The three broad historical labels now have neutral internal representations:

- `ClauseLinkingSequence` → `ClauseRelationGraph`
- `ClauseRelation` → `ClauseRelationEdge`
- `ClauseRelationMember` → `ClauseRelationMemberSpan`

Public diagnostics retain the historical names as compatibility aliases. The new internal nodes record explicit non-licensing boundaries and inherited relation-subtype provenance.

## Preservation result

All 12 visible packet cases match their frozen preimplementation public signatures. The implementation adds no new subtype, linker, hidden member, context resolution, or punctuation-based semantic relation. Graph-only and incomplete-member boundaries remain intact.

## Validation

- I02 visible packet: **87/87 PASS**
- I04 preservation: **45/45 PASS**
- aggregate regression: **545/545 PASS**
- grammar legitimacy: **1111/1111 PASS**; supported_productive = **0**
- semantic acceptance: **15/15 PASS**
- pre-intermediate corpus: **80/80 PASS**
- prospective held-out cases: **6, unopened**

## Required next event

Render `render-review/CP022-I1A-I02-R1-FOCUSED-RENDER-REVIEW.md`. After rendered acceptance, freeze this exact code and open the six evaluator-custody cases. No further authorization is needed to finish this same I02 packet.

**A new explicit unfreeze authorization is required before I01 or any other parser family is changed.**
