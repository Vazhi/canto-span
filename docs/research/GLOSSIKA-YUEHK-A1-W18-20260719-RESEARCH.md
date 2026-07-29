# Glossika Cantonese (HK) A1 Week 18 research packet

- Packet: `GLOSSIKA-YUEHK-A1-W18-20260719-RESEARCH-R1`
- Intake: #128
- Work claim: #281
- Corpus ingress: #135 / PR #280
- Source: `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W18-20260719/source.json`
- Source payload SHA-256: `fb9efc4f693a96015740012e119a678e57645fb9017b9096a5383d8bdaa13579`
- Status: research complete; no parser, runtime lexicon, generated-bundle, construction-status, corpus-classification, survey, or release change

## Purpose and evidence boundary

This packet evaluates the authorized Week 18 lesson as pedagogical, lexical, and contextual attestation. The immutable corpus package preserves 99 source records, including source Jyutping, translations, register labels, particle labels, IPA, and item order. Those fields are not automatically accepted as direct linguistic conclusions.

Machine-readable outputs:

- `data/research-ledgers/glossika-week18-claim-source.json`
- `data/research-ledgers/glossika-week18-common-verb-audit.json`
- `data/research-ledgers/glossika-week18-temporal-lexicon.json`
- `data/research-ledgers/glossika-week18-followup-candidates.json`

Canonical runtime ownership is source-first:

- `src/**` and `src/runtime-resources/**` own implementation;
- `main.js` is generated deployment output and is excluded from research and ownership decisions;
- this packet changes no runtime source and does not regenerate `main.js`.

## Executive findings

1. **Clarification and turn management are interactional actions, not one construction.** The eight functional-language examples include repair initiation, repetition requests, reference clarification, meaning clarification, floor holding, interruption, apology, completion, and negotiation. Their interpretation depends on sequence, formulation, prosody, and participation context.
2. **Completion `完 jyun4` remains distinct from perfective and universal quantification.** `講完` and `食完喇` provide completion attestations, but they do not license every `V + 完` sequence or merge completion with `咗` or `曬`.
3. **`你食咗飯未？` is a bounded aspect-question attestation.** It does not by itself establish a generic neutral `咗…未` rule across predicates, contexts, or competing completion and experiential profiles.
4. **The lesson’s multi-verb strings require decomposition.** Motion, destination, purpose, location, benefactive, deictic direction, discourse linkage, and final particles must remain separate state and parser owners.
5. **Common-verb coverage is nearly complete.** Twenty-four of twenty-five forms already have exact modular token-lexicon owners. `著 zoek3` “wear” is the sole lexical-review gap and must remain distinct from homographic aspectual or resultative material.
6. **The temporal vocabulary is heterogeneous.** It contains part-of-day nouns, period and unit nouns, schedule or artifact nouns, scalar temporal forms, relational forms, duration or recurrence forms, and a brief-interval noun. Only three of twenty-eight have exact modular lexical coverage.
7. **The `億` series is compositional.** The ten listed values do not warrant ten opaque whole-form entries.
8. **Particle glosses are too coarse for grammar.** One-word labels such as “softener,” “suggestion,” “change of state,” “surprise,” “warning,” “rhetorical question,” and “resignation” suppress tone, sequence, stance, clause type, and clustering.
9. **The phonics table remains provisional.** Six rows require independent item-level review, and the source contains an incomplete `香 / —` row.

## 1. Clarification, repair, and turn management

The source provides four clarification or repetition examples:

- `咩話？再講多次。`
- `你講嘅係邊個？`
- `唔好意思，可唔可以再講一次？`
- `唔該，你係咩意思呀？`

It also provides four interruption or floor-management examples:

- `等陣，等我講完。`
- `我插句嘴。`
- `唔好意思，打斷一下。`
- `唔該等我講完先好唔好？`

Liesenfeld’s naturally occurring Cantonese dialog study distinguishes continuers, responses, change-of-state tokens, turn-management tokens, and repair initiators. It further shows that sequential position, pitch contour, and production format are necessary to identify interactional function. That evidence supports a negative boundary: source translations or surface similarity cannot collapse these eight expressions into one formula family.

### Distinctions retained

- `咩話？` can initiate repair, while `再講多次` requests repetition.
- `你講嘅係邊個？` asks for reference identification rather than merely repeating unheard material.
- `你係咩意思呀？` asks for intended meaning and includes a discourse particle.
- `等我講完` combines floor holding with an embedded completion predicate.
- `我插句嘴` is a lexicalized self-entry expression whose register and regional distribution require independent evidence.
- `打斷一下` is a direct interruption formulation with a source-labeled polite frame.
- `先好唔好` adds sequencing and negotiates compliance; it is not equivalent to a simple imperative.

The source labels Casual and Polite remain source metadata. No runtime register feature is authorized.

## 2. Completion `完`

Direct Cantonese research distinguishes the aspectual verb `完 jyun4` “finish” from `曬 saai3` universal quantification. The Week 18 items `講完` and `食完喇` are therefore useful completion attestations, but their evidence remains bounded.

### Positive boundary

- `完` contributes event completion in the source examples.
- the completed event can occur inside a larger floor-management expression;
- a sentence-final particle may follow the completed predicate.

### Negative boundaries

The lesson does not establish:

- that every verb freely combines with `完`;
- identical object placement for every predicate;
- equivalence between completion `完` and perfective `咗`;
- equivalence between completion `完` and universal `曬`;
- one fixed interpretation for `完 + particle` sequences;
- a parser or status change.

## 3. Perfective plus final `未`

`你食咗飯未？` attests a perfective clause followed by `未`. The safest description is a context-sensitive question about whether the relevant eating event has occurred by the reference point.

The item alone does not determine:

- whether final `未` is a particle, reduced predicate, or another construction-specific element in every analysis;
- how the profile contrasts with bare `未` clauses;
- how it differs from experiential `過` questions;
- whether lexical completion changes the reading;
- which answer forms it licenses;
- whether every predicate supports the same profile.

A future audit must use direct aspect research, contextual corpus examples, and controlled contrasts. No generic `咗…未` broadening follows here.

## 4. Motion, purpose, location, benefactive, and direction

### `我要返屋企煮飯。`

This item contains:

- modal or necessity material `要`;
- motion/return predicate `返`;
- destination `屋企`;
- following cooking event `煮飯`.

It may support a purpose relation, serial-verb composition, or another established clause relation, but it is not automatically a directional complement. Direct Cantonese research distinguishes independent directional verbs from directional complements and notes weaker fusion than Mandarin.

### `我去超市買嘢。你呢？`

The first sentence combines motion to a destination and a buying event. The second turn is a thematic continuation question. These must remain separate from each other and from any inferred purpose relation.

### `我留喺屋企睇電視。`

This string combines:

- stay/remain predicate `留`;
- locative phrase `喺屋企`;
- activity predicate `睇電視`.

The source does not settle whether the final activity is serialized, coordinated, subordinated, or discourse-linked in all contexts. A catch-all locative-continuation label would overstate the evidence.

### `咁我幫你買嘢返嚟啦。`

This turn contains at least five analytically separate layers:

1. discourse linker `咁`;
2. `幫` benefactive or helping relation;
3. buying event `買嘢`;
4. deictic return sequence `返嚟`;
5. final particle `啦 laa1`.

Cantonese research distinguishes single-verb double-object benefactives from serial-verb benefactives, and separately distinguishes directional verbs from directional complements. The participant roles, deictic center, path, event integration, and particle contribution cannot be inferred from the English translation alone.

## 5. Common-verb audit

The source lists twenty-five common verbs. The deterministic modular audit found:

- `already_covered_exact`: 24;
- `lexical_review_gap`: 1.

The covered forms are retained under their existing smallest token-lexicon owners. Source attestation does not overwrite runtime Jyutping, syntax tags, selectional metadata, or collision boundaries.

### Sole gap: `著 zoek3`

The source uses `著 zoek3` with the meaning “wear.” Before any implementation, a separate lexical review must establish:

- exact written-form and reading ownership;
- separation from homographic or homophonous aspectual and resultative profiles;
- tokenization and pronunciation precedence;
- learner gloss;
- positive lexical examples;
- collision tests;
- the smallest canonical modular owner.

This research PR authorizes no lexical addition.

### Multifunctional forms retained as bounded entries

Several covered forms require continued separation among uses:

- `畀`: give, ditransitive, coverb-like, passive/permissive, and spelling-variant boundaries;
- `住`: live/reside versus aspectual or complement uses;
- `去`, `返`, `嚟`: independent motion predicates versus directional elements;
- `行`: `haang4` walking reading versus other readings and lexical compounds;
- `洗 sai2`: wash versus modal `使 sai2` and unrelated homophones;
- `開`: open, start, drive, operate, and other lexical senses;
- `做`: ordinary do/make versus light-verb and lexicalized uses;
- `睇` and `聽`: sense-specific perception and complement profiles.

## 6. Temporal lexical-class audit

The source’s twenty-eight temporal entries are not one uniform class. The audit uses seven provisional review classes:

| Review class | Count | Forms |
|---|---:|---|
| Part-of-day noun | 6 | `黎明`, `黃昏`, `午夜`, `正午`, `半夜`, `中午` |
| Time-unit or period noun | 5 | `世紀`, `十年`, `秒`, `季度`, `時代` |
| Schedule, event, or artifact noun | 4 | `約會`, `日曆`, `日程`, `截止日期` |
| Scalar temporal predicate or adverbial | 2 | `早`, `遲` |
| Temporal-domain or relational form | 4 | `過去`, `將來`, `以前`, `之後` |
| Duration, recurrence, or adverbial form | 6 | `永遠`, `暫時`, `長期`, `短期`, `定期`, `最近` |
| Brief-interval noun | 1 | `刹那` |

These are project audit categories, not final universal parts of speech. Direct Cantonese work distinguishes temporal nouns, temporal adverbs, and aspectual marking, while work on Hong Kong Cantonese temporal primitives also reports combinatorial restrictions.

### Coverage result

- exact modular entries: 3;
- temporal lexical-review candidates: 25.

For each uncovered form, later work must determine:

- lexical whole versus productive composition;
- reading and learner gloss;
- ordinary versus formal, literary, technical, or administrative register;
- noun, predicate, modifier, adverbial, or relational distribution;
- ability to occur bare as a clause-level temporal expression;
- smallest modular owner;
- whether an existing component analysis is already sufficient.

### Register review flags

Likely written, formal, literary, technical, or institutional items are flagged for review rather than rejected: `黎明`, `午夜`, `正午`, `世紀`, `季度`, `時代`, `將來`, `刹那`, `日程`, and `截止日期`.

Common conversational candidates include `早`, `遲`, `以前`, `暫時`, `最近`, `之後`, `半夜`, and `中午`. These labels remain hypotheses for corpus review, not accepted register decisions.

## 7. Large numerals

The source lists `一億` through `十億`. Cantonese segmentation research supports an internally compositional analysis even where a whole numeral may be grouped at a surface word tier.

The retained analysis is:

- coefficient plus `億` unit;
- `十億` corresponds to one billion in the source’s English system;
- no ten-entry opaque lexical expansion;
- cross-week deduplication required before any future resource work.

## 8. Sentence-final particles

The source table lists eleven forms:

- `呀 aa3`
- `啦 laa1`
- `喇 laa3`
- `㗎 gaa3`
- `嘅 ge3`
- `嘛 maa3`
- `喎 wo3`
- `噃 bo3`
- `咩 me1`
- `囉 lo1`
- `啩 gwaa3`

Luke’s conversation-analytic work shows that even frequently described particles such as LA, LO, and WO resist one consistent grammatical or semantic function. Sybesma and Li likewise analyze Cantonese final particles as a structured, tone-sensitive system.

Therefore, the source glosses remain pedagogical prompts only. Future analysis must consider:

- exact tone and particle identity;
- clause type;
- discourse sequence and common ground;
- speaker stance and expectation;
- particle clusters;
- prosody;
- regional and register distribution.

### `咩 me1`

The source label “rhetorical question” is too narrow and too broad at the same time. Modern sentence-final `me1` is associated with biased questions, discourse functions, and negative presuppositions. `真係咩？` requires a discourse context and cannot provide a neutral polar-question template.

### `喇 laa3`

The source labels `喇` “change of state (like 了).” This is an instructional approximation. It must not be merged with perfective `咗`, completion `完`, or Mandarin `了`, and its contribution in `食完喇` must be analyzed with the completed predicate and discourse state.

## 9. Phonics `/œː/` versus `/ɵ/`

The six source rows require item-level verification of:

- IPA nucleus and coda;
- Jyutping spelling and tone;
- lexical identity;
- English gloss;
- whether the two words instantiate the claimed contrast;
- whether the lesson heading accurately describes each row.

The final row contains `香` on the A side and no B-side word, reading, or gloss. That missing source data must remain missing. It cannot be silently reconstructed.

No pronunciation resource or runtime override is authorized.

## 10. Project consequences

### Authorized by this packet

- retain the four research ledgers and this note;
- retain exact modular coverage counts;
- retain category-specific negative boundaries;
- route unresolved work through the follow-up ledger;
- preserve source discrepancies and register-review flags;
- keep all implementation and status decisions separate.

### Not authorized

- parser behavior changes;
- runtime lexical or pronunciation changes;
- generated `main.js` changes;
- new construction identities;
- identity or status transitions;
- accepted corpus classifications;
- survey or panel deployment;
- native-speaker judgments;
- runtime version, release, or deployment changes.

## References

- Bauer, Robert S., and Paul K. Benedict. 1997. *Modern Cantonese Phonology*. DOI `10.1515/9783110823707`.
- Bodomo, Adams, Olivia Lam, and Natalie Yu. 2003. “Double Object and Serial Verb Benefactive Constructions in Cantonese.” *LFG03 Proceedings*.
- Cheung, Lawrence Yam-Leung. 2021. “The origin and development of the question particle me1 in Cantonese.” *Lingua* 254:103049. DOI `10.1016/j.lingua.2021.103049`.
- Lam, Charles, Chaak-ming Lau, and Jackson L. Lee. 2024. “Multi-Tiered Cantonese Word Segmentation.” *LREC-COLING 2024*, 11993–12002.
- Lei, Margaret Ka-yan, and Thomas Hun-tak Lee. 2019. “Differentiating universal quantification from completive aspect in child Cantonese.” DOI `10.1075/lald.63.09lei`.
- Liesenfeld, Andreas Maria. 2019. “Cantonese turn-initial minimal particles: annotation of discourse-interactional functions in dialog corpora.” *PACLIC 33*, 471–479.
- Luke, K. K. 1990. *Utterance Particles in Cantonese Conversation*. DOI `10.1075/pbns.9`.
- Luke, K. K., and Adams Bodomo. 2001. “A comparative study of the semantics of serial verb constructions in Dagaare and Cantonese.” DOI `10.1075/lic.3.2.02luk`.
- Sybesma, Rint, and Boya Li. 2007. “The dissection and structural mapping of Cantonese sentence final particles.” *Lingua* 117(10):1739–1783. DOI `10.1016/j.lingua.2006.10.003`.
- Tong, Malindy, Michael Yell, and Cliff Goddard. 1997. “Semantic primitives of time and space in Hong Kong Cantonese.” *Language Sciences* 19(3):245–261. DOI `10.1016/S0388-0001(96)00063-0`.
- Tse, Shek Kam, Hui Li, and Shing On Leung. 2014. “Tense and temporality: How young children express time in Cantonese.” DOI `10.1075/bct.60.03tse`.
- Yiu, Carine Yuk Man. “Directional verbs in Cantonese: A typological and historical study.”
