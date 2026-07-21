#!/usr/bin/env node
"use strict";
const assert=require("assert"),fs=require("fs"),path=require("path"),vm=require("vm");
const root=path.resolve(__dirname,"..");
function load(){
  class Plugin{} class PluginSettingTab{} class Setting{} class Notice{}
  const m={exports:{}};
  const c={module:m,exports:m.exports,require:id=>id==="obsidian"?{Plugin,PluginSettingTab,Setting,Notice}:require(id),console,setTimeout,clearTimeout,Buffer};
  const main=path.join(root,"main.js");
  vm.runInNewContext(fs.readFileSync(main,"utf8")+`\nmodule.exports.api={analyzeLine,diagnosticFinalRows,diagnosticSummary,rootSpanCoverageForDiagnostic,runtimeVersion:CANTO_SPAN_RUNTIME_VERSION,policyVersion:GRAMMAR_LEGITIMACY_POLICY_VERSION,freeze:GRAMMAR_LEGITIMACY_FREEZE,registry:Array.from(CONSTRUCTION_LABEL_REGISTRY),aliases:INTERNAL_CONSTRUCTION_COMPATIBILITY_ALIASES,scopes:INTERNAL_ONLY_CONSTRUCTION_SCOPES,grammarLegitimacyFor};`,c,{filename:main});
  return m.exports.api;
}
function parseTsv(file){
  const lines=fs.readFileSync(file,"utf8").trimEnd().split(/\r?\n/); const header=lines.shift().split("\t");
  return lines.filter(Boolean).map(line=>{const cells=line.split("\t");return Object.fromEntries(header.map((h,i)=>[h,cells[i]??""]));});
}
function inspect(api,s){
  const a=api.analyzeLine(s),rows=api.diagnosticFinalRows(a),summary=api.diagnosticSummary(a);
  return {rows,summary,coverage:api.rootSpanCoverageForDiagnostic(rows),constructions:rows.filter(r=>r.kind==="construction"),tokens:rows.filter(r=>r.kind==="token")};
}
const api=load();
const packet=JSON.parse(fs.readFileSync(path.join(root,"review-packets/cp025-p1-pfv01-speaker-review-r1/speaker-packet-internal.json"),"utf8"));
const governance=parseTsv(path.join(root,"docs/research/CONSTRUCTION-STATUS-REGISTRY-v0.5.183-R3.tsv"));
const gov=governance.find(r=>r.runtime_label==="PostverbalZoPerfectiveVP");
const expected={
  "PFV-P01":"present","PFV-P02":"present",
  "PFV-P03":"absent_known_object_integration_gap","PFV-P04":"absent_known_lexicon_np_gap","PFV-P05":"absent_known_object_integration_gap","PFV-P06":"absent_known_lexicon_question_integration_gap",
  "PFV-B01":"absent","PFV-B02":"absent","PFV-B03":"absent","PFV-B04":"absent","PFV-B05":"absent","PFV-B06":"absent","PFV-B07":"present_nonclean","PFV-B08":"absent"
};
const checks=[],failures=[],caseResults=[];
function check(name,fn){try{fn();checks.push({name,pass:true});}catch(e){checks.push({name,pass:false,error:e.message});failures.push({name,error:e.message});}}
check("runtime remains 0.5.183",()=>assert.strictEqual(api.runtimeVersion,"0.5.183"));
check("grammar freeze remains active",()=>assert.strictEqual(api.freeze,true));
check("runtime registry remains 181",()=>assert.strictEqual(api.registry.length,181));
check("target subtype remains registered",()=>assert(api.registry.includes("PostverbalZoPerfectiveVP")));
check("public alias remains PerfectiveVP",()=>assert.strictEqual(api.aliases.PostverbalZoPerfectiveVP,"PerfectiveVP"));
check("current governance is provisional_reaudit",()=>assert.strictEqual(gov.current_linguistic_status,"provisional_reaudit"));
check("runtime metadata remains known-stale supported_productive",()=>assert.strictEqual(api.grammarLegitimacyFor("PostverbalZoPerfectiveVP").status,"supported_productive"));
for(const tc of packet.cases){
  const result=inspect(api,tc.surface); const matches=result.constructions.filter(r=>r.internal_construction==="PostverbalZoPerfectiveVP");
  const row={case_id:tc.case_id,surface:tc.surface,design_role:tc.internal_design_role,expected:expected[tc.case_id],target_match_count:matches.length,semantic_acceptance_status:result.summary.semantic_acceptance_status||"",root_coverage:result.coverage};
  caseResults.push(row);
  const missingJyutping=result.tokens.filter(t=>!t.jyutping).map(t=>t.surface);
  row.missing_jyutping_surfaces=missingJyutping;
  if(["PFV-P04","PFV-P06"].includes(tc.case_id)) check(`${tc.case_id} known lexical Jyutping gap remains visible`,()=>assert(missingJyutping.length>0));
  else check(`${tc.case_id} complete token Jyutping`,()=>assert.strictEqual(missingJyutping.length,0,missingJyutping.join(",")));
  if(expected[tc.case_id]==="present") check(`${tc.case_id} exact target present`,()=>assert.strictEqual(matches.length,1));
  else if(expected[tc.case_id]==="absent" || expected[tc.case_id].startsWith("absent_known_")) check(`${tc.case_id} target absent in frozen runtime`,()=>assert.strictEqual(matches.length,0));
  else if(expected[tc.case_id]==="present_nonclean") check(`${tc.case_id} target is present but semantically non-clean`,()=>{assert.strictEqual(matches.length,1);assert.notStrictEqual(result.summary.semantic_acceptance_status,"MANUAL_REVIEW_ELIGIBLE");});
}
const payload={schema:"canto-span-cp025-p1-pfv01-reaudit-visible-result-v1",checkpoint:"CP025-P1-PFV01-R1",runtime_version:api.runtimeVersion,parser_behavior_changed:false,current_linguistic_status:gov.current_linguistic_status,runtime_embedded_status:api.grammarLegitimacyFor("PostverbalZoPerfectiveVP").status,case_count:packet.cases.length,linguistic_positive_probe_count:packet.cases.filter(x=>x.case_id.startsWith("PFV-P")).length,linguistic_positive_target_present_count:caseResults.filter(x=>x.case_id.startsWith("PFV-P")&&x.target_match_count===1).length,linguistic_positive_target_absent_count:caseResults.filter(x=>x.case_id.startsWith("PFV-P")&&x.target_match_count===0).length,boundary_cases:packet.cases.filter(x=>x.case_id.startsWith("PFV-B")).length,total:checks.length,passed:checks.length-failures.length,failed:failures.length,strict_ready:failures.length===0,case_results:caseResults,checks,failures};
const out=path.join(root,"validation/cp025-p1-pfv01-reaudit-r1/PFV01-VISIBLE-CURRENT.json");fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(payload,null,2)+"\n");console.log(JSON.stringify(payload,null,2));if(failures.length)process.exit(1);
