# ISSUE-626 返嚟 directional profile disposition R1

Parent issue: #626  
Work claim: #627  
Date: 2026-08-05

## Decision

Retain a narrow source-supported Cantonese compound directional:

```text
返 + 嚟
return + toward the speaker
```

Direct evidence also supports agentive motion with the order:

```text
co-event verb + theme object + 返嚟 + optional locative
```

However, the exact Week 18 sequence `買嘢返嚟` remains structurally and interpretively underdetermined. The reviewed sources establish neither its mover nor its event attachment. Possible goods-motion, subject-return, or multi-event analyses are hypotheses for later contextual testing, not source-derived findings.

No runtime, identity, code, status, corpus, survey, or release change is authorized.

## Profile dispositions

| Profile | Disposition | Reason |
|---|---|---|
| independent `返嚟` motion predicate | `SOURCE_SUPPORTED_SEPARATE_PROFILE` | `返` and `嚟` may form a return-plus-deictic motion predicate. |
| self-agentive `manner V + 返嚟` | `SOURCE_SUPPORTED` | Yiu directly analyzes the subject as moving theme in examples such as swimming back toward the speaker. |
| agentive `V + theme object + 返嚟` | `SOURCE_SUPPORTED_NARROWLY` | Yiu gives `還咗本書返嚟/去`, with the object before the compound directional. |
| `V + theme object + 返嚟 + locative` | `SOURCE_SUPPORTED_OPTIONAL_LOCATIVE_PROFILE` | The cited agentive example permits an optional destination after the directional. |
| exact `買嘢返嚟` mover and attachment | `ATTACHMENT_NOT_ESTABLISHED_BY_CURRENT_SOURCES` | Glossika attests the string and its order is compatible with the general directional profile, but the reviewed sources do not establish whether the goods move, the subject returns, or another event structure applies. |
| `返去` | `SOURCE_SUPPORTED_DEICTIC_CONTRAST` | It encodes return plus movement away from the speaker. |
| `返過嚟`, `返上嚟`, other three-part directionals | `SEPARATE_DIRECTIONAL_PROFILES` | Additional path material changes the overt directional structure and object-placement boundaries. |
| nonspatial/restorative/evaluative `返` | `SEPARATE_GRAMMATICALIZED_PROFILES` | Chor directly documents development beyond literal direction. |
| final `啦` | `OUTER_CLAUSE_MATERIAL` | The Week 18 source attests it, but no source makes it part of `返嚟`. |
| preceding `幫你` benefactive phrase | `SEPARATE_PROFILE_OWNED_BY_PR624_RESEARCH` | Benefactive attachment is not part of this claim. |

## Directional semantics

### `返`

In the directional core, `返` expresses movement back toward a prior or original location. It therefore adds a return relation rather than merely indicating generic motion.

This core must not absorb every `返`. Direct research also documents resumptive, restorative, evaluative, and interactional developments. Those uses require their own lexical or constructional analysis.

### `嚟`

The direct source claim is speaker-oriented: `嚟` contributes direction toward the speaker, while an overt locative may identify the speaker's location more precisely. A parser may preserve this deictic relation without inventing real-world coordinates. This packet does not establish reported-discourse, narrative-perspective, or other shifted deictic centers; those possibilities require separate direct evidence.

### Combined `返嚟`

The compound preserves both relations:

```text
RETURN + TOWARD-SPEAKER
```

`返去` preserves the return relation but reverses the deictic orientation:

```text
RETURN + AWAY-FROM-SPEAKER
```

Neither compound should be reduced to a generic motion or aspect marker.

## Agent and theme boundary

Yiu distinguishes two event types.

### Self-agentive motion

The subject is the moving theme:

```text
subject + manner/action motion + 返嚟
```

The directional describes the subject’s path.

### Agentive or caused motion

The subject acts on a theme object:

```text
agent subject + co-event verb + theme object + 返嚟
```

The directional describes the theme object’s change of location. The close source example uses `還` and an overt book object.

A parser cannot choose between these event types merely from the characters `返嚟`. It needs a typed predicate, overt arguments, and compatible lexical semantics.

## `買嘢返嚟` attachment status

The string is attested in the Week 18 learner source and matches a documented object-before-directional order. The reviewed sources do not establish its mover or event attachment.

The following are candidate hypotheses for later corpus or panel testing only; none is a positive finding of this packet:

1. the purchased goods are the moving theme;
2. the subject purchases the goods and then returns;
3. the sequence receives an underspecified multi-event interpretation.

No claim is made here that any candidate is natural, conventional, productive, or uniquely available. The repository must preserve the visible sequence and defer hidden-role or hidden-event assignment.

## Object, aspect, and locative boundaries

Directly supported close order:

```text
V-咗 + theme object + 返嚟/返去 + optional locative
```

This supports:

- theme object before the compound directional;
- perfective marking on the co-event verb in the cited profile;
- optional following destination material.

It does not authorize:

- every object type;
- every aspect marker or scope;
- split placement of arbitrary objects inside `返嚟`;
- unrestricted post-directional NPs;
- automatic caused-motion readings for nonmotion verbs.

## Orthographic boundary

The direct Yiu source writes directional `faan1` as `翻`, while the project and common modern usage may write `返`. Preserve exact source forms in evidence records, but treat orthographic variation separately from construction identity.

No parser route should:

- infer direction from either character alone;
- merge every `返/翻` occurrence;
- allocate separate constructions solely from spelling.

## Collision inventory

Keep outside the narrow `返嚟` directional unless independently typed:

- lexicalized words and names;
- nonspatial `返` particles;
- independent `返` or `嚟` without the compound relation;
- `返上嚟`, `返過嚟`, and other larger directionals;
- potential directionals such as `攞唔返嚟`;
- resultatives and metaphorical path extensions;
- coordination or serial events with an overt linker;
- fragments, repairs, quotations, embedded clauses, and interruptions;
- final particles and outer discourse relations;
- the preceding benefactive `幫你` relation.

## Repository comparison

The current ontology already separates several neighboring records:

- AA27 `ReturnUpDeicticDirectionalVP`: narrowly `返上嚟/返上去`;
- AA47 `MannerMotionDirectionalWrapper`: heterogeneous parser aggregate;
- AA49 `IndependentMotionPredicateVP`: independent motion predicates;
- retired AA48 `DirectionalCausedMotionVP`.

The Week 18 string does not automatically belong to any of them. In particular:

- AA27 is structurally narrower and includes overt `上`;
- AA47 is not a single settled linguistic construction;
- AA49 excludes postverbal directional complements;
- retirement of AA48 prevents name-based revival without fresh identity adjudication.

## Identity consequence

The sources establish general directional grammar but do not settle the correct Canto Span owner for `V + object + 返嚟`.

A later expert adjudication may consider:

1. a source-bounded caused-motion directional identity;
2. composition from a typed event predicate, theme object, and general directional complex;
3. separate self-agentive and agentive profiles under one family.

No UUID, canonical name, family assignment, or lifecycle change is made here.

## Terminal outcome

- `返` directional return relation: `SOURCE_SUPPORTED`.
- `嚟` toward-speaker deictic relation: `SOURCE_SUPPORTED`.
- compound `返嚟`: `SOURCE_SUPPORTED`.
- `返去` contrast: `SOURCE_SUPPORTED`.
- agentive `V + object + 返嚟`: `SOURCE_SUPPORTED_NARROWLY`.
- self-agentive `V + 返嚟`: `SOURCE_SUPPORTED_NARROWLY`.
- exact `買嘢返嚟` attachment: `ATTACHMENT_NOT_ESTABLISHED_BY_CURRENT_SOURCES`.
- purchased goods as mover: `HYPOTHESIS_ONLY_NOT_ESTABLISHED`.
- subject as mover: `HYPOTHESIS_ONLY_NOT_ESTABLISHED`.
- underspecified multi-event analysis: `HYPOTHESIS_ONLY_NOT_ESTABLISHED`.
- shifted or narrative deictic center: `NOT_ESTABLISHED_BY_THIS_PACKET`.
- generic aspect analysis: `REJECTED`.
- nonspatial `返` merger: `REJECTED`.
- AA27/AA47/AA49 identity transfer: `NOT_AUTHORIZED`.
- revival of retired AA48: `NOT_AUTHORIZED`.
- new UUID: no.
- runtime/status change: no.

## Next separately claimed action

The next method should be a contextual Cantonese corpus inventory for sequences matching:

```text
買 + object + 返嚟/返去
acquisition verb + object + return directional
```

Each hit must retain preceding destination/source context, the later discourse, the apparent mover, and whether an overt transport verb is present. Raw counts are insufficient.

If reviewed corpus contexts still leave the mover or event decomposition unresolved, a blinded role-neutral interpretation task may test the candidate hypotheses:

- goods brought back;
- subject returns after purchase;
- more than one interpretation available;
- context required or another analysis.

Only after that evidence should construction-identity adjudication or an implementation specification proceed.

## Protected-state confirmation

This packet changes no parser detector, runtime template, test, fixture, generated output, version, UUID, code, canonical name, status, readiness record, corpus classification, survey, panel result, held-out evidence, release, package, or deployment state.

It does not modify Codex PR #625 or the `幫` research in PR #624.

## Source inventory

See `docs/research/ISSUE-626-FAAN-LAI-DIRECTIONAL-SOURCE-INVENTORY-R1.md`.
