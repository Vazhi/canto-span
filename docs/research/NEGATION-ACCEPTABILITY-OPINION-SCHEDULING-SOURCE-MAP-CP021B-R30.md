# Negation, acceptability, opinion, and scheduling boundaries (CP021B-R30)

Date: 2026-07-19  
Scope: claim-level research mapping only; **no parser behavior, fixture, manifest, accepted version, or held-out file changed or opened**.

## Family selected

After verifying R29, only `NegatedVP`, `ProductiveVO`, and `TransitiveVP` remained visible in the 545-case accepted regression set. The latter two are broad implementation umbrellas. R30 therefore maps the coherent residual Lane 07 cluster:

- `NegatedVP`
- `NegativeHaveClause`
- `AcceptabilityClause`
- `OpinionQuestion`
- `SchedulingQuestion`

The shared issue is whether broad English-functional labels correspond to an independently sourced Cantonese construction or instead collapse marker identity, complement type, scope, discourse force, and ordinary wh composition.

## Source-derived boundaries

### 1. Ordinary `唔` negation is real; the generic `NegatedVP` wrapper is too broad

Yip independently supports ordinary `唔` negation and distinguishes suppletive `有/冇`. The coursebook gives ordinary examples such as `佢唔嚟` and `唔知點解佢唔嚟`. This supports a narrow preverbal-negation core.

The runtime, however, wraps `唔` around any already formed VP-like node. Its sole accepted top-level fixture is `唔做完`, whose own regression metadata records `native_naturalness_conflict`, `accepted_as_positive_language_evidence: false`, and `behavior_preservation_only: true`. The coursebook instead gives `今日嘅報紙我仲未睇完`, demonstrating that completion/not-yet meaning must be researched through overt marker and scope rather than inherited VP eligibility.

### 2. `NegativeHaveClause` duplicates the already mapped `冇` system

The label is dormant: no active template, fallback, or accepted fixture family was found. Lam and Yip distinguish negative possession/existence and event/aspectual uses of `冇`, while R9 already mapped those profiles and prohibited hidden positive `有`. There is no evidence-based reason to activate another English-named wrapper.

### 3. `都得` splits action acceptability and free-choice profiles

The coursebook explicitly defines clause-final `都得` as indicating that an action is feasible and gives `轆咭都得` and `搵第二個都得`. It also gives free-choice forms including `是但邊個都得`, `是但幾時去都得`, and `隨便去邊度都得`. These preserve overt individual, time, or place domains.

Postverbal `得` research confirms that `得` participates in more than one construction. The runtime’s optional topic/predicate plus `都得` cross-product must therefore split by host, free-choice licensing, focus scope, and discourse force. Declarative `都得` also remains distinct from interrogative `得唔得`.

### 4. Exact `你覺得佢哋點樣？` is attested, but question complements vary

The coursebook directly gives `你覺得佢哋點樣？`. It also gives `覺得` with a `邊區` wh question, a `定係` alternative, `最難係乜嘢`, and a final-`未` question. Independent grammar sources support cognition predicates plus propositions and Cantonese in-situ wh syntax.

The evidence therefore favors ordinary cognition-complement composition with typed question structures. A token-co-occurrence fallback for `覺得` and `點樣` cannot distinguish evaluative `點樣`, manner `點樣`, or clause boundaries.

### 5. Scheduling questions are real; the six-slot wrapper is not sourced

The coursebook directly gives `你想約佢幾時？`, which contains a volitional predicate, scheduling action, object, and in-situ time wh expression. It does not require `覺得` or final `好`.

The runtime registry demands stance + action + time question + scheduling quality, while the fallback checks only `覺得` and `幾時` and merely mentions `約幾時好` in its note. No inspected source established that full cross-product. Scheduling should remain semantic-domain metadata over ordinary modal/stance, predicate, object, wh-time, and particle structure.

## Dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `NegatedVP` | `SOURCE_LINKED_PREVERBAL_M4_NEGATION_WITH_VP_SELECTION_SCOPE_AND_COMPLETION_CONFLICT_NARROWING_REQUIRED` | Preserve ordinary overt `唔` negation, but split aspect/result/completion scope and quarantine the conflicted `唔做完` fixture as nonpositive evidence. |
| `NegativeHaveClause` | `SOURCE_LINKED_NEGATIVE_POSSESSION_EXISTENCE_EVENT_SPLIT_DORMANT_DUPLICATE_MERGE_OR_RETIRE` | Merge into the existing source-linked `冇` possession/existence/event system or retire the dormant duplicate. |
| `AcceptabilityClause` | `SOURCE_LINKED_DOU1_DAK1_ACCEPTABILITY_WITH_HOST_FREE_CHOICE_AND_FOCUS_SCOPE_SPLIT_REQUIRED` | Split action feasibility, free choice, host, focus, and particle profiles; never insert a hidden action. |
| `OpinionQuestion` | `SOURCE_LINKED_COGNITION_QUESTION_COMPLEMENT_TYPES_WITH_DIM2JOENG6_EVALUATIVE_PREDICATE_AND_WRAPPER_REALIGNMENT_REQUIRED` | Realign to cognition predicate plus independently typed question complement; preserve evaluation/manner ambiguity. |
| `SchedulingQuestion` | `SCHEDULING_DOMAIN_SOURCE_LINKED_EXACT_STANCE_ACTION_TIME_QUALITY_TEMPLATE_GAP_AND_ORDINARY_WH_REALIGNMENT_REQUIRED` | Retain scheduling as domain metadata; the exact six-slot wrapper remains a gap and should merge into ordinary wh composition. |

## Forbidden inferences

R30 does not authorize:

- treating parser VP eligibility as proof that `唔` scopes over every VP;
- treating `唔做完` as positive evidence because its historical tree is accepted;
- replacing overt `未` or `冇` with a generic `唔` analysis;
- inserting hidden positive `有` into `冇`;
- treating every `都得` as permission or inventing a missing action;
- collapsing declarative `都得` with interrogative `得唔得`;
- treating every `覺得…點樣` sequence as one constituent or one English paraphrase;
- inserting unspoken `約`, `好`, a time, opinion object, or scheduling quality;
- treating a source-search gap as evidence of ungrammaticality;
- changing parser behavior during the research freeze.

## Open evidence gaps

- direct modern corpus and judgment evidence for the scope and regional status of exact `唔做完`;
- corpus diagnostics separating standalone `都得`, VP+`都得`, and free-choice `wh+都得`;
- evaluation versus manner readings of `點樣` after cognition predicates;
- exact natural-corpus evidence and constituency for `約幾時好` and `你覺得約幾時好`;
- a theory-neutral representation of cognition predicates that preserves question-complement type and discourse anchoring.

## Freeze result

This batch changes research provenance only. No parser node, role, gloss, heuristic, fixture, test expectation, manifest field, accepted version, or held-out item was changed or opened.
