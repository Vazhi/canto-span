# CP037 DemonstrativeHeadNP retirement

Date: 2026-07-22

Checkpoint: `v0.5.193-nominal-wrapper-audit`

## Decision

`DemonstrativeHeadNP` is retired from the active runtime registry and current construction-note collection.

## Checks

- runtime constructor: none
- accepted fixtures: 0
- standardized cases: 0
- verified complete-parser outputs: 0
- unique compatibility dependency: none
- distinct linguistic purpose: none under the checked analysis

## Reason

The label encoded a demonstrative-plus-head analysis that omits the overt classifier in relevant Cantonese forms. The checked sources and current parser already represent overt `demonstrative + classifier + noun` material through `OvertHeadDemonstrativeClassifierNP`, with `DemonstrativeClassifierNP` retained only as its public compatibility alias. Keeping `DemonstrativeHeadNP` active would preserve a known misanalysis without implementation behavior or an independent future research target.

## Preservation

The original note, source mappings, status, and migration provenance are preserved at:

`archive/retired-labels/v0.5.193-nominal-wrapper-audit/DemonstrativeHeadNP.md`
