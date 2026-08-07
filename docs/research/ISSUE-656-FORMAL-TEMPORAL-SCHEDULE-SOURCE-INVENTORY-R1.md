# ISSUE-656 刹那／日程／截止日期 source inventory R1

Parent issue: #656  
Work claim: #657  
Date: 2026-08-07

## Scope

This inventory evaluates Week 18 I059 `刹那`, I060 `日程`, and I061 `截止日期`. It separates lexical form, pronunciation, meaning, orthography, register, proficiency level, and source-preserving consequences.

No immutable source, runtime lexicon, parser, identity, status, corpus, survey, release, or deployment change is authorized.

## Evidence ledger

| source_id | evidence_grade | verification | citation_and_locator | what_it_supports | limit | disposition |
|---|---|---|---|---|---|---|
| `SRC-CUHK-HUMANUM-SAT3-NAA5` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `university_lexical_page_inspected` | Chinese University of Hong Kong Humanum character database, `剎`, Cantonese reading `saat3`; compound `剎那` and historical very-short-time sense. | Supports traditional `剎那`, the first-syllable reading, compound identity, and instant/very-brief-time meaning. | Does not independently establish Week 18 `刹那` as preferred Hong Kong orthography, ordinary spoken frequency, or A1 suitability. | `RETAIN_TRADITIONAL_FORM_AND_INSTANT_MEANING` |
| `SRC-JYUTDICT-JAT1-SAT3-NAA5` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `dictionary_aggregation_entry_inspected` | Jyut Dictionary entry `一剎那 jat1 saat3 naa5`, drawing on Cantonese lexical data; noun, “an instant; a very short moment,” with a Cantonese example. | Corroborates `saat3 naa5` inside a lexical expression and the very-brief meaning. | Compound `一剎那` does not by itself establish bare `刹那` orthographic preference, register, or frequency. | `CORROBORATE_READING_AND_NARROW_GLOSS` |
| `SRC-WIKTIONARY-SAT3-NAA5-VARIANT` | `ATTESTATION_ONLY` | `entry_inspected` | Wiktionary entries for `剎那／刹那`, Cantonese `saat3 naa5` with an additional listed reading variant. | Attests orthographic linkage between `剎那` and `刹那` and the source reading. | Community-edited lexical source; does not establish preferred Hong Kong form, productivity, or register. | `RETAIN_AS_ORTHOGRAPHIC_VARIANT_ATTESTATION` |
| `SRC-CANTODICT-JAT6-CING4` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `dictionary_entry_inspected` | CantoDict entry `日程 jat6 cing4`, glosses “schedule; itinerary”; entry marks use in Cantonese and Mandarin/Standard Written Chinese. | Supports lexical identity, reading, schedule/itinerary range, and cross-variety lexical availability. | Lexical availability does not establish ordinary spoken frequency, preferred context, formality, or A1 suitability. | `RETAIN_SHARED_SCHEDULE_ITINERARY_LEXEME` |
| `SRC-CANTONESECLASS101-JAT6-CING4` | `ATTESTATION_ONLY` | `teaching_material_inspected` | CantoneseClass101/Innovative Language teaching PDF containing `我嘅日程` in a schedule context. | Contextually attests `日程` inside a Cantonese nominal phrase. | Pedagogical example; no independent register, frequency, or construction authority. | `RETAIN_CONTEXTUAL_ATTESTATION` |
| `SRC-WORDSHK-ZIT6-ZI2` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `dictionary_entry_inspected` | Words.hk entry `截止 zit6 zi2`, verb: reach the closing point, close, stop accepting after a stated point. | Supports lexical form, reading, and cutoff/closing semantics of the first component. | Does not by itself establish the complete compound, its register, or exact English translation. | `RETAIN_CUTOFF_COMPONENT` |
| `SRC-WORDSHK-JAT6-KEI4` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `dictionary_entry_inspected` | Words.hk entry `日期 jat6 kei4`, noun: date. | Supports lexical form, reading, noun class, and date meaning of the second component. | Does not by itself establish the complete compound or learner level. | `RETAIN_DATE_COMPONENT` |
| `SRC-JYUTDICT-ZIT6-ZI2-JAT6-KEI4` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `dictionary_entry_inspected` | Jyut Dictionary entry `截止日期 zit6 zi2 jat6 kei4`, glossed deadline/cutoff date. | Independently attests the complete expression and source reading. | Aggregated lexical source; does not establish spoken frequency, register, or preferred alternative. | `RETAIN_COMPLETE_EXPRESSION_ATTESTATION` |
| `SRC-CANTODICT-DEADLINE-NEIGHBORS` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `dictionary_entries_inspected` | CantoDict entries including `截止時間 zit6 zi2 si4 gaan1` “deadline,” `期限 kei4 haan6`, and `限期 haan6 kei4` time-limit/deadline senses. | Supports neighboring deadline expressions and the distinction between a date, a time, and a time-limit expression. | Does not establish universal interchangeability or register hierarchy. | `RETAIN_NEIGHBORING_LEXICAL_BOUNDARIES` |
| `SRC-WORDSHK-DEAD-COLLOQUIAL` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `dictionary_entry_inspected` | Words.hk entry for borrowed `dead det1`, including colloquial deadline/cutoff use. | Supports existence of a colloquial borrowed deadline expression in some contexts. | Does not make it a universal replacement for `截止日期` or establish frequency across domains. | `RETAIN_AS_COLLOQUIAL_COLLISION_ONLY` |
| `SRC-GLOSSIKA-W18-I059-I061` | `ATTESTATION_ONLY` | `checked_in_source_inspected` | `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W18-20260719/source.json`: I059 `刹那 saat3 naa5 — moment`; I060 `日程 jat6 cing4 — schedule`; I061 `截止日期 zit6 zi2 jat6 kei4 — deadline`. | Attests exact source forms, readings, glosses, ordering, and A1 lesson placement. | Pedagogical source; does not independently establish preferred orthography, lexical range, spoken frequency, register, or proficiency level. | `RETAIN_AS_EXACT_TRIGGER` |
| `PROJECT-W18-F11-ROUTE` | `RUNTIME_OBSERVATION_ONLY` | `route_record_inspected` | Issue #481, route W18-F11. | Documents the retained temporal lexical/register dependency. | Routing has zero independent linguistic-evidence weight. | `RETAIN_AS_REPOSITORY_TRIGGER` |

## Supported lexical propositions

The checked sources support:

1. traditional `剎那` with `saat3 naa5` and an instant/very-short-moment meaning;
2. source `刹那` as an attested orthographic variant, without establishing it as preferred Hong Kong traditional spelling;
3. `日程 jat6 cing4` as a valid schedule/itinerary lexeme available in Cantonese and Standard Written Chinese contexts;
4. `截止 zit6 zi2` as cutoff/closing and `日期 jat6 kei4` as date;
5. complete `截止日期 zit6 zi2 jat6 kei4` as a cutoff/deadline-date expression;
6. neighboring deadline expressions distinguish date, time, time limit, and colloquial borrowed terminology.

## Register and proficiency limit

None of the checked lexical sources supplies controlled Hong Kong spoken-frequency or CEFR evidence. Cross-variety availability, historical etymology, dictionary inclusion, and pedagogical placement cannot independently establish:

- ordinary conversation frequency;
- formal, literary, technical, administrative, or colloquial status as a categorical label;
- preference over a neighboring term;
- A1 suitability.

These remain contextual corpus and pedagogical-design questions.

## Gloss dispositions

### `刹那 — moment`

Semantically related but too broad as the only learner gloss. Checked evidence supports “instant; very brief moment.”

### `日程 — schedule`

Accurate basic gloss. “Itinerary” or ordered program is also supported. The evidence does not establish one preferred English gloss in every context.

### `截止日期 — deadline`

Broad but usable. The overt `日期` component specifies a date, so “deadline date; cutoff date” is more exact.

## Orthographic disposition for I059

The immutable source uses `刹那`. Independent traditional-form evidence foregrounds `剎那`; lower-weight lexical evidence links the variants.

Therefore:

- preserve source `刹那` exactly;
- do not silently correct or normalize it;
- record `剎那` as an independently supported traditional form;
- leave preferred Hong Kong orthography to a later orthographic/lexical design decision if runtime representation requires it.

## Unsupported conclusions

The evidence does not establish:

- that source `刹那` is erroneous;
- that `剎那` and `刹那` differ in meaning or pronunciation;
- that `刹那／剎那` is categorically literary or unsuitable for speech;
- that `日程` is an ordinary high-frequency spoken A1 choice;
- that `日程` should always be replaced by `行程` or `時間表`;
- that `截止日期` is interchangeable with every deadline expression;
- a construction identity or parser rule;
- current runtime lexicon correctness.

## Repository consequence

The strongest next action is a source-preserving teaching annotation plus a contextual corpus/register inventory. Runtime lexical design is needed only if the application must preserve orthographic variants, sense distinctions, or learner-facing preference metadata with provenance.

No immutable source, parser, runtime lexicon, pronunciation table, test, identity, status, corpus, survey, release, or deployment state is changed.
