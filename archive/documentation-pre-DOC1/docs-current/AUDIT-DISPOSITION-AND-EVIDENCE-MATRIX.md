# Audit Disposition and Evidence Matrix

> **Current authority — 2026-07-17 / CP021A:** Support class and origin status are independent. A legacy claim can have compatible post-hoc sources without becoming externally originated.

## Support classes

| Support class | Minimum interpretation |
|---|---|
| `supported_productive` | Pattern-specific independent description, diverse natural attestation across lexical items, explicit negative boundaries, immutable held-out evaluation, competing-analysis adjudication, and native/expert review where structural uncertainty remains. |
| `supported_lexicalized` | Independent support for a fixed expression or tightly bounded inventory; no broad productivity claim. |
| `provisional` | Broad family is supported, but exact boundary, productivity, sense, hierarchy, or Canto Span representation remains unresolved. |
| `research_pending` | Plausible claim with inadequate pattern-specific evidence or incomplete adjudication. |
| `parser_heuristic` | Operational cue useful to the implementation; must not be asserted as a Cantonese construction. |
| `lexicalized_only` | Current parser coverage is vocabulary-bound and cannot be generalized. |
| `unsupported_generalization` | Scope exceeds the evidence or no adequate pattern-specific support exists. |

Current project counts contain no `supported_productive` claim.

## Origin classes

| Origin class | Meaning |
|---|---|
| `external_evidence_originated` | External propositions were extracted before the project language claim was written. |
| `legacy_source_linked_posthoc` | A pre-existing internal claim later received compatible scoped sources. |
| `legacy_origin_not_proven` | No recoverable evidence that external evidence originated the claim. |
| `internal_representation_only` | Engineering representation, not a Cantonese construction claim. |
| `internal_heuristic_only` | Operational selector, not a Cantonese construction claim. |

## Dispositions

| Disposition | Meaning | Runtime effect during freeze |
|---|---|---|
| `retain` | Current scope is best supported at its existing confidence. | None |
| `narrow` | Evidence supports a smaller form, sense, lexical class, context, variety, or register. | Recommendation only |
| `relabel` | The representation may remain useful but the name overstates or misidentifies the claim. | Recommendation only |
| `downgrade` | Current confidence/status exceeds available evidence. | Recommendation only |
| `quarantine` | Preserve behavior for regression/review but prohibit positive grammar-evidence use. | Documentation/evidence recommendation only |
| `lexicalize` | Retain only fixed or closed material. | Recommendation only |
| `retire` | No defensible linguistic or engineering value remains. | Recommendation only |
| `replace` | One or more explicitly debunked/rejected constructions are removed or superseded by an evidence-backed analysis; unsupported claim inventory must not increase. | Eligible only in a separate replacement implementation and acceptance batch |
| `defer` | Evidence is insufficient for a responsible decision. | None |

## Evidence matrix

| Evidence | Attestation | Productivity | Exact structure | Naturalness | Parser stability |
|---|---:|---:|---:|---:|---:|
| Pattern-specific linguistic source | Yes | Sometimes, with explicit scope | Sometimes | Sometimes | No |
| Natural corpus example | Yes | No, without distribution | No | Strong contextual evidence | No |
| Multiple diverse corpus examples | Yes | Partial | No | Stronger | No |
| Dictionary entry | Lexical only | Usually no | Usually no | Limited | No |
| Native naturalness review | Yes for reviewer/context | No | No | Yes | No |
| Native/expert analysis review | Potentially | Potentially | Yes, within task | Indirect | No |
| Historical fixture | No independent support | No | No | No | Yes |
| Generated probe | No | No | No | No | Test input only |
| Summary/full diagnostic | No | No | Shows parser output only | No | Yes |
| Aggregate regression | No | No | No | No | Yes |

## Productive-support vetoes

Do not assign `supported_productive` while any material condition remains:

- only one lexical item or fixed expression;
- only internal fixtures or generated probes;
- no negative boundary cases;
- no immutable held-out set;
- unresolved major competing analysis;
- corpus examples lack context/provenance;
- naturalness is being used as analysis validation;
- parser wrappers are being treated as language constructions;
- known false-clean parser analyses remain unaccounted for;
- register, variety, or predicate-class restrictions are ignored.

## Decision record

Every disposition row must state:

```text
claim_id
origin_status
runtime_label
claim_layer
current_support_class
recommended_support_class
recommended_disposition
evidence_for
evidence_against
external_source_ids
claim_source_edge_ids
negative_boundaries
competing_analysis
heldout_result
native_naturalness_scope
native_or_expert_analysis_scope
confidence
unresolved_items
future_remediation_candidate
runtime_change_authorized = false
```

## CP011 — LANE-01 inventory checkpoint

| Scope | Inventory result | Evidence outcome | Runtime action |
|---|---|---|---|
| 10 LANE-01 runtime labels | complete | one exercised umbrella, one recipient family needing split, three 用嚟 nodes forming one research family, five dormant/lexicalized wrappers | none |
| 18 historical findings | mapped | broad relational facts and ambiguity warnings supported; aspect/control diagnostics remain theory-sensitive | none |
| 26 diagnostic probes | 26 summaries + 26 full diagnostics reviewed | 3 narrow target-clean; 2 false-clean; 21 partial, cross-lane, or underparsed | frozen remediation only |

No CP011 recommendation is synchronized to runtime legitimacy metadata.

## CP012 — core coverb/control adjudication

| Scope | Evidence outcome | Recommended disposition | Runtime action |
|---|---|---|---|
| `CoverbFrame` | one clean bare `同` frame; broad event relations supported but category theory disputed | retain `research_pending` as narrow typed internal umbrella | none |
| V1 aspect/modal/negation/A-not-A diagnostics | marked forms independently attested; Francis–Matthews and Leung disagree on analysis | downgrade to defeasible scope/analysis cues | none |
| `幫` | benefactive, lexical help, and possible object-control uses; bare ambiguity supported | retain provisional typed polyfunctionality | none |
| `用` | instrumental and lexical-use functions supported; current generic nesting creates false-cleans | split instrument relation from lexical use in future remediation | none |
| `同` | comitative relation and marked forms supported; exact category unresolved | retain relation, defer category theory | none |
| `陪/跟` | accompaniment/following supported; split-control analysis not independently validated | retain research-pending typed relation | none |
| Binding/passive diagnostics | useful in one detailed analysis; not independently validated | research probes only | none |

CP012 reviewed 56/56 summaries and full diagnostics, found 12 semantic false-cleans, and applied no recommendation to runtime legitimacy metadata.


## CP013 — stacking, order, source, path, and motion boundaries

| Scope | Evidence outcome | Recommended disposition | Runtime action |
|---|---|---|---|
| compatible relation stacking | published compatible co-occurrence; no evidence for arbitrary or productive free stacking | retain narrow `research_pending` co-occurrence only | none |
| manner–relation ordering | both orders occur in published judgments; corpus did not supply an independent free-reversal minimal pair | narrow to construction- and discourse-conditioned alternatives | none |
| temporal ordering | clause-internal time-before-relation is well supported; absolute surface precedence is contradicted by discourse afterthoughts/repairs | reject absolute claim; replace only in a future gated batch with canonical hierarchy plus discourse exception | none |
| `喺` | preverbal location-of-action is independently described and corpus-attested | retain narrow typed locative relation | none |
| `由` | corpus supports source linked to motion/path events | retain context-conditioned typed source relation | none |
| `向` | narrow clean directed-motion probe; independent orientation/goal description | retain research-pending orientation/goal relation | none |
| `經` | independent route/via description but sparse recovered CP013 corpus support | retain `research_pending` route relation | none |
| generic `CoverbFrame` semantics | full-root wrappers frequently contain wrong or missing internal analysis | reject semantic-clean inference; keep only a research umbrella | none |
| conventional `返學` as `ProductiveVO` | false local object analysis inside route/locative rows | reject; eligible replacement target for existing motion architecture | none |
| manner+source as `ModifierNP` / source+manner as `TopicComment` | false local analyses in held-out rows | reject; eligible replacement targets | none |
| bare source/route/orientation fragments | do not establish complete relational constructions | retain negative boundary / review-bearing status | none |

CP013 reviewed 50/50 summaries and 50/50 full diagnostics, recorded twelve claim dispositions and twenty frozen remediation candidates, and applied no recommendation to runtime code or legitimacy metadata.

## CP014 — 畀 recipient, beneficiary, passive, causative, and instrument adjudication

| claim family | evidence result | disposition | runtime change |
|---|---|---|---|
| lexical transfer `畀` | independent analyses plus natural corpus support a distinct giver-theme-recipient predicate | retain narrow `research_pending` typed transfer | none |
| postverbal recipient/dative | supported after compatible give/return/communication predicates | retain predicate-conditioned provisional relation | none |
| beneficiary versus dative | valency and optionality evidence contradicts one unified construction | split claims; reject unified `RecipientFrame` grammar claim | none |
| beneficiary/purpose wrapper | competing structural analyses; parser wrappers do not establish one exact construction | reject exact umbrella; preserve typed relations and theory sensitivity | none |
| causative `畀` | supported narrowly as permissive ‘let/allow’ | reject generic force causative | none |
| passive/permissive shared string | context-dependent ambiguity is independently documented | reject deterministic surface classifier | none |
| canonical passive | patient/topic + overt agent + passive predicate supported; non-adverse examples exist | retain narrow provisional passive relation | none |
| indirect passive | malefactive/topic initial NP plus retained patient object is a separate subtype | reject generic affectedness collapse; retain research-pending subtype | none |
| modern instrumental `畀` | productive HK use unsupported; historical/dialectal evidence and fixed `畀心機` only | reject productive modern rule; lexicalized/historical only | none |
| `畀/俾` orthography | same grammatical functions occur with both spellings | reject grammatical split | none |
| bare `畀 NP` / short fragments | function is underdetermined without context | reject clean function-specific fragment generalization | none |

CP014 reviewed 64/64 summaries and 64/64 full diagnostics, recorded sixteen claim dispositions and twenty frozen remediation candidates, found twelve full-root semantic false-cleans, and applied no recommendation to runtime code or legitimacy metadata.


## CP015 — `用嚟` function, purpose, and serial boundaries

| Scope | Evidence outcome | Recommended disposition | Runtime action |
|---|---|---|---|
| purposive `嚟` | independently attested beyond `用嚟` | retain narrow `research_pending` linker/function | none |
| intended-function `用嚟 + predicate` | conventional and independently supported | retain narrow provisional relation | none |
| three-node `UseForPurpose*` hierarchy | parser decomposition, not three language constructions | reject language-level triple ontology | none |
| copula/modal requirement | contradicted by direct declaratives | reject as language boundary | none |
| motion analysis in function contexts | purposive/function use is not deictic motion | reject | none |
| bare `用嚟` and exact-string recognition | context-dependent and overgenerating | reject clean completeness and unconditional string rules | none |

CP015 reviewed 58/58 summaries and full diagnostics, found three semantic false-cleans, and changed no runtime or legitimacy metadata.


## CP016 — dormant/lexicalized bridge-label disposition

| Scope | Evidence outcome | Recommended disposition | Runtime action |
|---|---|---|---|
| runtime reachability | all four zero-fixture labels remain live executable fallback constructors | reject “dormant metadata” assumption | none |
| `ComitativeActionMotionVP` | exact `約埋 + participant + 一齊 + optional motion` gate; natural analogues vary heads and structures | retire language-level label and exact gate; preserve component relations only | none |
| `ActionSourceFocusClause` | exact lexical instance of broader `係…嘅` cleft/focus plus locative borrowing | retire exact label; future replacement may map to broad cleft plus embedded clause | none |
| `GoalDirectedActionPredicate` | child-only `掉落 + goal` node, no fixtures, no independent dispatch | retire redundant child label | none |
| `ModalGoalBenefactivePurposeClause` | hard-coded `應該/掉落/畀/食` composite already rejected by CP014 | retire exact composite; decompose relations in any future replacement | none |
| outer-wrapper acceptance | full-root modal/desiderative/question/clause wrappers preserve false decisive children | reject semantic validation from root coverage alone | none |
| corpus non-recovery | component analogues recovered; exact zero hits are not negative evidence | retain methodological boundary | none |

CP016 reviewed 60/60 summaries and full diagnostics, found eighteen semantic false-cleans, recorded fourteen dispositions and sixteen frozen remediation candidates, and changed no runtime or legitimacy metadata.


## CP017 — LANE-01 final synthesis and replacement sequencing

| Scope | Final result | Runtime action |
|---|---|---|
| 10 runtime labels | 10/10 final dispositions; one narrow internal umbrella, two rejected unified 畀 frames, three nodes consolidated to one function domain, four exact bridge labels retired | none |
| 18 historical findings | 18/18 final dispositions; ambiguity and typed-relation facts retained narrowly, category/order rules downgraded, absolute temporal precedence replacement-eligible | none |
| replacement mapping | 12 packages with exact removed/superseded claims, score, dependencies, and stop conditions | none |
| dependency-constrained sequence | 8 packages; recursive semantic foundation first, broad CoverbFrame migration last | none |
| blocked component replacements | 4: invitation/埋/一齊, broad 係…嘅 cleft, caused-motion/path, and modal-benefactive-purpose composition | none |

Authoritative companions:

- `../research/LANE-01-FINAL-SYNTHESIS-CP017.md`
- `../research/LANE-01-FINAL-CLAIM-DISPOSITION-MATRIX-CP017.md`
- `../research/LANE-01-REPLACEMENT-SEQUENCE-CP017.md`
- `../research/LANE-01-REPLACEMENT-DEPENDENCY-GRAPH-CP017.md`

CP017 changes no runtime behavior or legitimacy metadata. The exact next authorized batch is limited to recursive semantic acceptance and removal of the four live exact bridge constructors.

## CP018 — recursive semantic guard and bridge retirement candidate

| Scope | Candidate result | Acceptance effect |
|---|---|---|
| recursive semantic acceptance | new diagnostic gate recursively exposes unknown, dropped, malformed, context-dependent, retired, debunked, untyped-relation, and partial-root conditions through wrappers | review routing only; never automatic acceptance |
| `ComitativeActionMotionVP` | removed from registry, templates, dispatch, and legitimacy map | retired claim synchronized; no replacement grammar |
| `ActionSourceFocusClause` | removed from registry, templates, dispatch, and legitimacy map | retired claim synchronized; broad cleft remains blocked |
| `GoalDirectedActionPredicate` | removed from registry, templates, dispatch, and legitimacy map | retired child synchronized; caused-motion/path replacement remains blocked |
| `ModalGoalBenefactivePurposeClause` | removed from registry, templates, dispatch, and legitimacy map | retired composite synchronized; components remain separate future work |
| exact bridge surfaces after removal | underparsed, blocked, or review-required; no renamed bridge wrapper | acceptable candidate behavior pending rendered review |
| complex recipient `畀啲蚯蚓` | previous bridge dropout removed; visible NP preserved, but remaining parse is partial/untyped and blocked | correctness improvement without replacement claim |
| bare `用嚟。` | explicitly blocked as incomplete intended-function linker | CP015 false-clean guarded; no intended-function grammar added |
| ordinary locative control | frozen `我喺香港住。` exposes pre-existing unknown `住` and partial root | unresolved lexicon prerequisite; not a CP018 regression |

CP018 reduces the runtime and legitimacy inventories from 188 to 184 labels and unsupported generalizations from 107 to 103. All 60 summaries and full diagnostics were reviewed. Candidate status is headless-ready with rendered Obsidian acceptance pending.
