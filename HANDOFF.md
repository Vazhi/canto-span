# Handoff and recovery

This file owns recovery procedure only. Current project facts and work order live in
[`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md); operating policy
lives in [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md).

## Restore first

```bash
cd canto-span
./tools/verify-repository.sh
git status
git log --oneline --decorate -5
```

A full recovery archive must include `.git/`. A minimal runtime package must not.

## Clean generated verification output

Verification may create or refresh files under `validation/current/`. Those files are
verifier byproducts unless an explicit reviewed task claims them. Before applying a
patch or evaluating branch cleanliness:

```bash
git restore --staged --worktree validation/current 2>/dev/null || true
git clean -f validation/current
git status --short
```

Review the `git clean` preview first when unrelated local files may be present:

```bash
git clean -nd validation/current
```

## Applying a handoff patch

```bash
git am --abort 2>/dev/null || true
git restore --staged --worktree validation/current 2>/dev/null || true
git am /path/to/canto-span.patch
npm run verify:all
git restore --staged --worktree validation/current 2>/dev/null || true
git status --short
```

Do not apply a patch over unrelated local changes. Do not restore or delete files
outside the explicitly reviewed generated-output scope.

## Release baselines

Release audits use a checked-in construction-status baseline under
`data/release-baselines/`, pinned by SHA-256. Do not use clone-specific commit or
tree object IDs as a portable release baseline.

Generate a future baseline from a clean released state:

```bash
npm run release:baseline -- <version>
```

## Resume repository work

Read in this order:

1. [`AGENTS.md`](AGENTS.md)
2. [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md)
3. [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md)
4. [`docs/current/AGENT-WORKFLOW-SETTINGS.md`](docs/current/AGENT-WORKFLOW-SETTINGS.md)
5. [`docs/current/CODEX-ISSUE-WORKFLOW.md`](docs/current/CODEX-ISSUE-WORKFLOW.md)
6. [`docs/current/MULTI-AGENT-COORDINATION.md`](docs/current/MULTI-AGENT-COORDINATION.md)
7. [`docs/current/USER-MERGE-REVIEW.md`](docs/current/USER-MERGE-REVIEW.md)

Then inspect live GitHub intake and work-claim issues. A handoff note, old branch,
local patch, or earlier prompt does not preserve pickup or merge authority.

Historical research and adjudication reports may explain how the project reached its
current state. They do not replace the current contracts or present-tense snapshot.
