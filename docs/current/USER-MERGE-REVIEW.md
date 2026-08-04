---
title: Canto Span — User Merge Authority
status: current
tags: [canto-span/infrastructure, canto-span/agents, canto-span/git]
related: "[[00-START-HERE]]"
---

# User merge authority

`USER-MERGE-REVIEW.md` is the canonical owner of pull-request merge authorization.

This file is the canonical detailed owner of user merge authority. It records the
current user decision for when a repository agent must stop before merge and when it
may merge autonomously after live safety checks. `AGENTS.md`, `00-START-HERE.md`,
the coordination contract, Git workflow, governance, testing guidance, and PR
template must be interpreted consistently with this file. Contradictory current text
is a verification failure rather than an acceptable lower-priority holdout.

## Current standing authorization

The user has explicitly authorized ChatGPT to continue bounded repository execution
loops without stopping after each pull request solely to obtain another merge
approval. This standing authorization applies to the active stabilization and
repository-consistency execution loop when all of the following remain true:

- the work is covered by a current intake issue and matching work claim;
- the pull request has one bounded outcome and a coherent reviewed repository state;
- the pull-request head is unchanged since review;
- the branch is current with the default branch;
- applicable checks have passed or the accepted limitation is explicitly recorded;
- no unresolved review thread, dependency, ownership mismatch, semantic overlap, or
  pending changeset remains;
- protected state and reserved decisions remain intact;
- the requested merge method follows repository policy.

When those conditions hold, the integrator may merge the pull request without asking
for another per-PR approval message.

## Required stop before merge

The agent must still stop without merging when any of these conditions applies:

1. the user explicitly asks to review or approve a particular pull request before
   merge;
2. the pull-request head changes after review;
3. scope materially changes after review;
4. a required check fails or cannot be inspected;
5. the branch is behind the default branch in a way that could affect the result;
6. the live intake, claim, branch, or pull-request bindings disagree;
7. an unresolved review thread, dependency, or semantic overlap appears;
8. the work would make a protected linguistic, evidentiary, identity, status,
   privacy, deployment, release, version, or governance decision not already
   authorized by the active issue;
9. tool or repository state is uncertain enough that merge safety cannot be verified;
10. the pull request is a broad release, deployment, irreversible data, or other
    high-risk action whose issue explicitly reserves user approval.

In those cases, the agent must provide the pull-request number or link, exact head,
outcome, changed scope, validation, material risks, and unresolved limitations, then
wait for a valid approval or a revised issue.

## Valid approval

Valid approval may be either:

- approval that identifies the specific pull request or unambiguously refers to the
  single pull request just presented for review; or
- current standing authorization for a continuous bounded execution loop, when the
  pull request falls within that loop and satisfies every live safety condition above.

Approval may be given in the current conversation or by an attributable user comment
or review on the pull request.

Standing authority is not a substitute for live merge checks. Passing checks,
repository integrator status, absence of conflicts, or a ready-for-review state does
not permit merge when the active issue reserves a decision, protected state changed,
or a safety condition cannot be verified.

## Changes after review

Review applies only to the reviewed head commit. If the pull-request head changes,
new commits are added, scope materially changes, or a required check is rerun on a
different head, the agent must rereview the new head before merge. If any stop
condition above applies, the agent must notify the user again and obtain fresh
approval.

Before every merge, the integrator must re-check that:

- the reviewed head commit is unchanged;
- required checks still pass;
- the canonical intake issue still permits pickup by the claim's active worker;
- the live ownership revision still matches the claim and pull request;
- the claim remains valid;
- no unresolved dependency or semantic overlap has appeared;
- no pending changeset remains.

Only then may the integrator merge.

## Automation boundary

Automation may prepare, validate, label, or mark a pull request ready. It may not
merge or enable auto-merge unless the active pull request is covered by valid approval
under this file and all live safety checks pass. No workflow may infer merge authority
from check success, elapsed time, labels added by an agent, or repository ownership
alone.
