# ISSUE-622 幫 beneficiary-coverb profile disposition R1

Parent issue: #622  
Work claim: #623  
Date: 2026-08-05

## Decision

Retain the Week 18 `幫` route as a coherent, narrowly source-supported Cantonese benefactive/coverb profile with the core shape:

```text
subject + 幫 + overt beneficiary NP + following VP
```

The first phrase introduces the beneficiary of the event expressed by the following VP. The profile is not identified by the token `幫` alone, because Cantonese also has an ordinary transitive lexical use meaning ‘help’.

This packet does not allocate a new construction identity, reuse AA18, change runtime behavior, or promote linguistic status. The current AA18 legacy `BenefactiveVP` implementation is `畀`-based; identity relation between that family and `幫` requires separate expert adjudication.

## Profile dispositions

| Profile | Disposition | Reason |
|---|---|---|
| `subject + 幫 + overt beneficiary NP + action VP` | `SOURCE_SUPPORTED_NARROW_CORE` | Multiple direct scholarly sources analyze this as a benefactive coverb/asymmetric serial-verb profile and distinguish it from lexical `幫`. |
| `幫 + beneficiary + transitive VP + object` | `SOURCE_SUPPORTED` | Direct examples include buying a car for someone and washing dishes for someone. |
| `幫 + beneficiary + VP-咗 + object` | `SOURCE_SUPPORTED_LOWER_VP_ASPECT` | Wong et al. directly attest `我幫你洗咗啲碗啦`. |
| `幫 + beneficiary + VP + 啦` | `SOURCE_SUPPORTED_ONE_PARTICLE_PROFILE` | The same reference example contains clause-final `啦`. It does not establish all particles or stacks. |
| lexical `幫 + object` with no following VP | `SEPARATE_LEXICAL_HELP_PROFILE` | Francis et al. directly contrast main-verb `ngo5 bong1 keoi5` with coverb `ngo5 bong1 keoi5 maai5 ce1`. |
| aspect directly on coverb `幫過 + beneficiary + VP` | `SOURCE_SUGGESTED_NOT_BOUNDARY_COMPLETE` | Coverbs can bear aspect, and a preliminary `bong-gwo` extraction-context example exists, but the main controlled aspect experiment did not test `bong1` and the example is marginal. |
| omitted/extracted beneficiary in ordinary clauses | `NOT_LICENSED_BY_CURRENT_CORE` | Coverb-object extraction is strongly dispreferred and resumptive pronouns are preferred. Gradient extraction data do not establish free ordinary-clause omission. |
| relative-clause beneficiary gap | `GRADIENT_SPECIAL_DEPENDENCY_PROFILE` | Gaps occurred in experiments, but `bong1` strongly favored an overt resumptive pronoun. This is not an ordinary declarative template. |
| lower-VP object extraction | `SEPARATE_FOLLOWING_VP_DEPENDENCY` | The literature distinguishes extraction from the following VP from extraction of the coverb object. |
| `幫 + beneficiary + VP + 返嚟` | `ATTESTED_DIRECTIONAL_COMPOSITION_ONLY` | The Glossika trigger contains it; no reviewed direct source defines unrestricted directional-tail composition. |
| bare `幫 + VP` with no beneficiary | `UNRESOLVED_OR_SEPARATE` | The direct ordinary-clause core contains an overt beneficiary; extraction evidence cannot be used as an omission rule. |
| arbitrary stative, modal, passive, clausal, idiomatic, or multi-clause complements | `UNRESOLVED` | Reviewed examples use ordinary action predicates and do not establish unrestricted complement classes. |
| lexicalized `幫手` | `SEPARATE_LEXICAL_PROFILE` | Lexical identity and valency differ; token overlap is insufficient. |
| AA18 `畀`-based benefactive identity transfer | `NOT_AUTHORIZED` | Runtime and semantic similarity carry no identity authority. |

## Structural interpretation

### Narrow ordinary-clause composition

The reviewed sources converge on an asymmetric serial structure in which:

```text
[幫 beneficiary] [following VP]
```

The first predicate contributes a beneficiary relation and modifies the event expressed by the second predicate. The subject is shared or understood across the serial structure in the ordinary examples.

A theory-neutral parser specification should preserve:

- overt `幫`;
- an overt beneficiary NP as the object of the first predicate/coverb phrase;
- a separately typed following VP;
- any object, aspect, result, direction, or particle material only when independently licensed inside or after that VP;
- no hidden beneficiary, covert preposition, omitted lexical-help object, or inferred event.

The sources call this a coverb construction, a benefactive serial-verb construction, or an asymmetric serial construction. The parser need not choose a derivational theory, but it must preserve the two-predicate relation and the beneficiary’s attachment to `幫`.

### Lexical-help boundary

The direct contrast is:

```text
ngo5 bong1 keoi5
‘I help her’
```

versus:

```text
ngo5 bong1 keoi5 maai5 ce1
‘I buy a car for her’
```

The second predicate is therefore not optional noise. It is the principal surface evidence distinguishing the benefactive coverb profile from ordinary transitive `幫`.

A future matcher must not:

- label every occurrence of `幫` as benefactive;
- relabel lexical `幫 + object` merely because the object is animate;
- wrap arbitrary later clause material as a following VP;
- infer a beneficiary when no licensed NP is present.

## Aspect boundary

### Directly supported

The following-VP aspect profile is directly supported:

```text
我幫你 [洗咗啲碗] 啦。
```

A future composition may preserve the lower VP’s aspectual structure inside the benefactive relation.

### Not categorically excluded, but incomplete

Francis and Matthews argue that Cantonese coverbs retain verbal properties and can carry aspect. Their preliminary data include `bong-gwo` in an extraction context. However:

- the example is marginal;
- it tests extraction as well as aspect;
- `bong1` was not among the coverbs in their main controlled aspect experiment.

Accordingly, this packet rejects both overgeneralizations:

- **unsupported ban:** “aspect can never occur on benefactive `幫`”; and
- **unsupported license:** “all `幫過 + beneficiary + VP` strings instantiate the same productive core.”

Direct coverb-marked `幫過` remains a separate research boundary.

## Extraction and omission boundary

The beneficiary is the object of the first predicate/coverb phrase, not the object of the following VP. Francis and Matthews find extraction from this position substantially worse than extraction from the following VP. Francis et al. report a strong resumptive-pronoun preference in coverb-object relative clauses; for `bong1`, 88.2% of target productions retained the pronoun.

The later experiment also found some gaps, so a categorical impossibility claim would be false. The parser consequence is narrower:

1. ordinary-clause recognition should require the directly supported overt beneficiary;
2. relative-clause gaps and resumptives require their own typed dependency structure;
3. extraction data must not become a generic beneficiary-deletion fallback;
4. omission licensed by discourse, coordination, ellipsis, or repairs remains independently unresolved.

## Directional and result composition

The Week 18 trigger is:

```text
我幫你買嘢返嚟啦。
```

It is semantically coherent: `你` is the beneficiary, `買嘢返嚟` is the following event, and `啦` is final clause material. However, the learner source alone cannot establish:

- whether every directional VP can follow `幫 + beneficiary`;
- whether `返嚟` belongs inside one motion/result predicate or composes above a buying VP;
- the exact benefactive span when additional adjuncts or clauses occur;
- regional or lexical restrictions;
- productivity across other directionals.

A future implementation must therefore consume only an independently typed following VP. It must not scan for `幫`, take the next NP, and wrap the rest of the clause.

## Collision inventory

The following must remain outside the narrow core unless separately typed and composed:

- ordinary lexical `幫 + object` ‘help’;
- `幫手` and other lexicalized expressions;
- bare `幫` fragments or replies;
- `幫 + VP` without an overt beneficiary;
- relative clauses with a beneficiary gap or resumptive pronoun;
- wh-dependencies and topicalization of the beneficiary;
- coordination or multiple following predicates;
- quoted, embedded, conditional, focused, interrupted, or repaired material;
- arbitrary modal, negation, passive, disposal, comparative, or clausal-complement structures;
- untyped resultative or directional tails;
- unrelated material after the following VP;
- all `畀` benefactive, recipient, disposal, and passive profiles;
- any AA18 behavior or identity inferred from semantic similarity.

## Current repository comparison

### Week 18 route

Canonical route `W18-F08` correctly recorded:

- one Glossika trigger;
- no qualifying direct pattern-specific source at intake;
- the risk of token-only benefactive assignment;
- the risk of a generic `幫 + NP + VP` rule.

This packet supplies the missing direct construction-level evidence and resolves the route narrowly. It does not edit the route ledger because the work claim authorizes only the issue-specific research packet.

### Current runtime

The inspected legacy detector `src/parser/detectors/transfer/legacy-recipient.js` defines AA18 `BenefactiveVP` around `畀` profiles. It does not establish ownership of `幫`.

Consequences:

- no existing UUID is reused here;
- no canonical name is changed;
- no new identity is allocated;
- no runtime matcher or test is authorized;
- an expert identity adjudication is required before implementation specification.

## Identity consequence

The sources establish a linguistic profile but do not determine Canto Span ontology.

Plausible identity choices to adjudicate later include:

1. a distinct permanent `幫` beneficiary-coverb construction;
2. a broader benefactive family with separate `幫` and `畀` members;
3. composition from a more general typed coverb/serial relation plus lexical entries.

The current evidence does **not** authorize collapsing `幫` into AA18. AA18’s accepted identity, examples, runtime behavior, and evidence remain protected.

## Terminal outcome

- `幫 + overt beneficiary NP + following action VP`: `SOURCE_SUPPORTED_NARROWLY`.
- lower-VP object: `SOURCE_SUPPORTED`.
- lower-VP perfective `咗`: `SOURCE_SUPPORTED`.
- final `啦`: `SOURCE_SUPPORTED_IN_ONE_PROFILE`.
- lexical `幫 + object` ‘help’: `SEPARATE_MAIN_VERB_PROFILE`.
- coverb-object extraction: `STRONGLY_DISPREFERRED_BUT_GRADIENT`.
- ordinary beneficiary omission: `NOT_ESTABLISHED`.
- aspect directly on `幫`: `NOT_CATEGORICALLY_EXCLUDED_BUT_BOUNDARY_INCOMPLETE`.
- directional `返嚟` composition: `ATTESTATION_ONLY`.
- unrestricted complement classes: `NOT_ESTABLISHED`.
- AA18 identity transfer: `NOT_AUTHORIZED`.
- new UUID: no.
- status promotion: no.
- runtime change: no.

## Next separately claimed action

The next action should be **construction-identity adjudication**, not immediate coding.

That adjudication should decide whether the narrow `幫` profile receives a new permanent identity, belongs to a typed coverb family, or composes through an existing identity without evidence transfer from AA18. It should inspect the full canonical identity registry and all neighboring benefactive, recipient, serial-verb, and lexical-help records.

Only after that decision should a separate implementation specification define:

1. the required overt beneficiary slot;
2. the typed following-VP contract;
3. the lexical-main-verb boundary;
4. lower-VP aspect and object composition;
5. directional/result composition policy;
6. host-clause and particle boundaries;
7. extraction and omission exclusions;
8. controlled positive, negative, and collision tests.

A separate corpus route may extract `幫 + NP + VP` candidates for human adjudication, but raw counts or unreviewed hits must not promote the construction or settle identity.

## Protected-state confirmation

This packet changes no parser behavior, detector, template, test, fixture, generated output, runtime version, UUID, short code, canonical name, construction status, readiness state, corpus classification, survey, native panel, held-out evidence, release, package, or deployment state.

It does not touch or depend on the Codex-owned AB33 implementation in issues #620/#621.

## Source inventory

See `docs/research/ISSUE-622-BONG-BENEFACTIVE-SOURCE-INVENTORY-R1.md`.
