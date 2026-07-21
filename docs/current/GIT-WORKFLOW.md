# Git workflow and recovery

Git is the authoritative record of project changes. The repository inside a ChatGPT sandbox is only a temporary working copy. The canonical copy must live in a folder controlled by the user.

## Canonical-copy rule

- Keep the canonical working repository on the user's machine and push meaningful commits to the configured GitHub remote.
- Keep the newest complete repository export available for transfer into ChatGPT, because the sandbox cannot rely on private-remote credentials.
- The export must contain the whole `canto-span/` directory, including `.git/`.
- At the start of a new conversation, upload that export before work begins.
- Restore it, then verify `git status`, `git log`, and `git fsck` before assuming continuity.
- Do not rely on old download links or sandbox persistence.

## Commit rule

Commit after a meaningful change:

- parser behavior;
- executable tests;
- verified evidence that changes a claim;
- a legitimate status change;
- a label retirement;
- a binding architecture decision that directly enables implementation.

Small related edits belong in one coherent commit. Clerical reformatting alone does not justify a separate project-state artifact.

## Export rule

After each meaningful commit, create a complete working-copy ZIP with:

```bash
./tools/export-git-working-copy.sh
```

The script:

- refuses to export an uncommitted repository unless `--allow-dirty` is given;
- includes `.git/`;
- verifies the ZIP;
- prints its SHA-256 checksum and current commit.

Download the resulting ZIP immediately and replace the older canonical export only after verifying it can be opened.

## Restore rule

After extracting the export:

```bash
cd canto-span
./tools/verify-repository.sh
git status
git log --oneline --decorate -5
```

A clean status and successful `git fsck` establish the restored repository state.

## Runtime release artifact

The Obsidian plugin ZIP remains a minimal release artifact containing only:

- `canto-span/main.js`
- `canto-span/manifest.json`
- `canto-span/styles.css`

It is not a project backup and does not replace the full Git export.

## Remote repository

The configured remote is:

```text
origin  https://github.com/Vazhi/canto-span.git
```

Push each accepted commit from the user-controlled local repository. The remote is the durable shared history; the full `.git` ZIP remains the transfer format for restoring work inside ChatGPT without exposing private credentials.

## Retired workflow

Packaging manifests, recovery ZIPs, and checkpoint-state files are no longer active project-state mechanisms. Their last active versions are preserved under `archive/migration-phase1-retired-workflow/`.
