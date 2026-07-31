---
title: Canto Span — Multi-Agent Coordination
status: current
tags: [canto-span/infrastructure, canto-span/agents, canto-span/git]
related: "[[00-START-HERE]]"
---

# Multi-agent coordination

## Purpose

Multiple agents may work concurrently, including on the same physical file, when
their semantic target regions are disjoint. Coordination prevents incompatible
work without turning every large registry or document into a global lock.

The system uses:

1. one GitHub work-claim issue per task;
2. semantic regions rather than file-only checkout locks;
3. shared and exclusive claim modes;
4. branch-local declarative changesets for high-contention files;
5. worker and integrator roles;
6. integration-owned aggregate and current-state files;
7. agent-observed claim and handoff discipline;
8. an integrator responsible for final reconciliation and merge order after the
   mandatory user-review stop and explicit approval.

There is no read-only research role. Research, evidence recording, adjudication,
implementation, testing, documentation, and integration may be combined in one
coherent claim when the affected state dimensions and substantive gates are clear.

## Canonical owners

- Work-claim format: `schemas/work-claim.schema.json`
- Legacy work-claim format: `schemas/work-claim-v1.schema.json`
- Current intake ownership format: `schemas/task-intake.schema.json`
- Legacy unified intake format: `schemas/task-intake-v1.schema.json`
- Declarative changeset format: `schemas/change-set.schema.json`
- Exclusive and integration-owned paths: `config/coordination-targets.json`
- Claim intake: `.github/ISSUE_TEMPLATE/work-claim.yml`
- Pull-request handoff: `.github/pull_request_template.md`
- Optional coordination diagnostics: `tools/coordination/check-pr.js` and focused tests
- Changeset validation and application: `tools/coordination/change-set.js`
- Per-PR merge authorization: `docs/current/USER-MERGE-REVIEW.md`

The latest valid ownership block in the canonical intake issue body owns pickup
authority. The linked work-claim issue owns semantic scope. They do not own
linguistic status, construction identity, runtime behavior, evidence, survey state,
or release state.

## Pickup ownership and precedence

Current intake records use `canto-span-task-intake-v2`. They contain a monotonic
`ownership_revision`, `active_pickup_owner`, `pickup_allowed`, previous target,
reason, timestamp, handoff status, active claim, branch, and PR. Current claims use
`canto-span-work-claim-v2` and bind `intake_issue`, `active_worker`, and
`ownership_revision`.

Authority order is:

1. the latest valid ownership block in the canonical intake issue body;
2. the matching ownership-bound work claim;
3. the matching branch and pull request.

These records must agree. The intake record wins on pickup identity and revision;
the claim does not preserve an earlier owner's authority. Comments, labels,
assignments, mentions, reviews, and cached prompts cannot take over or reassign work.

Every agent re-fetches the intake issue and linked claim:

- after every resumed session;
- before claim creation;
- before branch creation;
- before the first repository edit;
- before every commit and push;
- before readying or presenting a pull request;
- before merge.

On any owner, permission, revision, claim, branch, or PR mismatch, the agent reports
`routing result: unavailable` and stops without repository writes.

### Agent-neutral takeover and reassignment

Codex, ChatGPT, and human pickup use the same transition rule. A takeover or
reassignment replaces the single ownership block in the intake issue body, increases
the revision by exactly one, identifies the previous target and authorized reason,
records a later timestamp, and names an explicit handoff state.

An ownership change cannot authorize parallel edits. Existing overlapping work must
be absent, released, narrowed to disjoint scope, or confined to a disjoint
decision-only region. The linked claim must then be created or updated with the new
worker and revision before the new owner edits. The old owner stops as soon as it
observes the new revision.

Historical `canto-span-task-intake-v1`, `canto-span-codex-task-v1`, and
`canto-span-work-claim-v1` records remain readable. They are not silently rewritten,
but a legacy claim must migrate to v2 before participating in active pickup,
takeover, or reassignment.

## Work-claim lifecycle

### 1. Claim before editing

Before creating or modifying an agent branch:

1. inspect current `main`;
2. inspect open pull requests;
3. inspect open work-claim issues;
4. re-fetch the canonical intake ownership block;
5. create a work claim from the issue template bound to its issue, active worker,
   and ownership revision;
6. choose the smallest adequate semantic targets;
7. declare worker or integrator role;
8. re-fetch ownership and create the branch named in the claim only if it still
   matches.

The claim contains a fenced `coordination-claim` JSON object. The branch and pull
request use that claim until the work is merged, abandoned, or replaced.

### 2. Keep the claim current

Update the issue when scope, branch, dependencies, semantic regions, generated
outputs, role, ownership revision, or expiry changes. Do not silently expand the
branch beyond the issue. Re-fetch the intake before every commit and push.

An active claim must have a future `expires_at`. Claims should normally expire
within 72 hours; exclusive claims should normally expire within 48 hours. Renew a
claim only while the branch or pull request is active.

### 3. Close through the pull request

The pull request body contains:

```text
<!-- coordination-claim: #123 -->
Work claim: #123
Closes #123
```

The issue closes automatically when the pull request merges. An abandoned task
marks the claim `stale` or closes the issue explicitly.

## Semantic targets

A target has a type, identity or path, and optional semantic region.

```json
{
  "type": "construction",
  "id": "AA80",
  "region": "identity"
}
```

```json
{
  "type": "file",
  "path": "data/construction-identities.json",
  "region": "/records/AA80"
}
```

```json
{
  "type": "file",
  "path": "main.js",
  "region": "parseLocativePlacePhrase"
}
```

Supported target types are:

- `construction`
- `file`
- `state_dimension`
- `survey`
- `corpus_packet`
- `schema`
- `workflow`
- `generated_output`

Use a stable function, heading, JSON record, JSON Pointer, construction code,
survey ID, corpus packet, or state dimension as the region. Use `whole-file` only
when the whole file is genuinely indivisible.

## Shared and exclusive claims

### Shared claim

A shared claim permits multiple agents to reference the same physical file when
they claim different semantic regions.

Allowed:

```text
data/construction-identities.json /records/AA80
data/construction-identities.json /records/AA86
```

Disallowed:

```text
data/construction-identities.json /records/AA80
data/construction-identities.json /records/AA80
```

The second pair changes the same logical record and must be combined, serialized,
or divided into genuinely independent regions.

### Exclusive claim

An exclusive claim blocks overlapping work. It is required for repository-wide
policy, schemas, workflow definitions, verification orchestration, shared command
surfaces, and every path listed under `exclusive_files` in
`config/coordination-targets.json`.

An exclusive claim is narrow in duration and scope. It does not authorize unrelated
changes to the claimed file or state dimension.

## Roles

### Worker

A worker may research, edit evidence records, modify ordinary claimed files,
implement runtime changes, update tests, and document the result when the claim
covers those dimensions. A worker must not finalize integration-owned files such as
aggregate current-state summaries or deterministic cross-construction reports.

When work requires a high-contention shared file, the worker may prepare a
branch-local declarative changeset instead of editing that file directly.

### Integrator

An integrator may reconcile integration-owned files and manage merge order. The
integrator:

1. verifies dependencies and active claims;
2. rebuilds stale work onto current `main`;
3. applies or rejects pending changesets;
4. stops on failed preconditions;
5. regenerates deterministic outputs once;
6. updates current-state documentation from the combined state;
7. removes pending changesets;
8. runs every applicable verifier;
9. verifies exact head SHA and mergeability;
10. marks a complete PR ready, notifies the user with the exact head and validation,
    and stops without merging;
11. after explicit approval for that PR and unchanged head, re-checks every gate and
    merges only a coherent passing state.

Integrator role does not authorize autonomous merge and does not bypass evidence,
identity, status, survey, release, parser, or user-review gates.

## Integration-owned files

`config/coordination-targets.json` lists files likely to conflict because they
aggregate many independent changes or summarize the repository.

Typical examples include:

- `README.md`
- `HANDOFF.md`
- `docs/current/PROJECT-STATE.md`
- generated discovery reports
- generated label and readiness registries

Workers declare these as generated outputs or integration consequences rather than
finalizing them independently. The integrator updates them once after the underlying
canonical inputs are combined.

## Declarative changesets

Use a changeset when direct editing would create unnecessary contention in a large
shared JSON or Markdown file. A changeset is an intent description with exact
preconditions, not evidence and not canonical project state.

Pending changesets live under:

```text
changes/pending/<WORK-ID>.json
```

They are branch-local temporary artifacts and **must not survive a ready-to-merge
pull request**.

Supported operations:

- `json_record_merge`
- `json_pointer_set`
- `text_replace`
- `markdown_section_replace`

Every operation has a precondition. Application stops when current state no longer
matches the expected value, record revision, exact text, or section hash. It never
silently overwrites newer work.

```bash
npm run changes:validate -- changes/pending/CS-WORK-0000.json
node tools/coordination/change-set.js apply changes/pending/CS-WORK-0000.json
npm run changes:apply -- changes/pending/CS-WORK-0000.json
```

The plain `apply` command is a dry run. `changes:apply` writes only after all
operations and preconditions validate.

## Pull-request lifecycle

### Draft pull request

Use draft state when work is incomplete, contains a pending changeset, depends on
another unresolved PR, or still requires integration. A draft must still:

- link one open work claim;
- use the branch named in the claim;
- cover every changed file;
- avoid unresolved overlap;
- use exclusive mode where required;
- use integrator role for integration-owned files;
- match the live intake owner, pickup permission, ownership revision, active claim,
  branch, and exact PR number.

Immediately after GitHub assigns the draft PR number, update `active_pr` in the
canonical intake block and keep the PR handoff truthful. Agents recheck these values
directly under `AGENTS.md`; there is no universal metadata verifier. Attaching the PR
does not by itself transfer ownership or authorize more repository writes.

### Ready pull request

A complete coherent change may open ready or transition to ready. A ready PR must
contain no pending changeset file. The integrator must have applied or rejected the
proposal, regenerated shared outputs, reconciled documentation, and removed the
temporary file.

The ready gate replaces post-merge repair. Temporary intent is cleaned on the branch
before review while the issue, PR, and Git history preserve the decision trail. Once
ready, the agent re-fetches live ownership, notifies the user, and stops; ready state
and passing checks do not authorize merge.

## Automation policy

Automation follows least privilege rather than a blanket read-only or no-writer
rule.

Validation-only workflows should remain read-only because they do not need write
access. Coordination itself is agent-observed rather than enforced by a universal PR
workflow. Optional diagnostics may inspect repository and live GitHub state when an
agent is resolving a specific ambiguity, but their output does not grant merge
eligibility.

Write-capable automation is permitted only when all of the following hold:

1. an exclusive active claim covers the workflow and every target;
2. permissions are explicit and minimal;
3. writes are limited to the claimed non-`main` branch or issue/PR metadata;
4. the base SHA, head SHA, claim, target, and operation preconditions are checked;
5. the action cannot expand its own scope;
6. every write is auditable and recoverable;
7. the workflow cannot autonomously adjudicate evidence, promote linguistic status,
   deploy a survey, publish a release, write directly to `main`, merge, enable
   auto-merge, or infer user approval.

Claim-aware automation may prepare commits, apply validated changesets, update claim
metadata, or assist integration when those conditions are satisfied. It may not
merge or enable auto-merge before explicit user approval for the specific PR and
head. A generic unscoped writer, repair bot, or direct-to-main merge remains
prohibited.

## Stale and abandoned work

An expired claim does not remain a permanent lock. It is ignored for overlap after
expiry, but an agent must renew or replace it before resuming edits or presenting the
PR as ready.

Before taking over apparently abandoned work, inspect the intake issue, branch, PR,
and claim activity. Record a new ownership revision first. Close, release, narrow,
or mark the old claim stale before opening or updating an overlapping claim. A
claim's expiry alone does not reassign pickup ownership.

## Merge-order rules

After explicit user approval for each specific PR and unchanged head, the integrator
normally merges in this order:

1. repository-wide schemas, policy, or workflow changes;
2. canonical independent records;
3. dependent runtime or test changes;
4. generated aggregates and current-state reconciliation;
5. release or packaging work.

A later PR is rebuilt when an earlier merge invalidates preconditions or assumptions.
Do not force a conflict-prone merge because checks once passed.

## What this system does not do

- It does not make Git branches true distributed locks.
- It does not permit two agents to change the same semantic region concurrently.
- It does not infer linguistic validity from conflict-free application.
- It does not let worker role bypass integration ownership.
- It does not create a permanent queue or active-note whitelist.
- It does not make research read-only.
- It does not grant automation unrestricted write access.
- It does not let checks, labels, elapsed time, or integrator role substitute for user
  approval of a specific PR and head.
- It does not replace evidence, survey, status, release, or deployment gates.
