# Top-2000 spoken Cantonese lexical coverage audit — R1

## Method

Frequency source: Cifu v1 pinned at `8d5e4903e419193f903823880a7815712072cc80`, ranked by integer `SpokenAdult` frequency. The audit keeps the 2,000 highest-frequency unique non-empty forms with positive spoken frequency; it does not filter by script or anticipated parser usefulness. Cifu is used for ranking and its supplied Jyutping where present. Wiktionary is a permitted secondary lexical-verification source for later gap filling; frequency rank is not taken from Wiktionary.

Runtime baseline: the branch's current Canto Span `main` ancestry. Exact token-lexicon form matches are `covered_main` unless a non-empty Cifu/runtime Jyutping mismatch requires `surface_covered_sense_uncertain`. A non-lexicon form quoted elsewhere in parser/runtime sources is conservatively marked `handled_structurally`; this is a review flag, not proof that every lexical sense is supported. All other forms are `missing`.

Cifu headers: `Word`, `JyutPing`, `AdultToChild`, `AdultToChild (per million tokens)`, `SpokenAdult`, `SpokenAdult (per million tokens)`, `Written`, `Written (per million tokens)`, `SpokenChildren`, `SpokenChildren (per million tokens)`, `NStrokes`, `Structure`, `Definition`, `ND (w. ins/del, avg. freq.)`, `ND (w. ins/del, spok. freq.)`, `ND (w. ins/del, writ. freq.)`, `ND (no ins/del, avg. freq.)`, `ND (no ins/del, spok. freq.)`, `ND (no ins/del, writ. freq.)`

Duplicate source rows collapsed by surface form: 0.

## Coverage counts

- `covered_main`: **463**
- `handled_structurally`: **50**
- `missing`: **1487**

## Highest-frequency direct lexical gaps

| Rank | Form | Cifu spoken count | Cifu Jyutping |
|---:|---|---:|---|
| 19 | 即係 | 2930 |  |
| 27 | 即 | 1930 |  |
| 39 | 喀 | 1219 |  |
| 48 | 其實 | 1015 |  |
| 52 | 中間 | 952 |  |
| 56 | 真係 | 872 |  |
| 58 | 誒 | 817 |  |
| 65 | 下面 | 753 |  |
| 69 | 哦 | 710 |  |
| 72 | 咁樣 | 703 |  |
| 73 | 噉樣 | 681 |  |
| 78 | 兜 | 647 |  |
| 93 | 經過 | 459 |  |
| 109 | 嘛 | 402 |  |
| 112 | 譬如 | 390 |  |
| 116 | 嗯 | 370 |  |
| 120 | 哩 | 342 |  |
| 121 | 落去 | 329 |  |
| 125 | 方 | 322 |  |
| 128 | 沙漠 | 314 |  |
| 136 | 嘩 | 298 |  |
| 137 | 穿過 | 297 |  |
| 139 | 兩個 | 291 |  |
| 140 | 個人 | 284 |  |
| 141 | 終點 | 283 |  |
| 142 | 洞 | 278 |  |
| 143 | 山 | 271 |  |
| 144 | 上去 | 270 |  |
| 146 | 園 | 265 |  |
| 147 | 角 | 264 |  |
| 149 | 揾 | 255 |  |
| 151 | 哩個 | 254 |  |
| 153 | 亦 | 250 |  |
| 156 | 有個 | 245 |  |
| 157 | 唔到 | 244 |  |
| 162 | 埋 | 234 |  |
| 164 | 線 | 230 |  |
| 165 | 但 | 227 |  |
| 168 | 樹 | 218 |  |
| 169 | 一路 | 217 |  |
| 171 | 政府 | 211 |  |
| 173 | 塔 | 201 |  |
| 174 | 裏 | 201 |  |
| 179 | 池 | 192 |  |
| 180 | 茅屋 | 192 |  |
| 183 | 知道 | 186 |  |
| 185 | 過去 | 185 |  |
| 188 | 頭先 | 183 |  |
| 189 | 右邊 | 181 |  |
| 190 | 而 | 179 |  |
| 191 | 一直 | 178 |  |
| 192 | 一樣 | 177 |  |
| 193 | 香 | 175 |  |
| 197 | 方向 | 171 |  |
| 200 | 第一 | 170 |  |
| 203 | 左邊 | 168 |  |
| 204 | 善 | 167 |  |
| 205 | 港 | 167 |  |
| 206 | 繼續 | 166 |  |
| 211 | 場 | 162 |  |
| 212 | 台 | 161 |  |
| 213 | 湖 | 160 |  |
| 214 | 番 | 159 |  |
| 217 | 唔見 | 157 |  |
| 218 | 馬戲 | 157 |  |
| 219 | 兜過 | 157 |  |
| 221 | 個位 | 156 |  |
| 222 | 比較 | 155 |  |
| 223 | 冇乜 | 154 |  |
| 225 | 恨 | 154 |  |
| 227 | 點鐘 | 154 |  |
| 228 | 交叉 | 153 |  |
| 229 | 死 | 153 |  |
| 231 | 韻 | 152 |  |
| 233 | 出嚟 | 151 |  |
| 234 | 返去 | 150 |  |
| 238 | 廟 | 149 |  |
| 239 | 戀 | 149 |  |
| 241 | 都會 | 147 |  |
| 242 | 右面 | 146 |  |
| 243 | 泳池 | 146 |  |
| 244 | 需要 | 146 |  |
| 245 | 左面 | 145 |  |
| 247 | 成 | 144 |  |
| 248 | 位置 | 144 |  |
| 252 | 團 | 143 |  |
| 253 | 機場 | 143 |  |
| 254 | 之間 | 141 |  |
| 256 | 啱啱 | 141 |  |
| 257 | 唉 | 140 |  |
| 258 | 梗係 | 140 |  |
| 259 | 哎 | 138 |  |
| 260 | 蛇 | 138 |  |
| 261 | 枉 | 136 |  |
| 263 | 擰 | 133 |  |
| 265 | 丸 | 131 |  |
| 268 | 隔離 | 129 |  |
| 272 | 搞 | 127 |  |
| 273 | 葡萄 | 127 |  |
| 274 | 往 | 126 |  |
| 275 | 淨係 | 125 |  |
| 276 | 迷宮 | 124 |  |
| 278 | 底 | 123 |  |
| 279 | 宅 | 122 |  |
| 281 | 為 | 121 |  |
| 282 | 腰 | 121 |  |
| 283 | 車站 | 120 |  |
| 284 | 以前 | 119 |  |
| 285 | 係噉 | 119 |  |
| 286 | 差唔多 | 119 |  |
| 288 | 魚排 | 118 |  |
| 290 | 另外 | 117 |  |
| 291 | 科技 | 117 |  |
| 295 | 萍 | 115 |  |
| 296 | 唔同 | 114 |  |
| 297 | 條線 | 114 |  |
| 298 | 會見 | 114 |  |
| 299 | 起點 | 111 |  |
| 302 | 希望 | 110 |  |
| 305 | 南 | 109 |  |
| 307 | 吔 | 108 |  |
| 308 | 滑雪 | 108 |  |
| 310 | 明白 | 106 |  |
| 311 | 等等 | 106 |  |
| 315 | 冇錯 | 104 |  |
| 317 | 根本 | 104 |  |
| 318 | 盛 | 104 |  |
| 319 | 燕 | 104 |  |
| 321 | 工廠 | 102 |  |
| 322 | 同學 | 102 |  |
| 324 | 傻 | 102 |  |
| 329 | 可 | 100 |  |
| 330 | 有時 | 100 |  |
| 332 | 仲有 | 99 |  |
| 333 | 唧 | 99 |  |
| 336 | 大樹 | 98 |  |
| 338 | 依 | 98 |  |
| 339 | 咦 | 98 |  |
| 341 | 感覺 | 98 |  |
| 343 | 扮 | 95 |  |
| 346 | 擁 | 95 |  |
| 347 | 本身 | 93 |  |
| 348 | 方面 | 92 |  |
| 349 | 另 | 92 |  |
| 350 | 扮汗 | 92 |  |
| 351 | 格 | 92 |  |
| 353 | 今次 | 91 |  |
| 354 | 城 | 90 |  |
| 355 | 球場 | 90 |  |
| 357 | 汗 | 89 |  |
| 358 | 社會 | 89 |  |
| 359 | 莊 | 89 |  |
| 360 | 幾好 | 89 |  |
| 361 | 彭 | 89 |  |
| 362 | 煙 | 89 |  |
| 364 | 貧大宅 | 88 |  |
| 366 | 即刻 | 87 |  |
| 367 | 勁 | 87 |  |
| 369 | 像 | 87 |  |
| 371 | 北方 | 86 |  |
| 372 | 仔 | 85 |  |
| 375 | 金字塔 | 84 |  |
| 376 | 風車 | 84 |  |
| 377 | 越 | 84 |  |
| 379 | 考 | 83 |  |
| 380 | 當然 | 83 |  |
| 381 | 農 | 83 |  |
| 382 | 碼頭 | 83 |  |
| 383 | 礦場 | 83 |  |
| 385 | 女仔 | 82 |  |
| 386 | 引 | 82 |  |
| 388 | 究竟 | 82 |  |
| 392 | 暖 | 81 |  |
| 393 | 總之 | 81 |  |
| 394 | 完全 | 80 |  |
| 395 | 情況 | 80 |  |
| 398 | 農莊 | 79 |  |
| 399 | 瀑布 | 79 |  |
| 402 | 股 | 78 |  |
| 403 | 墳場 | 78 |  |
| 404 | 出來 | 77 |  |
| 406 | 你講 | 76 |  |
| 408 | 樹林 | 76 |  |
| 409 | 禮堂 | 76 |  |
| 411 | 所謂 | 75 |  |
| 412 | 首先 | 75 |  |
| 413 | 國旗 | 75 |  |
| 415 | 畫到 | 75 |  |
| 416 | 燈塔 | 75 |  |
| 417 | 講呢 | 75 |  |
| 418 | 纜車 | 75 |  |
| 419 | 全部 | 74 |  |
| 420 | 重有 | 74 |  |
| 423 | 服務 | 73 |  |
| 428 | 得到 | 72 |  |
| 430 | 理 | 72 |  |
| 431 | 種 | 72 |  |
| 435 | 就算 | 70 |  |
| 436 | 虛線 | 70 |  |
| 439 | 出去 | 69 |  |

## Review buckets

- Jyutping/sense uncertainty: 0
- Structural-source mentions requiring manual confirmation: 50
- Direct lexical gaps: 1487

The TSV is the complete 2,000-row audit. Frequency alone does not authorize a lexical sense, grammatical construction, or status change. Clear lexical gaps must be independently verified before runtime insertion.
