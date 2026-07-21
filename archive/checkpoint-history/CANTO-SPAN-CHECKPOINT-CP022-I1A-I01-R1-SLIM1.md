# Canto Span checkpoint — CP022-I1A-I01-R1-SLIM1

This is a packaging-only checkpoint derived from `CP022-I1A-I01-R1`.

## Runtime identity

- Candidate: `v0.5.179-cp022-i1a-i01-neutral-clause-span-consolidation-r1`
- Parser behavior changed by slimming: **no**
- `main.js`, `manifest.json`, and `styles.css`: byte-identical to the full render-pending parent
- I01 held-out cases: still sealed and absent from the project

## Retention result

- Original project files: 921
- Removed stale or duplicated files: 683
- Removed uncompressed bytes: 219,471,977
- Slim project files: recorded in `SLIM-PACKAGING-MANIFEST.json`
- Removed path/hash ledger: `SLIM-REMOVED-ARTIFACTS.tsv`

The slim project retains runtime files, current doctrine, canonical R37 evidence, active I01/I02 packets, aggregate fixtures, durable validation tools, and current I01 validation results.

## Validation

- Current focused orchestration: PASS
- I01 visible packet: 100/100 PASS
- I02 preservation: 24/24 PASS
- Aggregate regression: 545/545 PASS
- Grammar legitimacy: 1087/1087 PASS
- Semantic acceptance: 15/15 PASS
- Pre-intermediate corpus: 80/80 PASS
- Claim provenance: PASS
- Native naturalness audit: PASS
- Lexicon topology: PASS
- Documentation consistency: PASS
- Slim package audit: 42/42 PASS

## Packages

- Runtime-only: `main.js`, `manifest.json`, `styles.css`
- Slim development: current resumable project without historical checkpoint churn

The original full ZIP remains the historical recovery source and is identified by SHA-256 in `SLIM-PACKAGING-MANIFEST.json`.
