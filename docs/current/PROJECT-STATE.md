# Project state

## Current baseline

- runtime candidate: **v0.5.184**
- active runtime registry: **171 labels**
- active governance registry: **171 labels**
- runtime/governance status mismatches: **0**
- retired-label runtime residues: **0**
- current `supported_productive`: **0**
- current `provisional_reaudit`: **2**
- second-speaker work: **frozen; requirement retained**
- DEMO01 promotion track: **abandoned**

The canonical construction registry is the 171-note collection under [`../../grammar/`](../../grammar/), indexed by [`../../GRAMMAR-INDEX.md`](../../GRAMMAR-INDEX.md).

| Linguistic status | Count |
|---|---:|
| `supported_productive` | 0 |
| `provisional_reaudit` | 2 |
| `provisional` | 0 |
| `research_pending` | 58 |
| `unsupported_generalization` | 87 |
| `lexicalized_only` | 3 |
| `parser_heuristic` | 21 |

## v0.5.184 runtime correction

The previous documentation/runtime contradiction is closed.

- `PostverbalZoPerfectiveVP` is embedded as `provisional_reaudit`, not `supported_productive/high`.
- `ResourceUseLaiFunctionRelation` is embedded as `provisional_reaudit`.
- all other active statuses match the current registry;
- the ten labels retired in v0.5.183 are removed from the active runtime registry;
- no status was promoted.

## Compositional NP subsystem

v0.5.184 implements the first bounded reusable NP slice described in [`NOUN-PHRASE-SUBSYSTEM.md`](NOUN-PHRASE-SUBSYSTEM.md).

Implemented structures:

1. bare overt noun heads;
2. numeral–classifier–noun phrases;
3. demonstrative–classifier–noun phrases;
4. simple associative `modifier + 嘅 + noun` phrases;
5. binary nominal coordination with `同` or `同埋`.

Classifier phrases become `licensed_np` only when the classifier and overt noun head match a recorded lexical compatibility class. An unknown class, unknown head, headless phrase, or incompatible pairing remains `provisional_np_candidate` and cannot license an evidence-gated construction.

The executable matrix includes combinations not copied from the motivating perfective examples. It passes **43/43**.

## Postverbal `咗`

`PostverbalZoPerfectiveVP` remains `provisional_reaudit`.

The runtime now consumes a complete licensed NP object for examples such as:

- `睇咗兩本書`;
- `睇咗三個醫生`;
- `答咗你嘅問題`;
- `買咗書同埋筆`;
- `食咗香港嘅飯`.

It does not fire for classifier-incompatible or structurally unsupported objects such as `三本水`, `三杯書`, `三書`, or an unknown nominal head. This is an implementation improvement only. It does not restore productive status or broaden the evidence claim.

## Known limits

- `啲 A 嘅 N` attachment is not yet represented as an explicit ambiguity.
- recursive modified NPs and coordination of complex conjuncts remain incomplete.
- classifier compatibility covers a bounded initial set, not the complete Cantonese classifier system.
- `呢隻牌子` remains unlicensed because the noun/classifier analysis and native judgment are unresolved.
- final-`未` question wrapping still does not preserve every possible licensed object analysis.
- second-speaker requirements remain unmet and frozen.

## DEMO01 disposition

The DEMO01 promotion, render, and held-out track is abandoned. Its historical visible materials and tools are under `archive/abandoned-demo01/v0.5.184/`. No held-out result was used. The demonstrative–classifier–noun parser component remains available only as part of the shared NP subsystem and remains `research_pending` linguistically.

## Validation

- NP subsystem: **43/43 PASS**
- aggregate regression: **545/545 PASS**
- runtime/governance alignment: **PASS**
- active label count: **171**
- `supported_productive`: **0**

## Infrastructure state

Git history is now the authoritative change record. The baseline commit preserves the complete v0.5.184 tree before migration. Checkpoint-state files, recovery-package manifests, and combined recovery-package tooling are archived. Full working-copy exports must include `.git/` and be stored outside the sandbox.

## Infrastructure migration state

Phase 2 is complete. The active registry now consists of 171 Obsidian construction notes. The former wide status, source-accounting, and re-audit tables are frozen under `archive/registry-pre-obsidian-v0.5.184/`.

## Next action

Complete infrastructure migration Phase 3: remove authoring-time evidence metadata from `main.js`, retain only runtime parser logic and minimal active-label information, and prove that parser behavior is unchanged. Phase 4 will then enforce status promotion mechanically from construction-note frontmatter.
