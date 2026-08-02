# Offline reproducibility status

## Current historical limitation

The private participant-level SoSci files are not in the public repository, and the original source-to-aggregate analysis script and environment lock used for the 31 July 2026 report were not retained. The repository therefore **cannot currently reproduce these aggregate statistics from the private source files**. No script or environment digest is invented for work that was not preserved.

The public files themselves are deterministic and are checked by `npm run verify:interim-pilot-export` for hashes, byte counts, row counts, schemas, arithmetic ranges, disclosure rules, lifecycle labels, and prohibited public fields.

## Required future authorized process

An authorized holder of the private files must, before any regenerated or final export:

1. verify every private filename, byte count, and SHA-256 value against `manifest.json`;
2. place the private files in an isolated non-repository workspace;
3. create and review a version-controlled source-to-aggregate script that reads only those files and emits a candidate public package;
4. record the script SHA-256, dependency/environment lock SHA-256, command line, operating environment, and output manifest digest;
5. run duplicate, consent, comprehension, quality, free-text privacy, and item-level adjudication screens;
6. apply `PUBLIC-DISCLOSURE-POLICY.md`, including complementary and linked-table review;
7. run the public verifier on the candidate output;
8. obtain a separate review decision before committing or releasing anything.

Until that process exists, this snapshot remains a frozen, disclosure-controlled historical derivative and not source-reproducible final evidence.
