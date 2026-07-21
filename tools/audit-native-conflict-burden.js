#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadConstructionNotes } = require("./construction-notes-lib");

const root = path.resolve(__dirname, "..");
const checks = [];
const failures = [];
function check(name, fn) {
  try {
    const detail = fn();
    checks.push({ name, pass: true, ...(detail ? { detail } : {}) });
  } catch (error) {
    const row = { name, pass: false, error: error.message };
    checks.push(row);
    failures.push(row);
  }
}
function read(rel) { return fs.readFileSync(path.join(root, rel), "utf8"); }
function json(rel) { return JSON.parse(read(rel)); }

const evidence = read("test-data/native-speaker-naturalness-evidence-v1.tsv");
const dispositions = read("test-data/native-naturalness-conflict-dispositions.tsv");
const doctrine = read("docs/current/DOCTRINE.md");
const definition = read("docs/current/DEFINITION-OF-DONE.md");
const policy = json("review-packets/native-panel/active-v2/panel-policy.json");
const notes = loadConstructionNotes(root);
const byLabel = new Map(notes.map((note) => [note.frontmatter.construction, note.frontmatter]));
const pfv = byLabel.get("PostverbalZoPerfectiveVP");
const rul = byLabel.get("ResourceUseLaiFunctionRelation");

check("two exact V完咗O native rejections retained", () => {
  for (const sentence of ["食完咗飯。", "我食完咗飯。"]) {
    if (!evidence.includes(`${sentence}\t\tmarked_unnatural`)) throw new Error(`missing rejection ${sentence}`);
  }
});
check("accepted completion contrasts retained", () => {
  for (const sentence of ["我食完飯。", "我食完飯喇。"]) {
    if (!evidence.includes(`${sentence}\t\taccepted_unchecked`)) throw new Error(`missing contrast ${sentence}`);
  }
});
check("higher-burden disposition remains recorded", () => {
  if ((dispositions.match(/quarantine_native_conflicted_V完咗O_family_higher_burden/g) || []).length < 2) {
    throw new Error("higher-burden dispositions missing");
  }
});
check("dialect or register explanation is not assumed", () => {
  for (const stale of [
    "Treat this as surface, lexical, discourse, register, or speaker variation",
    "retain_as_native_surface_variation_conflict_after_external_attestation",
  ]) {
    if (dispositions.includes(stale)) throw new Error(`stale wording: ${stale}`);
  }
});
check("no construction is currently supported_productive", () => {
  const labels = notes.filter((note) => note.frontmatter.status === "supported_productive").map((note) => note.frontmatter.construction);
  if (labels.length) throw new Error(labels.join(","));
});
check("no construction is currently provisional", () => {
  const labels = notes.filter((note) => note.frontmatter.status === "provisional").map((note) => note.frontmatter.construction);
  if (labels.length) throw new Error(labels.join(","));
});
check("PFV awaits a clean role-neutral panel", () => {
  if (pfv?.status !== "research_pending" || pfv?.survey_instrument_status !== "legacy_limited") {
    throw new Error(JSON.stringify({ status: pfv?.status, instrument: pfv?.survey_instrument_status }));
  }
});
check("ResourceUse awaits a clean role-neutral panel", () => {
  if (rul?.status !== "research_pending" || rul?.survey_instrument_status !== "pilot_limited") {
    throw new Error(JSON.stringify({ status: rul?.status, instrument: rul?.survey_instrument_status }));
  }
});
check("publication attestation alone remains insufficient", () => {
  if (!/publication/i.test(doctrine) || !/does not by itself prove|not sufficient|insufficient/i.test(doctrine)) {
    throw new Error("doctrine lacks publication-attestation limitation");
  }
});
check("role-neutral respondent policy is explicit", () => {
  if (!definition.includes("No respondent receives special status or weight")) throw new Error("role-neutral rule missing");
  if (policy.respondent_policy.privileged_or_named_reviewer_roles !== false) throw new Error("named roles not disabled");
  if (policy.respondent_policy.special_weighting_for_user_relatives !== false) throw new Error("relative weighting not disabled");
});
check("item-level thresholds are explicit", () => {
  const thresholds = policy.evidence_thresholds;
  if (thresholds.provisional_minimum_usable_judgments_per_critical_item !== 10) throw new Error("provisional threshold mismatch");
  if (thresholds.supported_productive_minimum_usable_judgments_per_critical_item !== 30) throw new Error("supported threshold mismatch");
});
check("large limited panels cannot satisfy promotion", () => {
  if (!definition.includes("large submission count without usable per-item coverage")) throw new Error("raw-count non-criterion missing");
  if (Number(pfv?.minimum_usable_judgments_per_critical_item) !== 0) throw new Error("PFV clean item coverage invented");
  if (Number(rul?.minimum_usable_judgments_per_critical_item) !== 0) throw new Error("RUL clean item coverage invented");
});
check("internal validation remains necessary but insufficient", () => {
  if (!definition.includes("regardless of internal render, regression, or held-out success")) throw new Error("separation rule missing");
});

const manifest = json("manifest.json");
const out = {
  schema: "canto-span-native-conflict-burden-audit-v4",
  checkpoint: `v${manifest.version}-role-neutral-panel-model`,
  status: failures.length ? "FAIL" : "PASS",
  total: checks.length,
  passed: checks.length - failures.length,
  failed: failures.length,
  policy: {
    publication_attestation_alone_sufficient: false,
    assumed_dialect_explanation: false,
    privileged_reviewer_roles: false,
    evidence_unit: "usable_adjudicated_judgment_per_critical_item",
    provisional_item_minimum: 10,
    supported_productive_item_minimum: 30,
  },
  checks,
  failures,
};
const outPath = path.join(root, "validation", `v${manifest.version}`, "native-conflict-burden.json");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(out, null, 2) + "\n");
console.log(JSON.stringify(out, null, 2));
if (failures.length) process.exit(1);
