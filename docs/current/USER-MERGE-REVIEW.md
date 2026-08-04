---
title: Canto Span — Autonomous Merge Authority
status: current
tags: [canto-span/infrastructure, canto-span/agents, canto-span/git]
related: "[[00-START-HERE]]"
---

# Autonomous merge authority

`USER-MERGE-REVIEW.md` is the canonical owner of pull-request merge authorization.

This file records the current user decision for autonomous GitHub-connected work. It
supersedes older copy-file, download-link, checkpoint, per-PR approval, and
stop-before-merge instructions. `AGENTS.md`, `00-START-HERE.md`, the coordination
contract, Git workflow, governance, testing guidance, and PR template must be
interpreted consistently with this file. Contradictory current text is a verification
failure rather than an acceptable lower-priority holdout.

## Current standing authorization

The user has explicitly authorized ChatGPT to continue bounded repository execution
loops without stopping after each pull request and without asking for another
checkpoint or per-PR approval. This standing authorization applies to autonomous
GitHub-connected work when all of the following remain true:

- the work is covered by a current intake issue and matching work claim;
- the pull request has one bounded outcome and a coherent reviewed repository state;
- the pull-request head is unchanged since review;
- the branch is current with the default branch;
- applicable checks have passed or the accepted limitation is explicitly recorded;
- no unresolved review thread, dependency, ownership mismatch, semantic overlap, or
  pending changeset remains;
- protected state and reserved decisions remain intact;
- the requested merge method follows repository policy.

When those conditions hold, the integrator merges the pull request and continues to
the next bounded repository unit. Do not stop solely to ask for a checkpoint, download
confirmation, copy-file handoff, or per-PR approval.

## Required safety stop before merge

The agent must stop without merging only when merge safety cannot be verified or the
active issue does not authorize the decision being made. Required safety stops are:

1. the user explicitly suspends autonomous mode or asks to review a particular pull
   request before merge;
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
    high-risk action whose issue explicitly reserves a user decision.

In those cases, the agent records the pull-request number or link, exact head,
outcome, changed scope, validation, material risks, and unresolved limitations, then
continues only after the blocker is resolved or the user gives a revised instruction.

## Valid merge authority

Valid merge authority may be either:

- current standing authorization for autonomous bounded execution, when the pull
  request falls within that loop and satisfies every live safety condition above; or
- a later user instruction that narrows, suspends, or replaces the standing
  authorization for a specific pull request or class of work.

Standing authority is not a substitute for live merge checks. Passing checks,
repository integrator status, absence of conflicts, or a ready-for-review state does
not permit merge when the active issue reserves a decision, protected state changed,
or a safety condition cannot be verified.

## Changes after review

Review applies only to the reviewed head commit. If the pull-request head changes,
new commits are added, scope materially changes, or a required check is rerun on a
different head, the agent must rereview the new head before merge. If any safety stop
above applies, the agent records the blocker and does not merge until the blocker is
resolved.

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

Automation may prepare, validate, label, mark a pull request ready, merge, or enable
auto-merge only when the active pull request is covered by valid merge authority
under this file and all live safety checks pass. No workflow may infer merge
authority from check success, elapsed time, labels added by an agent, or repository
ownership alone.
