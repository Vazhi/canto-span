# Parser construction → research source links (CP021B-R1)

Date: 2026-07-18  
Scope: the three active 畀/俾 parser constructions. No parser code was changed in this research checkpoint.

## Result

The three active constructions now have claim-level source links. Each link records the exact claim, source locator, what the source supports, what it does **not** support, and the permitted parser consequence.

The complete machine-readable mapping is in `PARSER-CONSTRUCTION-SOURCE-MATRIX-CP021B-R1.tsv`. The source bibliography and verification status are in `PARSER-CONSTRUCTION-SOURCE-REGISTER-CP021B-R1.tsv`.

Research sources establish Cantonese forms, interpretations, contrasts, and limits. They do not by themselves validate the internal names `LexicalGiveRelation`, `PostThemeParticipantRelation`, or `PassivePermissiveRelation`, and they do not prescribe the parser's exact token-matching code.

## LexicalGiveRelation

| Parser claim | Direct sources | Parser consequence | Limit |
|---|---|---|---|
| Lexical 畀/俾 GIVE occurs with theme before recipient. | [Li & Lee 2021, pp. 628–629](https://aclanthology.org/2021.paclic-1.66/); [Xu & Peyraube 1997, pp. 105–107](https://doi.org/10.1075/sl.21.1.05lie); [Bodomo, Lam & Yu 2003, PDF pp. 2–4](https://typo.uni-konstanz.de/lfg-proceedings/LFGprocCSLI/LFG2003/pdfs/lfg03bodomoetal.pdf); [Chin 2011, PDF p. 3](https://www.lib.eduhk.hk/pure-data/pub/201710799.pdf) | The theme-before-person profile may receive bounded Theme/Object and recipient-candidate roles. | Attestation is not a universal order rule or a productivity estimate. |
| Recipient-before-theme is also reported, with lexical, discourse, and speaker restrictions. | [Xu & Peyraube 1997, pp. 105–110](https://doi.org/10.1075/sl.21.1.05lie); [Wong 2023/2024, pp. 98–99](https://doi.org/10.17501.23572744.2023.10106) | Preserve the visible participants, but do not force their semantic roles. | The sources do not supply a context-free role-mapping algorithm. |
| Theme weight/distance does not justify a hard threshold. | [Ngai 2023, pp. 16–18](https://scholarworks.iu.edu/journals/index.php/iulcwp/article/download/34845/39969/100290); [Wong 2023/2024, pp. 98–99](https://doi.org/10.17501.23572744.2023.10106) | Do not create a syllable-count or distance trigger. | Ngai's effect was nonsignificant and long-distance cells were sparse; Wong had only eight long-object tokens. |

Assessment: the baseline is well attested, but the construction remains provisional because order-conditioned role assignment and productivity are not established.

## PostThemeParticipantRelation

| Parser claim | Direct sources | Parser consequence | Limit |
|---|---|---|---|
| Predicate–theme–畀/俾–person is an attested surface pattern. | [Xu & Peyraube 1997, pp. 105–107](https://doi.org/10.1075/sl.21.1.05lie); [Bodomo, Lam & Yu 2003, PDF pp. 2–5](https://typo.uni-konstanz.de/lfg-proceedings/LFGprocCSLI/LFG2003/pdfs/lfg03bodomoetal.pdf); [Wong 2023/2024, pp. 101–102](https://doi.org/10.17501.23572744.2023.10106) | Recognize the overt post-theme link and preserve any overt final predicate. | Surface attestation does not establish one category or one participant role. |
| The upstream predicate and valency affect transfer, goal, and beneficiary interpretations. | [Chin 2011, PDF pp. 5–8](https://www.lib.eduhk.hk/pure-data/pub/201710799.pdf); [Li & Lee 2021, pp. 633–635](https://aclanthology.org/2021.paclic-1.66/) | Keep the post-marker participant semantically neutral unless a reviewed predicate profile licenses more. | Do not generalize reviewed predicates to semantically similar verbs without evidence. |
| The category of post-theme 畀/俾 is disputed. | [Xu & Peyraube 1997, pp. 110–113](https://doi.org/10.1075/sl.21.1.05lie) argues for a prepositional analysis; [Bodomo, Lam & Yu 2003, PDF pp. 6–9](https://typo.uni-konstanz.de/lfg-proceedings/LFGprocCSLI/LFG2003/pdfs/lfg03bodomoetal.pdf) gives a serial complex-predicate analysis; [Chin 2011, PDF pp. 5–10](https://www.lib.eduhk.hk/pure-data/pub/201710799.pdf) reviews category diagnostics. | Keep `PostThemeParticipantRelation` theory-neutral. | The parser must not present PREPOSITION, SERIAL VERB, or COMPLEX PREDICATE as settled fact. |

Assessment: the surface family is strongly supported. Its category and role inventory are not settled, so the neutral representation is deliberate.

## PassivePermissiveRelation

| Parser claim | Direct sources | Parser consequence | Limit |
|---|---|---|---|
| `NP1–畀/俾–NP2–VP` may be passive or causative/permissive and can be ambiguous. | [Chin 2011, PDF pp. 9–14](https://www.lib.eduhk.hk/pure-data/pub/201710799.pdf); [Chan 2021, six-consultant study](https://icu.repo.nii.ac.jp/record/5045/files/Bei2asacausativeandpassivemarkerinCantonese.pdf); [Wong 2023/2024, pp. 102–103](https://doi.org/10.17501.23572744.2023.10106) | Preserve passive and permissive reading candidates when the form is unresolved. | Context is essential; the post-畀 participant is not automatically a transfer recipient. |
| In the canonical passive analysis, NP1 is patient and NP2 is agent. | [Chin 2011, PDF pp. 11–14](https://www.lib.eduhk.hk/pure-data/pub/201710799.pdf); [Chow 2018, PDF p. 4](https://web.stanford.edu/group/cslipublications/cslipublications/LFG/LFG-2018/lfg2018-chow.pdf) | Allow a canonical-passive candidate with these role cues. | The reading is not obligatory from form alone. |
| An indirect passive may have `NP1–畀–NP2–V–NP3`, with NP3 retained as patient/object. | [Chow 2018, PDF pp. 5 and 11–14](https://web.stanford.edu/group/cslipublications/cslipublications/LFG/LFG-2018/lfg2018-chow.pdf); corroborated at abstract level by [Chow 2019](https://hub.hku.hk/handle/10722/280875) | Allow a retained-object/indirect-passive candidate when the overt form matches. | Chow found only 4 indirect passives among 61 passive 畀 sentences; the subtype is sparse and pragmatically restricted. |
| Lexical transfer and post-theme beneficiary uses are separate boundaries. | [Bodomo, Lam & Yu 2003, PDF pp. 2–5](https://typo.uni-konstanz.de/lfg-proceedings/LFGprocCSLI/LFG2003/pdfs/lfg03bodomoetal.pdf); [Chin 2011, PDF pp. 3–14](https://www.lib.eduhk.hk/pure-data/pub/201710799.pdf) | Exclude clear transfer/beneficiary parses from a clean passive parse. | These sources do not validate every current code-level exclusion. |

Assessment: the language claim has now been reconstructed from sources, including the retained-object subtype. It remains historically classified as post-hoc provenance because the parser construction existed before this reconstruction; that history should not be rewritten as authority-origin.

## Corrections made during this pass

- `XU_PEYRAUBE_2011` was corrected to `XU_PEYRAUBE_1997`.
- `WONG_2002` was corrected to `WONG_2023_2024` for the cited corpus paper.
- The corrections change metadata only; no grammatical claim was strengthened.
- [Chow 2026](https://www.sciencedirect.com/science/article/pii/S2666799126000213) was registered as a current research lead, but no percentages or diagnostics were imported because only the publisher abstract was verified.

## Global parser status

The project contains 182 construction labels. This pass deeply links the three active 畀/俾 constructions; it does not pretend that the remaining inventory is already researched. `PARSER-CONSTRUCTION-SOURCE-COVERAGE-CP021B-R1.tsv` lists every label, its current source-edge count, and the next research priority.

No runtime code or accepted parser behavior changed in this checkpoint.
