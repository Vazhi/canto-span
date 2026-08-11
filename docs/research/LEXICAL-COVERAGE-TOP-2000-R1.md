# Top-2000 spoken Cantonese lexical coverage audit — R1

## Method

Frequency source: Cifu v1 pinned at `8d5e4903e419193f903823880a7815712072cc80`, ranked by integer `SpokenAdult` frequency. The list keeps exactly the 2,000 highest-frequency unique non-empty forms with positive spoken frequency and does not filter forms according to expected parser usefulness. Cifu supplies the ranking, Jyutping, definition field, and structure field. Wiktionary is an approved secondary lexical-verification source; Wiktionary page prominence is not used for frequency ranking.

Runtime baseline: Canto Span v0.5.226 ancestry after merged PR #779. Exact token-lexicon matches are `covered_main` unless the supplied Cifu/runtime readings do not correspond cleanly, in which case they are `surface_covered_sense_uncertain`. Exact source mentions outside the token lexicon are conservatively `handled_structurally`; this is a review flag, not proof of complete lexical support. Other surface forms are `missing`. Cifu word segmentation includes multi-token/compositional strings, so `missing` is not equivalent to “add this whole string to the lexicon.”

## Coverage counts

- `covered_main`: **439**
- `handled_structurally`: **50**
- `missing`: **1487**
- `surface_covered_sense_uncertain`: **24**

## Highest-frequency unmatched forms

| Rank | Form | Count | Jyutping | Cifu definition | Cifu structure |
|---:|---|---:|---|---|---|
| 19 | 即係 | 2930 | zik1hai6 | exactly | ⿰&CDP-8B7C;卩:⿰亻系 |
| 27 | 即 | 1930 | zik1 | namely/that is/i.e./prompt/at once/at present/even if/prompted (by the occasion)/to approach/to come into contact/to assume (office)/to draw near | ⿰&CDP-8B7C;卩 |
| 39 | 喀 | 1219 | kak1 | (onomat.) | ⿰口客 |
| 48 | 其實 | 1015 | kei4sat6 | actually/that is not the case/in fact/really | ⿱&CDP-8B72;八:⿱宀貫 |
| 52 | 中間 | 952 | zung1gaan1 | between/intermediate/mid/middle | ⿻口丨:⿵門日 |
| 56 | 真係 | 872 | zan1hai6 | really | ⿱十具:⿰亻系 |
| 58 | 誒 | 817 | aai2|ei6|oi1 | hey | ⿰言矣 |
| 65 | 下面 | 753 | haa6min6 | below/under/next/the following | ⿱一卜:⿱丆囬 |
| 69 | 哦 | 710 | ngo4|o4|o6 | oh (叹词, interjection)/to chant | ⿰口我 |
| 72 | 咁樣 | 703 | gam2joeng2 | NO DEF | ⿰口甘:⿰木羕 |
| 73 | 噉樣 | 681 | gam2joeng2 | this way | ⿰口敢:⿰木羕 |
| 78 | 兜 | 647 | dau1 | container for rice, pet food or coins/to move in a circle/to canvas or solicit/to go for a (leisurely) stroll, drive, jaunt | ⿱⿲&CDP-8CBD;白コ儿 |
| 93 | 經過 | 459 | ging1gwo3 | to pass/to go through/process/course | ⿰糹巠[GTV],⿰糸巠[JK]:⿺辶咼 |
| 109 | 嘛 | 402 | maa4 | (a modal particle) | ⿰口麻 |
| 112 | 譬如 | 390 | pei3jyu4 | for example/for instance/such as | ⿱辟言:⿰女口 |
| 116 | 嗯 | 370 | ng2 | (a groaning sound)/(nonverbal grunt as interjection)/OK, yeah/what?/interjection indicating approval, appreciation or agreement | ⿰口恩 |
| 120 | 哩 | 342 | lei5|le1|lei1|li1 | (modal final particle sim. to 呢 or 啦)/(onomat.)/see 哩哩羅羅\|哩哩罗罗 lililuoluo endless mumbling noise/see 哩哩啦啦 lililala, scattered or intermittent/mile/old form of modern 英里 | ⿰口里 |
| 121 | 落去 | 329 | lok6heoi3 | NO DEF | ⿱艹洛:⿱土厶 |
| 125 | 方 | 322 | fong1 | square/quadrilateral/power (such as cube 立方)/classifier for square things/upright/honest/fair and square/surname Fang/direction/party (to a dispute)/one side/place/method/prescription/just/then/only then | ⿱亠&CDP-8B6C; |
| 128 | 沙漠 | 314 | saa1mok6 | desert | ⿰氵少:⿰氵莫 |
| 136 | 嘩 | 298 | waa1|waa4 | cat-calling sound/clamor/noise/crashing sound | ⿰口華 |
| 137 | 穿過 | 297 | cyun1gwo3 | to pass through | ⿱穴牙:⿺辶咼 |
| 139 | 兩個 | 291 | *loeng5go3 | NO DEF | ⿱一&CDP-8C62;:⿰亻固 |
| 140 | 個人 | 284 | go3jan4 | individual/personal/oneself | ⿰亻固:人 |
| 141 | 終點 | 283 | zung1dim2 | the end/end point/finishing line (in a race)/destination/terminus | ⿰糹冬[GTV],⿰糸冬[JK]:⿰黑占 |
| 142 | 洞 | 278 | dung6 | cave/hole/the female sexual organ, "hole", "cunt"/CL:個[go] | ⿰氵同 |
| 143 | 山 | 271 | saan1 | mountain/hill/CL:座[joh] | 山 |
| 144 | 上去 | 270 | soeng5heoi3 | to go up | ⿱⺊一:⿱土厶 |
| 146 | 園 | 265 | jyun4 | garden | ⿴囗袁 |
| 147 | 角 | 264 | gok3 | angle/horn/horn-shaped/unit of money equal to 0.1 yuan/role (theater)/to compete/ancient three legged wine vessel/third note of pentatonic scale/surname Jue | 角 |
| 149 | 揾 | 255 | *? | NO DEF | ⿰扌昷 |
| 151 | 哩個 | 254 | *lei5|le1|lei1|li1go3 | NO DEF | ⿰口里:⿰亻固 |
| 153 | 亦 | 250 | jik6 | also | ⿱亠&CDP-8CB5; |
| 156 | 有個 | 245 | *jau5go3 | NO DEF | ⿸𠂇月:⿰亻固 |
| 157 | 唔到 | 244 | *m4dou3 | NO DEF | ⿰口吾:⿰至刂 |
| 162 | 埋 | 234 | maai4 | bury/to blame | ⿰土里 |
| 164 | 線 | 230 | sin3 | thread/string/wire/line | ⿰糹泉[GT],⿰糸泉[JK] |
| 165 | 但 | 227 | daan6 | but/yet/however/only/merely/still | ⿰亻旦 |
| 168 | 樹 | 218 | syu6 | tree | ⿰木尌 |
| 169 | 一路 | 217 | jat1lou6 | continually | 一:⿰𧾷各 |
| 171 | 政府 | 211 | zing3fu2 | government | ⿰正攵:⿸广付 |
| 173 | 塔 | 201 | taap3 | to lock/to lock up/to handcuff/a lock/pagoda/tower/minaret | ⿰土荅 |
| 174 | 裏 | 201 | leoi5 | inside/internal/interior/lining/village/basic unit of city administration | ⿳亠里𧘇 |
| 179 | 池 | 192 | ci4 | pond/reservoir/surname Chi | ⿰氵也 |
| 180 | 茅屋 | 192 | maau4uk1 | cottage | ⿱艹矛:⿸尸至 |
| 183 | 知道 | 186 | zi1dou3 | know/be aware of | ⿰矢口:⿺辶首 |
| 185 | 過去 | 185 | gwo3heoi3 | (in the) past/former/previous/to go over/to pass by | ⿺辶咼:⿱土厶 |
| 188 | 頭先 | 183 | tau4sin1 | NO DEF | ⿰豆頁:⿱𠂒儿 |
| 189 | 右邊 | 181 | jau6bin1 | right/opposite: left 左邊\|左边/the right side/to the right | ⿸𠂇口:⿺辶臱 |
| 190 | 而 | 179 | ji4 | and/as well as/and so/but (not)/yet (not)/(indicates causal relation)/(indicates change of state)/(indicates contrast) | ⿱一𦓐 |
| 191 | 一直 | 178 | jat1zik6 | straight (in a straight line)/continuously/always/from the beginning of ... up to .../all along | 一:⿱十&CDP-8BA5;[GT],⿱十⿺𠃊目[JK] |
| 192 | 一樣 | 177 | jat1joeng6 | same/like/equal to/the same as/just like | 一:⿰木羕 |
| 193 | 香 | 175 | hoeng1 | fragrant/sweet smelling/aromatic/savory or appetizing/(to eat) with relish/(of sleep) sound/perfume or spice/joss or incense stick/CL:枝[jī]/to die (euphemistic, a reference to the custom of burning joss sticks in honour of the departed). | ⿱禾日 |
| 197 | 方向 | 171 | fong1hoeng3 | direction/orientation/path to follow | ⿱亠&CDP-8B6C;:⿵&CDP-8BD6;口 |
| 200 | 第一 | 170 | dai6jat1 | first/number one | ⿱竹𢎨:一 |
| 203 | 左邊 | 168 | zo2bin1 | left/the left side/to the left of | ⿸𠂇工:⿺辶臱 |
| 204 | 善 | 167 | sin6 | good (virtuous)/benevolent/well-disposed/good at sth/to improve or perfect/to kill/to injure | ⿱⿱羊䒑口[GJK],⿱⿱𦍌䒑口[TV] |
| 205 | 港 | 167 | gong2 | harbor/port/CL:個[go]/Hong Kong, abbr. for 香港[hēung góng] | ⿰氵巷 |
| 206 | 繼續 | 166 | gai3zuk6 | to continue/to proceed with/to go on with | ⿰糹㡭[GTV],⿰糸㡭[JK]:⿰糹賣[GTV],⿰糸𧶠[JK] |
| 211 | 場 | 162 | coeng4 | large place used for a specific purpose/stage/scene (of a play)/classifier for sporting or recreational activities/classifier for number of exams/classifier for events and happenings: spell, episode, bout | ⿰土昜 |
| 212 | 台 | 161 | toi4 | (classical) you (in letters)/platform/Taiwan (abbr.)/a surname | ⿱厶口 |
| 213 | 湖 | 160 | wu4 | lake | ⿰氵胡 |
| 214 | 番 | 159 | faan1 | foreign/ethnic groups from outside China/(when used after a verb) times or fold/classifier for the number of iterations of an action or deed etc | ⿱釆田 |
| 217 | 唔見 | 157 | *m4gin3 | NO DEF | ⿰口吾:⿱目儿 |
| 218 | 馬戲 | 157 | maa5hei3 | circus | ⿹&CDP-896A;灬:⿰䖒戈 |
| 219 | 兜過 | 157 | *dau1gwo3 | NO DEF | ⿱⿲&CDP-8CBD;白コ儿:⿺辶咼 |
| 221 | 個位 | 156 | go3wai6 | the units place (or column) in the decimal system | ⿰亻固:⿰亻立 |
| 222 | 比較 | 155 | bei2gaau3 | compare/contrast/fairly/comparatively/relatively/quite/rather | 比:⿰車交 |
| 223 | 冇乜 | 154 | *mou5mat1 | NO DEF | ⿸𠂇冂:乜 |
| 225 | 恨 | 154 | han6 | to hate/to regret/to desire/to long for | ⿰忄艮 |
| 227 | 點鐘 | 154 | dim2zung1 | (indicating time of day) o'clock | ⿰黑占:⿰金童 |
| 228 | 交叉 | 153 | gaau1caa1 | cross/intersect | ⿱亠父:⿴又丶 |
| 229 | 死 | 153 | sei2 | to die/impassable/uncrossable/inflexible/rigid/extremely/used to stress the meaning of a word or phrase/used to emphasise negative characteristics, "shitty", "damned", "useless" | ⿸歹匕,⿱一𡖅 |
| 231 | 韻 | 152 | wan6 | beautiful sound/appeal/charm/vowel/rhyme/in Chinese phonetics, the medial and final sound of a syllable (i.e. excluding the initial consonant) | ⿰音員 |
| 233 | 出嚟 | 151 | ceot1lai4 | to come out | ⿱屮凵:⿰口黎 |
| 234 | 返去 | 150 | faan1heoi3 | NO DEF | ⿺辶反:⿱土厶 |
| 238 | 廟 | 149 | miu6 | temple/monastery | ⿸广朝 |
| 239 | 戀 | 149 | lyun2|lyun5 | to feel attached to/long for/love | ⿱䜌心 |
| 241 | 都會 | 147 | dou1wui5 | society/community/city/metropolis | ⿰者阝:⿱亼𭥴 |
| 242 | 右面 | 146 | jau6min6 | NO DEF | ⿸𠂇口:⿱丆囬 |
| 243 | 泳池 | 146 | wing6ci4 | swimming pond | ⿰氵永:⿰氵也 |
| 244 | 需要 | 146 | seoi1jiu3 | to need/to want/to demand/needs/to require | ⿱雨而:⿱覀女 |
| 245 | 左面 | 145 | zo2min6 | left side | ⿸𠂇工:⿱丆囬 |
| 247 | 成 | 144 | sing4 | to succeed/to finish/to complete/to accomplish/to become/to turn into/one tenth\|whole/complete/to be all right/OK! | ⿵戊𠃌 |
| 248 | 位置 | 144 | wai6zi3 | position/place/seat | ⿰亻立:⿱罒直 |
| 252 | 團 | 143 | tyun4 | regiment/round/circular/group/society | ⿴囗專 |
| 253 | 機場 | 143 | gei1coeng4 | airport/airfield | ⿰木幾:⿰土昜 |
| 254 | 之間 | 141 | zi1gaan1 | between/among/inter- | ⿱丶&CDP-8661;:⿵門日 |
| 256 | 啱啱 | 141 | ngaam1ngaam1 | just now | ⿰口岩:⿰口岩 |
| 257 | 唉 | 140 | aai1|oi1 | alas/oh dear/interjection or grunt of agreement or recognition (e.g. yes, it's me!)/to sigh | ⿰口矣 |
| 258 | 梗係 | 140 | gang2hai6 | of course | ⿰木更:⿰亻系 |
| 259 | 哎 | 138 | aai1 | hey!/interjection used to attract attention or to express surprise or disapprobation | ⿰口艾 |
| 260 | 蛇 | 138 | se4 | snake/serpent/CL:條[tìuh]/to shirk one's duty, to be lazy on the job | ⿰虫它 |
| 261 | 枉 | 136 | wong2 | in the wrong/in vain | ⿰木王 |
| 263 | 擰 | 133 | ning4|ning6 | mistake/to twist/stubborn/to pinch/wring | ⿰扌寧 |
| 265 | 丸 | 131 | jyun2|jyun4 | pill | ⿻九丶[GJ],⿵九丶[TKV] |
| 268 | 隔離 | 129 | gaak3lei4 | to separate/to isolate | ⿰阝鬲:⿰离隹 |
| 272 | 搞 | 127 | gaau2 | to do/to make/to go in for/to set up/to get hold of/to take care of | ⿰扌高 |
| 273 | 葡萄 | 127 | pou4tou4 | grape | ⿱艹匍:⿱艹匋 |
| 274 | 往 | 126 | wong5 | to go (in a direction)/to/towards/(of a train) bound for/past/previous | ⿰彳主 |
| 275 | 淨係 | 125 | zing6hai6 | NO DEF | ⿰氵爭:⿰亻系 |
| 276 | 迷宮 | 124 | mai4gung1 | maze/labyrinth | ⿺辶米:⿱宀呂 |
| 278 | 底 | 123 | dai2 | background/bottom/base/plan, strategy or secret/the end of a period of time/towards the end of (last month) | ⿸广氐 |
| 279 | 宅 | 122 | zaak6 | residence | ⿱宀乇 |
| 281 | 為 | 121 | wai6|wai4 | as (in the capacity of)/to take sth as/to act as/to serve as/to behave as/to become/to be/to do/because of/for/to | 為 |
| 282 | 腰 | 121 | jiu1 | waist/lower back/pocket/middle | ⿰月要[GJK],⿰⺼要[TV] |
| 283 | 車站 | 120 | ce1zaam6 | rail station/bus stop | 車:⿰立占 |
| 284 | 以前 | 119 | ji5cin4 | before/formerly/previous/ago | 以:⿱䒑刖 |
| 285 | 係噉 | 119 | *hai6gam2 | NO DEF | ⿰亻系:⿰口敢 |
| 286 | 差唔多 | 119 | caa1m4do1 | similar | ⿸羊工[G],⿸&CDP-8CCC;工[TJKV]:⿰口吾:⿱夕夕 |
| 288 | 魚排 | 118 | jyu4paai4 | fish steak | ⿳𠂊田灬:⿰扌非 |
| 290 | 另外 | 117 | ling6ngoi6 | additional/in addition/besides/separate/other/moreover/furthermore | ⿱口力:⿰夕卜 |
| 291 | 科技 | 117 | fo1gei6 | science and technology | ⿰禾斗:⿰扌支 |
| 295 | 萍 | 115 | ping4 | duckweed | ⿱艹泙 |
| 296 | 唔同 | 114 | m4tung4 | different | ⿰口吾:⿵𠔼口 |
| 297 | 條線 | 114 | *tiu4sin3 | NO DEF | ⿰&CDP-8B7A;条[G],⿰&CDP-8B7A;&CDP-8BFB;[TJKV]:⿰糹泉[GT],⿰糸泉[JK] |
| 298 | 會見 | 114 | wui6gin3 | to meet with (sb who is paying a visit) | ⿱亼𭥴:⿱目儿 |
| 299 | 起點 | 111 | hei2dim2 | starting point | ⿺走巳[GJK],⿺走己[TV]:⿰黑占 |
| 302 | 希望 | 110 | hei1mong6 | to wish for/to desire/to hope | ⿱㐅布:⿱⿰亡月王[GJK],⿱&CDP-8C47;𡈼[TV] |
| 305 | 南 | 109 | naam4 | south | ⿱十&CDP-8BDC; |
| 307 | 吔 | 108 | jaa3 | particle | ⿰口也 |
| 308 | 滑雪 | 108 | waat6syut3 | to ski/skiing | ⿰氵骨:⿱雨彐 |
| 310 | 明白 | 106 | ming4baak6 | clear/obvious/unequivocal/to understand/to realize | ⿰日月:白 |
| 311 | 等等 | 106 | dang2dang2 | etcetera/and so on ../wait a minute!/hold on! | ⿱竹寺:⿱竹寺 |
| 315 | 冇錯 | 104 | mou5co3 | that's correct | ⿸𠂇冂:⿰金昔 |
| 317 | 根本 | 104 | gan1bun2 | fundamental/basic/root/simply/absolutely (not)/(not) at all | ⿰木艮:本 |
| 318 | 盛 | 104 | sing6|sing4 | flourishing/vigorous/magnificent/extensively/to hold/contain/to ladle/pick up with a utensil/used to indicate a further series of events not specified, "and so on", "etcetera"/a surname | ⿱成皿 |
| 319 | 燕 | 104 | jin3|jin1 | Yan, a vassal state of Zhou in modern Hebei and Liaoning/north Hebei/the four Yan kingdoms of the Sixteen Kingdoms, namely: Former Yan 前燕 (337-370), Later Yan 後燕\|后燕 (384-409), Southern Yan 南燕 (398-410), Northern Yan 北燕 (409-436)/surname Yan/swallow (a type of bird) | ⿳廿&CDP-8D76;灬 |
| 321 | 工廠 | 102 | gung1cong2 | factory | 工:⿸广敞 |
| 322 | 同學 | 102 | tung4hok6 | (fellow) classmate | ⿵𠔼口:⿱𦥯子 |
| 324 | 傻 | 102 | so4 | foolish | ⿰亻𡕩 |
| 329 | 可 | 100 | ho2 | can/may/able to/to approve/to permit/certain(ly)/to suit/(particle used for emphasis) | ⿹丁口 |
| 330 | 有時 | 100 | jau5si4 | sometimes/now and then | ⿸𠂇月:⿰日寺 |
| 332 | 仲有 | 99 | zung6jau5 | furthermore | ⿰亻中:⿸𠂇月 |
| 333 | 唧 | 99 | zik1 | 1. to squeeze/2. to tickle | ⿰口即 |
| 336 | 大樹 | 98 | daai6syu6 | tree | ⿻一人:⿰木尌 |
| 338 | 依 | 98 | ji1 | according to/depend on/near to | ⿰亻衣 |
| 339 | 咦 | 98 | ji4 | expression of surprise | ⿰口夷 |
| 341 | 感覺 | 98 | gam2gok3 | to feel/to become aware of/feeling/sense/perception | ⿱咸心[GJK],⿵咸心[TV]:⿱𦥯見 |
| 343 | 扮 | 95 | baan6|baan3 | to disguise oneself/to dress up/adorn | ⿰扌分 |
| 346 | 擁 | 95 | jung2 | to hold/to embrace/to wrap around/to gather around (sb)/to throng/to swarm/to support | ⿰扌雍 |
| 347 | 本身 | 93 | bun2san1 | itself/in itself/per se | 本:身 |
| 348 | 方面 | 92 | fong1min6 | respect/aspect/field/side | ⿱亠&CDP-8B6C;:⿱丆囬 |
| 349 | 另 | 92 | ling6 | other/another/separate/separately | ⿱口力 |
| 350 | 扮汗 | 92 | *baan6|baan3hon6|hon4|hong6 | NO DEF | ⿰扌分:⿰氵干 |
| 351 | 格 | 92 | gaak3 | square/frame/rule/(legal) case/style/character/standard/pattern/(classical) to obstruct; to hinder/(classical) to arrive; to come/(classical) to investigate; to study exhaustively | ⿰木各 |
| 353 | 今次 | 91 | *gam1ci3 | NO DEF | ⿱亽㇇[G],⿱亼㇇[TJKV]:⿰冫欠[GJ],⿰二欠[TKV] |
| 354 | 城 | 90 | sing4 | city walls/city/town | ⿰土成 |
| 355 | 球場 | 90 | kau4coeng4 | stadium/sports ground/court/pitch/field/golf course | ⿰王求:⿰土昜 |
| 357 | 汗 | 89 | hon6|hon4|hong6 | perspiration/sweat/Khan (Persian or Mongol king or emperor)/Khan (name) | ⿰氵干 |
| 358 | 社會 | 89 | se5wui2 | society | ⿰礻土[GTJV],⿰示土[K]:⿱亼𭥴 |
| 359 | 莊 | 89 | zong1 | farmstead/village/manor/place of business/banker (in a gambling game)/grave or solemn/the committee of a student society (university jargon) | ⿱艹壯 |
| 360 | 幾好 | 89 | *gei2|gei1hou2|hou3 | NO DEF | ⿹&CDP-8BA4;人:⿰女子 |
| 361 | 彭 | 89 | pang4 | surname Peng | ⿰壴彡 |
| 362 | 煙 | 89 | jin1 | cigarette/tobacco/smoke | ⿰火垔 |
| 364 | 貧大宅 | 88 | *pan4daai6zaak2 | NO DEF | ⿱分貝:⿻一人:⿱宀乇 |
| 366 | 即刻 | 87 | zik1hak1 | immediately/instant/instantly | ⿰&CDP-8B7C;卩:⿰亥刂 |
| 367 | 勁 | 87 | ging6|ging3 | strong/powerful/excellent/great\|strength/energy/enthusiasm/CL:把[bá] | ⿰巠力 |
| 369 | 像 | 87 | zoeng6 | (look) like/similar (to)/appearance/to appear/to seem/image/portrait/resemble/seem | ⿰亻象 |
| 371 | 北方 | 86 | bak1fong1 | north/the northern part a country/China north of the Yellow River | ⿰&CDP-8BC5;匕:⿱亠&CDP-8B6C; |
| 372 | 仔 | 85 | zai2|zi2 | a son/a suffix used to describe something small/a boy/a kid/a boyfriend/(of domestic animals or fowls) young | ⿰亻子 |
| 375 | 金字塔 | 84 | gam1zi6taap3 | pyramid | ⿱人&CDP-8DE3;:⿱宀子:⿰土荅 |
| 376 | 風車 | 84 | fung1ce1 | pinwheel/windmill | ⿵几䖝:車 |
| 377 | 越 | 84 | jyut6 | generic word for peoples or states of south China or south Asia at different historical periods/abbr. for Vietnam 越南/to exceed/to climb over/to surpass/the more... the more | ⿺走戉 |
| 379 | 考 | 83 | haau2 | to check/to verify/to test/to examine/to take an exam | ⿸耂丂 |
| 380 | 當然 | 83 | dong1jin4 | only natural/as it should be/certainly/of course/without doubt | ⿱𫩠田:⿱&CDP-8BB5;灬 |
| 381 | 農 | 83 | nung4 | agriculture | ⿱曲辰 |
| 382 | 碼頭 | 83 | maa5tau4 | dock/pier/wharf/CL: 個[go]/the idea of a "pier" symbolises the leaving of the triad life, one's retirement from the life of a triad or prostitute | ⿰石馬:⿰豆頁 |
| 383 | 礦場 | 83 | kwong3coeng4 | a mine/pit | ⿰石廣:⿰土昜 |
| 385 | 女仔 | 82 | neoi5zai2 | girl | 女:⿰亻子 |
| 386 | 引 | 82 | jan5 | to draw (a bow)/to pull/to stretch sth/to extend/to lengthen/to involve in/to attract/to lead/to guide/to divert (water)/unit of distance equal to 10 丈[zhang1], now one-thirtieth km or 33.33 meters | ⿰弓丨 |
| 388 | 究竟 | 82 | gau3ging2 | after all (when all is said and done)/actually/outcome/result | ⿱穴九:⿱音儿 |
| 392 | 暖 | 81 | nyun5 | warm | ⿰日爰 |
| 393 | 總之 | 81 | zung2zi1 | in a word/in short/in brief | ⿰糹悤[GTV],⿰糸悤[JK]:⿱丶&CDP-8661; |
| 394 | 完全 | 80 | jyun4cyun4 | complete/whole/totally/entirely | ⿱宀元:⿱人王[GJ],⿱入王[TKV] |
| 395 | 情況 | 80 | cing4fong3 | circumstances/state of affairs/situation | ⿰忄青[GTJV],⿰忄靑[K]:⿰氵兄 |
| 398 | 農莊 | 79 | nung4zong1 | farm/ranch | ⿱曲辰:⿱艹壯 |
| 399 | 瀑布 | 79 | buk6bou3 | waterfall | ⿰氵暴:⿸𠂇巾 |
| 402 | 股 | 78 | gu2 | share/portion/section/part/thigh/(classifier for smells, electric currents, spirals etc)/whiff | ⿰月殳[GJK],⿰⺼殳[TV] |
| 403 | 墳場 | 78 | fan4coeng4 | grave | ⿰土賁:⿰土昜 |
| 404 | 出來 | 77 | ceot1loi4 | to come out/to emerge | ⿱屮凵:⿻木从 |
| 406 | 你講 | 76 | *nei5gong2 | NO DEF | ⿰亻尔:⿰言冓 |
| 408 | 樹林 | 76 | syu6lam4 | woods/grove/forest | ⿰木尌:⿰木木 |
| 409 | 禮堂 | 76 | lai5tong4 | assembly hall/auditorium | ⿰礻豊[GTV],⿰示豊[JK]:⿱𫩠土 |
| 411 | 所謂 | 75 | so2wai6 | so-called | ⿰戶斤[GTKV],⿰戸斤[J]:⿰言胃 |
| 412 | 首先 | 75 | sau2sin1 | first (of all)/in the first place | ⿱䒑自:⿱𠂒儿 |
| 413 | 國旗 | 75 | gwok3kei4 | flag (of a country) | ⿴囗或:⿰方&CDP-8CFC; |
| 415 | 畫到 | 75 | *waak6|waa2dou3 | NO DEF | ⿳&CDP-8BC6;田一:⿰至刂 |
| 416 | 燈塔 | 75 | dang1taap3 | lighthouse | ⿰火登:⿰土荅 |
| 417 | 講呢 | 75 | *gong2ne1|ni1|nei1 | NO DEF | ⿰言冓:⿰口尼 |
| 418 | 纜車 | 75 | laam6ce1 | cable car | ⿰糹覽[GT],⿰糸覽[JK]:車 |
| 419 | 全部 | 74 | cyun4bou6 | whole/entire/complete | ⿱人王[GJ],⿱入王[TKV]:⿰咅阝 |
| 420 | 重有 | 74 | zung6jau5 | furthermore | 重:⿸𠂇月 |
| 423 | 服務 | 73 | fuk6mou6 | to serve/service | ⿰月𠬝:⿰矛务[G],⿰矛&CDP-8C64;[TJKV] |
| 428 | 得到 | 72 | dak1dou2 | to get/to obtain/to receive | ⿰彳㝵:⿰至刂 |
| 430 | 理 | 72 | lei5 | texture/grain (of wood)/inner essence/intrinsic order/reason/logic/truth/science/natural science (esp. physics)/to manage/to pay attention to/to run (affairs)/to handle/to put in order/to tidy up | ⿰王里 |
| 431 | 種 | 72 | zung2|zung3 | abbr. for 物種\|物种, genus/race/seed/breed/species/strain/kind/type/has guts (i.e. courage)/nerve/classifier for types: kind, sort/classifier for languages/to plant/to grow/to cultivate | ⿰禾重 |
| 435 | 就算 | 70 | zau6syun3 | granted that/even if | ⿰京尤:⿱竹𥃲 |
| 436 | 虛線 | 70 | heoi1sin3 | dotted line | ⿸虍&CDP-8D6B;:⿰糹泉[GT],⿰糸泉[JK] |
| 439 | 出去 | 69 | ceot1heoi3 | to go out | ⿱屮凵:⿱土厶 |

## Review buckets

- Jyutping/sense uncertainty: 24
- Structural-source mentions requiring manual confirmation: 50
- Unmatched surface forms: 1487

The TSV is the complete 2,000-row audit. Frequency alone does not authorize a lexical sense, grammatical construction, or status change. Genuine lexical gaps are filled only after lexical verification; compositional corpus strings remain compositional rather than being added merely to raise the surface-coverage percentage.
