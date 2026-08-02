#!/usr/bin/env python3
"""One-run Week 16 review finalizer. Removed by the executing workflow."""

import csv
import json
import subprocess
import textwrap
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACKAGE_REL = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W16-20260705")
PACKAGE = ROOT / PACKAGE_REL
I033 = "GLOSSIKA-YUEHK-A1-W16-20260705-I033"
COMPONENT_STATUS = "source_runtime_component_default_reading_difference"
COMPONENT_DISCREPANCY = {
    "field": "jyutping_component",
    "issue": "The source form 行公園 contains 公園; the runtime defaults to the common changed-tone reading gung1 jyun2 while retaining gung1 jyun4 as a review variant.",
    "status": COMPONENT_STATUS,
}


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value) -> None:
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def require(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)


source = load_json(PACKAGE / "source.json")
source_by_id = {row["id"]: row for row in source["items"]}
require((source_by_id[I033].get("source") or {}).get("traditional") == "行公園", "Week 16 I033 source surface changed")

runtime_path = PACKAGE / "runtime-crosswalk-r1.json"
runtime = load_json(runtime_path)
runtime_by_id = {row["id"]: row for row in runtime["records"]}
require(I033 in runtime_by_id, "Week 16 I033 missing from runtime crosswalk")
runtime_row = runtime_by_id[I033]
if not any(row.get("status") == COMPONENT_STATUS for row in runtime_row["source_discrepancies"]):
    runtime_row["source_discrepancies"].append({
        "type": "component_default_reading",
        "sourceComponent": "公園",
        "reviewedRuntimeDefault": "gung1 jyun2",
        "reviewVariant": "gung1 jyun4",
        "status": COMPONENT_STATUS,
        "note": COMPONENT_DISCREPANCY["issue"],
    })
write_json(runtime_path, runtime)

subprocess.run([
    "python3", "tools/build-pedagogical-corpus-review-candidates.py",
    "--package", str(PACKAGE_REL),
    "--output", str(PACKAGE_REL / "mechanical-cross-reference-r1.json"),
    "--write",
], check=True, cwd=ROOT)
mechanical = load_json(PACKAGE / "mechanical-cross-reference-r1.json")
mechanical_by_id = {row["id"]: row for row in mechanical["records"]}

review_path = PACKAGE / "review.json"
review = load_json(review_path)
review_by_id = {row["id"]: row for row in review["records"]}
for item_id, row in review_by_id.items():
    row["later_research_links"] = mechanical_by_id[item_id]["later_research_links"]
review_row = review_by_id[I033]
if not any(row.get("status") == COMPONENT_STATUS for row in review_row["source_discrepancies"]):
    review_row["source_discrepancies"].append(COMPONENT_DISCREPANCY)
review_row["evidence_use_disposition"] = "lexical_attestation_with_runtime_crosswalk_and_source_difference"
review_row["review_note"] = "The runtime representation is retained, but the component-level 公園 reading difference remains explicit and no source value is overwritten."

terminal_counts = Counter(row["terminal_ingress_classification"] for row in review["records"])
duplicate_counts = Counter(row["expert_duplicate_status"] for row in review["records"])
evidence_counts = Counter(row["evidence_use_disposition"] for row in review["records"])
summary = review["summary"]
summary["review_status_counts"] = {"reviewed": len(review["records"]), "unreviewed": 0}
summary["terminal_classification_counts"] = dict(sorted(terminal_counts.items()))
summary["duplicate_status_counts"] = dict(sorted(duplicate_counts.items()))
summary["evidence_use_counts"] = dict(sorted(evidence_counts.items()))
summary["records_with_source_discrepancies"] = sum(bool(row["source_discrepancies"]) for row in review["records"])
summary["records_with_reviewed_replacements"] = sum(
    any(value is not None for value in row["reviewed_values"].values())
    for row in review["records"]
)
summary["records_with_runtime_crosswalk"] = sum(
    bool(row.get("implementation_crosswalk_targets")) for row in review["records"]
)
require(summary["records_with_source_discrepancies"] == 11, f"unexpected discrepancy count: {summary}")
require(summary["records_with_runtime_crosswalk"] == 35, f"unexpected runtime count: {summary}")
write_json(review_path, review)

tsv_path = PACKAGE / "expert-review-r1.tsv"
with tsv_path.open(encoding="utf-8", newline="") as handle:
    reader = csv.DictReader(handle, delimiter="\t")
    fields = list(reader.fieldnames or [])
    rows = list(reader)
for row in rows:
    reviewed = review_by_id[row["id"]]
    row["duplicate_status"] = reviewed["expert_duplicate_status"]
    row["terminal_classification"] = reviewed["terminal_ingress_classification"]
    row["evidence_use"] = reviewed["evidence_use_disposition"]
    row["discrepancy_status"] = ";".join(value["status"] for value in reviewed["source_discrepancies"])
    row["implementation_crosswalk_targets"] = ";".join(
        value["path"] for value in reviewed.get("implementation_crosswalk_targets", [])
    )
    row["review_note"] = reviewed["review_note"]
with tsv_path.open("w", encoding="utf-8", newline="") as handle:
    writer = csv.DictWriter(handle, fieldnames=fields, delimiter="\t", lineterminator="\n")
    writer.writeheader()
    writer.writerows(rows)

verifier_path = ROOT / "tools/verify-pedagogical-corpus-review.py"
verifier = verifier_path.read_text(encoding="utf-8")
require("def verify_runtime_crosswalk(" not in verifier, "runtime verifier already present unexpectedly")

runtime_verifier = textwrap.dedent('''
def verify_runtime_crosswalk(
    root: Path,
    package: Path,
    source_id: str,
    payload_hash: str,
    source_items: list[dict[str, Any]],
) -> set[str]:
    path = package / "runtime-crosswalk-r1.json"
    if not path.exists():
        return set()
    packet = load_json(path)
    if packet.get("schema") != "canto-span-pedagogical-runtime-crosswalk-v1":
        fail("unexpected pedagogical runtime-crosswalk schema")
    if packet.get("source_id") != source_id or packet.get("source_payload_hash") != payload_hash:
        fail("runtime-crosswalk source identity mismatch")
    pull_request = packet.get("runtime_pull_request")
    merge_commit = packet.get("runtime_merge_commit")
    provenance_path = packet.get("provenance_path")
    if not isinstance(pull_request, int) or pull_request <= 0:
        fail("runtime-crosswalk pull request missing")
    if not isinstance(merge_commit, str) or not re.fullmatch(r"[0-9a-f]{40}", merge_commit):
        fail("runtime-crosswalk merge commit malformed")
    if not isinstance(provenance_path, str) or not provenance_path or not (root / provenance_path).is_file():
        fail("runtime-crosswalk provenance path missing")
    records = packet.get("records")
    if not isinstance(records, list):
        fail("runtime-crosswalk records must be an array")
    ids = stable_ids(records, "runtime-crosswalk records")
    if packet.get("record_count") != len(records):
        fail("runtime-crosswalk record count mismatch")
    source_by_id = {row["id"]: row for row in source_items}
    for row in records:
        item_id = row["id"]
        source = source_by_id.get(item_id)
        if source is None or source.get("itemType") != "lexical_entry":
            fail(f"runtime-crosswalk references a nonlexical or missing source item: {item_id}")
        if row.get("source_hash") != source.get("sourceHash"):
            fail(f"runtime-crosswalk source hash drift: {item_id}")
        link = row.get("runtime_crosswalk")
        if not isinstance(link, dict) or link.get("status") != "merged_runtime_crosswalk":
            fail(f"runtime-crosswalk implementation link missing: {item_id}")
        if link.get("pullRequest") != pull_request or link.get("mergeCommit") != merge_commit:
            fail(f"runtime-crosswalk implementation identity mismatch: {item_id}")
        if link.get("provenancePath") != provenance_path:
            fail(f"runtime-crosswalk provenance projection mismatch: {item_id}")
        if not isinstance(row.get("source_discrepancies"), list):
            fail(f"runtime-crosswalk source discrepancies malformed: {item_id}")
        if not isinstance(row.get("reviewed_values"), dict):
            fail(f"runtime-crosswalk reviewed values malformed: {item_id}")
    return set(ids)
''').lstrip()
insert_at = verifier.index("def allowed_duplicate_paths(")
verifier = verifier[:insert_at] + runtime_verifier + "\n\n" + verifier[insert_at:]

counter_marker = "    replacement_count = 0\n"
require(counter_marker in verifier, "review counter marker missing")
verifier = verifier.replace(counter_marker, counter_marker + "    implementation_crosswalk_count = 0\n", 1)

review_start = verifier.index("def verify_review(")
implementation_insert = verifier.index('        discrepancies = row.get("source_discrepancies")\n', review_start)
implementation_block = textwrap.indent(textwrap.dedent('''
later_links = row.get("later_research_links")
if later_links != crossref_row.get("later_research_links"):
    fail(f"review later-research links drift from the mechanical packet: {item_id}")
runtime_links = [
    link for link in later_links
    if isinstance(link, dict) and link.get("kind") == "runtime_crosswalk"
]
implementation_targets = row.get("implementation_crosswalk_targets", [])
if not isinstance(implementation_targets, list):
    fail(f"implementation crosswalk targets must be an array: {item_id}")
allowed_implementation_paths = {
    match.get("path")
    for match in crossref_row.get("exact_match_candidates", [])
    if isinstance(match, dict)
    and match.get("layer") in {"runtime_lexicon", "runtime_source"}
    and isinstance(match.get("path"), str)
}
allowed_implementation_paths.update(
    link.get("provenance_path")
    for link in runtime_links
    if isinstance(link.get("provenance_path"), str)
)
if runtime_links:
    if terminal != "lexical_only_attestation" or not implementation_targets:
        fail(f"runtime-crosswalk item lacks a separate lexical implementation target: {item_id}")
elif implementation_targets:
    fail(f"implementation target lacks a runtime-crosswalk evidence link: {item_id}")
for target in implementation_targets:
    if not isinstance(target, dict) or target.get("path") not in allowed_implementation_paths:
        fail(f"implementation crosswalk target is not evidence-backed: {item_id}: {target}")
    if not all(isinstance(target.get(key), str) and target[key] for key in ["basis", "target_type"]):
        fail(f"implementation crosswalk target lacks metadata: {item_id}")
if implementation_targets:
    implementation_crosswalk_count += 1

'''), "        ")
verifier = verifier[:implementation_insert] + implementation_block + verifier[implementation_insert:]

summary_marker = (
    '    if summary.get("records_with_reviewed_replacements") != replacement_count:\n'
    '        fail("reviewed replacement summary mismatch")\n'
)
require(summary_marker in verifier, "review summary marker missing")
verifier = verifier.replace(
    summary_marker,
    summary_marker +
    '    if summary.get("records_with_runtime_crosswalk", 0) != implementation_crosswalk_count:\n'
    '        fail("runtime-crosswalk summary mismatch")\n',
    1,
)

tsv_start = verifier.index("def verify_expert_tsv(")
tsv_end = verifier.index("\n\ndef source_display", tsv_start)
new_tsv = textwrap.dedent('''
def verify_expert_tsv(package: Path, source_items: list[dict[str, Any]], review: dict[str, Any]) -> None:
    fields, rows = load_tsv(package / "expert-review-r1.tsv")
    required = {
        "id", "item_type", "duplicate_status", "terminal_classification",
        "evidence_use", "discrepancy_status", "review_note",
    }
    if not required.issubset(fields):
        fail(f"expert-review-r1.tsv missing fields: {sorted(required - set(fields))}")
    accepted_field = find_field(fields, ["accepted_duplicate_targets"], "expert-review-r1.tsv", required=False)
    implementation_field = find_field(fields, ["implementation_crosswalk_targets"], "expert-review-r1.tsv", required=False)
    if accepted_field is None and implementation_field is None:
        fail("expert-review-r1.tsv lacks target projections")
    ids = stable_ids(rows, "expert-review-r1.tsv")
    source_ids = [row["id"] for row in source_items]
    if ids != source_ids:
        fail("expert-review-r1.tsv IDs/order do not match source")
    review_by_id = {row["id"]: row for row in review["records"]}
    source_by_id = {row["id"]: row for row in source_items}
    for row in rows:
        item_id = row["id"]
        reviewed = review_by_id[item_id]
        source = source_by_id[item_id]
        if row["item_type"] != source["itemType"]:
            fail(f"expert TSV item type mismatch: {item_id}")
        if row["duplicate_status"] != reviewed["expert_duplicate_status"]:
            fail(f"expert TSV duplicate status mismatch: {item_id}")
        if row["terminal_classification"] != reviewed["terminal_ingress_classification"]:
            fail(f"expert TSV terminal classification mismatch: {item_id}")
        if row["evidence_use"] != reviewed["evidence_use_disposition"]:
            fail(f"expert TSV evidence-use mismatch: {item_id}")
        if row["review_note"] != reviewed["review_note"]:
            fail(f"expert TSV review note mismatch: {item_id}")
        expected_discrepancies = ";".join(value["status"] for value in reviewed["source_discrepancies"])
        if row["discrepancy_status"] != expected_discrepancies:
            fail(f"expert TSV discrepancy projection mismatch: {item_id}")
        accepted_paths = ";".join(target["path"] for target in reviewed["accepted_duplicate_targets"])
        if accepted_field is not None:
            if row[accepted_field] != accepted_paths:
                fail(f"expert TSV duplicate target mismatch: {item_id}")
        elif accepted_paths:
            fail(f"expert TSV omits accepted duplicate targets: {item_id}")
        implementation_paths = ";".join(
            target["path"] for target in reviewed.get("implementation_crosswalk_targets", [])
        )
        if implementation_field is not None:
            if row[implementation_field] != implementation_paths:
                fail(f"expert TSV implementation target mismatch: {item_id}")
        elif implementation_paths:
            fail(f"expert TSV omits implementation crosswalk targets: {item_id}")
''').lstrip()
verifier = verifier[:tsv_start] + new_tsv + verifier[tsv_end:]

verify_call = "    verify_integrity(root, package, package_relative, integrity, source_id, payload_hash)\n"
require(verify_call in verifier, "verify integrity call missing")
verifier = verifier.replace(
    verify_call,
    verify_call + "    runtime_crosswalk_ids = verify_runtime_crosswalk(root, package, source_id, payload_hash, source_items)\n",
    1,
)
review_call = "    verify_review(source, review, crossref, source_items, source_ids)\n"
require(review_call in verifier, "verify review call missing")
verifier = verifier.replace(
    review_call,
    review_call +
    "    reviewed_crosswalk_ids = {\n"
    '        row["id"] for row in review["records"] if row.get("implementation_crosswalk_targets")\n'
    "    }\n"
    "    if reviewed_crosswalk_ids != runtime_crosswalk_ids:\n"
    '        fail("reviewed implementation targets do not match the runtime-crosswalk packet")\n',
    1,
)
result_marker = '        "reviewed_replacements": review["summary"]["records_with_reviewed_replacements"],\n'
require(result_marker in verifier, "verification result marker missing")
verifier = verifier.replace(
    result_marker,
    result_marker + '        "runtime_crosswalk_records": len(runtime_crosswalk_ids),\n',
    1,
)
verifier_path.write_text(verifier, encoding="utf-8")

tests_path = ROOT / "tests/tooling/research/pedagogical-corpus-review.test.py"
tests = tests_path.read_text(encoding="utf-8")
constants_start = tests.index("WEEK14 = Path(")
constants_end = tests.index("\n\ndef write_json", constants_start)
constants = '''WEEK14 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W14-20260621")
WEEK15 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W15-20260628")
WEEK16 = Path("data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W16-20260705")
REGISTERED = {
    WEEK14: {"records": 61, "discrepancies": 6, "exact": 5, "runtime": 0},
    WEEK15: {"records": 65, "discrepancies": 4, "exact": 10, "runtime": 0},
    WEEK16: {"records": 59, "discrepancies": 11, "exact": 0, "runtime": 35},
}
'''
tests = tests[:constants_start] + constants.rstrip() + tests[constants_end:]
tests = tests.replace(
    'result["duplicate_status_counts"]["accepted_exact_duplicate"]',
    'result["duplicate_status_counts"].get("accepted_exact_duplicate", 0)',
    1,
)
reviewed_line = '                self.assertEqual(result["reviewed_replacements"], 0)\n'
require(reviewed_line in tests, "registered assertion marker missing")
tests = tests.replace(
    reviewed_line,
    '                self.assertEqual(result["runtime_crosswalk_records"], expected["runtime"])\n' + reviewed_line,
    1,
)
registered_insert = tests.index("\n\nclass PedagogicalCorpusReviewMutationTest")
focused_methods = textwrap.indent(textwrap.dedent(f'''
def test_week16_terminal_projection(self) -> None:
    review = json.loads((ROOT / WEEK16 / "review.json").read_text(encoding="utf-8"))
    self.assertEqual(
        review["summary"]["terminal_classification_counts"],
        {{
            "lexical_only_attestation": 35,
            "naturalness_review_candidate": 4,
            "new_corpus_attestation": 20,
        }},
    )
    self.assertEqual(review["summary"]["records_with_runtime_crosswalk"], 35)
    self.assertEqual(review["summary"]["records_with_source_discrepancies"], 11)

def test_week16_runtime_crosswalk_is_separate_from_duplicate_identity(self) -> None:
    source = json.loads((ROOT / WEEK16 / "source.json").read_text(encoding="utf-8"))
    review = json.loads((ROOT / WEEK16 / "review.json").read_text(encoding="utf-8"))
    runtime = json.loads((ROOT / WEEK16 / "runtime-crosswalk-r1.json").read_text(encoding="utf-8"))
    self.assertEqual(runtime["record_count"], 35)
    self.assertEqual(len(runtime["records"]), 35)
    self.assertTrue(all(row["expert_duplicate_status"] == "no_accepted_duplicate" for row in review["records"]))
    crosswalk_rows = [row for row in review["records"] if row["implementation_crosswalk_targets"]]
    self.assertEqual(len(crosswalk_rows), 35)
    source_by_id = {{row["id"]: row for row in source["items"]}}
    difference_surfaces = {{
        source_by_id[row["id"]]["source"]["traditional"]
        for row in crosswalk_rows
        if row["evidence_use_disposition"] == "lexical_attestation_with_runtime_crosswalk_and_source_difference"
    }}
    self.assertEqual(difference_surfaces, {{"煮嘢食", "畫畫", "釣魚", "下棋", "行公園"}})
    park = next(row for row in review["records"] if row["id"].endswith("I033"))
    self.assertEqual(park["source_discrepancies"][0]["status"], {COMPONENT_STATUS!r})
'''), "    ")
tests = tests[:registered_insert] + "\n" + focused_methods.rstrip() + tests[registered_insert:]

main_insert = tests.index('\n\nif __name__ == "__main__":')
mutation_class = textwrap.dedent('''
class Week16RuntimeCrosswalkMutationTest(unittest.TestCase):
    def setUp(self) -> None:
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        shutil.copytree(ROOT / WEEK16, self.root / WEEK16, dirs_exist_ok=True)
        lock_target = self.root / VERIFIER.SOURCE_LOCKS_RELATIVE
        lock_target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / VERIFIER.SOURCE_LOCKS_RELATIVE, lock_target)
        provenance = self.root / "docs/research/GLOSSIKA-WEEK16-LEXICON-PROVENANCE.md"
        provenance.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(ROOT / "docs/research/GLOSSIKA-WEEK16-LEXICON-PROVENANCE.md", provenance)

    def tearDown(self) -> None:
        self.temp.cleanup()

    def verify(self):
        return VERIFIER.verify(self.root, WEEK16, check_deterministic_crossref=False)

    def test_runtime_crosswalk_identity_drift_fails(self) -> None:
        path = self.root / WEEK16 / "runtime-crosswalk-r1.json"
        packet = json.loads(path.read_text(encoding="utf-8"))
        packet["runtime_merge_commit"] = "0" * 40
        write_json(path, packet)
        with self.assertRaisesRegex(AssertionError, "implementation identity mismatch"):
            self.verify()

    def test_fabricated_implementation_target_fails(self) -> None:
        path = self.root / WEEK16 / "review.json"
        review = json.loads(path.read_text(encoding="utf-8"))
        row = next(record for record in review["records"] if record["implementation_crosswalk_targets"])
        row["implementation_crosswalk_targets"][0]["path"] = "data/invented-runtime-owner.json"
        write_json(path, review)
        with self.assertRaisesRegex(AssertionError, "implementation crosswalk target is not evidence-backed"):
            self.verify()
''').lstrip()
tests = tests[:main_insert] + "\n\n" + mutation_class.rstrip() + tests[main_insert:]
tests_path.write_text(tests, encoding="utf-8")

package_path = ROOT / "package.json"
package_json = load_json(package_path)
command = package_json["scripts"]["verify:pedagogical-corpus-review"]
week16_arg = "--package data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W16-20260705"
if week16_arg not in command:
    command = command.replace(" --check-deterministic-crossref", f" {week16_arg} --check-deterministic-crossref")
package_json["scripts"]["verify:pedagogical-corpus-review"] = command
write_json(package_path, package_json)

profiles_path = ROOT / "config/verification-profiles.json"
profiles = load_json(profiles_path)
pedagogical = next(row for row in profiles["profiles"]["research"] if row["id"] == "pedagogical-corpus-review")
if str(PACKAGE_REL) not in pedagogical["command"]:
    index = pedagogical["command"].index("--check-deterministic-crossref")
    pedagogical["command"][index:index] = ["--package", str(PACKAGE_REL)]
write_json(profiles_path, profiles)

report = '''# Glossika Week 16 corpus-ingress final review

- Source ID: `GLOSSIKA-YUEHK-A1-W16-20260705`
- Intake: #133
- Original source ingress: #274 / merged PR #275
- Runtime lexical coverage: #119 / merged PR #121
- Completed review: #475 / PR #476
- Status: 59-record expert review complete; awaiting merge approval

## Terminal outcome

- 59 of 59 records reviewed;
- 35 lexical-only attestations with separate implementation crosswalk targets;
- 20 new sentence, dialog, or pronunciation attestations;
- 4 naturalness/register review candidates;
- 59 records with no accepted corpus-duplicate owner;
- 35 records linked to the merged runtime implementation;
- 11 records with explicit source discrepancies;
- 0 reviewed source replacements.

Runtime representation remains separate from corpus duplicate identity. PR #121 establishes bounded implementation and lexical coverage only; it does not automatically validate Glossika readings, glosses, segmentation, lexical category, naturalness, or corpus ownership.

## Source/runtime reconciliation

Five lexical differences remain explicit without rewriting the source:

- `釣魚`: source `diu3 jyu2` versus reviewed runtime 魚 `jyu4`;
- `畫畫`: verbal/noun distinction `waak6 waa2`;
- `行公園`: embedded `公園` defaults to changed-tone `gung1 jyun2`, with `gung1 jyun4` retained as a review variant;
- `煮嘢食`: phrase-local food-object tokenization preserves global 嘢食 behavior;
- `下棋`: reviewed runtime reading `haa5 kei2`.

The six phonics rows remain unverified pedagogical pronunciation material. The `/ɔː/ versus /uː/` heading is not adopted as a verified description of every pair.

## Nonlexical boundary

Four formula/register records remain independent speaker or corpus review candidates. Other sentence and dialog records remain pedagogical attestations. Source register labels and generic negation prose are not adopted as unrestricted Cantonese rules.

## Permanent integrity

The shared verifier protects immutable source hashes; all source/review/TSV IDs, hashes, order, and dispositions; the 35-record PR #121 crosswalk; separation of duplicate and implementation targets; evidence-backed implementation paths; discrepancy projections; deterministic candidates; and package documentation.

Week 16 is registered with Weeks 14 and 15 in npm, the research profile, focused mutation tests, and the path-scoped research workflow.

## Protected state

No parser behavior, runtime lexicon/version, construction identity/status, native-panel evidence, survey state, release state, deployment state, or merge authorization changes.
'''
(ROOT / "docs/research/GLOSSIKA-YUEHK-A1-W16-20260705-CORPUS-INGRESS.md").write_text(report, encoding="utf-8")
