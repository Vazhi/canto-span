# CP027 — Definition of Done enforcement

Date: 2026-07-21
Parser behavior changed: **no**
Linguistic status changed: **no**

## Plain-language result

The user-supplied Definition of Done is now the controlling completion standard without additional qualifications inside the definition itself. The repository's promotion gate was upgraded because the earlier gate did not mechanically enforce several requirements in that definition.

The new gate distinguishes the following facts instead of compressing them into broad booleans:

- how many sources are cited and whether every cited source was checked;
- whether corpus candidates were individually classified as genuine, false positive, ambiguous, or unusable;
- how many promotion-eligible speakers judged the same positive and negative contrasts;
- whether the negative/boundary inventory is complete and executable;
- when and at which commit the code was re-read against the documented claim, including exact code locations;
- whether the construction has completed re-audit under the current standard.

A separate release-handoff gate compares status changes against a checked-in, SHA-256-pinned construction-status baseline, requires an audit slice for every changed construction, rejects unre-audited `supported_productive` records, verifies separate implementation and linguistic reporting, and enforces the dormant-label retirement-review deadline. The original Git-object baseline was replaced in v0.5.207 because clone-specific objects were not portable.

## Current application

- `supported_productive`: **0**
- `provisional`: **0**
- `provisional_reaudit`: **2**
- No status was grandfathered or promoted.
- `PostverbalZoPerfectiveVP` records one promotion-eligible same-contrast speaker; the second speaker, complete boundary inventory, and exact code-document reconciliation remain incomplete.
- `ResourceUseLaiFunctionRelation` retains 23 public pilot responses, but records zero promotion-eligible same-contrast speakers because that instrument does not satisfy the clean promotion standard.
- The five manually reviewed HKCanCor records for `OvertHeadDemonstrativeClassifierNP` are now represented as five classified genuine corpus hits rather than a bare reviewed boolean.

## Implementation validation

Run separately from linguistic evaluation:

```bash
node tools/test-promotion-gate.js
node tools/enforce-promotion-rules.js
node tools/test-release-handoff.js
node tools/verify-release-handoff.js
./tools/verify-repository.sh
npm test
```

## Linguistic confidence

No construction's linguistic confidence increased in this phase. This work makes missing evidence harder to hide; it does not supply the missing evidence.
