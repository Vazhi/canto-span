# ISSUE-622 幫 beneficiary-coverb source inventory R1

Parent issue: #622  
Work claim: #623  
Date: 2026-08-05

## Scope

This inventory evaluates the unresolved Week 18 route `W18-F08`, triggered by:

```text
我幫你買嘢返嚟啦。
```

The route asks whether Cantonese has a source-supported profile in which `幫` introduces a beneficiary before a following VP. It keeps the following questions separate:

- ordinary transitive `幫` meaning ‘help’;
- benefactive/coverb `幫 + beneficiary NP + VP`;
- aspect on `幫` itself versus aspect inside the following VP;
- omission or extraction of the beneficiary;
- directional material such as `返嚟` inside the following predicate;
- sentence-final particles;
- any identity relationship to the existing `畀`-based AA18 `BenefactiveVP` family.

Parser behavior, project labels, generated examples, and the Week 18 learner source carry no independent construction-level linguistic weight.

## Linguistic source inventory

| Source ID | Source and locator | Evidence grade | Direct contribution | Limit |
|---|---|---|---|---|
| `SRC-FRANCIS-MATTHEWS-2006-COVERBS` | Elaine J. Francis and Stephen Matthews. 2006. “Categoriality and Object Extraction in Cantonese Serial Verb Constructions.” *Natural Language & Linguistic Theory* 24:751–801. DOI `10.1007/s11049-006-0005-3`; especially pp. 753, 769 and the extraction experiments. | `DIRECT_SCHOLARLY_CORE` | Defines Cantonese coverb constructions as asymmetric serial-verb structures of the form `V1 NP1 V2 (NP2)`; lists `bong1` ‘help, for’; directly illustrates `ngo5 bong1 go2 go3 jan4 zou6-je5` ‘I work for that person’; argues that coverbs retain verbal properties; and documents strong restrictions on extracting the coverb object compared with the following VP’s object. | The main 40-participant aspect experiment used other coverbs, not `bong1`. Its general aspect result must not be converted into unrestricted `幫過 + NP + VP` productivity. The preliminary `bong-gwo` example occurs in an extraction context and is marginal, not a clean positive paradigm. |
| `SRC-FRANCIS-YUASA-2008-GRAMMATICALIZATION` | Elaine J. Francis and Etsuyo Yuasa. 2008. “A Multi-Modular Approach to Gradual Change in Grammaticalization.” *Journal of Linguistics* 44:45–86. DOI `10.1017/S0022226707004951`; Cantonese coverbs, especially pp. 61–71. | `DIRECT_SCHOLARLY_CORE` | Analyzes the coverb phrase as `[V1 NP1]` preceding and modifying the main VP in an asymmetric serial construction. Identifies `bong1` ‘for’ as deriving from ‘help’ and states that the coverb use coexists with a homophonous main verb retaining the original lexical sense. | This source establishes categorial and diachronic relations, not a complete synchronic inventory of complements, particles, aspect combinations, or parser spans. |
| `SRC-FRANCIS-LAM-ZHENG-HITZ-MATTHEWS-2015` | Elaine J. Francis, Charles Lam, Carol Chun Zheng, John Hitz, and Stephen Matthews. 2015. “Resumptive Pronouns, Structural Complexity, and the Elusive Distinction between Grammar and Performance: Evidence from Cantonese.” *Lingua* 162:56–81. DOI `10.1016/j.lingua.2015.04.006`; examples (12c), (14), experiment materials, and coverb-object results. | `CONTROLLED_JUDGMENT_EVIDENCE` | Directly contrasts lexical main-verb `bong1` in `ngo5 bong1 keoi5` with coverb `bong1` in `ngo5 bong1 keoi5 maai5 ce1`. Treats the beneficiary as an object inside a coverb phrase adjunct to the following VP. Controlled production and judgment work found a strong preference for an overt resumptive pronoun rather than a gap in coverb-object relative clauses; `bong1` showed 88.2% resumptive-pronoun production in the target coverb-object condition. | The study concerns relative-clause dependency formation, not ordinary declarative omission. Gaps occurred in some coverb-object responses, so the result is gradient and cannot support a categorical ban. It does not license beneficiary omission in ordinary parser input. |
| `SRC-WONG-CHEUNG-LO-WAN-2022-GACS` | Anita Mei-Yin Wong, Candice Chi-Hang Cheung, Jessica Man-Wai Lo, and Emily Ka-Hei Wan. 2022. “Grammatical Analysis of Cantonese Samples.” In *Understanding Development and Disorder in Cantonese Using Language Sample Analysis*, pp. 19–64. Routledge. DOI `10.4324/9780367824013-2`; section 14.1, p. 50. | `DIRECT_SCHOLARLY_CORE` | Classifies benefactive serial-verb constructions as expressing help or benefit, states that `幫 bong1` typically introduces the beneficiary, and gives `我幫你洗咗啲碗啦`, directly supporting an overt beneficiary, a following transitive VP, perfective aspect inside that VP, and a clause-final particle. | One descriptive example does not establish every VP class, every aspect marker, beneficiary omission, extraction, directionals, embedding, or the full sentence-final-particle inventory. |
| `SRC-GLOSSIKA-W18-F08` | Glossika Week 18 learner source, canonical route `W18-F08`: `我幫你買嘢返嚟啦。` | `ATTESTATION_ONLY` | Attests one learner-source sequence containing `幫 + overt beneficiary + buying VP + 返嚟 + 啦`. | It is not independent construction-level analysis and cannot establish productivity, exact span, directional composition, beneficiary restrictions, or identity. |
| `PROJECT-AA18-RUNTIME` | `src/parser/detectors/transfer/legacy-recipient.js`, current AA18 legacy detector. | `RUNTIME_OBSERVATION_ONLY` | Shows that the existing runtime label `BenefactiveVP` is implemented around `畀` profiles rather than `幫`. | Runtime organization cannot determine linguistic identity or justify transferring AA18 evidence, UUID, status, or behavior to `幫`. |

## Repository-only governance record

`data/research-ledgers/glossika-week18-followup-candidates.json`, route `W18-F08`, preserves the empirical trigger and blocks token-only benefactive assignment and a generic `幫 + NP + VP` rule pending direct research. This is a project work record, not a linguistic source, so it is deliberately kept outside the evidence-grade table.

## Directly supported core

The sources converge on a narrow ordinary-clause profile:

```text
subject + 幫 + overt beneficiary NP + following VP
```

The `幫 + beneficiary NP` phrase precedes and semantically modifies the following VP. The construction is commonly described as a coverb or benefactive serial-verb construction. The evidence supports:

- an overt beneficiary object after `幫`;
- a following action predicate;
- lower-VP objects, as in buying a car or washing dishes;
- perfective `咗` inside the following VP;
- clause-final `啦` in a documented example;
- the coexistence of a distinct lexical main-verb use of `幫` ‘help’.

The label “coverb” does not mean that `幫` has lost every verbal property. Francis and Matthews and Francis and Yuasa instead argue that Cantonese coverbs retain significant verbal syntax while developing modifier-like semantics.

## Lexical-help contrast

Francis et al. directly contrast:

```text
ngo5 bong1 keoi5
‘I help her’
```

with:

```text
ngo5 bong1 keoi5 maai5 ce1
‘I buy a car for her’
```

The first has `keoi5` as the direct object of lexical `bong1`; the second has `keoi5` as the beneficiary inside a coverb phrase followed by the main predicate `maai5 ce1`.

Therefore:

- the token `幫` alone is insufficient for benefactive classification;
- `幫 + NP` without a following predicate may be ordinary lexical ‘help’;
- a typed following VP is a central discriminator for the benefactive profile;
- surface similarity must not erase the lexical-main-verb analysis.

## Aspect profile

### Aspect inside the following VP

Wong et al. directly provide:

```text
我幫你洗咗啲碗啦。
```

This supports aspect on the following predicate, not aspect on `幫`:

```text
幫 + beneficiary + [VP 洗咗啲碗]
```

### Aspect on the coverb

Francis and Matthews argue generally that Cantonese coverbs can bear aspect and remain verbs. Their preliminary materials include a `bong-gwo` example in a coverb-object extraction context. That example is marginal, and the main controlled aspect experiment did not use `bong1`.

The correct disposition is therefore:

- do not impose a categorical “no aspect on `幫`” rule;
- do not infer unrestricted `幫過 + beneficiary + VP` productivity;
- classify coverb-marked `幫過` as `SOURCE_SUGGESTED_BUT_NOT_BOUNDARY_COMPLETE` pending direct ordinary-clause evidence.

## Beneficiary extraction and omission

Francis and Matthews identify the coverb object as structurally distinct from the object of the following VP and find coverb-object extraction strongly degraded relative to extraction from the following VP.

Francis et al. later report gradient production and acceptability data. Resumptive pronouns were strongly preferred in coverb-object relative clauses; for `bong1`, 88.2% of target coverb-object productions contained the overt resumptive pronoun. Gaps still occurred, so the evidence is a strong preference rather than an absolute grammatical prohibition.

This evidence supports a conservative parser boundary:

- an overt beneficiary is part of the directly supported ordinary-clause core;
- extraction data must not be reinterpreted as general permission to omit the beneficiary;
- ordinary `幫 + VP` without an overt beneficiary remains unresolved unless independently licensed by context, valency, or a separate construction.

## Directional and particle composition

The Week 18 trigger contains:

```text
買嘢返嚟啦
```

The reviewed scholarly core establishes that the following VP may contain its own object and aspect. It does not directly establish the complete syntax or productivity of `返嚟` after every benefactive VP.

Disposition:

- `返嚟` in the Glossika sentence: `ATTESTED_IN_ONE_SOURCE`;
- general directional-tail composition under the benefactive profile: `NOT_YET_BOUNDARY_COMPLETE`;
- final `啦`: directly supported by Wong et al. in one benefactive example, but the wider particle inventory remains unresolved.

## Unsupported or unresolved profiles

The reviewed sources do not establish unrestricted support for:

- bare `幫 + VP` with no overt beneficiary;
- every stative, modal, passive, clausal, or idiomatic following predicate;
- every nominal type as beneficiary, including unrestricted inanimate beneficiaries;
- negation or modal scope at every possible position;
- `幫過 + beneficiary + VP` as a fully productive ordinary-clause paradigm;
- arbitrary directional/resultative chains after the following VP;
- every sentence-final particle or particle stack;
- A-not-A, wh-question, imperative, focus, topic, quotation, embedding, coordination, repair, or fragment profiles;
- lexicalized `幫手` as an instance of this construction;
- transfer of AA18 `畀` identity, evidence, tests, or status to `幫`.

## Source conflicts and cautions

1. The literature uses both verbal and coverb/preposition-like descriptions. The strongest reviewed analyses treat `幫` as retaining verbal syntax in a modifier-like serial construction rather than as a pure preposition.
2. Coverb-object extraction is strongly dispreferred but gradient; a categorical island ban would overstate the later experimental evidence.
3. Coverb aspect is generally supported, but `bong1` was not included in the main Francis and Matthews aspect experiment. A broad `幫過` rule would exceed the direct evidence.
4. The Glossika directional example is useful attestation but cannot define parser span or productivity.
5. The descriptive GACS example supports lower-VP `咗` and final `啦`; it does not establish the whole particle or aspect system.
6. No reviewed source determines whether this `幫` profile should reuse, split from, or sit beside AA18. That is an identity adjudication question, not a research-source inference.

## Evidence conclusion

Direct Cantonese scholarship and controlled judgment evidence isolate a coherent narrow `幫 + overt beneficiary NP + following VP` profile. The profile is structurally distinct from ordinary lexical `幫 + object`, and its beneficiary behaves as the object of the first predicate/coverb phrase rather than as an object of the following VP. Lower-VP objects and lower-VP perfective aspect are directly supported. Beneficiary extraction is strongly dispreferred but gradient. Aspect directly on `幫` is not categorically excluded, yet its ordinary-clause boundary remains incomplete. Directional `返嚟` composition is currently attestation-only.

The route can therefore advance from “no direct pattern-specific source” to a narrow source-supported research disposition, but not to runtime implementation, status promotion, or identity reuse without separate adjudication and specification.
