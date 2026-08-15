# Issue #884 — Cifu ranks 1251–1500 lexical adjudication consolidation R2

## Purpose

This record consolidates the completed Cifu SpokenAdult ranks 1251–1500 packet from closed #797 / merged PR #824 and the later expert review thread into one implementation-facing lexical authority. It resolves the contradictory issue comments by evidence strength rather than by comment chronology.

This phase is research-only. It changes no runtime lexicon, parser behavior, executable tests, generated `main.js`, runtime version, construction identity/status, survey/native-panel state, corpus classification, release-publication state, or deployment state.

## Evidence contract

- Cifu rank and exact written surface are discovery/frequency evidence only.
- Cifu definitions have zero independent Cantonese lexical-semantic/POS authority.
- Cifu Jyutping is candidate pronunciation metadata only.
- HKCanCor exact hits establish occurrence and contextual evidence, not unrestricted productivity.
- Raw HKCanCor tags are evidence to inspect rather than the final lexical ontology; the derived UD projection is convenience only.
- Zero exact HKCanCor hits are not negative evidence.
- Frozen Rime may corroborate exact Cantonese surface/readings only and has zero POS, semantic, atomicity, or frequency authority.
- Runtime/tests are implementation evidence only and cannot veto independently supported lexical facts.
- `blocked_atomic` means that the evidence does not justify a typed whole-surface lexical analysis. It never means deleting genuine exact-surface coverage.

## Source thread

The mechanical packet is closed #797 / merged PR #824. Expert inputs are:

- ranks 1251–1275 base pass `5269650359`, correction audit `5275212960`, final closure `5275504224`;
- broad 1276–1500 summary `5275370635`;
- detailed passes `5275384123`, `5275417104`, `5275483335`, `5275602678`, `5275642951`, `5275713059`, `5275773265`, `5275816030`, and `5275857514`.

No one comment is an automatic authority over another. Where comments conflict, this ledger prefers direct Cantonese lexical evidence, then the frozen concordance as occurrence/context evidence, while preserving the Cifu/Rime evidence boundaries above.

## Mechanical packet accounting

The merged packet remains unchanged:

- 250 rank rows;
- 166 HKCanCor-attested surfaces;
- 84 explicit zero-hit surfaces;
- 1,327 exact HKCanCor tokens;
- raw POS total = derived UD total = matching-token total = 1,327;
- 217 observed surface × raw-POS × Jyutping buckets;
- 301 concordance rows;
- frozen PyCantonese 5.0.0 HKCanCor→UD map SHA-256 `d71e1c38ba8fd99a9fd1248b477ea01b066d168c8bc7cfd69e19d84c9554df39`.

## Final accounting

The evidence-based final partition is:

- **138** `reviewed_selection` — one broad lexical/function family;
- **37** `multiple` — multiple independently supported lexical/category analyses;
- **28** `reading_split` — reading-specific correction or sense/category split;
- **47** `blocked_atomic` — no new typed whole-surface lexical analysis;
- **250 / 250** ranks accounted for exactly once.

The four classes are mutually exclusive. Corpus hit/zero-hit status is orthogonal evidence metadata.

## Class semantics

- `reviewed_selection`: retain one broad reviewed lexical/function family. If current runtime coverage is neutral, a later runtime task may add a reviewed typed default. Do not flatten an already richer independently supported default merely to match this inventory.
- `multiple`: preserve the independently supported lexical categories/functions as first-class analyses with stable IDs.
- `reading_split`: preserve the accepted readings and their sense/category/register conditioning; an unsupported neutral candidate may be corrected, while a genuinely distinct supported reading must not be erased.
- `blocked_atomic`: retain exact-surface coverage where required by the spoken-priority inventory, but do not manufacture a typed whole-surface lexeme. Component/construction behavior remains a separate parser question.

## Material conflict resolutions

The following rows required an explicit decision because the broad summary and detailed passes differed, or because an early pass remained provisional.

| Rank | Surface | Final class | Resolution |
|---:|---|---|---|
| 1289 | 多數 | `multiple` | Independent Cantonese lexical evidence records noun/quantificational “majority/most” and adverb “usually/mostly”; the broad single-family summary was too coarse. |
| 1299 | 咁上下 | `reviewed_selection` | Retain the conventional scalar/stative expression; the packet ADV projection does not define its ontology. |
| 1303 | 後生 | `multiple` | Independent Cantonese evidence records both person noun and adjective “young”, both with ordinary `hau6 saang1`; do not turn this into a spurious reading split. |
| 1306 | 個害 | `blocked_atomic` | No coherent independently supported standalone lexeme was established. |
| 1316 | 圍住 | `blocked_atomic` | Conventional `圍 + 住` predicate is real, but whole-surface atomic typing would erase its constructional decomposition. |
| 1320 | 落落 | `blocked_atomic` | Zero-hit ambiguous string with possible productive/literary analyses; no secure atomic spoken lexeme established. |
| 1325 | 論 | `multiple` | Preserve verbal discuss/evaluate and nominal/bound discourse/theory families rather than letting one corpus verb token erase the written lexical family. |
| 1328 | 靚仔 | `multiple` | Preserve noun “handsome guy/boy” and adjective “handsome”. Ordinary reading is `leng3 zai2`; `leng1 zai2` belongs to the distinct `𡃁仔/僆仔` family and is not an alternate reading of `靚仔`. |
| 1334 | 一點 | `reviewed_selection` | Retain conventional quantificational “a little/a bit”; literal point/time readings remain compositional. |
| 1343 | 失敗 | `multiple` | Independent lexical evidence supports verb “fail/lose” and event/result noun “failure/loss”. |
| 1346 | 安排 | `multiple` | Preserve verb “arrange/plan” and noun “arrangement/plan”. |
| 1349 | 自 | `reviewed_selection` | Retain the bound/formal reflexive/source family; one corpus PRON tag does not justify a generic free spoken pronoun. |
| 1350 | 似乎 | `reviewed_selection` | Retain the epistemic/seeming adverbial family `ci5 fu4`; do not force a generic VERB analysis from projection tags. |
| 1351 | 即個 | `blocked_atomic` | Unsupported/context-dependent segmentation; no atomic lexeme established. |
| 1352 | 吸引 | `reviewed_selection` | Direct Cantonese lexical evidence supports one attract/be-attractive verbal/property family; packet `v/vn` tags alone do not establish an additional noun lexeme. |
| 1358 | 信佳 | `blocked_atomic` | No secure exact independent lexical record established. |
| 1362 | 冤 | `multiple` | Preserve independently attested grievance/injustice noun and wronged/unjust property family, with verbal false-accusation/cheating uses where applicable. |
| 1363 | 效 | `multiple` | Preserve effect/efficacy nominal/bound family and verbal imitate/serve-effect family; zero exact packet hits do not erase independently supported written lexical senses. |
| 1370 | 毫子 | `reviewed_selection` | Direct Cantonese evidence classifies `hou4 zi2` as a currency measure word; do not invent a second noun analysis from UD projection. |
| 1386 | 總 | `multiple` | Preserve total/overall/chief family and adverbial “always/overall/in every case”, with verbal total/gather uses where independently instantiated. |
| 1389 | 證明 | `reviewed_selection` | Direct Cantonese lexical evidence supports the verb “prove/verify/testify”; no separate noun is added from English glossing alone. |
| 1394 | 乜鬼 | `reviewed_selection` | Independently recorded emphatic interrogative expression; lexicalized status is not cancelled merely because its internal history is transparent. |
| 1395 | 上年 | `reading_split` | Ordinary lexical “last year” is `soeng6 nin2`; character-level `nin4` must not override the word-specific reading. |
| 1396 | 不斷 | `reviewed_selection` | Retain adverb `bat1 dyun6` “continuously/constantly”; reject Cifu `bat1 tyun5`. No separate adjective/property lexeme is added without direct support. |
| 1397 | 之類 | `reading_split` | Preserve independently recorded `zi1 leoi6` and `zi1 leoi2` variation for the listing expression. |
| 1401 | 左手邊 | `reviewed_selection` | Retain independently supported lexicalized spatial/localizer expression “left-hand side”; zero HKCanCor hits do not make it nonlexical. |
| 1402 | 印椰樹 | `blocked_atomic` | No credible exact independent lexical item was established; do not infer one from the attested component `椰樹`. |
| 1419 | 坦白 | `multiple` | Preserve adjective “frank/honest” and verb “confess/state frankly”; adverbial distribution may derive from these without a third forced lexeme. |
| 1420 | 姓 | `multiple` | Direct Cantonese evidence records noun “surname” and verb “be surnamed”. |
| 1421 | 明顯 | `reviewed_selection` | Retain the clear/obvious property family; ordinary adverbial distribution does not by itself require a separate lexical adverb. |
| 1434 | 恐怖 | `multiple` | Preserve stative adjective “frightening/horrible” and formal abstract noun “terror/horror”; do not infer a “terrorist” noun from Cifu glossing. |
| 1436 | 時話 | `blocked_atomic` | Zero-hit, unclear segmentation; no atomic lexeme established. |
| 1446 | 著 | `reading_split` | Preserve distinct `zyu3` writing/notability family, `zoek3` wear/put-on family, and `zoek6` written/result/strategy families where independently supported. |
| 1448 | 黑 | `reading_split` | Preserve native color `haak1/hak1` variation and independently recorded `hak1` loan “hack” family without conflating categories. |
| 1458 | 與 | `multiple` | Preserve formal coordinator/relational `jyu5` plus independently supported literary verbal give/participate family. |
| 1475 | 下角 | `blocked_atomic` | Transparent lower-corner locality phrase; retain composition rather than an opaque whole-surface lexeme. |
| 1480 | 心理 | `reviewed_selection` | Nominal “psychology/mental state” core; attributive “psychological” use is nominal/bound modification unless direct evidence establishes a separate adjective. |
| 1481 | 文化 | `reviewed_selection` | Nominal “culture/civilization” core; attributive “cultural” use does not alone establish a separate adjective. |
| 1488 | 有關 | `reviewed_selection` | Relational verb/predicate “be related to/concern”; prenominal related/relevant distribution does not require a separate adjective. |
| 1493 | 沙 | `multiple` | Preserve noun “sand/granules” and independently attested hoarse/raspy property use. |
| 1497 | 或 | `multiple` | Preserve formal disjunctive conjunction “or” and independently attested adverb/modal “perhaps/possibly”. |

Other provisional rows are resolved conservatively in the exact partition below. `blocked_atomic` remains a statement about whole-surface lexical typing only, never a claim that the component sequence is ungrammatical.

## Independent lexical spot-checks retained from the review thread

The detailed passes cite direct Cantonese lexical checks for `下邊`, `多數`, `收到`, `咁上下`, `後生`, `唔好意思`, `處`, `純粹`, `毫子`, `醒`, `上年`, `不斷`, `之類`, `片`, `姓`, `花`, `迫`, `家姐`, `著/着`, `樓`, `膠袋`, and `女皇`. Additional consolidation checks were used only where the issue comments conflicted, including direct Cantonese dictionary evidence for `吸引`, `效`, `總`, `證明`, `乜鬼`, `恐怖`, `心理`, `文化`, `有關`, `沙`, and `或`.

## Exact rank partition

Every rank 1251–1500 appears exactly once below.

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
| 1289 | 多數 | `multiple` |
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
| 1303 | 後生 | `multiple` |
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
| 1325 | 論 | `multiple` |
| 1326 | 輪 | `multiple` |
| 1327 | 遮 | `multiple` |
| 1328 | 靚仔 | `multiple` |
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
| 1343 | 失敗 | `multiple` |
| 1344 | 申請 | `multiple` |
| 1345 | 合格 | `reviewed_selection` |
| 1346 | 安排 | `multiple` |
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
| 1362 | 冤 | `multiple` |
| 1363 | 效 | `multiple` |
| 1364 | 酒店 | `reviewed_selection` |
| 1365 | 區 | `reading_split` |
| 1366 | 問我 | `blocked_atomic` |
| 1367 | 基本 | `reviewed_selection` |
| 1368 | 教育 | `multiple` |
| 1369 | 殺 | `reviewed_selection` |
| 1370 | 毫子 | `reviewed_selection` |
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
| 1389 | 證明 | `reviewed_selection` |
| 1390 | 黨 | `reviewed_selection` |
| 1391 | 攪 | `reviewed_selection` |
| 1392 | 一次過 | `reviewed_selection` |
| 1393 | 一百蚊 | `blocked_atomic` |
| 1394 | 乜鬼 | `reviewed_selection` |
| 1395 | 上年 | `reading_split` |
| 1396 | 不斷 | `reviewed_selection` |
| 1397 | 之類 | `reading_split` |
| 1398 | 冇用 | `reviewed_selection` |
| 1399 | 片 | `reading_split` |
| 1400 | 右下方 | `blocked_atomic` |
| 1401 | 左手邊 | `reviewed_selection` |
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
| 1420 | 姓 | `multiple` |
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
| 1434 | 恐怖 | `multiple` |
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
| 1480 | 心理 | `reviewed_selection` |
| 1481 | 文化 | `reviewed_selection` |
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
| 1493 | 沙 | `multiple` |
| 1494 | 角度 | `reviewed_selection` |
| 1495 | 事實上 | `reviewed_selection` |
| 1496 | 佬 | `reviewed_selection` |
| 1497 | 或 | `multiple` |
| 1498 | 拍拖 | `reviewed_selection` |
| 1499 | 果 | `reviewed_selection` |
| 1500 | 沾污 | `reviewed_selection` |

## Implementation-critical readings and categories

The later runtime task must preserve, at minimum:

- `剩`: `sing6` and independently documented spoken/variant `zing6` remain one remain/be-left family rather than a fake category split.
- `號`: `hou6` number/designation family vs `hou4` howl/cry family.
- `儲`: `cou5` colloquial save/store and literary `cyu5` where independently supported.
- `應`: `jing1` should/ought-to vs `jing3` answer/respond.
- `下邊`: `haa6 bin6`; Cifu `bin1` is not selected.
- `收到`: conventional `sau1 dou2` received/understood response; do not promote `dou3` as an equivalent without separate sense evidence.
- `唔好意思`: ordinary `m4 hou2 ji3 si1`.
- `純粹`: preserve the independently supported `seon4 seoi5` / `seon4 seoi6` register variation.
- `處`: keep `cyu3` place/location and formal `cyu2/cyu5` verbal/bound families distinct; colloquial `syu3~syu2` locality evidence remains separate where appropriate.
- `靚仔`: ordinary `leng3 zai2`; do not import distinct `𡃁仔/僆仔` `leng1 zai2`.
- `下下`: `haa5 haa5`, not Cifu `haa6 haa6`.
- `更`: `gang3` comparative/degree vs `gang1` change/watch-period family.
- `區`: common `keoi1` district/area vs `au1` surname.
- `醒`: `seng2` wake/regain-consciousness vs `sing2` smart/lively and give/treat families.
- `上年`: `soeng6 nin2`.
- `不斷`: `bat1 dyun6`.
- `之類`: preserve `zi1 leoi6` and `zi1 leoi2`.
- `片`: `pin2` noun family vs `pin3` classifier/verb family.
- `艾爾頓`: name-specific `aai6 ji5 deon6`.
- `亞視`: `aa3 si6`.
- `訂`: `deng6` order/book/subscribe vs formal `ding3/ding6` set/draw-up family.
- `迫`: ordinary `bik1` force/press; specialized `baak1` remains separately conditioned.
- `家姐`: `gaa1 ze1`.
- `捉`: productive `zuk1`; do not promote Cifu `zuk3` without separate evidence.
- `著`: preserve genuine `zyu3`, `zoek3`, and `zoek6` families instead of one graph-wide default.
- `黑`: preserve the native color family and independently supported loan family without conflation.
- `寧願`: preserve `ning4 jyun2` and independently attested `ning4 jyun6` / changed-tone family where appropriately conditioned.
- `數`: `sou3` noun vs `sou2` verb.
- `樓`: ordinary free noun `lau2`; `lau4` is separately conditioned in names/compounds.
- `膠袋`: `gaau1 doi2`; `doi6` belongs to separate verb `袋`.

## Implementation handoff

Runtime reconciliation is deliberately out of scope here. After this ledger is merged, open a separate implementation intake against then-current `main`.

That runtime task must:

1. preserve complete Cifu top-2000 exact-surface coverage;
2. compare current runtime analyses against this authority rather than assuming the packet-time runtime snapshot is current;
3. use the existing stable multi-analysis architecture and stable lexical-analysis IDs;
4. preserve richer independently supported pre-existing analyses unless this authority explicitly corrects them;
5. add no typed whole-surface analysis for the **47** `blocked_atomic` rows;
6. propagate the explicit reading/category decisions above;
7. keep construction identity/status, survey/native-panel state, corpus classifications, release-publication state, and deployment state unchanged;
8. pass source-first build verification, focused lexical invariants, parser architecture checks, and the live regression-debt ratchets before semver/state synchronization.
