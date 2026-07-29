# Glossika Cantonese (HK) A1 Week 19 research packet

- Packet: `GLOSSIKA-YUEHK-A1-W19-20260726-RESEARCH-R1`
- Intake: #129
- Work claim: #286
- Corpus ingress: #136 / PR #285
- Source: `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W19-20260726/source.json`
- Source payload SHA-256: `ec055012fbf34af2e99577b681c15bcd14e0a4f8e72f7f14e00c66bc8df04cdc`
- Status: research complete; no parser, lexicon, classifier-rule, construction-status, corpus-classification, survey, version, or release change

## Purpose and evidence boundary

This packet evaluates the authorized Week 19 lesson as pedagogical and lexical attestation. Source Cantonese, Jyutping, English glosses, category labels, sentence order, and tone rows remain immutable in the corpus package. They do not automatically establish classifier compatibility, changed-tone values, grammatical identity, particle force, register, frequency, or parser behavior.

Machine-readable outputs:

- `data/research-ledgers/glossika-week19-claim-source.json`
- `data/research-ledgers/glossika-week19-classifier-compatibility.json`
- `data/research-ledgers/glossika-week19-function-word-profiles.json`
- `data/research-ledgers/glossika-week19-particle-boundaries.json`
- `data/research-ledgers/glossika-week19-dative-audit.json`
- `data/research-ledgers/glossika-week19-spatial-lexical-classes.json`
- `data/research-ledgers/glossika-week19-lexical-numeral-candidates.json`
- `data/research-ledgers/glossika-week19-followup-candidates.json`

Canonical runtime ownership resolves only to `src/**` and `src/runtime-resources/**`. Generated `main.js` is excluded and unchanged.

## Executive findings

1. **Classifier glosses are useful semantic hints, not exhaustive compatibility rules.** Cantonese classifier selection combines semantic tendencies with conventional noun-specific preferences and syntactic constraints.
2. **The source reading `架 gaa2` is a genuine discrepancy.** Direct Cantonese classifier research independently lists vehicle classifier `架 gaa3`; the source value remains preserved but is not accepted.
3. **The current modular classifier table covers 10 of 14 source classifiers.** `枝`, `對`, `把`, and `條` have no exact classifier-rule entry. That absence does not itself authorize expansion.
4. **`架` and `部` cannot be treated as freely interchangeable vehicle classifiers.** The current modular rule narrows `架` to vehicles and allows `部` for vehicles plus machines/devices; exact noun compatibility still needs corpus and controlled judgment evidence.
5. **Bare classifier phrases can be contextually nominal.** `我要一杯。佢呢？` supports a cardinality-one classifier phrase with recoverable nominal material, but the omitted noun must not be invented or generalized across contexts.
6. **The lesson's “function words” are six different systems.** `嘅`, `喺`, `咗`, `緊`, `過`, and `到` require separate lexical, syntactic, aspectual, spatial, result, and discourse profiles.
7. **The five particle glosses are incomplete.** Tone, host clause, discourse context, intonation, combinations, and non-final uses remain visible.
8. **`畀碗湯佢` matches directly supported neutral Cantonese GIVE order.** Theme precedes recipient. Recipient-before-theme variants are conditioned and cannot be treated as freely interchangeable.
9. **The spatial inventory is heterogeneous.** It contains region nouns, localizers, scalar predicates, orientation markers, route-motion predicates, cardinal-direction regions, endpoints, distributive place expressions, and compounds—not one locative class.
10. **Twenty-two lexical/resource items remain review candidates.** These include `枝`, 17 uncovered spatial forms, and four transport/place terms.
11. **All ten billion-level numeral forms remain compositional.** No opaque whole-form entries are justified.
12. **The tone drill is pronunciation material only.** Five `saam-` cells are explicitly blank and must not be silently completed.

## 1. Classifier selection and compatibility

The source lists fourteen classifiers with short English classes. Direct Cantonese acquisition research describes a complex classifier system in which learners attend to both semantics and syntax. Corpus comparison also shows that broad classifiers such as `個` and `隻` can be overextended, which directly warns against treating a broad observed use as unrestricted adult compatibility.

### Classifier matrix boundary

The audit records a semantic profile for each source form but deliberately leaves `acceptedNounPairs` empty. A profile such as “vehicle,” “flat object,” or “long thing” is a hypothesis-generating category, not a complete lexical selection rule.

Classifier compatibility can depend on:

- physical shape or configuration;
- animacy and individuation;
- container versus contained quantity;
- conventional lexical pairing;
- changed-tone reading;
- regional or register preference;
- evaluative or derogatory extension;
- discourse and nominal ellipsis.

### `架 gaa3` discrepancy

The lesson supplies `架 gaa2`. Independent Cantonese classifier research lists `架 gaa3` among the common classifiers and associates it with vehicles. The current modular classifier table also contains `架` under `vehicle`.

Research consequence:

- preserve `gaa2` as the immutable source value;
- record direct evidence for `gaa3`;
- do not silently rewrite the source layer;
- do not add `gaa2` to pronunciation resources;
- verify any changed-tone or lexicalized exceptions separately.

### `架` versus `部`

The current modular rule records:

- `架`: vehicle;
- `部`: vehicle, machine/device.

This is an implementation observation, not sufficient linguistic evidence for every noun pair. A dedicated matrix should compare ordinary nouns such as cars, buses, trains, bicycles, lifts, cameras, phones, computers, and machines across `架`, `部`, and possible alternatives. The task must measure preference and contextual markedness rather than force a binary universal rule.

### Broad classifiers

- `個` is the general classifier in the source and current modular table, but this does not erase more specific conventional choices.
- `隻` has a central animal profile and broader extensions that may be lexical, colloquial, evaluative, or overgeneralized.
- `件` extends beyond clothing into individuated matters and other conventional uses.
- `條` has elongated/path-related tendencies but also lexical and evaluative extensions.

These forms require noun-specific controls.

### Measure-like classifier phrases

`杯` and `碗` can classify a container and simultaneously establish a quantity of its contents. Their container/measure use should remain distinct from sortal classification of an object kind. Likewise `對` denotes a pair rather than an inherent noun class.

## 2. Numeral–classifier phrases and ellipsis

The source examples include:

- `兩杯茶`
- `呢間鋪頭`
- `幾多杯咖啡`
- `一杯`
- `碗湯`
- parallel `一杯咖啡，一碗湯`

Construction-based classifier research supports compositional classifier phrases with and without an overt numeral; a classifier without a visible numeral may receive cardinality one in suitable contexts.

### Positive boundaries

- numeral/quantity plus classifier plus noun forms a nominal unit;
- a classifier phrase may be interpreted with recoverable nominal material in discourse;
- parallel classifier phrases may function as context-linked nominal fragments or lists.

### Negative boundaries

Do not:

- invent the omitted noun after `一杯`;
- assume every classifier phrase can stand independently;
- create a new permanent construction solely from `幾多 + classifier + noun`;
- treat classifier omission as evidence that classifiers are pronouns;
- merge `佢呢` continuation with the classifier phrase itself.

The source supports contextual probes, not unrestricted ellipsis.

## 3. Function-word profile split

### `嘅 ge3`

Required profiles include:

- attributive linker;
- nominalizer or headless nominal;
- clause-final discourse particle.

The same written character does not imply one syntax. Clause-final `嘅` in `佢唔飲咖啡嘅` should not be analyzed as an attributive linker simply because the lesson also labels `嘅` possessive/attributive.

### `喺 hai2`

Required profiles include:

- locative predicate;
- preverbal event-location marker with a following predicate.

It is not copular `係`, and event-location use must retain the following predicate and location relation.

### `咗 zo2`

Required profiles include:

- postverbal perfective;
- sentence-final change-of-state or current-relevance profiles.

It is not generic past tense and is not automatically interchangeable with completion `完`.

### `緊 gan2`

`佢食緊飯` attests an ongoing activity with postverbal progressive `緊`. The source does not establish unrestricted compatibility with stative, punctual, achievement, or result predicates. Predicate class, placement, negation, and interaction with other aspect markers require controlled evidence.

### `過 gwo3`

Required profiles include:

- postverbal experiential aspect;
- lexical passage or motion verb;
- directional or result component in other structures.

`你去過日本未` contains experiential `過` plus final `未`. It remains distinct from a perfective `咗` question, a preverbal `未` negative statement, and exact-copy A-not-A.

### `到 dou3`

Required profiles include:

- arrival predicate;
- goal or endpoint element;
- result or extent complement;
- temporal or scalar limit relation.

Token presence alone cannot assign one resultative label. Adjacency, argument structure, lexical predicate, goal, extent, and potential forms matter.

## 4. Sentence-final particles

The source provides:

- `啦 laa1` — suggestion;
- `㗎 gaa3` — emphatic;
- `呀 aa3` — softening;
- `嘞 laak3` — change of state;
- `囉 lo1` — obviousness.

Direct Cantonese particle research describes a structured, multifunctional system. One English noun does not define a particle's complete meaning.

### Required boundaries

- tone-specific identity;
- declarative, imperative, wh-question, A-not-A, and other hosts;
- response demand and speaker commitment;
- update, inference, resignation, urging, mitigation, and stance;
- prosody and vowel length;
- particle clusters and order;
- orthographic variants;
- lexical or grammatical non-final homographs.

Specific cautions:

- `㗎 gaa3` has multiple assertive, explanatory, and response-demand profiles and must remain distinct from classifier `架 gaa3`.
- `呀 aa3` is compatible with several clause types and is not merely a generic softener.
- `嘞 laak3` must not be silently merged with `喇 laa3` or treated as perfective `咗`.
- `囉 lo1` can express inferred obviousness, consequence, resigned acceptance, or related discourse effects depending on context.

No particle rule or status changes follow from the source table.

## 5. Dative order and clause-final particles

The source dialog contains:

`佢唔飲咖啡嘅，畀碗湯佢啦。`

### Lexical GIVE order

Direct Cantonese dative research supports lexical `畀` GIVE with theme before recipient in the characteristic neutral order:

`畀 + 碗湯 + 佢`

The source sentence therefore supplies a directly supported positive example of V–theme–recipient order.

### Variant order boundary

Cantonese dative research also documents variant and optional forms, including V–recipient–theme and V–theme–`畀`–recipient patterns. Their distribution is conditioned by construction type, weight, focus, topicalization, discourse, and language-contact factors.

Therefore `畀佢一碗湯` must not be treated as freely equivalent to the neutral source order. This packet does not declare it categorically impossible; it records it as a marked or context-sensitive contrast.

### Separate particle structure

- clause-final `嘅` in the preceding clause requires a discourse profile rather than attributive analysis;
- final `啦 laa1` contributes request, hortative, or imperative discourse force;
- neither particle changes the theme–recipient order;
- lexical GIVE must remain distinct from passive, permissive, recipient-marker, or benefactive `畀` profiles.

## 6. Spatial lexical classes

The 23 spatial forms cannot share one catch-all label.

### Region nouns and localizers

Examples include `周圍`, `中間`, `出面`, `盡頭`, `角落`, `頂部`, `底部`, `遠處`, `近處`, and `正中`. These differ in ground requirements, deictic reference, nominal behavior, localizer behavior, and possible adverbial function.

### Cardinal-direction regions

`東邊`, `西邊`, `南邊`, and `北邊` denote regions or sides associated with cardinal directions. They are not bare route instructions and need a reference frame.

### Orientation and scalar forms

- `向` marks orientation or direction toward a complement;
- `遠` is a scalar distance predicate or modifier;
- neither is inherently a location noun.

### Route or path predicates

`穿過` introduces motion through a path or ground. It requires event structure and should not be grouped with static region nouns.

### Distributive place expressions

`四周` and `到處` may distribute location over surrounding or multiple places. They differ from one bounded location noun.

Direct Cantonese spatial research supports splitting predicative spatial elements, nominal-like localizers, and other spatial categories. Locative word order is constrained. No broad locative parser expansion follows from the lesson vocabulary.

## 7. Transport and place lexicon

The source attests:

- `的士站`
- `渡輪`
- `纜車`
- `港鐵`

These are valuable Hong Kong lexical attestations. Before runtime ingress, verify:

- ordinary written form and Jyutping;
- learner gloss;
- Hong Kong and broader regional distribution;
- whether the item is a lexical whole or transparent compound;
- overlap with existing `地鐵站`, vehicle nouns, and transport systems;
- whether parsing benefits from a whole entry or existing components.

Source attestation alone does not authorize four opaque entries.

## 8. Billion-level numerals

The source lists `十億` through `一百億`. These remain compositionally analyzable:

- multiplier or decade structure;
- unit `億`;
- no evidence of lexical opacity.

Do not add ten independent whole-form entries. A surface word tier in segmentation does not erase internal numeral structure.

## 9. Tone paradigms

The source provides six rows across `si-`, `saam-`, `fu-`, and `fan-` columns. Five `saam-` cells are explicitly blank.

The table requires item-level verification of:

- character and lexical identity;
- Jyutping syllable and tone;
- ordinary modern Cantonese usage;
- register and learner suitability;
- whether the forms constitute a valid minimal or near-minimal tone paradigm;
- whether changed-tone or literary readings are involved.

The blank cells must remain blank until a source-supported candidate is independently selected. No pronunciation-resource changes are authorized.

## 10. Project consequences

### Authorized by this packet

- retain the nine research files;
- retain 16 bounded claims and 12 follow-up candidates;
- retain the direct `架 gaa3` discrepancy finding;
- retain a zero-promotion classifier matrix;
- retain separate function-word and particle profiles;
- retain the direct V–theme–recipient dative boundary;
- retain the spatial lexical-class split;
- retain 22 lexical/resource review candidates;
- retain all ten numerals as compositional;
- retain five missing tone cells as source gaps.

### Not authorized

- parser behavior changes;
- runtime lexical or pronunciation changes;
- classifier compatibility changes;
- generated `main.js` changes;
- construction identity or status changes;
- accepted corpus classifications;
- survey deployment;
- native-speaker judgment claims;
- runtime version or release changes.

## References

- Chan, Wing Shan Angel. 2010. “The Cantonese double object construction with bei2 ‘give’ in bilingual children: The role of input.” *International Journal of Bilingualism* 14(1):65–85. DOI `10.1177/1367006909356653`.
- Kwan, Wing-man. 2005. *On the word order of locative prepositional phrases in Cantonese: processing, iconicity and grammar*. University of Hong Kong thesis. DOI `10.5353/th_b3145014`.
- Lai, Ryan Ka Yau, and Michelle Man-Long Pang. 2023. “Rethinking the Description and Typology of Cantonese Causative–Resultative Constructions.” *Languages* 8(2):151. DOI `10.3390/languages8020151`.
- Lam, Charles, Chaak-ming Lau, and Jackson L. Lee. 2024. “Multi-Tiered Cantonese Word Segmentation.” *LREC-COLING 2024*, 11993–12002.
- Lam, Olivia S. C. 2014. “Double object constructions and the anomalous syntax of GIVE in Cantonese.” *Language Sciences* 45:71–95. DOI `10.1016/j.langsci.2014.05.001`.
- Li, Hui, and Elaine C. M. Wong. 2014. “Comparing classifier use in 1995 and 2010 early child Cantonese to explore social change in Hong Kong.” *Chinese Language and Discourse* 5(1). DOI `10.1075/cld.5.1.04li`.
- Sybesma, Rint, and Boya Li. 2007. “The dissection and structural mapping of Cantonese sentence final particles.” *Lingua* 117(10):1739–1783. DOI `10.1016/j.lingua.2006.10.003`.
- Tse, Shek Kam, Hui Li, and Shing On Leung. 2007. “The acquisition of Cantonese classifiers by preschool children in Hong Kong.” *Journal of Child Language* 34(3):495–517. DOI `10.1017/S0305000906007873`.
- Wong, Anita M.-Y., Dorcas C.-C. Chow, Catherine McBride-Cheng, and Stephanie F. Stokes. 2010. “Optional elements and variant structures in the productions of bei2 ‘to give’ dative constructions in Cantonese-speaking adults and three-year-old children.” *Journal of Child Language* 37(1):175–196. DOI `10.1017/S0305000909009416`.
- Xie, Qin, Yue Sara Zhang, and Francesco-Alessio Ursini. 2023. “Spatial Categories in Cantonese: Morpho-Syntactic Analysis Meets Discourse Distribution.”
- *A Construction-based Approach to Cantonese Classifiers*. 2024. Proceedings of the International Conference on Head-Driven Phrase Structure Grammar.
- Bauer, Robert S., and Paul K. Benedict. 1997. *Modern Cantonese Phonology*.
