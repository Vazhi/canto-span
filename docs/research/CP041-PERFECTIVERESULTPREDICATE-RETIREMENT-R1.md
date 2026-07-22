# CP041 PerfectiveResultPredicate retirement

Date: 2026-07-22

Checkpoint: `v0.5.197-shadowed-wrapper-retirement`

## Decision

`PerfectiveResultPredicate` is retired from the active runtime registry and current construction-note collection.

## Checks

- prior runtime constructor: controlled `解決 + 咗 + optional final particle`
- accepted fixtures: 0
- standardized cases: 0
- verified complete-parser outputs: 0
- complete-output successor: `PerfectiveVP`
- mapped sources preserved: `SRC-FAN-CHAN-2022`, `SRC-KEDZIOR-2023`

## Reason

The dedicated wrapper was hard-coded to one lexical predicate and was consumed by the broader `PerfectiveVP` route before complete output. The checked sources support keeping lexical result semantics distinct from perfective aspect; they do not establish a dedicated productive `PerfectiveResultPredicate` node or a unique boundary supplied by that wrapper.

The runtime therefore retains the overt lexical predicate and perfective aspect under ordinary perfective composition. A retired-label compatibility mapping points historical `PerfectiveResultPredicate` references to `PerfectiveVP` for migration only; it does not add linguistic evidence.

## Preservation

The original note, source records, and migration provenance are preserved at:

`archive/retired-labels/v0.5.197-shadowed-wrapper-retirement/PerfectiveResultPredicate.md`
