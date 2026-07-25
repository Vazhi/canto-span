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
2. update from current `main` and inspect open pull requests and open work-claim
   issues for overlapping semantic regions, state dimensions, generated outputs,
   parked identities, or competing work orders;
3. create or update one semantic work-claim issue using
   [`.github/ISSUE_TEMPLATE/work-claim.yml`](../../.github/ISSUE_TEMPLATE/work-claim.yml);
4. read [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md), choose the
   smallest adequate shared or exclusive targets, and declare any generated or
   integration-owned outputs;
5. create the exact new `agent/<description>` branch named in the claim; do not reuse
   a stale or merged branch;
6. identify the task class using the routing table below;
7. read the required canonical files and exact affected records;
8. state authorized scope, protected state, canonical inputs, generated outputs,
   reserved expert decisions, and required checks before broadening the task;
9. preserve the separation among identity, ontology, linguistic status, runtime
   behavior, workflow availability, discovery readiness, learner presentation,
   and temporary coordination intent;
10. implement one coherent passing state rather than an intentionally incomplete
    state that another commit, bot, or agent must repair;
11. open a draft pull request using
    [`.github/pull_request_template.md`](../../.github/pull_request_template.md),
    link the work claim, and include `Closes #<claim>`;
12. leave status promotion, survey deployment, release publication, and unreviewed
    merge decisions to an explicit reviewed action.

When a task prompt conflicts with current repository policy, follow current policy
and document the conflict. When canonical owners disagree outside an explicitly
recorded migration boundary, reconciliation is part of the task and the branch
must not claim completion before it is resolved.

## Authority and state ownership

Use the narrowest relevant canonical owner. No single registry owns every state
dimension.

| State dimension | Canonical owner | Important consequence |
|---|---|---|
| Permanent UUID and short code | [`data/construction-identities.json`](../../data/construction-identities.json) and [`data/construction-identity-lock.json`](../../data/construction-identity-lock.json) | UUIDs and assigned codes never change or return to the pool. |
| Current ontology | Accepted UUID-keyed records in [`data/construction-adjudications.json`](../../data/construction-adjudications.json) and [`data/construction-adjudication-batches/`](../../data/construction-adjudication-batches/) | Canonical name, family, profile, and claim layer may change without silently changing runtime or status. |
| Current linguistic status and note-local evidence | Exactly one current note under [`grammar/<status>/`](../../grammar/) for each active runtime label | A recommendation or passing test does not move status. |
| Actual parser behavior | [`main.js`](../../main.js) and executable [`tests/`](../../tests/) | Tests prove implementation behavior only. |
| Workflow availability | [`data/parked-constructions.json`](../../data/parked-constructions.json) | Every unlisted current construction is available; the file is a blacklist, not a queue. |
| Concurrent work intent | Open GitHub work-claim issues conforming to [`schemas/work-claim.schema.json`](../../schemas/work-claim.schema.json) | Claims coordinate temporary semantic scope only; they do not change project state. |
| Coordination path policy | [`config/coordination-targets.json`](../../config/coordination-targets.json) | Exclusive and integration-owned files require the configured claim mode and role. |
| Discovery readiness | [`data/construction-candidate-readiness.json`](../../data/construction-candidate-readiness.json) and deterministic generated reports | Scores rank work; they never promote or prohibit work. |
| Native-panel and survey evidence | [`review-packets/native-panel/active-v2/`](../../review-packets/native-panel/active-v2/) | Evidence is role-neutral and counted per critical item. |
| Corpus candidate extraction and review | Construction-specific packet plus its workbench and decision ledger | Extraction is mechanical; expert classification is separate. |
| Learner presentation | Learner-facing labels and explanations | Presentation labels are not durable identities or evidence. |
| Historical provenance | [`docs/research/`](../research/), `archive/`, immutable batch reports, and Git history | Historical text cannot override current policy or resurrect superseded names. |

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

Agents must select the work with the greatest expected project benefit after
considering learner impact, parser harm, evidence gaps, source accessibility,
ontology risk, dependencies, survey or corpus opportunities, current `main`, open
pull requests, open work claims, and the cost of leaving the issue unresolved.
Generated readiness ranks may inform this choice, but they are neither a whitelist
nor a mandatory queue.

A parked construction must not be worked on silently. When it appears to be the
best next target, **recommend unpark** and state the existing reason, why it no
longer controls, expected benefit, changed evidence or dependency, and the proposed
bounded safeguards. The item remains parked until a reviewed change removes it.

Removing the blanket freeze does not remove substantive gates. A new construction,
split, broadening, status transition, or runtime change still requires the
applicable identity, external evidence, boundaries, tests, documentation,
promotion rules, and verification.

### Semantic work claims and same-file concurrency

**Semantic work claims** are mandatory before editing. Read
[`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md),
[`schemas/work-claim.schema.json`](../../schemas/work-claim.schema.json), and
[`config/coordination-targets.json`](../../config/coordination-targets.json).

- Claims reserve semantic regions, not merely filenames.
- Shared claims may touch the same physical file only when their regions are
  disjoint, such as separate construction records, functions, headings, item
  ranges, or JSON Pointers.
- The same semantic region cannot be claimed concurrently.
- Repository-wide policy, schemas, workflows, verification orchestration, and
  configured exclusive paths require an exclusive claim.
- Workers must not finalize integration-owned aggregate or current-state files.
  They declare those outputs; an integrator reconciles them once after canonical
  inputs are combined.
- High-contention edits may be expressed as branch-local declarative changesets
  under [`changes/pending/`](../../changes/pending/) using
  [`schemas/change-set.schema.json`](../../schemas/change-set.schema.json).
- Every changeset operation requires an explicit precondition. A failed
  precondition stops application instead of overwriting newer work.
- Draft pull requests may contain validated pending changesets. A ready-to-merge
  pull request may not contain a pending JSON file; the integrator must apply or
  reject it and delete it on the branch first.
- The pull request must link one open claim, use the branch named in that claim,
  cover every changed file, and close the issue on merge.
- [`.github/workflows/coordination-check.yml`](../../.github/workflows/coordination-check.yml)
  is read-only. It validates claims, expiry, branch, changed-file coverage,
  exclusive paths, integration ownership, pending-file readiness, and overlap.

Work claims and changesets are temporary coordination records. They do not provide
linguistic evidence and do not authorize status, runtime, survey, or release
changes.

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
- Include the legacy runtime label separately when discussing code, tests, current
  note paths, serialized compatibility, or migration.
- Never use a runtime alias, note filename, learner label, survey-local alias,
  work ID, or historical report title as the durable construction key.
- A clarification or narrowing normally retains its UUID. A true split requires
  new collision-checked UUIDs, new codes when canonicalized, and explicit
  predecessor/successor links.
- Earlier accepted adjudication batches are immutable. Corrections require a later
  superseding decision.
- New survey or corpus item identifiers must use the current canonical scheme.
  Tool-local aliases require an explicit checked crosswalk.

Read [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md) and
[`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md).

### Parser integrity

- Never insert hidden subjects, objects, nouns, resources, propositions, results,
  activities, connectives, or semantic roles.
- Preserve ambiguity, incomplete spans, lexical restrictions, and unknown material
  when evidence does not support a unique analysis.
- Internal wrappers, fallbacks, compatibility aliases, and diagnostics cannot
  license an evidence-gated construction or broaden a supported subtype.
- A construction consuming a valid NP does not inherit unrestricted claims about
  aspect, object omission, selection, productivity, or the NP's internal analysis.
- Negative and boundary cases remain executable.
- Shared structural subsystems require pattern-level grounding and unseen lexical
  combinations, but success remains implementation evidence.

### Corpus work

- Use an explicit checked-in source allowlist; do not silently search the entire
  repository as evidence.
- Exclude fixtures, generated diagnostics, surveys, grammar examples,
  documentation quotations, adjudication records, synthetic tests, and derived
  duplicates unless the task explicitly concerns those artifacts.
- Preserve stable candidate IDs, exact text, matched span, source location,
  context, content hash, duplicate group, and provenance.
- Classify every candidate used as evidence as `genuine`, `false_positive`,
  `ambiguous`, or `unusable`; totals must account for the full inventory.
- Frequency and extraction do not establish membership or readiness.
- A completed small packet may have `partial_only` effect when source diversity is
  insufficient.

For AB30, read [`tools/corpus-review/README.md`](../../tools/corpus-review/README.md),
the canonical extraction ledger, and
[`review-decisions-r1.json`](../../review-packets/corpus-review/AB30/review-decisions-r1.json).

### Native panel and surveys

- All eligible respondents belong to one anonymized role-neutral panel. **No spouse**,
  named reviewer, private respondent, expert, or recruitment channel receives
  special weight.
- The evidence unit is one usable adjudicated judgment on one critical item.
  Total submissions cannot replace minimum item-level coverage.
- `provisional` requires at least 10 usable judgments per critical positive and
  boundary item from one clean role-neutral instrument.
- `supported_productive` requires at least 30 usable judgments per critical item
  from a locked clean instrument plus every non-panel gate.
- A pilot diagnoses instrument quality; it does not promote a construction.
- Do not edit a live locked instrument. A material wording, context, scale, filler,
  branching, or randomization change creates a new version.
- Semantic absurdity is not a grammatical boundary.
- Record eligibility, consent, assigned list, quality flags, duplicates,
  exclusions, reasons, per-item usable counts, and version state.
- Do not deploy or mark a follow-up instrument ready while its metadata says
  `deployment_allowed: false`.
- The current `YUE-JUDGMENT-PILOT-01` must close and receive an item audit before
  `followup-draft-v1` can be locked, deployed, or treated as final evidence.
  Preparatory drafting and technical testing must not alter the live instrument.

Read [`review-packets/native-panel/active-v2/README.md`](../../review-packets/native-panel/active-v2/README.md),
`panel-policy.json`, `panel-review-state.json`, and relevant instrument metadata.

### Documentation and generated records

- Current policy lives under `docs/current/`. Update this file whenever a durable
  project-wide standard, authority, required workflow, or agent rule changes.
- `PROJECT-STATE.md` owns the concise present-tense snapshot and work order.
- Historical reports remain immutable provenance; do not rewrite them to look
  current.
- Prefer one canonical record and one verifier per responsibility. Do not create
  parallel ledgers, duplicate current-state summaries, release-specific verifier
  families, or alternative workflow registries.
- Edit canonical inputs first, then regenerate checked-in deterministic outputs in
  the same branch or integration step.
- `validation/current/` contains verifier byproducts, not patch inputs. Restore them
  after verification when a clean tree is required.
- Do not create repeated `validation/vX.Y.Z/` trees.
- Documentation must not describe a stronger, broader, cleaner, or more advanced
  state than canonical inputs and runtime implement.

### Git, automation, releases, and packaging

- Start from current `main` on the branch named in an open work-claim issue.
- Inspect open PRs and claims before branching. Do not add work to another agent's
  branch or create overlapping semantic changes without an explicit integration
  plan.
- Keep unrelated changes out of the branch and claim.
- GitHub Actions is read-only verification and uses Node 24-compatible actions.
- Do not add branch-specific writer workflows, permanent commit-and-push
  automation, expected-failure commits, repair bots, post-merge cleanup bots, or
  automatic merging.
- Use pull requests for `main`; open them as drafts unless the user explicitly
  requests otherwise.
- Runtime release ZIPs remain minimal: `main.js`, `manifest.json`, and `styles.css`.
  Research, validation, history, and recovery belong outside the runtime package.
- Status changes and releases require the release baseline and every applicable
  Definition-of-Done and verification gate.

Read [`GIT-WORKFLOW.md`](GIT-WORKFLOW.md), [`TESTING.md`](TESTING.md), and
[`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md).

## Task routing and required reading

| Task type | Required reading and canonical inputs | Minimum validation |
|---|---|---|
| Any repository task | This entire file; `PROJECT-STATE.md`; `MULTI-AGENT-COORDINATION.md`; open PRs and claims; affected files; parked registry | coordination workflow; `git diff --check`; task-specific checks |
| Concurrent work, work claims, changesets, or high-contention files | Coordination doc; work-claim issue; coordination config and schemas; active overlapping claims | `npm run verify:coordination`; PR coordination workflow; `npm run verify` when current policy changes |
| Work selection, parking, or unparking | Doctrine, Governance, parked registry, permanent identity, readiness records, open work | `node tools/verify-parked-constructions.js`; `npm run verify` |
| Linguistic research or status recommendation | Doctrine, Governance, Definition of Done, affected grammar note, source records, current provenance | `npm run verify:research`; `npm run verify` when current records change |
| Identity or ontology adjudication | Construction Identity, Construction Adjudication, affected registry record, runtime paths, tests, sources | apply/regenerate workflow; adjudication, identity, discovery, core, and research checks |
| Runtime or parser behavior | Doctrine, canonical identity, affected status note, exact `main.js` path, tests | `npm test`; metadata sync when counts change; `npm run verify` |
| Corpus extraction or review | Governance, construction identity, workbench README, allowlist, ledger, decisions | workbench tests; validate; render; `npm run verify:research` |
| Native panel or survey | Governance, Definition of Done, active-v2 README, panel policy/state, instrument metadata | instrument-specific verifier; `npm run verify:research`; never deploy a draft |
| Current documentation | Authority owners for every statement being updated | documentation consistency; `npm run verify` |
| Status migration, release, or promotion | All above plus Definition of Done, Testing, Git Workflow, release baseline | `npm run verify:all` |
| Packaging or recovery | Git Workflow | package/export verifier and checksum |
| Mechanical tooling delegated to Codex | This file plus exact task owner and file boundary | tool-specific tests and checks for every touched canonical owner |

If a task spans multiple rows, satisfy every applicable row. Do not choose the
cheapest row.

## Multi-agent coordination workflow

### Before editing

1. Fetch current `main` and record its commit.
2. Inspect open pull requests and open work-claim issues.
3. Detect overlapping construction codes, file regions, functions, headings, JSON
   records, surveys, corpus packets, generated outputs, parked identities, and state
   dimensions.
4. Create or update one work claim. Use shared mode for genuinely disjoint semantic
   regions and exclusive mode for configured exclusive paths or indivisible scope.
5. Declare `integration_role: integrator` only when the task will reconcile
   integration-owned files.
6. Create the exact branch named in the claim.
7. Rebase or rebuild stale work before adding changes. Do not preserve obsolete
   history merely to keep an old PR open.
8. Define authorized scope, protected files and state, canonical inputs,
   deterministic outputs, reserved expert decisions, dependencies, and validation.
9. Run a clean baseline when behavior, generated state, status, or release work is
   involved.

### During work

1. Read the exact affected note, identity record, adjudication, runtime path, tests,
   source records, survey metadata, corpus ledger, parked record, and claim.
2. Keep mechanical preparation separate from expert linguistic decisions.
3. Use existing schemas, names, IDs, ledgers, verifiers, workflows, and semantic
   region conventions.
4. Update the claim before expanding scope.
5. When a local alias is unavoidable, add a checked crosswalk.
6. Change canonical owners first. Workers declare integration-owned consequences;
   integrators regenerate and reconcile them once.
7. Use a preconditioned changeset under `changes/pending/` when direct editing of a
   high-contention file would be unsafe.
8. Do not silently broaden scope because another issue is nearby.
9. Preserve user data, review notes, exclusions, and provenance.
10. Do not treat legacy note workflow fields or work claims as linguistic authority.

### Before opening or readying the PR

1. Run the full applicable verification matrix.
2. Restore noncanonical verifier byproducts.
3. Confirm every changed file is covered by the claim.
4. Confirm the diff contains no temporary workflow, staging archive, generated
   validation noise, unrelated file, stale branch name, or superseded work order.
5. Confirm current documentation agrees with changed canonical owners.
6. Open the PR as a draft with the claim marker, visible issue link, and
   `Closes #<claim>`.
7. List outcome, semantic regions, claim mode, integration role, dependencies,
   changed files, protected scope, generated outputs, validation, and blockers.
8. Before marking ready, apply or reject every pending changeset, delete its JSON
   file, regenerate shared outputs, and rerun checks.
9. Do not claim readiness, promotion, deployment, or release beyond canonical state.

## Verification matrix

Always run `git diff --check`.

### Work claims and concurrent files

```bash
npm run verify:coordination
npm run verify
```

The read-only `Coordination claim` workflow additionally validates the live GitHub
claim, branch, expiry, changed files, active overlaps, exclusive paths,
integration-owned paths, and draft/ready changeset rules.

Validate or dry-run a pending changeset with:

```bash
npm run changes:validate -- changes/pending/CS-WORK-0000.json
node tools/coordination/change-set.js apply changes/pending/CS-WORK-0000.json
```

### Documentation-only coordination or policy

```bash
node tools/verify-documentation-consistency.js \
  --output validation/current/documentation-consistency.json
npm run verify
```

Add `npm run verify:research` when research, corpus, panel, survey, or evidence
workflow documentation changes.

### Parking or unparking

```bash
node tools/verify-parked-constructions.js
npm run verify
```

Parking or unparking changes workflow availability only. It must not silently
change status, runtime, identity, evidence, readiness, or retirement.

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

Apply, regenerate, verify, and commit one coherent state. Never publish the raw
batch first.

### Runtime or tests

```bash
npm test
node tools/sync-construction-test-metadata.js  # when construction counts change
npm run verify
```

Add research or release profiles when the task also changes evidence, status, or
release state.

### Corpus workbench

```bash
node tools/corpus-review/cli.js inventory
node tools/corpus-review/cli.js extract
node tools/corpus-review/cli.js validate
node tools/corpus-review/cli.js render
node --test tests/tooling/corpus-review/*.test.js
npm run verify:research
```

Do not rerun extraction over reviewed work unless the tool guarantees preservation
of every nonblank review field and refuses destructive removal.

### Survey or panel work

Run the instrument-specific verifier, then:

```bash
npm run verify:research
npm run verify
```

For `followup-draft-v1`:

```bash
node tools/verify-native-followup-draft.js
```

### Status transition or release

Create the reviewed baseline first, then run:

```bash
npm run release:baseline -- <current-version>
npm run verify:all
```

## Forbidden patterns

An agent must not:

- edit before creating or renewing its work-claim issue;
- work from an unrefreshed branch when `main`, an overlapping PR, or an active claim
  has changed;
- reuse another agent's branch without explicit integration handoff;
- claim an entire shared file when a stable semantic region can be named;
- allow two active claims to cover the same semantic region;
- use shared mode for a configured exclusive path;
- let a worker finalize an integration-owned file;
- mark a PR ready while a JSON file remains under `changes/pending/`;
- treat a work claim, changeset, grammar-note workflow field, readiness score, or
  parser test as linguistic evidence;
- work silently on a construction listed in `data/parked-constructions.json`;
- recreate a blanket grammar freeze, active-note whitelist, or mandatory readiness
  queue;
- create new canonical names, survey IDs, corpus IDs, or aliases without resolving
  them to permanent identities and schemes;
- use a legacy runtime label as the canonical construction name;
- classify a wrapper, fallback, alias, diagnostic, or parser heuristic as a
  productive Cantonese construction;
- transfer evidence automatically across an umbrella, predecessor, retired record,
  sibling profile, or split;
- promote from one respondent, a defective pilot, a small corpus packet, raw counts,
  or a readiness score;
- give a named respondent special evidentiary status;
- edit a live locked survey or deploy a draft instrument;
- overwrite reviewed corpus or panel decisions during regeneration;
- add generated `validation/current/` output to a normal PR;
- create a parallel ledger, duplicate verifier family, release-specific snapshot
  tree, second current-state document, or second coordination registry;
- add an automatic writer, branch-specific workflow, expected-failure commit,
  repair bot, cleanup bot, or unreviewed automatic merge;
- mix runtime, status, identity, survey, release, and unrelated cleanup changes
  without coherent scope;
- delete incomplete evidence solely to make a gate pass.

## Reusable agent task prompt

Use this prompt for Codex or another implementation agent. Replace every bracketed
field. Do not paste historical project-wide instructions; this file is the current
contract.

```text
Work autonomously in the GitHub repository Vazhi/canto-span.

MANDATORY BOOTSTRAP
1. Read AGENTS.md, docs/current/00-START-HERE.md, and
   docs/current/MULTI-AGENT-COORDINATION.md in full.
2. Read every file required by the task-routing row.
3. Sync from current main and inspect open PRs plus open work-claim issues.
4. Create or update one work-claim issue before editing. Declare work ID, claim
   mode, integration role, exact branch, expiry, semantic targets and regions,
   generated outputs, protected state, dependencies, and one bounded summary.
5. Create the exact agent/<description> branch named in the claim.
6. Read data/parked-constructions.json. All unlisted constructions are available;
   recommend and review unpark before working on a listed item.
7. Follow current canonical records over historical reports, prompts, branch
   descriptions, runtime aliases, legacy workflow fields, claims, or generated
   summaries.

TASK
Outcome: [one bounded result]
Task class: [routing-table row or rows]
Authorized scope: [semantic targets and files]
Protected scope: [files and state dimensions]
Canonical inputs: [records that own the truth]
Generated outputs: [outputs requiring integration]
Reserved expert decisions: [decisions the agent must not make]
Required validation: [commands from the verification matrix]

EXECUTION RULES
- Choose the highest-benefit bounded available task when none is named.
- There is no active-note whitelist and no repository-wide grammar freeze.
- If a parked item is best, recommend unpark before work.
- Shared claims may touch the same file only in disjoint semantic regions.
- Use exclusive mode for configured exclusive paths.
- Workers do not finalize integration-owned files.
- Use preconditioned branch-local changesets for unsafe high-contention edits.
- Update the claim before expanding scope.
- Use permanent construction codes and canonical names; record aliases separately.
- Reuse existing schemas, IDs, crosswalks, ledgers, and verifiers.
- Do not treat tests, parser output, corpus frequency, generated probes, claims,
  changesets, or a pilot as independent linguistic evidence.
- Preserve review decisions, exclusions, provenance, and user data.
- Do not add automatic commit, push, merge, repair, or cleanup writers.
- Implement and verify one coherent passing state; do not publish an expected failure.
- Rebase or rebuild if current main or an overlapping merge invalidates the plan.

HANDOFF
Open a draft PR to main using .github/pull_request_template.md. Include:
<!-- coordination-claim: #ISSUE_NUMBER -->
Work claim: #ISSUE_NUMBER
Closes #ISSUE_NUMBER

List outcome, semantic regions, claim mode, integration role, dependencies, changed
files, protected scope, generated outputs, exact validation, unresolved blockers,
and next action. Remove every changes/pending/*.json file before marking ready.

Do not merge the PR unless acting as the explicitly authorized integration manager.
```

A task-specific prompt should add concrete scope and deliverables, not repeat or
weaken the project contract.

## Canonical reading order

1. [`PROJECT-STATE.md`](PROJECT-STATE.md)
2. [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md)
3. [`DOCTRINE.md`](DOCTRINE.md)
4. [`GOVERNANCE.md`](GOVERNANCE.md)
5. [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md)
6. [`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md)
7. [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md)
8. [`TESTING.md`](TESTING.md)
9. [`GIT-WORKFLOW.md`](GIT-WORKFLOW.md)
10. [`../../grammar/README.md`](../../grammar/README.md)
11. [`../../GRAMMAR-INDEX.md`](../../GRAMMAR-INDEX.md)
12. [`../research/CURRENT-RESEARCH-PROVENANCE.md`](../research/CURRENT-RESEARCH-PROVENANCE.md)

This reading order provides context. The task-routing table determines which files
must be inspected for a specific change.
