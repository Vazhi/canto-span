# Lane 10 stative predication source map (CP021B-R8)

Date: 2026-07-18  
Scope: claim-first research mapping only; **no parser behavior, fixtures, manifest, or held-out data changed**.

## Family selected

After ranking the remaining 130 unmapped language labels by runtime and accepted-fixture impact, the highest-impact coherent family was stative/property predication. `StativePredicate` has 68 exact runtime references and 284 accepted-fixture references in the project screen. The batch maps its direct structural subtypes rather than expanding into all scalar, comparative, or transitive constructions:

- `StativePredicate`
- `DegreeStativePredicate`
- `NegatedStativePredicate`
- `DegreeModifiedLexicalStative`
- `NegatedLexicalizedStative`
- `AdjectivalPredicateClause`

`SubjectPredicateClause` remains an internal representation label and is not promoted as an external Cantonese construction claim.

## Runtime claim extraction

### Broad stative classification

`isStativePredicateByBundle` accepts lexicalized statives, negative lexicalized statives, ordinary statives, and any V bundle whose construction affordance says `can_head_comment=true` (`main.js` 4191-4199). `isStativeToken` then trusts that bundle decision or falls back to the token label/syntax (`main.js` 5731-5735).

### Registry templates

The category registry distinguishes:

- one-token negative-meaning lexicalized predicates such as `難食`;
- compositional `唔 + 好食`;
- degree + lexicalized stative, illustrated as `好 + 好食`;
- degree + optional second degree + ordinary stative;
- generic negator + ordinary stative (`main.js` 2620-2647).

### Active wrapper

The active wrapper emits the same `StativePredicate` construction type for:

1. a one-token stative/property predicate;
2. `好/太/幾/有啲 + stative`; and
3. `唔 + stative` (`main.js` 15222-15248).

Thus the runtime umbrella currently conflates bare, degree-marked, and negated structures while the registry contains more specialized labels.

### Clause boundary

`subjectStativePredicateClauseFallback` builds a broad `SubjectPredicateClause` from subject + stative predicate and explicitly keeps topic-comment evaluations and bare `唔好食` ambiguity separate (`main.js` 9038-9061). `AdjectivalPredicateClause` remains an unsupported dormant language label rather than an active distinct parser family.

### `唔好食` ambiguity

The tokenizer and wrapper preserve two candidate analyses for bare `唔好食`: `唔 + 好食` “not tasty” and `唔好 + 食` “do not eat” (`main.js` 6834-6892, 14637-14643).

## Source-derived boundaries

### Property predicates and copula absence

Alderete et al. describe predicative adjectives as verb-like and copula-less; they also describe stative verbs as sharing adjective-like and verb-like properties. Francis and Matthews caution that the overlapping distributions are not captured by a simple adjective versus adjectival-verb category division. The parser may recognize overt property predication, but a single broad stative bundle must not be presented as one externally proven Cantonese category.

### Degree marking

Lam, Lau, and Lee treat degree markers such as `好`, `幾`, and `非常` as separate words before adjectives. Alderete et al. describe degree marking as required in neutral predicative-adjective profiles. These sources support overt degree + predicate structure, not hidden degree material, arbitrary double-degree stacking, or the complete runtime list (`太` and `有啲` remain outside exact R8 mapping).

### Ordinary negation

Yip directly documents `唔` before adjective/stative predicates and gives a copula-less “not beautiful” example. This supports a narrow `唔 + property predicate` subtype. It does not justify the registry’s generic `negator!` slot for `冇`, `未`, `咪`, or other negative forms.

### Lexicalized property units

Lam, Lau, and Lee analyze `好食` “delicious” and `難食` “unpalatable” as opaque lexical units in the relevant readings. `難食` is therefore not ordinary syntactic negation, while `唔 + 好食` is compositional negation of a lexical property predicate. The current `NegatedLexicalizedStative` label improperly combines those two structures.

### Prohibitive overlap

Chin distinguishes prohibitive `唔好` and `咪` from ordinary negator `唔`. This independently supports keeping `唔好 + 食` separate from `唔 + 好食`. The exact context-selection algorithm remains an internal parser decision.

## Construction dispositions

### `StativePredicate`

**Disposition: `SOURCE_LINKED_SPLIT_REQUIRED`**

The source-linked language domain is real, but the current node combines bare predicates, degree-marked predicates, negated predicates, lexical units, fragments, and clause-level use. Split these claims before any implementation or promotion.

### `DegreeStativePredicate`

**Disposition: `SOURCE_LINKED_NARROWING_REQUIRED`**

Overt degree + property predicate is supported. The optional second generic degree slot and full runtime modifier inventory are not. Preserve overt modifiers and map stacking and individual modifier classes separately.

### `NegatedStativePredicate`

**Disposition: `SOURCE_LINKED_NEGATOR_NARROWING_REQUIRED`**

The sourced construction is narrow `唔 + independently licensed property predicate`, without a hidden copula. Other negator types require separate research.

### `DegreeModifiedLexicalStative`

**Disposition: `LEXICAL_UNIT_SUPPORTED_EXACT_COMBINATION_GAP`**

Lexical `好食` and degree modification are independently supported, but the exact runtime example `好 + 好食` and a productive class of degree-modified lexicalized `好X` predicates were not directly established. This is a source gap, not a naturalness rejection.

### `NegatedLexicalizedStative`

**Disposition: `SOURCE_LINKED_SPLIT_AND_LABEL_RETIRE_REQUIRED`**

Split and retire the homogeneous language claim: lexical `難食`, compositional `唔 + 好食`, and prohibitive `唔好 + 食` are distinct. Preserve the bare `唔好食` ambiguity unless context resolves it.

### `AdjectivalPredicateClause`

**Disposition: `LANGUAGE_FORM_SUPPORTED_DORMANT_LABEL_MERGE_OR_RETIRE`**

Copula-less subject + property predicate clauses are supported, but the separate dormant label duplicates the active theory-neutral `SubjectPredicateClause` stative subtype and makes a disputed category choice. Merge or retire it rather than activate it as a broad template.

## Open evidence gaps

1. Exact distribution of `太`, `有啲`, and other runtime degree markers.
2. Legitimate degree stacking and the exact `好 + 好食` construction.
3. Corpus and native-speaker boundaries for bare versus degree-marked positive property predicates.
4. Lexical inventory and context diagnostics for opaque versus compositional `好/難 + V` forms.
5. Construction-specific treatment of non-`唔` negators with property predicates.
6. Multi-speaker naturalness and native structural-analysis validation. Independent human-expert and native structural-analysis counts remain zero.

## Sources used

- Alderete, Chan, Chan, Fan, and Nickel 2017, *Cantonese Grammar Synopsis*.
- Francis and Matthews 2005, “A multi-dimensional approach to the category verb in Cantonese” (official abstract and metadata only).
- Lam, Lau, and Lee 2024, “Multi-Tiered Cantonese Word Segmentation.”
- Yip 1988, “Negation in Cantonese as a Lexical Rule.”
- Chin 2018, “唔好客氣 vs. 咪走寶” (official abstract and metadata only).

## Authorization status

This map changes research provenance and future dispositions only. It does not authorize parser implementation, fixture alteration, held-out opening, native-analysis claims, or `supported_productive` promotion.
