# Canto Span agent instructions

This repository has one mandatory operating contract:

[`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md)

The detailed concurrency protocol is:

[`docs/current/MULTI-AGENT-COORDINATION.md`](docs/current/MULTI-AGENT-COORDINATION.md)

The mandatory ChatGPT/Codex routing contract is:

[`docs/current/CODEX-ISSUE-WORKFLOW.md`](docs/current/CODEX-ISSUE-WORKFLOW.md)

The mandatory per-pull-request merge gate is:

[`docs/current/USER-MERGE-REVIEW.md`](docs/current/USER-MERGE-REVIEW.md)

Before planning, editing, generating, reviewing, or merging repository work:

1. read all four files in full;
2. classify the work as `ChatGPT-first`, `Codex-ready`, `human-required`, or
   `hybrid` under the routing contract before creating a claim, branch, or edit;
3. read `docs/current/PROJECT-STATE.md`;
4. inspect current `main`, open pull requests, and open work-claim issues;
5. inspect open intake issues for duplicate, dependent, overlapping, reassigned, or
   taken-over work;
6. create or update one work-claim issue before editing;
7. claim the smallest adequate semantic targets and regions rather than locking a
   whole shared file unnecessarily;
8. create the exact `agent/<description>` branch named in the claim;
9. follow the task-routing and verification sections in the contract;
10. use the permanent construction code and canonical name, with any legacy runtime
    label recorded separately;
11. keep branch changes inside the claim and update the issue before expanding scope;
12. publish one coherent passing state in a pull request that links and closes the
    work claim;
13. when the pull request is ready, inform the user and stop before merge;
14. merge only after the user explicitly approves that specific pull request and the
    approved head commit remains unchanged.

The canonical intake issue body owns current pickup authority. After every resumed
session and immediately before claim creation, branch creation, first repository
edit, commit, push, pull-request readiness, or merge, re-fetch that live issue and
its linked claim. Proceed only when the active owner, pickup permission, ownership
revision, claim, and branch all match. Cached prompts, comments, labels, assignment,
mentions, and an earlier dispatch are not authority. Any mismatch requires
`routing result: unavailable` and a stop without repository writes.

## ChatGPT delegation duty

ChatGPT must consult `CODEX-ISSUE-WORKFLOW.md` for every Canto Span request involving
repository work. When a bounded task is Codex-ready, ChatGPT creates the Codex intake
issue without waiting for the user to request delegation again, unless material
ambiguity prevents safe scoping. ChatGPT must inform the user of every issue created,
its bounded outcome, and its truthful dispatch status.

For hybrid work, ChatGPT retains the research, judgment, policy, design, prioritization,
or user-facing portion and delegates each bounded implementation portion when it
becomes Codex-ready. ChatGPT remains responsible for independent review of Codex pull
requests before presenting them for user merge approval.

## Codex self-screening duty

Codex must read `CODEX-ISSUE-WORKFLOW.md` and independently verify that an intake
issue is Codex-ready before creating a semantic work claim, branch, or edit. Labels,
assignment, mentions, or dispatch are not sufficient authority.

Codex must also verify from the current issue body that `active_pickup_owner` is
`codex`, `pickup_allowed` is true, and the live `ownership_revision` matches the
claim. A takeover or reassignment supersedes every cached Codex task state.

If a task is ChatGPT-first, lacks an accepted specification for its Codex portion, or
requires an unresolved expert or user decision, Codex must report `needs-chatgpt` and
stop with no claim, no branch, and no repository changes. Codex must not reclassify a
reserved decision as implementation merely to continue.

There is no read-only research role. A properly scoped agent may research, record
evidence, adjudicate, implement, test, document, and integrate in one coherent task
when its claim covers those state dimensions and every substantive gate is met. This
does not override the ChatGPT/Codex routing duties above.

Shared claims may touch the same physical file only in disjoint semantic regions.
Repository-wide policy, schemas, workflows, and configured exclusive paths require
an exclusive claim. Workers must not finalize integration-owned aggregate files.
Use a branch-local declarative changeset under `changes/pending/` when direct edits
to a high-contention file would be unsafe; pending changesets must be applied or
removed before a pull request becomes ready to merge.

Open a draft pull request only when work is incomplete, contains a pending
changeset, has an unresolved dependency, or still requires integration. A complete
coherent change may open ready for review. Passing checks and integrator authority
do not authorize merge. The agent must notify the user that the pull request is
ready, provide its scope and validation, and wait for explicit approval before
merging or enabling auto-merge. Any new commit after approval requires fresh review
and approval.

Automation is governed by least privilege, not a blanket read-only or no-writer
rule. Validation-only workflows should remain read-only. Write-capable automation
must be claim-scoped, preconditioned, auditable, branch-limited, and prohibited from
directly writing to `main` or autonomously making linguistic, survey-deployment,
status-promotion, release, routing-override, or merge-approval decisions.

A task prompt may narrow authorized scope. It does not override current policy,
canonical state owners, evidence standards, identity rules, survey lifecycle,
generated-output discipline, coordination claims, routing duties, or Git workflow
unless the task explicitly updates those standards in the same reviewed change.

Do not use historical prompts, release notes, branch descriptions, runtime aliases,
generated readiness scores, parser tests, survey-local IDs, an intake label, or an
expired work claim as substitute authority. Do not create parallel ledgers, naming
systems, verifiers, current-state documents, routing systems, or unscoped automation.

For task routing, `docs/current/CODEX-ISSUE-WORKFLOW.md` controls. For per-pull-request
merge authorization, `docs/current/USER-MERGE-REVIEW.md` controls over any broader or
older merge language elsewhere. For other conflicts, follow
`docs/current/00-START-HERE.md` and document the conflict in the pull request.
