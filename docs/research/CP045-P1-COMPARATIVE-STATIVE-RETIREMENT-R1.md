# CP045-P1 ComparativeStative retirement R1

Date: 2026-07-22

Checkpoint: `v0.5.202-comparative-stative-retirement`

## Decision

Retire `ComparativeStative` from the active runtime registry and current construction-note collection.

## Evidence review

The label had one zero-weight implementation probe, `客氣啲。`, and no accepted fixture. Its own sources did not justify a generic comparative node:

- Lam (2014) distinguishes overt Cantonese comparative strategies and does not support treating every `property + 啲` sequence as the same comparative construction.
- 鄭定歐、張勵妍、高石英 (2021) supports post-property `啲` as scalar adjustment in a property-predicate context, with lexical and positional limits.
- `DegreeMannerAdverbial` already represents the source-linked property/manner + `啲` adjustment family and carries the appropriate uncertainty about productivity and boundaries.

## Runtime reconciliation

Before v0.5.202, `wrapPredicate` could emit `ComparativeStative` only when the governed `DegreeMannerAdverbial` template failed. This made the fallback depend on missing lexical slot metadata rather than an independently supported comparison structure.

v0.5.202:

- marks `客氣` as a degreeable property head for the existing category template;
- adds regression `REG-0550` for `客氣啲。`;
- removes the residual `ComparativeStative` constructor;
- removes the zero-weight `LOWREF-001` probe;
- preserves explicit surpass-comparative research as a separate unresolved construction question.

## Non-claims

This retirement does not claim that Cantonese lacks comparison. It does not establish unrestricted attachment of `啲` to every stative, and it does not analyze predicate + `過` + standard constructions as `DegreeMannerAdverbial`.

## Preservation

The former construction note is preserved at:

`archive/retired-labels/v0.5.202-comparative-stative-retirement/ComparativeStative.md`
