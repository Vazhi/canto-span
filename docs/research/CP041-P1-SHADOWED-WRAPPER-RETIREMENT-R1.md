# CP041-P1 shadowed-wrapper retirement audit

Date: 2026-07-22

Runtime checkpoint: `v0.5.197`

Scope: resolve the two constructor-shadowed labels left after the v0.5.196 reachability audit. This is structural cleanup only. It does not add survey evidence, promote any construction, broaden grammar, or authorize new parser spans.

## Labels reviewed

- `Comment`
- `PerfectiveResultPredicate`

Both labels had constructors or constructor residues but zero accepted fixtures, zero standardized cases, and zero verified complete-parser outputs.

## `Comment`

The former late fallback wrapped predicate material inside a standalone `Comment` child and then inside `TopicComment`. The child wrapper added no independently licensed relation and never survived complete output. The consolidation record had already recommended representing commenthood as role metadata on the typed predicate and parent `TopicComment` node.

Disposition: retire `Comment`; preserve `comment` and `comment_predicate` slots under `TopicComment`.

## `PerfectiveResultPredicate`

The former fallback recognized only `解決 + 咗 + optional particle`. Complete output routed the same surface through `PerfectiveVP`, so the specialized wrapper was both lexical-item-specific and structurally shadowed. The mapped sources support aspect/result distinctions but do not require this dedicated node.

Disposition: retire `PerfectiveResultPredicate`; preserve lexical predicate plus perfective aspect composition under `PerfectiveVP`. Historical references may migrate to `PerfectiveVP` without gaining evidential weight.

## Behavior-equivalence audit

The release verifier compares v0.5.197 against the exact v0.5.196 base tree over the frozen structured-material candidate set used by the runtime reachability audit.

Required conditions:

- 1,885 structured candidate strings compared;
- zero complete diagnostic-row differences;
- 545/545 regression cases pass;
- 43/43 NP cases pass;
- 1,221/1,221 construction assertions pass;
- both retired labels absent from the active registry and current test index;
- both original notes preserved in the retired-label archive;
- active labels, construction notes, and test files remain exactly aligned.

## Evidence accounting

- labels retired: **2**;
- retained runtime labels: **166**;
- retired labels recorded: **15**;
- implementation probes removed: **0**;
- direct standardized assertions removed: **0**;
- remaining `no_direct_cases`: **0**;
- linguistic evidence weight added: **0**;
- retained linguistic statuses changed: **no**;
- recognized parser spans changed: **no**.

## Dormant-label review closure

This checkpoint closes the full dormant/uncovered-label review opened after the v0.5.183 full review. Every runtime label now has positive/boundary standardized coverage, zero-weight implementation reachability coverage, or the one documented compatibility-alias-only path. No active runtime label remains uncovered.
