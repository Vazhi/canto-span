# ISSUE-647 final-未 completion-question profile disposition R1

Parent issue: #647  
Work claim: #648  
Date: 2026-08-07

## Decision

Week 18 I072:

```text
你食咗飯未？
nei5 sik6 zo2 faan6 mei6?
```

is a directly corroborated instance of current AA24 `AspectMarkedMeiCompletionQuestion`:

```text
subject + V + overt aspect/completion marker + optional object + final 未
```

The visible structure is:

```text
你 [食 咗 飯] 未
subject [eat PFV meal] not-yet
```

Direct Cantonese scholarship and a scholarly descriptive framework independently give the same or a nearly identical example. The result is therefore stronger than Glossika attestation alone.

Final `未 mei6` must not be represented as a generic sentence-final particle. In the direct VP-Neg analysis it retains the negative meaning ‘not yet’, introduces a negative alternative, and forms a question over whether the event has occurred. That analysis treats VP-Neg questions as related to A-not-A/disjunctive questions through an implicit negative alternative.

A new direct source also supports bare `VP + 未`, for example `你睇書未？`. This does **not** silently broaden AA24. AA24 was deliberately narrowed to predicates with overt completion/result/aspect marking. Bare VP-Neg questions therefore require a later identity/composition review rather than evidence transfer by shared final `未`.

No parser, test, identity, status, corpus, survey, source, release, or deployment state changes are authorized.

## Terminal dispositions

| Profile | Disposition | Reason |
|---|---|---|
| `V咗 + object + 未` | `DIRECTLY_SUPPORTED_VP_NEG_SUBTYPE` | Huang et al. directly give `你食咗海南雞飯未`; Wong et al. give `你食咗飯未呀`. |
| Week 18 I072 | `AA24_SOURCE_ALIGNED_POSITIVE` | It matches the current AA24 overt-aspect profile exactly. |
| `V完 + object + 未` | `AA24_SEPARATE_INNER_MARKER_SUBTYPE` | Existing verified reference evidence supports visible completion-marker questions; it remains distinct from `咗`. |
| `V過 + object + 未` | `AA61_EXPERIENTIAL_SUBTYPE_NOT_AA24_EVIDENCE_TRANSFER` | Direct VP-Neg research groups it in the broader family, but current permanent identity AA61 owns overt experiential `過…未`. |
| bare `VP + 未` | `DIRECTLY_SUPPORTED_FAMILY_PROFILE_OUTSIDE_CURRENT_AA24` | Huang et al. directly attest and analyze it; AA24 intentionally excludes it. |
| final `未` as ordinary SFP | `REJECTED_FOR_THIS_PROFILE` | Direct analysis treats it as retained negative marker `not yet`, not an interrogative particle. |
| `冇 + VP + 未` | `DIRECT_NEGATOR_COLLISION` | The direct source marks the tested combination ungrammatical because `未` already supplies the negative alternative. |
| optional material after `未` | `BOUNDED_SOURCE_SPECIFIC` | Direct sources attest selected particles, but no unrestricted final-particle slot is established here. |
| new or broadened identity | `NOT_AUTHORIZED` | The marked I072 core already has AA24; bare VP+未 requires separate adjudication. |

## Source-supported I072 core

Wong et al. define a `未` question as adding negative `未` ‘not yet’ to a declarative sentence to ask whether an event has taken place. Their exact example is:

```text
你食咗飯未呀？
nei5 sik6 zo2 faan6 mei6 aa3
Have you had your meal yet?
```

This differs from I072 only by the following `呀`. Huang et al. independently give:

```text
你食咗／過海南雞飯未？
```

and state that the most common scenario has perfective `咗` or experiential `過` before final `未`.

These sources establish:

1. overt event predicate before `未`;
2. overt perfective `咗` as a licensed inner marker;
3. object material between the aspect-marked verb and `未`;
4. a question concerning whether the event has occurred;
5. retained negative ‘not yet’ meaning at final `未`.

The source support is structural. It does not establish that every verb-object combination is semantically appropriate.

## Final `未` boundary

Huang et al. argue that final `未` is a negative marker rather than a polar interrogative or ordinary sentence-final particle. Their evidence includes:

- `未` retains ‘not yet’ meaning;
- it presents a negative alternative;
- their tested `冇 + VP + 未` combination is unacceptable;
- answers repeat the relevant predicate rather than using independent truth-based yes/no expressions;
- selected non-polar particles may follow `未`;
- the question can occur as an embedded interrogative.

The paper proposes an ellipsis/disjunction analysis related to A-not-A questions. Canto Span need not adopt that exact derivation to retain the observable facts. A theory-neutral representation should preserve:

```text
predicate + final negative 未 + interrogative force
```

without relabeling `未` as a generic SFP or inserting a repeated hidden VP into learner-facing output.

## Marked versus bare VP-Neg questions

Huang et al. directly contrast:

```text
你睇書未？
```

with the marked profile:

```text
你食咗／過海南雞飯未？
```

The article says `咗` or `過` is common, not obligatory. This is substantive evidence for a broader VP-Neg family that contains both bare and marked predicates.

The current identity design is narrower:

- AA24 owns visible completion/result/aspect marking plus final `未`;
- AA61 owns overt experiential `過…未`;
- AA24 explicitly excludes the bare-VP route.

The direct bare example creates an identity/composition question, not an automatic error in the current narrow identity. Possible later outcomes include:

1. retain AA24 and allocate/reuse a separate bare-VP-Neg identity;
2. represent bare VP-Neg through a broader parent composition while retaining marker-specific children;
3. supersede AA24's family framing while preserving its UUID for the overt-marker subtype;
4. take no runtime action if current parser evidence shows no actionable gap.

This packet does not choose among those outcomes.

## Experiential and completion separation

`V過…未` and `V咗…未` share a broader final-`未` question family but differ in overt aspect marking. The merged AA61 research package retains `過…未` as experiential and keeps completion `V咗／V完…未` separate.

`V完…未` likewise contains a visible completion constituent independently represented by the project. The outer final-`未` question must not absorb the internal completion or experiential identity.

## Negation and neighboring question boundaries

Keep outside the I072 subtype:

- preverbal `未 + VP` declarative negation;
- `仲未 + VP` and other negative-aspect profiles;
- `冇 + VP` perfective negation;
- the tested double-negative-like `冇 + VP + 未` collision;
- overt `V唔V` A-not-A questions;
- `係咪` copular questions;
- particle-only polar questions;
- tag questions such as final `好唔好`;
- lexical or directional readings of `過`;
- bare final `未` without a recoverable predicate;
- arbitrary punctuation-based question wrapping.

The proposed VP-Neg/A-not-A relation in the literature does not permit Canto Span to merge these visible constructions into one identity.

## Optional following particles

Wong et al. attest `未呀 aa3`. Huang et al. attest `未話 waa6` and `未先 sin1` with distinct information-seeking force. These data show that `未` need not be the final phonological item.

They do not establish one unrestricted `optional final particle` slot. Any runtime or identity specification should preserve separately typed following particles and their host/force constraints rather than treating every token after `未` as licensed.

## Repository consequence

AA24 is the correct existing owner for I072 because its canonical profile is explicitly `OvertCompletionOrAspectMarkerFinalMei`, with `食咗飯未` as a named positive. No identity or runtime repair is required to retain I072.

The new substantive consequence is the bare profile:

```text
VP + 未
```

Direct scholarship now supplies evidence that was absent from AA24's earlier narrow source set. Because AA24's accepted identity review explicitly quarantined bare VP+未, a later task must be an identity/composition review, not direct parser broadening.

## Terminal outcome

- I072: `AA24_SOURCE_ALIGNED_POSITIVE`.
- `V咗 + object + 未`: `DIRECTLY_SUPPORTED`.
- final `未`: `NEGATIVE_MARKER_WITH_INTERROGATIVE_COMPOSITION`.
- generic SFP analysis: `REJECTED_FOR_CORE_REPRESENTATION`.
- bare `VP + 未`: `DIRECTLY_SUPPORTED_BUT_OUTSIDE_CURRENT_AA24`.
- AA61 `V過…未`: `SEPARATE_MARKER_SPECIFIC_IDENTITY`.
- `V完…未`: `AA24_COMPLETION_SUBTYPE_WITH_INDEPENDENT_INNER_VP`.
- unrestricted following-particle slot: `NOT_ESTABLISHED`.
- AA24 broadening or new UUID: no decision.
- runtime/status/source change: no.

## Next separately claimed action

Open one bounded identity/composition audit for bare `VP + 未`. It should compare:

1. current AA24 overt-marker scope;
2. AA61 experiential scope;
3. the directly attested bare VP-Neg profile;
4. whether a theory-neutral broader parent is needed;
5. whether current parser output already composes the bare question without a new identity.

That audit must include exact positive and negative contrasts, especially bare VP, `V咗`, `V完`, `V過`, preverbal `未`, `冇 + VP`, and incomplete final-`未` strings. It must not broaden runtime in the decision package.

A separate parser-output audit may verify I072 surface fidelity, child preservation, object span, punctuation, and absence of duplicate question wrappers. That is implementation verification rather than further linguistic research.

## Protected-state confirmation

This packet changes no immutable source value, parser detector, runtime template, test, generated output, version, UUID, code, canonical name, linguistic status, readiness record, corpus classification, survey, panel result, held-out evidence, release, package, or deployment state.

It does not modify active AB33 or AA84 scopes.

## Source inventory

See `docs/research/ISSUE-647-FINAL-MEI-COMPLETION-SOURCE-INVENTORY-R1.md`.
