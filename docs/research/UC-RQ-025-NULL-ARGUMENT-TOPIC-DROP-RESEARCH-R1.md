# UC-RQ-025 — Null arguments, topic drop, and discourse ellipsis in Cantonese

## Research question

Under what discourse, lexical, semantic, and structural conditions may Cantonese subjects, objects, or larger predicate complements remain unexpressed, and how should these cases be distinguished from lexical intransitivity, fragments, noun ellipsis, VP ellipsis, and overt topic–comment structure?

## Status of this research unit

- **Disposition:** dedicated construction family justified for continued research.
- **Parser authorization:** none.
- **Construction-status change:** none.
- **Evidence level:** source-linked object-drop map; null-subject and cross-clausal resolution boundaries remain under-researched.
- **Runtime baseline audited:** sandbox v0.5.208. Re-run against the active branch before implementation.

The evidence does **not** support one generic rule saying “missing NP = null argument.” At minimum, the project must distinguish:

1. specific anaphoric object drop;
2. non-specific existential object drop;
3. generic object drop;
4. attributive/intensional object drop;
5. discourse-controlled null subjects;
6. clauses with both subject and object unexpressed;
7. overt topic chains with a linked missing object;
8. lexical intransitivity or an unspecified activity/domain reading;
9. nominal ellipsis inside an NP;
10. VP/complement ellipsis licensed by a modal, auxiliary, or aspectual head;
11. fragments whose missing material is supplied by a question or dialogue context.

## Direct Cantonese evidence

### Specific anaphoric object drop

Yip and Matthews (2000) state that Cantonese allows both null subjects and null objects in finite clauses. Their adult Cantonese dialogue illustrates a discourse-recoverable object:

```text
A: 件衫好靚喎。
   gin6 saam1 hou2 leng3 wo3
   “That blouse is very pretty.”

B: 我鍾意呀。
   ngo5 zung1ji3 aa3
   “I like (it).”
```

The object of `鍾意` is recoverable because the blouse was introduced immediately before. The paper analyzes this through a null topic, but the surface fact does not require Canto Span to adopt that theoretical ontology.

### Non-specific object-drop interpretations

Lee (2018) argues that Cantonese also permits anaphoric object drop whose interpretation is not a single definite individual. The source separates three subtypes.

#### Existential

```text
約翰見到一隻熊喇，瑪麗都見到。
joek3hon6 tai2gin3 jat1zek3 hung4 laa1, maa5lei6 dou1 tai2gin3
```

The second clause may mean that Mary saw the same bear or that she saw another bear. An omitted object can therefore support both specific and non-specific existential readings.

#### Generic

```text
約翰鍾意熊，瑪麗都鍾意。
joek3hon6 zung1ji3 hung4, maa5lei6 dou1 zung1ji3
```

The understood object in the second clause denotes the kind “bears,” not necessarily particular bears.

Lee also cites the ordinary question–answer pair:

```text
你鍾唔鍾意食潮州菜呀？
梗係鍾意啦！
```

The response contains no overt object, but the understood domain is Chiu Chow food.

#### Attributive/intensional

```text
約翰要一架新車，瑪麗都要。
joek3hon6 jiu3 jat1gaa3 san1 ce1, maa5lei6 dou1 jiu3
```

The second clause may mean that Mary wants a new car satisfying the same description, without referring to an already existing individual car.

Lee reports that the Cantonese examples in the classification section were judged acceptable by 20 Hong Kong-born Cantonese speakers aged 15–45. This supports the existence of the patterns, but it is not a balanced experiment, corpus study, or proof that every predicate licenses the same omissions.

## Null subjects remain a separate research problem

Yip and Matthews explicitly state that Cantonese permits null subjects as well as null objects, but their detailed discussion in the inspected section concerns objects. This unit therefore records null-subject clauses as independently motivated but not yet adequately bounded.

Generated probes such as the following illustrate the question but are not evidence:

```text
佢話會嚟。之後真係嚟咗。
食咗喇。
```

Possible interpretations depend on discourse continuity, speech-act context, person, event structure, and whether the clause is an answer, directive, narrative continuation, or formula. A sentence-only parser cannot safely resolve the omitted subject from token adjacency.

Research on Chinese-type topic drop also warns against collapsing all omitted arguments into “radical pro-drop.” Huang and Yang (2024) distinguish null topics from other pro-drop phenomena and propose locality and root-clause restrictions. Their evidence is not Cantonese-specific, so it is a theoretical boundary lead rather than a Cantonese implementation rule.

## Object drop is not lexical intransitivity

The absence of an overt object does not by itself show that a verb is being used intransitively. Compare:

```text
我鍾意呢件衫。
我鍾意。
```

The second string may contain a discourse-recoverable object/domain, but it may also be incomplete without context. Predicates differ in whether they allow:

- a specific understood patient;
- a generic activity or object class;
- an indefinite/non-specific interpretation;
- a conventional objectless use;
- no omission at all.

Predicate valency and discourse licensing must therefore be represented separately.

## Argument drop is not VP ellipsis

Lee and Pan (2024) show that Cantonese VP ellipsis is selectively licensed. Modals and some perfective/aspectual heads can license an elided VP, while progressive `喺度`, aspectual `開始`, and continuative `keep住` do not uniformly do so.

This is structurally different from omitting only the nominal object of an overt lexical verb:

```text
我鍾意 [object].              object drop
今日冇 [量體溫].              VP ellipsis under 冇
```

A future parser must not use `ComplementEllipsisFragment` as a catch-all for both phenomena.

## Overt topic chains versus implicit discourse topics

The source analysis connects null objects with topicalization. The v0.5.208 runtime already has a narrow overt-topic path:

```text
呢本書，我睇完喇。
```

It records `呢本書` as an overt antecedent and links a missing object/domain in `睇完`. This is useful but does not solve implicit topic continuity across separate sentences or turns.

The following generated probe is structurally different:

```text
佢買咗本書。睇完喇。
```

The antecedent and omitted arguments must be recovered across a sentence boundary. That requires discourse state, not merely an overt initial topic inside one parsed line.

## Interpretation dimensions that must remain explicit

A null-object analysis should preserve at least:

| Dimension | Values to distinguish |
|---|---|
| syntactic slot | subject, direct object, indirect object, complement, larger VP |
| antecedent source | overt topic, preceding clause, earlier turn, situation, generic domain, unresolved |
| reference type | specific, non-specific existential, generic, attributive/intensional, ambiguous |
| predicate licensing | required object, optional object, conventional objectless use, unresolved |
| discourse relation | same topic, topic shift, contrast, answer, narrative continuation, repair |
| confidence | linked, compatible but ambiguous, context required, blocked |

The parser should never fabricate an omitted lexical token or silently choose one referent where several readings remain available.

## Negative boundaries

A future implementation must not:

1. interpret every objectless verb as syntactically intransitive;
2. infer a definite object whenever a prior NP exists;
3. exclude non-specific, generic, or attributive readings documented for Cantonese;
4. treat every absent subject as coreferential with the nearest overt subject;
5. treat subject omission, object omission, and VP ellipsis as one construction;
6. classify every short reply as a `FragmentAnswer` without preserving the selected predicate and missing slot;
7. confuse classifier/noun ellipsis inside an NP with argument drop;
8. let a full-span `ClauseRelationGraph`, `PreferenceVP`, `ModalVP`, or particle wrapper imply that omitted arguments were resolved;
9. link arguments across sentence boundaries without explicit discourse state;
10. adopt one disputed theoretical derivation—null topic, null pronoun, or NP ellipsis—as established parser ontology.

## Runtime collision summary

The v0.5.208 sandbox shows useful but inconsistent partial handling:

- `我鍾意。` becomes `NeedsContext` with missing `preference_object_or_domain`.
- `食咗喇。` becomes `NeedsContext` with both `subject` and `object_or_activity_domain` missing.
- `呢本書，我睇完喇。` receives an overt `TopicChain` and a linked null object.
- `張三見到一隻熊喇，瑪麗都見到。` receives a full-span clause relation, but the second `見到` has no explicit null-object relation.
- `約翰鍾意熊，瑪麗都鍾意。` receives two `PreferenceVP` nodes without preserving the generic null-object interpretation.
- `約翰想要一架新車，瑪麗都想要。` receives two `ModalVP` nodes without preserving the attributive/intensional object relation.
- `佢買咗本書。睇完喇。` is not linked across sentence boundaries and remains a partial multi-root analysis.
- `佢話會嚟。之後真係嚟咗。` receives separate clause wrappers but no null-subject continuity relation.

The current runtime therefore contains a narrow overt-topic solution and several context flags, but no unified, interpretation-preserving argument-drop model.

## Required next research

Before implementation:

1. collect natural conversational examples with full preceding context;
2. annotate subject, object, indirect-object, and complement omission separately;
3. classify specific, existential, generic, and attributive object readings;
4. test predicate classes rather than assuming unrestricted omission;
5. compare overt-topic, immediately preceding, earlier-turn, and situational antecedents;
6. test topic shifts and competing antecedents;
7. separate answer fragments, imperatives, formulas, and narrative continuation;
8. test embedded-clause and clause-boundary restrictions;
9. distinguish argument drop from VP ellipsis with matched predicates;
10. use context-rich native-speaker interpretation tasks rather than isolated naturalness judgments.

Any survey should be generated through the project's blinded instrument workflow. Context and interpretation choices are essential; isolated sentence ratings cannot identify the omitted argument or its referent.

## Sources

- Lee, Patrick Chi-Wai. 2018. “A Study of Anaphoric Non-specific Object Drop in Cantonese: Classification and Derivation.” *Current Research in Chinese Linguistics* 97(1): 245–257. Official full text: `https://www.cuhk.edu.hk/ics/clrc/crcl_97_1/lee_chi_wai_patrick.pdf`. Primary source for specific/non-specific object-drop distinctions and the existential, generic, and attributive subtypes.
- Yip, Virginia, and Stephen Matthews. 2000. “Syntactic transfer in a Cantonese–English bilingual child.” *Bilingualism: Language and Cognition* 3(3): 193–208. DOI: `10.1017/S136672890000033X`. Full text: `https://talkbank.org/childes/access/Biling/0docs/Yip2000.pdf`. Primary source for the adult discourse-recoverable Cantonese null-object example and the statement that finite clauses permit null subjects and objects.
- Lee, Tommy Tsz-Ming, and Victor Junnan Pan. 2024. “Licensing VP Movement and Ellipsis in Mandarin and Cantonese.” *Proceedings of WCCFL 40*, 192–201. `https://www.lingref.com/cpp/wccfl/40/paper3711.pdf`. Primary source for selective VP-ellipsis licensing and its distinction from ordinary argument omission.
- Huang, C.-T. James, and Barry C.-Y. Yang. 2024. “Topic drop and pro drop.” *Language and Linguistics* 25(1): 1–27. DOI: `10.1075/lali.00147.yan`. Chinese-type theoretical boundary source; not Cantonese-specific evidence.

## Final disposition

`UC-RQ-025` should not become one generic `NullArgumentClause` matcher. The strongest directly verified Cantonese evidence supports a family of discourse-recoverable object omissions with distinct referential interpretations. Null subjects, multiple argument omission, and cross-sentence topic continuity are real research targets but require better Cantonese-specific contextual evidence. Any future runtime work should preserve missing-slot type, antecedent source, interpretation, and uncertainty rather than inserting hidden words or treating surface completeness as semantic resolution.
