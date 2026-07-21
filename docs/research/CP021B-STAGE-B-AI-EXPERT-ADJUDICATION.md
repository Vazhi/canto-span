# CP021B Stage B AI Expert Adjudication

- Date: 2026-07-17
- Lifecycle event: `USER_AUTHORIZED_AI_EXPERT_ADJUDICATION`
- Status: `12_OF_12_ADJUDICATED / SOURCE_GROUNDED / NOT_INDEPENDENT_HUMAN_EXPERT_VALIDATION / NO_RUNTIME_AUTHORIZATION`
- Parent checkpoint: `CP021B-NR1`

## User-supplied reviewer clarification

The user clarified that `CP021B-NS01` is the user's wife, a native Cantonese speaker from Guangzhou, and will be the sole native speaker for this project. This supersedes the earlier `UNRECORDED_ON_FORM` variety field. The original response file remains unchanged; the clarification is preserved in `NORMALIZED-RESPONSE-NS01-v2.tsv` with clarification date 2026-07-17. The original review date remains unrecorded.

The naturalness judgments are therefore evidence about one Guangzhou Cantonese speaker. They are not relabeled as Hong Kong Cantonese judgments. Modern Hong Kong Cantonese scope continues to come from the frozen external sources, with all source limitations intact.

## Adjudicator identity and limit

At the user's request, Stage B was completed by `CP021B-AI-ADJ-01`, an AI linguistic research adjudicator synthesizing the frozen project sources, claims, proposition edges, contradictions, design mapping, and locked native response.

This is not an independent human expert opinion and not a second native-speaker judgment. It supplies systematic source-grounded analysis under the user's access constraint. It cannot establish population judgments, replace missing intended-reading elicitation, or convert generated probes into corpus attestations.

## Method

For each of the twelve rows, the adjudication:

1. preserved the native response and correction exactly;
2. traced the row to its frozen design record, source-derived claims, source propositions, and contradiction records;
3. distinguished lexical GIVE from post-theme `畀/俾`;
4. described participant order without assigning roles from position alone;
5. selected no prepositional, serial, complex-predicate, constructional, or grammaticalization ontology;
6. wrote only a theory-neutral parser-safe observable;
7. retained Guangzhou-versus-Hong-Kong scope, speaker variation, and generated-probe limits.

No CP021B parser output or held-out evaluation row was used for adjudication.

## Aggregate result

- Rows adjudicated: **12/12**
- `ATTESTED_AS_GIVEN`: **9**
- `MARKED_OR_SPEAKER_VARIABLE`: **2**
- `UNACCEPTABLE_AS_GIVEN`: **1**
- Lexical GIVE: **7**
- Non-lexical-GIVE / post-theme linking: **5**
- Post-theme relation present: **5**
- Upstream predicate dependence required: **5**
- Structural category selected: **0**
- AI structural adjudications: **12**
- Independent human expert validations: **0**
- Native structural-analysis validations: **0**

## Candidate C01 — lexical GIVE narrowing

The evidence supports a narrow design baseline for lexical `畀/俾` with overt theme and recipient:

- N05, N08, N11, and N12 support theme-before-recipient surfaces under the bounded task scope.
- N02, a short-theme recipient-before-theme surface, is rejected by the Guangzhou reviewer, while its theme-before-recipient correction is accepted as N11.
- N10, a recipient-before-heavy-theme surface, is accepted by the same reviewer and is consistent with source reports of speaker- and weight-conditioned alternatives.
- N07, with two post-GIVE pronouns, is rejected; the supplied double-`畀` repair is preserved without inferring its roles.

Parser-safe consequence: theme-before-recipient may be a reviewed lexical-GIVE baseline. Recipient-before-theme must remain marked or review-bearing, especially outside heavy-theme contexts. No free alternation, hard weight threshold, two-pronoun mapping, exclusive order, or broad productivity claim is licensed.

## Candidate C02 — post-theme neutral relation

All five selected post-theme surfaces are accepted by the Guangzhou reviewer and align with source-supported distinctions:

- N01: BUY plus theme plus post-theme participant; beneficiary versus intended recipient remains contextual.
- N03: TAKE/GET plus theme plus post-theme participant plus final READ predicate; the final predicate must remain visible.
- N04: KNIT plus theme plus beneficiary-like participant; no lexical transfer is entailed.
- N06: ambiguous BORROW/LEND plus theme plus post-theme participant; sources favor a Goal/lend-to reading, but the native task supplied no reading.
- N09: HAND/DELIVER plus theme plus Goal-like participant.

Parser-safe consequence: a later design may preserve a theory-neutral post-theme relation only when the upstream predicate, theme, overt post-marker participant, and optional final predicate are retained. It must not label every post-marker NP a recipient, merge beneficiary and transfer, choose a fixed category for `畀/俾`, or absorb lexical GIVE or passive/permissive configurations.

## Gate disposition

The user has no access to an independent human expert and explicitly authorizes AI adjudication. Under that constraint, the CP021B Stage B review prerequisite is complete for a later conservative parser-design freeze, with the following permanent qualifications:

- the sole native reviewer is a Guangzhou Cantonese speaker, not a Hong Kong Cantonese reviewer;
- the adjudicator is AI, not an independent human expert;
- missing Stage A reading, role, context, confidence, and original-date fields remain unresolved;
- no claim becomes `supported_productive`;
- no runtime behavior is authorized by this event.

CP020R2 rendered disposition remains the independent blocker before any CP021B parser-design freeze. Human expert review is desirable if it later becomes available, but is not retained as an impossible active prerequisite under the user's explicit constraint.

## Frozen artifacts

- `review-packets/cp021b-native-expert-design-v1/stage-a-native/completed-low-friction/NORMALIZED-RESPONSE-NS01-v2.tsv`
- `review-packets/cp021b-native-expert-design-v1/stage-b-expert/completed/ADJUDICATION-FORM-CP021B-AI-ADJ-01.tsv`
- `tools/audit-cp021b-stage-b-ai-adjudication.js`
- `validation/cp021b-stage-b-ai-adjudication-CP021B-EA1.json`

Next event after confirmation: complete CP020R2 rendered disposition. If CP020R2 is resolved, freeze a conservative CP021B parser design based only on the adjudicated observables and the design partition; keep the held-out partition closed until implementation is frozen.
