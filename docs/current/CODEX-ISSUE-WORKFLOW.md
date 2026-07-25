---
title: Canto Span — Task Creator and Pickup Routing
status: current
implementation_status: routing-active; manual-issue-generator-implemented; automatic-dispatch-not-implemented
tags: [canto-span/infrastructure, canto-span/agents, canto-span/github]
related: "[[00-START-HERE]] [[MULTI-AGENT-COORDINATION]] [[USER-MERGE-REVIEW]]"
---

# Task creator and pickup routing

This document is the canonical owner of task routing among ChatGPT, Codex, and human
pickup for Canto Span repository work.

The routing duties in this document are active now. The manual GitHub issue-generator
is implemented for Codex, ChatGPT, and human pickup, while automatic dispatch is not.
ChatGPT, Codex, or a human may create intake issues directly through available
GitHub tools, and a user may invoke the manual workflow. Initial pickup status is
`manual-pickup-required`, `chatgpt-pickup-required`, or
`human-pickup-required`, according to the one primary pickup target. Creating an
issue alone does not prove that the target has begun work.

This document supplements, but does not replace:

- [`AGENTS.md`](../../AGENTS.md);
- [`00-START-HERE.md`](00-START-HERE.md);
- [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md);
- [`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md).

Every delegated task remains subject to those contracts.

## 1. Mandatory routing rule

Before beginning substantive Canto Span work, ChatGPT and Codex must classify the
requested work as exactly one of:

1. **ChatGPT-first** — judgment, research synthesis, policy, design, prioritization,
   user interaction, or review must occur before implementation can be specified.
2. **Codex-ready** — one bounded, repository-centered, testable outcome can begin
   without an unresolved expert or user decision.
3. **Human-required** — one concrete action requires human authority, access, a
   local device, participant contact, credentials, or a subjective user preference.
4. **Hybrid** — ChatGPT performs the decision, research, design, or specification
   portion and delegates one or more bounded implementation portions to Codex.

The user does not need to ask ChatGPT to perform this routing or remind it to create
Codex issues.

## 2. ChatGPT delegation duty

For every Canto Span request involving repository work, ChatGPT must consult this
document before deciding how the work will be executed.

### 2.1 Direct Codex-ready work

When a task satisfies the Codex eligibility gate in section 6, ChatGPT must:

1. inspect current repository context sufficiently to define a bounded outcome;
2. check open pull requests, intake issues, and semantic work claims for obvious
   overlap;
3. create a Codex intake issue without waiting for a separate user reminder or
   confirmation, unless material ambiguity prevents safe scoping;
4. include the minimal bootstrap prompt, outcome, acceptance criteria, relevant
   context, protected state, and truthful dispatch status;
5. inform the user immediately after issue creation.

The notification must identify:

- each issue number or link;
- task category;
- bounded outcome;
- important protected state;
- whether Codex was actually dispatched, queued, or still requires manual pickup.

When several independent Codex issues are created in one turn, ChatGPT should report
them together in one concise list rather than sending repetitive notices.

### 2.2 ChatGPT-first work

ChatGPT must retain work that requires:

- broad external research or source evaluation;
- linguistic analysis or construction-boundary judgment;
- identity, ontology, status, promotion, parking, deployment, release, or governance
  decisions;
- survey design or interpretation of participant evidence;
- user-facing writing or translation;
- work prioritization;
- clarification of an ambiguous objective;
- independent review of a Codex pull request.

After resolving the necessary decisions, ChatGPT must reassess the remaining work.
Any newly bounded Codex-ready implementation should then be delegated without the
user needing to request delegation again.

### 2.3 Hybrid work

For hybrid work, ChatGPT must:

1. perform or obtain the required research, judgment, design, or accepted
   specification;
2. preserve any reserved decisions explicitly;
3. split the implementation into the smallest coherent Codex issues;
4. create those issues when they become executable;
5. continue handling the ChatGPT-owned portion;
6. report every created issue to the user.

ChatGPT must not delegate an unresolved expert decision merely by describing it as
implementation.

### 2.4 Human-required work

When the next action requires a person, the creator makes a human-targeted intake
with the concrete action, agent limitation, required artifact, blocked work, next
step, and safe completion evidence. Agent work waits without simulating completion.

### 2.5 Tool or dispatch limitations

If ChatGPT cannot create the issue because GitHub access is unavailable, it must say
so plainly and provide the complete ready-to-create issue body. It must not silently
keep Codex-ready work in its own queue or imply that delegation occurred.

If an issue is created but no tested dispatch adapter is available, ChatGPT must
report `manual-pickup-required` rather than claiming that Codex is working.

## 3. Codex self-screening duty

Codex must read this document before creating a semantic work claim, creating a
branch, or editing repository files.

Codex must independently verify that the intake issue is Codex-ready. A `codex-ready`
label, assignment, mention, or dispatch event is not sufficient authority by itself.
After every resumed session and immediately before claim creation, branch creation,
first edit, commit, push, PR readiness, or merge, Codex re-fetches the canonical
intake issue body and linked claim.

### 3.1 Codex may proceed only when

- the outcome is bounded;
- acceptance criteria are observable;
- relevant repository context is available or discoverable;
- no unresolved user preference is needed;
- no unmade ChatGPT-first decision is hidden inside the task;
- the task can produce one coherent pull request or an explicit findings report;
- the issue does not authorize direct writes to `main`, merge, or auto-merge;
- current repository policy does not contradict the issue;
- the live `active_pickup_owner` is `codex`;
- `pickup_allowed` is true;
- the live `ownership_revision`, active claim, and branch match Codex's working
  state.

After passing this self-screen, Codex creates the separate semantic work claim and
exact branch required by `AGENTS.md` and the coordination contract.

### 3.2 Codex must refuse and return work when

- the task belongs to a ChatGPT-first category;
- a hybrid task lacks the required accepted specification or decision;
- the issue asks Codex to decide evidence sufficiency, grammaticality, identity,
  status, promotion, survey design, deployment, release, parking, or governance;
- the issue is too broad to have one coherent outcome;
- required acceptance criteria are missing;
- active work overlaps the same semantic region;
- the target is parked without an accepted unpark decision;
- the prompt conflicts with current policy;
- the live owner is not Codex, pickup is forbidden, or the ownership revision,
  claim, branch, or PR no longer matches.

For a routing or specification failure, Codex stops before creating a work claim,
branch, or edit and reports:

- routing result: `needs-chatgpt`;
- the exact unresolved decision or scope problem;
- any mechanical subtask that could become Codex-ready later;
- no claim or branch created;
- no repository files changed.

Codex must not weaken or reinterpret the routing rules merely to continue working.

An ownership mismatch is not `needs-chatgpt`; it is:

```text
routing result: unavailable
reason: live pickup ownership changed or no longer matches the working state
claim created: no
branch created: no
repository changes: none
```

## 4. Codex-appropriate task categories

Only the following categories are eligible for direct Codex intake.

### 4.1 `runtime-bug`

A reproducible parser, rendering, serialization, or span-boundary defect with stated
expected behavior.

Examples:

- prevent a known false positive;
- restore an accepted parse;
- correct a span boundary;
- repair a rendering regression.

This category cannot be used to invent a new grammar analysis.

### 4.2 `tests-fixtures`

Executable coverage for already defined behavior or boundaries.

Examples:

- add a negative fixture;
- convert a confirmed bug into a regression test;
- add tooling tests for an existing verifier.

Tests remain implementation evidence, not linguistic evidence.

### 4.3 `verification-audit`

Deterministic checks, repository audits, stale-state detection, schema validation,
and diagnostic improvements.

### 4.4 `data-schema`

Mechanical changes to canonical data or schemas when the desired state is already
specified by an authoritative source.

### 4.5 `documentation-consistency`

Reconcile current documentation with an identified canonical source. Codex must not
invent policy to resolve a contradiction.

### 4.6 `corpus-tooling`

Mechanical extraction, inventory, deduplication, provenance checks, rendering, and
workbench maintenance. Extracted candidates are not automatically genuine evidence.

### 4.7 `ci-repository-tooling`

GitHub Actions, packaging, verification scripts, dependency maintenance, and other
bounded repository infrastructure.

### 4.8 `behavior-preserving-refactor`

A bounded refactor with explicit invariants and adequate regression coverage.

### 4.9 `accepted-specification`

Implementation of a reviewed design, schema, matcher, command, workflow, or recorded
expert decision. Reserved choices must be named and preserved.

### 4.10 `repository-pr-audit`

Bounded repository or pull-request inspection. The issue must say whether the output
is findings-only or includes authorized repairs.

## 5. Tasks that remain with ChatGPT first

The following are not direct Codex tasks until ChatGPT or the user has produced a
bounded accepted specification:

1. work prioritization and milestone selection;
2. broad external linguistic research and source evaluation;
3. difficult linguistic or construction-identity adjudication;
4. status promotion, downgrade, parking, or unpark decisions;
5. native-panel and survey design or response interpretation;
6. governance and project-policy decisions;
7. user-facing writing, translation, recruitment, or learner explanations;
8. ambiguous requests such as “improve the parser” or “clean up the repository”;
9. final independent review and merge recommendation.

## 6. Codex eligibility gate

An intake issue may be created as `codex-ready` only when every condition is met:

1. one bounded outcome;
2. identifiable repository context;
3. one or more observable acceptance criteria;
4. one coherent pull request or explicit findings report;
5. no unresolved user preference;
6. no hidden expert linguistic, survey, governance, promotion, deployment, release,
   parking, or merge decision;
7. no request to invent linguistic evidence;
8. no direct write to `main`;
9. no merge or auto-merge authorization;
10. no silently parked construction;
11. no known overlap with active work;
12. compatibility with `AGENTS.md` and `00-START-HERE.md`.

Failure routes the task to ChatGPT. It does not create a misleading Codex-ready
issue.

## 7. Unified intake issue format

Every new intake distinguishes who prepared it from who must act next:

- `created_by`: exactly `chatgpt`, `codex`, or `human`;
- `pickup_target`: exactly one of `codex`, `chatgpt`, or `human`.

Both ChatGPT and Codex may create any of the three target types. A creator is not the
active pickup owner unless it is also the selected target. Reassignment requires an
explicit monotonic ownership revision containing the previous target, new target,
active owner, reason, timestamp, pickup permission, and handoff state.

The latest valid `task-intake` block in the canonical issue body is the sole pickup
authority. Comments, labels, assignments, mentions, reviews, dispatch events, and
cached copies cannot change ownership. The ownership block, work claim, branch, and
PR must agree.

### 7.1 Codex pickup

A Codex-targeted issue includes the mandatory contract bootstrap and an explicit
`BEGIN NOW` / `WAIT FOR CHATGPT` self-screen. Codex may begin only when the
specification is accepted, no protected decision is unresolved, and live overlap
checks pass. Before repository edits it creates the semantic work claim and exact
branch. It opens one coherent pull request, notifies the user, and stops without
merging.

Initial status is `manual-pickup-required`. A label or issue does not prove dispatch.

### 7.2 ChatGPT pickup

A ChatGPT-targeted issue must state:

- the exact question, decision, research synthesis, or review outcome;
- relevant evidence, repository context, and conflicting authorities;
- the bounded mechanical remainder that may later become Codex-ready;
- whether human input is also required;
- observable completion criteria.

Initial status is `chatgpt-pickup-required`. Until the decision is resolved, the
issue must not direct Codex to create a claim, branch, or speculative implementation.

### 7.3 Human pickup

A human-targeted issue must state:

- one concrete human action;
- why an agent cannot perform it;
- the exact information or artifact required;
- the blocked work;
- what happens after completion;
- safe completion evidence that exposes no secrets or participant data.

Initial status is `human-pickup-required`. Agents must not simulate completion of the
human action.

### 7.4 Machine-readable metadata

```task-intake
{
  "schema": "canto-span-task-intake-v2",
  "created_by": "chatgpt",
  "pickup_target": "codex",
  "pickup_status": "manual-pickup-required",
  "category": "verification-audit",
  "risk": "low",
  "execution_mode": "implementation",
  "dependencies": [],
  "protected_state": [],
  "active_pickup_owner": "codex",
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
  "codex_self_screen_required": true
}
```

The checked-in
[`task-intake.schema.json`](../../schemas/task-intake.schema.json) is the unified
ownership-aware format. Existing `canto-span-task-intake-v1` and
`canto-span-codex-task-v1` blocks remain valid legacy records under
[`task-intake-v1.schema.json`](../../schemas/task-intake-v1.schema.json) and
[`codex-task.schema.json`](../../schemas/codex-task.schema.json); tools validate them
without silently rewriting them. A legacy record must migrate before takeover,
reassignment, or active ownership binding. Intake metadata is not a semantic work
claim.
Codex pickup always requires a claim and user merge approval. For ChatGPT or human
pickup, the two booleans truthfully record whether that scoped issue also includes
claimed repository work or a pull request; they do not grant either action.

### 7.5 Labels

Recommended labels:

- the target status: `codex-ready`, `chatgpt-pickup-required`, or
  `human-pickup-required`;
- `pickup:codex`, `pickup:chatgpt`, or `pickup:human`;
- `task:<category>`;
- `risk:low`, `risk:medium`, or `risk:high`;
- `findings-only` where applicable;
- `needs-chatgpt` when Codex refuses a misrouted issue.

## 8. Lifecycle

### 8.1 Routing and intake

1. The creator consults this document and classifies the work.
2. ChatGPT handles ChatGPT-first decisions and decomposes hybrid work.
3. The creator records `created_by` separately from one `pickup_target`.
4. The generator validates the target-specific fields, owner, status, and labels.
5. The creator informs the user of every created issue and truthful pickup status.

A user may also manually start the implemented issue-generator workflow. Manual
initiation is an additional entry point, not a prerequisite for ChatGPT delegation.

### 8.2 Pickup and self-screen

1. A tested adapter dispatches the issue, or Codex is started manually.
2. Codex reads the mandatory contracts and this routing document.
3. Codex re-fetches the issue body and verifies live owner, permission, and revision.
4. Codex self-screens before claim, branch, or edit.
5. Misrouted work returns to ChatGPT with `needs-chatgpt`; unavailable work stops
   with `routing result: unavailable`.
6. Eligible work updates the ownership record to bind a separate v2 work claim,
   active worker, revision, and branch before editing.

### 8.3 Agent-neutral intervention, takeover, and reassignment

Codex, ChatGPT, or a human may become the next pickup target when the user directs
the change, blocking active work requires it, an explicit handoff occurs, or a
resolved human action returns work. Before intervening, inspect the live intake
issue, pull requests, active claims, and branches.

For `resolve-blocker`, keep the prior active owner, increment the revision, record
the precise decision and bounded remainder in the issue body, and rebind the claim
to that revision before work resumes.

For takeover or reassignment, replace the single ownership block in the issue body,
increment `ownership_revision` by exactly one, name the previous target, new target,
new active owner, authorized reason, later timestamp, pickup permission, and
handoff status. Existing overlapping work must first be absent, released, narrowed,
or confined to a disjoint decision-only region. Then update or create the v2 claim
with the same owner and revision. A comment or review alone does not imply takeover.
Every former owner treats the issue as unavailable until a later revision explicitly
reassigns it.

The live intake block has precedence over a stale claim. A claim never preserves an
earlier agent's authority after the intake revision changes.

### 8.4 Execution and review

1. Codex keeps work inside the claim, re-fetches ownership at every required
   mutation boundary, and updates the claim before expanding scope.
2. Codex follows all applicable evidence, identity, runtime, corpus, survey,
   generated-output, and verification gates.
3. Codex opens one coherent draft PR linking the intake issue and work claim.
4. After GitHub assigns the PR number, Codex updates the live intake `active_pr`
   field and the PR body's active worker and ownership revision before the
   coordination check may pass.
5. Codex verifies the exact head, informs the user, and stops without merging.
6. ChatGPT independently reviews the result.
7. The user retains the explicit merge decision for that PR and unchanged head.

## 9. Hybrid responsibility examples

| Task | ChatGPT responsibility | Codex responsibility |
|---|---|---|
| New parser construction | establish evidence, identity, and boundaries | implement accepted matcher, tests, and records |
| Corpus investigation | define search and adjudication criteria | extract, deduplicate, validate, and render |
| Survey creation | design the blinded instrument and wording | generate technical XML, validators, and files |
| Evidence repair | interpret and grade sources | apply recorded grades and run verification |
| Governance change | define policy | reconcile documents and mechanical checks |
| Release preparation | assess readiness and unresolved risks | generate artifacts and run release checks |
| Large refactor | define invariants and acceptable risk | implement and regression-test |

## 10. Reserved decisions

Neither an intake issue nor a Codex-ready label silently authorizes Codex to:

- allocate, merge, split, or retire construction identities without an accepted basis;
- decide linguistic status or promotion thresholds;
- treat tests, parser output, extraction counts, or readiness scores as linguistic
  evidence;
- design or deploy a survey;
- override reviewed corpus or panel decisions;
- unpark a construction;
- publish a release;
- write directly to `main`;
- merge or enable auto-merge;
- infer user approval.

## 11. Dispatch boundary

Issue generation and Codex dispatch are separate responsibilities.

A created issue must record one truthful pickup state. Codex pickup may later use:

- `not-configured`;
- `queued`;
- `accepted`;
- `failed`;
- `manual-pickup-required`.

ChatGPT and human pickup begin as `chatgpt-pickup-required` and
`human-pickup-required`, respectively.

Assignment, labels, mentions, or an `issues: opened` event must not be described as
starting Codex unless a controlled end-to-end test has verified that behavior.

A dispatch failure must leave the intake issue intact and must be reported to the
user.

## 12. Manual issue-generator workflow

The manually triggered
[`codex-intake-issue.yml`](../../.github/workflows/codex-intake-issue.yml)
workflow:

1. accepts structured creator, one pickup target, category or decision type, title,
   outcome, acceptance criteria, context, dependencies, protected state, risk,
   execution mode, and target-specific inputs;
2. validates them against
   [`task-intake.schema.json`](../../schemas/task-intake.schema.json), while retaining
   explicit validation compatibility for legacy
   [`task-intake-v1.schema.json`](../../schemas/task-intake-v1.schema.json) and
   [`codex-task.schema.json`](../../schemas/codex-task.schema.json) records;
3. rejects missing common or target-specific fields, multiple or unsupported pickup
   targets, invalid status/owner combinations, unsafe direct authorizations,
   Markdown-fence injection, and an exact duplicate open intake;
4. creates one canonical issue body and v2 metadata block with target-specific
   instructions, initial ownership revision, status, owner, permission, and labels;
5. idempotently creates or reconciles the routing labels;
6. uses environment variables rather than inserting untrusted input into executable
   workflow script text.

The same coordination implementation validates agent-neutral `resolve-blocker`,
`takeover`, and reassignment transitions. It rejects stale or skipped revisions,
wrong previous targets, non-increasing timestamps, owner/target disagreement, and
parallel edits against active overlapping work.

For issue creation, expected least-privilege permissions are:

```yaml
permissions:
  contents: read
  issues: write
```

The implemented workflow does not need pull-request access or `contents: write`. It
does not dispatch Codex, create branches, create work claims, open pull requests,
merge, enable auto-merge, or make linguistic, survey, status, release, or governance
decisions. Exact duplicate detection does not replace Codex self-screening for
semantic overlap or hidden dependencies.

## 13. Definition of done for the manual workflow

The manual workflow remains complete only while:

- every creator and pickup-target combination produces the documented unified
  format;
- target-specific required fields, status, owner, and labels remain enforced;
- legacy `canto-span-codex-task-v1` records remain valid without rewriting;
- legacy `canto-span-task-intake-v1` records remain valid without rewriting;
- intervention and reassignment records enforce the overlap and handoff rules;
- generated Codex prompts require live ownership re-fetch at every mutation boundary;
- new claims and pull requests bind to the live intake owner and revision;
- prohibited task classes are rejected or routed to ChatGPT;
- ChatGPT can invoke issue creation without requiring the user to restate the task;
- the user receives a notice for every created issue;
- Codex self-screening is included in every Codex-targeted prompt;
- metadata validates against a checked-in schema;
- no intake issue is mistaken for a semantic work claim;
- dispatch status is explicit and truthful;
- failure does not cause partial repository writes;
- untrusted input remains data rather than executable workflow text;
- duplicate detection remains bounded to exact open intake matches;
- Codex pull requests still stop for independent review and explicit user merge
  approval;
- documentation and implementation describe the same behavior.

An automatic Codex dispatch adapter remains a separate future design and review
task. It must not be inferred from the presence of this manual generator.
