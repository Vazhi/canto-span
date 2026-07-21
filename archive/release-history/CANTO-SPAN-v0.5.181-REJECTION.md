# Canto Span v0.5.181 — Rejected Candidate

Accepted parent: v0.5.180  
Candidate: v0.5.181  
Target: `ResourceUseLaiFunctionRelation`

## Result

The replacement rendered review passed 90/90 manual checks. The exact candidate was frozen before evaluator custody was opened.

The prospective evaluator then rejected the candidate:

- commitments verified: 7/7;
- parser expectations passed: 6/7;
- genuinely unseen cases: 6/7;
- genuinely unseen parser expectations passed: 5/6.

## Blocking failure

`IFR-H04` contained an overt resource followed by a separate overt user. The parser nevertheless selected the narrow subtype, violating the precommitted exclusion of separate-user frames.

## Additional custody defects

- `IFR-H03` duplicated an exact visible development/render surface and cannot count as unseen.
- `IFR-H01` revealed that `杯` after `隻` still received the measure-word role rather than the noun “cup.”

## Disposition

- v0.5.181 is not accepted.
- `ResourceUseLaiFunctionRelation` remains provisional.
- `supported_productive` remains 1.
- v0.5.180 remains the accepted runtime.
- all seven opened evaluator cases are consumed and cannot be reused.
- remediation moves to v0.5.182 with a newly locked evaluator partition selected before code changes.
