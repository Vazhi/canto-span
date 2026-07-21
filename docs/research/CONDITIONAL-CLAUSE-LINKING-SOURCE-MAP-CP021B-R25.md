# Conditional and completion-clause linking source map (CP021B-R25)

Date: 2026-07-19  
Scope: claim-level research mapping only; **no parser behavior, fixtures, manifest data, accepted version, or held-out file changed or opened**.

## Family selected

After ranking the 46 remaining unmapped language labels, broad `TransitiveVP` and `ProductiveVO` were again rejected as incoherent implementation umbrellas. `ComplementEllipsisFragment` has slightly higher raw accepted-fixture reach, but the coherent higher-impact research unit is the Lane 02 conditional family:

- `ConditionalClause`
- `ConditionResult`
- `CompletionThenClause`

These labels share antecedent/result or earlier/later clause linking, but the runtime currently collapses markers, predicate categories, subject structure, and the polyfunctionality of `就`.

## Runtime claim extraction

### `ConditionalClause`

The active fallback accepts exactly one predicate node followed by protected `嘅話`. It has explicit lexical shortcuts for `有`, `冇`, and `得`, then wraps isolated forms as context-required because `result_clause` is absent. Four accepted non-held-out snapshots contain the label: three standalone `有/冇/得嘅話` profiles and one `有嘅話` antecedent followed by an overt result.

### `ConditionResult`

The generative template is optional subject + action verb + `就` + stative predicate. A separate fallback fires for `就` with `平啲`, `話你知`, or `平均分`. No accepted regression snapshot exercises the label. The template therefore asserts a category restriction and shared wrapper that the sourced conditional examples do not support.

### `CompletionThenClause`

The generative template is optional subject + `CompletionVP` + `就` + generic VP. The fallback needs only a CompletionVP and a `就` somewhere in the same core span. No accepted snapshot exercises the label.

## Source-derived boundaries

### 1. Cantonese has more than one conditional-marking strategy

Cheng gives the exact full conditional `(如果)我去嘅話我哋會見`, showing that clause-initial `如果` can occur with clause-final `嘅話`. Iida independently describes a conditional use of bare `嘅` developed from nominalizing/topic structures. The uploaded Hong Kong Cantonese coursebook attests `唔啱心水嘅，就儘快去叩門`.

Parser consequence: split `如果`, `嘅話`, bare conditional `嘅`, and contextually inferred markerless relations. Marker identity is evidence, not interchangeable decoration.

### 2. Bare `嘅` and `嘅話` do not have the same documented distribution

Iida’s official abstract characterizes bare conditional `嘅` as less grammaticalized and more strongly constrained by generic or law-like interpretation. That is a boundary, not a license to classify every bare `嘅` as conditional.

### 3. Isolated antecedents remain discourse-dependent

Full research examples overtly contain or presuppose a consequent. The exact standalone runtime strings `有嘅話`, `冇嘅話`, and `得嘅話` were not directly recovered from the inspected external sources. Their current `NeedsContext` status is therefore retained; no hidden result is inserted.

### 4. `就` is not uniquely conditional

The Liang–Mai coding supplement lists `如果`, `就`, and `就算` under conditional conjunctions and gives `如果病咗，就要去睇醫生`. The same scheme also lists `就` among temporal adverbs. The coursebook adds markerless/contextual `聽日唔得，就後日先啦` and nonconditional sequence `佢講完我就話唔係噉`.

Parser consequence: the presence of `就` does not establish `ConditionResult`. Conditional, temporal, sequential, focus, and other uses require separate evidence.

### 5. Conditional consequents are not stative-only and subjects need not be shared

`如果病咗，就要去睇醫生` has a modal/action consequent, contradicting the runtime’s stative-result restriction. Cheng’s `我去嘅話我哋會見` changes subject from `我` to `我哋`. The relation links propositions, not one shared subject slot.

### 6. Completion-plus-`就` is a sequence relation, not automatically a conditional

The coursebook’s `佢講完我就話唔係噉` gives an exact completion→later-clause sequence with different overt subjects. Completion structure, `就`, and the later clause are independently visible. No dedicated one-subject `CompletionThenClause` category is established by the sources.

### 7. Tone-linked conditional readings are variation evidence only

Cheng reports a tendency for `話6` versus `話2` to favor indicative versus counterfactual readings in the author’s accent and some informants. The paper explicitly leaves broader differentiation unresolved. Preserve tone where observed; do not convert this into a categorical semantic rule.

## Dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `ConditionalClause` | `SOURCE_LINKED_CONDITIONAL_MARKER_SUBTYPE_SPLIT_AND_ANTECEDENT_RESULT_ATTACHMENT_REALIGNMENT_REQUIRED` | Split `如果`, `嘅話`, bare conditional `嘅`, postposed antecedents, and isolated context-dependent antecedents. Link an overt or unresolved result without inventing content. |
| `ConditionResult` | `SOURCE_LINKED_CONSEQUENT_ZAU6_WITH_CONDITIONAL_TEMPORAL_SEQUENCE_SPLIT_AND_WRAPPER_REALIGNMENT_REQUIRED` | Replace action+`就`+stative with a clause relation. Distinguish conditional consequent `就` from temporal/sequential and other uses; keep local subjects and predicate structure. |
| `CompletionThenClause` | `SOURCE_LINKED_COMPLETION_SEQUENCE_WITH_ZAU6_AND_CLAUSE_BOUNDARY_REALIGNMENT_REQUIRED` | Realign to ordinary completion structure plus a `就`-marked sequence relation. Preserve both clauses and do not infer conditionality or subject sharing. |

## Forbidden inferences

R25 does not authorize:

- treating every `嘅` or `嘅話` sequence as the same conditional subtype;
- deleting overt `如果`, `嘅`, `嘅話`, or `就`;
- inserting an unspoken consequent for isolated antecedents;
- treating the exact accepted `有/冇/得嘅話` profiles as externally validated from fixture success;
- classifying every `就` sequence as conditional;
- requiring a stative consequent;
- requiring antecedent and consequent to share a subject;
- equating completion→then sequencing with hypothetical condition;
- enforcing a universal indicative/counterfactual distinction from `話6/話2`;
- importing Iida’s grammaticalization account or Cheng’s split-TP analysis as parser ontology;
- using code, fixtures, translations, or pedagogical examples as evidence of unrestricted productivity;
- changing parser behavior during the research freeze.

## Open evidence gaps

- direct modern discourse/corpus examples of standalone `有嘅話`, `冇嘅話`, and `得嘅話`;
- prosodic and discourse diagnostics for result-less conditional antecedents;
- broader speaker evidence for `話6` versus `話2` conditional readings;
- a theory-neutral inventory of markerless conditional relations;
- diagnostics distinguishing conditional, temporal, sequential, and focus uses of `就`;
- direct scholarly analysis of the exact `佢講完我就話唔係噉` structure;
- productivity boundaries for completion-plus-`就` with object, aspect, and subject variation.

## Freeze result

This checkpoint changes research provenance only. `main.js`, `manifest.json`, parser templates, roles, glosses, fixtures, tests, accepted behavior, and held-out files remain unchanged.
