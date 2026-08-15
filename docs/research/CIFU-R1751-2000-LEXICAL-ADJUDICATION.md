# Cifu ranks 1751–2000 lexical adjudication

Status: **expert adjudication in progress; research authority only; no runtime implementation authorized by this file alone**

Parent intake: #899  
Work claim: #900  
Mechanical evidence packet: #799 / #827 / merged PR #828

## Evidence firewall

- Cifu rank and exact written surface are discovery/frequency evidence only.
- Cifu English definitions have zero independent Cantonese lexical-semantic/POS authority.
- Cifu Jyutping is pronunciation-candidate metadata only unless independently corroborated.
- HKCanCor raw tags/readings and concordances are occurrence/context evidence, not final lexical truth.
- PyCantonese UD projections are navigation aids only.
- Runtime/tests are implementation evidence only and cannot decide Cantonese lexical facts.
- Zero HKCanCor hits do not imply non-Cantonese status.
- Shared-with-Mandarin forms are not contamination merely because they also occur in Mandarin.
- Mandarin-only senses/functions must not leak into a retained Cantonese surface.
- Transparent strings are `blocked_atomic` unless independent evidence establishes a lexicalized whole form.
- Independently established lexicalized MWEs may coexist with productive internal parses.

## Decision codes

- `reviewed_selection` — one secure lexical category/family for this pass.
- `multiple` — independently supported polyfunctionality/categories that must remain distinct.
- `reading_split` — distinct reviewed readings/categories that must remain reading-sensitive.
- `blocked_atomic` — no typed whole-surface lexeme from this rank; preserve component/construction analysis.
- `research_required` — evidence remains insufficient for final unrestricted whole-surface typing.

Runtime-consequence shorthand for later implementation:

- `T` — broad reviewed lexical entry may be implemented conservatively.
- `A` — preserve stable alternatives/readings/categories.
- `B` — do not band-promote as an atomic whole surface.
- `H` — hold band-specific typing pending more evidence.
- `M` — lexicalized MWE may coexist with productive component analysis.

## Progress accounting

The final 250-row count is not frozen until every rank has been reviewed. Current completed tranche:

| Range | reviewed_selection | multiple | reading_split | blocked_atomic | research_required | Total |
|---|---:|---:|---:|---:|---:|---:|
| 1751–1800 | 28 | 13 | 1 | 8 | 0 | 50 |

## Authoritative ledger

### Ranks 1751–1800

| Rank | Surface | Final class | Reviewed lexical decision | Reading/status | Runtime consequence |
|---:|---|---|---|---|---|
|1751|司長|reviewed_selection|person/title noun: director, department/bureau head|`si1 zoeng2`|T|
|1752|必要|multiple|stative/property “necessary” + abstract noun “necessity/need” where nominal syntax is independently present|`bit1 jiu3`|A|
|1753|本地|reviewed_selection|locality/common noun “the local area; locality”; attributive “local” use does not require a separate adjective by default|`bun2 dei6`|T|
|1754|正上方|blocked_atomic|transparent degree/orientation `正 + 上方` “directly above”|—|B|
|1755|正版|reviewed_selection|count/mass noun “authorized/genuine edition or copy”; attributive use remains nominal modification unless independent predicative evidence requires more|`zing3 baan2` independently observed in HKCanCor|T|
|1756|甩|reviewed_selection|verb family: come off / detach / lose / get rid of / escape|`lat1`|T|
|1757|光|multiple|stative/property “bright” + noun “light” + independently lexical adverbial/bare sense where supported; do not flatten these into one POS|`gwong1`|A|
|1758|再行|blocked_atomic|productive `再 + 行` sequence; no opaque whole lexical item established|—|B|
|1759|在|reviewed_selection|formal/written locative relation function “at/in/on; be present/exist” retained as Cantonese-compatible written/formal material; **do not import Mandarin progressive-marker `在 + VP` as a Cantonese lexical function**|`zoi6`|T|
|1760|好多人|blocked_atomic|productive degree/quantity nominal phrase `好 + 多 + 人`|—|B|
|1761|好快|blocked_atomic|productive degree + property phrase|—|B|
|1762|好近|blocked_atomic|productive degree + property phrase|—|B|
|1763|好遠|blocked_atomic|productive degree + property phrase|—|B|
|1764|妄想|multiple|verb “indulge in vain/wild hope; fantasize unrealistically” + noun “delusion/unrealistic idea”|`mong5 soeng2`|A|
|1765|忙|reviewed_selection|stative/predicate “busy”|`mong4`|T|
|1766|成年|reviewed_selection|verb/predicate “come of age; be legally adult”|`sing4 nin4`|T|
|1767|老細|reviewed_selection|person/role noun “boss; proprietor”|`lou5 sai3`|T|
|1768|自從|reviewed_selection|temporal relational/connective function “since; ever since”|`zi6 cung4`|T|
|1769|初頭|reviewed_selection|temporal noun/expression “at first; initially; the beginning”; adverbial placement is distributional|`co1 tau4`|T|
|1770|局|multiple|common/bound noun family “bureau/office; situation/round” + classifier/measure for games, matches, rounds|`guk6` ordinary nominal/classifier family; candidate `guk2` not promoted without independent evidence|A|
|1771|我問|blocked_atomic|pronoun + verb clause fragment `我 + 問`|—|B|
|1772|足夠|reviewed_selection|stative/predicate “enough; sufficient”|`zuk1 gau3`|T|
|1773|邪|multiple|stative/property “evil/heretical/strange” + noun/bound nominal “evil influence/misfortune” where nominal syntax is supported|`ce4`|A|
|1774|事業|reviewed_selection|abstract/count noun “career; undertaking; cause/enterprise”|`si6 jip6`|T|
|1775|兩點|blocked_atomic|ordinary numeral + time/point unit; exact string is productive rather than an opaque lexeme|—|B|
|1776|咀|multiple|noun spelling variant of `嘴` “mouth/spout/protruding landform” + slang verb “kiss”|`zeoi2`|A|
|1777|定義|multiple|noun “definition” + verb “define”|`ding6 ji6`|A|
|1778|忽然|reviewed_selection|adverb “suddenly”|`fat1 jin4`|T|
|1779|拃|reviewed_selection|classifier/measure for a patch, area, or spread; HKCanCor independently supplies `zaa6`|`zaa6`; Cifu unknown reading is superseded|T|
|1780|杯|multiple|count noun “cup/glass” + classifier/measure for cupfuls/drinks|`bui1`|A|
|1781|東面|reviewed_selection|spatial/locality noun “east side”|`dung1 min6`|T|
|1782|欣賞|reviewed_selection|verb “appreciate; admire; enjoy”|`jan1 soeng2`|T|
|1783|股價|reviewed_selection|finance noun “share/stock price”|`gu2 gaa3`|T|
|1784|表現|multiple|verb “show/manifest/display” + noun/event/result “performance; manifestation”|`biu2 jin6`|A|
|1785|長遠|reviewed_selection|stative/property “long-term; far-reaching”|`coeng4 jyun5`|T|
|1786|保險|multiple|noun “insurance” + stative/property “safe; cautious; on the safe side”|`bou2 him2`|A|
|1787|活動|multiple|noun/event “activity” + verb “move about; operate/be active”|`wut6 dung6`|A|
|1788|重心|reviewed_selection|abstract/spatial noun “centre of gravity; central core/focus”|`zung6 sam1`|T|
|1789|哲學|reviewed_selection|abstract/domain noun “philosophy”|`zit3 hok6`|T|
|1790|家人|reviewed_selection|person/kin collective noun “family member(s)”|`gaa1 jan4`|T|
|1791|晏晝|reviewed_selection|temporal noun/expression “afternoon”|`aan3 zau3`|T|
|1792|校|reading_split|school bound/nominal family vs proofread/check and military-rank bound family|`haau6` school family vs `gaau3` proofread/check and field-officer family; Mandarin classifier `所` material is excluded|A|
|1793|窄|reviewed_selection|stative/property “narrow”|`zaak3`|T|
|1794|粉|reviewed_selection|mass/count noun family “powder; flour/starch-derived food/noodles; cosmetic powder”|`fan2`|T|
|1795|做法|reviewed_selection|count/abstract noun “method; way of doing; practice”|`zou6 faat3`|T|
|1796|健康|multiple|abstract noun “health” + stative/property “healthy”|`gin6 hong1`|A|
|1797|唯一|reviewed_selection|exclusive property/determiner-like modifier “only; sole”|`wai4 jat1`|T|
|1798|唱片|reviewed_selection|count noun “record; music album”|`coeng3 pin2`|T|
|1799|婚姻|reviewed_selection|abstract/social noun “marriage; matrimony”|`fan1 jan1`|T|
|1800|接觸|multiple|verb “contact; touch; be in contact” + noun/event “contact”|`zip3 zuk1`|A|

## Targeted independent checks used in ranks 1751–1800

These checks resolve nontrivial category, reading, or contamination questions; the mechanical packet remains occurrence evidence rather than final authority.

- 粵典 `妄想`: directly separates `mong5 soeng2` verb and noun entries.
- 粵典 `成年`: directly treats `sing4 nin4` as a verb/predicate “come of age; become an adult”.
- 粵典 `嘴 / 咀`: directly records `咀 zeoi2` both as a noun spelling variant of `嘴` and as a slang verb “kiss”.
- 粵典 `校`: directly separates `haau6` school material from `gaau3` proofread/check and military-field-officer bound material.
- 粵典 `保險`: directly records noun “insurance” and adjective/stative “safe/cautious”.
- CantoDict `邪`: records noun and adjective functions for `ce4` and Cantonese examples such as `中邪`.
- CantoDict `接觸`: records both verbal contact and nominal “a contact”.
- CantoDict `在`: supports shared formal locative/existential material, while its own progressive examples distinguish Standard-Chinese-only usage; therefore the Cifu progressive sense is not promoted into Cantonese runtime authority.
- 粵典 examples for `笪`: independently attest `daat3` as a Cantonese classifier/measure for areas/patches (e.g. `一笪地方`, `一笪污漬`), superseding the Cifu unknown reading.

## Interim notes

1. The first 50 rows already confirm that raw HKCanCor POS labels are not reliable final categories: `咀` is tagged noun in its one packet hit but independent Cantonese evidence also supports the slang verb; `妄想` has zero packet hits but independently has both verb and noun lexical entries.
2. The Mandarin-contamination boundary remains analysis-specific rather than surface-wide: `在` is retained for formal Cantonese-compatible locative material while the Mandarin progressive-marker analysis is excluded; `校` remains a genuine Cantonese surface while the packet's explicitly Mandarin classifier gloss is excluded.
3. Transparent frequency strings (`好多人`, `好快`, `兩點`, etc.) remain useful source/provenance surfaces without being promoted into opaque lexical atoms.

Next ledger tranche: ranks 1801–1850.
