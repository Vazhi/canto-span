"use strict";

const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const root = path.resolve(__dirname, "..");
process.chdir(root);

// Stage the already-tested second-pass ownership correction first.
require("./tmp-aa49-second-pass.js");

// Apply the locally validated refinements, tests, and v0.5.221 metadata.
const patchDir = path.join(root, ".github", "aa49-finalize");
const patchPath = path.join(root, ".github", "aa49-final-local.patch");
const parts = fs.readdirSync(patchDir).filter((name) => /^part\d+\.patch$/.test(name)).sort();
fs.writeFileSync(patchPath, parts.map((name) => fs.readFileSync(path.join(patchDir, name), "utf8")).join(""));
cp.execFileSync("git", ["apply", patchPath], { stdio: "inherit" });
fs.unlinkSync(patchPath);

// Refresh only the 13 exact regression signatures authorized by the accepted
// AA49 transition. The temporary updater is removed immediately afterward so
// the permanent regression runner remains unchanged.
const runnerPath = path.join(root, "tests", "run-regression.js");
const originalRunner = fs.readFileSync(runnerPath, "utf8");
const needle = "const cp021bIntentionalSnapshotSources = new Set([\n";
const updateBlock = `const aa49IntentionalSnapshotSources = new Set([\n  "行入去。",\n  "行出嚟。",\n  "行返過嚟。",\n  "佢會返嚟啩。",\n  "我上去。",\n  "我以為佢走咗。",\n  "我帶咗三部機去啊。",\n  "我落嚟。",\n  "我落嚟摘芒果食。",\n  "我攞本書返嚟畀你睇。",\n  "寄返去。",\n  "落嚟摘芒果食。",\n  "攞返嚟。",\n]);\nif (process.argv.includes("--update-aa49-temp")) {\n  let updated = 0;\n  for (const testCase of fixture.cases) {\n    if (!aa49IntentionalSnapshotSources.has(testCase.source)) continue;\n    testCase.expected = JSON.parse(JSON.stringify(signature(api, testCase.source, testCase.context_source || null)));\n    testCase.accepted_transition = "v0.5.221_AA49_independent_motion_predicate_boundary";\n    testCase.transition_reason = "AA49 is restricted to independently predicative single motion/path material; compound, manner-directional, and postverbal directional-complement profiles are reclassified or left unresolved without linguistic-status promotion.";\n    updated += 1;\n  }\n  fixture.runtime_version = "0.5.221";\n  fixture.last_intentional_transition = "v0.5.221_AA49_independent_motion_predicate_boundary";\n  fs.writeFileSync(fixturePath, JSON.stringify(fixture, null, 2) + "\\n");\n  console.log(JSON.stringify({ updated_cases: updated, authorized_sources: aa49IntentionalSnapshotSources.size }, null, 2));\n  process.exit(updated === aa49IntentionalSnapshotSources.size ? 0 : 1);\n}\n\n`;
if (!originalRunner.includes(needle)) throw new Error("AA49 finalizer cannot locate regression updater insertion point");
try {
  fs.writeFileSync(runnerPath, originalRunner.replace(needle, updateBlock + needle));
  cp.execFileSync(process.execPath, [runnerPath, "--update-aa49-temp"], { stdio: "inherit" });
} finally {
  fs.writeFileSync(runnerPath, originalRunner);
}

console.log(JSON.stringify({ status: "AA49_FINALIZER_STAGED", patch_parts: parts.length }, null, 2));
