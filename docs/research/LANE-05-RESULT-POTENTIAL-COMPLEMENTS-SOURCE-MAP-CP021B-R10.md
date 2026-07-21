# Lane 05 result and potential complement source map (CP021B-R10)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixtures, manifest, accepted version, or held-out data changed**.

## Family selected

After ranking the 116 remaining unmapped language labels, the next coherent high-impact family was Lane 05 result and potential complementation. The batch maps seven directly connected labels:

- `ResultComplement`
- `ResultComplementVP`
- `PotentialResultVP`
- `NegativePotentialComplement`
- `PotentialDirectionalVP`
- `NegativePotentialDirectionalVP`
- `VerbComplementVP`

`DelimitedVP` was excluded after runtime inspection because it represents delimitative `V + 吓`, not a result or potential complement. General transitivity and productive-VO umbrellas remain separate research targets.

## Runtime claim extraction

### `ResultComplement`

The registry and legacy fallback recognize a verb-like predicate followed by `到`, with an optional object, as `ResultComplement` (`main.js` around 1937-1948 and 15179-15194). A separate active path creates `ResultComplementVP` when a nonspatial action precedes `到` and an overt object (`main.js` around 13860-13876).

This makes a broad runtime claim: postverbal `到` plus almost any compatible continuation is one result-complement construction. Other accepted paths already distinguish main arrival verb `到` and spatial goal attainment, so the same overt form is not structurally uniform.

### `ResultComplementVP`

Registry templates combine:

- action verb + `好` + `咗` + object;
- action verb + `好` + object;
- nonspatial action + `到` + object.

The node therefore merges lexical/result-state V2 material, outer perfective composition, and `V-到` result structures.

### Positive and negative potential result forms

`PotentialResultVP` is built from an action verb, overt `得`, and overt result/completion material. Runtime result heads include `完`, `到`, `掂`, and `切`, with an optional object after the result (`main.js` around 7940-8010).

`NegativePotentialComplement` recognizes action verb + `唔` + `到/完` + optional object. The runtime correctly preserves overt `唔`, but its generic result-head and object licensing remain broader than the mapped evidence.

### Directional potential forms

The directional-composition fallback recognizes:

- verb + `得` + direction + deictic element → `PotentialDirectionalVP`;
- verb + `唔` + direction + deictic element → `NegativePotentialDirectionalVP`.

The current inventory emphasizes `入/出/返` followed by `嚟/去` (`main.js` around 13590-13615).

### `VerbComplementVP`

The registry and active fallbacks place several unrelated profiles under one node:

- postverbal degree or manner material, such as `講大聲啲` and `行快啲`;
- a verb followed by a directional-motion expression;
- a verb plus `返` and an object;
- caused-motion sequences with an overt theme and a directional predicate;
- restorative or repetitive readings of `返`.

The label is consequently an implementation umbrella, not one independently demonstrated Cantonese construction.

## Source-derived boundaries

### 1. Cantonese lexical result compounds are constrained

Lau and Lee document Cantonese resultative verb compounds, but explicitly contrast their restricted distribution with the greater productivity of Mandarin RVCs. Argument event roles, order, and structural configuration constrain which lexical result compounds are available. A parser must not infer a free `V + result verb` rule from the existence of individual compounds.

### 2. `V-到` result clauses are not identical to lexical RVCs

Lau and Lee distinguish lexical RVCs from `V-dou3` result constructions. Their examples and comparison show that `V-到` can introduce a phrasal result predicate and can occur in verb-copying and causative alternatives where a lexical RVC is unavailable. Main arrival `到`, spatial goal attainment, and resultative `V-到` must therefore remain separate parser profiles.

### 3. Positive potential is `V-得-R`, with overt result material

Cheng and Sybesma distinguish postverbal `得` with a permission/ability reading from lower potential `得` associated with an attained result. Examples include `攞得起` and `行得入去`. The result-denoting continuation is structurally and semantically material; the parser must not silently insert it or classify every bare `V得` as potential.

### 4. Negative potential is `V-唔-R`, not ordinary VP negation

For the potential reading, Cheng and Sybesma report that the negative counterpart replaces `得` with `唔`, yielding forms such as `攞唔起` and `行唔入去`. They contrast this with permission/ability negation, where `唔` precedes a `V-得` predicate. Thus `V-唔-R` is not licensed by a generic preverbal-negation rule and does not contain a hidden `得`.

### 5. Postverbal descriptive `得` is a separate construction

The same study explicitly notes a distinct descriptive use, illustrated by `行得好快`. That construction is not the same as positive potential `V-得-R`. Degree/manner, result, directional, and restorative complements cannot be collapsed under `VerbComplementVP` merely because all follow a verb.

## Parser-label dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `ResultComplement` | `SOURCE_LINKED_SPLIT_REQUIRED` | Preserve overt `到`, but split lexical RVC, phrasal `V-到` result, main arrival, and spatial attainment; retire the generic verb-plus-`到` fallback as a language generalization. |
| `ResultComplementVP` | `SOURCE_LINKED_SPLIT_REQUIRED` | Split `V+好` lexical/result material, `V-到` phrasal result, and outer-perfective composition; do not treat arbitrary action + `好/到` + object as one productive node. |
| `PotentialResultVP` | `SOURCE_LINKED_NARROWING_REQUIRED` | Keep overt `V-得-R` only where independently licensed result material is present; the runtime inventory `完/到/掂/切` remains partly unmapped. |
| `NegativePotentialComplement` | `SOURCE_LINKED_SPLIT_AND_NARROWING_REQUIRED` | Keep overt `V-唔-R`; split result heads and distinguish potential morphology from ordinary negation. Never insert hidden `得`. |
| `PotentialDirectionalVP` | `SOURCE_LINKED_NARROWING_REQUIRED` | Directional `V-得-R` is attested; constrain lexical and directional inventories rather than assuming free composition. |
| `NegativePotentialDirectionalVP` | `SOURCE_LINKED_NARROWING_REQUIRED` | Directional `V-唔-R` is attested; preserve its polarity morphology and constrain the same inventories. |
| `VerbComplementVP` | `SOURCE_LINKED_UMBRELLA_SPLIT_REQUIRED` | Treat as an internal grouping only until degree/manner, directional, result, restorative, and caused-motion subtypes are separately represented. |

## Forbidden inferences

R10 does not authorize:

- free productivity for Cantonese lexical result compounds;
- treating every postverbal `到` as a result complement;
- treating main arrival `到`, goal attainment, and `V-到` result clauses as one construction;
- interpreting every bare `V得` as positive potential;
- inserting an unspoken result head after `得` or `唔`;
- inserting hidden `得` into overt `V-唔-R`;
- treating potential `V-唔-R` as ordinary preverbal VP negation;
- treating all directional verbs, result heads, or action verbs as freely combinable;
- treating postverbal descriptive `得` as potential;
- changing parser behavior during the research freeze.

## Sources added

- Lau and Lee 2021, *On Resultative Verb Compounds in Cantonese and Mandarin*: constrained Cantonese RVCs; structurally distinct `V-到`, verb-copying `V-到`, and causative alternatives.
- Cheng and Sybesma 2004, *Postverbal “can” in Cantonese (and Hakka) and Agree*: permission/ability versus potential `得`; positive `V-得-R`; negative `V-唔-R`; directional examples; separate descriptive `V-得-degree` use.

Existing Chor 2018, Shan and Jin 2025, and Sio and Bond 2025 records supply independent boundaries for arrival/direction, motion-result distinctions, and inner-result versus outer-aspect ordering.

## Open evidence gaps

1. Construction-level evidence for each runtime positive result head: `完`, `到`, `掂`, and `切`.
2. Construction-level evidence for unrestricted `V+好(+咗)+object` rather than lexical or selectionally constrained combinations.
3. Corpus-based lexical and directional restrictions on `V-得/唔-direction-deixis` strings.
4. Exact analysis of object placement across potential result constructions.
5. Separate mapping of postverbal degree/manner complements, restorative/repetitive `返`, and caused-motion frames.
6. Multi-speaker naturalness and native structural-analysis validation; current structural-validation counts remain zero.

## Authorization status

This map changes research provenance and future dispositions only. It does not authorize parser implementation, fixture alteration, held-out opening, native-analysis claims, or `supported_productive` promotion.
