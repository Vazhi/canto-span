# CP023-P1-PROG01-R2 research checkpoint

Date: 2026-07-20  
Status: **remediation blueprint and lexical verification frozen; implementation blocked**  
Accepted runtime: **v0.5.182**, unchanged  
Active research package: **CP023-P1-PROG01-R2**  
Selected research candidate: **`PostverbalGanProgressiveVP`**  
Active implementation candidate: **none**

## Work completed

- Preserved the R1 authority-origin question, source freeze, claim-source edges, natural-attestation adjudication, and 23-case visible packet.
- Verified the source-word lexicon and Jyutping requirements against entry-level dictionary or university sources.
- Recorded `錫條` compound pronunciation as unresolved instead of guessing between ordinary `tiu4` and lexical changed-tone `tiu2`.
- Captured a 32-item v0.5.182 lexicon baseline.
- Added a seven-case nominal prerequisite probe packet and observation output.
- Froze a remediation blueprint separating lexical, nominal, progressive-representation, compatibility, and boundary workstreams.
- Revised the R1 next-step assumption: fresh evaluator custody is **not** selected yet because the target remains under-specified at the nominal and predicate-compatibility layers.

## Baseline retained from R1

The 23-case visible progressive packet remains diagnostic only:

- required cases: 13;
- exact target span: 4;
- incomplete/wrong target span: 7;
- target absent: 2;
- forbidden narrow-subtype cases: 9;
- forbidden cases still containing broad `ProgressiveVP`: 3;
- full-root coverage: 14/23.

## New lexical findings

Missing or misanalysed source material includes:

- atomic nouns/proper names: `數據`, `九巴`, `布甸`, `兒歌`, `樓`, `叉燒包`;
- predicates/senses: `唱 coeng3`, clothing `着 zoek3`;
- noun/classifier pair: `封信`, where `信 seon3` currently has only the belief-verb sense;
- technical terms: `錫條`, `錫線`.

The false parse of `食緊叉燒包` as `食緊叉` demonstrates that missing atomic vocabulary can create an apparently valid but linguistically wrong progressive span.

## New nominal findings

Seven visible probes produced three full-root analyses, but full-root coverage again concealed wrong structure.

1. `公司嘅報告` correctly forms `AssociativeNP`.
2. `啲公司嘅報告` is grouped as `[啲公司] [嘅報告]` under `QuantityNP`, not `啲 [公司嘅報告]`.
3. `報告同埋文件` has no coordinated nominal top construction.
4. `問緊報告同埋文件` incorporates only the first conjunct.
5. `睇緊公司嘅報告` splits into two root constructions.
6. `睇緊啲公司嘅報告` receives a full outer `TransitiveVP`, but the internal scope remains wrong.

These defects are general nominal prerequisites. They must not be hidden inside a progressive-specific patch.

## Architectural disposition

- `ProgressiveVP`: remains **research_pending**.
- `ProgressiveTransitivePredicate`: remains an internal duplicate pending merge/retain/retire comparison.
- `PostverbalGanProgressiveVP`: remains **research-only; absent from runtime and registry**.
- `supported_productive`: remains **2**.
- prospective held-out custody: **not selected**.
- parser, lexicon, Jyutping, grammar metadata, roles, manifest, and styles: **unchanged**.

## Revised dependency order

1. Build a source-backed predicate–progressive compatibility matrix.
2. Freeze designs for associative-NP scope under `啲` and coordinated nominal objects.
3. Resolve or quarantine exact `錫條` pronunciation.
4. Implement lexical and nominal prerequisites as separately evaluated work packages.
5. Implement the narrow progressive representation and duplicate-node disposition.
6. Only then select fresh prospective evaluator custody.

## Validation

- accepted v0.5.182 audit: **32/32 PASS**;
- inherited aggregate regression: **545/545 PASS**;
- documentation consistency: **PASS**;
- source accounting: **PASS**;
- runtime identity: **3/3 files byte-identical**;
- R2 research checkpoint audit: **PASS**;
- runtime behavior changed: **no**.

## Next bounded action

Create the predicate-compatibility evidence matrix and the two nominal prerequisite design packets. Do not edit runtime or select hidden custody before those specifications are frozen.
