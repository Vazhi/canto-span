# Parser construction → research source links (CP021B-R2)

Date: 2026-07-18  
Scope: five Lane 09 motion and locative parser labels. No parser code or accepted behavior changed.

## Outcome

This pass links research to the exact claims currently implied by `MotionGoalVP`, `SourceMotionClause`, `MotionPurposeChain`, `PathPhrase`, and `LocativePlacePhrase`. The result is deliberately not five blanket approvals:

| Runtime label | Research disposition | Parser consequence now |
|---|---|---|
| `MotionGoalVP` | `SOURCE_LINKED_PROVISIONAL` | Retain the overt motion-predicate + goal profile with explicit boundaries for lexicalized 返學, 到, and nonphysical 去. |
| `SourceMotionClause` | `SOURCE_LINKED_PROVISIONAL` | Retain the overt 由-source + motion + goal profile; do not generalize unreviewed optional material. |
| `MotionPurposeChain` | `SOURCE_LINKED_REVIEW_BOUNDARY` | Require an immediately following, semantically compatible purpose VP; adjacency alone is insufficient. |
| `PathPhrase` | `PARTIAL_SOURCE_LINK_SPLIT_REQUIRED` | 向 direction/orientation is supported; 沿住 route remains unmapped and must not inherit that support. |
| `LocativePlacePhrase` | `PARTIAL_SOURCE_LINK_SPLIT_REQUIRED` | Preserve documented locative subtypes, but do not promote the current catch-all label as one construction. |

Every claim-source edge, locator, implementation effect, and forbidden inference is recorded in `PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R2.tsv`. The cumulative bibliography and verification states are in `PARSER-CONSTRUCTION-SOURCE-REGISTER-CP021B-R2.tsv`.

## MotionGoalVP

| Exact parser claim | Research link | What the parser may infer | What it may not infer |
|---|---|---|---|
| A motion predicate may be followed by an overt goal. | [Leung 2026, accepted manuscript pp. 13-18, 22-28](https://doi.org/10.1075/aplv.25004.leu); [Szeto 2015, pp. 29-30, 45](https://repository.lib.cuhk.edu.hk/tc/item/cuhk-1291427) | Recognize bounded 去/返/到 + overt-place profiles. | Every directional morpheme or following noun is not automatically the same construction. |
| 咗 may occur between 去/返/到 and the goal. | [Szeto 2015, pp. 29-30, 45](https://repository.lib.cuhk.edu.hk/tc/item/cuhk-1291427) | Preserve the visible V-咗-goal order. | The examples do not establish every aspect-marker or verb combination. |
| 返學 and 返工 can mean go to school/work without literal return. | [Chor 2018, PDF pp. 207-208](https://doi.org/10.1075/scld.9) | Treat 返學 as a lexicalized overt expression; do not insert hidden 學校. | Do not lexicalize every 返 + noun sequence. |
| 到 as arrival must be distinguished from post-directional or nonspatial/result 到. | [Chor 2018, PDF pp. 124-127](https://doi.org/10.1075/scld.9); [Leung 2026, appendix pp. 55-56](https://doi.org/10.1075/aplv.25004.leu) | Keep 到咗學校 separate from V-到-goal and V-到-result profiles. | Do not collapse all 到 strings into `MotionGoalVP`. |
| Physical-motion 去 is distinct from purposive-marker and abstract uses. | [Leung 2026, pp. 39-41 and appendix p. 60](https://doi.org/10.1075/aplv.25004.leu) | Require a place-compatible goal for the reviewed physical-motion profile. | Do not tag every 去 as physical motion. |

The runtime name `MotionGoalVP` remains project terminology. The sources establish forms and contrasts, not that node name.

## SourceMotionClause

| Exact parser claim | Research link | What the parser may infer | What it may not infer |
|---|---|---|---|
| 由 marks a starting point before the motion predicate. | [Yip & Matthews 2000, PDF pp. 77, 80](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf); corroborated by [Leung 2014, pp. 1-3](https://linguistics.berkeley.edu/~herman/documents/CantoneseCoverbs_MAPaper_Leung.pdf) | Recognize overt 由-source before a reviewed motion predicate. | 由 alone does not prove a motion clause; the unpublished reanalysis is not treated as sole authority. |
| Source and destination may both be overt. | [Leung 2026, pp. 26-28](https://doi.org/10.1075/aplv.25004.leu); [Yip & Matthews 2000, PDF p. 80](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf) | Preserve both visible endpoints in the source-motion-goal profile. | Do not infer unrestricted optional subjects, time phrases, or predicates. |

The parser may preserve visible source and goal tokens. The literature does not prescribe Canto Span's hidden-node policy.

## MotionPurposeChain

| Exact parser claim | Research link | What the parser may infer | What it may not infer |
|---|---|---|---|
| A purpose VP may immediately follow a directional-motion expression. | [Leung 2026, pp. 13-15, 26-28](https://doi.org/10.1075/aplv.25004.leu) | Recognize a bounded motion + immediately following purpose candidate. | Do not infer purpose from arbitrary predicate adjacency. |
| Marked purposive 去/嚟 is a separate case. | [Leung 2026, appendix p. 60](https://doi.org/10.1075/aplv.25004.leu) | Keep the documented motion-cum-purpose profile separate from purposive-marker uses. | Do not use a single 去 rule for both structures. |
| Subject sharing is compatible with serial constructions, but analysis may be indeterminate. | [Matthews 2006, chapter pp. 69, 72-75](https://hub.hku.hk/bitstream/10722/51758/6/FullText.pdf) | Preserve one overt shared subject only after the purpose profile otherwise matches. | Shared subject and two verbs do not prove purpose, serial-verb status, or one settled theory. |

The parser rule therefore needs both a structural boundary—immediate following—and a semantic boundary—the second VP must plausibly express the purpose of the motion.

## PathPhrase

| Exact parser claim | Research link | What the parser may infer | What it may not infer |
|---|---|---|---|
| 向 + direction/orientation may precede 行. | [Yip & Matthews 2000, PDF p. 80](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf); corroborated by [Leung 2014, pp. 1-3](https://linguistics.berkeley.edu/~herman/documents/CantoneseCoverbs_MAPaper_Leung.pdf) | Recognize a bounded 向-direction + motion subtype. | Direction/orientation is not automatically a route or reached goal. |
| 向 toward, 經 via, source, and goal express distinct spatial relations. | [Yip & Matthews 2000, PDF pp. 77, 80](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf) | Keep direction, route, source, and endpoint roles separate. | Do not export one generic path role for all spatial expressions. |
| The current 沿住 + route subtype has not been structurally validated in the verified research set. | Search result recorded in `CP021B-R2-SOURCE-SEARCH-LOG.tsv` | Keep 沿住 quarantined and visible as a research gap. | Pedagogical lexical attestation does not validate the parser span or construction. |

`PathPhrase` is therefore only partially source-linked. It should be split or narrowed before any grammar promotion.

## LocativePlacePhrase

| Exact parser claim | Research link | What the parser may infer | What it may not infer |
|---|---|---|---|
| Preverbal 喺-place can locate an event/action. | [Kwan 2010, pp. 163-169](https://ah.lib.nccu.edu.tw/item?item_id=113083); [Yip & Matthews 2000, PDF pp. 77-78](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf) | Recognize the bounded preverbal event-location subtype. | Do not assign the same role to postverbal 喺-place. |
| Postverbal 喺-place may express a participant's result location. | [Kwan 2010, pp. 165-169](https://ah.lib.nccu.edu.tw/item?item_id=113083) | Keep result-location distinct from event-location. | Do not collapse word orders into one locative relation. |
| Subject + 喺-place may be a locative predicate. | [Yip & Matthews 2000, PDF pp. 77-78](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf) | Analyze examples such as 我喺屋企 as subject plus locative predicate, not merely a bare phrase. | Do not force an unexpressed activity predicate. |
| A place noun may be followed by a localizer such as 上面. | [Yip & Matthews 2000, PDF pp. 78-79](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf) | Preserve the noun-localizer subtype. | Do not equate it with a 喺 coverb phrase. |
| 喺度 may be locative or progressive. | [Yip & Matthews 2000, PDF p. 78](https://culturequote.wordpress.com/wp-content/uploads/2013/03/cantonese-basic.pdf) | Use surrounding constructional context to separate the readings. | Do not classify from the token alone. |
| The exact postnominal presentational coda in 有個人喺門口 remains unmapped. | Search result recorded in `CP021B-R2-SOURCE-SEARCH-LOG.tsv` | Keep this subtype review-bearing. | General locative or location-first existential evidence does not validate its exact structure. |

The label currently covers several independently described forms. The evidence supports the subtypes, not a single homogeneous construction named `LocativePlacePhrase`.

## Reviewer and evidence roles

The native Guangzhou Cantonese review remains sentence-naturalness evidence. It establishes that reviewed surface examples sound acceptable to that speaker; it does not decide constituent structure, semantic-role ontology, productivity, or parser implementation. Those claims are handled here through the research mapping and explicit assistant adjudication.

## Global status

The cumulative CP021B-R2 mapping contains 20 registered sources and 62 claim-source rows for 8 of the project's 182 labels. Of the five new Lane 09 labels, three are mapped with explicit boundaries and two require a split or narrowing. The other 149 language/lexical labels remain unmapped at this claim level.

No runtime code or accepted parser behavior changed in this checkpoint.
