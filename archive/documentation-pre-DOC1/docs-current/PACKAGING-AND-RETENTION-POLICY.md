# Packaging and retention policy

## Two packages

1. **Runtime-only plugin** contains only `main.js`, `manifest.json`, and `styles.css`.
2. **Slim development project** contains the runtime, current authoritative documentation, canonical evidence, current evaluation packets, aggregate fixtures, and active validation tools.

## Excluded from the slim development project

- superseded checkpoint copies and validation generations;
- repeated cumulative source matrices before the latest authoritative version;
- version-specific runners whose fixtures are already absorbed by the aggregate suite;
- large rendered diagnostics from deferred or completed packages;
- consumed or sealed evaluator custody archives;
- temporary inspection files and backup trees.

Removed files remain recoverable from the SHA-256-identified full checkpoint archive. `SLIM-REMOVED-ARTIFACTS.tsv` records every omitted path, size, hash, and category.

## Retention rule

A file remains in the working project only when it is needed for at least one of these purposes:

- plugin execution;
- current candidate evaluation;
- active regression or safety validation;
- canonical evidence or claim provenance;
- authoritative current doctrine;
- safe resumption of the active work package.

Historical material belongs in a separate archive rather than every installable project ZIP.
