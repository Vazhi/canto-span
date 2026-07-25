# Canto Span agent instructions

This repository has one mandatory operating contract:

[`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md)

The detailed concurrency protocol is:

[`docs/current/MULTI-AGENT-COORDINATION.md`](docs/current/MULTI-AGENT-COORDINATION.md)

Before planning, editing, generating, reviewing, or opening a pull request:

1. read both files in full;
2. read `docs/current/PROJECT-STATE.md`;
3. inspect current `main`, open pull requests, and open work-claim issues;
4. create or update one work-claim issue before editing;
5. claim the smallest adequate semantic targets and regions rather than locking a
   whole shared file unnecessarily;
6. create the exact `agent/<description>` branch named in the claim;
7. follow the task-routing and verification sections in the contract;
8. use the permanent construction code and canonical name, with any legacy runtime
   label recorded separately;
9. keep branch changes inside the claim and update the issue before expanding scope;
10. publish one coherent passing state in a draft pull request that links and closes
    the work claim.

Shared claims may touch the same physical file only in disjoint semantic regions.
Repository-wide policy, schemas, workflows, and configured exclusive paths require
an exclusive claim. Workers must not finalize integration-owned aggregate files.
Use a branch-local declarative changeset under `changes/pending/` when direct edits
to a high-contention file would be unsafe; pending changesets must be applied or
removed before a pull request becomes ready to merge.

A task prompt may narrow authorized scope. It does not override current policy,
canonical state owners, evidence standards, identity rules, survey lifecycle,
generated-output discipline, coordination claims, or Git workflow unless the task
explicitly updates those standards in the same reviewed change.

Do not use historical prompts, release notes, branch descriptions, runtime aliases,
generated readiness scores, parser tests, survey-local IDs, or an expired work
claim as substitute authority. Do not create parallel ledgers, naming systems,
verifiers, current-state documents, or automatic writer workflows.

When instructions conflict, follow `docs/current/00-START-HERE.md` and document the
conflict in the draft pull request.
