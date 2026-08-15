# Issue #884 — Cifu ranks 1251–1500 lexical adjudication consolidation R3

## Purpose

This is the single implementation-facing lexical authority for Cifu SpokenAdult ranks 1251–1500. It consolidates closed #797 / merged PR #824 and the complete expert-review thread, superseding the unmerged R2 branch draft. It changes no runtime lexicon, parser behavior, executable tests, generated `main.js`, runtime version, construction identity/status, survey/native-panel state, corpus classification, release-publication state, or deployment state.

## Evidence contract

- Cifu rank/exact surface = discovery/frequency evidence only.
- Cifu definitions = zero independent Cantonese semantic/POS authority.
- Cifu Jyutping = candidate pronunciation metadata only.
- HKCanCor exact hits = occurrence/context evidence, not final lexical ontology or unrestricted productivity.
- Derived UD = navigation only.
- Zero HKCanCor hits are not negative evidence.
- Frozen Rime may corroborate exact surface/readings only; zero POS/semantic/atomicity/frequency authority.
- Runtime/tests = implementation evidence only.
- `blocked_atomic` means no new typed whole-surface Cantonese lexical analysis. Genuine Cantonese neutral exact-surface coverage may remain. `1404 多少` is separately identified positive non-Cantonese contamination and is not an ordinary neutral-coverage case.

## Authority

Mechanical packet: #797 / PR #824.

Expert inputs:
- 1251–1275: `5269650359`, correction audit `5275212960`, final closure `5275504224`;
- 1276–1500: broad summary `5275370635` plus detailed passes `5275384123`, `5275417104`, `5275483335`, `5275602678`, `5275642951`, `5275713059`, `5275773265`, `5275816030`, `5275857514`.

No comment wins by chronology. Conflicts resolve from independent Cantonese lexical evidence plus frozen concordance/context evidence under the contract above.

## Packet and final accounting

Packet: 250 rows; 166 HKCanCor-attested surfaces; 84 zero-hit surfaces; 1,327 exact matching tokens; 217 surface×raw-POS×Jyutping buckets; 301 concordance rows.

Final mutually exclusive partition:
- **129** `reviewed_selection`
- **43** `multiple`
- **29** `reading_split`
- **49** `blocked_atomic`
- **250/250** ranks accounted for exactly once.

## Zero-hit overlay

Of 84 zero-hit rows, **40** retain a positive lexical decision and **44** are `blocked_atomic`.

**37** positive zero-hit rows have an independent Cantonese lexical/category check in the #797 record or this consolidation:

`1255 象徵`, `1258 解決`, `1268 擦膠`, `1277 公眾`, `1279 毋`, `1283 必須`, `1286 民主黨`, `1292 收到`, `1297 言論`, `1300 波浪`, `1311 基本法`, `1330 瞭解`, `1332 權利`, `1343 失敗`, `1354 垂直`, `1360 城堡`, `1361 政黨`, `1362 冤`, `1363 效`, `1385 環保`, `1390 黨`, `1391 攪`, `1401 左手邊`, `1415 角色`, `1416 車主`, `1419 坦白`, `1422 法例`, `1440 票`, `1441 終審`, `1446 著`, `1447 賀`, `1449 椰`, `1459 劍`, `1479 引起`, `1486 回應`, `1499 果`, `1500 沾污`.

Three remain `source_only_pending_cantonese_confirmation` for typed atomic implementation: `1282 平排`, `1284 打直`, `1285 打斜`. They may retain neutral exact-surface coverage, but a later runtime task must not present them as independently category-verified lexical facts.

`1404 多少`: independent CantoDict evidence explicitly identifies `多少 do1 siu2` as Standard written Chinese rather than Cantonese and gives Cantonese `幾多`; later runtime reconciliation must treat it through the positive-contamination policy.

## Final rank ledger

Each rank appears exactly once. `Decision` is the implementation-facing lexical consequence; the class semantics above govern whether it becomes one typed default, multiple analyses, a reading correction/split, or no typed whole-surface analysis.

| Rank | Surface | Class | Decision |
|---:|---|---|---|
| 1251 | `畢業` | `reviewed_selection` | verb “graduate/finish a course” |
| 1252 | `剩` | `reading_split` | remain/be-left family; preserve standard/literary `sing6` and spoken/variant `zing6`; no category split solely from reading variation |
| 1253 | `幾大` | `blocked_atomic` | compositional interrogative/degree phrase; no typed whole-surface analysis |
| 1254 | `提供` | `reviewed_selection` | verb “provide” |
| 1255 | `象徵` | `multiple` | noun “symbol/emblem” + verb “symbolize/represent” |
| 1256 | `感情` | `reviewed_selection` | abstract noun “emotion/relationship/affection” |
| 1257 | `號` | `reading_split` | `hou6` number/designation/date/title family vs separate `hou4` howl/cry family |
| 1258 | `解決` | `reviewed_selection` | verb “solve/resolve” |
| 1259 | `試下` | `blocked_atomic` | compositional verb + delimitative/light `下`; no typed whole-surface analysis |
| 1260 | `熄` | `reviewed_selection` | verb “switch off/extinguish” |
| 1261 | `廠` | `reviewed_selection` | place/count noun “factory/works” |
| 1262 | `熟` | `reviewed_selection` | stative/property word “ripe/cooked/familiar” |
| 1263 | `適合` | `reviewed_selection` | stative/predicative “suitable/fit” |
| 1264 | `靚女` | `reviewed_selection` | person noun “pretty woman/girl” |
| 1265 | `儲` | `reading_split` | verb “store/save”; preserve colloquial `cou5` vs literary `cyu5` |
| 1266 | `應` | `reading_split` | `jing1` modal “should/ought to” vs `jing3` answer/respond family |
| 1267 | `戲` | `reviewed_selection` | count noun “play/show/drama” |
| 1268 | `擦膠` | `reviewed_selection` | noun `caat3 gaau1` “eraser” |
| 1269 | `禮物` | `reviewed_selection` | count noun “gift” |
| 1270 | `雞` | `reviewed_selection` | count noun “chicken”; slang/metaphorical nominal senses do not force a category split |
| 1271 | `懷疑` | `multiple` | verb “doubt/suspect” + noun “doubt/suspicion” |
| 1272 | `鐘意` | `reviewed_selection` | cognition verb “like/be fond of” |
| 1273 | `權` | `reviewed_selection` | abstract noun/bound root “right/authority/power” |
| 1274 | `鑑林` | `blocked_atomic` | unsupported rank string; no credible independent lexical item identified; no typed whole-surface analysis |
| 1275 | `三點` | `blocked_atomic` | compositional numeral + time/point expression; no typed whole-surface analysis |
| 1276 | `下邊` | `reading_split` | locality noun/localizer “below/under”; exact graph `下邊` uses `haa6 bin1`; do not conflate with `下便 haa6 bin6` |
| 1277 | `公眾` | `multiple` | noun “the public” + public modifier/distinguishing-word use; independent Words.hk evidence supports both |
| 1278 | `太過` | `reviewed_selection` | degree adverb/function “too/excessively” |
| 1279 | `毋` | `multiple` | formal/written negative function `mou4` + independently recorded surname/proper-name homograph |
| 1280 | `四十五度` | `blocked_atomic` | transparent numeral + degree/measure phrase; no typed whole-surface analysis |
| 1281 | `左下` | `blocked_atomic` | transparent lower-left locative composition; no typed whole-surface analysis |
| 1282 | `平排` | `reviewed_selection` | orientation/manner expression “side by side/in a row”; positive lexical decision remains evidence-strength qualified because the packet has zero exact hits |
| 1283 | `必須` | `reviewed_selection` | modal/necessity function “must/have to” |
| 1284 | `打直` | `reviewed_selection` | orientation/manner expression “vertically/upright”; positive lexical decision remains evidence-strength qualified because the packet has zero exact hits |
| 1285 | `打斜` | `reviewed_selection` | orientation/manner expression “diagonally/slanted”; positive lexical decision remains evidence-strength qualified because the packet has zero exact hits |
| 1286 | `民主黨` | `reviewed_selection` | organization/political-party proper noun; entity resolution is contextual |
| 1287 | `任` | `multiple` | lexical/formal verb “appoint/take office/allow” + surname/proper-name homograph; do not manufacture a free noun merely from glossing |
| 1288 | `再落` | `blocked_atomic` | transparent `再 + 落` sequence; no typed whole-surface analysis |
| 1289 | `多數` | `multiple` | noun/quantificational “majority/most” + adverb “usually/mostly” |
| 1290 | `好大` | `blocked_atomic` | degree + property phrase; no typed whole-surface analysis |
| 1291 | `好慘` | `blocked_atomic` | degree + property phrase; no typed whole-surface analysis |
| 1292 | `收到` | `reading_split` | ordinary receive/result family plus lexicalized discourse response `sau1 dou2` “received/understood”; do not freeze Cifu `dou3` as sole reading |
| 1293 | `有機` | `reviewed_selection` | property word “organic”; distinguish from transparent `有 + 機…` sequences |
| 1294 | `告` | `reviewed_selection` | formal verb “tell/inform/sue” |
| 1295 | `我估` | `blocked_atomic` | pronoun + cognition-verb clause fragment; no typed whole-surface analysis |
| 1296 | `我畫` | `blocked_atomic` | pronoun + verb clause fragment; no typed whole-surface analysis |
| 1297 | `言論` | `reviewed_selection` | abstract/count noun “speech/opinion/comment/discourse” |
| 1298 | `受到` | `reviewed_selection` | formal verb “receive/be subjected to” |
| 1299 | `咁上下` | `reviewed_selection` | stative/degree property expression “roughly that level/about so much/so-so” |
| 1300 | `波浪` | `reviewed_selection` | count/mass noun “wave(s)” |
| 1301 | `知有` | `blocked_atomic` | transparent cognition verb + existential/possessive verb sequence; no typed whole-surface analysis |
| 1302 | `阿哥` | `reviewed_selection` | kin/person noun “older brother” |
| 1303 | `後生` | `multiple` | stative/property “young” + person/collective noun “young person/young people” |
| 1304 | `後面` | `reviewed_selection` | spatial/temporal locality noun/localizer “behind/back/later”; adverbial placement alone does not make a separate ADV |
| 1305 | `計劃` | `multiple` | noun “plan/project” + verb “plan” |
| 1306 | `個害` | `blocked_atomic` | unsupported/data-quality rank string with no coherent standalone lexical item; no typed whole-surface analysis |
| 1307 | `唔好意思` | `reading_split` | lexicalized politeness/stative expression “sorry/excuse me; embarrassed/shy”; preserve independently documented `m4 hou2 ji3 si1` and `m4 hou2 ji3 si3` rather than treating either as the sole reading |
| 1308 | `租` | `multiple` | verb “rent/lease” + noun “rent/rental payment” |
| 1309 | `純粹` | `reading_split` | manner/focus adverb “purely/merely”; preserve independently documented `seon4 seoi5` and `seon4 seoi6` variation rather than allowing one source/register to erase the other |
| 1310 | `高度` | `reviewed_selection` | abstract/measure noun “height/altitude/degree”; written adverbial use does not by itself require another lexical category |
| 1311 | `基本法` | `reviewed_selection` | Basic Law proper title in entity use; generic “basic law” remains compositionally/contextually distinguishable |
| 1312 | `將個` | `blocked_atomic` | disposal/coverb `將` + classifier/determiner fragment; no typed whole-surface analysis |
| 1313 | `理論` | `reviewed_selection` | abstract/count noun “theory” |
| 1314 | `處` | `reading_split` | `cyu3` nominal “place/office/department”; colloquial `syu3~syu2` locality family; formal `cyu2/cyu5` verbal/bound families remain distinct |
| 1315 | `喊` | `reviewed_selection` | verb “cry/yell/shout/call out” |
| 1316 | `圍住` | `blocked_atomic` | resultative `圍 + 住` predicate; preserve constructional decomposition rather than fabricate a typed atomic whole |
| 1317 | `尊嚴` | `reviewed_selection` | abstract noun “dignity/honor” |
| 1318 | `發` | `multiple` | verb/bound “send/issue/develop/emit” + classifier/measure for shots/rounds |
| 1319 | `照` | `multiple` | verb “shine/photograph/reflect” + relation/coverb “according to” + noun “photo” where independently instantiated |
| 1320 | `落落` | `blocked_atomic` | unresolved reduplicated/literary string; no typed whole-surface analysis until context distinguishes productive reduplication from lexicalized use |
| 1321 | `資料` | `reviewed_selection` | mass/count noun “data/information/materials” |
| 1322 | `審` | `reviewed_selection` | formal verb “examine/investigate/try in court” |
| 1323 | `撳` | `reviewed_selection` | verb `gam6` “press/push down; restrain/extort” |
| 1324 | `複雜` | `reviewed_selection` | stative/property word “complicated/complex” |
| 1325 | `論` | `multiple` | verb “discuss/evaluate”, noun/bound “view/theory/discourse”, and formal relational/prepositional “regarding/in terms of” families are independently recorded; preserve multiple rather than letting one corpus verb token erase them |
| 1326 | `輪` | `multiple` | noun “wheel/round” + classifier for rounds/turns/round objects + verbal “rotate/take turns” family |
| 1327 | `遮` | `multiple` | verb “cover/screen/conceal” + Cantonese noun “umbrella” |
| 1328 | `靚仔` | `multiple` | noun “handsome guy/boy” + adjective “handsome/good/fine”, both ordinary `leng3 zai2`; reject Cifu/other-family `leng1` as a reading of this graph without turning the row into a reading-only class |
| 1329 | `鬧` | `reviewed_selection` | verb “scold/quarrel/make a disturbance” |
| 1330 | `瞭解` | `reviewed_selection` | cognition verb “understand/find out” |
| 1331 | `邊行` | `blocked_atomic` | compositional interrogative `邊` + polysemous `行`; no typed whole-surface analysis |
| 1332 | `權利` | `reviewed_selection` | abstract noun “right/privilege” |
| 1333 | `一晚` | `blocked_atomic` | transparent numeral + temporal noun/measure; no typed whole-surface analysis |
| 1334 | `一點` | `reviewed_selection` | conventional quantificational “a little/a bit”; literal “one point/dot/o’clock” readings remain compositional |
| 1335 | `人士` | `reviewed_selection` | person noun “person/figure” |
| 1336 | `上角` | `blocked_atomic` | transparent spatial phrase “upper corner”; no typed whole-surface analysis |
| 1337 | `上邊` | `reviewed_selection` | locative noun/localizer “above/on top/upper side” |
| 1338 | `下下` | `reading_split` | `haa5 haa5` distributive/temporal “every time/each instance”; do not inherit a plain classifier ontology |
| 1339 | `已` | `reviewed_selection` | formal/written temporal adverb “already” |
| 1340 | `不嬲` | `reviewed_selection` | habitual temporal adverb “always/all along” |
| 1341 | `公平` | `reviewed_selection` | stative/property predicate “fair/impartial” |
| 1342 | `冇所謂` | `reviewed_selection` | lexicalized idiomatic predicate “doesn’t matter / don’t care” |
| 1343 | `失敗` | `multiple` | verb “fail/be defeated” + event/result noun “failure” |
| 1344 | `申請` | `multiple` | verb “apply/request” + noun “application/request” |
| 1345 | `合格` | `reviewed_selection` | stative/result predicate “be qualified/pass” |
| 1346 | `安排` | `multiple` | verb “arrange/plan” + noun “arrangement/plan” |
| 1347 | `成張` | `blocked_atomic` | whole/degree modifier + classifier phrase; no typed whole-surface analysis |
| 1348 | `肉` | `reviewed_selection` | mass/count noun “meat/flesh/pulp” |
| 1349 | `自` | `reviewed_selection` | bound/formal reflexive/source morpheme; one corpus PRON tag does not license a broad free spoken pronoun entry |
| 1350 | `似乎` | `reviewed_selection` | epistemic/seeming predicate/adverbial “apparently/seem”; keep one broad lexical family rather than forcing packet VERB |
| 1351 | `即個` | `blocked_atomic` | unsupported/context-dependent segmentation string; no typed whole-surface analysis |
| 1352 | `吸引` | `reviewed_selection` | verb/property predicate “attract/be attractive”; packet `v/vn` alone does not independently establish a noun “attraction” |
| 1353 | `更` | `reading_split` | `gang3` degree adverb “more/even more” vs separate `gang1` change-family |
| 1354 | `垂直` | `reviewed_selection` | stative/property word “vertical/perpendicular” |
| 1355 | `奇怪` | `reviewed_selection` | stative/property word “strange/odd” |
| 1356 | `空間` | `reviewed_selection` | abstract/count noun “space” |
| 1357 | `阿婆` | `reviewed_selection` | person/kin noun “old woman/grandmother” |
| 1358 | `信佳` | `blocked_atomic` | unsupported/source-verification string; no typed whole-surface analysis |
| 1359 | `咬` | `reviewed_selection` | verb “bite” |
| 1360 | `城堡` | `reviewed_selection` | count noun “castle” |
| 1361 | `政黨` | `reviewed_selection` | organization noun “political party” |
| 1362 | `冤` | `multiple` | noun “injustice/grievance” + property/verb family “wronged/unjust” |
| 1363 | `效` | `reviewed_selection` | bound/formal morpheme `haau6` in effect/efficacy/imitative families; no independent support for separate free noun and verb entries |
| 1364 | `酒店` | `reviewed_selection` | place/business noun “hotel” with older restaurant/wine-shop senses inside the nominal family |
| 1365 | `區` | `reading_split` | `keoi1` common noun “area/district” vs `au1` surname/proper-name family |
| 1366 | `問我` | `blocked_atomic` | transparent verb + pronoun clause fragment; no typed whole-surface analysis |
| 1367 | `基本` | `reviewed_selection` | property/modifier “basic/fundamental” |
| 1368 | `教育` | `multiple` | verb “educate/teach” + abstract noun “education” |
| 1369 | `殺` | `reviewed_selection` | verb “kill” |
| 1370 | `毫子` | `reviewed_selection` | currency measure/classifier `hou4 zi2` “ten cents”; do not inherit mechanical NOUN |
| 1371 | `深` | `reviewed_selection` | stative/property word “deep/profound” |
| 1372 | `雀仔` | `reviewed_selection` | count noun “small bird/birdie” |
| 1373 | `創作` | `multiple` | verb “create/produce/write” + noun “creative work/creation” |
| 1374 | `幾喇` | `blocked_atomic` | interrogative/degree item + sentence-final particle sequence; no typed whole-surface analysis |
| 1375 | `朝頭早` | `reviewed_selection` | temporal noun/expression “morning / early in the morning” |
| 1376 | `無端端` | `reviewed_selection` | manner/discourse adverb “for no reason / out of nowhere” |
| 1377 | `越來` | `blocked_atomic` | incomplete/compositional comparative sequence, typically within `越嚟越…`; no typed whole-surface analysis |
| 1378 | `黃` | `multiple` | color property “yellow” + surname/proper-name homograph |
| 1379 | `搞錯` | `reviewed_selection` | lexical/resultative verb “make a mistake/get wrong” |
| 1380 | `資訊` | `reviewed_selection` | mass/abstract noun “information” |
| 1381 | `對方` | `reviewed_selection` | person/party noun “the other side/counterpart” |
| 1382 | `語言` | `reviewed_selection` | count/mass noun “language” |
| 1383 | `整體` | `reviewed_selection` | noun “whole/entity/overall body”; ordinary attributive use can derive from the nominal family |
| 1384 | `醒` | `reading_split` | `seng2` wake/regain-consciousness verb vs `sing2` give/treat verb and `sing2` smart/alert property family |
| 1385 | `環保` | `multiple` | adjective “eco-friendly/environmentally friendly” + noun abbreviation “environmental protection” |
| 1386 | `總` | `multiple` | adjective/totality, verb/gather-total, and adverb “always/overall/in every case” families are independently lexical; keep multiple |
| 1387 | `講個` | `blocked_atomic` | compositional verb + classifier/determiner fragment; no typed whole-surface analysis |
| 1388 | `轉個` | `blocked_atomic` | compositional verb + classifier/determiner fragment; no typed whole-surface analysis |
| 1389 | `證明` | `reviewed_selection` | verb “prove/verify/testify”; do not add a noun solely from English glossing |
| 1390 | `黨` | `multiple` | noun “party/gang/faction” + verb “be partial/take sides”; preserve both independently recorded categories |
| 1391 | `攪` | `reviewed_selection` | verb `gaau2` “stir/disturb/mix”, variant family with `搞` where senses overlap |
| 1392 | `一次過` | `reviewed_selection` | lexicalized adverb “all at once/in one go” |
| 1393 | `一百蚊` | `blocked_atomic` | compositional numeral + currency measure phrase; no typed whole-surface analysis |
| 1394 | `乜鬼` | `blocked_atomic` | conventional `mat1 gwai2` “what the heck” is attested, but independent linguistic research analyzes expressive `gwai2 鬼` as a productive morpheme modifying wh-pronouns and other expressions; preserve that internal structure rather than fabricating an opaque whole-surface lexeme |
| 1395 | `上年` | `reading_split` | temporal noun/expression “last year”; exact reading `soeng6 nin2` |
| 1396 | `不斷` | `reading_split` | adverb `bat1 dyun6` “continuously/constantly”; do not add a separate adjective from packet/gloss projection |
| 1397 | `之類` | `reading_split` | listing suffix/expression “and the like/and so on”; preserve both independently listed `zi1 leoi6` and `zi1 leoi2` |
| 1398 | `冇用` | `reviewed_selection` | stative predicate/property “useless/of no use” |
| 1399 | `片` | `reading_split` | `pin2` noun family “film/video/scan/diaper” vs `pin3` classifier for slices/tracts/broad scenes |
| 1400 | `右下方` | `blocked_atomic` | transparent lower-right locative phrase; no typed whole-surface analysis |
| 1401 | `左手邊` | `reviewed_selection` | lexicalized spatial/localizer noun expression `zo2 sau2 bin1` “left-hand side” |
| 1402 | `印椰樹` | `blocked_atomic` | unsupported/source-verification string; no typed whole-surface analysis |
| 1403 | `地點` | `reviewed_selection` | place noun “location/site/venue” |
| 1404 | `多少` | `blocked_atomic` | positive non-Cantonese contamination: CantoDict marks `多少 do1 siu2` Standard written Chinese, not Cantonese, with Cantonese `幾多`; no Cantonese typed whole-surface analysis |
| 1405 | `多次` | `blocked_atomic` | transparent quantifier + event-frequency measure phrase; no typed whole-surface analysis |
| 1406 | `多個` | `blocked_atomic` | transparent quantifier + classifier phrase; no typed whole-surface analysis |
| 1407 | `好處` | `reviewed_selection` | abstract/count noun “benefit/advantage” |
| 1408 | `存在` | `reviewed_selection` | verb “exist/be present” |
| 1409 | `有趣` | `reviewed_selection` | stative/property word “interesting/amusing” |
| 1410 | `老實` | `reviewed_selection` | stative/property word “honest/sincere” |
| 1411 | `艾爾頓` | `reading_split` | proper-name transliteration; `aai6 ji5 deon6` |
| 1412 | `何` | `multiple` | surname/proper-name `Ho` + formal interrogative function “what/how/why/which”; archaic carry sense not promoted here |
| 1413 | `冷氣` | `reviewed_selection` | mass noun “air conditioning/cool air” |
| 1414 | `沖` | `reviewed_selection` | verb “rinse/flush/infuse/rush against” |
| 1415 | `角色` | `reviewed_selection` | count/abstract noun “role/character” |
| 1416 | `車主` | `reviewed_selection` | person noun “vehicle/car owner” |
| 1417 | `亞視` | `reading_split` | proper organization name “ATV/Asia Television”; `aa3 si6` |
| 1418 | `依家` | `reviewed_selection` | temporal “now”, orthographic variant of `而家`; `ji1 gaa1` |
| 1419 | `坦白` | `multiple` | stative adjective “frank/honest” + verb “confess/state frankly”; adverbial placement can derive unless syntax later requires another split |
| 1420 | `姓` | `multiple` | noun “surname” + verb “have the surname/be surnamed” |
| 1421 | `明顯` | `reviewed_selection` | property word “obvious/clear”; clause-modifying use does not independently establish a separate lexical adverb |
| 1422 | `法例` | `reviewed_selection` | count noun “law/statute/regulation” |
| 1423 | `波` | `reviewed_selection` | count noun family “ball/wave/typhoon” |
| 1424 | `花` | `multiple` | noun “flower” + verb “spend/use up” + adjective “multicoloured/scratched/dirty” + productive suffix/bound family |
| 1425 | `金` | `multiple` | noun/mass noun “gold/money” + productive bound/attributive “gold/golden” family |
| 1426 | `約` | `multiple` | noun “appointment/agreement” + verb “arrange/restrict” + approximation adverb “about” |
| 1427 | `訂` | `reading_split` | `deng6` free verb “order/book/subscribe/reserve” vs `ding3` formal/bound “conclude/set/draw up” |
| 1428 | `迫` | `reading_split` | ordinary `bik1` verb “force/press” and crowded/pressing property vs specialized `baak1` slang execution verb |
| 1429 | `重新` | `reviewed_selection` | adverb “again/anew” |
| 1430 | `音樂` | `reviewed_selection` | noun “music” |
| 1431 | `音響` | `reviewed_selection` | noun “audio/sound system/acoustics” |
| 1432 | `個意` | `blocked_atomic` | classifier + noun fragment; no typed whole-surface analysis |
| 1433 | `家姐` | `reading_split` | noun `gaa1 ze1` “elder sister”; reject Cifu `ze2` for the ordinary Cantonese word |
| 1434 | `恐怖` | `multiple` | stative adjective “frightening/terrible” + abstract noun “terror/horror”; no standalone “terrorist” noun |
| 1435 | `捉` | `reading_split` | verb `zuk1` “catch/grab”; Cifu `zuk3` remains unverified and is not promoted |
| 1436 | `時話` | `blocked_atomic` | zero-hit/no-definition string with unclear segmentation; no typed whole-surface analysis |
| 1437 | `除非` | `reviewed_selection` | conditional conjunction “unless/only if” |
| 1438 | `情` | `reviewed_selection` | noun/bound noun “feeling/emotion/situation” |
| 1439 | `排隊` | `reviewed_selection` | verb “line up/queue” |
| 1440 | `票` | `reviewed_selection` | noun “ticket/note/vote” |
| 1441 | `終審` | `reviewed_selection` | legal noun/bound nominal “final adjudication/final appeal” |
| 1442 | `竟然` | `reviewed_selection` | modal/evaluative adverb “unexpectedly/to one’s surprise” |
| 1443 | `就畫` | `blocked_atomic` | transparent function/adverb + verb phrase; no typed whole-surface analysis |
| 1444 | `提出` | `reviewed_selection` | verb “raise/propose/put forward” |
| 1445 | `答案` | `reviewed_selection` | noun “answer/solution” |
| 1446 | `著` | `reading_split` | graph-family split: preserve literary/bound `zyu3` writing/works/notability family and separate `zoek3` wear plus independently attested `zoek6` lexical families |
| 1447 | `賀` | `multiple` | verb `ho6` “congratulate/celebrate” + surname/proper-name family; preserve the independently recorded homograph |
| 1448 | `黑` | `reading_split` | black/dark/unlucky adjective family with independently recorded `haak1`/`hak1` pronunciation variation; do not invent a separate “hack” verb from the reading difference; the English loan `hack` is separately `hek1` |
| 1449 | `椰` | `reviewed_selection` | noun/bound noun “coconut/coconut palm” |
| 1450 | `落返` | `blocked_atomic` | transparent motion verb + restitutive/directional `返`; no typed whole-surface analysis |
| 1451 | `過個` | `blocked_atomic` | transparent `過 + 個` sequence; no typed whole-surface analysis |
| 1452 | `隔` | `reviewed_selection` | verb/relational predicate `gaak3` “separate/be apart/lie between” |
| 1453 | `電影` | `reviewed_selection` | noun `din6 jing2` “movie/film” |
| 1454 | `寧願` | `reading_split` | preference split: `ning4 jyun2` predicate “would rather/prefer” vs `ning4 jyun6`/changed-tone modal-adverb function |
| 1455 | `摺` | `reviewed_selection` | verb `zip3` “fold/bend”; folded result-state uses do not force another lexeme |
| 1456 | `盡` | `multiple` | verb “use up/exhaust” + adverb/degree “to the utmost/as much as possible” + end/limit nominal/localizer family |
| 1457 | `福利` | `reviewed_selection` | noun `fuk1 lei6` “welfare/benefits/well-being” |
| 1458 | `與` | `multiple` | formal conjunction/relational function “and/with” + independently attested verb/preposition families at `jyu5` |
| 1459 | `劍` | `reviewed_selection` | noun `gim3` “sword” |
| 1460 | `層` | `multiple` | classifier `cang4` for floors/layers + noun “layer/storey” |
| 1461 | `數` | `reading_split` | `sou2` verb “count/enumerate/criticize by listing” vs `sou3` noun “number/figure/amount” |
| 1462 | `樓` | `reading_split` | `lau2` common free noun “building/flat/floor” vs `lau4` surname/proper/bound compound reading family |
| 1463 | `膠袋` | `reading_split` | noun `gaau1 doi2` “plastic bag”; `doi6` belongs to verb `袋`, not this compound noun |
| 1464 | `諗法` | `reviewed_selection` | noun `nam2 faat3` “way of thinking/opinion/idea” |
| 1465 | `質素` | `reviewed_selection` | abstract noun `zat1 sou3` “quality/standard” |
| 1466 | `選` | `reviewed_selection` | verb `syun2` “choose/select/elect” |
| 1467 | `錄` | `reviewed_selection` | verb `luk6` “record/copy”; nominal record/register sense is not added without direct evidence |
| 1468 | `講番` | `blocked_atomic` | verb `講` + restitutive/repetitive `番`; no typed whole-surface analysis |
| 1469 | `點會` | `blocked_atomic` | interrogative `點` + modal `會` rhetorical/question construction; no typed whole-surface analysis |
| 1470 | `醫療` | `reviewed_selection` | noun `ji1 liu4` “medical treatment/healthcare” |
| 1471 | `贊成` | `reviewed_selection` | verb `zaan3 sing4` “approve/support/endorse” |
| 1472 | `曬` | `reviewed_selection` | verb `saai3` “sun/dry/sunbathe”; loan share-files sense remains a same-POS lexical extension; distinct from grammatical `晒` |
| 1473 | `一本` | `blocked_atomic` | numeral + classifier; no typed whole-surface analysis |
| 1474 | `一座` | `blocked_atomic` | numeral + classifier; no typed whole-surface analysis |
| 1475 | `下角` | `blocked_atomic` | transparent spatial locality expression “lower corner”; preserve composition rather than atomic typing |
| 1476 | `大隻` | `reviewed_selection` | lexicalized stative predicate “big-built/large-bodied/strong” |
| 1477 | `女皇` | `reviewed_selection` | common person/title noun “queen/empress”; not a proper noun merely from packet projection |
| 1478 | `五點` | `blocked_atomic` | numeral + time measure; no typed whole-surface analysis |
| 1479 | `引起` | `reviewed_selection` | verb “cause/give rise to/arouse” |
| 1480 | `心理` | `reviewed_selection` | noun/bound modifier family “psychology/mental state; mental/psychological”; do not create a second adjective solely from attributive distribution |
| 1481 | `文化` | `reviewed_selection` | noun “culture/civilization”; cultural modifier use is nominal/bound and does not require a separate adjective |
| 1482 | `毛` | `multiple` | noun “hair/fur” + monetary measure/classifier family; surname/proper use remains separate where independently needed |
| 1483 | `右畫` | `blocked_atomic` | directional modifier + `畫`; no typed whole-surface analysis |
| 1484 | `再畫` | `blocked_atomic` | adverb + verb; no typed whole-surface analysis |
| 1485 | `各` | `reviewed_selection` | distributive determiner/quantifier “each/every” |
| 1486 | `回應` | `multiple` | noun “response” + verb “respond/reply”; independently attested as N/V despite zero packet hits |
| 1487 | `好貴` | `blocked_atomic` | degree modifier + stative adjective; no typed whole-surface analysis |
| 1488 | `有關` | `reviewed_selection` | one relational verb family `jau5 gwaan1` “be related to/concern”; pre-nominal “relevant” use is covered by the same lexical entry |
| 1489 | `行業` | `reviewed_selection` | noun `hong4 jip6` “industry/trade” |
| 1490 | `初初` | `reviewed_selection` | temporal adverb “at first/initially” |
| 1491 | `困難` | `multiple` | noun “difficulty/problem” + stative adjective “difficult” |
| 1492 | `每個` | `blocked_atomic` | distributive quantifier + classifier; no typed whole-surface analysis |
| 1493 | `沙` | `multiple` | noun “sand/granules” + independently recorded adjective “hoarse/husky (of voice)” at `saa1`; preserve both |
| 1494 | `角度` | `reviewed_selection` | noun “angle/point of view” |
| 1495 | `事實上` | `reviewed_selection` | discourse/adverbial expression “in fact/actually” |
| 1496 | `佬` | `multiple` | person noun “man/male” + productive colloquial person suffix |
| 1497 | `或` | `multiple` | formal conjunction `waak6` “or” + adverb `waak6` “possibly” |
| 1498 | `拍拖` | `reviewed_selection` | verb “date/be in a romantic relationship” |
| 1499 | `果` | `multiple` | graph `果 gwo2` has independently recorded noun “fruit/result”, adverbial “surely/really”, verbal “stuff/succeed”, and surname families; do not conflate with demonstrative `嗰` |
| 1500 | `沾污` | `reviewed_selection` | written/formal verb `zim1 wu1` “stain/soil/defile” |

## Explicit conflict audit

The following rows materially differed across the broad summary and detailed passes. Their final decisions are the rows above; this list records the thread collision that R3 supersedes.

| Rank | Surface | Broad input | Detailed input |
|---:|---|---|---|
| 1289 | `多數` | `5275370635` | `5275384123` |
| 1299 | `咁上下` | `5275370635` | `5275384123` |
| 1303 | `後生` | `5275370635` | `5275417104` |
| 1306 | `個害` | `5275370635` | `5275417104` |
| 1307 | `唔好意思` | `5275370635` | `5275417104` |
| 1309 | `純粹` | `5275370635` | `5275417104` |
| 1316 | `圍住` | `5275370635` | `5275417104` |
| 1320 | `落落` | `5275370635` | `5275417104` |
| 1325 | `論` | `5275370635` | `5275417104` |
| 1328 | `靚仔` | `5275370635` | `5275483335` |
| 1334 | `一點` | `5275370635` | `5275483335` |
| 1343 | `失敗` | `5275370635` | `5275483335` |
| 1346 | `安排` | `5275370635` | `5275483335` |
| 1349 | `自` | `5275370635` | `5275483335` |
| 1350 | `似乎` | `5275370635` | `5275483335` |
| 1351 | `即個` | `5275370635` | `5275602678` |
| 1352 | `吸引` | `5275370635` | `5275602678` |
| 1358 | `信佳` | `5275370635` | `5275602678` |
| 1362 | `冤` | `5275370635` | `5275602678` |
| 1363 | `效` | `5275370635` | `5275602678` |
| 1370 | `毫子` | `5275370635` | `5275602678` |
| 1386 | `總` | `5275370635` | `5275642951` |
| 1389 | `證明` | `5275370635` | `5275642951` |
| 1394 | `乜鬼` | `5275370635` | `5275642951` |
| 1395 | `上年` | `5275370635` | `5275642951` |
| 1396 | `不斷` | `5275370635` | `5275642951` |
| 1397 | `之類` | `5275370635` | `5275642951` |
| 1401 | `左手邊` | `5275370635` | `5275713059` |
| 1402 | `印椰樹` | `5275370635` | `5275713059` |
| 1419 | `坦白` | `5275370635` | `5275713059` |
| 1420 | `姓` | `5275370635` | `5275713059` |
| 1421 | `明顯` | `5275370635` | `5275713059` |
| 1434 | `恐怖` | `5275370635` | `5275773265` |
| 1436 | `時話` | `5275370635` | `5275773265` |
| 1446 | `著` | `5275370635` | `5275773265` |
| 1448 | `黑` | `5275370635` | `5275773265` |
| 1458 | `與` | `5275370635` | `5275816030` |
| 1475 | `下角` | `5275370635` | `5275816030` |
| 1480 | `心理` | `5275370635` | `5275857514` |
| 1481 | `文化` | `5275370635` | `5275857514` |
| 1488 | `有關` | `5275370635` | `5275857514` |
| 1493 | `沙` | `5275370635` | `5275857514` |
| 1497 | `或` | `5275370635` | `5275857514` |

## Independent source checks added/preserved during consolidation

- `1276 下邊` — [CC-Canto](https://cantonese.org/search.php?q=%E4%B8%8B): exact graph `下邊` listed as `haa6 bin1`; distinguish Words.hk `下便 haa6 bin6`.
- `1277 公眾` — [Words.hk](https://words.hk/zidin/公眾): noun “the public” + 區別詞/public modifier.
- `1279 毋` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/search/?searchtype=1&text=毋): formal negative function plus Chinese surname/proper-name homograph.
- `1286 民主黨` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/3758/): `man4 zyu2 dong2` Democratic Party formation.
- `1297 言論` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/5337/): `jin4 leon6` expression/opinion noun.
- `1300 波浪` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/3460/): `bo1 long6` wave noun.
- `1307 唔好意思` — [Words.hk](https://words.hk/zidin/唔好意思) and [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/1830/): conventional Cantonese expression with both `si1` and `si3` independently recorded.
- `1309 純粹` — Words.hk Cantonese examples use `seon4 seoi5`; [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/2836/) records `seon4 seoi6`. Preserve both as independently attested reading/register variation.
- `1311 基本法` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/496/): `gei1 bun2 faat3` Basic Law formation.
- `1325 論` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/995/) / [Words.hk](https://words.hk/zidin/論): verb + noun/bound theory/view + relational/prepositional families.
- `1328 靚仔` — [Words.hk](https://words.hk/zidin/靚仔): noun and adjective, both ordinary `leng3 zai2`.
- `1330 瞭解` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/569/): `liu5 gaai2` verb “understand”.
- `1332 權利` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/4017/): `kyun4 lei6` right/entitlement noun.
- `1343 失敗` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/2082/): fail/lose + failure/loss, supporting verbal and nominal use.
- `1354 垂直` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/7749/): `seoi4 zik6` vertical/perpendicular property.
- `1360 城堡` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/434/): `sing4 bou2` castle noun.
- `1361 政黨` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/5967/): `zing3 dong2` political-party noun.
- `1385 環保` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/13483/): adjective eco-friendly + noun environmental protection.
- `1390 黨` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/3758/): noun party/faction + verb take sides.
- `1391 攪` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/2150/): verb `gaau2` disturb/stir.
- `1394 乜鬼` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/27004/) confirms the conventional exact expression; Words.hk documents productive emphatic `鬼` in `乜鬼`, `咩鬼`, `乜鬼嘢`, `邊鬼個`, `點鬼樣`, etc.; Winterstein, Lai & Luk, “Denials and Negative Emotions: A Unified Analysis of the Cantonese Expressive Gwai2” (2018) independently treats expressive `gwai2` as modifying wh-pronouns among other categories; Ye, *Cross-categorical Intensification: The Case of Cantonese -gwai2* (Ohio State MA thesis, 2021) independently analyzes productive bound `-gwai2`. Together these support conventionality without an opaque atomic whole-surface analysis.
- `1404 多少` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/1968/): explicitly Standard written Chinese, not Cantonese; Cantonese counterpart 幾多.
- `1415 角色` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/角/): `gok3 sik1` role formation.
- `1416 車主` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/13713/): `ce1 zyu2` vehicle-owner noun.
- `1419 坦白` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/8982/): adjective frank + verb confess.
- `1422 法例` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/words/13655/): `faat3 lai6` legal-regulation noun.
- `1440 票` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/1014/): noun `piu3` ticket/vote/invoice/banknote.
- `1441 終審` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/1095/): `zung1 sam2` final judgment/hearing; attested in 終審法院.
- `1447 賀` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/3318/): verb congratulate/celebrate + surname family.
- `1448 黑` — [Words.hk](https://words.hk/zidin/黑): black/dark/unlucky adjective family with `haak1`/`hak1` pronunciation variation; [Words.hk `hack`](https://words.hk/zidin/hack) separately records the English loan as `hek1`, so `hak1` does not create a separate hack analysis of `黑`.
- `1449 椰` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/2287/): noun `je4` coconut/coconut palm.
- `1459 劍` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/209/): noun `gim3` sword.
- `1479 引起` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/1031/): `jan5 hei2` “give rise to”.
- `1493 沙` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/39/): noun sand/granules + adjective hoarse/husky.
- `1499 果` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/391/): noun + adverbial + verbal + surname families at `gwo2`.
- `1500 沾污` — [CantoDict](https://www.cantonese.sheik.co.uk/dictionary/characters/978/): `zim1 wu1` is independently listed under 污 compounds.

## Implementation boundary

This record authorizes no runtime change by itself. A separate runtime-reconciliation intake must compare against then-current `main`, preserve stable lexical-analysis IDs and richer pre-existing independently supported analyses, apply the regression-debt ratchet, preserve neutral coverage for genuine Cantonese `blocked_atomic`/pending rows where appropriate, and treat `1404 多少` through the positive-contamination policy.

The later implementation must not create typed analyses for `1282 平排`, `1284 打直`, or `1285 打斜` until category-level Cantonese evidence is strengthened.

## Validation

- ranks 1251–1500: **250/250**, each exactly once;
- classes mutually exclusive: **yes**;
- final counts: **129/43/29/49**;
- zero-hit overlay: **40 positive / 44 blocked**, with **37** independently checked positive rows and **3** pending typed confirmation;
- known thread conflicts explicitly accounted for;
- no Cifu definition/Jyutping or raw HKCanCor/UD tag used as final lexical authority;
- no runtime/parser/test/version/generated-output/state change authorized.