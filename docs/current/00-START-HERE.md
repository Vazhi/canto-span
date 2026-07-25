# Start here — mandatory project contract

Every human or automated agent must read this file in full before analyzing,
editing, generating, reviewing, or merging repository work. The root
[`AGENTS.md`](../../AGENTS.md) forces discovery of this contract. A task prompt may
narrow scope, but it must not silently override this file, the canonical state
owners below, or a newer accepted project decision.

Historical research, release notes, adjudication reports, old prompts, branch
descriptions, generated snapshots, and Git history preserve provenance. They do
not become current instructions merely because they are detailed.

## Current baseline

- runtime: **v0.5.216**
- current runtime labels / status notes: **133 / 133**
- construction workflow: **133 available / 0 parked**
- retired labels: **48**
- permanent UUID records: **181**
- completed expert adjudications: **54**
- pending expert adjudications: **127**
- `research_pending`: **79**
- promotion-ready constructions: **0**
- direct `boundary_ready` candidates: **1** (`AB30`)
- current AB30 candidate packet: **5 reviewed; 2 genuine; 3 false positives**
- AB30 corpus-readiness effect: **`partial_only`**
- active survey: **`YUE-JUDGMENT-PILOT-01` remains in collection**
- follow-up survey: **`followup-draft-v1` is non-deployable**

See [`PROJECT-STATE.md`](PROJECT-STATE.md) for the complete present-tense snapshot.
Volatile counts and work order belong there; durable standards belong here.

## Mandatory agent contract

Before making a change, every agent must:

1. confirm the repository is `Vazhi/canto-span`;
2. update from current `main` and inspect open pull requests, intake issues, and
   open work-claim issues for ownership changes, overlapping semantic regions,
   state dimensions, generated outputs, parked identities, or dependencies;
3. create or update one semantic work-claim issue using
   [`.github/ISSUE_TEMPLATE/work-claim.yml`](../../.github/ISSUE_TEMPLATE/work-claim.yml);
4. read [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md) and
   [`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md), choose the smallest adequate
   shared or exclusive targets, and declare integration-owned or generated
   consequences;
5. create the exact new `agent/<description>` branch named in the claim;
6. identify the task class using the routing table below;
7. read the required canonical files and exact affected records;
8. declare authorized scope, protected state, canonical inputs, generated outputs,
   reserved expert decisions, dependencies, and required checks;
9. preserve the separation among identity, ontology, linguistic status, runtime
   behavior, workflow availability, discovery readiness, learner presentation, and
   temporary coordination intent;
10. implement one coherent passing state rather than an intentionally incomplete
    state another commit, bot, or agent must repair;
11. open a pull request using
    [`.github/pull_request_template.md`](../../.github/pull_request_template.md),
    link the work claim, and include `Closes #<claim>`;
12. after GitHub assigns the PR number, bind `active_pr` in the live intake block
    and fill the PR body's active worker and ownership revision before expecting the
    coordination check to pass;
13. use draft state only while work, dependencies, pending changesets, or integration
    remain unresolved;
14. when the pull request is ready, notify the user with the PR number, exact head,
    scope, validation, risks, and limitations, then stop without merging;
15. merge only after the user explicitly approves that specific pull request and the
    approved head commit remains unchanged;
16. keep status promotion, survey deployment, and release publication inside their
    own explicitly claimed scope and applicable gates.

The current machine-readable ownership block in the canonical intake issue body has
pickup precedence. Every agent re-fetches it and the linked claim after a resumed
session and immediately before claim creation, branch creation, first edit, commit,
push, pull-request readiness, or merge. The active owner, pickup permission,
monotonic ownership revision, claim, and branch must agree. A mismatch or later
takeover invalidates cached authority and requires `routing result: unavailable`
with no repository write.

There is no read-only research role. An agent may research, record evidence,
adjudicate, implement runtime behavior, update tests, document, and integrate in one
coherent task when the work claim covers those dimensions and every substantive
gate is satisfied.

When a task prompt conflicts with current repository policy, follow current policy
and document the conflict. When canonical owners disagree outside an explicitly
recorded migration boundary, reconciliation is part of the task.

## Authority and state ownership

Use the narrowest relevant canonical owner. No single registry owns every state
dimension.

| State dimension | Canonical owner | Important consequence |
|---|---|---|
| Permanent UUID and short code | [`data/construction-identities.json`](../../data/construction-identities.json) and [`data/construction-identity-lock.json`](../../data/construction-identity-lock.json) | UUIDs and assigned codes never change or return to the pool. |
| Current ontology | Accepted UUID-keyed records in [`data/construction-adjudications.json`](../../data/construction-adjudications.json) and [`data/construction-adjudication-batches/`](../../data/construction-adjudication-batches/) | Canonical name, family, profile, and claim layer may change without silently changing runtime or status. |
| Current linguistic status and note-local evidence | Exactly one current note under [`grammar/<status>/`](../../grammar/) for each active runtime label | A recommendation or passing test does not move status. |
| Actual parser behavior | [`main.js`](../../main.js) and executable [`tests/`](../../tests/) | Tests prove implementation behavior only. |
| Workflow availability | [`data/parked-constructions.json`](../../data/parked-constructions.json) | Every unlisted current construction is available; this is a blacklist, not a queue. |
| Current pickup authority | Latest valid ownership block in the canonical intake issue body, conforming to [`schemas/task-intake.schema.json`](../../schemas/task-intake.schema.json) | The active owner and monotonic revision supersede cached prompts, comments, labels, assignments, mentions, and earlier dispatch. |
| Concurrent semantic scope | Open GitHub claims conforming to [`schemas/work-claim.schema.json`](../../schemas/work-claim.schema.json) | A current claim binds to the intake issue, active worker, and ownership revision; mismatch stops work. |
| Coordination path policy | [`config/coordination-targets.json`](../../config/coordination-targets.json) | Exclusive and integration-owned paths require the configured mode and role. |
| Per-pull-request merge authorization | [`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md) | Passing checks and integrator role never replace explicit user approval for the specific PR and head. |
| Discovery readiness | [`data/construction-candidate-readiness.json`](../../data/construction-candidate-readiness.json) and deterministic reports | Scores rank work; they never promote or prohibit work. |
| Native-panel and survey evidence | [`review-packets/native-panel/active-v2/`](../../review-packets/native-panel/active-v2/) | Evidence is role-neutral and counted per critical item. |
| Corpus candidate extraction and review | Construction-specific packet plus its workbench and decision ledger | Extraction is mechanical; expert classification is separate. |
| Learner presentation | Learner-facing labels and explanations | Presentation labels are not durable identities or evidence. |
| Historical provenance | [`docs/research/`](../research/), `archive/`, immutable batch reports, and Git history | Historical text cannot override current policy. |

An accepted adjudication may supersede an older name or claim-layer description
while the legacy runtime label, note filename, status folder, and matcher remain
unchanged. Runtime-label migration, status-path migration, matcher changes, fixture
changes, new UUID allocation, retirement, promotion, and release are separate
scoped actions.

Legacy grammar-note fields named `workflow_state`, `workflow_priority`,
`workflow_since`, and `workflow_reason` are non-authoritative compatibility
metadata. They do not park a note or control agent work selection.

## Non-negotiable standards

### Work selection and grammar changes

There is **no active-note whitelist** and **no repository-wide grammar freeze**.
Every current construction is available for bounded research, adjudication,
specification, or implementation unless its permanent identity appears in
`data/parked-constructions.json`.

Agents select the work with the greatest expected project benefit after considering
learner impact, parser harm, evidence gaps, source accessibility, ontology risk,
dependencies, survey or corpus opportunities, open work, and the cost of leaving
the issue unresolved. Readiness ranks may inform this choice but are not a queue.

A parked construction must not be worked on silently. When it appears to be the
best target, **recommend unpark** and state the current reason, why it no longer
controls, expected benefit, changed evidence or dependency, and bounded safeguards.
The item remains parked until a reviewed change removes it.

Removing the blanket freeze does not remove substantive gates. A new construction,
split, broadening, status transition, or runtime change still requires applicable
identity, external evidence, boundaries, tests, documentation, promotion rules, and
verification.

### Semantic work claims and same-file concurrency

**Semantic work claims** are mandatory before editing. Read
[`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md),
[`schemas/work-claim.schema.json`](../../schemas/work-claim.schema.json), and
[`config/coordination-targets.json`](../../config/coordination-targets.json).

- Claims reserve semantic regions, not merely filenames.
- Shared claims may touch the same physical file only in disjoint records,
  functions, headings, item ranges, or JSON Pointers.
- The same semantic region cannot be claimed concurrently.
- Repository-wide policy, schemas, workflows, verification orchestration, and
  configured exclusive paths require an exclusive claim.
- Workers may research and implement ordinary claimed scope, but only an integrator
  may finalize integration-owned aggregate or current-state files.
- Unsafe high-contention edits may be expressed as preconditioned branch-local
  changesets under [`changes/pending/`](../../changes/pending/) conforming to
  [`schemas/change-set.schema.json`](../../schemas/change-set.schema.json).
- Draft pull requests may contain validated pending changesets. A ready pull request
  may not contain a pending JSON file.
- The pull request must link one open claim, use the named branch, cover every
  changed file, and close the issue on merge.

Work claims and changesets are temporary coordination records. They do not provide
linguistic evidence or authorize status, runtime, survey, or release changes by
themselves.

### Evidence and linguistic claims

- Every language claim begins with independently checkable external propositions,
  exact locators, supported scope, limitations, and competing or contradictory
  evidence.
- Parser output, tests, fixtures, generated probes, rendering, regression success,
  usefulness, discovery ranking, and historical confidence have **zero independent
  linguistic evidence weight**.
- Attestation proves occurrence in the documented context, not unrestricted
  productivity, frequency, dialect-wide naturalness, or the parser's preferred
  analysis.
- A narrow subtype, wrapper, predecessor, retired record, runtime alias, shared
  vocabulary, work claim, or changeset never donates evidence to another UUID.
- Publication attestation alone cannot overcome contradictory naturalness data.
  Keep disputed scope out of promotion and implementation broadening until
  independent sources, controlled contrasts, variation factors, negative
  boundaries, competing analyses, and role-neutral evidence are reviewed.
- Do not invent dialect, register, pragmatic, or contextual explanations to
  reconcile conflict.

Read [`DOCTRINE.md`](DOCTRINE.md), [`GOVERNANCE.md`](GOVERNANCE.md), and
[`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md).

### Identity, ontology, and naming

- Use `construction_code + canonical_name` in all new analysis.
- Record any legacy runtime label separately when discussing code, tests, current
  paths, serialization, or migration.
- Never use a runtime alias, filename, learner label, survey-local alias, work ID,
  or historical title as the durable construction key.
- A clarification or narrowing normally retains its UUID. A true split requires new
  collision-checked UUIDs and predecessor/successor links.
- Earlier accepted adjudication batches are immutable. Corrections require a later
  superseding decision.
- New survey or corpus item identifiers use the current canonical scheme; local
  aliases require a checked crosswalk.

Read [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md) and
[`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md).

### Parser integrity

- Never insert hidden subjects, objects, nouns, resources, propositions, results,
  activities, connectives, or semantic roles.
- Preserve ambiguity, incomplete spans, lexical restrictions, and unknown material
  when evidence does not support one analysis.
- Internal wrappers, fallbacks, compatibility aliases, and diagnostics cannot
  license an evidence-gated construction or broaden a supported subtype.
- Negative and boundary cases remain executable.
- Shared structural subsystems require pattern-level grounding and unseen lexical
  combinations, but success remains implementation evidence.

### Corpus work

- Use an explicit checked-in source allowlist; do not silently search the entire
  repository as evidence.
- Exclude fixtures, generated diagnostics, surveys, grammar examples,
  documentation quotations, adjudication records, synthetic tests, and derived
  duplicates unless the task explicitly concerns them.
- Preserve candidate IDs, exact text, matched span, source location, context,
  content hash, duplicate group, and provenance.
- Classify every candidate used as evidence as `genuine`, `false_positive`,
  `ambiguous`, or `unusable`; totals must account for the full inventory.
- Frequency and extraction do not establish membership or readiness.

For AB30, read [`tools/corpus-review/README.md`](../../tools/corpus-review/README.md),
the canonical extraction ledger, and the current decision record.

### Native panel and surveys

- All eligible respondents belong to one anonymized role-neutral panel. **No spouse**,
  named reviewer, private respondent, expert, or recruitment channel receives
  special weight.
- The evidence unit is one usable adjudicated judgment on one critical item.
- `provisional` requires at least 10 usable judgments per critical positive and
  boundary item from one clean role-neutral instrument.
- `supported_productive` requires at least 30 usable judgments per critical item
  from a locked clean instrument plus every non-panel gate.
- A pilot diagnoses instrument quality; it does not promote a construction.
- Do not edit a live locked instrument. Material wording, context, scale, filler,
  branching, or randomization changes create a new version.
- Semantic absurdity is not a grammatical boundary.
- Record eligibility, consent, assigned list, quality flags, duplicates,
  exclusions, reasons, per-item usable counts, and version state.
- Do not deploy or mark a follow-up instrument ready while metadata says
  `deployment_allowed: false`.
- `YUE-JUDGMENT-PILOT-01` must close and receive an item audit before
  `followup-draft-v1` can be locked, deployed, or treated as final evidence.

### Documentation and generated records

- Current policy lives under `docs/current/`.
- `PROJECT-STATE.md` owns the concise present-tense snapshot and work order.
- Historical reports remain immutable provenance.
- Prefer one canonical record and one verifier per responsibility.
- Edit canonical inputs first, then regenerate deterministic outputs in the same
  branch or integration step.
- `validation/current/` contains verifier byproducts, not patch inputs.
- Do not create repeated `validation/vX.Y.Z/` trees.
- Documentation must not describe a stronger state than canonical inputs and runtime.

### Git, automation, releases, and packaging

- Start from current `main` on the branch named in an open claim.
- Keep unrelated changes outside the branch and claim.
- Pull requests may open ready when complete and coherent. Use draft state when work,
  dependencies, pending changesets, or integration remain unresolved.
- A passing pull request must be presented to the user for review. The integrator
  stops before merge and proceeds only after explicit approval for that PR and head.
- Automation follows **least privilege**, not a blanket read-only or no-writer rule.
  Validation-only workflows remain read-only because they need no writes.
- Write-capable automation is permitted only when an exclusive claim covers the
  workflow and target state; permissions are minimal; writes are limited to the
  claimed non-`main` branch or issue/PR metadata; base, head, claim, and operation
  preconditions are checked; and the action is auditable.
- Automation must not commit directly to `main`, expand its own scope, adjudicate
  linguistic evidence, promote status, deploy surveys, publish releases, merge, or
  enable auto-merge without the separately required scope, gates, and user approval.
- Runtime release ZIPs remain minimal: `main.js`, `manifest.json`, and `styles.css`.
- Status changes and releases require every applicable Definition-of-Done and
  verification gate.

Read [`GIT-WORKFLOW.md`](GIT-WORKFLOW.md), [`TESTING.md`](TESTING.md),
[`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md), and
[`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md).

## Task routing and required reading

| Task type | Required reading and canonical inputs | Minimum validation |
|---|---|---|
| Any repository task | This file; `PROJECT-STATE.md`; coordination doc; open PRs and claims; affected files; parked registry | coordination workflow; `git diff --check`; task-specific checks |
| Concurrent work, claims, changesets, or automation | Coordination doc; claim; coordination config and schemas; active overlaps | `npm run verify:coordination`; PR coordination workflow; `npm run verify` when policy changes |
| Linguistic research, evidence, implementation, or status recommendation | Doctrine, Governance, Definition of Done, affected note, sources, runtime and tests as applicable | `npm run verify:research`; `npm run verify` when current records or runtime change |
| Identity or ontology adjudication | Identity and adjudication docs; affected records; runtime paths; tests; sources | apply/regenerate; adjudication, identity, discovery, core, and research checks |
| Runtime or parser behavior | Doctrine, canonical identity, status note, exact runtime path, tests | `npm test`; metadata sync when counts change; `npm run verify` |
| Corpus extraction or review | Governance, identity, workbench README, allowlist, ledger, decisions | workbench tests; validate; render; `npm run verify:research` |
| Native panel or survey | Governance, Definition of Done, active-v2 policy/state, instrument metadata | instrument verifier; `npm run verify:research`; never deploy a draft |
| Status migration, release, or promotion | All applicable rows plus release baseline | `npm run verify:all` |

If a task spans multiple rows, satisfy every applicable row.

## Multi-agent coordination workflow

### Before editing

1. Fetch current `main` and record its commit.
2. Inspect open pull requests and work claims.
3. Detect overlapping constructions, file regions, functions, headings, JSON
   records, surveys, corpus packets, generated outputs, parked identities, and state
   dimensions.
4. Create or update one work claim using shared mode for disjoint regions and
   exclusive mode for configured or indivisible scope.
5. Bind the claim to the live intake issue, active worker, and ownership revision.
6. Declare `integration_role: integrator` when reconciling integration-owned files
   or managing merge order.
7. Re-fetch the intake immediately before creating the exact branch named in the
   claim; stop if ownership changed.
8. Rebuild stale work before adding changes.
9. Define scope, protected state, inputs, outputs, reserved decisions, dependencies,
   and validation.

### During work

1. Read exact affected canonical records and the claim.
2. Keep mechanical preparation separate from expert linguistic decisions.
3. Use existing schemas, IDs, ledgers, verifiers, and semantic-region conventions.
4. Update the claim before expanding scope.
5. Re-fetch live ownership before the first edit, every commit and push, and after
   every resumed session; stop on owner, permission, revision, claim, or branch
   mismatch.
6. Change canonical owners first; integrate deterministic consequences once.
7. Use a preconditioned changeset when direct editing is unsafe.
8. Preserve user data, review decisions, exclusions, and provenance.
9. Research may proceed directly into evidence-faithful implementation when the
   claim and required gates cover both; no artificial read-only research handoff is
   required.

### Before opening, readying, or merging the PR

1. Run the full applicable verification matrix.
2. Restore noncanonical verifier byproducts.
3. Confirm every changed file is covered by the claim.
4. Confirm the diff contains no unrelated file, stale branch assumption, or
   superseded work order.
5. Reconcile current documentation and generated outputs.
6. Open draft only if unresolved work remains; otherwise open ready.
7. Before ready state, apply or reject pending changesets and remove their JSON.
8. The integrator verifies exact head, dependencies, mergeability, checks, and scope,
   notifies the user that the PR is ready, and stops without merging.
9. Re-fetch intake ownership and require the PR claim's worker and revision to match
   before readying or presenting the PR.
10. After explicit user approval for that PR and unchanged head, the integrator
   re-checks the gates and may merge.

## Verification matrix

Always run `git diff --check`.

### Coordination and concurrent files

```bash
npm run verify:coordination
npm run verify
```

The `Coordination claim` workflow validates the live claim, branch, expiry, changed
files, overlaps, exclusive paths, integration ownership, and pending-file rules.
Its current job is validation-only and therefore uses read permissions.

### Research, evidence, or implementation

```bash
npm run verify:research
npm run verify
```

Add `npm test` for runtime or executable-test changes. Research and implementation
may share one claim and PR; verification follows the state dimensions actually
changed.

### Adjudication

```bash
npm run adjudication:apply
npm run identity:generate
npm run discovery:generate
npm run verify:adjudications
npm run verify:identities
npm run verify:discovery
npm run verify
npm run verify:research
```

### Corpus workbench

```bash
node tools/corpus-review/cli.js inventory
node tools/corpus-review/cli.js extract
node tools/corpus-review/cli.js validate
node tools/corpus-review/cli.js render
node --test tests/tooling/corpus-review/*.test.js
npm run verify:research
```

### Survey or panel work

Run the instrument-specific verifier, then:

```bash
npm run verify:research
npm run verify
```

### Status transition or release

```bash
npm run release:baseline -- <current-version>
npm run verify:all
```

## Forbidden patterns

An agent must not:

- edit before creating or renewing its claim;
- act from a cached intake after its active owner, pickup permission, ownership
  revision, claim, or branch changes;
- treat a comment, label, assignment, mention, dispatch, or PR review as a takeover
  or reassignment;
- work from a stale branch after overlapping state changes;
- reuse another branch without an integration handoff;
- claim a whole shared file when a stable region can be named;
- allow two active claims to cover the same semantic region;
- use shared mode for a configured exclusive path;
- let a worker finalize an integration-owned file;
- mark a PR ready while a JSON file remains under `changes/pending/`;
- treat claims, changesets, workflow fields, readiness scores, or tests as linguistic
  evidence;
- work silently on a parked construction;
- recreate a blanket grammar freeze, active-note whitelist, mandatory readiness
  queue, or read-only research lane;
- create identities or aliases without resolving canonical schemes;
- transfer evidence automatically across wrappers, predecessors, retired records,
  siblings, or splits;
- promote from one respondent, a defective pilot, a small corpus packet, raw counts,
  or a readiness score;
- give a named respondent special evidentiary status;
- edit a live locked survey or deploy a draft instrument;
- overwrite reviewed corpus or panel decisions during regeneration;
- commit verifier byproducts under `validation/current/` to a normal PR;
- create parallel ledgers, duplicate verifier families, repeated snapshot trees, or
  a second coordination registry;
- use automation without a covering claim, explicit least-privilege permissions,
  preconditions, bounded targets, and an auditable result;
- permit automation to write directly to `main` or autonomously decide evidence,
  status promotion, survey deployment, release publication, merge approval, or
  auto-merge;
- merge, enable auto-merge, or schedule a merge before explicit user approval for the
  specific pull request and exact head;
- mix unrelated state dimensions without coherent scope;
- delete incomplete evidence solely to make a gate pass.

## Reusable agent task prompt

```text
Work autonomously in the GitHub repository Vazhi/canto-span.

MANDATORY BOOTSTRAP
1. Read AGENTS.md, docs/current/00-START-HERE.md,
   docs/current/MULTI-AGENT-COORDINATION.md, and
   docs/current/USER-MERGE-REVIEW.md in full.
2. Sync current main and inspect open PRs plus open work claims.
3. Re-fetch the canonical intake issue. Proceed only if its live active owner,
   pickup permission, and ownership revision authorize this agent.
4. Create or update one claim before editing. Bind its intake issue, active worker,
   and ownership revision, then declare work ID, mode, integration role, exact
   branch, expiry, semantic regions, generated outputs, protected state,
   dependencies, and one bounded outcome.
5. Create the exact agent/<description> branch named in the claim.
6. Read data/parked-constructions.json. All unlisted constructions are available;
   recommend and review unpark before working on a listed item.
6. Follow current canonical records over historical reports, prompts, aliases,
   workflow fields, claims, or generated summaries.

EXECUTION RULES
- There is no active-note whitelist, repository-wide grammar freeze, or read-only
  research role.
- Research, evidence recording, implementation, tests, and documentation may share
  one coherent claim when all affected state dimensions and gates are covered.
- Shared claims may touch the same file only in disjoint semantic regions.
- Use exclusive mode for configured exclusive paths.
- Workers do not finalize integration-owned files; integrators may reconcile them.
- Use preconditioned changesets for unsafe high-contention edits.
- Update the claim before expanding scope.
- Re-fetch live intake ownership after every resumed session and immediately before
  branch creation, first edit, commit, push, PR readiness, or merge. On mismatch,
  report `routing result: unavailable` and stop without writes.
- Use permanent construction codes and canonical names.
- Preserve review decisions, exclusions, provenance, and user data.
- Use least privilege for automation; validation-only jobs remain read-only.
- Write-capable automation must be claim-scoped, preconditioned, auditable,
  branch-limited, and unable to write directly to main.
- Implement and verify one coherent passing state.

HANDOFF AND MERGE
- Open draft only if unresolved work, dependencies, changesets, or integration remain.
- A complete coherent PR may open ready.
- Link the claim and include Closes #<claim>.
- List outcome, semantic regions, dependencies, files, protected state, outputs,
  validation, and blockers.
- The integrator may rebuild stale work and mark a passing PR ready, but must notify
  the user and stop before merge.
- Merge only after explicit user approval for the specific PR and unchanged head;
  any new commit requires a new notice and fresh approval.
- Promotion, survey deployment, and release publication require separate authorized
  scope and gates.
```

## Canonical reading order

1. [`PROJECT-STATE.md`](PROJECT-STATE.md)
2. [`DOCTRINE.md`](DOCTRINE.md)
3. [`GOVERNANCE.md`](GOVERNANCE.md)
4. [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md)
5. [`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md)
6. [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md)
7. [`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md)
8. [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md)
9. [`TESTING.md`](TESTING.md)
10. [`GIT-WORKFLOW.md`](GIT-WORKFLOW.md)
11. [`../../grammar/README.md`](../../grammar/README.md)
12. [`../../GRAMMAR-INDEX.md`](../../GRAMMAR-INDEX.md)
13. [`../research/CURRENT-RESEARCH-PROVENANCE.md`](../research/CURRENT-RESEARCH-PROVENANCE.md)

This reading order provides context. The task-routing table determines which files
must be inspected for a specific change.
