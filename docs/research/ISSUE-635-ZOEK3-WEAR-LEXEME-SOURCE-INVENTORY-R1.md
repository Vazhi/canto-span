# ISSUE-635 著／着 zoek3 wear-verb source inventory R1

Parent issue: #635  
Work claim: #636  
Date: 2026-08-05

## Scope

This inventory evaluates Week 18 route `W18-F10`, triggered by the pedagogical lexical item:

```text
著
zoek3
to wear
```

The task is lexical and pronunciation research. It does not allocate a construction identity or authorize runtime changes.

## Evidence ledger

| source_id | evidence_grade | verification | citation_and_locator | what_it_supports | limit | disposition |
|---|---|---|---|---|---|---|
| `SRC-JYUTNET-ZOEK3-DICTIONARY-AGGREGATE` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `content_inspected` | 粵音資料集叢, “著”的粵語讀音, sections `[zoek3]`, `[zoek6]`, and `[zyu3]`; especially modern dictionary locators 廣州話正音字典 p.183 #2568, 粵語同音字典增訂本 p.359 #12571, 常用字廣州話讀音表 p.180 #3445, 廣州話標準音字彙 p.147, 粵語查音識字字典 p.172, and 同音字彙 p.42 #0919. <https://jyut.net/query?q=%E8%91%97> | Multiple independent dictionaries list `zoek3` for clothing/wearing senses such as `穿著`, `衣著`, `著衣`, `著衫`, and `着衣服`; the same written form also has separately listed `zyu3` and `zoek6` readings. | Aggregated lexicographic evidence supports word identity, readings, glosses, and orthography, not construction productivity or current usage frequency. | `RETAIN_LEXICAL_READING_AND_COLLISION_BOUNDARIES` |
| `SRC-CUHK-LEXICAN-ZOEK3` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `search_result_and_entry_verified` | Chinese University of Hong Kong, 粵語審音配詞字庫, `zoek3` result for `著`; separate `zoek6` result. <https://humanum.arts.cuhk.edu.hk/Lexis/lexi-can/pho-rel.php?s1=z&s2=oek&s3=3> | Independently confirms `著` under `zoek3` and distinguishes the reading from `zoek6`. | The available entry supports pronunciation classification, not argument structure or aspect distribution. | `CORROBORATE_ZOEK3_READING` |
| `SRC-WORDSHK-ZOEK3-WEAR` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `entry_and_examples_inspected` | 粵典, `着／著 zoek3`, verb ‘to wear; to put on’. <https://words.hk/zidin/v/97030/%E7%9D%80> | Supports the lexical verb and contextual example `佢着緊我送畀佢嗰對鞋`, showing wear `zoek3` with progressive `緊` and a shoe NP. | Community dictionary evidence supports lexical identity and contextual occurrence; it does not establish unrestricted aspect or object productivity. | `RETAIN_LEXICAL_CORE_AND_BOUNDED_ATTESTATION` |
| `SRC-WORDSHK-ZYU6-GAN2-COLLISION` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `entry_inspected` | 粵典, `着緊／著緊 zoek6 gan2`, ‘care about; be concerned about’. <https://words.hk/zidin/%E7%9D%80%E7%B7%8A> | Establishes a lexical compound whose written form collides with wear `着 zoek3 + 緊 gan2`. | Does not resolve every `著緊` token automatically; context and reading remain necessary. | `RETAIN_AS_SEPARATE_LEXICAL_COLLISION` |
| `SRC-WORDSHK-ZOEK3-ZYU6-EXAMPLES` | `ATTESTATION_ONLY` | `examples_inspected` | 粵典 contextual example pages containing `著住對襪`, `著住件破舊嘅大褸`, and `幫主人著衫`. Example-bearing entries include <https://words.hk/zidin/%E5%B0%8D> and <https://words.hk/zidin/%E4%B8%AB%E9%AC%9F>. | Attests wear `著／着 zoek3` with durative `住`, clothing objects, and an outer help/benefactive context. | Examples occur inside entries for other words and do not independently define a construction or broad distribution. | `RETAIN_AS_CONTEXTUAL_ATTESTATION` |
| `SRC-CANTODICT-ZOEK3-SAAM1` | `LEXICAL_OR_PRONUNCIATION_ONLY` | `entry_inspected` | CantoDict, `著衫 zoek3 saam1`, ‘to dress; to wear clothes’. <https://www.cantonese.sheik.co.uk/dictionary/words/3058/> | Corroborates the `zoek3` wear reading, transitive clothing profile, and use of `著` spelling. | Volunteer dictionary; corroborating lexical evidence only. Its orthographic commentary is not treated as a categorical register rule. | `CORROBORATE_WEAR_READING` |
| `SRC-GLOSSIKA-W18-I030` | `ATTESTATION_ONLY` | `checked_in_source_inspected` | `data/pedagogical-corpus/glossika/GLOSSIKA-YUEHK-A1-W18-20260719/source.json`, item `GLOSSIKA-YUEHK-A1-W18-20260719-I030`: `著`, `zoek3`, ‘to wear’. | Attests the exact source spelling, reading, and English gloss that triggered W18-F10. | Isolated pedagogical lexical item; no context, argument structure, productivity, dialect breadth, or parser analysis. | `RETAIN_AS_TRIGGER_ONLY` |
| `PROJECT-W18-COMMON-VERB-AUDIT` | `RUNTIME_OBSERVATION_ONLY` | `checked_in_record_inspected` | `data/research-ledgers/glossika-week18-common-verb-audit.json`, item I030: `wear_verb_with_reading_collision`, boundary `source_zoek3_requires_lexical_pronunciation_review`. | Records the existing project gap and the decision not to authorize implementation from source attestation alone. | Project analysis has zero independent linguistic-evidence weight. | `RETAIN_AS_REPOSITORY_TRIGGER` |
| `PROJECT-VERBS-LEXICON` | `RUNTIME_OBSERVATION_ONLY` | `current_main_inspected` | `src/runtime-resources/lexicon/token-lexicon/verbs.js`; no dedicated `著` wear entry found. | Documents current implementation absence. | Runtime absence neither disproves the lexical reading nor authorizes a new entry. | `OBSERVATION_ONLY` |
| `PROJECT-JYUTPING-EXPECTATIONS` | `RUNTIME_OBSERVATION_ONLY` | `current_main_inspected` | `src/runtime-resources/pronunciation/jyutping-review-expectations.js`; no `著` expectation found. | Documents current pronunciation-audit absence. | Diagnostic table is not linguistic evidence and cannot safely encode a single reading without collision policy. | `OBSERVATION_ONLY` |

## Source propositions retained

The reviewed evidence supports these bounded propositions:

1. `著／着` has a Cantonese `zoek3` reading associated with wearing or putting on clothing.
2. `著／着 zoek3` occurs with overt clothing or wearable nominal material.
3. Contextual examples attest following `緊` and `住` in wear-verb uses.
4. The same written forms have other readings and senses, including `zyu3` and `zoek6` profiles.
5. Written `著緊／着緊` has at least one lexical `zoek6 gan2` ‘care about’ analysis distinct from `zoek3 + gan2` wear structure.
6. `著` and `着` cannot be treated as an unconditional `zoek3` alias pair.

## Unsupported conclusions

The sources do not establish:

- unrestricted productivity with every nominal;
- a complete aspect paradigm;
- frequency, register dominance, or regional percentages;
- a universal modern spelling preference;
- context-free object omission;
- one parser construction covering every `著／着` occurrence;
- a new construction identity;
- safety of a global runtime pronunciation mapping.

## Repository consequence

The lexical reading is sufficiently established for a later bounded implementation design, but the current repository architecture must first demonstrate homograph-aware representation. The next issue should audit how multiple readings and lexical senses are selected and tested before modifying the token lexicon or pronunciation expectations.

No runtime, parser, test, identity, status, corpus, survey, release, or deployment change is authorized by this inventory.
