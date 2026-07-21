# Parser construction → research source links (CP021B-R3)

Date: 2026-07-18  
Scope: cumulative CP021B-R1/R2 mapping plus five Lane 09 directional-motion constructions. No parser code was changed.

## R3 dispositions

| Construction | Evidence-backed core | Boundary / disposition |
|---|---|---|
| `DirectionalMotionVP` | Independent path predicates and direction-plus-deixis expressions are attested; predicate, postverbal, manner, and caused-motion uses are distinguishable. | `SOURCE_LINKED_SPLIT_REQUIRED`: current umbrella conflates at least four constructions or representation profiles. |
| `CompoundDirectionalMotionVP` | `返 + direction + 嚟/去` and manner + `返 + path + deixis` are attested with ordering restrictions. | `SOURCE_LINKED_REPRESENTATION_REALIGNMENT_REQUIRED`: current runtime assigns `返上嚟` and `行返過嚟` to inconsistent node boundaries. |
| `DirectedMannerMotionVP` | Manner + postverbal directional/path material is well attested. | `SOURCE_LINKED_NARROWING_REQUIRED`: split preverbal `向 + ground + 行`, and preserve self-motion versus caused-motion roles. |
| `GoalAttainmentMotionVP` | `返到學校` and postverbal spatial attainment `到` are attested. | `SOURCE_LINKED_NARROWING_REQUIRED`: distinguish main arrival `到`, spatial result, and nonspatial/ability-related uses. |
| `NegatedDirectionalMotionVP` | Directional predicates undergo ordinary VP negation; postverbal potential negation is separately documented. | `LANGUAGE_CLAIM_RETIRE_KEEP_INTERNAL_COMPOSITION`: keep only a neutral composition wrapper, preserve negator identity, and separate potential structures. |

Exact claims, locators, implementation effects, and forbidden inferences are in `PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R3.tsv`.

## Source independence and limits

- Shan and Jin 2025, Yiu 2016, Chor 2018, Wong 2023, and Leung 2014 are separate research units with different data and analyses.
- Liang and Mai's coding supplement is adapted from Wong's framework and is counted only as corroborative operational evidence, not an independent structural theory.
- The literature disagrees on whether some directional strings are best analyzed as serial/path verbs or complements. The project therefore records theory-neutral observable structure rather than declaring one analysis settled.
- No source validates Canto Span's internal node names or current matching boundaries.

## Coverage effect

Five additional Lane 09 labels now have claim-level maps. None was promoted to `supported_productive`; the dispositions are split-required, realignment-required, narrowing-required, or language-claim retirement.
