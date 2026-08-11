# Top-2000 spoken Cantonese lexical coverage audit — R1

## Method

Frequency source: Lai & Winterstein's Cifu v1, pinned at `8d5e4903e419193f903823880a7815712072cc80`, ranked by integer `SpokenAdult` frequency. The list keeps exactly the 2,000 highest-frequency unique non-empty forms with positive adult-spoken frequency. Cifu is a Hong Kong Cantonese frequency lexicon and includes separate adult-spoken, child-spoken, child-directed, and written frequency measures; this audit uses only the adult-spoken column. The result is therefore a reproducible Cifu spoken-adult ranking, not a claim that one universal Cantonese top-2000 list exists.

Cifu supplies the ranking, Jyutping, definition, and structure fields. Wiktionary is used only as secondary lexical verification. R1 spot-checks independently corroborated 中間 `zung1 gaan1`, 頭先 `tau4 sin1`, 知道 `zi1 dou3`, 繼續 `gai3 zuk6`, 其實 `kei4 sat6`, 譬如 `pei3 jyu4`, 洞 `dung6`, and 點鐘 `dim2 zung1`.

Coverage is surface-sensitive. `covered_main` means an exact token-lexicon surface exists with a compatible reading. `covered_variant` is reserved for explicit reviewed variant crosswalks and is not inferred automatically. `handled_structurally` means the Cifu surface can be fully segmented into existing runtime lexical tokens; it does **not** prove that the parser has the right construction analysis. `surface_covered_sense_uncertain` preserves direct surfaces whose reading correspondence is not clean. Cifu-generated/undefined forms remain `manual_review`. Everything else is a lexical-gap candidate, not an automatic bulk-import list.

## Coverage before same-task R1 additions

- `covered_main`: **439**
- `covered_variant`: **0**
- `handled_structurally`: **154**
- `surface_covered_sense_uncertain`: **24**
- `missing`: **1041**
- `manual_review`: **342**

## Coverage after same-task R1 additions

- `covered_main`: **474**
- `covered_variant`: **0**
- `handled_structurally`: **152**
- `surface_covered_sense_uncertain`: **24**
- `missing`: **1009**
- `manual_review`: **341**

## Same-task lexical additions (35)

- `中間`
- `下面`
- `沙漠`
- `終點`
- `山`
- `園`
- `池`
- `茅屋`
- `頭先`
- `右邊`
- `一路`
- `一直`
- `左邊`
- `港`
- `湖`
- `洞`
- `點鐘`
- `廟`
- `線`
- `樹`
- `政府`
- `塔`
- `馬戲`
- `角`
- `韻`
- `知道`
- `繼續`
- `恨`
- `交叉`
- `香`
- `善`
- `其實`
- `譬如`
- `但`
- `亦`

These additions use existing broad lexical categories only. Frequency does not establish a construction, grammatical productivity, a preferred parse, or a status promotion. Grammar-sensitive particles, multi-reading forms, uncertain orthographic variants, and compositional corpus strings remain outside this batch even when frequent.

## Highest-frequency remaining lexical-gap candidates

| Rank | Form | Count | Jyutping | Cifu definition | Audit note |
|---:|---|---:|---|---|---|
| 19 | 即係 | 2930 | zik1hai6 | exactly |  |
| 25 | 哋 | 2116 | dei6 | plural suffix |  |
| 27 | 即 | 1930 | zik1 | namely/that is/i.e./prompt/at once/at present/even if/prompted (by the occasion)/to approach/to come into contact/to assume (office)/to draw near |  |
| 39 | 喀 | 1219 | kak1 | (onomat.) |  |
| 58 | 誒 | 817 | aai2\|ei6\|oi1 | hey |  |
| 69 | 哦 | 710 | ngo4\|o4\|o6 | oh (叹词, interjection)/to chant |  |
| 78 | 兜 | 647 | dau1 | container for rice, pet food or coins/to move in a circle/to canvas or solicit/to go for a (leisurely) stroll, drive, jaunt |  |
| 90 | 來 | 491 | loi4 | to come/to arrive/to come round/ever since/next |  |
| 91 | 然 | 483 | jin4 | correct/right/so/thus/like this/-ly |  |
| 93 | 經過 | 459 | ging1gwo3 | to pass/to go through/process/course |  |
| 99 | 或者 | 428 | waak6ze2 | or/possibly/maybe/perhaps |  |
| 109 | 嘛 | 402 | maa4 | (a modal particle) |  |
| 116 | 嗯 | 370 | ng2 | (a groaning sound)/(nonverbal grunt as interjection)/OK, yeah/what?/interjection indicating approval, appreciation or agreement |  |
| 120 | 哩 | 342 | lei5\|le1\|lei1\|li1 | (modal final particle sim. to 呢 or 啦)/(onomat.)/see 哩哩羅羅\|哩哩罗罗 lililuoluo endless mumbling noise/see 哩哩啦啦 lililala, scattered or intermittent/mile/old form of modern 英里 |  |
| 125 | 方 | 322 | fong1 | square/quadrilateral/power (such as cube 立方)/classifier for square things/upright/honest/fair and square/surname Fang/direction/party (to a dispute)/one side/place/method/prescription/just/then/only then |  |
| 136 | 嘩 | 298 | waa1\|waa4 | cat-calling sound/clamor/noise/crashing sound |  |
| 137 | 穿過 | 297 | cyun1gwo3 | to pass through |  |
| 162 | 埋 | 234 | maai4 | bury/to blame |  |
| 174 | 裏 | 201 | leoi5 | inside/internal/interior/lining/village/basic unit of city administration |  |
| 190 | 而 | 179 | ji4 | and/as well as/and so/but (not)/yet (not)/(indicates causal relation)/(indicates change of state)/(indicates contrast) |  |
| 197 | 方向 | 171 | fong1hoeng3 | direction/orientation/path to follow |  |
| 211 | 場 | 162 | coeng4 | large place used for a specific purpose/stage/scene (of a play)/classifier for sporting or recreational activities/classifier for number of exams/classifier for events and happenings: spell, episode, bout |  |
| 212 | 台 | 161 | toi4 | (classical) you (in letters)/platform/Taiwan (abbr.)/a surname |  |
| 214 | 番 | 159 | faan1 | foreign/ethnic groups from outside China/(when used after a verb) times or fold/classifier for the number of iterations of an action or deed etc |  |
| 222 | 比較 | 155 | bei2gaau3 | compare/contrast/fairly/comparatively/relatively/quite/rather |  |
| 229 | 死 | 153 | sei2 | to die/impassable/uncrossable/inflexible/rigid/extremely/used to stress the meaning of a word or phrase/used to emphasise negative characteristics, "shitty", "damned", "useless" |  |
| 239 | 戀 | 149 | lyun2\|lyun5 | to feel attached to/long for/love |  |
| 243 | 泳池 | 146 | wing6ci4 | swimming pond |  |
| 244 | 需要 | 146 | seoi1jiu3 | to need/to want/to demand/needs/to require |  |
| 247 | 成 | 144 | sing4 | to succeed/to finish/to complete/to accomplish/to become/to turn into/one tenth\|whole/complete/to be all right/OK! |  |
| 248 | 位置 | 144 | wai6zi3 | position/place/seat |  |
| 251 | 路 | 143 | lou6 | road/CL:條[tìuh]/a trend/a tendency/a way forward (good or bad)/a sexual relationship |  |
| 252 | 團 | 143 | tyun4 | regiment/round/circular/group/society |  |
| 253 | 機場 | 143 | gei1coeng4 | airport/airfield |  |
| 254 | 之間 | 141 | zi1gaan1 | between/among/inter- |  |
| 257 | 唉 | 140 | aai1\|oi1 | alas/oh dear/interjection or grunt of agreement or recognition (e.g. yes, it's me!)/to sigh |  |
| 258 | 梗係 | 140 | gang2hai6 | of course |  |
| 259 | 哎 | 138 | aai1 | hey!/interjection used to attract attention or to express surprise or disapprobation |  |
| 260 | 蛇 | 138 | se4 | snake/serpent/CL:條[tìuh]/to shirk one's duty, to be lazy on the job |  |
| 261 | 枉 | 136 | wong2 | in the wrong/in vain |  |
| 263 | 擰 | 133 | ning4\|ning6 | mistake/to twist/stubborn/to pinch/wring |  |
| 265 | 丸 | 131 | jyun2\|jyun4 | pill |  |
| 268 | 隔離 | 129 | gaak3lei4 | to separate/to isolate |  |
| 272 | 搞 | 127 | gaau2 | to do/to make/to go in for/to set up/to get hold of/to take care of |  |
| 273 | 葡萄 | 127 | pou4tou4 | grape |  |
| 274 | 往 | 126 | wong5 | to go (in a direction)/to/towards/(of a train) bound for/past/previous |  |
| 276 | 迷宮 | 124 | mai4gung1 | maze/labyrinth |  |
| 278 | 底 | 123 | dai2 | background/bottom/base/plan, strategy or secret/the end of a period of time/towards the end of (last month) |  |
| 279 | 宅 | 122 | zaak6 | residence |  |
| 281 | 為 | 121 | wai6\|wai4 | as (in the capacity of)/to take sth as/to act as/to serve as/to behave as/to become/to be/to do/because of/for/to |  |
| 282 | 腰 | 121 | jiu1 | waist/lower back/pocket/middle |  |
| 284 | 以前 | 119 | ji5cin4 | before/formerly/previous/ago |  |
| 290 | 另外 | 117 | ling6ngoi6 | additional/in addition/besides/separate/other/moreover/furthermore |  |
| 291 | 科技 | 117 | fo1gei6 | science and technology |  |
| 295 | 萍 | 115 | ping4 | duckweed |  |
| 299 | 起點 | 111 | hei2dim2 | starting point |  |
| 302 | 希望 | 110 | hei1mong6 | to wish for/to desire/to hope |  |
| 305 | 南 | 109 | naam4 | south |  |
| 307 | 吔 | 108 | jaa3 | particle |  |
| 308 | 滑雪 | 108 | waat6syut3 | to ski/skiing |  |
| 310 | 明白 | 106 | ming4baak6 | clear/obvious/unequivocal/to understand/to realize |  |
| 315 | 冇錯 | 104 | mou5co3 | that's correct |  |
| 317 | 根本 | 104 | gan1bun2 | fundamental/basic/root/simply/absolutely (not)/(not) at all |  |
| 318 | 盛 | 104 | sing6\|sing4 | flourishing/vigorous/magnificent/extensively/to hold/contain/to ladle/pick up with a utensil/used to indicate a further series of events not specified, "and so on", "etcetera"/a surname |  |
| 319 | 燕 | 104 | jin3\|jin1 | Yan, a vassal state of Zhou in modern Hebei and Liaoning/north Hebei/the four Yan kingdoms of the Sixteen Kingdoms, namely: Former Yan 前燕 (337-370), Later Yan 後燕\|后燕 (384-409), Southern Yan 南燕 (398-410), Northern Yan 北燕 (409-436)/surname Yan/swallow (a type of bird) |  |
| 321 | 工廠 | 102 | gung1cong2 | factory |  |
| 324 | 傻 | 102 | so4 | foolish |  |
| 327 | 之前 | 100 | zi1cin4 | before/prior to/ago |  |
| 328 | 只 | 100 | zi2\|zek3 | only/merely/just/but |  |
| 329 | 可 | 100 | ho2 | can/may/able to/to approve/to permit/certain(ly)/to suit/(particle used for emphasis) |  |
| 333 | 唧 | 99 | zik1 | 1. to squeeze/2. to tickle |  |
| 337 | 老 | 98 | lou5 | prefix used before the surname of a person or a numeral indicating the order of birth of the children in a family or to indicate affection or familiarity/old (of people)/venerable (person)/experienced/of long standing/always/all the time/of the past/very/outdated/(of meat etc) tough |  |
| 338 | 依 | 98 | ji1 | according to/depend on/near to |  |
| 339 | 咦 | 98 | ji4 | expression of surprise |  |
| 341 | 感覺 | 98 | gam2gok3 | to feel/to become aware of/feeling/sense/perception |  |
| 343 | 扮 | 95 | baan6\|baan3 | to disguise oneself/to dress up/adorn |  |
| 346 | 擁 | 95 | jung2 | to hold/to embrace/to wrap around/to gather around (sb)/to throng/to swarm/to support |  |
| 347 | 本身 | 93 | bun2san1 | itself/in itself/per se |  |
| 348 | 方面 | 92 | fong1min6 | respect/aspect/field/side |  |
| 349 | 另 | 92 | ling6 | other/another/separate/separately |  |
| 351 | 格 | 92 | gaak3 | square/frame/rule/(legal) case/style/character/standard/pattern/(classical) to obstruct; to hinder/(classical) to arrive; to come/(classical) to investigate; to study exhaustively |  |
| 354 | 城 | 90 | sing4 | city walls/city/town |  |
| 355 | 球場 | 90 | kau4coeng4 | stadium/sports ground/court/pitch/field/golf course |  |
| 357 | 汗 | 89 | hon6\|hon4\|hong6 | perspiration/sweat/Khan (Persian or Mongol king or emperor)/Khan (name) |  |
| 358 | 社會 | 89 | se5wui2 | society |  |
| 359 | 莊 | 89 | zong1 | farmstead/village/manor/place of business/banker (in a gambling game)/grave or solemn/the committee of a student society (university jargon) |  |
| 361 | 彭 | 89 | pang4 | surname Peng |  |
| 362 | 煙 | 89 | jin1 | cigarette/tobacco/smoke |  |
| 366 | 即刻 | 87 | zik1hak1 | immediately/instant/instantly |  |
| 367 | 勁 | 87 | ging6\|ging3 | strong/powerful/excellent/great\|strength/energy/enthusiasm/CL:把[bá] |  |
| 369 | 像 | 87 | zoeng6 | (look) like/similar (to)/appearance/to appear/to seem/image/portrait/resemble/seem |  |
| 371 | 北方 | 86 | bak1fong1 | north/the northern part a country/China north of the Yellow River |  |
| 372 | 仔 | 85 | zai2\|zi2 | a son/a suffix used to describe something small/a boy/a kid/a boyfriend/(of domestic animals or fowls) young |  |
| 374 | 東 | 84 | dung1 | east/host (i.e. sitting on east side of guest)/landlord/surname Dong |  |
| 375 | 金字塔 | 84 | gam1zi6taap3 | pyramid |  |
| 377 | 越 | 84 | jyut6 | generic word for peoples or states of south China or south Asia at different historical periods/abbr. for Vietnam 越南/to exceed/to climb over/to surpass/the more... the more |  |
| 379 | 考 | 83 | haau2 | to check/to verify/to test/to examine/to take an exam |  |
| 380 | 當然 | 83 | dong1jin4 | only natural/as it should be/certainly/of course/without doubt |  |
| 381 | 農 | 83 | nung4 | agriculture |  |
| 382 | 碼頭 | 83 | maa5tau4 | dock/pier/wharf/CL: 個[go]/the idea of a "pier" symbolises the leaving of the triad life, one's retirement from the life of a triad or prostitute |  |
| 383 | 礦場 | 83 | kwong3coeng4 | a mine/pit |  |
| 385 | 女仔 | 82 | neoi5zai2 | girl |  |
| 386 | 引 | 82 | jan5 | to draw (a bow)/to pull/to stretch sth/to extend/to lengthen/to involve in/to attract/to lead/to guide/to divert (water)/unit of distance equal to 10 丈[zhang1], now one-thirtieth km or 33.33 meters |  |
| 388 | 究竟 | 82 | gau3ging2 | after all (when all is said and done)/actually/outcome/result |  |
| 389 | 前 | 82 | cin4 | front/forward/ahead/ago/before/first/former/formerly/future/BC (e.g. 前293年) |  |
| 390 | 頭 | 82 | tau4 | head/hair style/the top/end/beginning or end/an area/a location/a stub/remnant/chief/boss/side/aspect/first/leading/classifier for pigs or livestock (Mandarin) |  |
| 392 | 暖 | 81 | nyun5 | warm |  |
| 393 | 總之 | 81 | zung2zi1 | in a word/in short/in brief |  |
| 395 | 情況 | 80 | cing4fong3 | circumstances/state of affairs/situation |  |
| 398 | 農莊 | 79 | nung4zong1 | farm/ranch |  |
| 399 | 瀑布 | 79 | buk6bou3 | waterfall |  |
| 402 | 股 | 78 | gu2 | share/portion/section/part/thigh/(classifier for smells, electric currents, spirals etc)/whiff |  |
| 403 | 墳場 | 78 | fan4coeng4 | grave |  |
| 404 | 出來 | 77 | ceot1loi4 | to come out/to emerge |  |
| 408 | 樹林 | 76 | syu6lam4 | woods/grove/forest |  |
| 409 | 禮堂 | 76 | lai5tong4 | assembly hall/auditorium |  |
| 410 | 所 | 75 | so2 | actually/place/classifier for houses, small buildings, institutions etc/that which/particle introducing a relative clause or passive |  |
| 411 | 所謂 | 75 | so2wai6 | so-called |  |
| 413 | 國旗 | 75 | gwok3kei4 | flag (of a country) |  |
| 416 | 燈塔 | 75 | dang1taap3 | lighthouse |  |
| 418 | 纜車 | 75 | laam6ce1 | cable car |  |
| 420 | 重有 | 74 | zung6jau5 | furthermore |  |
| 423 | 服務 | 73 | fuk6mou6 | to serve/service |  |
| 430 | 理 | 72 | lei5 | texture/grain (of wood)/inner essence/intrinsic order/reason/logic/truth/science/natural science (esp. physics)/to manage/to pay attention to/to run (affairs)/to handle/to put in order/to tidy up |  |
| 431 | 種 | 72 | zung2\|zung3 | abbr. for 物種\|物种, genus/race/seed/breed/species/strain/kind/type/has guts (i.e. courage)/nerve/classifier for types: kind, sort/classifier for languages/to plant/to grow/to cultivate |  |
| 432 | 堂 | 71 | tong4 | (main) hall/large room for a specific purpose/relationship between cousins etc on the paternal side of a family/of the same clan/classifier for sets (or suites) of furniture, classes etc |  |
| 433 | 后 | 70 | hau6 | empress/queen/surname Hou |  |
| 434 | 呃 | 70 | ngaak1\|aak1\|ak1 | to cheat/to trick |  |
| 436 | 虛線 | 70 | heoi1sin3 | dotted line |  |
| 440 | 怨 | 69 | jyun3 | to blame/to complain |  |
| 442 | 效果 | 69 | haau6gwo2 | result/effect/quality |  |
| 443 | 起 | 69 | hei2 | to rise/to raise/to get up/to set out/to start/to appear/to launch/to initiate (action)/to draft/to establish/to get (from a depot or counter)/verb suffix, to start/(before place or time) starting from/classifier for occurrences or unpredictable events: case, instance/classifier for groups: batch, group |  |
| 444 | 文字 | 68 | man4zi6 | character/script/writing/written language/writing style/phraseology |  |
| 449 | 地盤 | 67 | dei6pun4 | a construction site/domain/territory under one's control/foundation of a building/base of operations/crust of earth |  |
| 453 | 揀 | 67 | gaan2 | to choose/to pick/to sort out/to pick up |  |
| 454 | 項 | 67 | hong6 | back of neck/item/thing/term (in a mathematical formula)/sum (of money)/classifier for principles, items, clauses, tasks, research projects etc/surname Xiang |  |
| 456 | 市場 | 66 | si5coeng4 | market place/market (also in abstract)/abbr. for 超級市場\|超级市场 supermarket |  |
| 460 | 印 | 65 | jan3 | stamp/seal/mark/print/abbr. for India/surname Yan |  |
| 461 | 直 | 65 | zik6 | straight/not gay, heterosexual, "straight"/to straighten/fair and reasonable/frank/straightforward/(indicates continuing motion or action)/vertical/vertical downward stroke in Chinese characters |  |
| 462 | 嶺 | 65 | leng5\|ling5 | mountain range |  |
| 464 | 之 | 64 | zi1 | (possessive particle, literary equivalent of 的)/him/her/it |  |
| 466 | 出現 | 64 | ceot1jin6 | to appear/to arise/to emerge |  |
| 468 | 國 | 64 | gwok3 | country/nation/state/CL:個[go]/national/a surname |  |
| 469 | 圖 | 64 | tou4 | diagram/to plan/picture/drawing/chart |  |
| 470 | 西 | 63 | sai1 | west/often used as a euphemism for the obscene term for "vagina", 閪 [hāi]/the West/Spain (abbr.) |  |
| 471 | 掂 | 63 | dim1\|dim6 | to weigh in the hand/to estimate\|satisfactory/okay |  |
| 473 | 頂 | 63 | ding2\|deng2 | apex/top/roof/to carry on the head/to push to the top/to go against/most/to replace/to substitute/to "bump" a forum thread to raise its profile (internet slang)/to bear, to endure, to put up with/an exclamation expressing disappointment, anger, amazement, etc. ("shit!", "damn!", etc.)\|apex/top/roof/classifier for hats |  |
| 475 | 銅 | 63 | tung4 | copper Cu, transition metal, atomic number 29/see 紅銅\|红铜 copper, and the alloys brass 黃銅\|黄铜 and bronze 青銅\|青铜 |  |
| 476 | 濫 | 63 | laam6 | excessive/indiscriminate |  |
| 477 | 小 | 62 | siu2 | small/tiny/few/young/a euphemism for 屌 díu, "fuck" |  |
| 481 | 不 | 61 | bat1 | not/no |  |
| 482 | 水塘 | 61 | seoi2tong4 | pool |  |
| 484 | 地標 | 61 | dei6biu1 | landmark |  |
| 485 | 收 | 61 | sau1 | to receive/to accept/to collect/in care of (used on address line after name) |  |
| 486 | 更加 | 61 | gang3gaa1 | more (than sth else)/even more |  |
| 487 | 男朋友 | 61 | naam4pang4jau5 | male friend/boyfriend |  |
| 489 | 愁 | 61 | sau4 | worry about |  |
| 492 | 忍 | 60 | jan2 | to endure/to tolerate |  |
| 493 | 重 | 60 | zung6\|cung4\|cung5 | to attach importance to/important/weighty/furthermore/further/more/still/to lay stress on/discreet\|repeat/again/double\|heavy (in weight)/deep/heavy/serious/weight |  |
| 494 | 將來 | 60 | zoeng1loi4 | the future/future |  |
| 495 | 斜 | 60 | ce4\|ce3 | slanting |  |
| 496 | 望 | 60 | mong6 | to look at/to view/to hope/to expect/to visit/to gaze (into the distance)/to look towards/towards/full moon |  |
| 499 | 皮 | 59 | pei4 | leather/skin/fur/ten thousand dollars/level, standard/pico- (one trillionth)/a surname/CL:塊[faai] |  |
| 500 | 共 | 59 | gung6 | common/general/to share/together/total/altogether/abbr. for 共產黨\|共产党[gong4 chan3 dang3], Communist party |  |
| 501 | 地 | 59 | dei6 | earth/ground/field/place/land/CL:片[pin](Mandarin)/CL:塊[faai]/CL:笪[daat]/-ly/structural particle: used before a verb or adjective, linking it to preceding modifying adverbial adjunct |  |
| 503 | 鬼 | 59 | gwai2 | ghost/CL:隻[jek]/a westerner/a traitor; an informer within an organisation, a "mole". |  |
| 504 | 最後 | 59 | zeoi3hau6 | final/last/finally/ultimate |  |
| 505 | 憂 | 59 | jau1 | to worry/to concern oneself with/worried/anxiety/sorrow/a parent's funeral/inconvenienced by being orphaned |  |
| 507 | 加 | 58 | gaa1 | to add/plus/abbr. for Canada 加拿大 |  |
| 508 | 受 | 58 | sau6 | to receive/to accept/to suffer/subjected to/to bear/to stand/pleasant/(passive marker) |  |
| 510 | 能夠 | 58 | nang4gau3 | be capable of/can/is able |  |
| 511 | 瑞 | 58 | seoi6 | lucky/auspicious/propitious/rayl (acoustical unit) |  |
| 512 | 電腦 | 58 | din6nou5 | computer |  |
| 513 | 領 | 58 | ling5\|leng5 | neck/collar/to lead/to receive |  |
| 517 | 重要 | 57 | zung6jiu3 | important/significant/major |  |
| 518 | 意 | 57 | ji3 | idea/meaning/thought/to think/wish/desire/intention/to expect/to anticipate/abbr. for Italy 意大利 |  |
| 519 | 當 | 57 | dong1\|dong3 | when/during/just at (a time or place)/on the spot/ought/should/equal/same/manage\|to regard as/suitable/adequate/fitting/proper/to pawn/obstruct |  |
| 520 | 繞 | 57 | jiu5 | to wind/to coil (thread)/to rotate around/to spiral/to move around/to go round (an obstacle)/to by-pass/to make a detour/to confuse/to perplex |  |
| 525 | 是 | 56 | si6 | is/are/am/yes/to be |  |
| 526 | 英文 | 56 | jing1man4 | English (language) |  |
| 528 | 貧 | 56 | pan4 | poor/inadequate/deficient/garrulous |  |
| 530 | 彎 | 56 | waan1 | bend/bent |  |
| 531 | 今年 | 55 | gam1nin4 | this year |  |
| 532 | 完成 | 55 | jyun4sing4 | complete/accomplish/perfect tense (grammar) |  |
| 535 | 跟 | 55 | gan1 | to follow closely/to go with/to marry sb (of woman)/with/towards/as (compared to)/from (different from)/and (in addition to)/heel(Mandarin) |  |
| 536 | 灣 | 55 | waan1 | bay/gulf |  |
| 537 | 任何 | 54 | jam6ho4 | any/whatever/whichever/whatsoever |  |
| 539 | 室 | 54 | sat1 | room |  |
| 544 | 樂 | 54 | lok6\|ngok6 | happy/laugh/cheerful/surname Le/surname Yue/music |  |
| 545 | 樂園 | 54 | lok6jyun4 | paradise |  |
| 548 | 形 | 53 | jing4 | to appear/to look/form/shape |  |
| 549 | 直接 | 53 | zik6zip3 | direct/opposite: indirect 間接\|间接/immediate/directly/straightforward |  |
| 550 | 班 | 53 | baan1 | team/class/squad/work shift/classifier for groups/ranking/to gather together/to gather support ("back-up")/to deploy one's gang member/a surname |  |
| 551 | 國家 | 53 | gwok3gaa1 | country/nation/state |  |
| 556 | 經濟 | 53 | ging1zai3 | economy/economic |  |
| 561 | 突然 | 52 | dat6jin4 | sudden/abrupt/unexpected |  |
| 562 | 海 | 52 | hoi2 | ocean/sea/CL:個[go]/CL:片[pin](Mandarin) |  |
| 563 | 提 | 52 | tai4 | carry (suspended)/to carry (hanging down from the hand)/to lift/to put forward/to mention/to raise (an issue)/upwards character stroke/lifting brush stroke (in painting)/scoop for measuring liquid |  |
| 564 | 養 | 52 | joeng5 | to raise (animals)/to bring up (children)/to keep (pets)/to support/to give birth |  |
| 565 | 錯 | 52 | co3 | wrong; mistaken; erroneous/fault; demerit; blunder/intricate; complex/CL:個[go] |  |
| 566 | 叢林 | 52 | cung4lam4 | jungle/thicket/forest/Buddhist monastery |  |
| 568 | 大陸 | 51 | daai6luk6 | mainland China (reference to the PRC)/continent/mainland/CL:個[go] |  |
| 572 | 基本上 | 51 | gei1bun2soeng6 | basically/on the whole |  |
| 574 | 說話 | 51 | syut3waa6 | to speak/to say/to talk/to gossip/to tell stories/talk/word |  |
| 578 | 自由 | 50 | zi6jau4 | freedom/free/liberty |  |
| 580 | 直線 | 50 | zik6sin3 | straight line |  |
| 581 | 穿 | 50 | cyun1 | to bore through/to pierce/to perforate/to penetrate/to pass through/to dress/to wear/to put on/to thread/damaged with a hole or holes (e.g. pots, socks) |  |
| 584 | 從 | 50 | cung4 | from/via/passing through/through (a gap)/past/ever (followed by negative, meaning never)/(formerly pr. zong4 and related to 縱\|纵) to follow/to comply with/to obey/to join/to engage in/adopting some mode of action or attitude/follower/retainer/accessory/accomplice/related by common paternal grandfather or earlier ancestor/surname Cong/lax/yielding/unhurried/second cousin |  |
| 585 | 舊 | 50 | gau6 | old/opposite: new 新/former/worn (with age) |  |
| 586 | 呵 | 49 | ho1 | expel breath/my goodness/variantof 啊/phonetic "a" |  |
| 587 | 性 | 49 | sing3 | nature/character/property/quality/attribute/sexuality/sex/gender/surname/suffix forming adjective from verb/suffix forming noun from adjective, corresponding to -ness or -ity/essence |  |
| 588 | 林 | 49 | lam4 | woods/forest/surname Lin |  |
| 589 | 揸 | 49 | zaa1 | to hold/to drive/to pilot/to make a decision |  |
| 591 | 世界 | 48 | sai3gaai3 | world/a situation, a position, a state of affairs/CL:個[go] |  |
| 593 | 似 | 48 | ci5 | to seem/to appear/to resemble/similar/-like/pseudo- |  |
| 594 | 東方 | 48 | dung1fong1 | the East/Eastern countries |  |
| 596 | 理由 | 48 | lei5jau4 | reason/grounds/justification |  |
| 598 | 貨倉 | 48 | fo3cong1 | a warehouse |  |
| 602 | 翻版 | 48 | faan1baan2 | to reprint/a duplicate/a clone |  |
| 603 | 一種 | 47 | jat1zung2 | one kind of/one type of |  |
| 604 | 以 | 47 | ji5 | abbr. for Israel 以色列[yíh sīk liht]/to use/according to/so as to/in order to/by/with/because |  |
| 605 | 包 | 47 | baau1 | to cover/to wrap/to promise/to guarantee/to include/to keep a mistress or second wife/package/wrapper/container/bag/bundle/packet |  |
| 606 | 未必 | 47 | mei6bit1 | not necessarily/maybe not |  |
| 607 | 拍 | 47 | paak3 | to pat/to clap/to slap/to swat/to take (a photo)/to shoot (a film)/racket (sports)/beat (music) |  |
| 608 | 法律 | 47 | faat3leot6 | law |  |
| 609 | 要求 | 47 | jiu1kau4 | to request/to require/to stake a claim/to ask/to demand |  |
| 611 | 影響 | 47 | jing2hoeng2 | an influence/an effect/to influence/to affect (usually adversely)/to disturb |  |
| 614 | 關係 | 47 | gwaan1hai6 | relation/relationship/to concern/to affect/to have to do with/guanxi |  |
| 615 | 灘 | 47 | taan1\|taan5 | beach/shoal |  |
| 617 | 考慮 | 46 | haau2leoi6 | to think over/to consider/consideration |  |
| 618 | 男人 | 46 | naam4jan2 | a man/a male/men/CL:個[go] |  |
| 619 | 某 | 46 | mau5 | some/a certain/sb or sth indefinite/such-and-such |  |
| 620 | 唔夠 | 46 | m4gau3 | not enough |  |
| 621 | 射 | 46 | se6 | to shoot/to look after, to protect, to watch over/to ejaculate, to "come"/radio- (chemistry) |  |
| 625 | 轉彎 | 46 | zyun3waan1 | turn (around) |  |
| 626 | 攬 | 46 | laam5 | to embrace/to monopolize/to seize |  |
| 629 | 生活 | 45 | sang1wut6 | life/activity/to live/livelihood |  |
| 631 | 其中 | 45 | kei4zung1 | among/in/included among these |  |
| 633 | 法 | 45 | faat3 | law/method/way/Buddhist teaching/Legalist/abbr. for France |  |
| 634 | 教 | 45 | gaau3 | religion/teaching/to teach/to make (Mandarin)/to cause (Mandarin)/to tell (Mandarin) |  |
| 636 | 磅 | 45 | bong6\|bong2 | to weigh/to give/to accompany/to escort/to protect/pound (unit of weight, about 454 grams)\|scale/platform balance |  |
| 637 | 山路 | 44 | saan1lou6 | mountain road |  |
| 638 | 公共 | 44 | gung1gung6 | public/common (use) |  |
| 639 | 方法 | 44 | fong1faat3 | method/way/means |  |
| 640 | 代表 | 44 | doi6biu2 | representative/delegate/to represent/to stand for |  |
| 642 | 西方 | 44 | sai1fong1 | the West/the Occident/Western countries |  |
| 643 | 者 | 44 | ze2 | -ist, -er (person)/person (who does sth) |  |
| 644 | 段 | 44 | dyun6 | surname Duan/paragraph/section/segment/stage (of a process)/classifier for stories |  |
| 647 | 早 | 43 | zou2 | early/morning |  |
| 648 | 店 | 43 | dim3 | inn/shop/store |  |

## Highest-frequency manual-review forms

| Rank | Form | Count | Jyutping | Cifu definition | Audit note |
|---:|---|---:|---|---|---|
| 38 | 一個 | 1246 | *jat1go3 | NO DEF | cifu_generated_or_undefined |
| 72 | 咁樣 | 703 | gam2joeng2 | NO DEF | cifu_generated_or_undefined |
| 121 | 落去 | 329 | lok6heoi3 | NO DEF | cifu_generated_or_undefined |
| 139 | 兩個 | 291 | *loeng5go3 | NO DEF | cifu_generated_or_undefined |
| 149 | 揾 | 255 | *? | NO DEF | cifu_generated_or_undefined |
| 151 | 哩個 | 254 | *lei5\|le1\|lei1\|li1go3 | NO DEF | cifu_generated_or_undefined |
| 156 | 有個 | 245 | *jau5go3 | NO DEF | cifu_generated_or_undefined |
| 157 | 唔到 | 244 | *m4dou3 | NO DEF | cifu_generated_or_undefined |
| 217 | 唔見 | 157 | *m4gin3 | NO DEF | cifu_generated_or_undefined |
| 219 | 兜過 | 157 | *dau1gwo3 | NO DEF | cifu_generated_or_undefined |
| 223 | 冇乜 | 154 | *mou5mat1 | NO DEF | cifu_generated_or_undefined |
| 234 | 返去 | 150 | faan1heoi3 | NO DEF | cifu_generated_or_undefined |
| 242 | 右面 | 146 | jau6min6 | NO DEF | cifu_generated_or_undefined |
| 249 | 幾多 | 144 | *gei2\|gei1do1 | NO DEF | cifu_generated_or_undefined |
| 275 | 淨係 | 125 | zing6hai6 | NO DEF | cifu_generated_or_undefined |
| 285 | 係噉 | 119 | *hai6gam2 | NO DEF | cifu_generated_or_undefined |
| 297 | 條線 | 114 | *tiu4sin3 | NO DEF | cifu_generated_or_undefined |
| 350 | 扮汗 | 92 | *baan6\|baan3hon6\|hon4\|hong6 | NO DEF | cifu_generated_or_undefined |
| 353 | 今次 | 91 | *gam1ci3 | NO DEF | cifu_generated_or_undefined |
| 360 | 幾好 | 89 | *gei2\|gei1hou2\|hou3 | NO DEF | cifu_generated_or_undefined |
| 364 | 貧大宅 | 88 | *pan4daai6zaak2 | NO DEF | cifu_generated_or_undefined |
| 406 | 你講 | 76 | *nei5gong2 | NO DEF | cifu_generated_or_undefined |
| 415 | 畫到 | 75 | *waak6\|waa2dou3 | NO DEF | cifu_generated_or_undefined |
| 417 | 講呢 | 75 | *gong2ne1\|ni1\|nei1 | NO DEF | cifu_generated_or_undefined |
| 446 | 打橫 | 68 | daa2waang4 | NO DEF | cifu_generated_or_undefined |
| 450 | 行到 | 67 | *hang4\|haang4\|hang6\|hong4\|hong2dou3 | NO DEF | cifu_generated_or_undefined |
| 451 | 杏堂 | 67 | *hang6tong4 | NO DEF | cifu_generated_or_undefined |
| 457 | 我講 | 66 | *ngo5gong2 | NO DEF | cifu_generated_or_undefined |
| 458 | 尚健 | 66 | *soeng6gin6 | NO DEF | cifu_generated_or_undefined |
| 463 | 入去 | 64 | jap6heoi3 | NO DEF | cifu_generated_or_undefined |
| 467 | 直情 | 64 | zik6cing4 | NO DEF | cifu_generated_or_undefined |
| 472 | 條路線 | 63 | *tiu4lou6sin3 | NO DEF | cifu_generated_or_undefined |
| 474 | 裏邊 | 63 | *leoi5bin1 | NO DEF | cifu_generated_or_undefined |
| 479 | 右行 | 62 | *jau6hang4\|haang4\|hang6\|hong4\|hong2 | NO DEF | cifu_generated_or_undefined |
| 490 | 一條 | 60 | *jat1tiu4 | NO DEF | cifu_generated_or_undefined |
| 497 | 提碑 | 60 | *tai4bei1 | NO DEF | cifu_generated_or_undefined |
| 516 | 後尾 | 57 | *hau6mei5 | NO DEF | cifu_generated_or_undefined |
| 522 | 成病 | 56 | *sing4beng6 | NO DEF | cifu_generated_or_undefined |
| 524 | 我話 | 56 | *ngo5waa6\|waa2 | NO DEF | cifu_generated_or_undefined |
| 533 | 男仔 | 55 | *naam4zai2\|zi2 | NO DEF | cifu_generated_or_undefined |
| 538 | 返來 | 54 | *faan1\|faan2loi4 | NO DEF | cifu_generated_or_undefined |
| 543 | 憂店 | 54 | *jau1dim3 | NO DEF | cifu_generated_or_undefined |
| 553 | 細個 | 53 | *sai3go3 | NO DEF | cifu_generated_or_undefined |
| 557 | 點啊 | 53 | *dim2aa3\|aa1\|aa2 | NO DEF | cifu_generated_or_undefined |
| 558 | 一係 | 52 | jat1hai6 | NO DEF | cifu_generated_or_undefined |
| 559 | 我會 | 52 | *ngo5wui5\|wui6\|wui2 | NO DEF | cifu_generated_or_undefined |
| 571 | 成個 | 51 | *sing4go3 | NO DEF | cifu_generated_or_undefined |
| 582 | 哩樣 | 50 | *lei5\|le1\|lei1\|li1joeng6 | NO DEF | cifu_generated_or_undefined |
| 597 | 着 | 48 | *? | NO DEF | cifu_generated_or_undefined |
| 601 | 繞過 | 48 | *jiu5gwo3 | NO DEF | cifu_generated_or_undefined |
| 641 | 好過 | 44 | *hou2\|hou3gwo3 | NO DEF | cifu_generated_or_undefined |
| 657 | 我見 | 42 | *ngo5gin3 | NO DEF | cifu_generated_or_undefined |
| 662 | 貧大 | 42 | *pan4daai6 | NO DEF | cifu_generated_or_undefined |
| 688 | 有陣 | 40 | *jau5zan6 | NO DEF | cifu_generated_or_undefined |
| 698 | 三個 | 39 | *saam1\|saam3go3 | NO DEF | cifu_generated_or_undefined |
| 702 | 行過 | 39 | *hang4\|haang4\|hang6\|hong4\|hong2gwo3 | NO DEF | cifu_generated_or_undefined |
| 704 | 直落 | 39 | zik6lok6 | NO DEF | cifu_generated_or_undefined |
| 710 | 點呀 | 39 | *dim2aa3\|aa1\|aa6 | NO DEF | cifu_generated_or_undefined |
| 712 | 水平線 | 38 | seoi2ping4sin3 | NO DEF | cifu_generated_or_undefined |
| 715 | 直上 | 38 | zik6soeng5 | NO DEF | cifu_generated_or_undefined |
| 716 | 直程 | 38 | *zik6cing4 | NO DEF | cifu_generated_or_undefined |
| 720 | 畫個 | 38 | *waak6\|waa2go3 | NO DEF | cifu_generated_or_undefined |
| 724 | 左行 | 37 | *zo2hang4\|haang4\|hang6\|hong4\|hong2 | NO DEF | cifu_generated_or_undefined |
| 725 | 食飯 | 37 | *sik6faan6 | NO DEF | cifu_generated_or_undefined |
| 740 | 個韻 | 36 | *go3wan6 | NO DEF | cifu_generated_or_undefined |
| 744 | 試過 | 36 | *si3gwo3 | NO DEF | cifu_generated_or_undefined |
| 747 | 大個 | 35 | *daai6go3 | NO DEF | cifu_generated_or_undefined |
| 752 | 我個 | 35 | *ngo5go3 | NO DEF | cifu_generated_or_undefined |
| 753 | 我想 | 35 | *ngo5soeng2 | NO DEF | cifu_generated_or_undefined |
| 766 | 一份 | 34 | *jat1fan6 | NO DEF | cifu_generated_or_undefined |
| 771 | 忍依 | 34 | *jan2ji1 | NO DEF | cifu_generated_or_undefined |
| 782 | 黐線 | 34 | *ci1sin3 | NO DEF | cifu_generated_or_undefined |
| 783 | 一年 | 33 | *jat1nin4 | NO DEF | cifu_generated_or_undefined |
| 800 | 講下 | 33 | *gong2haa6 | NO DEF | cifu_generated_or_undefined |
| 801 | ○ | 32 | *? | NO DEF | cifu_generated_or_undefined |
| 803 | 只不過 | 32 | *zi2\|zek3bat1gwo3 | NO DEF | cifu_generated_or_undefined |
| 813 | 陣時 | 32 | *zan6si4 | NO DEF | cifu_generated_or_undefined |
| 818 | 講得 | 32 | *gong2dak1 | NO DEF | cifu_generated_or_undefined |
| 819 | 講過 | 32 | *gong2gwo3 | NO DEF | cifu_generated_or_undefined |
| 822 | 我要 | 31 | *ngo5jiu3 | NO DEF | cifu_generated_or_undefined |
| 823 | 來講 | 31 | *loi4gong2 | NO DEF | cifu_generated_or_undefined |
| 840 | 一間 | 30 | *jat1gaan1\|gaan3 | NO DEF | cifu_generated_or_undefined |
| 846 | 令到 | 30 | *ling6dou3 | NO DEF | cifu_generated_or_undefined |
| 847 | 去邊 | 30 | *heoi3bin1 | NO DEF | cifu_generated_or_undefined |
| 853 | 知點 | 30 | *zi1\|zi3dim2 | NO DEF | cifu_generated_or_undefined |
| 868 | 講真 | 30 | *gong2zan1 | NO DEF | cifu_generated_or_undefined |
| 871 | 行行 | 29 | *hang4\|haang4\|hang6\|hong4\|hong2hang4\|haang4\|hang6\|hong4\|hong2 | NO DEF | cifu_generated_or_undefined |
| 877 | 問下 | 29 | *man6haa6 | NO DEF | cifu_generated_or_undefined |
| 883 | 一日 | 28 | *jat1jat6 | NO DEF | cifu_generated_or_undefined |
| 887 | 右手面 | 28 | jau6sau2min6 | NO DEF | cifu_generated_or_undefined |
| 888 | 左手 | 28 | zo2sau2 | NO DEF | cifu_generated_or_undefined |
| 890 | 好難 | 28 | *hou2\|hou3naan6\|naan4 | NO DEF | cifu_generated_or_undefined |
| 896 | 返到 | 28 | *faan1\|faan2dou3 | NO DEF | cifu_generated_or_undefined |
| 905 | 彭銅 | 28 | *pang4tung4 | NO DEF | cifu_generated_or_undefined |
| 912 | 點講 | 28 | *dim2gong2 | NO DEF | cifu_generated_or_undefined |
| 919 | 個樣 | 27 | *go3joeng6 | NO DEF | cifu_generated_or_undefined |
| 937 | 手邊 | 26 | *sau2bin1 | NO DEF | cifu_generated_or_undefined |
| 938 | 北行 | 26 | *bak1hang4\|haang4\|hang6\|hong4\|hong2 | NO DEF | cifu_generated_or_undefined |
| 947 | 私營化 | 26 | *si1jing4faa3 | NO DEF | cifu_generated_or_undefined |
| 951 | 掛住 | 26 | *gwaa3zyu6 | NO DEF | cifu_generated_or_undefined |
| 952 | 第日 | 26 | *dai6jat6 | NO DEF | cifu_generated_or_undefined |
| 953 | 等如 | 26 | *dang2jyu4 | NO DEF | cifu_generated_or_undefined |
| 963 | 頹餐 | 26 | *teoi4caan1 | NO DEF | cifu_generated_or_undefined |
| 971 | 左手面 | 25 | zo2sau2min6 | NO DEF | cifu_generated_or_undefined |
| 973 | 正話 | 25 | zing3waa6 | NO DEF | cifu_generated_or_undefined |
| 974 | 好彩 | 25 | hou2coi2 | NO DEF | cifu_generated_or_undefined |
| 987 | 停低 | 25 | ting4dai1 | NO DEF | cifu_generated_or_undefined |
| 997 | 四個 | 24 | *sei3go3 | NO DEF | cifu_generated_or_undefined |
| 999 | 同人 | 24 | *tung4jan4 | NO DEF | cifu_generated_or_undefined |
| 1013 | 條路 | 24 | *tiu4lou6 | NO DEF | cifu_generated_or_undefined |
| 1018 | 會考 | 24 | *wui5\|wui6\|wui2haau2 | NO DEF | cifu_generated_or_undefined |
| 1026 | 噉樣樣 | 24 | *gam2joeng2joeng6 | NO DEF | cifu_generated_or_undefined |
| 1030 | 講呀 | 24 | *gong2aa3\|aa1\|aa6 | NO DEF | cifu_generated_or_undefined |
| 1031 | 點呢 | 24 | *dim2ne1\|ni1\|nei1 | NO DEF | cifu_generated_or_undefined |
| 1032 | 一段 | 23 | *jat1dyun6 | NO DEF | cifu_generated_or_undefined |
| 1036 | 下個 | 23 | *haa6go3 | NO DEF | cifu_generated_or_undefined |
| 1041 | 皮池 | 23 | *pei4ci4 | NO DEF | cifu_generated_or_undefined |
| 1044 | 抑或 | 23 | *jik1waak6 | NO DEF | cifu_generated_or_undefined |
| 1048 | 南行 | 23 | *naam4hang4\|haang4\|hang6\|hong4\|hong2 | NO DEF | cifu_generated_or_undefined |
| 1050 | 重係 | 23 | *zung6\|cung4\|cung5hai6 | NO DEF | cifu_generated_or_undefined |

## Highest-frequency structurally segmentable forms

| Rank | Form | Count | Jyutping | Cifu definition | Audit note |
|---:|---|---:|---|---|---|
| 56 | 真係 | 872 | zan1hai6 | really | lexically_segmentable_as=真+係;not_proof_of_construction_analysis |
| 73 | 噉樣 | 681 | gam2joeng2 | this way | lexically_segmentable_as=噉+樣;not_proof_of_construction_analysis |
| 140 | 個人 | 284 | go3jan4 | individual/personal/oneself | lexically_segmentable_as=個+人;not_proof_of_construction_analysis |
| 144 | 上去 | 270 | soeng5heoi3 | to go up | lexically_segmentable_as=上+去;not_proof_of_construction_analysis |
| 185 | 過去 | 185 | gwo3heoi3 | (in the) past/former/previous/to go over/to pass by | lexically_segmentable_as=過+去;not_proof_of_construction_analysis |
| 192 | 一樣 | 177 | jat1joeng6 | same/like/equal to/the same as/just like | lexically_segmentable_as=一+樣;not_proof_of_construction_analysis |
| 200 | 第一 | 170 | dai6jat1 | first/number one | lexically_segmentable_as=第+一;not_proof_of_construction_analysis |
| 221 | 個位 | 156 | go3wai6 | the units place (or column) in the decimal system | lexically_segmentable_as=個+位;not_proof_of_construction_analysis |
| 233 | 出嚟 | 151 | ceot1lai4 | to come out | lexically_segmentable_as=出+嚟;not_proof_of_construction_analysis |
| 241 | 都會 | 147 | dou1wui5 | society/community/city/metropolis | lexically_segmentable_as=都+會;not_proof_of_construction_analysis |
| 245 | 左面 | 145 | zo2min6 | left side | lexically_segmentable_as=左+面;not_proof_of_construction_analysis |
| 256 | 啱啱 | 141 | ngaam1ngaam1 | just now | lexically_segmentable_as=啱+啱;not_proof_of_construction_analysis |
| 283 | 車站 | 120 | ce1zaam6 | rail station/bus stop | lexically_segmentable_as=車+站;not_proof_of_construction_analysis |
| 286 | 差唔多 | 119 | caa1m4do1 | similar | lexically_segmentable_as=差+唔+多;not_proof_of_construction_analysis |
| 288 | 魚排 | 118 | jyu4paai4 | fish steak | lexically_segmentable_as=魚+排;not_proof_of_construction_analysis |
| 296 | 唔同 | 114 | m4tung4 | different | lexically_segmentable_as=唔+同;not_proof_of_construction_analysis |
| 298 | 會見 | 114 | wui6gin3 | to meet with (sb who is paying a visit) | lexically_segmentable_as=會+見;not_proof_of_construction_analysis |
| 311 | 等等 | 106 | dang2dang2 | etcetera/and so on ../wait a minute!/hold on! | lexically_segmentable_as=等+等;not_proof_of_construction_analysis |
| 322 | 同學 | 102 | tung4hok6 | (fellow) classmate | lexically_segmentable_as=同+學;not_proof_of_construction_analysis |
| 330 | 有時 | 100 | jau5si4 | sometimes/now and then | lexically_segmentable_as=有+時;not_proof_of_construction_analysis |
| 332 | 仲有 | 99 | zung6jau5 | furthermore | lexically_segmentable_as=仲+有;not_proof_of_construction_analysis |
| 336 | 大樹 | 98 | daai6syu6 | tree | lexically_segmentable_as=大+樹;not_proof_of_construction_analysis |
| 376 | 風車 | 84 | fung1ce1 | pinwheel/windmill | lexically_segmentable_as=風+車;not_proof_of_construction_analysis |
| 394 | 完全 | 80 | jyun4cyun4 | complete/whole/totally/entirely | lexically_segmentable_as=完+全;not_proof_of_construction_analysis |
| 412 | 首先 | 75 | sau2sin1 | first (of all)/in the first place | lexically_segmentable_as=首+先;not_proof_of_construction_analysis |
| 419 | 全部 | 74 | cyun4bou6 | whole/entire/complete | lexically_segmentable_as=全+部;not_proof_of_construction_analysis |
| 428 | 得到 | 72 | dak1dou2 | to get/to obtain/to receive | lexically_segmentable_as=得+到;not_proof_of_construction_analysis |
| 435 | 就算 | 70 | zau6syun3 | granted that/even if | lexically_segmentable_as=就+算;not_proof_of_construction_analysis |
| 439 | 出去 | 69 | ceot1heoi3 | to go out | lexically_segmentable_as=出+去;not_proof_of_construction_analysis |
| 441 | 唔記得 | 69 | m4gei3dak1 | to forget | lexically_segmentable_as=唔+記得;not_proof_of_construction_analysis |
| 480 | 讀書 | 62 | duk6syu1 | study/read | lexically_segmentable_as=讀+書;not_proof_of_construction_analysis |
| 515 | 信心 | 57 | seon3sam1 | confidence/faith (in sb or sth) | lexically_segmentable_as=信+心;not_proof_of_construction_analysis |
| 542 | 緊要 | 54 | gan2jiu3 | important | lexically_segmentable_as=緊+要;not_proof_of_construction_analysis |
| 546 | 左上 | 53 | zo2soeng6 | upper left | lexically_segmentable_as=左+上;not_proof_of_construction_analysis |
| 570 | 打電話 | 51 | daa2din6waa2 | to make a telephone call | lexically_segmentable_as=打+電話;not_proof_of_construction_analysis |
| 576 | 上行 | 50 | soeng6hang4 | up train (i.e. towards the capital) | lexically_segmentable_as=上+行;not_proof_of_construction_analysis |
| 592 | 右上 | 48 | jau6soeng6 | upper right | lexically_segmentable_as=右+上;not_proof_of_construction_analysis |
| 595 | 返工 | 48 | faan1gung1 | go to work | lexically_segmentable_as=返+工;not_proof_of_construction_analysis |
| 599 | 發覺 | 48 | faat3gok3 | to find/to detect/to discover | lexically_segmentable_as=發+覺;not_proof_of_construction_analysis |
| 600 | 落到 | 48 | lok6dou2 | befallen | lexically_segmentable_as=落+到;not_proof_of_construction_analysis |
| 613 | 講到 | 47 | gong2dou3 | to talk about sth | lexically_segmentable_as=講+到;not_proof_of_construction_analysis |
| 622 | 會話 | 46 | wui6waa6 | conversation | lexically_segmentable_as=會+話;not_proof_of_construction_analysis |
| 628 | 水平 | 45 | seoi2ping4 | level (of achievement etc)/standard/horizontal | lexically_segmentable_as=水+平;not_proof_of_construction_analysis |
| 635 | 最好 | 45 | zeoi3hou2 | best/(you) had better (do what we suggest) | lexically_segmentable_as=最+好;not_proof_of_construction_analysis |
| 655 | 同一 | 42 | tung4jat1 | identical/the same | lexically_segmentable_as=同+一;not_proof_of_construction_analysis |
| 668 | 分鐘 | 41 | fan1zung1 | minute | lexically_segmentable_as=分+鐘;not_proof_of_construction_analysis |
| 671 | 平時 | 41 | ping4si4 | in normal times/in peacetime | lexically_segmentable_as=平+時;not_proof_of_construction_analysis |
| 672 | 打開 | 41 | daa2hoi1 | to open/to show (a ticket)/to turn on/to switch on | lexically_segmentable_as=打+開;not_proof_of_construction_analysis |
| 684 | 人工 | 40 | jan4gung1 | artificial/manpower/manual work | lexically_segmentable_as=人+工;not_proof_of_construction_analysis |
| 696 | 慢慢 | 40 | maan6maan6 | slowly | lexically_segmentable_as=慢+慢;not_proof_of_construction_analysis |
| 699 | 女人 | 39 | neoi5jan2 | woman | lexically_segmentable_as=女+人;not_proof_of_construction_analysis |
| 717 | 個個 | 38 | go3go3 | each one individually/each and every/same as 各個\|各个 | lexically_segmentable_as=個+個;not_proof_of_construction_analysis |
| 722 | 一半 | 37 | jat1bun3 | half | lexically_segmentable_as=一+半;not_proof_of_construction_analysis |
| 730 | 下行 | 36 | haa6hang4 | down train (i.e. away from the capital) | lexically_segmentable_as=下+行;not_proof_of_construction_analysis |
| 743 | 港人 | 36 | gong2jan4 | Hong Kong person or people | lexically_segmentable_as=港+人;not_proof_of_construction_analysis |
| 761 | 幾個 | 35 | gei2go3 | a few/several/how many | lexically_segmentable_as=幾+個;not_proof_of_construction_analysis |
| 764 | 講話 | 35 | gong2waa6 | a speech/to speak/to talk/to address | lexically_segmentable_as=講+話;not_proof_of_construction_analysis |
| 767 | 大學 | 34 | daai6hok6 | university | lexically_segmentable_as=大+學;not_proof_of_construction_analysis |
| 786 | 右手 | 33 | jau6sau2 | right-hand | lexically_segmentable_as=右+手;not_proof_of_construction_analysis |
| 788 | 有錢 | 33 | jau5cin2 | to be rich/rich | lexically_segmentable_as=有+錢;not_proof_of_construction_analysis |
| 806 | 好玩 | 32 | hou2waan2 | fun (to do) | lexically_segmentable_as=好+玩;not_proof_of_construction_analysis |
| 812 | 飛機 | 32 | fei1gei1 | airplane/CL: 架[jia4] | lexically_segmentable_as=飛+機;not_proof_of_construction_analysis |
| 816 | 機會 | 32 | gei1wui6 | opportunity/chance/occasion | lexically_segmentable_as=機+會;not_proof_of_construction_analysis |
| 826 | 面對 | 31 | min6deoi3 | to confront/to face | lexically_segmentable_as=面+對;not_proof_of_construction_analysis |
| 839 | 一陣 | 30 | jat1zan6 | a burst/a fit/a peal | lexically_segmentable_as=一+陣;not_proof_of_construction_analysis |
| 842 | 女朋友 | 30 | neoi5pang4jau5 | female friend/girlfriend | lexically_segmentable_as=女+朋友;not_proof_of_construction_analysis |
| 861 | 最多 | 30 | zeoi3do1 | at most/maximum/largest (number of sth)/the most | lexically_segmentable_as=最+多;not_proof_of_construction_analysis |
| 863 | 發生 | 30 | faat3sang1 | to happen/to occur/to take place/to break out | lexically_segmentable_as=發+生;not_proof_of_construction_analysis |
| 875 | 返學 | 29 | faan1hok6 | go to school | lexically_segmentable_as=返+學;not_proof_of_construction_analysis |
| 894 | 明明 | 28 | ming4ming4 | obviously/plainly/undoubtedly/definitely | lexically_segmentable_as=明+明;not_proof_of_construction_analysis |
| 914 | 一下 | 27 | jat1haa5 | (used after a verb) give it a go/to do (sth for a bit to give it a try) | lexically_segmentable_as=一+下;not_proof_of_construction_analysis |
| 918 | 見過 | 27 | gin3gwo3 | to have seen | lexically_segmentable_as=見+過;not_proof_of_construction_analysis |
| 956 | 開支 | 26 | hoi1zi1 | expenditures/pay/expenses | lexically_segmentable_as=開+支;not_proof_of_construction_analysis |
| 962 | 遲啲 | 26 | ci4di1 | later | lexically_segmentable_as=遲+啲;not_proof_of_construction_analysis |
| 964 | 上市 | 25 | soeng5si5 | on the market/to float (a company on the stock market) | lexically_segmentable_as=上+市;not_proof_of_construction_analysis |
| 970 | 奶茶 | 25 | naai5caa4 | milk tea | lexically_segmentable_as=奶+茶;not_proof_of_construction_analysis |
| 977 | 兩年 | 25 | loeng5nin4 | two years | lexically_segmentable_as=兩+年;not_proof_of_construction_analysis |
| 986 | 真正 | 25 | zan1zing3 | genuine/real/true/genuinely | lexically_segmentable_as=真+正;not_proof_of_construction_analysis |
| 988 | 幾年 | 25 | gei2nin4 | a few years/several years | lexically_segmentable_as=幾+年;not_proof_of_construction_analysis |
| 1002 | 有條 | 24 | jau5tiu4 | streakiness | lexically_segmentable_as=有+條;not_proof_of_construction_analysis |
| 1034 | 一張 | 23 | jat1zoeng1 | sheet | lexically_segmentable_as=一+張;not_proof_of_construction_analysis |
| 1035 | 八月 | 23 | baat3jyut6 | August/eighth month (of the lunar year) | lexically_segmentable_as=八+月;not_proof_of_construction_analysis |
| 1037 | 大部份 | 23 | daai6bou6fan6 | in large part/the greater part/the majority | lexically_segmentable_as=大+部+份;not_proof_of_construction_analysis |
| 1068 | 聽講 | 23 | teng1gong2 | to attend a lecture/to listen to a talk | lexically_segmentable_as=聽+講;not_proof_of_construction_analysis |
| 1076 | 生日 | 22 | saang1jat6 | birthday | lexically_segmentable_as=生+日;not_proof_of_construction_analysis |
| 1090 | 要點 | 22 | jiu3dim2 | main point/essential | lexically_segmentable_as=要+點;not_proof_of_construction_analysis |
| 1103 | 大約 | 21 | daai6joek3 | approximately/about | lexically_segmentable_as=大+約;not_proof_of_construction_analysis |
| 1104 | 分開 | 21 | fan1hoi1 | to separate/to part | lexically_segmentable_as=分+開;not_proof_of_construction_analysis |
| 1112 | 改變 | 21 | goi2bin3 | to change/to alter/to transform | lexically_segmentable_as=改+變;not_proof_of_construction_analysis |
| 1138 | 七月 | 20 | cat1jyut6 | July/seventh month | lexically_segmentable_as=七+月;not_proof_of_construction_analysis |
| 1139 | 三年 | 20 | saam1nin4 | three years | lexically_segmentable_as=三+年;not_proof_of_construction_analysis |
| 1182 | 整個 | 20 | zing2go3 | whole/entire/total | lexically_segmentable_as=整+個;not_proof_of_construction_analysis |
| 1195 | 好話 | 19 | hou2waa2 | words of praise/to speak well of | lexically_segmentable_as=好+話;not_proof_of_construction_analysis |
| 1210 | 電視機 | 19 | din6si6gei1 | television set/CL: 臺\|台[tai2] | lexically_segmentable_as=電視+機;not_proof_of_construction_analysis |
| 1220 | 分手 | 18 | fan1sau2 | to split up/to break up | lexically_segmentable_as=分+手;not_proof_of_construction_analysis |
| 1223 | 右下 | 18 | jau6haa6 | lower right | lexically_segmentable_as=右+下;not_proof_of_construction_analysis |
| 1228 | 有人 | 18 | jau5jan4 | someone/people/anyone/there is someone there/occupied (as in restroom) | lexically_segmentable_as=有+人;not_proof_of_construction_analysis |
| 1233 | 放假 | 18 | fong3gaa3 | to have a holiday or vacation | lexically_segmentable_as=放+假;not_proof_of_construction_analysis |
| 1240 | 要好 | 18 | jiu3hou2 | be on good terms/be close friends | lexically_segmentable_as=要+好;not_proof_of_construction_analysis |
| 1264 | 靚女 | 18 | leng3neoi2 | pretty girl | lexically_segmentable_as=靚+女;not_proof_of_construction_analysis |
| 1276 | 下邊 | 17 | haa6bin1 | under/the underside/below | lexically_segmentable_as=下+邊;not_proof_of_construction_analysis |
| 1281 | 左下 | 17 | zo2haa6 | lower left | lexically_segmentable_as=左+下;not_proof_of_construction_analysis |
| 1293 | 有機 | 17 | jau5gei1 | organic | lexically_segmentable_as=有+機;not_proof_of_construction_analysis |
| 1302 | 阿哥 | 17 | aa3go1 | (familiar) elder brother | lexically_segmentable_as=阿+哥;not_proof_of_construction_analysis |
| 1310 | 高度 | 17 | gou1dou6 | height/altitude/elevation/high degree/highly | lexically_segmentable_as=高+度;not_proof_of_construction_analysis |
| 1334 | 一點 | 16 | jat1dim2 | a bit/a little/one dot/one point | lexically_segmentable_as=一+點;not_proof_of_construction_analysis |
| 1337 | 上邊 | 16 | soeng6bin6 | the top/above/overhead/upwards/the top margin/above-mentioned/those higher up/mainland China/the Beijing authorities | lexically_segmentable_as=上+邊;not_proof_of_construction_analysis |
| 1398 | 冇用 | 15 | mou5jung6 | useless | lexically_segmentable_as=冇+用;not_proof_of_construction_analysis |
| 1404 | 多少 | 15 | do1siu2 | number/amount/somewhat | lexically_segmentable_as=多+少;not_proof_of_construction_analysis |
| 1405 | 多次 | 15 | do1ci3 | many times/repeatedly | lexically_segmentable_as=多+次;not_proof_of_construction_analysis |
| 1406 | 多個 | 15 | do1go3 | many/multiple/multi- (faceted, ethnic etc) | lexically_segmentable_as=多+個;not_proof_of_construction_analysis |
| 1415 | 角色 | 15 | gok3sik1 | persona/character in a novel | lexically_segmentable_as=角+色;not_proof_of_construction_analysis |
| 1492 | 每個 | 14 | mui5go3 | each | lexically_segmentable_as=每+個;not_proof_of_construction_analysis |
| 1494 | 角度 | 14 | gok3dou6 | angle/point of view | lexically_segmentable_as=角+度;not_proof_of_construction_analysis |
| 1502 | 屋企人 | 14 | uk1kei2jan4 | family | lexically_segmentable_as=屋企+人;not_proof_of_construction_analysis |
| 1545 | 一件 | 13 | jat1gin6 | piece | lexically_segmentable_as=一+件;not_proof_of_construction_analysis |
| 1548 | 十年 | 13 | sap6nin4 | ten years | lexically_segmentable_as=十+年;not_proof_of_construction_analysis |
| 1550 | 中心 | 13 | zung1sam1 | center/heart/core | lexically_segmentable_as=中+心;not_proof_of_construction_analysis |
| 1555 | 太太 | 13 | taai3taai2 | married woman/Mrs./Madam/wife | lexically_segmentable_as=太+太;not_proof_of_construction_analysis |
| 1559 | 出聲 | 13 | ceot1seng1 | to utter/to give voice | lexically_segmentable_as=出+聲;not_proof_of_construction_analysis |

## Interpretation

The mismatch count is deliberately conservative. Frequent corpus tokens include classifier phrases, negated/result strings, directional compounds, discourse fragments, and other strings that should not be lexicalized merely to raise a percentage. Conversely, independently supportable standalone words are added in the same task when they fit an existing lexical category without inventing grammar. The TSV preserves every ranked form and its audit disposition for subsequent lexical review.
