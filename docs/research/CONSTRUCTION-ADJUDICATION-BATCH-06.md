# Construction adjudication batch 06

**Adjudicated:** 2026-07-24  
**Scope:** next five highest-ranked direct-source records after Batch 05  
**Authority:** project expert systematic review

No record is promoted by this adjudication. Decisions concern permanent identity, naming, claim layer, family/profile placement, and explicit migration recommendations.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Decision | Status recommendation |
|---|---|---|---|---|---|
| `AB60` | `ScalarValueQuestion` | `ScalarQuestionProfileWrapper` | parser representation | internalize and decompose | migrate umbrella to `parser_heuristic`; create separate lexical-price and scalar-predicate question UUIDs |
| `AB73` | `Topic` | `UseFunctionPreposedResourceRole` | parser representation | internalize into the 用嚟 family | migrate to `parser_heuristic`; do not retain an independent topic claim |
| `AB53` | `ResourceUseLaiFunctionRelation` | `ResourceInitialJungLaiFunctionClause` | language construction | rename and retain narrow | remain `research_pending` |
| `AA69` | `HeadlessDemonstrativeClassifierNP` | `DemonstrativeClassifierNPWithoutOvertNoun` | language construction | rename and retain narrow | remain `research_pending` and quarantined from promotion pending stronger evidence |
| `AB16` | `PassivePermissiveRelation` | `BeiPassivePermissiveAmbiguityWrapper` | parser representation | internalize and decompose | migrate umbrella to `parser_heuristic`; create separate reading-specific language UUIDs |

## AB60 — ScalarQuestionProfileWrapper

The existing label combines two different structures: lexical price questions such as `幾錢呀` or `幾多錢`, and compositional `幾 + scalar-dimension predicate` questions such as `幾遠` or `幾長`. The source note explicitly warns that their shared English translations do not establish one Cantonese construction, and the executable suite contains one positive of each type rather than a shared structural profile.

The current UUID therefore becomes an internal compatibility wrapper. Future language records require separate UUIDs for lexical price questions and scalar-predicate questions. Evidence may not be transferred between them merely because both ask for a scalar value.

## AB73 — UseFunctionPreposedResourceRole

`Topic` is not supported as an independent language-construction identity. Its only positive is `呢隻杯我用嚟飲水`, and its negative cases are boundaries of the same 用嚟 profile. The source states that an instrument or resource may be omitted or moved to subject position; it does not diagnose a general topic construction or license topicality from initial position alone.

The UUID is retained as an internal role over the preposed resource in the AA73 use-function profile. It should preserve uncertainty among topic, subject, moved instrument, and another resource-participant analysis rather than selecting one categorically.

## AB53 — ResourceInitialJungLaiFunctionClause

This record remains a narrow language-construction candidate. Its executable profile is an initial resource-like NP followed directly by `用嚟/用來 + VP`, without a separate overt user: `呢隻杯用嚟飲水`, `呢張紙用來寫字`, and related examples. The suite separately excludes AA73-like separate-user forms, ordinary instrumental `用`, general purposive `嚟`, modal and copular frames, negation, A-not-A, and actual-use aspect profiles.

The new name states the decisive word order and marker while remaining neutral among instrumental-SVC, purposive, and conventionalized-expression analyses. AB53 and AA73 are sibling profiles in the same family, not aliases.

## AA69 — DemonstrativeClassifierNPWithoutOvertNoun

The surface subtype is genuine: an overt demonstrative plus classifier forms an NP with no overt noun in the construction span, as in `呢本` and the NP `呢個` in `呢個係問題`. The former term `headless` risks implying a particular ellipsis or null-noun analysis that the project explicitly does not assert.

The record remains `research_pending`, but its current evidence is too weak for a promotion track. The only construction-specific source is an unpublished theoretical paper, and the positive tests are regression snapshots rather than exact source-linked focused positives. Stronger independent evidence and discourse-sensitive boundaries are required.

## AB16 — BeiPassivePermissiveAmbiguityWrapper

The existing record combines distinct passive, indirect-passive, permissive, and causative uses of `畀/俾`. The sources make those distinctions central, and context is often required to classify the same `NP1 + 畀 + NP2 + VP` surface. The two source-linked fixtures themselves instantiate different readings: permissive `我畀佢打籃球` and passive `我畀阿媽鬧`.

The UUID therefore becomes an internal ambiguity wrapper. Separate language UUIDs should later be allocated for source-bounded permissive, canonical passive, indirect passive, and any independently justified causative profiles. The wrapper must preserve the visible VP and participants and must not force one interpretation when the surface remains ambiguous.

## Discovery consequences

After Batch 06 is applied:

- promotion-ready remains `0`;
- `AB30 ZoMarkedPerfectiveObjectVP` remains the only direct `boundary_ready` record;
- `AB60`, `AB73`, and `AB16` leave the linguistic candidate pool;
- `AB53` and `AA69` remain direct source-supported language records with completed ontology review;
- three future split programs require new collision-checked UUIDs rather than reusing the umbrella IDs;
- completed adjudication still does not satisfy corpus, panel, held-out, or promotion gates.

## Safeguards

- no UUID or short code changed;
- no runtime matcher, fixture expectation, or linguistic status file changed;
- legacy runtime names remain attached as aliases;
- source terminology remains metadata rather than permanent identity;
- successor UUID allocation remains a separate collision-checked action;
- earlier adjudication batches remain unchanged;
- no candidate was promoted.
