#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const outputIndex = process.argv.indexOf("--output");
const requestedOutputPath = outputIndex !== -1 ? path.resolve(process.cwd(), process.argv[outputIndex + 1]) : null;
const ignoredDirectories = new Set([".git", "node_modules", "archive"]);
const statusDirectories = [
  "supported_productive",
  "provisional_reaudit",
  "provisional",
  "research_pending",
  "unsupported_generalization",
  "lexicalized_only",
  "parser_heuristic",
];

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

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

function fail(type, file, detail) {
  errors.push({ type, file, detail });
}

function requireText(relativePath, expected, label) {
  const text = read(relativePath);
  if (!text.includes(expected)) fail("stale_documented_value", relativePath, `${label}: expected ${JSON.stringify(expected)}`);
}

for (const file of jsonFiles) {
  try {
    JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (error) {
    fail("invalid_json", path.relative(root, file), error.message);
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
      errors.push({ type: "broken_local_link", file: path.relative(root, file), target });
    }
  }
}

const packageJson = readJson("package.json");
const manifest = readJson("manifest.json");
const runtimeVersion = packageJson.version;
const mainText = read("main.js");

if (manifest.version !== runtimeVersion) {
  fail("version_mismatch", "manifest.json", `manifest ${manifest.version} != package ${runtimeVersion}`);
}
if (!mainText.includes(`const CANTO_SPAN_RUNTIME_VERSION = "${runtimeVersion}";`)) {
  fail("version_mismatch", "main.js", `missing runtime constant ${runtimeVersion}`);
}

const statusCounts = Object.fromEntries(statusDirectories.map((status) => {
  const directory = path.join(root, "grammar", status);
  const count = fs.readdirSync(directory).filter((name) => name.endsWith(".md") && name !== "README.md").length;
  return [status, count];
}));
const noteCount = Object.values(statusCounts).reduce((sum, count) => sum + count, 0);
const noteFiles = statusDirectories.flatMap((status) => {
  const directory = path.join(root, "grammar", status);
  return fs.readdirSync(directory)
    .filter((name) => name.endsWith(".md") && name !== "README.md")
    .map((name) => path.join(directory, name));
});
const activeWorkflowCount = noteFiles.filter((file) => /\nworkflow_state:\s*["']?active["']?\s*\n/.test(fs.readFileSync(file, "utf8"))).length;
const archivedWorkflowCount = noteCount - activeWorkflowCount;
const retiredMatch = read("grammar/retired/README.md").match(/\*\*Current retired labels:\*\*\s*(\d+)/);
const retiredCount = retiredMatch ? Number(retiredMatch[1]) : null;
if (retiredCount === null) fail("missing_documented_value", "grammar/retired/README.md", "Current retired labels");

const testIndex = readJson("tests/construction-test-index.json");
const regression = readJson("tests/fixtures/regression-snapshots.json");
const npCases = readJson("tests/fixtures/np-subsystem.json");
const coverage = testIndex.files.reduce((counts, entry) => {
  counts[entry.state] = (counts[entry.state] || 0) + 1;
  return counts;
}, {});
const assertionCount = testIndex.files.reduce((sum, entry) => sum + Number(entry.executable_case_count || 0), 0);

if (testIndex.active_construction_count !== noteCount || testIndex.files.length !== noteCount) {
  fail("construction_count_mismatch", "tests/construction-test-index.json", `${testIndex.active_construction_count}/${testIndex.files.length} != ${noteCount}`);
}

for (const relativePath of ["README.md", "HANDOFF.md", "docs/current/00-START-HERE.md"]) {
  requireText(relativePath, `v${runtimeVersion}`, "runtime version");
  requireText(relativePath, `${noteCount} / ${noteCount}`, "runtime/note count");
  requireText(relativePath, `${activeWorkflowCount} active / ${archivedWorkflowCount}`, "workflow count");
  requireText(relativePath, `retired labels: **${retiredCount}**`, "retired-label count");
  requireText(relativePath, "`research_pending`: **" + statusCounts.research_pending + "**", "research-pending count");
}


requireText("docs/current/CONSTRUCTION-NOTES.md", `canonical ${noteCount}-note construction registry`, "construction-note canonical count");
requireText("docs/current/CONSTRUCTION-NOTES.md", `exactly ${noteCount} current construction notes;`, "construction-note mechanical count");
requireText("docs/current/CONSTRUCTION-NOTES.md", `exactly ${activeWorkflowCount} workflow-active and ${archivedWorkflowCount} workflow-archived notes;`, "construction-note workflow count");

requireText("docs/current/PROJECT-STATE.md", `| Runtime labels | ${noteCount} |`, "runtime labels");
requireText("docs/current/PROJECT-STATE.md", `| Current construction notes | ${noteCount} |`, "construction notes");
requireText("docs/current/PROJECT-STATE.md", `| Active working notes | ${activeWorkflowCount} |`, "active workflow notes");
requireText("docs/current/PROJECT-STATE.md", `| Workflow-archived notes | ${archivedWorkflowCount} |`, "archived workflow notes");
requireText("docs/current/PROJECT-STATE.md", `| Retired labels | ${retiredCount} |`, "retired labels");
for (const status of statusDirectories) {
  requireText("docs/current/PROJECT-STATE.md", `| \`${status}\` | ${statusCounts[status]} |`, `${status} project-state count`);
  requireText("grammar/README.md", `| [\`${status}/\`](./${status}/) | ${statusCounts[status]} |`, `${status} grammar table count`);
  requireText(`grammar/${status}/README.md`, `**Current construction notes:** ${statusCounts[status]}`, `${status} folder count`);
}

requireText("README.md", `aggregate regression: **${regression.cases.length}** cases`, "README regression count");
requireText("README.md", `NP subsystem: **${npCases.cases.length}** cases`, "README NP count");
requireText("README.md", `per-construction assertions: **${assertionCount.toLocaleString("en-US")}**`, "README assertion count");
requireText("README.md", `construction test files: **${testIndex.files.length}**`, "README test-file count");
requireText("docs/current/TESTING.md", `- ${regression.cases.length} exact regression cases;`, "testing regression count");
requireText("docs/current/TESTING.md", `- ${npCases.cases.length} NP-subsystem cases;`, "testing NP count");
requireText("docs/current/TESTING.md", `- ${assertionCount.toLocaleString("en-US")} per-construction assertions across ${testIndex.files.length} construction files.`, "testing assertion count");
requireText(
  "docs/current/TESTING.md",
  `Current coverage is ${coverage.positive_and_boundary || 0} positive-and-boundary, ${coverage.positive_only || 0} positive-only, ${coverage.implementation_positive_only || 0} implementation-only, and ${coverage.compatibility_alias_only || 0} compatibility-alias-only.`,
  "testing coverage counts"
);

const result = {
  schema: "canto-span-documentation-consistency-v2",
  checkpoint: `v${runtimeVersion}-current`,
  status: errors.length === 0 ? "PASS" : "FAIL",
  json_files: jsonFiles.length,
  markdown_files: markdownFiles.length,
  broken_local_links: errors.filter((error) => error.type === "broken_local_link").length,
  canonical_counts: {
    runtime_version: runtimeVersion,
    construction_notes: noteCount,
    workflow_active: activeWorkflowCount,
    workflow_archived: archivedWorkflowCount,
    retired_labels: retiredCount,
    statuses: statusCounts,
    regression_cases: regression.cases.length,
    np_cases: npCases.cases.length,
    construction_files: testIndex.files.length,
    construction_assertions: assertionCount,
    coverage,
  },
  errors,
};

if (requestedOutputPath) {
  fs.mkdirSync(path.dirname(requestedOutputPath), { recursive: true });
  fs.writeFileSync(requestedOutputPath, `${JSON.stringify(result, null, 2)}\n`);
}

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
process.exitCode = errors.length === 0 ? 0 : 1;
