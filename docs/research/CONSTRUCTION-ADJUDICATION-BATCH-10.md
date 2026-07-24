# Construction adjudication batch 10

**Adjudicated:** 2026-07-24  
**Authority:** project expert systematic review  
**Records:** AA58, AA62, AA66, AA67, AA68

## Outcome

| Code | Legacy label | Approved canonical identity | Claim layer | Disposition |
|---|---|---|---|---|
| AA58 | `ExistentialWhQuestion` | `JauMeNounWhQuestion` | language construction | retain UUID and narrow to overt `有 + 咩 + noun` |
| AA62 | `ExperientialVP` | `GwoMarkedExperientialObjectVP` | language construction | retain UUID and expose overt `V + 過 + object` |
| AA66 | `FragmentAnswer` | `ContextLinkedAnswerUtteranceWrapper` | parser representation | internalize and decompose |
| AA67 | `FragmentQuestion` | `NeMarkedThematicContinuationQuestion` | language construction | retain UUID and narrow to `呢`-marked continuation questions |
| AA68 | `GoalAttainmentMotionVP` | `MotionVerbDouGoalVP` | language construction | retain UUID and use a form-based motion-`到`-goal profile |

No runtime label, status path, matcher, fixture, survey instrument, or release state changes in this batch.

## AA58 — `JauMeNounWhQuestion`

Every executable positive contains the same core `有咩書`; the differences are only following particles. The cited source supports in-situ wh material with `有`, including `有幾多架車呀`, but explicitly does not establish the runtime's exact `有 + 咩 + optional NP` template or one uniform existential analysis.

The approved profile therefore requires overt `有`, overt `咩`, and an overt noun. It does not cover other wh expressions, infer an omitted noun, or decide among existential, possessive, and availability readings.

## AA62 — `GwoMarkedExperientialObjectVP`

The current positives are `食過飯` and `V過-object` constituents inside larger `有冇` questions. Checked sources independently distinguish experiential `過` from perfective `咗`, attest overt `V過` examples, and document aspect-combination restrictions.

The approved identity is the narrow overt `V + 過 + object` VP. Preverbal `有冇`, final particles, and larger interrogative structure remain outside this UUID. `去過 + goal` and `V過...未` remain with their already separate construction identities.

## AA66 — `ContextLinkedAnswerUtteranceWrapper`

The eight positives are structurally heterogeneous:

- affirmative and negative modal or evaluative predicates: `可以`, `唔可以`, `要`, `唔使`, `唔要`, `得`, `唔得`;
- a syntactically complete cognition clause: `我覺得啱`.

The cited sources describe different response strategies, auxiliary/main-verb contrasts, aspectual ellipsis restrictions, and nominal responses. They do not establish one general fragment syntax or one hidden complement.

AA66 is therefore reclassified as a parser representation. It may preserve compatibility-level answer metadata, but the linguistic analysis belongs to independently typed modal, negation, cognition, aspectual, and nominal constructions.

## AA67 — `NeMarkedThematicContinuationQuestion`

The executable positives are `你呢？` and bare `呢？`. The cited dissertation specifically identifies a topic-marker function of `呢` in thematic questions.

The approved profile records an overt topic followed by final `呢`, or bare `呢` when discourse supplies the relevant alternative. It does not reconstruct an omitted clause or null topic and does not cover complete wh, polar, or A-not-A questions.

## AA68 — `MotionVerbDouGoalVP`

The positives are `我行到學校` and `我返到屋企`. Independent sources attest motion-`到`-goal sequences, including `返到學校`, and discuss resultative or arrival-related uses of `到`.

The canonical identity is deliberately form-based. It preserves motion predicate + `到` + overt goal without deciding that every occurrence has one invariant resultative, attainment, potential, or arrival analysis. Bare motion, goal-taking motion without `到`, caused motion, directional complexes, and non-motion `到` remain outside the profile.

## Consequences

- Expert-adjudicated UUIDs: **49 / 181**
- Pending UUID adjudications: **132**
- Accepted adjudication batches: **10**
- AA66 leaves direct linguistic discovery and becomes an excluded non-language/internal record.
- Assuming no unrelated state change, direct `source_supported` records decrease from **68 to 67**, and `excluded_nonlanguage` records increase from **26 to 27**.
- No record becomes promotion-ready.
- No evidence transfers between sibling, wrapper, or successor profiles.

## Safeguards

- Permanent UUIDs and short codes are unchanged.
- Legacy runtime labels remain compatibility aliases.
- Status recommendations do not move grammar notes.
- The batch does not alter parser behavior.
- Tests remain implementation evidence only.
- One-speaker historical judgments do not satisfy the role-neutral panel threshold.
- Fragment status never authorizes hidden clauses, arguments, or complements.
- Motion and aspect evidence remains attached to the exact UUID and profile reviewed here.

## Next planned adjudication batch

Select the next five pending records from the current registry only after this batch is applied, deterministic outputs are regenerated, and the current project state is rechecked for overlapping work.
