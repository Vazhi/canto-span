# CP033-P1 — Runtime reachability audit R1

## Purpose

This checkpoint addresses implementation test debt that does not depend on a
new native-speaker survey. At v0.5.188, 68 of the 170 runtime labels had no
direct standardized construction case. That absence did not show that the
labels were dead: every one still had at least one runtime code reference.

The audit therefore asks a narrower question:

> Which of those 68 labels can already be observed in structured material that
> is present in the repository, and which remain unobserved in that bounded
> scan?

It does **not** ask whether the labels are linguistically correct, natural,
productive, well named, or eligible for promotion.

## Method

Historical `tools/verify-runtime-reachability.js` extracted Cantonese-bearing candidate
strings from structured JSON and TSV fields under:

- `test-data/`;
- `review-packets/`;
- `external-evidence/`.

The extraction is intentionally bounded to sentence-like fields such as
`source`, `surface`, `cantonese`, `traditional`, `target_sentence`, and
`context_source`. It excludes the new reachability-probe file itself.

The frozen scan contains **1,885 unique candidate strings**. The current parser
produces at least one construction label on those strings, and **117 of the 170
runtime labels** appear somewhere in the resulting output.

Among the 68 labels that had no direct standardized case at the start of this
checkpoint:

- **15** were observed in the bounded scan;
- **53** were not observed;
- **0** met the Definition-of-Done retirement trigger, because every label still
  has runtime code references.

The complete classification is in
[`CP033-P1-RUNTIME-REACHABILITY-INVENTORY-R1.tsv`](CP033-P1-RUNTIME-REACHABILITY-INVENTORY-R1.tsv).

## Executable probes

One existing repository surface was selected for each of the 15 observed
labels. These cases are frozen in
[`../../test-data/implementation-reachability-probes-v1.json`](../../test-data/implementation-reachability-probes-v1.json).

Each probe records:

- the expected runtime label;
- the exact surface;
- its repository provenance;
- `linguistic_evidence_weight: 0`;
- `purpose: runtime_reachability_only`.

The standardized test suite now uses a separate coverage state,
`implementation_positive_only`, for labels exercised only by these probes.
This prevents implementation reachability from being mistaken for direct
linguistic evidence.

## Results

| Measure | Result |
|---|---:|
| Runtime labels | 170 |
| Structured candidate strings | 1,885 |
| Labels observed anywhere in bounded scan | 117 |
| Baseline labels with no direct case | 68 |
| Zero-weight implementation probes added | 15 |
| Labels now `implementation_positive_only` | 15 |
| Labels still `no_direct_cases` | 53 |
| Linguistic status changes | 0 |
| Parser-span behavior changes | 0 |
| Retirements | 0 |

The standardized construction suite increases from **1,156** to **1,171**
executable assertions. The additional 15 assertions protect implementation
reachability only.

## Interpretation limits

“Not observed” means only that a label did not appear in the 1,885-string
bounded scan. It does not prove that the constructor is unreachable. A label
may require vocabulary, context, nesting, or a structural combination absent
from the scanned material.

Conversely, “observed” means only that the parser emitted the label. It does not
validate the label’s linguistic analysis. Several probe sources are generated,
historical, candidate-unverified, or otherwise unsuitable as independent
attestation.

## Next non-survey work

The 53 unobserved labels should be reviewed in small implementation families.
For each label:

1. inspect the exact constructor and prerequisites;
2. create a semantically coherent code-specific reachability probe when the
   runtime path is intentional;
3. preserve zero linguistic evidence weight;
4. retire or merge the label only when runtime purpose, fixtures, and forward
   research value are all absent.

The recommended first family is the low-reference wrapper and clause layer:
`Comment`, `ComparativeStative`, `TemporalAdverbialClause`,
`DefinitionComplement`, and closely related wrapper labels.
