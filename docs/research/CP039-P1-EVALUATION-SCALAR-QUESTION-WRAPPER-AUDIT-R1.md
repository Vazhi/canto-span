# CP039-P1 evaluation, scalar, and question wrapper audit

Date: 2026-07-22

Runtime checkpoint: v0.5.195

Scope: constructor-specific implementation reachability for ten acceptability, scalar, evaluation, identity, scheduling, temporal, opinion, and existential-question wrappers. No survey evidence, parser-span change, or linguistic promotion is involved.

## Family reviewed

This checkpoint reviews ten labels that remained `no_direct_cases` after v0.5.194:

- `AcceptabilityClause`
- `EvaluationWithDouSyun`
- `ScalarEvaluation`
- `ScalarRangeFragment`
- `ScalarValueQuestion`
- `OpinionQuestion`
- `IdentityWhQuestion`
- `SchedulingQuestion`
- `TimeToActionFrame`
- `PostposedExistentialQuestion`

The audit asks only whether the current implementation can emit each label in complete parser output. Reachability is not evidence that a wrapper is linguistically necessary, productive, or correctly named.

## Runtime findings

### ESQWRAP-001 — bare acceptability route

`返工都得。` reaches `AcceptabilityClause`. The wrapper can also contain a subject and a visible predicate, but the probe protects only the minimal action-plus-`都得` route.

Checked evidence distinguishes several uses of `得` and supports some free-choice `都得` clauses. It does not establish that the runtime's optional subject/action cross-product is one construction or that every such clause expresses permission.

### ESQWRAP-002 — price-domain `都算` heuristic

`都算中等價位。` reaches `EvaluationWithDouSyun`. The runtime path is keyed to `都`, `算`, and a price-domain candidate.

Checked evidence supports lexical `算` evaluation, including `唔算貴`, but does not establish this exact `都算` plus price-noun wrapper. The probe records the implemented heuristic without adding linguistic support.

### ESQWRAP-003 — negative scalar evaluation

`唔算貴。` reaches `ScalarEvaluation`. This exact surface is independently attested, but the runtime label also covers other templates such as scalar-value nouns followed by stative predicates.

The probe therefore protects the exact negative route only. It does not validate one broad construction across all scalar domains or all internal template variants.

### ESQWRAP-004 — lexical scalar-range fragment

`中等價位。` reaches `ScalarRangeFragment` and preserves a modifier child. The wrapper is primarily anchored by the lexical item `價位`.

The probe does not establish that the expression is an autonomous fragment, that a copular clause is absent, or that arbitrary range nouns should form the same runtime node.

### ESQWRAP-005 — exact price question

`幾錢呀？` reaches `ScalarValueQuestion`. The exact price question is independently attested.

The runtime label also groups additional scalar domains and optional per-person or approximation material. The probe protects only the exact price-question route and carries no evidence for that broader unification.

### ESQWRAP-006 — opinion/evaluation question

`你覺得呢個點樣？` reaches `OpinionQuestion` with a visible object-like NP and evaluative wh expression.

Checked sources show cognition predicates combining with independently formed question structures. They do not require a dedicated `OpinionQuestion` node, so the wrapper remains a composition-versus-special-node question.

### ESQWRAP-007 — narrow identity route

`邊個嚟㗎？` reaches `IdentityWhQuestion`. Sourced identity questions also include `呢個咩嚟㗎`, `嗰位小姐係邊個呀`, and `邊位係黃先生呀`; those broader forms do not all reach this label.

The probe protects only the narrow current route and exposes the mismatch between the runtime wrapper and independently attested identity-question patterns.

### ESQWRAP-008 — stance-marked scheduling question

`你覺得約幾時好？` reaches `SchedulingQuestion`. The runtime requires a stance predicate, scheduling action, time wh expression, and a quality/evaluation element.

Checked scheduling evidence attests a volitional predicate with a scheduling verb and in-situ time wh expression without `覺得` or final `好`. The implementation therefore remains narrower and differently composed than the sourced pattern.

### ESQWRAP-009 — `係時候` action frame

`係時候返屋企。` reaches `TimeToActionFrame` with a visible action predicate.

Checked temporal-clause evidence establishes real `時候`-headed temporal structures, but no verified exact source currently establishes this dedicated `係時候 + action` wrapper. The probe records reachability only.

### ESQWRAP-010 — postposed existential polar question

`有書冇？` reaches `PostposedExistentialQuestion`, while `有冇書？` reaches `ExistentialQuestion`.

Checked reference evidence establishes the preverbal `有冇` pattern. It does not establish the postposed `有 + nominal + 冇` wrapper, so this remains an implementation-only route with an unresolved evidence gap.

## Evidence accounting

- ten implementation-only probes were added;
- every probe has linguistic evidence weight **0**;
- no panel, corpus, or source count changed;
- no construction status changed;
- no runtime label was retired;
- no recognized parser span changed.

## Result

- labels reviewed: **10**;
- implementation-positive labels added: **10**;
- labels retired: **0**;
- parser recognized-span behavior changed: **no**;
- linguistic status changed: **no**;
- linguistic evidence weight added: **0**;
- remaining `no_direct_cases`: **13**.
