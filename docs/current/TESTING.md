---
title: Canto Span — Testing and Verification
status: current
tags: [canto-span/testing, canto-span/validation]
related: "[[DEFINITION-OF-DONE]]"
---

# Testing and verification

Testing proves implementation behavior. It does not independently establish a
Cantonese construction, settle ontology, or authorize promotion.

## Parser suite

```bash
npm test
```

Current baseline:

- 551 exact regression cases;
- 43 NP-subsystem cases;
- 1,518 per-construction assertions across 133 construction files;
- 132 positive-and-boundary files;
- 1 compatibility-alias-only file;
- no active runtime label without a construction test file.

Implementation probes have linguistic evidence weight zero.

## Identity, adjudication, and discovery

```bash
npm run verify:adjudications
npm run verify:identities
npm run verify:discovery
```

- `verify:adjudications` checks UUID/code/legacy-label consistency, accepted batch
  ordering, required evidence fields, and duplicate decisions.
- `verify:identities` checks permanent UUID/code locks, current and retired
  coverage, aliases, source paths, and regenerated identity outputs.
- `verify:discovery` checks the 181-record readiness registry and generated
  candidate, orphaned-evidence, family-gap, and full-sweep reports.

Write-mode commands are explicit:

```bash
npm run adjudication:apply
npm run identity:generate
npm run discovery:generate
```

Run all write-mode commands before committing. Do not publish an adjudication
batch first and rely on a later bot commit to repair stale generated files.

## Verification profiles

Profiles are configured in `config/verification-profiles.json`.

```bash
npm run verify
npm run verify:research
npm run verify:release
npm run verify:all
```

- `verify` runs stable core checks, including parser tests, status-note alignment,
  adjudications, permanent identities, discovery freshness, source accounting,
  active working-set consistency, and implementation reachability.
- `verify:research` runs panel, survey-readiness, conflict-burden, research-
  provenance, and native-review-library checks.
- `verify:release` runs core verification plus promotion and release-handoff gates.
- `verify:all` runs every profile.

`./tools/verify-repository.sh` additionally validates Git objects before running
the stable core profile.

## Generated outputs

Current verifier byproducts are written to:

```text
validation/current/
```

They are not patch inputs. After verification, restore only those generated
byproducts when a clean tree is required:

```bash
git restore --staged --worktree validation/current
```

Do not create a new `validation/vX.Y.Z/` directory for each release. Permanent
evidence belongs in source records, status notes, adjudication records, research
documents, release audits, fixtures, panel snapshots, or Git history.

Generated discovery outputs under `data/` and `docs/research/` are different:
they are checked-in deterministic products of the canonical identity,
adjudication, grammar, and evidence inputs. Their freshness is verified.

## Updating tests and records

1. Edit the canonical source, identity, adjudication, grammar, runtime, or fixture
   input.
2. Regenerate identity/discovery outputs when those inputs changed.
3. Run `npm test`.
4. Run `node tools/sync-construction-test-metadata.js` when construction-test
   counts change.
5. Run `npm run verify`.
6. Run `npm run verify:research` when research or panel records changed.
7. Run `npm run verify:release` only for release or status-transition work.
8. Commit one coherent passing state.

## GitHub Actions

Repository workflows are read-only verification. JavaScript actions use Node
24-compatible releases (`actions/checkout@v6`, `actions/setup-node@v6`, and
`actions/upload-artifact@v6` where needed). Do not add Node 20-based action
releases or branch-specific writer workflows.
