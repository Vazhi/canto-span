# CP024-P1-DEMO01-R1 implementation checkpoint

Date: 2026-07-20  
Accepted software baseline: **v0.5.182**  
Candidate: **v0.5.183**  
Status: **render candidate; linguistic status `research_pending`**

## Parser result

- visible positives: **9/9 exact**;
- forbidden target leakage: **0/8**;
- unresolved attachment cases promoted: **0/3**;
- inherited regression: **543/543 PASS** outside two exact headless-label transitions;
- candidate audit: **51/51 PASS**.

These are implementation results only.

## Linguistic status

- current `supported_productive`: **0**;
- DEMO01: `research_pending` pending provisional-checklist re-verification;
- `PostverbalZoPerfectiveVP`: `provisional_reaudit`;
- `ResourceUseLaiFunctionRelation`: `provisional_reaudit`.

DEMO01 cannot return to `provisional` until at least one checked source supports the exact narrowed claim and at least one native speaker has judged the relevant positive and negative examples. It cannot become `supported_productive` until every Definition-of-Done item passes, including a second independent speaker.

## Runtime metadata warning

The candidate's embedded grammar-legitimacy table still reports two legacy `supported_productive` constructions. Parser behavior was not changed in this documentation checkpoint, so the candidate hash remains intact. Current governance status is owned by `docs/current/PROJECT-STATE.md` until the metadata is corrected in a later candidate.

## Exact runtime change already implemented

- added internal `OvertHeadDemonstrativeClassifierNP`;
- added separate `HeadlessDemonstrativeClassifierNP` with no hidden noun;
- retained `DemonstrativeClassifierNP` only as a compatibility alias;
- retired runtime selection of `DemonstrativeHeadNP`;
- added bounded lexical entry `貓 maau1`.

## Sealed held-out set

`CP024-P1-DEMO01-HELDOUT-EXTERNAL-1.zip` matches SHA-256:

`7cda111ca194b6159a37c91b789984fdc0c35d6c35d643260810df0cdd5015c4`

It remains sealed and unopened. Do not open it after render alone. Complete source re-verification and second-speaker review first.

## Next actions

1. Complete source re-verification.
2. Obtain the second independent speaker review.
3. Complete Obsidian render review.
4. Compare the actual heuristic with the final claim wording.
5. Correct legacy status metadata in a new candidate.
6. Only then evaluate the frozen parser against the sealed held-out set once.
