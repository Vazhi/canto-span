# Lane 09 serial-verb and purpose-sequencing source map (CP021B-R16)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixtures, manifest, accepted version, or held-out data changed**.

## Family selected

After ranking the 81 remaining unmapped language labels, broad `ProductiveVO` and `TransitiveVP` were again rejected as incoherent research units. This checkpoint maps three tightly related labels:

- `SerialVerbPurposeChain`
- `PurposePredicate`
- `ProgressivePurposeClause`

The already mapped `MotionPurposeChain` remains a separate inherited subtype. `IntentionFrame`, `TimeToActionFrame`, ordinary coordination, complement clauses, and general transitivity remain outside this batch.

## Runtime claim extraction

### SerialVerbPurposeChain

The runtime currently emits one label from at least four profiles:

1. directional motion + ProductiveVO + optional bare purpose verb;
2. ProductiveVO + bare purpose verb;
3. action/object + overt `嚟/去` + bare purpose verb;
4. subject + motion-to-goal + two later transitive VPs.

Its broad category templates require neither an overt purpose linker nor a semantic/prosodic compatibility test. Accepted surfaces include `落嚟摘芒果食`, `我去街市買餸煮飯`, and the exact-linker family corresponding to `攞啲糖嚟/去食`.

### PurposePredicate

`PurposePredicate` has the same visible `action_verb + object` structure as ordinary `ProductiveVO` or `TransitiveVP`. It is created only as a bounded child of `ProgressivePurposeClause`; no independent surface marker establishes purpose.

### ProgressivePurposeClause

The runtime requires exactly subject + `喺度` + progressive transitive predicate + transitive purpose predicate, with no overt purposive linker. Its note is domain-specific: “subject + 喺度 + 整緊 object + 做 meal.” The label has no accepted fixture family.

## Source-derived boundaries

### 1. Serial-verb status requires constructional unity, not adjacency

Matthews defines Cantonese serial-verb constructions through single-clause/single-predicate behavior while distinguishing complementation, coordination, compounds, and independent clauses. Some surface sequences remain analytically indeterminate. Shared subject and adjacency are therefore insufficient.

### 2. Overt purposive `嚟/去` is attested

Matthews documents optional `嚟/去` between verbs to express purpose. Chor directly attests `佢攞咗啲糖嚟/去食`, which closely matches the runtime’s exact-linker fallback.

### 3. `嚟` and `去` are not a symmetric free-choice slot

Chor documents contexts where only purposive `嚟` is licensed and concludes that its purposive distribution is broader. In `我嚟學校嚟減壓`, the second `嚟` is analyzed as a pure purpose linker without a hidden locative object.

### 4. Complex chains are possible but constrained

Matthews gives directional-purpose and longer multiverb examples, while explicitly conditioning productive combination on semantic and pragmatic well-formedness. This supports bounded composition, not arbitrary recursive VP adjacency.

### 5. Progressive or durative marking may occur in the first event

Lam and Bodomo analyze a progressive first VP followed by `嚟` and a purpose VP. Chor gives a `住`-marked first event followed by purposive `去`. These attest composition of aspect and purpose linking, but not the runtime’s exact unlinked `喺度 + V緊O + VO` template.

### 6. Purpose is a relation, not an intrinsic property of `V + O`

The external sources locate purpose in the relation among events and/or the overt linker. The same VP-shaped material can occur in other multiverb, complement, or clause structures. A standalone `PurposePredicate` language category is therefore not justified by its form.

## Parser-label dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `SerialVerbPurposeChain` | `SOURCE_LINKED_SPLIT_AND_PURPOSE_LINKER_NARROWING_REQUIRED` | Split overt `嚟/去` purpose-linking, inherited motion-purpose, unmarked serial sequencing, and longer-chain profiles. Require semantic/contextual licensing; preserve linker identity and do not auto-share objects. |
| `PurposePredicate` | `INTERNAL_RELATIONAL_CHILD_MERGE_OR_RETIRE_REQUIRED` | Merge into an ordinary VP plus a parent purpose relation, or retain only as a parser-internal child. `V+O` alone is not a purpose construction. |
| `ProgressivePurposeClause` | `COMPONENTS_SOURCE_LINKED_EXACT_TEMPLATE_GAP_AND_COMPOSITION_REALIGNMENT_REQUIRED` | Related component constructions are supported, but the exact unlinked seven-slot template remains a source gap. Replace it eventually with ordinary progressive/aspect structure plus a separately licensed purpose relation. |

## Forbidden inferences

R16 does not authorize:

- treating adjacent VPs as a purpose chain;
- treating every shared-subject multiverb sequence as an SVC;
- treating `嚟` and `去` as freely interchangeable purpose markers;
- deleting or hiding an overt purpose linker;
- inserting a hidden goal after purposive `嚟` or `去`;
- copying an earlier NP into a later bare transitive verb;
- assuming that `食` after an NP is always a purpose verb;
- interpreting every motion + action sequence as purpose rather than event sequence or complement structure;
- treating `PurposePredicate` as an independently sourced Cantonese construction;
- licensing the exact `喺度 + V緊O + VO` wrapper from related progressive-purpose examples;
- translating an uncertain inter-event relation as “to” or “in order to”;
- changing parser behavior during the research freeze.

## Sources added or extended

- Matthews 2006: existing record extended to the productivity, purpose-linker, directional-purpose, and multiverb-chain sections.
- Chor 2018: existing record extended to the purposive `嚟/去` chapter section and exact examples.
- Lam and Bodomo 2003: new official ACL Anthology record for the progressive first-event purpose sequence and constrained VP ordering.
- Internal R16 runtime screen: records current templates and representation risks; it is not linguistic authority.

## Open evidence gaps

- direct modern corpus analysis of unmarked `ProductiveVO + 食` purpose sequences;
- prosodic and discourse diagnostics separating purpose, event sequence, and coordination;
- lexeme-specific licensing for bare final purpose verbs;
- object sharing versus discourse-licensed null objects in long chains;
- regional and register variation in purposive `嚟` and `去`;
- the exact `我去街市買餸煮飯` structural analysis;
- the exact runtime `subject + 喺度 + V緊O + VO` profile;
- a theory-neutral representation of nested serial, motion, and purpose relations.

## Freeze result

This batch changes research provenance only. No parser node, role, gloss, heuristic, fixture, test expectation, manifest field, or held-out item was changed or opened.
