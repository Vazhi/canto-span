#!/usr/bin/env python3
from pathlib import Path
import json
import subprocess
import sys

BASE_MAIN = "352b34df0c8a64f1595a0bdfe4ecb75583d3ce83"
BRANCH = "agent/ab35-verb-object-compound-seed"


def run(*args, capture=False):
    print("+", " ".join(args), flush=True)
    return subprocess.run(args, check=True, text=True, capture_output=capture)


def replace_once(path, old, new):
    p = Path(path)
    text = p.read_text()
    count = text.count(old)
    if count != 1:
        raise AssertionError(f"{path}: expected one occurrence, found {count}: {old[:120]!r}")
    p.write_text(text.replace(old, new, 1))


run("git", "fetch", "origin", "main")
actual_main = run("git", "rev-parse", "origin/main", capture=True).stdout.strip()
assert actual_main == BASE_MAIN, (actual_main, BASE_MAIN)

# 1. Split only the three approved AB35 seeds out of the broad compatibility table.
p = Path("src/runtime-resources/lexicon/productive-vo.js")
text = p.read_text()
for surface in ["飲茶", "游水", "沖涼"]:
    matches = [line for line in text.splitlines() if f'["{surface}"' in line]
    assert len(matches) == 1, (surface, matches)
    text = text.replace(matches[0] + "\n", "", 1)
p.write_text(text)
remaining = [line for line in text.splitlines() if line.lstrip().startswith('["')]
assert len(remaining) == 40, len(remaining)

Path("src/runtime-resources/lexicon/verb-object-compounds.js").write_text('''"use strict";

// Source-linked seed for canonical AB35 VerbObjectCompound.
// Membership is lexical/item-specific. This table does not license arbitrary V+noun generation
// or an ordinary semantic object relation between the visible components.
module.exports = [
  ["飲茶", { verb: "飲", object: "茶", label: "VP", type: "ProductiveVO", source_specification: "docs/research/ISSUE-753-AB35-LEXICAL-VO-RUNTIME-CONTRACT-R1.md" }],
  ["游水", { verb: "游", object: "水", label: "VP", type: "ProductiveVO", source_specification: "docs/research/ISSUE-753-AB35-LEXICAL-VO-RUNTIME-CONTRACT-R1.md" }],
  ["沖涼", { verb: "沖", object: "涼", label: "VP", type: "ProductiveVO", source_specification: "docs/research/ISSUE-753-AB35-LEXICAL-VO-RUNTIME-CONTRACT-R1.md" }],
];
''')

# 2. Validate the new closed lexical resource.
replace_once(
    "src/runtime-resources/lexicon/validate.js",
    'const productiveVoEntries = require("./productive-vo");',
    'const productiveVoEntries = require("./productive-vo");\nconst verbObjectCompoundEntries = require("./verb-object-compounds");',
)
anchor = '''  const productiveVoCount = validateEntryTable("productive VO", productiveVoEntries, (surface, value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`productive VO ${surface} must map to an object`);
    for (const key of ["verb", "object", "label", "type"]) assertNonEmptyString(value[key], `productive VO ${surface} ${key}`);
  });
'''
addition = anchor + '''  const verbObjectCompoundCount = validateEntryTable("verb object compounds", verbObjectCompoundEntries, (surface, value) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error(`verb object compound ${surface} must map to an object`);
    for (const key of ["verb", "object", "label", "type", "source_specification"]) assertNonEmptyString(value[key], `verb object compound ${surface} ${key}`);
  });
'''
replace_once("src/runtime-resources/lexicon/validate.js", anchor, addition)
replace_once(
    "src/runtime-resources/lexicon/validate.js",
    "productive_vo_entries: productiveVoCount.entries,",
    "productive_vo_entries: productiveVoCount.entries,\n    verb_object_compound_entries: verbObjectCompoundCount.entries,",
)

# 3. Add the exact source-linked template before broad ProductiveVO compatibility.
replace_once(
    "src/runtime-resources/grammar/templates/category-span-templates.js",
    'const PRODUCTIVE_VO = Object.fromEntries(require("../../lexicon/productive-vo"));',
    'const PRODUCTIVE_VO = Object.fromEntries(require("../../lexicon/productive-vo"));\nconst VERB_OBJECT_COMPOUNDS = Object.fromEntries(require("../../lexicon/verb-object-compounds"));',
)
legacy_template = '''  {
    type: "ProductiveVO",
    label: "VP",
    template: ["action_verb!", "object!"],
    template_family: "generative_template",
    constraints: {
      surface_sequence_in: Object.keys(PRODUCTIVE_VO)
    },
    role_overrides: {
      action_verb: { label: "doing", syntax: "verb", note: "Action verb heading a productive verb-object VP." },
      object: { label: "what", syntax: "object", note: "Object noun inside a productive verb-object VP." }
    },
    output_slots: ["productive_vo", "vp", "action_vp", "predicate", "object"],
    note: "Slot-template ProductiveVO: generated action_verb + object pair, constrained to reviewed productive VO sequences while preserving visible children."
  },
'''
seed_template = '''  {
    type: "ProductiveVO",
    label: "VP",
    template: ["action_verb!", "object!"],
    trace_kind: "source_linked_runtime_matcher",
    trace_assigned_slots: [],
    constraints: {
      surface_sequence_in: Object.keys(VERB_OBJECT_COMPOUNDS)
    },
    output_slots: ["productive_vo", "verb_object_compound", "vp", "action_vp", "predicate"],
    structural_scope: "vp",
    lexical_compound_profile: "contiguous_source_linked_seed",
    source_specification: "docs/research/ISSUE-753-AB35-LEXICAL-VO-RUNTIME-CONTRACT-R1.md",
    not_claims: [
      "not_generic_verb_plus_noun_productivity",
      "not_ordinary_object_relation_from_component_order",
      "not_generic_separability_licensing"
    ],
    note: "Source-linked AB35 VerbObjectCompound seed: exact reviewed contiguous lexical compounds with visible components but no compound-internal ordinary semantic object binding."
  },
'''
replace_once(
    "src/runtime-resources/grammar/templates/category-span-templates.js",
    legacy_template,
    seed_template + legacy_template,
)

# 4. Preserve lexical component segmentation while separating semantic binding from matching slots.
replace_once(
    "src/plugin-entry.js",
    'const PRODUCTIVE_VO = Object.fromEntries(require("./runtime-resources/lexicon/productive-vo"));',
    'const PRODUCTIVE_VO = Object.fromEntries(require("./runtime-resources/lexicon/productive-vo"));\nconst VERB_OBJECT_COMPOUNDS = Object.fromEntries(require("./runtime-resources/lexicon/verb-object-compounds"));\nconst PRODUCTIVE_VO_COMPONENT_RULES = Object.freeze({ ...PRODUCTIVE_VO, ...VERB_OBJECT_COMPOUNDS });',
)
replace_once(
    "src/plugin-entry.js",
    'const PRODUCTIVE_TERMS = Object.keys(PRODUCTIVE_VO).sort((a, b) => b.length - a.length || a.localeCompare(b));',
    'const PRODUCTIVE_TERMS = Object.keys(PRODUCTIVE_VO_COMPONENT_RULES).sort((a, b) => b.length - a.length || a.localeCompare(b));',
)
replace_once(
    "src/plugin-entry.js",
    "const rule = PRODUCTIVE_VO[surface];",
    "const rule = PRODUCTIVE_VO_COMPONENT_RULES[surface];",
)
old_category = '''      const assignedSlots = assignments.map((item) => item.slot);
      const traceDetail = {
        construction_type: template.type,
        template_family: templateFamilyForDefinition(template),
        template: template.template,
        constraints: template.constraints || {},
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        role_overrides: template.role_overrides || {},
        subspan: true,
      };
'''
new_category = '''      const matchingSlots = assignments.map((item) => item.slot);
      const traceKind = template.trace_kind || "generative_template";
      const assignedSlots = Object.prototype.hasOwnProperty.call(template, "trace_assigned_slots")
        ? cleanSlots(template.trace_assigned_slots || [])
        : matchingSlots;
      const traceDetail = {
        construction_type: template.type,
        template: template.template,
        constraints: template.constraints || {},
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        role_overrides: template.role_overrides || {},
        subspan: true,
      };
      if (traceKind === "generative_template" || traceKind === "construction_template") {
        traceDetail.template_family = templateFamilyForDefinition(template);
      }
'''
# This block occurs once in templateConstructionFor and once in categorySubspanFor.
# Only the category-subspan occurrence is changed because AB35 lives in CATEGORY_SPAN_TEMPLATES.
p = Path("src/plugin-entry.js")
text = p.read_text()
assert text.count(old_category) == 2, text.count(old_category)
first = text.find(old_category)
second = text.find(old_category, first + len(old_category))
text = text[:second] + new_category + text[second + len(old_category):]
old_note = 'note: `${template.note} Matched by generated category slots: ${assignedSlots.join(" → ")}.`,'
assert text.count(old_note) == 1
text = text.replace(old_note, 'note: `${template.note} Matched by generated category slots: ${matchingSlots.join(" → ")}.`,', 1)
category_trace = '''        trace: traceInfo("generative_template", traceDetail),
      });
    }
  }
  return null;
}







function shouldDeferPostverbalZoForFollowingComplement'''
assert text.count(category_trace) == 1
text = text.replace(category_trace, '''        trace: traceInfo(traceKind, traceDetail),
      });
    }
  }
  return null;
}







function shouldDeferPostverbalZoForFollowingComplement''', 1)
p.write_text(text)

# 5. Pass source-linked scope/provenance metadata into diagnostic trace normalization.
replace_once(
    "src/runtime-resources/diagnostics/trace-metadata.js",
    '  "template_subtype",\n];',
    '  "template_subtype",\n  "structural_scope",\n  "source_specification",\n  "lexical_compound_profile",\n];',
)

# 6. Focused runtime boundary tests.
Path("tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js").write_text(r'''"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const compounds = require("../../../src/runtime-resources/lexicon/verb-object-compounds");
const legacy = require("../../../src/runtime-resources/lexicon/productive-vo");
const { loadRuntimeApi, internalConstruction, rowSurface } = require("../../lib/runtime-api");

const api = loadRuntimeApi();
const SEEDS = ["飲茶", "游水", "沖涼"];

function constructionRows(source) {
  return api.diagnosticFinalRows(api.analyzeLine(source)).filter((row) => row.kind === "construction");
}
function productiveRows(source) {
  return constructionRows(source).filter((row) => internalConstruction(row) === "ProductiveVO");
}
function sourceLinkedRows(source) {
  return productiveRows(source).filter((row) => row.trace_detail && row.trace_detail.kind === "source_linked_runtime_matcher");
}
function assertSeed(source, surface) {
  const rows = sourceLinkedRows(source);
  assert.equal(rows.length, 1, source);
  const row = rows[0];
  assert.equal(rowSurface(row), surface);
  assert.equal(row.trace_detail.structural_scope, "vp");
  assert.equal(row.trace_detail.lexical_compound_profile, "contiguous_source_linked_seed");
  assert.equal(row.trace_detail.template_family_applicability, "not_applicable");
  assert.equal(row.trace_detail.binding_contract_status, "not_applicable");
  assert.deepEqual(row.trace_detail.bindings, []);
  assert.equal(row.slots.includes("object"), false);
  assert.equal(row.slots.includes("productive_vo"), true);
  assert.equal(row.slots.includes("verb_object_compound"), true);
  const components = row.trace_detail.components || [];
  assert.equal(components.length, 2);
  assert.equal(components.map((item) => item.source_surface).join(""), surface);
  for (const component of components) {
    assert.equal(component.source_span.status, "unique");
    assert.equal(component.source_span.relative_to, "raw_source");
  }
  assert.ok(String(row.trace_detail.source_specification || "").includes("ISSUE-753-AB35-LEXICAL-VO-RUNTIME-CONTRACT-R1.md"));
  return row;
}

test("AB35 source-linked seed is exactly the three reviewed current-whitelist compounds", () => {
  assert.deepEqual(compounds.map(([surface]) => surface), SEEDS);
  assert.equal(legacy.length, 40);
  for (const seed of SEEDS) assert.equal(legacy.some(([surface]) => surface === seed), false, seed);
  assertSeed("飲茶。", "飲茶");
  assertSeed("游水。", "游水");
  assertSeed("沖涼。", "沖涼");
});

test("AB35 seed remains VP-sized under existing outer composition", () => {
  let row = assertSeed("我飲茶。", "飲茶");
  assert.equal(row.internal_parent || row.parent, "ClauseSpan");
  row = assertSeed("我會游水。", "游水");
  assert.equal(row.internal_parent || row.parent, "ModalVP");
  row = assertSeed("我想沖涼。", "沖涼");
  assert.equal(row.internal_parent || row.parent, "DesiderativeVP");
  row = assertSeed("你飲茶咩？", "飲茶");
  assert.notEqual(row.internal_parent || row.parent, "", "question material must remain outside the compound");
});

test("legacy and unresolved ProductiveVO surfaces do not inherit the source-linked compound trace", () => {
  for (const source of ["做功課。", "食飯。", "打電話。", "打籃球。", "飲水。", "做運動。", "下棋。", "煮嘢食。"]) {
    assert.equal(sourceLinkedRows(source).length, 0, source);
  }
  assert.equal(productiveRows("做功課。").some((row) => row.trace_detail.kind === "generative_template"), true);
  assert.equal(productiveRows("飲水。").some((row) => row.trace_detail.kind === "generative_template"), true);
});

test("separated seed components do not receive contiguous lexical-compound identity", () => {
  for (const source of ["飲咗茶。", "游咗水。", "沖咗涼。"]) {
    assert.equal(sourceLinkedRows(source).length, 0, source);
  }
});

test("generic AB78 semantics never leak into the source-linked compound trace", () => {
  for (const source of ["飲茶。", "游水。", "沖涼。"]) {
    const row = assertSeed(source, source.slice(0, -1));
    assert.equal((row.trace_detail.assigned_slots || []).length, 0);
    assert.equal((row.trace_detail.bindings || []).some((binding) => binding.slot === "object" || binding.slot === "patient"), false);
  }
});
''')

replace_once(
    "tests/run-all.js",
    '  ["ab78_transitive_boundary", path.join(root, "tests", "tooling", "runtime", "ab78-transitive-boundary.test.js")],\n',
    '  ["ab78_transitive_boundary", path.join(root, "tests", "tooling", "runtime", "ab78-transitive-boundary.test.js")],\n  ["ab35_verb_object_compound_boundary", path.join(root, "tests", "tooling", "runtime", "ab35-verb-object-compound-boundary.test.js")],\n',
)

# 7. Three focused positives; historical exact snapshots are untouched.
p = Path("tests/constructions/ProductiveVO.json")
spec = json.loads(p.read_text())
existing = {row.get("case_id") for row in spec.get("focused_cases", [])}
new_cases = [
    {"case_id":"AB35-LVC-P01","source":"飲茶。","class":"source_linked_verb_object_compound_seed","expected_profile":"ProductiveVO compatibility label backed by canonical AB35 VerbObjectCompound exact lexical seed","assertion":"construction_present","provenance":"docs/research/ISSUE-753-AB35-LEXICAL-VO-IMPLEMENTATION-MATRIX-R1.md#A.-Initial-source-backed-migration-core"},
    {"case_id":"AB35-LVC-P02","source":"游水。","class":"source_linked_verb_object_compound_seed","expected_profile":"ProductiveVO compatibility label backed by canonical AB35 VerbObjectCompound exact lexical seed","assertion":"construction_present","provenance":"docs/research/ISSUE-753-AB35-LEXICAL-VO-IMPLEMENTATION-MATRIX-R1.md#A.-Initial-source-backed-migration-core"},
    {"case_id":"AB35-LVC-P03","source":"沖涼。","class":"source_linked_verb_object_compound_seed","expected_profile":"ProductiveVO compatibility label backed by canonical AB35 VerbObjectCompound exact lexical seed","assertion":"construction_present","provenance":"docs/research/ISSUE-753-AB35-LEXICAL-VO-IMPLEMENTATION-MATRIX-R1.md#A.-Initial-source-backed-migration-core"},
]
assert not (existing & {row["case_id"] for row in new_cases})
spec.setdefault("focused_cases", []).extend(new_cases)
cov = spec["coverage"]
cov["focused_positive_count"] = sum(1 for row in spec.get("focused_cases", []) if row.get("assertion") == "construction_present")
cov["focused_boundary_count"] = sum(1 for row in spec.get("focused_cases", []) if row.get("assertion") == "construction_absent")
cov["focused_review_only_count"] = sum(1 for row in spec.get("focused_cases", []) if row.get("assertion") not in {"construction_present", "construction_absent"})
cov["positive_case_count"] = cov.get("exact_snapshot_positive_count", 0) + cov["focused_positive_count"]
cov["boundary_case_count"] = cov["focused_boundary_count"]
cov["executable_case_count"] = cov["positive_case_count"] + cov["boundary_case_count"] + cov.get("np_case_count", 0) + cov.get("implementation_probe_count", 0) + cov.get("compatibility_alias_probe_count", 0)
assert cov["positive_case_count"] == 25, cov
assert cov["boundary_case_count"] == 2, cov
assert cov["executable_case_count"] == 27, cov
p.write_text(json.dumps(spec, ensure_ascii=False, indent=2) + "\n")

# Runtime recognition/trace changed, so increment the runtime patch version.
run("npm", "version", "0.5.224", "--no-git-tag-version")
replace_once(
    "src/plugin-entry.js",
    'const CANTO_SPAN_RUNTIME_VERSION = "0.5.223";',
    'const CANTO_SPAN_RUNTIME_VERSION = "0.5.224";\n// v0.5.224: narrows canonical AB35 runtime ownership for 飲茶/游水/沖涼 to a source-linked lexical VerbObjectCompound seed with component provenance and no automatic object binding, while retaining the other 40 legacy ProductiveVO compatibility entries.',
)
replace_once("manifest.json", '"version": "0.5.223"', '"version": "0.5.224"')

run("npm", "run", "build:runtime")
run("node", "tools/build-construction-tests.js")
run("node", "tools/sync-construction-test-metadata.js")
run("npm", "run", "discovery:generate")

idx = json.loads(Path("tests/construction-test-index.json").read_text())
count = idx.get("summary", {}).get("executable_assertion_count")
if count is None:
    count = idx.get("executable_assertion_count")
assert count == 1634, (count, idx.get("summary"))
replace_once("docs/current/PROJECT-STATE.md", "| Runtime | v0.5.223 |", "| Runtime | v0.5.224 |")
replace_once(
    "docs/current/PROJECT-STATE.md",
    "per-construction assertions: **1,631** across **134** files;",
    "per-construction assertions: **1,634** across **134** files;",
)
replace_once(
    "docs/current/PROJECT-STATE.md",
    "| Per-construction assertions | 1,631 |",
    "| Per-construction assertions | 1,634 |",
)
replace_once(
    "docs/current/PROJECT-STATE.md",
    "Current consequences include:\n\n",
    "Current consequences include:\n\n- `AB35 VerbObjectCompound` source-linked runtime migration has begun at v0.5.224 for the independently supported current-whitelist seed `飲茶` / `游水` / `沖涼`; those exact nodes expose component provenance without an automatic ordinary object binding, while the other 40 legacy `ProductiveVO` compatibility entries remain unchanged pending later review;\n",
)

# Focused and repository-scoped verification.
run("node", "tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js")
run("npm", "run", "test:constructions")
run("npm", "run", "verify:runtime")
with open("/tmp/ab35-architecture.json", "w") as f:
    subprocess.run(["npm", "run", "audit:parser-architecture", "--", "--json"], check=True, text=True, stdout=f)
arch = json.loads(Path("/tmp/ab35-architecture.json").read_text())
blocking = arch.get("blocking_count", arch.get("summary", {}).get("blocking_count"))
assert blocking == 0, arch
run("npm", "run", "verify")
run("npm", "run", "verify:research")
run("npm", "run", "verify:identities")
run("npm", "run", "verify:discovery")
run("npm", "run", "test:coordination")

# Protected legacy scope must remain byte-for-order equivalent apart from the three removed seeds.
legacy = json.loads(run("node", "-e", "process.stdout.write(JSON.stringify(require('./src/runtime-resources/lexicon/productive-vo').map(x=>x[0])))", capture=True).stdout)
seed = json.loads(run("node", "-e", "process.stdout.write(JSON.stringify(require('./src/runtime-resources/lexicon/verb-object-compounds').map(x=>x[0])))", capture=True).stdout)
expected_legacy = ['食飯','煮飯','摘芒果','買嘢','食嘢','飲水','寫字','寫名','睇書','聽歌','睇戲','跑步','影相','打機','煮嘢食','唱K','做運動','踢波','打波','彈琴','釣魚','唱歌','睇波','下棋','講嘢','打電話','打籃球','聽電話','做功課','返學','放學','瞓覺','洗手','曬太陽','打麻雀','默書','炒股票','發脾氣','食意粉','Book枱']
assert legacy == expected_legacy, (legacy, expected_legacy)
assert seed == ["飲茶", "游水", "沖涼"], seed

# Remove transient verifier byproducts and every temporary transport/helper file before the final commit.
subprocess.run(["git", "checkout", "--", "validation/current"], check=False)
subprocess.run(["git", "clean", "-fd", "validation/current"], check=False)
for temp in [
    ".github/workflows/ab35-seed-inspect-temp.yml",
    ".github/workflows/ab35-seed-apply-temp.yml",
    ".github/ab35-seed-apply-temp.py",
]:
    Path(temp).unlink(missing_ok=True)

run("git", "diff", "--check")
status = run("git", "status", "--porcelain", capture=True).stdout.splitlines()
got = {row[3:] for row in status if len(row) >= 4}
forbidden = [p for p in got if p.startswith("data/construction-adjudication") or p.startswith("data/construction-identit") or p.startswith("review-packets/") or p.startswith("test-data/")]
assert not forbidden, forbidden
required = {
    "src/runtime-resources/lexicon/productive-vo.js",
    "src/runtime-resources/lexicon/verb-object-compounds.js",
    "src/runtime-resources/lexicon/validate.js",
    "src/runtime-resources/grammar/templates/category-span-templates.js",
    "src/runtime-resources/diagnostics/trace-metadata.js",
    "src/plugin-entry.js",
    "tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js",
    "tests/constructions/ProductiveVO.json",
    "tests/run-all.js",
    "main.js",
    "package.json",
    "package-lock.json",
    "manifest.json",
    "tests/construction-test-index.json",
    "grammar/research_pending/ProductiveVO.md",
    "docs/current/PROJECT-STATE.md",
}
assert required <= got, (sorted(required - got), sorted(got))

# Re-fetching live GitHub ownership is performed by the controlling ChatGPT agent immediately
# before this workflow is enabled. The helper itself cannot change ownership or scope.
run("git", "config", "user.name", "Canto Span scoped automation")
run("git", "config", "user.email", "actions@users.noreply.github.com")
run("git", "add", "-A")
run("git", "commit", "-m", "Implement AB35 source-linked compound seed")
run("git", "push", "origin", f"HEAD:{BRANCH}")
print("AB35 bounded implementation committed and pushed after all scoped checks passed.")
