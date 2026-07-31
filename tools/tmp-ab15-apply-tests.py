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


# AB15 itself remains the narrow no-numeral Dem + CL + overt N profile.
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
# No new trace metadata is introduced for AB15; the construction label itself is
# the stable implementation assertion.
spec["implementation_probe_cases"] = [
    case for case in spec.get("implementation_probe_cases", [])
    if not str(case.get("case_id", "")).startswith("AB15-")
]
write(path, spec)


# Preserve the established bare and modifier-bearing ModifiedNP behavior. The
# accepted task does not retype these siblings into a new construction.
path = ROOT / "tests/constructions/ModifiedNP.json"
spec = json.loads(path.read_text(encoding="utf-8"))
spec["focused_cases"] = [
    case for case in spec.get("focused_cases", [])
    if not str(case.get("case_id", "")).startswith("AB15-MNP-")
]
spec["focused_cases"].extend([
    {"case_id":"AB15-MNP-P01","source":"本書。","class":"bare_classifier_noun_sibling","expected_profile":"construction_present","assertion":"construction_present","provenance":PROVENANCE,"source_ids":["SRC-BOND-SIO-2024-CLASSIFIERS","SRC-CHENG-SYBESMA-2014-NP-STRUCTURE"]},
    {"case_id":"AB15-MNP-P02","source":"呢三本書。","class":"demonstrative_quantified_classifier_composition","expected_profile":"construction_present","assertion":"construction_present","provenance":PROVENANCE,"source_ids":["SRC-BOND-SIO-2024-CLASSIFIERS","SRC-CHENG-SYBESMA-2014-NP-STRUCTURE"]},
    {"case_id":"AB15-MNP-P03","source":"嗰間新開嘅意大利餐廳。","class":"modifier_bearing_composition","expected_profile":"construction_present","assertion":"construction_present","provenance":PROVENANCE,"source_ids":["SRC-CHENG-SYBESMA-2014-NP-STRUCTURE"]},
])
spec["implementation_probe_cases"] = [
    case for case in spec.get("implementation_probe_cases", [])
    if not str(case.get("case_id", "")).startswith("AB15-MNP-")
]
write(path, spec)


# The overt numeral must remain represented by the existing quantified profile,
# both alone and nested beneath the demonstrative-bearing composition.
path = ROOT / "tests/constructions/QuantifiedClassifierNP.json"
spec = json.loads(path.read_text(encoding="utf-8"))
spec["focused_cases"] = [
    case for case in spec.get("focused_cases", [])
    if not str(case.get("case_id", "")).startswith("AB15-QNP-")
]
spec["focused_cases"].extend([
    {"case_id":"AB15-QNP-P01","source":"三本書。","class":"quantified_classifier_sibling","expected_profile":"construction_present","assertion":"construction_present","provenance":PROVENANCE,"source_ids":["SRC-BOND-SIO-2024-CLASSIFIERS","SRC-CHENG-SYBESMA-2014-NP-STRUCTURE"]},
    {"case_id":"AB15-QNP-P02","source":"呢三本書。","class":"demonstrative_plus_quantified_classifier_np","expected_profile":"construction_present","assertion":"construction_present","provenance":PROVENANCE,"source_ids":["SRC-BOND-SIO-2024-CLASSIFIERS","SRC-CHENG-SYBESMA-2014-NP-STRUCTURE"]},
])
write(path, spec)
