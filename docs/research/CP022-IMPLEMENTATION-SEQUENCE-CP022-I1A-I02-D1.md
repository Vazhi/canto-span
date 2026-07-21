# CP022 implementation sequence correction

Checkpoint: `CP022-I1A-I02-D1`

The previous accepted-I04 handoff incorrectly recommended preparing `I01 ClauseSpan` next. The frozen R35/R36 dependency graph is authoritative:

```text
I02 ClauseRelationGraph  →  I01 ClauseSpan
```

Reason: a clause-span cleanup cannot safely redefine broad clause wrappers until relation members have a stable typed container and explicit left/right membership.

## Correct order

1. **I02 packet design and held-out lock** — complete at this checkpoint.
2. **New explicit I02 authorization** — required before code changes.
3. I02 implementation, visible gates, rendered review, then prospective held-out evaluation.
4. Accept or reject I02.
5. Populate/lock I01 if needed from the accepted I02 baseline.
6. Obtain a separate I01 authorization before any I01 code change.

I04 remains accepted. Its consumed authorization and held-out partition do not authorize or validate I02.
