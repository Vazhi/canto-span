# Issue #858 — Cifu ranks 251–500 lexical adjudication consolidation R1

## Purpose

This record consolidates the expert lexical/POS decisions attached to closed issue #793 into one authoritative decision source for Cifu SpokenAdult ranks 251–500. It changes no runtime lexicon, parser behavior, executable tests, construction identity/status, survey/native-panel state, corpus classification, release state, or deployment state.

The mechanical evidence packet remains the four-file packet merged by PR #816 under `external-evidence/lexical-pos/cifu-top-2000/ranks-0251-0500/`. Cifu rank and exact surface remain discovery/frequency evidence only. Cifu definitions and Jyutping retain zero independent Cantonese lexical-semantic/POS authority. The frozen Rime-Cantonese layer may corroborate orthography/readings only and has zero independent POS, semantic, lexicality, or frequency authority.

## Conflict-resolution rule

Comment chronology records provenance; it is not automatic linguistic precedence. The #793 thread contains both a broad ranks-276–500 expert completion (`5275326520`) and later 25-rank passes. This ledger resolves them by evidence quality:

1. Ranks 251–275 use `5269635193` as the base, with explicit correction `5275210373` for ranks 264, 265, and 267 and final closure `5275475476` for ranks 257, 259, 260, 263, and 268.
2. Ranks 276–500 use the broad accepted expert specification `5275326520` together with detailed passes `5275369885`, `5275410012`, `5275479289`, `5275598448`, `5275637054`, `5275709010`, `5275770026`, `5275811943`, and `5275854013`.
3. A later pass supersedes an earlier decision only when it explicitly corrects it or supplies stronger independent evidence. A later retreat caused only by a zero-hit or sparse mechanical packet does not erase independently documented Cantonese lexical evidence already attached to the earlier decision.
4. Exact orthography matters. In particular, traditional `只 zi2` is not assigned the classifier analysis of distinct traditional `隻 zek3` merely because simplified orthography can conflate them.
5. Transparent internal structure does not by itself block a whole-form lexical analysis when independent Cantonese lexical sources list the exact form. This is decisive for forms such as `諗住`, `今次`, `唔記得`, `出去`, and `入去`.
6. Conversely, a frequency row does not make a transparent or malformed string an atomic lexical item. `blocked_atomic` therefore remains appropriate where no independent whole-form lexical evidence justifies atomic treatment.
7. Genuine reading, category, and function distinctions are preserved rather than collapsed to one default analysis.

Fresh conflict checks for this consolidation used independent Cantonese lexical sources only where the #793 comments materially disagreed. They confirm, among other points, `得到 dak1 dou3`, `今次 gam1 ci3`, `唔記得 m4 gei3 dak1`, `扮 baan6`, exact `只 zi2` versus `隻 zek3`, lexical `諗住`, lexical/function uses of `出去` and `入去`, and the documented reading/category distinctions retained below. These checks supplement the #793 record; they do not give Cifu or Rime any additional evidentiary authority.

`research_required` below means independent evidence is still insufficient for a stronger lexical decision. `blocked_atomic` means do not manufacture an atomic lexical POS analysis for the whole string. `multiple`, `reading_split`, and `reading_variation` mean downstream runtime reconciliation must preserve the independently supported distinctions rather than collapse them to one default analysis.

## Final rank ledger

### Ranks 251–275

- **251 路 — reviewed_selection:** noun/place-path `lou6` “road/route/way”; packet `lou2` is not promoted without contextual support.
- **252 團 — multiple:** collective/count noun plus classifier/measure use.
- **253 機場 — reviewed_selection:** place noun.
- **254 之間 — reviewed_selection:** relational/spatial localizer expression “between/among”; UD `ADV` is distributional, not ontology.
- **255 食 — reviewed_selection:** lexical verb.
- **256 啱啱 — reading_variation:** temporal adverb “just now”; preserve `ngaam1 ngaam1` / `aam1 aam1` pronunciation variation.
- **257 唉 — reading_split:** interjection with independently supported `aai1`, `oi1`, and regret/pity `aai6`; packet `aai5` is not promoted merely from corpus prosody.
- **258 梗係 — reviewed_selection:** certainty/discourse adverbial “of course”.
- **259 哎 — reading_split:** interjection; `aai1` is the standard documented reading and `ai1` a rarer independently documented reading; packet `aai5/ai2/ai3` are not promoted without independent support.
- **260 蛇 — multiple:** noun `se4` “snake” plus colloquial verb `se4` “slack off/shirk at work”.
- **261 枉 — reviewed_selection:** adverbial/stative lexical item “in vain/wrongly”.
- **262 高 — reviewed_selection:** stative/adjectival property “high/tall”.
- **263 擰 — reading_split:** `ning6` “twist/turn with force; screw”, `ning4` “wring”, plus independently documented colloquial `ning1` spelling/reading for `拎` “carry/hold”; these are sense-linked readings.
- **264 打 — reading_split:** `daa2` lexical verb versus `daa1` measure word/classifier “dozen”.
- **265 丸 — reading_variation:** noun “pellet/ball/pill” with `jyun2` colloquial and `jyun4` literary readings.
- **266 公園 — reviewed_selection:** place noun.
- **267 玩 — reading_split:** `waan2` free lexical verb “play/have fun”; `wun6` is a bound morpheme in forms such as `玩具`/`玩意`, not a co-equal free verb.
- **268 隔離 — reviewed_selection:** verb `gaak3 lei4` “isolate/separate” only for this orthography; neighboring/next-door `隔籬` is a distinct homophonous lexical item.
- **269 寫 — reviewed_selection:** lexical verb.
- **270 屋企 — reviewed_selection:** noun/place “home”.
- **271 幫 — multiple:** lexical verb “help/assist” plus benefactive coverb/function “for/on behalf of”.
- **272 搞 — reviewed_selection:** lexical verb.
- **273 葡萄 — reviewed_selection:** count noun.
- **274 往 — multiple/function:** directional relation/motion item with verbal/directional-coverb behavior; do not flatten to generic UD `VERB`.
- **275 淨係 — reviewed_selection:** focus adverb/function “only”.

### Ranks 276–300

- **276 迷宮 — reviewed_selection:** count/place noun “maze/labyrinth”.
- **277 份 — reading_split:** `fan6` classifier/measure for complete units or portions versus `fan2` noun “share/participation/role/entitlement”.
- **278 底 — reviewed_selection:** spatial/relational localizer-noun “bottom/base/underlying part”; related bound temporal uses remain within the nominal/localizer family unless later syntax requires a split.
- **279 宅 — reviewed_selection:** bound/formal nominal root “residence/home”.
- **280 次 — reviewed_selection:** event classifier/measure “time/occurrence”; ordinal/bound uses remain related morphology.
- **281 為 — reading_split:** `wai6` preposition/coverb “for/because of/for the sake of” versus formal `wai4` relation/function “as/become/be treated as”; independently attested `wai4` tally/calculation verbal uses remain a distinct lexical family.
- **282 腰 — reviewed_selection:** body-part noun “waist/lower back”.
- **283 車站 — reviewed_selection:** place noun “station/stop”.
- **284 以前 — reviewed_selection:** temporal localizer/noun-like expression “before/formerly”; adverbial placement does not require a separate generic ADV lexeme.
- **285 係噉 — blocked_atomic:** copular plus manner/demonstrative discourse phrase; no single atomic POS.
- **286 差唔多 — multiple:** stative/predicative “similar/about the same” plus approximation adverbial “almost/about”.
- **287 開 — multiple:** lexical verb “open/start/turn on” plus productive resultative/directional-complement function; complement behavior is not an arbitrary generic particle POS.
- **288 魚排 — reviewed_selection:** noun `jyu4 paai4`, the Hong Kong mariculture/fish-farm raft sense independently documented in the earlier expert review; Cifu’s “fish steak” gloss has no authority to replace that Cantonese lexical sense.
- **289 諗住 — reviewed_selection:** lexical verb `nam2 zyu6` “plan/intend”; independent Cantonese lexical listing outweighs a compositionality-only objection to whole-form analysis.
- **290 另外 — multiple:** discourse connective/adverb “besides/in addition” plus determiner/pronominal “another/other”.
- **291 科技 — reviewed_selection:** abstract/mass noun “science and technology”.
- **292 月 — reviewed_selection:** nominal family covering temporal/count “month” and celestial “moon”.
- **293 仲 — reviewed_selection:** adverb `zung6` “still/also/in addition”; the packet’s isolated adjective tag is not final ontology.
- **294 問 — reviewed_selection:** lexical verb “ask”.
- **295 萍 — reviewed_selection:** nominal/bound root “duckweed”; proper-name uses are not added from zero packet evidence.
- **296 唔同 — reviewed_selection:** stative/predicative property “different/not the same”; distributional tags do not create four lexical POS entries.
- **297 條線 — blocked_atomic:** transparent classifier plus noun phrase.
- **298 會見 — reviewed_selection:** formal lexical verb `wui6 gin3` “meet/interview formally”; no event-noun analysis from English paraphrase alone.
- **299 起點 — reviewed_selection:** count/abstract noun “starting point/origin”.
- **300 瞓 — reviewed_selection:** lexical verb “sleep”.

### Ranks 301–325

- **301 賣 — reviewed_selection:** lexical verb “sell”.
- **302 希望 — multiple:** cognition/desiderative verb “hope/wish” plus abstract noun “hope/prospect”; modal-like clausal uses belong to the verbal family.
- **303 其他 — multiple/function:** pronoun-determiner family covering nominal “the others” and attributive “other X”.
- **304 十 — reviewed_selection:** numeral ten.
- **305 南 — reviewed_selection:** cardinal-direction noun/locality root “south”.
- **306 今日 — reviewed_selection:** temporal noun/time expression “today”, not a lexical adverb merely because of syntactic position.
- **307 吔 — multiple/function:** interjection/particle family `jaa3`; pragmatic functions remain distinct rather than forcing one packet tag.
- **308 滑雪 — reviewed_selection:** lexical activity verb “ski”; event nominalization may remain compositional unless independently required.
- **309 新 — reviewed_selection:** stative/adjectival property/modifier “new”.
- **310 明白 — multiple:** cognition verb “understand/realize” plus stative/property “clear/obvious”.
- **311 等等 — multiple:** lexical/reduplicated verb “wait/hold on” plus list-continuation function “etcetera/and so on”.
- **312 中 — reading_split:** `zung1` middle/inside/central and China-related nominal/bound families versus `zung3` verb “hit/be hit/win/suffer”.
- **313 定係 — reviewed_selection:** alternative-question conjunction/function “or”.
- **314 電話 — reviewed_selection:** count noun “telephone/phone call”.
- **315 冇錯 — reviewed_selection:** lexicalized stative/discourse predicate/expression “correct/that’s right”.
- **316 原來 — reviewed_selection:** discovery/evidential adverb “as it turns out/originally”.
- **317 根本 — multiple:** noun/bound “root/foundation/basis” plus emphatic/discourse adverb “fundamentally/simply/(not) at all”.
- **318 盛 — reading_split:** `sing6` stative/adjectival flourishing, prosperous, grand, or abundant family versus `sing4` verbal fill/ladle/accommodate family; preserve the reading-linked distinction.
- **319 燕 — reading_split:** `jin3` bird noun “swallow” versus `jin1` Yan historical/proper-name family.
- **320 大概 — reviewed_selection:** epistemic/approximation adverb “probably/roughly/about”.
- **321 工廠 — reviewed_selection:** place/count noun “factory”.
- **322 同學 — reviewed_selection:** person noun “classmate/fellow student”.
- **323 快 — reviewed_selection:** stative/adjectival property “fast/quick”; manner distribution alone does not require another lexical POS.
- **324 傻 — reviewed_selection:** stative/adjectival property “foolish/silly”.
- **325 算 — reviewed_selection:** lexical verb “calculate/count/regard as”; discourse extensions remain verbal unless independently split.

### Ranks 326–350

- **326 請 — reading_variation:** lexical verb/request function; preserve `ceng2` and `cing2` where context/register supports them.
- **327 之前 — reviewed_selection:** temporal noun/localizer “before/prior to”; ADV projection reflects distribution.
- **328 只 — reviewed_selection/function:** exact traditional surface `只 zi2` is the adverb/function “only/merely”; classifier `zek3` belongs to distinct traditional `隻` and must not be imported as a lexical analysis of `只` from simplified-character conflation.
- **329 可 — reviewed_selection:** formal/written modal/property-function “can/may/permissible”; retain conservatively as a function/bound lexical item.
- **330 有時 — reviewed_selection:** frequency adverb “sometimes”.
- **331 意思 — reviewed_selection:** abstract noun “meaning/idea/intention”.
- **332 仲有 — multiple/function:** discourse/additive expression “also/furthermore” remains distinguishable from compositional `仲 + 有`; packet verb-only tagging is not final ontology.
- **333 唧 — reading_split_required:** packet evidence is dominated by `zek1` particle-like use while verbal squeeze/tickle evidence belongs to a separate `zit1/zik1` reading family; preserve the distinction.
- **334 陪 — reviewed_selection:** lexical verb “accompany”.
- **335 一齊 — reviewed_selection:** manner/comitative adverbial “together”.
- **336 大樹 — blocked_atomic:** transparent property-plus-noun phrase `大 + 樹`; no independent whole-form lexical evidence in this review justifies manufacturing an atomic POS for the frequency-row surface.
- **337 老 — multiple:** stative/adjectival “old” plus familiar/ordinal prefixal function.
- **338 依 — reviewed_selection:** formal/written verb/relational item “depend on/according to”; zero packet hits do not delete it.
- **339 咦 — reading_variation:** interjection; `ji2` is strongly packet-supported while `ji4/ji6` remain pronunciation variants, not new POS values.
- **340 停 — reviewed_selection:** lexical verb “stop/halt/park”.
- **341 感覺 — multiple:** noun “feeling/sensation” plus verb “feel/perceive”.
- **342 洗 — reviewed_selection:** lexical verb “wash/bathe”.
- **343 扮 — reviewed_selection:** lexical verb `baan6` “pretend/dress up”; independently checked Cantonese evidence supports `baan6`, while Cifu `baan3` is not promoted without independent sense-specific support.
- **344 定 — multiple:** adjective/stative “steady/calm”, conjunction “or”, adverbial “in advance”, and verb “set/decide”; corpus particle tagging does not erase these distinctions.
- **345 耐 — reviewed_selection:** stative/adjectival property “durable/enduring/patient”.
- **346 擁 — reviewed_selection:** lexical verb “embrace/support/surround”.
- **347 本身 — multiple/function:** reflexive/emphatic nominal-pronominal expression with adverbial modifier use.
- **348 方面 — reviewed_selection:** relational/aspect noun “aspect/side/respect”.
- **349 另 — reviewed_selection:** additive/separative modifier-adverb “other/another/separately”.
- **350 扮汗 — blocked_atomic:** zero-hit/no-definition exact surface with no coherent independently supported whole-form lexical analysis; do not fabricate one from the rank row.

### Ranks 351–375

- **351 格 — multiple:** `gaak3` nominal/classifier square, grid, compartment, or pattern family plus independently documented lexical/bound verbal family; sparse packet evidence does not erase the lexical split.
- **352 不如 — multiple/function:** comparative predicate “not as good as” plus suggestion/advisory discourse function “better to”.
- **353 今次 — reviewed_selection:** temporal noun `gam1 ci3` “this time”; independent Cantonese lexical listing supports the exact whole form despite its transparent internal history.
- **354 城 — reviewed_selection:** noun “city/town/city wall”.
- **355 球場 — reviewed_selection:** place noun “sports field/court/stadium”.
- **356 多謝 — reviewed_selection:** lexical speech-act verb/formula “thank”.
- **357 汗 — reading_split:** `hon6` common noun “sweat”; `hon4/hong6` belong to distinct proper-name/title families and are not merged into the common noun.
- **358 社會 — reviewed_selection:** abstract/collective noun “society”.
- **359 莊 — multiple/function:** `zong1` independently supports bound nominal/morphemic village, villa, business, and related formal families, lexical noun uses such as organization/dealer, and a proper-surname family; zero packet hits do not justify `research_required` as the primary outcome.
- **360 幾好 — blocked_atomic:** compositional degree phrase.
- **361 彭 — reading_correction:** proper surname `paang4`; packet evidence overrides Cifu `pang4` for this use.
- **362 煙 — reviewed_selection:** mass/count noun “smoke/tobacco/cigarette”.
- **363 遠 — reviewed_selection:** stative/adjectival property “far/distant”.
- **364 貧大宅 — blocked_atomic:** zero-hit/no-definition likely segmentation/source artifact; do not fabricate a whole-form lexical analysis.
- **365 名 — reading_split:** `meng2` ordinary noun “name”; `ming4` written/bound nominal family and classifier for people where independently instantiated.
- **366 即刻 — reading_variation:** temporal adverb “immediately”; preserve independently documented `zik1 hak1`, `zik1 kak1`, `zik1 haak1`, and `zik1 kaak1` rather than treating one packet reading as exclusive.
- **367 勁 — reading_split:** `ging6` adjective/adverb “strong/excellent/very” versus `ging3` noun “vigor/vitality/aura”.
- **368 將 — reading_split:** `zoeng1` disposal/coverb-preverbal and future/incipient grammatical family versus `zoeng3` noun “general” / command-lead family.
- **369 像 — multiple:** `zoeng6` noun image/portrait/statue family plus verb “resemble/appear”; written relation-like uses remain functionally distinct where directly supported rather than being inferred from Cifu.
- **370 二 — reviewed_selection:** numeral two.
- **371 北方 — reviewed_selection:** locality noun “north/northern region”.
- **372 仔 — reading_split/function:** productive `zai2` person/young-animal noun and diminutive/nominal suffix versus distinct `zi2` written/bound reading in independently supported forms such as `仔細`.
- **373 半 — reviewed_selection:** numeral/quantifier “half”.
- **374 東 — reviewed_selection:** locality noun “east”; surname/host/bound senses remain secondary research and are not added from zero packet evidence.
- **375 金字塔 — reviewed_selection:** count noun “pyramid”.

### Ranks 376–400

- **376 風車 — reviewed_selection:** count noun “windmill/pinwheel”.
- **377 越 — multiple/function:** `jyut6` correlative/degree function in `越…越…` plus independently supported cross/exceed lexical/bound family and Yue/Vietnam/proper-name nominal family; preserve rather than narrowing to the comparative use alone.
- **378 工 — reviewed_selection:** noun/bound root “work/labour/craft/worker”.
- **379 考 — reviewed_selection:** lexical verb “test/examine/take an exam”.
- **380 當然 — reviewed_selection:** certainty/discourse adverb “of course/certainly”, normal `dong1 jin4`; singleton packet `jin2` is not promoted without independent evidence.
- **381 農 — reviewed_selection:** noun/bound root “agriculture/farming/farmer”.
- **382 碼頭 — reviewed_selection:** place/count noun “pier/wharf/dock”.
- **383 礦場 — reviewed_selection:** place/count noun “mine/mining site”.
- **384 入 — reviewed_selection:** lexical directional/motion verb “enter/go in”.
- **385 女仔 — reviewed_selection:** person noun “girl/young woman”.
- **386 引 — reviewed_selection:** lexical verb “draw/pull/lead/attract”.
- **387 先至 — reviewed_selection:** focus/temporal adverb-function “only then / only after”.
- **388 究竟 — reviewed_selection:** interrogative/discourse adverb “after all/exactly/in the end”; nominal “outcome/result” remains secondary research.
- **389 前 — multiple/function:** spatial/temporal localizer-noun/function “front/before/ago”; UD `ADV` is not final ontology.
- **390 頭 — multiple:** body-part/general noun, spatial/temporal localizer family, and classifier uses.
- **391 飲 — reviewed_selection:** lexical verb “drink”.
- **392 暖 — reviewed_selection:** stative/adjectival property “warm”.
- **393 總之 — reviewed_selection:** discourse adverb/connective “in short/anyway”.
- **394 完全 — reviewed_selection:** degree/manner adverb “completely/totally”; stative “complete/whole” remains category follow-up.
- **395 情況 — reviewed_selection:** abstract/count noun “situation/circumstances”.
- **396 甜 — reviewed_selection:** stative/adjectival property “sweet”.
- **397 低 — reviewed_selection:** stative/adjectival property “low”; verbal “lower/droop” family remains a secondary syntax check.
- **398 農莊 — reviewed_selection:** place/count noun “farm/ranch”.
- **399 瀑布 — reviewed_selection:** count/place noun “waterfall”.
- **400 五 — reviewed_selection:** numeral five.

### Ranks 401–425

- **401 辛苦 — reviewed_selection:** stative/adjectival predicate “hard/tiring; having worked hard”.
- **402 股 — multiple:** noun “share/portion/thigh” plus classifier/measure for smells, currents, strands, etc.
- **403 墳場 — reviewed_selection:** place noun “cemetery/graveyard”.
- **404 出來 — blocked_atomic:** transparent directional chain `出 + 來/嚟`; preserve component analysis.
- **405 部 — multiple:** noun “part/department/division” plus classifier for machines, films, works, etc.
- **406 你講 — blocked_atomic:** pronoun plus verb clause fragment.
- **407 信 — multiple:** noun “letter/message/evidence” plus verb “believe/trust”.
- **408 樹林 — reviewed_selection:** place/count noun “woods/grove/forest”.
- **409 禮堂 — reviewed_selection:** place noun “assembly hall/auditorium”.
- **410 所 — multiple/function:** grammatical nominalizing/passive marker before verbs plus classifier for institutions/buildings; packet PRON/ADP/PART labels are surface projections.
- **411 所謂 — reviewed_selection:** lexical modifier/function “so-called/alleged”.
- **412 首先 — reviewed_selection:** sequence/discourse adverb “first of all”.
- **413 國旗 — reviewed_selection:** count noun “national flag”.
- **414 帶 — reading_split:** `daai3` verb “carry/bring/lead” versus `daai2` noun “band/belt/zone”.
- **415 畫到 — blocked_atomic:** verb plus result complement `到`.
- **416 燈塔 — reviewed_selection:** count/place noun “lighthouse”.
- **417 講呢 — blocked_atomic:** verb plus sentence-particle sequence.
- **418 纜車 — reviewed_selection:** count noun “cable car”.
- **419 全部 — multiple:** quantifier/pronominal “all/the whole” plus adverbial “entirely/altogether”.
- **420 重有 — reviewed_selection/function:** discourse/additive “also/furthermore/still have”; packet verb-only category is rejected as final ontology.
- **421 貴 — reviewed_selection:** stative/adjectival property “expensive/honourable”.
- **422 四 — reviewed_selection:** numeral four.
- **423 服務 — multiple:** noun “service” plus verb “serve/provide service”.
- **424 書 — reviewed_selection:** count noun “book/writing”.
- **425 覺 — reading_split:** `gok3` lexical verb “feel/think/notice” versus `gaau3` sleep/nap morpheme-nominal family.

### Ranks 426–450

- **426 本 — multiple:** classifier for books/files, noun “root/source/basis”, and bound/determiner-like “this/current” use.
- **427 特別 — multiple:** adjective “special/unusual” plus adverb “especially/particularly”.
- **428 得到 — reading_split/function:** lexical verb `dak1 dou3` “obtain/receive” is independently supported; packet `dak1 dou2` remains compatible with productive resultative `得 + 到` and is not promoted as a second atomic reading without concordance evidence.
- **429 清楚 — reviewed_selection:** stative adjective/predicate “clear; clearly understood”; one verbal tag does not establish a separate lexical verb.
- **430 理 — multiple:** lexical verb “manage/handle/pay attention to” plus noun/bound noun “reason/principle/science”.
- **431 種 — reading_split:** `zung2` noun “kind/species/seed” plus classifier “kind/type”; `zung3` verb “plant/cultivate”.
- **432 堂 — multiple:** noun “hall/room”, classifier for classes/sets, plus bound kinship/clan modifier.
- **433 后 — reviewed_selection:** noun/title “empress/queen”; surname use remains secondary.
- **434 呃 — reading_split:** `aak1/ngaak1` verb “cheat/deceive” plus `aak3` sentence particle.
- **435 就算 — reviewed_selection:** concessive conjunction “even if/granted that”.
- **436 虛線 — reviewed_selection:** noun “dotted/dashed line”.
- **437 太 — reviewed_selection:** degree adverb “too/very/extremely”.
- **438 少 — reading_split:** `siu2` stative quantity adjective/quantifier “few/little” versus `siu3` bound “young” reading in compounds.
- **439 出去 — reviewed_selection/function:** independently listed verb `ceot1 heoi3` “go out/leave” plus postverbal directional function; productive internal structure does not erase the supported whole-form verb.
- **440 怨 — reviewed_selection:** verb “blame/complain/resent”; nominal “resentment” remains secondary research for this surface.
- **441 唔記得 — reviewed_selection:** independently listed lexical verb `m4 gei3 dak1` “forget/not remember”; transparent negation does not by itself erase the documented whole-form lexical entry.
- **442 效果 — reviewed_selection:** noun “effect/result”.
- **443 起 — multiple:** lexical verb “rise/start/set out”, grammatical inchoative/complement/start-point functions, and classifier for cases/instances where independently licensed.
- **444 文字 — reviewed_selection:** noun “writing/script/written language”.
- **445 以為 — reviewed_selection:** cognition verb “assume/believe, usually incorrectly”.
- **446 打橫 — reviewed_selection:** lexicalized manner/property expression “horizontally/crosswise”.
- **447 通常 — reviewed_selection:** frequency adverb “usually/normally”.
- **448 陳 — reviewed_selection:** proper surname `can4` for packet-supported use; literary verb/adjective senses remain separate research and lone `can2` is not promoted.
- **449 地盤 — reviewed_selection:** noun “construction site/territory/base”.
- **450 行到 — blocked_atomic:** transparent verb plus result/directional complement sequence.

### Ranks 451–475

- **451 杏堂 — blocked_atomic:** zero-hit/no-definition exact surface, plausibly proper name or extraction artefact; no whole-form lexical analysis is fabricated without independent evidence.
- **452 相信 — reviewed_selection:** verb `soeng1 seon3` “believe”.
- **453 揀 — reviewed_selection:** verb `gaan2` “choose/pick”.
- **454 項 — multiple:** primary classifier `hong6` for items/projects/clauses/sums plus related noun/bound nominal “item/term”.
- **455 禮拜 — reviewed_selection:** ordinary noun/time expression `lai5 baai3` “week”; religious worship/service is a separate formal sense.
- **456 市場 — reviewed_selection:** noun `si5 coeng4` “market”.
- **457 我講 — blocked_atomic:** pronoun plus verb sequence.
- **458 尚健 — blocked_atomic:** zero-hit/no-definition exact surface, plausibly a proper name; no atomic lexical analysis is promoted without independent evidence.
- **459 蚊 — multiple:** noun `man1` “mosquito” plus colloquial currency classifier/unit noun `man1` “dollar/buck”.
- **460 印 — multiple:** verb `jan3` “print/stamp/impress”, noun “stamp/seal/mark”, plus bound/proper India abbreviation in formal compounds.
- **461 直 — multiple:** stative adjective `zik6` “straight/direct/upright” plus adverb/function “straight on/continuously/directly”.
- **462 嶺 — reading_variation:** noun “ridge/mountain range”; preserve `leng5` and literary/variant `ling5` pending sense-specific implementation.
- **463 入去 — reviewed_selection/function:** independently listed verb `jap6 heoi3` “enter/go inside” plus postverbal directional function; internal `入 + 去` structure does not erase the whole-form verbal analysis.
- **464 之 — reviewed_selection/function:** formal structural particle/function `zi1`, especially genitive/nominal-linking; literary pronoun use is secondary and requires direct evidence.
- **465 六 — reviewed_selection:** numeral `luk6`.
- **466 出現 — reviewed_selection:** verb `ceot1 jin6` “appear/emerge”; do not promote a noun solely from one `vn` annotation.
- **467 直情 — reviewed_selection:** adverb `zik6 cing4` “simply/outright/actually”.
- **468 國 — reviewed_selection:** noun/bound nominal root `gwok3` “country/nation/state”.
- **469 圖 — reviewed_selection:** noun `tou4` “diagram/picture/map”; formal verb “plan/seek” remains secondary research before runtime separation.
- **470 西 — reviewed_selection:** cardinal-direction locality noun/bound root `sai1` “west”.
- **471 掂 — reading_split:** `dim6` stative adjective “okay/satisfactory/capable/successful”, `dim3` verb “touch”, and independently documented `dim1` verb “heft/weigh/estimate weight”; keep the sense-linked readings distinct.
- **472 條路線 — blocked_atomic:** classifier plus noun phrase.
- **473 頂 — reading_split:** `ding2` verb “support/withstand/endure/substitute” plus interjection, versus `deng2` noun “top/roof” and classifier uses such as hats; do not collapse `deng2` to a mere free variant of the verbal reading.
- **474 裏邊 — reading_correction:** spatial locality noun/localizer `leoi5 bin6` “inside/interior”; correct packet `bin1` to `bin6` for this locality form.
- **475 銅 — reviewed_selection:** material noun/bound root `tung4` “copper”.

### Ranks 476–500

- **476 濫 — reading_correction:** stative adjective/property “excessive/indiscriminate”, secure `laam6`; lone packet `laam5` does not overwrite it.
- **477 小 — reviewed_selection:** adjective/quantificational property “small/little/young” plus productive bound/diminutive use; no free noun promoted.
- **478 冇問題 — reviewed_selection:** lexicalized discourse/predicate formula “no problem”.
- **479 右行 — blocked_atomic:** directional modifier plus motion verb; phrase/construction analysis required.
- **480 讀書 — reviewed_selection:** lexical verb “study/read”, `duk6 syu1`.
- **481 不 — reviewed_selection/function:** formal/written negator `bat1`.
- **482 水塘 — reviewed_selection:** noun “reservoir”.
- **483 件 — multiple/function:** classifier for events/things/clothing; secondary noun “item/component” only where syntax supports it.
- **484 地標 — reviewed_selection:** noun “landmark”.
- **485 收 — reviewed_selection:** verb “receive/accept/collect”.
- **486 更加 — reviewed_selection:** degree/comparative adverb “even more”.
- **487 男朋友 — reviewed_selection:** person/relationship noun “boyfriend/male friend”.
- **488 唔該 — reviewed_selection:** lexicalized politeness/discourse formula “please/thank you”; packet `X` is not useful final ontology.
- **489 愁 — reviewed_selection:** psych/stative verb/property “worry/be troubled”; avoid unsupported category proliferation from the zero-hit packet.
- **490 一條 — blocked_atomic:** numeral plus classifier.
- **491 八 — multiple:** numeral “eight” plus distinct colloquial slang verb “gossip/be nosy”; do not reinterpret the numeral as verbal.
- **492 忍 — reviewed_selection:** verb “endure/tolerate”.
- **493 重 — reading_split:** `zung6` adverbial “still/furthermore” and importance/seriousness family; `cung4` repeat/again family; `cung5` stative adjective “heavy”; do not create a classifier from one classifier-like tag.
- **494 將來 — multiple/function:** temporal noun “future” plus temporal adverbial use.
- **495 斜 — reading_variation:** stative adjective/property “slanted/oblique”; preserve independently documented `ce3/ce4` pronunciation variation, including both in `斜坡`, rather than reducing the surface to one packet reading.
- **496 望 — reviewed_selection:** verb “look/gaze/hope/expect”.
- **497 提碑 — blocked_atomic:** zero-hit/no-definition surface with no coherent independently supported whole-form lexical analysis; do not guess a correction such as `題碑` from the rank row.
- **498 工作 — multiple:** noun “work/job/task” plus verb “work”.
- **499 皮 — reviewed_selection:** noun “skin/leather”; bound/slang value/amount senses remain secondary candidates with no promotion from the zero-hit packet.
- **500 共 — reviewed_selection/research_boundary:** bound/formal “common/together/total” root is secure; free adverb/verb uses remain `research_required` until contextual evidence is attached.

## Consolidated consequence

All 250 ranks are represented exactly once above. The authoritative result is evidence-resolved rather than timestamp-resolved: independently supported earlier decisions survive later packet-only retreats, later passes win where they contribute stronger evidence, and fresh independent checks resolve material contradictions such as `得到`, `今次`, and `唔記得`.

Downstream implementation must distinguish:

- positive lexical selections that can be represented directly;
- genuine multiple/readings/function splits that require first-class analyses or explicit function handling;
- `blocked_atomic` surfaces that should not become whole-form lexical POS entries;
- `research_required` boundaries that remain neutral/unpromoted until stronger evidence exists.

This file is the authoritative #793 adjudication consolidation for later ranks-251–500 runtime reconciliation. It does not itself authorize or implement that runtime reconciliation.