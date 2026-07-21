# CP022-I1A-I02 authorization

Date: 2026-07-19  
Implementation parent: `CP022-I1A-I02-D1`  
Authorized packet: `EP-CP022-I1A-I02-D1` (`I02 ClauseRelationGraph`)

## Explicit authorization

The user explicitly authorized the I02 implementation on 2026-07-19. This authorization is **packet-scoped** and does not lift the global grammar freeze.

Authorized:

- parser, registry, diagnostic, and compatibility changes required by `EP-CP022-I1A-I02-D1` only;
- internal rename of `ClauseLinkingSequence` to `ClauseRelationGraph`;
- internal rename of `ClauseRelation` to `ClauseRelationEdge`;
- internal rename of `ClauseRelationMember` to `ClauseRelationMemberSpan`;
- compatibility aliases preserving historical public diagnostic labels;
- explicit non-licensing and subtype-provenance metadata;
- visible evaluation, ordinary regression, focused rendering, and—only after render acceptance—prospective held-out evaluation.

Not authorized:

- I01 `ClauseSpan` or any other family;
- new relation subtypes, linkers, construction patterns, productivity claims, or language analyses;
- lexicon or Jyutping changes;
- changing the visible meaning, roles, tokens, spans, local constructions, root coverage, or context requirements of packet cases;
- opening the six prospective held-out cases before the implementation candidate and rendered review are frozen;
- accepting LX1 through this checkpoint.

The global `GRAMMAR_LEGITIMACY_FREEZE` remains `true`.

## Authoritative lineage

Implementation parent:

```text
506ac61825177115a1c721c5ed3f4a5e602a8ecdec177380bbed0ef250216cea  canto-span-clean-project-CP022-I1A-I02-D1-packet-locked.zip
```

Evaluator custody remains external and unopened:

```text
e90541d4b1337e2e6ae61fb24f5ddf4e6337a697d26f3d966cef2343da1c0e34  CP022-I1A-I02-D1-EVALUATOR-CUSTODY-DO-NOT-OPEN-DURING-IMPLEMENTATION.zip
```

## Next authorization boundary

No additional authorization is needed to complete render review and hidden evaluation for this exact I02 candidate. A new explicit unfreeze authorization is required before any I01 change or any other parser family is modified.
