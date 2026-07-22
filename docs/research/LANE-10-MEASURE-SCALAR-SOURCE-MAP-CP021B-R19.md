# Lane 10 measure, quantity, approximation, and scalar-question source map (CP021B-R19)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixture, manifest, accepted version, or held-out file changed**.

## Family selected

R19 ranked the 70 remaining unmapped language labels by accepted-fixture and runtime impact. Broad `ProductiveVO` and `TransitiveVP` were rejected again as implementation umbrellas. The highest coherent family was the measure–scalar cluster:

- `NominalPredicateClause`
- `QuantityNP`
- `ApproximateQuantity`
- `ScalarRangeFragment`
- `ScalarValueQuestion`

`NominalPredicateClause` has 12 accepted top-level fixtures. `QuantityNP` has two top-level accepted cases and one nested case. `ApproximateQuantity` appears in three accepted trees. The two scalar labels are unexercised but share the same price/scalar runtime layer.

## Runtime claims and source-derived boundaries

### 1. NominalPredicateClause is four hand-bounded profiles, not one source-established productive class

The runtime separately licenses age, price, area, and length. Exact Cantonese age predicates with an overt subject and numeric `歲` phrase are attested, and same-topic discourse also permits an understood subject. Bare currency amounts are independently attested as transactional utterances. A corpus example uses overt `係` before a price amount, so price predication cannot be represented as categorically copula-less.

No inspected source directly establishes the exact runtime declaratives `本書三十蚊`, `間房三百呎`, or `張枱三尺長` under one construction. Related amount, question, and comparison evidence supports their visible components, not the exact wrapper.

### 2. QuantityNP has one supported visible-head profile and two misaligned amount cases

`好多嘢` is a transparent quantity expression plus an overt nominal head. Classifier research independently distinguishes numeral-classifier-noun, classifier-noun, bare-noun, and ellipsis structures. The accepted bare `三十蚊` amount is therefore not evidence for the declared quantity+head-noun schema, and `佢三蚊` has no source-grounded relation under this label.

### 3. ApproximateQuantity conflates marker position, scope, and unrelated fallbacks

Cantonese has preposed approximators such as `大約/差唔多` and postposed approximators such as `咁上下/左右`; exact `三日左右` is attested. The runtime, however, also declares productive post-classifier `度` in `七杯度`, wraps price-noun-plus-approximation material, and has a whole-core `左右` fallback.

No authoritative exact source for approximation `度` in `七杯度` was recovered. This is a direct evidence gap, not a judgment of impossibility.

### 4. ScalarRangeFragment is a dormant lexical `價位` wrapper

The runtime labels any core containing `價位` as `ScalarRangeFragment`. It has no accepted fixture family, and no inspected source establishes modifier+`價位`+particle as a productive standalone fragment. The lexical noun can remain ordinary nominal material unless future discourse evidence establishes a separate fragment relation.

### 5. ScalarValueQuestion combines two independently supported but structurally different families

Exact `幾錢呀` is corpus-attested. `幾多錢` and `幾多歲` are also documented, while question-use `幾` combines compositionally with scalar predicates/adverbs such as `幾長` and `幾耐`. These are not one surface template. The runtime further adds unsourced optional quantity, person-NP, and approximation slots around `幾錢`, and uses written question punctuation as an activation cue for the dimensional path.

## Dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `NominalPredicateClause` | `AGE_MEASURE_PROFILE_SOURCE_LINKED_PRICE_AREA_LENGTH_SPLIT_AND_EXACT_TEMPLATE_GAPS` | Retain the age profile narrowly; split price, area, and length and preserve their exact-template gaps. |
| `QuantityNP` | `VISIBLE_HEAD_QUANTITY_NP_LINKED_BARE_AMOUNT_REALIGNMENT_REQUIRED` | Restrict to transparent quantity+visible-head NP material; realign bare currency/measure amounts. |
| `ApproximateQuantity` | `APPROXIMATION_MARKER_AND_POSITION_SPLIT_WITH_POSTCLASSIFIER_DOU6_SOURCE_GAP` | Split by overt marker, position, and scope; quarantine the `度` profile. |
| `ScalarRangeFragment` | `LEXICAL_PRICE_RANGE_WRAPPER_UNEXERCISED_MERGE_OR_RETIRE` | Merge lexical `價位` handling into ordinary nominal/scalar material or retire the dormant wrapper. |
| `ScalarValueQuestion` | `PRICE_AMOUNT_AND_SCALAR_DIMENSION_QUESTION_SPLIT_REQUIRED` | Split lexical price-amount questions from compositional `幾`+dimension questions. |

## v0.5.209 retirement follow-up

`ScalarRangeFragment` was retired after a current runtime review confirmed that
its only standardized case was the zero-weight `中等價位。` implementation
probe. Removing the `價位`-triggered wrapper preserves ordinary nominal
analyses and does not resolve the separate discourse question of when a nominal
expression functions as a fragment.

## Forbidden inferences

R19 does not authorize:

- general NP–NP copula omission;
- treating age, price, area, and length as one freely productive predicate class;
- treating bare currency amounts as ordinary quantity+noun NPs;
- deriving any relation for `佢三蚊` from adjacency;
- transferring the order or productivity of `左右` to `度`;
- treating `七杯度` as sourced because it is accepted by the parser tests;
- treating every occurrence of `價位` as a complete fragment;
- treating `幾錢`, `幾多錢`, `幾多歲`, and `幾`+scalar predicate as one unanalyzed question form;
- treating written question punctuation as Cantonese grammatical licensing;
- inserting hidden nouns, copulas, subjects, scalar values, or discourse relations;
- changing parser behavior during the research freeze.

## Open evidence gaps

- direct modern corpus or experimental evidence for subject+bare-price declaratives;
- direct evidence for copula-less area and length measure predicates;
- exact analysis and regional/register status of `七杯度`;
- direct evidence for any productive approximation use of post-classifier `度`;
- discourse evidence for standalone `價位` fragments;
- the optional per-person and approximation material around runtime `幾錢` templates;
- theory-neutral representation of measure phrases that avoids both hidden nouns and category collapse.

## Held-out state

No held-out file or row was opened in R19. The R18 accidental display of three pre-existing locative rows remains part of inherited project history; those rows were not used in R19 selection, research, claims, or audit.

## Freeze result

This batch changes research provenance only. Runtime code, grammar templates, roles, glosses, fixtures, tests, manifest data, accepted behavior, and held-out files remain byte-identical to R18.
