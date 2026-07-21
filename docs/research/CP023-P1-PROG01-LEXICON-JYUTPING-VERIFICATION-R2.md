# CP023-P1-PROG01 lexicon and Jyutping verification — R2

Date: 2026-07-20  
Status: **verification frozen; no runtime lexicon change authorized**  
Accepted runtime: **v0.5.182**, unchanged  
Package: **CP023-P1-PROG01-R2**

## Purpose

This audit separates source-word recognition from progressive grammar. A source-attested `V緊O` string cannot be used to validate a progressive construction when its predicate or object is unknown, wrongly segmented, or assigned only an incompatible lexical sense.

The v0.5.182 baseline was captured in `../../validation/cp023-p1-prog01/lexicon-baseline-observation.json`. The proposed lexical records below are research requirements, not an implementation patch.

## Verified lexical requirements

| Surface | Verified Jyutping | Required lexical treatment | v0.5.182 observation | Evidence limit |
|---|---|---|---|---|
| 數據 | `sou3 geoi3` | noun, atomic | both characters unknown | Dictionary supports pronunciation and noun status, not progressive compatibility. |
| 九巴 | `gau2 baa1` | proper-name noun, atomic | split as numeral `九` + lexical character `巴` | Proper-name entry supports lexical identity only. |
| 布甸 | `bou3 din1` | food noun, atomic | both characters unknown | CUHK comparison database supports the Hong Kong form and tones. |
| 唱 | `coeng3` | singing verb sense | unknown | Dictionary and Fan's cited example support the verb and form; they do not define unrestricted aspect selection. |
| 兒歌 | `ji4 go1` | noun, atomic; compatible with classifier `首` | `兒` unknown; `歌` known | Dictionary supports noun status and classifiers `首／隻／支`. |
| 着 | `zoek3` in the clothing sense | add a wear/put-on verb sense while preserving other readings and senses | unknown | Must be sense-specific. `着` also has `zoek6` senses; a character-wide overwrite would be wrong. |
| 樓 | `lau2` in `買樓` | property/building noun sense | unknown | `lau4` is a surname reading and must not replace the property sense. |
| 叉燒包 | `caa1 siu1 baau1` | food noun, atomic | false partial segmentation as `叉` “fork” + unknown remainder | Atomic recognition is needed to prevent a false progressive object `叉`. |
| 信 | `seon3` | add noun “letter/mail” alongside existing belief-verb sense | only belief verb exists | This is a polysemy repair, not a replacement. The noun entry explicitly uses classifier `封`. |
| 封 | `fung1` | classifier in `封信` | unknown | The classifier reading is supported by the noun entry and example `封信`. |
| 線 | `sin3` | noun/morpheme in the source term `錫線` | unknown | Token reading is verified; the exact compound still requires domain-aware lexical treatment. |
| 錫 | `sek3` for the metal in colloquial Cantonese | metal noun/morpheme in `錫線／錫條` | unknown | The character is highly polysemous; the source transcript establishes the terms in context but not their Jyutping. |

## Deliberately unresolved item

### `錫條`

The official transcript verifies the exact surface `錫條`, but the current evidence does **not** securely settle the compound-final tone of `條` in this technical noun. Ordinary classifier `條` is `tiu4`, while lexical compounds such as `金條` may use changed tone `tiu2`. Therefore:

- retain `錫條` as a required atomic/domain term;
- do not hard-code `sek3 tiu4` or `sek3 tiu2` as final project data yet;
- obtain a direct dictionary, audio, or qualified native verification for this exact technical term before implementation.

This uncertainty does not affect the grammatical evidence: the official transcript independently establishes that `問緊錫條同埋錫線` occurred.

## Items already assembled correctly in isolation

- `報告` → noun NP, `bou3 gou3`;
- `首歌` → classifier NP;
- `嗰份報告` → demonstrative-classifier NP;
- `好靚嘅衫` → modifier NP.

Their progressive failures are therefore not lexicon-only failures. They require whole-object reassembly after `V緊`.

## Required implementation discipline

1. Keep every lexical addition independently attributable to a dictionary or exact source occurrence.
2. Preserve homographs and multiple senses instead of replacing existing entries.
3. Prefer atomic multi-character entries where character-by-character analysis creates a false parse (`叉燒包`, `數據`, `九巴`, `兒歌`, `布甸`).
4. Do not use dictionary presence as evidence that a verb freely accepts `緊`.
5. Do not alter runtime lexicon or Jyutping in this research checkpoint.

## Source locators

- 粵典, `數據`: `https://words.hk/zidin/數據`
- 粵典, `九巴`: `https://words.hk/zidin/九巴`
- CUHK 現代標準漢語與粵語對照資料庫, `布甸`: `https://apps.itsc.cuhk.edu.hk/hanyu/Page/Search.aspx?id=17747`
- 粵典, `唱`: `https://words.hk/zidin/唱`
- 粵典, `兒歌`: `https://words.hk/zidin/兒歌`
- 粵典, `着`: `https://words.hk/zidin/着`
- jyutping.org orthography note for `着`: `https://jyutping.org/ja/blog/typo/`
- 粵典, `樓`: `https://words.hk/zidin/樓`
- 粵典, `叉燒包`: `https://words.hk/zidin/叉燒包`
- 粵典, `信`: `https://words.hk/zidin/信`
- 粵典, `條`: `https://words.hk/zidin/條`
- official transcript source for `錫條／錫線`: `SRC-COI-DRINKING-WATER-2016-0111`

## Disposition

Lexical readiness is **partial**. Most missing forms have verified readings and lexical categories, but `錫條` remains pronunciation-unresolved and no runtime patch is authorized. The next grammar package must treat lexical readiness, nominal assembly, and progressive compatibility as separate gates.
