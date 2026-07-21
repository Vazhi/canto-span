#!/usr/bin/env python3
"""Audit the CP023-P1-PROG01-R3 research-only checkpoint."""
from __future__ import annotations

import csv
import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EXPECTED_RUNTIME = {
    "main.js": "86ff77131e12082885294eabe336bf95cbe0160469cd446a5c17b3e6c9a5b535",
    "manifest.json": "84c0a1a885e2f841f66e6e9ec5be67d2a5ec8e16df490bdaef0f0150590c2f46",
    "styles.css": "5e97a27bb3925dbc63c0af00f72899c3c860c5b1a407e3f8ea832b8ff0dd409a",
}
REQUIRED_FILES = [
    "docs/research/CP023-P1-PROG01-SOURCE-REGISTER-R3.tsv",
    "docs/research/CP023-P1-PROG01-PREDICATE-COMPATIBILITY-MATRIX-R3.tsv",
    "docs/research/CP023-P1-PROG01-PREDICATE-COMPATIBILITY-FREEZE-R3.md",
    "docs/research/CP023-P1-PROG01-NOMINAL-DI-ASSOCIATIVE-SCOPE-DESIGN-R3.md",
    "docs/research/CP023-P1-PROG01-NOMINAL-COORDINATION-DESIGN-R3.md",
    "docs/research/CP023-P1-PROG01-CLAIM-SOURCE-EDGES-R3.tsv",
    "docs/research/CP023-P1-PROG01-R3-RESEARCH-CHECKPOINT.md",
    "test-data/CP023-P1-PROG01-nominal-design-cases-r3.tsv",
    "review-packets/cp023-p1-prog01/PROG01-R3/focused-research-packet.json",
    "validation/cp023-p1-prog01/current-baseline-observation.json",
    "validation/cp023-p1-prog01/lexicon-baseline-observation.json",
    "validation/cp023-p1-prog01/nominal-prerequisite-observation.json",
]


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def tsv_rows(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle, delimiter="\t"))


checks: list[dict[str, object]] = []


def check(name: str, passed: object, detail: str = "") -> None:
    row: dict[str, object] = {"name": name, "pass": bool(passed)}
    if detail:
        row["detail"] = detail
    checks.append(row)


for rel in REQUIRED_FILES:
    check(f"exists: {rel}", (ROOT / rel).is_file())

json_files = [
    "PROGRESS-CHECKPOINT.json",
    "PACKAGING-MANIFEST.json",
    "review-packets/cp023-p1-prog01/PROG01-R3/focused-research-packet.json",
    "validation/cp023-p1-prog01/current-baseline-observation.json",
    "validation/cp023-p1-prog01/lexicon-baseline-observation.json",
    "validation/cp023-p1-prog01/nominal-prerequisite-observation.json",
]
for rel in json_files:
    try:
        json.loads((ROOT / rel).read_text(encoding="utf-8"))
        ok, detail = True, ""
    except Exception as error:  # pragma: no cover - audit reporting path
        ok, detail = False, str(error)
    check(f"valid JSON: {rel}", ok, detail)

progress = json.loads((ROOT / "PROGRESS-CHECKPOINT.json").read_text(encoding="utf-8"))
research = progress.get("research", {})
check("active research package is R3", progress.get("active_research_package") == "CP023-P1-PROG01-R3", repr(progress.get("active_research_package")))
check("no active implementation candidate", progress.get("active_candidate") is None)
check("supported_productive remains 2", progress.get("supported_productive") == 2, repr(progress.get("supported_productive")))
check("heldout remains unselected", research.get("heldout") == "NOT_SELECTED", repr(research.get("heldout")))
check("runtime behavior recorded unchanged", research.get("runtime_behavior_changed") is False)
check("predicate matrix row count recorded as 14", research.get("predicate_matrix_rows") == 14, repr(research.get("predicate_matrix_rows")))
check("exact seed count recorded as 8", research.get("exact_overt_object_seed_predicates") == 8, repr(research.get("exact_overt_object_seed_predicates")))
check("multiple-object seed count recorded as 2", research.get("multiple_object_profile_predicates") == 2, repr(research.get("multiple_object_profile_predicates")))
check("nominal design count recorded as 14", research.get("nominal_design_cases") == 14, repr(research.get("nominal_design_cases")))
check("R2 single-scope diagnosis recorded superseded", research.get("di_attachment_state") == "AMBIGUITY_AWARE_R2_SINGLE_SCOPE_SUPERSEDED", repr(research.get("di_attachment_state")))
check("overt 同埋 design recorded frozen", research.get("coordination_design_state") == "OVERT_TUNGMAAI_EXTENSION_FROZEN", repr(research.get("coordination_design_state")))
check("錫條 pronunciation remains quarantined", research.get("exact_tin_bar_jyutping") == "QUARANTINED_UNRESOLVED", repr(research.get("exact_tin_bar_jyutping")))

matrix = tsv_rows(ROOT / "docs/research/CP023-P1-PROG01-PREDICATE-COMPATIBILITY-MATRIX-R3.tsv")
check("predicate matrix has 14 rows", len(matrix) == 14, str(len(matrix)))
by_state: dict[str, int] = {}
for row in matrix:
    by_state[row.get("candidate_evidence_state", "")] = by_state.get(row.get("candidate_evidence_state", ""), 0) + 1
positive_states = {
    "MULTIPLE_OBJECT_PROFILES_ATTESTED",
    "EXACT_PAIR_ATTESTED",
    "EXACT_PAIR_SENSE_SPECIFIC",
    "EXACT_PAIR_EXTENDED_PROCESS",
    "CORPUS_PAIR_ATTESTED",
    "NATURAL_PAIR_ATTESTED",
}
positive = [row for row in matrix if row.get("candidate_evidence_state") in positive_states]
check("matrix has 8 exact overt-object seeds", len(positive) == 8, str(len(positive)))
check("matrix has 2 multiple-object-profile seeds", by_state.get("MULTIPLE_OBJECT_PROFILES_ATTESTED", 0) == 2, repr(by_state))
check("matrix has 2 broad outside-target boundaries", by_state.get("BROAD_PROGRESSIVE_OUTSIDE_NARROW_TARGET", 0) == 2, repr(by_state))
check("matrix has 2 visible-only non-evidence rows", by_state.get("VISIBLE_ONLY_NOT_EVIDENCE", 0) == 2, repr(by_state))
check("matrix contains exactly 睇 and 食 as multiple-profile seeds", {row.get("predicate") for row in matrix if row.get("candidate_evidence_state") == "MULTIPLE_OBJECT_PROFILES_ATTESTED"} == {"睇", "食"})
check("every matrix row forbids an over-inference", all(row.get("forbidden_inference", "").strip() for row in matrix))

source_rows = tsv_rows(ROOT / "docs/research/CP023-P1-PROG01-SOURCE-REGISTER-R3.tsv")
check("R3 source register has 8 rows", len(source_rows) == 8, str(len(source_rows)))
source_ids = {row.get("source_id") for row in source_rows}
for source_id in [
    "SRC-KATAOKA-2018-PROGRESSIVE-GAN",
    "SRC-FAN-2024-JAU-VP-ASPECT",
    "SRC-SIO-BOND-2025",
    "SRC-ALDERETE-ETAL-2017-CANTONESE-GRAMMAR-SYNOPSIS",
    "SRC-WINTERSTEIN-ETAL-2023-NOMINAL-EXPRESSIONS",
    "SRC-COI-DRINKING-WATER-2016-0111",
    "SRC-IRC-BUS-2018-1006",
    "PROJECT-CP023-P1-PROG01-R2-BASELINE",
]:
    check(f"source register contains {source_id}", source_id in source_ids)
check("every source has an explicit limitation", all(row.get("limitation", "").strip() for row in source_rows))

edges = tsv_rows(ROOT / "docs/research/CP023-P1-PROG01-CLAIM-SOURCE-EDGES-R3.tsv")
check("R3 claim-source table has 8 edges", len(edges) == 8, str(len(edges)))
check("every R3 edge has a limitation", all(row.get("limitation", "").strip() for row in edges))
check("R3 includes explicit R2 overclaim correction edge", any(row.get("claim_id") == "PROG01-R3-C06" and row.get("acceptance_effect") == "supersedes_r2_current_diagnosis" for row in edges))
check("R3 includes overt 同埋 source edge", any(row.get("claim_id") == "PROG01-R3-C07" for row in edges))

cases = tsv_rows(ROOT / "test-data/CP023-P1-PROG01-nominal-design-cases-r3.tsv")
check("nominal design table has 14 cases", len(cases) == 14, str(len(cases)))
case_ids = {row.get("case_id") for row in cases}
for case_id in ["NOM-R3-A03", "NOM-R3-A05", "NOM-R3-C02", "NOM-R3-C04", "NOM-R3-C05", "NOM-R3-C08"]:
    check(f"nominal design contains {case_id}", case_id in case_ids)
check("all nominal design cases remain visible-only", all(row.get("heldout_eligible") == "NO_VISIBLE" for row in cases))

predicate_doc = (ROOT / "docs/research/CP023-P1-PROG01-PREDICATE-COMPATIBILITY-FREEZE-R3.md").read_text(encoding="utf-8")
for phrase in [
    "no productive lexical class established",
    "No free cross-product",
    "No `supported_productive` promotion",
    "lexical-sense and construction-profile level",
]:
    check(f"predicate freeze contains: {phrase}", phrase in predicate_doc)

di_doc = (ROOT / "docs/research/CP023-P1-PROG01-NOMINAL-DI-ASSOCIATIVE-SCOPE-DESIGN-R3.md").read_text(encoding="utf-8")
for phrase in [
    "Correction to the R2 working diagnosis",
    "DiMarkedNP(啲, AssociativeNP(A, 嘅, N))",
    "AssociativeNP(DiMarkedNP(啲, A), 嘅, N)",
    "forced single attachment prohibited",
    "inference from discourse context",
]:
    check(f"啲 design contains: {phrase}", phrase in di_doc)

coord_doc = (ROOT / "docs/research/CP023-P1-PROG01-NOMINAL-COORDINATION-DESIGN-R3.md").read_text(encoding="utf-8")
for phrase in [
    "Extend the existing internal `CoordinatedNP`",
    "coordinator=同埋",
    "Both conjuncts must independently be complete nominal expressions",
    "Clause role is external",
    "報告同埋文件",
    "錫條` is quarantined",
]:
    check(f"coordination design contains: {phrase}", phrase in coord_doc)

packet_path = ROOT / "review-packets/cp023-p1-prog01/PROG01-R3/focused-research-packet.json"
packet = json.loads(packet_path.read_text(encoding="utf-8"))
check("packet id is R3", packet.get("packet_id") == "CP023-P1-PROG01-R3")
check("packet implementation remains unauthorized", packet.get("held_out", {}).get("implementation_authorized") is False)
check("packet custody archive remains null", packet.get("held_out", {}).get("custody_archive") is None)
for key, rel in packet.get("files", {}).items():
    resolved = (packet_path.parent / rel).resolve()
    check(f"packet file resolves: {key}", resolved.is_file(), str(resolved))
    expected = packet.get("sha256", {}).get(key)
    got_hash = sha256(resolved) if resolved.is_file() else "missing"
    hash_ok = bool(expected) and resolved.is_file() and got_hash == expected
    check(f"packet hash matches: {key}", hash_ok, "" if hash_ok else f"{got_hash} != {expected}")

for rel in ["README.md", "CHECKPOINT-STATE.md", "HANDOFF.md", "docs/current/PROJECT-STATE.md", "docs/research/CURRENT-RESEARCH-PROVENANCE.md"]:
    text = (ROOT / rel).read_text(encoding="utf-8")
    check(f"active state names R3: {rel}", "CP023-P1-PROG01-R3" in text)
check("current project state supersedes R2 categorical preference", "R2’s categorical preference" in (ROOT / "docs/current/PROJECT-STATE.md").read_text(encoding="utf-8"))

for name, expected in EXPECTED_RUNTIME.items():
    got = sha256(ROOT / name)
    runtime_ok = got == expected
    check(f"runtime identity: {name}", runtime_ok, "" if runtime_ok else f"{got} != {expected}")

failures = [row for row in checks if not row["pass"]]
result = {
    "schema": "canto-span-cp023-p1-prog01-r3-audit-v1",
    "checkpoint": "CP023-P1-PROG01-R3",
    "accepted_runtime": "v0.5.182",
    "status": "PASS" if not failures else "FAIL",
    "total": len(checks),
    "passed": len(checks) - len(failures),
    "failed": len(failures),
    "runtime_behavior_changed": False,
    "checks": checks,
    "failures": failures,
}
print(json.dumps(result, ensure_ascii=False, indent=2))
sys.exit(1 if failures else 0)
