# Issue 753 — AB35 lexical V–O compound implementation matrix R1

Date: 2026-08-10  
Recommended canonical identity: AB35 `VerbObjectCompound`  
Purpose: later runtime implementation specification; **not executable evidence in this task**

## Reading the matrix

- **Source core** means the lexical-compound identity is independently supported by the merged #744 research.
- **Implementation composition** means a later parser test may verify structural nesting; the generated containing sentence itself has linguistic evidence weight 0 unless separately sourced.
- **Boundary** means “must not receive the narrowed AB35 identity under current evidence,” not “ungrammatical.”
- **Unresolved** means preserve uncertainty rather than force AB78 or compound classification.

## A. Initial source-backed migration core

| ID | Surface | Role | Later runtime requirement |
|---|---|---|---|
| LVC-P01 | `飲茶` | current whitelist + source-backed V–O compound | exact whole-surface compound node; visible `飲`/`茶` components; no compound-internal ordinary `object` binding |
| LVC-P02 | `游水` | current whitelist + source-backed V–O compound | exact whole-surface compound node; visible `游`/`水` components; no compound-internal ordinary `object` binding |
| LVC-P03 | `沖涼` | current whitelist + source-backed V–O compound | exact whole-surface compound node; visible `沖`/`涼` components; no compound-internal ordinary `object` binding |

For each positive:

- canonical compound identity must be distinguishable from generic AB78 matcher provenance;
- `structural_scope` must be `vp`;
- source/parser/display spans must equal the exact compound surface;
- component provenance must be complete;
- matcher membership must be traceable to a reviewed lexical entry/source edge;
- no generic V+noun generation is permitted.

## B. Source-backed identity probe not automatically added to runtime

| ID | Surface | Role | Requirement |
|---|---|---|---|
| LVC-R01 | `讀書` | source-backed V–O-compound example outside current AB35 whitelist | retain in research/identity tests or review material; runtime addition requires separately authorized lexical expansion |

This prevents the implementation from confusing “source example exists” with “runtime lexicon expansion authorized.”

## C. Higher-composition implementation probes

These examples are for deterministic parser composition after the lexical compound itself is recognized. They are **generated implementation probes**, not independent naturalness evidence.

| ID | Probe | Intended structural assertion |
|---|---|---|
| LVC-C01 | `我飲茶。` | subject/clause owner outside exact `飲茶` compound VP |
| LVC-C02 | `我會游水。` | higher modal outside exact `游水` compound VP |
| LVC-C03 | `我想沖涼。` | desiderative/higher VP wrapper outside exact `沖涼` compound VP |
| LVC-C04 | `你飲茶咩？` | question/final material outside exact `飲茶` compound VP where existing outer grammar licenses it |

Acceptance for these probes is structural only:

- exact inner compound span survives;
- outer wrapper owns its own material;
- compound component provenance remains unchanged;
- no subject/modal/particle surface is absorbed into the compound node.

If an outer probe is not independently supported by existing typed grammar, revise the probe rather than broadening the compound matcher.

## D. Ordinary V–NP boundary

| ID | Surface | Evidence/disposition | Later requirement |
|---|---|---|---|
| LVC-B01 | `做功課` | directly source-supported ordinary `[V Asp NP]` control | no `VerbObjectCompound`; preserve/rehome through AB78 when the separate runtime migration is authorized |

This is the strongest clean contrast in the current source package.

## E. Unresolved legacy activities — outside initial compound core

At minimum:

| ID | Surface | Current disposition |
|---|---|---|
| LVC-U01 | `食飯` | unresolved ordinary/activity/compound analysis |
| LVC-U02 | `打電話` | unresolved ordinary/activity/compound analysis |
| LVC-U03 | `打籃球` | unresolved ordinary/activity/compound analysis |

Later implementation must not assign the narrowed AB35 identity to these merely to preserve historical `ProductiveVO` snapshots.

If they retain temporary compatibility behavior, that behavior must be reported separately from the source-backed compound identity and carry zero independent linguistic evidence weight.

## F. Known transition blockers — outside initial compound core

| ID | Surface | #750 disabled-AB35 result | Requirement |
|---|---|---|---|
| LVC-X01 | `煮嘢食` | only prefix `煮嘢` receives `TransitiveVP` | separate internal-structure research; do not treat partial fallback as rehome |
| LVC-X02 | `下棋` | bare surface captured as `TemporalClause`; subject-hosted form has no construction | resolve collision and independently establish intended analysis before migration |
| LVC-X03 | `做運動` | no construction | independently establish intended analysis/lexical typing before migration |

## G. Generic productivity boundaries

The later matcher must remain absent for:

- unseen `V + noun` combinations not present in the reviewed compound table;
- a lexical substitution formed only because both tokens are known;
- a surface copied from the old 43-entry table without item-specific compound evidence;
- a corpus hit that merely has V–O order;
- a generated example not linked to the source-backed lexical core.

A synthetic test should deliberately add a known verb and known noun that are **not** a reviewed compound entry and verify that the compound matcher does not fire. The exact sentence can be selected from existing typed vocabulary during implementation; it is a parser guard, not linguistic evidence.

## H. Separability boundaries

The initial implementation is contiguous-only.

Do not infer compound identity for:

- `V + 咗 + nominal component`;
- `V + quantity + nominal component`;
- `V + modifier + nominal component`;
- topicalized/dislocated nominal component;
- duration/frequency material inserted between components;
- other separated forms;

unless the **same lexical compound** has a separately reviewed source-backed profile licensing that structure.

A later item-specific separability task may add such profiles without broadening the contiguous lexical table generically.

## I. AB78 overlap/ambiguity tests

The later implementation must distinguish two questions:

1. Is the source-backed compound node present?
2. Does an ordinary compositional AB78 reading also remain available?

Do not encode one universal answer for all lexical entries.

Initial implementation policy:

`preserve_competing_until_adjudicated`

For each source-backed seed, tests should verify that:

- the compound node itself has no ordinary `object` semantic binding;
- any separate AB78 node has its own independent matcher identity and bindings;
- object roles from an AB78 competitor do not leak into the compound trace;
- coexistence is reported as explicit competing structure where relevant, not collapsed into one matcher.

Future item-specific evidence may authorize a stronger overlap policy.

## J. Legacy compatibility migration matrix

| Legacy group | Immediate identity consequence | Runtime consequence in first implementation |
|---|---|---|
| `飲茶`, `游水`, `沖涼` | narrowed AB35 compound core | route to new compound representation |
| `做功課` | excluded from AB35; ordinary V–NP | separately remove legacy ownership and rely on reviewed AB78 path |
| other 36 exact AB78 fallbacks | excluded from *source-backed core*, linguistic classification unresolved | do not bulk-rehome solely from fallback success |
| `煮嘢食` | excluded pending internal analysis | keep outside narrow compound core; separate blocker task |
| `下棋` | excluded pending collision/identity analysis | separate blocker task |
| `做運動` | excluded pending analysis/typing | separate blocker task |

The old 43-entry table must not simply be renamed to `VerbObjectCompound`.

## K. Later runtime PR acceptance gates

A later implementation PR should pass all applicable normal checks plus focused assertions that:

1. source-backed compound positives match exact spans;
2. component provenance is exact and structured;
3. the compound trace exports no automatic ordinary `object` relation;
4. subject/higher wrappers remain outside the compound;
5. direct ordinary control `做功課` is not classified as the compound identity;
6. unresolved activity controls are not silently promoted into the narrowed compound core;
7. no unseen V+noun combination fires the compound matcher;
8. no separated form is licensed generically;
9. generic AB78 overlap is explicit and does not contaminate compound bindings;
10. permanent parser architecture audit remains zero-blocker;
11. no linguistic status promotion follows from implementation success.

## Implementation order recommendation

1. write the canonical AB35 narrowing/rename adjudication to the identity registry;
2. introduce the source-linked compound runtime representation for the three current whitelist seed entries;
3. add exact provenance/boundary/composition tests;
4. remove the three seed entries from the legacy broad compatibility route so the new compound representation owns their AB35 identity;
5. separately rehome `做功課` to AB78;
6. resolve `煮嘢食`, `下棋`, and `做運動`;
7. audit the remaining unresolved compatibility entries item-by-item;
8. remove the legacy `ProductiveVO` compatibility route only when no unresolved surface depends on it.

This sequence prevents the historical label from forcing function while also avoiding a destructive one-step whitelist deletion.
