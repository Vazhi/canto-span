#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const file = path.join(root, "tests", "tooling", "parser-coverage", "enhanced.test.js");
const source = fs.readFileSync(file, "utf8");
const oldLine = '  const subjectlessModal = subjectlessModalRecord.construction_traces.find((item) => item.construction === "ModalVP");';
const newLine = '  const subjectlessModal = subjectlessModalRecord.construction_traces.find((item) => item.construction === "ModalVP" && item.structural_scope === "vp");';
let changed = false;
let next = source;
if (next.includes(oldLine)) {
  next = next.replace(oldLine, newLine);
  changed = true;
} else if (!next.includes(newLine)) {
  throw new Error("enhanced.test.js: subjectless ModalVP selector anchor not found");
}
if (changed) fs.writeFileSync(file, next);
console.log(JSON.stringify({
  schema: "canto-span-temp-structural-scope-followup-v1",
  changed_files: changed ? ["tests/tooling/parser-coverage/enhanced.test.js"] : [],
  reason: "select the VP-scoped ModalVP trace when a sentence contains multiple ModalVP nodes",
}, null, 2));
