# Offline reproducibility status

## Current limitation

The private participant-level SoSci files are not in the public repository, and the original source-to-aggregate analysis script and environment lock used for the 31 July 2026 report were not retained. The repository therefore cannot reproduce this historical derivative from the private source files. No script or environment digest is invented.

The public package itself is deterministic and checked for exact file hashes, closed file inventory, disclosure schemas, broad-band non-invertibility, linked-table safety, private-source content-hash absence, and lifecycle consistency.

## Required future authorized process

Before any regenerated or final export, an authorized holder of the private files must:

1. verify each private filename, byte count, and SHA-256 value against `manifest.json`;
2. use an isolated non-repository workspace;
3. create a reviewed, version-controlled source-to-output script;
4. record the script hash, environment-lock hash, command line, and output-manifest digest;
5. run duplicate, consent, comprehension, quality, free-text privacy, and item-level adjudication screens;
6. apply the public disclosure policy, including complementary suppression and linked-table review;
7. run the public verifier against the candidate package;
8. obtain a separate release decision.

Until then, this remains a frozen historical derivative, not source-reproducible final evidence.
