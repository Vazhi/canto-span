from pathlib import Path
import json

root = Path('.')

path = root / 'src/parser/clause-relations/graph.js'
source = path.read_text()
old = 'relationResearchId = "PRQ2-015";\n    relationProfileScope = "overt_ning4jyun6_and_negative_dou1_continuation_only";'
new = 'relationResearchId = "PRQ2-035";\n    relationProfileScope = "overt_ning4jyun6_and_negative_dou1_continuation_only";'
assert source.count(old) == 1
path.write_text(source.replace(old, new))

path = root / 'tests/constructions/ClauseRelationGraph.json'
data = json.loads(path.read_text())
changed = 0
for case in data.get('implementation_probe_cases', []):
    if case.get('case_id') in {'PRQ2-015-I01', 'PRQ2-015-I02', 'PRQ2-015-N01'}:
        case['case_id'] = case['case_id'].replace('PRQ2-015', 'PRQ2-035', 1)
        expected = case.get('expected_trace_detail') or {}
        if expected.get('research_id') == 'PRQ2-015':
            expected['research_id'] = 'PRQ2-035'
        case['provenance'] = case['provenance'].replace('PRQ2-015-NING4JYUN6', 'PRQ2-035-NING4JYUN6')
        changed += 1
assert changed == 3
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')

path = root / 'tests/run-constructions.js'
source = path.read_text()
anchor = 'const cache = new Map();\n'
replacement = '''const cache = new Map();
const canonicalResearchIdByRelationSubtype = Object.freeze({
  committed_preference: "PRQ2-035",
});
'''
assert source.count(anchor) == 1
source = source.replace(anchor, replacement)
anchor = '''      assert.strictEqual(testCase.linguistic_evidence_weight, 0);
      assert.strictEqual(testCase.purpose, "runtime_reachability_only");
      const rows = rowsFor(testCase.source, testCase.context_source || null);
'''
replacement = '''      assert.strictEqual(testCase.linguistic_evidence_weight, 0);
      assert.strictEqual(testCase.purpose, "runtime_reachability_only");
      const caseResearchMatch = /^(PRQ2-\\d{3})-/.exec(testCase.case_id || "");
      if (caseResearchMatch) {
        assert(
          String(testCase.provenance || "").includes(caseResearchMatch[1]),
          `${testCase.case_id} provenance must use ${caseResearchMatch[1]}`,
        );
      }
      const declaredSubtype = testCase.expected_trace_detail?.relation_subtype
        || testCase.expected_trace_detail?.clause_linking_subtype
        || testCase.forbidden_trace_detail?.relation_subtype
        || testCase.forbidden_trace_detail?.clause_linking_subtype;
      const canonicalResearchId = canonicalResearchIdByRelationSubtype[declaredSubtype];
      if (canonicalResearchId) {
        assert.strictEqual(caseResearchMatch?.[1], canonicalResearchId, `${declaredSubtype} case ID provenance`);
        assert(
          String(testCase.provenance || "").includes(canonicalResearchId),
          `${declaredSubtype} source provenance must use ${canonicalResearchId}`,
        );
        if (testCase.expected_trace_detail) {
          assert.strictEqual(
            testCase.expected_trace_detail.research_id,
            canonicalResearchId,
            `${declaredSubtype} expected research_id`,
          );
        }
      }
      const rows = rowsFor(testCase.source, testCase.context_source || null);
'''
assert source.count(anchor) == 1
path.write_text(source.replace(anchor, replacement))

path = root / 'grammar/parser_heuristic/ClauseRelationGraph.md'
source = path.read_text()
anchor = '- Evidence state: `fixture_level_not_provenance_linked`\n'
replacement = '''- Implementation-only PRQ2-035 probes require the `committed_preference`
  rejection profile only for the overt, comma-delimited `寧願 A，都唔想／唔肯／唔好 B`
  slice. The positive `都要` continuation remains outside the matcher. Probe IDs,
  provenance paths, runtime trace metadata, and the generated bundle must use
  canonical research unit PRQ2-035; PRQ2-015 is reserved for distributive
  quantification. These probes have zero independent linguistic-evidence weight.
- Evidence state: `fixture_level_not_provenance_linked`
'''
assert source.count(anchor) == 1
path.write_text(source.replace(anchor, replacement))

path = root / 'docs/current/PROJECT-STATE.md'
source = path.read_text()
old = 'The paired-clause relation map reviews PRQ2-008–015 and PRQ2-033–035 as eleven separate families across 151 checked-in collision rows. Three bounded typed cores route to identity/composition decisions in #430, four source-ready unimplemented relations route to #431, three evidence-constrained families and the PRQ2-035 provenance defect route to #432, and PRQ2-015 remains research-only through #409. Generic clause graphs remain parser infrastructure and no identity, status, runtime, or fixture changes follow from the map itself.\n'
new = 'The paired-clause relation map reviews PRQ2-008–015 and PRQ2-033–035 as eleven separate families across 151 checked-in collision rows. Three bounded typed cores route to identity/composition decisions in #430, four source-ready unimplemented relations route to #431, and three evidence-constrained families remain in #432. The committed-preference runtime, probes, and generated bundle now use canonical PRQ2-035 provenance; PRQ2-015 remains research-only through #409. Generic clause graphs remain parser infrastructure, and the provenance correction changes metadata only, not matching behavior, identity, status, or evidence.\n'
assert source.count(old) == 1
path.write_text(source.replace(old, new))
