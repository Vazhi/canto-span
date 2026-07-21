# TemporalAdverbialClause retirement — v0.5.190

## Decision

`TemporalAdverbialClause` is retired from the current grammar table and runtime label registry.

## Why

The current code contained no `TemporalAdverbialClause` constructor. The only runtime references were:

1. membership in `CONSTRUCTION_LABEL_REGISTRY`; and
2. a context-support list that treated the nonexistent label as possible prior-turn time material.

The label had zero accepted fixtures, zero standardized cases, and zero observed parser outputs. Keeping it active therefore represented neither current behavior nor a tested linguistic claim.

## What remains preserved

The checked source record for Yip 2024 and the earlier temporal-expression research map remain in the repository. They support future research on explicit temporal-subordination subtypes, but they do not require an empty active runtime label.

Current behavior continues to use:

- `TemporalClause` for the parser's existing time-initial clause heuristic; and
- typed `ClauseRelationEdge` structures for overt linked-clause relations.

No recognized parser span changed because the retired label was never emitted.

## Recovery record

The former construction note is preserved at:

`archive/retired-labels/v0.5.190-low-reference-wrapper-audit/TemporalAdverbialClause.md`
