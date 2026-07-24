# Start here — mandatory project contract

Every human or automated agent must read this file in full before analyzing,
editing, generating, or reviewing repository work. The root
[`AGENTS.md`](../../AGENTS.md) exists only to force discovery of this contract.
A task prompt may narrow scope, but it must not silently override this file,
the canonical state owners below, or a newer accepted project decision.

Historical research, release notes, adjudication reports, old prompts, branch
descriptions, generated snapshots, and Git history preserve provenance. They
do not become current instructions merely because they are detailed.

## Current baseline

- runtime: **v0.5.216**
- current runtime labels / status notes: **133 / 133**
- construction workflow: **2 active / 131 workflow-archived**
- retired labels: **48**
- permanent UUID records: **181**
- completed expert adjudications: **44**
- pending expert adjudications: **137**
- `research_pending`: **79**
- promotion-ready constructions: **0**
- direct `boundary_ready` candidates: **1** (`AB30`)
- current AB30 candidate packet: **5 reviewed; 2 genuine; 3 false positives**
- AB30 corpus-readiness effect: **`partial_only`**
- active survey: **`YUE-JUDGMENT-PILOT-01` remains in collection**
- follow-up survey: **`followup-draft-v1` is non-deployable**

See [`PROJECT-STATE.md`](PROJECT-STATE.md) for the complete current snapshot.
Volatile counts and work order belong there; durable standards belong here.

## Mandatory agent contract

Before making a change, every agent must:

1. confirm the repository is `Vazhi/canto-span`;
2. update from current `main` and inspect open pull requests for overlapping files,
   state dimensions, generated outputs, or competing work orders;
3. create a new scoped branch from current `main`; do not reuse a stale or merged
   branch;
4. identify the task class using the routing table below;
5. read the required canonical files and the exact affected records;
6. state the authorized scope, protected files, canonical inputs, generated
   outputs, and required checks before broadening the task;
7. preserve the separation among identity, ontology, linguistic status, runtime
   behavior, workflow state, discovery readiness, and learner presentation;
8. implement one coherent passing state rather than an intentionally incomplete
   state that another commit, bot, or agent must repair;
9. open a draft pull request with scope, decisions, changed files, explicit
   exclusions, verification, and unresolved issues;
10. leave merging, status promotion, survey deployment, and release publication
    to an explicit reviewed action.

When a task prompt conflicts with current repository policy, follow current policy
and document the conflict. When two canonical owners genuinely disagree outside
an explicitly recorded migration boundary, reconciliation is part of the task and
the branch must not claim completion before it is resolved.

## Authority and state ownership

Use the narrowest relevant canonical owner. No single registry owns every state
dimension.

| State dimension | Canonical owner | Important consequence |
|---|---|---|
| Permanent UUID and short code | [`data/construction-identities.json`](../../data/construction-identities.json) and [`data/construction-identity-lock.json`](../../data/construction-identity-lock.json) | UUIDs and assigned codes never change or return to the pool. |
| Current ontology | Accepted UUID-keyed records in [`data/construction-adjudications.json`](../../data/construction-adjudications.json) and [`data/construction-adjudication-batches/`](../../data/construction-adjudication-batches/) | Canonical name, family, profile, and claim layer may change without silently changing runtime or status. |
| Current linguistic status and note-local evidence | Exactly one active note under [`grammar/<status>/`](../../grammar/) | A recommendation or passing test does not move status. |
| Actual parser behavior | [`main.js`](../../main.js) and executable [`tests/`](../../tests/) | Tests prove implementation behavior only. |
| Workflow activity | Grammar-note frontmatter | `archived` means parked, not retired. |
| Discovery readiness | [`data/construction-candidate-readiness.json`](../../data/construction-candidate-readiness.json) and deterministic generated reports | Scores rank work; they never promote. |
| Native-panel and survey evidence | [`review-packets/native-panel/active-v2/`](../../review-packets/native-panel/active-v2/) | Evidence is role-neutral and counted per critical item. |
| Corpus candidate extraction and review | Construction-specific packet plus its workbench and decision ledger | Extraction is mechanical; expert classification is separate. |
| Learner presentation | Learner-facing labels and explanations | Presentation labels are not durable identities or evidence. |
| Historical provenance | [`docs/research/`](../research/), `archive/`, immutable batch reports, and Git history | Historical text cannot override current policy or resurrect superseded names. |

An accepted adjudication may supersede an older name or claim-layer description
while the legacy runtime label, note filename, status folder, and matcher remain
unchanged. Such boundaries must be explicit. Runtime-label migration,
status-path migration, matcher changes, fixture changes, new UUID allocation,
retirement, promotion, and release are separate scoped actions.

## Non-negotiable standards

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
- A narrow subtype, wrapper, predecessor, retired record, runtime alias, or shared
  vocabulary never donates evidence automatically to another UUID.
- Publication attestation alone cannot overcome contradictory naturalness data.
  Freeze disputed scope until independent sources, controlled contrasts,
  variation factors, negative boundaries, competing analyses, and role-neutral
  evidence are reviewed.
- Do not invent dialect, register, pragmatic, or contextual explanations to
  reconcile conflict.

Read [`DOCTRINE.md`](DOCTRINE.md),
[`GOVERNANCE.md`](GOVERNANCE.md), and
[`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md).

### Identity, ontology, and naming

- Use `construction_code + canonical_name` in all new analysis.
- Include the legacy runtime label separately when discussing code, tests, current
  note paths, serialized compatibility, or migration.
- Never use a runtime alias, note filename, learner label, survey-local alias, or
  historical report title as the durable construction key.
- A clarification or narrowing normally retains its UUID. A true split requires
  new collision-checked UUIDs, new codes when canonicalized, and explicit
  predecessor/successor links.
- Earlier accepted adjudication batches are immutable. Corrections require a later
  superseding decision.
- New survey or corpus item identifiers must use the current canonical scheme.
  Tool-local or legacy identifiers require an explicit checked crosswalk; never
  create an unlinked parallel naming system.

Read [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md) and
[`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md).

### Parser integrity

- Never insert hidden subjects, objects, nouns, resources, propositions, results,
  activities, connectives, or semantic roles.
- Preserve ambiguity, incomplete spans, lexical restrictions, and unknown
  material when evidence does not support a unique analysis.
- Internal wrappers, fallbacks, compatibility aliases, and diagnostics cannot
  license an evidence-gated construction or broaden a supported subtype.
- A construction consuming a valid NP does not inherit unrestricted claims about
  aspect, object omission, selection, productivity, or the NP's internal analysis.
- Negative and boundary cases remain executable.
- Shared structural subsystems require pattern-level grounding and unseen lexical
  combinations, but their success remains implementation evidence.

### Corpus work

- Use an explicit checked-in source allowlist; do not silently search the entire
  repository as evidence.
- Exclude fixtures, generated diagnostics, surveys, grammar examples,
  documentation quotations, adjudication records, synthetic tests, and derived
  duplicates unless the task explicitly concerns those artifacts.
- Preserve stable candidate IDs, exact text, matched span, source location,
  context, content hash, duplicate group, and all provenance.
- Every candidate used as evidence must be classified as `genuine`,
  `false_positive`, `ambiguous`, or `unusable`; totals must account for the full
  candidate inventory.
- Frequency and extraction do not establish membership or readiness.
- A completed small packet may have `partial_only` effect when source diversity is
  insufficient.

For AB30, read [`tools/corpus-review/README.md`](../../tools/corpus-review/README.md),
the canonical extraction ledger, and
[`review-decisions-r1.json`](../../review-packets/corpus-review/AB30/review-decisions-r1.json).

### Native panel and surveys

- All eligible respondents belong to one anonymized role-neutral panel. No spouse,
  named reviewer, private respondent, expert, or recruitment channel receives
  special weight.
- The evidence unit is one usable adjudicated judgment on one critical item.
  Total submissions cannot replace minimum item-level coverage.
- `provisional` requires at least 10 usable judgments per critical positive and
  boundary item from one clean role-neutral instrument.
- `supported_productive` requires at least 30 usable judgments per critical item
  from a locked clean instrument plus every non-panel gate.
- A pilot diagnoses instrument quality; it does not promote a construction.
- Do not edit a live locked instrument. A material wording, context, scale,
  filler, branching, or randomization change creates a new version.
- Semantic absurdity is not a grammatical boundary.
- Record eligibility, consent, assigned list, quality flags, duplicates,
  exclusions, reasons, per-item usable counts, and version state.
- Do not generate, deploy, or mark a follow-up instrument ready while its metadata
  says `deployment_allowed: false`.
- The current `YUE-JUDGMENT-PILOT-01` must close and receive an item audit before
  `followup-draft-v1` can be revised, locked, generated, or deployed.

Read [`review-packets/native-panel/active-v2/README.md`](../../review-packets/native-panel/active-v2/README.md),
`panel-policy.json`, `panel-review-state.json`, and the relevant instrument
metadata.

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
  the same branch.
- `validation/current/` contains verifier byproducts, not patch inputs. Restore
  them after verification when a clean tree is required.
- Do not create repeated `validation/vX.Y.Z/` trees.
- Documentation must not describe a stronger, broader, cleaner, or more advanced
  state than canonical inputs and runtime implement.

### Git, automation, releases, and packaging

- Start from current `main` on `agent/<description>`.
- Inspect open PRs before branching. Do not add work to another agent's branch or
  create overlapping changes without an explicit stack or handoff.
- Keep unrelated changes out of the branch.
- GitHub Actions is read-only verification and uses Node 24-compatible actions.
- Do not add branch-specific writer workflows, permanent commit-and-push
  automation, expected-failure commits, or bot repair commits.
- Do not use temporary automation merely because direct coherent editing is
  inconvenient. Any exceptional write automation requires explicit review and
  must not survive as project workflow.
- Use pull requests for `main`; open them as drafts unless the user explicitly
  requests otherwise.
- Runtime release ZIPs remain minimal: `main.js`, `manifest.json`, and
  `styles.css`. Research, validation, history, and recovery belong outside the
  runtime package.
- Status changes and releases require the release baseline and every applicable
  Definition-of-Done and verification gate.

Read [`GIT-WORKFLOW.md`](GIT-WORKFLOW.md) and [`TESTING.md`](TESTING.md).

## Task routing and required reading

| Task type | Required reading and canonical inputs | Minimum validation |
|---|---|---|
| Any repository task | This entire file; [`PROJECT-STATE.md`](PROJECT-STATE.md); open PRs; affected files | `git diff --check` plus task-specific checks |
| Linguistic research or status recommendation | Doctrine, Governance, Definition of Done, affected grammar note, source records, current provenance | `npm run verify:research`; `npm run verify` when current records change |
| Identity or ontology adjudication | Construction Identity, Construction Adjudication, affected registry record, runtime paths, tests, sources | Apply/regenerate workflow; adjudication, identity, discovery, core, and research checks |
| Runtime or parser behavior | Doctrine, canonical identity, affected status note, exact `main.js` path, tests | `npm test`; metadata sync when counts change; `npm run verify` |
| Corpus extraction or review | Governance, construction identity, workbench README, allowlist, ledger, existing decisions | Workbench tests; validate; render; `npm run verify:research` |
| Native panel or survey | Governance, Definition of Done, active-v2 README, panel policy/state, current instrument metadata | Instrument-specific verifier; `npm run verify:research`; never deploy a draft |
| Current documentation | Authority owners for every statement being updated | Documentation consistency; `npm run verify` |
| Status migration, release, or promotion | All above plus Definition of Done, Testing, Git Workflow, release baseline | `npm run verify:all` |
| Packaging or recovery | Git Workflow | package/export verifier and checksum |
| Mechanical tooling delegated to Codex | This file plus exact task owner and file boundary | Tool-specific tests and the checks for every touched canonical owner |

If a task spans multiple rows, satisfy every applicable row. Do not choose the
cheapest row.

## Multi-agent coordination workflow

### Before editing

1. Fetch current `main`, record its commit, and inspect open PRs.
2. Detect overlapping files, construction codes, survey IDs, generated outputs,
   and state dimensions.
3. Rebase or rebuild stale work before adding new changes. Do not preserve obsolete
   history merely to keep an old PR open.
4. Define:
   - intended outcome;
   - authorized files or directories;
   - explicitly protected files;
   - canonical inputs;
   - deterministic outputs;
   - evidence decisions reserved for expert review;
   - required validation.
5. Run a clean baseline when behavior, generated state, status, or release work is
   involved.

### During work

1. Read the exact affected grammar note, identity record, adjudication, runtime
   path, tests, source records, survey metadata, or corpus ledger.
2. Keep mechanical preparation separate from expert linguistic decisions.
3. Use existing schemas, names, IDs, ledgers, verifiers, and workflows.
4. When a local alias is unavoidable, add a checked crosswalk to the canonical
   identifier.
5. Change the canonical owner first and regenerate its deterministic products.
6. Do not silently broaden scope because another issue is nearby.
7. Report implementation findings separately from linguistic conclusions.
8. Preserve user data, review notes, exclusions, and provenance during
   regeneration or migration.

### Before opening the PR

1. Run the full applicable verification matrix.
2. Restore noncanonical verifier byproducts.
3. Confirm the diff contains no temporary workflow, staging archive, generated
   validation noise, unrelated file, stale branch name, or superseded work order.
4. Confirm current documentation agrees with the changed canonical owners.
5. Open a draft PR containing:
   - outcome and scope;
   - decisions and evidence basis;
   - every changed file;
   - protected or explicitly unchanged areas;
   - generated outputs;
   - exact validation commands and results;
   - unresolved blockers and next action.
6. Do not claim readiness, completion, promotion, deployment, or release beyond
   what the canonical records support.

## Verification matrix

Always run `git diff --check`.

### Documentation-only coordination or policy

```bash
node tools/verify-documentation-consistency.js \
  --output validation/current/documentation-consistency.json
npm run verify
```

Add `npm run verify:research` when research, corpus, panel, survey, or evidence
workflow documentation changes.

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

- work from an unrefreshed branch when `main` or overlapping PRs have changed;
- reuse another agent's branch without explicit stacking or handoff;
- create new canonical names, survey IDs, corpus IDs, or local aliases without
  resolving them to existing permanent identities and schemes;
- use a legacy runtime label as the canonical construction name;
- classify a wrapper, fallback, alias, diagnostic, or parser heuristic as a
  productive Cantonese construction;
- infer linguistic support from parser behavior, fixtures, generated probes,
  frequency, or test success;
- transfer evidence automatically across an umbrella, predecessor, retired record,
  sibling profile, or split;
- promote from one respondent, a defective pilot, a small corpus packet, raw
  counts, or a readiness score;
- give a named respondent special evidentiary status;
- edit a live locked survey or deploy a draft instrument;
- overwrite reviewed corpus or panel decisions during regeneration;
- add generated `validation/current/` output to a normal PR;
- create a parallel ledger, duplicate verifier family, release-specific snapshot
  tree, or second current-state document;
- add a permanent automatic writer, branch-specific workflow, expected-failure
  commit, or repair-bot sequence;
- mix runtime, status, identity, survey, release, and unrelated cleanup changes
  without an explicit coherent scope;
- merge its own draft PR or delete evidence solely because it is incomplete.

## Reusable agent task prompt

Use this prompt for Codex or another implementation agent. Replace every bracketed
field. Do not paste old project-wide instructions from historical prompts; this
file is the current contract.

```text
Work autonomously in the GitHub repository Vazhi/canto-span.

MANDATORY BOOTSTRAP
1. Read AGENTS.md and docs/current/00-START-HERE.md in full before planning or editing.
2. Read every file required by the task-routing row for this task.
3. Sync from current main, record the base commit, and inspect open PRs for overlap.
4. Follow current canonical records over historical reports, old prompts, branch
   descriptions, runtime aliases, or generated summaries.

TASK
Outcome: [one bounded result]
Task class: [routing-table row or rows]
Authorized scope: [files/directories or exact state dimensions]
Protected scope: [files/state dimensions that must not change]
Canonical inputs: [records that own the truth]
Required deliverables: [specific files, tests, reports, or PR]
Reserved expert decisions: [linguistic/status/identity decisions the agent must not make]
Required validation: [commands from the verification matrix]

EXECUTION RULES
- Use permanent construction codes and canonical names; record legacy aliases separately.
- Reuse existing schemas, IDs, crosswalks, ledgers, and verifiers.
- Do not create a parallel naming scheme, current-state record, verifier family, or workflow.
- Do not treat tests, parser output, corpus frequency, generated probes, or a pilot
  as independent linguistic evidence.
- Do not change runtime, status, readiness, identity, survey deployment, release,
  or generated outputs unless they are explicitly authorized and coherently updated.
- Keep mechanical preparation separate from expert adjudication.
- Preserve all review decisions, exclusions, provenance, and user data.
- Do not add temporary or permanent commit-and-push automation.
- Implement and verify one coherent passing state; do not publish an expected failure.
- If current main or an overlapping PR invalidates the plan, rebase or rebuild before continuing.
- Do not stop at a plan when the authorized task can be completed safely.

HANDOFF
Open a draft PR to main. Its body must list:
- outcome and scope;
- decisions and evidence basis;
- every changed file;
- explicitly unchanged or protected areas;
- generated outputs;
- exact validation commands and results;
- unresolved blockers and the next logical action.

Do not merge the PR.
```

A task-specific prompt should add concrete scope and deliverables, not repeat or
weaken the project contract.

## Canonical reading order

1. [`PROJECT-STATE.md`](PROJECT-STATE.md)
2. [`DOCTRINE.md`](DOCTRINE.md)
3. [`GOVERNANCE.md`](GOVERNANCE.md)
4. [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md)
5. [`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md)
6. [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md)
7. [`TESTING.md`](TESTING.md)
8. [`GIT-WORKFLOW.md`](GIT-WORKFLOW.md)
9. [`../../grammar/README.md`](../../grammar/README.md)
10. [`../../GRAMMAR-INDEX.md`](../../GRAMMAR-INDEX.md)
11. [`../research/CURRENT-RESEARCH-PROVENANCE.md`](../research/CURRENT-RESEARCH-PROVENANCE.md)

This reading order provides context. The task-routing table determines which files
must be inspected for a specific change.
