# CP042-P1 Manner-adverbial reconciliation R1

## Decision

Retain `MannerAdverbialVP` as `research_pending`, but narrow the externally supported claim to repeated property material followed by overt `咁／噉` before an action VP.

The pre-v0.5.199 runtime recognized only a bare sequence such as `慢慢行`. That path remains an implementation hypothesis with zero linguistic evidence weight. It must not inherit the source support for the overt-adverbializer pattern.

## Evidence used

- Leung 2014, pp. 13–15, gives `琴日慢慢噉食飯` and contrasts the order of the time expression and manner adverbial.
- 鄭定歐、張勵妍、高石英 2021, printed p. 336, contains `慢慢噉形成咗一套較為完善嘅公屋制度`.

Both sources support the visible sequence repeated `慢` + overt `噉` + following predicate. Neither establishes unrestricted lexical productivity, every possible predicate, the bare `慢慢 + V` route, or the analysis of every occurrence of `咁／噉`.

## Runtime reconciliation

v0.5.199 extends `mannerAdverbialVPFallback` so that:

- an optional overt `咁／噉` may occur after the repeated manner expression;
- the following predicate may be an already constructed VP rather than only one atomic verb;
- every visible surface token remains represented;
- discourse-marker uses of `咁／噉` remain outside this route unless preceded by the licensed repeated manner shape.

Accepted regression:

```text
佢慢慢噉食飯。
```

Expected structure:

```text
MannerAdverbialVP
├── 佢
├── 慢
├── 慢
├── 噉
└── ProductiveVO
    ├── 食
    └── 飯
```

## Status consequences

- `MannerAdverbialVP`: `unsupported_generalization` → `research_pending`.
- Productive promotion: not eligible.
- Speaker-panel evidence: none.
- Negative-boundary inventory: incomplete.
- Implementation-only labels: 63 → 62 because this construction now has one source-linked positive regression.
- No new verifier, probe format, validation directory, or audit framework was created.
