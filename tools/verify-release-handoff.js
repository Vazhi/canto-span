#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const cp = require("child_process");
const { loadConstructionNotes } = require("./construction-notes-lib");
const { evaluatePromotion } = require("./promotion-gate-lib");
const { validateReleaseAudit } = require("./release-handoff-lib");

const root = path.resolve(__dirname, "..");
const auditPath = process.argv[2] || path.join(root, "docs", "releases", "v0.5.190-low-reference-wrapper-audit.json");
const audit = JSON.parse(fs.readFileSync(auditPath, "utf8"));
const failures = [];

function git(args) {
  return cp.execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}
function parseScalar(raw) {
  const value = raw.trim();
  if (value === "null") return null;
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (value.startsWith("[") && value.endsWith("]")) return JSON.parse(value);
  if (value.startsWith('"')) return JSON.parse(value);
  return value;
}
function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error("missing frontmatter");
  const fm = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const colon = line.indexOf(":");
    fm[line.slice(0, colon).trim()] = parseScalar(line.slice(colon + 1));
  }
  return fm;
}
function baselineStatuses(commit) {
  const paths = git(["ls-tree", "-r", "--name-only", commit, "grammar/active", "grammar/archived"])
    .split(/\r?\n/).filter((value) => value.endsWith(".md"));
  const map = new Map();
  for (const file of paths) {
    const fm = parseFrontmatter(git(["show", `${commit}:${file}`]) + "\n");
    map.set(fm.construction, fm.status);
  }
  return map;
}
function normalizedChanges(base, current) {
  const labels = [...new Set([...base.keys(), ...current.keys()])].sort();
  const changes = [];
  for (const construction of labels) {
    const oldStatus = base.has(construction) ? base.get(construction) : null;
    const newStatus = current.has(construction) ? current.get(construction) : "retired";
    if (oldStatus !== newStatus) changes.push({ construction, old_status: oldStatus, new_status: newStatus });
  }
  return changes;
}
try { git(["cat-file", "-e", `${audit.base_tree}^{tree}`]); } catch { failures.push(`missing_base_tree:${audit.base_tree}`); }

const notes = loadConstructionNotes(root);
const current = new Map(notes.map((note) => [note.frontmatter.construction, note.frontmatter.status]));
let actualChanges = [];
try { actualChanges = normalizedChanges(baselineStatuses(audit.base_tree), current); } catch (error) { failures.push(`status_diff_failed:${error.message}`); }

const supported = notes.filter((note) => note.frontmatter.status === "supported_productive");
const pending = [];
for (const note of supported) {
  const gate = evaluatePromotion(note);
  if (!note.frontmatter.current_standard_reaudit_complete || !gate.eligible) pending.push(note.frontmatter.construction);
}
pending.sort();

for (const file of audit.release_documents || []) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`missing_release_document:${file}`);
}
const retirement = JSON.parse(fs.readFileSync(path.join(root, "data", "retirement-review-state.json"), "utf8"));
const auditValidation = validateReleaseAudit({ audit, actualChanges, supportedPending: pending, retirement });
failures.push(...auditValidation.failures);
const gap = auditValidation.gap;

const report = {
  schema: "canto-span-release-handoff-gate-v2",
  release_id: audit.release_id,
  base_tree: audit.base_tree,
  actual_status_changes: actualChanges,
  supported_productive_count: supported.length,
  supported_productive_pending_reaudit: pending,
  retirement_review_gap: gap,
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const outDir = path.join(root, "validation", `v${manifest.version}`);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "release-handoff-gate.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
