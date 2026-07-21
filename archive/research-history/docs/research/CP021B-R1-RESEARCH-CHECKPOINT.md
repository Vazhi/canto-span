# CP021B-R1 research checkpoint

Date: 2026-07-18  
Checkpoint type: research provenance only  
Runtime behavior changed: no

## Completed

- Mapped `LexicalGiveRelation`, `PostThemeParticipantRelation`, and `PassivePermissiveRelation` to specific research claims.
- Recorded 31 claim-to-source rows with exact locators, source propositions, parser consequences, and forbidden inferences.
- Registered 13 research sources or leads. The 2026 Chow paper is discovery-only and is not used as parser evidence because full text and locators were not verified.
- Reconstructed the retained-object indirect-passive claim from Chow 2018 instead of relying on a generic post-hoc citation.
- Corrected the source-family metadata `XU_PEYRAUBE_2011` → `XU_PEYRAUBE_1997` and `WONG_2002` → `WONG_2023_2024`.
- Generated a 182-label source-coverage inventory so the remaining research debt is explicit.

## Evidence outcome

### LexicalGiveRelation

The lexical-GIVE theme-before-recipient profile is independently attested. Alternative order is also reported, but its distribution is lexically and contextually restricted. Recent production and corpus evidence do not justify a hard theme-weight threshold. The parser's neutral treatment of the nonbaseline order is therefore justified as a conservative internal policy, not as a published Cantonese analysis.

### PostThemeParticipantRelation

Predicate–theme–畀/俾–person is well attested. The upstream predicate and valency affect transfer, goal, and beneficiary readings. Published analyses disagree over preposition, serial verb, complex predicate, and independent-construction treatments. A theory-neutral runtime relation is justified; a fixed category or participant role is not.

### PassivePermissiveRelation

Passive and causative/permissive readings of `NP1–畀/俾–NP2–VP` are independently documented and may be contextually ambiguous. Chow 2018 directly supports an indirect passive with form `NP1–畀–NP2–V–NP3`, where NP3 is the retained patient/object. The same paper found only 4 indirect passives among 61 passive 畀 sentences, so the subtype remains sparse, context-sensitive, and nonproductive for parser-promotion purposes.

## Global source coverage

| Measure | Count |
|---|---:|
| Parser construction labels | 182 |
| Language or lexical claims | 157 |
| Internal representation or heuristic claims | 25 |
| Labels with any pre-existing pattern-specific source edge | 6 |
| Language claims with no pre-existing pattern-specific source edge | 151 |
| Unsupported labels with no source edge | 97 |
| Research-pending labels with no source edge | 35 |
| Labels completed in the CP021B-R1 claim-level matrix | 3 |

The 31 new R1 matrix rows are recorded separately from the legacy provenance edge count so the history is not rewritten. `PassivePermissiveRelation` remains correctly marked as a legacy construction whose language claim was reconstructed after implementation, not an authority-origin construction.

## Validation

- `tools/audit-parser-construction-source-mapping.js`: 17/17 checks passed; strict ready.
- `tools/run-claim-provenance-audit.js`: strict ready; 0 failures; all 182 labels covered.
- TSV field-count validation: passed for the source register, source matrix, and coverage inventory.
- `main.js` SHA-256: `faca83136a654342fc2930ef4628fcd5bb4d847e77ba01a00be35fd8bbae0196`.
- `manifest.json` SHA-256: `f2a93a2b6cb4be3a91d53161de595e555a843b97d280847d33751d1acd11f39b`.

The older `audit-cp021b-synthesis.js` still reports two identity failures because its freeze expects the pre-implementation source-synthesis hashes, while this workspace is the later IM1 branch. Its 45 linguistic-data checks pass; the two failures are the already-known branch-hash mismatch, not a research mapping defect.

## Files to review first

1. `docs/research/PARSER-CONSTRUCTION-SOURCE-LINKS-CP021B-R1.md` — readable explanation with links next to claims.
2. `docs/research/PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R1.tsv` — machine-readable claim-to-source mapping.
3. `docs/research/PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R1.md` — coverage counts.
4. `docs/research/PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R1.tsv` — all 182 parser labels and next research actions.

## Next checkpoint

Continue through the `P0_FIND_AUTHORITY_OR_RETIRE` rows, one coherent grammar family at a time. For each construction: state the exact runtime claim, research primary sources, extract page/example-level propositions, record contradictions and scope limits, then decide whether to retain, narrow, rename, or retire the parser construction. Do not change runtime behavior until that construction's source mapping is complete.
