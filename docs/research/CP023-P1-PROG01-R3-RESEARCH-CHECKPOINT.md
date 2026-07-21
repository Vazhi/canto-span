# CP023-P1-PROG01-R3 research checkpoint

Date: 2026-07-20  
Status: **compatibility and nominal specifications frozen; runtime and custody unchanged**  
Accepted runtime: **v0.5.182**, unchanged  
Active research package: **CP023-P1-PROG01-R3**  
Active implementation candidate: **none**

## Work completed

- Froze a 14-row predicate–progressive evidence matrix.
- Identified eight exact overt-object predicate/sense seeds while rejecting a productive `action_verb × 緊 × NP` inference.
- Froze an overt-`同埋` extension design for the existing `CoordinatedNP` representation.
- Replaced R2’s categorical `啲 [A 嘅 N]` scope assumption with an ambiguity-aware design supporting both structurally plausible attachments.
- Added 14 visible nominal design cases and proposition-level R3 claim-source edges.
- Kept exact `錫條` compound Jyutping quarantined; likely component readings are not sufficient for hard-coding the exact technical compound.
- Changed no parser, lexicon, Jyutping, legitimacy metadata, roles, manifest, or styles.

## Main correction

`啲公司嘅報告` cannot be used as a proof that `[啲公司] 嘅 報告` is linguistically wrong. The surface can support both a `啲`-marked associative nominal and an associative nominal whose associate is itself `啲`-marked. The current runtime remains inadequate because it does not transparently encode either complete relation, but the remediation must preserve ambiguity rather than force the R2-preferred attachment.

For the transcript `啲九巴嘅數據`, the discourse context makes `啲 [九巴嘅數據]` a reasonable context-preferred analysis after atomic `九巴` and `數據` recognition. That remains an inference, not a source-explicit parse.

## Predicate result

- exact overt-object source-backed seeds: **8**;
- seeds with multiple documented object profiles: **2** (`睇`, `食`);
- broad objectless boundary predicates: **2** (`嚟`, `病`);
- disputed or source-specific negative environments: **2** (`讀` under `有`, `瞓` under the cited future/modal context);
- visible-only predicates excluded from evidence: **2** (`寫`, `聽`).

The evidence is sufficient for a source-labeled seed layer, not for `supported_productive` compatibility.

## Nominal readiness

### Overt `同埋` coordination

The design is ready for a separately attributable implementation packet after evaluation is frozen. It should extend existing `CoordinatedNP`, preserve the overt connector, require two complete nominal conjuncts, and keep clause role external.

### `啲 A 嘅 N` attachment

The design is frozen, but implementation must support alternatives or review-required attachment. A single greedy bracketing is prohibited. Lexical recognition of `九巴` and `數據` remains a prerequisite.

## Evaluation disposition

Fresh prospective custody is still **not selected**. The next candidate should be the smaller, source-backed nominal prerequisite: overt `NP + 同埋 + NP` coordination. Before editing runtime, create and lock:

1. a visible focused packet with positive, negative, ambiguity, preservation, and integration rows;
2. public held-out class commitments;
3. an external sealed evaluator archive that is not visible to the implementation process;
4. rollback and aggregate-regression criteria.

The `啲 A 嘅 N` ambiguity work should remain a separate later package. Combining it with coordination would make evaluation attribution unclear.

## Validation target

R3 is research-only. Required checks are document/source integrity, state consistency, inherited accepted audits, aggregate regression, package separation, and runtime byte identity. No behavior delta is expected.

## Next bounded action

Prepare the packet lock and external evaluator-custody request for an isolated `CoordinatedNP` `同埋` extension. Do not implement until custody is independently sealed. Keep the progressive subtype and `啲` attachment work research-only.
