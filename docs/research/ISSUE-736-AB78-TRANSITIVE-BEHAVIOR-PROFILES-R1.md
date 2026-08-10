# Issue 736 — AB78 TransitiveVP behavior profiles R1

Date: 2026-08-10
Construction: AB78 `TransitiveVP`
Legacy runtime label: `TransitiveVP`

## Decision

Retain AB78 provisionally as a **transitive lexical-predicate relation**, but narrow the linguistic claim to behavior supported independently of the parser.

The directly established core is a lexical verbal predicate selecting an NP object. Cantonese also permits non-overt object realization in independently licensed discourse and noun-modifying contexts, but those are distinct realization profiles and must not be inferred from a bare action verb alone.

The current public name `TransitiveVP` remains usable as a provisional umbrella because the evidence does support transitive valency. The name must not force every historical runtime profile into one syntax.

## Profile A — overt NP object core

### Behavior

```text
lexical verbal predicate + overt NP object
```

Alderete et al. explicitly give `V (Asp) NP` and `VP → V NP` as transitive Cantonese profiles. Wong/GACS independently provides ordinary VO/SVO lexical examples.

The NP may itself contain independently licensed structure:

- a pronoun;
- a common noun or lexical NP;
- numeral/classifier structure;
- demonstrative structure;
- an in-situ wh expression that functions as object.

Those NP-internal properties are not AB78 evidence by themselves. AB78 concerns the relation between the verbal predicate and the object constituent.

### Current fixture examples compatible with this profile

Examples include:

- `見到佢`
- `問問題`
- `食一個蘋果`
- `寫三個字`
- `講廣東話`
- `攞本書`
- `講呢個故事`
- `攞啲糖`

Wh-object cases such as `睇邊本書` are compatible where the wh phrase is independently typed as an object NP.

## Profile B — aspect and clause-level surroundings

Aspect, negation, questions, modals/desideratives, discourse/linking material, and final particles can surround or contain a transitive predicate–object relation.

Examples in the current runtime include:

- experiential/question material around `講過電話`;
- `有冇` around `問問題`;
- `食過飯` under experiential structure;
- `我想講呢個故事` under desiderative structure;
- clause-relation material around `見到佢`.

These are **composition profiles**. Their outer structures require independent evidence and must not enlarge the AB78 node merely because a transitive child appears within them.

## Profile C — transitive predicates inside serial/purpose structures

A serial or purpose construction may contain a narrow transitive predicate–object child, for example:

- `買餸` and `煮飯` inside `我去街市買餸煮飯`;
- `食晏` inside `我去餐廳食晏`;
- `攞本書` inside `我攞本書返嚟畀你睇`;
- `攞啲糖` inside `攞啲糖去食／嚟食`.

The transitive child does not license the serial/purpose/directional structure. Conversely, the existence of a larger serial structure does not disqualify an independently supported `V + object` child.

Conventional verb–noun combinations such as `食晏`, `煮飯`, and `講電話` may have lexical or construction-specific properties. Their presence in runtime tests does not by itself establish that every such combination should be analyzed identically.

## Profile D — wh-object realization

Wong/GACS independently illustrates Cantonese wh-in-situ with an object wh expression (`你搵邊個呀？`). Therefore an overt wh object can realize the object position of a transitive predicate.

Current cases such as:

- `食咩`
- `睇咩`
- `睇咩人`
- `睇邊本書`
- `買咩`
- `買咩書`

are compatible with AB78 only to the extent that the wh material is independently established as the object constituent. AB78 must not itself invent or repair a wh NP.

## Profile E — licensed non-overt object realization

### Discourse omission

Cantonese permits objects to be omitted when recoverable from discourse. Wong/GACS explicitly includes transitive verbs with dropped objects, and Zhou, Mai & Yip 2020 independently studies discourse-conditioned Cantonese object omission.

Behavioral requirement:

```text
transitive predicate + non-overt object
only when an independent discourse relation licenses recovery
```

No hidden object token should be fabricated.

### Noun-modifying / relative-clause argument relation

Cantonese noun-modifying clauses can contain an argument relation between the modifying clause and its head noun. Therefore a profile like `我買嘅書` may involve transitive valency without an overt postverbal object inside the narrow clause.

This is not the ordinary overt `V NP` surface core. A later runtime alignment should preserve the noun-modifying construction as the owner of the gap/relation rather than accepting any bare transitive lexeme as a complete ordinary AB78 solely from lexical affordances.

## Profile F — semantic-selection controls

`食香港` and `飲香港` instantiate visible `V + NP` ordering in the current runtime but are semantically anomalous under their ordinary readings.

They are not clean negative evidence for transitive syntax. The correct behavioral separation is:

1. structural predicate–object relation;
2. lexical/semantic compatibility of that predicate with that object.

A later runtime may preserve a structural node while independently reporting incompatibility or may route the entire analysis to review/context depending on the existing selection architecture. The research evidence here does not prescribe that implementation choice.

## Profile G — quantity/measure complements are unresolved relative to AB78

Current `飲七杯度喇` profiles are materially different from ordinary overt NP objects:

- the runtime trace binds `consumption_verb + approximate_quantity + particle` rather than `action_verb + object`;
- there is no overt lexical nominal head in the AB78 node;
- the attached sources do not establish this approximate measure expression as the same simple `V NP` transitive profile.

Disposition: **do not use AB78 evidence to justify this profile**. Its quantity/measure and argument semantics require separate evidence.

## Profile H — neighboring argument structures

The sources require separation from simple transitive predicate–object behavior for at least:

- CP/clausal complements;
- ditransitives/datives with recipient and theme;
- pivotal structures where one NP serves roles in two predicates;
- serial-verb structures as whole constructions;
- causative/resultative structures;
- existential and copular structures;
- clause-level topicalization.

A transitive child may occur inside some of these, but the larger structure must retain its own identity and evidence.

## Negative and boundary requirements for later executable specification

A later implementation contract should contain at least:

### Positive core

- several lexical verbs with ordinary overt NP objects;
- pronoun, simple noun, quantified NP, demonstrative NP, and independently typed wh-object realizations;
- aspect-bearing transitive predicates where the object remains independently typed.

### Outer composition

- subject and clause wrappers outside the narrow VP;
- negation/question/modal/desiderative composition;
- serial/purpose structures containing a narrow transitive child;
- noun-modifying/relative-clause object-relation composition without hidden object insertion.

### Boundaries/collisions

- intransitive predicates;
- stative predicates;
- CP complements;
- ditransitives;
- pivotal structures;
- resultative/causative complements;
- quantity/measure complements without an independently licensed NP object;
- semantic-selection controls explicitly marked as such rather than grammatical negatives.

### Unresolved cases

- lexically conventional activity V–N combinations where compositional object status is disputed;
- context-free objectless transitive verbs;
- object omission without a recoverable discourse antecedent;
- any wh/quantity object whose own NP typing is unresolved.

## Runtime implication for later work

A later accepted-specification task should inspect the actual AB78 matcher family rather than merely shrinking a surface list. The desired architecture is behavior-driven:

1. ordinary overt-object matching requires an independently typed object constituent;
2. context/gap realization requires an explicit owner/licensing relation rather than a hidden object;
3. outer clause/aspect/question/serial structures own their own spans;
4. semantic selection remains distinct from structural transitivity;
5. quantity/measure material does not become an object solely from slot affordances;
6. no neighboring construction inherits AB78 evidence just because it contains a transitive child.

This research task does not authorize the runtime migration.

## Status disposition

- Identity: provisionally retain AB78 / `TransitiveVP`.
- Linguistic status: retain `research_pending`.
- Evidence scope: narrow to independently supported transitive predicate–object behavior plus explicitly licensed non-overt realization profiles.
- Runtime: unchanged in this task.
- Test expectations: unchanged in this task.
- Promotion: not authorized.
