# CP022-I1A-I04-A1 acceptance record

Date: 2026-07-19  
Scope: `EP-R37-I04 NominalAndMeasureSpan` internal-wrapper cleanup only  
Decision: **ACCEPTED**

## What was being tested

This was not a test of whether classifier phrases, possessive noun phrases, age predicates, or definition frames are generally valid Cantonese grammar. Those language claims retain their existing provisional, pending, heuristic, or unsupported statuses.

The test was narrower: could four internal labels be retired, renamed, or bounded without changing recognized surfaces, token roles, Jyutping, root coverage, learner-visible meaning, or existing construction selection?

## Result

Yes. The visible development gate passed 45/45. All 11 user-supplied rendered diagnostic rows retained their overt text, Jyutping, learner roles, and full-root coverage. No active or learner-facing `ModifierPhrase` survived. The neutral noun probe retained the public compatibility label `HeadNP` while using `NominalHeadSpan` internally, and no engineering label appeared in learner hover text.

After that review, the precommitted evaluator archive was opened. All five commitments verified and all five prospective held-out cases matched their frozen v0.5.176 signatures exactly under v0.5.177. No forbidden invariant failed.

## Limits

- No new grammar is accepted.
- `supported_productive` remains zero.
- The global grammar freeze remains active for every other family.
- The sole authorization covered I04 only and is now consumed.
- LX1 remains render-pending and unaccepted.
- Four generic hover-gloss warnings remain outside the scope of this cleanup; they are not new regressions.

## Next authorization boundary

The next recommended safe-cleanup packet is `I01 ClauseSpan`. Its packet may be prepared without another parser authorization. Before any I01 code changes, the user must receive a clear authorization request identifying the exact labels, intended semantic change, packet status, and stop conditions.
