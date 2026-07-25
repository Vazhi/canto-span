---
title: Canto Span — User Merge Review Gate
status: current
tags: [canto-span/infrastructure, canto-span/agents, canto-span/git]
related: "[[00-START-HERE]]"
---

# User merge review gate

`USER-MERGE-REVIEW.md` is the canonical owner of per-pull-request merge authorization.

This file is the canonical detailed owner of per-pull-request merge authorization.
It is a specific current user decision. `AGENTS.md`, `00-START-HERE.md`, the
coordination contract, Git workflow, governance, testing guidance, and PR template
must agree with it. Contradictory current text is a verification failure rather than
an acceptable lower-priority holdout.

## Required stop before merge

After implementation and all applicable checks are complete, the agent must:

1. make the pull request ready for review;
2. confirm the exact head commit and applicable checks;
3. inform the user that the pull request is ready for review;
4. provide the pull-request number or link, outcome, changed scope, validation,
   material risks, and any unresolved limitations;
5. stop without merging.

The agent must not merge, enable auto-merge, schedule a merge, or invoke automation
that can merge the pull request until the user explicitly approves that specific
pull request after receiving the ready-for-review notice.

## Valid approval

Valid approval must identify the specific pull request or unambiguously refer to the
single pull request just presented for review. Approval may be given in the current
conversation or by an attributable user comment or review on the pull request.

Standing authority to manage pull requests, earlier permission to merge other pull
requests, repository integrator status, passing checks, absence of conflicts, or a
ready-for-review state does not count as approval for the current pull request.

## Changes after approval

Approval applies only to the reviewed head commit. If the pull-request head changes,
new commits are added, the scope materially changes, or a required check is rerun on
a different head, the agent must notify the user again and obtain fresh approval.

After explicit approval, the integrator must re-check that:

- the approved head commit is unchanged;
- required checks still pass;
- the canonical intake issue still permits pickup by the claim's active worker;
- the live ownership revision still matches the claim and pull request;
- the claim remains valid;
- no unresolved dependency or semantic overlap has appeared;
- no pending changeset remains.

Only then may the integrator merge.

## Automation boundary

Automation may prepare, validate, label, or mark a pull request ready, but it may not
merge or enable auto-merge before explicit user approval. No workflow may infer
approval from check success, elapsed time, labels added by an agent, or repository
ownership alone.
