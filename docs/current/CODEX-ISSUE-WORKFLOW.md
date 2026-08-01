---
title: Canto Span — Task Creator and Pickup Routing
status: current
implementation_status: routing-active; manual-issue-generator-implemented; automatic-dispatch-not-implemented
tags: [canto-span/infrastructure, canto-span/agents, canto-span/github]
related: "[[00-START-HERE]] [[AGENT-WORKFLOW-SETTINGS]] [[MULTI-AGENT-COORDINATION]] [[USER-MERGE-REVIEW]]"
---

# Task creator and pickup routing

This document owns task classification and pickup routing among ChatGPT, optional
Codex workflows, and concrete human action. It does not decide whether an optional
agent is currently available.

Before applying this routing contract, read:

- [`AGENT-WORKFLOW-SETTINGS.md`](AGENT-WORKFLOW-SETTINGS.md);
- [`../../config/agent-workflow-settings.json`](../../config/agent-workflow-settings.json).

A task may be Codex-eligible in form while Codex pickup is unavailable in the current
setting. Eligibility never overrides availability.

This document supplements:

- [`../../AGENTS.md`](../../AGENTS.md);
- [`00-START-HERE.md`](00-START-HERE.md);
- [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md);
- [`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md).

The implemented manual intake generator is
[`.github/workflows/codex-intake-issue.yml`](../../.github/workflows/codex-intake-issue.yml).
Despite the historical filename, it supports all current pickup targets and must
apply the checked-in agent-availability gate before issue creation. Initial truthful
statuses are `manual-pickup-required` for an enabled Codex target,
`chatgpt-pickup-required` for ChatGPT, and `human-pickup-required` for human action.
Automatic dispatch is not implemented; creating an issue does not prove work began.

## 1. Mandatory classification

Before substantive repository work, classify the next action as exactly one of:

1. **ChatGPT-first** — research synthesis, linguistic judgment, policy, design,
   prioritization, user interaction, interpretation, or independent review is still
   required.
2. **Codex-eligible implementation** — one bounded repository-centered testable
   outcome has an accepted specification and no unresolved expert or user decision.
3. **Human-required** — one concrete action requires human authority, local device or
   corpus access, participant contact, credentials, or subjective user preference.
4. **Hybrid** — ChatGPT retains decisions and review while bounded implementation or
   local execution is separated into eligible steps.

Classification describes the work. `config/agent-workflow-settings.json` determines
which pickup targets may actually receive it.

## 2. Availability gate

Apply agent availability before creating, assigning, taking over, or resuming an
intake issue.

### While Codex workflows are disabled

- New and reassigned issues may target only ChatGPT or human action.
- Codex may not be `pickup_target`, `active_pickup_owner`, or an actual GitHub issue
  assignee.
- A task that is mechanically Codex-eligible remains with ChatGPT unless one concrete
  local or authority-bound step belongs to a human.
- Existing Codex claims, branches, PRs, assignments, or cached prompts do not preserve
  authority after the ownership revision changes.
- Restored tokens or later re-enablement do not automatically resume or reclaim old
  work.

### While Codex workflows are enabled

Codex may be selected only after the task passes the eligibility gate below and the
live intake explicitly assigns it to Codex. Re-enablement permits future routing; it
does not transfer existing ChatGPT or human work.

## 3. ChatGPT duties

ChatGPT retains work requiring:

- broad external research or source evaluation;
- linguistic or construction-boundary judgment;
- identity, ontology, status, promotion, parking, deployment, release, governance,
  or merge decisions;
- survey design or interpretation of participant evidence;
- work prioritization or clarification of an ambiguous objective;
- independent review of an agent pull request;
- user-facing writing, explanation, or translation.

After resolving those decisions, ChatGPT reassesses the remainder. When Codex is
enabled, bounded implementation may be routed to Codex. When Codex is disabled,
ChatGPT implements it directly or creates a human action only for a genuine human
limitation.

ChatGPT must report every created issue, its bounded outcome, protected state, pickup
target, and truthful status. Creating an issue does not prove that work has begun.

## 4. Codex eligibility gate

A task is Codex-eligible only when every condition is true:

1. one bounded outcome;
2. identifiable repository context;
3. observable acceptance criteria;
4. one coherent PR or explicit findings report;
5. no unresolved user preference or expert decision;
6. no request to decide evidence sufficiency, grammaticality, identity, status,
   promotion, parking, survey design, deployment, release, governance, or merge;
7. no request to invent linguistic evidence;
8. no direct write to `main`;
9. no merge or auto-merge authorization;
10. no silently parked construction;
11. no active semantic overlap;
12. compatibility with current policy and the live agent setting.

Failure routes the task to ChatGPT-first. It does not justify weakening the task or
mislabeling judgment as implementation.

When Codex is enabled and receives an intake, it independently repeats this screen
before creating a claim, branch, or edit. On a specification failure it reports
`needs-chatgpt`. On an ownership or availability mismatch it reports:

```text
routing result: unavailable
claim created: no
branch created: no
repository changes: none
```

## 5. Eligible implementation categories

These categories describe bounded implementation that may be Codex-eligible when the
workflow is enabled, or ChatGPT-executable when it is disabled:

- `runtime-bug` — repair a reproducible behavior defect against stated expected
  behavior;
- `tests-fixtures` — executable coverage for already defined behavior;
- `verification-audit` — deterministic audits, schemas, stale-state detection, and
  diagnostics;
- `data-schema` — mechanical canonical-data changes with an accepted desired state;
- `documentation-consistency` — reconcile text to identified canonical owners;
- `corpus-tooling` — mechanical extraction, provenance, deduplication, rendering,
  and workbench maintenance;
- `ci-repository-tooling` — Actions, packaging, dependencies, and infrastructure;
- `behavior-preserving-refactor` — bounded refactoring with explicit invariants;
- `accepted-specification` — implementation of a reviewed design or decision;
- `repository-pr-audit` — bounded findings, with repairs only when explicitly
  authorized.

Corpus-tooling eligibility never includes classifying candidates, deciding
construction membership, promoting evidence, or interpreting native judgments.

## 6. Human-required work

A human-targeted intake states:

- one concrete action;
- why an agent cannot perform it;
- the exact artifact or information required;
- the blocked work;
- what happens after completion;
- safe completion evidence that exposes no secrets or participant data.

Agents do not simulate completion.

### Local corpus execution

When a deterministic HKCanCor or other corpus profile can be prepared in the
repository but must run on the user's local device:

1. the parent repository intake remains ChatGPT-owned;
2. ChatGPT creates the claim, branch, profile, and tests;
3. one separate human-action issue contains exact local commands and expected
   generated artifacts;
4. the human runs generation and verification and pushes only the claimed outputs;
5. ChatGPT validates the exact branch head, summary, provenance, and CI;
6. the human action closes without transferring the parent issue, expert judgment,
   PR readiness decision, or merge authority.

Local untracked `validation/current/` byproducts are not included unless the claim
explicitly covers them.

## 7. Intake ownership and portfolio routing

The project recognizes two parent-issue routing modes. Agents must use one coherent
mode, keep its records truthful, and resolve mixed, missing, duplicate, malformed, or
unsupported routing before editing or presenting a pull request. This is an operating
contract rather than a universal merge-time metadata check.

### Ownership-aware task intake

A current operational intake normally uses one `canto-span-task-intake-v2` block and
distinguishes:

- `created_by`: who prepared the issue;
- `pickup_target`: who must act next;
- `active_pickup_owner`: the current live owner;
- `ownership_revision`: the monotonic ownership version;
- claim, branch, and PR bindings.

The latest valid block in the canonical issue body is the sole pickup authority.
Comments, labels, assignments, mentions, reviews, dispatch events, and cached copies
cannot change ownership. A takeover or reassignment replaces the block, increases the
revision exactly once, records the previous target, reason, later timestamp, pickup
permission, and explicit handoff state, and releases or narrows overlapping work.

An initial ChatGPT intake may use:

```task-intake
{
  "schema": "canto-span-task-intake-v2",
  "created_by": "chatgpt",
  "pickup_target": "chatgpt",
  "pickup_status": "chatgpt-pickup-required",
  "category": "documentation-consistency",
  "risk": "medium",
  "execution_mode": "implementation",
  "dependencies": [],
  "protected_state": [],
  "active_pickup_owner": "chatgpt",
  "ownership_revision": 1,
  "previous_pickup_target": null,
  "ownership_reason": "initial-routing",
  "ownership_updated_at": "2026-07-25T00:00:00Z",
  "pickup_allowed": true,
  "handoff_status": "no-handoff",
  "active_claim_issue": null,
  "active_branch": null,
  "active_pr": null,
  "work_claim_required": true,
  "user_merge_approval_required": true,
  "codex_self_screen_required": false
}
```

Use the checked-in schema rather than copying this example blindly. The selected
pickup target and current workflow setting must agree.

### Portfolio-routed parent issue

A planning or decision issue may instead contain exactly one
`canto-span-portfolio-routing-v2` block and no `task-intake` block. This mode avoids
copying operational ownership metadata into every issue produced by the portfolio
plan. It authorizes a pull request only when all of the following remain true:

1. the parent issue is open and the routing block validates;
2. the work claim is `canto-span-work-claim-v2`, active, unexpired, and names that
   parent issue in `intake_issue`;
3. the claim branch matches the pull-request head;
4. the pull-request body states the same `Active worker` and `Ownership revision` as
   the claim;
5. every portfolio `write_lock` is retained by the claim;
6. the claim acquires none of the portfolio `prohibited_parallel_writes`;
7. changed-file coverage remains inside the claim; and
8. the separate user merge gate remains in force.

The portfolio block is planning authority plus direct claim binding. It is not a
mutable ownership ledger and cannot perform takeover, reassignment, or handoff. Any
such ownership transition must use the ownership-aware `task-intake-v2` path.

Legacy intake and claim formats remain readable historical records. They must migrate
to current ownership-aware formats before takeover, reassignment, or active binding.

## 8. Labels and assignment

Labels are navigation aids, not authority. Recommended labels include the pickup
status, `pickup:<target>`, `task:<category>`, risk, and `findings-only` where relevant.

Actual GitHub assignees and machine-readable ownership must both comply with the
agent setting. Removing or changing only one layer is insufficient.

## 9. Lifecycle

1. Classify the work.
2. Apply workflow availability.
3. Create or update the intake and report truthful pickup status.
4. Re-fetch ownership before claim creation.
5. Create the smallest adequate work claim and exact branch.
6. Implement or produce findings within scope.
7. Open one linked PR and bind `active_pr` to the assigned GitHub PR number when the
   parent uses task-intake ownership; repeat the claim worker and revision in every PR.
8. Use draft state only while work or dependencies remain unresolved.
9. Validate exact head, live routing mode, ownership or claim binding, overlap,
   changed-file coverage, and required checks.
10. Mark the coherent PR ready, notify the user, and stop.
11. Merge only after explicit user approval for that PR and unchanged head.

Automatic dispatch is not implemented. Manual issue creation or the manual generator
creates an intake only; it does not establish that a target has started work.

## 10. Prohibited shortcuts

Do not:

- target or assign a disabled agent;
- treat Codex eligibility as availability;
- preserve stale pickup authority through an old claim, branch, PR, or assignment;
- delegate unresolved judgment by renaming it implementation;
- create a human issue for work an available agent can perform merely to avoid
  ownership rules;
- infer evidence, status, deployment, release, or merge authority from task routing;
- merge or enable auto-merge without the separate user-review gate.
