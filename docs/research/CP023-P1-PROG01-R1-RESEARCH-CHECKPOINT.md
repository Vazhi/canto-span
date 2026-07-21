# CP023-P1-PROG01-R1 research checkpoint

Date: 2026-07-20  
Status: **research packet frozen; implementation blocked**  
Accepted runtime: **v0.5.182**, unchanged  
Active research package: **CP023-P1-PROG01-R1**  
Selected research candidate: **`PostverbalGanProgressiveVP`**  
Active implementation candidate: **none**

## Work completed

- Ranked the next authority-origin candidate families and selected the narrow postverbal `緊` overt-object profile.
- Froze the bounded question, positive propositions, restrictions, competing analyses, non-targets, and forbidden inferences.
- Added proposition-level claim-source edges for Kataoka 2018, Fan 2024, Sio and Bond 2025, and three official hearing transcripts.
- Adjudicated three independent minimum occurrence units plus one supplementary interpreted-hearing occurrence.
- Added a 23-case visible research packet containing source examples, constructed variants, boundaries, and aspect-preservation cases.
- Added a reusable observation-only packet runner; it reports parser behavior without converting source examples into acceptance evidence.
- Captured the exact v0.5.182 baseline before any implementation.
- Recorded the unresolved `有 + V緊` distribution as a contradiction/variation entry rather than forcing a categorical judgment.

## Baseline observation

The packet contains 23 visible cases:

- required target cases: 13;
- exact target span present: 4;
- target present with a wrong or incomplete span: 7;
- target absent: 2;
- forbidden narrow-subtype cases: 9;
- forbidden cases where broad `ProgressiveVP` is still present: 3;
- full-root coverage: 14/23.

This is not a pass/fail acceptance result. The runner deliberately distinguishes root coverage from correct linguistic analysis.

## Exact source-positive failures

| Case | Source target | Current result | Main issue |
|---|---|---|---|
| PROG-E02 | `睇緊啲九巴嘅數據` | `睇緊` only; partial root | modified NP and `數據` recognition |
| PROG-E03 | `問緊錫條同埋錫線` | `問緊` only; partial root | coordinated object and lexical segmentation |
| PROG-E04 | `整緊布甸` | `整緊` only; partial root | `布甸` lexical segmentation |
| PROG-E06 | `唱緊首兒歌` | target absent despite root PASS | target subspan lost inside larger clause relation |
| PROG-E08 | `着緊好靚嘅衫` | target absent | predicate ambiguity plus modified NP object |
| PROG-E09 | `買緊樓` | `買緊` only; partial root | `樓` not assembled as object |

## Visible constructed gaps

- `寫緊封信` is reduced to `寫緊`.
- `睇緊嗰份報告` is reduced to `睇緊` even though root coverage passes.
- `聽緊首歌` is reduced to `聽緊` even though root coverage passes.

These show that the problem is not limited to missing dictionary items. Bare-classifier and demonstrative-classifier NPs are not consistently incorporated as progressive objects.

## Overextension and boundary findings

- Objectless `佢食緊` receives broad `ProgressiveVP`; this may be valid broad progressive syntax but is outside the narrow subtype.
- `你食緊咩？` receives broad `ProgressiveVP` inside the wh wrapper; the future subtype must not use this as overt nominal-object support.
- The source-negative future/modal test `聽日八點嘅時候，我應該會瞓緊覺` receives `ProgressiveVP` with full root coverage.
- The disputed `佢有讀緊大學` is currently parsed in a broader existential/action-stative structure. Because the literature itself reports variation, the checkpoint records this as unresolved rather than declaring the parser right or wrong.
- `喺度`, `住`, perfective `咗`, and experiential `過` remain outside the target.

## Architectural conclusion

A safe implementation cannot be a simple status promotion of current `ProgressiveVP`. It would need at least:

1. a narrow internal subtype with transparent predicate–`緊`–object spans;
2. separation of aspect licensing from object/NP assembly;
3. a decision to merge or retire the duplicative `ProgressiveTransitivePredicate` path;
4. separately attributable lexicon/Jyutping work for source nouns;
5. boundary handling that does not turn source-specific modal and `有 + V緊` findings into universal bans;
6. fresh prospective evaluator custody selected before parser changes;
7. rendered inspection because full-root PASS can hide a wrong target span.

## Disposition

- `ProgressiveVP`: remains **research_pending**.
- `ProgressiveTransitivePredicate`: remains an **internal duplicate pending merge-or-retire evaluation**.
- `PostverbalGanProgressiveVP`: **research candidate only; not added to runtime or registry**.
- `supported_productive`: remains **2**.
- parser, grammar metadata, lexicon, Jyutping, roles, fixtures, manifest, and styles: **unchanged**.

## Next bounded action

Prepare a remediation blueprint that separates:

- NP/object assembly fixes already supported by existing nominal constructions;
- lexicon/Jyutping verification for source-attested object words;
- the narrow progressive subtype and duplicate-node cleanup;
- source-specific modal and `有 + V緊` boundaries.

Only after the blueprint is fixed may fresh prospective evaluator custody be selected. Implementation remains blocked until that custody is sealed.
