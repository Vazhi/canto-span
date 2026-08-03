---
title: Canto Span — Portfolio Routing
status: current
tags: [canto-span/infrastructure, canto-span/planning, canto-span/coordination]
related: "[[MULTI-AGENT-COORDINATION]] [[CODEX-ISSUE-WORKFLOW]]"
---

# Portfolio routing

`portfolio-routing` is optional planning metadata. It records durable backlog and
research-planning information that GitHub does not model reliably: track, work
kind, research mode, priority rationale, bounded scope, dependencies, expected
locks, cancellation conditions, acceptable null outcomes, and completion
endpoints.

It never authorizes repository execution.

## Ownership boundary

Active execution has one ownership path: exactly one fenced `task-intake` block
whose JSON schema is `canto-span-task-intake-v2`. The linked v2 work claim,
branch, and pull request must agree with that live intake record.

A portfolio block cannot:

- assign or change the active owner;
- authorize pickup, takeover, reassignment, or resumed work;
- bind a work claim, branch, or pull request;
- replace permission, handoff, revision, or active-claim fields;
- establish merge eligibility or user approval.

Portfolio-only issues may remain Future planning records. Before new or resumed
execution, replace planning-only routing with one current task-intake ownership
record. A body containing both task-intake and portfolio-routing blocks is not an
accepted active ownership format.

Fence labels are exact. Blocks such as `task-intake-example`, `task-intake json`,
`portfolio-routing-example`, or `coordination-claim-example` are prose examples,
not authority.

## Current enums

Tracks:

- `T1-closure`
- `T2-identity`
- `T3-survey`
- `T4-corpus`
- `T5-evidence`
- `T6-runtime`
- `T7-ingress`
- `T8-release`

Kinds:

- `decision`
- `research`
- `identity-batch`
- `corpus-review`
- `survey-audit`
- `implementation`
- `source-ingress`
- `human-action`
- `release`
- `coordination`

Priorities: `P0`, `P1`, `P2`, `P3`.

Research modes: `decision-support`, `decision-discovery`, or `null` according to
the kind/mode matrix below.

## Kind and research-mode matrix

| Kind | Allowed research mode |
|---|---|
| `decision` | `decision-support` |
| `research` | `decision-support` or `decision-discovery` |
| `identity-batch` | `decision-support` |
| `corpus-review` | `decision-support` or `decision-discovery` |
| `survey-audit` | `decision-support` |
| `implementation` | `null` |
| `source-ingress` | `null` |
| `human-action` | `null` |
| `release` | `null` |
| `coordination` | `null` |

`decision-support` requires a non-empty decision question and forbids discovery
scope/prompts. `decision-discovery` requires a null decision question plus a
bounded discovery scope and at least one prompt. Null mode forbids all decision
and discovery fields.

## Lock semantics

Locks are hierarchical. `runtime:AA82` overlaps
`runtime:AA82:children`. A `*` segment is a wildcard. A `global` segment owns all
descendants of the matched namespace. Therefore:

- `runtime:*` overlaps `runtime:AA82`;
- `runtime:global` overlaps every `runtime:*` lock;
- `runtime-bundle:global` overlaps every `runtime-bundle:*` lock;
- `*:global` is repository-global and overlaps every lock.

A write lock may not overlap any declared prohibited parallel write.

## Pull-request authority

A coordinated PR must contain exactly one of each authority marker:

- hidden `<!-- coordination-claim: #NUMBER -->`;
- visible `Work claim: #NUMBER`;
- `Intake issue: #NUMBER`;
- `Active worker: codex|chatgpt|human`;
- `Ownership revision: NUMBER`.

The hidden and visible claim numbers must agree. Duplicate markers fail even when
they repeat the same value. The checker never selects the first of contradictory
markers.

## WIP limits

The executable limits are owned by
`tools/coordination/portfolio-integrity.js`:

- maximum 4 counted open exclusive claims;
- T1: 1;
- T2: 1;
- T3 lifecycle transition: 1, excluding passive collection;
- combined T4/T5 substantive work: 2, with at most 1 broad discovery;
- T6 runtime-changing work: 1;
- T7 ingress: 2;
- T8 release: 1.

External human actions and passive survey collection are excluded from numerical
WIP. Active claims without a track fail closed. Exact, hierarchical, wildcard,
namespace-global, and repository-global lock conflicts are reported.

Run a read-only normalized snapshot audit with:

```bash
npm run portfolio:audit -- --input /path/to/open-claims.json
```

Add `--strict` when a nonzero exit is required. The audit reports violations; it
does not close claims, release locks, reassign owners, or edit project state.
Existing excess claims require explicit reconciliation and terminal dispositions.

## Validation

Run:

```bash
npm run test:coordination
```

The suite covers exact fence labels, every kind/mode combination, wildcard/global
lock overlap, coherent PR authority, WIP limits, lock conflicts, and the observed
17-open/10-T7 violation shape.
