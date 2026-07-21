#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const checks = [];
const failures = [];
function check(name, condition, detail = "") {
  const pass = Boolean(condition);
  checks.push({ name, pass, ...(detail ? { detail } : {}) });
  if (!pass) failures.push({ name, detail });
}

const required = [
  "docs/current/00-START-HERE.md",
  "docs/current/DOCTRINE.md",
  "docs/current/DEFINITION-OF-DONE.md",
  "docs/current/STATUS-AND-CONFIDENCE.md",
  "docs/current/EVIDENCE-AND-PROVENANCE.md",
  "docs/current/WORKFLOW.md",
  "docs/current/VALIDATION-AND-ACCEPTANCE.md",
  "docs/current/PROJECT-STATE.md",
  "docs/research/CONSTRUCTION-EVIDENCE-REAUDIT-LEDGER-v0.5.183-R3.tsv",
  "docs/research/SECOND-SPEAKER-REVIEW-QUEUE-v0.5.183-R4.tsv",
  "docs/research/ACTIVE-SOURCE-ACCOUNTING-v0.5.183-cp026-p1-rul01-r1.tsv",
  "docs/research/CONSTRUCTION-STATUS-REGISTRY-v0.5.183-R4.tsv",
  "docs/research/CONSTRUCTION-STATUS-SUMMARY-v0.5.183-R2.json",
  "test-data/grammar-legitimacy-audit.tsv",
  "test-data/grammar-legitimacy-audit.json",
];
for (const rel of required) check(`required file: ${rel}`, fs.existsSync(path.join(root, rel)));

const state = fs.readFileSync(path.join(root, "docs/current/PROJECT-STATE.md"), "utf8");
const doctrine = fs.readFileSync(path.join(root, "docs/current/DOCTRINE.md"), "utf8");
const dod = fs.readFileSync(path.join(root, "docs/current/DEFINITION-OF-DONE.md"), "utf8");
const render = fs.readFileSync(path.join(root, "CANTO-SPAN-v0.5.183-RENDER-REVIEW.md"), "utf8");
check("state records supported count zero", /`supported_productive`\s*\|\s*\*\*0\*\*/.test(state));
check("state records two provisional_reaudit", /`provisional_reaudit`\s*\|\s*\*\*2\*\*/.test(state));
check("state records ordinary provisional zero", /`provisional`\s*\|\s*\*\*0\*\*/.test(state));
check("state records research_pending 58", /`research_pending`\s*\|\s*\*\*58\*\*/.test(state));
check("Definition of Done controls supported_productive", /eligible for `supported_productive`[\s\S]*ALL/i.test(dod));
check("Definition of Done controls provisional", /Definition of Done: `provisional`/i.test(dod));
check("Definition of Done requires two speakers", /Two independent native speakers/i.test(dod));
check("doctrine requires two speakers", /at least two independent native Cantonese speakers/i.test(doctrine));
check("doctrine rejects raw corpus counts", /Raw corpus hit counts have no evidence weight/i.test(doctrine));
check("render note blocks promotion", /does not permit promotion by itself/i.test(render));
check("held-out remains blocked after render alone", /Do not open the sealed held-out ZIP after render alone/i.test(render));

const result = {
  schema: "canto-span-current-focused-result-v7",
  checkpoint: "v0.5.183-cp026-p1-rul01-reaudit-r1",
  parser_behavior_changed: false,
  supported_productive: 0,
  provisional_reaudit: 2,
  ordinary_provisional: 0,
  research_pending: 58,
  total: checks.length,
  passed: checks.length - failures.length,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  checks,
  failures,
};
const outDir = path.join(root, "validation", "v0.5.183-cp026-p1-rul01-reaudit-r1");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "current-focused.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
