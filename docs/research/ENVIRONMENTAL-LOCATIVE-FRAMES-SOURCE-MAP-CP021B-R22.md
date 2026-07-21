# Environmental and locative frames (CP021B-R22)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixture, manifest, accepted version, or held-out file changed or opened**.

## Family selected

After verifying R21, the remaining 56 unmapped language labels were ranked using runtime references and non-held-out accepted-fixture reach. Broad `ProductiveVO` and `TransitiveVP` were again rejected as implementation umbrellas. The selected coherent family is:

- `ImpersonalEnvironmentalClause`
- `LocativeFrameClause`
- `LocativePostureVP`

The family concerns how weather, ambient properties, place frames, positioning constructions, and posture-location expressions are represented without conflating every initial place or absent overt subject.

## Runtime extraction

### ImpersonalEnvironmentalClause

The runtime combines three profiles:

1. fixed two-token weather events such as `落雨` and `打風`;
2. the one-token daylight transition `天光`;
3. ambient degree/property predicates such as `好凍` or `好熱`, optionally under time or place frames.

A temporal frame can wrap the environmental child, while a spatial frame plus an ambient property becomes a top-level `LocativeFrameClause`. The implementation explicitly avoids inserting a hidden subject, but that representational choice is not itself a sourced syntactic analysis.

### LocativeFrameClause

The label currently covers:

1. locative inversion: localiser + positioning predicate + perfective `咗` + theme;
2. place-property predication: place + stative/degree/negative property;
3. ambient place framing: place + environmental property.

Accepted non-held-out examples include `牆上面擺咗部電話`, `牆上面擺咗部機`, `屋企好靜`, and `出面好熱`.

### LocativePostureVP

The registry requires optional subject + one of `坐/企/瞓` + the single token `喺度`. It treats `喺度` as spatial and claims a bounded productive posture class. The label has no top-level accepted fixture in the inspected non-held-out regression snapshot.

## Source-derived boundaries

### 1. Weather events are lexical/conventional predicates, not generic VO

Tsuno directly attests `落雨喇` as a complete surface utterance. The uploaded coursebook independently uses `落雨`, `打風`, and `翻風` in contextualized weather lessons and keeps their meanings distinct. This supports exact lexical weather-event predicates. It does not establish an unrestricted verb+noun construction or make `雨` an ordinary patient object.

### 2. Weather events compose with ordinary clause framing

The coursebook places weather predicates under temporal expressions, questions, causals, conditionals, and modals. The environmental predicate should remain an overt child inside those larger relations rather than replacing the whole sentence label.

### 3. Ambient properties are not the same structure as weather events

`今日好凍`, `出面好熱`, and related descriptions contain ordinary degree/property-predicate material with an environmental interpretation. General Cantonese property predication is independently copula-less. The runtime must eventually separate lexical weather events, lexical transitions, and framed ambient property predication.

### 4. Overt subject absence does not settle syntactic subjectlessness

The exact weather sources show surfaces without a nominal subject. They do not prove a null expletive, zero-subject derivation, fixed valency class, or a unified impersonal construction. Canto Span should preserve the overt surface and mark the syntactic issue as unresolved.

### 5. Exact `天光喇` remains a direct-source gap

The runtime and accepted snapshot contain the item, but no directly inspected scholarly source was recovered for its exact constructional classification in R22. This is an evidence gap, not a negative grammaticality judgment.

### 6. Locative inversion is a narrow, separately studied construction

Lui gives the exact `牆上面擺咗部電話` sequence and distinguishes locative inversion from copular-location, posture/location, resultative-location, and existential strategies. The reported inversion order is localiser + verb/aspect + theme. The construction was rare in the cited picture-elicitation data, and the paper treats subjecthood and analysis as debated.

### 7. Perfective `咗` is part of the inspected inversion profile

In Lui's analyzed data, `咗` is required in the inversion examples while it can be omitted in an uninverted comparison. This supports narrowing the exact runtime profile, not a universal aspect rule for all place-initial clauses.

### 8. Place-property and ambient-place frames are compositional

`屋企好靜` is a place/property profile; `出面好熱` is a place-framed ambient property. Neither contains a positioning verb plus postverbal theme. They must not inherit inversion, existential, or hidden-figure analyses merely because a place expression comes first.

### 9. Posture plus location has exact but uneven support

The uploaded coursebook attests `你坐喺度等` and `啲人企晒喺度避雨`. These establish posture-location combinations while also showing material outside the runtime's two-token child: a following predicate and, in the second case, `晒`. No exact inspected source was recovered for runtime `瞓喺度` in this batch.

### 10. `喺度` requires a spatial/progressive ambiguity boundary

Wong documents locative `我喺度呀` and a contextually ambiguous `我喺度做功課`, which can mean “I do homework here” or “I am doing homework.” Token identity alone cannot force a locative or progressive analysis.

## Dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `ImpersonalEnvironmentalClause` | `SOURCE_LINKED_ENVIRONMENTAL_EVENT_TRANSITION_AMBIENT_SPLIT_AND_SUBJECTLESS_STATUS_NARROWING_REQUIRED` | Split lexical weather events, lexical transitions, and framed ambient property predicates. Preserve overt absence of a subject without asserting an expletive/null-subject theory. |
| `LocativeFrameClause` | `SOURCE_LINKED_LOCATIVE_INVERSION_PLACE_PROPERTY_AND_AMBIENT_FRAME_SPLIT_REQUIRED` | Retain a narrow inversion subtype with overt localiser, positioning verb, aspect, and theme; realign place-property and ambient-place profiles compositionally. |
| `LocativePostureVP` | `POSTURAL_LOCATIVE_STRATEGY_LINKED_EXACT_HAI2DOU6_CROSSPRODUCT_AND_PROGRESSIVE_BOUNDARY_GAP` | Source-link exact `坐喺度` and expanded `企晒喺度`; keep `瞓喺度`, free cross-product, complete-VP status, and spatial/progressive resolution research-pending. |

## Forbidden inferences

R22 does not authorize:

- treating `落雨` or `打風` as generic transitive VO;
- generating arbitrary weather predicates from a phenomenon noun;
- treating every overt-subjectless surface as one impersonal syntax;
- inserting or deleting a null/expletive subject;
- classifying every time/place-framed property as a weather event;
- treating every place-initial clause as locative inversion;
- using the 1.58% elicitation result as a language-wide frequency or rejection threshold;
- assigning subject, topic, or oblique status to the initial localiser as settled fact;
- extending the observed `咗` requirement beyond the sourced inversion profile;
- inserting a hidden located figure in place-property statements;
- treating every `喺度` as spatial or every `喺度` as progressive;
- licensing a free `坐/企/瞓 + 喺度` cross-product from two attested lexemes;
- using code, fixtures, or textbook pedagogy alone as proof of productivity;
- changing parser behavior during the research freeze.

## Open evidence gaps

- direct discourse/corpus analysis of `天光喇` and other daylight transitions;
- modern corpus frequency and lexical inventory for Cantonese weather predicates;
- theory-neutral diagnostics for overt-subjectless weather clauses;
- broader corpus evidence for locative inversion, verb selection, and aspect distribution;
- exact independent attestations and structural analysis of `屋企好靜` and `出面好熱`;
- exact `瞓喺度` evidence and the full posture/location lexeme inventory;
- prosodic and contextual diagnostics separating spatial and progressive `喺度`;
- native expert structural analyses; the project still has zero native expert analyses.

## Freeze result

This batch changes research provenance only. Parser code, grammar templates, roles, glosses, fixtures, tests, manifest data, accepted behavior, and held-out files remain unchanged.
