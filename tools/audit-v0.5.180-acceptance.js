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
const manifest=read("manifest.json"),leg=read("test-data/grammar-legitimacy-audit.json"),reg=read("validation/regression-suite.json"),vis=read("validation/cp022-p1-pfv01-r1/visible-packet-gate.json"),render=read("validation/v0.5.180/v0.5.180-render-adjudication.json"),held=read("validation/v0.5.180/heldout-evaluation-summary.json"),diff=read("validation/v0.5.180/post-heldout-runtime-diff.json"),src=read("validation/cp022-p1-pfv01-r1/source-accounting-and-research-retention-audit.json"),conflict=read("validation/cp022-p1-pfv01-r1/native-conflict-burden-audit.json");
const supported=leg.patterns.filter(x=>x.status==="supported_productive");
check("runtime version 0.5.180",()=>assert.strictEqual(api.runtime,"0.5.180"));
check("manifest version 0.5.180",()=>assert.strictEqual(manifest.version,"0.5.180"));
check("policy version 0.5.180",()=>assert.strictEqual(api.policy,"0.5.180"));
check("global freeze remains active",()=>assert.strictEqual(api.freeze,true));
check("registry has 178 unique labels",()=>{assert.strictEqual(api.registry.length,178);assert.strictEqual(new Set(api.registry).size,178);});
check("exactly one supported productive pattern",()=>{assert.strictEqual(supported.length,1);assert.strictEqual(supported[0].pattern,"PostverbalZoPerfectiveVP");});
check("runtime subtype status supported productive",()=>assert.strictEqual(api.grammarLegitimacyFor("PostverbalZoPerfectiveVP").status,"supported_productive"));
check("broad PerfectiveVP remains provisional",()=>assert.strictEqual(api.grammarLegitimacyFor("PerfectiveVP").status,"provisional"));
check("CompletionVP remains unpromoted",()=>assert.notStrictEqual(api.grammarLegitimacyFor("CompletionVP").status,"supported_productive"));
check("public alias preserved",()=>assert.strictEqual(api.aliases.PostverbalZoPerfectiveVP,"PerfectiveVP"));
check("internal scope bounded",()=>assert.strictEqual(api.scopes.PostverbalZoPerfectiveVP,"source_linked_postverbal_zo_overt_object_perfective"));
check("visible packet 63/63",()=>assert(vis.strict_ready&&vis.passed===63));
check("render 12/12",()=>assert(render.status==="PASS"&&render.rows_passed===12));
check("render assertions 91/91",()=>assert(render.assertions_passed===91&&render.assertion_count===91));
check("native-conflicted row not positive evidence",()=>assert.strictEqual(render.native_conflict_control.used_as_positive_evidence,false));
check("heldout commitments 7/7",()=>assert(held.status==="PASS"&&held.commitments_verified===7));
check("heldout evaluations 7/7",()=>assert.strictEqual(held.evaluations_passed,7));
check("heldout consumed and nonreusable",()=>assert(held.cases_consumed===true&&held.reusable_as_prospective_heldout===false));
check("aggregate 545/545",()=>assert(reg.strict_ready&&reg.passed===545&&reg.failed===0));
check("aggregate exclusions zero",()=>assert.strictEqual(reg.current_focused_excluded_case_count,0));
check("post-heldout runtime diff metadata-only",()=>assert(diff.status==="PASS"&&diff.changed_main_line_count===1&&diff.parser_logic_outside_legitimacy_registry_identical));
check("manifest unchanged after heldout",()=>assert.strictEqual(diff.manifest_unchanged,true));
check("styles unchanged after heldout",()=>assert.strictEqual(diff.styles_unchanged,true));
check("source accounting unaccounted zero",()=>assert(src.status==="PASS"&&src.summary.unaccounted_active_labels.length===0));
check("source accounting productive one",()=>assert.strictEqual(src.summary.supported_productive,1));
check("native conflict burden 13/13",()=>assert(conflict.status==="PASS"&&conflict.passed===13));
check("V完咗O remains quarantined in acceptance record",()=>assert(fs.readFileSync(path.join(root,"docs/research/CANTO-SPAN-v0.5.180-ACCEPTANCE.md"),"utf8").includes("native-conflicted")));
check("current documentation names semantic version",()=>assert(fs.readFileSync(path.join(root,"docs/current/00-START-HERE.md"),"utf8").includes("Accepted runtime: **v0.5.180**")));
check("runtime hashes present",()=>{for(const x of ["main.js","manifest.json","styles.css"])assert(/^[0-9a-f]{64}$/.test(sha(x)));});
const out={schema:"canto-span-v0.5.180-acceptance-audit-v1",version:"0.5.180",status:failures.length?"FAIL":"PASS",total:checks.length,passed:checks.length-failures.length,failed:failures.length,supported_productive:1,runtime_hashes:{"main.js":sha("main.js"),"manifest.json":sha("manifest.json"),"styles.css":sha("styles.css")},checks,failures};
fs.writeFileSync(path.join(root,"validation/v0.5.180/acceptance-audit.json"),JSON.stringify(out,null,2)+"\n");console.log(JSON.stringify(out,null,2));if(failures.length)process.exit(1);
