# Canto Span

Canto Span is a Cantonese parser and evidence-governance project. GitHub `main`
is the durable shared project record; runtime behavior, linguistic status,
permanent identity, and research readiness are intentionally tracked as separate
state dimensions.

## Current state

- runtime: **v0.5.216**
- active runtime labels / construction notes: **133 / 133**
- construction workflow: **2 active / 131 workflow-archived**
- retired labels: **48**
- permanent construction identities: **181**
- expert-adjudicated identities: **44 / 181**
- `supported_productive`: **0**
- `provisional`: **0**
- `research_pending`: **79**
- direct `boundary_ready` candidates: **1** (`AB30`)
- direct `source_supported` candidates: **68**
- current narrowing candidates: **36**
- excluded non-language/internal records: **26**
- current AB30 corpus packet: **5 reviewed; 2 genuine; 3 false positives;
  `partial_only` readiness effect**
- active survey: **`YUE-JUDGMENT-PILOT-01` remains in collection**
- follow-up survey: **`followup-draft-v1` remains non-deployable**

The remaining linguistic-status folders contain 37
`unsupported_generalization`, 2 `lexicalized_only`, and 15 `parser_heuristic`
notes. Expert adjudication has not silently changed status paths or runtime
matchers.

## Current validation targets

- aggregate regression: **551** cases
- NP subsystem: **43** cases
- per-construction assertions: **1,518**
- construction test files: **133**

## Where to start

Automated agents must first read [`AGENTS.md`](AGENTS.md), which directs them to
read the complete mandatory contract in
[`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md).

`00-START-HERE.md` defines the authority order, non-negotiable standards,
task-routing table, multi-agent workflow, verification matrix, forbidden patterns,
and the reusable Codex/agent task prompt. A task prompt may narrow scope but does
not replace that contract.

The concise current baseline is
[`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md). Historical
release descriptions remain available through Git history and research records;
they are not repeated as current policy.

## Verification

```bash
npm test
npm run verify
npm run verify:research
npm run verify:release
npm run verify:all
```

Identity and discovery checks are also available directly:

```bash
npm run verify:adjudications
npm run verify:identities
npm run verify:discovery
```

## Research records

Completed research is indexed in
[`docs/research/CURRENT-RESEARCH-PROVENANCE.md`](docs/research/CURRENT-RESEARCH-PROVENANCE.md).
Generated readiness reports rank work and expose evidence gaps; they never
promote a construction automatically.
