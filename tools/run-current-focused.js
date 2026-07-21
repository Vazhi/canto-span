#!/usr/bin/env node
"use strict";
const fs = require("fs");
const path = require("path");
const { loadConstructionNotes } = require("./construction-notes-lib");
const root = path.resolve(__dirname, "..");
const checks = [], failures = [];
function check(name, condition, detail = "") { const pass = !!condition; checks.push({ name, pass, ...(detail ? { detail } : {}) }); if (!pass) failures.push({ name, detail }); }
const required = [
  "docs/current/00-START-HERE.md", "docs/current/DOCTRINE.md", "docs/current/DEFINITION-OF-DONE.md",
  "docs/current/STATUS-AND-CONFIDENCE.md", "docs/current/EVIDENCE-AND-PROVENANCE.md",
  "docs/current/WORKFLOW.md", "docs/current/VALIDATION-AND-ACCEPTANCE.md",
  "docs/current/PROJECT-STATE.md", "docs/current/GIT-WORKFLOW.md",
  "docs/current/INFRASTRUCTURE-MIGRATION.md", "GRAMMAR-INDEX.md",
  "archive/registry-pre-obsidian-v0.5.184/full-construction-registry.json",
  "test-data/grammar-legitimacy-audit.tsv", "test-data/grammar-legitimacy-audit.json",
];
for (const rel of required) check(`required file: ${rel}`, fs.existsSync(path.join(root, rel)));
const notes = loadConstructionNotes(root);
const counts = {};
for (const note of notes) counts[note.frontmatter.status] = (counts[note.frontmatter.status] || 0) + 1;
check("171 construction notes", notes.length === 171, String(notes.length));
check("supported count zero", (counts.supported_productive || 0) === 0, String(counts.supported_productive || 0));
check("two provisional_reaudit", counts.provisional_reaudit === 2, String(counts.provisional_reaudit));
check("ordinary provisional zero", (counts.provisional || 0) === 0, String(counts.provisional || 0));
check("research_pending 58", counts.research_pending === 58, String(counts.research_pending));
const state = fs.readFileSync(path.join(root, "docs/current/PROJECT-STATE.md"), "utf8");
const doctrine = fs.readFileSync(path.join(root, "docs/current/DOCTRINE.md"), "utf8");
const dod = fs.readFileSync(path.join(root, "docs/current/DEFINITION-OF-DONE.md"), "utf8");
check("project state names grammar notes as registry", /grammar\//.test(state));
check("Definition of Done controls supported_productive", /eligible for `supported_productive`[\s\S]*ALL/i.test(dod));
check("Definition of Done controls provisional", /Definition of Done: `provisional`/i.test(dod));
check("Definition of Done requires two speakers", /Two independent native speakers/i.test(dod));
check("doctrine rejects raw corpus counts", /Raw corpus hit counts have no evidence weight/i.test(doctrine));
const currentText = fs.readdirSync(path.join(root, "docs/current")).filter((f) => f.endsWith(".md")).map((f) => fs.readFileSync(path.join(root, "docs/current", f), "utf8")).join("\n");
check("current docs do not name archived wide registries", !/CONSTRUCTION-STATUS-REGISTRY-v0\.5\.184-R2|CONSTRUCTION-EVIDENCE-REAUDIT-LEDGER-v0\.5\.184-R1|ACTIVE-SOURCE-ACCOUNTING-v0\.5\.184-R1/.test(currentText));
const result = { schema: "canto-span-current-focused-result-v8", checkpoint: "v0.5.184-obsidian-registry-migration", parser_behavior_changed: false, registry_owner: "grammar/*.md", status_counts: counts, total: checks.length, passed: checks.length - failures.length, failed: failures.length, status: failures.length ? "FAIL" : "PASS", checks, failures };
const outDir = path.join(root, "validation", "infrastructure");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "phase2-current-focused.json"), JSON.stringify(result, null, 2) + "\n");
console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
