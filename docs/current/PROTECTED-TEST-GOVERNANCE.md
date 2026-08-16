---
title: Canto Span — Protected Test Governance
status: current
tags: [canto-span/testing, canto-span/governance]
related: "[[TESTING]]"
---

# Protected test governance

Protected-test SHA governance is a narrow constitutional safeguard. It does **not** make every important test immutable.

## Admission rule

A test may enter `config/protected-tests.json` only when all of these are true:

1. it directly enforces a top-level repository doctrine or safety invariant;
2. that doctrine is expected to change rarely to never;
3. normal feature, corpus, lexical, construction, survey, or source expansion does not require editing the test;
4. changing the test content itself deserves explicit review because it could weaken repository-wide safety or methodology.

High value alone is insufficient. Expected low churn is mandatory.

Do **not** SHA-protect scalable or routinely growing suites, including lexical runtime/authority coverage, lexical-ingestion source registries, construction/corpus/survey inventories, generated snapshots, source packets, migration-count checks, or other tests whose content should legitimately grow with coverage. Those remain governed by ordinary regression and test-validity review.

Every protected registry entry declares:

- `path`;
- exact content `sha256`;
- the doctrine-preserving `reason`;
- `scope`;
- `protection_class: constitutional_doctrine`;
- `expected_change_frequency: rare-to-never`;
- `normal_growth_requires_edit: false`;
- `review_required_on_change: true`.

## Initial constitutional set

The bootstrap registry is deliberately small:

- `tests/tooling/runtime/regression-ratchet-verifier.test.js` — protects monotonic regression-debt semantics and prevents stable failures from being hidden through test-contract drift;
- `tests/tooling/verification/verification-profiles.test.js` — protects fail-closed canonical verification orchestration;
- `tests/tooling/verification/protected-tests.test.js` — protects this governance mechanism's anti-laundering, review-freshness, exact-path, and explicit-user-override doctrine.

Parser architecture, native-panel lifecycle, lexical coverage, construction inventories, generated-runtime behavior, and other important but evolving suites are intentionally **not** in the protected SHA registry.

## Working-tree SHA verification

`node tools/verify-protected-tests.js` validates the registry and compares every registered test's current bytes to its stored SHA-256.

A mismatch, deletion, or missing protected path fails with `PROTECTED_TEST_REVIEW_REQUIRED`. The verifier reports the expected and actual hashes but never rewrites or blesses a hash.

The check is part of the canonical core verification profile.

## PR anti-laundering gate

A stored hash alone is insufficient because a branch could change both a protected test and its registry hash. The trusted PR gate therefore evaluates base and head together.

`.github/workflows/protected-test-review.yml` runs from trusted base code. It does not execute review-gate code supplied by the PR head. It:

1. reads and validates both base and head registries;
2. verifies every head registry SHA against the head file bytes;
3. uses the union of base/head protected paths so removing or renaming protection cannot hide a change;
4. treats registry entry addition/removal/change as a protected change;
5. requires review for changes to the protected-test control plane itself, including the registry, schema, SHA verifier, review analyzer, doctrine test, trusted review workflow, core verification-profile registration, and full-diagnostic enforcement workflow;
6. finds the latest PR commit touching the affected protected/control-plane paths;
7. requires a structured review attached to a commit at or after that latest protected change;
8. invalidates an earlier review when a later protected change occurs;
9. reruns when the pull request is edited so a base-branch retarget cannot leave a stale trusted-base decision in place.

A later unrelated commit does not invalidate a review that already contains the latest protected change.

## Single-author/shared-account review model

Canto Span currently has one GitHub author account. The user, ChatGPT, and Codex all make repository changes through that same account, so GitHub actor identity cannot distinguish the human owner from an assisting agent. GitHub also does not permit a pull-request author to submit an `APPROVED` review on their own PR.

Therefore protected-test governance does **not** use reviewer identity or a separate-reviewer requirement as an authorization boundary. A structured `COMMENTED` review is intentionally valid in this repository when it satisfies the exact-path and freshness rules below. `APPROVED` is also accepted if a genuinely separate reviewer exists in the future. `PENDING`, `DISMISSED`, and `CHANGES_REQUESTED` reviews cannot satisfy the gate.

This mechanism is designed to prevent silent, accidental, stale, inferred, or convenience-driven doctrine drift by repository agents following the project contract. It is not a cryptographic defense against a malicious actor already controlling the repository owner's GitHub credentials. Any future requirement for cryptographically distinct human authorization would need an external trust mechanism rather than GitHub account identity alone.

## Structured review

Ordinary doctrine changes require a PR review containing an exact fenced record:

```protected-test-review
{"schema":"canto-span-protected-test-review-v1","decision":"approve","basis":"doctrine_review","paths":["config/protected-tests.json","tests/path/to/doctrine.test.js"],"registry_changed":true,"reason":"Independent reason the doctrine expectation itself must change."}
```

The path set must exactly match the gate's affected path set, and the review must be attached to a commit containing the latest protected change. A generic approval, ordinary review prose, or a request to "make the tests pass" is not a protected-test review.

Finalize the protected test content first, update `config/protected-tests.json` to the exact SHA-256 of that final content, and only then submit the structured review against the resulting commit. Because the registry is itself protected control-plane state, any later protected-test or registry edit invalidates that review and requires a new structured review. The gate never performs or blesses the SHA update automatically.

## Explicit user override

A protected doctrine test can still change when the user explicitly requests changing that protected expectation. The authorization must be exact and auditable; it is never inferred from agent convenience or generic acceptance language.

The authorizing issue must contain:

```protected-test-override
{"schema":"canto-span-protected-test-override-v1","authorized_by":"user","paths":["tests/path/to/doctrine.test.js"],"reason":"Why the protected expectation itself must change."}
```

The subsequent structured PR review uses `basis: user_override` and names that issue in `authorization_issue`. The override paths must exactly match the affected protected-test paths.

Because all repository writes currently share one GitHub account, the automated gate can validate that this record is explicit, exact, and auditable but cannot cryptographically prove which same-account actor typed it. Repository agents are therefore forbidden by project doctrine from fabricating or inferring a user override that was not actually requested.

A user override is a basis for the required review. It is not a bypass: final head SHA consistency and normal PR/merge review still apply.

## Bootstrap limitation

The first PR introducing this gate cannot be protected by a workflow that does not yet exist on its base branch. Bootstrap therefore requires direct review of the implementation and final hashes. Once merged to `main`, the trusted base-owned gate protects subsequent changes.
