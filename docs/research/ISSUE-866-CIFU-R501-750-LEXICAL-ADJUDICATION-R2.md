# Issue #866 — Cifu ranks 501–750 lexical adjudication consolidation R2

## Purpose

This record is the explicit supersession overlay for `ISSUE-866-CIFU-R501-750-LEXICAL-ADJUDICATION-R1.md`.

R1 remains the rank-complete base ledger: all Cifu SpokenAdult ranks 501–750 occur exactly once there, with the corrected final #794 category accounting of **128 reviewed single-analysis selections / 61 multiple-analysis selections / 31 reading-specific selections / 30 blocked-atomic rows = 250**.

R2 changes only the fields named below. Where R2 is silent, R1 remains authoritative. Where R2 explicitly conflicts with R1, R2 wins. The effective downstream lexical authority is therefore **R1 + R2**.

This record changes no runtime lexicon, parser behavior, executable test, construction identity/status, survey/native-panel state, corpus classification, release state, or deployment state.

## Evidence rule

The #794 final audit required non-blocked corpus-zero selections to distinguish independently confirmed Cantonese lexical evidence from a selection resting only on the Cifu frequency row. R1 mechanically exposed 23 such pending rows. Each of those 23 has now been checked against an independent Cantonese lexical/reference source.

For all 23 rows below, R2 supersedes R1's

`evidence-status=independent_confirmation_pending_corpus_zero`

with

`evidence-status=independent_source_confirmed_corpus_zero`.

A zero exact HKCanCor hit remains occurrence metadata, not negative evidence. Confirmation here licenses the lexical decision stated in R1/R2; it does not establish unrestricted productivity, parser behavior, or one global tokenization choice.

## Confirmed corpus-zero selections

| Rank | Surface | R2 confirmation | Independent reference |
|---:|---|---|---|
| 511 | 瑞 | `seoi6`; auspicious/lucky adjectival or bound lexical root. R1's warning against inferring unrestricted free-adjective syntax remains. | CantoDict `瑞`: https://www.cantonese.sheik.co.uk/dictionary/characters/2582/ |
| 520 | 繞 | independently attested go-around/wind/detour verbal family; documented `jiu5`/`jiu2` reading evidence. | CantoDict `繞道`: https://www.cantonese.sheik.co.uk/dictionary/words/18763/ |
| 528 | 貧 | `pan4`; poor/deficient adjectival or bound family. | CantoDict `貧`: https://www.cantonese.sheik.co.uk/dictionary/characters/3310/ |
| 536 | 灣 | `waan1`; bay/cove noun, with independently listed moor/anchor extension. | CantoDict `灣`: https://www.cantonese.sheik.co.uk/dictionary/characters/1169/ |
| 539 | 室 | `sat1`; room/chamber/home nominal root. | CantoDict `室內` component record: https://www.cantonese.sheik.co.uk/dictionary/words/2473/ |
| 544 | 樂 | independently confirms three reading/function families; see the explicit R2 reading refinement below. | Words.hk `樂`: https://words.hk/zidin/%E6%A8%82 ; CantoWords `樂`: https://cantowords.com/dictionary/%E6%A8%82 |
| 545 | 樂園 | `lok6 jyun4`; paradise/amusement-park noun. | Jyut Dictionary `樂園`: https://jyutdictionary.com/dictionary/entry/%E6%A8%82%E5%9C%92 |
| 566 | 叢林 | `cung4 lam4`; jungle/forest noun. | Wiktionary `叢林`: https://en.wiktionary.org/wiki/%E5%8F%A2%E6%9E%97 |
| 580 | 直線 | `zik6 sin3`; straight-line noun. | Words.hk `直線`: https://words.hk/zidin/%E7%9B%B4%E7%B7%9A |
| 594 | 東方 | `dung1 fong1`; east/the East noun. | Words.hk `東方`: https://words.hk/zidin/%E6%9D%B1%E6%96%B9 |
| 615 | 灘 | `taan1`; beach/bank/shoal nominal root. | CantoDict `沙灘` component record: https://www.cantonese.sheik.co.uk/dictionary/words/1338/ |
| 622 | 會話 | conversation noun; independent sources support the Cantonese changed-tone `話` reading in this lexical item. | CantoDict `會話`: https://www.cantonese.sheik.co.uk/dictionary/words/9473/ ; CC-Canto search: https://cantonese.org/search.php?q=%E4%BC%9A |
| 625 | 轉彎 | turn/corner verbal expression; `zyun3 waan1` is directly attested, with reading variation to remain a pronunciation-level distinction where independently supported. | CantoDict `彎` compound evidence: https://www.cantonese.sheik.co.uk/dictionary/characters/1876/ |
| 636 | 磅 | independently confirms the `bong6` versus `bong2` reading/function distinction; see the explicit R2 reading refinement below. | CantoWords `磅`: https://cantowords.com/dictionary/%E7%A3%85 |
| 637 | 山路 | `saan1 lou6`; mountain-road/path noun. | Words.hk `山路`: https://words.hk/zidin/%E5%B1%B1%E8%B7%AF |
| 642 | 西方 | `sai1 fong1`; west/the West noun. | Words.hk `西方`: https://words.hk/zidin/%E8%A5%BF%E6%96%B9 |
| 651 | 圖案 | `tou4 on3`; design/pattern noun. | CantoDict `案` compound record: https://www.cantonese.sheik.co.uk/dictionary/characters/2260/ |
| 677 | 直行 | independently confirms distinct `zik6 haang4` and `zik6 hong4` lexical families; see the explicit R2 reading refinement below. | Wiktionary `直行`: https://en.wiktionary.org/wiki/%E7%9B%B4%E8%A1%8C ; CantoDict: https://www.cantonese.sheik.co.uk/dictionary/words/23140/ |
| 712 | 水平線 | `seoi2 ping4 sin3`; horizon/horizontal-line noun. | CC-Canto: https://cantonese.org/search.php?q=%E6%B0%B4%E5%B9%B3%E7%B7%9A |
| 721 | 碑 | `bei1`; stele/monument nominal root. | CantoWords `里程碑`: https://cantowords.com/dictionary/%E9%87%8C%E7%A8%8B%E7%A2%91 ; CantoDict component evidence |
| 726 | 距離 | `keoi5 lei4`; distance noun / be-apart relation. | CantoDict `距離`: https://www.cantonese.sheik.co.uk/dictionary/words/7354/ |
| 727 | 概念 | `koi3 nim6`; concept noun. | Wiktionary `概念`: https://zh.wiktionary.org/wiki/%E6%A6%82%E5%BF%B5 ; CantoDict `概`: https://www.cantonese.sheik.co.uk/dictionary/characters/2293/ |
| 743 | 港人 | `gong2 jan4`; Hong Kong person/people noun. | Words.hk `港人`: https://words.hk/zidin/%E6%B8%AF%E4%BA%BA |

After this sweep, **zero non-blocked corpus-zero rows in ranks 501–750 remain gated solely for missing independent Cantonese confirmation**.

Blocked/compositional corpus-zero rows in R1 are unaffected. Confirming their component words would not establish atomic whole-form lexicality.

## Explicit lexical refinements

### 544 樂 — reading split

R2 supersedes R1's two-family description.

Preserve at least these independently documented lexical/morphemic families:

- `lok6` — happy/joyful family and surname use;
- `ngok6` — music/musical bound or lexical family;
- `ngaau6` — bound/formal enjoy/appreciate family.

Downstream implementation must not collapse all three to one reading or treat a Cifu pronunciation as the authority for their sense partition.

### 636 磅 — reading/function split

R2 sharpens R1's reading split:

- `bong6` — pound/weight measure family, with independently documented verbal weigh/pay-settle uses;
- `bong2` — noun referring to scales/balance device.

The two reading-linked families require stable alternatives if runtime reconciliation represents both. A single generic noun or verb entry is insufficient.

### 677 直行 — reading/function split

R2 sharpens R1's reading split:

- `zik6 haang4` — verbal/expression family “go straight”; 
- `zik6 hong4` — nominal family “vertical column/line”.

These are distinct reading/function analyses. Do not use one concatenated Cifu reading for both senses.

## Downstream implementation consequence

A later, separately claimed ranks 501–750 runtime reconciliation must:

1. treat R1 + R2 as the effective lexical specification, with R2 winning explicit conflicts;
2. preserve all 250 exact ranked surfaces;
3. keep all 30 R1 `blocked_atomic` rows free of fabricated atomic POS unless later independently re-adjudicated;
4. preserve independently supported reading/category alternatives with stable analysis IDs;
5. distinguish lexical inventory from default token behavior so a supported alternative does not automatically replace an already-valid typed or compositional default;
6. avoid importing Cifu definitions or Jyutping as linguistic authority;
7. preserve the already-integrated ranks 1–500 lexical stack; and
8. pass the repository regression-debt ratchet before any runtime merge.

## R2 validation

- R1 remains 250/250 rank-complete.
- R1 category accounting remains 128 / 61 / 31 / 30.
- R2 explicitly clears all 23 non-blocked corpus-zero confirmation gates.
- R2 changes lexical content only for ranks 544, 636, and 677, and only in the reading/function dimensions stated above.
- No runtime or executable-test state changes in this consolidation unit.
