# Issue 712 — AA49 IndependentMotionPredicateVP source inventory R1

Date: 2026-08-10
Construction: AA49 `IndependentMotionPredicateVP`
Legacy runtime label: `DirectionalMotionVP`
Status effect: research clarification only; no runtime or linguistic-status promotion

## Research question

What independently predicative Cantonese motion profile is directly established by the two sources already attached to AA49, and what material must remain outside the AA49 identity even when it composes around a valid motion predicate?

## Source 1 — Shan & Jin 2025

Source ID: `SRC-SHAN-JIN-2025-MOTION-TYPOLOGY`

Citation: Shan, Yunming & Jin, Lixin. 2025. 粵語位移事件編碼類型再探 [Revisiting the encoding typology of motion events in Cantonese]. *Language and Linguistics* 26(3), 467–495. DOI `10.1075/lali.00202.sha`.

Verification: full article text, CC BY 4.0 author/public full-text copy, cross-checked against publisher metadata.

### Exact locators and supported propositions

1. §3.1, examples (1)–(2): the paper defines a closed directional-verb class containing deictic `嚟/去` and non-deictic `上、落、出、入、過、開、埋、返、起`, then states that these verbs can be used independently as sentence predicates/path verbs. Examples include `你嚟廣州`, `我去北京`, `佢上/落咗樓`, `佢入咗房`, and related path-predicate examples.
2. §4.1, examples (29)–(32): self-motion can also be encoded by a single verb; examples include `到`, `跑`, `走`, and `飛`, including `架車走咗`.
3. §4.3 / Table 2 discussion: `上、落、出、入、過、返、嚟、去` frequently occur as single verbs or path verbs in serial motion encoding, whereas `開、埋、起` show a stronger complement tendency. The source therefore does not license treating every member of the directional-verb inventory as equally productive in every syntactic role.

### AA49 consequence

The source directly supports an **independently predicative lexical motion/path-verb core**. It does not support defining AA49 as every string containing a directional form. In particular, serial manner+path sequences, postverbal directional complements, caused-motion uses, and multi-part path expressions require their own structural analysis.

## Source 2 — Yiu 2016

Source ID: `SRC-YIU-2016-DIRECTIONAL-ASPECT`

Citation: Yiu, Carine Yuk-man (姚玉敏). 2016. 粵語繼續體「落去」和開始體「起嚟」的產生. In *漢語研究的新貌：方言、語法與文獻 / New Horizons in the Study of Chinese: Dialectology, Grammar, and Philology*, 261–284. Chinese University of Hong Kong.

Verification: full-text PDF from the Chinese University of Hong Kong.

### Exact locators and supported propositions

1. pp. 263–264, examples (10)–(12): `落`, `去`, and `嚟` are explicitly analyzed as predicates in self-motion events: `佢落咗樓下`, `佢落咗去`, `佢落咗嚟`, `佢去咗（辦公室）`, `佢嚟咗（辦公室）`.
2. p. 264: `去/嚟` may occur with or without a locative object; the locative denotes the endpoint. `落` normally has a locative object when used as the predicate, or combines with deictic `去/嚟` when that locative is absent.
3. pp. 265–266, examples (20)–(27): the same lexical items are separately analyzed as **complements** after a manner or caused-motion predicate, e.g. `跑咗落樓下`, `跑咗去（辦公室）`, `擰咗本書去`, `擰咗本書嚟課室`.
4. pp. 266–267, examples (28) onward: compound directional material such as `落去`, `起嚟`, `翻落去`, `翻起嚟`, `上去`, `入嚟`, and `過嚟` has its own internal and distributional behavior and is not reducible to a single independent predicate merely because it contains a directional verb.

### AA49 consequence

Yiu provides the decisive predicate/complement contrast required by the canonical name `IndependentMotionPredicateVP`. A lexical motion item may participate in AA49 when it itself heads the motion predicate. The same surface lexeme does **not** inherit AA49 identity when it is a postverbal directional complement or a component of a larger compound directional expression.

## Combined source-bounded profile

### Directly supported AA49 core

AA49 may represent an independently predicative lexical motion/path verb, including directly attested `去`, `嚟`, `落`, and `走` profiles. Shan & Jin also directly attest other single path verbs, but the current runtime fixture inventory should not be expanded merely from this research note.

A goal/location and perfective aspect may occur around or with the independent predicate where directly attested, e.g. `去北京`, `去咗辦公室`, `嚟咗辦公室`, `走咗`. Those surrounding components do not become part of the permanent AA49 identity merely because the source example contains them.

### Supported composition, not AA49 identity expansion

The current parser may place a valid independent motion predicate inside larger structures such as goal phrases, aspectual structures, negation, modal hosts, question frames, particles, clause relations, reported/cognition frames, or purpose chains. Only goal/location and some perfective combinations are directly illustrated by the two AA49 sources. Other larger compositions remain implementation behavior unless separately sourced; they cannot broaden the AA49 linguistic claim.

### Neighboring structures that must not inherit AA49 evidence

- compound directionals such as `返嚟`, `返去`, `上去`, `落嚟`, `入去`, `出嚟`, `返過嚟`;
- manner + directional sequences such as `行入去` and `行出嚟`;
- postverbal directional complements after a transitive/manner predicate, e.g. `帶…去`, `攞…返嚟`, `寄返去`;
- caused-motion directional uses;
- aspectualized/grammaticalized `落去` and `起嚟` uses;
- any containing clause that merely happens to contain one of these forms.

These profiles may be independently well supported by the same papers, but that support belongs to the appropriate neighboring identity rather than AA49.

## Unresolved / deliberately not inferred

- The two sources do not by themselves establish every lexical member that the runtime currently recognizes as an independent motion predicate.
- They do not establish the parser's full modal, negation, question, particle, discourse, or clause-linking coverage as part of AA49.
- They do not establish unrestricted productivity across dialects or registers.
- They do not justify treating runtime fixture frequency as evidence.

## Disposition

`RETAIN_NARROW_RESEARCH_PENDING`.

The canonical AA49 identity is well motivated as `IndependentMotionPredicateVP`, but its evidence must be attached to the **independent predicate subspan**, not to every larger motion construction that contains the same lexical material. No runtime change is authorized by this research task.
