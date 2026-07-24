# Construction adjudication batch 01

**Adjudicated:** 2026-07-24  
**Scope:** highest-priority direct candidate plus the three broad records that initially appeared closest to promotion  
**Authority:** project expert systematic review

This batch distinguishes label quality, language-construction identity, runtime representation, evidence readiness, and status migration. No record is promoted by this adjudication.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Decision | Status recommendation |
|---|---|---|---|---|---|
| `AB30` | `PostverbalZoPerfectiveVP` | `ZoMarkedPerfectiveObjectVP` | language construction | rename and retain narrow | remain `research_pending` |
| `AA07` | `AssociativeNP` | `GeMarkedNominalModifierNP` | language construction | rename and retain narrow | migrate to `research_pending` after runtime alias work |
| `AA30` | `CoordinatedNP` | `CoordinatedNP` | language construction | retain narrow | migrate to `research_pending` |
| `AB23` | `PoliteImperativeClause` | `PoliteRequestWrapper` | parser representation | internalize and decompose | migrate to `parser_heuristic` |

## AB30 — ZoMarkedPerfectiveObjectVP

### Judgment

The underlying construction is real and source-supported. The runtime implements a defensible subtype rather than the full Cantonese outer-aspect system.

The approved profile is:

```text
lexical verb + 咗 + overt NP object
```

The runtime explicitly excludes objectless `V–咗`, inner-aspect/result material before `咗`, motion-goal perfectives, experiential `過`, and progressive `緊`. Predicate–object compatibility remains a separate semantic review.

### Naming decision

`PostverbalZoPerfectiveVP` is not false, but it is underspecified: it fails to identify the overt object that defines the subtype and can be misread as covering all postverbal `咗` environments. `ZoMarkedPerfectiveObjectVP` is narrower and theory-light.

Research terminology is retained as aliases:

- outer aspect;
- perfective marker `咗`;
- `V–OAP–object` / `V–咗–object` order.

### Evidence judgment

- Behavior–research alignment: `runtime_narrower_defensible`.
- Terminology alignment: `neutral_descriptive_preferred`.
- Promotion state: not ready.
- Next evidence work: reviewed corpus classifications, a clean role-neutral panel wave, and held-out validation.

## AA07 — GeMarkedNominalModifierNP

### Judgment

The runtime behavior is a valid nominal-modification profile:

```text
nominal modifier + 嘅 + overt nominal head
```

The record must not assign a single semantic role to `嘅`; possessive and attributive interpretations remain distinct.

### Naming decision

`AssociativeNP` is misleading because associative plural terminology applies to a different Cantonese construction, conventionally represented as `X + (佢)哋`. The current runtime does not implement that construction.

The same UUID remains appropriate because the implemented behavior does not need to split. Rename it to `GeMarkedNominalModifierNP` and preserve `AssociativeNP` as a compatibility alias.

### Evidence judgment

- Behavior–research alignment: `runtime_narrower_defensible`.
- Terminology alignment: `neutral_descriptive_preferred` after rename.
- Status migration: remain quarantined only until the versioned runtime-label migration, then move the narrowed record to `research_pending`.

## AA30 — CoordinatedNP

### Judgment

The canonical name is valid. The runtime implements a narrow binary-NP coordination profile:

```text
NP + 同/同埋 + NP
```

Both conjuncts must be independently analyzed. Comitative or coverb uses of `同`, nested coordination, and non-NP coordination remain outside this profile.

### Naming decision

Retain `CoordinatedNP`. Use the profile name `BinaryOvertNPConjunction` to prevent the family-level name from implying unrestricted coordination.

The inherited family `AssociativeAndCoordinatedNP` is rejected because it combines the misnamed `AssociativeNP` record with genuine coordination. The approved family is `Coordination`.

### Evidence judgment

- Behavior–research alignment: `runtime_narrower_defensible`.
- Terminology alignment: `aligned`.
- Status migration: move to `research_pending`; incomplete corpus, panel, and held-out evidence still block stronger status.

## AB23 — PoliteRequestWrapper

### Judgment

The source evidence supports multiple Cantonese request strategies and pragmatically distinct markers. It does not establish one productive `PoliteImperativeClause` construction.

`請`, `唔該`, and `麻煩` cannot be treated as freely interchangeable values in one syntactic slot. Request force may be assembled from:

- conventional interaction formulas;
- direct or indirect directive strategies;
- overt addressees;
- lexical or syntactic mitigation;
- degree or manner material.

Cynthia Lee's 2005 study of native Cantonese requests likewise analyzes requests as combinations of strategies and mitigating devices rather than one polite-imperative construction (Pragmatics 15(4):395–422, DOI `10.1075/prag.15.4.05lee`).

### Naming and ontology decision

The current wrapper is implementation structure, not a supported language construction. Rename it `PoliteRequestWrapper`, change its claim layer to `parser_representation`, and migrate it to `parser_heuristic` after compatibility work.

Its components must remain visible and independently typed. Likely homes include:

- `FormulaDiscourseUnit`;
- directive or imperative force representation;
- overt addressee roles;
- `DegreeMannerAdverbial` or another independently supported manner node.

No new public language-construction UUID is authorized until the exact directive schema is established.

## Governance consequences

1. A completed adjudication does not change UUID or short code.
2. Renames add the legacy name to `former_names` and retain it under `legacy_labels` for runtime discovery.
3. `AB23` is removed from direct linguistic-candidate discovery by its parser-representation claim layer.
4. `AA07` and `AA30` remain conservative until their status-path migrations are implemented.
5. `AB30` remains the nearest direct candidate, but ontology closure alone does not satisfy corpus, panel, or held-out gates.
