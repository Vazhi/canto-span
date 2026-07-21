# Lane 09 directional-motion core: parser-facing source map (CP021B-R3)

Date: 2026-07-18  
Branch: research provenance only  
Runtime status: **unchanged** from accepted `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`

## Scope and method

This batch maps five tightly related Lane 09 labels: `DirectionalMotionVP`, `CompoundDirectionalMotionVP`, `DirectedMannerMotionVP`, `GoalAttainmentMotionVP`, and `NegatedDirectionalMotionVP`. It extracts the exact runtime claims first, then links or restricts each claim using primary or research-grade Cantonese sources. No accepted fixture or parser output is treated as linguistic authority.

Runtime priority at batch start:

| Label | Runtime references | Accepted fixtures | Prior status |
|---|---:|---:|---|
| `DirectionalMotionVP` | 29 | 72 | provisional |
| `DirectedMannerMotionVP` | 13 | 6 | research_pending |
| `NegatedDirectionalMotionVP` | 5 | 10 | provisional |
| `CompoundDirectionalMotionVP` | 4 | 0 | unsupported_generalization |
| `GoalAttainmentMotionVP` | 4 | 2 | research_pending |

Counts come from `test-data/grammar-legitimacy-audit.tsv`. They rank runtime impact but do not support grammar claims.

## Bibliographic correction

The verified publisher/author-upload metadata places Shan and Jin's article in **Language and Linguistics 26(2)**, published online 17 March 2025. Any earlier R3 working note stating 26(3) was wrong and has not been carried into the source register.

## Runtime claim extraction

The current implementation uses `DirectionalMotionVP` for at least four materially different profiles:

1. independent predicates: `嚟`, `去`, and standalone `走`;
2. direction-plus-deixis or return-plus-deixis: `落嚟`, `上嚟`, `返嚟`, `返去`;
3. manner-plus-direction/path sequences: `行入嚟`, `行出去`, `行返過嚟`;
4. a postverbal directional subspan in a caused-motion predicate, such as the `返嚟` component of `攞…返嚟`.

`CompoundDirectionalMotionVP` is much narrower in code: the explicit template and fixed pattern cover `返上嚟`, while `行返過嚟` is routed to the general directional node. `DirectedMannerMotionVP` combines both postverbal manner-direction-goal profiles and a structurally different preverbal `向 + ground + 行` profile. `GoalAttainmentMotionVP` covers hard-coded `返/行 + 到 + overt goal`. `NegatedDirectionalMotionVP` is declared as `m4 + directional VP`, despite accepted runtime paths containing other negators such as `冇去`.

## DirectionalMotionVP

### Evidence-backed distinctions

- Shan and Jin (2025, §3.1) document deictic `嚟/去` and a closed set of nondeictic directional verbs as independent path predicates, with examples including `嚟廣州`, `去北京`, `上/落咗樓`, `入咗房`, and `返香港`.
- Direction-plus-deixis sequences such as `上嚟/去`, `落嚟/去`, and `返嚟/去` are attested, but Shan and Jin show that aspect or arguments may separate components in some structures. Their analysis is therefore incompatible with treating every surface string as one atomic word.
- Yiu (2016, pp. 263-266) independently distinguishes predicate and postverbal uses, self-motion and caused motion, and the speaker-oriented contrast between `嚟` and `去`.
- Shan and Jin separately classify standalone `走` as single-verb motion encoding, not evidence that it belongs to the same directional-sequence construction.

### Disposition

`SOURCE_LINKED_SPLIT_REQUIRED`. Keep the overt surface analyses, but split the parser-facing claims into at least **independent path predicate**, **complex directional/path expression**, **manner-directional predicate**, and **postverbal caused-motion directional component**. The literature supports the forms but does not support the current homogeneous node.

## CompoundDirectionalMotionVP

### Evidence-backed core

Wong (2023, pp. 48-49) records simple, disyllabic, and tri-syllabic directionals, including forms in which `返` precedes a disyllabic direction-plus-deictic sequence. Chor (2018, pp. 42-45) gives three-directional strings after a manner verb, including `佢行返過嚟`, with `返` first and `嚟/去` final. Yiu (2016, pp. 266-269) documents ordering and object-placement asymmetries, showing that the class is not freely combinatorial.

### Runtime mismatch and disposition

The code assigns `返上嚟` to `CompoundDirectionalMotionVP`, but assigns `行返過嚟` to `DirectionalMotionVP` without a stable manner-versus-directional boundary. Disposition: `SOURCE_LINKED_REPRESENTATION_REALIGNMENT_REQUIRED`. Future representation should preserve the manner verb separately and represent the visible `返 + path + deixis` sequence without claiming that the current node boundary is a Cantonese grammatical fact.

## DirectedMannerMotionVP

### Evidence-backed core

Yiu (2016, pp. 265-266) attests manner-plus-direction patterns such as `跑落樓下`, `跑落去/嚟`, and `跑去/嚟辦公室`. Shan and Jin (2025, §3.3) give complex forms including `行埋嚟呢度`, `爬緊返去海邊`, `跌咗落嚟`, and `漏曬出嚟`.

### Required split

The runtime's `向前行` branch is not the same postverbal configuration. Leung (2014) analyzes preverbal `向 + ground` as a directional coverb phrase before the main motion verb. Yiu also distinguishes self-motion from caused motion. Disposition: `SOURCE_LINKED_NARROWING_REQUIRED` with a mandatory representation split for preverbal coverb composition and caused-motion argument structure.

## GoalAttainmentMotionVP

### Evidence-backed core

Wong (2023, pp. 47-48) gives `返到學校未呀你？` with an arrival-at-school interpretation. Shan and Jin (2025) explicitly distinguish main arrival verb `到` from postverbal result/attainment `到`, and give `我爬到咗山頂喇` as a resultative motion construction.

### Required boundaries and disposition

Retain only reviewed motion verb + `到` + overt spatial goal profiles. Distinguish main-verb `到`, postverbal spatial attainment, nonspatial result/extent uses, and homophonous ability-related `到`. Do not infer a generic `V + 到 + place` grammar. Disposition: `SOURCE_LINKED_NARROWING_REQUIRED`.

## NegatedDirectionalMotionVP

### Evidence-backed reclassification

Wong (2023, pp. 44-45) treats `唔`, `未`, `咪`, and `冇` as preverbal negation adverbs that negate a following VP. This supports ordinary negative directional predicates through general VP negation, not a special directional-negation construction. Yiu (2016, pp. 268-270) separately documents postverbal potential patterns such as `行得/唔落去` and `行得/唔入嚟`, with lexical restrictions and blocked `起嚟` patterns. Liang and Mai's empirical coding supplement independently keeps preverbal negation, directional particles, and postverbal potential in separate coding categories.

### Disposition

`LANGUAGE_CLAIM_RETIRE_KEEP_INTERNAL_COMPOSITION`. A neutral internal wrapper may remain useful, but it should not be promoted as a Cantonese construction. Preserve the actual negator; do not treat `冇` as `m4`; and keep `V-唔-directional` potential structures separate from pre-V negation.

## Competing analyses

The reviewed literature does not impose one unanimous ontology. Shan and Jin argue that many Cantonese manner/path combinations are serial or path-verb structures, while Yiu and other descriptions use predicate/complement terminology and document construction-specific asymmetries. Canto Span should preserve overt spans, order, aspect position, argument roles, and deictic relations without presenting one theoretical analysis as settled fact.

## Open evidence gaps

1. Establish a reviewed lexical inventory and negative boundaries for each nondeictic directional, especially `起`, `開`, `埋`, and uses of `返` that are restorative rather than spatial return.
2. Separate self-motion from caused motion across the full runtime, not only the currently hard-coded examples.
3. Research object-placement and aspect-placement alternatives before freezing a future remediation design.
4. Validate structural analyses with an independent Cantonese expert if one becomes available; the sole native reviewer currently supplies sentence naturalness, not linguistic-analysis validation.

## Files

- Cumulative source register: `PARSER-CONSTRUCTION-SOURCE-REGISTER-CP021B-R3.tsv`
- Cumulative claim-source matrix: `PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R3.tsv`
- Updated 182-label inventory: `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R3.tsv`
- Readable construction links: `PARSER-CONSTRUCTION-SOURCE-LINKS-CP021B-R3.md`

No parser code, manifest version, accepted fixtures, or runtime behavior changed.
