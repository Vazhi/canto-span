"use strict";

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const root = path.resolve(__dirname, "..");
process.chdir(root);

// Add only the reviewed AB45 R1 focused cases. Snapshot/NP references are
// regenerated later from canonical aggregate fixtures.
const qcnPath = path.join(root, "tests", "constructions", "QuantifiedClassifierNP.json");
const qcn = JSON.parse(fs.readFileSync(qcnPath, "utf8"));
const additions = [
  { case_id: "AB45-R1-P01", source: "兩本書。", class: "source_bounded_overt_num_cl_n", expected_profile: "construction_present", assertion: "construction_present", provenance: "docs/research/ISSUE-724-AB45-QUANTIFIED-CLASSIFIER-PROFILES-R1.md#profile-a--overt-numeral--classifier--noun" },
  { case_id: "AB45-R1-P02", source: "三隻貓。", class: "source_bounded_overt_num_cl_n_lexical_variation", expected_profile: "construction_present", assertion: "construction_present", provenance: "docs/research/ISSUE-724-AB45-QUANTIFIED-CLASSIFIER-PROFILES-R1.md#profile-a--overt-numeral--classifier--noun" },
  { case_id: "AB45-R1-P03", source: "兩本。", context_source: "我有三本書。", class: "context_linked_num_cl_noun_ellipsis", expected_profile: "construction_present_context_licensed", assertion: "construction_present", provenance: "docs/research/ISSUE-724-AB45-QUANTIFIED-CLASSIFIER-PROFILES-R1.md#profile-b--numeral--classifier-with-recoverable-omitted-noun" },
  { case_id: "AB45-R1-N01", source: "三杯茶。", class: "container_measure_outside_ab45", expected_profile: "construction_absent", assertion: "construction_absent", provenance: "docs/research/ISSUE-724-AB45-QUANTIFIED-CLASSIFIER-PROFILES-R1.md#profile-e--measure-word-np" },
  { case_id: "AB45-R1-N02", source: "兩碗飯。", class: "container_measure_outside_ab45", expected_profile: "construction_absent", assertion: "construction_absent", provenance: "docs/research/ISSUE-724-AB45-QUANTIFIED-CLASSIFIER-PROFILES-R1.md#profile-e--measure-word-np" },
  { case_id: "AB45-R1-N03", source: "飲七杯。", class: "headless_container_measure_outside_ab45", expected_profile: "construction_absent", assertion: "construction_absent", provenance: "docs/research/ISSUE-724-AB45-QUANTIFIED-CLASSIFIER-PROFILES-R1.md#profile-e--measure-word-np" },
  { case_id: "AB45-R1-N04", source: "三歲。", class: "age_unit_outside_ab45", expected_profile: "construction_absent", assertion: "construction_absent", provenance: "docs/research/ISSUE-724-AB45-QUANTIFIED-CLASSIFIER-PROFILES-R1.md#profile-f--age-length-area-and-conventional-dimension-strings" },
  { case_id: "AB45-R1-N05", source: "五百呎。", class: "dimension_unit_outside_ab45", expected_profile: "construction_absent", assertion: "construction_absent", provenance: "docs/research/ISSUE-724-AB45-QUANTIFIED-CLASSIFIER-PROFILES-R1.md#profile-f--age-length-area-and-conventional-dimension-strings" },
  { case_id: "AB45-R1-N06", source: "呢句有幾多個字？", class: "wh_quantity_outside_current_ab45_core", expected_profile: "construction_absent", assertion: "construction_absent", provenance: "docs/research/ISSUE-724-AB45-QUANTIFIED-CLASSIFIER-PROFILES-R1.md#profile-d--wh-quantity--classifier--noun" },
  { case_id: "AB45-R1-N07", source: "兩。", class: "bare_numeral_outside_ab45", expected_profile: "construction_absent", assertion: "construction_absent", provenance: "docs/research/ISSUE-724-AB45-QUANTIFIED-CLASSIFIER-PROFILES-R1.md#profile-h--bare-numeral" },
  { case_id: "AB45-R1-N08", source: "三杯書。", class: "container_measure_pair_not_ab45_classifier_control", expected_profile: "construction_absent", assertion: "construction_absent", provenance: "docs/research/ISSUE-724-AB45-QUANTIFIED-CLASSIFIER-PROFILES-R1.md#profile-e--measure-word-np" },
];
qcn.focused_cases = Array.isArray(qcn.focused_cases) ? qcn.focused_cases : [];
const existingIds = new Set(qcn.focused_cases.map((row) => row.case_id));
for (const row of additions) {
  if (existingIds.has(row.case_id)) throw new Error(`AB45 finalizer found pre-existing focused case ${row.case_id}`);
  qcn.focused_cases.push(row);
}
fs.writeFileSync(qcnPath, JSON.stringify(qcn, null, 2) + "\n");

// Refresh exactly the 15 regression signatures authorized by #727/#728. The
// temporary update hook first proves that the observed mismatch set is exactly
// the reviewed transition set, then removes itself without changing the
// permanent regression runner.
const runnerPath = path.join(root, "tests", "run-regression.js");
const originalRunner = fs.readFileSync(runnerPath, "utf8");
const needle = "const cp021bIntentionalSnapshotSources = new Set([\n";
const updateBlock = String.raw`const ab45IntentionalSnapshotSources = new Set([
  "一個。",
  "一個咋.",
  "一個啫。",
  "我得一個啫。",
  "兩部。",
  "呢句有幾多個字？",
  "得一個咋。",
  "得一個啫。",
  "得兩個啫。",
  "飲七杯。",
  "三歲。",
  "五百呎。",
  "張枱三呎。",
  "佢有三歲。",
  "呢本書三歲。",
]);
if (process.argv.includes("--update-ab45-temp")) {
  const observed = [];
  for (const testCase of fixture.cases) {
    try {
      const actual = JSON.parse(JSON.stringify(signature(api, testCase.source, testCase.context_source || null)));
      assert.deepStrictEqual(actual, testCase.expected);
    } catch (_) {
      observed.push(testCase.source);
    }
  }
  const expectedSet = [...ab45IntentionalSnapshotSources].sort();
  const observedSet = [...new Set(observed)].sort();
  assert.deepStrictEqual(observedSet, expectedSet, "AB45 transition mismatch set changed; refuse automatic rebaseline");
  let updated = 0;
  for (const testCase of fixture.cases) {
    if (!ab45IntentionalSnapshotSources.has(testCase.source)) continue;
    testCase.expected = JSON.parse(JSON.stringify(signature(api, testCase.source, testCase.context_source || null)));
    testCase.accepted_transition = "v0.5.222_AB45_source_bounded_quantified_classifier_np";
    testCase.transition_reason = "AB45 is restricted to source-bounded numeral + classifier + overt noun structure plus explicit context-linked noun ellipsis; measure, wh-quantity, age/dimension, and context-free headless profiles no longer inherit ordinary AB45 licensing.";
    updated += 1;
  }
  fixture.runtime_version = api.runtimeVersion;
  fixture.last_intentional_transition = "v0.5.222_AB45_source_bounded_quantified_classifier_np";
  fs.writeFileSync(fixturePath, JSON.stringify(fixture, null, 2) + "\n");
  console.log(JSON.stringify({ runtime_version: api.runtimeVersion, updated_cases: updated, authorized_sources: ab45IntentionalSnapshotSources.size, observed_mismatch_sources: observedSet }, null, 2));
  process.exit(updated === ab45IntentionalSnapshotSources.size ? 0 : 1);
}

`;
if (!originalRunner.includes(needle)) throw new Error("AB45 finalizer cannot locate regression updater insertion point");
try {
  fs.writeFileSync(runnerPath, originalRunner.replace(needle, updateBlock + needle));
  cp.execFileSync(process.execPath, [runnerPath, "--update-ab45-temp"], { stdio: "inherit" });
} finally {
  fs.writeFileSync(runnerPath, originalRunner);
}

console.log(JSON.stringify({ status: "AB45_FINALIZER_PREPARED", focused_cases_added: additions.length, regression_sources_updated: 15 }, null, 2));
