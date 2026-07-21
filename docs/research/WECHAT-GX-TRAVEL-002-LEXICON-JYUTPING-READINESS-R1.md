# WECHAT-GX-TRAVEL-002 lexicon and Jyutping readiness — R1

Date: 2026-07-20  
Runtime observed: **v0.5.181**  
Scope: **research/readiness only; no runtime, parser, grammar-status, candidate-scoring, render packet, or evaluator-custody change**

## Result

The 32 corpus units in the lexicon/Jyutping queue generated **39 distinct candidates**.

This triage separates ordinary lexical repair from grammar research:

- directly verified or proper-place entries ready for a bounded lexicon patch: **9**;
- corpus-local personal names/nicknames that must not enter the global lexicon: **5**;
- component-only/compositional items: **2**;
- grammar-dependent, polysemous, or otherwise deferred items: **5**;
- remaining ordinary terms: ready only after item-level dictionary/region checks.

## Highest-value immediate repairs

| Candidate | Proposed treatment | Reason |
|---|---|---|
| `啖 daam6` | add classifier entry; keep `一 + 啖` compositional | Direct dictionary evidence identifies it as a classifier for a mouthful/sip. |
| `尋晚黑 cam4 maan5 hak1/haak1` | add lexical time NP with pronunciation variants | Direct dictionary entry and corpus match. |
| `差唔多 caa1 m4 do1` | add lexicalized multiword entry with sense split | Direct dictionary evidence supports similarity; approximation remains a related but distinct use. |
| `揸 zaa1` | add lexical entry with explicit polysemy | Direct dictionary evidence supports holding/control; vehicle-driving selection still needs separate evidence. |
| `嘛 maa3` | add particle token with scope-neutral metadata | Reading is source-linked, but discourse contribution must remain contextual. |
| `廣西 / 桂林 / 陽朔 / 廣州` | add or repair proper-place entries | Lexical identity only; no motion/goal construction is licensed. |

## Items that must not be “fixed” by an atomic entry

- `成班人`: prefer `成 + 班 + 人`; no atomic grammar-bearing node.
- `一啖`: add `啖` as a classifier, not a frozen phrase.
- `做嘢`: prefer ordinary `做 + 嘢` composition unless a segmentation failure independently requires an MWE.
- `早知`: may become a lexical anchor only after the regret-frame design is explicit; exact `早知…咪仲好` is still unresolved.
- `跟住` in U049: the verified temporal-adverb entry “then” does **not** analyze the corpus’s apparent accompaniment `跟 + 住 + 去`.
- `兜`: add only with a source-verified route/activity sense; the character is highly polysemous.
- `加加埋埋`: retain as a research candidate until an item-level source establishes the MWE and its boundaries.

## Regional and speaker-sensitive entries

- `摩托車` and `上班` are natural in this Guangzhou-area conversation. They should carry regional provenance rather than overwrite Hong Kong-preferred learner vocabulary such as `電單車` or other work expressions.
- `姨甥` requires a careful kinship-scope check before assigning one English relation.
- `大伯` and `阿妹` may function as both kinship terms and social/address labels.

## Name policy

The following stay corpus-local only:

- `阿豬仔`
- `豬伯`
- `方子`
- `阿拉`
- `吳蘇陽`

They may support named-entity preservation tests but must not become productive vocabulary or grammar.

## Evidence notes

Direct dictionary checks in this batch covered `尋晚黑`, `啖`, `揸`, `跟住` (temporal-adverb sense only), and `差唔多`. The uploaded Cantonese coursebook independently supports `早知` as a regret expression. Other proposed readings are readiness hypotheses and require item-level checking before runtime installation.

## Files

- `WECHAT-GX-TRAVEL-002-LEXICON-JYUTPING-READINESS-R1.tsv`
- `WECHAT-GX-TRAVEL-002-LEXICON-JYUTPING-READINESS-R1.json`
- `WECHAT-GX-TRAVEL-002-LEXICON-JYUTPING-READINESS-AUDIT-R1.json`

## Parser-program boundary

The next parser action remains the v0.5.181 rendered-review handoff. This lexicon batch supplies no evidence weight to `ResourceUseLaiFunctionRelation`, changes no runtime bytes, and does not open evaluator custody.
