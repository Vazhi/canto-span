# Canto Span checkpoint — CP022-I1A-I02-A1

- Date: 2026-07-19
- Lifecycle event: `PACKET_SCOPED_INTERNAL_CLEANUP_ACCEPTANCE`
- Status: **ACCEPTED**
- Parent candidate: `CP022-I1A-I02-R1`
- Accepted runtime: `v0.5.178-cp022-i1a-i02-clause-relation-graph-cleanup-r1`
- Packet: `EP-CP022-I1A-I02-D1`
- Active parser candidate: none

## Accepted change

The I02 relation-graph cleanup is accepted with intended semantic change **NONE**:

- `ClauseLinkingSequence` → internal `ClauseRelationGraph`
- `ClauseRelation` → internal `ClauseRelationEdge`
- `ClauseRelationMember` → internal `ClauseRelationMemberSpan`
- historical names retained as compatibility metadata
- graph and member spans explicitly non-licensing
- typed edge subtype inherited from the preexisting mapped relation rule
- no punctuation-only relation licensing and no fabricated missing member

## Evaluation

- visible packet **87/87 PASS**
- rendered diagnostic review **12/12 PASS**
- prospective held-out **6/6 PASS**
- aggregate regression **545/545 PASS**
- grammar legitimacy **1111/1111 PASS**
- semantic acceptance **15/15 PASS**
- pre-intermediate corpus **80/80 PASS**
- I04 preservation **45/45 PASS**
- `supported_productive = 0`

## Governance

The six I02 prospective held-out cases are consumed. The standing user authorization permits autonomous freeze/unfreeze decisions, but does not waive packet isolation, evidence, hidden evaluation, render review, or acceptance records.

## Next

Prepare `I01 ClauseSpan`, which depends on accepted I02. No active parser candidate exists at this checkpoint.
