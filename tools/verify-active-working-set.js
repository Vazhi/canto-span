#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const notes = loadConstructionNotes(root);
const active = notes.filter((note) => note.frontmatter.workflow_state === "active");
const archived = notes.filter((note) => note.frontmatter.workflow_state === "archived");
const expectedActive = ["PostverbalZoPerfectiveVP", "ResourceUseLaiFunctionRelation"];
const failures = [];
function check(name, condition, detail = "") {
  if (!condition) failures.push({ name, detail });
}

check("exactly two active working notes", active.length === 2, String(active.length));
check("exactly 166 archived working notes", archived.length === 166, String(archived.length));
check(
  "active set matches current bounded work",
  active.map((note) => note.frontmatter.construction).sort().join(",") === [...expectedActive].sort().join(","),
  active.map((note) => note.frontmatter.construction).sort().join(",")
);
check("active notes are under grammar/active", active.every((note) => path.dirname(note.file) === path.join(root, "grammar", "active")));
check("archived notes are under grammar/archived", archived.every((note) => path.dirname(note.file) === path.join(root, "grammar", "archived")));
check("all current notes remain runtime active", notes.every((note) => note.frontmatter.runtime_active === true));
check("active priorities are unique positive integers", (() => {
  const priorities = active.map((note) => note.frontmatter.workflow_priority);
  return priorities.every((value) => Number.isInteger(value) && value > 0) && new Set(priorities).size === priorities.length;
})());
check("active priorities are contiguous", active.map((note) => note.frontmatter.workflow_priority).sort((a, b) => a - b).join(",") === "1,2");
check("archived notes have null priority", archived.every((note) => note.frontmatter.workflow_priority === null));
check("workflow tags match state", notes.every((note) => Array.isArray(note.frontmatter.tags) && note.frontmatter.tags.includes(`canto-span/workflow/${note.frontmatter.workflow_state}`)));
check("workflow dates are recorded", notes.every((note) => /^\d{4}-\d{2}-\d{2}$/.test(String(note.frontmatter.workflow_since))));
check("workflow reasons are recorded", notes.every((note) => typeof note.frontmatter.workflow_reason === "string" && note.frontmatter.workflow_reason.length > 0));

const report = {
  schema: "canto-span-active-working-set-validation-v1",
  active_count: active.length,
  archived_count: archived.length,
  active_working_set: active
    .sort((a, b) => a.frontmatter.workflow_priority - b.frontmatter.workflow_priority)
    .map((note) => ({
      construction: note.frontmatter.construction,
      priority: note.frontmatter.workflow_priority,
      reason: note.frontmatter.workflow_reason,
    })),
  failed: failures.length,
  status: failures.length ? "FAIL" : "PASS",
  failures,
};
const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.json"), "utf8"));
const outDir = path.join(root, "validation", `v${manifest.version}`);
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "active-working-set.json"), JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exit(1);
