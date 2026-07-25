# Git workflow and recovery

GitHub `main` is the durable shared project record. A user-controlled local clone is
the preferred working copy; a full `.git` export is an offline recovery and transfer
artifact, not a parallel source of truth.

The mandatory project-wide contract is [`00-START-HERE.md`](00-START-HERE.md). The
concurrency protocol is [`MULTI-AGENT-COORDINATION.md`](MULTI-AGENT-COORDINATION.md).

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
- Never intentionally publish an incomplete failing state that a later repair must
  fix.
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

Workers may publish branches and PRs but do not finalize unresolved
integration-owned files. The authorized integrator may:

1. rebuild stale branches onto current `main`;
2. apply or reject pending changesets;
3. reconcile integration-owned files;
4. mark a complete PR ready;
5. verify checks, dependencies, mergeability, and exact head SHA;
6. merge passing PRs in dependency order without a separate per-PR user request.

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
  linguistic evidence, promote status, deploy surveys, or publish releases without
  separately authorized scope and gates.
- Branch automation must leave an auditable result and a coherent passing branch.
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
- manual per-PR merge approval after an authorized integrator has verified a
  coherent passing state.

Their history remains available in Git and, where needed, under `archive/`.