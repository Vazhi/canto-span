# Pending declarative changesets

This directory is for branch-local coordination proposals that avoid direct edits
to high-contention aggregate files.

A pending file must:

- be named `<WORK-ID>.json`;
- conform to `schemas/change-set.schema.json`;
- identify its work-claim issue and base commit;
- use explicit preconditions for every operation;
- list only approved regeneration target IDs from
  `config/coordination-targets.json`.

Draft pull requests may contain pending changesets. The integration agent applies
them against current `main`, regenerates deterministic outputs, resolves any failed
precondition, and deletes the pending files on the same branch. A file under this
directory must not survive a ready-to-merge pull request.

Validation and dry-run application:

```bash
npm run changes:validate -- changes/pending/CS-WORK-0000.json
node tools/coordination/change-set.js apply changes/pending/CS-WORK-0000.json
```

Write mode is explicit:

```bash
npm run changes:apply -- changes/pending/CS-WORK-0000.json
```
