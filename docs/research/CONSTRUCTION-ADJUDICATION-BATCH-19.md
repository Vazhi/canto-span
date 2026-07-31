# Construction adjudication Batch 19

Date: 2026-07-31  
Authority: project expert systematic review  
Scope: retired possession-related UUIDs AB25–AB27

## Outcome

Batch 19 adjudicates three retired legacy labels:

| Code | Legacy label | Approved canonical name | Claim layer | Decision |
|---|---|---|---|---|
| AB25 | `PossessiveNP` | `PossessiveNominalCompositeWrapper` | parser representation | remain retired; rehome evidence by overt nominal structure |
| AB26 | `PossessiveNominalFragment` | `HeadlessPossessiveFragmentCompositeWrapper` | parser representation | remain retired; separate nominal licensing from fragment licensing |
| AB27 | `PossessiveTransferClause` | `PossessionTransferCompositeWrapper` | parser representation | remain retired; separate possession from transfer or dative structure |

No new UUID, successor umbrella, status migration, runtime change, fixture, or corpus decision is justified.

## Shared decision principle

The three legacy names organize material by broad interpretation rather than by one independently supported overt structural boundary. The checked evidence instead requires the following distinctions:

1. overt possessor or modifier + `嘅` + overt noun;
2. overt pronominal possessor + classifier + overt noun;
3. possible headless possessive nominal structure;
4. discourse or fragment licensing;
5. double-object transfer structure;
6. marker-bearing oblique or post-theme participant structure; and
7. other lexeme- and construction-specific transfer profiles.

A retired aggregate cannot make those profiles interchangeable or donate evidence among them.

## AB25 — PossessiveNP

### Registry and runtime state

- Permanent UUID: `bb2b1bee-91f7-55b6-a766-45e20852c076`.
- The retirement archive records zero accepted fixtures, zero counted current runtime references, and zero verified current parser outputs.
- The archived retirement reason already states that possessor + `嘅`, possessor + classifier, and headless possession require separate analyses.

### Evidence comparison

Accepted neighboring identities already preserve the strongest overt structures:

- **AA07 `GeMarkedNominalModifierNP`**: overt modifier or possessor + `嘅` + overt noun;
- **AB24 `PronounPossessorClassifierNounNP`**: overt pronominal possessor + classifier + overt noun.

The mapped nominal sources distinguish `嘅`-marked modification and classifier-bearing possession. They do not establish an unrestricted `PossessiveNP` node that should dominate both structures and any headless possessive profile.

### Decision

Rename the retired identity to `PossessiveNominalCompositeWrapper`, assign it to the parser-representation layer, and retain it as retired provenance only.

Valid evidence is rehomed by overt structure:

- `嘅`-marked headed material → AA07;
- pronominal possessor + classifier + headed noun → AB24;
- headless or classifierless possession → separately bounded future research, not automatic inheritance.

No predecessor or successor UUID link is required because no split is being implemented. The successor-profile list records evidence homes and future questions without allocating identities.

## AB26 — PossessiveNominalFragment

### Registry and runtime state

- Permanent UUID: `c1c284c1-a094-58cb-befd-f9e075462e2c`.
- The retirement archive records zero accepted fixtures, zero counted current runtime references, and zero verified current parser outputs.
- The archive classifies the label as a duplicate fragment wrapper.

### Boundary analysis

The legacy label combines two independent questions:

1. whether overt material forms a licensed headless possessive nominal; and
2. whether that nominal is licensed as a fragment, answer, repair, or other discourse unit.

Neither question can answer the other. Fragment status cannot fabricate an omitted nominal head, and headless nominal structure does not by itself establish an autonomous discourse fragment.

### Decision

Rename the retired identity to `HeadlessPossessiveFragmentCompositeWrapper`, assign it to the parser-representation layer, and retain it as retired provenance only.

Any future implementation must compose:

- an independently evidenced headless possessive nominal profile; and
- an independently licensed fragment or discourse relation.

No successor UUID is justified from the current evidence.

## AB27 — PossessiveTransferClause

### Registry and runtime state

- Permanent UUID: `2a295394-6430-59fa-9cb0-8a6e186eab68`.
- The later retirement audit records zero accepted fixtures, five historical code references, one zero-weight implementation probe, and removal of the active registry template and exact fallback.
- The archived reason states that component evidence did not license a combined possession-plus-transfer wrapper.

### Transfer evidence

Primary dative research distinguishes Cantonese transfer structures by overt order and marker presence, including:

- `V + theme + participant`; and
- `V + theme + dative marker + participant`.

The structures share transfer-related properties under specific verb, semantic, and information-structure constraints, but possession inside an NP does not create a separate possession-transfer clause type.

Accepted **AB28 `BeiMarkedPostThemeParticipantConstruction`** already preserves the overt predicate + theme + `畀/俾` + participant family while deliberately avoiding an unsupported single recipient, beneficiary, goal, agent, source, preposition, or serial-verb analysis.

### Decision

Rename the retired identity to `PossessionTransferCompositeWrapper`, assign it to the parser-representation layer, and retain it as retired provenance only.

Evidence is rehomed as follows:

- overt marker-bearing post-theme participant structure → AB28;
- independently supported double-object, oblique, or other transfer profiles → their own bounded identities or research questions;
- possession internal to a nominal → the appropriate independently typed possessive nominal profile.

No combined successor UUID is justified.

## Source basis

### Nominal and possessive structure

- `SRC-SIO-2011-GE3` — `嘅`-marked nominal modification and related distinctions;
- `SRC-LAM-LAU-LEE-2024-SEGMENTATION` — overt pronoun + classifier + noun segmentation;
- `SRC-XIA-2025-CLASSIFIERS` — possessor-classifier-noun evidence;
- `SRC-YIP-MATTHEWS-2000-BASIC` — basic possessive and discourse examples used contrastively.

### Transfer and dative structure

- `SRC-XU-PEYRAUBE-1997-DOC` — Cantonese double-object and oblique construction order and relationship;
- `SRC-BODOMO-LAM-YU-2003` — double-object and serial-verb distinctions;
- `SRC-WONG-2023-BEI` — `畀/俾` construction evidence;
- `SRC-LI-LEE-2021-DATIVE` — dative meaning distinctions;
- `SRC-YIP-MATTHEWS-2000-BASIC` — basic transfer examples used contrastively.

Publication attestation supports the component structures only. It does not restore the retired aggregate labels or establish unrestricted productivity.

## Negative boundaries

Batch 19 does not:

- collapse `嘅`-marked and classifier-bearing possessives;
- generalize AB24 from pronoun possessors to unrestricted nominal possessors;
- infer an omitted nominal head from fragment context alone;
- make every headless possessive an autonomous fragment;
- treat all `畀/俾` structures as one recipient construction;
- equate marker-bearing oblique, double-object, and serial-verb transfer profiles;
- infer transfer from possession semantics;
- infer possession from transfer semantics;
- restore removed zero-weight runtime fallbacks;
- allocate a new UUID; or
- alter any linguistic status or executable behavior.

## Permanent disposition

| Code | Permanent disposition | Evidence home |
|---|---|---|
| AB25 | retired parser representation | AA07, AB24, and separately researched headless/classifierless profiles |
| AB26 | retired parser representation | independently licensed headless possessive nominal + fragment/discourse relation |
| AB27 | retired parser representation | AB28 and independently typed transfer/dative profiles plus separate possessive nominals |

## Protected and unchanged

- permanent UUIDs and short codes;
- runtime behavior and emitted labels;
- current linguistic statuses;
- executable fixtures;
- corpus candidate classifications;
- survey, panel, and held-out state;
- runtime version;
- release and deployment state.

## Terminal outcome

All three UUIDs remain retired. Their canonical names now identify them as historical composite wrappers, their valid component evidence has explicit homes, and no successor identity or implementation change is authorized.