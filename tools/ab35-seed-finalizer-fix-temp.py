#!/usr/bin/env python3
from pathlib import Path

TARGET = Path("tools/ab35-seed-finalize-temp.py")
text = TARGET.read_text()


def swap(old, new, label):
    global text
    count = text.count(old)
    if count != 1:
        raise AssertionError(f"{label}: expected one occurrence, found {count}")
    text = text.replace(old, new, 1)


swap(
    '''idx = json.loads(Path("tests/construction-test-index.json").read_text())
count = idx.get("summary", {}).get("executable_assertion_count")
if count is None:
    count = idx.get("executable_assertion_count")
assert count == 1634, (count, idx.get("summary"))''',
    '''idx = json.loads(Path("tests/construction-test-index.json").read_text())
count = sum(row.get("executable_case_count", 0) for row in idx.get("files", []))
assert count == 1634, count''',
    "construction-index schema",
)

swap(
    '  assert.deepEqual(row.trace_detail.bindings, []);',
    '  assert.equal(Array.from(row.trace_detail.bindings || []).length, 0);\n  assert.equal(row.trace_detail.matcher_variant_id, "ProductiveVO.source_linked_verb_object_compound_seed");',
    "cross-realm bindings assertion",
)

variant_registration = r'''# 5b. Explain the intentional ProductiveVO matcher split through reviewed variant IDs.
productive_vo_variant_js = (
    'const productiveVoVariantTemplate = ["action_verb!", "object!"];\n'
    'const productiveVoLegacySurfaces = require("../lexicon/productive-vo").map(([surface]) => surface);\n'
    'const verbObjectCompoundSeedSurfaces = require("../lexicon/verb-object-compounds").map(([surface]) => surface);\n'
    'registerReviewedMatcherVariant("ProductiveVO.legacy_whitelist_object_relation", {\n'
    '  trace_kind: "generative_template", construction_type: "ProductiveVO", template_family: "generative_template",\n'
    '  template: productiveVoVariantTemplate, constraints: { surface_sequence_in: productiveVoLegacySurfaces }, rule: "",\n'
    '});\n'
    'registerReviewedMatcherVariant("ProductiveVO.source_linked_verb_object_compound_seed", {\n'
    '  trace_kind: "source_linked_runtime_matcher", construction_type: "ProductiveVO", template_family: "",\n'
    '  template: productiveVoVariantTemplate, constraints: { surface_sequence_in: verbObjectCompoundSeedSurfaces }, rule: "",\n'
    '});\n\n'
)
replace_once(
    "src/runtime-resources/diagnostics/trace-metadata.js",
    'const reviewedMissingTemplateFamilyDefaults = new Map();',
    productive_vo_variant_js + 'const reviewedMissingTemplateFamilyDefaults = new Map();',
)

'''
swap(
    "# 6. Permanent focused runtime contract.\n",
    variant_registration + "# 6. Permanent focused runtime contract.\n",
    "ProductiveVO matcher-variant registration",
)

week16_migration = r'''# 9b. Keep Week-16 structural coverage aligned with the accepted AB35 storage migration.
glossika = Path("tests/tooling/lexicon/glossika-week16-runtime-lexicon.test.js")
glossika_text = glossika.read_text()
old_import = 'const { loadRuntimeApi } = require("../../lib/runtime-api");'
new_import = old_import + '\nconst VERB_OBJECT_COMPOUNDS = Object.fromEntries(require("../../../src/runtime-resources/lexicon/verb-object-compounds"));'
assert glossika_text.count(old_import) == 1
glossika_text = glossika_text.replace(old_import, new_import, 1)
old_assert = '    assert.ok(api.PRODUCTIVE_VO[surface], `${surface}: PRODUCTIVE_VO entry`);'
new_assert = '    assert.ok(api.PRODUCTIVE_VO[surface] || VERB_OBJECT_COMPOUNDS[surface], `${surface}: reviewed productive/compound lexical entry`);'
assert glossika_text.count(old_assert) == 1
glossika.write_text(glossika_text.replace(old_assert, new_assert, 1))

'''
swap(
    "# 10. Full claim-scoped acceptance.\n",
    week16_migration + "# 10. Full claim-scoped acceptance.\n",
    "Week-16 ownership migration",
)

swap(
    '''    "validation/current/ab35-apply-trigger.txt",
    "tools/ab35-seed-finalize-temp.py",
]:''',
    '''    "validation/current/ab35-apply-trigger.txt",
    ".github/ab35-seed-apply-temp.py",
    "tools/ab35-seed-finalize-temp.py",
    "tools/ab35-seed-finalizer-fix-temp.py",
]:''',
    "temporary cleanup list",
)

swap(
    '''    "tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js",
    "tests/constructions/ProductiveVO.json",''',
    '''    "tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js",
    "tests/tooling/lexicon/glossika-week16-runtime-lexicon.test.js",
    "tests/constructions/ProductiveVO.json",''',
    "required Week-16 permanent change",
)

swap(
    '''assert not any(path.startswith(".github/workflows/ab35-seed-") or path == "tools/ab35-seed-finalize-temp.py" or path == "validation/current/ab35-apply-trigger.txt" for path in got), sorted(got)''',
    '''assert not any(path.startswith(".github/workflows/ab35-seed-") or path in {".github/ab35-seed-apply-temp.py", "tools/ab35-seed-finalize-temp.py", "tools/ab35-seed-finalizer-fix-temp.py", "validation/current/ab35-apply-trigger.txt"} for path in got), sorted(got)''',
    "temporary artifact final-diff guard",
)

TARGET.write_text(text)
print("AB35 standalone finalizer updated for current repository contracts.")
