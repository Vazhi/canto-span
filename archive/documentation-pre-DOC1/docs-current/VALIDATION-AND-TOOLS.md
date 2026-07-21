# Validation and Tools

> **CP021B-IM1 state — 2026-07-18:** Accepted baseline v0.5.174 is preserved. Frozen candidate v0.5.175 received `REVISE` after one-shot heldout evaluation; its headless regressions pass but it is not accepted.

## Current durable tools

- `tools/run-current-focused.js` — inherited completion/perfective evidence-backed focused gate retained during the replacement program.
- `tools/run-regression-suite.js` — inherited accepted behavior, 545 cases, zero exclusions.
- `tools/run-grammar-legitimacy-audit.js` — status/evidence coverage and freeze enforcement.
- `tools/run-native-speaker-naturalness-audit.js` — naturalness evidence only.
- `tools/verify-cp020r2-rendered-acceptance.js` — matched 60-row summary/full evidence, frozen routing/semantic contract, relation inventory, and target role corrections.
- `tools/verify-documentation-consistency.js` — JSON parsing and source-relative local Markdown-link validation.
- `tools/evaluate-heldout-probes.js` — mechanical routing output only; never semantic disposition.
- `tools/inspect-cp021b-heldout.js` — hash-guarded full output capture for all 36 one-shot CP021B rows.
- `tools/adjudicate-cp021b-heldout.js` — post-freeze row-contract adjudication; returns nonzero for the recorded `REVISE` disposition.
- existing semantic, corpus, diagnostics, registry, readiness, W17, and color utilities.
- `tools/create-progress-checkpoint.sh` — legacy checkpoint helper; its output is insufficient unless the full mandatory artifact protocol is satisfied.

## Current inherited results

```text
rendered acceptance:    1999/1999 PASS
focused:                  13/13 PASS
grammar legitimacy:    1117/1117 PASS
aggregate regression:  545/545 PASS, zero exclusions
semantic acceptance:     15/15 PASS
A1 fixture:              40/40 PASS
frozen corpus:           80/80 PASS
W17 lexicon/role:        393/393 PASS
review-only readiness: 1860/1860 PASS
diagnostics export:      10/10 PASS
registry:                177 active labels
documentation:          60 JSON / 66 Markdown / 0 broken links
CP021B implementation:   128/128 PASS
CP021B heldout:           11/36 strict PASS; REVISE
```

These results preserve implementation stability. They do not promote language claims.

## Documentation validation

Verify:

- state-bearing fields agree;
- all required authority documents exist;
- no project-memory dependency remains;
- internal links resolve;
- JSON parses;
- historical/current boundaries are explicit;
- runtime hashes are unchanged for documentation-only work.

## Artifact validation

For each batch verify file existence, non-zero size, ZIP integrity, required archive members, one-root installable layout, checkpoint JSON parsing, readable Markdown, SHA-256, and artifact-manifest agreement.


## CP018 semantic gate

- `validation/cp018/generate-cp018-artifacts.js` generates the 60-row summary/full pair from frozen partitions.
- `validation/cp018/verify-cp018-runtime.js` verifies exact four-label removal, zero additions, recursive blocker behavior, and frozen-row coverage.
- `validation/cp018/build-cp018-review.py` records the 60/60 compact/full manual adjudication.
- Semantic gate states are review-routing outputs and are not included in inherited regression signatures.

## CP021B-R4 research-provenance consolidation

```bash
node tools/build-parser-construction-source-mapping-r4.js
node tools/audit-parser-construction-source-mapping-r4.js
```

Expected result: strict consolidated audit passes; 24 external sources, 4 internal provenance records, 83 matrix rows, 13 mapped labels, and unchanged `main.js`/`manifest.json` hashes.

