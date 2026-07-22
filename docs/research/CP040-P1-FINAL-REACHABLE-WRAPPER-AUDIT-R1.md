# CP040-P1 final reachable-wrapper audit

Date: 2026-07-22

Runtime checkpoint: v0.5.196

Scope: constructor-specific implementation reachability for all thirteen labels that remained `no_direct_cases` after v0.5.195. Eleven labels receive zero-weight probes. `Comment` and `PerfectiveResultPredicate` remain explicitly constructor-shadowed. No survey evidence, parser-span change, retirement, or linguistic promotion is involved.

## Family reviewed

This checkpoint reviews the final thirteen uncovered runtime labels:

- `CompletionThenClause`
- `CompoundDirectionalMotionVP`
- `ConditionResult`
- `DegreeModifiedLexicalStative`
- `NegatedLexicalizedStative`
- `PassivePermissiveRelation`
- `PoliteImperativeClause`
- `ProgressivePlaceQuestion`
- `ProgressivePurposeClause`
- `ProgressiveTransitivePredicate`
- `PurposePredicate`
- `Comment`
- `PerfectiveResultPredicate`

The audit asks only whether the current implementation emits each label in complete parser output. Reachability is not evidence that a wrapper is linguistically necessary, natural, productive, correctly named, or promotion-ready.

## Runtime findings

### FRWRAP-001 — completion followed by `就`

`我做完功課就瞓覺。` reaches `CompletionThenClause` and preserves a nested `CompletionVP`.

Checked sources support completion/aspect material and real `就`-linked sequences, but they do not establish the runtime's dedicated wrapper, a universal shared-subject analysis, or unrestricted completion-then productivity. The probe protects only the implemented route.

### FRWRAP-002 — three-part directional string

`返上嚟。` reaches `CompoundDirectionalMotionVP`.

Independent sources attest compound and three-member directional strings including `返上嚟`. The zero-weight probe nevertheless protects only the exact runtime route. It does not authorize arbitrary return-direction-deictic combinations, identical constituency across directionals, or unrestricted object placement.

### FRWRAP-003 — action plus `就` plus result predicate

`買就平啲。` reaches `ConditionResult` and preserves a nested `DegreeMannerAdverbial`.

The implementation recognizes a narrow action-plus-`就`-plus-stative shape. Checked conditional evidence is structurally broader and does not justify treating every `就` sequence as this construction. The route remains implementation-only.

### FRWRAP-004 — degree plus lexicalized stative

`好好食。` reaches `DegreeModifiedLexicalStative` because the first `好` is a degree element and `好食` is selected as a dictionary-backed lexicalized stative.

The probe protects that tokenization and wrapper path only. It does not settle whether the expression should be analyzed compositionally, establish a productive class of lexicalized statives, or license arbitrary degree-plus-`好X` combinations.

### FRWRAP-005 — lexical negative stative

`難食。` reaches `NegatedLexicalizedStative`.

This is a lexicon-backed `難X` route. It is not equivalent to productive `唔 + stative` negation: `唔好食。` currently routes through context-review behavior rather than this label. The probe preserves the implemented lexical distinction without promoting it.

### FRWRAP-006 — transparent `畀` relation

`我畀佢打。` reaches `PassivePermissiveRelation`.

The runtime deliberately preserves more than one interpretation instead of forcing passive, permissive, or generic affectedness. The probe therefore validates only node reachability. It does not select argument roles, settle ambiguity, or establish unrestricted `畀` syntax.

### FRWRAP-007 — narrow polite path command

`請你沿住馬路行。` reaches `PoliteImperativeClause` and a nested `PathPhrase`.

The constructor requires a narrow path-command configuration: `請`, overt addressee, `沿住`, one recognized path/location, and one predicate. A broader polite command such as `請你行。` does not reach this wrapper. The probe does not establish general imperative grammar.

### FRWRAP-008 — progressive predicate followed by location question

`你做緊嘢喺邊度呀？` reaches `ProgressivePlaceQuestion`.

The dedicated wrapper is word-order-sensitive. The ordinary preverbal-location form `你喺邊度食緊飯？` routes through `LocativePlacePhrase` and `ProgressiveVP` rather than `ProgressivePlaceQuestion`. This difference remains explicit; the probe does not claim that the postposed route is preferred or broadly productive.

### FRWRAP-009 — bounded progressive-purpose parent

`佢喺度洗緊菜煮飯。` reaches `ProgressivePurposeClause`.

The constructor requires exactly seven compact nodes and assigns purpose to the final V+O pair. The surface is semantically coherent, but adjacency alone does not prove purpose, event unity, or a fixed clause template. The route remains zero-weight implementation evidence.

### FRWRAP-010 — nested progressive transitive child

The same surface reaches nested `ProgressiveTransitivePredicate` for `洗緊菜`.

Independent sources support ordinary V緊O progressives, but they do not require this special child label or its restriction to the bounded progressive-purpose parent. The probe protects only the current nested representation.

### FRWRAP-011 — nested purpose child

The same surface reaches nested `PurposePredicate` for `煮飯`.

The child has ordinary V+O form and obtains its purpose interpretation entirely from the parent. No independent surface marker distinguishes it from ordinary `ProductiveVO` or `TransitiveVP`. The probe does not turn V+O form into a purpose construction.

## Constructor-shadowed labels

### `Comment`

The late topic-comment fallback can still construct a `Comment` node internally. However, complete parsing still produces no final `Comment` row for the audited path. This confirms the earlier low-reference finding: the label is constructor-present but output-shadowed.

The existing consolidation plan recommends merging comment information into `TopicComment` role metadata. This checkpoint does not perform that structural cleanup or fabricate a probe.

### `PerfectiveResultPredicate`

The controlled `解決 + 咗` fallback remains present, but complete output for `解決咗。`, `解決咗喇。`, and `呢個問題解決咗喇。` is consumed by `PerfectiveVP`. The specialized label therefore remains constructor-present but output-shadowed.

No implementation probe is added merely to eliminate the last uncovered count. Future work must decide whether to merge, expose, or retire the specialized wrapper without broadening perfective/result grammar.

## Evidence accounting

- eleven implementation-only probes were added;
- every probe has linguistic evidence weight **0**;
- two constructor-shadowed labels remain uncovered;
- no panel, corpus, or source count changed;
- no construction status changed;
- no runtime label was retired;
- no recognized parser span changed.

## Result

- labels reviewed: **13**;
- implementation-positive labels added: **11**;
- constructor-shadowed labels retained: **2**;
- labels retired: **0**;
- parser recognized-span behavior changed: **no**;
- linguistic status changed: **no**;
- linguistic evidence weight added: **0**;
- remaining `no_direct_cases`: **2**.
