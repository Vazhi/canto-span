---
title: AB30 — HKCanCor V–咗–r claim cross-reference R2
status: complete_research_checkpoint
construction_uuid: 2169217f-a21d-5165-9513-eb0edee2c220
construction_code: AB30
canonical_name: ZoMarkedPerfectiveObjectVP
legacy_runtime_label: PostverbalZoPerfectiveVP
query_id: AB30-HKCANCOR-V-ZO-R-R2
reviewed_on: 2026-07-24
---

# AB30 — HKCanCor V–咗–r claim cross-reference R2

## Endpoint

This track is complete when every exact HKCanCor token matching:

```text
preceding POS v, v1, or xv + exact 咗 + following POS r
```

has stable candidate identity, source-file hash, utterance and token location,
participant metadata, full tokenization, adjacent-turn context, and one expert
classification. The endpoint is **121 of 121 candidates classified**, with
deterministic regeneration passing against the PyCantonese 5.0.0 distribution.

The POS allowlists make this a bounded high-recall comparison track. It is not a
claim that all 835 exact `咗` tokens, every HKCanCor verb annotation, or the
complete Cantonese overt-NP system has been reviewed.

## Canonical claim cross-reference

| Claim | Canonical/source owner | HKCanCor outcome | Scope |
|---|---|---|---|
| A lexical predicate may be followed by perfective `咗` and an overt licensed NP object. | `AB30 ZoMarkedPerfectiveObjectVP` in `data/construction-adjudications.json`; `SRC-YIP-MATTHEWS-2000-BASIC`; `SRC-SIO-BOND-2025` | **Supports surface attestation in this track.** 69 candidates contain a genuine overt object after `V–咗`. | Occurrence only; no unrestricted productivity, frequency, or complete object-inventory result. |
| Token adjacency and HKCanCor POS tags do not by themselves prove the narrow object analysis. | AB30 grammar note and source limitations in `CP025-P1-PFV01-SOURCE-VERIFICATION-R1.tsv` | **Strongly supported as a restriction.** 48 candidates are false positives and 4 remain ambiguous after context review. | False positives include following-clause subjects, motion and duration complements, lexicalized profiles, and non-object predicate structures. |
| The corpus track can settle all completion, boundedness, temporal, or current-relevance analyses of `咗`. | Semantic cautions under `SRC-FAN-CHAN-2022`, `SRC-SIO-BOND-2025`, and `SRC-YIP-MATTHEWS-2000-BASIC` | **Not testable here.** The query selects form and annotation only. | No semantic theory is promoted or rejected from these tokens. |
| The complete AB30 corpus-readiness gate is satisfied. | AB30 grammar note and `data/construction-candidate-readiness.json` | **Not established.** This is a complete POS-defined research track, not the full lexical or overt-NP space. | Readiness and the accepted five-candidate packet remain unchanged. |

## Method and provenance

- Runtime environment: PyCantonese **5.0.0** in `.venv-hkcancor`.
- Corpus distribution: 58 files, 16,162 utterances, and 153,656 words.
- Checked source allowlist:
  `external-evidence/cp021b/hkcancor-cp021b-source-manifest.sha256`,
  SHA-256
  `d93b064614b38227889b2db20162eb0c2fee3fb75aa94e90dd9abfc64289c731`.
- Query: exact `咗`; immediately preceding token tagged `v`, `v1`, or `xv`;
  immediately following token tagged `r`.
- Selection unit: token adjacency within one HKCanCor utterance.
- Canto Span parser output was not consulted.
- No semantic selection was performed during extraction.

The allowlist is verified against all PyCantonese source filenames and SHA-256
hashes before extraction. A mismatch stops the query.

The 27 exact-`佢` candidates retain their R1 candidate IDs by preserving the
`AB30-HKCANCOR-V-ZO-KEOI-R1` hash namespace. The other 94 IDs use the R2 query
namespace. This explicit compatibility rule preserves the earlier review trail;
all 121 decisions now live in the single superseding R2 ledger and continue to
resolve to permanent construction code `AB30`.

## Complete review accounting

| Classification | Candidates | Source files | Interpretation |
|---|---:|---:|---|
| `genuine` | 69 | 34 | Natural overt-object attestations within the bounded query. |
| `false_positive` | 48 | 33 | Adjacent r-tagged token does not begin the narrow AB30 object. |
| `ambiguous` | 4 | 4 | Transcript context does not securely resolve the predicate or NP role. |
| `unusable` | 0 | 0 | No candidate lacked recoverable source context. |
| **Total** | **121** | **46 overall** | Every extracted token is accounted for. |

The 48 false positives show several recurring boundaries:

- `變咗` often acts as a discourse-result transition before a new
  pronoun-initial clause;
- `去咗`, `上咗`, `飛咗`, and similar motion predicates take destination,
  source, or path complements rather than the target object;
- `玩咗幾多日`, `做咗幾耐`, and similar rows contain duration complements;
- `預咗你哋自己識睇書` and `講咗哩套戲講乜嘢` place the r-tagged token
  at the start of a following proposition;
- lexicalized or non-target profiles include exceptive `除咗` and
  loss/absence `冇咗`.

The four ambiguous rows are the two preserved R1 cases (`pit3咗佢` and
`賺咗佢一二千蚊`) plus repaired `醃咗嗰啲泡菜` and
`受咗嗰個美式嘅幽默…接受得比較多啲`. Their local transcripts do not
support a secure narrow object classification.

Genuine rows include personal pronouns, possessive-NP onsets, demonstrative NPs,
interrogative/quantified objects, and code-switched predicates. That diversity
describes only the reviewed POS-defined track.

## Artifacts

- extractor:
  `external-evidence/ab30-hkcancor/query-hkcancor-ab30-zo-r.py`;
- deterministic inventory:
  `external-evidence/ab30-hkcancor/hkcancor-ab30-zo-r-candidate-inventory.json`;
- review TSV:
  `external-evidence/ab30-hkcancor/hkcancor-ab30-zo-r-candidate-inventory.tsv`;
- query summary:
  `external-evidence/ab30-hkcancor/hkcancor-ab30-zo-r-query-summary.json`;
- complete decision ledger:
  `review-packets/corpus-review/AB30/hkcancor-zo-r-decisions-r2.json`.

Reproduce and validate from the repository root:

```bash
source .venv-hkcancor/bin/activate
python external-evidence/ab30-hkcancor/query-hkcancor-ab30-zo-r.py \
  --output-dir external-evidence/ab30-hkcancor \
  --source-manifest \
    external-evidence/cp021b/hkcancor-cp021b-source-manifest.sha256 \
  --decisions \
    review-packets/corpus-review/AB30/hkcancor-zo-r-decisions-r2.json \
  --check
```

## Disposition

The bounded track endpoint is reached. The result supports natural attestation
for the AB30 overt-object profile and demonstrates that token/POS adjacency is
insufficient. It does not change the `research_pending` status, accepted
five-candidate readiness packet, `corpus_readiness_effect: partial_only`, runtime
matcher, identity, panel state, held-out state, or promotion eligibility.

Any future HKCanCor cross-reference would require a separately defined query
outside this completed `v|v1|xv + 咗 + r` endpoint.
