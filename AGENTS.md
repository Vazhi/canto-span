# Canto Span agent instructions

This repository has one mandatory operating contract:

[`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md)

The detailed concurrency protocol is:

[`docs/current/MULTI-AGENT-COORDINATION.md`](docs/current/MULTI-AGENT-COORDINATION.md)

Before planning, editing, generating, reviewing, or merging repository work:

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
10. publish one coherent passing state in a pull request that links and closes the
    work claim.

There is no read-only research role. A properly scoped agent may research, record
evidence, adjudicate, implement, test, document, and integrate in one coherent task
when its claim covers those state dimensions and every substantive gate is met.

Shared claims may touch the same physical file only in disjoint semantic regions.
Repository-wide policy, schemas, workflows, and configured exclusive paths require
an exclusive claim. Workers must not finalize integration-owned aggregate files.
Use a branch-local declarative changeset under `changes/pending/` when direct edits
to a high-contention file would be unsafe; pending changesets must be applied or
removed before a pull request becomes ready to merge.

Open a draft pull request only when work is incomplete, contains a pending
changeset, has an unresolved dependency, or still requires integration. A complete
coherent change may open ready for review. The authorized integrator may rebuild,
ready, and merge passing pull requests in dependency order without a separate
per-PR user request. Status promotion, survey deployment, and release publication
still require their own explicit scope and gates.

Automation is governed by least privilege, not a blanket read-only or no-writer
rule. Validation-only workflows should remain read-only. Write-capable automation
must be claim-scoped, preconditioned, auditable, branch-limited, and prohibited from
directly writing to `main` or autonomously making linguistic, survey-deployment,
status-promotion, or release decisions.

A task prompt may narrow authorized scope. It does not override current policy,
canonical state owners, evidence standards, identity rules, survey lifecycle,
generated-output discipline, coordination claims, or Git workflow unless the task
explicitly updates those standards in the same reviewed change.

Do not use historical prompts, release notes, branch descriptions, runtime aliases,
generated readiness scores, parser tests, survey-local IDs, or an expired work
claim as substitute authority. Do not create parallel ledgers, naming systems,
verifiers, current-state documents, or unscoped automation.

When instructions conflict, follow `docs/current/00-START-HERE.md` and document the
conflict in the pull request.