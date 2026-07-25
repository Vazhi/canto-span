# Construction adjudication — Batch 13

**Adjudication date:** 2026-07-25  
**Authority:** project expert systematic review  
**Records:** `AA87`, `AA88`, `AA89`, `AA90`, `AA91`

## Integration state

The expert decisions are recorded in
`data/construction-adjudication-batches/batch-13.json` and applied to the canonical
identity registry, label sweep, discovery registry, generated research reports,
and current documentation in the same pull request state.

This batch changes identity and ontology metadata only. It does not authorize or
perform a runtime-label migration, status-path migration, matcher change, fixture
change, new UUID allocation, retirement or restoration, survey change, release
change, promotion, or merge.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Action |
|---|---|---|---|---|
| `AA87` | `ModalChangeIntoResultFrame` | `ModalChangePredicateCompositeWrapper` | `parser_representation` | `retain_retired_reclassify` |
| `AA88` | `ModalResponseFragment` | `ModalEllipsisResponseCompositeWrapper` | `parser_representation` | `retain_retired_reclassify` |
| `AA89` | `ModalVP` | `ModalAuxiliaryComplementVP` | `language_construction` | `rename_retain_narrow` |
| `AA90` | `ModifiedNP` | `HeterogeneousNominalStructureWrapper` | `parser_representation` | `internalize_and_decompose` |
| `AA91` | `ModifierNP` | `DegreePropertyModifierNounNP` | `language_construction` | `rename_retain_narrow` |

No UUID or permanent code changes.

## AA87 — ModalChangePredicateCompositeWrapper

- UUID: `24e74115-19b7-5df0-8716-d82d5797743c`
- Lifecycle: remains retired.
- Family: `ResultAndChangeRepresentation`
- Profile: `ModalPlusChangeIntoPredicateAggregate`
- Alignment: `disjoint`; the outer frame adds no language-construction boundary.
- Status recommendation: remain retired.

The retirement audit records no accepted fixture and no surviving parser output.
The former wrapper fused modal material with an independently represented change
predicate. Its component evidence supports ordinary composition, not a dedicated
modal-result frame.

The permanent UUID remains resolvable as historical parser representation only.
Any future modal-plus-change proposal must identify its overt modal, arguments,
aspect, and change predicate independently and must not inherit evidence through
this retired wrapper.

## AA88 — ModalEllipsisResponseCompositeWrapper

- UUID: `24ca75ca-eb10-584d-93c4-0838137971cd`
- Lifecycle: remains retired.
- Family: `FragmentAndEllipsisRepresentation`
- Profile: `ModalExpressionEllipsisAndResponseAggregate`
- Alignment: `disjoint`; modal syntax, ellipsis, and discourse response are separate.
- Status recommendation: remain retired.

The retirement audit records zero fixtures, zero active runtime references, and
zero parser outputs. The mapped research treats auxiliary structure and VP
ellipsis as independently constrained phenomena; neither establishes a generic
modal-response-fragment construction.

Future work must identify an overt ellipsis licensor and recoverable constituent,
then represent response or fragment status from discourse context. Auxiliary or
ellipsis evidence cannot be transferred to the obsolete composite.

## AA89 — ModalAuxiliaryComplementVP

- UUID: `e3ad991e-f109-57ab-a363-cfc2e6d4e170`
- Family: `ModalAuxiliaryPredication`
- Profile: `OvertModalAuxiliaryWithFollowingPredicate`
- Alignment: runtime broader than the retained language profile.
- Status recommendation: retain `research_pending`.

The executable positives include overt modal-plus-predicate strings with `要`,
`會`, `可以`, and `使`, including ordinary preverbal negation. They also include
the standalone A-not-A question `你要唔要`, which lacks the visible complement
required by the retained profile.

Luke and Nancarrow inventory Cantonese auxiliaries with differing functions, and
Yip and Matthews contrast `唔要` with `唔使`. The UUID therefore remains attached
only to overt modal or auxiliary plus visible predicate. Standalone A-not-A,
desiderative `想`, ellipsis, lexeme-specific polarity, and individual modal
readings require separate profiles and evidence.

## AA90 — HeterogeneousNominalStructureWrapper

- UUID: `14579a47-c762-5ace-ade4-5b0744ea8c85`
- Family: `NominalStructureRepresentation`
- Profile: `DeterminerClassifierModifierMeasureAndArgumentAggregate`
- Alignment: `disjoint`; the executable inventory is not one modifier construction.
- Status recommendation: migrate to `parser_heuristic` only through a separate compatibility change.

The 38 executable positives span wh-determiner nouns, classifier and quantified
NPs, existentially introduced nominals, locative or argument nominals,
nominal-predicate measures, and other headed or headless structures. The cited
nominal-modification sources support specific ordering and marker contrasts, not
this aggregate.

The wrapper may preserve a broad nominal span for compatibility, but every
positive must ultimately resolve to an independently typed nominal subtype and
licensing parent. It must cease competing as a direct Cantonese construction.

## AA91 — DegreePropertyModifierNounNP

- UUID: `6cb39abf-cd97-5701-8b7d-d2575645c127`
- Family: `NominalModificationAndRelatives`
- Profile: `DegreePropertyBeforeOvertNounWithoutGe`
- Alignment: runtime narrower and defensible.
- Status recommendation: retain `research_pending`.

The only executable positives are `我最近好大壓力` and the same clause with a
discourse preface. Both contain a degree-marked property expression directly
before an overt noun without `嘅`.

Sio distinguishes direct property-noun modification from `嘅`-marked
modification, while Yu independently illustrates adjective-noun order. The
retained UUID is limited to the overt degree-property-plus-noun profile. It does
not cover generic modified NPs, `嘅`-marked modifiers, classifier-linked
structures, relative clauses, or nominal complements.

## Evidence boundary

The adjudication uses the current immutable identity registry, current grammar
notes, current executable construction files, the retired-construction archive,
and verified source records already mapped by the repository.

Implementation reachability and test success carry zero independent linguistic
evidence weight. Evidence does not transfer across a retired composite, modal
lexeme or reading, polarity pattern, A-not-A profile, ellipsis analysis, nominal
subtype, modifier marker, relative clause, nominal complement, or future
successor.

## Resulting inventory

After deterministic application:

- expert-adjudicated identities: **64 / 181**;
- pending adjudications: **117**;
- accepted batches: **13**;
- `boundary_ready`: **1**;
- `source_supported`: **64**;
- `narrowing_candidate`: **34**;
- `excluded_nonlanguage`: **32**;
- `lexicalized_review`: **2**;
- `retired_evidence_rehome_candidate`: **42**;
- `retired_research_gap`: **6**;
- promotion-ready: **0**.

## Explicitly unchanged

- `main.js` and runtime behavior;
- emitted legacy labels;
- grammar-note paths and linguistic statuses;
- executable fixtures;
- lifecycle state, UUIDs, and permanent codes;
- survey instruments, responses, and deployment state;
- corpus decisions;
- release version, tags, and packages;
- merge authorization.
