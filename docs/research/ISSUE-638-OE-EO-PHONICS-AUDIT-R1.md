# ISSUE-638 Week 18 oe／eo phonics audit R1

Parent issue: #638  
Work claim: #639  
Date: 2026-08-05

## Decision

The Week 18 phonics heading identifies a real Cantonese phonological contrast, but its wording and item set require correction before reuse as a teaching unit.

Official Jyutping documentation distinguishes:

```text
oe  [œː]
eo  [ɵ]
```

and licenses the following finals:

| Nucleus label | Official Jyutping finals | Broad IPA relation |
|---|---|---|
| `oe` | `oe`, `oeng`, `oet`, `oek` | [œː], [œːŋ], [œːt̚], [œːk̚] |
| `eo` | `eoi`, `eon`, `eot` | [ɵy]/[ɵɥ], [ɵn], [ɵt̚] |

The Week 18 claim that `oe` appears before `-ng` and `-k` is incomplete because official Jyutping also has bare `oe` and `oet`. Its treatment of `eoi` as if it were simply the monophthong `eo` is pedagogically imprecise: `eoi` is a diphthong whose nucleus belongs to the `eo` row.

The six source rows resolve as follows:

- I094, I095, I096, and I098 are usable as **final/rime contrast pairs**, subject to lexical-gloss corrections and the explicit warning that they are not pure vowel minimal pairs.
- I097 is incomplete and remains unusable as a pair; `香 hoeng1` is independently valid as an `oeng` example, but no partner may be invented.
- I099 is not an `oe` versus `eo` pair. `陽 joeng4` has `oeng`, while `圓 jyun4` has `yun`, whose nucleus is `yu [yː]`.

The immutable source remains unchanged. No parser, runtime pronunciation, lexicon, test, construction identity, status, corpus, survey, or release change is authorized.

## Verified Jyutping and phonetic structure

### `oe`

The Linguistic Society of Hong Kong scheme lists `oe` as [œː] and gives the finals:

```text
oe
oeng
oet
oek
```

A scholarly Hong Kong Cantonese rime inventory independently gives:

```text
oe   [œː]
oeng [œːŋ]
oek  [œːk]
```

and records `oet` as a marginal or later-added licensed final. The official scheme states that `oet` was added in 2018.

### `eo`

The official scheme lists `eo` as [ɵ] and licenses:

```text
eoi
eon
eot
```

The scholarly rime inventory transcribes these as:

```text
eoi [ɵɥ]
eon [ɵn]
eot [ɵt]
```

The key teaching distinction is therefore:

- `eon` and `eot` use the short rounded central nucleus before nasal or stop codas;
- `eoi` contains an additional glide and is a diphthong, not an isolated monophthong example.

### `yu`

Official Jyutping separately lists:

```text
yu  [yː]
yun [yːn]
yut [yːt̚]
```

Consequently, `圓 jyun4` cannot serve as an `eo` item merely because the source IPA contains a front rounded vowel.

## Source-statement audit

| Week 18 source statement | Disposition | Reason |
|---|---|---|
| `oe` represents /œː/ | `RETAIN_WITH_BROAD_TRANSCRIPTION_CAVEAT` | Official Jyutping maps `oe` to [œː]. |
| `eo` represents /ɵ/ | `RETAIN_WITH_FINAL-SPECIFIC_CAVEAT` | Official Jyutping maps the nucleus to [ɵ], but `eoi` is diphthongal. |
| `oe` appears before `-ng` and `-k` | `INCOMPLETE` | Official finals also include bare `oe` and `oet`. |
| `eo` appears before `-n`, `-t`, and as `-eoi` | `STRUCTURALLY_CLOSE_BUT_PEDAGOGICALLY_IMPRECISE` | `eon/eot` fit the coda statement; `eoi` is a diphthong in the `eo` row. |
| both sounds are front rounded vowels | `REVISE_TERMINOLOGY` | [œ] is front rounded; [ɵ] is conventionally central rounded on the IPA chart. Descriptions vary in phonological abstraction, so the lesson should not collapse their articulatory labels. |
| both are unique to Cantonese | `UNSUPPORTED_AND_REJECTED` | The IPA symbols are general cross-linguistic speech-sound categories; no reviewed source supports Cantonese exclusivity. |

## Item-level dispositions

### I094 — 上 soeng6 versus 信 seon3

Source:

```text
/sœːŋ˨/ vs /sɵn˧/
上 soeng6 vs 信 seon3
```

Disposition: `USABLE_RIME_CONTRAST_WITH_GLOSS_CORRECTION`.

Independent pronunciation resources confirm `上 soeng6` and `信 seon3`. The pair keeps the onset `s-` constant while contrasting `oeng` and `eon`; however, it also changes coda and tone, so it is not a pure vowel minimal pair.

The source gloss for `上 soeng6` combines two readings:

- `soeng6`: upper, above, previous, or related nominal/adjectival uses;
- `soeng5`: verbal ‘go up; ascend’ in ordinary forms such as `上山`.

A corrected derivative must not teach `soeng6` as the ordinary infinitival reading ‘to go up’ without context.

### I095 — 窗 coeng1 versus 春 ceon1

Source:

```text
/tsʰœːŋ˥/ vs /tsʰɵn˥/
窗 coeng1 vs 春 ceon1
```

Disposition: `USABLE_NEAR_MINIMAL_RIME_CONTRAST`.

Independent resources confirm both readings. The onset and tone are held constant; the rime changes from `oeng` to `eon`, including both nucleus and coda. This is the cleanest pair in the source set, but it remains a rime contrast rather than a vowel-only minimal pair.

### I096 — 量 loeng4 versus 輪 leon4

Source:

```text
/lœːŋ˨˩/ vs /lɵn˨˩/
量 loeng4 vs 輪 leon4
```

Disposition: `USABLE_RIME_CONTRAST_WITH_GLOSS_CORRECTION`.

Independent resources confirm `量 loeng4` and `輪 leon4`. The onset and tone are constant, while the rime changes from `oeng` to `eon`.

The source gloss for `量 loeng4` also compresses distinct readings:

- `loeng4`: verb ‘measure’;
- `loeng6`: noun or morpheme ‘amount; quantity’ in ordinary quantity expressions.

The corrected teaching gloss should use ‘to measure’ for the cited `loeng4` reading unless a separately verified lexical context supports another sense.

### I097 — 香 hoeng1 versus missing partner

Source:

```text
/hœːŋ˥/ vs —
香 hoeng1 vs —
```

Disposition: `INCOMPLETE_PAIR_UNUSABLE`.

`香 hoeng1` is independently verified as an `oeng` item. The second word, Jyutping, IPA, and gloss are absent. The immutable row must remain incomplete, and no plausible `eo` partner may be supplied by inference.

The single word can be reused only as an isolated `oeng` example in a separately authored derivative, not as a reviewed contrast pair.

### I098 — 雀 zoek3 versus 卒 zeot1

Source:

```text
/tsœːk̚˧/ vs /tsɵt̚˥/
雀 zoek3 vs 卒 zeot1
```

Disposition: `USABLE_CHECKED-RIME_CONTRAST`.

Independent resources confirm both readings. The pair contrasts `oek` and `eot`, but it also changes coda and tone. It is therefore useful for listening to whole checked rimes, not as a vowel-only minimal pair.

### I099 — 陽 joeng4 versus 圓 jyun4

Source:

```text
/jœːŋ˨˩/ vs /jyːn˨˩/
陽 joeng4 vs 圓 jyun4
```

Disposition: `MISCLASSIFIED_OUTSIDE_OE_EO`.

Independent resources confirm both readings. The source’s own Jyutping and IPA show that the second item is `yun [yːn]`, not `eon [ɵn]`. The row contrasts `oeng` with `yun`, or broadly [œː] with [yː] plus different codas. It may inform a different rounded-vowel lesson, but it cannot remain an `oe` versus `eo` positive.

## Minimal-pair and teaching terminology

None of the reviewed pairs is a strict vowel-only minimal pair because the official finals pair the two nuclei with different codas:

```text
oeng vs eon
oek vs eot
```

Some rows also differ in tone. A corrected lesson should call them:

- final contrasts;
- rime contrasts;
- listening discrimination pairs;
- near-minimal pairs only when onset and tone are held constant.

It should not claim that only the vowel changes.

## Repository comparison

The Week 18 source and expert review already preserve:

- all six rows unchanged;
- I097 as unusable because it lacks a second item;
- W18-F13 as a phonological-review dependency rather than runtime authority.

Read-only inspection does not establish any parser requirement. The relevant problem is source-quality and teaching-material classification, not grammatical construction recognition.

No direct runtime pronunciation change follows from this audit. The verified Jyutping strings themselves are generally correct; the material defects are:

- incomplete distribution wording;
- imprecise treatment of `eoi`;
- unsupported uniqueness wording;
- I094 and I096 gloss collisions;
- incomplete I097;
- category error in I099;
- overstatement of minimality if the rows are presented as vowel-only pairs.

## Terminal outcome

- `oe [œː]` nucleus: `VERIFIED`.
- `eo [ɵ]` nucleus: `VERIFIED`.
- `eoi` as diphthong in the `eo` finals row: `VERIFIED`.
- source `oe` distribution statement: `INCOMPLETE`.
- source `eo/eoi` statement: `REQUIRES_DIPHTHONG_CLARIFICATION`.
- “unique to Cantonese”: `UNSUPPORTED_REJECTED`.
- I094: `USABLE_WITH_GLOSS_CORRECTION`.
- I095: `USABLE_RIME_CONTRAST`.
- I096: `USABLE_WITH_GLOSS_CORRECTION`.
- I097: `INCOMPLETE_UNUSABLE_AS_PAIR`.
- I098: `USABLE_CHECKED-RIME_CONTRAST`.
- I099: `MISCLASSIFIED_OUTSIDE_OE_EO`.
- immutable source mutation: no.
- parser/runtime change: no.
- construction identity or status change: no.

## Next separately claimed action

Create one corrected pedagogical derivative rather than editing the source packet. It should:

1. preserve source IDs and original values as provenance;
2. use the official finals chart;
3. distinguish monophthong nuclei from the `eoi` diphthong;
4. retain I095 and I098 as strong rime contrasts;
5. retain I094 and I096 only with reading-specific glosses;
6. exclude I097 from pair counts;
7. move I099 to a separately named `oeng` versus `yun` contrast or exclude it;
8. avoid the uniqueness and pure-minimal-pair claims;
9. receive independent pedagogical and pronunciation review before publication.

A runtime pronunciation issue is unnecessary unless that later derivative uncovers an actual missing or incorrect repository reading.

## Protected-state confirmation

This packet changes no immutable Week 18 source value, parser detector, runtime lexicon, pronunciation table, test, generated output, version, UUID, construction code, canonical name, linguistic status, readiness record, corpus classification, survey, panel result, held-out evidence, release, package, or deployment state.

It does not modify the active AB33 question-repair or AA84 manner implementation scopes.

## Source inventory

See `docs/research/ISSUE-638-OE-EO-PHONICS-SOURCE-INVENTORY-R1.md`.
