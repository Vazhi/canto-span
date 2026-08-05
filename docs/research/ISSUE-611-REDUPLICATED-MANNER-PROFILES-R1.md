# ISSUE-611 reduplicated-manner profile disposition R1

Parent issue: #611  
Work claim: #612  
Date: 2026-08-05

## Decision

Retain AA84 `GamMarkedReduplicatedMannerVP` narrowly for an overt marked manner relation:

```text
reduplicated manner expression + overt 咁／噉 + overt independently typed VP
```

Do not let the AA84 identity or evidence automatically cover bare `慢慢 + VP`, every repeated adjective/stative surface, `AA地`, bare AABB adverbs, verb reduplication, or speech repetition.

The legacy runtime label `MannerAdverbialVP` currently merges a defensible overt path with an unsupported generic bare fallback. That runtime–research mismatch should be repaired in a later separately claimed implementation without changing AA84's UUID or linguistic status.

## Profile dispositions

| Profile | Disposition | Reason |
|---|---|---|
| reduplicated manner expression + overt `咁／噉` + typed VP | `RETAIN_AS_AA84_CORE` | Independently attested in scholarly and pedagogical sources with event predicates, aspect-marked predicates, and object-bearing VPs. |
| exactly `AA + 咁／噉 + VP` | `SUPPORTED_SUBTYPE_NOT_COMPLETE_FORMULA` | `慢慢噉` is directly attested, but other sources show `AA地咁`, `大大力咁`, and `細細聲咁`; raw equality of two stative tokens is not the invariant. |
| `AA地 + VP` | `SUPPORTED_NEIGHBORING_ADVERBIAL_PROFILE` | Directly documented, but lacks overt `咁／噉` and also collides with attenuative property uses of `AA地`. It should not inherit AA84 automatically. |
| `AA地咁／噉 + VP` | `SUPPORTED_MARKED_VARIANT_REQUIRING_TYPED_MODIFIER` | Direct examples support the surface; a later implementation may treat `AA地` as the modifier constituent inside the overt marked relation. |
| bare `慢慢 + VP` | `SUPPORTED_LEXICAL_ADVERBIAL_OUTSIDE_AA84` | Modern lexical evidence directly attests it, but does not establish a productive rule over arbitrary repeated statives. |
| other bare `AA + VP` | `UNRESOLVED_NOT_PRODUCTIVE_BY_DEFAULT` | No source set establishes unrestricted lexical or predicate compatibility. Tone, prosody, lexicalization, and register remain unresolved. |
| bare AABB adverb + VP | `SUPPORTED_DISTINCT_REDUPLICATION_PROFILE` | Reference grammar examples are direct, but AABB morphology is distinct from the runtime's AA pair and should not be collapsed into AA84. |
| reduplicated adjective predication or `AA地` attenuation | `SEPARATE_PROPERTY_PREDICATION` | The reduplicated material describes a property or degree rather than manner of an event. |
| verb reduplication | `SEPARATE_ACTION_ASPECT_OR_ITERATION` | Repeated verbs are not automatically adjective-derived manner expressions. |
| time/frequency, sound-symbolic, planning, emphasis, or repair repetition | `SEPARATE_OR_CONTEXT_DEPENDENT` | Surface repetition alone does not establish morphological manner reduplication. |
| single `A + 咁／噉 + VP` | `OUTSIDE_AA84_UNLESS_SEPARATELY_LICENSED` | `咁／噉` is a broader adverbial marker; AA84 specifically preserves a reduplicated marked modifier profile. |

## Current runtime comparison

Canonical source inspected:

- `src/parser/detectors/manner/adjustment.js`

### Overt path

The current detector requires:

- optional outer subject based on a length heuristic;
- two adjacent nodes with identical surface strings;
- both nodes independently able to fill `stative_predicate`;
- optional overt `咁／噉`;
- one following action or VP node after wrapping.

The overt branch is directionally aligned with AA84 because it preserves `咁／噉` and a following predicate. However, it is simultaneously too narrow and too surface-driven:

- it cannot represent modifier constituents such as `傻傻哋`, `大大力`, or `細細聲` as typed wholes;
- it treats string equality plus stative slots as proof of reduplication;
- it does not encode tone/prosody or lexical constraints;
- its optional-subject decision is based on node count rather than transparent outer composition;
- it applies construction patterns to all remaining material and therefore requires careful boundary tests for time, coverb, coordination, and clause material.

### Bare path

When no `咁／噉` is present, the same detector accepts exactly two identical stative nodes followed by one action/VP node and emits the same `MannerAdverbialVP` label.

This path is not source-equivalent to AA84. The evidence establishes bare lexical `慢慢` and distinct AABB adverbs, not the generic rule:

```text
any stative A + identical A + any action predicate
```

The bare branch should therefore lose access to AA84 unless a future source-graded lexical or morphological profile is separately established.

## Current test comparison

Canonical test inspected:

- `tests/constructions/MannerAdverbialVP.json`

Current coverage contains:

- one source-linked positive snapshot: `佢慢慢噉食飯`;
- two very remote negative controls: an unmodified action and a stative predicate;
- one zero-evidence reachability probe: `佢慢慢行`.

This does not test the actual boundaries created by the runtime.

A later implementation package should add the following matrix.

### Positive AA84 cells

- `慢慢噉 + intransitive VP`;
- `慢慢噉 + object-bearing VP`;
- `慢慢噉 + aspect-marked typed VP`;
- `AA地咁／噉 + VP` where the modifier constituent is independently typed;
- complex documented modifier such as `細細聲咁 + speech VP` without flattening its internal structure;
- outer subject and temporal material kept outside the narrow AA84 node.

### Composition or separate-profile cells

- bare lexical `慢慢 + VP` preserved without AA84;
- bare AABB adverb preserved without AA84;
- `AA地 + VP` preserved without silently asserting overt `GamMarked` structure;
- single adjective + `咁／噉 + VP` preserved through a different adverbial relation if independently supported;
- complete inner directional, transitive, perfective, or coverb structure retained.

### Negative and collision cells

- adjective predication: `今日凍凍地`;
- attributive reduplication;
- verb reduplication;
- repeated time/frequency expression;
- onomatopoeia or sound-symbolic repetition;
- speech repair or fourfold planning repetition;
- two equal unknown/text nodes before a verb;
- nonidentical or partially overlapping modifier material;
- incomplete marked form without a following typed predicate;
- intervening clause or unrelated material between modifier and predicate;
- reverse or postverbal order not independently licensed as AA84.

## Span and composition contract

A future AA84 runtime node should:

1. begin at the independently typed reduplicated manner constituent;
2. include overt `咁／噉`;
3. include one independently typed following VP child;
4. preserve the modifier's internal morphology rather than converting every piece to identical `how` tokens;
5. keep subjects, topics, temporal frames, locations, coverb phrases, focus material, higher modality, quotation, coordination, and sentence-final particles outside unless a separate transparent wrapper owns them;
6. retain aspect, objects, directionals, and complements inside the typed VP child rather than rebuilding a generic predicate from leftover nodes;
7. reject fragments, repairs, and unknown material rather than filling gaps.

## Identity consequence

AA84 already has a canonical narrow name that identifies overt `咁／噉`. The source review supports retaining the UUID and name. It does not justify a split or a new general `MannerAdverbialVP` identity at this stage.

Potential future identity questions are reserved:

- whether lexical bare `慢慢` needs only a lexicon entry or an independently useful construction identity;
- whether `AA地 + VP` and bare AABB adverbs form one or more broader manner-reduplication identities;
- whether marked forms with complex modifier constituents require a family/profile refinement rather than a new UUID.

## Terminal outcome

- AA84 overt marked core: `RETAIN_NARROWLY`.
- Current overt runtime path: `PARTIALLY_ALIGNED_BUT_SURFACE_NARROW`.
- Current bare runtime path: `NOT_SOURCE_EQUIVALENT_REMOVE_FROM_AA84`.
- Bare `慢慢 + VP`: `ATTESTED_LEXICAL_ADVERBIAL`.
- Generic bare `AA + VP`: `NOT_ESTABLISHED`.
- Bare AABB adverbs: `ATTESTED_DISTINCT_PROFILE`.
- `AA地 + VP`: `ATTESTED_NEIGHBORING_PROFILE`.
- Generic token-equality rule: `REJECT_AS_EVIDENCE_INVARIANT`.
- New UUID: no.
- Status promotion: no.
- Runtime change in this packet: no.

## Next separately claimed action

After this research packet merges, create one Codex-eligible accepted-specification issue to:

1. reserve AA84 for overt `咁／噉` only;
2. replace raw token equality with an independently typed reduplicated-manner constituent;
3. remove the generic bare fallback from AA84;
4. preserve bare `慢慢`, AABB, and `AA地` forms without false AA84 assignment;
5. add the controlled matrix above;
6. regenerate runtime outputs and run relevant verification;
7. make no identity or status change.

## Protected-state confirmation

This packet changes no runtime behavior, parser matcher, test, fixture, identity, code, linguistic status, corpus classification, survey, panel, held-out, release, package, or deployment state.

## Source inventory

See `docs/research/ISSUE-611-REDUPLICATED-MANNER-SOURCE-INVENTORY-R1.md`.
