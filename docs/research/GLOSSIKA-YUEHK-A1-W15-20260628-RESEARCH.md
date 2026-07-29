# Glossika Cantonese (HK) A1 Week 15 research packet

- Packet: `GLOSSIKA-YUEHK-A1-W15-20260628-RESEARCH-R1`
- Intake: #127
- Work claim: #272
- Corpus ingress: #132 / PR #271
- Source: `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W15-20260628/source.json`
- Source payload SHA-256: `0e57454b530e1a50bfc4a4cf9cedada7fcf87f194f290251dc2f3e4f9aaa65e8`
- Status: research complete; no runtime, construction-status, corpus-classification, survey, or release change

## Purpose and evidence boundary

This packet evaluates the authorized Week 15 lesson as pedagogical and lexical attestation. Source Cantonese, source Jyutping, glosses, register labels, grammar prose, IPA, and order remain preserved in the corpus package. They are not automatically accepted as direct linguistic conclusions.

Machine-readable outputs:

- `data/research-ledgers/glossika-week15-claim-source.json`
- `data/research-ledgers/glossika-week15-lexical-ingress.json`
- `data/research-ledgers/glossika-week15-followup-candidates.json`

## Executive findings

1. **Spatial material must be split by category.** Cantonese distinguishes verb-like predicative spatial elements such as `喺` from nominal-like localizers and spatial nouns. A catch-all “locative” analysis would erase category and distribution differences.
2. **The route examples are compositional clause sequences, not evidence for one route construction.** They include destination questions, imperatives, locative answers, elapsed-distance expressions, perfective landmark passage, and arrival/result relations.
3. **`行兩分鐘就到` does not automatically instantiate a V-`到` resultative compound.** Final `到` is separated from `行` by a duration phrase and `就`; arrival, omitted destination, and resultative analyses must remain distinct.
4. **The lesson's generic yes/no-question rule is unsafe.** Modern final `咩 me1` commonly carries biased, negative-presuppositional, or discourse effects. `呀 aa3` in `點行呀` is a discourse particle in a wh-question, not the `aa4` polar-question particle named in the prose rule.
5. **A-not-A, particle, and wh-question strategies remain separate.** `係唔係`, `有冇`, final-`me1` questions, and in-situ `咩/邊個/點/邊度` questions must not feed one generic interrogative detector.
6. **The numeral slice remains compositional.** Nine forms from `十萬` through `九十萬` need no opaque whole-form entries; `一百萬` already has exact canonical coverage.
7. **The phonics table is not implementation-ready.** All six rows require independent verification, and the final row is explicitly incomplete on the A side.
8. **The modular lexicon scan found 20 lexical-review candidates, 10 exact existing entries, and nine compositional numeral forms.** No lexical implementation occurs in this PR.

## 1. Spatial categories and localizers

The Week 15 vocabulary groups `隔籬`, `對面`, `附近`, `遠`, `近`, `上面`, `下面`, `入面`, and `外面` together as direction/place vocabulary. Direct Cantonese spatial analysis requires a finer split.

Xie, Zhang, and Ursini identify two central Cantonese spatial categories: verb-like predicative elements such as `喺 hai2` and nominal-like localizers such as `裏面 leoi5min6`. Kwan's locative-phrase work independently shows that locative PP position is grammatically and processing-sensitive rather than freely interchangeable.

### Positive boundary

- `喺 + location` can head or introduce a predicative/locative relation.
- localizer and spatial-region expressions can identify a region relative to a ground or discourse reference.
- `喺超市隔籬`, `喺前面`, and `喺右手邊` are compatible with compositional spatial analysis.

### Negative boundaries

Do not assume that:

- every item ending in `面` has identical syntax;
- `隔籬` and `對面` are interchangeable with `上面/下面/入面/外面`;
- every spatial expression requires an overt ground in the same clause;
- the English alternatives “above/upstairs” or “below/downstairs” identify one context-free lexical meaning;
- all spatial phrases share one parser label or word-order rule.

## 2. Route questions and instructions

### Destination/path question

`請問去地鐵站點行？` combines a discourse formula, a destination phrase, and in-situ `點` asking for a route or manner. It is useful attestation but does not establish a single unanalyzed route-question template.

### Imperative path instruction

`直行，然後轉左。` contains two instruction clauses linked by `然後`. The punctuation and sequencing semantics do not alone justify a dedicated route-chain identity. Existing imperative, motion, direction, and clause-relation owners should be audited first.

### Locative answer

`就喺前面，行兩分鐘就到。` contains a foregrounded locative answer followed by a duration/path expression and an arrival predicate. It should not be flattened into one phrase.

### Landmark sequence

`直行，過咗紅綠燈就喺右手邊。` contains:

- an imperative motion clause;
- a perfective landmark-passage clause with `過咗`;
- `就` linking the landmark event to a location assertion;
- a spatial-region phrase `喺右手邊`.

The source establishes the sequence, not a completed analysis of `就` as temporal, conditional, resultative, or discourse-linking in all such examples.

## 3. Arrival and result `到`

Cantonese resultative research warns against identifying resultative constructions from surface adjacency alone. Lai and Pang treat resultative patterns as construction-specific wholes with argument and potential-form properties. Lau and Lee describe constraints on Cantonese resultative compounds and several V-`到` alternatives.

In `行兩分鐘就到`, `到` is not adjacent to `行`: a duration phrase and `就` intervene. The safest source-led description is **arrival after an elapsed path or duration**, possibly with an omitted destination supplied by discourse.

### Required negative evidence before V-`到` classification

- direct `V-到` adjacency contrasts;
- affirmative and negative potential forms where relevant;
- destination-present and destination-omitted contrasts;
- arrival-predicate versus successful-result readings;
- argument-structure and scope evidence.

No resultative parser change follows from this item.

## 4. Question strategies

### Final `咩 me1`

Glossika states that a yes/no question can be formed by adding `咩 me1` or `呀 aa4` to a statement. The historical and modern analysis of `me1` shows that this is too broad for present-day Cantonese. Modern `me1` has developed strong biased and discourse uses and is associated with negative presuppositions or expectations.

Accordingly, `你食飯咩？` cannot be accepted as a neutral equivalent of English “Do you eat rice?” without a discourse context. It is preserved as a naturalness and translation-pragmatics review item.

### `aa3` versus `aa4`

The dialog has `點行呀？ dim2 haang4 aa3?`, while the lesson prose names `aa4` as a polar-question particle. Tone-specific identity matters.

Sybesma and Li describe `aa3` with declaratives, imperatives, exclamatives, wh-questions, and A-not-A questions, contributing discourse smoothing or contextual fit rather than neutral clause typing. Cheung's corpus-informed thesis further investigates its semantic and epistemic functions.

Therefore:

- the source's `aa4` prose claim does not analyze the actual `aa3` dialog token;
- orthographic `呀` cannot determine particle identity without tone;
- `aa3` in `點行呀` should remain a wh-question discourse-particle use pending item-level analysis.

### A-not-A questions

`佢係唔係老師？` and `附近有冇郵局？` exemplify affirmative-negative question strategies. Direct research treats A-not-A questions as structurally constrained and distinct from final-particle questions.

### Wh-in-situ questions

The source attestations include:

- `咩` in `你叫咩名？`;
- `邊個` in `邊個嚟？`;
- `點` in route questions;
- `邊度` in `超市喺邊度？`.

These question expressions remain in their ordinary clause positions. Their presence does not license final `me1/aa4` question particles in the same way as a polar-question strategy.

## 5. Formulaic responses and register labels

The lesson attests:

- `唔使客氣`
- `冇嘢`
- `唔使唔該`
- `小事啫，唔使客氣`
- `恭喜恭喜`
- `生日快樂`
- `新年快樂，身體健康`
- `祝你一切順利`

The Casual/Polite labels are pedagogical source metadata. This packet does not validate them as stable sociolinguistic features. `唔使唔該` remains a dedicated naturalness/register review item rather than an accepted formula.

No runtime formula or register change is authorized.

## 6. Large numerals

The source lists `十萬` through `一百萬`. Cantonese word-segmentation research supports internal numeral composition even where a surface tier groups a written number as one word.

The canonical scan found:

- `十萬` through `九十萬`: no exact entry; retain composition rather than adding nine opaque wholes;
- `一百萬`: exact coverage in both `token-lexicon` and `compositional-lexical-phrases` resources; do not duplicate it.

## 7. Phonics `/ɛː/` versus `/iː/`

The six source rows are preserved exactly. They require separate verification of:

- IPA and vowel quality;
- Jyutping and tone;
- lexical choice and polysemy;
- whether each pair teaches the stated contrast;
- English gloss accuracy.

The final row contains only `平 ping4 cheap; flat` on the B side. The A side is an em dash. That missing data must not be silently reconstructed.

The `錫` gloss “tin; to kiss” and the `靚/令` pairing are explicit review flags, not corrections.

## 8. Canonical lexical coverage

### Existing exact entries: 10

- 附近
- 遠
- 近
- 上面
- 入面
- 地鐵站
- 醫院
- 公園
- 街
- 一百萬

### Compositional numeral forms without opaque entries: 9

- 十萬
- 二十萬
- 三十萬
- 四十萬
- 五十萬
- 六十萬
- 七十萬
- 八十萬
- 九十萬

### Lexical-review candidates: 20

- 隔籬
- 對面
- 下面
- 外面
- 巴士站
- 教堂
- 郵局
- 十字路口
- 行人路
- 噴泉
- 雕像
- 窄巷
- 迴旋處
- 天橋
- 隧道
- 橋
- 廣場
- 噴水池
- 行人天橋
- 戲票

Candidate status means only that no exact entry exists in the four scanned canonical owners. A separate implementation issue must determine lexical-whole versus productive-compound status, verify Jyutping and glosses, choose the smallest canonical owner, add tests, and avoid duplicate or overly broad entries.

## 9. Project consequences

### Authorized by this packet

- retain the source and research ledgers;
- retain category-specific spatial boundaries;
- retain distinct question-strategy boundaries;
- retain 20 lexical-review candidates;
- route unresolved items to corpus work, parser audits, or role-neutral panels as specified.

### Not authorized

- parser behavior changes;
- runtime lexical or pronunciation changes;
- new construction identities;
- status or readiness transitions;
- accepted corpus classifications;
- survey deployment;
- native-speaker judgments;
- runtime version or release changes.

## References

- Bauer, Robert S., and Paul K. Benedict. 1997. *Modern Cantonese Phonology*. DOI `10.1515/9783110823707`.
- Cheung, Lawrence Yam-Leung. 2021. “The origin and development of the question particle me1 in Cantonese.” *Lingua* 254:103049. DOI `10.1016/j.lingua.2021.103049`.
- Cheung, Wang Nok. 2023. *Investigating the semantic/pragmatic function(s) of the Cantonese sentence final particle aa3*. University of Hong Kong thesis. `https://hub.hku.hk/handle/10722/335514`
- Kwan, Wing-man. 2005. *On the word order of locative prepositional phrases in Cantonese: processing, iconicity and grammar*. University of Hong Kong thesis. DOI `10.5353/th_b3145014`.
- Lai, Ryan Ka Yau, and Michelle Man-Long Pang. 2023. “Rethinking the Description and Typology of Cantonese Causative–Resultative Constructions: A Dynamic Constructionist Lens.” *Languages* 8(2):151. DOI `10.3390/languages8020151`.
- Lam, Charles, Chaak-ming Lau, and Jackson L. Lee. 2024. “Multi-Tiered Cantonese Word Segmentation.” *LREC-COLING 2024*, 11993–12002. `https://aclanthology.org/2024.lrec-main.1047/`
- Lau, Yan Ping Helena, and Sophia Yat Mei Lee. “On Resultative Verb Compounds in Cantonese and Mandarin.” PolyU Scholars Hub.
- Law, Yan Kei Ann. 2004. *Sentence-final focus particles in Cantonese*. University College London doctoral thesis. `https://discovery.ucl.ac.uk/id/eprint/10101610/`
- Sybesma, Rint, and Boya Li. 2007. “The dissection and structural mapping of Cantonese sentence final particles.” *Lingua* 117(10):1739–1783. DOI `10.1016/j.lingua.2006.10.003`.
- Xie, Qin, Yue Sara Zhang, and Francesco-Alessio Ursini. 2023. “Spatial Categories in Cantonese: Morpho-Syntactic Analysis Meets Discourse Distribution.” `https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4627515`
