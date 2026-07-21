# Native-Speaker Evidence

> **CP020R2-RA1 state — 2026-07-17:** The indefinite new-grammar freeze and replacement-only rule remain retired. Legacy Cantonese-language claims remain non-promotable until reconstructed from screened external evidence; future grammar must follow the authority-origin lifecycle. Parser `v0.5.174` is accepted after full rendered review; there is no active candidate.

## Two non-interchangeable layers

1. **Sentence naturalness:** whether the utterance is acceptable in the stated context.
2. **Analysis validation:** whether the proposed construction, hierarchy, roles, sense, scope, argument linkage, productivity, and restrictions are correct.

Naturalness never implies analysis validation.

## Current completed evidence

Screening project: `CS-NS-NAT-v0.5.160-r2`

```text
reviewers:                         1
completed batches/forms:           7
judgments:                       136
acceptable:                      128
marked unnatural:                  8
accepted-pattern units:           128
accepted-pattern acceptable:      124
accepted-pattern rejected:          4
follow-up judgments:                3
controls correctly rejected:       3/3
repeat pairs consistent:           2/2
optional corrections supplied:       0
candidate-mapped labels:            89
analysis-validated labels:           0
```

The historical unchecked-box forms were previously interpreted as acceptable. CP021A retires that inference for evidential use because a blank box cannot distinguish acceptance, omission, uncertainty, fatigue, or incomplete review. Preserve the historical responses as collected, but relabel unchecked outcomes `legacy_implicit_response_not_affirmative_evidence` unless an explicit instruction/response record independently proves the meaning. Blank optional correction fields may still mean that no correction was supplied; they do not validate naturalness or analysis.

## CP021B explicit low-friction screen

Screening record: `CP021B-NR1 / CP021B-NS01`; metadata clarified at `CP021B-EA1`

```text
reviewers:                              1
explicit naturalness choices:          12
natural_in_context:                    10
unnatural_in_context:                   2
unsure_or_needs_context:                0
not_seen:                               0
optional corrections supplied:          2
native structural-analysis validations: 0
```

The user clarified that the reviewer is the user's wife, a native Cantonese speaker from Guangzhou, and will be the sole native speaker used by the project. The original form leaves name and date blank; the project uses pseudonym `CP021B-NS01`, records Guangzhou Cantonese explicitly, and keeps the original review date unrecorded. Future responses from the same person remain one reviewer source and must not be counted as independent speakers or replication.

The task intentionally omitted translations, participant-role descriptions, context, and confidence. Its twelve explicit choices are valid one-speaker Guangzhou Cantonese naturalness evidence within that limited scope; they are not Hong Kong Cantonese judgments and do not validate intended readings, roles, structures, categories, productivity, or population frequency.

At the user's request, `CP021B-EA1` adds 12 source-grounded AI research adjudications. They are not independent human expert validation or native-speaker structural analysis. Independent human expert validations and native structural-analysis validations therefore remain zero.

The locked raw response, clarified normalized ledger, adjudication, exact limits, and item-level contrasts are recorded in `docs/research/CP021B-NATIVE-NATURALNESS-INGESTION.md`, `docs/research/CP021B-STAGE-B-AI-EXPERT-ADJUDICATION.md`, and the associated review-packet folder.

## Quarantined positive-evidence items

| ID | Surface | Current evidence disposition |
|---|---|---|
| `CS160-P0-03` | `食完咗飯。` | One-speaker rejection conflicts with independent broad-family attestation; preserve conflict and do not use this surface as positive validation of the exact parser analysis. |
| `CS160-N005` | `下年呢個時間咪過囉。` | Rejected adaptation; do not attribute rejection to any single internal label without analysis. |
| `CS160-N031` | `唔做完。` | Rejected; compare with construction-internal potential forms before analysis. |
| `CS160-N013` | `我飲七杯度喇。` | Rejected; `ApproximateQuantity` remains unsupported/quarantined as positive evidence. |

## Future review record

Preserve:

- batch/form version;
- reviewer pseudonym and relevant background;
- instructions;
- target and context;
- source class;
- naturalness response;
- intended-meaning response;
- contrast questions;
- analysis questions;
- confidence if supplied;
- optional correction;
- repeat/control status;
- timestamp and file hash;
- conflicts with other evidence.

Use low-friction naturalness screening where appropriate, but obtain separate analysis validation for structure-sensitive claims.

Future forms must record one explicit state per item: `natural_in_context`, `unnatural_in_context`, `unsure_or_needs_context`, or `not_seen`. Include an intended-reading check where ambiguity matters. Naturalness evidence remains distinct from analysis validation.
