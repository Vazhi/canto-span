---
title: AA84 — Cantonese preverbal manner strategies and runtime reconciliation R1
status: primary_source_synthesis_complete
construction_uuid: 28bbdab0-a637-5842-b93a-a129c8a55d7b
construction_code: AA84
canonical_name: GamMarkedReduplicatedMannerVP
intake_issue: 265
work_claim: 303
reviewed_on: 2026-07-29
primary_source_ledger: docs/research/AA84-MANNER-PRIMARY-SOURCE-LEDGER-R1.tsv
---

# AA84 — Cantonese preverbal manner strategies and runtime reconciliation R1

## Executive finding

The earlier repository-only conclusion that AA84 should be retained unchanged was too
narrow and is withdrawn.

Primary Cantonese descriptions do not identify one manner construction defined by the
intersection:

```text
reduplicated property + gam2 + action VP
```

Instead, they distinguish at least three related preverbal manner strategies:

1. a **general manner or property phrase + `gam2` + VP** construction, in which the
   material before `gam2` need not be reduplicated;
2. a **reduplicated adjective or verb + `dei2` + VP** strategy, with independent
   attenuative and tone-change morphology;
3. a **bare reduplicated manner expression + VP** strategy, directly represented by
   `慢慢行` and broader conventional reduplicated adverbs.

The present AA84 identity captures a real surface subtype of the first strategy when a
reduplicated manner phrase happens to precede `gam2`, but the sources do not show that
reduplication is the defining licensor of the `gam2` construction. AA84 is therefore an
**intersectional subtype**, not yet a justified independent productive language
construction.

The runtime's bare fallback is also linguistically overbroad, but not because bare
reduplication is merely one lexical exception. Bare reduplicated manner adverbs are an
independently documented Cantonese strategy. The problem is that the runtime reduces a
morphophonological and lexical system to two written nodes with equal surfaces.

No UUID, identity, status, runtime, test, survey, release, or deployment change is made
in this findings pass.

## Research question

Is `AA84 GamMarkedReduplicatedMannerVP` independently justified as a construction
limited to:

```text
reduplicated property + overt 咁/噉 + action VP
```

and what is the correct disposition of the currently reachable bare reduplicated route
such as `慢慢行`?

## Current runtime and identity

The permanent identity currently requires:

```text
reduplicated property + overt 咁/噉 + action VP
```

The detector is broader:

- an overt-marker branch accepts two surface-identical stative/property nodes followed
  by `咁` or `噉` and then an action, movement, or VP node;
- a bare branch accepts the same repeated-property sequence directly before the VP;
- both emit legacy label `MannerAdverbialVP`.

This implementation makes four unsupported assumptions:

1. surface character equality diagnoses Cantonese reduplication;
2. reduplication is the defining property of the `gam2` manner construction;
3. overt `gam2`, `dei2`, and zero marking belong to one construction;
4. the same lexical and predicate compatibility applies to all repeated properties.

The primary sources contradict or leave unresolved all four assumptions.

## Primary source map

The full proposition ledger is:

`docs/research/AA84-MANNER-PRIMARY-SOURCE-LEDGER-R1.tsv`.

### Wong et al. 2022

The GACS chapter defines manner adverbs as preverbal VP modifiers and gives three
decisive examples:

```text
佢好大力咁踢我。
keoi5 hou2 daai6lik6 gam2 tek3 ngo5

佢偷偷地走咗。
keoi5 tau1tau1-dei2 zau2 zo2

慢慢行，唔好跑呀。
maan6-maan2 hang4, m4hou2 paau2 aa3
```

The accompanying description explicitly distinguishes:

- adjective + `gam2`;
- reduplicated adjective or verb + `dei2`;
- other lexical or bare manner adverbs.

This source therefore supplies direct evidence against treating the three forms as one
marker-optional construction.

### Corpus coding authorities

The CUHK Language Acquisition Laboratory and the TalkBank Yip/Matthews corpus both
classify:

- bare `maan6maan2` as a manner adverb; and
- `dei2`-marked reduplicated forms such as `gwaai1gwaai1dei2` or `ma4ma4dei2` as
  manner adverbs.

The CUHK coding inventory separately distinguishes intensity `gam3` from `gam2(joeng2)`.
This confirms that bare and `dei2` forms are established analysis categories and that
tonal/function distinctions cannot be recovered from the glyph `咁` alone.

### Chan 2008 and Lee 2012

The phonological literature analyzes Cantonese attenuative reduplication with a
canonical form such as:

```text
Base + RED + dei2
```

It documents:

- total segmental reduplication;
- high-rising tone on the second copy for many lexical items;
- speaker variation in tonal alternation;
- monosyllabic and more complex input patterns;
- evidence that the process can be productive, including some loanword bases;
- sparse corpus coverage and nontrivial lexical/morphological restrictions.

These findings have two parser consequences.

First, written equality is not a sufficient linguistic representation. The exact GACS
bare example is written `慢慢` but pronounced `maan6-maan2`, while the base adjective is
`maan6`. A detector that sees only identical characters misses the grammatical tone
contrast.

Second, `dei2` is not a disposable spelling variant of `gam2`. It participates in an
independently analyzed attenuative reduplication construction and must remain overt.

### Yip and Matthews 2017

Their reduplication chapter documents multiple patterns rather than one AA rule:

- monosyllabic adjective reduplication with changed tone and `dei2`;
- AABB adjective and adverb patterns;
- conventional expressive ABB and other lexical forms;
- bare reduplicated adverbs used before predicates.

They explicitly caution that creating new reduplicated forms can be “hit or miss”
because the processes are not entirely predictable. This supports a productive or
semi-productive research domain while requiring lexical and morphophonological
controls.

### Barrie 2009

Barrie analyzes a general preverbal `gam2` adverbial construction such as:

```text
hou2 hoi1sam1 gam2 sik6 je5
hou2 faai3 gam2 heoi3 do1leon4do1
```

The pre-`gam2` material is a degree/property phrase, not obligatorily a reduplicated
property. The handout also notes that some reduplicated adverbs can occur without
`gam2`, for example `hoi1hoi1sam1sam1`.

The theoretical analysis and some semantic judgements require further corroboration,
but the core distribution agrees with Wong et al.: `gam2` marking and reduplication are
separable dimensions.

## Three independently bounded strategies

### A. Manner phrase + `gam2` + VP

Conservative research profile:

```text
licensed manner/property phrase + gam2 + overt VP
```

Source-linked examples include:

```text
佢好大力咁踢我。
你細細聲咁講俾我聽啦。
佢慢慢噉食飯。
```

The first example contains no reduplication. The second contains a reduplicated
noun-like manner expression `細細聲`. The third contains bare adjective reduplication
inside the manner phrase. Their shared licensor is the preverbal `gam2` adverbial
relation, not reduplication alone.

The profile must distinguish:

- `gam2` adverbial or manner use;
- `gam3` degree use before properties, quantities, or relevant stative predicates;
- discourse or demonstrative `gam2(joeng2)`;
- written `咁`, which may represent either reading in Hong Kong orthography;
- exact `噉`, which makes the `gam2` reading explicit in some writing conventions.

Character identity is therefore insufficient. The parser needs a lexical reading and a
structural function, with spelling retained as observed.

### B. Reduplicated adjective/verb + `dei2` + VP

Conservative research profile:

```text
licensed reduplicated property or event-manner stem + overt dei2 + VP
```

Examples include:

```text
佢偷偷地走咗。
你乖乖地食飯先。
```

The broader attenuative morphology includes forms such as:

```text
苦苦哋
醉醉哋
慢慢哋
```

Not every attenuative adjective is automatically an event-manner adverb. The source
must establish whether the full `AA-dei2` phrase modifies a following VP, predicates a
property, or occurs in another syntactic environment.

Required dimensions include:

- base lexical category;
- monosyllabic versus disyllabic base;
- second-copy tone;
- optionality or presence of `dei2`;
- attenuative versus manner meaning;
- VP host compatibility;
- speaker variation.

### C. Bare reduplicated manner expression + VP

Conservative research profile:

```text
licensed bare reduplicated manner expression + VP
```

The exact bare profile is not limited to one accidental string. It is supported by:

```text
慢慢行，唔好跑呀。
```

and corpus coding that treats `maan6maan2` as an adverb of manner. Published grammar
also recognizes bare AABB adverbial forms and notes that some reduplicated adverbs can
occur without `gam2`.

The evidence therefore rejects the former “lexicalized `慢慢` only” conclusion.
However, it does not authorize:

```text
any two identical written property nodes + any action VP
```

The bare research domain may contain several subtypes:

- conventional monosyllabic AA forms with tone change, such as `慢慢`;
- AABB adverbs such as `求求其其` or `快快趣趣`;
- lexicalized or expressive forms;
- zero-marked counterparts of some `dei2` or `gam2` phrases;
- forms whose acceptability or meaning is lexeme-specific.

These subtypes require corpus and speaker review before one productive identity is
justified.

## Why current surface equality is not an adequate rule

### Tone is grammatically relevant

The written characters in `慢慢` are identical, but the documented manner example has
`maan6-maan2`. Cantonese reduplication may preserve or overwrite the second tone
according to lexical item, speaker group, and construction. A character-only matcher
cannot distinguish:

- true reduplication with changed tone;
- two homographic lexical tokens;
- quoted or metalinguistic repetition;
- repairs or hesitation;
- event iteration;
- expressive sound symbolism;
- classifier, temporal, or nominal reduplication.

### Reduplication is not one semantic operation

Cantonese reduplication can express attenuation, vividness, distributivity, frequency,
iteration, duration, manner, or lexicalized expressive meaning. These must not inherit
one `MannerAdverbialVP` label merely from repeated text.

### The host relation matters

A reduplicated expression is a manner adverb only when it modifies an independently
licensed predicate or VP. Predicative and nominal uses require separate analyses even
when the same reduplicated form occurs.

## Boundary matrix

| Surface/profile | Research disposition |
|---|---|
| `佢好大力咁踢我。` | General `MannerPhraseGam2VP`; disproves obligatory reduplication. |
| `你細細聲咁講俾我聽啦。` | `gam2` manner profile with a reduplicated complex manner phrase. |
| `佢慢慢噉食飯。` | Valid intersection of bare reduplicated manner phrase and `gam2` construction. |
| `慢慢行，唔好跑呀。` | Bare reduplicated manner profile; directly source linked. |
| `佢偷偷地走咗。` | `dei2`-marked reduplicated manner profile; not AA84. |
| `你乖乖地食飯先。` | `dei2`-marked profile with participant-oriented interpretation to be preserved. |
| `苦苦哋` without following VP | Attenuative property form; not automatically a manner VP. |
| `咁靚` / `咁多` with `gam3` | Degree profile; not the `gam2` manner construction. |
| discourse `噉就...` / `咁樣...` | Discourse or demonstrative profile; not automatically manner modification. |
| `日日做運動` | Temporal/frequency reduplication; not manner. |
| event `行行下` | Event-reduplication/durative profile; not manner. |
| classifier `個個學生` | Distributive nominal reduplication; not manner. |
| arbitrary written `AA + VP` | Not licensed without lexical, tonal, and structural evidence. |
| quoted or repaired repetition | Unusable or false positive unless context supports a manner relation. |

## Disposition of the permanent AA84 identity

### Retain unchanged

**Not supported.** The sources support the exact surface subtype, but they do not make
reduplication the defining boundary of the `gam2` construction. Keeping AA84 unchanged
as an independent productive language construction would encode an arbitrary
intersection and leave the broader source-supported `gam2` profile homeless.

### Broaden AA84 immediately to all `manner phrase + gam2 + VP`

**Not authorized in this findings issue.** This is the strongest identity candidate,
but it would change the permanent profile, runtime scope, name, tests, and collision
relationships. It requires a dedicated identity adjudication and comparison with any
existing general adverbial records.

### Internalize AA84 as a compatibility wrapper

**Plausible alternative.** If another current or future identity owns the general
`gam2` manner construction and independently typed reduplicated phrases, AA84 may be a
transparent parser aggregate rather than a direct linguistic construction.

### Recommended adjudication target

A later identity review should decide between:

1. retaining the AA84 UUID while renaming and broadening it to a source-aligned
   `MannerPhraseGam2VP`; or
2. migrating AA84 to a parser-representation wrapper and assigning the general `gam2`
   profile to another collision-checked identity.

The review must not simply add bare and `dei2` branches to AA84. Those strategies have
independent overt and morphophonological boundaries.

## Disposition of the bare runtime branch

The bare branch is not unsupported in principle. Its current implementation is
unsupported in scope.

The correct research disposition is:

- preserve bare reduplicated manner modification as an independent research profile;
- reject two-node written equality as sufficient licensing;
- require a reviewed lexical/morphological inventory or independently parsed
  reduplication structure;
- preserve changed tone and speaker variation where pronunciation data exist;
- preserve the full VP host and do not insert hidden `gam2` or `dei2`;
- keep bare, `dei2`, and `gam2` outcomes separately queryable.

Issue #305's central source question is therefore partly resolved: evidence extends
beyond one lexical `慢慢` exception to a broader conventional bare-reduplication domain.
Its corpus breadth, productive boundary, and negative inventory remain open.

## Runtime consequences for later implementation

A later accepted specification should not implement the existing issue #304 literally,
because #304 assumes AA84 remains unchanged and bare `慢慢` is only a lexical exception.
That specification is superseded by this source synthesis.

Any new implementation proposal must:

1. separate `gam2`, `dei2`, and bare routes;
2. identify `gam2` by reading and structure rather than glyph alone;
3. allow nonreduplicated manner phrases before `gam2` when independently licensed;
4. preserve reduplicated phrases as children rather than treating repeated text as the
   whole construction;
5. remove or quarantine generic written-surface equality;
6. keep tone-aware metadata where Jyutping or audio exists;
7. add negative tests for degree `gam3`, discourse `gam2`, temporal, classifier, event,
   predicative, quoted, and repair reduplication;
8. change no linguistic status merely because runtime coverage improves.

## Corpus and native-review packets required

### `gam2` packet

Include:

- unreduplicated adjective/property phrases;
- reduplicated simple and complex manner phrases;
- `咁` and `噉` spellings with resolved or unresolved readings;
- degree `gam3` false positives;
- discourse `gam2(joeng2)` false positives;
- VP-level versus participant/subject-oriented interpretations;
- predicate classes and object realization.

### `dei2` packet

Include:

- adjective and verb bases;
- monosyllabic and disyllabic bases;
- tone-preserving and tone-changing forms;
- manner versus property/attenuative uses;
- regional and speaker variation;
- forms with no following VP.

### bare-reduplication packet

Include:

- `慢慢` and additional AA manner candidates;
- AABB adverbs;
- lexicalized expressive forms;
- temporal, classifier, event, nominal, and repair controls;
- pronunciation where available;
- accepted, rejected, ambiguous, and unusable cases.

## Final decision

- General `manner phrase + gam2 + VP`: **primary-source supported research profile**.
- Reduplication as an obligatory part of that profile: **not supported**.
- Reduplicated + `dei2` manner strategy: **independently source supported**.
- Bare reduplicated manner strategy: **independently source supported beyond a single
  lexical exception, but not yet productively bounded**.
- Current AA84 identity: **source-attested intersection, but not justified unchanged as
  the independent family definition**.
- Current bare runtime fallback: **linguistically overbroad because it relies on written
  equality and ignores tone, lexical class, subtype, and host relation**.
- Hidden `gam2` or `dei2`: **prohibited**.
- New UUID or identity mutation: **not authorized here**.
- Runtime, tests, status, survey, release, and deployment: **unchanged in this findings
  issue**.
