# Bounded compositional noun-phrase subsystem

## Purpose

Build reusable NP structure instead of adding complete object strings or only the vocabulary needed by motivating examples.

This subsystem is parser infrastructure. Better NP assembly does not promote any aspect, valency, demonstrative, possessive, or coordination construction.

## Runtime states

| State | Meaning | May license evidence-gated consumers? |
|---|---|---:|
| `licensed_np` | Overt structure and required lexical compatibility are sufficiently analyzed. | Yes |
| `ambiguous_licensed_np` | The outer NP boundary is usable, but a documented internal attachment remains unresolved. | Only when the consumer does not depend on that attachment |
| `provisional_np_candidate` | The surface resembles an NP but is headless, unknown, incompatible, or not fully classified. | No |
| `invalid_or_incomplete_np` | No supported complete NP structure was built. | No |

Unknown-token recovery and pronunciation fallback never create a licensed NP.

## Implemented first slice

### Bare head

```text
N
```

A known overt noun head may form a licensed NP.

### Numeral–classifier–noun

```text
NUMERAL + CLASSIFIER + NOUN
```

The three overt slots are required. Headless numeral–classifier forms remain provisional. A classifier phrase is licensed only when the classifier and head noun share a reviewed lexical compatibility class.

### Demonstrative–classifier–noun

```text
DEMONSTRATIVE + CLASSIFIER + NOUN
```

The numeral-free overt-head form is implemented. Headless forms, unknown heads, and classifier-incompatible forms do not license downstream constructions. Demonstrative–numeral–classifier–noun remains outside this first slice.

### Simple associative NP

```text
MODIFIER + 嘅 + NOUN
```

The complete overt span is assembled as one NP. More complex recursive modification is not yet implemented.

### Binary coordination

```text
NP + 同/同埋 + NP
```

The current first slice supports simple overt conjuncts. Coordination is represented as paratactic NP coordination; it is not treated as a head-final noun phrase.

## Classifier compatibility

Compatibility is a lexical-semantic property, not a whitelist of complete phrases. Noun entries may carry reusable classes such as `book`, `person`, `liquid_measure`, `building_shop`, `animal`, `long_rigid`, or `vehicle`. Classifier rules select classes, not sentence strings.

The initial reviewed mappings include:

| Classifier | Licensed noun classes |
|---|---|
| `本` | book |
| `杯` | liquid measure |
| `間` | building/shop |
| `隻` | animal |
| `個` | person, general count |
| `位` | person |
| `支` | long rigid |
| `件` | clothing |
| `張` | flat object |
| `架` | vehicle |
| `部` | vehicle, machine/device |
| `碗` | bowl-measured food |

An unlisted classifier rule or a known noun without a recorded class remains provisional. This is deliberately conservative and does not claim a complete classifier grammar.

## Evidence-gated consumer boundary

A construction such as postverbal `咗` may consume only a licensed NP object:

```text
VERB + 咗 + LICENSED_NP
```

The NP subsystem determines the object boundary and structural licensing. It does not establish the verb’s aspectual reading, verb–object semantic compatibility, productivity, or linguistic status.

## Executable validation

The test matrix is [`../../tests/fixtures/np-subsystem.json`](../../tests/fixtures/np-subsystem.json), executed through the standard [`../../tests/run-all.js`](../../tests/run-all.js) command (`npm test`).

It includes:

- unseen combinations across multiple noun classes;
- valid classifier–head pairs;
- incompatible classifier–head pairs;
- headless and incomplete phrases;
- unknown nominal material;
- associative and coordinated NPs;
- positive and negative postverbal-`咗` integration.

Current result: **43/43 PASS**.

## Unresolved work

- explicitly represent both plausible attachments for `啲 A 嘅 N`;
- compose complex/nested conjuncts;
- extend classifier compatibility only through reviewed reusable lexical classes;
- preserve licensed NP objects through additional question and clause wrappers;
- connect the subsystem to other object-taking components without changing their linguistic status.
