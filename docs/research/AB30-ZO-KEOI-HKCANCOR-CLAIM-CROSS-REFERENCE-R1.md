---
title: AB30 — HKCanCor V–咗–佢 claim cross-reference R1
status: complete_research_checkpoint
construction_uuid: 2169217f-a21d-5165-9513-eb0edee2c220
construction_code: AB30
canonical_name: ZoMarkedPerfectiveObjectVP
legacy_runtime_label: PostverbalZoPerfectiveVP
query_id: AB30-HKCANCOR-V-ZO-KEOI-R1
reviewed_on: 2026-07-24
---

# AB30 — HKCanCor V–咗–佢 claim cross-reference R1

## Endpoint

This track slice is complete when every exact HKCanCor token matching:

```text
token tagged v + exact 咗 + exact 佢
```

has stable candidate identity, source-file hash, utterance and token location,
participant metadata, full tokenization, adjacent-turn context, and one expert
classification. The endpoint is **27 of 27 candidates classified**, with
deterministic regeneration passing against the PyCantonese 5.0.0 distribution.

This is the largest single following-pronoun bucket among the 121 HKCanCor tokens
in the broader `verbal-tag + 咗 + r-tag` discovery set. It is a completed
research checkpoint, not a claim that all 835 exact `咗` tokens or all overt-NP
profiles have been reviewed.

## Canonical claim cross-reference

| Claim | Canonical/source owner | HKCanCor outcome | Scope |
|---|---|---|---|
| A lexical verb may be followed by perfective `咗` and an overt NP object. | `AB30 ZoMarkedPerfectiveObjectVP` in `data/construction-adjudications.json`; `SRC-YIP-MATTHEWS-2000-BASIC`; `SRC-SIO-BOND-2025` | **Supports surface attestation in this slice.** 23 candidates are genuine `V–咗–佢` or `V–咗–佢…` overt-NP tokens. | Occurrence only; no unrestricted productivity, frequency, or complete object-inventory result. |
| Token adjacency and the HKCanCor `v` tag do not by themselves prove the narrow object analysis. | AB30 grammar note and source limitations in `CP025-P1-PFV01-SOURCE-VERIFICATION-R1.tsv` | **Supported as a restriction.** Two candidates are false positives and two remain ambiguous after context review. | Manual context analysis remains necessary for every used hit. |
| The corpus slice can settle all completion, boundedness, temporal, or current-relevance analyses of `咗`. | Semantic cautions under `SRC-FAN-CHAN-2022`, `SRC-SIO-BOND-2025`, and `SRC-YIP-MATTHEWS-2000-BASIC` | **Not testable here.** The query selects form and annotation only. | No semantic theory is promoted or rejected from these tokens. |
| The complete AB30 corpus-readiness gate is satisfied. | AB30 grammar note and `data/construction-candidate-readiness.json` | **Not established.** This query intentionally covers one pronoun slice. | Readiness remains unchanged; the full lexical and overt-NP space is not exhausted. |

## Method and provenance

- Runtime environment: PyCantonese **5.0.0** in `.venv-hkcancor`.
- Corpus distribution: 58 files, 16,162 utterances, and 153,656 words.
- Checked source allowlist:
  `external-evidence/cp021b/hkcancor-cp021b-source-manifest.sha256`,
  SHA-256
  `d93b064614b38227889b2db20162eb0c2fee3fb75aa94e90dd9abfc64289c731`.
- Query: exact `咗`; immediately preceding token tagged `v`; immediately
  following token exactly `佢`.
- Canto Span parser output was not consulted.
- No semantic selection was performed during extraction.
- Stable IDs use permanent code `AB30` plus a content/provenance hash; they do
  not create a second construction identity or evidence owner.

The allowlist is verified against all PyCantonese source filenames and SHA-256
hashes before extraction. A mismatch stops the query.

## Complete review accounting

| Classification | Candidates | Source files | Interpretation |
|---|---:|---:|---|
| `genuine` | 23 | 16 | Natural overt-object attestations in the bounded slice. |
| `false_positive` | 2 | 2 | `佢` begins a following clause rather than the AB30 object. |
| `ambiguous` | 2 | 2 | The transcript does not securely resolve the predicate or pronominal role. |
| `unusable` | 0 | 0 | No candidate lacked recoverable source context. |
| **Total** | **27** | **19 overall** | Every extracted token is accounted for. |

The two false positives are:

- `變咗佢嗰個…`: discourse/result `變咗` followed by a new
  pronoun-initial phrase;
- `預咗佢壞`: `佢` is the subject of the following proposition `佢壞`, not the
  overt NP object required by the narrow AB30 profile.

The ambiguous rows are `pit3咗佢`, whose romanized predicate is not recoverable
precisely enough, and `賺咗佢一二千蚊`, where the local turn does not settle a
referential-object analysis versus a colloquial dummy before an amount.

Genuine rows include simple pronominal objects (`摺咗佢`, `賣咗佢`,
`錄咗佢`), person objects (`答咗佢`, `幫咗佢`, `拉咗佢`), and overt NPs
whose first token is `佢` (`佢個頭`, `佢舖`, `佢嘅行為`,
`佢應該要賺嘅嘢`). This diversity is descriptive of the reviewed slice only.

## Artifacts

- extractor:
  `external-evidence/ab30-hkcancor/query-hkcancor-ab30-zo-keoi.py`;
- deterministic inventory:
  `external-evidence/ab30-hkcancor/hkcancor-ab30-zo-keoi-candidate-inventory.json`;
- review TSV:
  `external-evidence/ab30-hkcancor/hkcancor-ab30-zo-keoi-candidate-inventory.tsv`;
- query summary:
  `external-evidence/ab30-hkcancor/hkcancor-ab30-zo-keoi-query-summary.json`;
- complete decision ledger:
  `review-packets/corpus-review/AB30/hkcancor-zo-keoi-decisions-r1.json`.

Reproduce and validate from the repository root:

```bash
source .venv-hkcancor/bin/activate
python external-evidence/ab30-hkcancor/query-hkcancor-ab30-zo-keoi.py \
  --output-dir external-evidence/ab30-hkcancor \
  --source-manifest \
    external-evidence/cp021b/hkcancor-cp021b-source-manifest.sha256 \
  --decisions \
    review-packets/corpus-review/AB30/hkcancor-zo-keoi-decisions-r1.json \
  --check
```

## Disposition

The bounded track endpoint is reached. The result supports natural attestation
for the AB30 overt-object profile and empirically confirms that token/POS
adjacency is insufficient. It does not change the `research_pending` status,
the accepted five-candidate readiness packet, `corpus_readiness_effect:
partial_only`, the runtime matcher, identity, panel state, held-out state, or
promotion eligibility.

The next independent slice, if separately authorized, is the remaining
`verbal-tag + 咗 + r-tag` inventory after excluding exact `佢`; it is not part
of this completed checkpoint.
