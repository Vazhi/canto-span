#!/usr/bin/env python3
"""One-run Week 17 expert reconciliation finalizer. Removed by its workflow."""

from __future__ import annotations

import csv
import hashlib
import json
import re
import subprocess
import textwrap
from collections import Counter
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
PACKAGE_REL = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W17-20260712")
PACKAGE = ROOT / PACKAGE_REL
SOURCE_ID = "GLOSSIKA-YUEHK-A1-W17-20260712"
ORIGIN_PR = 277
ORIGIN_MERGE = "18e285c92b639f56e6b0eb08543e42ce7c66151e"
KWUT_ID = f"{SOURCE_ID}-I074"
SOURCE_JSON_PATH = str(PACKAGE_REL / "source.json")
REQUIRED_NOT_CLAIMS = sorted({
    "not_grammar_proof",
    "not_productivity_evidence",
    "not_dialect_wide_naturalness",
    "not_parser_acceptance",
    "not_linguistic_status_change",
})
ALLOWED_TERMINAL = sorted({
    "exact_duplicate",
    "normalized_duplicate",
    "new_corpus_attestation",
    "lexical_only_attestation",
    "pronunciation_discrepancy",
    "translation_discrepancy",
    "naturalness_review_candidate",
    "unusable",
})


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)


def load_json(path: Path) -> dict[str, Any]:
    value = json.loads(path.read_text(encoding="utf-8"))
    require(isinstance(value, dict), f"expected JSON object: {path}")
    return value


def write_json(path: Path, value: Any) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def read_tsv(path: Path) -> tuple[list[str], list[dict[str, str]]]:
    with path.open(encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle, delimiter="\t")
        return list(reader.fieldnames or []), list(reader)


def sha256_hex(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def git_blob_sha(data: bytes) -> str:
    return hashlib.sha1(b"blob " + str(len(data)).encode("ascii") + b"\0" + data).hexdigest()


def immutable_file(path: Path, display: str) -> dict[str, Any]:
    data = path.read_bytes()
    return {
        "path": display,
        "bytes": len(data),
        "sha256": sha256_hex(data),
        "git_blob_sha": git_blob_sha(data),
    }


def legacy_file_snapshot(path: str) -> dict[str, Any]:
    file_path = ROOT / path
    fields, rows = read_tsv(file_path)
    data = file_path.read_bytes()
    return {
        "path": path,
        "bytes": len(data),
        "sha256": sha256_hex(data),
        "git_blob_sha": git_blob_sha(data),
        "row_count": len(rows),
        "fields": fields,
    }


def source_display(item: dict[str, Any]) -> str:
    values = item.get("source") or {}
    if values.get("traditional"):
        return str(values["traditional"])
    left = values.get("wordA", values.get("traditionalA", "—"))
    right = values.get("wordB", values.get("traditionalB", "—"))
    return f"{left}|{right}"


def discrepancy_projection(raw: dict[str, Any], item_id: str) -> dict[str, str]:
    kind = raw.get("type")
    if kind == "translation_discrepancy":
        source_value = raw.get("sourceValue")
        project_value = raw.get("projectValue")
        if source_value is not None or project_value is not None:
            issue = f"Source English {source_value!r} and inherited project English {project_value!r} differ."
        else:
            issue = "Source and inherited project English wording differ; the project wording is not independently adjudicated."
        return {
            "field": "english",
            "issue": issue,
            "status": "unresolved_project_translation_difference",
        }
    if kind == "pronunciation_discrepancy":
        require(item_id == KWUT_ID, f"unexpected pronunciation correction: {item_id}")
        return {
            "field": "jyutping",
            "issue": "The source supplies hyut3|kut3; two independent lexical references list 闊 as fut3, supporting the reviewed pair hyut3|fut3.",
            "status": "independently_verified_pronunciation_correction",
        }
    if kind == "project_review_note":
        note = raw.get("note") or "Inherited project review note lacks explanatory text."
        if item_id == KWUT_ID:
            status = "superseded_by_independent_pronunciation_evidence"
        elif raw.get("status") == "REVIEW":
            status = "inherited_project_review_flag_unverified"
        else:
            status = "inherited_project_assertion_unverified"
        return {
            "field": "legacy_project_assertion",
            "issue": str(note),
            "status": status,
        }
    raise SystemExit(f"unsupported legacy discrepancy type: {kind!r}: {item_id}")


source = load_json(PACKAGE / "source.json")
crosswalk = load_json(PACKAGE / "crosswalk.json")
old_review = load_json(PACKAGE / "review.json")
source_items = source.get("items")
require(isinstance(source_items, list) and len(source_items) == 75, "Week 17 source must contain 75 rows")
source_ids = [row["id"] for row in source_items]
require(len(source_ids) == len(set(source_ids)), "Week 17 source IDs are not unique")
source_by_id = {row["id"]: row for row in source_items}
payload_hash = (source.get("ingress") or {}).get("sourcePayloadHash")
require(payload_hash == "sha256:1ece0875ae59d215fbc1f09ad8b5b648ad80e448fadaf89d72f019208be28ea7", "Week 17 payload changed")
require(crosswalk.get("sourceId") == SOURCE_ID and crosswalk.get("sourcePayloadHash") == payload_hash, "legacy crosswalk identity mismatch")
legacy_records_raw = crosswalk.get("records")
require(isinstance(legacy_records_raw, list) and len(legacy_records_raw) == 75, "legacy crosswalk must contain 75 source records")
require([row["sourceItemId"] for row in legacy_records_raw] == source_ids, "legacy crosswalk IDs/order changed")
legacy_raw_by_id = {row["sourceItemId"]: row for row in legacy_records_raw}

project_only_raw = crosswalk.get("projectOnlyRecords") or crosswalk.get("projectOnlyItems") or []
require(isinstance(project_only_raw, list) and len(project_only_raw) == 5, "legacy crosswalk must contain five project-only rows")

# Preserve all project-owned TSVs as immutable historical inputs to this review.
legacy_paths = crosswalk.get("existingWeek17Inputs")
require(isinstance(legacy_paths, dict) and len(legacy_paths) == 8, "Week 17 legacy input registry changed")
legacy_files = [legacy_file_snapshot(path) for path in legacy_paths.values()]
legacy_table_rows: dict[str, list[dict[str, str]]] = {}
legacy_table_ids: dict[str, set[str]] = {}
legacy_pass_cells = 0
legacy_promoted_cells = 0
for path in legacy_paths.values():
    _, rows = read_tsv(ROOT / path)
    legacy_table_rows[path] = rows
    legacy_table_ids[path] = {row["id"] for row in rows if row.get("id")}
    for row in rows:
        legacy_pass_cells += sum(value == "PASS" for value in row.values())
        legacy_promoted_cells += sum(value == "PROMOTED_ACCEPTED" for value in row.values())
require(legacy_pass_cells == 158, f"unexpected inherited PASS-cell count: {legacy_pass_cells}")
require(legacy_promoted_cells == 131, f"unexpected inherited PROMOTED_ACCEPTED-cell count: {legacy_promoted_cells}")

# Independent evidence is deliberately narrow and pronunciation-only.
evidence_sources = {
    "schema": "canto-span-pedagogical-corpus-independent-evidence-v1",
    "source_id": SOURCE_ID,
    "review_date": "2026-08-03",
    "claims": [
        {
            "id": "W17-PRON-CUHK-FUT3",
            "source_type": "cantonese_pronunciation_database",
            "publisher": "Chinese University of Hong Kong, Research Centre for Humanities Computing",
            "title": "粵語審音配詞字庫",
            "url": "https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/pho-rel.php?s2=ut",
            "accessed_on": "2026-08-03",
            "evidence_grade": "LEXICAL_OR_PRONUNCIATION_ONLY",
            "supported_claim": "闊 is listed with Cantonese reading fut3.",
            "does_not_support": ["phonics_heading_scope", "construction_naturalness", "parser_behavior"],
        },
        {
            "id": "W17-PRON-CTEXT-FUT3",
            "source_type": "character_dictionary",
            "publisher": "Chinese Text Project",
            "title": "闊 dictionary entry",
            "url": "https://ctext.org/dictionary.pl?char=%E9%97%8A&if=en",
            "accessed_on": "2026-08-03",
            "evidence_grade": "LEXICAL_OR_PRONUNCIATION_ONLY",
            "supported_claim": "The dictionary entry gives Cantonese fut3 for 闊.",
            "does_not_support": ["phonics_heading_scope", "construction_naturalness", "parser_behavior"],
        },
    ],
    "decision": {
        "source_item_id": KWUT_ID,
        "source_value": "hyut3|kut3",
        "reviewed_value": "hyut3|fut3",
        "corrected_component": "闊",
        "corrected_reading": "fut3",
        "supporting_claim_ids": ["W17-PRON-CUHK-FUT3", "W17-PRON-CTEXT-FUT3"],
        "scope": "pronunciation_only",
        "source_mutated": False,
    },
}
write_json(PACKAGE / "evidence-sources-r1.json", evidence_sources)

# Durable historical reconciliation packet. Nothing in this packet is promoted
# merely because an old project table said PASS or PROMOTED_ACCEPTED.
legacy_records: list[dict[str, Any]] = []
for raw in legacy_records_raw:
    item_id = raw["sourceItemId"]
    source_item = source_by_id[item_id]
    require(raw.get("sourceHash") == source_item.get("sourceHash"), f"legacy source hash drift: {item_id}")
    for ref in raw.get("existingProjectRecords", []):
        require(ref.get("path") in legacy_table_ids, f"unregistered legacy path: {item_id}: {ref}")
        require(ref.get("id") in legacy_table_ids[ref["path"]], f"missing legacy row: {item_id}: {ref}")
    repeat_of = raw.get("sourceRepeatOf")
    if repeat_of:
        require(repeat_of in source_by_id, f"missing repeated-source target: {item_id}")
    legacy_records.append({
        "id": item_id,
        "source_hash": raw["sourceHash"],
        "legacy_classification": raw.get("classification"),
        "source_repeat_of": repeat_of,
        "source_repeat_target_path": SOURCE_JSON_PATH if repeat_of else None,
        "existing_project_records": raw.get("existingProjectRecords", []),
        "canonical_lexicon_owners": raw.get("canonicalLexiconOwners", []),
        "parser_owner_candidates": raw.get("canonicalParserOwnerCandidates", []),
        "reviewed_utterance_type": raw.get("reviewedUtteranceType"),
        "inherited_discrepancies": raw.get("discrepancies", []),
        "inherited_authority_status": "unverified_project_history",
        "independent_evidence_ids": ["W17-PRON-CUHK-FUT3", "W17-PRON-CTEXT-FUT3"] if item_id == KWUT_ID else [],
    })

crosswalk_bytes = (PACKAGE / "crosswalk.json").read_bytes()
legacy_packet = {
    "schema": "canto-span-pedagogical-corpus-legacy-reconciliation-v1",
    "source_id": SOURCE_ID,
    "source_payload_hash": payload_hash,
    "origin_pull_request": ORIGIN_PR,
    "origin_merge_commit": ORIGIN_MERGE,
    "original_crosswalk": {
        "path": "crosswalk.json",
        "bytes": len(crosswalk_bytes),
        "sha256": sha256_hex(crosswalk_bytes),
        "git_blob_sha": git_blob_sha(crosswalk_bytes),
    },
    "policy": {
        "legacy_status_authority": "PASS, REVIEW, and PROMOTED_ACCEPTED are preserved project history, not independent evidence.",
        "parser_owner_boundary": "canonicalParserOwnerCandidates remain heuristic path candidates and are not accepted parser ownership.",
        "independent_evidence_boundary": "Only the item-level 闊 fut3 pronunciation correction has independent evidence in this package.",
    },
    "legacy_files": legacy_files,
    "record_count": len(legacy_records),
    "project_only_record_count": len(project_only_raw),
    "summary": {
        "legacy_classification_counts": dict(sorted(Counter(row["legacy_classification"] for row in legacy_records).items())),
        "legacy_pass_cells": legacy_pass_cells,
        "legacy_promoted_accepted_cells": legacy_promoted_cells,
        "records_with_inherited_discrepancies": sum(bool(row["inherited_discrepancies"]) for row in legacy_records),
        "independently_verified_records": 1,
    },
    "records": legacy_records,
}
write_json(PACKAGE / "legacy-reconciliation-r1.json", legacy_packet)

project_only_review = {
    "schema": "canto-span-pedagogical-corpus-project-only-review-v1",
    "source_id": SOURCE_ID,
    "source_payload_hash": payload_hash,
    "record_count": len(project_only_raw),
    "policy": "These are project-created historical probes with no original lesson row. REVIEW_ONLY is preserved as history and does not authorize evidence or runtime promotion.",
    "records": [
        {
            **row,
            "review_status": "reviewed_as_project_history",
            "authority_status": "unverified_project_probe",
            "evidence_use_disposition": "not_source_attestation",
            "runtime_or_status_authorization": "none",
        }
        for row in project_only_raw
    ],
}
write_json(PACKAGE / "project-only-review-r1.json", project_only_review)

# Extend the shared deterministic builder with an optional legacy-history link.
builder_path = ROOT / "tools/build-pedagogical-corpus-review-candidates.py"
builder = builder_path.read_text(encoding="utf-8")
if '"legacy-reconciliation-r1.json"' not in builder:
    marker = '    "runtime-crosswalk-r1.json",\n}'
    addition = (
        '    "runtime-crosswalk-r1.json",\n'
        '    "legacy-reconciliation-r1.json",\n'
        '    "project-only-review-r1.json",\n'
        '    "evidence-sources-r1.json",\n'
        '}'
    )
    require(builder.count(marker) >= 2, "builder derived-file set markers changed")
    builder = builder.replace(marker, addition, 2)

if '"kind": "legacy_project_reconciliation"' not in builder:
    marker = '    runtime_crosswalk_path = root / f"data/pedagogical-corpus/glossika/{source_id}/runtime-crosswalk-r1.json"\n'
    require(marker in builder, "builder runtime-crosswalk marker missing")
    legacy_loader = textwrap.dedent('''
        legacy_path = root / f"data/pedagogical-corpus/glossika/{source_id}/legacy-reconciliation-r1.json"
        if legacy_path.exists():
            legacy = read_json(legacy_path)
            if legacy.get("source_id") == source_id:
                for entry in legacy.get("records", []):
                    item_id = entry.get("id")
                    if item_id:
                        by_item[item_id].append({
                            "packet": "legacy-reconciliation-r1",
                            "kind": "legacy_project_reconciliation",
                            "legacy_classification": entry.get("legacy_classification"),
                            "source_repeat_of": entry.get("source_repeat_of"),
                            "source_repeat_target_path": entry.get("source_repeat_target_path"),
                            "existing_project_records": entry.get("existing_project_records", []),
                            "canonical_lexicon_owners": entry.get("canonical_lexicon_owners", []),
                            "parser_owner_candidates": entry.get("parser_owner_candidates", []),
                            "reviewed_utterance_type": entry.get("reviewed_utterance_type"),
                            "inherited_discrepancies": entry.get("inherited_discrepancies", []),
                            "inherited_authority_status": entry.get("inherited_authority_status"),
                            "independent_evidence_ids": entry.get("independent_evidence_ids", []),
                        })

    ''')
    builder = builder.replace(marker, legacy_loader + marker, 1)
builder_path.write_text(builder, encoding="utf-8")
subprocess.run(["python3", "-m", "py_compile", str(builder_path)], check=True, cwd=ROOT)

# Generate the deterministic current-repository candidate packet.
subprocess.run([
    "python3", str(builder_path),
    "--package", str(PACKAGE_REL),
    "--output", str(PACKAGE_REL / "mechanical-cross-reference-r1.json"),
    "--write",
], check=True, cwd=ROOT)
mechanical = load_json(PACKAGE / "mechanical-cross-reference-r1.json")
mechanical_by_id = {row["id"]: row for row in mechanical["records"]}
require(list(mechanical_by_id) == source_ids, "Week 17 mechanical IDs/order changed")

# Complete the 75-record expert review. Legacy project links are history, not
# automatic duplicate, linguistic, or parser decisions.
review_records: list[dict[str, Any]] = []
for item in source_items:
    item_id = item["id"]
    raw = legacy_raw_by_id[item_id]
    raw_discrepancies = raw.get("discrepancies", [])
    projected_discrepancies = [discrepancy_projection(value, item_id) for value in raw_discrepancies]
    repeat_of = raw.get("sourceRepeatOf")
    item_type = item.get("itemType")
    review_flag = any(value.get("type") == "project_review_note" and value.get("status") == "REVIEW" for value in raw_discrepancies)
    translation_flag = any(value.get("type") == "translation_discrepancy" for value in raw_discrepancies)

    if repeat_of:
        terminal = "exact_duplicate"
        duplicate = "accepted_exact_duplicate"
        targets = [{
            "path": SOURCE_JSON_PATH,
            "record_id": repeat_of,
            "match_type": "source_repeat",
            "basis": "The source itself repeats this earlier stable source record; both rows remain preserved.",
        }]
        evidence_use = "source_repeat_preserved_with_unverified_project_history"
        note = f"Preserved source repeat of {repeat_of}; legacy project deduplication is historical metadata only."
    elif item_id == KWUT_ID:
        terminal = "pronunciation_discrepancy"
        duplicate = "no_accepted_duplicate"
        targets = []
        evidence_use = "pronunciation_attestation_with_independently_verified_correction"
        note = "Source kut3 remains immutable; CUHK and Chinese Text Project independently support fut3 for 闊."
    elif item_type in {"sentence", "dialog_turn"} and review_flag:
        terminal = "naturalness_review_candidate"
        duplicate = "no_accepted_duplicate"
        targets = []
        evidence_use = "naturalness_review_candidate_with_inherited_project_flag"
        note = "The earlier REVIEW note is preserved as an unverified project flag requiring independent speaker or corpus evidence."
    elif translation_flag:
        terminal = "translation_discrepancy"
        duplicate = "no_accepted_duplicate"
        targets = []
        evidence_use = "pedagogical_attestation_with_unresolved_project_translation_difference"
        note = "The source and inherited project English wording differ; neither wording is silently preferred in the source layer."
    elif item_type == "lexical_entry":
        terminal = "lexical_only_attestation"
        duplicate = "no_accepted_duplicate"
        targets = []
        evidence_use = "lexical_attestation_with_unverified_project_history"
        note = "The lexical source attestation is retained; inherited project status and role labels remain unverified project history."
    elif item_type == "phonics_pair":
        terminal = "new_corpus_attestation"
        duplicate = "no_accepted_duplicate"
        targets = []
        evidence_use = "unverified_pedagogical_pronunciation_attestation"
        note = "The source phonics pair is preserved as pedagogical pronunciation material without independent validation."
    else:
        terminal = "new_corpus_attestation"
        duplicate = "no_accepted_duplicate"
        targets = []
        evidence_use = "pedagogical_attestation_with_unverified_project_history"
        note = "The source utterance is retained as pedagogical attestation; inherited project analyses and parser candidates are not promoted."

    legacy_link = next(
        link for link in mechanical_by_id[item_id].get("later_research_links", [])
        if link.get("kind") == "legacy_project_reconciliation"
    )
    review_records.append({
        "id": item_id,
        "source_hash": item["sourceHash"],
        "normalized_surface": mechanical_by_id[item_id]["normalized_surface"],
        "review_status": "reviewed",
        "review_authority": "project_expert_systematic_review",
        "mechanical_cross_reference_id": item_id,
        "expert_duplicate_status": duplicate,
        "accepted_duplicate_targets": targets,
        "terminal_ingress_classification": terminal,
        "source_discrepancies": projected_discrepancies,
        "reviewed_values": {},
        "later_research_links": mechanical_by_id[item_id].get("later_research_links", []),
        "implementation_crosswalk_targets": [],
        "legacy_reconciliation_status": raw.get("classification"),
        "inherited_project_authority": legacy_link.get("inherited_authority_status"),
        "independent_evidence_ids": legacy_link.get("independent_evidence_ids", []),
        "evidence_use_disposition": evidence_use,
        "review_note": note,
        "not_claims": REQUIRED_NOT_CLAIMS,
    })

terminal_counts = Counter(row["terminal_ingress_classification"] for row in review_records)
duplicate_counts = Counter(row["expert_duplicate_status"] for row in review_records)
evidence_counts = Counter(row["evidence_use_disposition"] for row in review_records)
review = {
    "schema": "canto-span-pedagogical-corpus-review-v2",
    "source_id": SOURCE_ID,
    "source_payload_hash": payload_hash,
    "record_count": len(review_records),
    "reviewed_by": "ChatGPT expert systematic review",
    "review_date": "2026-08-03",
    "allowed_terminal_classifications": ALLOWED_TERMINAL,
    "policy": {
        "source_layer": "source.json and items.tsv remain immutable.",
        "legacy_history": "Existing w17-* records and their PASS, REVIEW, or PROMOTED_ACCEPTED fields remain project history rather than independent evidence.",
        "duplicate_boundary": "Only the three repeated source rows are accepted corpus duplicates; project reconciliation matches are tracked separately.",
        "parser_boundary": "Parser-owner paths remain heuristic candidates and do not establish parser correctness or construction ownership.",
        "independent_evidence": "Only the item-level 闊 fut3 pronunciation correction is independently verified in this review.",
    },
    "summary": {
        "review_status_counts": {"reviewed": len(review_records), "unreviewed": 0},
        "terminal_classification_counts": dict(sorted(terminal_counts.items())),
        "duplicate_status_counts": dict(sorted(duplicate_counts.items())),
        "evidence_use_counts": dict(sorted(evidence_counts.items())),
        "records_with_source_discrepancies": sum(bool(row["source_discrepancies"]) for row in review_records),
        "records_with_reviewed_replacements": 0,
        "records_with_runtime_crosswalk": 0,
        "records_with_legacy_reconciliation": len(review_records),
        "project_only_historical_records": len(project_only_raw),
        "independently_verified_records": 1,
    },
    "records": review_records,
}
write_json(PACKAGE / "review.json", review)

# Expert TSV is a projection of terminal review state, not a replacement source.
tsv_fields = [
    "id", "item_type", "duplicate_status", "terminal_classification", "evidence_use",
    "discrepancy_status", "accepted_duplicate_targets", "legacy_reconciliation_status",
    "inherited_project_authority", "independent_evidence_ids", "review_note",
]
with (PACKAGE / "expert-review-r1.tsv").open("w", encoding="utf-8", newline="") as handle:
    writer = csv.DictWriter(handle, fieldnames=tsv_fields, delimiter="\t", lineterminator="\n")
    writer.writeheader()
    for item, row in zip(source_items, review_records):
        writer.writerow({
            "id": row["id"],
            "item_type": item["itemType"],
            "duplicate_status": row["expert_duplicate_status"],
            "terminal_classification": row["terminal_ingress_classification"],
            "evidence_use": row["evidence_use_disposition"],
            "discrepancy_status": ";".join(value["status"] for value in row["source_discrepancies"]),
            "accepted_duplicate_targets": ";".join(value["path"] for value in row["accepted_duplicate_targets"]),
            "legacy_reconciliation_status": row["legacy_reconciliation_status"],
            "inherited_project_authority": row["inherited_project_authority"],
            "independent_evidence_ids": ";".join(row["independent_evidence_ids"]),
            "review_note": row["review_note"],
        })

# Immutable source lock, local and external.
immutable = [
    immutable_file(PACKAGE / "source.json", "source.json"),
    immutable_file(PACKAGE / "items.tsv", "items.tsv"),
]
integrity = {
    "schema": "canto-span-pedagogical-corpus-package-integrity-v1",
    "source_id": SOURCE_ID,
    "source_payload_hash": payload_hash,
    "immutable_files": immutable,
    "policy": "source.json and items.tsv are immutable accepted source projections; changes require a new reviewed source revision",
}
write_json(PACKAGE / "package-integrity-r1.json", integrity)
locks_path = ROOT / "config/pedagogical-corpus-source-locks.json"
locks = load_json(locks_path)
lock_record = {
    "package": str(PACKAGE_REL),
    "source_id": SOURCE_ID,
    "source_payload_hash": payload_hash,
    "immutable_files": immutable,
    "accepted_on": "2026-08-03",
    "origin_issue": 134,
    "origin_pull_request": 478,
    "policy": "source-preserving archive; changes require a new reviewed source revision rather than in-place mutation",
}
locks["records"] = sorted(
    [row for row in locks["records"] if row.get("package") != str(PACKAGE_REL)] + [lock_record],
    key=lambda row: row["package"],
)
write_json(locks_path, locks)

# Package documentation.
labels = {
    "exact_duplicate": "Exact duplicate",
    "lexical_only_attestation": "Lexical-only attestation",
    "new_corpus_attestation": "New corpus/pronunciation attestation",
    "pronunciation_discrepancy": "Pronunciation discrepancy",
    "translation_discrepancy": "Translation or lexical-gloss discrepancy",
    "naturalness_review_candidate": "Naturalness-review candidate",
}
count_rows = "\n".join(
    f"| {labels[key]} | {count} |"
    for key, count in sorted(terminal_counts.items())
)
exact_rows = "\n".join(
    f"- {row['id'].rsplit('-', 1)[-1]} {source_display(source_by_id[row['id']])} → {row['accepted_duplicate_targets'][0]['record_id']}"
    for row in review_records if row["terminal_ingress_classification"] == "exact_duplicate"
)
readme = f"""# Glossika Cantonese (HK) A1 Week 17 reviewed corpus package

- Source ID: `{SOURCE_ID}`
- Source rows: 75
- Review status: 75 reviewed, 0 unreviewed records
- Immutable source files: `source.json`, `items.tsv`
- Original project reconciliation: `crosswalk.json`
- Durable history packet: `legacy-reconciliation-r1.json`
- Independent pronunciation sources: `evidence-sources-r1.json`
- Project-only historical probes: `project-only-review-r1.json`
- Permanent verification: `npm run verify:pedagogical-corpus-review`

The original `w17-*` records are preserved as project history. Their `PASS`, `REVIEW`, and `PROMOTED_ACCEPTED` cells do not become independent linguistic evidence. Only the `闊 fut3` correction has independent item-level pronunciation support in this review.
"""
(PACKAGE / "README.md").write_text(readme, encoding="utf-8")
summary_text = f"""# Week 17 expert reconciliation summary

Source: `{SOURCE_ID}`

## Terminal classifications

| Classification | Count |
|---|---:|
{count_rows}

## Accepted source repeats

{exact_rows}

## Authority result

- 75 legacy source-to-project links reviewed;
- 158 inherited `PASS` cells preserved as project history;
- 131 inherited `PROMOTED_ACCEPTED` cells preserved as project history;
- five project-only naturalized alternatives retained as unverified historical probes;
- one independently verified item-level pronunciation correction: `闊 fut3`;
- parser-owner candidate paths remain heuristic;
- zero source replacements and zero runtime or status authorizations.
"""
(PACKAGE / "research-summary.md").write_text(summary_text, encoding="utf-8")

# Extend the shared verifier with an optional legacy-reconciliation contract.
verifier_path = ROOT / "tools/verify-pedagogical-corpus-review.py"
verifier = verifier_path.read_text(encoding="utf-8")
require("def verify_legacy_reconciliation(" not in verifier, "legacy verifier already present unexpectedly")
legacy_verifier = textwrap.dedent('''
def verify_legacy_reconciliation(
    root: Path,
    package: Path,
    source_id: str,
    payload_hash: str,
    source_items: list[dict[str, Any]],
    review: dict[str, Any],
) -> set[str]:
    path = package / "legacy-reconciliation-r1.json"
    if not path.exists():
        return set()
    for required in ["crosswalk.json", "project-only-review-r1.json", "evidence-sources-r1.json"]:
        if not (package / required).is_file():
            fail(f"legacy reconciliation companion missing: {required}")
    packet = load_json(path)
    if packet.get("schema") != "canto-span-pedagogical-corpus-legacy-reconciliation-v1":
        fail("unexpected legacy reconciliation schema")
    if packet.get("source_id") != source_id or packet.get("source_payload_hash") != payload_hash:
        fail("legacy reconciliation source identity mismatch")
    if packet.get("origin_pull_request") != 277 or packet.get("origin_merge_commit") != "18e285c92b639f56e6b0eb08543e42ce7c66151e":
        fail("legacy reconciliation origin identity mismatch")

    crosswalk_data = read_bytes(package / "crosswalk.json")
    crosswalk = load_json(package / "crosswalk.json")
    crosswalk_lock = packet.get("original_crosswalk") or {}
    expected_crosswalk = {
        "path": "crosswalk.json",
        "bytes": len(crosswalk_data),
        "sha256": sha256_hex(crosswalk_data),
        "git_blob_sha": git_blob_sha(crosswalk_data),
    }
    if crosswalk_lock != expected_crosswalk:
        fail("legacy crosswalk lock drift")
    if crosswalk.get("sourceId") != source_id or crosswalk.get("sourcePayloadHash") != payload_hash:
        fail("original legacy crosswalk identity mismatch")

    legacy_files = packet.get("legacy_files")
    if not isinstance(legacy_files, list) or len(legacy_files) != 8:
        fail("legacy file snapshot must contain eight files")
    registered_paths = set((crosswalk.get("existingWeek17Inputs") or {}).values())
    snapshot_paths = {row.get("path") for row in legacy_files if isinstance(row, dict)}
    if snapshot_paths != registered_paths:
        fail("legacy file snapshot path set mismatch")
    table_ids: dict[str, set[str]] = {}
    pass_cells = 0
    promoted_cells = 0
    for row in legacy_files:
        path_value = row["path"]
        data = read_bytes(root / path_value)
        fields, rows = load_tsv(root / path_value)
        expected = {
            "path": path_value,
            "bytes": len(data),
            "sha256": sha256_hex(data),
            "git_blob_sha": git_blob_sha(data),
            "row_count": len(rows),
            "fields": fields,
        }
        if row != expected:
            fail(f"legacy project file drift: {path_value}")
        table_ids[path_value] = {value["id"] for value in rows if value.get("id")}
        for value in rows:
            pass_cells += sum(cell == "PASS" for cell in value.values())
            promoted_cells += sum(cell == "PROMOTED_ACCEPTED" for cell in value.values())
    if pass_cells != 158 or promoted_cells != 131:
        fail("legacy status-cell baseline drift")

    records = packet.get("records")
    if not isinstance(records, list):
        fail("legacy reconciliation records must be an array")
    ids = stable_ids(records, "legacy reconciliation records")
    source_ids = [row["id"] for row in source_items]
    if ids != source_ids or packet.get("record_count") != len(source_ids):
        fail("legacy reconciliation IDs/order/count mismatch")
    crosswalk_rows = crosswalk.get("records")
    if not isinstance(crosswalk_rows, list):
        fail("original legacy crosswalk records missing")
    original_by_id = {row["sourceItemId"]: row for row in crosswalk_rows}
    source_by_id = {row["id"]: row for row in source_items}
    for row in records:
        item_id = row["id"]
        original = original_by_id.get(item_id)
        if original is None:
            fail(f"legacy reconciliation record lacks original crosswalk row: {item_id}")
        if row.get("source_hash") != source_by_id[item_id].get("sourceHash"):
            fail(f"legacy reconciliation source hash drift: {item_id}")
        comparisons = {
            "legacy_classification": original.get("classification"),
            "source_repeat_of": original.get("sourceRepeatOf"),
            "existing_project_records": original.get("existingProjectRecords", []),
            "canonical_lexicon_owners": original.get("canonicalLexiconOwners", []),
            "parser_owner_candidates": original.get("canonicalParserOwnerCandidates", []),
            "reviewed_utterance_type": original.get("reviewedUtteranceType"),
            "inherited_discrepancies": original.get("discrepancies", []),
        }
        for field, expected in comparisons.items():
            if row.get(field) != expected:
                fail(f"legacy reconciliation projection drift: {item_id}: {field}")
        repeat_of = row.get("source_repeat_of")
        expected_target = str(Path("data/pedagogical-corpus/glossika") / source_id / "source.json") if repeat_of else None
        if row.get("source_repeat_target_path") != expected_target:
            fail(f"legacy source-repeat target drift: {item_id}")
        for ref in row.get("existing_project_records", []):
            if ref.get("path") not in table_ids or ref.get("id") not in table_ids[ref["path"]]:
                fail(f"legacy project record reference is unresolved: {item_id}: {ref}")
        if row.get("inherited_authority_status") != "unverified_project_history":
            fail(f"legacy project assertion was elevated without evidence: {item_id}")
        evidence_ids = row.get("independent_evidence_ids")
        expected_ids = ["W17-PRON-CUHK-FUT3", "W17-PRON-CTEXT-FUT3"] if item_id.endswith("I074") else []
        if evidence_ids != expected_ids:
            fail(f"legacy independent-evidence linkage drift: {item_id}")

    evidence = load_json(package / "evidence-sources-r1.json")
    if evidence.get("schema") != "canto-span-pedagogical-corpus-independent-evidence-v1":
        fail("unexpected Week 17 independent-evidence schema")
    claims = evidence.get("claims")
    if not isinstance(claims, list) or {row.get("id") for row in claims} != {"W17-PRON-CUHK-FUT3", "W17-PRON-CTEXT-FUT3"}:
        fail("Week 17 independent pronunciation sources changed")
    for claim in claims:
        if claim.get("evidence_grade") != "LEXICAL_OR_PRONUNCIATION_ONLY" or "fut3" not in str(claim.get("supported_claim")):
            fail("Week 17 independent evidence exceeds pronunciation scope")
    decision = evidence.get("decision") or {}
    if decision.get("source_item_id") != f"{source_id}-I074" or decision.get("source_value") != "hyut3|kut3":
        fail("Week 17 pronunciation decision source projection drift")
    if decision.get("reviewed_value") != "hyut3|fut3" or decision.get("corrected_reading") != "fut3":
        fail("Week 17 independently verified pronunciation value drift")
    if decision.get("source_mutated") is not False or decision.get("scope") != "pronunciation_only":
        fail("Week 17 pronunciation correction exceeded its evidence boundary")

    project_only = load_json(package / "project-only-review-r1.json")
    raw_project_only = crosswalk.get("projectOnlyRecords") or crosswalk.get("projectOnlyItems") or []
    project_rows = project_only.get("records")
    if project_only.get("schema") != "canto-span-pedagogical-corpus-project-only-review-v1":
        fail("unexpected project-only review schema")
    if not isinstance(project_rows, list) or len(project_rows) != 5 or project_only.get("record_count") != 5:
        fail("Week 17 project-only review count mismatch")
    if [row.get("id") for row in project_rows] != [row.get("id") for row in raw_project_only]:
        fail("Week 17 project-only IDs/order drift")
    for reviewed, original in zip(project_rows, raw_project_only):
        for key, value in original.items():
            if reviewed.get(key) != value:
                fail(f"project-only historical projection drift: {reviewed.get('id')}: {key}")
        if reviewed.get("authority_status") != "unverified_project_probe" or reviewed.get("evidence_use_disposition") != "not_source_attestation":
            fail(f"project-only probe was elevated without evidence: {reviewed.get('id')}")
        if reviewed.get("runtime_or_status_authorization") != "none":
            fail(f"project-only probe authorizes runtime or status change: {reviewed.get('id')}")

    review_rows = review.get("records")
    if not isinstance(review_rows, list):
        fail("review rows missing for legacy linkage")
    for row in review_rows:
        item_id = row["id"]
        if row.get("legacy_reconciliation_status") != original_by_id[item_id].get("classification"):
            fail(f"review legacy classification drift: {item_id}")
        if row.get("inherited_project_authority") != "unverified_project_history":
            fail(f"review inherited project authority was elevated: {item_id}")
        expected_ids = ["W17-PRON-CUHK-FUT3", "W17-PRON-CTEXT-FUT3"] if item_id.endswith("I074") else []
        if row.get("independent_evidence_ids") != expected_ids:
            fail(f"review independent-evidence linkage drift: {item_id}")
    return set(ids)
''').lstrip()
insert_at = verifier.index("def allowed_duplicate_paths(")
verifier = verifier[:insert_at] + legacy_verifier + "\n\n" + verifier[insert_at:]

# Source repeats are accepted only through the legacy packet's explicit target.
allowed_marker = '    if not normalized:\n        for link in crossref_row.get("later_research_links", []):\n            if isinstance(link, dict):\n                output.update(owner for owner in link.get("exact_runtime_owners", []) if isinstance(owner, str))\n'
require(allowed_marker in verifier, "duplicate-path helper marker changed")
allowed_replacement = allowed_marker + (
    '                if link.get("kind") == "legacy_project_reconciliation" and isinstance(link.get("source_repeat_target_path"), str):\n'
    '                    output.add(link["source_repeat_target_path"])\n'
)
verifier = verifier.replace(allowed_marker, allowed_replacement, 1)

verify_marker = '    runtime_crosswalk_ids = verify_runtime_crosswalk(root, package, source_id, payload_hash, source_items)\n'
require(verify_marker in verifier, "runtime verifier call marker missing")
verifier = verifier.replace(
    verify_marker,
    verify_marker + '    legacy_reconciliation_ids = verify_legacy_reconciliation(root, package, source_id, payload_hash, source_items, review)\n',
    1,
)
result_marker = '        "runtime_crosswalk_records": len(runtime_crosswalk_ids),\n'
require(result_marker in verifier, "verification result marker missing")
verifier = verifier.replace(
    result_marker,
    result_marker + '        "legacy_reconciliation_records": len(legacy_reconciliation_ids),\n        "project_only_historical_records": review["summary"].get("project_only_historical_records", 0),\n',
    1,
)
verifier_path.write_text(verifier, encoding="utf-8")

# Register Week 17 and add authority-focused tests.
tests_path = ROOT / "tests/tooling/research/pedagogical-corpus-review.test.py"
tests = tests_path.read_text(encoding="utf-8")
constants_start = tests.index("WEEK14 = Path(")
constants_end = tests.index("\n\ndef write_json", constants_start)
week17_discrepancy_rows = review["summary"]["records_with_source_discrepancies"]
constants = f'''WEEK14 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W14-20260621")
WEEK15 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W15-20260628")
WEEK16 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W16-20260705")
WEEK17 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W17-20260712")
REGISTERED = {{
    WEEK14: {{"records": 61, "discrepancies": 6, "exact": 5, "runtime": 0, "legacy": 0}},
    WEEK15: {{"records": 65, "discrepancies": 4, "exact": 10, "runtime": 0, "legacy": 0}},
    WEEK16: {{"records": 59, "discrepancies": 11, "exact": 0, "runtime": 35, "legacy": 0}},
    WEEK17: {{"records": 75, "discrepancies": {week17_discrepancy_rows}, "exact": 3, "runtime": 0, "legacy": 75}},
}}
'''
tests = tests[:constants_start] + constants.rstrip() + tests[constants_end:]
assertion = '                self.assertEqual(result["runtime_crosswalk_records"], expected["runtime"])\n'
require(assertion in tests, "registered runtime assertion marker missing")
tests = tests.replace(
    assertion,
    assertion + '                self.assertEqual(result["legacy_reconciliation_records"], expected["legacy"])\n',
    1,
)

registered_insert = tests.index("\n\nclass PedagogicalCorpusReviewMutationTest")
focused_methods = textwrap.indent(textwrap.dedent(f'''
def test_week17_legacy_authority_is_not_independent_evidence(self) -> None:
    review = json.loads((ROOT / WEEK17 / "review.json").read_text(encoding="utf-8"))
    legacy = json.loads((ROOT / WEEK17 / "legacy-reconciliation-r1.json").read_text(encoding="utf-8"))
    project_only = json.loads((ROOT / WEEK17 / "project-only-review-r1.json").read_text(encoding="utf-8"))
    self.assertEqual(review["summary"]["review_status_counts"], {{"reviewed": 75, "unreviewed": 0}})
    self.assertEqual(review["summary"]["project_only_historical_records"], 5)
    self.assertEqual(legacy["summary"]["legacy_pass_cells"], 158)
    self.assertEqual(legacy["summary"]["legacy_promoted_accepted_cells"], 131)
    self.assertTrue(all(row["inherited_authority_status"] == "unverified_project_history" for row in legacy["records"]))
    self.assertTrue(all(row["authority_status"] == "unverified_project_probe" for row in project_only["records"]))

def test_week17_only_kwut_has_independent_evidence(self) -> None:
    source = json.loads((ROOT / WEEK17 / "source.json").read_text(encoding="utf-8"))
    review = json.loads((ROOT / WEEK17 / "review.json").read_text(encoding="utf-8"))
    evidence = json.loads((ROOT / WEEK17 / "evidence-sources-r1.json").read_text(encoding="utf-8"))
    linked = [row for row in review["records"] if row["independent_evidence_ids"]]
    self.assertEqual([row["id"] for row in linked], ["{KWUT_ID}"])
    self.assertEqual(evidence["decision"]["source_value"], "hyut3|kut3")
    self.assertEqual(evidence["decision"]["reviewed_value"], "hyut3|fut3")
    source_row = next(row for row in source["items"] if row["id"] == "{KWUT_ID}")
    self.assertIn("kut3", json.dumps(source_row, ensure_ascii=False))

def test_week17_only_source_repeats_are_accepted_duplicates(self) -> None:
    review = json.loads((ROOT / WEEK17 / "review.json").read_text(encoding="utf-8"))
    exact = [row for row in review["records"] if row["terminal_ingress_classification"] == "exact_duplicate"]
    self.assertEqual([row["id"].rsplit("-", 1)[-1] for row in exact], ["I024", "I025", "I026"])
    self.assertTrue(all(row["accepted_duplicate_targets"][0]["path"].endswith("source.json") for row in exact))
'''), "    ")
tests = tests[:registered_insert] + "\n" + focused_methods.rstrip() + tests[registered_insert:]

main_insert = tests.index('\n\nif __name__ == "__main__":')
mutation_class = textwrap.dedent('''
class Week17LegacyAuthorityMutationTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        shutil.copytree(ROOT / WEEK17, self.root / WEEK17, dirs_exist_ok=True)
        lock_target = self.root / VERIFIER.SOURCE_LOCKS_RELATIVE
        lock_target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / VERIFIER.SOURCE_LOCKS_RELATIVE, lock_target)
        legacy = json.loads((ROOT / WEEK17 / "legacy-reconciliation-r1.json").read_text(encoding="utf-8"))
        for row in legacy["legacy_files"]:
            target = self.root / row["path"]
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / row["path"], target)

    def tearDown(self) -> None:
        self.temp.cleanup()

    def verify(self):
        return VERIFIER.verify(self.root, WEEK17, check_deterministic_crossref=False)

    def test_inherited_project_assertion_cannot_self_promote(self) -> None:
        path = self.root / WEEK17 / "legacy-reconciliation-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["records"][0]["inherited_authority_status"] = "independently_verified"
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "elevated without evidence"):
            self.verify()

    def test_kwut_independent_value_is_locked(self) -> None:
        path = self.root / WEEK17 / "evidence-sources-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["decision"]["reviewed_value"] = "hyut3|kut3"
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "pronunciation value drift"):
            self.verify()

    def test_project_only_probe_cannot_authorize_runtime(self) -> None:
        path = self.root / WEEK17 / "project-only-review-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["records"][0]["runtime_or_status_authorization"] = "runtime_acceptance"
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "authorizes runtime or status change"):
            self.verify()
''').lstrip()
tests = tests[:main_insert] + "\n\n" + mutation_class.rstrip() + tests[main_insert:]
tests_path.write_text(tests, encoding="utf-8")

# Register the fourth package in npm and the recurring research profile.
package_json_path = ROOT / "package.json"
package_json = load_json(package_json_path)
command = package_json["scripts"]["verify:pedagogical-corpus-review"]
week17_arg = f"--package {PACKAGE_REL}"
if week17_arg not in command:
    command = command.replace(" --check-deterministic-crossref", f" {week17_arg} --check-deterministic-crossref")
package_json["scripts"]["verify:pedagogical-corpus-review"] = command
write_json(package_json_path, package_json)
profiles_path = ROOT / "config/verification-profiles.json"
profiles = load_json(profiles_path)
pedagogical = next(row for row in profiles["profiles"]["research"] if row["id"] == "pedagogical-corpus-review")
if str(PACKAGE_REL) not in pedagogical["command"]:
    index = pedagogical["command"].index("--check-deterministic-crossref")
    pedagogical["command"][index:index] = ["--package", str(PACKAGE_REL)]
write_json(profiles_path, profiles)

# Final issue-level research report.
report = f"""# Glossika Week 17 corpus reconciliation — final expert review

- Source ID: `{SOURCE_ID}`
- Intake: #134
- Original reconciliation: #276 / merged PR #277
- Completed review: #477 / PR #478
- Status: 75-record expert review complete; awaiting merge approval

## Terminal result

- 75 of 75 source rows reviewed;
- three accepted exact duplicates, limited to repeated source rows `I024–I026`;
- five project-only naturalized alternatives retained as unverified historical probes;
- 158 inherited `PASS` cells and 131 inherited `PROMOTED_ACCEPTED` cells preserved as project history, not independent evidence;
- one independently verified pronunciation correction: `闊 fut3`;
- zero source replacements;
- zero parser, runtime, status, survey, release, or deployment authorizations.

## Evidence authority

The original crosswalk remains a useful reconciliation record. Its project-owned status cells cannot establish their own authority. Every source row now separates the immutable source, legacy project relationship, inherited project assertion, independent evidence, terminal corpus disposition, and evidence-use boundary.

`canonicalParserOwnerCandidates` remain heuristic path candidates. They are not accepted parser ownership or parser-correctness evidence.

## Independent pronunciation decision

The source pair `血|闊` remains `hyut3|kut3` in the immutable source. CUHK's Cantonese pronunciation database and the Chinese Text Project independently give `fut3` for `闊`, supporting the reviewed pair `hyut3|fut3`. This is pronunciation-only evidence and does not validate the source phonics heading or any grammar claim.

## Protected state

The `w17-*` files and original `crosswalk.json` remain unchanged. No parser behavior, runtime lexicon/version, construction identity/status, native-panel evidence, survey state, release state, deployment state, or merge authorization changes.
"""
(ROOT / "docs/research/GLOSSIKA-YUEHK-A1-W17-20260712-CORPUS-RECONCILIATION.md").write_text(report, encoding="utf-8")
