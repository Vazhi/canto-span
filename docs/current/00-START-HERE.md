# Start here

This directory contains current policy and operating documentation. Historical
research, release notes, adjudication batches, and generated reports preserve
provenance but do not override the authority order below.

## Current baseline

- runtime: **v0.5.216**
- current runtime labels / status notes: **133 / 133**
- construction workflow: **2 active / 131 workflow-archived**
- retired labels: **48**
- permanent UUID records: **181**
- completed expert adjudications: **39**
- `research_pending`: **79**
- promotion-ready constructions: **0**
- direct `boundary_ready` candidates: **1**

See [`PROJECT-STATE.md`](PROJECT-STATE.md) for the complete current snapshot.

## Authority order

Use the narrowest relevant authority. No single file owns every state dimension.

1. **Permanent identity and current ontology:**
   `data/construction-identities.json`, plus accepted UUID-keyed decisions in
   `data/construction-adjudications.json` and
   `data/construction-adjudication-batches/`.
2. **Current linguistic status and note-local evidence:** exactly one note per
   active runtime label under `grammar/<status>/`.
3. **Actual parser behavior:** `main.js` and executable tests.
4. **Discovery readiness:** `data/construction-candidate-readiness.json` and the
   generated reports under `docs/research/`.
5. **Historical provenance:** release descriptions, completed research packages,
   retired ledgers, and adjudication batch reports.

An accepted adjudication may supersede an older label name or ontology claim
without changing the runtime alias, status folder, or matcher. A generated score
never authorizes promotion. When code, status notes, identity metadata, and
adjudication disagree outside these explicit boundaries, reconciliation is
required before release.

## Read in this order

1. [`PROJECT-STATE.md`](PROJECT-STATE.md)
2. [`DOCTRINE.md`](DOCTRINE.md)
3. [`GOVERNANCE.md`](GOVERNANCE.md)
4. [`CONSTRUCTION-IDENTITY.md`](CONSTRUCTION-IDENTITY.md)
5. [`CONSTRUCTION-ADJUDICATION.md`](CONSTRUCTION-ADJUDICATION.md)
6. [`DEFINITION-OF-DONE.md`](DEFINITION-OF-DONE.md)
7. [`TESTING.md`](TESTING.md)
8. [`GIT-WORKFLOW.md`](GIT-WORKFLOW.md)
9. [`../../grammar/README.md`](../../grammar/README.md)
10. [`../../GRAMMAR-INDEX.md`](../../GRAMMAR-INDEX.md)
11. [`../research/CURRENT-RESEARCH-PROVENANCE.md`](../research/CURRENT-RESEARCH-PROVENANCE.md)

## Terminology rule

Use the permanent short code and canonical name in new analysis. Include the
legacy runtime label when discussing current code, tests, note paths, or status
migration. Do not use a learner-facing label, runtime alias, or historical report
title as the durable construction key.
