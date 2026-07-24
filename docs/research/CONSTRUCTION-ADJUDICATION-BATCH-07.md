# Construction adjudication batch 07

**Adjudicated:** 2026-07-24  
**Scope:** next five highest-ranked direct-source records after Batch 06  
**Authority:** project expert systematic review

No record is promoted by this adjudication. Decisions concern permanent identity, naming, claim layer, family/profile placement, and explicit migration recommendations.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Decision | Status recommendation |
|---|---|---|---|---|---|
| `AA01` | `ANotAQuestion` | `M4MarkedANotAInterrogative` | language construction | retain the overt V–唔–V profile; separate suppletive 有冇 | remain `research_pending` |
| `AA04` | `ActionStativeVP` | `ActionQuantityDurationWrapper` | parser representation | internalize and decompose | migrate to `parser_heuristic` |
| `AA17` | `CognitionContentFrame` | `ZiClausalComplementClause` | language construction | rename and retain lexical 知 + clause | remain `research_pending` |
| `AA23` | `ComplementEllipsisFragment` | `CognitionShortComplementWrapper` | parser representation | internalize and decompose | migrate to `parser_heuristic` |
| `AA24` | `CompletionQuestion` | `AspectMarkedMeiCompletionQuestion` | language construction | retain overt completion/aspect-marked final-未 forms; quarantine bare VP + 未 | remain `research_pending` |

## AA01 — M4MarkedANotAInterrogative

The current suite combines canonical `V–唔–V` interrogatives, embedded A-not-A complements, and suppletive `有冇 + VP`. The sources support A-not-A interrogatives but also identify the special negative morphology of `有`, so those branches must not share one exact promotion profile.

The UUID is retained for overt `V–唔–V`, including matrix and embedded interrogative constituents such as `食唔食` and `嚟唔嚟`. `有冇`, `得唔得`, `可唔可以`, and other lexeme-specific or suppletive profiles require separate identities or independently bounded records.

## AA04 — ActionQuantityDurationWrapper

The label `ActionStativeVP` is contradicted by its own positives. `寫三個字` contains quantified nominal object material, while `等幾耐` contains a duration-question expression. Neither path supplies a stative predicate, and the sources explicitly preserve nominal and duration analyses.

The UUID therefore becomes a parser wrapper. Its output should decompose into an action predicate, independently typed argument or classifier-NP structure, and independently typed duration or measure structure.

## AA17 — ZiClausalComplementClause

All current positives use lexical `知` or `唔知` with visible clausal content: declarative, conditional, recursive, or embedded A-not-A material. `CognitionContentFrame` is too broad because the sources warn against transferring one complement pattern across every cognition verb and distinguish reported thought and stance constructions.

The record remains a language-construction candidate under the lexeme-specific name `ZiClausalComplementClause`. Exact external support for the tested `知` complement classes is still required before promotion work.

## AA23 — CognitionShortComplementWrapper

The current positives place `覺得有`, `覺得係`, `覺得唔係`, and `覺得佢係` under one ellipsis label. The sources instead distinguish aspectual `有/冇` VP ellipsis, contextual object omission, response-particle `係/唔係`, and ordinary copular material. The presence of an overt subject in `佢係` also undermines a single fragment analysis.

The UUID is therefore an internal compatibility wrapper. Future linguistic records must separately establish VP ellipsis, object omission, response-particle, and copular profiles rather than transferring evidence among them.

## AA24 — AspectMarkedMeiCompletionQuestion

The checked source authorizes completion questions through visible completion, result, or aspect marking, as in `食完飯未`, `食咗飯未`, and `食咗未`. The executable suite also labels bare `食飯未`, which is not supported by that source.

The permanent identity is narrowed to overt-marker forms. The bare-VP branch remains a separate research question; lack of current source support is not treated as proof of universal ungrammaticality. Predicate-object semantic compatibility also remains separate from structural recognition.

## Discovery consequences

After Batch 07 is applied:

- promotion-ready remains `0`;
- `AB30 ZoMarkedPerfectiveObjectVP` remains the only direct `boundary_ready` record;
- `AA04` and `AA23` leave the linguistic candidate pool;
- `AA01`, `AA17`, and `AA24` remain direct source-supported records under narrower identities;
- `有冇`, bare VP + `未`, and the short-complement subtypes require separate research homes;
- completed adjudication still does not satisfy corpus, panel, held-out, or promotion gates.

## Safeguards

- no UUID or short code changed;
- no runtime matcher, fixture expectation, or linguistic status file changed;
- legacy runtime names remain attached as aliases;
- source terminology remains metadata rather than permanent identity;
- successor allocation remains a separate collision-checked action;
- earlier adjudication batches remain unchanged;
- no candidate was promoted.
