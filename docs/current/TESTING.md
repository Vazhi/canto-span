---
title: Canto Span — Testing and Verification
status: current
tags: [canto-span/testing, canto-span/validation]
related: "[[DEFINITION-OF-DONE]]"
---

# Testing and verification

## Parser tests

Run the canonical parser suite with:

```bash
npm test
```

It runs:

- 548 exact regression cases;
- 43 NP-subsystem cases;
- 1,226 per-construction assertions across 166 construction files.

Current coverage is 2 positive-and-boundary, 102 positive-only, 61 implementation-only, and 1 compatibility-alias-only. No active label is uncovered.

Implementation probes have linguistic evidence weight **0**. They prove only that a runtime path is observable.

## Verification profiles

The permanent verifier is manifest-driven. Profiles are configured in `config/verification-profiles.json`.

```bash
npm run verify
npm run verify:research
npm run verify:release
npm run verify:all
```

- `verify` runs stable structural checks: parser tests, construction notes, registry alignment, source accounting, active working set, implementation reachability, and current-document consistency.
- `verify:research` runs panel, survey-readiness, conflict-burden, and native-review-library checks.
- `verify:release` runs the core profile plus promotion and release-handoff gates.
- `verify:all` runs all profiles.

`./tools/verify-repository.sh` performs Git object validation and then runs only the stable core profile.

## Generated outputs

All current generated results are written to:

```text
validation/current/
```

Do not create a new `validation/vX.Y.Z/` directory for each release. Historical generated results remain available in Git history; permanent evidence belongs in source records, research documents, release audits, fixtures, or panel snapshots rather than duplicated generated output trees.

## Reachability probes

All zero-weight implementation probes are stored in:

```text
test-data/implementation-reachability-probes-v1.json
```

The former release-specific probe files were consolidated. `tools/verify-implementation-reachability.js` checks the inventory generically without hardcoded release counts or wrapper-family scripts.

## Updating tests

1. Edit the canonical fixture or construction case.
2. Run `npm test`.
3. Run `node tools/sync-construction-test-metadata.js` when construction-file counts change.
4. Run `npm run verify`.
5. Run `npm run verify:release` only for a release or status transition.

Executable tests validate implementation. They cannot independently promote a linguistic construction.
