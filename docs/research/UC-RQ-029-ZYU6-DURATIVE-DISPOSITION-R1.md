---
title: UC-RQ-029 — zyu6 durative disposition
research_id: UC-RQ-029
status: resolved_mixed_disposition
baseline_version: 0.5.214
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-029 — `zyu6` durative disposition

## Research decision

Do **not** promote a separate “resultant-state `V-zyu6`” construction. Direct
sources establish postverbal `住 zyu6` as a continuous/durative marker with
several construction-sensitive profiles already belonging to `DurativeVP`:

1. a maintained static state, including wearing or hanging;
2. a transitive continuous relation;
3. a dynamic action presented as subordinate or accompanying another event;
4. temporary persistence in an irrealis/directive `V住…先` environment.

The candidate therefore **merges into `DurativeVP` research with typed
subprofiles**. A result state can be one interpretation, but “resultant” is too
narrow for `陪住你`, `唱住首兒歌`, or `食住飯睇書`, while an unrestricted
`verb + 住` rule is too broad.

Full predicate licensing, argument structures, clause environments, and
lexicalized forms remain quarantined. This disposition does **not** authorize a
parser change or broader productive acceptance.

## Supported merged profiles

The checked sources support at least:

```text
V + zyu6 + object
    -> maintained/static continuous relation in a licensed lexical profile

subordinate/accompanying [V + zyu6 + object] + main predicate
    -> backgrounded action concurrent with the main event

irrealis/directive V + zyu6 + material + sin1
    -> temporary persistence before a later alternative/event
```

These are not freely interchangeable. Clause status and lexical/event structure
can change the acceptability of `住` versus `緊` with the same verb.

## Checked source findings

The source-verification ledger is:

`UC-RQ-029-ZYU6-DURATIVE-SOURCE-VERIFICATION-R1.tsv`

### Fan 2024

Fan's official journal full text classifies `住` as static continuous aspect and
`緊` as dynamic progressive aspect. It gives `牆上面有掛住兩幅畫嘅` and explains
`掛住畫` as a static continuing event. The paper states that both markers are
imperfective but that their central contrast is static versus dynamic.

The same paper directly shows construction sensitivity. In a main clause,
`唱緊首兒歌` and `食緊飯` are accepted while the corresponding `住` forms are
rejected. In subordinate profiles, however, `中意唱住首兒歌` and
`食住飯睇書` prefer `住` and reject `緊`; the latter action accompanies the main
event. Fan also reports irrealis `V住…先`, illustrated by temporary
`做住呢份牛工先`, as a setting in which much broader verb compatibility is
possible.

This evidence supports typed environments, not a universal static/dynamic
classifier or free acceptance with every verb.

### Kataoka 2018

Kataoka explicitly distinguishes progressive `緊` from continuous `住` using the
same written verb: `媽媽着緊好靚嘅衫` denotes the dressing event in progress,
whereas `媽媽着住好靚嘅衫` denotes the maintained wearing state. This minimal
contrast blocks merger with generic progressive aspect.

### Matthews and Yip 2011

The official CUHK grammar companion labels `住` continuous and gives
`我想以後成日陪住你` “from now on I want always to be with you.” This directly
supports a transitive continuous profile that is not naturally reduced to a prior
result event.

## Exact collision audit

The collision ledger is:

`UC-RQ-029-ZYU6-DURATIVE-COLLISION-AUDIT-R1.tsv`

### `DurativeVP`

The current family preserves overt `住` and already describes a continuing state.
Its frozen `戴住眼鏡` example represents the maintained-wearing profile. The
current `action_verb + 住 + object` shape, however, cannot distinguish maintained
state, transitive continuity, subordinate accompaniment, or irrealis persistence.
UC-RQ-029 therefore merges at the research level while retaining a required typed
split and lexical selection.

### `ProgressiveVP`

Kataoka and Fan directly contrast dynamic `V緊` with continuous/static `V住`.
Even when the verb and object are the same, the markers can select different
event construals. `住` must not be relabeled as generic progressive aspect.

### `LocativePostureVP`

The current posture family combines verbs such as `坐/企/瞓` with overt locative
`喺度`. It represents posture plus place, not postverbal `住` aspect. Posture and
continuous aspect may compose in larger strings, but the nodes are not merger
equivalents.

## Required lexical boundaries

The following must stay outside a generic aspect rule unless independently
disambiguated:

- residence verb `住` “live/reside”;
- lexicalized intention/assumption `諗住`;
- lexical `記住` “remember”;
- discourse/sequence `跟住` “then/next”;
- formula `對唔住` “sorry”;
- path marker `沿住` “along”;
- any lexical compound in which segmentation as productive `V + 住` is not
  independently justified.

## Quarantined boundaries

Future research must establish:

- a corpus-backed predicate/sense compatibility inventory;
- objectless, transitive, ditransitive, posture, and complement-taking profiles;
- stable result versus maintained activity versus relation/state;
- main, subordinate, accompanying, modal, future, and imperative distributions;
- exact requirements of `V住…先` and its implied later event;
- negation, aspect stacking, particles, duration phrases, and word order;
- contrasts with `緊`, `喺度`, `咗`, `開`, and lexical result complements;
- speaker, register, and regional variation.

## Provisional outcome

| Question | Current answer |
|---|---|
| Is postverbal `住` directly documented as continuous/static aspect? | **Yes.** |
| Is it distinct from dynamic progressive `緊`? | **Yes.** |
| Does it occur only with maintained result states? | **No.** |
| Are transitive and accompanying/subordinate profiles attested? | **Yes.** |
| Is irrealis temporary `V住…先` reported? | **Yes.** |
| Is unrestricted `V + 住` productivity established? | **No; quarantined.** |
| Does the candidate require a new construction? | **No; merge into typed `DurativeVP` research.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-029 is resolved as an independent backlog candidate. Remaining lexical,
argument-structure, and clause-environment questions belong to the existing
durative/continuous research family rather than a new resultant-state node.
