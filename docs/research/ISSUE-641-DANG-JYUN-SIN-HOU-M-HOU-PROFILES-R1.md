# ISSUE-641 等／完／先／好唔好 layered-request disposition R1

Parent issue: #641  
Work claim: #642  
Date: 2026-08-05

## Decision

Retain the Week 18 turn-management examples as layered composition, not as one indivisible construction:

```text
I005  等陣，等我講完。
      [wait-a-moment formula] + [permissive 等 + subject 我 + completion VP 講完]

I008  唔該等我講完先好唔好？
      [politeness formula 唔該]
      + [permissive 等 + subject 我 + completion VP 講完]
      + [postverbal 先 priority/first]
      + [sentence-final 好唔好 tag/request]
```

Direct scholarship independently supports permissive `等 dang2` ‘let’, `V + 完` completion, postverbal `先` ‘first’, and sentence-final `好唔好` as a tag question added after a clause. A recognized reference-grammar example directly combines `等 + first-person NP + VP + 先`:

```text
等我寫低個電話先。
Let me write down the telephone number.
```

The evidence therefore supports the visible layered order in I008. It does not establish a new single construction spanning all four components, nor does it force a fine-grained attachment choice between `先` scoping narrowly over `講完` and scoping over the complete permissive request predicate.

No immutable source, parser, runtime, identity, status, corpus, survey, or release change is authorized.

## Component dispositions

| Component/profile | Disposition | Reason |
|---|---|---|
| lexical `等` ‘wait; wait for’ | `SEPARATE_LEXICAL_PROFILE` | Direct research distinguishes it from grammaticalized permissive, causative, temporal, notice, and connective functions. |
| permissive `等 + NP + VP` ‘let NP VP’ | `SOURCE_SUPPORTED` | Lai directly analyzes permissive `dang2`; the reference grammar attests `等我寫低個電話先`. |
| causative `等 + NP + VP` ‘cause NP to VP’ | `SEPARATE_PROFILE` | Lai treats causative `dang2` separately from permissive `dang2`. Interpretation cannot be assigned from the token alone. |
| temporal or connective `等` | `SEPARATE_PROFILE` | Lai independently identifies temporal, notice, and subordinating functions. |
| `等陣` ‘wait a moment’ | `LEXICAL_OR_FORMULAIC_TURN-MANAGEMENT_UNIT` | I005 attests the formula; it is not the permissive `等 + NP + VP` structure. |
| `講完` | `WAN_MARKED_COMPLETION_VP` | Direct and reference-grammar evidence treats `完` as a postverbal completion/resultative particle. |
| `VP + 先` ‘do VP first’ | `POSTVERBAL_PRIORITY_PROFILE` | Zhou directly establishes postverbal `先` with precedence/priority meaning. |
| sentence-final `好唔好` | `TAG_QUESTION_OR_REQUEST_LAYER` | Scholarly question taxonomy identifies `好唔好` as a tag typically appended to a declarative sentence. |
| predicate-internal `好唔好 + predicate` | `SEPARATE_A_NOT_A_PROFILE` | Forms such as `好唔好食` ask about a property; they are not automatically the same as a clause-final request tag. |
| initial `唔該` | `OUTER_POLITENESS_FORMULA` | It modifies the speech act and is not an argument or child of `等`, `完`, or `先`. |
| full I008 string | `SOURCE_SUPPORTED_LAYERED_ORDER_ATTESTATION` | All visible component profiles and their order have close direct support; the exact complete string remains Glossika attestation. |
| new umbrella construction | `NOT_JUSTIFIED` | No source defines `唔該 + 等 + NP + V完 + 先 + 好唔好` as one productive construction. |

## `等 dang2` boundary

Lai’s direct study identifies multiple Hong Kong Cantonese functions of `dang2`:

1. lexical or derived verbal meanings connected to ‘wait’;
2. permissive ‘let’;
3. causative ‘cause’;
4. temporal ‘at/when’;
5. a notice particle for a coming event;
6. a subordinating conjunction associated with surprise.

This inventory blocks any parser rule based only on the written token `等`.

### Permissive profile

The permissive profile has the visible shape:

```text
等 + NP + VP
```

It commonly occurs in imperative or request contexts where the speaker asks that the NP be allowed to carry out the following event. In I005 and I008, first-person `我` and the turn-management context support the permissive reading:

```text
等我講完
let me finish speaking
```

The analysis preserves the overt embedded subject `我`; it does not insert a hidden object or reinterpret `我` as the object of lexical ‘wait for’.

### Lexical-wait collision

A surface sequence beginning with `等我` can also mean ‘wait for me’ when no following predicate selects `我` as its subject. The distinction requires structure and context:

```text
等我             wait for me
等我講完         let me finish speaking
```

A generic `等 + NP` or token-presence matcher would collapse these profiles.

### Causative and other collisions

Permissive and causative `等` share a superficial `等 + NP + VP` order. The sources treat them as distinct functions, so a parser cannot determine force merely from word order. Lexical semantics, animacy, speech-act context, and the following predicate may be relevant, but this packet does not define a universal disambiguation algorithm.

Temporal, notice, and connective uses also remain outside the permissive core.

## `完 jyun4` completion layer

Direct and reference-grammar sources identify `完` as a postverbal resultative/completive particle meaning completion or reaching the end of an event:

```text
講 + 完
speak + finish
```

The repository already has a narrowed current identity for this core, `WanMarkedCompletionVP`, defined as a lexical predicate followed by overt `完`, optionally with an object. I005 and I008 fit that existing core at the visible `講完` constituent.

This does not transfer evidence to:

- every resultative or completion marker;
- `晒`;
- outer perfective `咗`;
- final `未` questions;
- objectless completion without discourse;
- unrestricted `V完咗O` ordering.

No new completion identity is required.

## `先 sin1` priority layer

Zhou establishes that contemporary mainstream Cantonese predominantly uses postverbal `先` for ‘first’ and distinguishes temporal/priority and imperative-related functions. Sybesma and the accepted repository identity likewise preserve a bounded action-VP + postverbal `先` priority profile.

The relevant visible order is:

```text
VP + 先
```

When a verb has following complement or object material, `先` follows that material. The reference-grammar example `等我寫低個電話先` directly supports the larger order:

```text
等 + NP + VP + 先
```

I008 therefore supports:

```text
等 + 我 + 講完 + 先
```

### Attachment limit

The current sources establish order and a do-this-first/request-priority interpretation. They do not require one hidden tree in which `先` attaches exclusively to:

1. the lower completion predicate `講完`; or
2. the complete permissive predicate `等我講完`.

A future parser may preserve `先` as an outer postverbal priority layer over the visible requested event while retaining `講完` and permissive `等` as children. It must not erase either structure.

Preverbal `先`, necessary-condition `只有…先…`, interrogative-final `先`, and formulaic elliptical `先啦` profiles remain separate.

## Final `好唔好` layer

Huang, Her, and Kong identify `係唔係` and `好唔好` as tag questions typically added at the end of a declarative sentence and categorize them as a form of A-not-A question. Wong et al. likewise include `好唔好` in the Cantonese tag-question inventory.

In I008, `好唔好` follows an already overt requested proposition:

```text
[唔該等我講完先] [好唔好]？
```

Its function is to solicit the addressee’s acceptance or confirmation of the request. This is structurally and pragmatically different from property questions in which `好唔好` is predicate-internal, such as `好唔好食` ‘is it tasty?’.

The tag is visibly A-not-A in form, but this packet does not transfer the evidence of the repository’s generic `M4MarkedANotAInterrogative` identity automatically. That identity is defined around overt lexical-predicate repetition inside the interrogative constituent; a sentence-final tag appended to a complete proposition requires separate span and composition review.

No dedicated permanent `好唔好` tag identity was found in the bounded registry inspection. This absence is a repository observation, not linguistic evidence.

## I005 disposition

```text
等陣，等我講完。
```

Terminal result: `SUPPORTED_LAYERED_TURN_MANAGEMENT_ATTESTATION`.

The comma separates:

1. formulaic `等陣` ‘wait a moment’;
2. permissive `等 + 我 + 講完` ‘let me finish speaking’.

Direct evidence supports the permissive profile and completion constituent. Glossika attests the exact turn-management sequence. The packet does not claim that the whole string is a single construction or establish frequency, register distribution, or discourse naturalness across populations.

## I008 disposition

```text
唔該等我講完先好唔好？
```

Terminal result: `SUPPORTED_LAYERED_REQUEST_WITH_ATTACHMENT_LIMIT`.

Supported layers:

1. outer politeness `唔該`;
2. permissive `等 + NP + VP`;
3. completion `講完`;
4. postverbal priority `先`;
5. final `好唔好` tag/request.

The exact string is source attestation, while the component structures and close combination have independent support. The unresolved point is fine-grained `先` attachment, not the existence or order of the visible components.

No direct source reviewed here establishes that I008 is conventionalized as one fixed turn-taking formula. It may function conventionally in discourse, but that requires contextual conversation-corpus evidence rather than inference from its translation.

## Repository consequence

The current registry already has narrowed homes for:

- `WanMarkedCompletionVP` for `V + 完`;
- `PostverbalSinPriorityClause` for an overt action VP followed by priority `先`.

The general A-not-A family does not automatically own final `好唔好`, and no current identity found in the bounded audit specifically owns permissive `等 + NP + VP`.

The strongest later action is not an umbrella implementation. It is a parser audit that asks whether the current output preserves all five visible layers in I008. Any missing permissive-`等` or tag-question representation would then require a separately claimed identity/composition decision before implementation.

## Terminal outcome

- lexical `等` ‘wait’: `SUPPORTED_SEPARATE_PROFILE`.
- permissive `等 + NP + VP`: `SOURCE_SUPPORTED`.
- causative/temporal/notice/connective `等`: `SEPARATE`.
- `等陣`: `FORMULAIC_OR_LEXICAL_TURN_UNIT`.
- `講完`: `EXISTING_COMPLETION_CORE`.
- postverbal `先`: `SOURCE_SUPPORTED_PRIORITY_LAYER`.
- sentence-final `好唔好`: `SOURCE_SUPPORTED_TAG_LAYER`.
- I005: `SUPPORTED_LAYERED_TURN_MANAGEMENT_ATTESTATION`.
- I008: `SUPPORTED_LAYERED_REQUEST_WITH_ATTACHMENT_LIMIT`.
- exact narrow attachment of `先`: `NOT_FORCED_BY_CURRENT_SOURCES`.
- one umbrella construction: `REJECTED`.
- new UUID: no decision in this packet.
- runtime/status/source change: no.

## Next separately claimed action

Open one bounded parser-output audit for I005 and I008. It should test whether current output preserves:

1. `等陣` as separate from permissive `等`;
2. overt subject `我` inside the permissive event;
3. `講完` as a completion constituent;
4. `先` as an outer postverbal priority layer;
5. final `好唔好` as a tag over the requested proposition;
6. initial `唔該` outside the proposition;
7. punctuation and full surface fidelity.

The audit must include collisions for lexical `等我`, causative `等`, temporal `等`, preverbal `先`, property-question `好唔好食`, standalone `好唔好`, and malformed incomplete sequences.

If the parser lacks a bounded representation for permissive `等` or final tags, open a separate identity/composition issue. Do not add an umbrella `TurnManagementRequest` identity merely to make the full source string one node.

A contextual conversation-corpus task may separately test formulaicity, register, and turn-taking distribution. It is not required to retain the source-supported compositional analysis.

## Protected-state confirmation

This packet changes no immutable source value, parser detector, runtime template, test, generated output, version, UUID, code, canonical name, linguistic status, readiness record, corpus classification, survey, panel result, held-out evidence, release, package, or deployment state.

It does not modify the active AB33 question-repair or AA84 manner implementation scopes.

## Source inventory

See `docs/research/ISSUE-641-DANG-JYUN-SIN-HOU-M-HOU-SOURCE-INVENTORY-R1.md`.
