# Progressive, continuous/durative, and experiential aspect source map (CP021B-R13)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixtures, manifest, accepted version, or held-out data changed**.

## Family selected

After ranking the 99 remaining unmapped language labels, broad residual abstractions such as `ProductiveVO` and `TransitiveVP` were again rejected as incoherent research batches. This checkpoint maps ten directly interacting labels:

- `ProgressiveVP`
- `ProgressiveTransitivePredicate`
- `ProgressiveDirectionalVP`
- `ProgressiveWhObjectQuestion`
- `ProgressivePlaceQuestion`
- `DurativeVP`
- `ExperientialVP`
- `ExperientialMotionGoalVP`
- `ExperientialQuestion`
- `ExperientialYesNoQuestion`

`喺度 VP`, negative experiential statements, habitual markers, delimitatives, and general wh-question ontology remain separate future families.

## Runtime claim extraction

### Progressive core

`ProgressiveVP` has both `action_verb + 緊 + object` and `action_verb + 緊` templates. `ProgressiveTransitivePredicate` duplicates the first profile as an internal subspan. `ProgressiveDirectionalVP` is an exact fallback for `行 + 緊 + 入/出 + 嚟/去`.

The two progressive question labels combine a progressive VP with either an overt wh object or a location question. Their special-node status is not independently sourced.

### Continuous/durative core

`DurativeVP` recognizes `action_verb + 住 + object` and describes it as a continuing state. The template does not distinguish stable-result, transitive-continuous, accompanying-action, subordinate, or irrealis profiles.

### Experiential core

`ExperientialVP` recognizes `action_verb + 過`; `ExperientialMotionGoalVP` recognizes `movement_verb + 過 + goal`. `ExperientialQuestion` combines an experiential VP with final `未`; `ExperientialYesNoQuestion` combines adjacent `有冇` with an experiential VP and an optional additional topic/object.

## Source-derived boundaries

### 1. `緊`, `住`, and `過` are distinct overt aspect markers

Alderete et al. and Sio & Bond independently list postverbal aspect structures and distinguish progressive `緊`, continuous `住`, and experiential `過`. These markers must remain visible; none licenses an unspoken time, object, path, or answer.

### 2. `ProgressiveVP` cannot be defined by the runtime `action_verb` list

Kataoka documents `嚟緊`, `病緊`, and `買緊樓`, showing motion, state-like, and extended-process uses. Sio & Bond simultaneously show that aspect selection is restricted. The correct conclusion is lexical/event compatibility—not unrestricted productivity and not a closed action-verb list.

### 3. Progressive and continuous readings split even with the same verb

Kataoka contrasts `着緊` with `着住`; Basic Cantonese similarly contrasts dynamic/change readings with continuing-state readings. Fan further shows that `V住` is favored in some subordinate or accompanying-action VPs where main-clause dynamic continuation uses `V緊`.

### 4. Directional-progressive structure is compositional and order-sensitive

Motion-progressive forms are attested, including `嚟緊` and a complex manner-path-deictic example `爬緊返去海邊`. The runtime’s exact `行緊入/出嚟/去` fallback is therefore both too narrow as coverage and too broad if treated as a freely productive template. Aspect, manner, path, deixis, and goal must be represented separately.

### 5. Progressive wh-question labels are compositional wrappers

Cantonese wh elements remain in situ and can fill object or adverbial positions. No inspected source establishes a separate `ProgressiveWhObjectQuestion` or `ProgressivePlaceQuestion` construction beyond independently supported progressive aspect plus ordinary wh syntax.

### 6. Experiential `過` does not equal perfective `咗`

Reference examples distinguish `去過 + place` from `去咗 + place`: the former reports prior experience, while the latter has current-result/relevance implications. `過` also does not itself encode a frequency, occasion, or past date.

### 7. Experiential questions have two overt strategies with different structure

Final `未` after `V過` is attested, as is suppletive adjacent `有冇 + V過`. The latter must remain distinct from ordinary exact-copy A-not-A. Neither strategy licenses a hidden answer, and the runtime must not duplicate an object already contained in the experiential VP.

## Parser-label dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `ProgressiveVP` | `SOURCE_LINKED_SPLIT_AND_LEXICAL_SELECTION_NARROWING_REQUIRED` | Retain overt V緊 profiles, but split argument structure from aspect licensing and replace the action-verb heuristic with lexical/event compatibility. |
| `ProgressiveTransitivePredicate` | `LANGUAGE_FORM_SUPPORTED_INTERNAL_DUPLICATE_MERGE_OR_RETIRE` | V緊O is supported, but this label duplicates the transitive `ProgressiveVP` template and should merge or retire as a language claim. |
| `ProgressiveDirectionalVP` | `SOURCE_LINKED_NARROWING_AND_BOUNDARY_REALIGNMENT_REQUIRED` | Preserve independently licensed motion structure and narrow the exact fallback; no free directional cross-product. |
| `ProgressiveWhObjectQuestion` | `COMPONENTS_SOURCE_LINKED_SPECIAL_NODE_MERGE_OR_RETIRE` | Treat as progressive aspect plus wh-in-situ object syntax; merge or retire the dedicated node. |
| `ProgressivePlaceQuestion` | `COMPONENTS_SOURCE_LINKED_SPECIAL_NODE_MERGE_OR_RETIRE` | Treat as progressive aspect plus locative-wh syntax; merge or retire the dedicated node. |
| `DurativeVP` | `SOURCE_LINKED_SPLIT_AND_LEXICAL_SELECTION_REQUIRED` | Split continuing-state, transitive, and accompanying/subordinate V住 profiles and require lexical/constructional compatibility. |
| `ExperientialVP` | `SOURCE_LINKED_NARROWING_REQUIRED` | Retain overt V過 narrowly; the action-verb inventory is not a productivity proof. |
| `ExperientialMotionGoalVP` | `SOURCE_LINKED_NARROWING_AND_MOTION_SUBTYPE_REQUIRED` | Narrow to independently licensed motion predicates with overt goals; distinguish experiential from perfective motion. |
| `ExperientialQuestion` | `SOURCE_LINKED_FINAL_MEI_NARROWING_REQUIRED` | Require overt V過 plus interrogative final 未; separate negative/not-yet statements. |
| `ExperientialYesNoQuestion` | `SOURCE_LINKED_SUPPLETIVE_QUESTION_SPLIT_AND_NARROWING_REQUIRED` | Keep adjacent suppletive 有冇+V過 distinct from ordinary A-not-A and prevent duplicated topic/object structure. |

## Forbidden inferences

R13 does not authorize:

- a productive `action_verb + 緊/住/過` grammar rule;
- treating `緊`, `住`, and `過` as interchangeable;
- treating `緊` as present tense or inserting `而家`;
- treating `住` as a generic progressive suffix;
- merging postverbal `緊` with preverbal `喺度` progressive;
- a free manner × path × deixis × aspect cross-product;
- dedicated progressive-wh construction claims when ordinary composition suffices;
- a hidden wh object, location, path, goal, time, occasion, or answer;
- treating `過` as perfective `咗`;
- rewriting `有冇` as `有唔有`;
- classifying every `過…未` string as a question;
- changing parser behavior during the research freeze.

## Sources added or extended

- Kataoka 2018: corpus-based and example-based boundaries for progressive `緊`, including motion, state-like, extended-process, and discourse uses.
- Fan 2024: distinctions among `過`, `喺度`, `住`, `緊`, and `咗`, plus subordinate/accompanying `V住` and `有V過` restrictions.
- Matthews and Yip 2011 multimedia supplement: exact reference examples for `緊`, `住`, `過…未`, and visible aspect marking.
- Alderete et al. 2017, Sio and Bond 2025, Basic Cantonese, Shan and Jin 2025, Yiu 2016, Hara 2023, and Liang and Mai 2026: inherited records extended or reused with exact scope limits.

## Open evidence gaps

- a corpus-backed lexical compatibility inventory for `緊`, `住`, and `過`;
- the full relation between postverbal `緊` and preverbal `喺度`;
- exact acceptability and information-structure conditions for `有 + V緊` and `有 + V住`;
- whether any progressive-wh combination needs a dedicated parser node rather than composition;
- exact lexical/productive boundaries for complex directional-progressive strings;
- dialect and speaker variation in state-like `V緊` and accompanying-action `V住`;
- negative experiential constructions with `未`, `冇`, and sentence-final particles.

## Freeze result

This batch changes research provenance only. No parser node, role, gloss, heuristic, fixture, test expectation, manifest field, or held-out item was changed or opened.
