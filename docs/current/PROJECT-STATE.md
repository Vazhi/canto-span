# Project state

This file is the sole present-tense project snapshot. Live GitHub intake and work-claim issues own current execution and overlap. Historical reports and Git history explain earlier states but do not define current policy, ownership, or work order.

## Baseline

| Measure | Current value |
|---|---:|
| Runtime | v0.5.228 |
| Runtime labels | 134 |
| Current construction notes | 134 |
| Available construction notes | 134 |
| Parked construction notes | 0 |
| Retired labels | 48 |
| Permanent UUID records | 182 |
| Expert-adjudicated UUIDs | 94 |
| Pending UUID adjudications | 88 |
| Accepted adjudication batches | 21 |
| Promotion-ready constructions | 0 |

## Agent workflow availability

| Agent workflow | Current state |
|---|---|
| ChatGPT | Available |
| Human action | Available |
| Codex | Available |

The canonical setting is [`../../config/agent-workflow-settings.json`](../../config/agent-workflow-settings.json). New intake and later reassignment may target Codex, ChatGPT, or human action, subject to normal routing, assignment, overlap, claim, verification, and review gates. Re-enabling Codex permits future routing only and does not transfer, reopen, resume, or reassign existing work.

Agent availability is independent of construction availability, which is owned by `data/parked-constructions.json`.

## Linguistic-status inventory

| Status | Records |
|---|---:|
| `supported_productive` | 0 |
| `provisional_reaudit` | 0 |
| `provisional` | 0 |
| `research_pending` | 80 |
| `unsupported_generalization` | 37 |
| `lexicalized_only` | 2 |
| `parser_heuristic` | 15 |

These counts describe current status-note placement. An accepted identity adjudication may recommend a rename, narrowing, split, internalization, or future status migration without silently moving a note or changing parser behavior.

## Identity and adjudication

The permanent registry contains 134 current and 48 retired records. UUID and short code are immutable. Canonical name, family, profile, claim layer, and learner label change only through accepted UUID-keyed adjudication.

Twenty-one accepted batches have adjudicated 94 records; 88 remain pending. Canonical decisions live in `data/construction-adjudications.json` and immutable batch files under `data/construction-adjudication-batches/`.

Current consequences include:

- v0.5.228 introduces a first-class surface-to-analyses lexical compatibility layer with stable lexical-analysis IDs while retaining all 2,384 runtime lexical surfaces and complete 2,000/2,000 Cifu top-frequency surface coverage; legacy single-analysis entries continue to normalize automatically, and the already context-sensitive `住`, `定`, and `咪` paths now preserve explicit alternative analyses rather than relying on one global lexical category;
- v0.5.227 adds 184 independently supported high-frequency lexical entries identified by the Cifu spoken top-2000 audit; compositional corpus strings and grammar-sensitive, variant, or sense-ambiguous forms remain explicit review buckets rather than being lexicalized merely to improve a coverage percentage, and no construction identity, linguistic status, evidence, survey, corpus, release, or deployment state is changed;

- v0.5.226 adds bounded behavior-first post-predicate `過` comparison for overt simple nominal target + gradable property + `過` + overt simple nominal standard, represented structurally as `SubjectPredicateClause` with explicit comparison bindings; `矮 ai2` receives the lexical coverage required by the published `細佬矮過我` example, while no new public construction identity, quantity/temporal comparison generalization, `比`/`啲` comparative generalization, status change, or evidence promotion is inferred;
- `做功課` is no longer owned by the legacy AB35/ProductiveVO compatibility whitelist at v0.5.225; it remains recognized through the accepted AB78 `TransitiveVP` typed `做 + 功課` predicate-object path, while no disposition is inferred for the other 39 unresolved legacy entries;
- `AB35 VerbObjectCompound` source-linked runtime migration has begun at v0.5.224 for the independently supported current-whitelist seed `飲茶` / `游水` / `沖涼`; those exact nodes expose component provenance without an automatic ordinary object binding, while the other 39 legacy `ProductiveVO` compatibility entries remain unchanged pending later review;
- `AB35 VerbObjectCompound` is canonical for the legacy runtime note `ProductiveVO`; the same UUID/code is retained as a source-bounded lexical V–O-compound narrowing, while the remaining 39-entry compatibility route is still unresolved and must be audited item-by-item before retirement;
- `AB30 ZoMarkedPerfectiveObjectVP` remains the nearest direct language-construction candidate and is distinct from broad internal perfective wrappers;
- `AB53 ResourceInitialJungLaiFunctionClause` is canonical for the legacy runtime note `ResourceUseLaiFunctionRelation`;
- `AA56 JauMarkedIndefiniteNPPredication` is canonical for the legacy runtime note `ExistentialPresentationalClause`; PR #593 / `833c7e15cb7b6b9f4efa2caae95461f09f9484f5` implements the accepted positive-only runtime profile under that legacy compatibility label, with no status promotion, runtime-label migration, survey, corpus, release, or deployment change;
- `AB83 JauDakMouDakAvailabilityPredicate` is canonical for the recurring preverbal `有得／冇得 + predicate` availability relation under candidate UUID `4e176fe2-a147-47c7-86c8-6778a379beb2`; issue #597 / claim #606 implement the source-first runtime identity without status promotion, survey, corpus reclassification, release, or deployment change;
- candidate UUIDs `a476c6c6-a0ba-4cf2-9021-13ad4c717d0f`, `caae4649-29cd-4752-8e5d-48ab7d9503a4`, and `af85d495-5906-4fde-a5ba-ca39285a3281` are reserved respectively for the overt PRQ2-008 sufficient-condition, PRQ2-013 ordered-preference, and PRQ2-014 clausal necessary-condition relations; they have no short codes or current runtime identities and require a later separately claimed source-first implementation and canonicalization package;
- Batch 18 internalized AB18 and AB21, retained AB19 and AB20 as retired, and narrowed AB22 to `FinalMe1BiasedPolarQuestionFrame`;
- Batch 19 retains AB25, AB26, and AB27 as retired composite parser representations and rehomes their valid component evidence under separately typed possessive nominal, fragment, and transfer or dative profiles;
- parser representations, umbrellas, and retired records do not compete for linguistic promotion or donate evidence automatically;
- true splits require new UUIDs and explicit predecessor/successor links.

Earlier accepted batch reports remain immutable. Corrections require later superseding adjudication.

## Construction work availability

The canonical construction blacklist is [`../../data/parked-constructions.json`](../../data/parked-constructions.json), and it is empty. All 134 current notes are available for bounded work. There is no active-note whitelist or repository-wide grammar freeze.

New constructions, splits, broadenings, status changes, and runtime changes still require all applicable identity, evidence, boundary, documentation, testing, and review gates. Legacy note workflow fields are compatibility metadata only.

Availability does not create a fixed research queue. Recent work on one construction or family gives its follow-up tasks neither automatic priority nor automatic exclusion.
