# ISSUE-641 等／完／先／好唔好 layered-request disposition R1

Parent issue: #641  
Work claim: #642  
Date: 2026-08-05

## Decision

Retain the Week 18 examples as transparent layered composition, not as one indivisible construction:

```text
I005  等陣，等我講完。
      [等陣 turn-management formula]
      + [permissive 等 + subject 我 + completion VP 講完]

I008  唔該等我講完先好唔好？
      [outer politeness material 唔該]
      + [permissive 等 + subject 我 + completion VP 講完]
      + [postverbal 先 priority]
      + [sentence-final 好唔好 tag]
```

Direct scholarship independently supports permissive `等 dang2` ‘let’, `V + 完` completion, postverbal `先` ‘first’, and sentence-final `好唔好` as a tag appended to a proposition. A recognized reference-grammar companion directly attests the close order:

```text
等我寫低個電話先。
Let me write down the telephone number.
```

This establishes the visible component order in I008. It does not establish one umbrella construction, and it does not force a fine-grained choice between `先` attaching narrowly to `講完` and attaching to the complete permissive request predicate.

Scholarly sources establish the final-tag layer. The specific request or addressee-acceptance force of `好唔好` in I008 is contextual, supported by the Glossika translation and lower-weight teaching attestations rather than generalized as the invariant meaning of the tag.

No immutable source, parser, runtime, identity, status, corpus, survey, or release change is authorized.

## Component dispositions

| Component/profile | Disposition | Reason |
|---|---|---|
| lexical `等` ‘wait; wait for’ | `SEPARATE_LEXICAL_PROFILE` | Direct research distinguishes it from permissive, causative, temporal, notice, and connective functions. |
| permissive `等 + NP + VP` ‘let NP VP’ | `SOURCE_SUPPORTED` | Lai directly analyzes permissive `dang2`; the grammar companion attests `等我寫低個電話先`. |
| causative `等 + NP + VP` | `SEPARATE_PROFILE` | Lai analyzes a causative function separately from the permissive function. |
| temporal, notice, or connective `等` | `SEPARATE_PROFILES` | Lai independently identifies these functions. |
| `等陣` | `LEXICAL_OR_FORMULAIC_TURN_UNIT` | I005 attests it as a turn-management unit; it is not the permissive structure. |
| `講完` | `WAN_MARKED_COMPLETION_VP` | Direct scholarly descriptions treat `完` as a postverbal completion/resultative particle. |
| `VP + 先` ‘do VP first’ | `POSTVERBAL_PRIORITY_PROFILE` | Zhou and Sybesma directly support postverbal priority and its order after VP material. |
| sentence-final `好唔好` | `SOURCE_SUPPORTED_TAG_LAYER` | Direct question research classifies it as a tag appended to a proposition and related to A-not-A. |
| request/acceptance force of final `好唔好` in I008 | `CONTEXTUALLY_ATTESTED` | The exact source translation and teaching attestations support this interpretation in context; scholarship reviewed here does not make it invariant. |
| predicate-internal `好唔好 + predicate` | `SEPARATE_A_NOT_A_PROFILE` | Property questions such as `好唔好食` are not automatically the same as a final proposition-level tag. |
| initial `唔該` | `SOURCE_VISIBLE_OUTER_POLITENESS_MATERIAL` | It is outside the requested proposition’s internal `等／完／先` structure. |
| full I008 string | `SUPPORTED_LAYERED_ORDER_WITH_CONTEXTUAL_REQUEST_FORCE` | The component structures and close order have independent support; the exact complete string remains source attestation. |
| one new umbrella construction | `NOT_JUSTIFIED` | No source defines the full string as one productive construction. |

## `等 dang2` boundary

Lai’s direct study identifies multiple Hong Kong Cantonese functions of `dang2`, including lexical ‘wait’, permissive ‘let’, causative ‘cause’, temporal, notice, and connective functions. This blocks any character-only or token-presence rule.

The permissive profile has the visible shape:

```text
等 + NP + VP
```

In I005 and I008, first-person `我` and the following event `講完` support the permissive reading:

```text
等我講完
let me finish speaking
```

The overt `我` is the subject of the following event. No hidden object is inserted.

A lexical-wait collision remains visible:

```text
等我             wait for me
等我講完         let me finish speaking
```

Permissive and causative uses may also share the superficial `等 + NP + VP` order. This packet records the distinction but does not propose a universal automatic disambiguation rule.

## `完 jyun4` completion layer

Direct sources identify `完` as a postverbal completion/resultative element:

```text
講 + 完
speak + finish
```

The current registry already has `WanMarkedCompletionVP` for the narrow `V + 完` core. I005 and I008 fit that visible constituent.

This evidence does not transfer to every completion marker, `晒`, outer perfective `咗`, final-`未` questions, unrestricted object omission, or unrestricted `V完咗O` ordering. No new completion identity is required.

## `先 sin1` priority layer

Zhou directly establishes postverbal `先` with ‘first’ or precedence meaning and distinguishes it from other functions. Sybesma supports placement after VP complement or object material. The close grammar-companion example directly supports:

```text
等 + NP + VP + 先
```

I008 therefore has the source-supported visible order:

```text
等 + 我 + 講完 + 先
```

The current sources establish order and priority meaning. They do not require one hidden attachment in which `先` modifies only `講完` or only the full permissive predicate. A future parser should preserve `先` as an outer priority layer over the visible requested event without erasing the lower completion and permissive structures.

Preverbal `先`, necessary-condition `只有…先…`, interrogative-final `先`, and elliptical formulae remain separate.

## Final `好唔好` layer

Huang, Her, and Kong identify `好唔好` as a tag typically appended to the end of a declarative sentence and categorize it within the A-not-A family. Wong et al. independently include `好唔好` in the Cantonese tag-question inventory.

I008 has the visible segmentation:

```text
[唔該等我講完先] [好唔好]？
```

The scholarly evidence licenses the proposition-level tag structure. Glossika’s translation and lower-weight contextual examples support interpreting the tag here as seeking the addressee’s acceptance of the request. That pragmatic interpretation is retained for this source context only.

The tag is formally A-not-A, but evidence is not transferred automatically to the registry’s generic `M4MarkedANotAInterrogative` identity. A proposition-final tag requires separate span and composition review. No dedicated permanent final-`好唔好` identity was found in the bounded registry inspection; this is a repository observation, not linguistic evidence.

## I005 disposition

```text
等陣，等我講完。
```

Terminal result: `SUPPORTED_LAYERED_TURN_MANAGEMENT_ATTESTATION`.

The comma separates formulaic `等陣` from permissive `等 + 我 + 講完`. Direct evidence supports the permissive profile and completion constituent. Glossika attests the exact turn-management sequence but does not establish frequency, register distribution, or one fixed construction.

## I008 disposition

```text
唔該等我講完先好唔好？
```

Terminal result: `SUPPORTED_LAYERED_ORDER_WITH_CONTEXTUAL_REQUEST_FORCE_AND_ATTACHMENT_LIMIT`.

Visible layers:

1. outer `唔該`;
2. permissive `等 + NP + VP`;
3. completion `講完`;
4. postverbal priority `先`;
5. final `好唔好` tag.

Independent sources support the components and a close `等 + NP + VP + 先` combination. Glossika attests the exact full string and its request translation. The unresolved issue is fine-grained `先` attachment, not the existence or order of the visible elements.

No direct source reviewed here establishes the complete string as one conventionalized turn-taking formula.

## Repository consequence

Existing narrowed homes already cover:

- `WanMarkedCompletionVP` for `V + 完`;
- `PostverbalSinPriorityClause` for an overt action VP followed by priority `先`.

The bounded registry audit found no dedicated current identity for permissive `等 + NP + VP` or proposition-final `好唔好`. The strongest next step is therefore a parser-output audit, not immediate implementation or an umbrella identity.

## Terminal outcome

- lexical `等` ‘wait’: `SUPPORTED_SEPARATE_PROFILE`.
- permissive `等 + NP + VP`: `SOURCE_SUPPORTED`.
- causative/temporal/notice/connective `等`: `SEPARATE`.
- `等陣`: `FORMULAIC_OR_LEXICAL_TURN_UNIT`.
- `講完`: `EXISTING_COMPLETION_CORE`.
- postverbal `先`: `SOURCE_SUPPORTED_PRIORITY_LAYER`.
- sentence-final `好唔好` structure: `SOURCE_SUPPORTED_TAG_LAYER`.
- request/acceptance force in I008: `CONTEXTUALLY_ATTESTED_ONLY`.
- I005: `SUPPORTED_LAYERED_TURN_MANAGEMENT_ATTESTATION`.
- I008: `SUPPORTED_LAYERED_ORDER_WITH_CONTEXTUAL_REQUEST_FORCE_AND_ATTACHMENT_LIMIT`.
- exact narrow attachment of `先`: `NOT_FORCED_BY_CURRENT_SOURCES`.
- one umbrella construction: `REJECTED`.
- new UUID: no decision in this packet.
- runtime/status/source change: no.

## Next separately claimed action

Open one bounded parser-output audit for I005 and I008. It should test whether current output preserves:

1. `等陣` separately from permissive `等`;
2. overt subject `我` inside the permissive event;
3. `講完` as a completion constituent;
4. `先` as an outer postverbal priority layer;
5. final `好唔好` as a tag over the requested proposition;
6. initial `唔該` outside that proposition;
7. punctuation and full surface fidelity.

Collision coverage should include lexical `等我`, causative and temporal `等`, preverbal `先`, property-question `好唔好食`, standalone `好唔好`, and malformed incomplete sequences.

If the parser lacks bounded representation for permissive `等` or final tags, open a separate identity/composition issue. Do not create an umbrella `TurnManagementRequest` merely to wrap the whole source string.

## Protected-state confirmation

This packet changes no immutable source value, parser detector, runtime template, test, generated output, version, UUID, code, canonical name, linguistic status, readiness record, corpus classification, survey, panel result, held-out evidence, release, package, or deployment state.

It does not modify the active AB33 question-repair or AA84 manner implementation scopes.

## Source inventory

See `docs/research/ISSUE-641-DANG-JYUN-SIN-HOU-M-HOU-SOURCE-INVENTORY-R1.md`.
