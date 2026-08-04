# Issue #408 adjudication: postverbal aspect profiles

**State:** decision-discovery packet  
**Parent issue:** #408  
**Work claim:** #455  
**Base commit:** `01482d53ec9a9c8e26bec909261a51ebf4b15330`

## Scope

This packet jointly reopens the accepted PRQ2-005, PRQ2-006, and PRQ2-007 research units only to decide the next evidence and identity route for:

- postverbal `V開` as habitual or established activity;
- nonmotion `V落去` as continuation beyond a reference point;
- `V起嚟／V起上嚟`, including split `V起O嚟／V起O上嚟`, as onset or manifestation.

It does not reopen the source decisions as unrestricted grammar rules. It does not treat the 79 runtime collision probes as linguistic evidence.

## Reopened predecessor evidence

The three predecessor packages already establish direct source support for narrow profiles:

1. **PRQ2-005:** `開` can be an immediately postverbal habitual marker, including matrix, question, and modifying-clause environments. The same graph remains lexical in ordinary `開`, resultative/directional in forms such as `打開` and `行開`, and discourse-linked in forms such as `講開`.
2. **PRQ2-006:** postpredicative `落去` can mark continuation of an extendable activity, process, or state beyond a contextual reference point. Literal downward/deictic motion remains independently available. The checked continuative core keeps `落去` adjacent and rejects the documented post-marker or split-object orders for the intended reading.
3. **PRQ2-007:** `起嚟／起上嚟` can mark onset or manifestation. Its strongest transitive profile is discontinuous: `V起O嚟／V起O上嚟`. Literal rise, caused upward motion, appearance `睇起嚟`, and discourse `講起嚟` remain separate competitors.

The runtime collision audits contain 29, 22, and 28 rows respectively. Their value is diagnostic: they show that current output either loses the target relation, masks it under a broad parent, or assigns a neighboring lexical/directional analysis.

## Joint adjudication result

All three profiles receive the same high-level terminal route but retain separate evidence and identity programs:

| Profile | Terminal disposition in this packet | Reason |
|---|---|---|
| Habitual/established `V開` | `EVIDENCE_PACKET_REQUIRED_BEFORE_IDENTITY` | Strong direct category evidence and a decisive lexical/aspect contrast exist, but predicate productivity, former-habit readings, negation, stacking, and neighboring continuative/discourse uses are not bounded. |
| Continuative nonmotion `V落去` | `EVIDENCE_PACKET_REQUIRED_BEFORE_IDENTITY` | The continuative meaning and object/adjacency boundary are source-backed, but motion-compatible verbs, discourse-recovered `咁落去`, telicity, potential forms, and higher clause relations need a bounded corpus and controlled judgments. |
| Inchoative/manifestation `V起嚟／V起上嚟` | `EVIDENCE_PACKET_REQUIRED_BEFORE_IDENTITY` | Onset and split-object formation are source-backed, but onset versus manifestation, short/long variants, predicate classes, literal caused motion, appearance/discourse uses, and unsupported object orders remain under-bounded. |

No profile is cancelled. No existing identity is shown to represent the full supported relation. No new or retained identity is authorized here because the required bounded corpus and role-neutral judgment packets do not yet exist.

This packet completes the decision-discovery endpoint of issue #408. The three evidence programs are split into independently reviewable child issues #457, #458, and #459, so #408 does not remain an umbrella blocker after this packet is accepted.

## Shared decision

The three profiles must **not** be implemented as one broad postverbal-aspect fallback.

They differ in all of the following:

- viewpoint contribution: prior establishment, forward continuation, or left-boundary onset;
- internal shape: contiguous `V開`, contiguous `V落去`, and both contiguous and discontinuous `起(上)嚟`;
- object behavior;
- literal/lexical collision family;
- interaction with higher clause relations;
- likely evidence and implementation cost.

Shared runtime infrastructure may eventually provide host selection, local competitor checks, discontinuous-span support, and parent-child preservation. Shared infrastructure is not a shared linguistic identity.

## Required evidence packets

### A. `V開` — issue #457

Build a bounded inventory of postverbal `開` with local host, object/complement, clause environment, and competing lexical/resultative/directional reading preserved. The review must separately code habitual, established relation, modifier-internal, already-underway continuative, discourse-topic, incidental, lexical, resultative, directional, ambiguous, and unusable rows.

Controlled judgments must include:

- current established pattern versus former or discontinued habit;
- `V開` versus frequency adverb, experiential `V過`, and progressive `V緊`;
- lexical `開` in the same sentence or matched local environment;
- matrix, modifying-clause, and question hosts;
- `冇／唔／未` and aspect-stacking profiles without assuming productivity.

### B. `V落去` — issue #458

Build a bounded inventory that records whether a physical mover, path, location, or deictic endpoint is available. Nonmotion predicates, motion-compatible predicates, `咁落去`, `V住落去`, potential forms, and consequence/projection frames must remain separate.

Controlled judgments must include:

- extendable nonmotion predicates versus literal self-motion and caused motion;
- objectless continuative core versus post-`落去` object and split `落O去` controls;
- progressive `緊`, maintained `住`, lexical `繼續`, and habitual `開` siblings;
- telic, achievement, scalar-state, and discourse-recovered hosts;
- same surface under spatial and temporal contexts.

### C. `V起嚟／V起上嚟` — issue #459

Build a bounded inventory preserving every token between `起` and `嚟／上嚟`. The review must distinguish unsplit onset, split transitive onset, split verb-object compounds, manifestation/when readings, literal self-motion, caused upward motion, appearance/evaluation, discourse-topic use, ambiguous rows, and unsupported order candidates.

Controlled judgments must include:

- dynamic onset versus state/property manifestation;
- short `起嚟` versus long `起上嚟` with the same predicate where plausible;
- source-backed `V起O(上)嚟` versus `VO起上嚟` and `V起上嚟O` controls;
- literal and caused-motion contexts using the same or closely matched lexical host;
- subordinate `一…就`, matrix, triggered-onset, and generic manifestation environments.

## Safe downstream order

1. **Issue #457 — habitual `V開` evidence and identity packet.** It has the simplest contiguous core and the strongest same-sentence lexical/aspect control. Stop before runtime.
2. **Issue #458 — continuative `V落去` evidence and identity packet.** Reuse only neutral host/competitor metadata; retain independent motion and object-order decisions. Stop before runtime.
3. **Issue #459 — inchoative `V起嚟／V起上嚟` evidence and identity packet.** Resolve the discontinuous span and verb-object relation before any runtime specification. Stop before runtime.
4. Only after all three identity outcomes are accepted, open a separate implementation-architecture issue to determine whether shared host and competitor infrastructure is safe.

This order minimizes ontology and runtime risk. It is not a claim that one profile is linguistically more basic than another.

## Negative boundaries

This packet prohibits:

- character-only classification of `開`, `落去`, `起嚟`, or `起上嚟`;
- using current runtime direction matches as proof of literal motion;
- treating full root coverage as target semantic coverage;
- treating corpus or dictionary attestation as unrestricted productivity;
- fabricating omitted objects, paths, or temporal intervals;
- promoting source-incompatible generated controls to categorical ungrammaticality without independent judgments;
- assigning one identity to habituality, continuation, and onset merely because each follows a predicate;
- implementing a broad postverbal-aspect fallback.

## Files

- `predecessor-inventory.tsv` — exact predecessor reports, ledgers, collision counts, and evidence roles;
- `profile-decision-map.tsv` — terminal route for each profile and its blockers;
- `collision-boundaries.tsv` — cross-profile positive and competitor boundaries;
- `controlled-contrasts.tsv` — role-neutral evidence plan;
- `corpus-review-schema.tsv` — common auditable fields plus profile-specific coding.

## Protected state

No construction identity, UUID, linguistic status, parser behavior, fixture, generated runtime, survey, panel, version, release, or deployment state changes in this packet.
