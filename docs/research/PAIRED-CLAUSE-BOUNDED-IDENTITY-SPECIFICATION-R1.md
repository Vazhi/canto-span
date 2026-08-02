# Bounded paired-clause relation identity specification R1

Date: 2026-08-02
Parent issue: #430
Work claim: #441
Pull request: #450

## Decision

The three implemented bounded relation cores require **three separate reserved
language-construction UUIDs**. They are not instances of one new generic
clause-linking identity, and they cannot inherit the UUIDs of the generic parser
graph, broad `ConditionalClause`, suggestion, comparison, lexical preference, or
postverbal priority records without losing their paired marker roles and relation
semantics.

| Research unit | Candidate UUID | Canonical name at creation | Family | Profile |
|---|---|---|---|---|
| PRQ2-008 | `a476c6c6-a0ba-4cf2-9021-13ad4c717d0f` | `ZiJiuZauSufficientConditionRelation` | `ConditionalClauseRelations` | `OvertZiJiuConditionZauConsequence` |
| PRQ2-013 | `caae4649-29cd-4752-8e5d-48ab7d9503a4` | `JyuKeiBatJyuOrderedPreferenceRelation` | `AlternativePreferenceRelations` | `OvertJyuKeiDisfavoredBatJyuPreferred` |
| PRQ2-014 | `af85d495-5906-4fde-a5ba-ca39285a3281` | `ZiJauSinNecessaryConditionRelation` | `ConditionalClauseRelations` | `OvertZiJauRequiredConditionSinConsequence` |

All three records remain `candidate` with `construction_code: null`. This package
allocates no short code, creates no current grammar note or executable construction
test, and changes no matcher. A later separately claimed source-first runtime package
must create those artifacts and invoke `tools/allocate-construction-identity.js` for
each candidate.

## Why three UUIDs are required

`ClauseRelationGraph`, `ClauseRelationEdge`, and `ClauseRelationMemberSpan` represent
parser organization. They can preserve a parent graph, typed edge, and member spans,
but they do not independently assert that one member is sufficient for another, that
one alternative is disfavored relative to another, or that one condition is necessary
for a consequence. They retain zero independent linguistic-evidence weight.

The existing broad `ConditionalClause` record is also insufficient. Its current scope
is an unsupported generalization and it does not preserve the correlation between
`只要` and `就`, the inverse correlation between `只有` and `先／先至／先可以`, or
the direction of entailment. Reusing it would collapse two source-backed relations and
make future narrowing depend on one overbroad UUID.

The ordered-preference core likewise cannot be represented by lone `不如` suggestion,
ordinary `A 不如 B` comparison, lexical `鍾意` complementation, or PRQ2-035
`寧願` committed preference. Those profiles do not preserve the same two option roles,
marker pair, or preference relation.

## PRQ2-008 sufficient condition

### Reserved identity

```text
只要 + CONDITION，
(SUBJECT) + 就 + CONSEQUENCE
```

The full overt pair is the language node. The left member is sufficient for the
right-member consequence. The candidate preserves:

- the overt `只要` antecedent marker;
- a licensed condition member;
- an overt pair boundary;
- a licensed consequence member;
- overt right-clause `就` after any right-clause subject;
- the sufficient-condition relation between the two members.

Yip and Matthews provide direct reference-grammar support for the Cantonese
sufficient-condition domain, condition-before-consequence order, overt `就`, modal and
negative consequences, and at least one no-`就` example. The reserved candidate is
nevertheless limited to the already implemented overt `只要 A，就 B` slice. The
no-`就` source example establishes a research extension, not unrestricted optionality.

### Span

Start at the first overt token of `只要`. End at the end of the maximal independently
licensed consequence clause. Include the marker pair and both members. Exclude material
before `只要`, separately typed final discourse material, and any following discourse
turn.

### Boundaries

Do not assign this identity to:

- ordinary `如果 A，就 B` conditionals;
- `只有 A，先／先至 B` necessary conditions;
- `除非` exception/default conditionals;
- `就算` concessive conditionals;
- restrictive `只` plus lexical or modal `要`;
- no-`就` extensions before separate implementation evidence;
- fragments, discourse-spanning completions, or empty members.

AA29 may remain a broad structural neighbor and AA14 may remain the parser parent. Neither
replaces the reserved language identity or donates evidence.

## PRQ2-013 ordered preference

### Reserved identity

```text
(SUBJECT) + 與其 + DISFAVORED OPTION，
            不如 + PREFERRED OPTION
```

The construction orders two overt alternatives. `與其` marks the first member as
rejected or disfavored; `不如` marks the second as preferred. The relation is not
recoverable from a generic graph plus an untyped `Suggest` child because that analysis
loses the first option's role and the ordering between members.

Words.hk directly defines the correlated pair and rejected first option. Jyut Dictionary
attests parallel predicates and optional `倒`; Education Bureau material supports formal
paired use across several activity types and shared-subject placement; CantoDict supports
the suggestion/comparison polysemy boundary. Optional `倒` remains outside the reserved
first runtime slice.

### Span

Where an overt subject structurally scopes over both alternatives, include it as shared
pair material. Otherwise start at `與其`. End at the end of the maximal independently
licensed preferred option. Include both markers, both option members, and the overt pair
boundary; exclude outer topic/frame material and separately typed final discourse
material.

### Boundaries

Do not assign this identity to:

- lone suggestion `不如 B`;
- ordinary comparison `A 不如 B`;
- `寧願 A，都唔 B` or `寧願 A，都要 B`;
- optional `倒` before a later package explicitly supports it;
- marker omission or discourse completion;
- unlicensed constituent symmetry or empty members;
- lexical or coordinating uses of `與`.

AB68 may remain the lone-suggestion neighbor, AB33 remains lexical preference
complementation, and PRQ2-035 remains a separate committed-preference family.

## PRQ2-014 necessary condition

### Reserved identity

```text
只有 + REQUIRED CONDITION，
(SUBJECT) + 先 / 先至 / 先可以 + CONSEQUENCE
```

The left member states a condition required for the right-member consequence. The overt
right linker marks that the consequence is available only under that condition. This is
the semantic inverse neighbor of the PRQ2-008 sufficient relation, not the same identity
with a free feature substitution.

The source package supports a broader necessary-condition marker family, including
participant, environmental, locative, and conditional profiles, plus conditional `至` and
bare condition-plus-`先至` boundaries. The reserved candidate is deliberately narrower:
it covers only the already implemented overt comma-delimited **clausal pair**.

### Span

Start at the first overt token of `只有`. End at the end of the maximal independently
licensed consequence clause. Include the left marker and required-condition member, the
overt pair boundary, the right subject when present, the licensed `先／先至／先可以`
linker, and the consequence member. Exclude material before `只有` and separately typed
final discourse material.

### Boundaries

Do not assign this identity to:

- participant, domain, or locative restriction without a clausal pair;
- bare condition-plus-`先至` without overt `只有`;
- short conditional `至` before separate specification;
- temporal-sequential `先至`;
- existential or quantity `只有`;
- `只要` sufficient conditions or `除非` exception conditionals;
- empty restrictor or consequence members.

AB34 remains a postverbal priority profile, AA29 remains a broad conditional neighbor,
and AA14 remains the parser parent. None owns the necessary-condition UUID.

## Composition contract

A later implementation may preserve generic graph structure around each language node,
but it must expose the language identity independently. The graph may contain:

- one typed language-relation node spanning the accepted pair;
- two independently licensed member children;
- marker/linker children or typed marker metadata;
- generic graph, edge, and member-span parents for parser navigation.

The parser representation must not become the language ontology. Conversely, the language
node must not consume unrelated outer topics, quotations, particles, or following turns
merely to obtain full-line coverage.

## Runtime compatibility contract

The existing internal subtypes are compatibility metadata, not permanent identities:

| Research unit | Current internal metadata | Required later relation |
|---|---|---|
| PRQ2-008 | `sufficient_condition` | map to the reserved sufficient-condition UUID |
| PRQ2-013 | `ordered_preference` | map to the reserved ordered-preference UUID |
| PRQ2-014 | underlying `conditional` plus `necessary_condition` profile | map to the reserved necessary-condition UUID |

This package does not change those runtime values. The later runtime package must preserve
existing accepted reachability while adding UUID-resolved language identity and explicit
negative boundaries.

## Canonicalization sequence

For each candidate, the later package must:

1. create the intended `grammar/research_pending/` note with accepted evidence and
   boundaries;
2. create a dedicated executable construction-test file;
3. add or map the runtime label and source-first matcher;
4. canonicalize the exact reserved UUID through
   `tools/allocate-construction-identity.js`;
5. let the allocator assign the next unused short code mechanically;
6. regenerate identity, lock, status, test-index, discovery, and deployment outputs;
7. stop for review before merge.

No package may preclaim `AB83`, `AB84`, `AB85`, or any other code. Allocation order is
serialized at canonicalization time.

## Later evidence gates

The identity decision does not establish broad productivity. Before any linguistic-status
promotion, role-neutral panel and held-out work must test at least:

- sufficient versus necessary, ordinary hypothetical, exception, and concessive
  conditionals;
- overt right linker versus independently justified omission;
- shared and different subjects;
- negation, modality, particles, and member complexity;
- ordered preference versus suggestion, comparison, and committed preference;
- participant restriction versus clausal necessary condition;
- temporal `先至` and lexical `只 + 要` controls;
- unseen lexical and structural member classes not used to design the matcher.

## Protected state and stop rule

This package changes only the candidate ledger, one machine-readable coordinated decision,
one human specification, and current identity/project documentation. It changes no
permanent registry record, short code, runtime behavior, executable fixture, generated
runtime bundle, linguistic-status placement, evidence grade, corpus classification,
survey or panel state, held-out state, runtime version, release, deployment, or merge
authority.

The package is complete when the three UUIDs are collision-checked and reserved, every
core and boundary has a terminal identity disposition, the later canonicalization order is
explicit, repository verification passes, and no temporary publication file remains in
the final diff.
