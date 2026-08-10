# Issue 753 — AB35 lexical V–O compound runtime contract R1

Date: 2026-08-10  
Recommended canonical identity: AB35 `VerbObjectCompound`  
Runtime change authorized here: **none**

## Goal

Define a deterministic representation for a **lexically licensed Cantonese V–O compound** that uses the completed parser architecture correctly:

- the whole compound is a predicate/VP constituent;
- its written/morphological components remain visible;
- the nominal-looking component is not automatically asserted to be an ordinary semantic object;
- membership is item-specific and source-linked;
- separability/productivity is not generalized from surface order;
- normal higher syntactic composition can target the compound as a VP.

## Why the existing AB78 fallback is insufficient

The #750 ownership-removal inventory shows that `飲茶`, `游水`, and `沖涼` all receive mechanically complete `TransitiveVP` parses when AB35 is disabled. The generic AB78 template binds:

- `action_verb`
- `object`

That is a valid parser architecture contract for ordinary transitive V–NP behavior, but it is not a neutral representation of an independently established lexical V–O compound. Architecture consistency does not make a linguistic role assignment correct.

The lexical-compound representation must therefore preserve internal component visibility **without deriving `object` merely from the second component's position**.

## Runtime membership source

Use a closed source-linked lexical table. Each active compound entry should carry at least:

- `surface`
- `verbal_component_surface`
- `nominal_component_surface`
- `source_ids`
- exact source/ledger claim edge
- optional lexical gloss/reading identifier when the source establishes one
- an explicit overlap/ambiguity policy
- an explicit separability profile, defaulting to `not_licensed_without_item_specific_evidence`.

No runtime rule may infer compound membership from arbitrary `verb + noun`, lexical category compatibility, corpus frequency, test frequency, or semantic plausibility.

### Initial migration seed

From the current 43-entry AB35 compatibility whitelist:

- `飲茶`
- `游水`
- `沖涼`

### Source-backed research probe not silently added to runtime

- `讀書`

The source-backed identity may cite `讀書`, but a later implementation must not add it to the runtime lexicon merely because it appears in the research source. Lexicon/runtime expansion remains a separate declared change.

## Preferred trace architecture

### Trace kind

Prefer `source_linked_runtime_matcher` for the initial bounded lexical core.

Reason:

- membership is determined by an exact reviewed lexical entry rather than a reusable generative slot pattern;
- the trace kind is already a registered first-class non-template architecture;
- it does not imply that the parser can generate unseen V–O compounds.

If implementation constraints make a template representation materially simpler, a bounded `construction_template` with an exact lexical-entry constraint is acceptable, but it must not be classified as a reusable `generative_template` merely because the surface can be segmented into two components.

### Structural scope

`vp`

The compound node begins at the first compound component and ends at the last compound component. Subject/topic, higher modal, negation, temporal material, clause linking, and final particles remain outside unless an independently sourced compound-internal pattern explicitly requires otherwise.

### Whole-node exported roles

The compound node may export roles required for ordinary higher composition, such as:

- `vp`
- `predicate`
- `action_vp` where the project’s generic VP composition requires it
- `verb_object_compound` / equivalent internal construction capability

It must **not automatically export**:

- `object`
- `patient`
- `transitive_vp`
- an ordinary argument relation between the two compound components.

Whether an individual lexical compound has a separate literal/transitive reading is an ambiguity question, not something the compound node should infer.

## Internal component provenance

Use structured **component provenance**, not ordinary semantic slot bindings, for the lexical pieces.

Conceptual trace shape:

```text
construction: VerbObjectCompound
structural_scope: vp
binding_contract_status: not_applicable   # no ordinary semantic argument bindings
components:
  - component_role: verbal_component
    source_surface: <first component>
    exact source/parser/display span
  - component_role: nominal_component
    source_surface: <second component>
    exact source/parser/display span
```

The exact field names must reuse the existing `canto-span-trace-bindings-v1` component schema rather than inventing a parallel provenance format.

If the runtime must expose a semantic binding for the whole lexical unit, use a whole-construction `lexical_compound_predicate`-style binding; do not reuse `object` for the nominal component.

## Child rows and learner visibility

The verbal and nominal-looking surfaces should remain visible as lexical components for Jyutping, glossing, hover, and source-span accounting where the learner UI benefits from them.

Visibility does not entail an ordinary syntactic object relation.

A learner-facing explanation may later say that a V–O compound is historically/formally verb-object shaped while functioning as a lexical unit; this wording belongs to learner-content review, not to the runtime matcher itself.

## Separability policy

The sources show that Cantonese V–O compounds can display mixed word/phrase behavior and that separability varies by lexical item. Therefore:

- contiguous source-backed membership does not license arbitrary separation;
- aspect, quantity, duration, frequency, modification, topicalization, or other intervening material requires an item-specific licensed profile;
- a separated form must preserve the independently established compound reading before it can inherit compound identity;
- a separated string that is also ordinary V–NP syntax may remain structurally ambiguous.

The initial matcher should be **contiguous-only** unless the implementation task cites an exact source-backed separated profile.

## AB78 overlap and ambiguity

Do not globally suppress AB78 merely because a lexical compound entry exists.

A surface may in principle support both a lexical-compound reading and an independently compositional reading. The reviewed source package establishes compound readings but does not provide a universal rule that every exact surface lacks an ordinary compositional reading.

Use an entry-level overlap policy. Recommended initial states:

- `preserve_competing_until_adjudicated`
- later item-specific alternatives may include `compound_only_for_reviewed_profile` or `composition_only_in_explicit_context` if evidence supports them.

The architecture already supports competing structures; retaining ambiguity is preferable to inventing a false unique analysis.

For exact lexical-compound entries, the parser architecture audit should distinguish the compound matcher and generic AB78 matcher by construction identity and matcher provenance rather than treating coexistence as an unexplained same-rule fingerprint split.

## Higher composition

Once a `VerbObjectCompound` VP is available, ordinary independently typed outer structures may consume it in the same way they consume other VP predicates.

Implementation tests may verify composition such as:

- overt subject outside the compound;
- modal/desiderative wrapper outside the compound;
- final particle/question wrapper outside the compound;
- clause/reporting wrapper outside the compound.

Those tests establish parser composition only. They do not independently establish the naturalness of every generated containing sentence.

## Negative boundaries

The narrow compound matcher must reject or remain absent for:

1. **direct ordinary V–NP control:** `做功課`;
2. **unreviewed transparent-looking V–NP strings:** no compound identity merely from V+N shape;
3. **unresolved activities:** `食飯`, `打電話`, `打籃球` initially remain outside the source-backed compound core;
4. **transition blockers:** `煮嘢食`, `下棋`, `做運動`;
5. arbitrary lexical substitutions such as unseen `V + noun` combinations;
6. separated/interrupted versions of a compound unless that exact item/profile has independent support;
7. larger clauses whose only relation to AB35 is that they contain one component string.

“Outside the compound matcher” does not mean “ungrammatical.” It means that this identity does not claim the string under the current evidence.

## Compatibility migration requirement

The existing 43-entry `ProductiveVO` runtime table cannot be renamed wholesale to `VerbObjectCompound`.

A later implementation must distinguish:

- the new narrow source-backed compound path;
- ordinary material explicitly rehomed to AB78;
- unresolved legacy activity surfaces that still need research;
- the three known transition blockers.

Do not make unresolved legacy entries linguistic AB35 positives simply to preserve old snapshots. If temporary compatibility behavior is required, it must be explicitly marked as internal/compatibility behavior with zero linguistic-evidence weight and a finite removal plan.

## Permanent architecture gates for the later implementation

The later runtime PR should require:

- exact source/parser/display span for the compound node;
- `structural_scope: vp`;
- registered trace kind/family metadata;
- complete component provenance;
- no semantic `object` binding derived solely from the compound-internal nominal surface;
- stable matcher identity/provenance;
- no unexplained same-rule fingerprint split;
- no new architecture debt;
- ordinary parser architecture audit `blocking_count = 0`.

## Non-claims

This contract does not claim:

- unrestricted V–O-compound productivity;
- that all current 43 AB35 surfaces are compounds;
- that all Cantonese V–O compounds are inseparable or separable;
- that a compound surface can never have an ordinary compositional reading;
- that `VerbObjectCompound` is ready for linguistic promotion;
- that parser fallback proves linguistic analysis.
