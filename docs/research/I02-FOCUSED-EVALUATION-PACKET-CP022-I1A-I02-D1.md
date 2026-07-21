# I02 ClauseRelationGraph focused evaluation packet

Checkpoint: `CP022-I1A-I02-D1`  
Packet: `EP-CP022-I1A-I02-D1`  
Status: **HELD_OUT_LOCKED; implementation not authorized**  
Intended semantic change: **NONE**

## What this work is for

The parser currently uses three representation labels around multi-clause material:

- `ClauseLinkingSequence` — outer root/discourse accounting wrapper;
- `ClauseRelation` — typed relation between two members;
- `ClauseRelationMember` — left or right member span.

These labels are internal engineering structures, not three independent Cantonese constructions. I02 prepares a cleaner internal graph so that later clause-span cleanup can rely on typed members without allowing a broad wrapper to create causal, conditional, temporal, sequential, concessive, or topic-chain meaning.

## Frozen future actions

| Current compatibility label | Intended internal component | Constraint |
|---|---|---|
| `ClauseLinkingSequence` | `ClauseRelationGraph` | Groups visible edges, members, separators, and discourse material only. No independent relation semantics. |
| `ClauseRelation` | `ClauseRelationEdge` | Keeps an explicit relation subtype inherited from an already mapped language-sensitive rule. |
| `ClauseRelationMember` | `ClauseRelationMemberSpan` | Stores one overt left/right member and owned linker material. No complete-relation or context-licensing power. |

Historical labels may remain in diagnostic compatibility metadata, but they must not remain active internal ontology or learner-visible grammar claims.

## Visible development inventory

The packet freezes 12 accepted-runtime signatures:

- four complete relation anchors: paired causal, paired conditional, paired sequential, and temporal subordinate;
- four preservation variants: postposed reason, unpaired causal linker, conditional without right-side `就`, and temporal relation without initial `一`;
- four boundaries: a graph-only repeated-nominal sequence, a right sequential member requiring context, a right causal/result member requiring context, and a left conditional member requiring context.

The eight complete-relation cases are the future render-review set. All 12 currently have full root coverage and complete Jyutping.

## Critical invariants

1. Graph membership, punctuation, adjacency, or repeated spans cannot establish a relation subtype.
2. Each complete relation has one graph, one typed edge, two overt member spans, and visible separator/linker accounting.
3. Each linker and separator is owned exactly once; none may be deleted or duplicated.
4. A lone left or right member remains under `NeedsContext` and cannot create a missing partner.
5. A graph may exist without a typed edge; repeated nominal spans separated by commas are the frozen boundary.
6. Local clause/VP/NP structures, tokens, roles, Jyutping, spans, provenance, and learner-visible meaning remain unchanged.
7. No hidden subject, predicate, clause, linker, separator, or relation is inserted.
8. Relation subtypes remain language-sensitive and must inherit the already mapped source boundaries; the internal graph terminology itself requires no external-language source.

## Evidence status

The external sources linked in the packet support conditional, temporal, causal, and sequence-marker distinctions and their limitations. They do not validate the parser labels `ClauseRelationGraph`, `ClauseRelationEdge`, or `ClauseRelationMemberSpan`; those are internal representation decisions. Exact visible surfaces remain behavior-preservation anchors, not proof of productive grammar.

## Prospective held-out partition

Six cases were selected before implementation and baseline-recorded across six classes: causal, conditional, sequential, temporal, incomplete-member, and graph-only. The clean project contains only salted commitments. Surfaces, salts, and expected signatures are in a separate evaluator-custody archive and have zero leakage into the project.

Do not open that archive during implementation. Once the frozen implementation is evaluated against it, the partition becomes consumed and cannot be reused as held out.

## Authorization boundary

Packet preparation does not authorize code changes. The previous I04 authorization is consumed.

> **NEW UNFREEZE AUTHORIZATION REQUIRED:** authorize only `EP-CP022-I1A-I02-D1` before changing parser behavior or active internal labels for I02.

I01 remains blocked until I02 is accepted because relation members must first have stable typed graph/member architecture.
