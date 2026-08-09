#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const target = path.resolve(__dirname, "../src/parser/detectors/questions/a-not-a.js");
let source = fs.readFileSync(target, "utf8");

const constructionFunctionBlock = `      trace: traceInfo("construction_function", {
        construction_type: "SubjectPredicateClause",
        rule: "每 + subject + 都 + visible 鍾意 predicate material",
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Reconstructs the reviewed copular-question complement from visible preference material without certifying an accidental ModifierNP or restoring broad AB33 PreferenceVP matching.",
      }),`;
const boundedTemplateBlock = `      trace: traceInfo("generative_template", {
        construction_type: "SubjectPredicateClause",
        template_family: "copular_a_not_a_bounded_complement",
        template: assignedSlots.map((slot) => \`\${slot}!\`),
        rule: "每 + subject + 都 + visible 鍾意 predicate material",
        assigned_slots: assignedSlots,
        surfaces: children.map((node) => flattenSurface(node)),
        reason: "Reconstructs the reviewed bounded copular-question complement from visible preference material without certifying an accidental ModifierNP or restoring broad AB33 PreferenceVP matching.",
      }),`;

if (source.includes(constructionFunctionBlock)) {
  source = source.replace(constructionFunctionBlock, boundedTemplateBlock);
}

const genericRule = `        rule: "每 + subject + 都 + visible 鍾意 predicate material",`;
const profileRule = `        rule: ({
          typed_vp: "每 + subject + 都 + 鍾意 + typed VP",
          typed_object: "每 + subject + 都 + 鍾意 + typed NP",
          perfective_np_object: "每 + subject + 都 + 鍾意 + 咗 + typed NP",
          alternative_scalar: "每 + subject + 都 + 鍾意 + alternative material + 定係 + alternative material + 多啲",
        })[predicateParts.profile] || \`每 + subject + 都 + 鍾意 + reviewed profile \${predicateParts.profile}\`,`;

if (source.includes(profileRule)) {
  console.log("Copular trace classification and profile-specific rule provenance already applied.");
  process.exit(0);
}
if (!source.includes(genericRule)) throw new Error("Expected generic AB33 copular rule descriptor not found");
source = source.replace(genericRule, profileRule);
fs.writeFileSync(target, source);
console.log("Preserved bounded copular template classification and exposed profile-specific rule provenance.");
