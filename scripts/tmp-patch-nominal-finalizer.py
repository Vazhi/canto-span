#!/usr/bin/env python3
from pathlib import Path

path = Path("scripts/tmp-finalize-nominal-review.py")
text = path.read_text(encoding="utf-8")
text = text.replace(
    'writer = csv.DictWriter(handle, fieldnames=SOURCE_FIELDS, delimiter="\\t")',
    'writer = csv.DictWriter(handle, fieldnames=SOURCE_FIELDS, delimiter="\\t", lineterminator="\\n")',
)
start = text.index('verifier = f"""')
end = text.index('verify_path = PACKET / "verify-nominal-modification-review-r1.py"', start)
replacement = r'''verifier = """#!/usr/bin/env python3
from __future__ import annotations
import csv
import hashlib
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
PACKET = ROOT / "review-packets/corpus-review/NOMINAL-MODIFICATION"
EXPECTED_RAW = {
    "issue-315/AA07-compact-review.tsv": ("__AA07_HASH__", 960),
    "issue-315/AA91-compact-review.tsv": ("__AA91_HASH__", 78),
}
EXPECTED_REVIEW = {
    "AA07-selected-review-r1.tsv": (64, {"genuine": 28, "false_positive": 24, "ambiguous": 6, "unusable": 6}),
    "AA91-full-review-r1.tsv": (78, {"false_positive": 71, "genuine": 5, "ambiguous": 2}),
}
EXPECTED_AA07_IDS = __AA07_IDS__
EXPECTED_STRATA = __STRATA__
SOURCE_FIELDS = __SOURCE_FIELDS__
REVIEW_FIELDS = __REVIEW_FIELDS__
ALLOWED = {"genuine", "false_positive", "ambiguous", "unusable"}

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def read_rows(path):
    with path.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle, delimiter="\\t")
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
"""
verifier = (
    verifier
    .replace("__AA07_HASH__", RAW_EXPECTED["AA07"]["sha256"])
    .replace("__AA91_HASH__", RAW_EXPECTED["AA91"]["sha256"])
    .replace("__AA07_IDS__", repr(selected_ids))
    .replace("__STRATA__", repr(dict(strata_counts)))
    .replace("__SOURCE_FIELDS__", repr(SOURCE_FIELDS))
    .replace("__REVIEW_FIELDS__", repr(REVIEW_FIELDS))
)
'''
text = text[:start] + replacement + text[end:]
path.write_text(text, encoding="utf-8")
Path(__file__).unlink()
