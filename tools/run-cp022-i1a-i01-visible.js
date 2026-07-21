#!/usr/bin/env node
"use strict";
const assert=require("assert"),crypto=require("crypto"),fs=require("fs"),path=require("path"),vm=require("vm");
const root=path.resolve(__dirname,"..");
const CANDIDATE="v0.5.179-cp022-i1a-i01-neutral-clause-span-consolidation-r1";
const CUSTODY_SHA="964b84052849087f227efd2df7591f5fdd9d1a2f7815776daf0e3519a0b75a1c";
function loadApi(mainPath){class Plugin{} class PluginSettingTab{} class Setting{} class Notice{} const m={exports:{}};const c={module:m,exports:m.exports,require:(id)=>id==="obsidian"?{Plugin,PluginSettingTab,Setting,Notice}:require(id),console,setTimeout,clearTimeout,Buffer};vm.runInNewContext(fs.readFileSync(mainPath,"utf8")+`\nmodule.exports.__i01Api={analyzeLine,diagnosticFinalRows,diagnosticSummary,rootSpanCoverageForDiagnostic,runtimeVersion:CANTO_SPAN_RUNTIME_VERSION,policyVersion:GRAMMAR_LEGITIMACY_POLICY_VERSION,freeze:GRAMMAR_LEGITIMACY_FREEZE,registry:Array.from(CONSTRUCTION_LABEL_REGISTRY),retired:Array.from(RETIRED_CONSTRUCTION_LABEL_REGISTRY.entries()),aliases:INTERNAL_CONSTRUCTION_COMPATIBILITY_ALIASES,scopes:INTERNAL_ONLY_CONSTRUCTION_SCOPES,grammarLegitimacyFor};`,c,{filename:mainPath});return m.exports.__i01Api;}
const sha=p=>crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
function compact(row){const t=row.trace_detail||{};return{kind:row.kind||"",depth:row.depth||0,parent:row.parent||"",construction:row.construction||"",surface:row.surface||"",label:row.label||"",role:row.role||"",jyutping:row.jyutping||"",syntax:row.syntax||"",slots:row.slots||[],trace:row.trace||"",predicate_subtype:t.predicate_subtype||"",retired_label_alias:t.retired_label_alias||"",clause_modifier_profile:t.clause_modifier_profile||""};}
function inspect(api,surface){const analysis=api.analyzeLine(surface),rows=api.diagnosticFinalRows(analysis),constructions=rows.filter(r=>r.kind==="construction"),tokens=rows.filter(r=>r.kind==="token");return{analysis,rows,constructions,tokens,compactRows:rows.map(compact),coverage:api.rootSpanCoverageForDiagnostic(rows),summary:api.diagnosticSummary(analysis),spans:constructions.filter(r=>r.internal_construction==="ClauseSpan")};}
const api=loadApi(path.join(root,"main.js"));
const dir=path.join(root,"review-packets","cp022-evaluation","EP-CP022-I1A-I01-D1");
const packetPath=path.join(dir,"focused-evaluation-packet.json"),lockPath=path.join(dir,"heldout-lock-manifest.json"),baselinePath=path.join(dir,"development-baseline.json");
const packet=JSON.parse(fs.readFileSync(packetPath)), lockText=fs.readFileSync(lockPath,"utf8"), lock=JSON.parse(lockText), baseline=JSON.parse(fs.readFileSync(baselinePath));
const exact=packet.development_set.exact_positive,variants=packet.development_set.positive_variants,negatives=packet.negative_boundaries,visible=[...exact,...variants,...negatives],baselineById=new Map(baseline.cases.map(x=>[x.case_id,x]));
const checks=[],failures=[];function check(name,fn){try{const d=fn();checks.push({name,pass:true,...(d===undefined?{}:{detail:d})});}catch(e){checks.push({name,pass:false,error:e.message});failures.push({name,error:e.message});}}
const registry=new Set(api.registry),retired=new Map(api.retired),old=["SubjectPredicateClause","SubjectModalPredicateClause","LocativeModalPredicateClause","TopicModalPredicateClause","CoordinatedSubjectModalPredicateClause"];
check("runtime is I01 R1",()=>assert.strictEqual(api.runtimeVersion,"0.5.179"));
check("candidate identity exact",()=>assert.strictEqual(CANDIDATE,"v0.5.179-cp022-i1a-i01-neutral-clause-span-consolidation-r1"));
check("grammar policy 0.5.179",()=>assert.strictEqual(api.policyVersion,"0.5.179"));
check("global grammar freeze remains active",()=>assert.strictEqual(api.freeze,true));
check("packet exact",()=>assert.strictEqual(packet.packet_id,"EP-CP022-I1A-I01-D1"));
check("packet held-out locked",()=>assert.strictEqual(packet.status,"HELD_OUT_LOCKED"));
check("standing governed authorization recorded",()=>assert.strictEqual(packet.implementation_authorized_under_standing_governed_authority,true));
check("visible inventory 15",()=>assert.strictEqual(visible.length,15));
check("render inventory 10",()=>assert.strictEqual(packet.render_review.case_ids.length,10));
check("heldout commitments six",()=>assert.strictEqual(lock.commitments.length,6));
check("heldout surfaces absent",()=>{assert.strictEqual(lock.surface_visible_to_implementation,false);assert(!/"surface"\s*:/u.test(lockText));assert(!/"expected/u.test(lockText));assert(!/"salt/u.test(lockText));});
check("heldout manifest hash frozen",()=>assert.strictEqual(sha(lockPath),packet.held_out.manifest_hash));
check("custody checksum frozen",()=>assert.strictEqual(lock.custody_archive_sha256,CUSTODY_SHA));
check("custody absent from project",()=>assert(!fs.existsSync(path.join(root,lock.custody_archive_filename))));
check("active registry 177 labels",()=>assert.strictEqual(registry.size,177));
check("ClauseSpan active",()=>assert(registry.has("ClauseSpan")));
for(const x of old){check(`${x} inactive`,()=>assert(!registry.has(x)));check(`${x} retired compatibility metadata`,()=>assert(retired.has(x)));}
check("ClauseSpan default compatibility alias exact",()=>assert.strictEqual(api.aliases.ClauseSpan,"SubjectPredicateClause"));
check("ClauseSpan scope neutral",()=>assert.strictEqual(api.scopes.ClauseSpan,"neutral_complete_clause_span"));
check("ClauseSpan not supported productive",()=>assert.strictEqual(api.grammarLegitimacyFor("ClauseSpan").status,"parser_heuristic"));
for(const tc of visible){
 check(`${tc.case_id} public signature unchanged`,()=>{const exp=baselineById.get(tc.case_id);assert(exp);const r=inspect(api,tc.surface);assert.deepStrictEqual(JSON.parse(JSON.stringify(r.coverage)),exp.coverage);assert.deepStrictEqual(JSON.parse(JSON.stringify(r.compactRows)),exp.rows);assert.deepStrictEqual(JSON.parse(JSON.stringify(r.summary.top_constructions)),exp.top_constructions);});
 check(`${tc.case_id} token Jyutping complete`,()=>{for(const r of inspect(api,tc.surface).tokens)assert(r.jyutping,`${r.surface} missing Jyutping`);});
 check(`${tc.case_id} emits no retired clause label internally`,()=>{for(const r of inspect(api,tc.surface).constructions)assert(!old.includes(r.internal_construction),r.internal_construction);});
}
for(const tc of [...exact,...variants]){
 check(`${tc.case_id} has exactly one neutral ClauseSpan`,()=>{const r=inspect(api,tc.surface);assert.strictEqual(r.spans.length,1);const s=r.spans[0],t=s.internal_trace_detail||{};assert.strictEqual(s.construction,tc.expected_public_top);assert.strictEqual(t.compatibility_construction_type,tc.expected_public_top);assert.strictEqual(t.clause_span_semantic_status,"neutral_overt_span_accounting_only");assert.strictEqual(t.typed_predicate_child_preserved,true);for(const k of ["independent_grammar_licensing","subject_insertion_capability","topic_insertion_capability","argument_omission_licensing","context_resolution_capability","predicate_subtype_licensing","modal_licensing"])assert.strictEqual(t[k],false,`${k} not false`);});
 check(`${tc.case_id} preserves a typed predicate child`,()=>{const r=inspect(api,tc.surface),span=r.spans[0],children=r.constructions.filter(x=>x.depth===span.depth+1&&x.internal_parent==="ClauseSpan");const types=children.map(x=>x.internal_construction);assert(types.some(x=>["ProductiveVO","PerfectiveVP","NegatedDirectionalMotionVP","LocativePlacePhrase","ModalVP"].includes(x)),JSON.stringify(types));if(["subject_modal_clause","locative_modal_clause","topic_modal_clause","coordinated_subject_modal_clause","bare_place_modal_prefix","bare_nominal_topic_modal_prefix","subject_modal_fallback"].includes(tc.profile))assert(types.includes("ModalVP"));if(tc.profile==="coordinated_subject_modal_clause")assert(types.includes("CoordinatedNP"));});
}
for(const tc of negatives)check(`${tc.case_id} does not emit ClauseSpan`,()=>assert.strictEqual(inspect(api,tc.surface).spans.length,0));
const payload={schema:"canto-span-cp022-i1a-i01-visible-packet-result-v1",checkpoint:"CP022-I1A-I01-R1",candidate:CANDIDATE,packet_id:packet.packet_id,runtime_version:api.runtimeVersion,global_freeze_active:api.freeze,heldout_opened:false,visible_case_count:visible.length,render_case_count:packet.render_review.case_ids.length,active_registry_label_count:registry.size,total:checks.length,passed:checks.length-failures.length,failed:failures.length,strict_ready:failures.length===0,checks,failures};
const out=path.join(root,"validation","cp022-i1a-i01-r1","visible-packet-gate.json");fs.mkdirSync(path.dirname(out),{recursive:true});fs.writeFileSync(out,JSON.stringify(payload,null,2)+"\n");console.log(JSON.stringify(payload,null,2));if(failures.length)process.exit(1);
