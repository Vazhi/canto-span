# CP047-P1 Degree-modified lexical stative reconciliation R1

## Decision

Retain `DegreeModifiedLexicalStative` for one narrow source-linked profile:

```text
degree modifier + independently lexicalized gradable stative
好 + 好食
```

The exact surface `好好食` is attested by an official CUHK Cantonese teaching resource. The Words.hk entry independently classifies `好食` as an adjective and includes an example ending in `好好食`. Lam, Lau, and Lee separately analyze Cantonese degree markers as words before adjective-like predicates.

## Runtime reconciliation

The v0.5.203 parser already produces a transparent `DegreeModifiedLexicalStative` over `好好食`:

- degree modifier: `好`;
- lexicalized stative predicate: `好食`;
- complete root coverage;
- no hidden material.

v0.5.204 freezes this exact source-linked output as regression `REG-0551`. No parser rule changes are required.

## Status

Move the construction from `unsupported_generalization` to `research_pending`.

This is not a productive promotion. The evidence establishes one exact lexicalized profile, not:

- every degree modifier before `好食`;
- every `好X` lexicalized stative;
- every adjective-like predicate after degree `好`;
- categorical acceptability across Cantonese varieties;
- negative boundaries against compositional or ambiguous `好 + V` strings.

The earlier `FRWRAP-004` probe remains zero-weight implementation provenance. It is not converted into linguistic evidence; `REG-0551` is the independent source-linked case.

## Sources

1. Lam, Charles, Chaak Ming Lau, and Jackson L. Lee. 2024. “Multi-Tiered Cantonese Word Segmentation.” LREC-COLING 2024, p. 6 degree-modification discussion.
2. Chinese University of Hong Kong Independent Learning Centre. *Cantonese Express / 港式粵語速遞*, Daily Conversation 5 vocabulary, item `好好食 hou2 hou2 sik6`.
3. Words.hk / 粵典, `好食` adjective entry and example ending `都覺得好好食`.

## Validation target

- exact regression: `好好食。`;
- root: `DegreeModifiedLexicalStative`;
- visible degree token: `好`;
- visible lexicalized stative token: `好食`;
- zero parser errors;
- no new verifier or validation directory.
