# ISSUE-650 留喺 locative-activity profile disposition R1

Parent issue: #650  
Work claim: #651  
Date: 2026-08-07

## Decision

Retain Week 18 I078:

```text
我留喺屋企睇電視。
ngo5 lau4 hai2 uk1 kei2 tai2 din6 si6.
```

as a source-attested composition with three independently visible components:

```text
我 | 留 | 喺屋企 | 睇電視
subject | stay/remain | at home | watch television
```

Terminal result:

```text
LEXICAL_STAY + OVERT_LOCATION + FOLLOWING_ACTIVITY;
EVENT_LOCATION_AND_CIRCUMSTANCE_READINGS_COMPATIBLE;
EXACT_ATTACHMENT_NOT_UNIQUELY_ESTABLISHED
```

Direct research supports preverbal `喺 + place` as the location of a following action. A published Cantonese coding framework independently supports `喺 + place + VP` and a circumstance serial-verb profile in which a first predicate describes the circumstance under which a second action occurs. Lexical and contextual sources attest bare `留喺屋企 + activity` strings.

No inspected direct source analyzes the exact I078 string or selects one unique tree. The evidence leaves open whether:

1. `留喺屋企` forms a stay-at-home predicate followed by the activity `睇電視`;
2. `喺屋企` has event-location scope over `睇電視` while remaining semantically compatible with `留`;
3. the overt location is shared by the stay situation and the watching event in a layered composition.

The packet does **not** analyze lexical `留` as selecting the entire constituent `喺屋企睇電視`; no inspected source licenses that complement structure.

No hidden conjunction, progressive marker, purpose relation, or omitted argument is inserted. No parser, identity, status, source, corpus, survey, release, or deployment change is authorized.

## Terminal profile dispositions

| Profile | Disposition | Reason |
|---|---|---|
| lexical `留 lau4` ‘stay/remain’ | `LEXICALLY_SUPPORTED` | Dictionary evidence establishes the lexeme, reading, and stay/remain sense. |
| bare `留 + 喺 + place + activity` | `CONTEXTUALLY_ATTESTED` | Words.hk and Glossika provide close or exact surface attestations. |
| `喺 + place + activity VP` | `DIRECTLY_SUPPORTED_EVENT_LOCATION_PROFILE` | Kwan and Wong et al. directly support preverbal `喺` PP as action location. |
| `留…睇電視` circumstance relation | `COMPATIBLE_WITH_DIRECT_CIRCUMSTANCE_SVC_PROFILE` | Wong et al. define a close first-predicate-as-circumstance relation but do not analyze this exact intervening locative structure. |
| exact I078 attachment | `UNRESOLVED_LAYERED_ATTACHMENT` | More than one source-compatible scope relation preserves the surface and interpretation. |
| lexical `留` selecting `喺屋企睇電視` | `NOT_SUPPORTED` | No inspected source establishes that clausal/complement structure. |
| one `留喺 + place + VP` construction | `NOT_JUSTIFIED` | No direct source establishes one independent productive construction. |
| AA80 ownership of semantic role | `REJECTED` | AA80 is an implementation wrapper that explicitly does not determine role or attachment. |
| parser/runtime change | `NOT_AUTHORIZED` | Research outcome requires a later audit before implementation decisions. |

## Lexical `留`

Words.hk defines `留 lau4` as continuing to be in the same place without leaving, with English glosses including ‘remain’, ‘stay’, and ‘reside’. This supports the lexical identity and stay/remain meaning.

The entry’s cited locative example contains `留低`, not bare `留`, so it is not used to establish the syntax of bare `留 + 喺`.

Bare `留喺 + place + activity` is instead supported as contextual attestation by examples including:

```text
禮拜六日我鍾意留喺屋企煲劇。
On weekends, I like staying home and watching drama series for a long time.
```

and the exact Glossika I078 string.

These attestations establish occurrence and interpretation, not a general construction-level valency rule.

## Preverbal `喺 + place` event location

Kwan directly contrasts Cantonese locative PP placement:

```text
[PP V]  我 喺 屋企 食 早餐
        I at home eat breakfast
        ‘I have breakfast at home.’
```

The article states that a preverbal locative PP indicates the location of the action, while a postverbal locative PP may indicate the participant’s resulting location after the action.

Wong et al. independently define a `喺` construction in which the `喺` PP may be followed by a VP or appear alone:

```text
佢喺泳池游水。
S/he swims at the swimming pool.

佢喺泳池。
S/he is at the swimming pool.
```

The contiguous I078 substring:

```text
喺屋企睇電視
at home watch television
```

therefore fits an independently supported event-location order. This supports event-location scope over the watching event, but does not prove exclusive syntactic attachment because lexical `留` precedes the PP and the exact complete sentence has not been directly analyzed.

## Static, event, and result-location boundaries

Keep the following profiles separate:

```text
我喺屋企。
I am at home.
```

Static locative predication contains no following activity VP.

```text
我喺屋企睇電視。
I watch television at home.
```

Preverbal event location places the action at home.

```text
佢掉咗本書喺地下。
S/he threw the book onto the floor.
```

Postverbal `喺` can encode a resulting or participant location. It must not inherit the same role merely because `喺` is present.

I078 contains lexical `留` before the PP and cannot be reduced to any of these simpler profiles without preserving that predicate.

## `喺度` ambiguity boundary

Wong et al. and the existing repository sources distinguish:

```text
我喺度做功課。
```

which may mean either ‘I do my homework here’ or ‘I am doing my homework’, depending on context. This locative/progressive ambiguity is tied to `喺度`, not every `喺 + lexical place` phrase.

I078 contains `喺屋企`, not `喺度`. No progressive aspect marker is inserted. The progressive English translation describes the situation but is not evidence of an overt Cantonese progressive construction.

## Circumstance serial-verb compatibility

Wong et al. define circumstance SVCs as structures in which the first verb describes the circumstance under which the action denoted by the second verb takes place:

```text
搭地鐵 睇書
ride subway read book
‘read while taking the subway’
```

I078 is semantically compatible with this relation:

```text
留喺屋企 | 睇電視
stay at home | watch television
```

The staying-at-home situation may describe the circumstance during which watching occurs. The direct example, however, lacks an intervening `喺 + place` phrase inside its first predicate. It does not establish that every `stay + location + activity` sequence is a circumstance SVC.

The correct disposition is compatibility with a documented relation, not direct classification of I078 as one fixed serial-verb construction.

## Source-supported attachment space

### Stay predicate followed by activity

```text
[留喺屋企] [睇電視]
[stay at home] [watch television]
```

This is compatible with the close circumstance relation and the exact contextual translation.

### Event-location scope inside a layered sequence

```text
留 + [喺屋企] + [睇電視]
```

The PP has independently supported event-location scope over `睇電視`, while the full sequence still preserves lexical `留` and does not decide an exclusive constituent boundary.

### Shared-location interpretation

The overt place may be interpreted with both the stay situation and the watching event. This is a semantic scope possibility, not a claim that one hidden syntactic node or deleted marker exists.

Current evidence does not choose one hierarchy. A parser may preserve the overt components and unresolved attachment rather than inventing a clausal complement after `留`.

## Neighboring profiles excluded

Keep I078 separate from:

- motion-purpose chains such as `去超市買嘢`;
- goal/result locations after an action;
- posture SVCs such as `瞓住睇書`;
- progressive `喺度 + VP`;
- static `subject + 喺 + place` predication;
- overt conjunctions such as `同埋`, `而且`, or `然後`;
- covert purpose ‘stay in order to watch’ unless context supplies it;
- complement clauses selected by cognition or speech verbs;
- fragments requiring a prior subject;
- non-locative lexical senses of `留` such as leave behind, retain an object, reserve, detain, or leave a message.

## Repository consequence

AA80 `OvertPlaceExpressionWrapper` is a parser representation over several overt spatial environments. Its accepted profile explicitly does not determine whether a place expression is a subject, topic, adjunct, predicate, goal, result, or coda.

AA80 may preserve the `喺屋企` surface span, but it cannot serve as linguistic evidence for event-location role or decide attachment to `留` versus `睇電視`.

No current permanent identity found in the bounded audit directly owns the complete stay + location + activity relation. This is a possible composition gap, not an instruction to allocate a UUID.

## Terminal outcome

- `留` stay/remain: `LEXICALLY_SUPPORTED`.
- bare `留喺 + place + activity`: `CONTEXTUALLY_ATTESTED`.
- `喺 + place + VP`: `DIRECTLY_SUPPORTED_EVENT_LOCATION_PROFILE`.
- circumstance relation: `DIRECTLY_DOCUMENTED_CLOSE_PROFILE`.
- I078: `SUPPORTED_COMPONENTS_WITH_UNRESOLVED_ATTACHMENT`.
- exact circumstance-SVC classification: `COMPATIBLE_NOT_ESTABLISHED`.
- `留` selecting a locative activity clause: `NOT_SUPPORTED`.
- progressive analysis: `NOT_SUPPORTED_BY_OVERT_FORM`.
- purpose relation: `NOT_ESTABLISHED`.
- AA80 semantic-role transfer: `NOT_AUTHORIZED`.
- new UUID/runtime/status change: no.

## Next separately claimed action

Open one bounded parser-output audit for I078 and controlled contrasts. It should preserve:

1. lexical `留` as an overt predicate;
2. the complete `喺屋企` place span;
3. `睇電視` as a following activity VP;
4. one overt subject without inserting a second subject;
5. no hidden conjunction, purpose marker, progressive marker, or selected clausal complement;
6. AA80 only as a role-neutral compatibility wrapper, if it appears;
7. punctuation and full surface fidelity.

Contrast set:

- `我留喺屋企。`
- `我喺屋企睇電視。`
- `我留喺屋企睇電視。`
- `我喺度睇電視。`
- a postverbal result-location example;
- a motion-purpose example;
- a posture SVC example;
- non-locative lexical `留` examples.

A contextual corpus inventory should collect `留喺 + place + activity` examples with full surrounding context. Only if corpus and parser evidence expose a stable relation not preserved compositionally should a separate identity/composition issue be opened.

## Protected-state confirmation

This packet changes no immutable source value, parser detector, runtime template, test, generated output, version, UUID, code, canonical name, linguistic status, readiness record, corpus classification, survey, panel result, held-out evidence, release, package, or deployment state.

It does not modify active AB33 or AA84 scopes.

## Source inventory

See `docs/research/ISSUE-650-LAU-HAI-LOCATIVE-ACTIVITY-SOURCE-INVENTORY-R1.md`.
