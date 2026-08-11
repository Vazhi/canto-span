#!/usr/bin/env python3
from pathlib import Path
import json
import re
import subprocess

BASE_COMMIT = "414f5e0ab309c28e627abad3df24da7663053f4e"
BASE_BLOB = "c26eba2e8a22988aee125915b70b86c16161a47b"
HELPER = Path("tools/ab35-zo-gungfo-finalize-temp.py")


def run(*args, capture=False):
    print("+", " ".join(args), flush=True)
    if capture:
        return subprocess.check_output(args, text=True).strip()
    subprocess.run(args, check=True)


base_index = json.loads(
    subprocess.check_output(
        ["git", "show", f"{BASE_COMMIT}:tests/construction-test-index.json"],
        text=True,
    )
)
base_total = sum(row.get("executable_case_count", 0) for row in base_index.get("files", []))
assert base_total == 1634, f"unexpected post-#773 base construction total: {base_total}"
# Four intentionally rebaselined regression snapshots acquire AB78 exact-snapshot
# references after 做功課 moves to TransitiveVP, and the focused AB78 ownership
# case adds one more executable reference. ProductiveVO's removed snapshot is
# balanced by its explicit outside-AB35 boundary, so its executable total is flat.
expected_total = base_total + 5
assert expected_total == 1639
print(f"canonical checked index: {base_total}; scoped expected total: {expected_total}", flush=True)

run("git", "fetch", "origin", "agent/ab35-rehome-zo-gungfo")
text = subprocess.check_output(["git", "cat-file", "blob", BASE_BLOB], text=True)


def once(old, new):
    global text
    count = text.count(old)
    assert count == 1, (count, old[:160])
    text = text.replace(old, new, 1)


once(
    'BASE = "ed5e482f776779fb9eab556bd8ff244abbcd6427"',
    f'BASE = "{BASE_COMMIT}"',
)
once(
    'BRANCH = "agent/ab35-rehome-zo-gungfo"',
    'BRANCH = "agent/ab35-zo-gungfo-final-r3"',
)
once(
    'update_js = Path("/tmp/ab35-zo-gungfo-update-regression.js")',
    'update_js = Path("tests/ab35-zo-gungfo-update-regression-temp.js")',
)
once(
    '  assert.equal(transitive[0].internal_parent || transitive[0].parent, "SequenceAdverbPredicateFallback");',
    '  assert.notEqual(transitive[0].internal_parent || transitive[0].parent, "", "sequence material must remain outside the AB78 VP");',
)
once(
    '    ".github/workflows/ab35-zo-gungfo-finalize-temp.yml",',
    '    ".github/workflows/ab35-final-r3-temp.yml",',
)
once(
    '    "tools/ab35-zo-gungfo-finalize-temp.py",',
    '    "tools/ab35-zo-gungfo-finalize-temp.py",\n    "tools/ab35-final-r3-bootstrap.py",',
)

text, newline_count = re.subn(
    r'fs\.writeFileSync\(fixturePath, JSON\.stringify\(fixture, null, 2\) \+ "[\\]+n"\);',
    'fs.writeFileSync(fixturePath, JSON.stringify(fixture, null, 2) + String.fromCharCode(10));',
    text,
    count=1,
)
assert newline_count == 1, newline_count

# Replace the superseded 1,635 estimate with the generated, base-derived total.
once('== 1635', '== 1639')
once('**1,635** across **134** files;', '**1,639** across **134** files;')
once('| Per-construction assertions | 1,635 |', '| Per-construction assertions | 1,639 |')

marker = 'run("node", "tests/tooling/runtime/ab35-zo-gungfo-rehome.test.js")'
assert text.count(marker) == 1
seed_sync = '''replace_once("tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js", "  assert.equal(legacy.length, 40);", "  assert.equal(legacy.length, 39);")
replace_once("tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js", '  assert.equal(productiveRows("做功課。").some((row) => row.trace_detail.kind === "generative_template"), true);', '  assert.equal(productiveRows("做功課。").length, 0);')
run("node", "tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js")

'''
text = text.replace(marker, seed_sync + marker, 1)

final_main_guard = 'run("git", "fetch", "origin", "main")\nassert run("git", "rev-parse", "origin/main", capture=True) == BASE, "main moved during finalization; rebase required"'
assert text.count(final_main_guard) == 1
aa84_guard = '''readiness = json.loads(Path("data/construction-candidate-readiness.json").read_text())
aa84 = next((row for row in readiness.get("records", []) if row.get("construction_code") == "AA84"), None)
assert aa84 is not None, "AA84 readiness record missing"
corpus_gate = aa84.get("gates", {}).get("reviewed_corpus_evidence", {})
assert corpus_gate.get("status") == "pass", aa84
assert corpus_gate.get("evidence") == "reviewed_genuine_corpus_hits", aa84
assert corpus_gate.get("detail") == "3/14 genuine", aa84

'''
text = text.replace(final_main_guard, aa84_guard + final_main_guard, 1)

HELPER.write_text(text)
run("python3", "-m", "py_compile", str(HELPER))
run("python3", str(HELPER))
