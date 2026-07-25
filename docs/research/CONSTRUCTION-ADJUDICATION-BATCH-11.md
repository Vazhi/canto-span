# Construction adjudication batch 11

**Adjudicated:** 2026-07-24  
**Authority:** project expert systematic review  
**Records:** AA72, AA75, AA76, AA77, AA79

## Outcome

| Code | Legacy label | Approved canonical identity | Claim layer | Disposition |
|---|---|---|---|---|
| AA72 | `ImpersonalEnvironmentalClause` | `EnvironmentalPredicateClauseWrapper` | parser representation | internalize and decompose |
| AA75 | `IntransitiveVP` | `BareActionPredicateRelationMember` | parser representation | internalize and decompose |
| AA76 | `LexicalGiveRelation` | `BeiThemeRecipientGiveVP` | language construction | retain UUID and narrow to lexical `畀/俾 + theme + recipient` |
| AA77 | `LocativeExistentialClause` | `PlaceInitialJauMouExistentialClause` | language construction | retain UUID and narrow to place + `有/冇` + introduced NP |
| AA79 | `LocativeFrameClause` | `PlaceInitialPredicateClauseWrapper` | parser representation | internalize and decompose |

No runtime label, status path, matcher, fixture, survey instrument, corpus decision, or release state changes in this batch.

## AA72 — `EnvironmentalPredicateClauseWrapper`

The fifteen executable positives combine several visible profiles:

- conventional weather-event predicates such as `落雨` and `打風`;
- the daylight-transition predicate `天光`;
- time-framed ambient property predicates such as `今日好凍`;
- location-framed ambient property predicates such as `出面好熱`;
- larger modal and embedded clauses containing those predicates.

The runtime already distinguishes conventional environmental events, daylight transition, and ambient degree-property predication before reusing `ImpersonalEnvironmentalClause` as a compatibility label. The checked coursebook explicitly treats ambient qualities and weather events as different overt predicate structures. The other sources support narrower property-predicate and weather-event observations but do not establish one shared argument structure, valency class, or subject analysis.

AA72 is therefore an implementation aggregate. It may preserve compatibility-level environmental grouping, but conventional weather events, daylight transitions, ambient property predicates, and temporal or locative framing require independent language-level profiles.

## AA75 — `BareActionPredicateRelationMember`

The four positives contain only the predicates `笑` and context-linked `同意` inside larger clause relations. The runtime creates `IntransitiveVP` when a relation-member segment consists of one visible action predicate and no overt following object. It explicitly records that no object is inserted.

Object absence is not a sufficient intransitivity diagnostic. The checked sources distinguish auxiliary-supported main-verb omission, discourse-recoverable null objects, and agreement responses. They do not establish that all one-word action predicates share one lexical valency class.

AA75 is therefore reclassified as a parser representation. Future linguistic records must distinguish independently established intransitive lexemes from context-conditioned object or complement omission and from the separate fact that a span functions as a clause-relation member.

## AA76 — `BeiThemeRecipientGiveVP`

The direct scholarly core supports lexical `畀/俾` with a theme before a recipient or beneficiary. The runtime already distinguishes:

- `theme_recipient_baseline`, where the first postverbal nominal is thing-like and the second is person-like;
- `nonbaseline_participant_order_unresolved`, where person precedes thing and no thematic roles are exported.

The same legacy label currently covers both branches, and the executable set also contains simplified `给你水`, which is not directly covered by the verified `畀/俾` sources.

The permanent UUID is retained for the defensible baseline only: optional overt subject + lexical `畀/俾` + overt theme + overt recipient candidate. Postverbal `咗` remains an independent aspect layer. Person-before-thing order, `给`, passive/permissive uses, post-theme linker uses, omitted arguments, and free alternation are outside the canonical profile unless separately established.

## AA77 — `PlaceInitialJauMouExistentialClause`

All six executable positives share an overt place-first core:

- place or spatial domain;
- existential `有` or negative existential `冇`;
- overt introduced nominal.

The sources directly support a place-first negative existential, distinguish explicit-subject possession from subjectless existential introduction, and state that no preposition is required before the initial place expression. The runtime likewise avoids forcing the place to be subject or topic and inserts no expletive.

A separate older fallback also emits `LocativeExistentialClause` for a topic + `入面/入邊` + wh/focus + `有` formula. That formula is not part of the narrow shared core and must not inherit this profile's evidence.

The UUID is retained and renamed to expose the overt place + `有/冇` + NP boundary. Explicit-subject possession, static `喺` clauses, existential-presentational clauses with locative codas, and the older interior formula remain separate.

## AA79 — `PlaceInitialPredicateClauseWrapper`

The four executable positives split into two different structures:

- place-initial property predicates: `出面好熱`, `屋企好靜`;
- place-initial positioning predicates with aspect and postverbal theme: `牆上面擺咗部電話`, `牆上面擺咗部機`.

The runtime also uses the same label for location-framed ambient temperature. It explicitly records separate `location_property`, `locative_inversion`, and ambient-frame branches while leaving the place expression's grammatical relation unresolved.

The sources treat copula-less property predication, locative-inversion analysis, place expressions, and environmental descriptions separately. AA79 is therefore an implementation wrapper, not one Cantonese construction. Property, positioning, and ambient branches require separate language-level profiles and evidence.

## Consequences

- Expert-adjudicated UUIDs: **54 / 181**
- Pending UUID adjudications: **127**
- Accepted adjudication batches: **11**
- AA72, AA75, and AA79 leave direct linguistic discovery and become excluded non-language/internal records.
- Exact generated discovery counts must be taken from the deterministic regeneration rather than inferred manually.
- No record becomes promotion-ready.
- No evidence transfers between wrapper, sibling, alternative-order, or future successor profiles.

## Safeguards

- Permanent UUIDs and short codes are unchanged.
- Legacy runtime labels remain compatibility aliases.
- Status recommendations do not move grammar notes.
- The batch does not alter parser behavior.
- Tests remain implementation evidence only.
- Surface argument absence never proves intransitivity or a hidden argument.
- Alternative lexical-GIVE orders never inherit baseline role assignments automatically.
- Place-first order does not by itself determine subject, topic, frame, inversion, or oblique status.
- One-speaker historical judgments do not satisfy the role-neutral panel threshold.

## Next planned adjudication batch

Batch 12 should review the next five pending registry records after deterministic regeneration and overlap checking:

1. `AA80 LocativePlacePhrase`;
2. `AA82 LocativeWhQuestion`;
3. `AA83 MalformedCandidate`;
4. `AA85 MeasureExpression`;
5. `AA86 ModalANotAQuestion`.
