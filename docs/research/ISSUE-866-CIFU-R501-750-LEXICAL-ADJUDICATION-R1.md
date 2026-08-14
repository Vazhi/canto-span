# Issue #866 — Cifu ranks 501–750 lexical adjudication consolidation R1

## Purpose

This record consolidates the mechanical packet merged by PR #818 and the expert adjudication attached to closed issue #794 into one rank-complete authority for Cifu SpokenAdult ranks 501–750. It changes no runtime lexicon, parser behavior, executable tests, construction identity/status, survey/native-panel state, corpus classification, release state, or deployment state.

Cifu rank and exact surface remain discovery/frequency evidence only. Cifu definitions and Jyutping have zero independent Cantonese lexical-semantic/POS authority. HKCanCor exact hits establish occurrence/context evidence, not unrestricted productivity. A zero exact-token hit is not negative evidence. The frozen Rime layer, where later consulted, may corroborate orthography/readings only.

## Authority and supersession

- Expert base: #794 comment `5269186956`, which accounted for all 250 ranks.
- Final audit: #794 comment `5269668860`, which explicitly supersedes `5269186956` wherever they conflict.
- Corrected accounting: **128 single / 61 multiple / 31 reading-specific / 30 blocked = 250**.
- The final audit corrects categories for ranks 501, 531, 616, 618, 674, 680, 696, and 711 and materially corrects ranks 501, 523, 531, 565, 586, 597, 616, 618, 668, 674, 680, 696, and 711.
- `blocked` means no new atomic whole-surface lexical analysis from the present evidence; it never means delete genuine exact-surface coverage.
- Lexical analysis inventory and runtime default selection are separate questions. A later implementation must preserve already-valid typed/compositional defaults where a reviewed alternative should not become the global tokenizer/parser default.

## Corpus-zero implementation gate

The final audit requires corpus-zero reviewed selections to expose whether independent Cantonese confirmation exists. Rows explicitly spot-checked in the #794 expert chain are marked `independent_source_confirmed_corpus_zero`; other corpus-zero non-blocked rows are marked `independent_confirmation_pending_corpus_zero` and **must not be promoted merely from the Cifu row**. This status is an implementation gate, not a claim that the form is non-Cantonese.

Pending independent confirmation before runtime promotion: **23** non-blocked corpus-zero rows.

`511 瑞`, `520 繞`, `528 貧`, `536 灣`, `539 室`, `545 樂園`, `566 叢林`, `580 直線`, `594 東方`, `615 灘`, `622 會話`, `625 轉彎`, `637 山路`, `642 西方`, `651 圖案`, `712 水平線`, `721 碑`, `727 概念`, `743 港人`, `726 距離`, `544 樂`, `636 磅`, `677 直行`

## Final rank ledger

### Ranks 501–525

- **501 地 — reading_split:** `dei6` noun ground/land/place plus written adverb-forming suffix; `dei2` bound land/field suffix. Preserve the reading/function split.; HKCanCor exact hits=17; evidence-status=`packet_attested`; supersedes conflicting detail in `5269186956` via `5269668860`.
- **502 明 — multiple:** verb understand; adjective clear/bright; proper-name/morphemic uses; HKCanCor exact hits=43; evidence-status=`packet_attested`.
- **503 鬼 — multiple:** noun ghost/person sense; productive adverb/function/intensifier-negation uses; adjective/affix senses independently attested; HKCanCor exact hits=72; evidence-status=`packet_attested`.
- **504 最後 — multiple:** adjective/final-position sense and temporal/discourse adverb finally/last; HKCanCor exact hits=25; evidence-status=`packet_attested`.
- **505 憂 — blocked_atomic:** standalone category/use insufficiently verified; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **506 一次 — blocked_atomic:** compositional frequency/quantity phrase; do not force lexical POS; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **507 加 — reviewed_selection:** verb add; plus use can be handled as related function/sense; HKCanCor exact hits=27; evidence-status=`packet_attested`.
- **508 受 — reviewed_selection:** verb receive/accept/suffer; passive-like use not generalized from one X token; HKCanCor exact hits=5; evidence-status=`packet_attested`.
- **509 肯定 — multiple:** adjective certain; verb confirm/affirm; stance/adverbial certainty; HKCanCor exact hits=24; evidence-status=`packet_attested`.
- **510 能夠 — reviewed_selection:** modal/auxiliary ability; HKCanCor exact hits=12; evidence-status=`packet_attested`.
- **511 瑞 — reviewed_selection:** morpheme/stative lexical root: auspicious/lucky (seoi6); do not infer unrestricted free-adjective syntax; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **512 電腦 — reviewed_selection:** noun computer; HKCanCor exact hits=30; evidence-status=`packet_attested`.
- **513 領 — reading_split:** reading/sense split: leng5 colloquial collar/neck noun family; ling5 literary/morphemic lead/receive family; HKCanCor exact hits=0; evidence-status=`independent_source_confirmed_corpus_zero`.
- **514 長 — reading_split:** coeng4 stative long; zoeng2 grow/chief reading family; HKCanCor exact hits=27; evidence-status=`packet_attested`.
- **515 信心 — reviewed_selection:** noun confidence; HKCanCor exact hits=42; evidence-status=`packet_attested`.
- **516 後尾 — reading_split:** temporal expression; corpus hau6 mei1/hau1 mei1, current mei5 unsupported for this sense; HKCanCor exact hits=29; evidence-status=`packet_attested`.
- **517 重要 — reviewed_selection:** stative/adjective important; HKCanCor exact hits=9; evidence-status=`packet_attested`.
- **518 意 — reviewed_selection:** morpheme ji3: meaning/idea; wish/desire/intention; proper-name abbreviation for Italy as separate sense; HKCanCor exact hits=0; evidence-status=`independent_source_confirmed_corpus_zero`.
- **519 當 — reading_split:** dong1 temporal/adverbial/function; dong3 lexical verb regard/pawn; HKCanCor exact hits=37; evidence-status=`packet_attested`.
- **520 繞 — reviewed_selection:** verb go around/wind; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **521 水 — multiple:** noun water/money; adjective/evaluative low-quality sense; HKCanCor exact hits=25; evidence-status=`packet_attested`.
- **522 成病 — blocked_atomic:** likely compositional/segmentation item; no final lexical POS; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **523 坐 — reading_split:** `co5` productive verb “sit / travel by / serve a prison sentence”; `zo6` literary/citation sit-family and independently documented placement verb. Do not import the noun/classifier families of distinct `座`.; HKCanCor exact hits=39; evidence-status=`packet_attested`; supersedes conflicting detail in `5269186956` via `5269668860`.
- **524 我話 — blocked_atomic:** compositional pronoun+verb phrase; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **525 是 — reviewed_selection:** copular/affirmative verb, formal/written register; HKCanCor exact hits=6; evidence-status=`packet_attested`.

### Ranks 526–550

- **526 英文 — reading_split:** jing1 man2 common spoken Hong Kong reading; jing1 man4 formal/reading variant; HKCanCor exact hits=44; evidence-status=`packet_attested`.
- **527 真 — multiple:** adjective true/real and degree/stance adverb really; HKCanCor exact hits=21; evidence-status=`packet_attested`.
- **528 貧 — reviewed_selection:** stative/adjective poor/deficient, largely written/morphemic; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **529 擺 — reviewed_selection:** verb arrange/place; HKCanCor exact hits=23; evidence-status=`packet_attested`.
- **530 彎 — multiple:** verb bend and adjective bent/curved; HKCanCor exact hits=1; evidence-status=`packet_attested`.
- **531 今年 — reading_split:** noun “this year”; preserve both independently supported `gam1 nin4` and `gam1 nin2` readings.; HKCanCor exact hits=30; evidence-status=`packet_attested`; supersedes conflicting detail in `5269186956` via `5269668860`.
- **532 完成 — reviewed_selection:** verb complete; HKCanCor exact hits=3; evidence-status=`packet_attested`.
- **533 男仔 — reviewed_selection:** noun male/boy; HKCanCor exact hits=15; evidence-status=`packet_attested`.
- **534 排 — multiple:** verb arrange/rank/discharge; classifier/measure row; noun platoon/row family; HKCanCor exact hits=19; evidence-status=`packet_attested`.
- **535 跟 — multiple:** verb follow and relational/coverb/conjunctive uses; HKCanCor exact hits=33; evidence-status=`packet_attested`.
- **536 灣 — reviewed_selection:** noun/place bay; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **537 任何 — reviewed_selection:** indefinite determiner/pronoun any; HKCanCor exact hits=10; evidence-status=`packet_attested`.
- **538 返來 — reading_split:** motion verb expression with faan1 lai4 / faan1 lei4 readings; current one-syllable runtime Jyutping is incomplete; HKCanCor exact hits=80; evidence-status=`packet_attested`.
- **539 室 — reviewed_selection:** noun/morpheme room; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **540 記得 — reviewed_selection:** cognition verb remember; HKCanCor exact hits=30; evidence-status=`packet_attested`.
- **541 犀利 — reviewed_selection:** stative/adjective impressive/sharp; HKCanCor exact hits=48; evidence-status=`packet_attested`.
- **542 緊要 — reviewed_selection:** stative/adjective important; HKCanCor exact hits=36; evidence-status=`packet_attested`.
- **543 憂店 — blocked_atomic:** no independently supported lexical analysis; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **544 樂 — reading_split:** lok6 happy/name family; ngok6 music morpheme family; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **545 樂園 — reviewed_selection:** noun/place paradise/amusement-park type; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **546 左上 — blocked_atomic:** compositional directional phrase; lexical status unresolved; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **547 先生 — reviewed_selection:** person title/noun; HKCanCor exact hits=22; evidence-status=`packet_attested`.
- **548 形 — multiple:** noun shape/form and verb/morphemic appear/form uses; HKCanCor exact hits=7; evidence-status=`packet_attested`.
- **549 直接 — multiple:** adjective direct and manner adverb directly; HKCanCor exact hits=5; evidence-status=`packet_attested`.
- **550 班 — multiple:** noun class/team; classifier for groups/classes; marginal verb uses; HKCanCor exact hits=62; evidence-status=`packet_attested`.

### Ranks 551–575

- **551 國家 — reviewed_selection:** noun country/state; HKCanCor exact hits=18; evidence-status=`packet_attested`.
- **552 第二個 — blocked_atomic:** compositional ordinal+classifier/headless expression; HKCanCor exact hits=1; evidence-status=`packet_attested`.
- **553 細個 — reviewed_selection:** stative/age expression young/in childhood; HKCanCor exact hits=32; evidence-status=`packet_attested`.
- **554 幾時 — reviewed_selection:** wh-time expression; HKCanCor exact hits=48; evidence-status=`packet_attested`.
- **555 傾 — reviewed_selection:** verb chat/tilt family; corpus confirms verbal category; HKCanCor exact hits=35; evidence-status=`packet_attested`.
- **556 經濟 — multiple:** noun economy and adjective economic/economical; HKCanCor exact hits=12; evidence-status=`packet_attested`.
- **557 點啊 — blocked_atomic:** compositional wh+particle expression; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **558 一係 — reviewed_selection:** alternative connector/adverbial “or else/either”; HKCanCor exact hits=46; evidence-status=`packet_attested`.
- **559 我會 — blocked_atomic:** compositional pronoun+modal phrase; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **560 使 — multiple:** lexical verb use/cause/spend plus modal/necessity use; preserve distinction; HKCanCor exact hits=44; evidence-status=`packet_attested`.
- **561 突然 — multiple:** adjective sudden and adverb suddenly; HKCanCor exact hits=5; evidence-status=`packet_attested`.
- **562 海 — reviewed_selection:** noun/place sea; HKCanCor exact hits=6; evidence-status=`packet_attested`.
- **563 提 — reviewed_selection:** verb raise/mention/carry; HKCanCor exact hits=5; evidence-status=`packet_attested`.
- **564 養 — reviewed_selection:** verb raise/support/keep; HKCanCor exact hits=118; evidence-status=`packet_attested`.
- **565 錯 — multiple:** multiple: noun “mistake/fault” plus adjective “wrong/incorrect”; corpus resultative-looking tags do not establish a separate lexical adverb.; HKCanCor exact hits=43; evidence-status=`packet_attested`; supersedes conflicting detail in `5269186956` via `5269668860`.
- **566 叢林 — reviewed_selection:** noun/place jungle; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **567 七 — reviewed_selection:** numeral seven; HKCanCor exact hits=32; evidence-status=`packet_attested`.
- **568 大陸 — reviewed_selection:** proper/place noun mainland; HKCanCor exact hits=42; evidence-status=`packet_attested`.
- **569 平 — reading_split:** peng4 adjective cheap; ping4 adjective flat/level/even; HKCanCor exact hits=63; evidence-status=`packet_attested`.
- **570 打電話 — reviewed_selection:** verb phrase/lexicalized telephone-call predicate; HKCanCor exact hits=16; evidence-status=`packet_attested`.
- **571 成個 — reading_split:** spoken seng4 go3 whole/entire classifier phrase; sing4 go3 is not supported by the corpus for this sense; HKCanCor exact hits=3; evidence-status=`packet_attested`.
- **572 基本上 — reviewed_selection:** adverb/discourse adverb basically; HKCanCor exact hits=29; evidence-status=`packet_attested`.
- **573 碟 — reading_split:** dip2 noun plate/disc/album; dip6 classifier and bound citation-reading family; HKCanCor exact hits=38; evidence-status=`packet_attested`.
- **574 說話 — multiple:** noun speech/words and verb speak/talk; HKCanCor exact hits=5; evidence-status=`packet_attested`.
- **575 雖然 — reviewed_selection:** concessive connector; HKCanCor exact hits=20; evidence-status=`packet_attested`.

### Ranks 576–600

- **576 上行 — blocked_atomic:** exact lexical category/use not established; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **577 心 — reviewed_selection:** noun heart/mind; HKCanCor exact hits=9; evidence-status=`packet_attested`.
- **578 自由 — multiple:** noun freedom and adjective/free-state use; HKCanCor exact hits=1; evidence-status=`packet_attested`.
- **579 每 — reviewed_selection:** distributive determiner/quantifier; HKCanCor exact hits=41; evidence-status=`packet_attested`.
- **580 直線 — reviewed_selection:** noun straight line; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **581 穿 — reviewed_selection:** verb pierce/pass through/wear; HKCanCor exact hits=2; evidence-status=`packet_attested`.
- **582 哩樣 — blocked_atomic:** orthography/reading mismatch with corpus ni1 joeng6; defer; HKCanCor exact hits=62; evidence-status=`packet_attested`.
- **583 差 — reading_split:** caa1 adjective/difference/shortfall family; caai1 police/dispatch family; HKCanCor exact hits=30; evidence-status=`packet_attested`.
- **584 從 — reviewed_selection:** coverb/preposition from/via in the observed Cantonese use; HKCanCor exact hits=1; evidence-status=`packet_attested`.
- **585 舊 — multiple:** adjective old/former plus measure/classifier-like nominalized uses where independently licensed; HKCanCor exact hits=21; evidence-status=`packet_attested`.
- **586 呵 — reading_split:** reading/function split: `ho1` breathe/puff and interjection “ah/oh/wow”; `ho2` confirmation/question-tag final particle “huh?/right?”.; HKCanCor exact hits=29; evidence-status=`packet_attested`; supersedes conflicting detail in `5269186956` via `5269668860`.
- **587 性 — multiple:** noun property/sex/nature and derivational suffix/morpheme; HKCanCor exact hits=5; evidence-status=`packet_attested`.
- **588 林 — multiple:** noun forest/woods and proper-name surname use; HKCanCor exact hits=5; evidence-status=`packet_attested`.
- **589 揸 — reviewed_selection:** verb hold/drive; HKCanCor exact hits=24; evidence-status=`packet_attested`.
- **590 機 — reviewed_selection:** noun/morpheme machine/device; HKCanCor exact hits=65; evidence-status=`packet_attested`.
- **591 世界 — reviewed_selection:** noun world; HKCanCor exact hits=6; evidence-status=`packet_attested`.
- **592 右上 — blocked_atomic:** compositional directional phrase; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **593 似 — multiple:** verb resemble/seem and adjective similarity use; HKCanCor exact hits=18; evidence-status=`packet_attested`.
- **594 東方 — reviewed_selection:** directional/place noun East; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **595 返工 — reviewed_selection:** verb/predicate go to work; HKCanCor exact hits=37; evidence-status=`packet_attested`.
- **596 理由 — reviewed_selection:** noun reason; HKCanCor exact hits=33; evidence-status=`packet_attested`.
- **597 着 — reading_split:** reading/sense split: `zoek3` verb “wear/put on”; `zoek6` preserves independently supported written suffix/bound/result uses, lexical ignite/turn-on verb, adjective “correct”, and classifier “move/strategy” families rather than one generic particle.; HKCanCor exact hits=53; evidence-status=`packet_attested`; supersedes conflicting detail in `5269186956` via `5269668860`.
- **598 貨倉 — reviewed_selection:** noun/place warehouse; HKCanCor exact hits=2; evidence-status=`packet_attested`.
- **599 發覺 — reviewed_selection:** verb discover/notice; HKCanCor exact hits=21; evidence-status=`packet_attested`.
- **600 落到 — blocked_atomic:** compositional motion/result expression; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.

### Ranks 601–625

- **601 繞過 — blocked_atomic:** compositional verb-result/path expression; no final lexical POS; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **602 翻版 — multiple:** noun copy/clone and verb reprint/copy use; HKCanCor exact hits=43; evidence-status=`packet_attested`.
- **603 一種 — blocked_atomic:** compositional numeral+classifier phrase; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **604 以 — reviewed_selection:** coverb/preposition/function “by/with/according to”; formal register; HKCanCor exact hits=15; evidence-status=`packet_attested`.
- **605 包 — multiple:** verb wrap/include/guarantee; noun bag/package; classifier-related use; HKCanCor exact hits=17; evidence-status=`packet_attested`.
- **606 未必 — reviewed_selection:** adverb not necessarily; HKCanCor exact hits=27; evidence-status=`packet_attested`.
- **607 拍 — reviewed_selection:** verb pat/shoot/take photo; HKCanCor exact hits=21; evidence-status=`packet_attested`.
- **608 法律 — reviewed_selection:** noun law; HKCanCor exact hits=3; evidence-status=`packet_attested`.
- **609 要求 — multiple:** verb request/require and noun requirement/request; HKCanCor exact hits=22; evidence-status=`packet_attested`.
- **610 旅行 — multiple:** verb/activity travel and noun travel/trip; HKCanCor exact hits=46; evidence-status=`packet_attested`.
- **611 影響 — multiple:** verb influence/affect and noun influence/effect; HKCanCor exact hits=13; evidence-status=`packet_attested`.
- **612 學生 — reviewed_selection:** noun person student; HKCanCor exact hits=32; evidence-status=`packet_attested`.
- **613 講到 — blocked_atomic:** compositional verb+到 expression; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **614 關係 — multiple:** noun relationship and verb/predicate “concern/have to do with”; HKCanCor exact hits=12; evidence-status=`packet_attested`.
- **615 灘 — reviewed_selection:** noun/place beach/shoal; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **616 女 — reading_split:** `neoi2` noun daughter/girlfriend/young woman; `neoi5` female distinction-word/modifier and noun “female/woman”.; HKCanCor exact hits=24; evidence-status=`packet_attested`; supersedes conflicting detail in `5269186956` via `5269668860`.
- **617 考慮 — multiple:** verb consider and noun consideration; HKCanCor exact hits=23; evidence-status=`packet_attested`.
- **618 男人 — reading_split:** person noun “man”; preserve ordinary lexicalized changed-tone `naam4 jan2` together with the documented underlying/base `naam4 jan4` relationship.; HKCanCor exact hits=13; evidence-status=`packet_attested`; supersedes conflicting detail in `5269186956` via `5269668860`.
- **619 某 — reviewed_selection:** indefinite determiner/pronoun certain/some; HKCanCor exact hits=11; evidence-status=`packet_attested`.
- **620 唔夠 — blocked_atomic:** compositional negation+enough expression; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **621 射 — reviewed_selection:** verb shoot/emit; HKCanCor exact hits=4; evidence-status=`packet_attested`.
- **622 會話 — reviewed_selection:** noun conversation; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **623 電視 — reviewed_selection:** noun television; HKCanCor exact hits=23; evidence-status=`packet_attested`.
- **624 學校 — reviewed_selection:** noun/place school; HKCanCor exact hits=48; evidence-status=`packet_attested`.
- **625 轉彎 — reviewed_selection:** verb turn; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.

### Ranks 626–650

- **626 攬 — reading_split:** laam2 free verb hug/shoulder/support; laam5 bound/morphemic gather/monopolize family; HKCanCor exact hits=2; evidence-status=`packet_attested`.
- **627 九 — reviewed_selection:** numeral nine; HKCanCor exact hits=17; evidence-status=`packet_attested`.
- **628 水平 — multiple:** noun level/standard and adjective horizontal sense; HKCanCor exact hits=3; evidence-status=`packet_attested`.
- **629 生活 — multiple:** verb live and noun life/livelihood; HKCanCor exact hits=15; evidence-status=`packet_attested`.
- **630 早晨 — multiple:** temporal noun/expression morning plus conventional greeting formula; HKCanCor exact hits=2; evidence-status=`packet_attested`.
- **631 其中 — reviewed_selection:** referential pronoun/expression among them; HKCanCor exact hits=17; evidence-status=`packet_attested`.
- **632 放 — reviewed_selection:** verb put/release; HKCanCor exact hits=47; evidence-status=`packet_attested`.
- **633 法 — reviewed_selection:** noun law/method; no separate particle analysis justified from current evidence; HKCanCor exact hits=12; evidence-status=`packet_attested`.
- **634 教 — multiple:** verb teach and noun/morpheme religion/teaching family; HKCanCor exact hits=49; evidence-status=`packet_attested`.
- **635 最好 — reviewed_selection:** superlative/adverbial “best/had better”; HKCanCor exact hits=7; evidence-status=`packet_attested`.
- **636 磅 — reading_split:** bong6 weigh/pound-related family versus bong2 scale/balance family; needs explicit sense-reading records; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **637 山路 — reviewed_selection:** noun/place mountain road; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **638 公共 — reviewed_selection:** adjective/modifier public; HKCanCor exact hits=1; evidence-status=`packet_attested`.
- **639 方法 — reviewed_selection:** noun method; HKCanCor exact hits=22; evidence-status=`packet_attested`.
- **640 代表 — multiple:** verb represent and noun representative/delegate; HKCanCor exact hits=5; evidence-status=`packet_attested`.
- **641 好過 — multiple:** comparative predicate/adjective “better than” and discourse/adverbial preference use; HKCanCor exact hits=2; evidence-status=`packet_attested`.
- **642 西方 — reviewed_selection:** directional/place noun West; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **643 者 — reviewed_selection:** nominalizer/person-forming suffix/function; HKCanCor exact hits=2; evidence-status=`packet_attested`.
- **644 段 — multiple:** noun segment/section and classifier for passages/stories; HKCanCor exact hits=20; evidence-status=`packet_attested`.
- **645 難 — reviewed_selection:** stative/adjective difficult; HKCanCor exact hits=65; evidence-status=`packet_attested`.
- **646 好睇 — reviewed_selection:** stative/adjective visually good-looking/enjoyable; HKCanCor exact hits=37; evidence-status=`packet_attested`.
- **647 早 — multiple:** adjective early and temporal/adverbial morning/early; HKCanCor exact hits=34; evidence-status=`packet_attested`.
- **648 店 — reviewed_selection:** noun/place shop; HKCanCor exact hits=1; evidence-status=`packet_attested`.
- **649 第 — reviewed_selection:** ordinal prefix/function; HKCanCor exact hits=3; evidence-status=`packet_attested`.
- **650 發展 — multiple:** verb develop and noun development; HKCanCor exact hits=12; evidence-status=`packet_attested`.

### Ranks 651–675

- **651 圖案 — reviewed_selection:** noun pattern/design; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **652 學 — multiple:** verb learn/study plus bound morpheme for discipline/school; current object-only label must not be retained as the only analysis; HKCanCor exact hits=51; evidence-status=`packet_attested`.
- **653 賺 — reviewed_selection:** verb earn/profit; HKCanCor exact hits=39; evidence-status=`packet_attested`.
- **654 簡單 — reviewed_selection:** stative/adjective simple; HKCanCor exact hits=11; evidence-status=`packet_attested`.
- **655 同一 — reviewed_selection:** adjective/determiner same/identical; HKCanCor exact hits=2; evidence-status=`packet_attested`.
- **656 尾 — multiple:** noun tail/end and temporal/localizer/adverbial “at the end/later” family; HKCanCor exact hits=13; evidence-status=`packet_attested`.
- **657 我見 — blocked_atomic:** compositional pronoun+verb phrase; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **658 近 — reading_split:** gan6/kan5 reading variation with near/close semantics; preserve both rather than forcing one; HKCanCor exact hits=20; evidence-status=`packet_attested`.
- **659 拜拜 — reviewed_selection:** leave-taking formula/interjectional expression; HKCanCor exact hits=9; evidence-status=`packet_attested`.
- **660 接受 — reviewed_selection:** verb accept/receive; HKCanCor exact hits=10; evidence-status=`packet_attested`.
- **661 第二 — reviewed_selection:** ordinal/alternative expression; numeral/determiner plus headless-pronominal use; HKCanCor exact hits=49; evidence-status=`packet_attested`.
- **662 貧大 — blocked_atomic:** no independently supported lexical analysis; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **663 最近 — multiple:** temporal adverb recently and adjective nearest/most recent; HKCanCor exact hits=25; evidence-status=`packet_attested`.
- **664 意見 — reviewed_selection:** noun opinion; HKCanCor exact hits=7; evidence-status=`packet_attested`.
- **665 圖片 — reviewed_selection:** noun image/picture; HKCanCor exact hits=2; evidence-status=`packet_attested`.
- **666 辦法 — reviewed_selection:** noun method/means; HKCanCor exact hits=24; evidence-status=`packet_attested`.
- **667 入面 — reviewed_selection:** locative noun/expression inside; HKCanCor exact hits=1; evidence-status=`packet_attested`.
- **668 分鐘 — reviewed_selection:** time-unit measure word `fan1 zung1` “minute”; type precisely as measure rather than noun-or-measure ambiguity.; HKCanCor exact hits=30; evidence-status=`packet_attested`; supersedes conflicting detail in `5269186956` via `5269668860`.
- **669 北 — reviewed_selection:** direction noun/function north; HKCanCor exact hits=1; evidence-status=`packet_attested`.
- **670 外國 — reviewed_selection:** noun/place foreign country/foreign; HKCanCor exact hits=20; evidence-status=`packet_attested`.
- **671 平時 — reviewed_selection:** temporal noun/expression “ordinary times/normally”; do not infer lexical ADV solely from UD; HKCanCor exact hits=24; evidence-status=`packet_attested`.
- **672 打開 — reviewed_selection:** verb open/switch on; HKCanCor exact hits=3; evidence-status=`packet_attested`.
- **673 把 — reviewed_selection:** Cantonese classifier/handled-object measure; do not import Mandarin disposal analysis; HKCanCor exact hits=8; evidence-status=`packet_attested`.
- **674 步 — multiple:** `bou6` noun/measure “step/pace” plus lexical verb “walk/stroll/on foot”.; HKCanCor exact hits=8; evidence-status=`packet_attested`; supersedes conflicting detail in `5269186956` via `5269668860`.
- **675 炒 — reviewed_selection:** verb stir-fry/speculate/fire; HKCanCor exact hits=28; evidence-status=`packet_attested`.

### Ranks 676–700

- **676 狗 — multiple:** noun dog plus independently attested adjective/pejorative human-characterization use; HKCanCor exact hits=30; evidence-status=`packet_attested`.
- **677 直行 — reading_split:** spoken motion reading zik6 haang4 versus hong4 row/line reading family; do not use Cifu's single zik6hong4 string for all senses; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **678 借 — reviewed_selection:** verb lend/borrow/use as means; HKCanCor exact hits=25; evidence-status=`packet_attested`.
- **679 容易 — reviewed_selection:** stative/adjective easy/likely; HKCanCor exact hits=16; evidence-status=`packet_attested`.
- **680 座 — reading_split:** `zo6` bound seat/location morpheme plus classifier for buildings/mountains and placement verb; `zo2` noun “base/stand/holder”.; HKCanCor exact hits=1; evidence-status=`packet_attested`; supersedes conflicting detail in `5269186956` via `5269668860`.
- **681 起碼 — reviewed_selection:** adverb at least; HKCanCor exact hits=26; evidence-status=`packet_attested`.
- **682 偏 — multiple:** verb lean/deviate, adjective oblique/biased, and adverb contrary-to-expectation/stubbornly family; HKCanCor exact hits=1; evidence-status=`packet_attested`.
- **683 報紙 — reviewed_selection:** noun newspaper; HKCanCor exact hits=14; evidence-status=`packet_attested`.
- **684 人工 — multiple:** noun labor/wages/manpower and adjective artificial/manual; HKCanCor exact hits=31; evidence-status=`packet_attested`.
- **685 分 — reading_split:** fan1 verb divide/distinguish and measure/unit senses; fan6 part/share/fraction family; HKCanCor exact hits=46; evidence-status=`packet_attested`.
- **686 反而 — reviewed_selection:** contrastive adverb/connector instead; HKCanCor exact hits=23; evidence-status=`packet_attested`.
- **687 主要 — multiple:** adjective main/primary and adverb mainly; HKCanCor exact hits=15; evidence-status=`packet_attested`.
- **688 有陣 — blocked_atomic:** incomplete/uncertain expression, likely contextual shortening; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **689 怪 — multiple:** adjective strange and verb blame/wonder-at family; HKCanCor exact hits=8; evidence-status=`packet_attested`.
- **690 除 — multiple:** verb remove/divide and exclusion function “except”; HKCanCor exact hits=3; evidence-status=`packet_attested`.
- **691 剪 — multiple:** verb cut with scissors and noun/tool-related sense where independently licensed; HKCanCor exact hits=58; evidence-status=`packet_attested`.
- **692 細 — reviewed_selection:** stative/adjective small/fine; HKCanCor exact hits=49; evidence-status=`packet_attested`.
- **693 袋 — reading_split:** doi2 noun bag/pocket; doi6 verb/bound/classifier-related family; HKCanCor exact hits=28; evidence-status=`packet_attested`.
- **694 等陣 — reviewed_selection:** temporal expression/adverb “in a moment”; HKCanCor exact hits=2; evidence-status=`packet_attested`.
- **695 閒 — multiple:** adjective idle/free and noun leisure/free-time sense; HKCanCor exact hits=3; evidence-status=`packet_attested`.
- **696 慢慢 — reading_split:** adverb “slowly”; preserve Cantonese changed-tone `maan6 maan2` / `maan6 maan1`; do not use unshifted `maan6 maan6` as the sole reviewed pronunciation.; HKCanCor exact hits=8; evidence-status=`packet_attested`; supersedes conflicting detail in `5269186956` via `5269668860`.
- **697 鐘 — multiple:** noun clock/bell and time-measure/classifier use; HKCanCor exact hits=39; evidence-status=`packet_attested`.
- **698 三個 — blocked_atomic:** compositional numeral+classifier phrase; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **699 女人 — reviewed_selection:** noun woman; HKCanCor exact hits=10; evidence-status=`packet_attested`.
- **700 幼 — reviewed_selection:** stative/adjective young; HKCanCor exact hits=1; evidence-status=`packet_attested`.

### Ranks 701–725

- **701 同意 — reviewed_selection:** verb/stance predicate agree; HKCanCor exact hits=1; evidence-status=`packet_attested`.
- **702 行過 — blocked_atomic:** compositional V+過 with multiple possible aspect/path readings; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **703 所有 — reviewed_selection:** universal determiner/pronominal expression all; HKCanCor exact hits=19; evidence-status=`packet_attested`.
- **704 直落 — blocked_atomic:** directional/adverbial composition unresolved; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **705 後 — multiple:** noun/localizer back/behind and temporal function after/later; HKCanCor exact hits=16; evidence-status=`packet_attested`.
- **706 家 — multiple:** noun home/family; classifier; person-forming suffix; HKCanCor exact hits=4; evidence-status=`packet_attested`.
- **707 財政 — multiple:** noun finance/public finances and adjective financial; HKCanCor exact hits=2; evidence-status=`packet_attested`.
- **708 敢 — reviewed_selection:** modal/verb “dare”; keep as one modal-predicate family unless finer syntax requires a split; HKCanCor exact hits=18; evidence-status=`packet_attested`.
- **709 節目 — reviewed_selection:** noun program; HKCanCor exact hits=8; evidence-status=`packet_attested`.
- **710 點呀 — blocked_atomic:** compositional wh+particle expression; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **711 點知 — reviewed_selection:** one broad lexical adverb/discourse expression “unexpectedly / who would have thought”; literal “how know?” is transparent `點 + 知`, not a second atomic whole-form analysis.; HKCanCor exact hits=15; evidence-status=`packet_attested`; supersedes conflicting detail in `5269186956` via `5269668860`.
- **712 水平線 — reviewed_selection:** noun horizon/horizontal line; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **713 例如 — reviewed_selection:** exemplification function/predicate “for example”; HKCanCor exact hits=15; evidence-status=`packet_attested`.
- **714 爸爸 — reading_split:** baa4 baa1 / baa4 baa4 ordinary Cantonese noun; baa1 baa1 written-language reading; HKCanCor exact hits=4; evidence-status=`packet_attested`.
- **715 直上 — blocked_atomic:** compositional directional phrase; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **716 直程 — reviewed_selection:** adverb simply/straight-up; HKCanCor exact hits=39; evidence-status=`packet_attested`.
- **717 個個 — reviewed_selection:** distributive pronoun/quantifier every one; HKCanCor exact hits=33; evidence-status=`packet_attested`.
- **718 幅 — reviewed_selection:** classifier for pictures/textiles; HKCanCor exact hits=3; evidence-status=`packet_attested`.
- **719 普通 — reviewed_selection:** adjective ordinary/common; HKCanCor exact hits=16; evidence-status=`packet_attested`.
- **720 畫個 — blocked_atomic:** compositional verb+classifier phrase; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **721 碑 — reviewed_selection:** noun monument/stele; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **722 一半 — reviewed_selection:** quantity/numeral expression half; HKCanCor exact hits=13; evidence-status=`packet_attested`.
- **723 左右 — reading_split:** zo2 jau2 adverb approximately; zo2 jau6 noun left/right and verb influence/control; HKCanCor exact hits=2; evidence-status=`packet_attested`.
- **724 左行 — blocked_atomic:** ambiguous compositional left+行 expression; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **725 食飯 — reviewed_selection:** verb/predicate eat a meal; HKCanCor exact hits=31; evidence-status=`packet_attested`.

### Ranks 726–750

- **726 距離 — multiple:** noun distance and verb/predicate be apart; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **727 概念 — reviewed_selection:** noun concept; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **728 環境 — reviewed_selection:** noun environment; HKCanCor exact hits=16; evidence-status=`packet_attested`.
- **729 人權 — reviewed_selection:** noun human rights; HKCanCor exact hits=1; evidence-status=`packet_attested`.
- **730 下行 — blocked_atomic:** exact lexical category/use not established; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **731 小姐 — reviewed_selection:** person title/noun; HKCanCor exact hits=2; evidence-status=`packet_attested`.
- **732 包括 — reviewed_selection:** verb include; HKCanCor exact hits=5; evidence-status=`packet_attested`.
- **733 生 — reading_split:** saang1 verb give birth/grow and adjective raw/alive plus address suffix; sang1 bound/written morpheme family; HKCanCor exact hits=39; evidence-status=`packet_attested`.
- **734 因 — multiple:** noun/morpheme cause/reason and causal connector because, largely formal/written; HKCanCor exact hits=1; evidence-status=`packet_attested`.
- **735 考試 — multiple:** noun exam and verb take/sit an exam; HKCanCor exact hits=31; evidence-status=`packet_attested`.
- **736 杏 — reviewed_selection:** noun apricot; corpus ADJ tags are not semantically credible as the primary lexical category; HKCanCor exact hits=2; evidence-status=`packet_attested`.
- **737 始終 — reviewed_selection:** adverb all along/in the end; HKCanCor exact hits=17; evidence-status=`packet_attested`.
- **738 阿媽 — reviewed_selection:** kinship/person noun mother; HKCanCor exact hits=22; evidence-status=`packet_attested`.
- **739 計 — reading_split:** gai3 verb calculate/plan; gai2 noun plan/idea/account-related reading family; HKCanCor exact hits=61; evidence-status=`packet_attested`.
- **740 個韻 — blocked_atomic:** no independently supported lexical analysis; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **741 原本 — multiple:** adjective/noun original/source text and adverb originally; HKCanCor exact hits=19; evidence-status=`packet_attested`.
- **742 連 — multiple:** verb join/link, adverb/focus “even/successively”, connector/preposition family, plus noun/proper-name uses where independently supported; HKCanCor exact hits=25; evidence-status=`packet_attested`.
- **743 港人 — reviewed_selection:** person noun Hong Kong person/people; HKCanCor exact hits=0; evidence-status=`independent_confirmation_pending_corpus_zero`.
- **744 試過 — blocked_atomic:** compositional verb+experiential 過 expression; HKCanCor exact hits=5; evidence-status=`packet_attested`.
- **745 對於 — reviewed_selection:** topic/relational coverb-preposition regarding; HKCanCor exact hits=22; evidence-status=`packet_attested`.
- **746 轉 — reading_split:** zyun2 convey/transfer/turn-shift family versus zyun3 revolve/turn/repetition family; HKCanCor exact hits=35; evidence-status=`packet_attested`.
- **747 大個 — reviewed_selection:** stative/age-size expression grown/big; HKCanCor exact hits=6; evidence-status=`packet_attested`.
- **748 公務員 — reviewed_selection:** person noun civil servant; HKCanCor exact hits=1; evidence-status=`packet_attested`.
- **749 分別 — multiple:** noun difference/distinction and adverb separately/respectively; HKCanCor exact hits=21; evidence-status=`packet_attested`.
- **750 化 — multiple:** verb transform/make into and derivational suffix/morpheme “-ize/-ization”; HKCanCor exact hits=5; evidence-status=`packet_attested`.

## Downstream implementation rule

A later, separately claimed runtime reconciliation may implement independently supported selections and stable alternatives. It must preserve blocked/compositional exact-surface coverage, avoid Cifu/Rime authority laundering, preserve cross-band stable IDs, distinguish lexical alternatives from default token behavior, and run the repository regression-debt ratchet. Corpus-zero rows still marked `independent_confirmation_pending_corpus_zero` require independent Cantonese confirmation before typed promotion.

## Mechanical validation

- 250/250 ranks present exactly once.
- Corrected category accounting: 128 / 61 / 31 / 30.
- Exact HKCanCor hit/zero status joined directly from the merged #818 packet.
- No runtime or test state changed by this ledger.
