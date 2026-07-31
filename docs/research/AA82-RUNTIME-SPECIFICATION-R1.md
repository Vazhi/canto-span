# AA82 runtime specification R1

Date: 2026-07-31  
Permanent code: `AA82`  
Permanent UUID: `55b119d9-bd6c-59f4-b6fc-16e17968f539`  
Adjudicated identity: `BinDouWhPlaceQuestion`  
Legacy runtime label: `LocativeWhQuestion`

## Decision

Retain the current runtime behavior without an implementation change at this stage, but freeze its defensible interpretation as a **clause- or fragment-level interrogative wrapper over overt `邊度` material**.

AA82 is not a token-local lexical node, not a semantic-role classifier, and not evidence that every occurrence of `邊度` has question force. The accepted research shows that `邊度` participates in direct, embedded, rhetorical, negative-indefinite, fragment, repair, event-location, goal, source, path, and body-locus environments. Its lexical presence alone therefore cannot determine clause force or semantic role.

The current effective wrapper can remain because the inspected positive fixtures preserve the overt clause or fragment and do not replace `邊度` with a hidden locative analysis. No narrower implementation has yet been shown to improve correctness without creating new collisions in motion, perfective, embedded, rhetorical, or discourse-sensitive cases.

## Exact runtime contract

### Trigger

The compatibility label `LocativeWhQuestion` may be emitted only when all of the following are true:

1. the analyzed surface contains overt exact `邊度` material;
2. the parent analysis independently supports interrogative clause or interrogative-fragment force;
3. the wrapper preserves the overt child structures from which predicate, argument, motion, location, and discourse relations are derived; and
4. the analysis is not licensed solely by the lexical presence of `邊度`.

The wrapper must not introduce a covert location, goal, source, path, body-locus, event-location, or other semantic role. Those roles must remain recoverable from overt typed parent or child structure.

### Span

The wrapper span is the full overt interrogative clause or the full overt interrogative fragment selected by the parser. It must not be reduced to the `邊度` token alone.

For repair or multi-fragment input, independently licensed fragments remain separate. AA82 must not form one wrapper across intervening formula, repair, or unrelated discourse material.

### Parent composition

The wrapper may organize independently typed material such as:

- an overt subject or topic;
- a copular, locative, eventive, motion, or other predicate structure;
- an overt `邊度` expression;
- overt aspect, negation, modal, particle, or discourse material when independently licensed; and
- fragment or question-force metadata supported by the parent analysis.

The wrapper does not determine which of these components is the semantic host of `邊度`. That relation remains an output of the typed child analysis.

### Exclusions

The following are outside the AA82 wrapper unless a separate parent analysis independently establishes matrix interrogative force and the current runtime contract explicitly admits the case:

- embedded interrogatives such as `我諗緊佢喺邊度。`;
- negative-indefinite or free-choice structures such as `我邊度都唔去。`;
- noninterrogative lexical `邊度` uses;
- broad negated-wh generalizations that erase the distinction between rhetorical, interrogative, and indefinite readings;
- repairs whose fragments must remain independently represented;
- strings rejected by independent aspect, object, or motion licensing;
- nonlocative wh questions; and
- locative declaratives without interrogative force.

Rhetorical questions remain interrogative structures only where the runtime independently represents their question form. AA82 does not by itself decide rhetorical interpretation.

### Metadata requirements

When the compatibility wrapper is emitted, its trace or equivalent metadata must make the following interpretation recoverable:

- the construction is a clause- or fragment-level wrapper;
- `邊度` is overt rather than fabricated;
- question force comes from the parent analysis rather than the lexical item alone;
- semantic role is inherited from overt typed structure rather than assigned by AA82;
- embedded, rhetorical, indefinite, repair, and incompatible cases are not collapsed into one lexical family; and
- no hidden location, goal, source, path, or event argument has been inserted.

Existing fixture metadata that records overt subject, predicate, event, goal, or clause-function structure should be retained.

## Motion and perfective boundary

The accepted audit found an inconsistent collision surface among AA82, motion-goal analysis, and perfective-object licensing:

- some nonperfective motion-goal questions remain compositionally represented without `LocativeWhQuestion`;
- `你行唔行去邊度？` currently receives the compatibility wrapper over overt event and goal material; and
- perfective-object strings such as `佢去咗邊度？` remain outside the wrapper because independent perfective-object licensing rejects them.

This specification does not resolve that family by changing AA82. A location-question wrapper must not override or repair a rejected motion or aspect analysis. Conversely, the absence of AA82 must not be treated as evidence that a compositionally represented motion-goal question is noninterrogative.

Any change to these cases requires a separate accepted specification covering the interaction of:

1. motion predicate and goal structure;
2. A-not-A or other question formation;
3. perfective placement and object licensing; and
4. the optional AA82 compatibility wrapper.

## Fixture obligations

The current fixture family should continue to distinguish at least:

### Positive wrapper cases

- full direct location questions;
- event-location questions;
- independently licensed motion-goal questions currently covered by the wrapper;
- bare `邊度？` interrogative fragments;
- `去邊度？` interrogative fragments; and
- repair sequences in which the final `邊度？` fragment remains separate from preceding formula material.

### Required boundaries

- nonlocative wh questions;
- locative declaratives;
- embedded `邊度` interrogatives represented by their embedded parent structure;
- rhetorical and negative-indefinite contrasts;
- nonperfective motion-goal questions represented compositionally without AA82;
- perfective-object strings rejected by independent licensing; and
- multi-fragment strings that must not become one oversized wrapper.

No fixture should assert that the `邊度` token itself carries a fixed semantic role or matrix question force.

## Consequence for issue #313

Issue #313 may now test the following detector surface:

> Select attested items containing overt exact `邊度`, classify their parent clause or fragment force and independently typed semantic relation, then compare the current runtime output with this clause-level wrapper contract. Do not count every lexical occurrence as an expected AA82 hit.

The bounded packet must report:

- justified wrapper hits;
- compositionally correct interrogative cases without the wrapper;
- false-positive wrappers over embedded, indefinite, repair-spanning, or noninterrogative material;
- false negatives where the parent analysis clearly establishes an admitted matrix question or fragment;
- cases blocked by independent motion, aspect, or object licensing; and
- unresolved cases whose interpretation depends on discourse or unavailable context.

A runtime implementation issue should be opened only if that packet demonstrates a material, reproducible collision and supplies a narrower trigger or composition rule that improves the contract without erasing the accepted boundaries.

## Protected and unchanged

This decision changes no:

- permanent UUID or construction code;
- adjudicated identity;
- linguistic status;
- runtime source or generated bundle;
- fixture or corpus classification;
- survey, panel, or held-out state;
- release version or deployment state.

## Terminal outcome

**Evidence-justified no-change decision.** The current AA82 compatibility behavior is retained under the explicit narrow contract above. Corpus testing proceeds under #313. Motion-goal and perfective interactions remain separately scoped and cannot be resolved by broadening the lexical `邊度` wrapper.