# Construction adjudication batch 09

**Adjudicated:** 2026-07-24  
**Scope:** next five direct-source records after Batch 08  
**Authority:** project expert systematic review

No record is promoted by this adjudication. Decisions concern permanent identity, naming, claim layer, family/profile placement, and explicit migration recommendations.

## Decisions

| Code | Legacy label | Approved canonical name | Claim layer | Decision | Status recommendation |
|---|---|---|---|---|---|
| `AA46` | `DiMarkedNP` | `DiMarkedNounNP` | language construction | retain overt 啲 + noun nominal expression | remain `research_pending` |
| `AA47` | `DirectedMannerMotionVP` | `MannerMotionDirectionalWrapper` | parser representation | internalize and decompose | migrate to `parser_heuristic` |
| `AA49` | `DirectionalMotionVP` | `IndependentMotionPredicateVP` | language construction | retain independent lexical motion-predicate core | remain `research_pending` |
| `AA53` | `DurativeVP` | `ZyuMarkedContinuativeObjectVP` | language construction | retain overt V + 住 + object | remain `research_pending` |
| `AA55` | `ExistentialClause` | `SubjectJauPossessiveClause` | language construction | retain overt-subject possessive 有 + nominal complement | remain `research_pending` |

## AA46 — DiMarkedNounNP

The source recognizes `di1-N` as a nominal-expression type across syntactic positions. Every executable positive contains overt `啲` followed by an overt noun, while the surrounding clauses assign different roles. Object occurrence therefore cannot be built into the permanent nominal identity.

The UUID is retained for overt `啲 + noun`, optionally preceded by a possessor as in `你啲錢`. It does not decide exact quantity, definiteness, partitivity, hidden-classifier structure, or syntactic role.

## AA47 — MannerMotionDirectionalWrapper

The executable positives include `行入去`, `行出嚟`, `向前行`, `行去學校`, `行落去`, and `由屋企行去學校`. These differ in marker position, path complexity, source and goal realization, and constituent structure.

The sources separately support preverbal directional coverb phrases, manner verbs followed by complex path expressions, and self-motion versus caused-motion distinctions. They do not establish one language construction spanning all six test profiles. The UUID therefore becomes an internal compatibility wrapper and must decompose into independently typed motion, direction, path, goal, source, and coverb structures.

## AA49 — IndependentMotionPredicateVP

The current 72-case suite is far broader than one directional-motion construction. It assigns the label to independent `去`, `嚟`, `走`, and `落` predicates, postverbal directional strings, manner motion, caused motion, goals, aspect, negation, modality, particles, and clauses that merely contain a motion predicate.

The sources explicitly distinguish independent motion predicates from postverbal directional uses. The UUID is retained for the source-supported independent-predicate core, optionally with an overt goal. Aspect, negation, modality, discourse particles, and embedding remain separate outer structures; postverbal directionals and multipart complexes do not inherit this UUID's evidence.

## AA53 — ZyuMarkedContinuativeObjectVP

The only executable positive is `戴住眼鏡`. The inspected sources distinguish `住` as continuous activity or maintained state from progressive `緊` and independently attest `陪住你`.

The UUID is retained for overt `V + 住 + object`. `DurativeVP` is replaced because it hides the marker and invites unsupported transfer to every temporally extended predicate. Lexical compatibility and the activity-versus-maintained-state boundary remain open.

## AA55 — SubjectJauPossessiveClause

The executable positives are `佢有時間`, `我有一個故事`, `我有書`, and `佢有三歲`. The checked source explicitly distinguishes possessive `有` with an overt subject from existential `有` without an overt subject. The age example is a separate construction, and none of the current positives establishes the source-supported subjectless presentational existential profile.

The UUID is retained for overt-subject possessive or availability `有 + nominal complement`. `佢有三歲`, subjectless existential/presentational clauses, locative existentials, modal or auxiliary `有 + VP`, and negative `冇` profiles remain separate.

## Discovery consequences

After Batch 09 is applied:

- promotion-ready remains `0`;
- `AB30 ZoMarkedPerfectiveObjectVP` remains the only direct `boundary_ready` record;
- `AA47` leaves the direct linguistic candidate pool;
- `AA46`, `AA49`, `AA53`, and `AA55` remain direct source-supported records under narrower identities;
- direct `source_supported` is expected to fall from `69` to `68`;
- excluded non-language/internal records are expected to rise from `25` to `26`;
- completed adjudication still does not satisfy source-scope, runtime-alignment, corpus, panel, held-out, or promotion gates.

## Safeguards

- no UUID or short code changed;
- no runtime matcher, fixture expectation, or linguistic-status file changed;
- legacy runtime names remain attached as aliases;
- source terminology remains metadata rather than permanent identity;
- successor allocation remains a separate collision-checked action;
- earlier adjudication batches remain unchanged;
- no candidate was promoted.
