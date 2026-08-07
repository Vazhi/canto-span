# ISSUE-653 midnight/noon temporal-lexicon audit R1

Parent issue: #653  
Work claim: #654  
Date: 2026-08-07

## Decision

Retain all four Week 18 source entries as valid temporal nouns, but do not treat each English-gloss pair as lexical identity:

| Source row | Source form | Terminal lexical disposition |
|---|---|---|
| I036 | `午夜 ng5 je6 — midnight` | `VALID_MIDNIGHT_CENTERED_TERM` |
| I057 | `半夜 bun3 je6 — midnight` | `VALID_BROADER_LATE_NIGHT_OR_POST_MIDNIGHT_TERM_WITH_PRONUNCIATION_REVIEW_FLAG` |
| I037 | `正午 zing3 ng5 — noon` | `VALID_EXACT_NOON_TERM` |
| I058 | `中午 zung1 ng5 — noon` | `VALID_COMMON_NOON_OR_MIDDAY_TERM` |

The duplicate English gloss `midnight` materially compresses a learner-relevant distinction:

- `午夜` is centered on twelve o’clock at night or the time around midnight;
- `半夜` can denote the later part of the night and is defined in a current Cantonese dictionary as the period after midnight until dawn.

The duplicate English gloss `noon` is acceptable as a basic gloss for both `正午` and `中午`. Current checked lexicographic evidence explicitly defines `中午` as equivalent to `正午` at daytime twelve, while `正午` is the more exact “high noon / twelve o’clock in the daytime” expression. The available evidence does not justify a strong universal colloquial-versus-formal rule.

The Week 18 `半夜 bun3 je6` reading is **not declared categorically wrong**. Current sources conflict in notation:

- Words.hk gives the lexical entry as `bun3 je2`;
- CantoDict records `bun3 je6/6*2`, explicitly preserving a tone-6 base and a changed-tone-2 representation;
- direct changed-tone scholarship establishes the general Cantonese process of replacing a base tone with a high-rising or high-level tone in derived lexical environments, but the inspected article does not analyze `半夜` itself.

The safe disposition is therefore:

```text
SOURCE_BUN3_JE6_PRESERVED;
CURRENT_LEARNER_FACING_CHANGED_TONE_BUN3_JE2_ATTESTED;
EXACT_VARIANT_DISTRIBUTION_NOT_ESTABLISHED
```

No immutable source, runtime lexicon, pronunciation table, construction identity, status, corpus classification, survey, release, or deployment state is changed.

## Pair 1: 午夜 and 半夜

### 午夜 `ng5 je6`

Words.hk classifies `午夜` as a noun and defines it as the time around twelve o’clock at night, explicitly contrasting it with daytime `中午`.

Supported lexical core:

```text
午夜
nighttime twelve o’clock / around midnight
```

This term can occur inside a temporal PP or time expression, as in a source example equivalent to “at 12:20 a.m.” Its noun classification does not imply that Canto Span needs a distinct construction identity for temporal modification.

Terminal result: `VALID_MIDNIGHT_CENTERED_NOUN`.

### 半夜 `bun3 je2` or base/changed-tone notation

Words.hk classifies `半夜` as a noun and gives the pronunciation `bun3 je2`. Its definition covers the period after twelve at night until dawn, with English glosses including “midnight” and “late at night.”

This range is broader than the checked `午夜` definition. In many contexts, translating either term as “midnight” is possible, but the source gloss does not teach the difference between a clock-centered term and a broader late-night interval.

CantoDict records `半夜` as `bun3 je6/6*2`. That notation is compatible with a base tone 6 and a changed-tone realization 2. It demonstrates that `bun3 je6` is not safely dismissible as an arbitrary error, while also showing that the source’s single unqualified reading is insufficient for a learner-facing pronunciation decision.

Terminal result:

```text
VALID_BROADER_LATE_NIGHT_NOUN;
SOURCE_GLOSS_UNDERSPECIFIED;
PRONUNCIATION_VARIANT_REVIEW_REQUIRED
```

## Pair 2: 正午 and 中午

### 正午 `zing3 ng5`

Words.hk defines `正午` as daytime twelve o’clock and glosses it as “high noon; noon.” This is an exact clock-centered definition.

Terminal result: `VALID_EXACT_NOON_NOUN`.

### 中午 `zung1 ng5`

Words.hk defines `中午` as equivalent to `正午`, daytime twelve o’clock, with glosses “noon; midday.” The same entry records a separate Macau-specific lexical sense meaning “lunch,” abbreviated from `中午飯`.

For ordinary Hong Kong Cantonese temporal use, the checked source does not establish a categorical semantic opposition between `中午` and `正午`. `中午` is compatible with a broader everyday “noon / midday” label, while `正午` explicitly encodes exact noon in the dictionary definitions, but frequency and register require corpus evidence.

Terminal result:

```text
VALID_COMMON_NOON_OR_MIDDAY_NOUN;
TEMPORAL_GLOSS_ACCEPTABLE;
MACAU_LUNCH_SENSE_SEPARATE
```

## Changed-tone boundary for 半夜

Alderete, Chan, and Tanaka analyze Cantonese changed tone as morphological replacement of a base tone by a high-level or high-rising tone in certain derived environments. The article establishes:

- changed tone is a real Cantonese morphological phenomenon;
- base and changed-tone information may both be relevant to lexical representation;
- the process has lexical and constructional limits and cannot be applied mechanically to every compound.

The article does not list `半夜` in the inspected evidence used here. Therefore it supports interpretation of the dictionary notation but does not independently prove:

- that every speaker uses `bun3 je2`;
- that `bun3 je6` is impossible;
- that the alternation is optional in all registers;
- that the source intended an underlying rather than spoken form;
- that a global tone-change rule should be implemented.

The exact lexeme-specific evidence remains dictionary-level:

- one checked source foregrounds `bun3 je2`;
- another preserves `je6/6*2`.

A corrected teaching derivative should foreground the currently attested spoken changed-tone form while recording the base/variant notation and source disagreement. It should not rewrite the immutable Week 18 row.

## Lexical-class and syntax boundary

All four checked Words.hk entries are nouns. Their use in time expressions can make the larger constituent function adverbially:

```text
喺午夜十二點……
at 12 midnight …

喺中午十二點……
at 12 noon …
```

This does not transform the lexeme itself into a universal temporal adverb or justify one `TemporalPhrase` construction from dictionary examples alone.

Keep separate:

- lexical noun identity;
- PP or bare-time placement in a clause;
- exact clock expressions containing numerals and `點／時`;
- duration nouns;
- schedule nouns;
- regional non-temporal lexical senses;
- source pedagogical level or frequency.

## Register and A1 boundary

The Week 18 source places all four terms in an A1 lesson, but source placement does not prove ordinary A1 frequency or register.

Checked dictionaries establish lexical validity, not acquisition level. The available evidence supports these limited observations:

- `午夜` and `正午` are exact clock-centered terms in their definitions;
- `半夜` and `中午` have broader ordinary temporal ranges or uses;
- a stronger claim that the first pair is formal and the second pair colloquial requires corpus or controlled register evidence.

No CEFR or learner-level reclassification is authorized.

## Source-row dispositions

### I036 午夜

```text
RETAIN_VALID_LEXEME;
GLOSS_MIDNIGHT_ACCEPTABLE;
NO_PRONUNCIATION_BLOCKER
```

### I057 半夜

```text
RETAIN_VALID_LEXEME;
GLOSS_MIDNIGHT_TOO_NARROW_AS_SOLE_TEACHING_GLOSS;
SOURCE_BUN3_JE6_PRESERVED;
BUN3_JE2_CHANGED_TONE_ATTESTED;
VARIANT_DISTRIBUTION_UNRESOLVED
```

### I037 正午

```text
RETAIN_VALID_LEXEME;
GLOSS_NOON_ACCEPTABLE;
EXACT_NOON_SCOPE_RECORDED
```

### I058 中午

```text
RETAIN_VALID_LEXEME;
GLOSS_NOON_ACCEPTABLE;
MIDDAY_AND_MACAU_LUNCH_SENSES_RECORDED_SEPARATELY
```

## Repository consequence

No current construction identity is needed for these lexical distinctions. The strongest later action is a source-preserving corrected teaching derivative or lexical annotation record that:

1. distinguishes `午夜` from the broader `半夜` interval;
2. records `半夜 bun3 je2` as a current learner-facing pronunciation while preserving the Week 18 `bun3 je6` source value and CantoDict base/changed-tone notation;
3. treats `正午` and `中午` as overlapping noon terms without inventing a hard register split;
4. keeps the Macau “lunch” sense of `中午` separate;
5. does not alter runtime until a homograph/variant-aware lexical design is reviewed.

## Terminal outcome

- all four forms: `VALID_LEXEMES`.
- `午夜` versus `半夜`: `MEANINGFUL_SEMANTIC_RANGE_CONTRAST`.
- source duplicate “midnight” gloss: `PEDAGOGICALLY_UNDERSPECIFIED`.
- `正午` versus `中午`: `SUBSTANTIAL_TEMPORAL_OVERLAP_WITH_DIFFERENT_DEFINITIONAL_FOCUS`.
- source duplicate “noon” gloss: `ACCEPTABLE_BASIC_GLOSS`.
- `半夜 bun3 je6`: `PRESERVE_AS_SOURCE_READING_NOT_CATEGORICALLY_REJECTED`.
- `半夜 bun3 je2`: `CURRENT_CHANGED_TONE_SURFACE_ATTESTED`.
- exact pronunciation distribution: `UNRESOLVED`.
- global changed-tone rule: `NOT_AUTHORIZED`.
- source/runtime/status change: no.

## Next separately claimed action

Open one bounded lexical-representation design audit before any runtime edit. It should determine whether the project’s lexicon can preserve:

- immutable source reading;
- citation/base tone;
- changed-tone surface;
- regional or register variants;
- learner-facing preferred form;
- provenance per variant.

A small corpus/register inventory should separately compare `午夜／半夜` and `正午／中午` in contextual Hong Kong Cantonese. It should measure time range and register without using raw frequency as proof of interchangeability.

## Protected-state confirmation

This packet changes no immutable source value, parser detector, runtime lexicon, pronunciation table, test, generated output, version, UUID, code, canonical name, linguistic status, readiness record, corpus classification, survey, panel result, held-out evidence, release, package, or deployment state.

It does not modify active AB33 or AA84 scopes.

## Source inventory

See `docs/research/ISSUE-653-MIDNIGHT-NOON-TEMPORAL-SOURCE-INVENTORY-R1.md`.
