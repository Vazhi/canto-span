# CP021B Source-Derived Synthesis

- Date: 2026-07-17
- Lifecycle event: `SOURCE_DERIVED_SYNTHESIS`
- Evidence base: frozen CP021B-EX proposition ledger only
- Project language claims: seven narrow provisional claims
- Project representation/provenance dispositions: two no-claim results
- Evaluation fixtures: none
- Runtime authorization: none

## Frozen question

In independently documented or naturally attested modern Hong Kong Cantonese clauses containing `畀` or `俾`, what form–meaning patterns occur when two or more overt participants are present, and what evidence bears on their linear order, predicate dependence, participant interpretation, optionality, ambiguity, and discourse completeness?

## Method

Every one of the 79 frozen propositions was assigned one synthesis disposition in `CP021B-SYNTHESIS-COVERAGE.tsv`. Claims were written only after that mapping. `CP021B-CLAIM-SOURCE-EDGES.tsv` connects each consequential claim to exact frozen propositions and source locators; it also records restrictions, competing analyses, corrections, retractions, and evidence-family identity. `CP021B-CONTRADICTION-REGISTER.tsv` preserves eight material disagreements and their deliberately narrow resolutions.

Evidence-family counts are not votes. Repeated propositions from Wong's overlapping corpus papers, Lam's dissertation/article family, and papers with overlapping authors are not counted as independent replications.

## Answer at the supported scope

The evidence supports a plural, theory-neutral answer rather than one recipient template:

1. `畀/俾` is polyfunctional. Transfer or dative and beneficiary configurations coexist with causative or permissive and passive configurations. Surface identity alone cannot determine participant roles.
2. With lexical `畀/俾` meaning GIVE and two postverbal nominals, theme-before-recipient is independently described and corpus-attested. It is not licensed as the only possible order.
3. Reported order possibilities vary with predicate class, Goal versus Source role, object weight, discourse conditions, and speaker or contact variation. The evidence supports neither one global fixed order nor a freely productive alternation.
4. A predicate-theme-`畀/俾`-recipient or beneficiary surface pattern is independently attested. Interpretation depends on the upstream predicate and valency. Sources disagree whether the marker is prepositional, verbal/serial, a complex-predicate component, deletion residue, or part of an independent construction.
5. Heavy or complex themes are associated in some judgments and elicited tasks with order reversal, overt second `畀/俾`, `將`, or other restructuring. Conflicting judgments, a nonsignificant recent distance result, task postselection, and sparse corpus cells block a categorical threshold or productive parser trigger.
6. Corpus and parent-child conversational studies attest omitted-participant, topicalized, `將`, serial/beneficiary, and other non-canonical realizations. Local absence of an overt participant is not by itself evidence of ungrammaticality without discourse and predicate context.
7. In NP1-`畀/俾`-NP2-VP, causative or permissive and passive readings are independently documented and can be contextually ambiguous. NP2 cannot be assigned a transfer-recipient role from surface position alone.

These claims are source-originated and provisional. None is `supported_productive`: no immutable evaluation has been frozen, major analysis disputes remain, current unrestricted-adult frequency is unavailable, and native/expert structural adjudication has not occurred.

## Claim inventory

| Claim | Result | Confidence boundary |
|---|---|---|
| `CLAIM-CP021B-SY-001` | Polyfunctional surface boundary | High for boundary; not exhaustive |
| `CLAIM-CP021B-SY-002` | Lexical-GIVE theme-recipient pattern | High attestation; moderate distribution |
| `CLAIM-CP021B-SY-003` | Order is lexically, role-, and context-conditioned | Moderate |
| `CLAIM-CP021B-SY-004` | Post-theme marker/linking surface pattern | High attestation; low category confidence |
| `CLAIM-CP021B-SY-005` | Heavy-theme alternatives remain unsettled | Moderate tendency; low rule confidence |
| `CLAIM-CP021B-SY-006` | Non-full and restructured realization boundary | Moderate |
| `CLAIM-CP021B-SY-007` | Causative/passive context boundary | High boundary; moderate diagnostics |
| `CLAIM-CP021B-SY-008` | No unified recipient representation authorized | Project representation disposition |
| `CLAIM-CP021B-SY-009` | No current unrestricted frequency model | Project evidence-sufficiency result |

The exact claim text, scope, productivity state, competing analyses, project inference, and runtime disposition are frozen in `CP021B-SOURCE-DERIVED-CLAIMS.tsv`.

## Material contradiction resolutions

- **Theme-recipient versus alternatives:** retain theme-recipient as attested for lexical GIVE, reject exclusivity, and keep alternatives scoped to predicate, weight, discourse, and speaker evidence.
- **Marker category:** retain the surface pattern and upstream-predicate dependence; select no preposition, serial-verb, deletion, constructional, or grammaticalization ontology.
- **Short versus heavy double-`畀/俾`:** record short-theme acceptability as disputed/marked and heavy-theme association as a tendency only.
- **Weight effect:** preserve the elicited tendency but apply a productive-rule veto because recent modeling is nonsignificant and long-theme data are sparse.
- **Transfer versus causative/passive:** split the claims; marker identity cannot assign a recipient role.
- **Earlier no-agent passive corpus class:** the later encoding correction controls; the earlier class is retracted.
- **Obligatory realization versus omission:** treat completeness as predicate- and discourse-scoped, not categorical overt-argument obligatoriness.
- **Frequency:** preserve dataset-specific counts but issue no current unrestricted-adult frequency claim.

## Explicit no-claim results

The evidence does **not** authorize:

- one unified `RecipientFrame` replacement;
- one fixed category for post-theme `畀/俾`;
- one global fixed participant order;
- a freely productive order alternation;
- a categorical theme-length or distance threshold;
- a current unrestricted-adult conversational frequency ranking;
- automatic recipient mapping for the post-marker NP; or
- any runtime implementation in CP021B-SY.

## Relationship to existing runtime labels

CP021B-SY does not validate, rename, remove, or replace any current runtime label. Existing labels such as `TransferDitransitiveVP` and `PassivePermissiveRelation` retain their prior provenance and acceptance status. Similarity between a source-derived claim and current behavior is not proof that the runtime claim was authority-originated or correctly scoped.

No parser node, dispatcher rule, role mapping, lexical trigger, fixture expectation, or manifest field changes in this checkpoint.

## Evaluation prerequisites for a later event

After user confirmation, a separate evaluation-design event may translate the seven language claims and two no-claim results into immutable positive, negative, ambiguous, boundary, and held-out partitions. That event must not assume one node or one replacement shape. It must preserve:

- lexical GIVE versus non-GIVE predicates;
- theme-recipient versus recipient-theme and post-theme-marker orders;
- Goal versus Source boundaries;
- transfer versus beneficiary and serial-final-predicate distinctions;
- heavy-theme, double-marker, and `將` uncertainty;
- non-full/discourse-recoverable forms;
- causative or permissive versus passive ambiguity;
- correction controls and non-target bij2 functions; and
- orthographic `畀/俾` counterparts.

Evaluation design remains unauthorized until this synthesis checkpoint is frozen and the user confirms continuation.
