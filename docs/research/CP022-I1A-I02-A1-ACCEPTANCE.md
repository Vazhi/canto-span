# CP022-I1A-I02-A1 acceptance record

Date: 2026-07-19  
Scope: `EP-CP022-I1A-I02-D1 ClauseRelationGraph` internal structural cleanup only  
Decision: **ACCEPTED**

## What was tested

This checkpoint did not attempt to validate causal, conditional, sequential, or temporal relations as new productive Cantonese grammar. Those language-sensitive relation subtypes retain their prior evidence status.

The question was narrower: could the historical internal wrappers be represented as a neutral graph, one typed edge, and overt member spans without changing public parser output, tokens, Jyutping, roles, root coverage, missing-context behavior, or relation-subtype selection?

## Accepted result

- `ClauseLinkingSequence` is internally `ClauseRelationGraph`.
- `ClauseRelation` is internally `ClauseRelationEdge`.
- `ClauseRelationMember` is internally `ClauseRelationMemberSpan`.
- Historical names remain public compatibility metadata.
- The graph and member spans cannot license relation semantics.
- The edge inherits its subtype from the already mapped relation rule and records explicit provenance.
- Punctuation-only and graph-only sequences do not gain a typed semantic edge.
- Incomplete linker fragments remain blocked as `NeedsContext`; no missing partner is fabricated.

## Evaluation

- Visible packet: **87/87 PASS**
- Rendered diagnostic review: **12/12 PASS**
- Prospective held-out commitments: **6/6 verified**
- Prospective held-out exact public signatures and internal invariants: **6/6 PASS**
- Aggregate regression: **545/545 PASS**
- Grammar legitimacy: **1111/1111 PASS**
- Semantic acceptance fixture: **15/15 PASS**
- Pre-intermediate corpus: **80/80 PASS**
- I04 accepted-behavior preservation: **45/45 PASS**
- `supported_productive`: **0**

The rendered exports contain generic learner-gloss warnings, but no raw slot, missing gloss, or internal construction name appears in the hover payload. No screenshot or pixel-layout artifact was supplied; the acceptance decision is based on the rendered diagnostic exports and complete construction trees.

## Held-out disposition

The custody archive was opened only after the code and render candidate were frozen. All six commitments verified. No hidden failure was patched. The six cases are consumed and non-reusable as future prospective held-out evidence.

## Governance after acceptance

The user has granted standing authority for the assistant to manage freeze and unfreeze boundaries autonomously. This does not remove the evidence gates: each work package must still have a declared scope, frozen packet, prospective held-out partition, render review, regression checks, and explicit acceptance record.

The next dependency is `I01 ClauseSpan`. I01 may now be packeted and, once its safeguards are frozen, implemented under the standing authorization without another user approval request. Unrelated grammar families remain frozen until independently opened under the same governed process.
