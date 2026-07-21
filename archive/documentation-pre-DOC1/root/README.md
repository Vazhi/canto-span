# Canto Span

Canto Span is an Obsidian plugin that renders Cantonese text with Jyutping, learner roles, hover glosses, and governed construction diagnostics.

## Current state

- Active candidate: `v0.5.179-cp022-i1a-i01-neutral-clause-span-consolidation-r1`
- Accepted baseline: `v0.5.178-cp022-i1a-i02-clause-relation-graph-cleanup-r1`
- Active construction registry: **177 labels**
- `supported_productive`: **0**
- Global grammar-legitimacy freeze: active
- Current I01 status: visible gates pass; render review pending; six prospective held-out cases sealed

I01 gives five historical public clause wrappers one neutral internal `ClauseSpan` representation. Public diagnostics remain compatible. `ClauseSpan` cannot independently license grammar, insert arguments, assign modality, determine valency, or resolve context.

## Installable runtime

The Obsidian plugin itself requires only:

- `main.js`
- `manifest.json`
- `styles.css`

Copy the `canto-span` directory containing those files into `.obsidian/plugins/`.

## Development package

The slim development package additionally retains:

- `docs/current/` — authoritative doctrine and workflow;
- `docs/research/` — canonical evidence and the latest provenance state;
- `external-evidence/` — reproducible corpus-query inventory;
- `review-packets/` — the current I01 packet and I02 preservation packet;
- `test-data/` — aggregate regression, legitimacy, provenance, corpus, and durable safety fixtures;
- `tools/` — current focused gate and stable audits;
- `validation/` — current I01 results only.

Superseded checkpoint copies, repeated cumulative matrices, old validation generations, version-specific runners, and large stale render exports are excluded. See `docs/current/PACKAGING-AND-RETENTION-POLICY.md`.

## Current validation

```bash
node tools/run-current-focused.js
node tools/verify-documentation-consistency.js
node tools/audit-slim-package.js
```

Expected core results:

- I01 visible packet: 100/100
- I02 preservation: 24/24
- aggregate regression: 545/545
- grammar legitimacy: 1087/1087
- semantic acceptance: 15/15
- pre-intermediate corpus: 80/80

## Next action

Render `render-review/CP022-I1A-I01-R1-FOCUSED-RENDER-REVIEW.md`. After clean adjudication, freeze the exact candidate and evaluate the six sealed I01 cases once. After I01 acceptance, begin the first narrow `supported_productive` promotion pilot.
