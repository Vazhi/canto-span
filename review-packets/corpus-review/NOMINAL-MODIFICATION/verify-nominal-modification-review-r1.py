#!/usr/bin/env python3
from __future__ import annotations
import csv
import hashlib
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
PACKET = ROOT / "review-packets/corpus-review/NOMINAL-MODIFICATION"
EXPECTED_RAW = {
    "issue-315/AA07-compact-review.tsv": ("9452e2079bc9fb9aa593c077bbb40e1cb0c566f5cfc00a81e3aec547e3921023", 960),
    "issue-315/AA91-compact-review.tsv": ("4d5d12b616f80c724ed80b65c2f4113088b460590c2c3f6564809389805ddef8", 78),
}
EXPECTED_REVIEW = {
    "AA07-selected-review-r1.tsv": (64, {"genuine": 28, "false_positive": 24, "ambiguous": 6, "unusable": 6}),
    "AA91-full-review-r1.tsv": (78, {"false_positive": 71, "genuine": 5, "ambiguous": 2}),
}
EXPECTED_AA07_IDS = ['aa07-30bef8a7af70d00af678', 'aa07-cbace68516aef05b5f40', 'aa07-53ab98f9adf37f886b7f', 'aa07-c506764bad53595eefca', 'aa07-76d9851d1b39749a3a56', 'aa07-f8633d810b0c883c91d2', 'aa07-e6e58948d4304b30f6f4', 'aa07-9929c0d999a9878e437c', 'aa07-288362eb43de1e39d533', 'aa07-cf013aff75dee4acbdee', 'aa07-445fbfec5f676da54021', 'aa07-87ebff660e84b935410e', 'aa07-fafb34ce1681750f8ff5', 'aa07-2afec4dec55c3e1d6a9e', 'aa07-6fa172e2cb3a8a6d7f33', 'aa07-efa3ae87651e01714e35', 'aa07-856c6cf745df1dc0d79b', 'aa07-5667e162e8815db3f5a4', 'aa07-4dbd908cab466d5f03f5', 'aa07-cfac25ada77b85d38e2c', 'aa07-6e7f799b4409b1bf02e4', 'aa07-cd71c9777549ef78f582', 'aa07-06d203b0010516bcfeb2', 'aa07-e1713e047f35b7346ef2', 'aa07-16a4b35f6933328d0aa0', 'aa07-27d5a00de9325360645f', 'aa07-3fc92ea87c09daf89fa7', 'aa07-08909147c71f7e6cc25b', 'aa07-c426a8496903a07e5195', 'aa07-508a0c15d66cc7d1e698', 'aa07-12a62ca83e28351b705c', 'aa07-6185fd3f815c8cddd44e', 'aa07-4e97b983133d0a3909de', 'aa07-80e082acd05706afdf2d', 'aa07-dc7386621ecc2c3d09aa', 'aa07-51c16c474b6ba727c146', 'aa07-cdae5759ac730c184607', 'aa07-eabc35e6475a6517c889', 'aa07-f9521f792b2b00296e0d', 'aa07-967b1685d824f9636688', 'aa07-e52512c188a8d257317c', 'aa07-311f31f81b831b87f2f2', 'aa07-0625e8dbd6bc4b0c44b0', 'aa07-e93e0a3dbeeadc1531ad', 'aa07-543491a14bcca16f1ad8', 'aa07-aa579977ef0c046fcff6', 'aa07-eca292629e8e20aef3f9', 'aa07-f255130ab6f66cb89099', 'aa07-c553bfda0524e2411c13', 'aa07-fcea4c8df1e52c6631dc', 'aa07-8eb9544a50a2c91a9d73', 'aa07-eb26b1e66a48241e315d', 'aa07-74e99cb73853bdda2e79', 'aa07-11ff6bae8d95db622a13', 'aa07-1f0e69ffdaeebdf25fbd', 'aa07-1280bd35f97b540ba5b0', 'aa07-2c026d40e972162d7615', 'aa07-89e83495f60ab6830f4c', 'aa07-bf9213b421b39b1787f0', 'aa07-b8d6c7158eefb02c10e1', 'aa07-6df05af0aedb2aec3434', 'aa07-76fb7ee0cbc8aaa52933', 'aa07-d28cbec28df82a64a8b7', 'aa07-a9bb70dbc7d22185abe3']
EXPECTED_STRATA = {'pronoun_or_nominal_possessor': 8, 'common_or_proper_nominal_modifier': 8, 'adjective_or_property_modifier': 8, 'verbal_or_clausal_material': 8, 'relative_clause_candidate': 8, 'head_or_attachment_ambiguity': 8, 'repair_annotation_or_missing_context': 8, 'lexicalized_or_localizer_boundary': 8}
SOURCE_FIELDS = ['construction', 'candidate_id', 'source_file', 'turn_index_zero_based', 'participant', 'matched_surface_span', 'matched_pos', 'text', 'previous_text', 'next_text']
REVIEW_FIELDS = ['construction', 'candidate_id', 'source_file', 'turn_index_zero_based', 'participant', 'matched_surface_span', 'matched_pos', 'text', 'previous_text', 'next_text', 'selection_stratum', 'classification', 'decision_reason', 'reviewer', 'review_date']
ALLOWED = {"genuine", "false_positive", "ambiguous", "unusable"}

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def read_rows(path):
    with path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle, delimiter="\t")
        return reader.fieldnames or [], list(reader)

for rel, (expected_hash, expected_rows) in EXPECTED_RAW.items():
    path = PACKET / rel
    fields, rows = read_rows(path)
    assert fields == SOURCE_FIELDS, (rel, fields)
    assert len(rows) == expected_rows, (rel, len(rows))
    assert digest(path) == expected_hash, (rel, digest(path))
    ids = [row["candidate_id"] for row in rows]
    assert all(ids) and len(ids) == len(set(ids)), rel

for rel, (expected_rows, expected_counts) in EXPECTED_REVIEW.items():
    fields, rows = read_rows(PACKET / rel)
    assert fields == REVIEW_FIELDS, (rel, fields)
    assert len(rows) == expected_rows, (rel, len(rows))
    assert all(row["classification"] in ALLOWED for row in rows), rel
    assert all(row["decision_reason"] for row in rows), rel
    assert dict(Counter(row["classification"] for row in rows)) == expected_counts

_, selected = read_rows(PACKET / "AA07-selected-review-r1.tsv")
assert [row["candidate_id"] for row in selected] == EXPECTED_AA07_IDS
assert dict(Counter(row["selection_stratum"] for row in selected)) == EXPECTED_STRATA
_, raw_aa07 = read_rows(PACKET / "issue-315/AA07-compact-review.tsv")
assert len({row["candidate_id"] for row in raw_aa07} - set(EXPECTED_AA07_IDS)) == 896
_, raw_aa91 = read_rows(PACKET / "issue-315/AA91-compact-review.tsv")
_, reviewed_aa91 = read_rows(PACKET / "AA91-full-review-r1.tsv")
assert [row["candidate_id"] for row in raw_aa91] == [row["candidate_id"] for row in reviewed_aa91]

print("nominal-modification review verification: PASS")
print("AA07 selected:", len(selected), dict(Counter(row["classification"] for row in selected)))
print("AA07 unreviewed remainder:", 896)
print("AA91 reviewed:", len(reviewed_aa91), dict(Counter(row["classification"] for row in reviewed_aa91)))
