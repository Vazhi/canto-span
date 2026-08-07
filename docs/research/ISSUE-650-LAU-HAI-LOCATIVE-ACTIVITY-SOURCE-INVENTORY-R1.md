# ISSUE-650 留喺 locative-activity source inventory R1

Parent issue: #650  
Work claim: #651  
Date: 2026-08-07

## Scope

This inventory evaluates Week 18 I078 `我留喺屋企睇電視。` by separating lexical `留`, locative `喺 + place`, following activity structure, and possible circumstance-SVC interpretation.

The exact source remains attestation only. No parser, identity, status, corpus, survey, release, or deployment change is authorized.

## Evidence ledger

| source_id | evidence_grade | verification | citation_and_locator | what_it_supports | limit | disposition |
|---|---|---|---|---|---|---|
| `SRC-KWAN-2010-LOCATIVE` | `DIRECT_SCHOLARLY_CORE` | `journal_fulltext_inspected` | Stella Wing-Man Kwan. 2010. “The Placement of Locative Prepositional Phrases in Cantonese: Processing and Iconicity.” *Taiwan Journal of Linguistics* 8(2):163–198; journal pp.165–169, especially examples (1)–(2) and the preverbal/postverbal interpretation contrast. Repository source record: `grammar/unsupported_generalization/LocativePlacePhrase.md`. | Directly supports preverbal `喺 + place + V` as location of the action and contrasts postverbal `V + 喺 + place` resulting/participant location; gives `我喺屋企食早餐`. | Does not analyze lexical `留`, serial verbs, or the complete I078 attachment. | `RETAIN_EVENT_VS_RESULT_LOCATION_BOUNDARY` |
| `SRC-WONG-ETAL-2023-HAI-CONSTRUCTION` | `DIRECT_SCHOLARLY_CORE` | `published_full_book_pdf_and_exact_pages_inspected` | Anita Mei-Yin Wong, with Candice Chi-Hang Cheung, Jessica Ming-Wai Lo, and Elaine Ka-Ho Wan. 2023. “Grammatical Analysis of Cantonese Samples.” Chapter 2 of *Understanding Development and Disorder in Cantonese using Language Sample Analysis*. Routledge. DOI `10.4324/9780367824013`; printed p.47 / PDF p.57, section 12.2. | Defines `喺` PP followed by a VP or appearing alone; gives `佢喺泳池游水`, `佢喺泳池`, and ambiguous `我喺度做功課`. | Descriptive coding framework; does not analyze `留喺 + place + VP` or select attachment in I078. | `RETAIN_HAI_PREDICATE_EVENT_AND_HAIDOU_BOUNDARIES` |
| `SRC-WONG-ETAL-2023-CIRCUMSTANCE-SVC` | `DIRECT_SCHOLARLY_CORE` | `published_full_book_pdf_and_exact_page_inspected` | Same chapter; printed p.52 / PDF p.62, section 14.1 VIII “Circumstance,” example `搭地鐵 睇書` ‘read while taking the subway’. | Directly describes a circumstance SVC subtype in which the first verb describes the circumstance under which the second action takes place. | Close semantic profile only; the example lacks intervening `喺 + place` and does not establish I078 as a member or define all attachment properties. | `RETAIN_AS_CLOSE_RELATION_PROFILE` |
| `SRC-WORDSHK-LAU4` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `dictionary_entry_inspected` | Words.hk, entry `留`, reading `lau4`, sense 1: remain/stay/reside in the same location without leaving; examples include `留低喺安全地方`. | Supports lexical identity, reading, verb category, stay/remain meaning, and compatibility with overt locative material. | Dictionary evidence does not establish construction syntax, productivity, or the relation to a following VP. | `RETAIN_LEXICAL_STAY_PROFILE` |
| `SRC-WORDSHK-BOU1KEK6` | `ATTESTATION_ONLY` | `dictionary_example_inspected` | Words.hk, entry `煲劇`, example `禮拜六日我鍾意留喺屋企煲劇。` | Close contextual attestation of `留喺屋企 + television-related activity`. | Isolated dictionary example; does not decide constituent attachment or serial-verb classification. | `RETAIN_CLOSE_ATTESTATION` |
| `SRC-HKUST-WEEKEND-PLAN` | `ATTESTATION_ONLY` | `official_teaching_transcript_inspected` | HKUST Cantonese Listening Tasks, Unit 9.1 “Weekend plan”; transcript includes `星期五我哋喺屋企睇電視好好咁休息吓` and translates the plan as staying home to watch TV and rest. | Attests event-location `喺屋企睇電視` in a naturalistic teaching dialogue and a larger co-event sequence. | Pedagogical transcript; no independent construction analysis or exact lexical `留`. | `RETAIN_CONTEXTUAL_EVENT_LOCATION_ATTESTATION` |
| `SRC-GLOSSIKA-W18-I078` | `ATTESTATION_ONLY` | `checked_in_source_inspected` | `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W18-20260719/source.json`, I078 `我留喺屋企睇電視。`, Jyutping `ngo5 lau4 hai2 uk1 kei2 tai2 din6 si6.`, English “I'm staying home watching TV.” | Attests exact surface, order, source segmentation, Jyutping, translation, and register. | Does not independently establish attachment, SVC classification, productivity, or progressive aspect. | `RETAIN_AS_EXACT_TRIGGER` |
| `PROJECT-AA80-IDENTITY` | `RUNTIME_OBSERVATION_ONLY` | `current_identity_registry_inspected` | `data/construction-identities.json`, AA80 `OvertPlaceExpressionWrapper`, profile `OvertHaiLocalizerAndPlaceExpressionAggregate`. | Shows the current wrapper preserves overt spatial material across several environments and explicitly does not determine role. | Parser representation has zero independent linguistic-evidence weight and cannot decide I078 attachment. | `ROLE_NEUTRAL_WRAPPER_ONLY` |
| `PROJECT-AA80-NOTE` | `RUNTIME_OBSERVATION_ONLY` | `current_note_inspected` | `grammar/unsupported_generalization/LocativePlacePhrase.md`; current guidance requires decomposition into event location, predicate location, result/goal location, localizer expressions, and `喺度` ambiguity. | Records current repository boundary and protected compatibility state. | Test counts, runtime references, and status metadata do not prove the linguistic analysis. | `PRESERVE_DECOMPOSITION_BOUNDARY` |
| `PROJECT-W18-F07-ROUTE` | `RUNTIME_OBSERVATION_ONLY` | `route_record_inspected` | Issue #481, route W18-F07. | Documents the unresolved mixed research/parser-audit dependency. | Routing has zero independent linguistic-evidence weight. | `RETAIN_AS_TRIGGER` |

## Directly supported propositions

Qualifying evidence supports:

1. `留 lau4` is a lexical verb meaning stay or remain in a place.
2. `喺 + place + VP` is a documented preverbal event-location order.
3. `subject + 喺 + place` without a following VP can form a static locative predicate.
4. postverbal `V + 喺 + place` may express a resulting or participant location and must remain separate.
5. `喺度 + VP` can be ambiguous between locative and progressive readings.
6. Cantonese has a circumstance SVC subtype in which a first predicate supplies the circumstance of a second action.
7. close contextual sources attest `留喺屋企 + activity` and `喺屋企睇電視`.

## Exact I078 limit

No inspected qualifying source directly analyzes:

```text
留 + 喺屋企 + 睇電視
```

The direct sources establish the component structures and a close semantic relation. They do not select whether the PP attaches to `留`, `睇電視`, both, or a larger circumstance predicate.

## Unsupported conclusions

The evidence does not establish:

- one productive `留喺 + place + VP` construction;
- a mandatory circumstance-SVC analysis;
- a hidden conjunction such as ‘and’ or ‘while’;
- an unexpressed purpose relation;
- overt progressive aspect in I078;
- one semantic role for every AA80 place wrapper;
- a hidden second subject;
- unrestricted `留` valency across its other lexical senses;
- a new UUID or parser rule;
- current runtime correctness.

## Repository consequence

I078 should first receive a parser-output audit that preserves all overt components and permits unresolved attachment. A contextual corpus inventory should then test whether `留喺 + place + activity` has a stable distribution requiring an independent composition record.

No immutable source, parser, runtime, test, identity, status, corpus, survey, release, or deployment state is changed.
