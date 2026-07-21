#!/usr/bin/env node
"use strict";
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "SLIM-PACKAGING-MANIFEST.json"), "utf8"));
const checks = [], failures = [];
function check(name, pass, detail = "") { const row = { name, pass: Boolean(pass), ...(detail ? { detail } : {}) }; checks.push(row); if (!row.pass) failures.push(row); }
function sha(rel) { return crypto.createHash("sha256").update(fs.readFileSync(path.join(root, rel))).digest("hex"); }
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => { const p=path.join(dir,e.name); return e.isDirectory()?walk(p):[p]; }); }
const files = walk(root);
const rels = files.map(f => path.relative(root,f).replaceAll(path.sep,"/"));
const totalBytes = files.reduce((n,f)=>n+fs.statSync(f).size,0);
for (const rel of manifest.required_files) check(`required: ${rel}`, fs.existsSync(path.join(root,rel)));
for (const [rel, expected] of Object.entries(manifest.runtime_sha256)) check(`runtime hash: ${rel}`, sha(rel) === expected, `${sha(rel)} vs ${expected}`);
for (const rel of manifest.forbidden_paths) check(`forbidden absent: ${rel}`, !fs.existsSync(path.join(root,rel)));
check("no custody archive", !rels.some(r => /CUSTODY|EVALUATOR-RESULTS|DO-NOT-OPEN/i.test(r)), rels.filter(r => /CUSTODY|EVALUATOR-RESULTS|DO-NOT-OPEN/i.test(r)).join(","));
check("no backup or temp files", !rels.some(r => /(^|\/)(tmp|backup|backups)(\/|$)|\.(bak|tmp|orig)$/i.test(r)));
check("file count within slim bound", files.length <= 270, String(files.length));
check("uncompressed size within slim bound", totalBytes <= 20 * 1024 * 1024, String(totalBytes));
const current = JSON.parse(fs.readFileSync(path.join(root,"validation/current-focused.json"),"utf8"));
check("current focused PASS", current.strict_ready === true && current.failed === 0);
check("I01 visible 100/100", current.visible_gate?.passed === 100 && current.visible_gate?.total === 100);
check("aggregate regression 545/545", current.aggregate_regression?.passed === 545 && current.aggregate_regression?.total === 545);
check("supported_productive zero", current.supported_productive === 0);
const docs = JSON.parse(fs.readFileSync(path.join(root,"validation/cp022-i1a-i01-r1/documentation-consistency-slim.json"),"utf8"));
check("documentation PASS", docs.status === "PASS" && docs.broken_local_links === 0);
const removedText = fs.readFileSync(path.join(root,"SLIM-REMOVED-ARTIFACTS.tsv"),"utf8").trim().split(/\r?\n/);
check("removed manifest substantial", removedText.length - 1 >= 650, String(removedText.length - 1));
check("snapshot artifacts excluded", !rels.some(r => r.startsWith("snapshot-artifacts/")));
check("historical validation generations excluded", !rels.some(r => /^validation\/(cp021|cp020|cp022-i1a-i02|cp022-i1a-i04)/.test(r) && r !== "validation/cp021b-lx1-construction-freeze-gate.json" && !r.startsWith("validation/cp021b/")));
check("current render review retained", rels.includes("render-review/CP022-I1A-I01-R1-FOCUSED-RENDER-REVIEW.md"));
const result = { schema:"canto-span-slim-package-audit-v1", checkpoint:"CP022-I1A-I01-R1-SLIM1", status:failures.length?"FAIL":"PASS", file_count:files.length, uncompressed_bytes:totalBytes, total:checks.length, passed:checks.length-failures.length, failed:failures.length, checks, failures };
fs.mkdirSync(path.join(root,"validation","cp022-i1a-i01-r1"),{recursive:true});
fs.writeFileSync(path.join(root,"validation","cp022-i1a-i01-r1","slim-package-audit.json"),JSON.stringify(result,null,2)+"\n");
console.log(JSON.stringify(result,null,2));
if (failures.length) process.exit(1);
