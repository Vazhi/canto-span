# Start here — mandatory project router

Read this file before planning, editing, reviewing, assigning, or merging Canto Span
repository work.

Its job is to route you to the current owner of each kind of information. Do not use
this file as a substitute for the specialized owner it links to.

## First: current versus historical

Use these rules before trusting any project statement:

- [`PROJECT-STATE.md`](PROJECT-STATE.md) is the sole present-tense project snapshot:
  current runtime/version, counts, active survey/corpus state, agent availability,
  and work order.
- Live GitHub intake/work-claim/PR records own current execution state and overlap.
- Current policy lives under `docs/current/` and the machine-readable owners linked
  below.
- `docs/research/`, review packets, archived reports, closed issues/PRs, old prompts,
  generated snapshots, and Git history are provenance or supporting evidence. They do
  not become current instructions merely because they are detailed.
- If two current documents appear to disagree, use the responsibility-specific owner
  below and reconcile the conflicting text. Do not preserve both as equal authority.

For a fuller index of current and compatibility documents, see
[`DOCUMENTATION-MAP.md`](DOCUMENTATION-MAP.md).

## Find the right information

| Question | Read this owner |
|---|---|
| What is true right now? What should happen next? | [`PROJECT-STATE.md`](PROJECT-STATE.md) |
| What are the binding linguistic/parser principles? | [`DOCTRINE.md`](DOCTRINE.md) |
| What counts as evidence, status, survey/native-panel evidence, promotion, or release readiness? | [`GOVERNANCE.md`](GOVERNANCE.md) |
| When is a construction or release actually done? | [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md) |
| What is the permanent construction identity? | [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md) plus canonical identity data |
| What expert identity/ontology decisions have been accepted? | [`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md) plus accepted adjudication data |
| How are construction notes organized? | [`CONSTRUCTION-NOTES.md`](CONSTRUCTION-NOTES.md) |
| How should a task be classified or routed to ChatGPT/Codex/human action? | [`CODEX-ISSUE-WORKFLOW.md`](CODEX-ISSUE-WORKFLOW.md) |
| Which optional agent workflows are currently enabled? | [`AGENT-WORKFLOW-SETTINGS.md`](AGENT-WORKFLOW-SETTINGS.md) and [`../../config/agent-workflow-settings.json`](../../config/agent-workflow-settings.json) |
| Who owns a concurrent semantic region? How are claims/branches/PRs coordinated? | [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md) and the live GitHub records |
| May this PR be merged now? | [`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md) |
| Which tests/verifiers should run? How is regression debt handled? | [`TESTING.md`](TESTING.md) and [`../../config/verification-profiles.json`](../../config/verification-profiles.json) |
| Where is parser/runtime source and how is `main.js` generated? | [`RUNTIME-MODULARIZATION.md`](RUNTIME-MODULARIZATION.md) |
| How should Git branches, PRs, recovery, and local exports work? | [`GIT-WORKFLOW.md`](GIT-WORKFLOW.md) |
| How do I mine/review HKCanCor or other corpus candidates? | [`../../tools/corpus-review/README.md`](../../tools/corpus-review/README.md), then the relevant checked-in profile/packet |
| How do I resume after a lost/local session? | [`../../HANDOFF.md`](../../HANDOFF.md) |
| Where is the broader documentation index? | [`DOCUMENTATION-MAP.md`](DOCUMENTATION-MAP.md) |

## Task-specific reading routes

Read only the owners needed for the task after this file and
[`PROJECT-STATE.md`](PROJECT-STATE.md).

### Parser or runtime behavior

Read:

1. [`DOCTRINE.md`](DOCTRINE.md)
2. [`RUNTIME-MODULARIZATION.md`](RUNTIME-MODULARIZATION.md)
3. [`TESTING.md`](TESTING.md)
4. the relevant construction note, source module, and executable tests.

Do not infer linguistic evidence from a passing parser test.

### Linguistic research, construction identity, or status

Read:

1. [`DOCTRINE.md`](DOCTRINE.md)
2. [`GOVERNANCE.md`](GOVERNANCE.md)
3. [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md) and
   [`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md) when identity is
   involved
4. [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md) when promotion/completion is
   involved
5. the current construction note and exact source records.

### Corpus or HKCanCor work

Read:

1. [`../../tools/corpus-review/README.md`](../../tools/corpus-review/README.md)
2. the exact construction/corpus profile or packet already checked into the repository
3. [`GOVERNANCE.md`](GOVERNANCE.md) when corpus results will be used as evidence.

Do not invent a parallel corpus directory, query format, ledger, or local command when
an existing repository owner/profile already covers the job.

### Survey or native-speaker judgment work

Read:

1. [`GOVERNANCE.md`](GOVERNANCE.md)
2. [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md)
3. the active survey/panel records named by [`PROJECT-STATE.md`](PROJECT-STATE.md).

A pilot diagnoses an instrument; it does not promote a construction.

### Repository coordination or documentation changes

Read:

1. [`CODEX-ISSUE-WORKFLOW.md`](CODEX-ISSUE-WORKFLOW.md)
2. [`AGENT-WORKFLOW-SETTINGS.md`](AGENT-WORKFLOW-SETTINGS.md)
3. [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md)
4. [`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md)
5. [`GIT-WORKFLOW.md`](GIT-WORKFLOW.md) where Git/recovery behavior is involved.

## Before the first repository edit

1. Confirm the repository is `Vazhi/canto-span`.
2. Read [`PROJECT-STATE.md`](PROJECT-STATE.md).
3. Inspect current `main`, open pull requests, current intake issues, and open work
   claims for overlap and dependencies.
4. Classify the task using [`CODEX-ISSUE-WORKFLOW.md`](CODEX-ISSUE-WORKFLOW.md) and
   apply the current agent-availability setting.
5. Re-fetch the canonical intake and verify owner, permission,
   `ownership_revision`, claim, branch, and PR bindings.
6. Create or update the smallest adequate semantic work claim; use an exclusive claim
   where the coordination contract requires one.
7. Create the exact `agent/<description>` branch named in the claim.
8. Declare canonical inputs, generated outputs, protected state, dependencies,
   reserved decisions, and applicable checks.
9. Implement one coherent result, update/bind the PR truthfully, and apply
   [`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md) at merge time.

A live ownership/permission mismatch means:

```text
routing result: unavailable
repository changes: none
```

## Repository-path and command rule

Do not guess repository directories, canonical output locations, or a user's local
checkout path.

Before giving repository-local commands or creating a new path:

1. search the current repository and this documentation map for an existing owner;
2. inspect the relevant checked-in tool/profile/README;
3. reuse the canonical path and format when one exists;
4. if a new path is genuinely required, justify it against the existing ownership
   model before creating it.

When the user's local filesystem path has not been explicitly confirmed, give commands
relative to the repository root or first resolve it with Git (for example,
`git rev-parse --show-toplevel`) rather than inventing `~/...` paths.

## Cross-cutting invariants

The detailed rules live in the owners above. These are the project-wide boundaries
that must remain visible during every task:

- Keep permanent identity, current ontology, linguistic status, runtime behavior,
  workflow availability, discovery readiness, learner presentation, and merge
  authority as separate state dimensions.
- External evidence begins language claims. Parser output, tests, generated probes,
  corpus counts, discovery ranks, and usefulness have zero independent linguistic
  evidence weight.
- Corpus extraction is mechanical; used candidates require explicit expert
  classification.
- All eligible native respondents use one role-neutral evidence model; no named
  respondent receives special evidentiary weight.
- Do not invent hidden linguistic structure to make a parse complete.
- Edit canonical runtime inputs under `src/**` or `src/runtime-resources/**`;
  `main.js` is generated output and is never hand-edited.
- `PROJECT-STATE.md` is the only volatile project snapshot. Do not create competing
  current-state summaries.
- Passing checks do not themselves promote a construction or grant merge authority.

## Verification quick reference

Run only the profiles relevant to the changed state. Exact applicability and
regression-debt handling are owned by [`TESTING.md`](TESTING.md).

```bash
npm test                # runtime/executable behavior
npm run verify          # canonical core repository state
npm run verify:research # research provenance
npm run verify:runtime  # runtime source/build/tests/load
npm run verify:release  # release/promotion work only
```

`npm run verify:all` is an explicit diagnostic sweep, not a routine acceptance
requirement.

## Conflict and historical-material rule

There is no single global document ranking that answers every question. Authority is
responsibility-specific.

When current materials conflict:

1. identify the state dimension or responsibility at issue;
2. use the owner in the routing table above;
3. prefer the narrower canonical record for that responsibility over summaries;
4. reconcile or remove contradictory current prose;
5. retain historical material only as provenance.

Closed issues, merged/abandoned branches, old prompts, old handoffs, dated research
reports, retired ledgers, generated baselines, and Git commits may explain history.
They do not override current ownership, policy, status, runtime description, survey
state, work order, pickup authority, or merge authority.
