# Construction adjudication batch 02

**Adjudicated:** 2026-07-24  
**Scope:** next five highest-ranked direct-source records after Batch 01  
**Authority:** project expert systematic review

No record is promoted by this adjudication. Decisions concern permanent identity, naming, claim layer, family/profile placement, and explicit migration recommendations.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Decision | Status recommendation |
|---|---|---|---|---|---|
| `AB15` | `OvertHeadDemonstrativeClassifierNP` | `DemonstrativeClassifierNounNP` | language construction | rename and retain narrow | remain `research_pending` |
| `AA84` | `MannerAdverbialVP` | `GamMarkedReduplicatedMannerVP` | language construction | narrow the UUID to the overt 咁／噉 path | remain `research_pending`; quarantine bare fallback |
| `AB28` | `PostThemeParticipantRelation` | `BeiMarkedPostThemeParticipantConstruction` | language construction | rename and retain neutral form-based profile | remain `research_pending` |
| `AA39` | `DegreeModifiedLexicalStative` | `LexicalStativeDegreeWrapper` | parser representation | internalize and decompose | migrate to `parser_heuristic` |
| `AA11` | `ChangeIntoPredicate` | `BinSingDimWhComplementVP` | language construction | rename and retain exact lexeme-specific profile | remain `research_pending` |

## AB15 — DemonstrativeClassifierNounNP

The reviewed sources converge on overt demonstrative–classifier–noun structure and distinguish it from headless Dem–CL and numeral-bearing classifier phrases. The previous name was not false, but it hid the overt noun behind the abstract term `Head` and made the actual sequence harder to discover. The new canonical name states the surface profile directly.

The current tests preserve 30 positive cases and exclude headless `呢個` and nondemonstrative `三本書`. The boundary inventory is still too small for promotion, and exact current code locations remain to be recorded.

## AA84 — GamMarkedReduplicatedMannerVP

Both checked source positives have reduplicated `慢慢`, overt `噉`, and a following predicate. The currently reachable bare `慢慢行` path is explicitly a zero-weight implementation probe. Therefore `MannerAdverbialVP` is broader than the supported behavior.

The UUID is retained for the overt marker profile. The bare fallback must be removed, quarantined, or given a separate implementation identity before promotion review.

## AB28 — BeiMarkedPostThemeParticipantConstruction

The sources establish overt predicate–theme–畀/俾–participant surfaces but disagree among double-object, oblique, prepositional, serial-verb, dative, and broader constructional analyses. A form-based canonical name is therefore preferable to a role-specific or theory-specific label.

The profile does not assign recipient, beneficiary, goal, source, agent, preposition, or serial-verb status. The current one-positive/two-boundary test set is insufficient for productivity.

## AA39 — LexicalStativeDegreeWrapper

The exact `好好食` surface is well attested, but the evidence supports ordinary degree modification plus the independently lexicalized stative `好食`. It does not establish a separate productive construction between those two components.

The UUID is reclassified as a parser representation. Its linguistic evidence should be attached to the general degree-stative construction and the lexical entry `好食`, while the wrapper remains only if implementation convenience requires it.

## AA11 — BinSingDimWhComplementVP

The runtime and tests now recognize only `變成 + 點` inside the source-linked sentence `成個社會會變成點？`. Aspectual `變咗做` and two-verb causative-resultatives are executable exclusions. Nominal-result complements and other wh complements remain unsupported.

`ChangeIntoPredicate` therefore overstated the implemented scope. The new name identifies the exact lexical head and wh complement while keeping broader change-state and causative-resultative strategies separate.

## Discovery consequences

After Batch 02:

- promotion-ready remains `0`;
- `AB30 ZoMarkedPerfectiveObjectVP` remains the only direct `boundary_ready` record;
- `AA39` is excluded from linguistic promotion;
- direct `source_supported` records decrease to `77`;
- excluded non-language/internal records increase to `17`;
- narrowing candidates decrease to `36` because `AB23` and `AA39` are no longer treated as language-level broad candidates.

## Safeguards

- no UUID or short code changed;
- no runtime matcher, fixture expectation, or linguistic status file changed;
- legacy runtime names remain attached as aliases;
- source terms remain metadata rather than permanent keys;
- status and runtime migrations remain explicit future commits;
- completed ontology adjudication does not satisfy corpus, panel, or held-out gates.
