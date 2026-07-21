# Lane 03 residual fragment-subtype source map (CP021B-R18)

Date: 2026-07-18  
Scope: claim-level research mapping only; **no parser behavior, fixtures, manifest, accepted version, or held-out file changed**.

## Family selected

After ranking the 75 remaining unmapped language labels, broad `ProductiveVO` and `TransitiveVP` were again rejected as implementation umbrellas rather than coherent research units. R18 maps the residual Lane 03 subtype layer:

- `IdentificationFragment`
- `LocativeFragment`
- `PossessiveNominalFragment`
- `ModalResponseFragment`
- `ProhibitiveFragment`

The first two have active runtime profiles. The last three occur only in registries or fragment-type sets and have no active template, fallback, accepted child-label fixture family, or pattern-specific source edge.

## Runtime claims and source-derived boundaries

### 1. IdentificationFragment mixes copular focus and particle-bound utterance behavior

The runtime generatively accepts an identification marker followed by nominal material and an optional final particle, with a separate `就係 + NP` fallback. External sources support ordinary copular/identifying `係`, attest `呢 + 就係 + ...` inside a larger discourse sequence, and distinguish the utterance-particle-like `就係啦` from bare `就係` in that particular use. They do not establish the runtime cross-product as one standalone fragment construction.

**Result:** preserve overt copular/focus material, split particle-bound utterance behavior, and require discourse evidence before adding fragment status. The particle cannot be modeled as freely optional across all subtypes.

### 2. LocativeFragment contains a real locative phrase but an unsourced general ellipsis wrapper

Kwan supports Cantonese locative phrase distinctions and Yip and Matthews document full locative predication. Lee and Pan independently show that spatial and progressive readings of `喺度` diverge in ellipsis diagnostics. None of these sources establishes general `喺 + place (+ particle)` standalone-answer productivity.

**Result:** retain the overt locative phrase and, where context licenses it, add a discourse-fragment relation. Do not insert a hidden located figure or confuse progressive `喺度` with spatial `喺度`.

### 3. PossessiveNominalFragment duplicates sourced headless nominal behavior

Possessor+`嘅` can be independently referential, and modifier+`嘅` belongs to a broader headless nominal pattern. The same material also occurs predicatively in full clauses. The dormant child label contributes no additional sourced behavior.

**Result:** merge into headless modifier-`嘅` nominal and nominal-predicate structures or retire.

### 4. ModalResponseFragment duplicates selective auxiliary ellipsis

Auxiliaries can appear without an overt complement under licensed ellipsis, but licensing is lexical and construction-specific: modal/auxiliary heads differ from adverbs, and progressive or aspectual elements do not behave uniformly. Response status and recovered content still depend on discourse.

**Result:** merge into ordinary modal/auxiliary structure plus selectively licensed complement ellipsis and a separate response relation; retire the dormant duplicate.

### 5. ProhibitiveFragment duplicates prohibitive imperative structure

`咪` and `唔好` are specialized prohibitive markers distinct from ordinary `唔`, but their distributions are not freely interchangeable. `唔好意思` is independently a lexicalized apology formula. No source supports an additional productive bare-marker fragment category.

**Result:** merge into `ProhibitiveImperative` plus lexical-formula protection or retire the dormant duplicate.

## Dispositions

| Label | Disposition | Parser-facing result |
|---|---|---|
| `IdentificationFragment` | `COMPONENTS_LINKED_EXACT_FRAGMENT_AND_PARTICLE_SLOT_GAP` | Decompose ordinary copular/focus material and particle-bound utterance uses; exact standalone template remains a gap. |
| `LocativeFragment` | `COMPONENTS_LINKED_STANDALONE_FRAGMENT_ELLIPSIS_GAP` | Keep overt locative structure; license fragment function only from discourse; no hidden figure. |
| `PossessiveNominalFragment` | `HEADLESS_POSSESSIVE_NOMINAL_LINKED_DORMANT_LABEL_MERGE_OR_RETIRE` | Merge into headless `嘅` nominal/predicate structures or retire dormant duplicate. |
| `ModalResponseFragment` | `SELECTIVE_AUXILIARY_ELLIPSIS_LINKED_DORMANT_LABEL_MERGE_OR_RETIRE` | Merge into selective auxiliary ellipsis plus response relation or retire dormant duplicate. |
| `ProhibitiveFragment` | `PROHIBITIVE_MARKERS_LINKED_DORMANT_DUPLICATE_LABEL_MERGE_OR_RETIRE` | Merge into prohibitive imperative plus lexical exceptions or retire dormant duplicate. |

## Held-out access incident

A broad impact-ranking search printed three pre-existing locative rows from `rendered-learner-semantics-heldout-CP018D.tsv`. This was an error. The rows were not used to formulate, support, reject, or rank any linguistic claim in R18, and no held-out file was modified. The machine-readable checkpoint therefore records `held_out_opened: true` and `held_out_used_as_evidence: false`.

## Forbidden inferences

R18 does not authorize:

- treating `就係 + NP` as a freely productive standalone fragment;
- deleting or adding a final particle without subtype-specific evidence;
- extending Tang’s starred bare `就係` judgment beyond its utterance-particle interpretation;
- treating every `喺度` as spatial or every `喺度` as progressive;
- inserting a hidden located figure, modal complement, possessed noun, or prohibited predicate;
- treating every possessor+`嘅` as a fragment rather than a headless nominal or predicate;
- licensing every modal-like or aspectual head as a bare response;
- treating `咪` and `唔好` as freely interchangeable;
- parsing lexical `唔好意思` as an ordinary prohibition;
- using runtime code, fixtures, or the accidentally displayed held-out rows as linguistic authority;
- changing parser behavior during the research freeze.

## Open evidence gaps

- direct corpus or experimental evidence for isolated `就係 + NP` answer fragments;
- particle-by-particle distribution in identification-like short utterances;
- direct modern discourse evidence for bare `喺 + place` answers and their prosody;
- theory-neutral diagnostics for omitted located figures in Cantonese short answers;
- a full lexical inventory of auxiliaries that can license answer ellipsis;
- direct evidence for any productive bare prohibitive-marker response subtype.

## Freeze result

This batch changes research provenance only. Parser code, grammar templates, roles, glosses, fixtures, tests, manifest data, accepted behavior, and held-out files remain byte-identical to R17. The only held-out change is epistemic: three rows were accidentally displayed and the checkpoint records that fact.
