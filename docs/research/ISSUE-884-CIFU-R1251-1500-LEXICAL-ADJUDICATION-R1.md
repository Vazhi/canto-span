# Issue #884 — Cifu ranks 1251–1500 lexical adjudication consolidation R1

## Purpose

This record consolidates the completed Cifu SpokenAdult ranks 1251–1500 evidence packet from closed issue #797 / merged PR #824 and the completed expert-adjudication chain on #797 into one implementation-safe lexical authority. It changes no runtime lexicon, parser behavior, executable tests, generated `main.js`, runtime version, construction identity/status, survey/native-panel state, corpus classification, release-publication state, or deployment state.

Cifu rank and exact written surface remain discovery/frequency evidence only. Cifu definitions and Jyutping have zero independent Cantonese lexical-semantic/POS authority. HKCanCor exact hits establish occurrence and contextual evidence, not unrestricted productivity. Raw HKCanCor tags are evidence to inspect rather than the lexical ontology; the derived UD layer is navigation/readability only. A zero exact-token hit is not negative evidence. Frozen Rime may corroborate exact Cantonese surface/readings only. Runtime/tests are implementation evidence only.

`blocked_atomic` means that the evidence does not justify a typed whole-surface lexical analysis. It never means deleting genuine exact-surface coverage. Transparent compositional strings, grammar-bearing strings, segmentation artifacts, and unsupported rank strings may remain neutral exact-surface coverage without being fabricated into atomic lexemes.

## Authority and supersession

The deciding expert records are:

- ranks 1251–1275 base pass: #797 comment `5269650359`;
- ranks 1251–1275 correction audit: #797 comment `5275212960`, which explicitly supersedes the base pass where they conflict;
- ranks 1251–1275 final closure: #797 comment `5275504224`, which supersedes remaining open/research-required language and incorporates the audit corrections;
- ranks 1276–1500 final decision partition: #797 comment `5275370635`, which explicitly calls itself the accepted expert specification for those ranks;
- #797 comment `5275504224` explicitly confirms that `5275370635` is authoritative for overlapping ranks 1276–1500 and that no lexical/POS/reading adjudication obligation remains in the band.

Later range-by-range comments are retained as supporting lexical descriptions and evidence references. They do **not** silently override the explicit final authority merely because they were posted later. Where a supporting pass conflicts with the accepted final class or reading, this record follows the explicit authority and records the conflict below.

Supporting detail by range:

- 1276–1300: `5275384123`;
- 1301–1325: `5275417104`;
- 1326–1350: `5275483335`;
- 1351–1375: `5275602678`;
- 1376–1400: `5275642951`;
- 1401–1425: `5275713059`;
- 1426–1450: `5275773265`;
- 1451–1475: `5275816030`;
- 1476–1500: `5275857514`.

## Mechanical packet accounting

The merged #797/#824 packet remains unchanged:

- 250 rank rows;
- 166 HKCanCor-attested surfaces;
- 84 explicit zero-hit surfaces;
- 1,327 exact HKCanCor tokens;
- raw POS total = derived UD total = matching-token total = 1,327;
- 217 observed surface × raw-POS × Jyutping buckets;
- 301 concordance rows;
- frozen PyCantonese 5.0.0 HKCanCor→UD map SHA-256 `d71e1c38ba8fd99a9fd1248b477ea01b066d168c8bc7cfd69e19d84c9554df39`.

Zero-hit status is a corpus-occurrence fact only. The expert thread explicitly completes the lexical/POS/reading adjudication for the full band; this record does not create a new source-only/pending category that the accepted #797 authority did not establish.

## Final accounting

After applying the explicit supersession chain:

- **141** `reviewed_selection` — one broad lexical/function family;
- **30** `multiple` — multiple lexical/category analyses required;
- **31** `reading_split` — reading-specific correction or sense/category split required;
- **48** `blocked_atomic` — no new typed whole-surface lexical analysis;
- **250 / 250** ranks accounted for exactly once.

These four classes are mutually exclusive. Corpus hit/zero-hit status is orthogonal evidence metadata.

## Implementation semantics

A later runtime task should interpret the classes as follows:

- `reviewed_selection`: retain one broad reviewed lexical/function family. If the current runtime is neutral, it may receive a reviewed typed default. If the runtime already contains a richer independently supported default, do not flatten it merely to match this inventory. Supporting range-pass prose supplies the category/function description where needed.
- `multiple`: preserve the independently supported categories/functions as first-class analyses with stable IDs. Do not collapse them because one corpus tag or one reading is more frequent.
- `reading_split`: preserve the accepted readings and their sense/category/register conditioning. A corrected ordinary reading may replace an unsupported neutral candidate, but a genuinely distinct supported reading must not be erased.
- `blocked_atomic`: retain exact-surface coverage where required by the lexical-priority inventory but do not manufacture a typed whole-surface lexeme. Component/construction behavior remains a separate parser question.

No implementation consequence in this record authorizes a construction/status change or allows tests/runtime state to veto independently supported lexical evidence.

## Material conflict resolutions

The detailed pass comments were useful evidence work but contained provisional labels and several decisions that differ from the explicit final authority. The following are implementation-significant resolutions:

- `1282 平排`, `1284 打直`, `1285 打斜`: early `research_required` language is superseded by final `reviewed_selection`.
- `1289 多數`: later pass proposed noun/adverb splitting; final authority keeps one broad `reviewed_selection` family.
- `1303 後生`: later pass proposed noun/adjective multiple analyses; final authority classifies it as `reading_split`, with ordinary `hau6 saang1` and no free `sang1` variant promotion.
- `1306 個害`: early `research_required/data-quality` becomes final `blocked_atomic`.
- `1316 圍住`: later pass described a conventional resultative expression; final authority nevertheless blocks a new whole-surface atomic lexeme.
- `1320 落落`: early research-required ambiguity becomes final `blocked_atomic`.
- `1328 靚仔`: later pass proposed noun/adjective multiple analyses and retained `leng1/leng3`; final authority treats the row as a reading correction: ordinary `leng3 zai2`, while `leng1 zai2` belongs to the distinct `𡃁仔/僆仔` family and must not be added as a reading of `靚仔`.
- `1343 失敗`, `1346 安排`: later passes proposed noun/verb splits; final authority keeps each as one broad `reviewed_selection` family.
- `1349 自`: supporting pass left a bound/research qualification; final authority places it in `reviewed_selection`.
- `1351 即個`, `1358 信佳`: early research-required rows become final `blocked_atomic`.
- `1352 吸引`, `1362 冤`: later passes proposed multi-analysis rows; final authority keeps broad `reviewed_selection` families.
- `1363 效`: early pass left the broad written/bound family research-required; final authority requires `multiple` noun/bound efficacy/effect plus verbal imitate/serve-effect families.
- `1370 毫子`: supporting pass emphasized the currency measure/classifier; final authority requires `multiple` monetary-unit noun plus monetary measure/classifier use.
- `1386 總`, `1389 證明`: supporting passes selected narrower single analyses; final authority requires `multiple` analyses.
- `1394 乜鬼`: supporting pass called it compositional/blocked; final authority keeps a broad `reviewed_selection`.
- `1395 上年`: supporting pass proposed `soeng6 nin4`; final authority explicitly selects `soeng6 nin2` and rejects character-level `nin4` for this lexical word.
- `1396 不斷`: supporting pass proposed adverb/property multiple analyses; final authority treats the implementation-critical issue as the reading correction `bat1 dyun6`, rejecting Cifu `bat1 tyun5`.
- `1397 之類`: supporting pass retained only `zi1 leoi6`; final authority preserves independently recorded `zi1 leoi6` and `zi1 leoi2` variation.
- `1401 左手邊`: supporting pass treated a lexicalized locative expression as retainable; final authority classifies the whole frequency-list surface `blocked_atomic`.
- `1402 印椰樹`: source-verification uncertainty is resolved conservatively as final `blocked_atomic`.
- `1420 姓`, `1421 明顯`: supporting pass proposed category splits; final authority keeps broad `reviewed_selection` families.
- `1434 恐怖`: supporting pass proposed adjective/noun multiple analyses; final authority keeps one broad `reviewed_selection` family.
- `1446 著`: supporting pass centered on `zyu3` and left broader graph review open; final authority requires the genuine `zyu3`, `zoek3`, and `zoek6` reading families to remain distinct.
- `1448 黑`: supporting pass interpreted `hak1` as a loan-derived “hack” family; final authority records `haak1/hak1` pronunciation variation for this surface. Do not use the supporting pass to invent an additional category split here.
- `1458 與`: supporting pass treated literary verbal senses conservatively; final authority requires coordinator/coverb plus literary lexical give/participate families as `multiple`.
- `1475 下角`: supporting pass described a compositional locality expression; final authority classifies the whole surface `blocked_atomic`.
- `1480 心理`, `1481 文化`: final detailed pass preferred nominal cores without automatic adjective promotion; the explicit full-band authority nevertheless requires noun + adjectival analyses as `multiple`.

These resolutions are explicit supersession, not a general “later comment wins” rule.

## Multiple-analysis inventory (30)

- `1255 象徵` — noun “symbol/emblem” + verb “symbolize/represent”.
- `1271 懷疑` — verb “doubt/suspect” + independently documented noun “doubt/suspicion”.
- `1287 任` — lexical verb appoint/allow + noun/office/responsibility family + surname.
- `1305 計劃` — noun plan/project + verb plan.
- `1308 租` — noun rent + verb rent/lease.
- `1318 發` — send/issue/develop verb + classifier for shots/rounds and bound family.
- `1319 照` — verb illuminate/photograph + relation/coverb “according to” + noun photo family.
- `1326 輪` — wheel/round noun + classifier + verb take turns/rotate.
- `1327 遮` — noun umbrella + verb cover/conceal.
- `1344 申請` — verb apply/request + noun application/request.
- `1363 效` — noun/bound efficacy/effect + verb imitate/serve-effect family.
- `1368 教育` — noun education + verb educate.
- `1370 毫子` — monetary-unit noun + monetary measure/classifier use.
- `1373 創作` — noun creation/work + verb create.
- `1378 黃` — adjective yellow + proper surname/name family.
- `1386 總` — total/overall adjective/noun-head family + adverb always/in every case.
- `1389 證明` — noun proof/testimony + verb prove/confirm.
- `1412 何` — wh pronoun/determiner family + surname proper noun.
- `1419 坦白` — adjective frank/honest + verb confess + manner/adverb “frankly”.
- `1424 花` — noun flower/pattern + verb spend + decorative/adjectival/bound family.
- `1425 金` — noun gold/money + adjectival golden/bound family + surname.
- `1426 約` — noun appointment/agreement + verb arrange/restrict + approximation adverb.
- `1456 盡` — verb exhaust/use up + scalar/localizer/adverb “to the utmost/end”.
- `1458 與` — coordinator/coverb “and/with” + literary lexical give/participate family.
- `1460 層` — layer/storey noun + classifier.
- `1480 心理` — noun psychology/mental state + adjectival “psychological”.
- `1481 文化` — noun culture + adjectival “cultural”.
- `1482 毛` — noun hair/feather + monetary classifier/unit and bound slang family.
- `1486 回應` — noun response + verb respond.
- `1491 困難` — noun difficulty + adjective difficult.

## Reading-specific inventory (31)

- `1252 剩` — one remain/be-left family: standard/literary `sing6`, independently documented spoken/variant `zing6`; do not create a category split solely from reading variation.
- `1257 號` — `hou6` number/designation/size/date/title family vs separate `hou4` howl/cry family.
- `1265 儲` — colloquial `cou5` save/store vs literary `cyu5`; preserve both.
- `1266 應` — `jing1` should/ought-to vs `jing3` answer/respond family.
- `1276 下邊` — locative `haa6 bin6`; Cifu final `bin1` is not selected.
- `1292 收到` — conventional received/understood expression `sau1 dou2`; do not promote Cifu `dou3` as a free equivalent without separate sense evidence.
- `1303 後生` — ordinary “young” `hau6 saang1`; bound/formal `sang1` is not a free pronunciation variant.
- `1307 唔好意思` — ordinary formula `m4 hou2 ji3 si1`, correcting Cifu `si3`.
- `1309 純粹` — preserve `seon4 seoi5` spoken evidence and independently recorded `seon4 seoi6` formal/dictionary evidence as register/reading variation.
- `1314 處` — `cyu3` place/location noun; `cyu2` deal-with/punish verb and other bound readings are separate families.
- `1328 靚仔` — ordinary noun/adjective `leng3 zai2`; packet `leng1 zai2` collides with distinct `𡃁仔/僆仔` and is not an alternate reading of `靚仔`.
- `1338 下下` — lexical “every time” `haa5 haa5`, correcting Cifu `haa6 haa6`.
- `1353 更` — `gang3` comparative/degree adverb vs `gang1` change/watch-period/bound family.
- `1365 區` — common district/area `keoi1`; `au1` is a separate surname family.
- `1384 醒` — `seng2` wake/regain-consciousness verb vs `sing2` smart/lively adjective and give/treat verb family.
- `1395 上年` — lexical “last year” `soeng6 nin2`; Cifu character-level `nin4` is not selected for the word.
- `1396 不斷` — `bat1 dyun6`; Cifu `bat1 tyun5` is not retained as the ordinary lexical reading.
- `1397 之類` — preserve independently recorded `zi1 leoi6` and `zi1 leoi2` variation.
- `1399 片` — `pin2` noun slice/film family vs `pin3` classifier/verb family.
- `1411 艾爾頓` — proper-name normalization `aai6 ji5 deon6`; do not overwrite with generic character reading `ngaai6`.
- `1417 亞視` — lexicalized organization abbreviation `aa3 si6`; Cifu `ngaa3` is not selected without name-specific support.
- `1427 訂` — `deng6` order/book/subscribe vs `ding3/ding6` formal agree/draw-up family.
- `1428 迫` — ordinary force/compel `bik1`; `baak1` survives only in separately supported lexical material and is not a free equivalent reading of the force verb.
- `1433 家姐` — `gaa1 ze1`, correcting Cifu `ze2`.
- `1435 捉` — productive grab/catch `zuk1`; Cifu `zuk3` is not promoted without separate evidence.
- `1446 著` — preserve distinct `zyu3` written/bound writing/notability family, `zoek3` wear/put-on verb, and `zoek6` written progressive/result/strategy family where appropriate.
- `1448 黑` — retain `haak1/hak1` pronunciation variation; packet `haak1` is valid but not exclusive.
- `1454 寧願` — preserve `ning4 jyun2` colloquial evidence and independently recorded `ning4 jyun6` variant.
- `1461 數` — `sou3` noun number/figure vs `sou2` count/enumerate verb.
- `1462 樓` — free building/flat/floor noun `lau2`; `lau4` is a separate surname and occurs in lexicalized compounds. Do not normalize the free noun globally to `lau4`.
- `1463 膠袋` — noun plastic bag `gaau1 doi2`; `doi6` belongs to separate verb `袋`, not this compound noun.

## Blocked-atomic inventory (48)

`1253 幾大`; `1259 試下`; `1274 鑑林`; `1275 三點`; `1280 四十五度`; `1281 左下`; `1288 再落`; `1290 好大`; `1291 好慘`; `1295 我估`; `1296 我畫`; `1301 知有`; `1306 個害`; `1312 將個`; `1316 圍住`; `1320 落落`; `1331 邊行`; `1333 一晚`; `1336 上角`; `1347 成張`; `1351 即個`; `1358 信佳`; `1366 問我`; `1374 幾喇`; `1377 越來`; `1387 講個`; `1388 轉個`; `1393 一百蚊`; `1400 右下方`; `1401 左手邊`; `1402 印椰樹`; `1405 多次`; `1406 多個`; `1432 個意`; `1436 時話`; `1443 就畫`; `1450 落返`; `1451 過個`; `1468 講番`; `1469 點會`; `1473 一本`; `1474 一座`; `1475 下角`; `1478 五點`; `1483 右畫`; `1484 再畫`; `1487 好貴`; `1492 每個`.

`1274 鑑林` is specifically an unsupported rank string after targeted exact-string checking; `blocked_atomic` here prevents fabrication, not future reconsideration if direct independent evidence appears.

## Exact rank partition

The table below is the machine-auditable human ledger: every rank 1251–1500 appears exactly once in one final decision class.

| Rank | Surface | Final class |
|---:|---|---|
| 1251 | 畢業 | `reviewed_selection` |
| 1252 | 剩 | `reading_split` |
| 1253 | 幾大 | `blocked_atomic` |
| 1254 | 提供 | `reviewed_selection` |
| 1255 | 象徵 | `multiple` |
| 1256 | 感情 | `reviewed_selection` |
| 1257 | 號 | `reading_split` |
| 1258 | 解決 | `reviewed_selection` |
| 1259 | 試下 | `blocked_atomic` |
| 1260 | 熄 | `reviewed_selection` |
| 1261 | 廠 | `reviewed_selection` |
| 1262 | 熟 | `reviewed_selection` |
| 1263 | 適合 | `reviewed_selection` |
| 1264 | 靚女 | `reviewed_selection` |
| 1265 | 儲 | `reading_split` |
| 1266 | 應 | `reading_split` |
| 1267 | 戲 | `reviewed_selection` |
| 1268 | 擦膠 | `reviewed_selection` |
| 1269 | 禮物 | `reviewed_selection` |
| 1270 | 雞 | `reviewed_selection` |
| 1271 | 懷疑 | `multiple` |
| 1272 | 鐘意 | `reviewed_selection` |
| 1273 | 權 | `reviewed_selection` |
| 1274 | 鑑林 | `blocked_atomic` |
| 1275 | 三點 | `blocked_atomic` |
| 1276 | 下邊 | `reading_split` |
| 1277 | 公眾 | `reviewed_selection` |
| 1278 | 太過 | `reviewed_selection` |
| 1279 | 毋 | `reviewed_selection` |
| 1280 | 四十五度 | `blocked_atomic` |
| 1281 | 左下 | `blocked_atomic` |
| 1282 | 平排 | `reviewed_selection` |
| 1283 | 必須 | `reviewed_selection` |
| 1284 | 打直 | `reviewed_selection` |
| 1285 | 打斜 | `reviewed_selection` |
| 1286 | 民主黨 | `reviewed_selection` |
| 1287 | 任 | `multiple` |
| 1288 | 再落 | `blocked_atomic` |
| 1289 | 多數 | `reviewed_selection` |
| 1290 | 好大 | `blocked_atomic` |
| 1291 | 好慘 | `blocked_atomic` |
| 1292 | 收到 | `reading_split` |
| 1293 | 有機 | `reviewed_selection` |
| 1294 | 告 | `reviewed_selection` |
| 1295 | 我估 | `blocked_atomic` |
| 1296 | 我畫 | `blocked_atomic` |
| 1297 | 言論 | `reviewed_selection` |
| 1298 | 受到 | `reviewed_selection` |
| 1299 | 咁上下 | `reviewed_selection` |
| 1300 | 波浪 | `reviewed_selection` |
| 1301 | 知有 | `blocked_atomic` |
| 1302 | 阿哥 | `reviewed_selection` |
| 1303 | 後生 | `reading_split` |
| 1304 | 後面 | `reviewed_selection` |
| 1305 | 計劃 | `multiple` |
| 1306 | 個害 | `blocked_atomic` |
| 1307 | 唔好意思 | `reading_split` |
| 1308 | 租 | `multiple` |
| 1309 | 純粹 | `reading_split` |
| 1310 | 高度 | `reviewed_selection` |
| 1311 | 基本法 | `reviewed_selection` |
| 1312 | 將個 | `blocked_atomic` |
| 1313 | 理論 | `reviewed_selection` |
| 1314 | 處 | `reading_split` |
| 1315 | 喊 | `reviewed_selection` |
| 1316 | 圍住 | `blocked_atomic` |
| 1317 | 尊嚴 | `reviewed_selection` |
| 1318 | 發 | `multiple` |
| 1319 | 照 | `multiple` |
| 1320 | 落落 | `blocked_atomic` |
| 1321 | 資料 | `reviewed_selection` |
| 1322 | 審 | `reviewed_selection` |
| 1323 | 撳 | `reviewed_selection` |
| 1324 | 複雜 | `reviewed_selection` |
| 1325 | 論 | `reviewed_selection` |
| 1326 | 輪 | `multiple` |
| 1327 | 遮 | `multiple` |
| 1328 | 靚仔 | `reading_split` |
| 1329 | 鬧 | `reviewed_selection` |
| 1330 | 瞭解 | `reviewed_selection` |
| 1331 | 邊行 | `blocked_atomic` |
| 1332 | 權利 | `reviewed_selection` |
| 1333 | 一晚 | `blocked_atomic` |
| 1334 | 一點 | `reviewed_selection` |
| 1335 | 人士 | `reviewed_selection` |
| 1336 | 上角 | `blocked_atomic` |
| 1337 | 上邊 | `reviewed_selection` |
| 1338 | 下下 | `reading_split` |
| 1339 | 已 | `reviewed_selection` |
| 1340 | 不嬲 | `reviewed_selection` |
| 1341 | 公平 | `reviewed_selection` |
| 1342 | 冇所謂 | `reviewed_selection` |
| 1343 | 失敗 | `reviewed_selection` |
| 1344 | 申請 | `multiple` |
| 1345 | 合格 | `reviewed_selection` |
| 1346 | 安排 | `reviewed_selection` |
| 1347 | 成張 | `blocked_atomic` |
| 1348 | 肉 | `reviewed_selection` |
| 1349 | 自 | `reviewed_selection` |
| 1350 | 似乎 | `reviewed_selection` |
| 1351 | 即個 | `blocked_atomic` |
| 1352 | 吸引 | `reviewed_selection` |
| 1353 | 更 | `reading_split` |
| 1354 | 垂直 | `reviewed_selection` |
| 1355 | 奇怪 | `reviewed_selection` |
| 1356 | 空間 | `reviewed_selection` |
| 1357 | 阿婆 | `reviewed_selection` |
| 1358 | 信佳 | `blocked_atomic` |
| 1359 | 咬 | `reviewed_selection` |
| 1360 | 城堡 | `reviewed_selection` |
| 1361 | 政黨 | `reviewed_selection` |
| 1362 | 冤 | `reviewed_selection` |
| 1363 | 效 | `multiple` |
| 1364 | 酒店 | `reviewed_selection` |
| 1365 | 區 | `reading_split` |
| 1366 | 問我 | `blocked_atomic` |
| 1367 | 基本 | `reviewed_selection` |
| 1368 | 教育 | `multiple` |
| 1369 | 殺 | `reviewed_selection` |
| 1370 | 毫子 | `multiple` |
| 1371 | 深 | `reviewed_selection` |
| 1372 | 雀仔 | `reviewed_selection` |
| 1373 | 創作 | `multiple` |
| 1374 | 幾喇 | `blocked_atomic` |
| 1375 | 朝頭早 | `reviewed_selection` |
| 1376 | 無端端 | `reviewed_selection` |
| 1377 | 越來 | `blocked_atomic` |
| 1378 | 黃 | `multiple` |
| 1379 | 搞錯 | `reviewed_selection` |
| 1380 | 資訊 | `reviewed_selection` |
| 1381 | 對方 | `reviewed_selection` |
| 1382 | 語言 | `reviewed_selection` |
| 1383 | 整體 | `reviewed_selection` |
| 1384 | 醒 | `reading_split` |
| 1385 | 環保 | `reviewed_selection` |
| 1386 | 總 | `multiple` |
| 1387 | 講個 | `blocked_atomic` |
| 1388 | 轉個 | `blocked_atomic` |
| 1389 | 證明 | `multiple` |
| 1390 | 黨 | `reviewed_selection` |
| 1391 | 攪 | `reviewed_selection` |
| 1392 | 一次過 | `reviewed_selection` |
| 1393 | 一百蚊 | `blocked_atomic` |
| 1394 | 乜鬼 | `reviewed_selection` |
| 1395 | 上年 | `reading_split` |
| 1396 | 不斷 | `reading_split` |
| 1397 | 之類 | `reading_split` |
| 1398 | 冇用 | `reviewed_selection` |
| 1399 | 片 | `reading_split` |
| 1400 | 右下方 | `blocked_atomic` |
| 1401 | 左手邊 | `blocked_atomic` |
| 1402 | 印椰樹 | `blocked_atomic` |
| 1403 | 地點 | `reviewed_selection` |
| 1404 | 多少 | `reviewed_selection` |
| 1405 | 多次 | `blocked_atomic` |
| 1406 | 多個 | `blocked_atomic` |
| 1407 | 好處 | `reviewed_selection` |
| 1408 | 存在 | `reviewed_selection` |
| 1409 | 有趣 | `reviewed_selection` |
| 1410 | 老實 | `reviewed_selection` |
| 1411 | 艾爾頓 | `reading_split` |
| 1412 | 何 | `multiple` |
| 1413 | 冷氣 | `reviewed_selection` |
| 1414 | 沖 | `reviewed_selection` |
| 1415 | 角色 | `reviewed_selection` |
| 1416 | 車主 | `reviewed_selection` |
| 1417 | 亞視 | `reading_split` |
| 1418 | 依家 | `reviewed_selection` |
| 1419 | 坦白 | `multiple` |
| 1420 | 姓 | `reviewed_selection` |
| 1421 | 明顯 | `reviewed_selection` |
| 1422 | 法例 | `reviewed_selection` |
| 1423 | 波 | `reviewed_selection` |
| 1424 | 花 | `multiple` |
| 1425 | 金 | `multiple` |
| 1426 | 約 | `multiple` |
| 1427 | 訂 | `reading_split` |
| 1428 | 迫 | `reading_split` |
| 1429 | 重新 | `reviewed_selection` |
| 1430 | 音樂 | `reviewed_selection` |
| 1431 | 音響 | `reviewed_selection` |
| 1432 | 個意 | `blocked_atomic` |
| 1433 | 家姐 | `reading_split` |
| 1434 | 恐怖 | `reviewed_selection` |
| 1435 | 捉 | `reading_split` |
| 1436 | 時話 | `blocked_atomic` |
| 1437 | 除非 | `reviewed_selection` |
| 1438 | 情 | `reviewed_selection` |
| 1439 | 排隊 | `reviewed_selection` |
| 1440 | 票 | `reviewed_selection` |
| 1441 | 終審 | `reviewed_selection` |
| 1442 | 竟然 | `reviewed_selection` |
| 1443 | 就畫 | `blocked_atomic` |
| 1444 | 提出 | `reviewed_selection` |
| 1445 | 答案 | `reviewed_selection` |
| 1446 | 著 | `reading_split` |
| 1447 | 賀 | `reviewed_selection` |
| 1448 | 黑 | `reading_split` |
| 1449 | 椰 | `reviewed_selection` |
| 1450 | 落返 | `blocked_atomic` |
| 1451 | 過個 | `blocked_atomic` |
| 1452 | 隔 | `reviewed_selection` |
| 1453 | 電影 | `reviewed_selection` |
| 1454 | 寧願 | `reading_split` |
| 1455 | 摺 | `reviewed_selection` |
| 1456 | 盡 | `multiple` |
| 1457 | 福利 | `reviewed_selection` |
| 1458 | 與 | `multiple` |
| 1459 | 劍 | `reviewed_selection` |
| 1460 | 層 | `multiple` |
| 1461 | 數 | `reading_split` |
| 1462 | 樓 | `reading_split` |
| 1463 | 膠袋 | `reading_split` |
| 1464 | 諗法 | `reviewed_selection` |
| 1465 | 質素 | `reviewed_selection` |
| 1466 | 選 | `reviewed_selection` |
| 1467 | 錄 | `reviewed_selection` |
| 1468 | 講番 | `blocked_atomic` |
| 1469 | 點會 | `blocked_atomic` |
| 1470 | 醫療 | `reviewed_selection` |
| 1471 | 贊成 | `reviewed_selection` |
| 1472 | 曬 | `reviewed_selection` |
| 1473 | 一本 | `blocked_atomic` |
| 1474 | 一座 | `blocked_atomic` |
| 1475 | 下角 | `blocked_atomic` |
| 1476 | 大隻 | `reviewed_selection` |
| 1477 | 女皇 | `reviewed_selection` |
| 1478 | 五點 | `blocked_atomic` |
| 1479 | 引起 | `reviewed_selection` |
| 1480 | 心理 | `multiple` |
| 1481 | 文化 | `multiple` |
| 1482 | 毛 | `multiple` |
| 1483 | 右畫 | `blocked_atomic` |
| 1484 | 再畫 | `blocked_atomic` |
| 1485 | 各 | `reviewed_selection` |
| 1486 | 回應 | `multiple` |
| 1487 | 好貴 | `blocked_atomic` |
| 1488 | 有關 | `reviewed_selection` |
| 1489 | 行業 | `reviewed_selection` |
| 1490 | 初初 | `reviewed_selection` |
| 1491 | 困難 | `multiple` |
| 1492 | 每個 | `blocked_atomic` |
| 1493 | 沙 | `reviewed_selection` |
| 1494 | 角度 | `reviewed_selection` |
| 1495 | 事實上 | `reviewed_selection` |
| 1496 | 佬 | `reviewed_selection` |
| 1497 | 或 | `reviewed_selection` |
| 1498 | 拍拖 | `reviewed_selection` |
| 1499 | 果 | `reviewed_selection` |
| 1500 | 沾污 | `reviewed_selection` |

## Implementation handoff

This research authority is complete only when repository validation confirms the exact 250-row partition above. Runtime reconciliation is deliberately out of scope here.

After this record is merged, create a separate implementation intake against then-current `main`. That task must:

1. preserve complete Cifu top-2000 exact-surface coverage;
2. compare current runtime analyses against this authority rather than assuming the packet-time runtime snapshot is current;
3. use the existing stable multi-analysis architecture and stable IDs;
4. preserve richer independently supported pre-existing analyses unless this authority explicitly corrects them;
5. add no typed whole-surface analysis for the 48 `blocked_atomic` rows;
6. propagate the explicit reading corrections/splits above;
7. keep construction identity/status, survey/native-panel state, corpus classifications, release-publication state, and deployment state unchanged;
8. pass source-first build verification, focused lexical invariants, parser architecture checks, and the live regression-debt ratchets before any semver/state synchronization.
