# Standard executable tests

This directory is the active test authority for current parser behavior.

## Command

```bash
npm test
```

Equivalent direct command:

```bash
node tests/run-all.js
```

The command runs three layers:

1. `run-regression.js` — 545 exact structural snapshots;
2. `run-np-subsystem.js` — 43 compositional NP and licensing cases;
3. `run-constructions.js` — one JSON file per active construction under `tests/constructions/`.

## Construction files

Every active runtime label has exactly one file:

```text
tests/constructions/<ConstructionName>.json
```

Each file may contain:

- exact-snapshot positive cases;
- focused positive and boundary cases migrated from reviewed evaluation packets;
- NP-subsystem cases relevant to that construction;
- an explicit coverage state.

Coverage states are:

- `positive_and_boundary`;
- `positive_only`;
- `boundary_only`;
- `no_direct_cases`.

A missing direct case is reported as a coverage gap. It is not converted into an automatic pass or evidence of linguistic support.

## Fixtures

- `fixtures/regression-snapshots.json` is the canonical exact regression fixture.
- `fixtures/np-subsystem.json` is the canonical NP-subsystem matrix.

Pre-migration copies and manual render-review documents are preserved under `archive/migration-phase5-retired-test-workflow/`.

## Evidence boundary

Passing parser tests proves implementation behavior only. It does not establish naturalness, productivity, or promotion eligibility. Linguistic status remains controlled by construction notes and `tools/enforce-promotion-rules.js`.
