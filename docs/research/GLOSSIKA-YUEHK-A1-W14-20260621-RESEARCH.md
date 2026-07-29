# Glossika Cantonese (HK) A1 Week 14 research packet

- Packet: `GLOSSIKA-YUEHK-A1-W14-20260621-RESEARCH-R1`
- Intake: #126
- Work claim: #261
- Source-preserving corpus ingress: #131 / PR #160
- Source: `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W14-20260621/source.json`
- Source payload SHA-256: `8b539f409e0cd61bea4832edfa6ec1c607e8d18cd9f429ddbab954b36920102f`
- Source authorization: project-specific non-commercial private-use permission reported by the user; no general redistribution claim
- Status: research complete; no runtime, construction-status, corpus-classification, survey, or release change

## Purpose and evidence boundary

This packet analyzes the authorized Week 14 lesson as a source of pedagogical and lexical attestation. It does not treat Glossika labels, glosses, examples, or drills as independent proof of grammatical productivity, preferred parsing, register, dialect-wide naturalness, or phonological analysis.

The immutable source package contains 61 records: 14 sentences, 4 dialog turns, 35 lexical entries, and 8 phonics pairs. Findings below distinguish:

1. what Glossika directly attests;
2. what independent Cantonese research supports;
3. what is a conservative inference;
4. what remains unresolved and needs corpus or role-neutral panel work.

The machine-readable claim ledger is `data/research-ledgers/glossika-week14-claim-source.json`. The exact runtime-coverage scan is `data/research-ledgers/glossika-week14-lexical-ingress.json`. Follow-up questions are in `data/research-ledgers/glossika-week14-followup-candidates.json`.

## Executive findings

1. **Do not convert the lesson's Casual/Polite labels into register rules.** Direct Cantonese apology research shows that apology choice and composition depend on offence type and severity, discourse purpose, role, age, and social context. The lesson labels remain source metadata only.
2. **Do not teach 唔該 and 多謝 as merely casual and polite alternatives.** Direct semantic and pragmatic work treats them as distinct gratitude expressions with different functions, even though some contexts allow both.
3. **Do not collapse 㗎 and final 嘅 into a generic particle gloss.** Direct particle research supports context-sensitive g-family particles. Recent work shows gaa3 in declaratives, interrogatives, and exclamatives. Exact item-level interpretations remain open.
4. **幾 in 幾辛苦㗎 has a supported narrow degree use.** It modifies a scalar or stative predicate approximately as “quite/fairly.” This does not license interrogative or numeral 幾, nor every elliptical sequence.
5. **做咩工 and 做會計 are useful occupational attestations, not a construction decision.** The lesson does not establish a dedicated occupational predicate identity or the argument structure of 做.
6. **喺銀行返工 and 喺酒店返工 remain compositionally analyzable.** At minimum, they contain a locative phrase and a work predicate. No new workplace-locative construction is justified.
7. **一萬 through 十萬 must remain compositional.** They should not become ten opaque whole-form lexical entries.
8. **The phonics section is pronunciation evidence only.** Cantonese long/short vowel contrasts may involve duration and vowel quality. The eight pairs need item-level checking before pronunciation-resource reuse.
9. **The modular lexicon scan found 21 lexical-review candidates, four exact existing entries, and ten compositional numerals.** No lexical implementation is included here.

## 1. Apologies and register

### Source forms

- `I001` 唔好意思。
- `I002` 對唔住呀。
- `I003` 對唔住，我遲咗。
- `I004` 好對唔住，係我唔啱。

Glossika labels the first two Casual and the latter two Polite. That is a pedagogical grouping, not a verified register analysis.

Li Lee's Cantonese apology experiments identify situational and social variables—including role, age, severity, and interlocutor background—as relevant to apology realization. Cynthia Lee's electronic-apology study also finds multi-component apology strategies and effects from offence interpretation and communicative situation. These findings support a contextual contrast, not a one-dimensional formality ladder.

### Retained boundary

- Supported: apology-form choice and composition are context-sensitive.
- Not supported: `唔好意思 = casual` and `對唔住 = polite` as a general rule.
- Unresolved: exact contrasts among attention management, minor imposition, responsibility, offence severity, and explicit fault admission in the lesson contexts.

### Required follow-up

Use direct pragmatics review and controlled minimal contexts before considering a role-neutral panel. Do not create a runtime register feature from this lesson.

## 2. Gratitude: 唔該 and 多謝

### Source forms

- `I005` 多謝。
- `I006` 唔該晒。
- `I007` 多謝你嘅幫忙。
- `I008` 真係好多謝你。

Wong and Liu's direct Hong Kong Cantonese analysis and Lee's HKU thesis both treat 唔該 and 多謝 as distinct gratitude expressions requiring semantic and contextual explanation. Their difference is not reducible to casual versus polite. Some situations permit overlap, so a rigid complementary-distribution rule would also overstate the evidence.

### Retained boundary

- Supported: separate lexical-semantic and pragmatic treatment.
- Supported: 唔該晒 is an intensified 唔該 expression in the source.
- Not supported: one form is simply more polite than the other.
- Not decided: the final learner-facing decision tree or contextual gloss inventory.

This cluster has immediate learner value and is a strong candidate for a later lexical/presentation task, but no runtime change belongs in this research PR.

## 3. Occupational questions and predicates

### Source forms

- `I044` 你做咩工？
- `I045` 我喺銀行返工。
- `I048` 你做咩工㗎？
- `I049` 我做會計嘅。你呢？
- `I050` 我喺酒店返工。幾辛苦㗎。
- `I051` 係呀，不過人工OK嘅。

The source attests 做 with a work/occupation expression and 返工 with a workplace locative. It does not by itself establish a dedicated occupational construction, lexical argument-role mapping, omitted copula analysis, or special workplace-locative construction.

### Conservative analysis boundary

- `喺銀行` / `喺酒店` can be retained as overt locative phrases.
- `返工` remains a work predicate or lexical activity expression.
- `做咩工` and `做會計` require broader direct grammar and corpus evidence before construction identity or parser work.
- The English rendering “I'm an accountant” does not independently prove that the Cantonese syntax is a copular occupation clause.

## 4. Sentence-final 㗎 and 嘅

The lesson uses:

- question-final `㗎` in `你做咩工㗎？`;
- evaluative `㗎` in `幾辛苦㗎`;
- final `嘅` in `我做會計嘅` and `人工OK嘅`.

Sybesma and Li analyze Cantonese sentence-final particles as structured semantic and syntactic material rather than interchangeable pragmatic decoration. Yu and Hu show gaa3 in declarative, interrogative, and exclamative structures across several discourse contexts. This supports the formal possibility of the lesson uses while rejecting a single generic meaning.

### Retained boundary

- Supported: gaa3 may occur in the clause types represented here.
- Supported: particle interpretation depends on clause type and discourse context.
- Not supported: the source gloss `SFP` determines a single meaning.
- Not supported: final 嘅 is automatically the attributive marker because Glossika labels it `ATTR`.
- Unresolved: the exact relation among final ge3, nominalization-related analyses, actuality/relevance effects, and the occupational/evaluative contexts in `I049` and `I051`.

No particle parser change follows from this packet.

## 5. Degree 幾

In `I050`, `幾辛苦㗎`, 幾 precedes the scalar/stative predicate 辛苦. Direct grammatical description classifies 幾 gei2 among Cantonese degree adverbs that mark the degree of an adjective or stative verb.

### Positive boundary

`幾 + scalar/stative predicate`, as in `幾辛苦`, is a supported degree profile approximately “quite/fairly + predicate.”

### Negative boundaries

Do not infer this profile for:

- interrogative 幾, including time, quantity, or degree questions;
- numeral 幾 “several/a few”;
- sequences where the predicate is absent or recovered only from discourse without separate evidence;
- all strings ending in gaa3 regardless of the predicate structure.

A later parser audit may check existing coverage, but this research packet does not change it.

## 6. Large numerals

The lesson lists `一萬` through `十萬`. The canonical lexicon scan found no exact opaque runtime entries for these ten forms and classifies them as compositional numerals.

Lam, Lau, and Lee treat Cantonese numerals as internally structured even when a particular word-segmentation tier joins the written numeral. The relevant reusable units are digit/ten plus 萬, not ten unrelated lexical wholes.

### Disposition

- Do not add ten opaque whole-form entries.
- Preserve ordinary numeral composition.
- Treat salary, money, classifier, and larger-number expressions as separate grammar and lexicon questions when they arise.

## 7. Vowel-length phonics

The lesson's eight phonics pairs are useful pedagogical attestations but are not a complete phonological analysis. Bauer and Benedict provide the reference Cantonese vowel system. Luo, Li, and Mok experimentally examine the `/aː/–/ɐ/`, `/ɛː/–/e/`, and `/ɔː/–/o/` contrasts and report effects involving exposure, vowel quality, and duration.

### Retained boundary

- The `/aː/–/ɐ/` distinction is especially important for teaching length.
- Do not generalize “same vowel, duration only” to every long/short pair.
- Verify each Glossika pair's written form, Jyutping, lexical meaning, and intended contrast before pronunciation-resource ingress.
- Preserve source Jyutping unchanged until a separate correction ledger is authorized.

## 8. Lexical-ingress matrix

A deterministic scan compared all 35 Week 14 lexical entries against the canonical modular runtime owners:

- `src/runtime-resources/lexicon/token-lexicon/**`
- `src/runtime-resources/lexicon/productive-vo.js`
- `src/runtime-resources/lexicon/formulas.js`
- `src/runtime-resources/lexicon/compositional-lexical-phrases.js`

### Exact existing entries: 4

- 公司
- 老闆
- 準時
- 文件

These require no duplicate ingress.

### Compositional numeral forms: 10

- 一萬, 二萬, 三萬, 四萬, 五萬, 六萬, 七萬, 八萬, 九萬, 十萬

These remain compositional and must not be added as opaque whole-form entries.

### Lexical-review candidates: 21

- 返工
- 放工
- 辦公室
- 開會
- 出糧
- 放假
- 打工
- 人工
- 加班
- 辭職
- 見工
- 履歷
- 職位
- 合約
- 遲到
- 電腦
- 電郵
- 傳真
- 影印
- 客戶
- 實習生

Candidate status means only that no exact entry exists in the scanned canonical owners. It is not implementation authorization. A later task must choose the smallest canonical owner, validate Jyutping and glosses, distinguish lexical wholes from productive composition, add focused tests, and avoid duplicate or overly broad entries.

## 9. Source-review flags

The following are review flags, not silent corrections:

- `打工` is glossed “to work (part-time)”; verify whether that is too narrow for learner-facing coverage.
- `見工` is glossed “job interview”; verify nominal versus activity/verb-oriented learner glossing.
- `出糧` is glossed “to get paid”; verify employer-disbursement versus employee-receipt perspective.
- `唔好意思` is recorded with `si1`; preserve the source value and check pronunciation variants separately.
- Initial capitalization in sentence-level Jyutping is source formatting and should be normalized only in a derived field.
- Final `嘅` is glossed `ATTR` in dialog turns; retain that source gloss but do not treat it as a completed syntactic analysis.

## 10. Project consequences

### Authorized by this packet

- preserve the source and research ledgers;
- retain 21 deduplicated lexical-review candidates;
- retain bounded grammar and register findings;
- route unresolved items to corpus research or role-neutral panel design as appropriate.

### Not authorized

- parser behavior changes;
- runtime lexical or pronunciation changes;
- new construction identities;
- status or readiness transitions;
- corpus candidate classifications;
- survey deployment;
- native-speaker judgments;
- runtime version or release changes.

## References

- Bauer, Robert S., and Paul K. Benedict. 1997. *Modern Cantonese Phonology*. DOI: `10.1515/9783110823707`.
- Lam, Charles, Chaak-ming Lau, and Jackson L. Lee. 2024. “Multi-Tiered Cantonese Word Segmentation.” *LREC-COLING 2024*, 11993–12002. `https://aclanthology.org/2024.lrec-main.1047/`
- Lee, Cynthia. 2008. “The Cantonese apology style for personal offences in native and second languages in electronic communication.” *Journal of Intercultural Communication* 8(3):1–16. DOI: `10.36923/jicc.v8i3.469`.
- Lee, Mei-shan. 2013. *Gratitude expressions with mh-goi and do-jeh in Cantonese: their syntax, lexical semantics and sentence semantics*. University of Hong Kong thesis. DOI: `10.5353/th_b5091048`.
- Li Lee, May-yu. 1983. *Making Apologies in Cantonese*. ERIC `ED263790`.
- Luo, Jingxin, Vivian Guo Li, and Peggy Pik Ki Mok. 2020. “The Perception of Cantonese Vowel Length Contrast by Mandarin Speakers.” *Language and Speech* 63(3):635–659. DOI: `10.1177/0023830919879471`.
- Sybesma, Rint, and Boya Li. 2007. “The dissection and structural mapping of Cantonese sentence final particles.” *Lingua* 117(10):1739–1783. DOI: `10.1016/j.lingua.2006.10.003`.
- Wong, Anita M.-Y., C. C.-H. Cheung, J. M.-W. Lo, and E. K.-H. Wan. 2022. “Grammatical Analysis of Cantonese Samples.” In *Understanding Development and Disorder in Cantonese Using Language Sample Analysis*. ISBN `9780367424190`.
- Wong, Jock, and Congyi Liu. 2019. “Two Ways of Saying ‘Thank You’ in Hong Kong Cantonese: m-goi vs. do-ze.” In *Further Advances in Pragmatics and Philosophy: Part 2*, 435–447. DOI: `10.1007/978-3-030-00973-1_24`.
- Yu, Zhiyin, and Xiaoshi Hu. 2025. “The Syntax of the Sentence-final Particle gaa3 in Cantonese.” *Current Research in Chinese Linguistics* 104(2):653–678. DOI: `10.29499/CrCL.202507_104(2).0022`.
