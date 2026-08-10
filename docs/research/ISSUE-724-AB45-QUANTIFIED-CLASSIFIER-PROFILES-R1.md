# Issue 724 — AB45 QuantifiedClassifierNP profile decisions R1

Date: 2026-08-10
Construction: AB45 `QuantifiedClassifierNP`
Decision: `RETAIN_NARROW_RESEARCH_PENDING`
Runtime effect: none in this task

## Decision summary

AB45 is retained as a source-supported Cantonese **quantified classifier NP family**, but the active linguistic claim must distinguish an overt-head core from a context-dependent noun-ellipsis profile.

The current broad runtime label must not be treated as evidence that wh quantities, age/dimension units, standard measures, demonstrative wrappers, or classifier-selection anomalies are all one construction.

## Profile A — overt numeral + classifier + noun

### Form

```text
Num + CL + N
```

### Source disposition

**Directly supported.**

Bond & Sio explicitly list `X-C-N` and give `一個蘋果`. Lam et al. give `三本書` and `兩個人`. Xia states that `Num-CL-N` is the normal classifier-NP order in Cantonese and proposes a Cantonese-specific structure for it.

### AB45 disposition

**Core AB45 profile.**

The classifier must be independently compatible with the nominal class. The source support is structural; it does not make classifier choice unrestricted.

### Clean positive types

- `一個蘋果`
- `兩本書`
- `三隻貓`
- `兩個老師`
- other common, semantically compatible Num–CL–N combinations with independently known classifier licensing.

## Profile B — numeral + classifier with recoverable omitted noun

### Form

```text
Num + CL + ØN
```

### Source disposition

**Directly supported as noun ellipsis.**

Lam et al. directly contrast `佢有 *兩` with `佢有兩本` in a context where `書` is established. Xia states that Cantonese shares the property that the noun in Num–CL–N may be elided while the classifier cannot.

### AB45 disposition

**Source-supported related profile, but context-sensitive and analytically distinct from the overt-head core.**

The research supports an omitted/recoverable head, not a general rule that every context-free `Num + CL` string is a complete classifier NP.

### Boundary requirements

A future runtime specification must decide whether the same AB45 identity may expose an ellipsis subtype or whether an explicit context/ellipsis wrapper should own the omitted-head profile. That is an implementation/identity-boundary question and is not decided here.

## Profile C — demonstrative + quantified classifier NP

### Form

```text
D + Num + CL + N
```

or source-attested optional-numeral variants within the broader demonstrative classifier phrase.

### Source disposition

**Directly supported as larger NP composition.**

Bond & Sio distinguish `D-(X)-C-N` from `X-C-N`. Lam et al. give `哩兩個人`.

### AB45 disposition

**Outer composition, not AB45 identity expansion.**

A valid internal quantified classifier NP may occur inside a larger demonstrative NP, but the demonstrative should remain owned by the appropriate demonstrative/modified-NP structure.

## Profile D — wh quantity + classifier + noun

### Candidate forms

```text
幾多 + CL + N
幾 + CL + N
```

### Source disposition

**Not established by the three current AB45 sources as the same numeral classifier construction.**

Bond & Sio note that `X` could include a small set of quantifiers in principle but explicitly restrict the paper’s discussion to numerals. Lam et al. and Xia’s relevant classifier-NP arguments are numeral-based.

### AB45 disposition

**Unresolved boundary.**

Do not count current parser coverage such as `幾多個字` as independent AB45 evidence. A separate source treatment is required before deciding whether wh quantity is an AB45 subtype, a sibling quantity construction, or an outer wh operator over classifier material.

## Profile E — measure-word NP

### Form

```text
Num + MW + N
```

Examples may involve containers, groups, partitives, standard measures, or other unit words.

### Source disposition

**Classifier-adjacent but explicitly distinct in Xia 2025.**

Xia’s central research question is whether classifiers and measure words are distinct categories; the paper argues for different structural behavior and assigns Cantonese measure-word NPs a different structure from Cantonese classifier NPs.

### AB45 disposition

**Do not inherit AB45 classifier-NP evidence automatically.**

Whether a particular runtime `unit_word`, container, measure, or quantity expression should be handled by AB45, a measure-phrase identity, or another existing quantity construction requires independent classification.

## Profile F — age, length, area, and conventional dimension strings

### Current fixture examples

- `三歲`
- `五百呎`
- `張枱三呎`
- `佢有三歲`
- `呢本書三歲`

### Source disposition

**Not directly classified as AB45 by the three attached sources.**

These strings lack the overt `Num-CL-N` shape that defines the strongest classifier-NP evidence. Xia’s classifier/measure distinction additionally makes a classifier analysis unsafe to assume.

### AB45 disposition

**Unresolved and outside the current source-supported core.**

Do not infer ungrammaticality or assign a replacement identity here. The point is narrower: AB45’s current classifier evidence does not license them.

## Profile G — semantically incompatible classifier–noun combinations

### Current control examples

- `三本水`
- `三杯書`

### Source disposition

The Num–CL–N order is structurally well formed, but classifier choice is lexically/semantically restricted. Bond & Sio explicitly caution that classifier choice matters; Xia distinguishes lexical classifiers and measure-word behavior.

### AB45 disposition

**Classifier-compatibility controls only.**

Their degraded status cannot serve as a clean negative boundary on Num–CL–N syntax, because rejection can be driven by the classifier–noun pairing.

## Profile H — bare numeral

### Form

```text
Num
```

### Source disposition

Lam et al.’s noun-ellipsis example directly shows that bare `兩` cannot replace `兩本` in the tested classifier-ellipsis context.

### AB45 disposition

**Outside AB45.**

This is a clean source-backed contrast for the role of the classifier in nominal ellipsis. It is not a general claim that bare numerals are impossible in Cantonese in all functions.

## Required future executable matrix

A later runtime-alignment task should not start from current fixture counts. It should first build a controlled matrix with at least:

1. compatible overt `Num-CL-N` positives across several classifier classes;
2. context-linked `Num-CL-ØN` ellipsis vs bare numeral;
3. demonstrative + quantified classifier NP with the demonstrative outside the narrow AB45 child where architecture permits;
4. classifier–noun incompatibility controls explicitly labeled as lexical/semantic compatibility tests;
5. wh quantity profiles held separate until independently sourced;
6. age/dimension/measure profiles held separate until their unit-word category and structural owner are independently established.

## Status and promotion consequence

- Status remains `research_pending`.
- No supported-productivity promotion follows from these sources alone.
- No native-panel, corpus, or held-out requirement is satisfied by this re-audit.
- No executable fixture or runtime behavior is changed here.

The immediate next step is the current fixture-scope audit: identify exactly how many existing AB45 positives belong to each profile above and record the gap between the historical runtime family and the source-bounded linguistic claim.
