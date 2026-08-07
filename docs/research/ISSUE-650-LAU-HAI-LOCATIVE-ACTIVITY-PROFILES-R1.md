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

as a source-attested composition containing three independently visible components:

```text
我 | 留 | 喺屋企 | 睇電視
subject | stay/remain | at home | watch television
```

The strongest evidence-supported result is:

```text
LEXICAL_STAY + OVERT_LOCATION + FOLLOWING_ACTIVITY;
EVENT_LOCATION_AND_CIRCUMSTANCE_READINGS_COMPATIBLE;
EXACT_ATTACHMENT_NOT_UNIQUELY_ESTABLISHED
```

Direct research supports preverbal `喺 + place` as the location of a following action. A published Cantonese coding framework independently supports `喺 + place + VP` and a circumstance serial-verb profile in which the first predicate describes the circumstance under which the second action occurs. Lexical and contextual sources attest `留喺 + place` and close `留喺屋企 + activity` strings.

No inspected direct source analyzes the exact I078 string or selects one unique tree. The packet therefore does not decide whether:

1. `喺屋企` is selected primarily by lexical `留`;
2. `喺屋企` modifies the following `睇電視` event;
3. `留喺屋企` forms the circumstance under which `睇電視` occurs;
4. the location is shared by both predicates in a layered composition.

No hidden conjunction, progressive marker, purpose relation, or omitted argument is inserted. No parser, identity, status, source, corpus, survey, release, or deployment change is authorized.

## Terminal profile dispositions

| Profile | Disposition | Reason |
|---|---|---|
| lexical `留 lau4` ‘stay/remain’ | `LEXICALLY_SUPPORTED` | Dictionary evidence defines remaining in the same place without leaving. |
| `留 + 喺 + place` | `LEXICALLY_AND_CONTEXTUALLY_ATTESTED` | Dictionary examples and close attestations support the sequence. |
| `喺 + place + activity VP` | `DIRECTLY_SUPPORTED_EVENT_LOCATION_PROFILE` | Kwan and Wong et al. directly support preverbal `喺` PP as action location. |
| `留…睇電視` circumstance relation | `COMPATIBLE_WITH_DIRECT_CIRCUMSTANCE_SVC_PROFILE` | Wong et al. define a close first-predicate-as-circumstance relation, but do not analyze this exact intervening locative structure. |
| exact I078 attachment | `UNRESOLVED_LAYERED_ATTACHMENT` | Multiple source-compatible analyses preserve the same surface and interpretation. |
| one `留喺 + place + VP` construction | `NOT_JUSTIFIED` | No direct source establishes this as one independent productive construction. |
| AA80 ownership of semantic role | `REJECTED` | AA80 is an implementation wrapper that explicitly does not determine role or attachment. |
| parser/runtime change | `NOT_AUTHORIZED` | Research outcome requires later audit before any implementation decision. |

## Lexical `留`

Words.hk defines `留 lau4` as continuing to be active in the same place without leaving, with English glosses including ‘remain’, ‘stay’, and ‘reside’. Its examples include locative material after `留`, such as staying in a safe place.

Close contextual attestations include:

```text
禮拜六日我鍾意留喺屋企煲劇。
On weekends, I like staying home and watching a drama series for a long time.
```

and learner/pedagogical examples such as `留喺屋企休息`.

These sources support lexical identity and natural contextual combinations. They do not independently define a construction-level valency rule for every `留 + 喺 + NP + VP` sequence.

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

For I078, the contiguous substring:

```text
喺屋企睇電視
at home watch television
```

therefore fits an independently supported event-location order. This does not establish whether the PP attaches only to `睇電視`, because `留` precedes it and is itself compatible with a locative continuation.

## Static, event, and result-location boundaries

The following profiles must remain separate:

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

I078 visibly contains lexical `留` before the PP and therefore cannot be reduced to any one of these simpler profiles without preserving the extra predicate.

## `喺度` ambiguity boundary

Wong et al. and the existing repository sources distinguish:

```text
我喺度做功課。
```

which may mean either ‘I do my homework here’ or ‘I am doing my homework’, depending on context. This locative/progressive ambiguity is tied to `喺度`, not to every `喺 + lexical place` phrase.

I078 contains `喺屋企`, not `喺度`. No progressive aspect marker is inserted. The source English progressive wording describes the situation but is not evidence of an overt Cantonese progressive construction.

## Circumstance serial-verb compatibility

Wong et al. define circumstance SVCs as structures in which the first verb describes the circumstance under which the action denoted by the second verb takes place. Their example is:

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

The staying-at-home situation can be understood as the circumstance during which television watching occurs. However, the direct example has no intervening locative PP inside the first predicate and does not establish that every `stay + location + activity` sequence is a circumstance SVC.

The correct disposition is therefore compatibility with a documented semantic SVC subtype, not direct proof that I078 belongs to one fixed serial-verb construction.

## Attachment alternatives preserved

### Analysis A: lexical stay predicate plus following activity

```text
[留喺屋企] [睇電視]
[stay at home] [watch television]
```

The first predicate describes the circumstance of the second activity.

### Analysis B: stay predicate plus event-location activity phrase

```text
留 [喺屋企睇電視]
stay [watch television at home]
```

This reflects the independently supported `喺 + place + VP` substring but may require a specific relation between `留` and the following event.

### Analysis C: shared-location layered composition

```text
留 + [喺屋企] + 睇電視
```

The overt location is interpreted with both remaining and watching, without requiring exclusive syntactic attachment to either predicate.

Current direct evidence does not choose among these analyses. A parser may preserve the visible components and an unresolved attachment trace rather than inventing a unique hierarchy.

## Neighboring profiles excluded

Keep I078 separate from:

- motion-purpose chains such as `去超市買嘢`;
- goal/result locations after an action;
- posture SVCs such as `瞓住睇書`;
- progressive `喺度 + VP`;
- static `subject + 喺 + place` predication;
- overt conjunctions such as `同埋`, `而且`, or `然後`;
- covert purpose ‘stay in order to watch’ unless context independently supplies it;
- complement clauses selected by cognition or speech verbs;
- fragments that depend on a prior subject;
- lexical senses of `留` meaning leave behind, retain an object, reserve, detain, or leave a message.

## Repository consequence

Current AA80 `OvertPlaceExpressionWrapper` is a parser representation over several overt spatial environments. Its accepted profile explicitly says it does not determine whether the place expression is a subject, topic, adjunct, predicate, goal, result, or coda.

I078 confirms why that limitation matters. AA80 may preserve the `喺屋企` surface span, but it cannot serve as linguistic evidence for the event-location role or decide attachment to `留` versus `睇電視`.

No current permanent identity found in the bounded audit directly owns the complete lexical-stay + location + activity relation. This is a possible composition gap, not an instruction to allocate a UUID.

## Terminal outcome

- `留` stay/remain: `LEXICALLY_SUPPORTED`.
- `留喺 + place`: `CONTEXTUALLY_ATTESTED`.
- `喺 + place + VP`: `DIRECTLY_SUPPORTED_EVENT_LOCATION_PROFILE`.
- circumstance relation: `DIRECTLY_DOCUMENTED_CLOSE_PROFILE`.
- I078: `SUPPORTED_COMPONENTS_WITH_UNRESOLVED_ATTACHMENT`.
- exact circumstance-SVC classification: `COMPATIBLE_NOT_ESTABLISHED`.
- progressive analysis: `NOT_SUPPORTED_BY_OVERT_FORM`.
- purpose relation: `NOT_ESTABLISHED`.
- AA80 semantic-role transfer: `NOT_AUTHORIZED`.
- new UUID/runtime/status change: no.

## Next separately claimed action

Open one bounded parser-output audit for I078 and controlled contrasts. It should test whether current output preserves:

1. lexical `留` as an overt predicate;
2. the complete `喺屋企` place span;
3. `睇電視` as a following activity VP;
4. one overt subject without inserting a second subject;
5. no hidden conjunction, purpose marker, or progressive marker;
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
- lexical non-locative `留` examples.

A contextual corpus inventory should then collect `留喺 + place + activity` examples with full surrounding context. Only if the corpus and parser audit expose a stable relation not preserved compositionally should a separate identity/composition issue be opened.

## Protected-state confirmation

This packet changes no immutable source value, parser detector, runtime template, test, generated output, version, UUID, code, canonical name, linguistic status, readiness record, corpus classification, survey, panel result, held-out evidence, release, package, or deployment state.

It does not modify active AB33 or AA84 scopes.

## Source inventory

See `docs/research/ISSUE-650-LAU-HAI-LOCATIVE-ACTIVITY-SOURCE-INVENTORY-R1.md`.
