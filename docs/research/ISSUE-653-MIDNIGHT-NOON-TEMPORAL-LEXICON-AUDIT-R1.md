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

The Week 18 `半夜 bun3 je6` reading is **not declared categorically wrong**. Current sources differ in pronunciation notation:

- Words.hk gives `bun3 je2`;
- CantoDict displays `bun3 je6/6*2`;
- direct scholarship establishes Cantonese changed tone generally but does not analyze `半夜` in the inspected evidence.

The safe disposition is therefore:

```text
SOURCE_BUN3_JE6_PRESERVED;
HIGH_RISING_BUN3_JE2_SURFACE_ATTESTED;
CHANGED_TONE_INTERPRETATION_COMPATIBLE_NOT_LEXEME_SPECIFICALLY_PROVEN;
EXACT_VARIANT_DISTRIBUTION_AND_LEARNER_PREFERENCE_NOT_ESTABLISHED
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

### 半夜 and the `je6／je2` notation difference

Words.hk classifies `半夜` as a noun, gives `bun3 je2`, and defines a period after twelve at night until dawn, with English glosses including “midnight” and “late at night.”

This range is broader than the checked `午夜` definition. Translating either term as “midnight” can be possible in context, but the source gloss does not teach the clock-centered versus broader-interval distinction.

CantoDict displays `半夜` as `bun3 je6/6*2`. The entry establishes that one dictionary preserves both tone-6 and tone-2-related notation for the second syllable. Combined with general changed-tone scholarship, this is compatible with a base-versus-changed-tone interpretation. The entry and inspected scholarship do not establish the exact lexeme-specific analysis, distribution, or preferred learner form.

Terminal result:

```text
VALID_BROADER_LATE_NIGHT_NOUN;
SOURCE_GLOSS_UNDERSPECIFIED;
HIGH_RISING_JE2_SURFACE_ATTESTED;
PRONUNCIATION_VARIANT_REVIEW_REQUIRED
```

## Pair 2: 正午 and 中午

### 正午 `zing3 ng5`

Words.hk defines `正午` as daytime twelve o’clock and glosses it as “high noon; noon.” This is an exact clock-centered definition.

Terminal result: `VALID_EXACT_NOON_NOUN`.

### 中午 `zung1 ng5`

Words.hk defines `中午` as equivalent to `正午`, daytime twelve o’clock, with glosses “noon; midday.” The same entry records a separate Macau-specific lexical sense meaning “lunch,” abbreviated from `中午飯`.

For ordinary Hong Kong Cantonese temporal use, the checked source does not establish a categorical semantic opposition between `中午` and `正午`. `中午` is compatible with an ordinary “noon / midday” label, while `正午` explicitly encodes exact noon in the dictionary definitions, but frequency and register require corpus evidence.

Terminal result:

```text
VALID_COMMON_NOON_OR_MIDDAY_NOUN;
TEMPORAL_GLOSS_ACCEPTABLE;
MACAU_LUNCH_SENSE_SEPARATE
```

## Changed-tone interpretation boundary

Alderete, Chan, and Tanaka analyze Cantonese changed tone as morphological replacement of a base tone by a high-level or high-rising tone in selected derived environments. The article establishes:

- changed tone is a real Cantonese morphological phenomenon;
- lexical representations may need to distinguish base and derived tonal information;
- the process has empirical limits and cannot be applied mechanically to every compound.

The article does not list `半夜` in the inspected evidence used here. It therefore supports interpretation of the dictionary disagreement only at a general level and does not independently prove:

- that `je2` in `半夜` is derived by that process;
- that every speaker uses `bun3 je2`;
- that `bun3 je6` is impossible or citation-only;
- that the alternation is optional in every register;
- that the Week 18 source intended an underlying form;
- that a global tone-change rule should be implemented.

The exact lexeme-specific evidence remains dictionary-level:

- one checked source gives `bun3 je2`;
- another displays `je6/6*2`.

A later lexical-design and contextual pronunciation review must decide learner-facing preference. This packet does not instruct a corrected derivative to foreground either form.

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

Checked dictionaries establish lexical validity, not acquisition level. The available evidence supports only:

- `午夜` and `正午` have exact clock-centered definitions;
- `半夜` has a broader late-night/post-midnight range;
- `中午` overlaps with exact noon and has a separate regional lunch sense;
- stronger formal/colloquial or frequency claims require corpus or controlled register evidence.

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
HIGH_RISING_BUN3_JE2_SURFACE_ATTESTED;
CHANGED_TONE_ANALYSIS_COMPATIBLE_NOT_PROVEN_FOR_LEXEME;
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

No current construction identity is needed for these lexical distinctions. The strongest later action is a lexical-representation design audit or source-preserving annotation record that:

1. distinguishes `午夜` from the broader `半夜` interval;
2. preserves Week 18 `bun3 je6`, records current `bun3 je2` and CantoDict’s dual notation, and keeps the changed-tone interpretation explicitly provisional at lexeme level;
3. determines learner-facing preference only after contextual pronunciation and register review;
4. treats `正午` and `中午` as overlapping noon terms without inventing a hard register split;
5. keeps the Macau “lunch” sense of `中午` separate;
6. does not alter runtime until a variant-aware lexical design is reviewed.

## Terminal outcome

- all four forms: `VALID_LEXEMES`.
- `午夜` versus `半夜`: `MEANINGFUL_SEMANTIC_RANGE_CONTRAST`.
- source duplicate “midnight” gloss: `PEDAGOGICALLY_UNDERSPECIFIED`.
- `正午` versus `中午`: `SUBSTANTIAL_TEMPORAL_OVERLAP_WITH_DIFFERENT_DEFINITIONAL_FOCUS`.
- source duplicate “noon” gloss: `ACCEPTABLE_BASIC_GLOSS`.
- `半夜 bun3 je6`: `PRESERVE_AS_SOURCE_READING_NOT_CATEGORICALLY_REJECTED`.
- `半夜 bun3 je2`: `HIGH_RISING_SURFACE_ATTESTED`.
- lexeme-specific changed-tone derivation: `COMPATIBLE_NOT_PROVEN`.
- exact pronunciation distribution and learner preference: `UNRESOLVED`.
- global changed-tone rule: `NOT_AUTHORIZED`.
- source/runtime/status change: no.

## Next separately claimed action

Open one bounded lexical-representation design audit before any runtime edit. It should determine whether the project’s lexicon can preserve:

- immutable source reading;
- alternative dictionary surfaces and notations;
- hypothesized base/derived relationships separately from directly attested pronunciation;
- regional or register variants;
- learner-facing preferred form only after evidence review;
- provenance per variant.

A small corpus/register and pronunciation inventory should separately compare `午夜／半夜` and `正午／中午` in contextual Hong Kong Cantonese. It should not use raw frequency as proof of interchangeability or use general changed-tone theory as lexeme-specific pronunciation proof.

## Protected-state confirmation

This packet changes no immutable source value, parser detector, runtime lexicon, pronunciation table, test, generated output, version, UUID, code, canonical name, linguistic status, readiness record, corpus classification, survey, panel result, held-out evidence, release, package, or deployment state.

It does not modify active AB33 or AA84 scopes.

## Source inventory

See `docs/research/ISSUE-653-MIDNIGHT-NOON-TEMPORAL-SOURCE-INVENTORY-R1.md`.
