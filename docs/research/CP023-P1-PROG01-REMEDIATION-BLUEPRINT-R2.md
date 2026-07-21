# CP023-P1-PROG01 remediation blueprint — R2

Date: 2026-07-20  
Status: **blueprint frozen; implementation and prospective custody remain blocked**  
Accepted runtime: **v0.5.182**, unchanged  
Research target: **`PostverbalGanProgressiveVP`**

## Decision

The narrow postverbal `V緊O` profile is sufficiently attested to remain an authority-origin research candidate, but it is **not implementation-ready**. The R1 assumption that evaluator custody could follow immediately after a blueprint was too early. Baseline probing shows that the apparent progressive defect is a combination of at least four independent systems:

1. lexical recognition and homograph/polysemy handling;
2. nominal constituent assembly and scope;
3. progressive wrapper span/reassembly;
4. predicate–aspect compatibility.

Selecting hidden cases before these dependencies are specified would risk testing an unstable and partly undefined target. Custody therefore remains unselected.

## Frozen target

A future internal `PostverbalGanProgressiveVP` may cover only an overt lexical predicate followed immediately by `緊` and an overt non-interrogative object/NP, with a source-supported progressive interpretation and transparent predicate, aspect, and object spans.

This target does **not** promote broad `ProgressiveVP`, assert a free `verb × 緊 × object` template, infer an unspoken `而家`, or classify excluded environments as ungrammatical.

## Workstream A — lexical prerequisites

Implement only in a separately attributable lexicon patch after exact verification:

- atomic nouns/proper names: `數據`, `九巴`, `布甸`, `兒歌`, `樓`, `叉燒包`;
- verb senses: `唱 coeng3`, clothing `着 zoek3`;
- polysemy-safe noun sense: `信 seon3`, retaining the belief verb;
- classifier: `封 fung1` in `封信`;
- domain terms: `錫線`, `錫條`, with `錫條` pronunciation blocked pending exact compound verification.

No lexical item may be added merely because it makes a target test pass.

## Workstream B — nominal prerequisites

### B1. Associative NP under `啲`

The intended object in `啲九巴嘅數據` is `啲 [九巴嘅數據]`. Current v0.5.182 can instead group analogous `啲公司嘅報告` as `[啲公司] [嘅報告]`, and the full progressive string can receive a superficially complete outer `TransitiveVP` despite that wrong scope.

Required invariant:

- assemble the possessor-plus-head `AssociativeNP` before or as the complement of `啲`;
- do not attach `嘅報告` outside a progressive object already closed at `啲公司`;
- a root PASS must not conceal this scope error.

### B2. Coordinated nominal object

`報告同埋文件` currently has no top construction, and `問緊報告同埋文件` incorporates only `報告`. A future coordinated NP must preserve both conjuncts and the overt connector before the progressive wrapper can span the whole object.

This is a general nominal prerequisite, not a rule specific to `緊`.

### B3. Classifier NP with polysemous head

`封信` requires `封` as classifier and the noun sense of `信`. The existing belief-verb sense must remain available. The nominal construction may not be licensed by replacing all `信` tokens with a noun.

### B4. Preserve already working NPs

The implementation must retain current correct isolated analyses for:

- `嗰份報告`;
- `首歌`;
- `好靚嘅衫`;
- `公司嘅報告`.

## Workstream C — progressive representation

### C1. Whole-object span

The future subtype must span `V + 緊 + the complete object NP`, not just `V緊` and not a prematurely closed prefix such as `食緊叉`.

Required representation:

- one transparent outer subtype span;
- overt predicate child;
- overt `緊` child;
- complete object/NP child;
- no inserted argument or reference time.

### C2. Reassembly after NP recognition

Current examples `睇緊嗰份報告` and `聽緊首歌` have full root coverage under `TransitiveVP`, but the nested `ProgressiveVP` remains only `V緊`. A future implementation must decide whether:

- the progressive subtype itself owns the object; or
- aspect and transitivity stay separate but diagnostics expose a stable composite target.

The acceptance contract requires an exact, interpretable target span either way. Root coverage alone is insufficient.

### C3. Duplicate path

`ProgressiveTransitivePredicate` must be compared against the proposed subtype and either:

- merged into one representation;
- retained as a clearly internal implementation detail with no duplicate learner node; or
- retired.

No duplicate public analysis is acceptable.

## Workstream D — predicate–aspect compatibility

The current closed `action_verb` heuristic is not a defensible linguistic compatibility model. The research sources attest progressive uses outside a simple action-verb inventory, while also showing that aspect selection is restricted.

Before implementation, freeze a predicate-compatibility evidence matrix that distinguishes at least:

- source-attested lexical predicates;
- productive event classes supported by more than isolated examples;
- lexicalized or exceptional combinations;
- unresolved combinations;
- source-negative or contrastive cases.

Until that matrix exists, runtime may recognize attested lexical combinations experimentally, but `PostverbalGanProgressiveVP` cannot be promoted to `supported_productive`.

## Workstream E — boundaries and preservation

- Keep preverbal `喺度` outside the subtype.
- Keep `住`, `咗`, `過`, and `吓` separate.
- Objectless `V緊` and wh-object `V緊咩` may remain broad progressive syntax but are not evidence for the narrow subtype.
- Keep `有 + V緊` unresolved; exclusion is not a grammaticality judgment.
- Keep the cited `會 + V緊` example as one source-specific negative boundary, not a universal modal ban.
- Preserve accepted `PostverbalZoPerfectiveVP` and all inherited behavior unless deliberately changed through its own evidence gate.

## Dependency order

1. Freeze predicate-compatibility evidence matrix.
2. Freeze nominal prerequisite designs for associative scope and coordinated NP.
3. Resolve exact `錫條` Jyutping or quarantine that item from implementation data.
4. Implement and validate lexical prerequisites independently.
5. Implement nominal prerequisites independently with focused and aggregate regression gates.
6. Implement progressive representation and duplicate-node disposition.
7. Select fresh prospective held-out classes and seal custody.
8. Run headless focused, semantic, aggregate, rendered, native, natural-attestation, and one-shot held-out evaluation.
9. Consider legitimacy promotion only after all gates pass.

## Prospective held-out classes to reserve later

Do not select exact surfaces yet. The future custody design should sample:

- simple noun object;
- classifier NP;
- demonstrative-classifier NP;
- modified NP;
- associative NP under `啲`;
- coordinated NP;
- atomic multi-character object that prevents false segmentation;
- polysemous noun/verb head;
- objectless progressive;
- wh-object progressive;
- unresolved `有 + V緊`;
- modal/future boundary;
- `住`, `咗`, and `過` preservation.

Visible R1/R2 strings and all prior evaluator cases are permanently ineligible for prospective custody.

## Promotion rule

`PostverbalGanProgressiveVP` remains a research-only name. A future implementation may be evaluated without promotion. `supported_productive` remains **2** unless prospective, rendered, natural-attestation, boundary, native-review, and regression evidence jointly support the frozen claim.

## Next bounded action

Build the predicate-compatibility evidence matrix and the two nominal prerequisite design packets. Do **not** select held-out custody or edit runtime before those are frozen.
