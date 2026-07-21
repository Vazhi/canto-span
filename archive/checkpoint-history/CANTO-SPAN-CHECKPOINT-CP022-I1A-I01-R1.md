# CP022-I1A-I01-R1 research checkpoint

## Status

Render-review pending; prospective held-out unopened.

## Candidate

`v0.5.179-cp022-i1a-i01-neutral-clause-span-consolidation-r1`

## Parent

Accepted `v0.5.178-cp022-i1a-i02-clause-relation-graph-cleanup-r1`.

## Work completed

Five broad clause wrappers were consolidated internally to neutral `ClauseSpan`. Existing language-sensitive rules still decide whether a clause exists and retain typed predicate, modal, locative, topic, and coordination children. Historical labels remain public compatibility metadata.

## Evidence and safety boundary

This is an internal representation cleanup, not evidence for a productive Cantonese construction. The global grammar-acceptance freeze remains active and `supported_productive` remains 0. The six prospective I01 held-out cases were committed before implementation and remain outside the clean project.

## Validation

- Packet lock: 31/31 PASS
- Visible packet: 100/100 PASS
- I02 preservation: 24/24 PASS
- Aggregate regression: 545/545 PASS
- Grammar legitimacy: 1087/1087 PASS
- Semantic acceptance: 15/15 PASS
- Pre-intermediate corpus: 80/80 PASS

## Next

Render and inspect the ten focused cases. If accepted, freeze this exact candidate before opening the six evaluator-custody cases.
