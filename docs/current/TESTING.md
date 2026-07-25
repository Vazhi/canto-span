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

- 551 exact regression cases;
- 43 NP-subsystem cases;
- 1,518 per-construction assertions across 133 construction files.

Current coverage is 132 positive-and-boundary, 0 positive-only, 0 implementation-only, and 1 compatibility-alias-only.

No active runtime label lacks a construction test file. Implementation probes
have linguistic evidence weight zero.

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

## Multi-agent coordination

```bash
npm run test:coordination
npm run verify:coordination
```

The coordination tests cover:

- parsing and validating machine-readable work claims;
- shared same-file claims with disjoint semantic regions;
- conflict detection for identical or exclusive regions;
- repository glob matching;
- exclusive and integration-owned path enforcement;
- draft-only pending changesets;
- preconditioned declarative JSON record updates.

`verify:coordination` verifies the issue and pull-request templates, coordination
schemas and config, read-only workflow, detailed coordination policy, changeset
lifecycle, CLI tools, and tests. It validates any JSON files currently under
`changes/pending/` but does not apply them.

The `Coordination claim` GitHub workflow performs the live checks that cannot run
offline. It reads the linked work-claim issue, verifies branch and expiry, compares
active semantic regions, checks every changed file against the claim, enforces
exclusive and integration-owned paths, and rejects a ready pull request that still
contains a pending changeset. It has only read permissions.

Changeset commands are:

```bash
npm run changes:validate -- changes/pending/CS-WORK-0000.json
node tools/coordination/change-set.js apply changes/pending/CS-WORK-0000.json
npm run changes:apply -- changes/pending/CS-WORK-0000.json
```

The plain `apply` form is a dry run. Write mode stops unless every declared
precondition still matches current files.

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
  parked-construction blacklist consistency, implementation reachability, the
  semantic coordination system, the mandatory agent contract, and current-
  documentation consistency.
- `verify:research` runs panel, survey-readiness, conflict-burden, research-
  provenance, and native-review-library checks.
- `verify:release` runs core verification plus promotion and release-handoff gates.
- `verify:all` runs every profile.

`tools/verify-parked-constructions.js` verifies that unlisted current
constructions are available by default and that every blacklist entry resolves to
one current permanent identity with a unique code, current note, parking date,
reason, and review trigger. The registry is currently empty, so the expected
result is 133 available and 0 parked.

The `agent-coordination` core check verifies that `AGENTS.md` points to the full
contract and detailed coordination policy, that required authority, standards,
task-routing, workflow, verification, prohibition, prompt, templates, schemas,
read-only permissions, and workflow triggers remain present, and that blacklist,
no-freeze, AB30, and survey state are not silently reverted.

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
they are checked-in deterministic products of canonical identity, adjudication,
grammar, and evidence inputs. Their freshness is verified. Workers should declare
these integration-owned outputs rather than independently finalize them when
concurrent canonical work is active.

## Updating tests and records

1. Read `AGENTS.md`, `docs/current/00-START-HERE.md`, and
   `docs/current/MULTI-AGENT-COORDINATION.md`.
2. Create or update the semantic work claim before editing.
3. Edit the canonical source, identity, adjudication, grammar, runtime, parked-
   construction registry, coordination input, or fixture.
4. Regenerate identity/discovery outputs when those inputs changed.
5. Run `npm test`.
6. Run `npm run verify:coordination` for coordination policy, schemas, templates,
   workflows, claims, or changeset tooling.
7. Run `node tools/sync-construction-test-metadata.js` when construction-test counts
   change.
8. Run `npm run verify`.
9. Run `npm run verify:research` when research or panel records changed.
10. Run `npm run verify:release` only for release or status-transition work.
11. Commit one coherent passing state and remove pending changesets before readying
    the pull request.

## GitHub Actions

Repository workflows are read-only verification. JavaScript actions use Node
24-compatible releases (`actions/checkout@v6`, `actions/setup-node@v6`, and
`actions/upload-artifact@v6` where needed). Do not add Node 20-based action
releases or branch-specific writer workflows.

Workflow trigger coverage is part of the verified contract. Core CI must run when
runtime, canonical data, grammar notes, tests, tools, schemas, changesets,
verification configuration, current documentation, templates, or workflows
change. Research CI must run when research documents, external evidence, corpus or
panel records, relevant runtime and construction tests, or research-verifier inputs
change. `tools/verify-agent-coordination.js` enforces trigger sets and explicit
read-only permissions.
