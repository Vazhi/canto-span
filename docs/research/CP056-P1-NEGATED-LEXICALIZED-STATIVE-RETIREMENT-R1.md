# CP056-P1 NegatedLexicalizedStative retirement R1

Date: 2026-07-22

Checkpoint: `v0.5.212-negated-lexicalized-stative-retirement`

## Decision

Retire `NegatedLexicalizedStative` from the active runtime registry and current
construction-note collection.

## Evidence review

The LANE-10 stative-predication source map already classified the label as
`SOURCE_LINKED_SPLIT_AND_LABEL_RETIRE_REQUIRED`. The reviewed evidence supports
three distinct profiles rather than one homogeneous construction:

- Lam, Lau, and Lee (2024, section 4.6) treat `難食` in its “unpalatable”
  reading as an opaque lexical property unit, not syntactic negation;
- Yip (1988, pp. 449–454) documents ordinary `唔` before adjective/stative
  predicates, supporting compositional negation of an independently established
  lexical property predicate such as `好食`;
- Chin (2018, official repository abstract) distinguishes prohibitive `唔好`
  from ordinary negator `唔`.

The only standardized case for the retired label was zero-weight implementation
probe `FRWRAP-005` (`難食。`). It established runtime reachability only and could
not justify the conflated language claim.

## Runtime review

Before v0.5.212, two category templates emitted the same label for structurally
different inputs: a lexical `難X` predicate and `negator + lexicalized property
predicate`. A late singleton wrapper also assigned the specialized label to
dictionary-backed `難X` items.

The tokenizer separately maintained a parser-relevant ambiguity for `唔好食`:
ordinary `唔 + 好食` versus prohibitive `唔好 + 食`. That ambiguity is useful,
but it does not motivate merging the analyses under one language label.

## Preserved behavior

- `難食。` remains `StativePredicate` over the lexical unit `難食`;
- `呢個難食。` remains a `TopicComment` containing the lexical predicate;
- `呢個唔好食。` retains compositional `NegatedStativePredicate` for
  `唔 + 好食`;
- bare `唔好食。` remains `NeedsContext` with competing ordinary-negation and
  prohibitive analyses;
- `唔好食呢個。` remains `ProhibitiveImperative`;
- ordinary `唔 + property predicate`, including `唔開心`, remains
  `NegatedStativePredicate`.

The ordinary negated-stative templates are explicitly constrained to surface
`唔`; the retirement does not license `冇`, `未`, `咪`, or other negators in
this construction.

## Retirement scope

- remove the active label, both conflated templates, slot-list entries, late
  lexical singleton wrapper, and active polarity-wording alias;
- retain the lexical dictionary behavior, narrow `NegatedStativePredicate`,
  `ProhibitiveImperative`, and `NeedsContext` ambiguity handling;
- remove the zero-weight reachability probe and standardized construction file;
- preserve the former construction note under the retired-label archive;
- add no new promoted language claim.

## Result

- active labels reduced from 164 to 163;
- retired labels increased from 17 to 18;
- implementation-only labels reduced from 53 to 52;
- the parser no longer presents lexical negative meaning, syntactic negation,
  and prohibition as one construction family.

## Preservation

The former construction note is preserved at:

`archive/retired-labels/v0.5.212-negated-lexicalized-stative-retirement/NegatedLexicalizedStative.md`
