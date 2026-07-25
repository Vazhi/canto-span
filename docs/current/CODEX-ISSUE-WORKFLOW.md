---
title: Canto Span — Codex Issue Intake Workflow
status: current-design
implementation_status: documented-not-implemented
tags: [canto-span/infrastructure, canto-span/agents, canto-span/github]
related: "[[00-START-HERE]] [[MULTI-AGENT-COORDINATION]] [[USER-MERGE-REVIEW]]"
---

# Codex issue intake workflow

This document defines the planned GitHub workflow for creating bounded issues that
Codex can begin from with minimal task-specific prompting.

The workflow is **documented but not yet implemented**. Creating an ordinary GitHub
issue does not, by itself, prove that a Codex task has started. Automatic pickup must
be provided by a tested dispatch adapter supported by the connected Codex setup.
Until that adapter exists and is verified, `codex-ready` means that the issue is
properly scoped for Codex, not that Codex is currently working on it.

This document does not replace:

- [`AGENTS.md`](../../AGENTS.md);
- [`00-START-HERE.md`](00-START-HERE.md);
- [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md);
- [`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md).

Every Codex task remains subject to those contracts.

## 1. Purpose

The workflow should let the user create a useful Codex task quickly without copying
the full repository contract into every issue. It should:

1. accept a small set of structured inputs;
2. reject tasks that are too ambiguous or reserve decisions for ChatGPT or the user;
3. create a consistent, immediately actionable GitHub issue;
4. label the issue as Codex-ready only after validation;
5. optionally hand the issue to a separately configured Codex dispatch adapter;
6. require Codex to create its own semantic work claim after inspecting live
   repository state;
7. end in a coherent pull request presented to the user for review;
8. never merge or enable auto-merge without the explicit approval required by
   `USER-MERGE-REVIEW.md`.

The intake issue describes the requested outcome. It is not a semantic work claim,
linguistic evidence record, implementation approval, release approval, deployment
approval, or merge approval.

## 2. Routing principle

A task is suitable for direct Codex intake when it is:

- bounded;
- repository-centered;
- testable or auditable;
- capable of producing one coherent pull request;
- independent of an unresolved user preference;
- independent of an unmade expert linguistic, survey, governance, promotion,
  deployment, release, or merge decision.

Tasks requiring broad synthesis, external research judgment, policy selection,
participant-facing language, or clarification should go through ChatGPT first.
ChatGPT may then convert the result into one or more bounded Codex-ready issues.

## 3. Codex-appropriate task categories

The workflow permits only the following categories.

### 3.1 `runtime-bug`

Use for a reproducible parser, rendering, serialization, or span-boundary defect.
The issue must provide a failing example, existing fixture, diagnostic, or other
observable reproduction and must state the expected behavior.

Appropriate examples:

- prevent a known false positive;
- restore a previously accepted parse;
- correct a span boundary;
- fix a rendering or serialization regression.

Do not use this category to invent a new grammar analysis or broaden a construction
without the required evidence and decision basis.

### 3.2 `tests-fixtures`

Use for executable coverage of an already defined behavior or boundary.

Appropriate examples:

- add a missing negative fixture;
- convert a confirmed bug into a regression test;
- improve test metadata consistency;
- add tooling tests for an existing verifier.

A test request must identify the behavior it is proving. Passing tests do not create
linguistic evidence or authorize a status change.

### 3.3 `verification-audit`

Use for deterministic checks, repository audits, stale-state detection, schema
validation, and diagnostic improvements.

Appropriate examples:

- detect stale documentation;
- strengthen a schema verifier;
- identify mismatches between canonical and generated files;
- improve validation errors;
- consolidate genuinely redundant verifier logic.

### 3.4 `data-schema`

Use for mechanical changes to canonical data or schemas when the desired state is
already specified.

Appropriate examples:

- add a defined field across records;
- migrate records to an accepted schema;
- repair cross-references;
- regenerate deterministic indexes;
- apply consequences of an already accepted adjudication.

Codex must not make the underlying identity, ontology, evidence, status, or policy
decision unless that decision is already recorded in an authoritative source named
by the issue.

### 3.5 `documentation-consistency`

Use to reconcile current documentation with an already accepted source of truth.

Appropriate examples:

- remove stale instructions;
- repair mandatory reading links;
- synchronize counts with canonical data;
- update README or HANDOFF after an accepted change.

The issue must identify the canonical source. Codex must not invent a new policy to
resolve a contradiction.

### 3.6 `corpus-tooling`

Use for mechanical corpus extraction, inventory, deduplication, provenance checks,
rendering, and workbench maintenance.

Appropriate examples:

- run or repair an existing extractor;
- validate source locations and hashes;
- deduplicate candidates;
- render an already reviewed packet;
- improve workbench tests.

Codex must not classify a candidate as linguistically genuine merely because it was
extracted. Expert classification remains separate unless the issue supplies the
required decision basis and explicitly includes that adjudication scope.

### 3.7 `ci-repository-tooling`

Use for GitHub Actions, packaging tools, local verification scripts, dependency
maintenance, and repository infrastructure.

Appropriate examples:

- diagnose a failing CI job;
- repair workflow path filters;
- update an action to a supported release;
- fix export or packaging tooling;
- remove an obsolete script after confirming its replacement.

### 3.8 `behavior-preserving-refactor`

Use for a bounded refactor whose required behavior is already defined and covered by
verification.

Appropriate examples:

- split an oversized function;
- consolidate duplicate utilities;
- remove confirmed dead code;
- simplify a deterministic generator.

The issue must state the invariants that cannot change.

### 3.9 `accepted-specification`

Use to implement a design, schema, matcher, command, or workflow that has already
been reviewed and accepted.

The issue must link or name the accepted specification and identify any reserved
choices that Codex must not reopen.

### 3.10 `repository-pr-audit`

Use for bounded inspection of repository state or a pull request.

Appropriate examples:

- search for legacy behavior;
- compare implementation with a canonical specification;
- identify missing tests;
- verify claim coverage;
- review a PR for regressions or stale assumptions.

An audit issue may produce findings only or may authorize bounded repairs. The issue
must say which outcome is expected.

## 4. Tasks that go to ChatGPT first

The intake workflow must not label the following task classes `codex-ready` unless
ChatGPT or the user has first converted them into a bounded, decided specification.

### 4.1 Work prioritization

Examples:

- choose the next construction;
- compare research lanes;
- decide whether to park or unpark work;
- choose release milestones;
- balance evidence risk against learner value.

### 4.2 Broad external linguistic research

Examples:

- find and compare scholarly analyses;
- assess evidence quality and source diversity;
- determine what a publication directly establishes;
- reconcile contradictory literature and speaker judgments.

Codex may later record or implement the resulting decision.

### 4.3 Difficult linguistic adjudication

Examples:

- decide whether two labels represent one construction;
- decide whether a pattern is productive, lexicalized, or attested only;
- define positive and negative boundaries;
- decide whether a split requires a new UUID;
- promote or downgrade a construction.

### 4.4 Native-panel and survey design

Examples:

- choose constructions or contrasts;
- write natural contexts;
- design response scales;
- interpret respondent feedback;
- decide whether an instrument is ready to deploy.

Codex may generate or validate XML and deployment artifacts after the instrument is
specified.

### 4.5 Governance and project-policy decisions

Examples:

- change evidence standards;
- alter promotion thresholds;
- define agent authority;
- change automation permissions;
- choose merge, deployment, or release policy.

Codex may implement a policy after the decision is recorded.

### 4.6 User-facing language and communication

Examples:

- Cantonese or Mandarin translation;
- recruitment messages;
- survey explanations;
- learner-facing grammar explanations;
- teaching materials;
- sensitive personal or professional messages.

### 4.7 Ambiguous improvement requests

Examples:

- improve the parser;
- clean up the repository;
- research Cantonese grammar;
- make the survey better;
- decide what to work on next.

ChatGPT should decompose these into bounded tasks with explicit acceptance criteria.

### 4.8 Final review and merge recommendation

Codex may prepare and validate a PR. ChatGPT should independently review whether the
PR solved the intended problem, stayed within scope, interpreted evidence correctly,
and described limitations honestly. The user retains the explicit merge decision.

## 5. Hybrid task pattern

Some work should be divided rather than assigned entirely to one agent.

| Task | ChatGPT or user responsibility | Codex responsibility |
|---|---|---|
| New parser construction | establish evidence, identity, and boundaries | implement accepted matcher, fixtures, and records |
| Corpus investigation | define search and adjudication criteria | extract, deduplicate, validate, and render |
| Survey creation | design instrument and wording | generate XML, validators, and technical files |
| Evidence repair | interpret and grade sources | update ledgers and run verification |
| Governance change | define policy | reconcile files and strengthen mechanical checks |
| Release preparation | assess readiness and unresolved risks | generate artifacts and run release verification |
| Large refactor | define invariants and acceptable risk | implement and regression-test the refactor |

## 6. Codex eligibility gate

The issue-creation workflow may apply `codex-ready` only when every condition below
is satisfied.

1. The task has one bounded outcome.
2. Relevant repository context is named or discoverable.
3. At least one observable acceptance criterion is supplied.
4. The task can end in one coherent pull request or one explicit findings report.
5. No unresolved user preference is required to begin.
6. No unmade expert linguistic, survey, governance, promotion, deployment, release,
   parking, or merge decision is hidden inside the task.
7. The task does not ask Codex to invent linguistic evidence.
8. The task does not authorize direct writes to `main`.
9. The task does not authorize merge or auto-merge.
10. A parked construction is not silently included.
11. The issue does not knowingly duplicate or overlap active work.
12. The issue can be executed under `AGENTS.md` and `00-START-HERE.md` without a
    contradictory instruction.

A failed gate creates no `codex-ready` issue. The workflow should either reject the
request with a specific reason or create a non-dispatched `needs-chatgpt` issue when
that behavior is explicitly requested.

## 7. Workflow inputs

The planned manual workflow should request only the information needed to produce a
bounded issue.

Required inputs:

- **Category:** one allowlisted category from section 3.
- **Title:** a concise action-oriented issue title.
- **Outcome:** one concrete end state.
- **Acceptance criteria:** one or more observable requirements.

Optional inputs:

- relevant files, functions, construction codes, diagnostics, or source packets;
- behavior that must remain unchanged;
- dependency issue or accepted specification;
- risk level: `low`, `medium`, or `high`;
- whether findings-only output is acceptable;
- additional protected state;
- requested labels.

The workflow should not ask the user to predict the exact semantic work claim,
branch name, current base SHA, or overlap state. Codex must determine those after
inspecting live repository state.

## 8. Generated issue structure

The workflow should create an issue with four components.

### 8.1 Minimal bootstrap prompt

Use this exact intent, with only minor formatting changes if required:

```text
Follow AGENTS.md and docs/current/00-START-HERE.md in full. Inspect current main,
open PRs, and work claims; create the required semantic work claim and exact branch
before editing. Complete the bounded outcome below, run every applicable check,
open a coherent PR, notify the user when it is ready, and stop without merging.
```

The issue should not copy the full agent contract. The repository files remain the
canonical instructions.

### 8.2 Human-readable task body

```markdown
## Outcome

<One concrete result>

## Acceptance criteria

- <Observable requirement>
- <Required test or verifier>
- <Behavior that must remain unchanged>

## Relevant context

<Files, issue, error, construction code, specification, or source packet>
```

### 8.3 Machine-readable metadata

```codex-task
{
  "schema": "canto-span-codex-task-v1",
  "category": "verification-audit",
  "risk": "low",
  "execution_mode": "implementation",
  "dependencies": [],
  "protected_state": [],
  "dispatch_status": "ready",
  "work_claim_required": true,
  "user_merge_approval_required": true
}
```

The metadata block describes intake routing only. It must not contain fabricated
claim targets or imply that the issue is itself a work claim.

### 8.4 Labels

Recommended labels:

- `codex-ready`;
- `codex:<category>`;
- `risk:low`, `risk:medium`, or `risk:high`;
- optionally `findings-only`;
- optionally `needs-chatgpt` for rejected or deferred requests.

The implementation must verify that labels exist or create them through a separately
claimed administrative step.

## 9. Lifecycle

### 9.1 Intake

1. The user manually starts the issue-creation workflow.
2. The workflow validates the category and required fields.
3. It checks prohibited requests and obvious active-work overlap where possible.
4. It creates the formatted issue and applies labels.
5. It records whether a dispatch adapter was invoked successfully.

### 9.2 Pickup

1. A tested dispatch adapter sends the issue to Codex, or a human manually starts a
   Codex task from the issue.
2. Codex reads `AGENTS.md`, `00-START-HERE.md`, the coordination contract, and the
   merge-review contract.
3. Codex inspects current `main`, open PRs, open work claims, parked constructions,
   and exact affected records.
4. Codex creates a separate semantic work-claim issue and the exact branch named by
   that claim.
5. If the task overlaps active work or requires a reserved decision, Codex stops and
   reports the blocker instead of editing.

### 9.3 Execution

1. Codex keeps work inside the claim.
2. Codex updates the claim before expanding scope.
3. Codex follows all applicable evidence, identity, runtime, corpus, survey,
   generated-output, and verification gates.
4. Codex creates one coherent PR and links both the intake issue and work claim.
5. The PR closes the work claim on merge. The intake issue may close on PR merge or
   through a separate accepted lifecycle rule chosen during implementation.

### 9.4 Review

1. Codex confirms the exact PR head and all applicable checks.
2. Codex notifies the user that the PR is ready and provides scope, validation,
   risks, and limitations.
3. Codex stops without merging.
4. ChatGPT or the user reviews the result.
5. Merge occurs only after explicit user approval for the specific PR and unchanged
   head.

## 10. Reserved decisions

The intake workflow must never silently grant Codex authority to:

- allocate, merge, split, or retire a construction identity without an accepted
  decision basis;
- change linguistic status or promotion thresholds;
- treat tests, parser output, extraction counts, or readiness scores as linguistic
  evidence;
- design or deploy a survey;
- override reviewed corpus or panel decisions;
- unpark a construction;
- publish a release;
- write directly to `main`;
- merge or enable auto-merge;
- infer user approval.

An issue requesting one of these actions must either name the authoritative accepted
decision that already permits implementation or be routed to ChatGPT or the user.

## 11. Validation and rejection behavior

The future implementation should reject or defer an intake request when:

- the category is not allowlisted;
- the outcome is blank, vague, or contains multiple unrelated outcomes;
- no acceptance criterion is supplied;
- the request asks for automatic merge, deployment, promotion, release, or unpark;
- the request asks Codex to decide grammaticality or evidence sufficiency without a
  defined evidence task and authority;
- the task targets a parked construction without an accepted dependency;
- the task contradicts current repository policy;
- an active claim or PR already covers the same semantic target;
- required context is unavailable;
- the dispatch adapter is unavailable and the configured policy requires immediate
  pickup rather than issue creation alone.

Rejection messages should identify the failing rule and state whether the task needs
ChatGPT decomposition, user clarification, an accepted dependency, or ordinary
manual Codex pickup.

## 12. Permissions and security

The issue-creation workflow should follow least privilege.

For issue creation it normally needs:

```yaml
permissions:
  contents: read
  issues: write
  pull-requests: read
```

Additional permissions require a separate justification. The intake workflow should
not receive `contents: write`, should not create branches, and should not modify
`main`.

Any Codex dispatch credential must be stored as a GitHub secret or use a supported
short-lived identity mechanism. Logs must not expose tokens, private prompts, or
participant data.

The dispatch step should be isolated from issue generation so the repository can
retain a valid issue-intake workflow even when the connected Codex mechanism changes.

## 13. Dispatch adapter boundary

The design intentionally separates:

1. **issue generation**, which can be implemented and tested entirely within GitHub;
2. **Codex dispatch**, which depends on the actual supported Codex integration.

The first implementation must not guess that assignment, a label, a mention, or the
`issues: opened` event starts Codex. The adapter must be validated with one controlled
end-to-end task and must record a machine-readable dispatch result such as:

- `not-configured`;
- `queued`;
- `accepted`;
- `failed`;
- `manual-pickup-required`.

A dispatch failure must not delete or corrupt the generated issue.

## 14. Implementation plan

A later implementation PR should add, at minimum:

1. a manual workflow under `.github/workflows/`;
2. a task schema for the `codex-task` metadata block;
3. a generator and validator script;
4. tests for every category and rejection rule;
5. label validation or setup instructions;
6. duplicate and overlap checks that do not fabricate semantic certainty;
7. an optional isolated dispatch adapter;
8. a verifier ensuring the workflow uses the canonical prompt and user-review stop;
9. Start Here and Git workflow pointers after the workflow exists;
10. an end-to-end dry run creating a low-risk test issue.

The implementation must be reviewed as a separate PR. This document does not itself
activate issue creation or Codex dispatch.

## 15. Definition of done for the future workflow

The workflow is complete only when:

- every allowlisted category produces the documented issue format;
- every prohibited task class is rejected or explicitly deferred;
- the generated issue contains the minimal bootstrap prompt;
- metadata validates against a checked-in schema;
- no generated issue is mistaken for a work claim;
- Codex can create its claim and branch from the issue without additional task
  clarification for a valid low-risk case;
- issue generation has automated tests;
- dispatch status is explicit and truthful;
- failure leaves an auditable issue or error without partial repository writes;
- the eventual PR still stops for user review and explicit merge approval;
- documentation and implementation describe the same behavior.
