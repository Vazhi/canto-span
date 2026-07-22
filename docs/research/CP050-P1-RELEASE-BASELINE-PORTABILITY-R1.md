# CP050-P1 — Release-baseline portability repair R1

Release: v0.5.207

## Problem reproduced

The v0.5.205 and first v0.5.206 handoff metadata stored Git object IDs created
inside the development sandbox. Those objects were not guaranteed to exist in
the recipient repository. A patch could apply cleanly while
`npm run verify:all` still failed with `missing_base_tree`.

Changing from a commit ID to a whole-repository tree ID did not solve the
problem. The recipient may legitimately have different tracked verifier
snapshots or different local history, so the exact tree object can still be
absent.

## Repair

The release gate no longer reads a baseline from Git history. It now compares
current construction notes with a checked-in status snapshot:

- `data/release-baselines/v0.5.206-construction-statuses.json` records the 165
  construction/status pairs at the v0.5.206 boundary;
- the current release audit pins that file by repository-relative path,
  runtime version, and SHA-256 digest;
- the verifier checks snapshot schema, count totals, duplicate labels, allowed
  statuses, digest, and runtime-version agreement before computing changes;
- a generic writer creates future snapshots without embedding clone-specific
  object IDs.

The snapshot contains only construction names and linguistic statuses. It does
not duplicate full notes, sources, tests, parser output, or generated
verification results.

## Scope

This is a release-governance repair only. It changes no parser constructor,
recognized span, construction status, evidence record, panel result, or survey
conclusion. Runtime output is intended to remain byte-for-byte equivalent to
v0.5.206 apart from the reported version string.

## Future release procedure

Before starting status-changing work from a clean released state, create the
baseline that the next audit will reference:

```bash
npm run release:baseline -- 0.5.207
```

The command writes
`data/release-baselines/v0.5.207-construction-statuses.json` and prints the
SHA-256 value to copy into the next `current-release-audit.json`.

## Validation target

A valid checkpoint must pass:

```bash
node tools/test-release-handoff.js
node tools/verify-release-handoff.js
npm run verify:all
```

The release patch must continue to exclude generated changes under
`validation/current/`.
