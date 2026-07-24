---
title: AB30 — HKCanCor V–咗–m claim cross-reference R1
status: complete_research_checkpoint
construction_uuid: 2169217f-a21d-5165-9513-eb0edee2c220
construction_code: AB30
canonical_name: ZoMarkedPerfectiveObjectVP
legacy_runtime_label: PostverbalZoPerfectiveVP
query_id: AB30-HKCANCOR-V-ZO-M-R1
reviewed_on: 2026-07-24
---

# AB30 — HKCanCor V–咗–m claim cross-reference R1

## Endpoint

This track is complete when every exact HKCanCor token matching:

```text
preceding POS v, v1, or xv + exact 咗 + following POS m
```

has stable candidate identity, source-file hash, utterance and token location,
participant metadata, full tokenization, adjacent-turn context, and one expert
classification. The endpoint is **106 of 106 candidates classified**, with
deterministic regeneration passing against the PyCantonese 5.0.0 distribution.

POS `m` is the largest remaining immediate-post-`咗` bucket after the completed
121-row `r` track. It exceeds following `y` (79), `v` (77), `q` (76), and
punctuation (70) within the same preceding-verb-tag boundary. This is a bounded
high-recall comparison track, not a complete review of all 835 exact `咗` tokens.

## Canonical claim cross-reference

| Claim | Canonical/source owner | HKCanCor outcome | Scope |
|---|---|---|---|
| A lexical predicate may be followed by perfective `咗` and an overt licensed NP object, including a quantified NP. | `AB30 ZoMarkedPerfectiveObjectVP` in `data/construction-adjudications.json`; `SRC-YIP-MATTHEWS-2000-BASIC`; `SRC-SIO-BOND-2025` | **Supports surface attestation.** 52 candidates contain genuine quantified, measure-onset, or headless amount objects. | Occurrence only; no unrestricted productivity, frequency, or complete quantified-object result. |
| An adjacent HKCanCor `m` tag does not by itself identify an object. | AB30 grammar note and source limitations in `CP025-P1-PFV01-SOURCE-VERIFICATION-R1.tsv` | **Strongly supported as a restriction.** 52 candidates are false positives and 2 remain ambiguous. | Duration, frequency, degree, differential, threshold, predicative, postverbal-subject, and following-clause readings require context review. |
| The track settles all completion, boundedness, temporal, or current-relevance analyses of `咗`. | Semantic cautions under `SRC-FAN-CHAN-2022`, `SRC-SIO-BOND-2025`, and `SRC-YIP-MATTHEWS-2000-BASIC` | **Not testable here.** The query selects form and POS annotation only. | No semantic theory is promoted or rejected. |
| The complete AB30 corpus-readiness gate is satisfied. | AB30 grammar note and `data/construction-candidate-readiness.json` | **Not established.** This is one complete POS-defined track, not the complete lexical or overt-NP space. | Readiness and the accepted five-candidate packet remain unchanged. |

## Method and provenance

- Runtime environment: PyCantonese **5.0.0** in `.venv-hkcancor`.
- Corpus distribution: 58 files, 16,162 utterances, and 153,656 words.
- Checked source allowlist:
  `external-evidence/cp021b/hkcancor-cp021b-source-manifest.sha256`,
  SHA-256
  `d93b064614b38227889b2db20162eb0c2fee3fb75aa94e90dd9abfc64289c731`.
- Query: exact `咗`; immediately preceding token tagged `v`, `v1`, or `xv`;
  immediately following token tagged `m`.
- Selection unit: token adjacency within one HKCanCor utterance.
- Canto Span parser output was not consulted.
- No semantic selection was performed during extraction.

The allowlist is verified against all PyCantonese source filenames and SHA-256
hashes before extraction. A mismatch stops the query. Candidate IDs use the
disjoint `AB30-HKCANCOR-V-ZO-M-R1` namespace and do not alter any R1 or R2
candidate from the completed following-`r` track.

## Complete review accounting

| Classification | Candidates | Source files | Interpretation |
|---|---:|---:|---|
| `genuine` | 52 | 25 | Quantified or measure-onset overt objects in the bounded query. |
| `false_positive` | 52 | 31 | The m-tagged sequence does not begin the narrow AB30 object. |
| `ambiguous` | 2 | 2 | Context does not securely resolve measure attachment or predicate valency. |
| `unusable` | 0 | 0 | No candidate lacked recoverable source context. |
| **Total** | **106** | **44 overall** | Every extracted token is accounted for. |

Genuine rows include classifier NPs (`養咗兩隻狗`, `寄咗幾封信`),
headless amounts (`借咗八萬`, `落咗少少`), quantified utterance and document
objects (`講咗三句粗口`, `附帶咗一張…操作程序`), and headless relatives
(`做咗一啲我哋而家唔可以解釋嘅`).

The false positives show why the tag is only a retrieval boundary:

- durations follow predicates in rows such as `聽咗兩個鐘`, `去咗十零日`,
  and `住咗十幾廿年`;
- frequency measures occur in `包紮咗幾次`, `嘔咗兩次`, and
  `講咗四次`;
- degree, differential, and threshold complements occur in `變咗好多`,
  `加咗三倍`, `減咗六成`, and `過咗二十一`;
- postverbal subjects follow nontransitive `死咗`, `唔見咗`, and `出咗`;
- predicative or non-target profiles include `成為咗六壯士`, `有咗一種能力`,
  and `冇咗一個安全感`.

The ambiguous rows are `睇咗幾次跌打`, where measure attachment does not
securely distinguish event frequency from a quantified treatment NP, and repaired
`成立咗一樣噉樣嘅嘢`, where the transcript does not settle transitive
establishment versus a nontransitive establishment profile.

## Artifacts

- shared extractor:
  `external-evidence/ab30-hkcancor/query-hkcancor-ab30-zo-r.py`;
- deterministic inventory:
  `external-evidence/ab30-hkcancor/hkcancor-ab30-zo-m-candidate-inventory.json`;
- review TSV:
  `external-evidence/ab30-hkcancor/hkcancor-ab30-zo-m-candidate-inventory.tsv`;
- query summary:
  `external-evidence/ab30-hkcancor/hkcancor-ab30-zo-m-query-summary.json`;
- complete decision ledger:
  `review-packets/corpus-review/AB30/hkcancor-zo-m-decisions-r1.json`.

Reproduce and validate from the repository root:

```bash
source .venv-hkcancor/bin/activate
python external-evidence/ab30-hkcancor/query-hkcancor-ab30-zo-r.py \
  --following-pos m \
  --output-dir external-evidence/ab30-hkcancor \
  --source-manifest \
    external-evidence/cp021b/hkcancor-cp021b-source-manifest.sha256 \
  --decisions \
    review-packets/corpus-review/AB30/hkcancor-zo-m-decisions-r1.json \
  --check
```

## Disposition

The bounded track endpoint is reached. The exact 52/52 genuine/false-positive
split directly demonstrates that a following measure tag cannot substitute for
NP-boundary and predicate-role analysis. The result does not change the
`research_pending` status, accepted five-candidate readiness packet,
`corpus_readiness_effect: partial_only`, runtime matcher, identity, panel state,
held-out state, or promotion eligibility.

Any future HKCanCor cross-reference requires a separately defined disjoint query.
