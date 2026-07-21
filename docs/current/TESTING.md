---
title: Canto Span — Standard Testing
status: current
tags: [canto-span/testing, canto-span/validation]
related: "[[DEFINITION-OF-DONE]]"
---

# Standard executable testing

## One command

Run all current parser tests with:

```bash
npm test
```

This replaces active bespoke render-review documents and scattered entry-point commands. Historical review documents remain archived evidence, not current executable authority.

## Test layers

### Exact regression

`tests/fixtures/regression-snapshots.json` contains 545 exact parser signatures. The runner checks full structural output and diagnostic audit summaries.

### Shared NP subsystem

`tests/fixtures/np-subsystem.json` contains 43 cases covering licensed NPs, provisional and incompatible classifier phrases, unknown material, and integration with the narrow postverbal-`咗` subtype.

### Per-construction files

Every one of the 169 active labels has exactly one file under `tests/constructions/`.

Each file records the current executable cases assigned to that construction and an explicit coverage state. The construction-note frontmatter points to the file and records its positive, boundary, and total executable counts.

Current v0.5.190 coverage:

| Coverage state | Constructions |
|---|---:|
| positive and boundary | 2 |
| positive only | 100 |
| implementation positive only | 18 |
| boundary only | 0 |
| no direct cases | 49 |

`implementation_positive_only` means the parser emits the label on a frozen
reachability probe, but the case has explicit zero linguistic evidence weight.
The 49 uncovered labels remain visible test debt. Empty files do not claim that
the constructions are correct, natural, supported, or unreachable.

## Boundary suites

`PostverbalZoPerfectiveVP` and `ResourceUseLaiFunctionRelation` currently have explicit standardized positive and boundary suites. Both suites pass, but executable behavior is only one part of the Definition of Done. Both PFV and RUL remain `research_pending`.

## Updating tests

1. Edit or add the relevant `tests/constructions/<ConstructionName>.json` case.
2. Update an exact snapshot only when a reviewed parser transition intentionally changes structural output.
3. Run `npm test`.
4. Update the corresponding construction note counts with `node tools/sync-construction-test-metadata.js` when the file inventory changes.
5. Run `./tools/verify-repository.sh` before committing.

`tools/build-construction-tests.js` is the mechanical construction-test rebuild
tool. Do not run it casually after hand-editing construction files, because it
regenerates them from the canonical regression fixture, NP matrix, the two
migrated focused packets, and the zero-weight runtime-reachability probe inventories.

## Evidence boundary

Executable tests validate implementation. They do not count as independent linguistic evidence and cannot promote a construction by themselves.
