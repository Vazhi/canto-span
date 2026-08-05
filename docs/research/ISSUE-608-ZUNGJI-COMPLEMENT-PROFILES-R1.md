# ISSUE-608 鍾意 complement-profile disposition R1

Parent issue: #608  
Work claim: #609  
Date: 2026-08-05

## Decision

Retain AB33 `ZungJiVPComplementClause` narrowly as:

```text
overt subject + 鍾意 + overt independently typed VP/activity complement
```

Do not reinterpret AB33 as a general semantic preference category or as every clause containing `鍾意`.

The source review establishes several adjacent profiles, but they require ordinary lexical composition or separately typed question, aspect, topic, ellipsis, alternative-choice, and scalar structure. No new UUID, status promotion, or runtime change is authorized by this packet.

## Why the narrow AB33 profile is supported

Multiple independent materials directly attest an overt subject followed by `鍾意` and a visible activity predicate:

- `我鍾意聽音樂`;
- `佢好鍾意食雪糕`;
- `狗仔鍾意食骨，貓仔鍾意食魚`;
- CUHK substitution sets covering `鍾意食咩`, `睇咩書`, `飲咩`, and `去邊間餐廳`;
- `我最鍾意食花生`.

The current source-linked runtime path is aligned with this core when it requires:

- an overt subject;
- lexical `鍾意`;
- an overt VP-like complement selected from independently parsed child structure.

This is the linguistically supported part of the current legacy `PreferenceVP` behavior.

## Profile dispositions

| Profile | Disposition | Reason |
|---|---|---|
| Overt subject + `鍾意` + overt activity VP | `RETAIN_AS_AB33` | Directly documented by independent grammar/teaching and published language-sample sources. |
| `鍾意 + NP` | `SUPPORTED_LEXICAL_TRANSITIVE_PROFILE_OUTSIDE_AB33` | Direct NP-object examples are abundant, including degree and perfective forms. An NP object is not a VP complement. |
| `鍾意 + full finite clause with independent subject` | `UNRESOLVED_NOT_IN_AB33` | No reviewed source establishes a general CP-complement profile. One CUHK event/proposition-like example does not settle complement size. |
| `唔鍾意 + overt NP/VP/event complement` | `SUPPORTED_POLARITY_COMPOSITION` | Overt-complement negation is directly attested; polarity should compose with the lexical predicate rather than define a separate broad preference identity. |
| `鍾唔鍾意 + NP/VP` | `SUPPORTED_A_NOT_A_COMPOSITION` | Yip and Matthews explicitly document first-syllable reduplication for multisyllabic `鍾意`; CUHK provides both NP and VP examples. Question force remains separate from AB33. |
| `鍾意咗 + NP` | `SUPPORTED_MAIN_VERB_ASPECT_PROFILE_OUTSIDE_AB33` | Direct academic example and inherited aspect contrast support perfective main-verb use. |
| aspect-marked `鍾意 + VP` | `RESTRICTED_AND_UNRESOLVED` | The inherited Luke-Nancarrow contrast rejects one complement-clause configuration, but does not establish a universal ban across all VP complements. |
| predicate-less `鍾意` in an answer or established topic chain | `DISCOURSE_ELLIPSIS_OR_FRAGMENT` | Directly attested only with recoverable discourse. It must not license a context-free AB33 node. |
| `鍾意 A 定／定係 B` | `PREFERENCE_PLUS_ALTERNATIVE_COMPOSITION` | Alternative marking supplies an independent relation; NP and VP alternatives occur. |
| `鍾意 A 定／定係 B 多啲` | `PREFERENCE_PLUS_ALTERNATIVE_PLUS_SCALAR_COMPOSITION` | `多啲` adds an overt comparative/scalar component and should remain separately represented. |
| higher modal/degree/topic material around `鍾意` | `OUTER_OR_SEPARATE_COMPOSITION` | Examples show `會`, `最`, `麻麻哋`, and topics outside the narrow predicate-complement relation. |

## Current runtime comparison

Canonical source inspected:

- `src/parser/detectors/modality/intention-preference.js`

### Source-aligned path

`sourceLinkedPreferenceVPFallback` requires an overt subject, exact `鍾意`, and a VP child drawn from typed parser structure. This is substantially aligned with AB33.

Remaining later-implementation questions include:

- whether every currently allowed VP subtype is independently supported;
- whether the narrow node should exclude the outer subject and preserve a separate clause wrapper;
- how negation and first-syllable A-not-A expose the same lexical relation without requiring the exact token `鍾意` at the current position;
- whether aspect and alternative-choice structure are preserved rather than swallowed.

### Unsupported broad path

`preferenceVPWrapCoreFallback` currently wraps any core containing `鍾意`.

No reviewed source supports this cross-product. It can potentially absorb:

- ordinary `鍾意 + NP`;
- A-not-A `鍾唔鍾意`;
- predicate-less discourse replies;
- topic-supported omission;
- aspect-marked main-verb use;
- alternative-choice and scalar sequences;
- higher modal or degree material;
- unknown or malformed surrounding material.

The broad fallback is therefore a parser convenience with zero independent linguistic-evidence weight. A later runtime issue should remove or sharply constrain it, but this research packet makes no code change.

## Current test comparison

Canonical test inspected:

- `tests/constructions/PreferenceVP.json`

The current positive `我鍾意聽音樂` is source-aligned with AB33.

The two existing negative cases do not close the required boundary inventory:

- `我聽音樂` confirms absence of the lexical preference head;
- `我唔鍾意` is predicate-less and discourse-dependent, but does not test the directly attested negative profile `唔鍾意 + overt complement`.

A later implementation test package should add, at minimum:

### Positive/retained AB33 cells

- overt subject + `鍾意` + intransitive/activity VP;
- overt subject + `鍾意` + object-bearing VP;
- transparent outer topic or degree material while preserving the narrow relation.

### Composition cells

- `唔鍾意 + overt VP`;
- `鍾唔鍾意 + overt VP`;
- NP-object preference excluded from AB33 but preserved as ordinary transitive structure;
- main-verb `鍾意咗 + NP` excluded from AB33 but preserved;
- alternative-choice and `多啲` preserved as separate structure.

### Boundary cells

- predicate-less `鍾意` without supplied discourse;
- full finite/clausal material not independently licensed;
- arbitrary material captured only by the broad token-presence fallback;
- fragments, repairs, and incomplete alternatives.

## Identity and ontology consequence

AB33 already names the narrow VP-complement profile. This packet does not reopen that accepted scope and does not allocate a general `PreferenceVP` identity.

Recommended ontology:

1. retain AB33 for the narrow overt VP-complement relation;
2. represent `鍾意 + NP` through ordinary lexical/transitive predicate structure unless later evidence identifies an independently useful construction;
3. compose negation and A-not-A through their own structures;
4. keep discourse omission under fragment/ellipsis analysis;
5. keep `定／定係` and `多啲` under alternative-choice and scalar structures;
6. leave full clausal complementation unresolved.

## Terminal outcome

- AB33 linguistic scope: `RETAIN_NARROWLY`.
- Broad legacy `PreferenceVP` token-presence fallback: `NOT_SOURCE_EQUIVALENT`.
- NP complement: `SUPPORTED_BUT_OUTSIDE_AB33`.
- VP/activity complement: `SUPPORTED_AB33_CORE`.
- Full clausal complement: `NOT_ESTABLISHED`.
- Negation: `SUPPORTED_COMPOSITION`.
- A-not-A: `SUPPORTED_COMPOSITION`.
- Aspect: `PROFILE_SENSITIVE`; main-verb NP use supported, universal VP-complement rule not established.
- Ellipsis/fragments: `DISCOURSE_DEPENDENT_ONLY`.
- Alternative/scalar profiles: `TRANSPARENT_COMPOSITION`.
- New UUID: no.
- Status promotion: no.
- Runtime change in this packet: no.

## Next separately claimed action

Open one Codex-eligible accepted-specification implementation only after this packet is merged. Its bounded outcome should:

1. retain the source-linked AB33 matcher;
2. remove or replace the broad any-`鍾意` fallback;
3. preserve NP preference, polarity, A-not-A, aspect, topic, ellipsis, alternatives, and scalar material through independently typed composition;
4. add the controlled test matrix above;
5. avoid identity or status changes.

## Protected-state confirmation

This research packet changes no runtime behavior, parser matcher, construction test, fixture, identity, code, linguistic status, corpus classification, survey, panel, held-out, release, package, or deployment state.

## Source inventory

See `docs/research/ISSUE-608-ZUNGJI-SOURCE-INVENTORY-R1.md`.
