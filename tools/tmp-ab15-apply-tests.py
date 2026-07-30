#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROVENANCE = "docs/research/AB15-DEMONSTRATIVE-CLASSIFIER-NOUN-SCOPE-R1.md#revised-boundary-matrix"


def recalc(spec):
    focused = spec.get("focused_cases", [])
    probes = spec.get("implementation_probe_cases", [])
    snapshot = len(spec.get("snapshot_cases", []))
    positive = sum(case.get("assertion") == "construction_present" for case in focused)
    boundary = sum(case.get("assertion") == "construction_absent" for case in focused)
    review = sum(case.get("assertion") == "review_only_parse_succeeds" for case in focused)
    np_count = len(spec.get("np_cases", []))
    alias = sum(case.get("assertion") == "compatibility_alias_present" for case in probes)
    spec["coverage"] = {
        "state": "positive_and_boundary" if snapshot + positive and boundary else "positive_only",
        "exact_snapshot_positive_count": snapshot,
        "focused_positive_count": positive,
        "focused_boundary_count": boundary,
        "focused_review_only_count": review,
        "np_case_count": np_count,
        "implementation_probe_count": len(probes),
        "compatibility_alias_probe_count": alias,
        "positive_case_count": snapshot + positive,
        "boundary_case_count": boundary,
        "executable_case_count": snapshot + len(focused) + np_count + len(probes),
    }


def write(path, data):
    recalc(data)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


path = ROOT / "tests/constructions/OvertHeadDemonstrativeClassifierNP.json"
spec = json.loads(path.read_text(encoding="utf-8"))
spec["focused_cases"] = [
    {"case_id":"AB15-P01","source":"呢本書。","class":"no_numeral_dem_cl_overt_n","expected_profile":"construction_present","assertion":"construction_present","provenance":PROVENANCE,"source_ids":["SRC-BOND-SIO-2024-CLASSIFIERS","SRC-CHENG-SYBESMA-2014-NP-STRUCTURE","SRC-MATTHEWS-YIP-COMPREHENSIVE-CH6"]},
    {"case_id":"AB15-P02","source":"嗰間餐廳。","class":"distal_no_numeral_dem_cl_overt_n","expected_profile":"construction_present","assertion":"construction_present","provenance":PROVENANCE,"source_ids":["SRC-MATTHEWS-YIP-COMPREHENSIVE-CH6"]},
    {"case_id":"AB15-N01","source":"呢個。","class":"headless_demonstrative_classifier_sibling","expected_profile":"construction_absent","assertion":"construction_absent","provenance":PROVENANCE},
    {"case_id":"AB15-N02","source":"呢三本書。","class":"overt_numeral_sibling","expected_profile":"construction_absent","assertion":"construction_absent","provenance":PROVENANCE},
    {"case_id":"AB15-N03","source":"本書。","class":"bare_classifier_noun_sibling","expected_profile":"construction_absent","assertion":"construction_absent","provenance":PROVENANCE},
    {"case_id":"AB15-N04","source":"三本書。","class":"quantified_classifier_sibling","expected_profile":"construction_absent","assertion":"construction_absent","provenance":PROVENANCE},
    {"case_id":"AB15-N05","source":"呢書。","class":"missing_classifier_no_repair","expected_profile":"construction_absent","assertion":"construction_absent","provenance":PROVENANCE},
    {"case_id":"AB15-N06","source":"嗰間新開嘅意大利餐廳。","class":"modifier_bearing_composition","expected_profile":"construction_absent","assertion":"construction_absent","provenance":PROVENANCE},
]
spec["implementation_probe_cases"] = [{"case_id":"AB15-I01","source":"呢本書。","assertion":"trace_detail_equals","expected_surface":"呢本書","expected_trace_detail":{"np_subtype":"demonstrative_classifier_overt_head_no_numeral"},"purpose":"runtime_reachability_only","linguistic_evidence_weight":0}]
write(path, spec)

path = ROOT / "tests/constructions/ClassifierObjectNP.json"
spec = json.loads(path.read_text(encoding="utf-8"))
spec["focused_cases"] = [case for case in spec["focused_cases"] if case.get("case_id") != "AB15-CONP-P01"]
spec["focused_cases"].insert(0, {"case_id":"AB15-CONP-P01","source":"本書。","class":"bare_classifier_noun_sibling","expected_profile":"construction_present","assertion":"construction_present","provenance":PROVENANCE,"source_ids":["SRC-BOND-SIO-2024-CLASSIFIERS","SRC-CHENG-SYBESMA-2014-NP-STRUCTURE"]})
spec["implementation_probe_cases"] = [case for case in spec.get("implementation_probe_cases", []) if case.get("case_id") != "AB15-CONP-I01"] + [{"case_id":"AB15-CONP-I01","source":"本書。","assertion":"trace_detail_equals","expected_surface":"本書","expected_trace_detail":{"np_subtype":"bare_classifier_noun_np"},"purpose":"runtime_reachability_only","linguistic_evidence_weight":0}]
write(path, spec)

path = ROOT / "tests/constructions/ModifiedNP.json"
spec = json.loads(path.read_text(encoding="utf-8"))
spec["focused_cases"] = [case for case in spec["focused_cases"] if not str(case.get("case_id", "")).startswith("AB15-MNP-")]
spec["focused_cases"].extend([
    {"case_id":"AB15-MNP-P01","source":"呢三本書。","class":"demonstrative_quantified_classifier_sibling","expected_profile":"construction_present","assertion":"construction_present","provenance":PROVENANCE,"source_ids":["SRC-BOND-SIO-2024-CLASSIFIERS","SRC-CHENG-SYBESMA-2014-NP-STRUCTURE"]},
    {"case_id":"AB15-MNP-P02","source":"嗰間新開嘅意大利餐廳。","class":"modifier_bearing_composition","expected_profile":"construction_present","assertion":"construction_present","provenance":PROVENANCE,"source_ids":["SRC-CHENG-SYBESMA-2014-NP-STRUCTURE"]},
])
spec["implementation_probe_cases"] = [case for case in spec.get("implementation_probe_cases", []) if not str(case.get("case_id", "")).startswith("AB15-MNP-I")]
spec["implementation_probe_cases"].extend([
    {"case_id":"AB15-MNP-I01","source":"呢三本書。","assertion":"trace_detail_equals","expected_surface":"呢三本書","expected_trace_detail":{"np_subtype":"demonstrative_quantified_classifier_np"},"purpose":"runtime_reachability_only","linguistic_evidence_weight":0},
    {"case_id":"AB15-MNP-I02","source":"嗰間新開嘅意大利餐廳。","assertion":"trace_detail_equals","expected_surface":"嗰間新開嘅意大利餐廳","expected_trace_detail":{"np_subtype":"demonstrative_classifier_modifier_np"},"purpose":"runtime_reachability_only","linguistic_evidence_weight":0},
])
write(path, spec)
