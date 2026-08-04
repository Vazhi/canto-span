---
title: Canto Span — Pedagogical Corpus Review Contract
status: current
tags: [canto-span/research, canto-span/corpus, canto-span/governance]
related: "[[00-START-HERE]] [[TESTING-POLICY]] [[MULTI-AGENT-COORDINATION]] [[PROJECT-STATE]]"
---

# Pedagogical corpus review contract

Pedagogical source material may supply lexical, pronunciation, translation, discourse, or construction observations. It does not by itself establish productivity, dialect-wide naturalness, parser correctness, construction identity, runtime acceptance, or linguistic status.

## Registry classes

`config/pedagogical-corpus-packages.json` is the complete index under `data/pedagogical-corpus`.

- `packages` contains active packages that pass the shared manifest and review contract.
- `legacy_archives` declares preserved pre-contract roots. Declaration keeps root coverage closed but grants no review authority.
- `migration_queue` is an ordered priority subset of `legacy_archives`. Each queue entry must match its archive package ID, source issue, and source root exactly.

Active and legacy IDs and roots must be unique, mutually exclusive, real directories strictly below the configured package root, and non-overlapping. Every file below the package root must belong to exactly one active package or declared legacy archive. Undeclared files, unsafe paths, symlinks, duplicate roots, active/legacy overlap, and active packages left in the queue fail.

A `foundation` registry activates zero packages but still declares every preserved legacy root and a non-empty queue. An `active` registry permits staged migration while untouched legacy archives remain closed and non-authoritative.

## Package contract

Each active package has a closed manifest that records every package file by role plus recomputed byte and semantic SHA-256 hashes. The manifest binds:

- immutable source authorization, distribution, lineage, and source-claim authority;
- stable record IDs and their continuity lock;
- review lifecycle and external authority;
- record-level review events tied to the current source semantic digest;
- a frozen candidate snapshot or later executable discovery mode;
- typed duplicate, discrepancy, implementation-link, and route files;
- exact TSV and aggregate projections.

The manifest itself is the only package file omitted from its own inventory to avoid a recursive self-hash.

## Review authority

Review states are `preserved`, `mechanical`, `reviewed`, `accepted`, `superseded`, and `withdrawn`. Package lifecycle and authority state must agree.

Reviewed or stronger states require a separate authority record and review-event file. The authority record binds the issue, reviewer role, package scope, source semantic digest, timezone-bearing timestamp, evidence basis, and typed replacement rights. Review events cannot authorize themselves.

An accepted package requires exactly one acceptance event for every stable record. Accepted corrections must cite the package authority issue, and the authority record must explicitly grant replacement rights for that discrepancy type. Original source values are never silently replaced.

## Global relations

Accepted duplicate identity uses a directed record-to-record DAG. Missing records, self-edges, duplicate edge IDs, multiple owners, and cycles fail. Search hits, paths, runtime tokens, and prose are candidates or informational links only.

Routes require a globally unique route ID, existing source record, positive owner issue, explicit status and requirements, and an exact one-record projection. Typed implementation relations enforce their allowed authority, so parser hints and token occurrences cannot become linguistic or implementation authority by relabelling.

## Verification

Run:

```bash
npm run test:pedagogical-corpus-contract
npm run verify:pedagogical-corpus-contract
npm run verify:research
```

Verification proceeds from registry/archive/queue shape, through package-local inventory and authority checks, to closed root coverage and registry-wide lineage, duplicate, route, discrepancy, and typed-link checks.

## Current migration order

Week 14 is the first active package. The priority queue then proceeds through Weeks 15–19 and Dialogs 002–005. Each migration starts from current `main` with a new intake, claim, branch, review, and explicit merge authorization. Stale branches are evidence inputs only and are never resumed as implementation branches.
