"use strict";

const fs = require("fs");
const path = require("path");

const WORKFLOW_STATES = ["active", "archived"];
const LINGUISTIC_STATUSES = [
  "supported_productive",
  "provisional_reaudit",
  "provisional",
  "research_pending",
  "unsupported_generalization",
  "lexicalized_only",
  "parser_heuristic",
];

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

function parseConstructionNote(file) {
  const text = fs.readFileSync(file, "utf8");
  const match = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`Missing frontmatter: ${file}`);
  const frontmatter = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const colon = line.indexOf(":");
    if (colon < 1) throw new Error(`Invalid frontmatter line in ${file}: ${line}`);
    frontmatter[line.slice(0, colon).trim()] = parseScalar(line.slice(colon + 1));
  }
  return { file, text, frontmatter, body: text.slice(match[0].length) };
}

function constructionNoteDirectories(root) {
  const grammarDir = path.join(root, "grammar");
  return Object.fromEntries(
    LINGUISTIC_STATUSES.map((status) => [status, path.join(grammarDir, status)])
  );
}

function constructionNoteFiles(root) {
  const files = [];
  for (const directory of Object.values(constructionNoteDirectories(root))) {
    if (!fs.existsSync(directory)) continue;
    for (const name of fs.readdirSync(directory).sort()) {
      if (!name.endsWith(".md") || name === "README.md") continue;
      files.push(path.join(directory, name));
    }
  }
  return files;
}

function loadConstructionNotes(root, workflowState = null) {
  if (workflowState !== null && !WORKFLOW_STATES.includes(workflowState)) {
    throw new Error(`Unknown construction workflow state: ${workflowState}`);
  }
  const notes = constructionNoteFiles(root).map(parseConstructionNote);
  const filtered = workflowState === null
    ? notes
    : notes.filter((note) => note.frontmatter.workflow_state === workflowState);
  return filtered.sort((a, b) =>
    String(a.frontmatter.construction).localeCompare(String(b.frontmatter.construction))
  );
}

function findConstructionNote(root, construction) {
  const matches = loadConstructionNotes(root).filter(
    (note) => note.frontmatter.construction === construction
  );
  if (matches.length !== 1) {
    throw new Error(`Expected one construction note for ${construction}; found ${matches.length}`);
  }
  return matches[0];
}

module.exports = {
  WORKFLOW_STATES,
  LINGUISTIC_STATUSES,
  parseConstructionNote,
  constructionNoteDirectories,
  constructionNoteFiles,
  loadConstructionNotes,
  findConstructionNote,
};
