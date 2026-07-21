# CP022-I1A-I02 relation-graph cleanup candidate R1

Date: 2026-07-19  
Runtime: `0.5.178`  
Candidate: `v0.5.178-cp022-i1a-i02-clause-relation-graph-cleanup-r1`  
Status: **visible gates passed; focused render review required; held-out unopened**

## What this change does

### `ClauseLinkingSequence` → `ClauseRelationGraph`

- Renames the actual internal graph/container node.
- Preserves `ClauseLinkingSequence` as compatibility metadata for public diagnostics.
- Records that the graph is a neutral container and cannot infer a relation from punctuation, adjacency, or membership.

### `ClauseRelation` → `ClauseRelationEdge`

- Renames the internal typed relation edge.
- Preserves `ClauseRelation` as compatibility metadata.
- Requires the relation subtype to remain inherited from the already mapped language-sensitive rule that created the relation.
- Adds no new causal, conditional, sequential, temporal, concessive, coordination, or other subtype.

### `ClauseRelationMember` → `ClauseRelationMemberSpan`

- Renames the internal overt member span.
- Preserves `ClauseRelationMember` as compatibility metadata.
- Records that a member span cannot create a complete relation, insert a missing member, or resolve its own context requirement.

## What did not change

- No new Cantonese grammar or relation subtype was added.
- No linker inventory or matching condition changed.
- All 12 frozen public signatures remain exactly equal to the preimplementation baseline.
- No token, Jyutping, learner role, visible span, local construction, separator ownership, root coverage, or context status changed.
- Graph-only punctuation remains nonsemantic.
- Incomplete left/right members remain `NeedsContext` and do not become complete relation edges.
- No lexicon, Jyutping data, source claim, or external-evidence record changed.
- `supported_productive` remains zero.
- I01 and LX1 remain unaccepted and unchanged.
- The six I02 held-out cases remain unopened.

## Visible validation

- I02 visible packet gate: **87/87 PASS**
- I04 accepted-behavior preservation: **45/45 PASS**
- Aggregate regression: **545/545 PASS**
- Grammar-legitimacy audit: **1111/1111 PASS** across **181** active labels
- Semantic acceptance: **15/15 PASS**
- Pre-intermediate corpus: **80/80 PASS**

## Required next gate

Render the focused review note and inspect the eight frozen relation cases plus four boundary probes. Do not open evaluator custody yet.

After rendered acceptance, freeze this exact candidate and only then open the six evaluator-custody cases for final I02 held-out evaluation.
