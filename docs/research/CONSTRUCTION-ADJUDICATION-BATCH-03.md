# Construction adjudication batch 03

**Adjudicated:** 2026-07-24  
**Scope:** next five highest-ranked direct-source records after Batch 02  
**Authority:** project expert systematic review

No record is promoted by this adjudication. Decisions concern permanent identity, naming, claim layer, family/profile placement, and explicit migration recommendations.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Decision | Status recommendation |
|---|---|---|---|---|---|
| `AA27` | `CompoundDirectionalMotionVP` | `ReturnUpDeicticDirectionalVP` | language construction | rename and retain exact 返上嚟/返上去 subtype | remain `research_pending` |
| `AA38` | `DegreeMannerModifiedVP` | `PreposedDiMannerVPWrapper` | parser representation | internalize and decompose | migrate to `parser_heuristic` |
| `AA52` | `DitransitiveSpeechVP` | `WaaParticipantZiCommunicationVP` | language construction | rename and retain exact lexical sequence | migrate to `lexicalized_only` unless broader evidence emerges |
| `AA60` | `ExperientialMotionGoalVP` | `HeoiGwoGoalVP` | language construction | rename and retain exact 去過 + goal subtype | remain `research_pending` |
| `AA61` | `ExperientialQuestion` | `GwoFinalMeiExperientialQuestion` | language construction | rename and retain overt 過…未 subtype | remain `research_pending` |

## AA27 — ReturnUpDeicticDirectionalVP

The literature supports compound or tri-syllabic directionals and directly attests 返 before a disyllabic directional. The runtime is narrower: it recognizes `返上嚟` and `返上去`, excludes two-part `上嚟`, and does not wrap the full manner-plus-directional predicate `行返過嚟`.

The previous label was not false, but it invited evidence transfer from the broader directional system. The approved name exposes the exact return–up–deictic structure while preserving broader directional combinations as separate research questions.

## AA38 — PreposedDiMannerVPWrapper

The checked materials distinguish preposed `快啲 + VP`, postverbal `行快啲`, and discourse-separated `靜啲，佢喺度畫畫`. The current node spans a preposed manner expression and an independently analyzable VP. Nothing in the source record requires that aggregate to be a distinct language construction.

The UUID is therefore reclassified as a parser representation. Linguistic evidence should attach to the independently typed 啲-marked manner expression and following VP. The positive test's source attribution also conflicts with the construction note and must be corrected.

## AA52 — WaaParticipantZiCommunicationVP

The runtime recognizes only the lexical sequence `話 + participant + 知`, with executable exclusions for `講` replacing `話` and another cognition predicate replacing `知`. The sources explicitly caution that multiverb communication sequences may receive serial, complement, or other analyses.

`DitransitiveSpeechVP` therefore overstates both syntax and productivity. The approved canonical name records the overt lexical sequence without deciding among competing analyses. The status should become `lexicalized_only` unless independent evidence supports a broader productive family.

## AA60 — HeoiGwoGoalVP

The sources and executable cases support `去 + experiential 過 + overt goal`, contrasted with perfective `去咗` and non-motion experiential `見過`. Other motion verbs and goal classes have not been established.

The former label implied a productive experiential motion-goal class. `HeoiGwoGoalVP` accurately identifies the lexeme-specific subtype while retaining room for later evidence-backed motion profiles.

## AA61 — GwoFinalMeiExperientialQuestion

The checked sources directly attest questions with overt experiential `過` before final `未`, optionally followed by a final particle. Executable boundaries separate preverbal `未 + V過` statements and `有冇 + V過` questions.

The former label was too broad because multiple experiential-question strategies exist. The approved name makes both defining markers explicit and prevents source evidence from leaking into the separate `有冇` family.

## Discovery consequences

After Batch 03 is applied:

- promotion-ready remains `0`;
- `AB30 ZoMarkedPerfectiveObjectVP` remains the only direct `boundary_ready` record;
- `AA38` leaves the direct language-candidate pool and becomes an internal representation;
- `AA52` remains visible as a language record but is marked for lexicalized-only migration rather than productive-class promotion;
- four retained language records receive completed ontology review, while corpus, panel, held-out, and runtime-migration gates remain unchanged.

## Safeguards

- no UUID or short code changed;
- no runtime matcher, fixture expectation, or linguistic-status file changed;
- legacy runtime names remain attached as aliases;
- exact lexical evidence is not treated as productive-class evidence;
- status and runtime migrations remain explicit future commits;
- completed ontology adjudication does not satisfy corpus, panel, or held-out gates.
