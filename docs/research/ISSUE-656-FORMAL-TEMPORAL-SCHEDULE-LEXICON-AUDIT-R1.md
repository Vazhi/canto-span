# ISSUE-656 刹那／日程／截止日期 lexical-register audit R1

Parent issue: #656  
Work claim: #657  
Date: 2026-08-07

## Decision

Retain all three Week 18 rows as valid source attestations, but narrow their learner-facing interpretations and leave register, frequency, and A1 suitability unresolved:

| Source row | Source entry | Terminal disposition |
|---|---|---|
| I059 | `刹那 saat3 naa5 — moment` | `VALID_SOURCE_VARIANT; GLOSS_TOO_BROAD_WITHOUT_INSTANT_OR_VERY_BRIEF_LIMIT` |
| I060 | `日程 jat6 cing4 — schedule` | `VALID_SHARED_LEXEME; SCHEDULE_OR_ITINERARY_RANGE; SPOKEN_FREQUENCY_UNRESOLVED` |
| I061 | `截止日期 zit6 zi2 jat6 kei4 — deadline` | `VALID_TRANSPARENT_CUTOFF_DATE_EXPRESSION; DEADLINE_GLOSS_BROAD_BUT_USABLE` |

The evidence supports lexical form, reading, and meaning. It does not establish that these are ordinary beginner-level conversational choices, that they share one temporal class, or that they need construction identities.

No immutable source, parser, runtime lexicon, pronunciation table, construction identity, status, corpus classification, survey, release, or deployment state is changed.

## I059 刹那

### Form and reading

Checked Cantonese lexical sources attest traditional `剎那` with `saat3 naa5` and the meaning ‘an instant; a very short moment’. The Week 18 source instead preserves `刹那`, an orthographic variant associated with simplified or variant character usage.

The independently checked evidence establishes:

```text
剎那 saat3 naa5
an instant / a very short moment
```

The exact Week 18 spelling `刹那` is preserved as provider source data. This packet does not silently normalize it to `剎那`, and it does not claim that the source spelling is the preferred Hong Kong traditional form.

### Gloss precision

English `moment` is possible but broad. It can refer to an unspecified point or short span, while `剎那／刹那` is lexically associated with extreme brevity. A source-preserving learner annotation should therefore add:

```text
instant; a very brief moment
```

rather than replacing the immutable source gloss.

### Register limit

The checked lexical sources establish historical origin, form, reading, and meaning. They do not establish a categorical formal, literary, written, rare, or non-colloquial label for contemporary Hong Kong Cantonese. A contextual corpus is required before assigning register or beginner-frequency metadata.

Terminal result:

```text
RETAIN_SOURCE_FORM_AND_READING;
PREFERRED_TRADITIONAL_ORTHOGRAPHY_NOT_DECIDED_IN_SOURCE_ROW;
NARROW_GLOSS_TO_INSTANT_IN_DERIVATIVE_ONLY;
REGISTER_AND_A1_STATUS_UNRESOLVED
```

## I060 日程

### Lexical range

Checked Cantonese lexical evidence gives:

```text
日程 jat6 cing4
schedule; itinerary
```

The term can refer to an ordered plan of activities or travel stages. The Week 18 gloss `schedule` is accurate as a basic gloss but does not show the itinerary/program range.

### Cantonese and written-language boundary

A checked dictionary explicitly records the term as used in Cantonese and in Mandarin or Standard Written Chinese. This supports lexical availability across those varieties. It does **not** establish:

- ordinary spoken frequency in Hong Kong Cantonese;
- preference over a context-specific alternative;
- an exclusively written or formal register;
- A1 suitability.

The safe classification is a valid shared lexical item whose contextual distribution remains to be measured.

### Candidate comparison terms

A later corpus task may compare `日程` with terms such as `行程`, `時間表`, `議程`, `賽程`, and `安排`. This packet does not adjudicate those terms as synonyms or replacements because they were not independently reviewed in this evidence ledger.

Terminal result:

```text
RETAIN_VALID_LEXEME;
GLOSS_SCHEDULE_ACCEPTABLE_WITH_ITINERARY_PROGRAM_RANGE;
SHARED_CANTONESE_AND_STANDARD_WRITTEN_AVAILABILITY;
SPOKEN_FREQUENCY_REGISTER_AND_A1_STATUS_UNRESOLVED
```

## I061 截止日期

### Internal meaning

Checked Cantonese dictionary entries establish:

```text
截止 zit6 zi2
reach the closing point; close; cut off

日期 jat6 kei4
date
```

The full source expression is semantically transparent:

```text
截止日期
cutoff date / closing date / deadline date
```

Lower-weight lexical sources independently attest the complete expression and source reading `zit6 zi2 jat6 kei4`.

### Gloss precision

English `deadline` is broadly usable but can refer to a time limit, a date, or a precise time. `截止日期` overtly specifies a **date**. A more exact learner gloss is:

```text
deadline date; cutoff date
```

The source gloss is therefore broad rather than false.

### Checked neighboring deadline expressions

The inspected lexical sources support these distinct neighboring profiles:

- `截止時間` cutoff or deadline time;
- `限期` or `期限` time-limit/deadline period;
- borrowed `dead det1` in some colloquial deadline or cutoff contexts.

These forms are not universal replacements for `截止日期`. Their domain, frequency, and register require contextual evidence.

Terminal result:

```text
RETAIN_VALID_TRANSPARENT_EXPRESSION;
SOURCE_READING_SUPPORTED;
GLOSS_DEADLINE_BROAD_BUT_ACCEPTABLE;
DERIVATIVE_GLOSS_DEADLINE_DATE_OR_CUTOFF_DATE;
REGISTER_FREQUENCY_AND_A1_STATUS_UNRESOLVED
```

## Lexical-class boundary

The three items do not constitute one grammatical class:

- `刹那／剎那` is a very-short-time noun;
- `日程` is a schedule or itinerary noun;
- `截止日期` is a transparent nominal expression identifying a date.

Their placement in a source subsection called `temporal_lexicon` is pedagogical organization, not evidence for one syntax or one parser identity.

A noun may occur inside a larger temporal modifier or PP, but lexical noun identity must remain separate from clause-level function. No bare-adverbial licensing is inferred from these isolated rows.

## Register and proficiency boundary

The Week 18 A1 label is source metadata. It does not establish CEFR frequency, conversational priority, or acquisition order.

Checked sources establish lexical validity and meaning. They do not supply:

- Hong Kong conversational frequency;
- written-versus-spoken ratios;
- age or education distribution;
- region-specific preference;
- learner-level norms.

Therefore no item is labeled categorically formal, literary, colloquial, rare, or inappropriate for A1 in this packet. Those are corpus and pedagogical-design questions.

## Source-row dispositions

### I059 刹那

```text
RETAIN_IMMUTABLE_SOURCE_VARIANT;
INDEPENDENT_TRADITIONAL_FORM_EVIDENCE_IS 剎那;
READING_SAAT3_NAA5_SUPPORTED;
MOMENT_GLOSS_TOO_GENERAL_AS_SOLE_EXPLANATION;
REGISTER_UNRESOLVED
```

### I060 日程

```text
RETAIN_VALID_SHARED_LEXEME;
SCHEDULE_GLOSS_ACCEPTABLE;
ITINERARY_OR_PROGRAM_RANGE_RECORDED;
SPOKEN_REGISTER_AND_A1_STATUS_UNRESOLVED
```

### I061 截止日期

```text
RETAIN_VALID_TRANSPARENT_EXPRESSION;
DEADLINE_GLOSS_ACCEPTABLE_BUT_DATE_SCOPE_UNDERSPECIFIED;
CUTOFF_DATE_OR_DEADLINE_DATE_RECOMMENDED_FOR_DERIVATIVE;
REGISTER_AND_A1_STATUS_UNRESOLVED
```

## Repository consequence

No current construction identity is needed. The strongest safe next actions are:

1. create a source-preserving teaching annotation that adds narrower glosses without rewriting source fields;
2. run a contextual Hong Kong Cantonese corpus/register inventory for the three forms and explicitly scoped comparison candidates;
3. audit lexical representation only if the runtime needs orthographic variants, sense distinctions, or provenance-aware learner labels;
4. keep construction and parser work out of scope unless full-sentence evidence later reveals a grammatical issue.

## Terminal outcome

- all three source rows: `RETAIN`.
- source readings: `SUPPORTED_OR_COMPOSITIONALLY_SUPPORTED`.
- `刹那` orthography: `SOURCE_VARIANT_PRESERVED; PREFERRED_HK_TRADITIONAL_FORM_NOT_INFERRED`.
- `moment` gloss: `TOO_BROAD_WITHOUT_INSTANT_LIMIT`.
- `日程` gloss: `ACCURATE_BASIC_GLOSS_WITH_ADDITIONAL_RANGE`.
- `截止日期` gloss: `BROAD_BUT_ACCURATE; DATE_SCOPE_SHOULD_BE_VISIBLE`.
- formal/written labels: `NOT_ESTABLISHED_AS_CATEGORICAL`.
- A1 suitability: `UNRESOLVED`.
- construction identity: `NOT_REQUIRED`.
- source/runtime/status change: no.

## Next separately claimed action

Open one bounded corpus/register inventory using contextual Hong Kong Cantonese examples for:

- `剎那／刹那`, `一剎那`, and explicitly sourced short-time comparison terms;
- `日程` and candidate schedule/itinerary comparison terms that receive their own lexical verification;
- `截止日期`, `截止時間`, `限期`, `期限`, and borrowed `dead det1`.

The inventory should record genre, medium, speaker context, meaning, and surrounding syntax. It must not infer register from raw counts alone, and each comparison term must receive its own provenance row before substantive conclusions are drawn.

A separate source-preserving teaching derivative may then add narrower glosses and orthographic notes. Runtime lexical edits require a fresh design claim.

## Protected-state confirmation

This packet changes no immutable source value, parser detector, runtime lexicon, pronunciation table, test, generated output, version, UUID, code, canonical name, linguistic status, readiness record, corpus classification, survey, panel result, held-out evidence, release, package, or deployment state.

It does not modify active AB33 or AA84 scopes.

## Source inventory

See `docs/research/ISSUE-656-FORMAL-TEMPORAL-SCHEDULE-SOURCE-INVENTORY-R1.md`.
