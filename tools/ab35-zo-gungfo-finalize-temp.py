#!/usr/bin/env python3
from pathlib import Path
import json
import subprocess

BASE = "414f5e0ab309c28e627abad3df24da7663053f4e"
BRANCH = "agent/ab35-rehome-zo-gungfo-r2"
EXPECTED_LEGACY = [
    '食飯','煮飯','摘芒果','買嘢','食嘢','飲水','寫字','寫名','睇書','聽歌','睇戲','跑步','影相','打機','煮嘢食','唱K','做運動','踢波','打波','彈琴','釣魚','唱歌','睇波','下棋','講嘢','打電話','打籃球','聽電話','返學','放學','瞓覺','洗手','曬太陽','打麻雀','默書','炒股票','發脾氣','食意粉','Book枱'
]
TARGET_REGRESSIONS = {"REG-0062", "REG-0221", "REG-0222", "REG-0268"}


def run(*args, capture=False):
    print("+", " ".join(args), flush=True)
    if capture:
        return subprocess.check_output(args, text=True).strip()
    subprocess.run(args, check=True)


def replace_once(path, old, new):
    p = Path(path)
    text = p.read_text()
    count = text.count(old)
    assert count == 1, (path, count, old[:160])
    p.write_text(text.replace(old, new, 1))


# Exact-main safety: preserve the merged AA84 #773 evidence/readiness baseline.
run("git", "fetch", "origin", "main")
assert run("git", "rev-parse", "origin/main", capture=True) == BASE
assert run("git", "branch", "--show-current", capture=True) == BRANCH

# 1. Remove only 做功課 from the unresolved legacy ProductiveVO compatibility table.
p = Path("src/runtime-resources/lexicon/productive-vo.js")
text = p.read_text()
needle = '  ["做功課", { verb: "做", object: "功課", label: "VP", type: "ProductiveVO" }],\n'
assert text.count(needle) == 1
p.write_text(text.replace(needle, "", 1))

# 2. ProductiveVO fixture: REG-0062 no longer contains ProductiveVO; add explicit bare absence.
p = Path("tests/constructions/ProductiveVO.json")
spec = json.loads(p.read_text())
removed = [row for row in spec.get("snapshot_cases", []) if row.get("case_id") == "REG-0062"]
assert len(removed) == 1
spec["snapshot_cases"] = [row for row in spec.get("snapshot_cases", []) if row.get("case_id") != "REG-0062"]
assert not any(row.get("case_id") == "AB35-ZGF-B01" for row in spec.get("focused_cases", []))
spec.setdefault("focused_cases", []).append({
    "case_id": "AB35-ZGF-B01",
    "source": "做功課。",
    "class": "ordinary_predicate_object_rehomed_to_ab78",
    "expected_profile": "legacy ProductiveVO compatibility ownership absent; typed TransitiveVP owns 做 + 功課",
    "assertion": "construction_absent",
    "provenance": "docs/research/ISSUE-750-AB35-OWNERSHIP-REMOVAL-DISPOSITION-R1.md"
})

# 3. TransitiveVP fixture: make the accepted AB78 owner explicit.
p = Path("tests/constructions/TransitiveVP.json")
spec = json.loads(p.read_text())
assert not any(row.get("case_id") == "AB78-ZGF-P01" for row in spec.get("focused_cases", []))
spec.setdefault("focused_cases", []).append({
    "case_id": "AB78-ZGF-P01",
    "source": "做功課。",
    "class": "ordinary_predicate_object_rehomed_from_ab35_compatibility",
    "expected_profile": "typed action verb 做 plus overt object NP 功課",
    "assertion": "construction_present",
    "provenance": "docs/research/ISSUE-750-AB35-OWNERSHIP-REMOVAL-DISPOSITION-R1.md"
})
p.write_text(json.dumps(spec, ensure_ascii=False, indent=2) + "\n")

# 4. Synchronize the earlier #761 seed regression with the newly reviewed 39-entry remainder.
replace_once(
    "tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js",
    "  assert.equal(legacy.length, 40);",
    "  assert.equal(legacy.length, 39);"
)
replace_once(
    "tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js",
    '  assert.equal(productiveRows("做功課。").some((row) => row.trace_detail.kind === "generative_template"), true);',
    '  assert.equal(productiveRows("做功課。").length, 0);'
)

# 5. Permanent focused ownership contract.
Path("tests/tooling/runtime/ab35-zo-gungfo-rehome.test.js").write_text(r'''"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const legacy = require("../../../src/runtime-resources/lexicon/productive-vo");
const compounds = require("../../../src/runtime-resources/lexicon/verb-object-compounds");
const { loadRuntimeApi, internalConstruction, rowSurface } = require("../../lib/runtime-api");

const api = loadRuntimeApi();
const EXPECTED_LEGACY = [
  "食飯","煮飯","摘芒果","買嘢","食嘢","飲水","寫字","寫名","睇書","聽歌","睇戲","跑步","影相","打機","煮嘢食","唱K","做運動","踢波","打波","彈琴","釣魚","唱歌","睇波","下棋","講嘢","打電話","打籃球","聽電話","返學","放學","瞓覺","洗手","曬太陽","打麻雀","默書","炒股票","發脾氣","食意粉","Book枱"
];
function rows(source) { return api.diagnosticFinalRows(api.analyzeLine(source)).filter((row) => row.kind === "construction"); }
function byType(source, type) { return rows(source).filter((row) => internalConstruction(row) === type); }
function bindingMap(row) { return Object.fromEntries(Array.from(row.trace_detail && row.trace_detail.bindings || []).map((binding) => [binding.slot, binding.source_surface])); }

test("做功課 is removed only from legacy AB35/ProductiveVO compatibility ownership", () => {
  assert.deepEqual(legacy.map(([surface]) => surface), EXPECTED_LEGACY);
  assert.equal(legacy.length, 39);
  assert.equal(legacy.some(([surface]) => surface === "做功課"), false);
  assert.deepEqual(compounds.map(([surface]) => surface), ["飲茶", "游水", "沖涼"]);
});

test("bare 做功課 is typed AB78 with an ordinary overt object binding", () => {
  assert.equal(byType("做功課。", "ProductiveVO").length, 0);
  const transitive = byType("做功課。", "TransitiveVP");
  assert.equal(transitive.length, 1);
  assert.equal(rowSurface(transitive[0]), "做功課");
  assert.equal(transitive[0].trace_detail.kind, "generative_template");
  const bindings = bindingMap(transitive[0]);
  assert.equal(bindings.action_verb, "做");
  assert.equal(bindings.object, "功課");
  assert.equal(transitive[0].slots.includes("object"), true);
});

test("outer sequence composition keeps AB78 ownership of 做功課 without stealing 食飯", () => {
  const transitive = byType("再做功課。", "TransitiveVP");
  assert.equal(transitive.length, 1);
  assert.equal(rowSurface(transitive[0]), "做功課");
  assert.notEqual(transitive[0].internal_parent || transitive[0].parent, "", "sequence material must remain outside the AB78 VP");
  assert.equal(byType("再做功課。", "ProductiveVO").length, 0);

  const mixed = rows("我先食飯，再做功課。");
  const productives = mixed.filter((row) => internalConstruction(row) === "ProductiveVO");
  assert.equal(productives.some((row) => rowSurface(row) === "食飯"), true);
  assert.equal(productives.some((row) => rowSurface(row) === "做功課"), false);
  assert.equal(mixed.filter((row) => internalConstruction(row) === "TransitiveVP" && rowSurface(row) === "做功課").length, 1);
});

test("the three source-linked AB35 seeds remain unchanged", () => {
  for (const surface of ["飲茶", "游水", "沖涼"]) {
    const matches = byType(`${surface}。`, "ProductiveVO").filter((row) => row.trace_detail && row.trace_detail.kind === "source_linked_runtime_matcher");
    assert.equal(matches.length, 1, surface);
    assert.equal(matches[0].trace_detail.matcher_variant_id, "ProductiveVO.source_linked_verb_object_compound_seed");
    assert.equal(Array.from(matches[0].trace_detail.bindings || []).length, 0);
  }
});

test("representative unresolved legacy entries stay on the legacy ProductiveVO path", () => {
  for (const surface of ["食飯", "打電話", "打籃球"]) {
    const matches = byType(`${surface}。`, "ProductiveVO");
    assert.equal(matches.length, 1, surface);
    assert.equal(matches[0].trace_detail.kind, "generative_template");
    assert.equal(matches[0].trace_detail.matcher_variant_id, "ProductiveVO.legacy_whitelist_object_relation");
  }
});
''')
replace_once(
    "tests/run-all.js",
    '["ab35_verb_object_compound_boundary", path.join(root, "tests", "tooling", "runtime", "ab35-verb-object-compound-boundary.test.js")],',
    '["ab35_verb_object_compound_boundary", path.join(root, "tests", "tooling", "runtime", "ab35-verb-object-compound-boundary.test.js")],\n  ["ab35_zo_gungfo_rehome", path.join(root, "tests", "tooling", "runtime", "ab35-zo-gungfo-rehome.test.js")],'
)

# 6. Runtime semver: construction ownership changes, release/deployment state does not.
run("npm", "version", "0.5.225", "--no-git-tag-version")
replace_once(
    "src/plugin-entry.js",
    'const CANTO_SPAN_RUNTIME_VERSION = "0.5.224";',
    'const CANTO_SPAN_RUNTIME_VERSION = "0.5.225";\n// v0.5.225: removes 做功課 from legacy AB35/ProductiveVO compatibility ownership and preserves it through the accepted AB78 typed predicate-object path; the three source-linked AB35 seeds and other 39 legacy entries remain unchanged.'
)
replace_once("manifest.json", '"version": "0.5.224",', '"version": "0.5.225",')
replace_once(
    "manifest.json",
    '"description": "v0.5.224 starts the source-linked AB35 VerbObjectCompound migration for 飲茶, 游水, and 沖涼 without automatic object binding."',
    '"description": "v0.5.225 rehomes 做功課 from legacy AB35/ProductiveVO compatibility ownership to the typed AB78 predicate-object path."'
)
run("npm", "run", "build:runtime")

# 7. Rebaseline exactly the four already-probed transition snapshots using the canonical signature code.
update_js = Path("tests/ab35-zo-gungfo-update-regression-temp.js")
update_js.write_text(r'''"use strict";
const fs = require("fs");
const path = require("path");
let runner = fs.readFileSync(path.join(__dirname, "run-regression.js"), "utf8").replace(/^#!.*\n/, "");
const marker = 'const root = path.resolve(__dirname, "..");';
const prefix = runner.slice(0, runner.indexOf(marker));
const custom = String.raw`
const api = loadRuntimeApi();
const fixturePath = path.join(__dirname, "fixtures", "regression-snapshots.json");
const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
const ids = new Set(["REG-0062", "REG-0221", "REG-0222", "REG-0268"]);
let updated = 0;
for (const testCase of fixture.cases) {
  if (!ids.has(testCase.id || testCase.case_id)) continue;
  testCase.expected = JSON.parse(JSON.stringify(signature(api, testCase.source, testCase.context_source || null)));
  testCase.accepted_transition = "v0.5.225_ab35_zo_gungfo_rehome_to_ab78";
  testCase.transition_reason = "做功課 now composes through the accepted typed TransitiveVP predicate-object path instead of legacy ProductiveVO compatibility ownership; surrounding sequence structure is preserved.";
  updated += 1;
}
if (updated !== 4) throw new Error("expected exactly four regression transitions, got " + updated);
fixture.runtime_version = api.runtimeVersion;
fixture.last_intentional_transition = "v0.5.225_ab35_zo_gungfo_rehome_to_ab78";
fs.writeFileSync(fixturePath, JSON.stringify(fixture, null, 2) + String.fromCharCode(10));
console.log(JSON.stringify({updated, runtime_version: api.runtimeVersion}, null, 2));
`;
eval(prefix + custom);
''')
run("node", str(update_js))
update_js.unlink()

# 8. Canonical deterministic projections from the post-#773 evidence baseline.
run("node", "tools/build-construction-tests.js")
run("node", "tools/sync-construction-test-metadata.js")
run("npm", "run", "discovery:generate")
idx = json.loads(Path("tests/construction-test-index.json").read_text())
assert sum(row.get("executable_case_count", 0) for row in idx.get("files", [])) == 1639

# 9. Sole present-tense project snapshot: only derived runtime/count/compatibility consequences.
replace_once("docs/current/PROJECT-STATE.md", "| Runtime | v0.5.224 |", "| Runtime | v0.5.225 |")
replace_once("docs/current/PROJECT-STATE.md", "other 40 legacy `ProductiveVO` compatibility entries", "other 39 legacy `ProductiveVO` compatibility entries")
replace_once("docs/current/PROJECT-STATE.md", "remaining 40-entry compatibility route", "remaining 39-entry compatibility route")
replace_once("docs/current/PROJECT-STATE.md", "per-construction assertions: **1,634** across **134** files;", "per-construction assertions: **1,639** across **134** files;")
replace_once("docs/current/PROJECT-STATE.md", "| Per-construction assertions | 1,634 |", "| Per-construction assertions | 1,639 |")
anchor = "Current consequences include:\n\n"
bullet = "- `做功課` is no longer owned by the legacy AB35/ProductiveVO compatibility whitelist at v0.5.225; it remains recognized through the accepted AB78 `TransitiveVP` typed `做 + 功課` predicate-object path, while no disposition is inferred for the other 39 unresolved legacy entries;\n"
replace_once("docs/current/PROJECT-STATE.md", anchor, anchor + bullet)

# 10. Full acceptance gates.
run("node", "tests/tooling/runtime/ab35-zo-gungfo-rehome.test.js")
run("node", "tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js")
run("npm", "run", "test:regression")
run("npm", "run", "test:constructions")
run("npm", "run", "verify:runtime")
run("npm", "run", "audit:parser-architecture", "--", "--json")
run("npm", "run", "verify")
run("npm", "run", "verify:research")
run("npm", "run", "verify:identities")
run("npm", "run", "verify:discovery")
run("npm", "run", "test:coordination")
run("git", "diff", "--check")

# 11. Explicit protected-state checks.
check_js = """
const legacy = require('./src/runtime-resources/lexicon/productive-vo');
const seed = require('./src/runtime-resources/lexicon/verb-object-compounds');
const expected = %s;
if (JSON.stringify(legacy.map(([surface]) => surface)) !== JSON.stringify(expected)) throw new Error('legacy ProductiveVO membership/order changed beyond 做功課 removal');
if (JSON.stringify(seed.map(([surface]) => surface)) !== JSON.stringify(['飲茶','游水','沖涼'])) throw new Error('AB35 seed membership changed');
""" % json.dumps(EXPECTED_LEGACY, ensure_ascii=False)
run("node", "-e", check_js)

# Preserve the just-merged AA84 evidence state through discovery regeneration.
readiness = json.loads(Path("data/construction-candidate-readiness.json").read_text())
aa84 = next((row for row in readiness.get("candidates", []) if row.get("code") == "AA84" or row.get("short_code") == "AA84"), None)
if aa84 is None:
    aa84 = next((row for row in readiness.get("records", []) if row.get("code") == "AA84" or row.get("short_code") == "AA84"), None)
assert aa84 is not None
serialized_aa84 = json.dumps(aa84, ensure_ascii=False)
assert 'reviewed_genuine_corpus_hits' in serialized_aa84 and '3/14 genuine' in serialized_aa84, aa84

# Recheck current main immediately before any branch-history write.
run("git", "fetch", "origin", "main")
assert run("git", "rev-parse", "origin/main", capture=True) == BASE, "main moved during finalization; rebase required"

# 12. Remove all temporary transport/validation before the permanent commit.
for temp in [
    ".github/workflows/ab35-zo-gungfo-finalize-temp.yml",
    "tools/ab35-zo-gungfo-finalize-temp.py",
    "tests/ab35-zo-gungfo-update-regression-temp.js",
]:
    Path(temp).unlink(missing_ok=True)
run("git", "checkout", "--", "validation/current")
subprocess.run(["git", "clean", "-fd", "validation/current"], check=True)

rows = subprocess.check_output(["git", "status", "--porcelain"], text=True).splitlines()
got = {row[3:] for row in rows if len(row) >= 4}
assert not any(path.startswith("external-evidence/aa84") or path.startswith("review-packets/corpus-review/AA84") or path == "grammar/research_pending/MannerAdverbialVP.md" for path in got), sorted(got)
assert not any(path.startswith(".github/workflows/ab35-zo-gungfo") or path == "tools/ab35-zo-gungfo-finalize-temp.py" or path == "tests/ab35-zo-gungfo-update-regression-temp.js" for path in got), sorted(got)
required = {
    "src/runtime-resources/lexicon/productive-vo.js", "src/plugin-entry.js",
    "tests/constructions/ProductiveVO.json", "tests/constructions/TransitiveVP.json",
    "tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js",
    "tests/tooling/runtime/ab35-zo-gungfo-rehome.test.js", "tests/run-all.js",
    "tests/fixtures/regression-snapshots.json", "package.json", "package-lock.json", "manifest.json",
    "main.js", "tests/construction-test-index.json", "grammar/research_pending/ProductiveVO.md",
    "grammar/research_pending/TransitiveVP.md", "data/construction-candidate-readiness.json", "docs/current/PROJECT-STATE.md",
}
assert required <= got, (sorted(required - got), sorted(got))

run("git", "config", "user.name", "Canto Span scoped automation")
run("git", "config", "user.email", "actions@users.noreply.github.com")
run("git", "add", "-A")
run("git", "commit", "-m", "Rehome 做功課 to typed AB78 ownership")
run("git", "push", "origin", f"HEAD:{BRANCH}")
