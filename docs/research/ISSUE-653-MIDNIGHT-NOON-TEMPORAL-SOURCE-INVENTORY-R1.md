# ISSUE-653 midnight/noon temporal source inventory R1

Parent issue: #653  
Work claim: #654  
Date: 2026-08-07

## Scope

This inventory evaluates Week 18 I036 `午夜`, I037 `正午`, I057 `半夜`, and I058 `中午`. It separates lexical meaning, noun classification, pronunciation notation, changed tone, regional senses, and source-preserving consequences.

No immutable source, runtime lexicon, pronunciation table, parser, identity, status, corpus, survey, release, or deployment change is authorized.

## Evidence ledger

| source_id | evidence_grade | verification | citation_and_locator | what_it_supports | limit | disposition |
|---|---|---|---|---|---|---|
| `SRC-WORDSHK-NG5-JE6` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `dictionary_entry_inspected` | Words.hk, entry `午夜`, reading `ng5 je6`, noun; definition: around twelve o’clock at night, used to distinguish midnight from daytime noon. | Supports lexical identity, reading, noun class, and midnight-centered meaning. | Dictionary evidence does not establish construction syntax, frequency, CEFR level, or a categorical register contrast with `半夜`. | `RETAIN_MIDNIGHT_CENTERED_LEXEME` |
| `SRC-WORDSHK-BUN3-JE2` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `dictionary_entry_inspected` | Words.hk, entry `半夜`, reading `bun3 je2`, noun; definition: usually the period after midnight until dawn; English “midnight; late at night.” | Supports lexical identity, current changed-tone surface, noun class, and a broader late-night/post-midnight temporal range. | Does not document the base tone, speaker distribution, optionality, or relationship to the Week 18 `bun3 je6` notation. | `RETAIN_BROADER_NIGHT_RANGE_AND_JE2_ATTESTATION` |
| `SRC-CANTODICT-BUN3-JE6-6STAR2` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `dictionary_entry_and_tone_notation_inspected` | CantoDict, entry `半夜`, Jyutping display `bun3 je6/6*2`, gloss “12 midnight”; site documentation states the asterisk convention marks changed-tone readings. | Supports a lexical representation preserving tone-6 and changed-tone-2 information for `夜` in this word. | Collaborative dictionary; the notation does not by itself establish which surface is preferred, obligatory, regional, or register-specific. | `RETAIN_BASE_CHANGED_TONE_NOTATION_CONFLICT` |
| `SRC-WORDSHK-ZING3-NG5` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `dictionary_entry_inspected` | Words.hk, entry `正午`, reading `zing3 ng5`, noun; definition: twelve o’clock in the daytime; English “high noon; noon.” | Supports lexical identity, reading, noun class, and exact-noon meaning. | Does not establish frequency, formality, or categorical contrast with `中午`. | `RETAIN_EXACT_NOON_LEXEME` |
| `SRC-WORDSHK-ZUNG1-NG5` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `dictionary_entry_inspected` | Words.hk, entry `中午`, reading `zung1 ng5`, noun; temporal sense defined as equivalent to `正午`, daytime twelve; English “noon; midday”; separate Macau sense “lunch.” | Supports lexical identity, reading, noun class, temporal overlap with `正午`, and a separate regional non-temporal sense. | Does not establish a universal colloquial/formal distinction or exact duration of “midday” in all contexts. | `RETAIN_COMMON_NOON_MIDDAY_AND_REGIONAL_SENSE_BOUNDARY` |
| `SRC-ALDERETE-CHAN-TANAKA-2022-CHANGED-TONE` | `DIRECT_SCHOLARLY_CORE` | `publisher_metadata_abstract_and_article_scope_inspected` | John Alderete, Queenie Chan, and Shin-ichi Tanaka. 2022. “The Morphology of Cantonese ‘Changed Tone’: Extensions and Limitations.” *Gengo Kenkyu* 161:139–169. DOI `10.11435/gengo.161.0_139`. | Directly establishes Cantonese changed tone as morphological substitution of a base tone by high-level or high-rising tone in selected derived environments and emphasizes empirical limits. | The inspected source does not identify `半夜`; it cannot prove this lexeme’s exact alternation, optionality, or preferred surface. | `GENERAL_CHANGED_TONE_INTERPRETIVE_SUPPORT_ONLY` |
| `SRC-WONG-1982-TONE-CHANGE-LEAD` | `DISCOVERY_LEAD_ONLY` | `dissertation_metadata_and_abstract_inspected_fulltext_restricted` | Maurice Kuen-Shing Wong. 1982. *Tone Change in Cantonese*. PhD dissertation, University of Illinois Urbana-Champaign. | Identifies a broad synchronic, diachronic, lexical, and stylistic investigation of Cantonese tone change. | Full substantive text was not inspected; no claim about `半夜` or style distribution is imported. | `BIBLIOGRAPHIC_LEAD_ONLY` |
| `SRC-GLOSSIKA-W18-I036-I037-I057-I058` | `ATTESTATION_ONLY` | `checked_in_source_inspected` | `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W18-20260719/source.json`: I036 `午夜 ng5 je6 — midnight`; I037 `正午 zing3 ng5 — noon`; I057 `半夜 bun3 je6 — midnight`; I058 `中午 zung1 ng5 — noon`. | Attests exact source forms, readings, glosses, ordering, and lesson classification. | Pedagogical source; does not independently establish lexical range, pronunciation preference, register, or proficiency level. | `RETAIN_AS_EXACT_TRIGGER` |
| `PROJECT-W18-F11-ROUTE` | `RUNTIME_OBSERVATION_ONLY` | `route_record_inspected` | Issue #481, route W18-F11. | Documents the retained temporal lexical/register dependency. | Routing has zero independent linguistic-evidence weight. | `RETAIN_AS_REPOSITORY_TRIGGER` |

## Supported lexical propositions

The checked lexical sources support:

1. all four items are nouns;
2. `午夜` identifies midnight or the time around nighttime twelve;
3. `半夜` can cover the post-midnight-to-dawn period and late night more broadly;
4. `正午` identifies daytime twelve or high noon;
5. `中午` temporally overlaps with `正午` and can be glossed noon/midday;
6. `中午` has a separate Macau-specific “lunch” sense;
7. `半夜 bun3 je2` is a current dictionary pronunciation;
8. another dictionary preserves `bun3 je6/6*2`, linking tone 6 with a changed-tone-2 notation.

## Changed-tone inference limit

The direct changed-tone article supports the existence and morphological nature of the general process. It does not contain the lexeme `半夜` in the inspected evidence used for this packet.

Therefore the combined evidence permits this inference only:

```text
The je6／je2 dictionary notation is compatible with a Cantonese base-versus-changed-tone analysis.
```

It does not establish:

- which variant every speaker produces;
- whether `je6` is a citation-only form;
- whether `je2` is obligatory in ordinary speech;
- whether the variants encode semantic or register differences;
- whether a productive changed-tone rule should be applied by the parser or lexicon.

## Gloss dispositions

### `午夜 — midnight`

Accurate basic gloss. The dictionary definition adds “around nighttime twelve” and explicit contrast with noon.

### `半夜 — midnight`

Possible in some contexts but inadequate as the sole teaching gloss. It obscures “late at night” and the period after midnight until dawn.

### `正午 — noon`

Accurate basic gloss. “High noon” or exact daytime twelve adds precision.

### `中午 — noon`

Accurate basic temporal gloss. “Midday” is also supported. The Macau “lunch” sense must remain a separate lexical sense.

## Pronunciation disposition for I057

The source reading `bun3 je6` is preserved as immutable source data.

The evidence state is:

- `bun3 je2`: directly attested by Words.hk;
- `bun3 je6/6*2`: directly attested by CantoDict;
- changed-tone process: directly supported generally by scholarship;
- exact lexeme-specific distribution: unresolved.

The correct project consequence is a pronunciation-review annotation, not an automatic source correction or global runtime replacement.

## Unsupported conclusions

The evidence does not establish:

- that `午夜` and `半夜` are exact synonyms;
- that `正午` and `中午` are never interchangeable;
- a categorical formal-versus-colloquial split;
- A1 suitability or frequency rankings;
- a universal bare temporal-modifier syntax for all four nouns;
- that source `bun3 je6` is simply erroneous;
- that a global changed-tone rule can derive the learner-facing pronunciation safely;
- a construction identity or parser rule;
- current runtime lexicon correctness.

## Repository consequence

The strongest next action is a bounded lexical-representation design audit capable of preserving source readings, base tones, changed-tone surfaces, regional senses, learner-facing preferences, and per-variant provenance. A separate corpus/register inventory should test usage differences before any frequency or formality label.

No immutable source, parser, runtime lexicon, pronunciation table, test, identity, status, corpus, survey, release, or deployment state is changed.
