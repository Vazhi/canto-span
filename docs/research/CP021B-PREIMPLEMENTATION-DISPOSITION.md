# CP021B Pre-implementation Disposition Freeze

- Date: 2026-07-17
- Lifecycle event: `PRE_IMPLEMENTATION_DISPOSITION_FREEZE`
- Status: `RESEARCH_DISPOSITION_ONLY / TWO_BOUNDED_FUTURE_DESIGN_CANDIDATES / ZERO_RUNTIME_AUTHORIZATION`
- Accepted parser: `v0.5.172-lane01-rendered-use-function-relation-r2`
- Active unaccepted candidate: `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`
- Runtime changes: none

## Decision

CP021B nominates two bounded candidates for a later, separately frozen parser-design event:

1. `CP021B-PI-C01 / LEXICAL_GIVE_RELATION_NARROWING` may replace or narrow the unsupported `TransferDitransitiveVP` abstraction around lexical `畀/俾` meaning GIVE with two overt postverbal nominal participants.
2. `CP021B-PI-C02 / POST_THEME_BIJ2_NEUTRAL_RELATION` may replace or neutralize the unsupported `RecipientFrame` abstraction for predicate-theme-`畀/俾`-NP surfaces while preserving the upstream predicate, overt post-marker participant, optional later predicate, and unresolved Goal/recipient/beneficiary analysis.

These are future design authorizations, not parser designs and not runtime authorizations. No candidate name in this record is a language-fact label. Exact recognition, refusal, trace, learner-display, and semantic-acceptance behavior remains unwritten.

`PassivePermissiveRelation` is not a third CP021B implementation candidate. It remains owned by CP020R2 and still requires the complete rendered 60-row disposition. CP021B claim 007 may support a later provenance reconstruction, but it cannot prove that the existing runtime claim originated in those sources, accept v0.5.174, or create a parallel runtime branch.

## Evidence boundary used

This disposition used only:

- the frozen CP021B source screen, proposition extraction, source-derived claims, edges, contradictions, and synthesis;
- the immutable evaluation specification and the 24-row design partition;
- current runtime source, learner labels, retired-label metadata, grammar-legitimacy records, and CP021A provenance records;
- the current CP020R2 ownership and rendered-review requirements.

No CP021B parser output was run or inspected. The 36-row held-out partition was not opened for implementation design. Its frozen identity remains an integrity boundary for a future post-implementation evaluation.

## Why the two candidates are separate

The evidence supports a lexical GIVE baseline and independently supports a post-theme linking surface. It does not support collapsing them:

- lexical GIVE has a transferred theme and recipient, with theme-before-recipient attested but not exclusive;
- post-theme `畀/俾` can link a Goal, recipient, or beneficiary depending on the upstream predicate and valency and may precede a later predicate;
- causative/permissive and passive `NP1-畀/俾-NP2-VP` configurations are a separate evidence family;
- the visible marker and NP position do not determine one function or participant role.

The current runtime crosses these boundaries in two different ways. `TransferDitransitiveVP` describes both orders as available from visible NP typing, while `RecipientFrame` combines recipient and beneficiary slots and tells learners that the phrase “receives or benefits.” The responsible next step is therefore a narrow lexical-GIVE design and a theory-neutral post-theme design, not one replacement relation.

## Candidate constraints

### CP021B-PI-C01 — lexical GIVE relation narrowing

Permitted future scope:

- lexical `畀/俾` meaning GIVE;
- two overt postverbal nominal participants;
- theme-before-recipient as an attested, nonexclusive baseline;
- explicitly review-bearing alternative-order handling;
- orthographic parity between `畀` and `俾`.

Prohibited:

- free or global recipient-theme alternation;
- categorical theme-length or distance thresholds;
- automatic extrapolation to non-GIVE predicates;
- beneficiary, causative/permissive, passive, or hidden-participant analysis;
- productive acceptance based on fixtures or evaluation-set rates.

### CP021B-PI-C02 — post-theme `bij2` neutral relation

Permitted future scope:

- overt predicate/theme material followed by `畀/俾` and an overt NP;
- retention of the upstream predicate and valency context;
- a neutral post-marker participant unless independently licensed more narrowly;
- preservation of an optional later predicate in serial or purpose-like surfaces;
- competing Goal, recipient, beneficiary, serial, prepositional, or complex-predicate analyses without selecting one as fact.

Prohibited:

- an automatic Recipient role from post-marker position;
- a combined “receives or benefits” language claim;
- merger with lexical-GIVE ditransitives or passive/permissive configurations;
- one fixed category for post-theme `畀/俾`;
- use of the retired `BenefactiveRecipientFrame` alias as evidence.

## Dispositions without implementation

- Heavy or complex themes: research and native/expert review required. No length threshold, double-marker trigger, `將` trigger, or productivity claim is licensed.
- Non-full and restructured forms: representation invariant only. Do not insert hidden participants and do not infer ungrammaticality from missing local material without context.
- Frequency: no current unrestricted-adult conversational prior, threshold, or rate may be inferred from the evidence or balanced evaluation partitions.
- Fixed expressions, conditional homographs, historical instrument uses, and unrelated speech ditransitives remain outside both candidates.

## Mandatory prerequisites before parser design or implementation

Both nominated candidates require all of the following:

1. CP020R2 receives explicit rendered PASS, REVISE, or REJECT after all 60 summary rows and full diagnostics are inspected.
2. Relevant CP021B design rows receive native/expert review; generated probes remain probes, not evidence.
3. A separate parser-design freeze defines exact positive boundaries, refusal boundaries, traces, learner labels, and semantic-review behavior.
4. The design is based only on the evidence record and design partition. The held-out partition stays unopened until implementation is frozen.
5. The implementation branches from the runtime authoritative after CP020R2 disposition, not automatically from the current unaccepted v0.5.174 package.
6. No claim is promoted to `supported_productive` without the independent evidence required by CP021A governance.

## Frozen artifacts

- `docs/research/CP021B-PREIMPLEMENTATION-CLAIM-DISPOSITIONS.tsv`
- `docs/research/CP021B-FUTURE-REMEDIATION-CANDIDATES.tsv`
- `docs/research/CP021B-RUNTIME-IMPACT-MAP.tsv`
- `tools/audit-cp021b-preimplementation.js`

## Outcome

- Claim dispositions frozen: 9/9
- Future bounded design candidates nominated: 2
- Existing-runtime owner deferrals: 1
- Runtime labels directly impact-mapped: 8
- Parser designs written: 0
- Runtime changes authorized: 0
- Supported productive claims: 0

The natural next runtime checkpoint remains CP020R2 rendered disposition. After that disposition and native/expert review of the relevant design rows, the research branch may begin a separate CP021B parser-design freeze for one or both nominated candidates. CP021B-PI itself ends here.
