---
title: Canto Span — Grammar Index
type: framework-note
status: current
tags: [canto-span/grammar, canto-span/index]
---

# Grammar index

This index navigates current linguistic-status notes. It does not replace the
permanent identity registry or expert adjudication records.

- current runtime labels / notes: **133 / 133**
- retired runtime labels: **48**
- permanent UUID records: **181**
- adjudicated UUID records: **34**
- active workflow notes: **2**
- folder guide: [`grammar/README.md`](grammar/README.md)
- current baseline: [`docs/current/PROJECT-STATE.md`](docs/current/PROJECT-STATE.md)

## Authority boundary

The note filename and `construction` frontmatter identify the current runtime
alias. Use `construction_code` and `canonical_name` from
`data/construction-identities.json` for durable analysis. Accepted adjudication
supersedes older naming or ontology statements without silently changing the
runtime matcher or note status.

## Active runtime-note working set

1. `AB53 ResourceInitialJungLaiFunctionClause` — runtime/status-note alias
   [[ResourceUseLaiFunctionRelation]].
2. `AB30 ZoMarkedPerfectiveObjectVP` — runtime/status-note alias
   [[PostverbalZoPerfectiveVP]].

These two active note flags do not define the repository-wide adjudication queue.
All other current notes are parked through `workflow_state: archived`, not
retired.

## Status navigation

| Status folder | Notes | Meaning |
|---|---:|---|
| [`supported_productive/`](grammar/supported_productive/) | 0 | Full current-standard productive support. |
| [`provisional_reaudit/`](grammar/provisional_reaudit/) | 0 | Former acceptance pending current-standard re-audit. |
| [`provisional/`](grammar/provisional/) | 0 | Narrow provisional support; productive requirements incomplete. |
| [`research_pending/`](grammar/research_pending/) | 79 | Concrete research question; provisional requirements incomplete. |
| [`unsupported_generalization/`](grammar/unsupported_generalization/) | 37 | Existing broad claim lacks a defensible supported scope. |
| [`lexicalized_only/`](grammar/lexicalized_only/) | 2 | Bounded lexical expressions only. |
| [`parser_heuristic/`](grammar/parser_heuristic/) | 15 | Internal software representation. |
| [`retired/`](grammar/retired/) | 48 | Navigation for labels absent from the active runtime registry. |

## Identity and discovery navigation

- permanent identities: [`data/construction-identities.json`](data/construction-identities.json)
- accepted adjudications: [`data/construction-adjudications.json`](data/construction-adjudications.json)
- append-only batches: [`data/construction-adjudication-batches/`](data/construction-adjudication-batches/)
- readiness registry: [`data/construction-candidate-readiness.json`](data/construction-candidate-readiness.json)
- ranked candidates: [`docs/research/SUPPORTED-PRODUCTIVE-CANDIDATES.md`](docs/research/SUPPORTED-PRODUCTIVE-CANDIDATES.md)
- family gaps: [`docs/research/CONSTRUCTION-FAMILY-GAPS.md`](docs/research/CONSTRUCTION-FAMILY-GAPS.md)
- orphaned evidence: [`docs/research/ORPHANED-CONSTRUCTION-EVIDENCE.md`](docs/research/ORPHANED-CONSTRUCTION-EVIDENCE.md)

## Standard test coverage

- `positive_and_boundary`: **132**
- `positive_only`: **0**
- `implementation_positive_only`: **0**
- `compatibility_alias_only`: **1**
- command: `npm test`

Test coverage demonstrates implementation behavior only. It does not promote a
construction or override accepted ontology decisions.
