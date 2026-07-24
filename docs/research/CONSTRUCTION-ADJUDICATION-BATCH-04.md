# Construction adjudication batch 04

**Adjudicated:** 2026-07-24  
**Scope:** next five highest-ranked direct-source records after Batch 03  
**Authority:** project expert systematic review

No record is promoted by this adjudication. Decisions concern permanent identity, naming, claim layer, family/profile placement, and explicit migration recommendations.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Decision | Status recommendation |
|---|---|---|---|---|---|
| `AA73` | `IntendedFunctionRelation` | `JungLaiUseFunctionConstruction` | language construction | rename and retain narrow | remain `research_pending` |
| `AA74` | `IntentionFrame` | `NamZyuVPComplementClause` | language construction | neutralize semantic overclaim and retain narrow | remain `research_pending` |
| `AA81` | `LocativePostureVP` | `PostureLocativeActionWrapper` | parser representation | internalize and decompose | migrate to `parser_heuristic` |
| `AA95` | `NamingClause` | `PersonalGiuNameClause` | language construction | rename and retain narrow | remain `research_pending` |
| `AB02` | `NegatedStativePredicate` | `M4NegatedPropertyPredicate` | language construction | rename and retain narrow | remain `research_pending` |

## AA73 — JungLaiUseFunctionConstruction

The runtime positive is defined by overt `用嚟` and a following use/function VP, not by a generic machine-inferred intention relation. The current test contrasts `呢隻杯我用嚟飲水` with malformed markerless material and ordinary instrumental `用` without `嚟`.

The canonical name now exposes the overt marker. It remains neutral about whether the resource is a topic, object, displaced instrument, or another constructionally licensed participant. The existing sources support purposive serial material and instrument movement or omission, but not unrestricted inference from adjacency.

## AA74 — NamZyuVPComplementClause

`IntentionFrame` encoded one interpretation as if it were the construction's permanent identity. The source set instead shows that `諗住` has a lexically restricted intention reading alongside thought or assumption-related senses.

The approved identity is therefore structural: overt subject + `諗住` + visible VP complement. The intention reading remains source-linked interpretation metadata. Subject omission, nominal content, complement classes, and the wider polysemy remain unresolved.

## AA81 — PostureLocativeActionWrapper

This is the main ontology correction in Batch 04. The runtime positive requires posture + `喺度` + another action, while `坐喺度` without the following action is explicitly absent. The research more directly supports posture or verbal predication with a locative phrase; it does not establish the entire runtime aggregate as one construction.

The UUID is therefore reclassified as a parser representation. Migration should preserve independently typed posture, locative, aspect/distributive material, and the following action or purpose relation. A future source-aligned posture-locative language construction would require a new UUID after its boundary is specified.

## AA95 — PersonalGiuNameClause

The source and runtime scopes match closely: personal `叫 + name` with an overt subject. `叫做` category or alternative designation and surname predicate `姓` are separate profiles.

`NamingClause` was too broad to distinguish those constructions. `PersonalGiuNameClause` names the lexical predicate and personal-name subtype without claiming broader naming syntax.

## AB02 — M4NegatedPropertyPredicate

The evidence supports overt `唔` directly negating a property predicate without a copula. The source-linked boundary is a negative nominal predicate requiring `唔係`.

The new name makes the marker and property-predicate scope explicit. It does not generalize to `冇`, `未`, `咪`, lexicalized negative meanings, or every item that the runtime might classify as stative.

## Discovery consequences

After Batch 04:

- promotion-ready remains `0`;
- `AB30 ZoMarkedPerfectiveObjectVP` remains the only direct `boundary_ready` record;
- `AA81` leaves the linguistic candidate pool and becomes an internal/non-language record;
- `AA73`, `AA74`, `AA95`, and `AB02` remain direct source-supported records with completed ontology review;
- completed adjudication still does not satisfy runtime-location, corpus, panel, or held-out gates.

## Safeguards

- no UUID or short code changed;
- no runtime matcher, fixture expectation, or linguistic status file changed;
- legacy runtime names remain attached as aliases;
- source terminology remains metadata rather than permanent identity;
- status and runtime migrations remain explicit future commits;
- earlier adjudication batches remain unchanged;
- no candidate was promoted.
