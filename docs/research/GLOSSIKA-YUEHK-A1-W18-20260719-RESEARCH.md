# Glossika Cantonese (HK) A1 Week 18 research packet

- Packet: `GLOSSIKA-YUEHK-A1-W18-20260719-RESEARCH-R1`
- Intake: #128
- Work claim: #281
- Corpus ingress: #135 / PR #280
- Source: `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W18-20260719/source.json`
- Source payload SHA-256: `fb9efc4f693a96015740012e119a678e57645fb9017b9096a5383d8bdaa13579`
- Status: research complete; no runtime, lexicon, construction-status, corpus-classification, survey, version, or release change

## Purpose and evidence boundary

This packet evaluates the authorized Week 18 lesson as pedagogical and lexical attestation. Source Cantonese, Jyutping, English glosses, register labels, particle functions, IPA, and item order remain preserved in the corpus package. They are not automatically accepted as linguistic conclusions.

Machine-readable outputs:

- `data/research-ledgers/glossika-week18-claim-source.json`
- `data/research-ledgers/glossika-week18-common-verb-audit.json`
- `data/research-ledgers/glossika-week18-temporal-lexicon.json`
- `data/research-ledgers/glossika-week18-followup-candidates.json`

Canonical runtime ownership resolves only to `src/**` and `src/runtime-resources/**`. Generated `main.js` is not an authority and was not regenerated or modified.

## Executive findings

1. **The clarification items perform different repair jobs.** Open repair initiation, repetition request, referent clarification, and meaning clarification should not be represented as one construction merely because all respond to a communication problem.
2. **The turn-management items are analytically composite.** Interruption, apology, floor holding, waiting, completion, sequencing, imperative force, and confirmation or request force remain separate.
3. **`V + 完` supports a completion relation, but the exact source sequence is broader.** `唔該等我講完先好唔好` cannot be reduced to one completion construction.
4. **`你食咗飯未` is neither a preverbal `未` negative nor ordinary exact-copy A-not-A.** The exact final-`未` perfective-question profile remains a direct-source gap.
5. **The motion examples preserve two independently parsed predicates.** `返屋企` or `去超市` supplies overt destination motion; `煮飯` or `買嘢` supplies the compatible purpose event.
6. **`留喺屋企睇電視` is not a standalone locative predicate.** It contains lexical `留`, event location, and a following activity predicate.
7. **`幫你買嘢返嚟` contains an unresolved benefactive relation plus return deixis.** The source does not establish a generic `幫 + NP + VP` construction or one serial-verb analysis for the complete sequence.
8. **The 25 common verbs are not 25 complete valency entries.** Twenty-four already have exact modular lexical owners; `著 zoek3` remains a dedicated lexical and pronunciation review item. Polysemy and grammaticalized uses remain split.
9. **The 28 temporal entries belong to several lexical classes.** Time-of-day nouns, measures, schedule nouns, relative time words, scalar properties, periodicity modifiers, and temporal adverbs cannot be collapsed into one adverb inventory.
10. **The source particle and phonics tables are pedagogical simplifications.** Tone, clause type, discourse context, prosody, cluster behavior, lexical category, and item-level pronunciation remain necessary.
11. **`一億` through `十億` remain compositional.** No ten-item opaque lexical expansion is justified.

## 1. Clarification and conversational repair

The lesson gives four forms:

- `咩話？再講多次。`
- `你講嘅係邊個？`
- `唔好意思，可唔可以再講一次？`
- `唔該，你係咩意思呀？`

Conversation Analysis provides a useful general distinction between **other-initiated repair** and the repair solution that follows. It does not establish the naturalness, register, internal syntax, or productivity of these Cantonese strings.

### Bounded source analysis

- `咩話？` is an open repair initiator in the lesson context. It must remain distinct from a productive wh-question, a clause-final `me1` particle analysis, or the source's separate particle-table gloss “rhetorical question.”
- `再講多次` requests repetition, but `多次` versus `一次`, politeness, and ordinary spoken preference require direct Cantonese corpus and speaker evidence.
- `你講嘅係邊個` narrows the trouble source to a referent. The overt `嘅` phrase contains context-dependent unspoken material; the parser must not invent that material or reduce `嘅` to a sentence-final particle.
- `你係咩意思呀` requests meaning clarification. `咩` remains in a nominal question expression and final `呀 aa3` contributes discourse meaning; neither token alone defines the entire repair action.

### Current disposition

These are **source-attested discourse actions with Cantonese-specific evidence gaps**. They justify corpus searches and contextual judgment tasks, not formula ingress or a new repair-construction identity.

## 2. Turn management, completion, and request sequencing

The source gives:

- `等陣，等我講完。`
- `我插句嘴。`
- `唔好意思，打斷一下。`
- `唔該等我講完先好唔好？`

The source labels alone cannot establish that all four are ordinary conversational formulas. `我插句嘴` and `打斷一下` are especially appropriate for translation-influence and register review.

### `等陣` versus `等我講完`

`等陣` is a waiting directive or discourse-management expression. The second `等` in `等我講完` introduces a participant and an event. The exact permissive, causative, floor-holding, or lexical analysis remains unresolved in the directly checked Cantonese evidence.

Do not infer one general `等 + NP + VP` construction from the lesson.

### Completion `講完`

Direct Cantonese resultative research treats `完` as a phase or result element associated with reaching the end of an event. The visible `講 + 完` sequence therefore supports a completion relation. This does not decide:

- which speech event or content is completed;
- whether the complement is lexicalized or freely productive with every verb;
- whether a following object is required, allowed, or contextually omitted;
- how completion interacts with `等`, `先`, or a final request.

### `先好唔好`

In the complete source string, `先` relates the requested waiting to prior completion, while `好唔好` contributes an evaluative or confirmation-like request form. The exact scope and request force require direct contrasts. They must not be absorbed into `講完` or represented as one fixed completion-request construction.

## 3. Aspect and final `未`

`你食咗飯未？` contains:

- lexical predicate `食`;
- overt object `飯`;
- postverbal perfective `咗`;
- sentence-final `未` in a polar-question use.

Existing research already separates:

- preverbal `未 + VP` negative statements;
- `未 + V過` negative experiential statements;
- final `未` experiential questions;
- `有冇 + VP` questions;
- exact-copy A-not-A forms.

The Week 18 item adds an attested `V咗O未` profile, but the inspected direct source set does not yet establish its full aspectual, discourse, lexical, particle, or regional restrictions. It therefore remains a bounded follow-up item rather than a parser change.

## 4. Motion, purpose, location, benefactive, and direction

### Overt destination plus purpose

`我要返屋企煮飯` and `我去超市買嘢` fit the already accepted narrow distinction between:

1. an overt destination motion predicate (`返屋企`, `去超市`); and
2. an immediately following semantically compatible purpose VP (`煮飯`, `買嘢`).

The purpose relation is an inter-event relation. The two predicates retain their own arguments and lexical identities. Two adjacent verbs alone are not sufficient evidence.

### Locative continuation

`我留喺屋企睇電視` contains lexical `留`, a preverbal or predicate-internal location relation `喺屋企`, and a following activity `睇電視`. Existing Cantonese coverb research distinguishes event-location `喺 + location + predicate` from a standalone locative predicate.

The source does not decide whether the relation between `留喺屋企` and `睇電視` is purpose, coordination, simultaneous activity, or discourse-linked continuation in every context. No hidden linker is inserted.

### Benefactive `幫`

`幫你買嘢` clearly presents `你` as a participant benefiting from or associated with the buying event in the source translation. The lesson does not establish whether `幫` is:

- an ordinary lexical verb;
- a coverb-like marker;
- an applicative or argument-introducing element;
- part of a larger serial construction.

Argument type, animacy, scope, lexical selection, and regional/register behavior remain research gaps. Token presence alone must not assign a benefactive role.

### Return-directional `返嚟`

Directional research treats `返` and `嚟` as overt motion and deictic elements with spatial and extended meanings. In `買嘢返嚟`, the sequence preserves return direction and speaker-oriented deixis. It is not a generic aspect marker.

The source still leaves a compositional ambiguity: `返嚟` may describe a return event following the buying event or participate in a tighter directional sequence. Context and corpus contrasts are needed; the parser must not invent speaker location.

## 5. Common-verb audit

The exact modular audit contains 25 source verbs.

### Coverage

- Exact existing modular lexical owners: **24 / 25**
- Missing exact owner: **`著 zoek3` “wear”**

Existing coverage prevents duplicate bulk ingress. It does not make the one-line source gloss a complete lexical entry.

### Required profile splits

- **motion and direction:** `行`, `跑`, `嚟`, `去`, `返`;
- **transfer, coverb, or permissive collisions:** `畀`;
- **lexical versus aspectual reading:** `住`;
- **wear versus other readings and written forms:** `著`;
- **highly polysemous or light-verb behavior:** `做`, `開`;
- **object selection and contextual omission:** `食`, `飲`, `睇`, `聽`, `講`, `寫`, `讀`, `買`, `賣`, `攞`, `洗`, `煮`;
- **posture or intransitive activity:** `瞓`, `坐`, `企`.

The audit authorizes no lexical modification. `著` should receive a dedicated dictionary, corpus, Jyutping, valency, and collision review before any focused implementation issue.

## 6. Temporal lexical classes

The temporal audit contains 28 entries and preserves a central source-derived boundary: **lexical category and temporal clause function are not the same thing**.

### Time-of-day nouns

- `黎明`
- `黃昏`
- `午夜`
- `正午`
- `半夜`
- `中午`

`午夜` and `半夜` both receive the source gloss “midnight,” while `正午` and `中午` both receive “noon.” These are translation collisions, not evidence of interchangeability. Register and distribution require comparison.

### Measures and period nouns

- `世紀`
- `十年`
- `秒`
- `季度`
- `時代`
- `刹那`

`十年` is a compositional duration expression, not an opaque temporal adverb. Classifier and quantification behavior is head-specific.

### Calendar, schedule, and event nouns

- `約會`
- `日曆`
- `日程`
- `截止日期`

These can relate to time but are not thereby lexical adverbs. `截止日期` is a compound noun and requires compositional and register review.

### Relative and deictic time expressions

- `過去`
- `將來`
- `以前`
- `最近`
- `之後`

Their temporal interpretation depends on a reference time or event. Some also have non-temporal or lexical collisions, especially `過去`.

### Scalar, durational, and periodic modifiers

- `早`
- `遲`
- `暫時`
- `長期`
- `短期`
- `定期`
- `永遠`

These differ in syntax, scope, attributive use, predicate modification, frequency, and quantificational behavior. They are not one interchangeable “when” class.

### Register review

The audit flags `黎明`, `午夜`, `正午`, `世紀`, `季度`, `時代`, `刹那`, `日程`, and `截止日期` for spoken-frequency, register, and A1-appropriateness review. This is a research hypothesis, not a categorical rejection.

## 7. Sentence-final particles

The lesson lists eleven forms and assigns one short English function to each. Direct Cantonese particle research does not support a one-character-to-one-function grammar.

Necessary distinctions include:

- tone-specific particle identity;
- declarative, imperative, wh, A-not-A, disjunctive, and particle-question hosts;
- assertion, focus, change of state, warning, surprise, uncertainty, request, and response demands;
- co-occurrence and cluster order;
- vowel length, intonation, and prosody;
- orthographic variation;
- non-final lexical or grammatical uses.

Specific boundaries:

- `㗎 gaa3` has multiple clause- and discourse-sensitive profiles, not merely “emphasis; assertion.”
- modern `咩 me1` includes biased and discourse-sensitive question uses; “rhetorical question” is incomplete.
- `嘅 ge3` has nominalizing and attributive uses and must not be classified only as a sentence-final particle.
- `喇 laa3`, `啦 laa1`, and other tone contrasts remain explicit identities.

No particle function, cluster, or runtime status changes are authorized.

## 8. Large numerals

The ten rows `一億` through `十億` remain compositionally structured. The modular crosswalk found one existing exact whole-form entry and nine forms without opaque entries, but all ten are compositionally analyzable.

Do not add ten independent lexical entries or treat a surface word grouping as proof of lexical opacity.

## 9. Phonics `/œː/` versus `/ɵ/`

All six source rows remain provisional. Independent item-level review must verify:

- IPA nucleus and coda;
- Jyutping and tone;
- lexical identity and gloss;
- whether each pair actually instantiates the stated contrast;
- whether the heading's distributional statement is accurate.

The `香 / —` row lacks a B-side word, Jyutping, gloss, and IPA. It must remain incomplete; no silent reconstruction is authorized.

## 10. Project consequences

### Authorized by this packet

- retain the five research files;
- preserve the direct-source and negative boundaries above;
- retain the common-verb and temporal audits;
- retain thirteen bounded follow-up candidates;
- route unresolved forms to corpus work, direct-source research, parser audits, or role-neutral panels as specified.

### Not authorized

- parser behavior changes;
- runtime lexical or pronunciation changes;
- generated `main.js` changes;
- construction identity or status changes;
- accepted corpus classifications;
- survey deployment;
- native-speaker judgment claims;
- runtime version or release changes.

## References

- Bauer, Robert S., and Paul K. Benedict. 1997. *Modern Cantonese Phonology*. DOI `10.1515/9783110823707`.
- Cheung, Lawrence Yam-Leung. 2021. “The origin and development of the question particle me1 in Cantonese.” *Lingua* 254:103049. DOI `10.1016/j.lingua.2021.103049`.
- Lai, Ryan Ka Yau, and Michelle Man-Long Pang. 2023. “Rethinking the Description and Typology of Cantonese Causative–Resultative Constructions: A Dynamic Constructionist Lens.” *Languages* 8(2):151. DOI `10.3390/languages8020151`.
- Lam, Charles, Chaak-ming Lau, and Jackson L. Lee. 2024. “Multi-Tiered Cantonese Word Segmentation.” *LREC-COLING 2024*, 11993–12002. `https://aclanthology.org/2024.lrec-main.1047/`
- Mertens, Julia Beret, and Jan Peter de Ruiter. 2021. “Cognitive and social delays in the initiation of conversational repair.” *Dialogue & Discourse* 12:21–44. `https://aclanthology.org/2021.dnd-12.9/`
- Sybesma, Rint, and Boya Li. 2007. “The dissection and structural mapping of Cantonese sentence final particles.” *Lingua* 117(10):1739–1783. DOI `10.1016/j.lingua.2006.10.003`.
- Wong, Lai-yin. 2002. *The Morphology, Syntax, and Semantics of Adverbs in Cantonese*. University of Hong Kong MPhil thesis. DOI `10.5353/th_b3122684`.
- Yiu, Carine Yuk Man. *Spatial Extension: Directional Verbs in Cantonese*. Hong Kong University of Science and Technology doctoral thesis.
- Canto Span `TEMPORAL-EXPRESSIONS-SOURCE-MAP-CP021B-R12.md`.
- Canto Span `LANE-07-A-NOT-A-QUESTIONS-SOURCE-MAP-CP021B-R7.md`.
- Canto Span `ASPECTUAL-CLAUSE-WRAPPERS-SOURCE-MAP-CP021B-R24.md`.
- Canto Span `COVERB-MANNER-EVENT-MODIFICATION-SOURCE-MAP-CP021B-R23.md`.
- Canto Span `CONSTRUCTION-ADJUDICATION-BATCH-14.md`.
- Canto Span `UC-RQ-011-GAA3-CONSTRUCTION-FAMILY-RESEARCH-R1.md`.
