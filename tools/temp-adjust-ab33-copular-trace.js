#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const target = path.resolve(__dirname, "../src/parser/detectors/questions/a-not-a.js");
let source = fs.readFileSync(target, "utf8");
const oldBlock = `      trace: traceInfo("construction_function", {
        construction_type: "SubjectPredicateClause",
        rule: "每 + subject + 都 + visible 鍾意 predicate material",
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Reconstructs the reviewed copular-question complement from visible preference material without certifying an accidental ModifierNP or restoring broad AB33 PreferenceVP matching.",
      }),`;
const newBlock = `      trace: traceInfo("generative_template", {
        construction_type: "SubjectPredicateClause",
        template_family: "copular_a_not_a_bounded_complement",
        template: assignedSlots.map((slot) => \`\${slot}!\`),
        rule: "每 + subject + 都 + visible 鍾意 predicate material",
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Reconstructs the reviewed bounded copular-question complement from visible preference material without certifying an accidental ModifierNP or restoring broad AB33 PreferenceVP matching.",
      }),`;
if (source.includes(newBlock)) {
  console.log("Copular trace adjustment already applied.");
  process.exit(0);
}
if (!source.includes(oldBlock)) throw new Error("Expected AB33 copular trace block not found");
source = source.replace(oldBlock, newBlock);
fs.writeFileSync(target, source);
console.log("Preserved bounded copular construction-template trace classification.");
