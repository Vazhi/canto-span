# ISSUE-635 著／着 zoek3 wear-verb profile disposition R1

Parent issue: #635  
Work claim: #636  
Date: 2026-08-05

## Decision

Retain `著／着 zoek3` as a directly supported Cantonese lexical verb meaning ‘wear; put on’.

The supported lexical core is:

```text
著／着 zoek3 + clothing or wearable nominal
```

Dictionary and contextual examples also attest the wear verb with following progressive `緊` and durative `住`. Those examples establish lexical reading and contextual occurrence; they do not by themselves establish unrestricted aspect productivity or a new construction identity.

The orthographic forms `著` and `着` must remain homograph-aware and reading-sensitive. Neither character can be globally assigned `zoek3`, because independent sources also list distinct `zyu3` and `zoek6` readings and senses.

No parser, runtime lexicon, pronunciation table, construction identity, status, corpus classification, survey, or release change is authorized by this packet.

## Source-supported lexical profile

Independent Cantonese lexicographic sources converge on the wear reading:

- 粵音資料集叢 aggregates multiple dictionaries under `zoek3`, with glosses and examples including `穿著`, `衣著`, `著衣`, `著衫`, and `着衣服`.
- 粵語審音配詞字庫 lists `著` under `zoek3` separately from `zoek6`.
- 粵典 lists `着／著 zoek3` as a verb meaning ‘to wear; to put on’ and supplies contextual examples.
- CantoDict lists `著衫 zoek3 saam1` as ‘to dress; to wear clothes’.

This is sufficient for a lexical and pronunciation disposition. It is not construction-level evidence for every possible object, aspect marker, complement, register, or orthographic preference.

## Profile dispositions

| Profile | Disposition | Reason |
|---|---|---|
| `著／着 zoek3` ‘wear; put on’ | `LEXICAL_READING_SUPPORTED` | Multiple independent Cantonese dictionaries distinguish this reading and sense. |
| `著／着 zoek3 + clothing NP` | `LEXICAL_TRANSITIVE_PROFILE_SUPPORTED` | Direct dictionary phrases and contextual examples include clothes and shoes. |
| `著／着 zoek3 + 緊 + clothing NP` | `CONTEXTUALLY_ATTESTED_PROGRESSIVE_PROFILE` | 粵典 gives `佢着緊我送畀佢嗰對鞋`; this supports occurrence, not unrestricted aspect scope. |
| `著／着 zoek3 + 住 + clothing NP` | `CONTEXTUALLY_ATTESTED_DURATIVE_PROFILE` | 粵典 examples include `著住對襪` and `著住件破舊嘅大褸`; this supports occurrence, not a universal rule. |
| causative/help context + `著衫` | `CONTEXTUALLY_ATTESTED_LEXICAL_COMPLEMENT` | A contextual example contains `幫主人著衫`; outer benefactive/causative structure remains separate. |
| bare source item `著 zoek3` | `PEDAGOGICAL_ATTESTATION_ONLY` | Glossika supplies word, reading, and gloss without argument structure or context. |
| `著 zyu3` | `SEPARATE_READING_AND_SENSE_FAMILY` | Sources associate it with writing, authorship, fame, prominence, and related lexical items. |
| `著／着 zoek6` | `SEPARATE_READING_AND_FUNCTION_FAMILY` | Sources list affected-state, attachment, encounter, resultative, aspectual, correctness, ignition, strategy, and other senses. |
| lexical `著緊 zoek6 gan2` ‘care about’ | `SEPARATE_LEXICAL_COMPOUND` | It collides orthographically with wear `着 zoek3 + 緊 gan2`; reading and internal structure must not be inferred from characters alone. |
| unconditional `著 -> zoek3` mapping | `REJECTED` | The character has multiple directly documented readings and senses. |
| unconditional `着 -> zoek3` mapping | `REJECTED` | The variant is also polyfunctional and appears in non-wear profiles. |
| new construction identity | `NOT_REQUIRED` | The evidence establishes a lexical verb profile, not an independently bounded grammatical construction. |

## Reading and sense boundaries

### `zoek3`: wear or put on

The `zoek3` reading is associated with clothing and wearing. Directly observed nominal domains include:

- `衫` ‘clothes’;
- `鞋` ‘shoes’;
- `襪` ‘socks’;
- `大褸` ‘overcoat’.

These examples support an ordinary lexical transitive profile. They do not establish that every physical object is licensed as a wearable object.

### `zyu3`: writing, authorship, fame, prominence

The aggregated dictionary evidence separately lists senses represented by forms such as:

- `著作`;
- `著述`;
- `著名`;
- `顯著`.

This reading must not inherit wear-verb syntax or pronunciation.

### `zoek6`: non-wear lexical and grammatical profiles

The reviewed sources separately associate `zoek6` with profiles including attachment, affected state, encounter, result or correctness, ignition, strategy or move, and grammaticalized material. The exact analysis of each profile is outside this lexical task.

A particularly important collision is:

```text
著緊 zoek6 gan2
care about; be concerned about
```

versus:

```text
着 zoek3 + 緊 gan2 + wearable object
be wearing / be putting on
```

Surface `著緊／着緊` therefore cannot be assigned a reading or structure without lexical and contextual analysis.

## Orthographic boundary

`著` and `着` are related written forms, and the wear reading appears under both in modern lexicographic resources. Historical and modern dictionaries differ in which form they present as primary for particular senses.

The safe repository consequence is not a global normalization rule. A later implementation must preserve:

1. the observed source spelling;
2. the intended reading;
3. the lexical sense;
4. the local syntactic context;
5. collisions with other readings and compounds.

A spelling variant is not a construction identity, and a character-level alias must not erase reading distinctions.

## Aspect and argument limitations

The contextual examples directly support visible `緊` and `住` after the wear verb. They do not independently establish:

- every aspect marker after `著／着`;
- every object class;
- object omission without discourse;
- unrestricted serial-verb or coverb composition;
- all regional or register distributions;
- frequency or productivity.

Any future parser or lexicon specification must therefore use bounded positive examples and explicit collision controls rather than a generic character matcher.

## Repository comparison

Read-only inspection found:

- no dedicated `著` wear entry in `src/runtime-resources/lexicon/token-lexicon/verbs.js`;
- no `著` reading expectation in `src/runtime-resources/pronunciation/jyutping-review-expectations.js`;
- the Week 18 common-verb audit explicitly records `wear_verb_with_reading_collision` and withholds implementation;
- the Week 18 source supplies only the isolated lexical item `著 zoek3` ‘to wear’.

Runtime absence does not weaken the lexical evidence. Runtime addition also cannot be authorized merely because dictionaries support the reading; the current lexical architecture must first show that it can represent the homograph safely.

## Terminal outcome

- `著／着 zoek3` wear reading: `LEXICALLY_SUPPORTED`.
- lexical verb meaning ‘wear; put on’: `SUPPORTED`.
- clothing/wearable object profile: `SUPPORTED_NARROWLY`.
- progressive `緊` profile: `ATTESTED_NOT_GENERALIZED`.
- durative `住` profile: `ATTESTED_NOT_GENERALIZED`.
- `zyu3` senses: `SEPARATE`.
- `zoek6` senses and grammatical functions: `SEPARATE`.
- lexical `著緊 zoek6 gan2`: `SEPARATE_COLLISION`.
- unconditional character-to-reading rule: `REJECTED`.
- new construction UUID or identity: no.
- runtime or status change in this packet: no.

## Next separately claimed action

Open one bounded runtime-design audit before adding lexical coverage. That audit should determine whether the current token lexicon and pronunciation pipeline can represent:

```text
same written form + multiple readings + context-sensitive lexical senses
```

without assigning every `著／着` token `zoek3`.

Only if the architecture supports a safe reading-specific entry should a later implementation add:

- a bounded wear-verb lexical profile;
- `zoek3` pronunciation evidence;
- explicit `zyu3`, `zoek6`, and `著緊` collision tests;
- preservation of source orthography.

A primary-corpus inventory may be added if the implementation decision requires distributional evidence, but raw counts would not establish unrestricted productivity.

## Protected-state confirmation

This packet changes no parser detector, runtime lexicon, pronunciation expectation, test, generated output, version, UUID, construction code, canonical name, linguistic status, readiness record, corpus classification, survey, panel result, held-out evidence, release, package, or deployment state.

It does not modify the active AB33 question-repair or AA84 manner implementation scopes.

## Source inventory

See `docs/research/ISSUE-635-ZOEK3-WEAR-LEXEME-SOURCE-INVENTORY-R1.md`.
