# Canto Span

Canto Span is a Cantonese parser and evidence-governance project. GitHub `main`
is the durable shared record. Runtime behavior, permanent construction identity,
linguistic status, corpus and panel evidence, discovery readiness, and temporary
work ownership are intentionally separate state dimensions.

## Current project state

The sole present-tense snapshot is
[`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md). It owns volatile
counts, current milestones, survey and corpus state, agent availability, and work
order. Do not copy those values into additional current-state summaries.

## Community and participation

Use [GitHub Discussions](https://github.com/Vazhi/canto-span/discussions) for
general questions, ideas, Cantonese wording feedback, regional-usage discussion,
and other community conversation.

Native or childhood Cantonese speakers can find the active questionnaire and
current recruitment status in the
[Native-panel and survey state](docs/current/PROJECT-STATE.md#native-panel-and-survey-state)
section of the canonical project snapshot.

Reserve [GitHub Issues](https://github.com/Vazhi/canto-span/issues) for
reproducible bugs, bounded research tasks, and implementation work with a clear
repository outcome.

## Authority map

- Mandatory cross-cutting contract:
  [`docs/current/00-START-HERE.md`](docs/current/00-START-HERE.md)
- Agent bootstrap:
  [`AGENTS.md`](AGENTS.md)
- Current project snapshot:
  [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md)
- Evidence, survey, status, and release governance:
  [`docs/current/GOVERNANCE.md`](docs/current/GOVERNANCE.md)
- Runtime source, deterministic parser architecture, and generated bundle:
  [`docs/current/RUNTIME-MODULARIZATION.md`](docs/current/RUNTIME-MODULARIZATION.md)
- Task routing:
  [`docs/current/CODEX-ISSUE-WORKFLOW.md`](docs/current/CODEX-ISSUE-WORKFLOW.md)
- Agent availability:
  [`docs/current/AGENT-WORKFLOW-SETTINGS.md`](docs/current/AGENT-WORKFLOW-SETTINGS.md)
- Concurrent work claims:
  [`docs/current/MULTI-AGENT-COORDINATION.md`](docs/current/MULTI-AGENT-COORDINATION.md)
- Autonomous merge authority and required safety stops:
  [`docs/current/USER-MERGE-REVIEW.md`](docs/current/USER-MERGE-REVIEW.md)
- Construction completion thresholds:
  [`docs/current/DEFINITION-OF-DONE.md`](docs/current/DEFINITION-OF-DONE.md)

When two documents appear to disagree, use the narrowest canonical owner named in
`00-START-HERE.md`. Historical research, release notes, adjudication reports, old
issues, and Git history preserve provenance but do not override current policy.

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

Generated files under `validation/current/` are verifier byproducts. They are not
canonical patch inputs and should not be committed unless a specific reviewed task
explicitly claims them.

## Research and corpus records

Completed research is indexed in
[`docs/research/CURRENT-RESEARCH-PROVENANCE.md`](docs/research/CURRENT-RESEARCH-PROVENANCE.md).
Corpus extraction and review tooling is documented in
[`tools/corpus-review/README.md`](tools/corpus-review/README.md).

A generated readiness score, parser match, test result, corpus count, or survey
submission total never promotes a construction automatically.
