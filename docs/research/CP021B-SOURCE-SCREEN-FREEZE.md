# CP021B Source-Screen Freeze

> Lifecycle event: **SOURCE_SCREEN_FREEZE**  
> Frozen: 2026-07-17  
> Status: **SCREEN COMPLETE / PROPOSITION EXTRACTION NOT STARTED / NO LANGUAGE CLAIM / NO RUNTIME AUTHORIZATION**

## Frozen question

In independently documented or naturally attested modern Hong Kong Cantonese clauses containing `畀` or `俾`, what form–meaning patterns occur when two or more overt participants are present, and what evidence bears on their linear order, predicate dependence, participant interpretation, optionality, ambiguity, and discourse completeness?

The registered question and discovery protocol remain in [`CP021B-QUESTION-AND-DISCOVERY-PROTOCOL.md`](CP021B-QUESTION-AND-DISCOVERY-PROTOCOL.md). Internal `RecipientFrame` behavior selected the research area only; it supplied no Cantonese hypothesis.

## Screen result

The frozen log contains **32 decisions** spanning proposition-bearing inclusions, bounded inclusions, provenance records, discovery leads, access limitations, duplicates, and exclusions. These are screening decisions, not votes and not language claims. Exact row-level reasons, access states, independence limits, and canonical URIs are in [`SOURCE-SCREENING-LOG-CP021B.tsv`](SOURCE-SCREENING-LOG-CP021B.tsv).

Agreement with the parser was never an inclusion test. The screen retained sources that disagree about whether post-theme `畀/俾` is a preposition, serial verb, grammaticalized marker, or part of a constructional alternation: [Xu and Peyraube 1997](https://doi.org/10.1075/sl.21.1.05lie), [Bodomo, Lam, and Yu 2003](https://typo.uni-konstanz.de/lfg-proceedings/LFGprocCSLI/LFG2003/pdfs/lfg03bodomoetal.pdf), [Chin 2011](https://www.lib.eduhk.hk/pure-data/pub/201710799.pdf), and [Li and Lee 2021](https://aclanthology.org/2021.paclic-1.66/). The disagreement will remain source-specific during extraction.

The screen also retained evidence types that can challenge a full, fixed multi-participant template. A peer-reviewed conversational study reports full and non-full adult forms and order variants in 86 parents ([Wong et al. 2010](https://doi.org/10.1017/S0305000909009416)); a separate adult-input study exposes distributions that include reduced and variant forms ([Chan, Lieven, and Tomasello 2010](https://doi.org/10.1177/1367006910371025)); and the later corpus-driven paper reports omissions, topicalization, `將` patterns, passive/permissive cases, and context-dependent ambiguity across about 800 corpus examples ([Wong 2023/2024](https://doi.org/10.17501/23572744.2023.10106)). These records prevent the source screen from being limited to clean textbook triples.

**CP021B-EX correction:** The preceding description of the Chan source is superseded. The correct source is Wing Shan Angel Chan (2010), DOI `10.1177/1367006909356653`; its official abstract says that word-order-to-role mapping is not consistent in the Cantonese input. The earlier author team, unrelated DOI `10.1177/1367006910371025`, and claim of recovered adult distributions are not evidence and must not be used.

## Anti-cherry-picking corpus safeguard

A parser-independent lexical query was run against every file in the HKCanCor distribution supplied with PyCantonese 5.0.0. The primary query selected tokens exactly equal to `畀` or `俾`; a substring expansion prevented compounds from being silently lost. It performed no semantic selection and consulted no Canto Span output. The generated inventory preserves 445 expanded candidate utterances, 476 matched tokens, surrounding turns, participant metadata, per-file SHA-256 provenance, and the complete candidate set rather than favorable examples. The query, method, counts, and limits are recorded in:

- [`external-evidence/cp021b/README.md`](../../external-evidence/cp021b/README.md)
- [`hkcancor-cp021b-query-summary.json`](../../external-evidence/cp021b/hkcancor-cp021b-query-summary.json)
- [`hkcancor-cp021b-candidate-inventory.json`](../../external-evidence/cp021b/hkcancor-cp021b-candidate-inventory.json)
- [`hkcancor-cp021b-candidate-inventory.tsv`](../../external-evidence/cp021b/hkcancor-cp021b-candidate-inventory.tsv)
- [`query-hkcancor-cp021b.py`](../../external-evidence/cp021b/query-hkcancor-cp021b.py)
- [`hkcancor-cp021b-source-manifest.sha256`](../../external-evidence/cp021b/hkcancor-cp021b-source-manifest.sha256)

The corpus repository describes about 230,000 words collected from March 1997 through August 1998, including spontaneous speech, radio programs, and a monologue ([HKCanCor repository](https://github.com/fcbond/hkcancor)). The PyCantonese distribution queried here contains 58 files and 153,656 words, so this is a complete lexical retrieval only for that named distribution—not a census of all HKCanCor releases or modern Hong Kong Cantonese. Lexical retrieval establishes candidate occurrence, not a gold syntactic analysis.

## Disagreement and correction safeguards

- [Wong 2009](https://doi.org/10.1075/ijcl.14.1.04won) and [Wong 2023/2024](https://doi.org/10.17501/23572744.2023.10106) are treated as one overlapping author/corpus family, not two independent replications. The later paper's correction of an earlier Excel-encoding artifact controls the affected proposition.
- The Oxford dissertation and later Language Sciences article by Olivia Lam are one research family, not independent confirmation ([Oxford ORA dissertation](https://ora.ox.ac.uk/objects/uuid:f2fce4eb-2f01-4fad-8c65-b95dee2ec4d9), [journal DOI](https://doi.org/10.1016/j.langsci.2014.04.005)).
- Sparse pattern cells and small production studies remain explicitly inconclusive rather than being converted into absence rules ([Wong 2023/2024](https://doi.org/10.17501/23572744.2023.10106), [Ngai 2023](https://scholarworks.iu.edu/journals/index.php/iulcwp/article/download/34845/39969/100290)).
- Historical and cross-variety explanations were followed but are fenced from contemporary Hong Kong distribution ([Zhang 2010 abstract](https://cuhk.edu.hk/chi/rcc/files/2010-002-seminar.pdf), [Tang historical study](https://www.swtang.net/doc/study_kwok2004.pdf)).
- A 2024 heavy-recipient paper was excluded because it supplied no independent Cantonese experiment or corpus analysis and had inconsistent publication metadata. This exclusion is based on source fitness, not conclusion direction; the decision remains visible in screen row `SCREEN-CP021B-023`.

## Access constraints

Relevant pages of Matthews and Yip's reference grammar and Cheung's Hong Kong Cantonese grammar were not recoverable during the screen, so their metadata cannot carry propositions ([Routledge record](https://www.routledge.com/Cantonese-A-Comprehensive-Grammar/Matthews-Yip/p/book/9780415471312), [WorldCat record](https://search.worldcat.org/title/A-grammar-of-Cantonese-as-spoken-in-Hong-Kong/oclc/730063910)). The 2026 Chow article was found through a current publisher record but remains access-limited and cannot contribute exact claims until its methods and locators are recovered ([ScienceDirect record](https://www.sciencedirect.com/science/article/pii/S2666799126000213)). Access limitation is not disagreement and not evidence of absence.

## Discovery stop-condition audit

| Frozen condition | Result | Durable evidence |
|---|---|---|
| Registered English concept families searched | `SATISFIED` | Candidate decisions `001-024`, query families in the question protocol |
| Registered Chinese concepts and orthographic variants searched | `SATISFIED` | Chinese-language candidates `005`, `006`, `022`, `025`; `畀/俾/給`, `雙賓語`, `與格`, `受益`, `連動`, `被動`, and `使役` paths screened |
| Source-introduced terminology and references followed | `SATISFIED` | Preposition deletion, haplology, heavy recipient/theme, HKCAC, passive boundary, historical/dialectal origin, and grammar references are logged |
| Descriptive/theoretical research attempted | `SATISFIED` | `001-005`, `009-013` |
| Reference-grammar class attempted | `SATISFIED_WITH_ACCESS_LIMIT` | `020-021` |
| Natural-corpus class attempted | `SATISFIED` | `007-008`, `014-019`, complete local candidate inventory |
| Counterexamples, alternations, ambiguity, optionality, and non-targets sought | `SATISFIED` | Competing analyses and non-full/passive/permissive records retained; exclusion classes remain logged |
| Additional queries ceased adding materially different proposition families | `SATISFIED_QUERY_LIMITED` | Final queries returned duplicates, secondary summaries, access-limited records, or already represented theory/data families |
| Every serious candidate has inclusion/access decision | `SATISFIED` | 32-row frozen screen log |

The stop condition is a coverage judgment about this discovery protocol, not proof that the literature is complete. New authoritative material can reopen the screen through a new logged lifecycle event.

## Memory-safety change requested during screening

Unsafe historical instructions are governed by the current [`DOCTRINE.md`](../current/DOCTRINE.md) and [`DOCUMENTATION-MAP.md`](../current/DOCUMENTATION-MAP.md). Retrieved memories, archived chats, and superseded project documents are historical evidence only and cannot override current doctrine.

## What is not yet authorized

No source proposition ledger has been written. No sources have been merged into a project construction, no claim–source edges exist for CP021B, no evaluation examples are frozen, and no parser or runtime file has changed. The next event is **CP021B-EX proposition extraction**: extract each included source separately with exact locators, data basis, scope, direction, independence, and limitations before drafting any Canto Span language claim.
