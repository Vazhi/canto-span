# CP021B Native / Expert Review Preparation Freeze

- Date: 2026-07-17
- Lifecycle event: `NATIVE_EXPERT_REVIEW_PACKET_FREEZE`
- Status: `PACKET_PREPARED / REVIEW_NOT_STARTED / NO_DESIGN_OR_RUNTIME_AUTHORIZATION`
- Parent checkpoint: `CP021B-PI`

## Purpose

CP021B-PI requires native/expert review of relevant design rows before either nominated future candidate may enter parser design. This event prepares an unbiased, recoverable two-stage review packet; it does not supply or simulate those judgments.

## Frozen selection

The packet contains exactly the first twelve frozen design rows:

- seven lexical-GIVE/order rows relevant to `CP021B-PI-C01`, including aspectless, heavy-theme, and two-pronoun boundaries;
- five post-theme rows relevant to `CP021B-PI-C02`, including Goal, transfer, beneficiary, context-dependent, and final-predicate boundaries.

The presentation order is the ascending SHA-256 order of `CP021B-NR0|<surface>`. Review identifiers conceal original design ordering. Both `畀` and `俾` occur. No held-out row is selected or parsed.

## Bias controls

Stage A exposes only review identifiers, Cantonese surfaces, and blank response fields. It excludes:

- source-row identifiers;
- candidate and claim identifiers;
- intended translations;
- expected observations and prohibited inferences;
- evidence scope and stimulus origin;
- all parser output.

Stage B begins only after Stage A responses are immutable and hashed. The expert then receives the mapping and evidence ledgers, but still no parser output or held-out material. Uncertainty, context dependence, disagreement, and theory boundaries must remain explicit.

## Evidence limits

- Generated surfaces remain probes rather than independent language evidence.
- Native naturalness does not validate structural analysis or productivity.
- Expert analysis must state its theoretical and confidence scope.
- No response count, majority rule, or frequency inference is preregistered.
- A review result cannot accept CP020R2 or authorize a CP021B parser design by itself.

## Artifacts

- `review-packets/cp021b-native-expert-design-v1/README.md`
- `review-packets/cp021b-native-expert-design-v1/stage-a-native/README.md`
- `review-packets/cp021b-native-expert-design-v1/stage-a-native/REVIEW-FORM.tsv`
- `review-packets/cp021b-native-expert-design-v1/stage-b-expert/README.md`
- `review-packets/cp021b-native-expert-design-v1/stage-b-expert/ADJUDICATION-FORM.tsv`
- `docs/research/CP021B-NATIVE-EXPERT-REVIEW-MAPPING.tsv`
- `tools/audit-cp021b-review-preparation.js`

## Completion boundary

Review status is `NOT_STARTED`. A later ingestion event must preserve each raw response, reviewer scope, response-file hash, disagreements, missing evidence, and adjudication limits. CP020R2 rendered disposition remains an independent prerequisite. Parser design and runtime authorization remain zero.
