# Canto Span agent instructions

Every human or automated agent must follow the mandatory project contract:

[`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md)

Before planning or changing repository work, read these current owners:

1. [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md) — volatile present-tense state and work order;
2. [`docs/current/CODEX-ISSUE-WORKFLOW.md`](docs/current/CODEX-ISSUE-WORKFLOW.md) — task classification and pickup routing;
3. [`docs/current/AGENT-WORKFLOW-SETTINGS.md`](docs/current/AGENT-WORKFLOW-SETTINGS.md) and [`config/agent-workflow-settings.json`](config/agent-workflow-settings.json) — available optional agent workflows;
4. [`docs/current/MULTI-AGENT-COORDINATION.md`](docs/current/MULTI-AGENT-COORDINATION.md) — semantic claims, branches, overlap, and integration roles;
5. [`docs/current/USER-MERGE-REVIEW.md`](docs/current/USER-MERGE-REVIEW.md) — the mandatory stop before merge.

## Mandatory sequence

Before the first repository edit:

1. confirm the repository is `Vazhi/canto-span`;
2. inspect current `main`, open pull requests, open intake issues, and open work-claim issue records;
3. classify the task as ChatGPT-first, Codex-eligible, human-required, or hybrid;
4. apply the current workflow-availability setting before choosing a pickup target;
5. re-fetch the canonical intake issue and verify active owner, permission, `ownership_revision`, claim, branch, and PR bindings;
6. create or update one work claim covering the smallest adequate semantic scope;
7. create the exact `agent/<description>` branch named in the claim;
8. declare canonical inputs, generated outputs, protected state, dependencies, reserved decisions, and required checks;
9. implement one coherent passing state within the claim;
10. open or update one pull request linked to the claim;
11. bind the assigned pull-request number in the live intake metadata;
12. when ready, inform the user and stop before merge after reporting the PR number, exact head, scope, validation, risks, and limitations;
13. merge only after the user explicitly approves that specific PR and unchanged head. Any new commit after approval requires fresh review and approval.

Cached prompts, comments, labels, assignments, mentions, previous dispatch, old claims,
and branch existence are not pickup authority. A live mismatch or disabled workflow
requires:

```text
routing result: unavailable
repository changes: none
```

## Agent availability and assignment

Task eligibility and workflow availability are separate. A task may be mechanically
Codex-eligible while Codex workflows are disabled.

In that state it must remain with ChatGPT or be split into a concrete human action; it may not be targeted, assigned, reassigned, claimed, or resumed by Codex.

Issue assignment has two layers: the machine-readable `pickup_target` /
`active_pickup_owner` fields and the actual GitHub assignee list. Both must comply
with `config/agent-workflow-settings.json`.

Re-enabling an agent workflow permits future routing only. It does not automatically
transfer existing issues, claims, branches, or pull requests.

## State and evidence boundaries

There is no read-only research role. Research, evidence recording, adjudication,
implementation, tests, documentation, and integration may be combined when one
coherent claim declares every affected state dimension and substantive gate.

Use `construction_code + canonical_name` for durable construction references and
record legacy runtime labels separately. Do not use filenames, runtime aliases,
survey-local IDs, work IDs, learner labels, or historical titles as permanent
identity.

Parser output, fixtures, generated probes, regression success, rendering, corpus
counts, discovery ranks, and held-out tests are implementation or workflow evidence,
not independent linguistic evidence. Corpus extraction is mechanical; expert
classification is separate. All eligible native respondents belong to one
role-neutral panel with the same instrument, inclusion criteria, quality rules, and
evidentiary weight.

Do not silently change or infer construction identity, linguistic status, runtime
behavior, survey deployment, evidence sufficiency, release state, or merge
authorization from another state dimension.

## Claims, automation, and generated files

Shared claims may touch one physical file only in disjoint semantic regions.
Repository-wide policy, schemas, workflows, verification orchestration, and
configured exclusive paths require an exclusive claim. Integration-owned aggregate
and current-state files require an integrator.

Automation follows least privilege. It must be claim-scoped, preconditioned,
auditable, branch-limited, and unable to write directly to `main`, broaden its own
scope, adjudicate evidence, promote status, deploy surveys, publish releases, merge,
enable auto-merge, or infer user approval.

Edit canonical inputs first and regenerate deterministic outputs in the same branch. For runtime work, edit the smallest owner under `src/**` or `src/runtime-resources/**`; never hand-edit `main.js`. Regenerate it only with `npm run build:runtime`, and do not touch it for unrelated research, corpus, survey, governance, or documentation work.
`validation/current/` contains optional verifier reports, not patch inputs. Routine
verification must not modify tracked reports. A ready pull request may not contain a
pending changeset or generated validation byproduct.

## Verification anti-bloat rule

Validation is task-scoped. Do not run `verify:all` as a routine requirement and do
not require unrelated profiles merely because they exist.

A new permanent test, audit, verifier, workflow gate, snapshot, or profile entry is
allowed only when all five conditions are met:

1. it protects a recurring repository invariant;
2. failure would have meaningful project or user impact;
3. no existing check already covers the same failure;
4. the check is deterministic and reasonably maintainable;
5. its purpose can be stated in one clear sentence.

The permanent profile entry must record that sentence and when the check should run.
Migration checks, one-time repair assertions, exact historical counts, exact packet
contents, individual construction surveys, temporary probes, and PR-specific audits
must remain local to the implementing work and be removed before the PR is ready.
Do not add a permanent check merely to prove that another check was removed or to
preserve exact prose. Verifier unit tests run when their verifier changes; they are
not automatically part of every repository change.

## Conflict rule

Use the narrowest canonical owner listed in `00-START-HERE.md`. Agent availability
is owned by the checked-in workflow setting; routing by the routing contract;
concurrent scope by the live claim; merge permission by the per-PR review gate; and
volatile project facts by `PROJECT-STATE.md`. Historical material never overrides a
newer current owner.
