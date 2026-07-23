# UC-RQ-026 — Post-predicate `啲 di1`: scalar comparison, adjustment, and action modification

## Research question

When does post-predicate `啲 di1` express a differential comparative (“more A”), a context-dependent scalar adjustment (“a bit more/less A”), a directive requesting movement along a scale, or an action-manner modification, and how are these uses distinguished from nominal `啲`, preverbal `有啲`, reduplicative `哋 dei2`, and explicit `過 gwo3` comparatives?

## Status of this research unit

- **Disposition:** dedicated construction family justified for continued research.
- **Parser authorization:** none.
- **Construction-status change:** none.
- **Evidence level:** direct source support for a bare property comparative and for `啲` as a bound comparative suffix; contextual and action-adjustment subtypes are source-attested but not exhaustively bounded.
- **Runtime baseline audited:** sandbox v0.5.208. Re-run against the active branch before implementation.

The evidence does **not** justify one unrestricted `X + 啲` rule. At minimum, the project must separate:

1. property-predicate bare comparatives;
2. property or behavior adjustments with an implicit contextual standard;
3. preposed action adjustment (`快啲嚟`, `慢啲講`);
4. postverbal action-manner adjustment (`講慢啲`, `行快啲`);
5. temporal or spatial adverbialized forms (`遲啲`, `近啲`);
6. quantitative expressions (`多啲`, `少啲`);
7. nominal `啲 + N`;
8. preverbal `有啲 + property`;
9. adjective reduplication plus `哋 dei2`;
10. explicit-standard `過 gwo3` comparison.

## Direct evidence for the bare comparative

Lam (2014) identifies a Cantonese comparative construction without obligatory `過 gwo3`. The source gives:

```text
Mary gou1 (Peter) (jat1) di1
Mary tall Peter one bit
“Mary is a bit taller (than Peter).”
```

The comparison standard is optional. When it is overt, it precedes `(一)啲`; the differential measure phrase must follow the standard. With no overt standard, `高啲` receives a contextual comparative reading.

Lam explicitly analyzes `(一)啲` as a **measure phrase** expressing the differential, not as the functional comparative marker itself. The source contrasts this with the `過` comparative, in which `過` requires an overt comparison standard under the proposed analysis.

This establishes a narrow surface family:

```text
Subject + gradable property + (overt standard) + (一)啲
Subject + gradable property + (一)啲
```

It does not establish unrestricted attachment to every predicate or settle all pragmatic readings of a subjectless `A啲` expression.

## Morphological evidence

Lam, Lau, and Lee (2024) treat adjectival `啲` as a bound comparative suffix in a multi-tiered segmentation scheme based on 150,000 characters of HKCanCor. They illustrate `靚-啲` “prettier” and `遲-啲` “later,” and classify the latter as an adjective–suffix combination that can function adverbially.

This supports three important boundaries:

- comparative/degree `啲` is morphologically distinct from nominal `啲` before a noun;
- an `A-啲` unit may function beyond simple adjectival predication;
- segmentation evidence does not by itself determine the full syntactic relation to a subject, comparison standard, or following VP.

The same paper reports high inter-annotator agreement for the segmentation scheme, but it is a segmentation study rather than an acceptability or productivity experiment.

## Contemporary lexical evidence

The Words.hk entry for suffixal `啲` describes it as “a little bit; a bit; a bit more,” normally following an adjective in comparisons. Its examples include:

```text
細啲              smaller
靚啲              prettier
好啲喇            better now
講慢啲            speak more slowly
拉過啲張枱        move the table slightly closer
```

These examples demonstrate contextual flexibility, but a dictionary entry cannot by itself decide whether all uses share one syntactic construction. In particular, `好啲喇` may involve change relative to a prior state, while `講慢啲` modifies an event and `拉過啲` combines degree with a directional predicate.

## Source-attested action-adjustment profiles

Existing project sources independently attest both positions of an action-related `A啲` expression:

```text
快啲行上去啦      preposed adjustment before a directional VP
行快啲            postverbal action-manner adjustment
唔該講慢啲        postverbal adjustment inside a polite directive
```

These forms support visible degree/action composition, but they do not establish free alternation. Position, predicate class, scope, discourse force, and final-particle behavior must remain explicit.

A preposed form such as `快啲嚟` can function as an imperative-like request to act sooner/faster. A postverbal form such as `講慢啲` more transparently modifies how the event is performed. The two orders may overlap in translation while differing syntactically and pragmatically.

## Property comparison versus scalar adjustment

The same surface `A啲` can be compatible with more than one interpretation:

```text
呢個貴啲。
```

Possible readings include:

- this one is more expensive than a salient alternative;
- this one is somewhat expensive relative to a contextual standard;
- in a directive or negotiation context, make/select it a little more expensive.

The surface string alone does not identify the comparison standard or speech act. A future parser should therefore preserve:

| Dimension | Values to distinguish |
|---|---|
| predicate domain | property, manner, quantity, direction, time, lexicalized expression |
| syntactic position | clause-final predicate, pre-VP, postverbal complement, NP-internal/nominal |
| standard source | overt NP, discourse alternative, prior state, requested target, unresolved |
| degree contribution | differential, attenuative, increase request, decrease request, temporal shift, quantity |
| speech act | assertion, comparison answer, directive, correction, evaluation, unresolved |
| polarity/direction | more on lexical scale, less on lexical scale, context-dependent |

The phrase should not be assigned a fixed English gloss such as “more” or “a bit” without context.

## The lexical scale matters

`啲` signals a small differential or adjustment, but the resulting practical direction depends on the lexical scale:

```text
快啲    faster / sooner
慢啲    slower
平啲    cheaper
貴啲    more expensive
近啲    closer
遠啲    farther
```

A single abstract “increase” operation can yield opposite real-world instructions depending on the predicate. This is not evidence that the syntax changes, but it means the learner-facing interpretation must derive direction from the lexical property rather than from `啲` alone.

## Boundaries against neighboring constructions

### Nominal `啲`

```text
啲人
呢啲書
```

Here `啲` precedes a nominal head and contributes quantity/determination. This is not the post-predicate differential suffix.

### Preverbal `有啲`

```text
有啲貴
```

`有啲` precedes the property predicate and means approximately “somewhat/a bit.” It is structurally and distributionally distinct from post-predicate `貴啲`, even where translations overlap.

### Reduplicative `哋 dei2`

```text
壞壞哋
```

The attenuative suffix in adjective reduplication has a different tone, form, and construction. Orthographic variation or casual romanization must not collapse `哋 dei2` into `啲 di1`.

### `過 gwo3` comparison

```text
阿明高過阿強。
```

`過` overtly introduces the standard in a surpass comparative. Lam’s bare `啲` comparative permits an omitted standard and treats `(一)啲` as the differential measure phrase. These constructions may interact but are not interchangeable token templates.

### Change-of-state `咗`

```text
好啲喇
好咗
```

Both can relate a property to a prior state, but `咗` and `啲` make different overt contributions. A contextual “better now” translation does not justify merging them.

### Quantity `多啲 / 少啲`

```text
食多啲
多啲人
```

`多啲` can quantify an event, object amount, or nominal set. It should not automatically be analyzed as the same property-adjective comparative as `高啲`.

## Negative boundaries

A future implementation must not:

1. treat every token ending in written `啲` as comparative;
2. treat nominal `啲 + N` as a degree suffix;
3. treat preverbal `有啲 + A` and post-predicate `A啲` as one order variant;
4. classify adjective reduplication plus `哋 dei2` as `啲 di1`;
5. infer an overt comparison standard that is not present;
6. force a comparative reading in directive, temporal, quantity, or manner contexts;
7. assume preposed and postverbal action-adjustment orders are freely interchangeable;
8. permit any noun phrase between a property predicate and `啲` merely because Lam attests a constrained comparison-standard position;
9. let a full-span wrapper imply that subject, standard, scale, or speech act has been resolved;
10. use dictionary glosses as proof of unrestricted syntactic productivity.

## Runtime collision summary

The v0.5.208 runtime has a broad `DegreeMannerAdverbial` template over `degree_manner_head + 啲`. It captures many useful surfaces, but the audit shows major structural and semantic collisions:

- `高啲` and `貴啲` are recognized, but only as generic degree/manner phrases; comparative standard and differential interpretation are not represented.
- `阿明高啲` leaves the subject unwrapped.
- `阿明高阿強啲` incorrectly groups `高阿強` as a nominal modifier/head span and then treats the whole as one degree/manner phrase.
- `呢個貴啲` lets the already combined `呢個貴` topic-comment span fill the degree head, causing `啲` to scope over too much material.
- `貴係貴啲` recognizes only the final `貴啲` and leaves the concessive/reiterative frame unresolved.
- `好啲喇` receives no construction at all.
- `有啲貴` is separately recognized as a degree-stative predicate, which is an important boundary to preserve.
- `快啲嚟` and `慢啲講` receive a preposed modifier wrapper.
- `講慢啲` and `行快啲` receive a postverbal complement wrapper.
- `遲啲見` is treated as degree/manner modification even though `遲啲` may function as a temporal adverbial “later.”

The runtime therefore has useful surface reach but lacks the source-supported distinction among differential comparison, contextual adjustment, action manner, temporal shift, and quantity.

## Required next research

Before implementation:

1. collect natural conversational examples with sufficient preceding context to identify the standard;
2. compare overt-standard, discourse-standard, prior-state, and requested-target readings;
3. test gradable property classes, including open/closed scales and evaluative predicates;
4. test whether `(一)啲` and bare `啲` differ in register, emphasis, or syntax;
5. test standard length and category in the Lam order `A + standard + 啲`;
6. distinguish declarative, imperative, answer, correction, and negotiation contexts;
7. compare preposed and postverbal action-adjustment orders with matched predicates;
8. test temporal/adverbialized forms such as `遲啲` and spatial/directional forms such as `近啲`;
9. separate quantity uses of `多啲/少啲` from property comparison;
10. use contextual interpretation tasks rather than isolated naturalness ratings alone.

## Sources

1. Lam, Charles. 2014. “A Unified Analysis to Surpass Comparative and Experiential Aspect.” *Proceedings of PACLIC 28*, 368–377. ACL Anthology `Y14-1043`. Section 7, examples (30)–(32).
2. Lam, Charles, Chaak Ming Lau, and Jackson L. Lee. 2024. “Multi-Tiered Cantonese Word Segmentation.” *Proceedings of LREC-COLING 2024*, 11993–12002. ACL Anthology `2024.lrec-main.1047`. Examples and discussion of `靚-啲` and `遲-啲`.
3. Words.hk / 粵典. Entry `啲 / D`, suffix sense. Contemporary manually curated dictionary evidence; examples include `細啲`, `靚啲`, `好啲喇`, and `講慢啲`.
4. Matthews, Stephen, and Virginia Yip. *A Grammar of Cantonese as Spoken in Hong Kong*, online multimedia Chapter 9. General adjective and comparison profile; used as a neighboring-construction reference rather than direct proof of every `A啲` subtype.
5. 鄭定歐、張勵妍、高石英. 2021. *粵語（香港話）教程（修訂版）*. Exact pedagogical examples `貴係貴啲` and `行快啲` as recorded in the project source matrix.
6. Chow, Bun-Ching. 2007. *Cantonese for Everyone*. Exact pedagogical directive `唔該講慢啲` as recorded in the project source matrix.
7. Wong, Anita Mei-Yin. 2023. *Understanding Development and Disorder in Cantonese Using Language Sample Analysis*. Exact preposed directive `快啲行上去啦` as recorded in the project source matrix.

## Final disposition

`UC-RQ-026` should not become one generic `AdjDiComparative` matcher. The strongest direct evidence supports a bare comparative in which a gradable property is followed by an optional overt standard and then `(一)啲` as a differential measure phrase. Additional attested uses show contextual scalar adjustment, preposed action modification, postverbal action manner, and adverbialized forms. Any future runtime design must preserve predicate domain, position, comparison-standard source, degree contribution, and speech-act uncertainty rather than assigning a single comparative gloss to every `X啲` string.
