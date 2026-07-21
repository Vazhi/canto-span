# Temporal expressions source map (CP021B-R12)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixtures, manifest, accepted version, or held-out data changed**.

## Family selected

After ranking the 103 remaining unmapped language labels, broad residual abstractions such as `ProductiveVO` and `TransitiveVP` were rejected as incoherent research batches. The next bounded high-impact family is temporal nominal and clausal structure:

- `TimeNP`
- `QuantifiedTimeNP`
- `TemporalClause`
- `TemporalAdverbialClause`

`TimeToActionFrame`, aspectual duration, frequency complements, and temporal discourse particles were excluded because they require separate construction-specific evidence.

## Runtime claim extraction

### `TimeNP`

The active template is `temporal_modifier + classifier? + time_head`, illustrated by `下個星期五`. It treats one generic classifier slot as optional across heterogeneous time heads and exposes a uniform `when` interpretation.

### `QuantifiedTimeNP`

Two templates share the label:

1. `quantity + classifier? + time_head + particle?`;
2. `distributive_quantifier + quantity? + classifier? + time_head + particle?`.

The runtime also has a special conventional-duration path for expressions such as `三個字`, interpreted as fifteen minutes, and marks standalone quantified time phrases as context-required.

### `TemporalClause`

Active paths include:

- time expression + optional subject + predicate;
- time expression + locative phrase + predicate;
- time-framed environmental clauses;
- a generic fallback that wraps a core whenever its first token already carries the semantic role `when`.

These are representation heuristics, not one externally documented temporal-clause construction.

### `TemporalAdverbialClause`

The label is present in the inventory but has no active source-mapped template. Its apparent intended scope overlaps the broad active `TemporalClause` node.

## Source-derived boundaries

### 1. Time-word category and temporal function must be separated

Wong distinguishes Cantonese time words from lexical adverbs: time words are nouns that may function as subjects, modifiers, objects, or adverbials. Yip and Matthews show temporal expressions before the predicate and also before the subject as clause frames.

Parser consequence: preserve the overt nominal expression and assign its clause role from the containing construction. Adverbial use does not make every time word an adverb or a subordinate clause.

### 2. Classifier realization is head-specific

Tang gives classifier-bearing forms such as `上個星期` and `下個月` but classifierless `上年` and `下年`. Duration expressions likewise contrast forms such as `一個月` with `一年`. Yip and Matthews distinguish `每個月` and `每個星期` from classifierless `每日` and `每年`.

Parser consequence: the generic optional-classifier slot in `TimeNP` and `QuantifiedTimeNP` is too broad. Exact lexical or head-specific compatibility is required.

### 3. Quantified duration, distributive time, and conventional `個字` measures are not one subtype

Numeral duration expressions and `每`-based distributive/frequency expressions have different internal patterns. Tang also documents the conventional time measure `個字`, where one unit equals five minutes.

Parser consequence: split duration, distributive/frequency, and conventional clock-duration profiles. A derived minute value may be stored semantically, but no unspoken `分鐘` token may be inserted and a literal character-count interpretation must remain possible when context is unresolved.

### 4. Simple temporal framing is not a temporal subordinate clause

Ordinary time expressions can appear before a predicate or subject without an overt subordinator. Yip’s temporal adverbial clauses instead contain an embedded predication and overt temporal-clause structure.

Parser consequence: split a main clause with a temporal adjunct/frame from a genuine `TemporalAdverbialClause`. A first-token `when` role is not a constructional diagnostic.

### 5. Cantonese has at least two overt temporal-adverbial-clause types

Yip distinguishes:

- `喺 … 嗰陣(時)/時候` temporal clauses, where the time head is required;
- `當 … (嗰陣)` temporal clauses, where the time head may be omitted.

The paper proposes different operator and attachment structures, but those theoretical mechanisms need not become parser ontology.

Parser consequence: the dormant `TemporalAdverbialClause` label should be redefined and split around overt subtype evidence, not activated as a synonym for any time-initial clause.

## Parser-label dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `TimeNP` | `SOURCE_LINKED_SPLIT_AND_HEAD_SPECIFIC_CLASSIFIER_REQUIRED` | Preserve time-word nominals, but split lexical/deictic profiles and enforce head-specific classifier behavior; keep NP form separate from clause role. |
| `QuantifiedTimeNP` | `SOURCE_LINKED_SPLIT_AND_HEAD_SPECIFIC_MEASURE_REQUIRED` | Split duration, distributive/frequency, conventional `個字`, and fragment profiles; no generic optional classifier or particle rule. |
| `TemporalClause` | `SOURCE_LINKED_SPLIT_AND_REPRESENTATION_REALIGNMENT_REQUIRED` | Separate simple temporal framing from subordinate temporal clauses; the role-driven generic fallback is not evidence-backed. |
| `TemporalAdverbialClause` | `SOURCE_LINKED_DORMANT_REDEFINE_AND_SPLIT_REQUIRED` | Redefine the dormant label for explicit `喺`- and `當`-TAC subtypes while keeping theoretical null operators out of learner output. |

## Forbidden inferences

R12 does not authorize:

- a free `temporal_modifier + optional classifier + time_head` grammar rule;
- optional `個` with every temporal head;
- one shared construction for numeral duration and `每`-distribution;
- a generic particle slot inside quantified time NPs;
- mandatory context-required status for every standalone time expression;
- rewriting `三個字` as hidden `十五分鐘` tokens;
- classifying every time-initial sentence as a temporal subordinate clause;
- using a parser-assigned `when` role as evidence for `TemporalClause`;
- a hidden temporal operator, hidden time head, or movement representation;
- changing parser behavior during the research freeze.

## Sources added or extended

- Wong 2002, *The Morphology, Syntax, and Semantics of Adverbs in Cantonese*: category/function distinction for time words.
- Yip and Matthews 2000, *Basic Cantonese*: temporal position, distributive time forms, and head-specific `每` patterns; existing record extended with exact locators.
- Tang 2024, *Guide to Cantonese Grammar*: exact deictic, calendar, duration, and conventional `個字` forms; used as attestation only because it is a learner guide rather than peer-reviewed research.
- Yip 2024, *Two Types of Temporal Adverbial Clauses in Cantonese*: explicit `喺`- and `當`-TAC construction types and their time-head contrast.

## Open evidence gaps

- a research-grade comprehensive inventory of Cantonese temporal heads and classifier selection;
- corpus frequencies and dialect/speaker variation for classifier-bearing calendar expressions;
- exact licensing of post-TimeNP particles in runtime templates;
- whether all runtime standalone-fragment annotations are discourse-appropriate;
- the exact status of time + locative + purpose sequences;
- temporal duration and frequency complements outside nominal time expressions;
- learner-facing diagnostics separating ordinary temporal framing from embedded temporal clauses.

## Freeze result

This batch changes research provenance only. No node, role, gloss, parser heuristic, fixture, test expectation, manifest field, or held-out item was changed or opened.
