"use strict";

const fs = require("fs");
const path = require("path");

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

function loadConstructionNotes(root) {
  const grammarDir = path.join(root, "grammar");
  if (!fs.existsSync(grammarDir)) return [];
  return fs.readdirSync(grammarDir)
    .filter((name) => name.endsWith(".md"))
    .sort()
    .map((name) => parseConstructionNote(path.join(grammarDir, name)));
}

module.exports = { parseConstructionNote, loadConstructionNotes };
