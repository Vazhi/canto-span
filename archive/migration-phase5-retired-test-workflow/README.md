# Phase 5 retired test workflow

This directory preserves the pre-Phase-5 active test locations and manual render-review documents.

- `test-data/regression-snapshots.json` is the exact pre-migration regression fixture.
- `test-data/np-subsystem-v0.5.184.json` is the exact pre-migration NP fixture.
- `render-review/` contains historical manual review documents.

The active executable suite now lives under `tests/` and runs with `npm test` or `node tests/run-all.js`.
Historical documents remain evidence and provenance records; they are not active test authority.
