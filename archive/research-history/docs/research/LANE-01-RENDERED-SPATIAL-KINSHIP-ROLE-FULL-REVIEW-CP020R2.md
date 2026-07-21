# CP020R2 Full 60-Row Review

Baseline: rendered `v0.5.173` CP020 summary/full artifacts.
Candidate: headless `v0.5.174-lane01-rendered-spatial-kinship-role-correction-r2`.

Every source, top construction, semantic status, blocker/review inventory, root-coverage result, passive/permissive subtype, and Jyutping value is preserved. Only five token occurrences change learner role/syntax.

| # | Source | Top construction(s) | Semantic status | Learner-role/syntax change |
|---:|---|---|---|---|
| 1 | `張相畀老師貼咗上牆。` | `PassivePermissiveRelation` | `BLOCKED` | 上: when → func; 牆: what → where |
| 2 | `有個BB啊隻腳俾蚊咬咗好大粒啊。` | `TransitiveVP, DegreeStativePredicate` | `BLOCKED` | none |
| 3 | `佢幅畫畀老師貼堂。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 4 | `陳生架車畀同事撞爛咗。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 5 | `我畀阿媽鬧。` | `PassivePermissiveRelation` | `BLOCKED` | 阿: who → func |
| 6 | `佢畀老師鬧咗。` | `PassivePermissiveRelation` | `REVIEW_REQUIRED` | none |
| 7 | `我畀佢打籃球。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 8 | `我畀佢去旅行。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 9 | `我唔畀佢去旅行。` | `DirectionalMotionVP` | `BLOCKED` | none |
| 10 | `我畀咗佢去旅行。` | `PerfectiveVP, DirectionalMotionVP` | `BLOCKED` | none |
| 11 | `我畀唔畀佢去旅行？` | `ANotAQuestion` | `BLOCKED` | none |
| 12 | `陳生畀同事撞爛咗架車。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 13 | `我畀人偷咗個銀包。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 14 | `我都唔明點解我已經盯得咁實，都會俾人攞咗張大紙囖。` | `ModalVP` | `BLOCKED` | none |
| 15 | `佢俾老師鬧咗。` | `PassivePermissiveRelation` | `REVIEW_REQUIRED` | none |
| 16 | `你俾人呃啊你，係唔係啊？` | `TransitiveVP` | `BLOCKED` | none |
| 17 | `我畀咗本書佢。` | `PerfectiveVP, ModifiedNP` | `BLOCKED` | none |
| 18 | `我買咗件衫畀佢。` | `PerfectiveVP, ModifiedNP` | `BLOCKED` | none |
| 19 | `我交咗本書畀張三。` | `ModifiedNP` | `BLOCKED` | none |
| 20 | `畀你。` | `RecipientFrame` | `BLOCKED` | none |
| 21 | `畀老師鬧。` | `TransitiveVP` | `BLOCKED` | none |
| 22 | `佢畀鬧咗。` | `SubjectPredicateClause` | `BLOCKED` | none |
| 23 | `畀人睇。` | `TransitiveVP` | `BLOCKED` | none |
| 24 | `我畀佢跌低。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 25 | `隻腳畀蚊咬咗。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 26 | `部電話畀細路整爛咗。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 27 | `件衫畀人洗乾淨咗。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 28 | `本書畀老師收咗。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 29 | `佢畀老闆讚。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 30 | `我畀醫生檢查。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 31 | `佢畀朋友影相。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 32 | `我畀佢食蛋糕。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 33 | `我唔畀佢食蛋糕。` | `none` | `BLOCKED` | none |
| 34 | `我畀咗佢食蛋糕。` | `PerfectiveVP` | `BLOCKED` | none |
| 35 | `我畀唔畀佢食蛋糕？` | `ANotAQuestion` | `BLOCKED` | none |
| 36 | `我畀人偷咗部電話。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 37 | `佢畀人整污糟咗件衫。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 38 | `老師畀學生整爛咗部電腦。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 39 | `我個電話畀人整爛咗。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 40 | `公司畀佢偷咗好多錢。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 41 | `你會畀人哋罰錢。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 42 | `佢畀老師貼咗張畫上牆。` | `PassivePermissiveRelation` | `BLOCKED` | 上: when → func; 牆: what → where |
| 43 | `佢鍾意畀人讚本書。` | `PreferenceVP` | `BLOCKED` | none |
| 44 | `我畀人偷咗。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 45 | `我俾人偷咗個銀包。` | `PassivePermissiveRelation` | `BLOCKED` | none |
| 46 | `我唔俾佢去旅行。` | `DirectionalMotionVP` | `BLOCKED` | none |
| 47 | `我畀部電話你。` | `TransferDitransitiveVP` | `MANUAL_REVIEW_ELIGIBLE` | none |
| 48 | `我畀你部電話。` | `TransferDitransitiveVP` | `MANUAL_REVIEW_ELIGIBLE` | none |
| 49 | `我煮飯畀佢食。` | `ProductiveVO` | `BLOCKED` | none |
| 50 | `你講畀我聽。` | `none` | `BLOCKED` | none |
| 51 | `畀心機讀書。` | `none` | `BLOCKED` | none |
| 52 | `畀水洗米。` | `TransitiveVP` | `BLOCKED` | none |
| 53 | `用水洗米。` | `TransitiveVP` | `BLOCKED` | none |
| 54 | `我畀佢。` | `none` | `BLOCKED` | none |
| 55 | `佢畀人。` | `SubjectPredicateClause` | `BLOCKED` | none |
| 56 | `畀佢去旅行。` | `DirectionalMotionVP` | `BLOCKED` | none |
| 57 | `我畀佢去。` | `PassivePermissiveRelation` | `MANUAL_REVIEW_ELIGIBLE` | none |
| 58 | `我畀佢鬧。` | `PassivePermissiveRelation` | `REVIEW_REQUIRED` | none |
| 59 | `架車畀撞爛咗。` | `none` | `BLOCKED` | none |
| 60 | `我畀人睇。` | `PassivePermissiveRelation` | `REVIEW_REQUIRED` | none |

## Disposition

- Rows 1 and 42: `上` changes from temporal **when** to spatial-linking **func**; `牆` changes from generic **what** to spatial-goal **where**.
- Row 5: `阿` changes from **who** to kinship-prefix **func**; `媽` remains **who**.
- All other 57 rows have no token role/syntax difference.
- CP020 remains unaccepted; v0.5.174 requires fresh rendered review.
