#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outputIndex = process.argv.indexOf("--output");
const requestedOutputPath = outputIndex !== -1 ? path.resolve(process.cwd(), process.argv[outputIndex + 1]) : null;
const ignoredDirectories = new Set([".git", "node_modules", "archive"]);

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (ignoredDirectories.has(entry.name)) return [];
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const files = walk(root).filter((file) => !requestedOutputPath || path.resolve(file) !== requestedOutputPath);
const markdownFiles = files.filter((file) => file.endsWith(".md"));
const jsonFiles = files.filter((file) => file.endsWith(".json"));
const errors = [];

for (const file of jsonFiles) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    errors.push({ type: "invalid_json", file: path.relative(root, file), detail: error.message });
  }
}

const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
for (const file of markdownFiles) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(linkPattern)) {
    let target = match[1].trim();
    if (!target || target.startsWith("#") || /^(https?:|mailto:|sandbox:)/i.test(target)) continue;
    if (target.startsWith("<") && target.endsWith(">")) target = target.slice(1, -1);
    target = target.split("#")[0];
    if (!target) continue;
    const absolute = target.startsWith("/")
      ? path.join(root, target.replace(/^\/+/, ""))
      : path.resolve(path.dirname(file), target);
    if (!fs.existsSync(absolute)) {
      errors.push({
        type: "broken_local_link",
        file: path.relative(root, file),
        target,
      });
    }
  }
}

const result = {
  schema: "canto-span-documentation-consistency-v1",
  checkpoint: "v0.5.198-verification-consolidation",
  status: errors.length === 0 ? "PASS" : "FAIL",
  json_files: jsonFiles.length,
  markdown_files: markdownFiles.length,
  broken_local_links: errors.filter((error) => error.type === "broken_local_link").length,
  errors,
};

if (requestedOutputPath) {
  fs.mkdirSync(path.dirname(requestedOutputPath), { recursive: true });
  fs.writeFileSync(requestedOutputPath, `${JSON.stringify(result, null, 2)}\n`);
}

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
process.exitCode = errors.length === 0 ? 0 : 1;
