# Current state

## Parser

- Runtime candidate: `0.5.179`
- Candidate identity: `v0.5.179-cp022-i1a-i01-neutral-clause-span-consolidation-r1`
- Accepted runtime: `v0.5.178-cp022-i1a-i02-clause-relation-graph-cleanup-r1`
- Active registry: **177 labels**
- Fully supported productive patterns: **0**

## I01 ClauseSpan

Five historical public clause wrappers now share neutral internal `ClauseSpan`:

- `SubjectPredicateClause`
- `SubjectModalPredicateClause`
- `LocativeModalPredicateClause`
- `TopicModalPredicateClause`
- `CoordinatedSubjectModalPredicateClause`

The historical names remain compatibility labels. Typed predicate, modal, locative, topic, coordination, aspect, and negation children remain responsible for analysis. `ClauseSpan` is representation-only and cannot independently license language.

## Evaluation state

- Development packet: `EP-CP022-I1A-I01-D1`
- Visible cases: 15
- Render cases: 10
- Prospective held-out cases: 6
- Held-out opened: no
- Custody data included in project: no

## Passing gates

- I01 visible: 100/100
- I02 preservation: 24/24
- Aggregate regression: 545/545
- Grammar legitimacy: 1087/1087
- Semantic acceptance: 15/15
- Pre-intermediate corpus: 80/80

## Research provenance

Language-level source mapping is complete at the R37 provenance checkpoint, but mapping alone does not establish productive grammar. The current legitimacy inventory remains conservative, and every first promotion must receive pattern-specific evidence, negative boundaries, prospective held-out testing, competing-analysis review, and learner-facing adjudication.

## Next program

1. Accept or reject I01 through render and sealed evaluation.
2. Rank narrow first-promotion candidates.
3. Freeze a productive-acceptance packet before implementation.
4. Promote only if every evidence and evaluation threshold passes.
