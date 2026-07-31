---
title: Glossika Yue-HK A1 dialog 001 corpus ingress
status: ingress_complete_review_pending
source_id: GLOSSIKA-YUEHK-A1-DLG-001-20251130
intake_issue: 137
work_claim: 289
reviewed_on: 2026-07-31
---

# Glossika Yue-HK A1 dialog 001 — 學跳舞

## Outcome

The complete authorized 36-turn dialog has been ingested as an immutable, source-preserving pedagogical corpus packet. Speaker labels, turn order, exact Cantonese punctuation, full source Jyutping strings, scenario metadata, source review metadata, and turn adjacency are retained.

No turn-level English translations were present. The package records them as absent and does not generate replacements.

## Coverage

- Turns: 36 / 36
- Speakers: 美美, 阿文
- Ordered IDs: `GLOSSIKA-YUEHK-A1-DLG-001-20251130-I001` through `GLOSSIKA-YUEHK-A1-DLG-001-20251130-I036`
- Source payload hash: `sha256:5956a3641423f3b022422bf9207878f5459e7e45579c79506ae55d9860bf4ac5`
- Deduplication classifications: `{"exact_duplicate": 1, "new_attestation": 35}`

## Files

- `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-DLG-001-20251130/source.json`
- `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-DLG-001-20251130/items.tsv`
- `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-DLG-001-20251130/review.json`
- `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-DLG-001-20251130/crosswalk.json`
- `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-DLG-001-20251130/README.md`

## Method

Exact deduplication searches for the complete source Cantonese string in repository text files. Normalized deduplication uses Unicode NFKC normalization and removes whitespace and punctuation. Match paths are recorded as metadata only; they neither replace source values nor prove construction identity.

## Evidence and review boundary

The provider dialog is pedagogical attestation, not independent grammar evidence. `review.json` leaves all 36 records in `REQUIRES_EXPERT_CONTEXT_REVIEW`, authorizes no evidence use, and preserves source values separately from derived normalization. Runtime resources, parser behavior, fixtures, versions, construction identity/status, corpus candidate adjudications, surveys, native-panel decisions, release state, and deployment state are unchanged.
