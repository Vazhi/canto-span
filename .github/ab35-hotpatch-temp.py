#!/usr/bin/env python3
from pathlib import Path

p = Path('.github/ab35-seed-apply-temp.py')
text = p.read_text()


def replace_once(old, new):
    global text
    count = text.count(old)
    assert count == 1, (count, old[:120])
    text = text.replace(old, new, 1)

replace_once(
"""assert text.count(old_category) == 2, text.count(old_category)
first = text.find(old_category)
second = text.find(old_category, first + len(old_category))
text = text[:second] + new_category + text[second + len(old_category):]""",
"""assert text.count(old_category) == 1, text.count(old_category)
text = text.replace(old_category, new_category, 1)""",
)

replace_once(
"""idx = json.loads(Path("tests/construction-test-index.json").read_text())
count = idx.get("summary", {}).get("executable_assertion_count")
if count is None:
    count = idx.get("executable_assertion_count")
assert count == 1634, (count, idx.get("summary"))""",
"""idx = json.loads(Path("tests/construction-test-index.json").read_text())
count = sum(row.get("executable_case_count", 0) for row in idx.get("files", []))
assert count == 1634, count""",
)

replace_once(
'  assert.deepEqual(row.trace_detail.bindings, []);',
'  assert.equal(Array.from(row.trace_detail.bindings || []).length, 0);\n  assert.equal(row.trace_detail.matcher_variant_id, "ProductiveVO.source_linked_verb_object_compound_seed");',
)

variant_registration = r'''
# 5b. Register the two intentionally distinct ProductiveVO matcher definitions.
replace_once(
    "src/runtime-resources/diagnostics/trace-metadata.js",
    'const reviewedMissingTemplateFamilyDefaults = new Map();',
    '''const productiveVoVariantTemplate = ["action_verb!", "object!"];
const productiveVoLegacySurfaces = require("../lexicon/productive-vo").map(([surface]) => surface);
const verbObjectCompoundSeedSurfaces = require("../lexicon/verb-object-compounds").map(([surface]) => surface);
registerReviewedMatcherVariant("ProductiveVO.legacy_whitelist_object_relation", {
  trace_kind: "generative_template", construction_type: "ProductiveVO", template_family: "generative_template",
  template: productiveVoVariantTemplate, constraints: { surface_sequence_in: productiveVoLegacySurfaces }, rule: "",
});
registerReviewedMatcherVariant("ProductiveVO.source_linked_verb_object_compound_seed", {
  trace_kind: "source_linked_runtime_matcher", construction_type: "ProductiveVO", template_family: "",
  template: productiveVoVariantTemplate, constraints: { surface_sequence_in: verbObjectCompoundSeedSurfaces }, rule: "",
});

const reviewedMissingTemplateFamilyDefaults = new Map();''',
)

'''
replace_once('# 6. Focused runtime boundary tests.\n', variant_registration + '# 6. Focused runtime boundary tests.\n')

week16_adaptation = r'''
# Week-16 owns reviewed structural coverage, not one historical lexical storage table.
glossika = Path("tests/tooling/lexicon/glossika-week16-runtime-lexicon.test.js")
g = glossika.read_text()
old_import = 'const { loadRuntimeApi } = require("../../lib/runtime-api");'
new_import = old_import + '\nconst VERB_OBJECT_COMPOUNDS = Object.fromEntries(require("../../../src/runtime-resources/lexicon/verb-object-compounds"));'
assert g.count(old_import) == 1
g = g.replace(old_import, new_import, 1)
old_assert = '    assert.ok(api.PRODUCTIVE_VO[surface], `${surface}: PRODUCTIVE_VO entry`);'
new_assert = '    assert.ok(api.PRODUCTIVE_VO[surface] || VERB_OBJECT_COMPOUNDS[surface], `${surface}: reviewed productive/compound lexical entry`);'
assert g.count(old_assert) == 1
glossika.write_text(g.replace(old_assert, new_assert, 1))

'''
replace_once('# Focused and repository-scoped verification.\n', week16_adaptation + '# Focused and repository-scoped verification.\n')

replace_once(
"""arch = json.loads(Path("/tmp/ab35-architecture.json").read_text())
blocking = arch.get("blocking_count", arch.get("summary", {}).get("blocking_count"))""",
"""arch_raw = Path("/tmp/ab35-architecture.json").read_text()
arch = json.loads(arch_raw[arch_raw.find("{"):])
blocking = arch.get("blocking_count", arch.get("summary", {}).get("blocking_count"))""",
)

replace_once(
"""for temp in [
    ".github/workflows/ab35-seed-inspect-temp.yml",
    ".github/workflows/ab35-seed-apply-temp.yml",
    ".github/ab35-seed-apply-temp.py",
]:""",
"""for temp in [
    ".github/workflows/ab35-seed-inspect-temp.yml",
    ".github/workflows/ab35-seed-apply-temp.yml",
    ".github/ab35-seed-apply-temp.py",
    ".github/ab35-hotpatch-temp.py",
    "tools/ab35-seed-finalize-temp.py",
    "validation/current/ab35-apply-trigger.txt",
]:""",
)

# The permanent diff must explicitly include the Week-16 storage-agnostic regression guard.
replace_once(
'    "tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js",\n',
'    "tests/tooling/runtime/ab35-verb-object-compound-boundary.test.js",\n    "tests/tooling/lexicon/glossika-week16-runtime-lexicon.test.js",\n',
)

p.write_text(text)
print('AB35 temporary finalizer patched for current architecture/test contracts.')
