---
title: Canto Span — Multi-Agent Coordination
status: current
tags: [canto-span/infrastructure, canto-span/agents, canto-span/git]
related: "[[00-START-HERE]]"
---

# Multi-agent coordination

## Purpose

Multiple agents may work concurrently, including on the same physical file, when
their semantic targets are disjoint. Coordination must prevent incompatible work
without turning every large registry or document into a global lock.

The system uses:

1. one GitHub work-claim issue per task;
2. semantic target regions rather than a file-only checkout list;
3. shared and exclusive claim modes;
4. branch-local declarative changesets for high-contention files;
5. integration-owned aggregate and current-state files;
6. a read-only pull-request coordination workflow;
7. one integration agent responsible for final reconciliation and merge order.

There is no automatic writer and no post-merge cleanup bot.

## Canonical owners

- Work-claim format: `schemas/work-claim.schema.json`
- Declarative changeset format: `schemas/change-set.schema.json`
- Exclusive and integration-owned paths:
  `config/coordination-targets.json`
- Claim intake: `.github/ISSUE_TEMPLATE/work-claim.yml`
- Pull-request handoff: `.github/pull_request_template.md`
- Static validation: `tools/verify-coordination-system.js`
- Online overlap validation: `tools/coordination/check-pr.js`
- Changeset validation and application: `tools/coordination/change-set.js`
- Read-only workflow: `.github/workflows/coordination-check.yml`

GitHub issues own temporary work intent. They do not own linguistic status,
construction identity, runtime behavior, evidence, survey state, or release state.

## Work-claim lifecycle

### 1. Claim before editing

Before creating or modifying an agent branch:

1. inspect current `main`;
2. inspect open pull requests;
3. inspect open work-claim issues;
4. create a work claim from the issue template;
5. choose the smallest adequate semantic targets;
6. create the branch named in the claim.

The claim contains a fenced `coordination-claim` JSON object. The branch and pull
request must use the same claim until the work is merged, abandoned, or replaced.

### 2. Keep the claim current

Update the issue when scope, branch, dependencies, semantic regions, generated
outputs, integration role, or expiry changes. Do not silently expand the branch
beyond the issue.

An active claim must have a future `expires_at`. Claims should normally expire
within 72 hours; exclusive claims should normally expire within 48 hours. Renew a
claim only while the branch or pull request is still active.

### 3. Close through the pull request

The pull request body must contain:

```text
<!-- coordination-claim: #123 -->
Work claim: #123
Closes #123
```

The issue closes automatically when the pull request merges. An abandoned task
must instead mark the claim `stale` or close the issue explicitly.

## Semantic targets

A claim target has a type, an identity or path, and an optional semantic region.

Examples:

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

```json
{
  "type": "survey",
  "id": "YUE-JUDGMENT-PILOT-01",
  "region": "item-audit"
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

Allowed example:

```text
data/construction-identities.json /records/AA80
data/construction-identities.json /records/AA86
```

Disallowed example:

```text
data/construction-identities.json /records/AA80
data/construction-identities.json /records/AA80
```

The second pair changes the same logical record and must be combined, serialized,
or divided into genuinely independent regions.

### Exclusive claim

An exclusive claim blocks overlapping work. It is required for repository-wide
policy, schemas, workflows, verification orchestration, shared command surfaces,
and every path listed under `exclusive_files` in
`config/coordination-targets.json`.

An exclusive claim should be narrow in duration and scope. It does not authorize
unrelated changes to the claimed file or state dimension.

## Integration roles

### Worker

A worker may edit ordinary claimed files and semantic regions. A worker must not
finalize integration-owned files such as aggregate current-state summaries or
deterministic cross-construction reports.

When work requires a high-contention shared file, the worker may prepare a
branch-local declarative changeset instead of editing that file directly.

### Integrator

An integrator may reconcile integration-owned files after combining the accepted
canonical changes. The integrator:

1. verifies dependency and merge order;
2. rebuilds stale work onto current `main`;
3. applies pending changesets;
4. stops on failed preconditions;
5. regenerates deterministic outputs once;
6. updates current-state documentation from the final combined state;
7. removes pending changesets;
8. runs every applicable verifier;
9. merges only a coherent passing state.

`integration_role: integrator` does not bypass evidence, identity, status, survey,
release, or parser gates.

## Integration-owned files

`config/coordination-targets.json` lists files that are likely to conflict because
they aggregate many independent changes or summarize the whole repository.

Typical examples include:

- `README.md`
- `HANDOFF.md`
- `docs/current/PROJECT-STATE.md`
- generated discovery reports
- generated label and readiness registries

Workers should declare these as generated outputs or integration consequences,
not independently finalize them. The integrator updates them once after the
underlying canonical inputs are combined.

## Declarative changesets

### When to use one

Use a changeset when direct editing would create unnecessary contention in a large
shared JSON or Markdown file. A changeset is an intent description with exact
preconditions, not evidence and not a canonical project state.

Pending changesets live under:

```text
changes/pending/<WORK-ID>.json
```

They are branch-local temporary artifacts. They must not survive a ready-to-merge
pull request.

### Supported operations

The initial engine supports:

- `json_record_merge`
- `json_pointer_set`
- `text_replace`
- `markdown_section_replace`

Every operation has a precondition. The apply command stops when current `main`
no longer matches the expected value, record revision, exact text, or section
hash. It never silently overwrites newer work.

Changesets may list regeneration target IDs from
`config/coordination-targets.json`. They cannot execute arbitrary shell commands.

### Commands

```bash
npm run changes:validate -- changes/pending/CS-WORK-0000.json
node tools/coordination/change-set.js apply changes/pending/CS-WORK-0000.json
npm run changes:apply -- changes/pending/CS-WORK-0000.json
```

The plain `apply` command is a dry run. `changes:apply` writes only after every
operation and precondition validates.

## Pull-request workflow

### Draft pull request

A draft may contain validated files under `changes/pending/`. The coordination
workflow reports them as draft-only warnings.

The draft must still:

- link one open work-claim issue;
- use the branch named in the claim;
- cover every changed file in the claim;
- avoid unresolved semantic overlap with another active claim;
- use an exclusive claim where required;
- use an integrator role for integration-owned files.

### Ready pull request

A ready pull request must contain no pending changeset file. The integrator must
have applied or rejected the proposal, regenerated shared outputs, reconciled
current documentation, and removed the temporary file.

The ready gate therefore replaces a post-merge deletion bot. Temporary intent is
cleaned on the branch before merge, while the issue, pull request, and Git history
preserve the decision trail.

## Read-only automation

`coordination-check.yml` runs on pull-request creation, edits, synchronization,
reopening, draft conversion, and ready-for-review transitions. It has only:

- `contents: read`
- `issues: read`
- `pull-requests: read`

It validates the linked claim, expiry, branch, changed-file coverage, exclusive
paths, integration ownership, pending-file readiness, and active-claim overlap.
It does not edit issues, branches, pull requests, or repository files.

## Stale and abandoned work

An expired claim does not remain a permanent lock. It is ignored for overlap after
expiry, but the associated pull request fails its own claim validation until the
claim is renewed or replaced.

Before taking over apparently abandoned work, the coordinator must inspect branch
and pull-request activity. Close or mark the old claim stale before opening a new
overlapping claim.

## Merge-order rules

The integration agent should merge in this order:

1. repository-wide schemas, policy, or workflow changes;
2. canonical independent records;
3. dependent runtime or test changes;
4. generated aggregates and current-state reconciliation;
5. release or packaging work.

A later pull request must be rebuilt when an earlier merge invalidates its
preconditions or current-state assumptions. Do not force a conflict-prone merge
merely because all individual checks once passed.

## What this system does not do

- It does not make Git branches true distributed locks.
- It does not permit two agents to change the same semantic region concurrently.
- It does not infer linguistic validity from conflict-free application.
- It does not allow a worker to bypass integration ownership.
- It does not create a permanent queue or active-note whitelist.
- It does not add automatic commit, push, merge, or cleanup writers.
