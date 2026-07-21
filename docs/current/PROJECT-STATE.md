# Project state

## Current baseline

- runtime candidate: **v0.5.185**
- active runtime registry: **171 labels**
- current authoring registry: **171 construction notes**
- active working set: **2 notes**
- workflow-archived current records: **169 notes**
- runtime-label / construction-note mismatch: **0**
- authoring evidence embedded in runtime: **none**
- retired-label runtime residues: **0**
- current `supported_productive`: **0**
- current `provisional_reaudit`: **2**
- native-speaker review: **RUL01 public pilot snapshot integrated at 23 responses; PFV01 Speaker B and RUL01 controlled Speaker A remain pending; archived backlog frozen**
- DEMO01 promotion track: **abandoned**

The canonical construction registry is the union of 2 active notes under [`../../grammar/active/`](../../grammar/active/) and 169 workflow-archived notes under [`../../grammar/archived/`](../../grammar/archived/), indexed by [`../../GRAMMAR-INDEX.md`](../../GRAMMAR-INDEX.md). Workflow archiving does not retire runtime labels or change linguistic status.

| Linguistic status | Count |
|---|---:|
| `supported_productive` | 0 |
| `provisional_reaudit` | 2 |
| `provisional` | 0 |
| `research_pending` | 58 |
| `unsupported_generalization` | 87 |
| `lexicalized_only` | 3 |
| `parser_heuristic` | 21 |

## Runtime and governance separation

v0.5.185 removes linguistic status from the runtime entirely rather than trying to keep a second copy synchronized.

- `main.js` contains the active label registry but no construction status, confidence, source, corpus, speaker, or promotion records;
- `PostverbalZoPerfectiveVP` and `ResourceUseLaiFunctionRelation` remain `provisional_reaudit` in their construction notes;
- all linguistic statuses are owned by the union of `grammar/active/*.md` and `grammar/archived/*.md`;
- the ten retired labels remain absent from the active runtime registry;
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
- clean promotion-eligible speaker requirements remain unmet. RUL01 has 23 counted public-panel responses under a one-time pilot exception, but their promotion-eligible speaker count is 0; controlled Speaker A review remains pending.

## DEMO01 disposition

The DEMO01 promotion, render, and held-out track is abandoned. Its historical visible materials and tools are under `archive/abandoned-demo01/v0.5.184/`. No held-out result was used. The demonstrative–classifier–noun parser component remains available only as part of the shared NP subsystem and remains `research_pending` linguistically.

## Validation

- standard command: **`npm test`**
- NP subsystem: **43/43 PASS**
- aggregate regression: **545/545 PASS**
- per-construction assertions: **1,156/1,156 PASS**
- construction test files: **171/171**
- coverage: **2 positive+boundary; 100 positive-only; 69 no direct cases**
- runtime-label / construction-note alignment: **PASS**
- normalized v0.5.184 → v0.5.185 runtime equivalence: **545/545 PASS**
- active label count: **171**
- `supported_productive`: **0**
- promotion gate v2 tests: **15/15 PASS**
- release-handoff gate tests: **7/7 PASS**
- release-handoff audit: **PASS; 0 status changes**

## Infrastructure state

Git history is now the authoritative change record. The baseline commit preserves the complete v0.5.184 tree before migration, and v0.5.185 records the runtime-metadata reduction as a separate diff. Checkpoint-state files, recovery-package manifests, and combined recovery-package tooling are archived. Full working-copy exports must include `.git/` and be stored outside the sandbox.

## Infrastructure migration state

Phase 6 is complete. The active working set is limited to `PostverbalZoPerfectiveVP` and `ResourceUseLaiFunctionRelation`; the other 169 current records are parked under `grammar/archived/`. The 171 runtime labels, evidence bodies, standard tests, and Git history are unchanged. Path/state, priority, and count checks now fail closed.

Phase 5 remains complete. The active authoring registry consists of 171 Obsidian construction notes, `main.js` retains only active-label information, promotion eligibility is enforced mechanically, and current executable behavior is consolidated under `tests/`. The former wide status, source-accounting, and re-audit tables remain frozen under `archive/registry-pre-obsidian-v0.5.184/`.

Current promotion-gate result:

- construction notes checked: **171**;
- promoted status records: **0**;
- non-promoted/quarantined records: **171**;
- focused gate tests: **10/10 PASS**;
- active source/reviewer workflow: **130/130 PASS**;
- RUL01 panel snapshot audit: **109/109 PASS**;
- native-review CSV library: **9/9 PASS**.

## Phase 9 Definition-of-Done enforcement

Phase 9 adopts the user-supplied Definition of Done as the controlling completion text and upgrades mechanical enforcement without changing parser behavior or linguistic status.

- promotion gate schema: **v2**;
- every cited source must be verified for `supported_productive`;
- corpus candidates must be individually classified when used as evidence;
- speaker evidence distinguishes total panel size from promotion-eligible speakers who judged the same positive and negative contrasts;
- productive boundary inventories must be complete, executable, and passing;
- current code-document review requires a date, commit, and exact code locations;
- release audit derives status changes from Git and requires a complete audit slice;
- dormant-label review must occur within 20 handoffs of the previous full review.

Current result: `supported_productive` remains **0**, `provisional` remains **0**, and both active constructions remain `provisional_reaudit`.

## Phase 8 public-panel integration

Phase 8 integrates the first RUL01 public-panel snapshot without changing parser behavior or linguistic status.

- 23/23 retained respondents confirmed native Cantonese from childhood, daily use, complete answers, consent, and independent completion.
- The anonymized 23 × 21 matrix and item-level aggregate are committed.
- The user-authorized exception counts 23 external panel responses while keeping `promotion_eligible_independent_speaker_count: 0`.
- Strong support is recorded for several ordinary direct-resource surfaces, while broader accepted frames, semantic confounds, and instrument defects remain explicit.
- A mechanical audit recomputes every item count from the anonymized matrix.

## Phase 7 reviewer workflow

Phase 7 is complete. `review-packets/native-speaker/active-v1/` now owns the two active instruments, three Google Forms specifications, generated Apps Script, public recruitment copy, source-verification links, and counted/pending speaker state.

- `PostverbalZoPerfectiveVP`: Speaker A remains counted; public Speaker B form authorized and ready.
- `ResourceUseLaiFunctionRelation`: private Speaker A form ready; public Speaker B form authorized and ready.
- Public forms collect no real names or email addresses.
- CSV normalization never counts a speaker automatically.
- The archived construction backlog remains frozen for second-speaker work.

## Next action

Complete a controlled RUL01 Speaker A review with a revised instrument, snapshot any later public responses separately, and continue semantic/code-document narrowing. PFV01 public Speaker B remains pending. Do not promote RUL01 from the pilot-panel count alone.
