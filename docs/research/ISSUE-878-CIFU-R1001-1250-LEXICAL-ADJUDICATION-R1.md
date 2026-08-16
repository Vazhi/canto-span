# Issue #878 — Cifu ranks 1001–1250 lexical adjudication consolidation R1

## Purpose

This record consolidates the completed Cifu SpokenAdult ranks 1001–1250 evidence packet from closed issue #796 / merged PR #822 and the full expert-adjudication chain on #796 into one implementation-safe lexical authority. It changes no runtime lexicon, parser behavior, executable tests, construction identity/status, survey/native-panel state, corpus classification, release-publication state, or deployment state.

Cifu rank and exact written surface remain discovery/frequency evidence only. Cifu definitions and Jyutping have zero independent Cantonese lexical-semantic/POS authority. HKCanCor exact hits establish occurrence and contextual evidence, not unrestricted productivity. Different raw HKCanCor tags are not sufficient to create separate lexical analyses, and identical tags are not sufficient to collapse independently distinct readings or functions. The derived UD layer is a readability projection only. A zero exact-token hit is not negative evidence. Runtime state is implementation evidence only.

`blocked_atomic` means that the present evidence does not justify a new typed whole-surface lexical analysis. It never means deleting genuine exact-surface coverage. Transparent compositional strings, grammar-bearing strings, segmentation artifacts, and unresolved source forms may therefore remain neutral surface coverage without being promoted as atomic lexemes.

## Authority and supersession

The deciding expert records are:

- base adjudication: issue #796 comment `5269339950`;
- correction audit: issue #796 comment `5269508577`.

Comment `5269508577` explicitly states that the base adjudication is structurally sound but **not implementation-ready verbatim** and that the audit supersedes the base comment where they conflict. This record makes that supersession explicit rather than using an implicit “later comment wins” rule.

The correction audit changes or materially qualifies these implementation decisions:

- `1022 盡量`: the multi-analysis distinction may remain, but its basis is independent orthographic/lexical evidence, not the raw HKCanCor `d`/`v` tag disagreement.
- `1123 處理`: `cyu5 lei5` remains the runtime default, but a later independent Cantonese cross-check resolves the earlier evidence gap: CantoDict directly lists `處理 cyu2 lei5` (https://www.cantonese.sheik.co.uk/dictionary/words/7533/), while existing Cantonese evidence supports `cyu5 lei5`. Preserve both as reading alternatives rather than suppressing `cyu2 lei5` as source-only.
- `1133 舖`: preserve one noun analysis with licensed `pou3` and changed-tone `pou2`; the base instruction to discard `pou2` was wrong.
- `1195 好話`: one broad nominal/discourse lexical family; remove the invented separate lexical verb analysis. This changes the headline accounting from 114/62 to 115/61.
- `1244 拿`: preserve `naa4` written/formal verb and separate `laa4` discourse/嗱-family use; packet `laa2` remains unresolved.
- zero-hit reviewed selections require an explicit evidence-strength overlay instead of looking equivalent to corpus-attested selections.

The audit also establishes a general rule for this and later bands: raw HKCanCor POS labels are evidence to inspect, not the lexical ontology. Concordance meaning/syntax, reading distinctions, and independent Cantonese lexical evidence decide the analysis inventory.

## Packet accounting

The merged mechanical packet remains unchanged:

- 250 rank rows;
- 170 HKCanCor-attested surfaces;
- 80 explicit zero-hit surfaces;
- 1,921 matching HKCanCor tokens;
- raw POS total = derived UD total = matching-token total = 1,921;
- 227 observed surface × raw-POS × Jyutping buckets;
- 307 concordance rows;
- 250 runtime rows / 250 normalized runtime analyses at packet time.

## Final accounting

After applying the correction audit:

- **115** `reviewed_selection` — one broad lexical analysis;
- **61** `multiple` — multiple lexical/category analyses required;
- **25** `reading_split` — reading-specific correction or split required;
- **49** `blocked_atomic` — no new typed whole-surface lexical analysis;
- **250 / 250** ranks accounted for exactly once.

The zero-hit evidence-strength overlay is orthogonal to those four lexical-decision classes.

## Zero-hit evidence-strength overlay

Exactly 35 zero-hit surfaces receive a positive reviewed lexical decision. They are not deleted or deferred, but their evidence strength must remain visible.

Three have explicit independent Cantonese checks in the existing expert record and are marked `zero_hit_independent_check_present`:

- `1146 兆`;
- `1182 整個`;
- `1195 好話`.

The remaining 32 are marked `source_only_pending_cantonese_confirmation` in this authority:

`1001 如`, `1014 添`, `1047 欣`, `1053 帳`, `1055 陶`, `1084 尚`, `1087 直到`, `1088 空白`, `1090 要點`, `1096 談`, `1097 聯`, `1118 長方形`, `1119 航`, `1130 預算案`, `1131 墓`, `1137 一方面`, `1142 乎`, `1144 北面`, `1145 仲要`, `1164 健`, `1171 煙海`, `1175 圖形`, `1184 闆`, `1185 叢`, `1192 民`, `1198 例`, `1216 頹`, `1219 三角形`, `1220 分手`, `1236 南方`, `1240 要好`, `1242 原則`.

`source_only_pending_cantonese_confirmation` is an evidence-grade flag, not a deletion or a prohibition on retaining neutral exact-surface coverage. It means a future typed implementation must not present the row as corpus-confirmed or independently Cantonese-verified until that evidence exists.

## Final decision inventory

Every rank 1001–1250 appears exactly once in the four mutually exclusive inventories below. The zero-hit evidence-strength overlay in the prior section is additional metadata, not a fifth lexical-decision class.

### `reviewed_selection` — one broad lexical analysis (115)

`1003 改` verb change/correct; `1004 其` formal referential pronoun/determiner; `1005 拖` verb drag/pull; `1006 後來` temporal adverb later; `1011 婆` kinship noun/morpheme; `1012 得意` stative adjective cute/complacent; `1015 曾經` temporal/aspect adverb once/ever; `1016 答` verb answer; `1017 搬` verb move; `1020 態度` noun attitude; `1021 慘` stative adjective miserable/serious; `1024 緊張` adjective tense/nervous; `1025 價值` noun value; `1035 八月` temporal month expression; `1037 大部份` quantity/majority expression; `1039 尤其` adverb especially; `1043 而且` additive connector; `1044 抑或` alternative connector; `1045 到時` temporal expression; `1047 欣` bound adjective/morpheme happy; `1051 凍` stative adjective cold; `1052 馬` noun horse; `1053 帳` noun account/tent/debt family; `1057 暑假` noun summer vacation; `1058 發現` verb discover; `1059 睇法` noun viewpoint; `1060 程度` noun degree/extent; `1063 嘥` verb waste; `1064 澳洲` proper place noun Australia; `1067 聽日` temporal expression tomorrow; `1068 聽講` verb/evidential “hear that”; `1070 力` noun/morpheme strength; `1071 冇事` lexical predicate “be all right/nothing special”; `1072 功課` noun homework; `1075 本來` adverb originally; `1076 生日` noun birthday; `1079 年紀` noun age; `1080 百` numeral hundred; `1081 男` male attributive/modifier; `1082 事實` noun fact; `1085 於是` result connector; `1087 直到` terminative connector/preposition “until”; `1090 要點` noun main point; `1097 聯` verb/bound morpheme unite/link; `1099 舊年` temporal expression last year; `1101 醫生` person noun doctor; `1103 大約` approximation adverb/quantifier; `1104 分開` verb separate; `1110 形狀` noun shape; `1116 底下` locative noun/localizer below; `1118 長方形` noun rectangle; `1121 捱` verb endure; `1122 終於` discourse/temporal adverb finally; `1125 幾耐` wh-duration expression; `1129 資產` noun assets; `1130 預算案` noun budget proposal; `1131 墓` noun tomb; `1132 維持` verb maintain; `1134 機構` noun institution/structure; `1135 離開` verb leave; `1137 一方面` discourse connector “on the one hand”; `1138 七月` temporal month expression; `1140 仍然` adverb still; `1142 乎` classical question/doubt particle; `1143 以後` temporal/localizer expression after/later; `1144 北面` locative noun north side; `1149 地產` noun real estate; `1150 年代` noun era/decade; `1153 身邊` locative noun/localizer at one’s side; `1154 例子` noun example; `1155 咖啡` noun coffee; `1156 怕` fear predicate/verb; `1159 盈利` noun profit; `1160 值得` worth/deserve predicate; `1164 健` bound adjective/morpheme healthy/strong; `1169 結婚` verb marry; `1171 煙海` literary noun vast sea; `1177 對唔住` apology formula; `1180 賠` verb compensate; `1181 擔心` worry predicate/verb; `1182 整個` whole/entire pronoun-determiner, written-register; `1184 闆` bound nominal morpheme in `老闆`; `1185 叢` noun/morpheme cluster/thicket; `1188 只要` conditional connector “so long as”; `1192 民` noun/bound morpheme people/citizen; `1194 地鐵` noun metro; `1195 好話` one broad nominal/discourse lexical family “praise/good words” and related discourse sense; no separate lexical verb “speak well of”; this moves the row from `multiple` to `reviewed_selection`; `1197 形式` noun form; `1198 例` noun/bound morpheme example/rule; `1199 到底` discourse adverb after all/in the end; `1201 的` written possessive/nominalizing particle; `1205 媽媽` kinship noun mother; `1210 電視機` noun television set; `1212 歌` noun song; `1213 銀行` noun bank; `1214 價錢` noun price; `1215 噏` verb babble/mutter; `1217 變成` verb become; `1219 三角形` noun triangle; `1220 分手` verb break up; `1225 市民` person noun city resident; `1228 有人` referential/existential expression someone; `1232 性格` noun personality; `1233 放假` verb/predicate take holiday; `1234 直頭` adverb simply/straight-up; `1236 南方` directional/place noun south; `1237 是但` indefinite-choice/adverbial function “whatever/casually”; `1239 英國` proper place noun United Kingdom; `1240 要好` idiomatic predicate be on good terms; `1242 原則` noun principle; `1245 旁邊` locative noun beside/side; `1246 留` verb remain/keep; `1247 記住` verb remember; `1248 追` verb chase/pursue; `1250 得罪` verb offend.

### `multiple` — multiple lexical/category analyses (61)

`1001 如` verb/function “be like/as/such as”; `1007 研究` noun research + verb study/research; `1009 限制` noun restriction + verb restrict; `1010 值` noun value + worth/value predicate; `1014 添` verb add/replenish + additive particle/adverb `tim1`; `1019 經驗` noun experience + verb experience; `1022 盡量` adverb “as much as possible” plus an independently supported lexical/orthographic verb family “to the full”; HKCanCor’s raw `d`/`v` tag split does not itself establish the analysis split; `1027 影` noun image/shadow + verb photograph/film; `1029 餐` noun meal + classifier; `1033 一般` adjective ordinary/general + adverb generally; `1038 女性` noun female/woman + attributive adjective female; `1040 外圍` noun periphery/betting sense + surrounding/localizer use; `1042 刑事` criminal-matter noun + penal/criminal modifier; `1054 常` adjective common/constant + adverb often; `1055 陶` pottery/bound-morpheme family + proper-name/other lexical senses; `1056 麻煩` adjective troublesome + verb bother; `1061 塊` noun piece/lump + classifier; `1078 尖` noun point + adjective sharp/pointed; `1084 尚` adverb still/yet + verb esteem/value; `1086 版` noun edition/page + classifier; `1088 空白` noun blank space + adjective blank; `1089 指` noun finger + verb point/refer; `1091 負責` verb take responsibility + adjective responsible; `1094 電子` noun electron + attributive electronic morpheme/modifier; `1095 標` noun mark/sign/bid + verb mark/bid; `1096 談` verb talk/discuss + proper-name use; `1105 升` verb rise/raise + measure noun litre; `1108 白色` color noun + adjective white; `1112 改變` noun change + verb change; `1113 私人` noun private citizen + adjective private; `1119 航` vessel/navigation noun family + verb sail/navigate; `1124 單` noun form/bill + classifier + adjective single; `1127 準備` noun preparation + verb prepare; `1145 仲要` compositional predicate “still need” plus conventional additive/discourse “moreover/what’s more”; `1157 抵` adjective worth/cheap + verb resist/support; `1165 夠` verb reach/be enough + adjective/adverb sufficient/enough; `1166 控制` noun control + verb control; `1168 報` noun report/newspaper/recompense + verb report/recompense; `1170 順` adjective smooth/favourable + verb follow/obey; `1172 聖經` proper noun Bible + common noun/classics family; `1173 補習` noun extra lessons + verb take/give extra lessons; `1174 解釋` noun explanation + verb explain; `1175 圖形` noun figure/diagram + adjective graphical; `1176 實在` adjective real/concrete + adverb really; `1178 精神` noun spirit/mind + adjective energetic/mental; `1179 暫時` adjective temporary + adverb for now; `1186 競爭` noun competition + verb compete; `1187 公` adjective public/fair + nominal/title/male-animal senses; `1190 失業` noun unemployment + unemployed predicate/verb; `1202 保障` noun safeguard/guarantee + verb ensure; `1207 溝通` noun communication + verb communicate; `1208 道` noun way/principle + classifier + literary verb say; `1211 預備` noun preparation + verb prepare + preparatory modifier; `1216 頹` verb decline/collapse + adjective decadent/dejected; `1221 反應` noun reaction + verb/predicate react/respond; `1222 支` noun branch/support + classifier + verb support; `1226 回歸` noun return/reversion + verb return; `1227 成功` noun success + successful predicate/adjective + verb succeed; `1229 自然` noun nature + adjective natural + adverb naturally; `1231 男性` noun male + attributive adjective male; `1238 相當` equivalent/appropriate predicate + adverb fairly/considerably.

### `reading_split` — reading-specific correction/split (25)

`1008 衫` `saam1` noun; `1018 會考` `wui6 haau2` noun; `1023 網絡` `mong5 lok6` / `mong5 lok3` noun; `1026 噉樣樣` corpus-supported `gam2 joeng2 joeng2` demonstrative/discourse expression, not Cifu final `joeng6`; `1028 橋` `kiu4` bridge vs `kiu2` idea/plan; `1046 拉` `laai1` verb; `1049 咯` particle `lok3` / independently attested `lo3`; `1062 試` `si3` verb vs `si5` noun; `1069 入邊` `jap6 bin6` / `jap6 bin1` locative noun; `1100 覆` `fuk1` verb/morpheme; `1106 廿` productive numeral `jaa6` (do not promote `nim6/je6` without expression-specific evidence); `1123 處理` active high-confidence Cantonese verb reading `cyu5 lei5`; retain source-listed `cyu2 lei5` in provenance as a lower-confidence alternative only unless stronger Cantonese-specific evidence is added; do not expose both as equally verified; `1126 新聞` `san1 man4` / `san1 man2` noun; `1128 解` free verb `gaai2` versus source-listed separate `haai6` reading family; `1133 舖` one noun analysis “shop/store” with licensed `pou3` general reading and changed-tone `pou2` in specific-shop compounds/usages; this supersedes the base comment’s instruction to discard `pou2`; `1136 聽眾` `ting3 zung3` noun; `1146 兆` `siu6` noun/verb/large-number/omen family; reject Cifu `ziu6` for the reviewed item; `1148 地下` `dei6 haa6` underground modifier vs `dei6 haa2` ground/floor noun; `1158 爭` `zaang1` free verb vs `zang1` bound compound reading; `1161 哩度` `ni1 dou6` / `nei1 dou6` locative pronoun; `1167 被` `bei6` passive preposition vs `pei5` quilt noun; `1200 抹` `maat3` / `mut3` verb reading families; `1209 零` `ling4` numeral vs `leng4/leng2/leng1` approximate-remainder suffix; `1230 估` productive verb `gu2`; `1244 拿` verified `naa4` written/formal verb “take/hold/grasp” plus `laa4` orthographic-variant discourse utterance/particle in the 嗱 family; packet `laa2` remains unresolved and is not promoted.

### `blocked_atomic` — no new typed whole-surface analysis (49)

`1002 有條`, `1013 條路`, `1030 講呀`, `1031 點呢`, `1032 一段`, `1034 一張`, `1036 下個`, `1041 皮池`, `1048 南行`, `1050 重係`, `1065 講啦`, `1066 點算`, `1073 左下角`, `1074 左畫`, `1077 白紙`, `1083 兩間`, `1092 冤墓`, `1093 畫條`, `1098 講返`, `1102 九點`, `1107 打個`, `1109 行去`, `1111 我想問`, `1114 兩個韻`, `1115 受山`, `1117 東行`, `1120 兜返`, `1139 三年`, `1141 手面`, `1147 同個`, `1151 即話`, `1152 我同`, `1162 唔肯`, `1163 做咩`, `1183 講乜`, `1189 右下角`, `1191 正下方`, `1193 先算`, `1196 你點`, `1203 張紙`, `1204 畫畫`, `1206 想講`, `1218 一個韻`, `1223 右下`, `1224 右手邊`, `1235 返上`, `1241 俾人`, `1243 埋個`, `1249 做過`.

These `blocked_atomic` rows preserve genuine exact-surface coverage where applicable; they are not lexical deletions.

## Implementation consequences

A later bounded runtime reconciliation may consume this authority only after a fresh intake/claim against then-current `main`. It must:

1. preserve every independently supported reading/category rather than choosing a corpus majority mechanically;
2. apply the explicit audit supersessions above;
3. keep the 32 `source_only_pending_cantonese_confirmation` rows visibly lower-confidence if typed at all, and never describe them as corpus-verified;
4. leave `blocked_atomic` surfaces without fabricated typed whole-string analyses while preserving genuine exact-surface coverage;
5. preserve stable analysis IDs and current multi-analysis architecture;
6. treat parser/test changes caused by better lexical truth as implementation findings subject to the regression-debt ratchet, not as linguistic counterevidence;
7. make no construction-status, survey/native-panel, corpus-classification, release-publication, or deployment decision from this lexical record alone.

## Scope confirmation

This consolidation is a research authority only. No runtime source, generated runtime, parser behavior, executable test, construction identity/status, survey/native-panel record, corpus classification, release-publication state, or deployment state is changed here.
