#!/usr/bin/env node
"use strict";
const {spawnSync}=require("child_process"),fs=require("fs"),path=require("path");
const root=path.resolve(__dirname,"..");
const outDir=path.join(root,"validation/v0.5.182");fs.mkdirSync(outDir,{recursive:true});
function run(script,args=[]){const r=spawnSync(process.execPath,[path.join(root,"tools",script),...args],{cwd:root,encoding:"utf8",maxBuffer:128*1024*1024});if(r.status!==0){process.stderr.write(r.stdout||"");process.stderr.write(r.stderr||"");throw new Error(`${script} failed`);}return r.stdout.trim();}
function parse(text){const i=text.indexOf("{");return JSON.parse(text.slice(i));}
function read(rel){return JSON.parse(fs.readFileSync(path.join(root,rel),"utf8"));}
run("audit-v0.5.182-packet-lock.js");
run("run-v0.5.182-visible.js");
run("audit-v0.5.182-implementation.js");
run("run-cp022-i1a-i02-preservation.js");
run("run-regression-suite.js");
run("run-grammar-legitimacy-audit.js");
const sem=parse(run("run-semantic-acceptance.js"));
const corp=parse(run("run-pre-intermediate-corpus.js",["--json"]));
run("run-claim-provenance-audit.js");
run("audit-source-accounting.js");
run("audit-native-conflict-burden.js");
run("run-native-speaker-naturalness-audit.js");
run("run-lexicon-topology-gate.js");
const docs=parse(run("verify-documentation-consistency.js"));
fs.writeFileSync(path.join(outDir,"semantic-acceptance.json"),JSON.stringify(sem,null,2)+"\n");
fs.writeFileSync(path.join(outDir,"pre-intermediate-corpus.json"),JSON.stringify(corp,null,2)+"\n");
const packet=read("validation/v0.5.182/packet-lock-audit.json");
const vis=read("validation/v0.5.182/visible-packet-gate.json");
const impl=read("validation/v0.5.182/implementation-audit.json");
const i02=read("validation/cp022-i1a-i01-r1/i02-preservation-gate.json");
const reg=read("validation/regression-suite.json");
const leg=read("validation/grammar-legitimacy-audit-v0.5.182.json");
const src=read("validation/v0.5.182/source-accounting-and-research-retention-audit.json");
const conflict=read("validation/v0.5.182/native-conflict-burden-audit.json");
const prov=read("validation/claim-provenance-audit-current.json");
const naturalness=read("validation/native-speaker-naturalness-current.json");
const topology=read("validation/lexicon-construction-freeze-current.json");
const projectState=fs.readFileSync(path.join(root,"docs/current/PROJECT-STATE.md"),"utf8");
const renderNote=fs.readFileSync(path.join(root,"render-review/CANTO-SPAN-v0.5.182-RENDER-REVIEW.md"),"utf8");
const held=read("validation/v0.5.182/heldout-evaluation-summary.json");
const render=read("validation/v0.5.182/render-adjudication.json");
const acceptance=fs.readFileSync(path.join(root,"CANTO-SPAN-v0.5.182-ACCEPTANCE.md"),"utf8");
const checks=[
 [packet.status==="PASS"&&packet.passed===19,"original fresh packet lock integrity 19/19"],
 [vis.strict_ready&&vis.failed===0&&vis.passed===60&&vis.supported_productive_count===2,"visible remediation packet 60/60; productive count two"],
 [impl.status==="PASS"&&impl.failed===0&&impl.passed===21,"bounded implementation audit 21/21"],
 [i02.strict_ready&&i02.passed===24,"I02 preservation 24/24"],
 [reg.strict_ready&&reg.failed===0&&reg.passed===545&&reg.current_focused_excluded_case_count===0,"aggregate regression 545/545 with zero exclusions"],
 [leg.strict_ready&&leg.failed===0&&leg.fully_supported_productive_patterns===2,"grammar legitimacy passes with two narrow productive patterns"],
 [sem.strict_ready&&sem.pass===15,"semantic acceptance 15/15"],
 [corp.report&&corp.report.strict_ready&&corp.report.pass===80,"pre-intermediate corpus 80/80"],
 [src.status==="PASS"&&src.summary.unaccounted_active_labels.length===0&&src.summary.supported_productive===2,"source accounting complete; productive count two"],
 [src.summary.active_registry_labels===179&&src.summary.externally_mapped_active_language_labels===158,"registry/source totals 179 and 158"],
 [src.summary.research_retention_manifest_rows===511,"research retention 511 rows"],
 [conflict.status==="PASS"&&conflict.failed===0&&conflict.passed===13,"native-conflict burden 13/13"],
 [naturalness.strict_ready&&naturalness.failed===0&&naturalness.passed===33,"native-speaker naturalness 33/33"],
 [topology.strict_ready&&topology.failed===0&&topology.passed===545&&topology.baseline_runtime_version==="0.5.180","accepted-baseline topology 545/545"],
 [docs.status==="PASS"&&docs.broken_local_links===0,"documentation consistency"],
 [prov.strict_ready&&prov.runtime_version==="0.5.182"&&prov.failed_checks===0&&prov.summary.externally_originated_claims===4&&prov.summary.grammar_promotion_eligible===2,"claim provenance passes with two eligible accepted claims"],
 [projectState.includes("Accepted runtime: **v0.5.182**")&&projectState.includes("Rejected predecessor: **v0.5.181**"),"current state names accepted and rejected versions"],
 [render.status==="PASS"&&render.summary.checks_passed===133&&render.summary.rendered_rows===15,"render adjudication 133/133 across 15 rows"],
 [held.parser_evaluation_status==="PASS"&&held.cases_consumed===true&&held.reusable_as_prospective_heldout===false&&acceptance.includes("three independent natural attestations"),"heldout consumed and evidence-closure acceptance recorded"],
].map(([pass,name])=>({name,pass:Boolean(pass)}));
const failures=checks.filter(x=>!x.pass);
const out={schema:"canto-span-current-focused-result-v6",version:"0.5.182",status:failures.length?"FAIL":"PASS",total:checks.length,passed:checks.length-failures.length,failed:failures.length,strict_ready:failures.length===0,accepted_runtime:"v0.5.182",rejected_predecessor:"v0.5.181",active_candidate:null,active_labels:179,supported_productive:2,render:{status:"PASS",rows:15,assertions:"133/133"},heldout:{status:"PASS_CONSUMED",count:8,opened:true,reusable:false},aggregate_regression:{passed:reg.passed,total:reg.total,excluded:reg.current_focused_excluded_case_count},checks,failures};
fs.writeFileSync(path.join(root,"validation/current-focused.json"),JSON.stringify(out,null,2)+"\n");
fs.writeFileSync(path.join(outDir,"current-focused.json"),JSON.stringify(out,null,2)+"\n");
console.log(JSON.stringify(out,null,2));if(failures.length)process.exit(1);
