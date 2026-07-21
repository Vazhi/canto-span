#!/usr/bin/env node
"use strict";
const assert=require("assert"),fs=require("fs"),path=require("path"),vm=require("vm"),crypto=require("crypto");
const root=path.resolve(__dirname,"..");
function read(rel){return JSON.parse(fs.readFileSync(path.join(root,rel),"utf8"));}
function sha(rel){return crypto.createHash("sha256").update(fs.readFileSync(path.join(root,rel))).digest("hex");}
class Plugin{} class PluginSettingTab{} class Setting{} class Notice{};
const m={exports:{}},c={module:m,exports:m.exports,require:id=>id==="obsidian"?{Plugin,PluginSettingTab,Setting,Notice}:require(id),console,setTimeout,clearTimeout,Buffer};
const main=path.join(root,"main.js");
vm.runInNewContext(fs.readFileSync(main,"utf8")+`\nmodule.exports.api={runtime:CANTO_SPAN_RUNTIME_VERSION,policy:GRAMMAR_LEGITIMACY_POLICY_VERSION,freeze:GRAMMAR_LEGITIMACY_FREEZE,registry:Array.from(CONSTRUCTION_LABEL_REGISTRY),aliases:INTERNAL_CONSTRUCTION_COMPATIBILITY_ALIASES,scopes:INTERNAL_ONLY_CONSTRUCTION_SCOPES,grammarLegitimacyFor};`,c,{filename:main});
const api=m.exports.api,checks=[],failures=[];
function check(name,fn){try{fn();checks.push({name,pass:true});}catch(e){const x={name,pass:false,error:e.message};checks.push(x);failures.push(x);}}
const manifest=read("manifest.json"),leg=read("test-data/grammar-legitimacy-audit.json"),render=read("validation/v0.5.182/render-adjudication.json"),held=read("validation/v0.5.182/heldout-evaluation-summary.json"),att=read("validation/v0.5.182/natural-attestation-adjudication.json"),diff=read("validation/v0.5.182/post-evidence-acceptance-runtime-diff.json"),vis=read("validation/v0.5.182/visible-packet-gate.json"),impl=read("validation/v0.5.182/implementation-audit.json"),reg=read("validation/regression-suite.json"),i02=read("validation/cp022-i1a-i01-r1/i02-preservation-gate.json"),src=read("validation/v0.5.182/source-accounting-and-research-retention-audit.json"),prov=read("validation/claim-provenance-audit-current.json"),conflict=read("validation/v0.5.182/native-conflict-burden-audit.json"),natural=read("validation/native-speaker-naturalness-current.json"),topology=read("validation/lexicon-construction-freeze-current.json"),sem=read("validation/v0.5.182/semantic-acceptance.json"),corp=read("validation/v0.5.182/pre-intermediate-corpus.json"),docs=read("validation/v0.5.182/documentation-consistency.json");
const target=leg.patterns.find(x=>x.pattern==="ResourceUseLaiFunctionRelation"),broad=leg.patterns.find(x=>x.pattern==="IntendedFunctionRelation"),supported=leg.patterns.filter(x=>x.status==="supported_productive").map(x=>x.pattern).sort();
check("runtime version 0.5.182",()=>assert.strictEqual(api.runtime,"0.5.182"));
check("manifest version 0.5.182",()=>assert.strictEqual(manifest.version,"0.5.182"));
check("policy version 0.5.182",()=>assert.strictEqual(api.policy,"0.5.182"));
check("global grammar freeze remains active",()=>assert.strictEqual(api.freeze,true));
check("registry has 179 unique labels",()=>{assert.strictEqual(api.registry.length,179);assert.strictEqual(new Set(api.registry).size,179);});
check("exactly two narrow productive patterns",()=>assert.strictEqual(supported.join(","),"PostverbalZoPerfectiveVP,ResourceUseLaiFunctionRelation"));
check("target runtime status supported productive",()=>assert.strictEqual(api.grammarLegitimacyFor("ResourceUseLaiFunctionRelation").status,"supported_productive"));
check("broad IntendedFunctionRelation remains provisional",()=>assert.strictEqual(broad.status,"provisional"));
check("public alias preserved",()=>assert.strictEqual(api.aliases.ResourceUseLaiFunctionRelation,"IntendedFunctionRelation"));
check("internal scope remains bounded",()=>assert.strictEqual(api.scopes.ResourceUseLaiFunctionRelation,"source_linked_direct_resource_use_lai_function_relation"));
check("three independent natural examples adjudicated",()=>{assert.strictEqual(att.status,"PASS");assert.strictEqual(att.independent_natural_example_count,3);assert.strictEqual(att.independent_evidence_unit_count,3);assert(att.qualifying_examples.every(x=>x.qualifies));});
check("target legitimacy records evidence minimum",()=>{assert.strictEqual(target.independent_natural_example_count,3);assert.strictEqual(target.pattern_specific_external_source_count,4);assert.strictEqual(target.productive_acceptance_eligible,true);});
check("generated and heldout examples excluded from natural count",()=>{assert(att.excluded_from_count.includes("render-review examples"));assert(att.excluded_from_count.includes("prospective held-out cases"));});
check("render 15 rows and 133 assertions",()=>assert(render.status==="PASS"&&render.summary.rendered_rows===15&&render.summary.checks_passed===133));
check("heldout parser evaluation 8/8",()=>assert(held.parser_evaluation_status==="PASS"&&held.custody_commitments==="8/8 verified"&&held.parser_expectations_passed==="8/8"));
check("heldout consumed and never reusable",()=>assert(held.cases_consumed===true&&held.reusable_as_prospective_heldout===false));
check("visible remediation 60/60",()=>assert(vis.strict_ready&&vis.passed===60&&vis.failed===0));
check("implementation audit 21/21",()=>assert(impl.status==="PASS"&&impl.passed===21&&impl.failed===0));
check("aggregate regression 545/545",()=>assert(reg.strict_ready&&reg.passed===545&&reg.failed===0&&reg.current_focused_excluded_case_count===0));
check("I02 preservation 24/24",()=>assert(i02.strict_ready&&i02.passed===24));
check("post-evidence runtime change metadata only",()=>assert(diff.status==="PASS"&&diff.changed_main_line_count===1&&diff.parser_logic_outside_legitimacy_registry_identical));
check("manifest and styles unchanged",()=>assert(diff.manifest_unchanged&&diff.styles_unchanged));
check("source accounting clean and productive two",()=>assert(src.status==="PASS"&&src.summary.unaccounted_active_labels.length===0&&src.summary.supported_productive===2));
check("claim provenance clean and two eligible",()=>assert(prov.strict_ready&&prov.failed_checks===0&&prov.summary.grammar_promotion_eligible===2));
check("native conflict burden 13/13",()=>assert(conflict.status==="PASS"&&conflict.passed===13));
check("native naturalness 33/33",()=>assert(natural.strict_ready&&natural.passed===33&&natural.failed===0));
check("accepted-baseline topology 545/545",()=>assert(topology.strict_ready&&topology.passed===545&&topology.failed===0));
check("semantic acceptance 15/15",()=>assert(sem.strict_ready&&sem.pass===15));
check("pre-intermediate corpus 80/80",()=>assert(corp.report&&corp.report.strict_ready&&corp.report.pass===80));
check("documentation consistency PASS",()=>assert(docs.status==="PASS"&&docs.broken_local_links===0));
check("acceptance record preserves boundaries",()=>{const t=fs.readFileSync(path.join(root,"CANTO-SPAN-v0.5.182-ACCEPTANCE.md"),"utf8");assert(t.includes("separate overt user"));assert(t.includes("Broad `IntendedFunctionRelation` remains provisional"));});
check("runtime hashes present",()=>{for(const f of ["main.js","manifest.json","styles.css"])assert(/^[0-9a-f]{64}$/.test(sha(f)));});
const out={schema:"canto-span-v0.5.182-acceptance-audit-v1",version:"0.5.182",status:failures.length?"FAIL":"PASS",total:checks.length,passed:checks.length-failures.length,failed:failures.length,supported_productive:2,natural_attestations:3,render_assertions:"133/133",heldout:"8/8 consumed",runtime_hashes:{"main.js":sha("main.js"),"manifest.json":sha("manifest.json"),"styles.css":sha("styles.css")},checks,failures};
fs.writeFileSync(path.join(root,"validation/v0.5.182/acceptance-audit.json"),JSON.stringify(out,null,2)+"\n");
console.log(JSON.stringify(out,null,2));if(failures.length)process.exit(1);
