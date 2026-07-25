<!-- coordination-claim: #ISSUE_NUMBER -->

Work claim: #ISSUE_NUMBER
Intake issue: #ISSUE_NUMBER

Closes #ISSUE_NUMBER

## Outcome and scope

Describe the one bounded result and the semantic targets changed.

## Coordination

- Work ID: `CS-WORK-0000`
- Claim mode: `shared` or `exclusive`
- Integration role: `worker` or `integrator`
- Active worker: `codex`, `chatgpt`, or `human`
- Ownership revision:
- Live intake `active_pr`: update to this PR number immediately after opening
- Semantic regions:
- Dependencies:
- Overlapping physical files with disjoint regions:
- Pending changesets, if this PR is still a draft:

## Canonical inputs and generated outputs

- Canonical inputs:
- Generated outputs:
- Integration-owned files reconciled by the integrator:

## Explicitly protected or unchanged

List state dimensions and files that were intentionally not changed.

## Validation

List exact commands, results, and the exact validated head commit.

## Human merge review

- Review status: `PENDING_USER_REVIEW`
- Live intake owner/revision rechecked: `no`
- User notified that this exact head is ready: `no`
- Explicit approval for this pull request and exact head: `not received`

The agent must stop after notifying the user that the pull request is ready. Do not
merge or enable auto-merge until the user explicitly approves this specific pull
request after reviewing the ready-for-review notice. Any new commit invalidates the
approval and requires a new notice and fresh approval.

## Remaining work

A ready-to-merge PR must contain no files under `changes/pending/` other than its
README. Passing checks do not remove the mandatory user-review stop.
