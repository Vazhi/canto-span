#!/usr/bin/env python3
from __future__ import annotations

import csv
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "validation/v0.5.181/WECHAT-GX-TRAVEL-002-RESEARCH-ONLY-AUDIT-R1.json"
CUSTODY = Path("/mnt/data/CANTO-SPAN-v0.5.181-EVALUATOR-CUSTODY-DO-NOT-OPEN.zip")
EXPECTED = {
    "main.js": "6cb8aef9a279ff9abef2a84c77dc470b5f4abcf0ae7306ca39f7f3a5fc44494e",
    "manifest.json": "63a5f17c633c89583cbfe64ac3262d41565ea8126c0f80668426a75d06891c57",
    "styles.css": "5e97a27bb3925dbc63c0af00f72899c3c860c5b1a407e3f8ea832b8ff0dd409a",
    "render-review/CANTO-SPAN-v0.5.181-RENDER-REVIEW.md": "dd52a3f578149f8793292c420c2b44612b4825f7c913755cdb441e9124a001c1",
    "custody": "f4c722dcbe5babec11d58d5164c4b04cf9661bbe364c4452384760c1bf19078e",
}

def sha(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for block in iter(lambda: f.read(1024 * 1024), b""):
            h.update(block)
    return h.hexdigest()

checks: list[dict] = []

def check(name: str, passed: bool, detail: object) -> None:
    checks.append({"name": name, "status": "PASS" if passed else "FAIL", "detail": detail})

# Frozen runtime and render packet.
for rel in ("main.js", "manifest.json", "styles.css", "render-review/CANTO-SPAN-v0.5.181-RENDER-REVIEW.md"):
    actual = sha(ROOT / rel)
    check(f"frozen_hash:{rel}", actual == EXPECTED[rel], {"expected": EXPECTED[rel], "actual": actual})

manifest = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
check("manifest_version", manifest.get("version") == "0.5.181", manifest.get("version"))

main = (ROOT / "main.js").read_text(encoding="utf-8")
productive_count = len(re.findall(r'"status":"supported_productive"', main))
check("supported_productive_count_unchanged", productive_count == 1, productive_count)
check("candidate_still_provisional", '"ResourceUseLaiFunctionRelation":{"pattern":"ResourceUseLaiFunctionRelation"' in main and '"ResourceUseLaiFunctionRelation":{"pattern":"ResourceUseLaiFunctionRelation","lane":"LANE-01","primary_claim_type":"cantonese_language_claim","status":"provisional"' in main, "ResourceUseLaiFunctionRelation remains provisional")

# Custody integrity without listing or extracting its contents.
check("custody_file_present", CUSTODY.is_file(), str(CUSTODY))
if CUSTODY.is_file():
    actual_custody = sha(CUSTODY)
    check("custody_hash_unchanged", actual_custody == EXPECTED["custody"], {"expected": EXPECTED["custody"], "actual": actual_custody})
else:
    check("custody_hash_unchanged", False, "missing")
extracted_markers = [str(p.relative_to(ROOT)) for p in ROOT.rglob("*") if p.is_dir() and ("custody_open" in p.name.lower() or "evaluator_open" in p.name.lower())]
check("no_custody_extraction_directory", len(extracted_markers) == 0, extracted_markers)

# Research artifacts.
contrast_path = ROOT / "test-data/WECHAT-GX-TRAVEL-002-CONTROLLED-CONTRASTS-R1.tsv"
with contrast_path.open(encoding="utf-8", newline="") as f:
    contrasts = list(csv.DictReader(f, delimiter="\t"))
check("controlled_contrast_count", len(contrasts) == 14, len(contrasts))
check("controlled_contrasts_zero_promotion_weight", all(r["promotion_weight"] == "0" for r in contrasts), sorted(set(r["promotion_weight"] for r in contrasts)))
check("duration_excluded_from_simple_vzo", any(r["contrast_id"] == "GX-R1-DUR-01" and "excluded from PostverbalZoPerfectiveVP" in r["notes"] for r in contrasts), "GX-R1-DUR-01")
check("vjyunzo_only_boundary", any(r["contrast_id"] == "GX-R1-CMP-03" and r["evidence_state"] == "published_attested_native_conflicted_unresolved" and r["promotion_weight"] == "0" for r in contrasts), "GX-R1-CMP-03")

edge_path = ROOT / "docs/research/WECHAT-GX-TRAVEL-002-CLAIM-SOURCE-EDGES-R1.tsv"
with edge_path.open(encoding="utf-8", newline="") as f:
    edges = list(csv.DictReader(f, delimiter="\t"))
check("claim_source_edge_count", len(edges) == 16, len(edges))
check("claim_edges_no_acceptance_effect", all(r["grammar_acceptance_effect"] == "none" for r in edges), sorted(set(r["grammar_acceptance_effect"] for r in edges)))
check("conference_lead_deferred", any(r["source_id"] == "DISCOVERY-HKMU-YUE28-2024-HANDBOOK" and r["verification_state"].startswith("DEFER_") and r["relation"] == "discovery_lead" for r in edges), "official handbook lead has zero registered weight")
check("postverbal_dak_only_restricts", any(r["source_id"] == "SRC-CHENG-SYBESMA-2004-POSTVERBAL-DAK" and r["relation"] == "restricts_conflation" for r in edges), "no support edge for 冇得+VP")

note = (ROOT / "docs/research/WECHAT-GX-TRAVEL-002-PRIORITY-GRAMMAR-RESEARCH-R1.md").read_text(encoding="utf-8")
required_phrases = [
    "No claim below contributes positive promotion weight to v0.5.181",
    "a dedicated `ObjectTopicNegation` construction",
    "productive `早知…咪…` construction remains unproved",
    "No dedicated academic description of exact `冇得 + VP` was recovered",
    "outside accepted `PostverbalZoPerfectiveVP`",
    "provides **zero evidence** for `V完咗O`",
]
# One phrase is expected in negated context (“No dedicated ... was recovered”).
check("research_note_required_boundaries", all(p in note for p in required_phrases), [p for p in required_phrases if p not in note])
check("no_vjyunzo_positive_claim", "provides **zero evidence** for `V完咗O`" in note and "Do not count it as attestation of `V完咗O`" in note, "explicit negative boundary")

screen = (ROOT / "docs/research/SOURCE-SCREENING-LOG-CP021B.tsv").read_text(encoding="utf-8")
check("screening_lead_not_evidence", "SCREEN-CP021B-033" in screen and "DEFER_DISCOVERY_LEAD_ONLY" in screen and "never cite the snippet as evidence" not in screen.split("SCREEN-CP021B-033",1)[1], "deferred official-PDF discovery lead")
# The row itself says it cannot count as a source edge; verify that exact guard.
check("screening_lead_zero_weight_guard", "Search snippets cannot originate a durable grammar claim or count as a source edge." in screen, "guard present")

status = "PASS" if all(c["status"] == "PASS" for c in checks) else "FAIL"
out = {
    "schema": "canto-span-wechat-gx-travel-002-research-only-audit-r1",
    "runtime_version": "0.5.181",
    "status": status,
    "passed": sum(c["status"] == "PASS" for c in checks),
    "total": len(checks),
    "runtime_changed": False,
    "grammar_status_changed": False,
    "candidate_scoring_changed": False,
    "corpus_promotion_weight": 0,
    "custody_opened": False,
    "checks": checks,
}
OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(out, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps({k: out[k] for k in ("status","passed","total","runtime_changed","grammar_status_changed","custody_opened")}, ensure_ascii=False, indent=2))
if status != "PASS":
    for c in checks:
        if c["status"] != "PASS":
            print("FAIL", c["name"], c["detail"])
    raise SystemExit(1)
