# CP022-I1A-I01-A1 — accepted ClauseSpan cleanup

## Decision

I01 is accepted at runtime `v0.5.179-cp022-i1a-i01-neutral-clause-span-consolidation-r1`.

Five historical public clause-wrapper names now share one neutral internal `ClauseSpan`. Public diagnostic labels remain compatible. Typed predicate, modal, locative, topic, coordination, aspect, and negation children continue to carry the language-sensitive analysis.

## Acceptance evidence

- visible packet: 100/100 PASS
- rendered rows: 10/10 PASS
- prospective held-out: 6/6 PASS
- I02 preservation: 24/24 PASS
- aggregate regression: 545/545 PASS
- grammar legitimacy: 1087/1087 PASS
- semantic acceptance: 15/15 PASS
- pre-intermediate corpus: 80/80 PASS
- `supported_productive`: 0

The exact candidate was frozen before custody opening. All commitments verified. No code changed after the hidden cases were exposed. The six cases are consumed and cannot be reused as prospective held-out evidence.

No screenshot was supplied. Render acceptance therefore covers the exported diagnostic payload and complete construction trees, not an independent pixel-level screenshot inspection.

## Next program

The next milestone is `CP022-P1`, the first narrow `supported_productive` promotion pilot. Architecture cleanup is no longer the immediate priority unless a candidate reveals a blocking dependency.
