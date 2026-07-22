#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const { loadRuntimeApi, internalConstruction } = require("../tests/lib/runtime-api");

const root = path.resolve(__dirname, "..");
const api = loadRuntimeApi(path.join(root, "main.js"));
const probes = JSON.parse(fs.readFileSync(path.join(root, "test-data", "nominal-wrapper-reachability-probes-v1.json"), "utf8"));
const index = JSON.parse(fs.readFileSync(path.join(root, "tests", "construction-test-index.json"), "utf8"));
const byLabel = new Map(index.files.map((row) => [row.construction, row]));
const inventoryText = fs.readFileSync(path.join(root, "docs", "research", "CP037-P1-NOMINAL-WRAPPER-INVENTORY-R1.tsv"), "utf8").trimEnd();
const inventoryLines = inventoryText.split(/\r?\n/); const headers = inventoryLines.shift().split("\t");
const inventory = inventoryLines.filter(Boolean).map((line) => Object.fromEntries(headers.map((h,i)=>[h,line.split("\t")[i]||""])));

const checks=[]; const failures=[];
function check(name, condition, detail="") { const pass=Boolean(condition); checks.push({name,pass,...(detail?{detail:String(detail)}:{})}); if(!pass) failures.push({name,detail:String(detail)}); }
function rows(source){return api.diagnosticFinalRows(api.analyzeLine(source,null)).filter((r)=>r.kind==="construction");}
function labels(source){return rows(source).map(internalConstruction).filter(Boolean);}

check("runtime version is 0.5.194", api.runtimeVersion === "0.5.194", api.runtimeVersion);
check("inventory has four labels", inventory.length===4, inventory.length);
check("probe schema", probes.schema === "canto-span-nominal-wrapper-reachability-probes-v1", probes.schema);
check("probe file has three cases", probes.cases.length===3, probes.cases.length);
check("all probes have zero evidence weight", probes.linguistic_evidence_weight===0 && probes.cases.every((p)=>p.linguistic_evidence_weight===0 && p.purpose==="runtime_reachability_only"));

for (const probe of probes.cases) {
  const target = byLabel.get(probe.construction);
  check(`${probe.construction} remains in test index`, Boolean(target));
  if (probe.assertion === "construction_present") {
    check(`${probe.case_id} reaches ${probe.construction}`, labels(probe.source).includes(probe.construction), labels(probe.source).join(","));
    check(`${probe.construction} coverage is implementation only`, target && target.state === "implementation_positive_only", target && target.state);
  } else if (probe.assertion === "compatibility_alias_present") {
    const out = rows(probe.source);
    check(`${probe.case_id} exposes ${probe.construction} compatibility alias`, out.some((r)=>r.compatibility_alias===probe.construction && internalConstruction(r)===probe.internal_construction), JSON.stringify(out));
    check(`${probe.construction} coverage is compatibility alias only`, target && target.state === "compatibility_alias_only", target && target.state);
  }
  check(`${probe.construction} has one zero-weight probe`, target && target.implementation_probe_count===1, target && target.implementation_probe_count);
  check(`${probe.construction} has zero direct positives`, target && target.positive_case_count===0, target && target.positive_case_count);
}

check("standalone possessive does not preserve PossessiveClassifierNP", !labels("我間屋。").includes("PossessiveClassifierNP"), labels("我間屋。").join(","));
check("DemonstrativeHeadNP absent from runtime", !api.labels.includes("DemonstrativeHeadNP"));
check("DemonstrativeHeadNP absent from current test index", !byLabel.has("DemonstrativeHeadNP"));
check("DemonstrativeHeadNP archived retirement record exists", fs.existsSync(path.join(root,"archive","retired-labels","v0.5.193-nominal-wrapper-audit","DemonstrativeHeadNP.md")));
check("DemonstrativeHeadNP current note removed", !fs.existsSync(path.join(root,"grammar","archived","DemonstrativeHeadNP.md")) && !fs.existsSync(path.join(root,"grammar","active","DemonstrativeHeadNP.md")));
check("test index has 42 implementation-positive-only labels", index.files.filter((r)=>r.state==="implementation_positive_only").length===42, index.files.filter((r)=>r.state==="implementation_positive_only").length);
check("test index has one compatibility-alias-only label", index.files.filter((r)=>r.state==="compatibility_alias_only").length===1, index.files.filter((r)=>r.state==="compatibility_alias_only").length);
check("test index has 23 no-direct labels", index.files.filter((r)=>r.state==="no_direct_cases").length===23, index.files.filter((r)=>r.state==="no_direct_cases").length);
check("test index has 168 active labels", index.active_construction_count===168 && index.files.length===168, index.files.length);

const result={schema:"canto-span-nominal-wrapper-audit-v1",runtime_version:api.runtimeVersion,checkpoint:"v0.5.193-nominal-wrapper-audit",parser_recognized_span_behavior_changed:false,retired_labels:["DemonstrativeHeadNP"],labels_audited:4,implementation_probes_added:2,compatibility_alias_probes_added:1,linguistic_evidence_weight_added:0,total:checks.length,passed:checks.length-failures.length,failed:failures.length,status:failures.length?"FAIL":"PASS",checks,failures};
const outDir=path.join(root,"validation",`v${api.runtimeVersion}`); fs.mkdirSync(outDir,{recursive:true}); fs.writeFileSync(path.join(outDir,"nominal-wrapper-audit.json"),JSON.stringify(result,null,2)+"\n");
console.log(JSON.stringify(result,null,2)); if(failures.length) process.exit(1);
