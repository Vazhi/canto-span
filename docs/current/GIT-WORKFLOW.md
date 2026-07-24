# Git workflow and recovery

GitHub `main` is the durable shared project record. A user-controlled local clone
is the preferred working copy; a full `.git` export is an offline recovery and
ChatGPT-transfer artifact, not a parallel source of truth.

The mandatory project-wide agent contract is
[`00-START-HERE.md`](00-START-HERE.md). The root `AGENTS.md` exists to ensure
automated agents read it before work begins.

## Multi-agent branch coordination

Before creating a branch:

1. fetch current `main` and record the base commit;
2. inspect open pull requests for overlapping files, construction codes, survey
   IDs, generated outputs, or state dimensions;
3. use a new `agent/<description>` branch from current `main`;
4. define authorized scope, protected scope, canonical inputs, deterministic
   outputs, and required verification;
5. rebase or rebuild stale work before adding changes.

Do not push work onto another agent's branch unless an explicit stacked-PR or
handoff relationship is documented. Do not preserve obsolete branch history merely
to keep an old PR open. If work overlaps an open PR, either wait, stack explicitly,
or rebuild after that PR merges.

## Branch and commit rule

- Begin scoped work from current `main` on an `agent/<description>` branch.
- Keep unrelated changes out of the branch.
- Commit coherent states, not every mechanical edit.
- Regenerate deterministic outputs and run applicable checks before publishing.
- Never intentionally publish an incomplete state that is expected to fail and
  rely on a later bot or repair commit.
- Use pull requests for changes to `main`; open them as drafts unless the user
  explicitly requests otherwise.
- Squash merge when the branch history is mechanical and the final PR represents
  one coherent change.

Meaningful commits include parser behavior, executable tests, verified evidence,
an accepted UUID-keyed adjudication, status migration, identity allocation,
retirement, or binding architecture/documentation changes.

## Pull-request handoff

Every agent PR must identify:

- the intended outcome and exact scope;
- the base commit;
- canonical inputs and generated outputs;
- every changed file;
- explicitly protected or unchanged areas;
- decisions and evidence basis;
- exact validation commands and results;
- unresolved blockers and the next logical action.

A task agent must not merge its own draft PR unless the user explicitly requests
that separate action.

## Documentation and generated records

Current documentation must agree with the authority order in
[`00-START-HERE.md`](00-START-HERE.md). Update canonical inputs and deterministic
generated outputs in the same branch. Historical reports remain immutable
provenance and should not be rewritten to look current.

For adjudication work, the coherent order is:

```bash
npm run adjudication:apply
npm run identity:generate
npm run discovery:generate
npm run verify:adjudications
npm run verify:identities
npm run verify:discovery
npm run verify
```

Commit the accepted batch, regenerated registries, generated reports, and any
current-document updates together. GitHub Actions verifies; it does not write
project state.

`validation/current/` contains verifier byproducts, not ordinary patch inputs.
Restore those files after verification when a clean tree is needed. Do not create
a new release-specific validation tree for routine work.

## GitHub Actions policy

- Workflows are read-only unless a separately reviewed release operation truly
  requires write access.
- Use Node 24-compatible JavaScript action releases.
- Do not hardcode temporary branch names in permanent workflows.
- Do not add automatic commit-and-push workflows for adjudication or generated
  documentation.
- Do not add temporary writer workflows merely to avoid a coherent direct edit.
- Path filters should run only the checks relevant to the changed canonical
  inputs.

## Local recovery export

A complete repository ZIP including `.git/` remains useful when transferring work
into an environment without remote credentials:

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

It is an installation artifact, not a project backup, research archive, or source
of current status. Recovery, research, provenance, validation, and handoff files
belong in a separate development or recovery artifact.

## Remote repository

```text
origin  https://github.com/Vazhi/canto-span.git
```

Accepted work is merged to `main`. Delete completed feature branches after merge;
permanent workflows and documentation must not depend on those branches.

## Retired mechanisms

Packaging manifests, checkpoint-state ledgers, repeated release-specific
validation trees, and automatic adjudication writer workflows are not active
project-state mechanisms. Their history remains available in Git and, where
needed, under `archive/`.
