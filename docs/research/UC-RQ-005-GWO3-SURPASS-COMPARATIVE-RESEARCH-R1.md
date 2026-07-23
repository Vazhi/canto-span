---
title: UC-RQ-005 — gwo3 surpass comparative
research_id: UC-RQ-005
status: active_research_unit
baseline_version: 0.5.208
created: 2026-07-23
implementation_authorized: false
status_change_authorized: false
---

# UC-RQ-005 — `gwo3` surpass comparative

## Research decision

A dedicated research unit is justified. Lam 2014 directly attests the Cantonese
surpass-comparative profile:

```text
comparee + scalar/property predicate + 過 gwo3 + comparison standard
```

The paper's opening contrast uses `Mary gou1 gwo3 Peter` for “Mary is taller than
Peter,” while `Mary heoi3 gwo3 jing1gwok6` is experiential “Mary has been to
England.” The shared graph and pronunciation therefore do not justify one parser
analysis.

Yiu 2024 independently treats lexical/directional verb, comparative marker,
dative marker, experiential aspect, and iterative aspect as five functions in a
polysemous family. Current Canto Span represents experiential and one bounded path
use, but no comparative standard relation. This note does **not** authorize a new
runtime label, lexical retyping, parser fallback, or grammar status change.

## Safest checked core

The narrowest direct profile is:

```text
comparee + property-denoting predicate + 過 + overt standard NP
```

The checked example establishes an overt comparee, scalar predicate, marker, and
standard. Lam also states that a differential measure phrase is optional in the
Cantonese surpass comparative, but the paper does not establish an unrestricted
predicate inventory or a parser-ready measure-position rule.

## Checked source findings

The source-verification ledger is:

`UC-RQ-005-GWO3-SURPASS-COMPARATIVE-SOURCE-VERIFICATION-R1.tsv`

### Lam 2014 — direct comparative/experiential contrast

The official ACL Anthology full text:

- directly contrasts comparative `property + 過 + standard` with experiential
  `event predicate + 過 + object/location`;
- calls comparative `過` a surpass marker and the following NP the standard;
- treats property-denoting predicates as a scalar domain;
- notes that a differential measure phrase is optional in Cantonese;
- distinguishes the overt `過` comparative from bare property + `(一)啲`
  comparatives later in the paper.

The paper proposes a unified formal semantics for comparative and experiential
uses. That theoretical connection must not be converted into one construction
node, because the paper itself treats them as two constructions with different
interpretations and argument relations.

### Yiu 2024 — five-function polysemy boundary

The official HKUST record and publisher DOI identify five functions of `gwo3`:

1. lexical/directional verb “cross”;
2. comparative marker;
3. dative marker;
4. experiential aspect marker;
5. iterative aspect marker.

The chapter uses historical and cross-dialectal evidence to analyze these as
polysemy. Abstract-level access supports the five-way distinction and historical
research scope, but not exact modern licensing rules for every function.

## Exact collision audit

The collision ledger is:

`UC-RQ-005-GWO3-SURPASS-COMPARATIVE-COLLISION-AUDIT-R1.tsv`

### `ExperientialVP`

Current runtime lexicon and slots type bare `過` as experiential aspect. In a
reviewed experiential profile, `過` follows an event predicate and marks prior
experience. Comparative `過` instead follows a scalar predicate and introduces an
overt standard. Shared form is not shared constructional role.

### Directional/path nodes

`DirectionalMotionVP` can use `過` as a path-across component in the exact
`行返過嚟` composition. This path role is overtly embedded among motion and deictic
elements and does not introduce a comparison standard.

### Retired `ComparativeStative`

The retired label represented residual property + `啲` adjustment and was removed
for conflating adjustment with generic comparison. It never represented overt
`過 + standard` and must not be revived.

### `DegreeStativePredicate` and UC-RQ-004 equatives

`DegreeStativePredicate` may supply a scalar-property component but lacks the
comparison standard relation. UC-RQ-004 concerns equality of degree; UC-RQ-005
asserts that the comparee exceeds the standard. They are related comparison
families, not merge equivalents.

### Dative and iterative gaps

No current grammar note, runtime constructor, or dedicated research record was
found for dative or iterative `過`. Their existence in Yiu's polysemy inventory is
a future collision/disambiguation requirement, not authority to implement them in
this unit.

## Required boundaries

Future research must distinguish:

- property-denoting comparative `A + 過 + standard` from event `V + 過`
  experiential aspect;
- comparative marker from lexical/path “cross” inside directional composition;
- comparative from historical or current dative and iterative functions;
- surpass comparison from UC-RQ-004 equative comparison;
- overt-`過` comparison from bare predicate + `(一)啲` scalar difference;
- the standard NP from an ordinary object, goal, path, or measure phrase;
- optional differential measures from the standard itself;
- modern Hong Kong usage from historical and other Yue/Sinitic evidence.

## Research tasks before any implementation proposal

1. Recover the full Yiu 2024 chapter and extract exact modern examples and
   diagnostics for all five functions.
2. Add independent modern reference-grammar or corpus evidence for the surpass
   comparative beyond the Lam analysis family.
3. Build matched examples holding `過` constant across comparative,
   experiential, path, dative, and iterative readings.
4. Audit scalar-predicate classes, standard NP types, negation, questions,
   particles, differential measures, and omitted-standard possibilities.
5. Collect and individually classify natural modern Hong Kong corpus hits.
6. Use native-speaker interpretation tasks for structurally ambiguous strings.
7. Audit parser output only after the linguistic contrasts are frozen.

## Provisional research outcome

| Question | Current answer |
|---|---|
| Is `property + 過 + standard` a directly attested Cantonese comparative? | **Yes.** |
| Does current `ExperientialVP` cover it? | **No; the marker has a different role and introduces a standard.** |
| Does a current directional node cover it? | **No; directional `過` is a path component.** |
| Can retired `ComparativeStative` be reused? | **No.** |
| Are the five `過` functions freely interchangeable? | **No; Yiu analyzes polysemy, not one surface-role rule.** |
| Is a dedicated research unit justified? | **Yes.** |
| Is parser implementation authorized? | **No.** |

## Exit conditions

UC-RQ-005 may leave active research only after one of these dispositions is justified:

- **dedicated construction:** stable predicate, standard, polarity, and differential
  boundaries support a surpass-comparative profile;
- **typed polysemy family:** comparative and the other `過` functions receive
  source-linked disambiguation while preserving overt form;
- **compositional merge:** an independently supported comparison relation can own
  the scalar predicate, marker, and standard without a dedicated node;
- **quarantine:** full-source, regional, or ambiguity evidence remains inadequate;
- **retire:** complete collision audit shows the relation is already represented.

Until then, current grammar statuses and parser behavior remain unchanged.
