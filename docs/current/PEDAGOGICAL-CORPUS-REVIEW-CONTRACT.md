---
title: Canto Span — Pedagogical Corpus Review Contract
status: current
tags: [canto-span/research, canto-span/corpus, canto-span/governance]
related: "[[00-START-HERE]] [[TESTING-POLICY]] [[MULTI-AGENT-COORDINATION]] [[PROJECT-STATE]]"
---

# Pedagogical corpus review contract

This document defines the only current route by which a pedagogical source package can become an accepted Canto Span corpus-review package.

Pedagogical attestation is not linguistic promotion evidence by itself. A source package may preserve lexical, pronunciation, translation, discourse, or construction observations, but it does not establish productivity, dialect-wide naturalness, parser correctness, construction identity, or linguistic status.

## Current foundation state

`config/pedagogical-corpus-packages.json` is intentionally in `foundation` state. No package is active under this contract yet. The ten prior Week 14–19 and Dialog 002–005 review branches are listed only as migration inputs. Their source-preserving findings remain available for later review, but their stale claims and pull requests do not own execution, locks, review authority, or merge eligibility.

The registry may change to `active` only when at least one package has been rebuilt from current `main` with a complete manifest and passes both package-local and registry-wide verification.

## Authority layers

The contract keeps six layers separate:

1. **Original source** — immutable bytes, source metadata, and source-authored claims.
2. **Mechanical discovery** — reproducible candidate matches without judgment authority.
3. **Review events** — item-level observations and decisions made against one exact source semantic digest.
4. **Authority record** — the external issue/reviewer authorization that permits a review state; a review event file cannot authorize itself.
5. **Typed relations** — duplicate edges, discrepancies, implementation links, parser hints, evidence relations, and research routes.
6. **Projections** — TSV inventories, aggregate summaries, adjacency maps, route indexes, and documentation derived from canonical records.

Source-authored grammar explanations, confidence labels, cultural notes, translations, naturalness claims, and reviewer prose remain `metadata_only` unless a separate authorized review accepts a bounded claim.

## Registry and package manifests

The registry is the complete package index. In active state:

- every package ID, root, manifest, package kind, authority state, and authority issue appears exactly once;
- every file under the configured package root belongs to exactly one registered package;
- overlapping roots, undeclared files, missing packages, and duplicate manifests fail;
- the registry authority state and issue must match the package manifest.

Each package manifest is closed. It enumerates every allowed package file by role and records both byte and semantic SHA-256 values. The verifier rejects:

- untracked files or nested artifacts;
- symlinks, non-regular files, absolute paths, `..`, backslash paths, and paths outside the package root;
- stale byte or semantic hashes;
- omitted or invented exemptions;
- a file used under the wrong role.

The manifest itself is the only package file not listed inside its own file inventory, avoiding a recursive self-hash.

## Source fidelity, authorization, and lineage

A repository-resident original source requires explicit `authorized` or `restricted` authorization, `repository_allowed` distribution, and a non-empty authorization basis. Future private or metadata-only source modes require a later schema version; they cannot be simulated by placing private bytes in the repository.

The verifier recomputes:

- the original byte digest;
- a semantic digest using canonical JSON, normalized TSV line endings, or byte identity for other formats;
- the ordered record-ID continuity lock.

Each package declares a lineage ID, parent lineage IDs, and an independence group. Registry-wide validation rejects duplicate lineage IDs, unknown non-external parents, and lineage cycles. Independence is an explicit property; a copied or transformed package cannot count as an independent source merely because its filename or path differs.

## Review lifecycle

Review authority states are:

- `preserved` — source retained; no candidate or expert decision authority;
- `mechanical` — deterministic discovery only;
- `reviewed` — authorized review events exist, but the package has not been accepted;
- `accepted` — bounded review decisions are accepted by the named authority issue;
- `superseded` — retained for history but replaced by another accepted review;
- `withdrawn` — retained only as a withdrawn record.

Reviewed, accepted, superseded, and withdrawn states require:

- a positive authority issue;
- a permitted reviewer role other than `source_provider_metadata`;
- the exact current source semantic digest;
- a separate authority record;
- a separate review-event file.

The authority record binds issue, reviewer role, state, and source digest. Review-event files are rejected if they contain fields that attempt to grant their own authority.

## Stable records and candidate discovery

The ordered stable record IDs are locked by a semantic continuity hash. Reordering, deleting, duplicating, or silently replacing IDs fails even when summary counts remain unchanged.

Version 1 permits a digest-bound frozen candidate snapshot. It must project every record exactly once and in source order. This provides a truthful frozen discovery boundary without pretending that a historical search result is current. A future live two-way discovery mode requires a new schema and executable regeneration contract.

## Global duplicate graph

Accepted duplicate identity is a directed record-to-record edge with relation `exact` or `normalized`.

The global phase rejects:

- missing source or target records;
- self edges;
- duplicate edge IDs;
- more than one canonical owner for one source record;
- reciprocal or longer duplicate cycles;
- a documentation path, runtime token, parser file, search hit, or generated report used as a corpus owner.

Same-package and cross-package duplicates use the same graph. Substring matches and repository-path occurrence lists remain mechanical candidates only.

## Discrepancies and implementation relations

A discrepancy records the immutable source record, discrepancy type, status, optional replacement value, and authority issue. An accepted replacement requires both a replacement value and a positive authority issue. It never changes the original source file silently.

Implementation relations are typed:

| Relation | Permitted authority |
|---|---|
| `token_occurrence` | `informational` |
| `pronunciation_owner` | `pronunciation_owner` |
| `implementation_link` | `implementation_owner` |
| `parser_hint` | `informational` |
| `evidence_relation` | `informational` |

This prevents a token occurrence or parser search hint from becoming corpus identity, pronunciation authority, parser correctness, or linguistic evidence by relabelling.

## Route ownership

Every retained route has one globally unique route ID, one existing source record, one positive owner issue, one lifecycle status, explicit evidence requirements, and an exact one-record projection. Missing owners, orphan sources, duplicate route IDs, conflicting projections, and manual summary-only routes fail.

Route status does not imply that the underlying linguistic question is resolved. It only records whether that route is open, completed, cancelled, or subsumed under its named owner.

## Exact projections

Package-local verification checks exact bidirectional agreement among:

- the canonical record file;
- the ordered ID continuity lock;
- the frozen candidate snapshot;
- an optional items TSV;
- typed relation files;
- package summary counts;
- an optional aggregate JSON projection.

Prose counts are never authoritative. Aggregate and TSV files must be exact projections of canonical records and relations.

## Verification phases

Run:

```bash
npm run test:pedagogical-corpus-contract
npm run verify:pedagogical-corpus-contract
npm run verify:research
```

The verifier executes:

1. registry and migration-queue validation;
2. package-local path, inventory, digest, authority, record, candidate, relation, and projection checks;
3. active-root coverage checks;
4. registry-wide lineage, duplicate DAG, route, discrepancy, and typed-link checks.

The foundation registry passes only because it explicitly activates zero packages and names a non-empty migration queue. It is not evidence that the queued packages have passed the active contract.

## Migration order

Rebuild from current `main`, one bounded package at a time:

1. Week 14, establishing the first active package and final migration mechanics;
2. Week 15, testing cross-package exact duplicate ownership;
3. Week 16, testing typed implementation and pronunciation links;
4. Week 17, testing inherited-project-history quarantine and source lineage;
5. Week 18, testing route ownership and source-ID discrepancy handling;
6. Week 19, testing role-sensitive token, pronunciation, classifier, and parser-hint separation;
7. Dialog 002, testing source adjacency and null-translation projection;
8. Dialog 003, testing provider-claim quarantine and contextual routes;
9. Dialog 004, testing event versus spoken-turn adjacency and stage directions;
10. Dialog 005, restarted from current `main` after all prior migration invariants are stable.

Each migration receives a new task intake, work claim, branch, review, and explicit merge authorization. The stale branches are evidence inputs only and must not be retargeted or resumed as implementation branches.
