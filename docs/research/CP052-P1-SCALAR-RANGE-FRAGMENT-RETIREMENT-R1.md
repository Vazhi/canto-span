# CP052-P1 ScalarRangeFragment retirement R1

Date: 2026-07-22

Checkpoint: `v0.5.209-scalar-range-fragment-retirement`

## Decision

Retire `ScalarRangeFragment` from the active runtime registry and current
construction-note collection.

## Evidence review

The label had no mapped external source, no accepted fixture, no panel evidence,
and no source-linked positive or boundary. Its only standardized case was the
zero-weight implementation probe `中等價位。`.

The existing LANE-10 source map already classified the node as a dormant lexical
`價位` wrapper and recommended merging its lexical material into ordinary
nominal/scalar structure or retiring it.

## Runtime review

Before v0.5.209, a whole-core fallback emitted `ScalarRangeFragment` whenever
`價位` appeared anywhere in the core. The rule therefore added fragment status
without checking discourse context or a construction-specific boundary.

The wrapper was also the active target of the older semantic-domain-specific
`PriceRangeFragment` compatibility alias. That alias now remains retired without
redirecting to another active construction.

## Preserved behavior

Removing the fallback does not remove the visible nominal material:

- `中等價位。` retains `ModifierNP`;
- `價位。` retains `NominalHeadSpan`;
- `呢個價位。` retains `OvertHeadDemonstrativeClassifierNP`.

No hidden copula, predicate, comparison, range value, or discourse relation is
inserted. Future fragment analysis requires independent discourse evidence.

## Retirement scope

- remove the active label, template, fallback, slot rule, fragment guard, and
  restrictive-focus host dependency;
- remove the zero-weight implementation probe and standardized construction
  file;
- preserve the former construction note under the retired-label archive;
- preserve the unresolved discourse-fragment research question;
- add no replacement language claim and make no promotion.

## Result

- active labels reduced from 165 to 164;
- retired labels increased from 16 to 17;
- implementation-only labels reduced from 56 to 55;
- parser output no longer assigns unsupported fragment status to `價位`
  nominal material.

## Preservation

The former construction note is preserved at:

`archive/retired-labels/v0.5.209-scalar-range-fragment-retirement/ScalarRangeFragment.md`
