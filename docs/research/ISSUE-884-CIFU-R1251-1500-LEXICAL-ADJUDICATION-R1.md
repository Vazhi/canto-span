# Issue #884 — Cifu ranks 1251–1500 lexical adjudication consolidation R1

## Purpose

This record consolidates the completed Cifu SpokenAdult ranks 1251–1500 evidence packet from closed issue #797 / merged PR #824 and the full expert-adjudication chain on #797 into one implementation-safe lexical authority. It changes no runtime lexicon, parser behavior, executable tests, generated `main.js`, runtime version, construction identity/status, survey/native-panel state, corpus classification, release-publication state, or deployment state.

Cifu rank and exact written surface remain discovery/frequency evidence only. Cifu definitions and Jyutping have zero independent Cantonese lexical-semantic/POS authority. HKCanCor exact hits establish occurrence and contextual evidence, not unrestricted productivity or a final lexical ontology. The derived UD layer is navigation only. Frozen Rime can corroborate exact surface/readings but has zero independent POS, semantic, atomicity, or frequency authority. Runtime/tests are implementation evidence only.

`blocked_atomic` means that this authority does not license a new typed whole-surface Cantonese lexical analysis. For genuine Cantonese compositional strings, grammar-bearing strings, segmentation artifacts, and unresolved source forms, neutral exact-surface coverage may remain. The separately identified `多少` row is different: independent evidence identifies it as Standard written Chinese rather than Cantonese, so it is a later runtime-contamination-removal candidate rather than a genuine Cantonese neutral-coverage case.

## Authority and supersession

- Mechanical packet: closed issue #797 / merged PR #824.
- Evidence policy: `docs/research/CIFU-LEXICAL-POS-EVIDENCE-CONTRACT.md`.
- Ranks 1251–1275: issue #797 comment `5269650359`, correction audit `5275212960`, and final closure `5275504224`.
- Ranks 1276–1500: broad completion comment `5275370635` plus detailed passes `5275384123`, `5275417104`, `5275483335`, `5275602678`, `5275642951`, `5275713059`, `5275773265`, `5275816030`, and `5275857514`.

The broad completion comment and the later detailed passes are inputs to consolidation, not a chronology-based authority stack. Where they conflict, this record resolves the row from the strongest independent Cantonese evidence, frozen packet/concordance evidence as occurrence/context evidence, and the lexical evidence contract. No comment wins merely because it is earlier or later.

## Packet accounting

- 250 rank rows;
- 166 HKCanCor-attested surfaces;
- 84 explicit zero-hit surfaces;
- 1,327 matching HKCanCor tokens;
- 217 observed surface × raw-POS × Jyutping buckets;
- 301 concordance rows;
- 250 runtime rows / 250 normalized runtime analyses at packet time.

## Final accounting

- **132** `reviewed_selection` — one broad lexical analysis;
- **40** `multiple` — multiple lexical/category analyses required;
- **29** `reading_split` — reading-specific correction or split required;
- **49** `blocked_atomic` — no new typed whole-surface Cantonese lexical analysis;
- **250 / 250** ranks accounted for exactly once.

## Zero-hit evidence-strength overlay

Of the 84 zero-hit packet rows, **40** retain a positive lexical decision and **44** are blocked as whole-surface Cantonese lexical entries after consolidation.

**37** positive zero-hit rows have an independent Cantonese lexical/category check preserved in the #797 expert record or added during this consolidation:

`1255 象徵`, `1258 解決`, `1268 擦膠`, `1277 公眾`, `1279 毋`, `1283 必須`, `1286 民主黨`, `1292 收到`, `1297 言論`, `1300 波浪`, `1311 基本法`, `1330 瞭解`, `1332 權利`, `1343 失敗`, `1354 垂直`, `1360 城堡`, `1361 政黨`, `1362 冤`, `1363 效`, `1385 環保`, `1390 黨`, `1391 攪`, `1401 左手邊`, `1415 角色`, `1416 車主`, `1419 坦白`, `1422 法例`, `1440 票`, `1441 終審`, `1446 著`, `1447 賀`, `1449 椰`, `1459 劍`, `1479 引起`, `1486 回應`, `1499 果`, `1500 沾污`.

Three positive zero-hit rows remain conservative `source_only_pending_cantonese_confirmation` for typed atomic implementation because independent sources currently corroborate the expression/related material but do not establish a sufficiently clear exact-surface lexical category:

`1282 平排`, `1284 打直`, `1285 打斜`.

`source_only_pending_cantonese_confirmation` is an evidence-strength flag, not a deletion instruction. These three surfaces may retain neutral exact-surface coverage, but a later implementation must not present them as independently category-verified lexical facts.

### Positive non-Cantonese contamination

- `1404 多少` — CantoDict explicitly labels `多少 do1 siu2` as Standard written Chinese rather than Cantonese and gives Cantonese `幾多` as the counterpart. It is therefore `blocked_atomic` for the Cantonese lexicon and is a later runtime-contamination-removal candidate. This is not ordinary compositional `blocked_atomic` neutral coverage.

## Conflict resolutions

These rows were explicitly listed in #884 because the broad completion and detailed passes differed materially in category, reading, atomicity, or implementation consequence. The final authority is:

| Rank | Surface | Final class | Resolution | Thread evidence |
|---:|---|---|---|---|
| 1289 | `多數` | `multiple` | noun/quantificational “majority/most” + adverb “usually/mostly” | `5275370635` ↔ `5275384123` |
| 1299 | `咁上下` | `reviewed_selection` | stative/degree property expression “roughly that level/about so much/so-so” | `5275370635` ↔ `5275384123` |
| 1303 | `後生` | `multiple` | stative/property “young” + person/collective noun “young person/young people” | `5275370635` ↔ `5275417104` |
| 1306 | `個害` | `blocked_atomic` | unsupported/data-quality rank string with no coherent standalone lexical item; no typed whole-surface analysis | `5275370635` ↔ `5275417104` |
| 1316 | `圍住` | `blocked_atomic` | resultative `圍 + 住` predicate; preserve constructional decomposition rather than fabricate a typed atomic whole | `5275370635` ↔ `5275417104` |
| 1320 | `落落` | `blocked_atomic` | unresolved reduplicated/literary string; no typed whole-surface analysis until context distinguishes productive reduplication from lexicalized use | `5275370635` ↔ `5275417104` |
| 1325 | `論` | `reviewed_selection` | formal verb “discuss/evaluate/treat as”; bound/nominal theory/discourse family is not a separately licensed free analysis here | `5275370635` ↔ `5275417104` |
| 1328 | `靚仔` | `reading_split` | person noun “handsome guy/boy” + stative adjective “handsome”; exact graph uses `leng3 zai2`, not packet/Cifu-derived `leng1` | `5275370635` ↔ `5275483335` |
| 1334 | `一點` | `reviewed_selection` | conventional quantificational “a little/a bit”; literal “one point/dot/o’clock” readings remain compositional | `5275370635` ↔ `5275483335` |
| 1343 | `失敗` | `multiple` | verb “fail/be defeated” + event/result noun “failure” | `5275370635` ↔ `5275483335` |
| 1346 | `安排` | `multiple` | verb “arrange/plan” + noun “arrangement/plan” | `5275370635` ↔ `5275483335` |
| 1349 | `自` | `reviewed_selection` | bound/formal reflexive/source morpheme; one corpus PRON tag does not license a broad free spoken pronoun entry | `5275370635` ↔ `5275483335` |
| 1350 | `似乎` | `reviewed_selection` | epistemic/seeming predicate/adverbial “apparently/seem”; keep one broad lexical family rather than forcing packet VERB | `5275370635` ↔ `5275483335` |
| 1351 | `即個` | `blocked_atomic` | unsupported/context-dependent segmentation string; no typed whole-surface analysis | `5275370635` ↔ `5275602678` |
| 1352 | `吸引` | `reviewed_selection` | verb/property predicate “attract/be attractive”; packet `v/vn` alone does not independently establish a noun “attraction” | `5275370635` ↔ `5275602678` |
| 1358 | `信佳` | `blocked_atomic` | unsupported/source-verification string; no typed whole-surface analysis | `5275370635` ↔ `5275602678` |
| 1362 | `冤` | `multiple` | noun “injustice/grievance” + property/verb family “wronged/unjust” | `5275370635` ↔ `5275602678` |
| 1363 | `效` | `reviewed_selection` | bound/formal morpheme `haau6` in effect/efficacy/imitative families; no independent support for separate free noun and verb entries | `5275370635` ↔ `5275602678` |
| 1370 | `毫子` | `reviewed_selection` | currency measure/classifier `hou4 zi2` “ten cents”; do not inherit mechanical NOUN | `5275370635` ↔ `5275602678` |
| 1386 | `總` | `multiple` | adjective/totality, verb/gather-total, and adverb “always/overall/in every case” families are independently lexical; keep multiple | `5275370635` ↔ `5275642951` |
| 1389 | `證明` | `reviewed_selection` | lexical verb “prove/demonstrate”; independent Cantonese entry does not justify a separate noun analysis | `5275370635` ↔ `5275642951` |
| 1394 | `乜鬼` | `blocked_atomic` | interrogative `乜` + emphatic/evaluative `鬼` construction; preserve composition rather than atomic lexical POS | `5275370635` ↔ `5275642951` |
| 1395 | `上年` | `reading_split` | temporal noun/expression “last year”; exact reading `soeng6 nin2` | `5275370635` ↔ `5275642951` |
| 1396 | `不斷` | `reading_split` | adverb `bat1 dyun6` “continuously/constantly”; do not add a separate adjective from packet/gloss projection | `5275370635` ↔ `5275642951` |
| 1397 | `之類` | `reading_split` | listing suffix/expression “and the like/and so on”; preserve both independently listed `zi1 leoi6` and `zi1 leoi2` | `5275370635` ↔ `5275642951` |
| 1401 | `左手邊` | `reviewed_selection` | conventional spatial localizer “left-hand side” `zo2 sau2 bin1`; transparent internal structure does not erase its independently attested whole expression | `5275370635` ↔ `5275713059` |
| 1402 | `印椰樹` | `blocked_atomic` | unsupported/source string; no credible standalone lexical item established | `5275370635` ↔ `5275713059` |
| 1419 | `坦白` | `multiple` | stative adjective “frank/honest” + verb “confess/state frankly”; adverbial placement can derive unless syntax later requires another split | `5275370635` ↔ `5275713059` |
| 1420 | `姓` | `multiple` | noun “surname” + verb “have the surname/be surnamed” | `5275370635` ↔ `5275713059` |
| 1421 | `明顯` | `reviewed_selection` | stative/property “clear/obvious”; adverbial clause modification does not independently establish another lexeme | `5275370635` ↔ `5275713059` |
| 1434 | `恐怖` | `multiple` | stative adjective “frightening/terrible” + abstract noun “terror/horror”; no standalone “terrorist” noun | `5275370635` ↔ `5275773265` |
| 1436 | `時話` | `blocked_atomic` | unsupported/context-dependent string; likely phrase boundary/extraction issue, not a licensed whole lexeme | `5275370635` ↔ `5275773265` |
| 1446 | `著` | `reading_split` | graph-family split: preserve literary/bound `zyu3` writing/works/notability family and separate `zoek3` wear plus independently attested `zoek6` lexical families | `5275370635` ↔ `5275773265` |
| 1448 | `黑` | `reading_split` | black/dark property family with pronunciation variation `haak1`/`hak1`; do not invent a separate hack-verb analysis from the reading difference | `5275370635` ↔ `5275773265` |
| 1458 | `與` | `multiple` | formal conjunction/relational function “and/with” + independently attested verb/preposition families at `jyu5` | `5275370635` ↔ `5275816030` |
| 1475 | `下角` | `blocked_atomic` | compositional spatial locality expression “lower corner”; keep compositional/localizer analysis rather than force an opaque lexeme | `5275370635` ↔ `5275816030` |
| 1480 | `心理` | `reviewed_selection` | one noun/bound-modifier family “psychology/mental state/psychological”; attributive distribution alone does not license a separate adjective | `5275370635` ↔ `5275857514` |
| 1481 | `文化` | `reviewed_selection` | noun “culture/civilization”; “cultural” modifier use is nominal/bound rather than independently adjectival | `5275370635` ↔ `5275857514` |
| 1488 | `有關` | `reviewed_selection` | relational verb/predicate “be related to/concern”; pre-nominal “related/relevant” use belongs to the same lexical entry | `5275370635` ↔ `5275857514` |
| 1493 | `沙` | `reviewed_selection` | noun/bound family `saa1` “sand/granules”; do not promote hoarse/raspy property without direct exact-surface support | `5275370635` ↔ `5275857514` |
| 1497 | `或` | `multiple` | formal conjunction `waak6` “or” + adverb `waak6` “possibly” | `5275370635` ↔ `5275857514` |

## Additional independent checks added during consolidation

These checks were used to resolve zero-hit or thread-conflict rows; they supplement rather than replace the frozen packet and #797 issue provenance.

| Row | Source | Consequence |
|---|---|---|
| `1277 公眾` | [Words.hk](https://words.hk/zidin/公眾) | noun “the public” + 區別詞/public modifier |
| `1279 毋` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/search/?searchtype=1&text=毋) | formal negative function plus Chinese surname/proper-name homograph |
| `1286 民主黨` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/3758/) | `man4 zyu2 dong2` Democratic Party formation |
| `1297 言論` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/5337/) | `jin4 leon6` expression/opinion noun |
| `1300 波浪` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/3460/) | `bo1 long6` wave noun |
| `1311 基本法` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/496/) | `gei1 bun2 faat3` Basic Law formation |
| `1330 瞭解` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/569/) | `liu5 gaai2` verb “understand” |
| `1332 權利` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/4017/) | `kyun4 lei6` right/entitlement noun |
| `1343 失敗` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/2082/) | fail/lose + failure/loss, supporting verbal and nominal use |
| `1354 垂直` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/7749/) | `seoi4 zik6` vertical/perpendicular property |
| `1360 城堡` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/434/) | `sing4 bou2` castle noun |
| `1361 政黨` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/5967/) | `zing3 dong2` political-party noun |
| `1385 環保` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/13483/) | adjective eco-friendly + noun environmental protection |
| `1390 黨` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/3758/) | noun party/faction + verb take sides |
| `1391 攪` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/2150/) | verb `gaau2` disturb/stir |
| `1415 角色` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/角/) | `gok3 sik1` role formation |
| `1416 車主` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/13713/) | `ce1 zyu2` vehicle-owner noun |
| `1419 坦白` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/8982/) | adjective frank + verb confess |
| `1422 法例` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/13655/) | `faat3 lai6` legal-regulation noun |
| `1440 票` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/1014/) | noun `piu3` ticket/vote/invoice/banknote |
| `1441 終審` | [CantoDict / Words.hk](https://www.cantonese.sheik.co.uk/dictionary/characters/1095/) | `zung1 sam2` final judgment/hearing; attested in 終審法院 |
| `1447 賀` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/3318/) | verb congratulate/celebrate + surname family |
| `1449 椰` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/2287/) | noun `je4` coconut/coconut palm |
| `1459 劍` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/209/) | noun `gim3` sword |
| `1479 引起` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/1031/) | `jan5 hei2` “give rise to” |
| `1499 果` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/391/) | noun + adverbial + verbal + surname families at `gwo2` |
| `1500 沾污` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/978/) | `zim1 wu1` is independently listed under 污 compounds |
| `1404 多少` | [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/1968/) | explicitly Standard written Chinese, not Cantonese; Cantonese counterpart 幾多 |

## Final decision inventory

Every rank 1251–1500 appears exactly once in the four mutually exclusive inventories below. The zero-hit evidence-strength overlay is additional metadata, not a fifth lexical-decision class.

### `reviewed_selection` — one broad lexical analysis (132)

- `1251 畢業` — lexical verb “graduate/finish a course”; do not add a noun from packet `vn` alone.
- `1254 提供` — lexical verb “provide/supply”.
- `1256 感情` — abstract noun “feelings/emotion/affection”.
- `1260 熄` — verb “switch off/extinguish”.
- `1261 廠` — place/count noun “factory/works”.
- `1262 熟` — stative/property word “ripe/cooked/familiar”.
- `1263 適合` — stative/predicative “suitable/fit”.
- `1264 靚女` — lexicalized person noun “pretty woman/girl”.
- `1267 戲` — count noun “play/show/drama”.
- `1268 擦膠` — noun “eraser” `caat3 gaau1`; independently supported despite zero corpus hits.
- `1269 禮物` — count noun “gift/present”.
- `1270 雞` — count noun “chicken”; slang/metaphorical extensions remain in the nominal family unless syntax later requires separation.
- `1272 鐘意` — cognition verb “like/be fond of”.
- `1273 權` — abstract noun/bound lexical root “right/authority/power”.
- `1278 太過` — degree adverb/intensifier “too/excessively”.
- `1280 四十五度` — degree/angle phrase is compositional and should not be atomically typed.
- `1281 左下` — compositional directional/localizer expression; no atomic lexeme needed.
- `1282 平排` — conventional orientation/manner expression “side by side/in a row”; retain conservatively pending stronger category-level evidence.
- `1283 必須` — modal/necessity predicate/function “must/have to”.
- `1284 打直` — conventional vertical/orientation manner expression; retain conservatively pending stronger category-level evidence.
- `1285 打斜` — conventional diagonal/slanted manner expression; retain conservatively pending stronger category-level evidence.
- `1286 民主黨` — organization/proper-name noun “Democratic Party” where referential; generic composition remains context-sensitive.
- `1288 再落` — adverb + motion/result verb sequence; not an atomic lexeme.
- `1290 好大` — degree modifier + property word; compositional.
- `1291 好慘` — degree modifier + property word; compositional.
- `1293 有機` — property word “organic”; distinguish from transparent `有 + 機…` sequences.
- `1294 告` — formal/literary verb “tell/accuse/sue/announce”.
- `1295 我估` — subject + cognition verb fragment; compositional.
- `1296 我畫` — subject + verb fragment; compositional.
- `1297 言論` — noun “speech/opinion/commentary”.
- `1298 受到` — written/formal verb “receive/suffer/be subjected to”.
- `1299 咁上下` — stative/degree property expression “roughly that level/about so much/so-so”.
- `1300 波浪` — noun “wave(s)”.
- `1302 阿哥` — kin/person noun “older brother”.
- `1304 後面` — locality noun/localizer “behind/back/later”.
- `1307 唔好意思` — lexicalized politeness/stative expression “sorry/excuse me; embarrassed/shy”; do not convert packet tag spread into separate POS entries.
- `1310 高度` — abstract/measure noun “height/altitude/degree”; written “highly” distribution remains a register follow-up.
- `1311 基本法` — legal-document proper title when referring to the Basic Law; generic “basic law” readings remain context-sensitive.
- `1313 理論` — abstract/count noun “theory”.
- `1315 喊` — verb “cry/yell/shout/call out”.
- `1317 尊嚴` — abstract noun “dignity/honor”.
- `1321 資料` — mass/count noun “data/information/materials”.
- `1322 審` — formal verb “examine/investigate/try in court”.
- `1323 撳` — verb `gam6` “press/push down; restrain/extort”.
- `1324 複雜` — stative/property word “complicated/complex”.
- `1325 論` — formal verb “discuss/evaluate/treat as”; bound/nominal theory/discourse family is not a separately licensed free analysis here.
- `1329 鬧` — verb “scold/quarrel/make noise”.
- `1330 瞭解` — cognition verb “understand/know about”.
- `1331 邊行` — interrogative + movement/occupation context fragment; no atomic lexeme.
- `1332 權利` — abstract noun “right/entitlement”.
- `1333 一晚` — numeral + temporal classifier/noun phrase; compositional.
- `1334 一點` — conventional quantificational “a little/a bit”; literal “one point/dot/o’clock” readings remain compositional.
- `1335 人士` — person/category noun “person/people/personage”.
- `1336 上角` — compositional spatial locality expression “upper corner”.
- `1337 上邊` — locality noun/localizer “above/upper side”.
- `1339 已` — written/formal aspect/temporal adverb “already”.
- `1340 不嬲` — habitual adverb “always/all along”.
- `1341 公平` — stative/property word “fair/equitable”.
- `1342 冇所謂` — idiomatic predicate “doesn’t matter/don’t mind”.
- `1345 合格` — stative/result predicate “qualified/pass standard”.
- `1347 成張` — quantifier/whole-classifier phrase “the whole sheet”; compositional.
- `1348 肉` — mass/count noun “meat/flesh”.
- `1349 自` — bound/formal reflexive/source morpheme; one corpus PRON tag does not license a broad free spoken pronoun entry.
- `1350 似乎` — epistemic/seeming predicate/adverbial “apparently/seem”; keep one broad lexical family rather than forcing packet VERB.
- `1352 吸引` — verb/property predicate “attract/be attractive”; packet `v/vn` alone does not independently establish a noun “attraction”.
- `1354 垂直` — property word “vertical/perpendicular”.
- `1355 奇怪` — stative/property word “strange/odd”.
- `1356 空間` — noun “space/room”.
- `1357 阿婆` — kin/person noun “old woman/grandmother”.
- `1359 咬` — verb `ngaau5` “bite/nip”.
- `1360 城堡` — noun `sing4 bou2` “castle”.
- `1361 政黨` — noun `zing3 dong2` “political party”.
- `1363 效` — bound/formal morpheme `haau6` in effect/efficacy/imitative families; no independent support for separate free noun and verb entries.
- `1364 酒店` — noun “hotel”.
- `1366 問我` — verb + pronoun fragment; compositional.
- `1367 基本` — property/modifier “basic/fundamental”.
- `1369 殺` — verb “kill/murder”.
- `1370 毫子` — currency measure/classifier `hou4 zi2` “ten cents”; do not inherit mechanical NOUN.
- `1371 深` — stative/property word “deep”.
- `1372 雀仔` — noun “small bird/sparrow”.
- `1374 幾喇` — interrogative/degree + particle fragment; no atomic lexeme.
- `1375 朝頭早` — temporal noun/expression “morning/early in the morning”.
- `1376 無端端` — adverb “for no reason/suddenly”.
- `1377 越來` — incomplete comparative/inchoative fragment; no whole-surface lexical analysis.
- `1379 搞錯` — resultative verb expression “get wrong/make a mistake”.
- `1380 資訊` — noun “information”.
- `1381 對方` — referential noun “the other party/side/person”.
- `1382 語言` — noun “language”.
- `1383 整體` — noun/broad holistic family “whole/overall entity”; modifier distribution need not create a second lexeme.
- `1387 講個` — verb + classifier/determiner fragment; no atomic lexeme.
- `1388 轉個` — verb + classifier/determiner fragment; no atomic lexeme.
- `1389 證明` — lexical verb “prove/demonstrate”; independent Cantonese entry does not justify a separate noun analysis.
- `1391 攪` — verb `gaau2` “disturb/stir/mix”.
- `1392 一次過` — adverbial expression “all at once/in one go”.
- `1393 一百蚊` — numeral + currency measure phrase; compositional.
- `1398 冇用` — stative/property expression “useless/no use”.
- `1400 右下方` — compositional directional/localizer phrase “lower right”.
- `1401 左手邊` — conventional spatial localizer “left-hand side” `zo2 sau2 bin1`; transparent internal structure does not erase its independently attested whole expression.
- `1403 地點` — noun “place/location”.
- `1405 多次` — quantifier + event-count classifier expression; compositional.
- `1406 多個` — quantifier + classifier expression; compositional.
- `1407 好處` — noun “benefit/advantage”.
- `1408 存在` — formal verb “exist/be present”.
- `1409 有趣` — stative/property word “interesting”.
- `1410 老實` — stative/property word “honest”.
- `1413 冷氣` — noun “air conditioning/cold air”.
- `1414 沖` — verb “rush/rinse/brew/charge”.
- `1415 角色` — noun `gok3 sik1` “role/character”.
- `1416 車主` — person/role noun “vehicle owner”.
- `1418 依家` — temporal adverb/expression “now” `ji1 gaa1`.
- `1421 明顯` — stative/property “clear/obvious”; adverbial clause modification does not independently establish another lexeme.
- `1422 法例` — legal/count noun “law/regulation”.
- `1423 波` — noun family “ball/wave/gear/etc.”; preserve Cantonese loan senses without multiplying POS unnecessarily.
- `1429 重新` — adverb “again/anew”.
- `1430 音樂` — noun “music”.
- `1431 音響` — noun “sound/audio equipment/acoustics”.
- `1432 個意` — unsupported/context-dependent classifier + noun fragment; no atomic lexeme.
- `1437 除非` — conditional conjunction “unless/only if”.
- `1438 情` — noun/bound morpheme “feeling/situation/affair”.
- `1439 排隊` — verb “queue/line up”.
- `1440 票` — noun `piu3` “ticket/vote/invoice/banknote”.
- `1441 終審` — legal noun/bound nominal “final judgment/final hearing/final instance”.
- `1442 竟然` — adverb “unexpectedly/actually”.
- `1443 就畫` — adverb/particle + verb fragment; no atomic lexeme.
- `1444 提出` — verb “put forward/raise/propose”.
- `1445 答案` — noun “answer/solution”.
- `1449 椰` — noun/bound morpheme `je4` “coconut/coconut palm”.
- `1450 落返` — motion/result verb + restitutive particle; compositional.
- `1452 隔` — relational verb/predicate `gaak3` “separate/be apart/lie between”.
- `1453 電影` — noun `din6 jing2` “movie/film”.
- `1455 摺` — primary verb `zip3` “fold/bend”; result-state adjective can derive unless independently lexicalized.
- `1457 福利` — noun “welfare/benefits/well-being”.
- `1459 劍` — noun `gim3` “sword”.
- `1464 諗法` — noun “way of thinking/opinion/idea”.
- `1465 質素` — abstract noun “quality/standard”.
- `1466 選` — verb “choose/select/elect”.
- `1467 錄` — primary verb “record/copy”; formal nominal record/register remains conservative without direct exact evidence.
- `1470 醫療` — noun “medical treatment/healthcare”.
- `1471 贊成` — verb “approve/support/endorse”.
- `1472 曬` — verb `saai3` “sun/dry in sun/sunbathe”; newer file-sharing sense remains same POS; keep distinct from grammatical `晒`.
- `1476 大隻` — lexicalized stative/property “big-built/large-bodied/strong”.
- `1477 女皇` — common person/title noun “queen/empress”, not PROPN by default.
- `1479 引起` — verb “cause/give rise to/arouse”.
- `1480 心理` — one noun/bound-modifier family “psychology/mental state/psychological”; attributive distribution alone does not license a separate adjective.
- `1481 文化` — noun “culture/civilization”; “cultural” modifier use is nominal/bound rather than independently adjectival.
- `1485 各` — distributive determiner/quantifier “each/every”.
- `1488 有關` — relational verb/predicate “be related to/concern”; pre-nominal “related/relevant” use belongs to the same lexical entry.
- `1489 行業` — noun `hong4 jip6` “industry/trade”.
- `1490 初初` — temporal adverb “at first/initially”.
- `1493 沙` — noun/bound family `saa1` “sand/granules”; do not promote hoarse/raspy property without direct exact-surface support.
- `1494 角度` — noun “angle/point of view”.
- `1495 事實上` — discourse/adverbial expression “in fact/actually”.
- `1498 拍拖` — lexical verb “date/be in a romantic relationship”.
- `1500 沾污` — written/formal verb `zim1 wu1` “stain/soil/defile”.

### `multiple` — multiple lexical/category analyses required (40)

- `1255 象徵` — noun “symbol/emblem” + verb “symbolize/represent”.
- `1271 懷疑` — verb “doubt/suspect” + noun “doubt/suspicion”.
- `1277 公眾` — noun “the public” + public modifier/distinguishing-word use; independent Words.hk evidence supports both.
- `1279 毋` — formal/written negative function `mou4` + independently recorded surname/proper-name homograph.
- `1287 任` — lexical/formal verb “appoint/take office/allow” + surname/proper-name homograph; do not manufacture a free noun merely from glossing.
- `1289 多數` — noun/quantificational “majority/most” + adverb “usually/mostly”.
- `1303 後生` — stative/property “young” + person/collective noun “young person/young people”.
- `1305 計劃` — noun “plan/project” + verb “plan”.
- `1308 租` — verb “rent/lease” + noun “rent/rental payment”.
- `1318 發` — verb/bound “send/issue/develop/emit” + classifier/measure for shots/rounds.
- `1319 照` — verb “shine/photograph/reflect” + relation/coverb “according to” + noun “photo” where independently instantiated.
- `1326 輪` — noun “wheel/round” + classifier for rounds/turns/round objects + verbal “rotate/take turns” family.
- `1327 遮` — verb “cover/screen/conceal” + Cantonese noun “umbrella”.
- `1343 失敗` — verb “fail/be defeated” + event/result noun “failure”.
- `1344 申請` — verb “apply/request” + noun “application/request”.
- `1346 安排` — verb “arrange/plan” + noun “arrangement/plan”.
- `1362 冤` — noun “injustice/grievance” + property/verb family “wronged/unjust”.
- `1368 教育` — verb “educate/teach” + abstract noun “education”.
- `1373 創作` — verb “create/produce/write” + noun “creative work/creation”.
- `1378 黃` — color property “yellow” + surname/proper-name homograph.
- `1385 環保` — adjective “eco-friendly/environmentally friendly” + noun abbreviation “environmental protection”.
- `1386 總` — adjective/totality, verb/gather-total, and adverb “always/overall/in every case” families are independently lexical; keep multiple.
- `1390 黨` — noun “party/gang/faction” + verb “be partial/take sides”; preserve both independently recorded categories.
- `1412 何` — surname/proper-name `Ho` + formal interrogative function “what/how/why/which”; archaic carry sense not promoted here.
- `1419 坦白` — stative adjective “frank/honest” + verb “confess/state frankly”; adverbial placement can derive unless syntax later requires another split.
- `1420 姓` — noun “surname” + verb “have the surname/be surnamed”.
- `1424 花` — noun “flower” + verb “spend/use up” + adjective “multicoloured/scratched/dirty” + productive suffix/bound family.
- `1425 金` — noun/mass noun “gold/money” + productive bound/attributive “gold/golden” family.
- `1426 約` — noun “appointment/agreement” + verb “arrange/restrict” + approximation adverb “about”.
- `1434 恐怖` — stative adjective “frightening/terrible” + abstract noun “terror/horror”; no standalone “terrorist” noun.
- `1447 賀` — verb `ho6` “congratulate/celebrate” + surname/proper-name family; preserve the independently recorded homograph.
- `1456 盡` — verb “use up/exhaust” + adverb/degree “to the utmost/as much as possible” + end/limit nominal/localizer family.
- `1458 與` — formal conjunction/relational function “and/with” + independently attested verb/preposition families at `jyu5`.
- `1460 層` — classifier `cang4` for floors/layers + noun “layer/storey”.
- `1482 毛` — noun “hair/fur” + monetary measure/classifier family; surname/proper use remains separate where independently needed.
- `1486 回應` — noun “response” + verb “respond/reply”; independently attested as N/V despite zero packet hits.
- `1491 困難` — noun “difficulty/problem” + stative adjective “difficult”.
- `1496 佬` — person noun “man/male” + productive colloquial person suffix.
- `1497 或` — formal conjunction `waak6` “or” + adverb `waak6` “possibly”.
- `1499 果` — graph `果 gwo2` has independently recorded noun “fruit/result”, adverbial “surely/really”, verbal “stuff/succeed”, and surname families; do not conflate with demonstrative `嗰`.

### `reading_split` — reading-specific correction or split required (29)

- `1252 剩` — remain/be-left family; preserve standard/literary `sing6` and spoken/variant `zing6`; no category split solely from reading variation.
- `1257 號` — `hou6` number/designation/date/title family vs separate `hou4` howl/cry family.
- `1265 儲` — verb “store/save”; preserve colloquial `cou5` vs literary `cyu5`.
- `1266 應` — `jing1` modal “should/ought to” vs `jing3` answer/respond family.
- `1276 下邊` — locality noun/localizer “below/under”; exact graph `下邊` uses `haa6 bin1`; do not conflate with `下便 haa6 bin6`.
- `1292 收到` — ordinary receive/result family plus lexicalized discourse response `sau1 dou2` “received/understood”; do not freeze Cifu `dou3` as sole reading.
- `1309 純粹` — manner/focus adverb “purely/merely”; `seon4 seoi5`.
- `1314 處` — `cyu3` nominal “place/office/department”; colloquial `syu3~syu2` locality family; formal `cyu2/cyu5` verbal/bound families remain distinct.
- `1328 靚仔` — person noun “handsome guy/boy” + stative adjective “handsome”; exact graph uses `leng3 zai2`, not packet/Cifu-derived `leng1`.
- `1338 下下` — `haa5 haa5` distributive/temporal “every time/each instance”; do not inherit a plain classifier ontology.
- `1353 更` — `gang3` degree adverb “more/even more” vs separate `gang1` change-family.
- `1365 區` — `keoi1` common noun “area/district” vs `au1` surname/proper-name family.
- `1384 醒` — `seng2` wake/regain-consciousness verb vs `sing2` give/treat verb and `sing2` smart/alert property family.
- `1395 上年` — temporal noun/expression “last year”; exact reading `soeng6 nin2`.
- `1396 不斷` — adverb `bat1 dyun6` “continuously/constantly”; do not add a separate adjective from packet/gloss projection.
- `1397 之類` — listing suffix/expression “and the like/and so on”; preserve both independently listed `zi1 leoi6` and `zi1 leoi2`.
- `1399 片` — `pin2` noun family “film/video/scan/diaper” vs `pin3` classifier for slices/tracts/broad scenes.
- `1411 艾爾頓` — proper-name transliteration; `aai6 ji5 deon6`.
- `1417 亞視` — proper organization name “ATV/Asia Television”; `aa3 si6`.
- `1427 訂` — `deng6` free verb “order/book/subscribe/reserve” vs `ding3` formal/bound “conclude/set/draw up”.
- `1428 迫` — ordinary `bik1` verb “force/press” and crowded/pressing property vs specialized `baak1` slang execution verb.
- `1433 家姐` — noun `gaa1 ze1` “elder sister”; reject Cifu `ze2` for the ordinary Cantonese word.
- `1435 捉` — verb `zuk1` “catch/grab”; Cifu `zuk3` remains unverified and is not promoted.
- `1446 著` — graph-family split: preserve literary/bound `zyu3` writing/works/notability family and separate `zoek3` wear plus independently attested `zoek6` lexical families.
- `1448 黑` — black/dark property family with pronunciation variation `haak1`/`hak1`; do not invent a separate hack-verb analysis from the reading difference.
- `1454 寧願` — preference split: `ning4 jyun2` predicate “would rather/prefer” vs `ning4 jyun6`/changed-tone modal-adverb function.
- `1461 數` — `sou2` verb “count/enumerate/criticize by listing” vs `sou3` noun “number/figure/amount”.
- `1462 樓` — `lau2` common free noun “building/flat/floor” vs `lau4` surname/proper/bound compound reading family.
- `1463 膠袋` — noun `gaau1 doi2` “plastic bag”; `doi6` belongs to verb `袋`, not this compound noun.

### `blocked_atomic` — no new typed whole-surface Cantonese lexical analysis (49)

- `1253 幾大` — compositional interrogative/degree phrase.
- `1259 試下` — verb + delimitative/light `下`; no atomic POS.
- `1274 鑑林` — unsupported rank string; no credible lexical item found in targeted independent checks.
- `1275 三點` — numeral + time/point expression; compositional.
- `1301 知有` — cognition verb + existential/possessive verb sequence; compositional.
- `1306 個害` — unsupported/data-quality rank string with no coherent standalone lexical item; no typed whole-surface analysis.
- `1312 將個` — disposal/coverb `將` + classifier/determiner fragment; no atomic analysis.
- `1316 圍住` — resultative `圍 + 住` predicate; preserve constructional decomposition rather than fabricate a typed atomic whole.
- `1320 落落` — unresolved reduplicated/literary string; no typed whole-surface analysis until context distinguishes productive reduplication from lexicalized use.
- `1331 邊行` — interrogative + movement/occupation context fragment; no atomic lexeme.
- `1333 一晚` — numeral + temporal classifier/noun phrase; compositional.
- `1336 上角` — compositional spatial locality expression “upper corner”.
- `1347 成張` — quantifier/whole-classifier phrase “the whole sheet”; compositional.
- `1351 即個` — unsupported/context-dependent segmentation string; no typed whole-surface analysis.
- `1358 信佳` — unsupported/source-verification string; no typed whole-surface analysis.
- `1366 問我` — verb + pronoun fragment; compositional.
- `1374 幾喇` — interrogative/degree + particle fragment; no atomic lexeme.
- `1377 越來` — incomplete comparative/inchoative fragment; no whole-surface lexical analysis.
- `1387 講個` — verb + classifier/determiner fragment; no atomic lexeme.
- `1388 轉個` — verb + classifier/determiner fragment; no atomic lexeme.
- `1393 一百蚊` — numeral + currency measure phrase; compositional.
- `1394 乜鬼` — interrogative `乜` + emphatic/evaluative `鬼` construction; preserve composition rather than atomic lexical POS.
- `1400 右下方` — compositional directional/localizer phrase “lower right”.
- `1402 印椰樹` — unsupported/source string; no credible standalone lexical item established.
- `1404 多少` — positive non-Cantonese contamination: CantoDict marks `多少 do1 siu2` Standard written Chinese, not Cantonese, with Cantonese `幾多`; no Cantonese typed whole-surface analysis.
- `1405 多次` — quantifier + event-count classifier expression; compositional.
- `1406 多個` — quantifier + classifier expression; compositional.
- `1432 個意` — unsupported/context-dependent classifier + noun fragment; no atomic lexeme.
- `1436 時話` — unsupported/context-dependent string; likely phrase boundary/extraction issue, not a licensed whole lexeme.
- `1443 就畫` — adverb/particle + verb fragment; no atomic lexeme.
- `1450 落返` — motion/result verb + restitutive particle; compositional.
- `1451 過個` — transparent `過 + 個`; no typed whole-surface analysis.
- `1468 講番` — verb `講` + restitutive/repetitive `番`; no typed whole-surface analysis.
- `1469 點會` — interrogative `點` + modal `會`; model compositionally.
- `1473 一本` — numeral + classifier; no typed whole-surface analysis.
- `1474 一座` — numeral + classifier; no typed whole-surface analysis.
- `1475 下角` — compositional spatial locality expression “lower corner”; keep compositional/localizer analysis rather than force an opaque lexeme.
- `1478 五點` — numeral + time classifier/measure; compositional.
- `1483 右畫` — directional modifier + `畫`; no typed whole-surface analysis.
- `1484 再畫` — adverb + verb; no typed whole-surface analysis.
- `1487 好貴` — degree modifier + stative adjective; no typed whole-surface analysis.
- `1492 每個` — distributive quantifier + classifier; no typed whole-surface analysis.

## Implementation boundary

This record authorizes no runtime change by itself. A separate downstream runtime-reconciliation intake must compare this authority with then-current `main`, preserve stable lexical-analysis IDs and richer pre-existing analyses, apply the regression-debt ratchet, keep genuine compositional/blocked surfaces neutral where appropriate, and treat `1404 多少` through the current positive-Mandarin-contamination policy rather than silently retaining it as a Cantonese lexical fact.

Any implementation must also preserve independently supported minority readings/functions even where HKCanCor did not observe them, and must not create typed analyses for the three `source_only_pending_cantonese_confirmation` zero-hit rows until their category-level Cantonese evidence is strengthened.

## Validation checklist

- [x] ranks 1251–1500 accounted for exactly once;
- [x] four lexical-decision classes are mutually exclusive;
- [x] all known #884 conflict rows resolved explicitly;
- [x] zero-hit evidence strength separated from lexical-decision class;
- [x] Cifu definitions/Jyutping not used as independent lexical authority;
- [x] raw HKCanCor/UD tags not treated as final ontology;
- [x] independent zero-hit checks filled during the active task where support was available;
- [x] `多少` non-Cantonese contamination recorded explicitly;
- [x] no runtime/parser/test/version/generated-output/state change authorized by this record.
