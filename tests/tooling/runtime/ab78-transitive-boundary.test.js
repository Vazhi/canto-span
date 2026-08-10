"use strict";
const assert=require("assert");
const test=require("node:test");
const {loadRuntimeApi,internalConstruction,rowSurface}=require("../../lib/runtime-api");
const api=loadRuntimeApi();
const rows=(source,context=null)=>api.diagnosticFinalRows(api.analyzeLine(source,context));
const constructions=(source,type,context=null)=>rows(source,context).filter(row=>row.kind==="construction"&&internalConstruction(row)===type);
const one=(source,type,surface=null,context=null)=>constructions(source,type,context).find(row=>surface===null||rowSurface(row)===surface)||null;

test("AB78 overt objects retain explicit object bindings",()=>{
  for(const [source,surface] of [["我講廣東話。","講廣東話"],["我食一個蘋果。","食一個蘋果"],["你睇邊本書？","睇邊本書"],["食過飯。","食過飯"]]){
    const vp=one(source,"TransitiveVP",surface);
    assert(vp,source);
    assert((vp.trace_detail.assigned_slots||[]).includes("object"),source);
  }
});
test("AB78 remains narrow under serial composition",()=>{
  const source="我去街市買餸煮飯。";
  assert(one(source,"SerialVerbPurposeChain"));
  assert.strictEqual(Array.from(constructions(source,"TransitiveVP"),rowSurface).sort().join("|"),"煮飯|買餸");
});
test("AB78 relative object gap is overt-head licensed without hidden object",()=>{
  const source="我買嘅書好貴。";
  assert(one(source,"RelativeClauseNP","我買嘅書"));
  const vp=one(source,"TransitiveVP","買");
  assert(vp);
  assert.strictEqual(vp.trace_detail.relative_gap_status,"licensed_by_overt_head_noun");
  assert.strictEqual(vp.trace_detail.relative_head_surface,"書");
  assert.deepStrictEqual(Array.from(vp.trace_detail.missing_argument_slots||[]),["object"]);
  assert(!(vp.trace_detail.assigned_slots||[]).includes("object"));
  assert(!(vp.trace_detail.surfaces||[]).includes("書"));
  assert((vp.trace_detail.not_claims||[]).includes("not_fabricated_object_token"));
});
test("AB78 excludes approximate measured quantity",()=>{
  for(const source of ["飲七杯度喇。","我飲七杯度喇。"]) {
    assert.strictEqual(constructions(source,"TransitiveVP").length,0,source);
    assert(one(source,"ApproximateQuantity","七杯度"),source);
  }
  assert.strictEqual(constructions("我飲七杯度喇。","ClauseSpan").length,0);
});
test("AB78 keeps semantic selection separate",()=>{
  assert(one("食香港。","TransitiveVP","食香港"));
  assert(one("食香港。","NeedsContext"));
});
test("AB78 stays absent from neighboring structures",()=>{
  for(const source of ["佢瞓覺。","佢好高。","我記得佢好叻。","我教佢廣東話。","我揀佢做班長。"]) {
    assert.strictEqual(constructions(source,"TransitiveVP").length,0,source);
  }
});
