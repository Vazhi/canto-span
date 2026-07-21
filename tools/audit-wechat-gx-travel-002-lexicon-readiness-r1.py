#!/usr/bin/env python3
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
data_path = root / "test-data" / "WECHAT-GX-TRAVEL-002-LEXICON-JYUTPING-READINESS-R1.json"
out_path = root / "validation" / "v0.5.181" / "WECHAT-GX-TRAVEL-002-LEXICON-JYUTPING-READINESS-AUDIT-R1.json"
data = json.loads(data_path.read_text(encoding="utf-8"))
rows = data["rows"]
checks = []

def check(name, condition, detail=""):
    checks.append({"name": name, "pass": bool(condition), "detail": str(detail)})

check("candidate count is 39", len(rows) == 39, len(rows))
check("candidate ids unique", len({r["candidate"] for r in rows}) == len(rows), len(rows))
check("all candidates linked to corpus units", all(r["unit_ids"] for r in rows))
check("all rows have readiness", all(r["readiness"] for r in rows))
check("all rows have recommended actions", all(r["recommended_action"] for r in rows))
check("all rows preserve zero grammar effect", all(r["grammar_acceptance_effect"] == "none" for r in rows))
check("all rows contain caution notes", all(r["caution"] for r in rows))

names = [r for r in rows if r["category"] == "CORPUS_LOCAL_NAME"]
check("five corpus-local names retained", len(names) == 5, len(names))
check("corpus-local names excluded from global lexicon", all(r["recommended_action"] == "NO_GLOBAL_LEXICON_ENTRY" for r in names))

by = {r["candidate"]: r for r in rows}
check("一啖 remains compositional", by["一啖"]["recommended_action"] == "ADD_CLASSIFIER_DAAM6_NOT_ATOMIC_MWE")
check("成班人 remains compositional", by["成班人"]["recommended_action"] == "ADD_COMPONENTS_NOT_ATOMIC_MWE")
check("早知 full grammar remains blocked", "BLOCKED" in by["早知"]["readiness"])
check("跟住 temporal entry cannot fix accompaniment", by["跟住"]["recommended_action"] == "DO_NOT_USE_TEMPORAL_MWE_ENTRY_TO_FIX_U049")
check("runtime behavior unchanged", data["runtime_behavior_changed"] is False)
check("candidate scoring unchanged", data["candidate_scoring_changed"] is False)
check("productive weight zero", data["productive_promotion_weight"] == 0)

result = {
    "schema": "canto-span-natural-corpus-lexicon-readiness-audit-v1",
    "corpus_id": data["corpus_id"],
    "runtime_version": data["runtime_version_observed"],
    "total": len(checks),
    "passed": sum(c["pass"] for c in checks),
    "failed": sum(not c["pass"] for c in checks),
    "status": "PASS" if all(c["pass"] for c in checks) else "FAIL",
    "candidate_count": len(rows),
    "checks": checks,
}
out_path.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps(result, ensure_ascii=False, indent=2))
raise SystemExit(0 if result["status"] == "PASS" else 1)
