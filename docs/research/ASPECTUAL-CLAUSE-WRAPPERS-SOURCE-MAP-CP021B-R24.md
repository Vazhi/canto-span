# Aspectual clause wrappers: perfective directional, experiential, and negative experiential (CP021B-R24)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixture, manifest, accepted version, or held-out file changed or opened**.

## Family selected

After verifying R23 and ranking the 49 remaining unmapped language labels, broad `ProductiveVO` and `TransitiveVP` were again rejected as research units. R24 maps three residual Lane 05 wrappers:

- `PerfectiveDirectionalVP`
- `ExperientialClause`
- `NegativeExperiential`

The already mapped `PerfectiveVP`, `ExperientialVP`, `ExperientialMotionGoalVP`, `ExperientialQuestion`, `ExperientialYesNoQuestion`, and `ProgressiveDirectionalVP` remain separate inherited analyses.

## Runtime claim extraction

### PerfectiveDirectionalVP

The runtime generates exactly `directional_head + 咗 + deictic_motion_marker`, with `入/落/上/出` in the first slot and `嚟/去` in the last. Two accepted top-level examples are `入咗嚟` and `落咗去`. The trace preserves three overt slots and explicitly avoids hidden subject/path claims.

### ExperientialClause

The registry declares optional subject + experiential VP + optional particle. Its only accepted top-level example is `食過飯`, where the tree already contains `ExperientialVP` (`食過`) inside a `TransitiveVP` with overt object `飯`. The outer clause wrapper adds no overt morphology.

### NegativeExperiential

The registry note describes `未 + experiential VP`, but the template uses the generic `negator` slot and optional focus/particle slots. It has no accepted fixture family. The current label therefore risks conflating `冇V過`, `未V過`, other negators, final-`未` questions, and ordinary `未V` constructions without experiential `過`.

## Source-derived boundaries

### 1. Perfective and directional structure are independently supported, but the exact runtime template remains a gap

Zhang directly attests motion predicates with perfective `咗`: `佢嚟咗喇` and `佢去咗喇`. Sio and Bond independently classify `咗` as outer perfective aspect. Shan and Jin and Yiu distinguish directional heads, complex directionals, and deictic `嚟/去`; the latter are not interchangeable neutral suffixes.

These sources support compositional **direction/path + perfective + deixis**. They do not directly attest the exact R24 strings `入咗嚟` or `落咗去`, nor the runtime's entire four-by-two cross-product. That is an exact-template gap, not a rejection of either form.

### 2. Experiential `過` is source-linked; the special clause wrapper is not

Zhang explicitly contrasts experiential `過` with perfective `咗` and explains `你飲過茶未` as asking whether the experience occurred. Sio and Bond list `過` as experiential outer aspect. Fan treats V過 as an experiential/event-type form rather than a marker of a specific occasion or date.

The uploaded coursebook supplies an overt-subject clause, `佢結過三次婚，又離過三次婚`. This supports ordinary clause composition with V過 and frequency material. It does not require a dedicated `ExperientialClause` node. In `食過飯`, the object belongs to the predicate's argument structure; the wrapper must not hide or duplicate it.

### 3. Negative experiential statements split by overt negator and temporal meaning

The uploaded coursebook explicitly separates four negative markers and gives:

- `我冇睇過今日嘅報紙` — `冇 + V過`;
- `我未去過美國` and `我未見過王小姐` — `未 + V過`;
- `今日嘅報紙我仲未睇完` — `未 + completion`, not experiential.

Lam independently distinguishes aspectual-negative `冇` from ordinary `唔`. Therefore a generic `negator + experiential_vp` slot is too broad. `冇V過` and `未V過` must remain separate profiles; `未` contributes a not-yet boundary that is not identical to `冇`.

### 4. Preverbal 未 statements, final 未 questions, and 有冇 questions are not one construction

Reference material attests final `未` after V過 as an experiential question, while the coursebook attests adjacent `有冇 + V過` in `你有冇去過澳門呀`. These are polar-question strategies. They must not be collapsed with preverbal `未V過` negative statements or routed through `NegativeExperiential`.

## Dispositions

| Label | Disposition | Parser-facing consequence |
|---|---|---|
| `PerfectiveDirectionalVP` | `SOURCE_LINKED_DIRECTIONAL_ASPECT_COMPOSITION_WITH_EXACT_TEMPLATE_GAP_AND_DEICTIC_SPLIT_REQUIRED` | Preserve direction, `咗`, and deictic identity; narrow the generated cross-product; keep exact `入咗嚟/落咗去` as direct-source gaps until independently attested. |
| `ExperientialClause` | `SOURCE_LINKED_TRANSPARENT_CLAUSE_WRAPPER_MERGE_OR_REALIGN_TO_EXPERIENTIAL_VP` | Retain overt V過 and arguments, but merge or transparently realign the clause wrapper to ordinary clause/VP composition. |
| `NegativeExperiential` | `SOURCE_LINKED_NEGATION_TYPE_SPLIT_MOU5_V_GWO3_VERSUS_MEI6_V_GWO3_AND_TEMPLATE_REALIGNMENT_REQUIRED` | Split `冇V過` from `未V過`; require overt `過`; exclude generic negators, final-`未` questions, `有冇` questions, and nonexperiential `未V`. |

## Forbidden inferences

R24 does not authorize:

- treating every `入/落/上/出 + 咗 + 嚟/去` combination as independently established;
- treating `嚟` and `去` as interchangeable perfective auxiliaries;
- inserting a hidden subject, path, source, goal, or destination into `入咗嚟` or `落咗去`;
- treating every V過 string as a completed past, a specific occasion, or a frequency expression;
- treating the `ExperientialClause` wrapper as an externally established Cantonese construction;
- copying or hiding the object in `食過飯`;
- treating every omitted subject as licensed by experiential aspect;
- treating `冇`, `未`, `唔`, and `咪` as one generic negator class;
- treating every `未 + VP` as negative experiential;
- treating preverbal `未` and sentence-final interrogative `未` as the same slot;
- collapsing `有冇V過` questions into negative experiential statements;
- changing parser behavior during the research freeze.

## Open evidence gaps

- direct modern corpus or reference attestation of exact `入咗嚟` and `落咗去`;
- lexical and discourse conditions on perfective aspect inside complex directionals;
- modern corpus comparison of `冇V過` and `未V過` across registers;
- interaction of focus adverbs and sentence-final particles with each negative experiential subtype;
- theory-neutral treatment of subject omission in short experiential utterances;
- whether `ExperientialClause` has any runtime role not already represented by ordinary clause and VP structure.

## Freeze result

This checkpoint changes research provenance only. No parser node, role, gloss, heuristic, fixture, test expectation, manifest field, or held-out item was changed or opened.
