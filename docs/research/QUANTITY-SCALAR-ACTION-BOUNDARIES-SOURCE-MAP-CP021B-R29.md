# Quantity, scalar, comparative, and action-complement boundaries (CP021B-R29)

Date: 2026-07-19  
Scope: claim-level research mapping only; **no parser behavior, fixture, manifest, accepted version, or held-out file changed or opened**.

## Family selected

After verifying R28, the 25 remaining unmapped language labels were ranked by runtime and non-held-out accepted-fixture reach. `ProductiveVO` and `TransitiveVP` remain implementation umbrellas rather than coherent research units. R29 maps the actual child phenomena hidden by the high-impact `ActionStativeVP` label:

- `ActionStativeVP`
- `QuantifiedPersonNP`
- `ComparativeStative`
- `ScalarEvaluation`
- `EvaluationWithDouSyun`

The common issue is whether visible quantity, duration, degree, comparison, and evaluation material forms a sourced constituent or has been grouped by broad lexical tags and domain metadata.

## Source-derived boundaries

### 1. `ActionStativeVP` is not supported as one construction

The runtime template is `action_verb + stative_predicate`, but its accepted cases expose two different errors:

- `寫三個字` contains a child `寫三`, cutting the numeral away from its classifier and noun;
- `要等幾耐啊` groups `等幾耐`, although `幾耐` is an overt duration question expression.

Published classifier analyses independently treat numeral/classifier/noun material as nominal composition. The uploaded coursebook directly gives `你等咗幾耐呀` and identifies `幾耐` with duration. The runtime label therefore has no remaining sourced action-plus-stative core.

### 2. `好多人` is sourced, but not as a special person-NP construction

The coursebook directly attests `架巴士好似有好多人噉` and many additional `好多人` examples. General classifier and nominal-expression research supplies the natural NP home. Personhood belongs to the overt head noun; subject, topic, or object status comes from the containing clause. A dedicated node with the whitelist `人/同事/學生` is not independently justified.

### 3. Property + `啲` is real but heterogeneous

The coursebook attests `貴係貴啲`. Lam gives a bare comparative with a property predicate followed by `(一)啲`, while explicitly distinguishing it from the `過` surpass comparative and analyzing `啲` as a measure phrase in that construction. This supports a bounded scalar-difference profile, not every `X啲` sequence. R23 already mapped property comparison, action adjustment, pre/postverbal order, and manner boundaries; the residual `ComparativeStative` fallback duplicates that path.

### 4. `唔算貴` is an attested lexical evaluation, not a generic price wrapper

The coursebook directly gives `對皮鞋唔算貴`. The surface contains lexical evaluative `算` plus a property predicate; price is supplied by the referent and `貴`, not by a hidden or mandatory `價錢/價位` constituent. The runtime’s second `ScalarEvaluation` profile (`價錢中等` / `中價`) has a different shape and remains a direct-source gap.

### 5. Exact `都算` price-wrapper evidence was not recovered

The inspected coursebook and research sources support scalar properties and the component `算`, but not the exact runtime construction `都 + 算 + price material`. The registry and fallback also disagree about whether `都` is optional and whether a price noun is mandatory. The best-supported disposition is merge into ordinary focus plus lexical evaluation, or retire unless exact evidence emerges.

## Dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `ActionStativeVP` | `MIXED_QUANTITY_SCALAR_COMPLEMENT_MISANALYSIS_MERGE_OR_RETIRE_REQUIRED` | Merge/retire the mixed wrapper; preserve ordinary predicate, quantified NP, and duration-question constituents. |
| `QuantifiedPersonNP` | `EXACT_HOU2DO1_JAN4_SOURCE_LINKED_ROLE_NEUTRAL_QUANTIFIED_NP_MERGE_AND_LEXICAL_LIST_NARROWING_REQUIRED` | Source-link exact `好多人`, but merge into role-neutral quantified NP structure and narrow the lexical whitelist. |
| `ComparativeStative` | `SOURCE_LINKED_DI1_SCALAR_COMPARATIVE_WITH_POSITIONAL_SPLIT_AND_DORMANT_DUPLICATE_MERGE_OR_RETIRE` | Preserve the sourced property+`啲` scalar profile while merging the dormant duplicate into the R23 degree/manner analysis. |
| `ScalarEvaluation` | `SOURCE_LINKED_LEXICAL_SYUN3_EVALUATION_AND_SCALAR_PREDICATION_SPLIT_WITH_PRICE_TEMPLATE_GAPS` | Split lexical `唔算 + property` from scalar-value nominal predication; retain price as domain metadata. |
| `EvaluationWithDouSyun` | `COMPONENTS_PARTLY_LINKED_EXACT_DOU1_SYUN3_PRICE_WRAPPER_SOURCE_GAP_MERGE_OR_RETIRE` | Components are linked, but the exact wrapper remains unsourced; merge or retire pending direct evidence. |

## Forbidden inferences

R29 does not authorize:

- treating an accepted parser tree as external grammar evidence;
- separating a numeral from its overt classifier/noun because it carries a broad stative tag;
- treating `幾耐` as a property predicate after an action verb;
- creating a person-specific NP syntax from the semantic class of the head noun;
- treating every `X啲` sequence as comparative or assigning one meaning across positions;
- treating general scalar semantics as proof of `ScalarEvaluation` or `EvaluationWithDouSyun`;
- inserting an unspoken `價錢`, comparison standard, subject, or complement;
- treating failure to recover an exact source as a grammaticality rejection;
- changing parser behavior during the research freeze.

## Open evidence gaps

- direct corpus and speaker evidence for exact `價錢中等` and `中價` profiles;
- exact modern attestations and analysis of `都算 + price/property` sequences;
- lexical and discourse restrictions on `算 + property predicate` beyond `唔算貴`;
- complete position/scope comparison for property `X啲`, action-manner `X啲`, and directive `X啲`;
- a unified but theory-neutral representation of quantity, scalar questions, and property predication.

## Freeze result

This batch changes research provenance only. No parser node, token role, gloss, heuristic, fixture, test expectation, manifest field, accepted version, or held-out item was changed or opened.
