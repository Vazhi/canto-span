# Git workflow and recovery

GitHub `main` is the durable shared project record. A user-controlled local clone is
the preferred working copy; a full `.git` export is an offline recovery and transfer
artifact, not a parallel source of truth.

The mandatory project-wide contract is [`00-START-HERE.md`](00-START-HERE.md). The
concurrency protocol is [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md).
Per-pull-request merge authorization is governed by
[`USER-MERGE-REVIEW.md`](USER-MERGE-REVIEW.md).

## Multi-agent branch coordination

Before creating a branch:

1. fetch current `main` and record the base commit;
2. inspect open pull requests and open work claims;
3. create or update one semantic work claim;
4. use the exact `agent/<description>` branch named in the claim;
5. define semantic regions, role, dependencies, protected state, canonical inputs,
   generated outputs, and required verification;
6. rebuild stale work before adding changes.

The same physical file may be touched by multiple branches when their semantic
regions are disjoint. Do not push work onto another agent's branch unless an
integration or stacked-PR relationship is documented. Do not preserve obsolete
branch history merely to keep an old PR open.

## Branch and commit rule

- Begin scoped work from current `main` on the branch named in the claim.
- Keep unrelated changes outside the branch and claim.
- Commit coherent states, not every mechanical edit.
- Regenerate deterministic outputs and run applicable checks before ready state.
- Do not publish a state that introduces a new unique regression, turns a previously
  passing case red, weakens protected behavior, or hides a failure by weakening the
  test system. When the base commit already contains known regression debt, the
  branch may retain that debt only under the set-based ratchet in `TESTING.md`.
- Use pull requests for changes to `main`.
- Use draft state only while work, pending changesets, dependencies, or integration
  remain unresolved. A complete coherent PR may open ready.
- Squash merge when mechanical branch history represents one coherent final change.

There is no read-only research branch type. Research may continue directly into
evidence records, adjudication, runtime implementation, tests, and documentation
when one claim covers the affected state dimensions and the applicable gates pass.

## Pull-request handoff and merge

Every PR identifies:

- work claim and work ID;
- intended outcome and semantic regions;
- base commit and exact head under review;
- worker or integrator role;
- canonical inputs and generated outputs;
- every changed file;
- protected or unchanged areas;
- decisions and evidence basis;
- validation commands and results;
- dependencies, blockers, and next action.

For any test scope with inherited failures, the validation record also identifies the
base failing-case set, post-change failing-case set, new unique failures, repaired
failures, and remaining explicit debt. Raw failure counts alone are insufficient when
failure identities change.

Workers may publish branches and PRs but do not finalize unresolved
integration-owned files. The authorized integrator may:

1. rebuild stale branches onto current `main`;
2. apply or reject pending changesets;
3. reconcile integration-owned files;
4. mark a complete PR ready;
5. verify checks, dependencies, mergeability, and exact head SHA;
6. notify the user with the PR, exact head, scope, validation, risks, and limitations,
   then stop without merging;
7. after explicit approval for that PR and unchanged head, re-check the gates and
   merge in dependency order.

Status promotion, survey deployment, and release publication still require their
own explicitly authorized scope and gates.

## Documentation and generated records

Current documentation follows the authority order in `00-START-HERE.md`. Update
canonical inputs and deterministic generated outputs in the same branch or
integration step. Historical reports remain immutable provenance.

For adjudication work:

```bash
npm run adjudication:apply
npm run identity:generate
npm run discovery:generate
npm run verify:adjudications
npm run verify:identities
npm run verify:discovery
npm run verify
```

Commit the accepted batch, regenerated registries, reports, and current-document
updates as one coherent state.

`validation/current/` contains verifier byproducts, not ordinary patch inputs.
Restore those files after verification when a clean tree is needed. Do not create a
release-specific validation tree for routine work.

## GitHub Actions and automation

Automation follows least privilege, not a blanket read-only or no-writer rule.

- Validation-only workflows remain read-only because they need no writes.
- Every workflow declares explicit minimal permissions.
- Use Node 24-compatible JavaScript action releases.
- Write-capable automation requires an exclusive active claim covering the workflow
  and every write target.
- Write-capable jobs verify claim, branch, base SHA, head SHA, target, and operation
  preconditions before writing.
- Writes are limited to the claimed non-`main` branch or issue/PR metadata.
- Automation may not write directly to `main`, expand its own scope, adjudicate
  linguistic evidence, promote status, deploy surveys, publish releases, merge, or
  enable auto-merge without the separately required scope, gates, and user approval.
- Branch automation must leave an auditable coherent state. If the relevant suite has
  inherited regression debt, acceptance means the ratchet in `TESTING.md` is
  satisfied; automation must not redefine or suppress the debt to manufacture green.
- Generic repair bots, unscoped commit-and-push jobs, and unreviewed direct-to-main
  merges remain prohibited.

Path filters should run checks relevant to the changed canonical inputs.

## Local recovery export

A complete repository ZIP including `.git/` is useful when transferring work into
an environment without remote credentials:

```bash
./tools/export-git-working-copy.sh
```

The script refuses a dirty export unless explicitly overridden, verifies the ZIP,
and prints its SHA-256 checksum and current commit. Keep only the newest verified
recovery export needed for continuity; GitHub remains the durable shared history.

After restoring an export:

```bash
cd canto-span
./tools/verify-repository.sh
git status
git log --oneline --decorate -5
```

Do not rely on sandbox persistence or old download links.

## Runtime source workflow

Runtime edits belong in the smallest canonical owner under `src/**` or `src/runtime-resources/**`. Standard tests execute an in-memory bundle of `src/plugin-entry.js`; they do not use committed `main.js` as the source of truth.

For a runtime change:

```bash
npm test
npm run build:runtime
npm run verify:runtime-build
npm run test:generated-runtime
```

When `npm test` contains recorded baseline failures, capture the exact base failing
identities before editing and compare the post-change set under `TESTING.md`; a
nonzero inherited global result is not by itself a rejection, but any new unique
failure is.

Commit the canonical source change and regenerated `main.js` together. Do not edit `main.js` manually or regenerate it for unrelated research, corpus, survey, governance, or documentation work.

## Runtime release artifact

The Obsidian plugin ZIP remains minimal:

- `canto-span/main.js`
- `canto-span/manifest.json`
- `canto-span/styles.css`

It is an installation artifact, not a project backup, research archive, or source of
current status. Recovery, research, provenance, validation, and handoff files belong
in a separate development or recovery artifact.

## Remote repository

```text
origin  https://github.com/Vazhi/canto-span.git
```

Accepted work is merged to `main`. Delete completed feature branches after merge;
permanent workflows and documentation must not depend on them.

## Retired mechanisms

The following are not current project-state mechanisms:

- packaging manifests as authority;
- checkpoint-state ledgers;
- repeated release-specific validation trees;
- fixed research-only or read-only agent lanes;
- active-note whitelists and global grammar freezes;
- unscoped direct-to-main writer workflows;
- repair bots that complete intentionally failing commits;
- autonomous merge based only on integrator role, passing checks, labels, or elapsed
  time without explicit user approval for the specific PR and head.

Their history remains available in Git and, where needed, under `archive/`.