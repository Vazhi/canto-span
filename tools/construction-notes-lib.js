"use strict";

const fs = require("fs");
const path = require("path");

const WORKFLOW_STATES = ["active", "archived"];

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
  return Object.fromEntries(WORKFLOW_STATES.map((state) => [state, path.join(grammarDir, state)]));
}

function loadConstructionNotes(root, workflowState = null) {
  if (workflowState !== null && !WORKFLOW_STATES.includes(workflowState)) {
    throw new Error(`Unknown construction workflow state: ${workflowState}`);
  }
  const directories = constructionNoteDirectories(root);
  const states = workflowState === null ? WORKFLOW_STATES : [workflowState];
  const files = [];
  for (const state of states) {
    const directory = directories[state];
    if (!fs.existsSync(directory)) continue;
    for (const name of fs.readdirSync(directory).filter((item) => item.endsWith(".md")).sort()) {
      files.push(path.join(directory, name));
    }
  }
  return files.map(parseConstructionNote).sort((a, b) =>
    String(a.frontmatter.construction).localeCompare(String(b.frontmatter.construction))
  );
}

function findConstructionNote(root, construction) {
  const matches = loadConstructionNotes(root).filter((note) => note.frontmatter.construction === construction);
  if (matches.length !== 1) {
    throw new Error(`Expected one construction note for ${construction}; found ${matches.length}`);
  }
  return matches[0];
}

module.exports = {
  WORKFLOW_STATES,
  parseConstructionNote,
  constructionNoteDirectories,
  loadConstructionNotes,
  findConstructionNote,
};
