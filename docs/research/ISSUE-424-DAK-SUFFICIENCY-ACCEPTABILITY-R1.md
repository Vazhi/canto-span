# ISSUE-424 得 sufficiency and acceptability disposition R1

Parent issue: #424  
Work claim: #531  
Date: 2026-08-04

## Decision

The five routed examples are complete at the identity/specification layer and should not be treated as syntactically incomplete merely because they contain `得`.

Do not create one broad new `得` construction identity from this packet. The safest current disposition is two bounded compositional profiles:

1. **overt-predicate sufficiency**: `X 就得` / `X 就得㗎喇`, where an overt preceding predicate or clause is enough and no additional work/input is required;
2. **acceptability A-not-A question**: `X 得唔得` or standalone event-level `得唔得`, asking whether an event, proposal, or state is okay, possible, acceptable, or permitted.

This packet reaches an identity/composition specification only. It changes no runtime behavior.

## Assumption-level research review

### Assumption A — `得` has an acceptability / okay profile distinct from postverbal potential

Supported.

CantoWords gives an adjective entry for `得` meaning “okay; acceptable,” with the example `得唔得㗎？` glossed “Is that okay?” It also separately lists affixal/postverbal `得`, including “used after a verb to mean it is okay / alright to do something” and structural-particle uses with complements. This supports separating acceptability `得` from postverbal potential/result-complement profiles.

### Assumption B — `得唔得` can be a complete acceptability / permission question

Supported.

CantoWords lists `得唔得` as an expression and gives meanings including:

- “Is it OK/fine?”;
- “Can I do this?”;
- asking permission;
- asking whether something is good.

Its examples include `得唔得呀？` attached to a proposed action and a bare/elliptic `條女得唔得？` evaluative question. This supports treating the event-level acceptability question in the target set as complete, not as a missing-context fragment.

### Assumption C — `X 就得` / `就得㗎喇` is a sufficiency profile

Supported.

CantoDict lists `就得㗎喇` as “OK, will do,” “will suffice,” “good enough,” and glosses it with Mandarin equivalents like `就好了` / `就行了`. CantoDict also lists `得㗎嘞`, noting it “will suffice; enough; good enough; fine” and is often used with `就`.

This supports an overt-predicate sufficiency profile for examples like `慢慢學就得`, `慢慢做就得`, and `而家改番就得㗎喇`.

### Assumption D — complete `得` clauses should all become one new identity

Not supported.

The evidence supports completeness and local compositional profiles, but it does not require a single new construction identity covering all `得` uses. `得` has multiple documented functions: acceptability, ability/possibility, postverbal okay-to-do, structural complement marking, result/degree linkage, and lexical/morphemic uses. Collapsing them would recreate the problem the issue is trying to avoid.

## Target examples

The issue routes five examples:

- `落雨都去，帶遮就得。`
- `再借個杯用下得唔得？`
- `唔使驚，慢慢學就得。`
- `唔使急，慢慢做就得。`
- `冇問題，而家改番就得㗎喇。`

## Profile 1 — overt-predicate sufficiency `X 就得`

Positive profile:

- an overt predicate, clause, or action proposal precedes `就得`;
- `就得` contributes sufficiency / adequacy / “that will do”;
- particles such as `㗎喇` may add assertion/current-relevance force without making the clause context-dependent.

Examples covered:

- `帶遮就得`
- `慢慢學就得`
- `慢慢做就得`
- `而家改番就得㗎喇`

Negative boundaries:

- bare response `得` with no overt predicate remains context-dependent unless separately licensed;
- postverbal potential/result forms such as `飲得`, `做唔到`, or `V得Result` are separate;
- `有得/冇得` availability is separate;
- lexicalized expressions containing `得` require item-level treatment.

## Profile 2 — acceptability A-not-A `得唔得`

Positive profile:

- `得唔得` asks whether an event, request, proposal, object, or state is okay, acceptable, possible, or permitted;
- the evaluated event may be overt before `得唔得`;
- the question is complete if the event/proposal is overt in the clause or recoverable by standard question structure.

Example covered:

- `再借個杯用下得唔得？`

Negative boundaries:

- do not identify every `得唔得` with postverbal potential;
- do not collapse evaluative `條女得唔得？`-type uses with permission questions;
- do not use this profile to license unrelated `得` particles or result complements;
- do not add hidden predicates where neither overt material nor accepted discourse context supplies one.

## Terminal disposition

- Overt-predicate `X 就得`: supported as complete sufficiency composition.
- Event-level `X 得唔得`: supported as complete acceptability / permission question composition.
- One broad `得` identity: no.
- New UUID: no, not from this packet.
- Runtime change: no, not in this packet.
- Status promotion: no.
- Later implementation route: allowed as a separate bounded runtime/spec package if exact parser inspection confirms the `NeedsContext` diagnostic persists.

A later implementation issue may be ready if it is limited to suppressing or preventing `NeedsContext` for overt-predicate `X 就得` and overt-event `X 得唔得`, while preserving negative controls for bare `得`, postverbal potential/result, and `有得/冇得` availability.

## Protected-state disposition

This packet changes no runtime behavior, parser matcher, construction identity, linguistic status, source record, survey state, release state, or deployment state.

## Source pointers

- CantoWords `得`: `https://cantowords.com/dictionary/得`
- CantoWords `得唔得`: `https://cantowords.com/dictionary/得唔得`
- CantoDict `就得㗎喇`: `https://www.cantonese.sheik.co.uk/dictionary/words/38359/`
- CantoDict `得㗎嘞`: `https://www.cantonese.sheik.co.uk/dictionary/words/38357/`
