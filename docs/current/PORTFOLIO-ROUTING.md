---
title: Canto Span — Portfolio Routing
status: current
tags: [canto-span/infrastructure, canto-span/planning, canto-span/coordination]
related: "[[MULTI-AGENT-COORDINATION]]"
---

# Portfolio routing

`portfolio-routing` is optional planning metadata. It records durable backlog and
research-planning information that GitHub does not model reliably, including owning
track, work kind, research mode, priority rationale, decision or discovery scope,
dependencies, read scope, expected locks, cancellation conditions, acceptable null
outcomes, and completion endpoints.

It does **not** authorize repository execution.

## Ownership boundary

A portfolio block cannot:

- assign or change the active pickup owner;
- authorize pickup, takeover, reassignment, or resumed work;
- bind an active work claim;
- authorize a branch or pull request;
- replace handoff, permission, revision, claim, branch, or PR fields;
- establish merge eligibility or user approval.

New or resumed active execution requires exactly one valid
`canto-span-task-intake-v2` ownership block in the canonical intake issue. The linked
`canto-span-work-claim-v2`, branch, and pull request must agree with that live intake
record under [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md).

Historical and Future issues may retain portfolio-only planning blocks. Before one
is activated or resumed, add or replace its current ownership record with one
`task-intake-v2` block. Do not add a second ownership authority or treat comments,
labels, assignments, project fields, portfolio metadata, or an old claim as a
takeover.

A body containing both a `task-intake` block and a `portfolio-routing` block is not
an accepted active-ownership format. Keep planning metadata in the issue's ordinary
Markdown or migrate the needed planning fields into the active task specification
before execution.

## Current enums

### Tracks

- `T1-closure`
- `T2-identity`
- `T3-survey`
- `T4-corpus`
- `T5-evidence`
- `T6-runtime`
- `T7-ingress`
- `T8-release`

### Work kinds

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

### Research modes

- `decision-support`
- `decision-discovery`
- `null` for execution or non-research planning

### Priorities

- `P0`
- `P1`
- `P2`
- `P3`

Unknown tracks, kinds, modes, priorities, fields, malformed arrays, duplicate array
members, or overlapping acquired/prohibited locks fail validation. Do not invent a
new enum inside one issue.

## Mode-specific contract

`decision-support` requires a non-empty `decision_question` and does not use
discovery scope or prompts.

`decision-discovery` requires `decision_question: null`, a bounded non-empty
`discovery_scope`, and at least one non-empty `discovery_prompts` entry.

`research_mode: null` requires `decision_question: null` and no discovery scope or
prompts. A `kind: research` issue must declare one of the two research modes.

## Execution rule

The optional PR diagnostic accepts active ownership only through `task-intake-v2`.
It rejects portfolio-only and mixed ownership modes. This is a focused diagnostic,
not a universal GitHub merge gate. Agents remain responsible for re-fetching live
ownership, claims, branches, pull requests, overlap, and user approval at every gate
specified by `AGENTS.md` and the current coordination guide.
