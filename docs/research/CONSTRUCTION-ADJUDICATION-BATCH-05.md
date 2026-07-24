# Construction adjudication batch 05

**Adjudicated:** 2026-07-24  
**Scope:** next five highest-ranked direct-source records after Batch 04  
**Authority:** project expert systematic review

No record is promoted by this adjudication. Decisions concern permanent identity, naming, claim layer, family/profile placement, and explicit migration recommendations.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Decision | Status recommendation |
|---|---|---|---|---|---|
| `AB05` | `NegativeExperiential` | `PreverbalNegativeExperientialWrapper` | parser representation | internalize and decompose | migrate umbrella to `parser_heuristic`; create separate marker-specific language UUIDs later |
| `AB24` | `PossessiveClassifierNP` | `PronounPossessorClassifierNounNP` | language construction | rename and retain narrow | remain `research_pending` |
| `AB33` | `PreferenceVP` | `ZungJiVPComplementClause` | language construction | rename and retain narrow | remain `research_pending` |
| `AB34` | `PriorityMarkerClause` | `PostverbalSinPriorityClause` | language construction | rename and retain narrow | remain `research_pending` |
| `AB58` | `ScalarEvaluation` | `M4SyunPropertyEvaluation` | language construction | rename and retain narrow; audit broader runtime predicates | remain `research_pending` |

## AB05 — PreverbalNegativeExperientialWrapper

The existing label combines two different overt negative strategies: `未 + V過` and aspectual-negative `冇 + V過`. The sources explicitly distinguish the negators, and the executable suite separately excludes final-`未` questions, `有冇` questions, non-experiential `未V`, general `唔`, and prohibitive `咪`.

The current UUID therefore becomes an implementation umbrella rather than a language-construction candidate. After compatibility migration, separate permanent language UUIDs should be allocated for the marker-specific `未 + V過` and `冇 + V過` profiles. Evidence must not be transferred between them merely because both contain experiential `過`.

## AB24 — PronounPossessorClassifierNounNP

The source family is commonly represented as POSS–CL–N and includes pronominal and full nominal possessors. The runtime's independently checked positives currently establish only pronominal possessor + classifier + overt noun, represented by `我架車` and `佢本書`.

The approved name records that narrower implemented subtype. `possessor + 嘅 + noun`, classifier-less adjacency, headless phrases, demonstrative-bearing forms, and full nominal possessors remain separate or unresolved.

## AB33 — ZungJiVPComplementClause

`PreferenceVP` is too broad because it could refer to many lexical and syntactic preference strategies. The checked runtime profile is specifically overt subject + lexical `鍾意` + visible VP complement, represented by `我鍾意聽音樂`.

The research also raises aspect-placement distinctions around main-verb and complement configurations. Those distinctions should remain explicit research questions rather than being hidden by a generic semantic label.

## AB34 — PostverbalSinPriorityClause

The sources emphasize postverbal `先` for a priority interpretation while also documenting polysemy, preparatory patterns, particleized uses, and variation. The runtime positive is an action VP followed by `先`, optionally with a final particle, represented by `你打電話先啦`.

The approved identity excludes preverbal `先` and formulaic or elliptical strings such as `第二時先啦`. It does not claim that every postverbal `先` belongs to one construction or has one meaning.

## AB58 — M4SyunPropertyEvaluation

The supported path is negative lexical `算` evaluation with an overt property predicate: `唔算貴`, `都唔算貴`, and independently attested degree-modified material such as `都唔算好差`. Topic material may be overt, as in `對皮鞋唔算貴` and `價錢唔算貴`.

`ScalarEvaluation` is too broad and risks restoring an unrelated scalar or price-domain ontology. The runtime also accepts category-compatible property predicates beyond the directly sourced examples, so the current behavior is broader than the evidence. Those extensions require lexical-by-lexical audit and must remain nonpromotional until supported.

## Discovery consequences

After Batch 05 is applied:

- promotion-ready remains `0`;
- `AB30 ZoMarkedPerfectiveObjectVP` remains the only direct `boundary_ready` record;
- `AB05` leaves the linguistic candidate pool and becomes an internal/non-language record;
- `AB24`, `AB33`, `AB34`, and `AB58` remain direct source-supported language records with completed ontology review;
- the future `未 + V過` and `冇 + V過` language records require new UUIDs and may not reuse `AB05`;
- completed adjudication still does not satisfy corpus, panel, held-out, or promotion gates.

## Safeguards

- no UUID or short code changed;
- no runtime matcher, fixture expectation, or linguistic status file changed;
- legacy runtime names remain attached as aliases;
- source terminology remains metadata rather than permanent identity;
- successor UUID allocation remains a separate collision-checked action;
- earlier adjudication batches remain unchanged;
- no candidate was promoted.
