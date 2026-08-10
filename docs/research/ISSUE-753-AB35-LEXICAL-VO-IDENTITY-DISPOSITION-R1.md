# Issue 753 — AB35 lexical V–O compound identity disposition R1

Date: 2026-08-10  
Permanent code: AB35  
Permanent UUID: `1dcefdcf-a978-5cf5-8045-26db1d6f5c1a`  
Legacy/current canonical name under review: `ProductiveVO`

## Decision

**Retain the existing AB35 UUID and short code, but narrow and rename the permanent linguistic identity.**

Recommended canonical name:

`VerbObjectCompound`

Recommended profile:

`LexicallyRestrictedVerbObjectCompoundPredicate`

Recommended claim layer:

`language_construction`

Recommended linguistic status after the identity rename:

`research_pending`

Recommended family:

`LexicalCompounding`

No family ID is allocated in this research/design task. If the canonical family registry requires an ID, that allocation belongs to the later identity-write package; do not keep AB35 in `ValencyAndArgumentStructure` merely to avoid a family migration if that would imply an ordinary argument relation for the compound-internal nominal component.

## Why the UUID survives

The current project contract states that clarification or narrowing normally retains a UUID, while a true split requires new collision-checked UUIDs and explicit predecessor/successor links.

The merged AB35 research and ownership-removal inventory show a **mixed legacy family**, but the cleanup does not require creating two new descendants:

1. ordinary transparent predicate–object behavior already has the independently adjudicated AB78 `TransitiveVP` domain;
2. a genuine Cantonese V–O-compound domain is independently established by the reviewed sources;
3. unresolved activity expressions are not being converted into a new construction merely because they were historically present in the whitelist;
4. transition blockers (`煮嘢食`, `下棋`, `做運動`) remain separate unresolved work rather than becoming successor identities.

The operation is therefore a **narrowing of AB35 to the defensible surviving subdomain**, not a split of one established construction into multiple new linguistic constructions.

A new UUID would be required later only if independent evidence establishes an additional construction that is not already represented by AB78 or another current identity.

## Why `ProductiveVO` must be replaced

The historical name conflates three different notions:

- surface verb–object order;
- lexical/morphosyntactic verb–object compounds;
- GACS developmental type-based “productivity” scoring.

The issue #744 re-audit establishes that these are not equivalent. The sources explicitly distinguish ordinary `[V (Asp) NP]` syntax from V–O compounds, and the compound literature emphasizes lexical/item-specific behavior and variable separability rather than unrestricted V+noun generation.

`VerbObjectCompound` follows the source terminology and does not encode an unsupported productivity claim.

## Source-backed core

The reviewed source package directly establishes a Cantonese V–O-compound domain and directly identifies or analyzes examples including:

- `讀書` — identified as a V–O compound in Alderete et al.;
- `飲茶` — identified as a V–O compound with lexical ‘have dim sum’ semantics in Alderete et al.;
- `游水` — analyzed as a Cantonese V–O compound in Bodomo et al.;
- `沖涼` — used as a Cantonese V–O compound in Bodomo et al. syntactic diagnostics.

For migration from the **current AB35 runtime whitelist**, the initial source-backed seed is therefore:

- `飲茶`
- `游水`
- `沖涼`

`讀書` is a source-backed identity/example probe but is not silently added to runtime in this decision task because it is not currently one of the 43 AB35 compatibility entries.

## Explicit non-membership / unresolved policy

### Ordinary V–NP

`做功課` is directly source-illustrated as ordinary `[V Asp NP]` behavior. It must not remain a positive example of the narrowed AB35 identity merely because the legacy whitelist contained it.

Other transparent-looking V–NP surfaces may later move to AB78 only after item-specific evidence or an independently justified general lexical/category rule establishes that analysis. Parser fallback alone is insufficient.

### Unresolved activities

`食飯`, `打電話`, `打籃球`, and other conventionalized/activity-like whitelist entries remain **unresolved for compound membership** unless independent evidence settles them. They do not enter the narrowed AB35 core from intuition, frequency, learner usefulness, or successful AB78 fallback.

### Transition blockers

`煮嘢食`, `下棋`, and `做運動` are excluded from the initial narrowed core. Their separate runtime/linguistic problems must be resolved independently.

## Status recommendation

Keep AB35 `research_pending` after the identity rename.

The evidence establishes a real construction domain and a bounded initial source-backed core, but it does not yet establish:

- complete lexical membership;
- uniform separability behavior;
- a dialect-wide productive rule;
- a complete negative-boundary inventory;
- reviewed corpus diversity;
- role-neutral panel evidence;
- held-out validation.

`lexicalized_only` would understate the literature if interpreted as a few isolated lexicalizations, while `supported_productive` would overstate it. `research_pending` is the accurate current status.

## Identity-record recommendation for later implementation

A later identity-write package should update the existing AB35 record, not allocate a replacement UUID:

- retain `construction_uuid: 1dcefdcf-a978-5cf5-8045-26db1d6f5c1a`;
- retain `construction_code: AB35`;
- set `canonical_name: VerbObjectCompound`;
- preserve `ProductiveVO` in `former_names` and legacy runtime labels;
- set profile to `LexicallyRestrictedVerbObjectCompoundPredicate`;
- move/review family assignment toward `LexicalCompounding`;
- set label-review recommendation to `rename_retain_narrow`;
- explicitly document that ordinary AB78 V–NP behavior and unresolved activity expressions do not inherit AB35 evidence.

That identity update must be a separately authorized registry/adjudication write with its normal immutable adjudication record. This memo does not mutate canonical identity state.

## Null and reversal condition

If later source review shows that the apparent V–O-compound examples do not support a coherent Cantonese construction domain suitable for parser representation, AB35 may still be retired in a superseding adjudication. Retaining the UUID now does not guarantee eventual promotion or permanent runtime activation.
