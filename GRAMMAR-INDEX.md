---
title: Canto Span — Grammar Index
type: framework-note
status: current
tags: [canto-span/grammar, canto-span/index]
---

# Grammar index

Canonical construction notes are stored once, in the folder matching their
linguistic status. Workflow state is frontmatter-only and does not determine
file location.

- Current construction notes: **133**
- Active working set: **2**
- Workflow-archived current records: **131**
- Retired labels: **48**
- Folder guide: [`grammar/README.md`](grammar/README.md)

## Current working set

1. [[ResourceUseLaiFunctionRelation]] — `research_pending`;
   survey-ready anchor awaiting the user prompt for pilot-v1 creation.
2. [[PostverbalZoPerfectiveVP]] — `research_pending`; secondary construction
   for the role-neutral panel wave and lexical-scope recheck.

Completed research evidence is indexed separately in
[`docs/research/CURRENT-RESEARCH-PROVENANCE.md`](docs/research/CURRENT-RESEARCH-PROVENANCE.md).
It does not alter the statuses below.

## Status navigation

| Status folder | Notes | Meaning |
|---|---:|---|
| [`supported_productive/`](grammar/supported_productive/) | 0 | Full current-standard productive support. |
| [`provisional_reaudit/`](grammar/provisional_reaudit/) | 0 | Former acceptance withdrawn pending current-standard re-audit. |
| [`provisional/`](grammar/provisional/) | 0 | Narrow provisional support; productive requirements incomplete. |
| [`research_pending/`](grammar/research_pending/) | 79 | Concrete research question; provisional requirements incomplete. |
| [`unsupported_generalization/`](grammar/unsupported_generalization/) | 37 | Current broad claim lacks a defensible supported scope. |
| [`lexicalized_only/`](grammar/lexicalized_only/) | 2 | Bounded lexical expressions only; no productive claim. |
| [`parser_heuristic/`](grammar/parser_heuristic/) | 15 | Internal software representation, not a language claim. |
| [`retired/`](grammar/retired/) | 48 | Navigation for labels absent from the active runtime registry. |

Each linked folder owns its current note count and review guidance. The retired
navigation table preserves every removed label and research direction without
duplicating active status ownership here.

## v0.5.216 ontology closure

The original 37 `unsupported_generalization` and 15 `parser_heuristic` labels
have final note-local dispositions. No label was promoted or retired, and no
parser-recognition path changed. Retained serialized internal nodes have
explicit nonlicensing semantics and invariant coverage.

## Standard test coverage

- `positive_and_boundary`: **132**
- `positive_only`: **0**
- `implementation_positive_only`: **0**
- `compatibility_alias_only`: **1**
- command: `npm test`
