# Standard executable tests

This directory is the active executable authority for current parser behavior. Tests establish implementation behavior only; they do not establish linguistic status or evidence.

## Source-first command

```bash
npm test
```

Equivalent direct command:

```bash
node tests/run-all.js
```

The command bundles `src/plugin-entry.js` in memory from canonical modules and executes it under an Obsidian stub. It does not read committed `main.js`.

The aggregate suite runs four layers:

1. `run-regression.js` — exact structural and diagnostic snapshots;
2. `run-np-subsystem.js` — compositional NP and licensing cases;
3. `run-constructions.js` — one executable JSON file per active construction;
4. `tooling/lexicon/glossika-week16-runtime-lexicon.test.js` — accepted runtime lexicon checks.

## Generated deployment artifact

```bash
npm run verify:runtime-build
npm run test:generated-runtime
```

The first command proves deterministic source-to-bundle generation and equality with committed `main.js`. The second proves that the committed bundle is labeled, loadable, self-contained apart from the host Obsidian API, and executable.

## Construction files

Every active runtime label has exactly one file:

```text
tests/constructions/<ConstructionName>.json
```

Files may contain exact-snapshot cases, focused positive and boundary cases, NP-subsystem cases, and zero-evidence implementation or compatibility probes.

## Fixtures

- `fixtures/regression-snapshots.json` is the canonical exact regression fixture.
- `fixtures/np-subsystem.json` is the canonical NP-subsystem matrix.

Do not rewrite accepted expectations merely to make a refactor pass. Pre-migration copies and manual render-review documents remain under `archive/` as historical provenance.
