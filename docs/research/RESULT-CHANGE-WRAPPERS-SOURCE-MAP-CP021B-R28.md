# Result/change wrapper source map (CP021B-R28)

Date: 2026-07-19  
Scope: claim-level research mapping only; **no parser behavior, fixture, manifest, accepted version, or held-out file changed or opened**.

## Family selected

After verifying R27 and ranking the 36 remaining unmapped language labels, R28 selected eleven tightly coupled Lane 05 result/change wrappers rather than the broad `ActionStativeVP`, `ProductiveVO`, or `TransitiveVP` umbrellas:

- `CausativeResultFrame`
- `CausativeResultPredicate`
- `ChangeIntoPredicate`
- `DisposalChangeIntoResultFrame`
- `ModalChangeIntoResultFrame`
- `PerfectiveObjectResultPredicate`
- `PerfectiveResultPredicate`
- `ResultStateClause`
- `SeemingPerfectiveResultClause`
- `TransformationResultFrame`
- `TransformationResultPredicate`

None of the eleven appears in the accepted non-held-out regression snapshots. They remain important because they encode an overlapping hidden ontology for causation, result, change, aspect, weather cessation, stance, scope, and topic attachment. R28 uses CP010 controls only as internal provenance, never as linguistic authority.

## Source-derived boundaries

### 1. A genuine Cantonese causative–resultative family exists, but it is not the exact `整冧咗` fallback

Lai and Pang define Cantonese CRCs as constructions with two verbal elements oriented to cause and effect. Their constructional account includes multiple syntactic and semantic subtypes. Crucially, they argue against mechanically composing the argument structures of the two lexical verbs: arguments belong to the whole CRC under their analysis.

This supports researching `整冧咗` as a possible bounded CRC instance. It does **not** validate the runtime’s exact subject + `整` + `冧` + `咗` + object template, its free object slot, or the separate parent/child labels. The exact lexical family needs corpus, negative-boundary, regional, and speaker evidence.

### 2. Perfective `咗` is not a result diagnostic

Kędzior separates morphological aspect from lexical and periphrastic material and discusses the relationship between RVCs and perfective aspect. The CUHK reference separately illustrates causatives, resultative compounds, resultative/extent complements, inverted resultatives, and resultative passives. Therefore:

- `解決咗` may be lexical endpoint semantics plus perfective aspect;
- `熟咗` may be a lexical state/change predicate plus perfective aspect;
- `停咗雨` requires an independent analysis of weather cessation and valency;
- `變咗做` requires direct evidence for the sequence and the role of `做`.

The presence of `咗` does not license a `PerfectiveResultPredicate`, `ResultStateClause`, or `PerfectiveObjectResultPredicate` by itself.

### 3. `變成` is source-linked, but complement type and wrapper status must split

The uploaded coursebook directly attests:

> 冇咗電視，成個社會會變成點。

This supports overt `會 + 變成 + wh complement` in context. It does not validate a nominal-only `ChangeIntoPredicate`, a dedicated `ModalChangeIntoResultFrame`, or unrestricted complement selection. The runtime’s internal control `呢個地方會變成公園` remains useful only as a future composition test.

### 4. `會將 X 變成 Y` is compositionally transparent in the current project

The runtime hard-codes a full modal-disposal-change wrapper. Its components are independently source-linked: `將` constructions are attested, and `會 + 變成` is attested. No inspected source directly established the runtime’s exact combined template or obligatory modal. CP010 additionally reports that its constructed control already succeeds through ordinary composition without the dedicated label. This makes `DisposalChangeIntoResultFrame` a merge/retire candidate, not a new grammar target.

### 5. Exact `變咗做` remains a direct-source gap

The runtime assigns `做` a result-linker role in `變 + 咗 + 做 + nominal result`. Targeted inspection did not recover an exact scholarly or textbook attestation in this batch. Related `變成` evidence cannot be used to infer interchangeability, identical complement selection, or free productivity. The internal `間舖變咗做餐廳` control remains a research question, not proof.

### 6. `解決咗` is an over-specific transparent wrapper

`PerfectiveResultPredicate` is hard-coded to the single lexical predicate `解決`. External evidence supports perfective composition and constrained aspect placement, but the exact surfaces were not independently recovered in R28. CP010 itself describes them as ordinary lexical result verb + perfective composition. The dedicated wrapper should merge or retire unless it contributes independently sourced behavior.

### 7. `停咗雨` requires weather-valency research, not object-result terminology by fiat

The runtime calls `停` a result verb and `雨` an object. No inspected independent source directly supports that exact valency or label. The safer future target is a theory-neutral weather-cessation relation with overt `雨` and overt perfective `咗`, leaving subject/object/domain alternatives unresolved. The exact `香港好似尋日停咗雨` six-slot wrapper compounds this gap with unsourced stance and attachment assumptions.

### 8. `好多都熟咗喇` bundles four independent layers

The runtime combines optional quantity scope (`好多`), focus (`都`), exact lexical predicate `熟`, perfective `咗`, and a final particle. Independent sources support property-predicate category overlap and perfective aspect, not the exact wrapper or free expansion to other state predicates. Future remediation should separate scope, lexical changed-state interpretation, aspect, and discourse particle.

## Dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `CausativeResultFrame` | `SOURCE_LINKED_CRC_FAMILY_WITH_EXACT_JING2_LAM3_ZO2_FRAME_LEXICAL_NARROWING_REQUIRED` | Retain broad CRC linkage but narrow the exact 整冧咗 frame by lexeme, argument structure, speaker/register evidence, and negative boundaries. |
| `CausativeResultPredicate` | `SOURCE_LINKED_TWO_VERBAL_CAUSE_EFFECT_CORE_WITH_EXACT_LEXICAL_TEMPLATE_AND_ARGUMENT_REALIGNMENT_REQUIRED` | Treat cause/effect as a construction-level relation; review child-node necessity and do not derive roles mechanically from individual verbs. |
| `ChangeIntoPredicate` | `LEXICAL_CHANGE_PREDICATE_SOURCE_LINKED_RESULT_COMPLEMENT_TYPE_SPLIT_REQUIRED` | Retain lexical 變成 while splitting overt complement types and keeping productivity/selection lexically bounded. |
| `DisposalChangeIntoResultFrame` | `COMPONENTS_SOURCE_LINKED_TRANSPARENT_MODAL_DISPOSAL_CHANGE_COMPOSITION_WRAPPER_MERGE_OR_RETIRE` | Merge/retire as modal/disposal/object/change composition; directly source the combined template before preserving a dedicated frame. |
| `ModalChangeIntoResultFrame` | `COMPONENTS_SOURCE_LINKED_TRANSPARENT_MODAL_PLUS_CHANGE_PREDICATE_WRAPPER_MERGE_OR_RETIRE` | Merge/retire as transparent modal + lexical change-predicate composition unless independent wrapper behavior is found. |
| `PerfectiveObjectResultPredicate` | `WEATHER_CESSATION_PLUS_PERFECTIVE_SOURCE_LINKED_VALENCY_AND_LABEL_REALIGNMENT_REQUIRED` | Research 停咗雨 valency and regional distribution; realign from object-result terminology to weather cessation if evidence supports it. |
| `PerfectiveResultPredicate` | `LEXICAL_RESULT_VERB_PLUS_PERFECTIVE_SOURCE_LINKED_TRANSPARENT_COMPOSITION_MERGE_OR_RETIRE` | Merge/retire controlled 解決咗 wrapper in favor of lexical predicate + perfective aspect, subject to regression review. |
| `ResultStateClause` | `SOURCE_LINKED_CHANGED_STATE_PLUS_PERFECTIVE_WITH_SCOPE_WRAPPER_SPLIT_AND_REALIGNMENT_REQUIRED` | Split scope/focus, lexical changed state, perfective aspect, and particle; avoid exact 熟-only clause ontology. |
| `SeemingPerfectiveResultClause` | `COMPONENTS_LINKED_EXACT_SIX_PART_WRAPPER_SOURCE_GAP_AND_CLAUSE_COMPOSITION_REALIGNMENT_REQUIRED` | Quarantine/merge fixed six-slot wrapper into ordinary stance, temporal, locative, weather, and aspect composition. |
| `TransformationResultFrame` | `TRANSPARENT_TOPIC_PLUS_TRANSFORMATION_PREDICATE_WRAPPER_MERGE_OR_RETIRE_WITH_EXACT_FORM_GAP` | Review for dependency-aware retirement as a transparent topic wrapper; preserve child exact-form gap. |
| `TransformationResultPredicate` | `COMPONENTS_SOURCE_LINKED_EXACT_BIN3_ZO2_ZOU6_RESULT_LINKER_GAP_AND_LEXICAL_NARROWING_REQUIRED` | Keep exact 變咗做 and 做-linker analysis research-pending; do not analogize from 變成. |


## Forbidden inferences

R28 does not authorize:

- treating every two-verb sequence as a causative–resultative construction;
- deriving CRC argument roles mechanically from each child verb;
- treating `咗` as proof of result, changed state, causation, or completion lexical semantics;
- generalizing `整冧咗` to arbitrary result verbs or objects;
- treating `變成`, `變咗做`, V-result compounds, and V-`到` as interchangeable;
- treating `做` as a universal result linker;
- requiring `會` in all change-into or disposal-change clauses;
- treating every `將` clause as change-of-state;
- treating `解決咗` as an independent grammar construction rather than potentially transparent composition;
- asserting that `雨` is an ordinary object in `停咗雨` without valency evidence;
- inserting a hidden weather subject, event, cause, result, antecedent, or stance scope;
- treating `好多`, `都`, `熟咗`, and a final particle as one indivisible construction;
- using internal CP010 controls or parser output as Cantonese authority;
- treating failure to find an exact form as evidence of unacceptability;
- changing parser behavior during the research freeze.

## Open evidence gaps

- natural corpus attestations and negative boundaries for `整冧咗` and related CRC lexemes;
- exact direct attestations and regional/register distribution of `變咗做`;
- complement-selection profile for `變成`, including nominal, adjectival, and wh results;
- exact combined `會將 X 變成 Y` evidence and modal optionality;
- direct exact attestations of the runtime `解決咗` surfaces;
- argument structure and natural distribution of `停咗雨`;
- exact independent evidence for `香港好似尋日停咗雨`;
- lexical/event-class restrictions on changed-state `熟咗` and its scope particles;
- theory-neutral representation of cause, change, result, aspect, state, and clause attachment.

## Freeze result

This checkpoint changes research provenance only. No parser node, role, gloss, heuristic, fixture, test expectation, manifest field, accepted behavior, or held-out item was changed or opened.
