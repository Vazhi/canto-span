# Current checkpoint state

## Active candidate

- Checkpoint: `CP022-I1A-I01-R1`
- Runtime: `v0.5.179-cp022-i1a-i01-neutral-clause-span-consolidation-r1`
- Accepted baseline: `v0.5.178-cp022-i1a-i02-clause-relation-graph-cleanup-r1`
- Status: render pending; six prospective I01 held-out cases remain sealed.
- Productive grammar status: `supported_productive = 0`.

## Current behavior change

Five historical public clause wrappers share the neutral internal `ClauseSpan` representation. Public labels, learner roles, Jyutping, and typed predicate children remain preserved. `ClauseSpan` cannot independently license grammar, subjects, topics, modality, valency, omitted arguments, or context resolution.

## Current gates

- I01 visible packet: 100/100 PASS
- I02 preservation: 24/24 PASS
- Aggregate regression: 545/545 PASS
- Grammar legitimacy: 1087/1087 PASS
- Semantic acceptance: 15/15 PASS
- Pre-intermediate corpus: 80/80 PASS

## Next action

Render `render-review/CP022-I1A-I01-R1-FOCUSED-RENDER-REVIEW.md`. After a clean render review, freeze this exact candidate and open only the six sealed I01 evaluator cases.

## Packaging

The working ZIP uses the slim-development retention profile. Superseded artifacts are omitted and indexed in `SLIM-REMOVED-ARTIFACTS.tsv`. The original full checkpoint remains the historical recovery source.
