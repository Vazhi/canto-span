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

1. `run-regression.js` — 551 exact structural snapshots;
2. `run-np-subsystem.js` — 43 compositional NP and licensing cases;
3. `run-constructions.js` — 1,287 assertions across one JSON file per active
   construction under `tests/constructions/`.

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
- `implementation_positive_only`;
- `compatibility_alias_only`.

Current coverage is 11 positive-and-boundary, 104 positive-only, 44
implementation-positive-only, and 1 compatibility-alias-only. Implementation
and alias probes have linguistic evidence weight zero.

## Fixtures

- `fixtures/regression-snapshots.json` is the canonical exact regression fixture.
- `fixtures/np-subsystem.json` is the canonical NP-subsystem matrix.

Pre-migration copies and manual render-review documents are preserved under `archive/migration-phase5-retired-test-workflow/`.

## Evidence boundary

Passing parser tests proves implementation behavior only. It does not establish naturalness, productivity, or promotion eligibility. Linguistic status remains controlled by construction notes and `tools/enforce-promotion-rules.js`.
