---
title: PRQ2-002 — zou2zi1 hindsight-regret conditional research
research_id: PRQ2-002
status: active_research_unit
baseline_version: 0.5.213
created: 2026-07-23
queue_visibility: completed_task_only
implementation_authorized: false
status_change_authorized: false
master_backlog_change_authorized: false
---

# PRQ2-002 — `早知(道) … 就／咪 …` hindsight-regret frame

## Research decision

Promote Cantonese counterfactual conditionals of regret marked by `早知(道) zou2zi1(dou3)` to a dedicated **research unit**.

The strongest checked primary study identifies a conventional Cantonese construction in which `早知(道)` introduces an unrealized knowledge state and the following clause presents a remedy or alternative action that could have been undertaken in the past. The construction expresses hindsight and regret rather than an ordinary open condition. The shorter `早知` form is reported as more frequent in this function, and the marker is analyzed as grammaticalizing from a cognition verb toward a subordinator.

The evidence supports a prototypical relation between:

```text
(optional subject) + 早知(道) + (known fact / complement)
    + (就)
    + (optional subject) + consequent VP
```

The prototype is not a rigid string template. The complement of `早知`, overt subjects, and `就` may be absent in attested examples, and noncanonical clause orders occur. The overt marker `早知` and an overt remedy/evaluative predicate are the most stable elements in the source's prototype.

The exact native-corpus profile:

```text
早知你坐佢架車咪仲好。
```

is independently natural in one discourse, but the checked primary study and pedagogical source do not establish a productive `早知 … 咪 …` paradigm. `咪仲好` must therefore remain a separately quarantined apodosis profile. In this sentence, `咪` cannot safely be analyzed as ordinary negation or as the prohibitive marker seen in `咪去`; its exact contribution is unresolved.

This note authorizes no parser change, registry entry, construction-status change, master-backlog edit, lexical installation, or automatic acceptance rule.

## Narrow supported profile

The strongest research-level schema is:

```text
(PROTAGONIST) + 早知(道) + (TRIGGERING FACT)
    + (就)
    + (PROTAGONIST) + REMEDY / ALTERNATIVE VP
```

A useful semantic paraphrase is:

```text
The relevant fact became known too late.
Had that fact been known earlier, a different action or state would have been chosen.
The different action was not realized in the actual past.
The speaker evaluates the actual outcome with regret or hindsight.
```

This is a research paraphrase, not an executable semantic representation. The checked sources do not establish that every epistemic complement, subject, predicate, particle, tense interpretation, or discourse relation can fill the frame freely.

## Direct source findings

The source-verification ledger is:

`PRQ2-002-ZOU2ZI1-HINDSIGHT-REGRET-SOURCE-VERIFICATION-R1.tsv`

### Lui 2025

Pun Ho Lui's open-access article *Counterfactual Conditionals of Regret in Cantonese* directly studies the target construction. Its abstract defines the construction as marked by `早知(道)` and as expressing regret over a remedy that could have been undertaken in the past.

The paper argues that:

- `早知(道)` is grammaticalizing from a verb toward a subordinator;
- the shorter `早知` form is more common as the construction marker;
- the prototypical order places `早知(道)` and its optional complement before the remedy clause;
- `就 zau6` may introduce the remedy clause with a “then” contribution;
- overt subjects, the complement of `早知`, and `就` are not uniformly obligatory;
- the remedy clause must contain an overt VP in the prototype;
- noncanonical structures include omitted complements and altered clause order;
- constructional `早知(道)` lacks ordinary verbal behavior: it cannot simply be negated or take aspect morphology as an ordinary cognition verb;
- the embedded complement itself may contain negation or aspect and may use a proform such as `係咁`;
- the construction retains a knowledge meaning even while developing subordinating behavior.

An exact contemporary example discussed in the article has the form:

```text
原來九十三M頭車開五點十分，早知係咁就五點收工啦。
```

The source interprets the second clause as the unrealized remedy: had the departure time been known earlier, the speaker would have finished work at five.

The accessible full text was read through an author-uploaded open-access page extraction. The direct PDF endpoint did not download reliably in this environment, so locators in the ledger combine article section/page references with the accessible extraction. This limitation affects document handling, not the identity of the article or its main stated claims.

### Zheng, Zhang, and Gao 2021

The project's verified Cantonese coursebook source presents `早知` under the communicative function of regret and gives:

```text
早知係咁就……
早知問下人就唔會蕩失路啦。
```

This independently supports the ordinary `早知 … 就 …` and `早知 … 就唔會 …` consequence profiles. As pedagogical evidence, it attests conventional form and function but does not define exhaustive syntax or unrestricted productivity.

### WECHAT-GX-TRAVEL-002

The user-supplied native conversation contains:

```text
早知你坐佢架車咪仲好。
```

The utterance occurs in a context where the speaker says it would have been better for the addressee to ride in another person's car rather than drive personally. It supplies direct natural attestation for the exact `早知 … 咪仲好` surface.

One speaker and one discourse occurrence do not establish a productive `咪` apodosis class, the exact role of `咪`, or interchangeability with `就`. The occurrence has zero parser-promotion weight by itself.

## Structural and semantic analysis

### 1. Hindsight regret versus ordinary conditionality

Ordinary Cantonese conditionals may express open, predictive, habitual, or hypothetical relations. The target construction is past-oriented and counterfactual: the relevant knowledge was absent at the decision point, the proposed remedy was not undertaken, and the speaker evaluates the actual outcome retrospectively.

Compare the research distinction:

```text
如果係咁，我就唔去。
“If that is the case, I will not go.”

早知係咁，我就唔去啦。
“Had I known it was like this, I would not have gone.”
```

The first can remain open with respect to future action. The second conventionally presents a too-late realization and unrealized alternative. A future-time or still-actionable use must not be admitted merely because it contains `早知` and `就`.

### 2. Constructional `早知(道)` versus ordinary cognition

The characters transparently resemble `早` “early” plus `知(道)` “know,” but the constructional marker has restricted verbal behavior in the primary analysis. It cannot be freely negated or aspect-marked as an ordinary cognition predicate.

Do not derive the regret construction through a generic rule that simply combines:

```text
早 + cognition VP
```

At the same time, not every occurrence of the string `早知` is necessarily a complete regret conditional. A sentence meaning that nobody can know an outcome in advance may use a lexical cognition sense without an unrealized remedy clause. Lexical foreknowledge and the construction marker therefore require contextual separation.

### 3. Complement of `早知`

The complement identifies the fact whose earlier availability would have changed the course of events. Directly supported complement profiles include a clause or a proform such as `係咁`.

The complement may contain its own negation, aspect, subject, and predicate. These belong inside the knowledge-content clause and must not be confused with morphology on the marker itself.

The complement may also be omitted where recoverable:

```text
早知我就唔去啦。
```

This omission cannot license the parser to invent a specific hidden fact. It should remain a discourse dependency or unresolved complement slot.

### 4. Consequent with `就`

The best-supported apodosis profile uses optional `就` before the remedy VP:

```text
早知係咁就五點收工啦。
早知問下人就唔會蕩失路啦。
```

`就` contributes an ordinary consequence or “then” relation inside the larger regret frame. The primary study reports that `就` is not required in every example, so it cannot be used as the sole construction detector.

The consequent may contain:

- affirmative or negative predicates;
- modal material such as `會`;
- perfective or other aspectual material where independently licensed;
- final particles expressing evaluation, obviousness, or stance;
- an overt or recoverable subject.

The checked sources do not provide a complete consequent-selection inventory.

### 5. Consequent with `咪仲好`

The native utterance:

```text
早知你坐佢架車咪仲好。
```

has an evaluative apodosis approximately meaning that the alternative would have been better. The local sequence `咪仲好` is incompatible with a simple prohibition analysis: `咪` does not instruct someone not to be better, and the clause occurs under retrospective evaluation.

However, the available primary article extraction does not establish a general `咪` consequence marker for the regret construction. The coursebook examples use `就`, not `咪`. The safest disposition is therefore:

- preserve the exact `咪仲好` surface;
- represent it as a candidate non-prohibitive/evaluative apodosis subtype;
- do not rewrite it to `就仲好`;
- do not label `咪` as negation;
- do not infer that arbitrary `咪 + VP` consequences are licensed after `早知`;
- require independent source or panel evidence before assigning a stable particle function.

### 6. Clause order and omitted material

The primary study documents noncanonical structures, including examples where the remedy material precedes the `早知` clause and where the complement is omitted. These findings rule out a parser definition that requires only one adjacent linear string.

Nevertheless, flexible order does not justify free relation-building between any separated `早知` and any nearby clause. A valid analysis must preserve discourse coherence between:

1. the fact known too late;
2. the unrealized remedy or better alternative;
3. the retrospective regret evaluation.

### 7. Subjects and perspective

Subjects are often recoverable, and first-person regret is a frequent discourse profile. The evidence does not make first person grammatically obligatory. The regret holder, knower, actor of the unrealized remedy, and evaluator may coincide in the prototype, but they should not be silently collapsed when overtly different participants are present.

The exact native example contains an overt second-person subject in the complement/remedy material. It therefore warns against implementing the frame as a first-person-only construction.

## Exact runtime collision audit

The collision ledger is:

`PRQ2-002-ZOU2ZI1-HINDSIGHT-REGRET-COLLISION-AUDIT-R1.tsv`

Direct v0.5.213 probes show a complete structural gap for the regret frame.

### `早知你坐佢架車咪仲好。`

Only `架車` is wrapped, as `ModifiedNP`. `早`, `知`, the participants, the sitting predicate, `咪`, `仲`, and `好` remain outside a complete construction. Root coverage is partial. The output neither preserves the regret relation nor distinguishes `咪仲好` from prohibition or negation.

### `早知係咁就五點收工啦。`

The runtime produces no top construction. It does not recognize the `早知` marker, the complement `係咁`, the `就`-linked remedy, or the clause relation.

### `早知問下人就唔會蕩失路啦。`

Only `會蕩失路` receives a broad `ModalVP` analysis; `早知問下人就唔` remains unwrapped. The negative modal consequence and its dependency on the hindsight clause are lost.

### Complement omission and reverse order

`早知我就唔去啦` and `我就唔去啦，早知係咁` recognize only `唔去` as a negated motion predicate. The parser has no node or relation connecting the remedy to `早知`, whether the marker precedes or follows it.

### Prohibitive and other controls

`咪去` receives a full `ProhibitiveImperative` analysis. This is useful evidence that reusing the existing prohibitive path for the `咪` in `咪仲好` would be a false collision.

`我咪去囉` is only partially parsed, and `係咪好` receives no top construction. These controls show that the current runtime does not yet provide a reliable general polyfunctionality analysis for `咪`.

`如果係咁，我就唔去` is correctly wrapped as `ClauseRelationGraph`. That ordinary relation graph must not automatically absorb `早知` clauses, because the latter add conventional counterfactual regret and may omit or reorder markers.

`早啲去就好` recognizes only the motion VP and supplies a decisive lexical boundary: `早啲 + VP` “do earlier” is not the `早知` regret marker.

`冇人可以早知結果` receives a broad `ModalVP` over `可以早知結果`, showing a potential lexical-foreknowledge use that must remain separate from a complete hindsight-regret frame.

## Collision and overgeneration boundaries

### `ConditionalClause` and `ClauseRelationGraph`

The target construction is biclausal in its prototype and overlaps ordinary condition-consequence structure. It differs by having a dedicated `早知(道)` anchor, a past unrealized remedy, and conventional regret semantics. A generic conditional relation may be an implementation substrate later, but it is not a sufficient linguistic analysis now.

### `一 … 就 …` immediate anteriority or contingency

The target may contain `就`, but it does not use `一` as the protasis marker and does not express ordinary temporal succession. Do not merge it with immediate-anteriority or contingency constructions merely because both contain `就`.

### `早啲 + VP`

`早啲去`, `早啲睇`, and related expressions mean performing an action earlier. The primary study explicitly distinguishes these from constructional `早知(道)`. A broad `早 + predicate` rule would overgenerate.

### Prohibitive `咪 + VP`

`咪去` is an imperative prohibition. The native `咪仲好` apodosis is evaluative and retrospective. They require distinct analyses even though the graph `咪` is shared.

### Polar `係咪`

`係咪` forms polar questions and must not be segmented into a copula plus the target apodosis `咪` function. Orthographic identity does not establish semantic identity.

### Inferential or consequence `咪 … 囉`

Cantonese also uses `咪` in discourse-inferential or “then/simply” profiles. These may ultimately be closer to the native apodosis than prohibition, but the current task found no decisive source mapping the exact `早知 … 咪仲好` example to a general inferential construction. Keep the relationship unresolved.

### Conventional short regrets and idioms

Expressions such as `早講啦`, `早知今日何必當初`, or isolated `早知` may be conventional regrets, elliptical constructions, or lexicalized sayings. They should not automatically expand the productive biclausal profile.

## Quarantined questions

Future work must establish:

- the complete complement types licensed after `早知` and `早知道`;
- the frequency, register, and regional distribution of the short and long marker forms;
- whether complement omission is licensed by discourse recoverability, constructional convention, or both;
- subject realization and the mapping among knower, regret holder, evaluator, and remedy actor;
- whether the triggering fact must concern a past event or may be a present state learned too late;
- whether the remedy must be controllable, feasible, and temporally prior to the discovery;
- positive, negative, modal, aspectual, evaluative, existential, copular, and fragment consequents;
- exactly when `就` may be omitted, displaced, or repeated;
- the licensing and interpretation of reverse clause order;
- punctuation, pause, intonation, and prosodic phrasing in canonical and noncanonical orders;
- whether `咪仲好`, `咪唔使`, `咪可以`, and other candidate `咪` consequents form a productive subtype;
- whether `咪` in these consequents is inferential, consequence-marking, evaluative, modal, or construction-specific;
- contrasts with prohibitive `咪`, polar `係咪`, inferential `咪 … 囉`, and ordinary negation;
- whether sentence-final particles alter regret strength, obviousness, blame, advice, or counterfactuality;
- whether non-first-person and non-speaker regret readings are natural without quotation or reported thought;
- differences among Hong Kong, Guangzhou, age, written-Cantonese, and conversational registers;
- negative boundaries against lexical foreknowledge and ordinary `早啲 + VP` expressions;
- whether a future parser representation should be a dedicated frame or a typed subtype over a general clause-relation graph.

## Proposed native-panel packet

A future blinded panel should test minimal contrasts rather than asking respondents to endorse one preselected analysis:

```text
早知係咁就唔去啦。
早知係咁我唔去啦。
早知係咁咪唔去啦。
早知係咁咪仲好。
早知你坐佢架車咪仲好。
你坐佢架車咪仲好。
咪坐佢架車。
我咪坐佢架車囉。
早啲坐佢架車就好。
冇人可以早知結果。
```

Items require contexts that independently fix:

- whether the discovery is too late;
- whether the alternative action was feasible;
- whether the action occurred;
- who regrets the outcome;
- whether `咪` is an instruction, inference, or retrospective evaluation.

Written-only judgments may miss prosodic distinctions. At least one audio condition should be included before implementation decisions.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is a Cantonese hindsight-regret construction marked by `早知(道)` directly established? | **Yes.** |
| Does it conventionally concern a remedy that could have been undertaken in the past? | **Yes.** |
| Is shorter `早知` more common in the construction according to the primary study? | **Yes.** |
| Is the marker analyzed as grammaticalizing toward a subordinator? | **Yes.** |
| Is `就` licensed in the consequent? | **Yes.** |
| Is `就` obligatory in every attested construction? | **No.** |
| May complement or subject material be omitted? | **Yes, but discourse and structural conditions remain incomplete.** |
| May noncanonical clause order occur? | **Yes.** |
| Is ordinary `早啲 + VP` the same construction? | **No.** |
| Is lexical foreknowledge with `早知` automatically a regret frame? | **No.** |
| Is the exact `早知 … 咪仲好` native surface attested? | **Yes, once in the project corpus.** |
| Is a productive `早知 … 咪 + arbitrary VP` rule established? | **No.** |
| Can the relevant `咪` be labeled ordinary negation or prohibition? | **No.** |
| Does the runtime currently preserve the complete regret relation? | **No.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

PRQ2-002 may leave active research only after independent sources or controlled speaker evidence establish the consequent inventory, the role of `咪`, complement and subject omission, clause order, temporal and controllability constraints, prosody, and the boundaries against ordinary conditionals, lexical foreknowledge, `早啲 + VP`, and prohibitive or inferential `咪`.

Any implementation would require a separately authorized parser change, explicit polyfunctionality safeguards, negative fixtures, and held-out validation. The private research queue remains external and is not referenced by this file.
