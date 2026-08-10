# Issue 736 — AB78 current runtime/test-scope audit R1

Date: 2026-08-10
Construction: AB78 `TransitiveVP`
Runtime version at branch base: v0.5.222
Audit role: implementation inventory only; linguistic evidence weight 0

## Purpose

Audit the historical `tests/constructions/TransitiveVP.json` family against the behavior-first source decision without changing executable expectations in this task.

A temporary read-only GitHub Actions workflow analyzed every fixture through the current source-first runtime and recorded live AB78 surfaces, parents, trace metadata, slot assignments, and broad profile tags. The workflow also ran identity, research, and discovery verification. It is temporary and must not remain in the final PR.

## Declared fixture family

Current standard file:

- 28 positive snapshot cells;
- 2 focused boundaries;
- 30 executable cells total.

The 28 positive cells produce **29 live `TransitiveVP` nodes** because `我去街市買餸煮飯。` contains two narrow transitive children (`買餸`, `煮飯`).

## Live architecture inventory

### Parent ownership of the 29 nodes

| Parent | Live AB78 nodes |
|---|---:|
| `ClauseSpan` | 11 |
| `SerialVerbPurposeChain` | 4 |
| `ClauseRelationMemberSpan` | 3 |
| root | 2 |
| `NeedsContext` | 2 |
| `DesiderativeVP` | 2 |
| `ExperientialYesNoQuestion` | 1 |
| `ANotAQuestion` | 1 |
| `MotionPurposeChain` | 1 |
| `VerbComplementVP` | 1 |
| `ExperientialClause` | 1 |

This confirms that most historical positives are not whole-sentence AB78 structures. They are nested predicate candidates inside independently typed outer constructions.

### Trace shapes

All 29 live rows are currently emitted as `generative_template` traces with `template_family: generative_template` and `structural_scope: unspecified`.

Observed semantic binding profiles:

- `action_verb + object`: **26** nodes;
- `consumption_verb + approximate_quantity + particle`: **2** nodes (`飲七杯度喇`);
- `action_verb` with no object binding: **1** node (`買` inside `我買嘅書好貴`).

Authored matcher variants among these live rows:

- `TransitiveVP.object_shape_guarded`: **20**;
- `TransitiveVP.object_shape_unconstrained`: **6**;
- no authored variant required/reported for the three different-shape rows above: **3**.

The absence of a `trace_detail.rule` on these live rows is implementation metadata only and is not treated as linguistic evidence in this research task.

## Behavior-first fixture dispositions

The following classification is about what each historical cell can demonstrate. It does **not** modify its executable assertion in this PR.

### A. Source-compatible overt predicate–object core or outer composition — 23 cells

Twenty-three positive cells contain at least one overt predicate–object relation that is compatible with the source-backed `V + NP object` behavior, although the outer sentence may exercise a different construction.

They include:

- pronoun/simple objects: `見到佢`, `問問題`, `講廣東話`;
- quantified/demonstrative objects: `食一個蘋果`, `寫三個字`, `講呢個故事`, `攞啲糖`, `攞本書`;
- wh-object profiles: `食咩`, `睇咩`, `睇咩人`, `睇邊本書`, `買咩`, `買咩書`;
- aspectual examples with an overt object: `講過電話`, `食過飯`;
- serial/purpose hosts containing narrow transitive children: `買餸`, `煮飯`, `食晏`, `攞本書`, `攞啲糖`.

These cells are **implementation/composition evidence**, not 23 independent linguistic attestations. Their lexical or outer-construction details require their own evidence.

### B. Non-overt object relation in noun-modifying material — 1 cell

`REG-0295 我買嘅書好貴。`

The live AB78 row is only `買` and binds `action_verb` with no overt `object` binding. Independent Cantonese noun-modifying-clause research can support an argument relation between `買` and the head `書`, but this is not the ordinary overt `V NP` core.

Disposition: retain as a **separate realization/composition profile** pending runtime alignment; do not use it to license arbitrary bare transitive verbs.

### C. Approximate quantity/measure profiles — 2 cells

- `REG-0296 我飲七杯度喇。`
- `REG-0465 飲七杯度喇。`

The live trace binds `consumption_verb + approximate_quantity + particle`, not `action_verb + object`. There is no overt lexical nominal head inside the AB78 node.

Disposition: **scope overreach/unresolved relative to AB78 evidence**. The current attached transitive sources do not establish this approximate measure profile as ordinary `V NP object`.

### D. Semantic-selection controls — 2 cells

- `REG-0394 食香港。`
- `REG-0467 飲香港。`

Both produce structural `action_verb + object` AB78 rows under `NeedsContext`, but their ordinary readings are semantically incompatible.

Disposition: useful **selection/compatibility diagnostics**, not syntactic negative evidence. They must not be used to infer that `V NP` order or transitive constituency is ungrammatical.

## Existing boundaries

The only two explicit AB78 boundaries are:

- `佢瞓覺。` — lexical activity/intransitive predicate;
- `佢好高。` — stative/adjectival predicate.

Both remain useful, but they cover only two neighboring predicate classes.

They do not test the source-required distinctions against:

- CP/clausal complements;
- ditransitives/datives;
- pivotal structures;
- serial/resultative structures as whole VPs;
- context-free object omission;
- noun-modifying object gaps;
- quantity/measure complements;
- semantic incompatibility versus structural transitivity.

Therefore `negative_boundary_inventory_complete` must remain false.

## Important implementation observations for a later runtime task

### 1. Ordinary overt objects already have a meaningful guarded matcher family

Twenty live rows use `TransitiveVP.object_shape_guarded`, including ordinary, wh, quantified, demonstrative, and aspect-bearing object profiles. Its current constraints prevent object material that already carries VP/predicate/productive-VO or approximate-quantity slots from being swallowed as an object.

A later implementation should preserve the behavior that is independently justified rather than replace this machinery wholesale merely because the public label is old.

### 2. Unconstrained matcher profiles need profile-by-profile review

Six live rows use `TransitiveVP.object_shape_unconstrained`, including `見到佢` and several lexical V–N combinations inside clause/serial composition. The research task does not assume these are wrong, but they should be audited against typed-object requirements rather than retained solely from historical reachability.

### 3. Three live rows expose genuinely different realization shapes

- relative/noun-modifying `買`: action verb without overt object binding;
- two `飲七杯度喇` rows: consumption verb + approximate quantity + particle.

These should not be normalized into the ordinary overt-object matcher merely to reduce matcher variety. Their linguistic behavior differs.

### 4. Structural scope remains `unspecified`

All 29 current AB78 traces report `structural_scope: unspecified`. That is permitted by the architecture contract, but a later accepted-specification implementation may be able to assign explicit `vp` scope once the exact realization profiles are settled. This research task does not change trace metadata.

## Required later executable contract

Before any AB78 runtime alignment is considered complete, permanent coverage should demonstrate:

1. several independently supported overt `V + object NP` lexical profiles;
2. nested object-NP structure without AB78 absorbing NP-internal material conceptually;
3. wh-object composition with independently typed wh NP;
4. aspect/question/modal/clause wrappers outside the narrow predicate–object relation;
5. serial/purpose hosts preserving narrow transitive children;
6. explicit context-linked object omission without hidden object insertion;
7. object-gap/noun-modifying behavior under its proper outer owner;
8. separate boundaries for CP complements, ditransitives, pivotal/resultative structures, and quantity/measure complements;
9. semantic-selection controls classified separately from syntactic negatives;
10. intransitive and stative boundaries retained.

Unresolved lexicalized V–N and quantity profiles should remain unresolved rather than be forced into binary expectations solely to make the test matrix look complete.

## Audit disposition

`RUNTIME_ALIGNMENT_NEEDED_AFTER_RESEARCH`.

The current runtime family contains a substantial source-compatible predicate–object core, but its 28 positive fixture cells are not one homogeneous linguistic construction. The most concrete delta is the pair of approximate-measure AB78 nodes; the relative-clause gap profile also requires explicit realization licensing rather than ordinary overt-object matching.

No runtime or fixture expectation is changed by this audit.
