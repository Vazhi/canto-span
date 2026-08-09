#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function replaceOnce(file, from, to) {
  const absolute = path.join(root, file);
  const source = fs.readFileSync(absolute, "utf8");
  if (source.includes(to)) return false;
  const count = source.split(from).length - 1;
  if (count !== 1) throw new Error(`${file}: expected exactly one replacement anchor, found ${count}`);
  fs.writeFileSync(absolute, source.replace(from, to));
  return true;
}

const changed = [];
function apply(file, from, to) {
  if (replaceOnce(file, from, to)) changed.push(file);
}

apply(
  "src/runtime-resources/diagnostics/trace-metadata.js",
  'const clauseLevelStructuralSlots = new Set(["subject", "overt_subject", "topic"]);\n',
  'const clauseLevelStructuralSlots = new Set(["subject", "overt_subject", "topic"]);\nconst reviewedMixedClauseVpConstructions = new Set([\n  "ModalVP",\n  "DesiderativeVP",\n  "MannerAdverbialVP",\n  "PreferenceVP",\n]);\n',
);

apply(
  "src/runtime-resources/diagnostics/trace-metadata.js",
  'function deriveStructuralScope(trace = {}) {\n  const explicit = String(trace.structural_scope || "");\n  if (explicit) return { structural_scope: explicit, structural_scope_source: "explicit" };\n  if (traceDeclaresClauseLevelSlot(trace)) {\n    return { structural_scope: "clause", structural_scope_source: "clause_level_slot" };\n  }\n  if (trace.kind === "governed_discourse_wrapper") {',
  'function deriveStructuralScope(trace = {}, options = {}) {\n  const explicit = String(trace.structural_scope || "");\n  const constructionType = String(options.constructionType || trace.construction_type || "");\n  if (explicit) return { structural_scope: explicit, structural_scope_source: "explicit" };\n  if (traceDeclaresClauseLevelSlot(trace)) {\n    return { structural_scope: "clause", structural_scope_source: "clause_level_slot" };\n  }\n  if (reviewedMixedClauseVpConstructions.has(constructionType)) {\n    return { structural_scope: "vp", structural_scope_source: "reviewed_mixed_clause_vp_definition" };\n  }\n  if (trace.kind === "governed_discourse_wrapper") {',
);

apply(
  "src/runtime-resources/diagnostics/trace-metadata.js",
  '  const structuralScope = deriveStructuralScope(normalized);\n',
  '  const structuralScope = deriveStructuralScope(normalized, { constructionType });\n',
);

apply(
  "src/runtime-resources/diagnostics/trace-metadata.js",
  '  clauseLevelStructuralSlots,\n  traceDeclaresClauseLevelSlot,\n',
  '  clauseLevelStructuralSlots,\n  reviewedMixedClauseVpConstructions,\n  traceDeclaresClauseLevelSlot,\n',
);

apply(
  "tests/tooling/parser-coverage/enhanced.test.js",
  'test("subject-binding public VP identities expose clause structural scope without renaming", () => {',
  'test("mixed clause-VP public identities use trace-definition scope rather than label suffix", () => {\n  const [subjectlessModalRecord] = recordsForSentences(["要等幾耐啊？"]);\n  const subjectlessModal = subjectlessModalRecord.construction_traces.find((item) => item.construction === "ModalVP");\n  assert(subjectlessModal);\n  assert.equal(subjectlessModal.structural_scope, "vp");\n  assert.equal(subjectlessModal.structural_scope_source, "reviewed_mixed_clause_vp_definition");\n  assert(!subjectlessModal.assigned_slots.some((slot) => slot === "subject" || slot === "overt_subject" || slot === "topic"));\n  assert(!subjectlessModalRecord.sanity_findings.some((finding) => finding.code === "vp_scope_binds_clause_level_slot"));\n});\n\ntest("subject-binding public VP identities expose clause structural scope without renaming", () => {',
);

console.log(JSON.stringify({
  schema: "canto-span-temp-structural-scope-migration-v2",
  changed_files: [...new Set(changed)],
  policy: "clause-level slots => clause; reviewed mixed clause/VP identities without clause-level slots => vp",
}, null, 2));
