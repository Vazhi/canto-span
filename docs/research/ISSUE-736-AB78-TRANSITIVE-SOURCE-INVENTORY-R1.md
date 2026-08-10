# Issue 736 — AB78 TransitiveVP source inventory R1

Date: 2026-08-10
Construction: AB78 `TransitiveVP`
Status effect: research clarification only; no runtime or linguistic-status promotion

## Research question

What observable Cantonese predicate–object behavior is independently supported strongly enough to define the linguistic claim behind AB78, and which neighboring postverbal or object-like profiles must remain separate even when current runtime machinery labels them `TransitiveVP`?

This inventory follows the behavior-first contract. Parser output, fixture frequency, slot names, and historical snapshots have evidence weight zero for the linguistic claim.

## Source 1 — Alderete et al. 2017

Source ID: `SRC-ALDERETE-ETAL-2017-SYNOPSIS`

Citation: John Alderete, Queenie Chan, Macarius Chan, Gloria Fan & Olivia Nickel. 2017. *Cantonese Grammar Synopsis*. Simon Fraser University.

Verification: official SFU full-text PDF.

### Exact locators and supported propositions

1. p. 25, §4.1 example (56): verbs are explicitly divided by subcategorization. The source gives an intransitive frame, a transitive frame `V (Asp) NP`, a separately listed `V (Asp) CP` frame, and a ditransitive `V NP NP` frame. Its transitive NP example is `sau55 tsin35` ‘receive money’.
2. p. 38, §7 example (104): simple transitive VP is explicitly `VP → V NP`, illustrated by `hok22 jiŋ55man35` ‘learn English’.
3. p. 38, the same table separately represents ditransitives as `V NP_DO NP_IO` or `V NP_DO bei35 NP_IO`.
4. p. 38, example (105): serial-verb constructions (`V1 V2 NP`, `V1 NP V2`, `V1 NP V2 NP`) and causative/resultative `V Adj NP` are separately represented rather than collapsed into simple transitive `V NP`.
5. pp. 37–38, the general VP schema permits aspect/verbal-particle and other VP-level material around verbal predicates. Those surroundings do not erase the structural distinction among simple transitive, ditransitive, serial, and resultative profiles.

### AB78 consequence

Alderete et al. directly establish a narrow, observable Cantonese **lexical verbal predicate + NP object** core. The paper also supplies the most important negative structural evidence for this audit: CP complements, ditransitives, serial-verb structures, and resultative structures are not licensed as AB78 merely because they contain a verb followed somewhere by nominal material.

The source supports aspect as compatible with transitive valency, but does not justify treating an aspect-bearing verb plus arbitrary following material as a transitive VP without an independently licensed object relation.

## Source 2 — Wong et al. / Wong 2022–2023 GACS

Source ID: `SRC-WONG-2023-LANGUAGE-SAMPLE`

Citation: Anita Mei-Yin Wong, with Candice Chi-Hang Cheung, Jessica Man-Wai Lo & Emily Ka-Hei Wan. “Grammatical Analysis of Cantonese Samples.” In *Understanding Development and Disorder in Cantonese using Language Sample Analysis*. Routledge, 2022/2023 edition metadata.

Verification: publisher chapter metadata plus author-uploaded chapter text; pagination differs across copies, so section headings are the stable locator.

### Exact locators and supported propositions

1. Chapter 2, Section C “Sentence Structures”, item 1 “Verb-object structure (VO)”: the chapter defines a VO surface structure as a verb followed by an object and gives `攞車車` ‘take the car’ as an ordinary lexical-verb example.
2. The same GACS category deliberately also includes copular/existential and reduced ditransitive scoring profiles. It is therefore a **broad descriptive coding category**, not a direct syntactic definition of one AB78 construction.
3. Section C item 2 “Subject-verb-object structure (SVO)” gives an overt lexical transitive example `佢哋喺度開禮物呀` ‘they are opening the gifts’.
4. Section C item 3 “Subject-verb structure (SV)” explicitly allows a transitive verb whose object is omitted, e.g. `我洗咗喇` ‘I have washed (it)’. This establishes that overt postverbal NP realization is not a necessary surface property of every transitive predicate use.
5. Section C item 6 “Topic structure” separately describes object topicalization, with the object preceding the verb.
6. Section C item 9 “Pivotal constructions”, item 13 “Clausal complements”, and item 14 “Serial verb constructions” are separately defined structural categories.
7. The chapter’s wh-question section explicitly notes that Cantonese wh words remain in situ and may function as objects, illustrated by `你搵邊個呀？` ‘Who are you looking for?’.

### AB78 consequence

Wong supports ordinary overt VO/SVO, in-situ wh objects, and the existence of contextually recoverable omitted-object uses. But its GACS `VO` label is intentionally broader than the narrow parser identity being audited: it can include copular/existential and reduced ditransitive profiles that Canto Span already distinguishes elsewhere.

Accordingly, Wong is useful for **behavioral contrasts**, not as authority to map the whole GACS VO bucket onto AB78.

## Independent boundary cross-checks

These sources are not added to AB78's canonical `source_ids` in this research-only task, but they independently test important boundaries raised by the two attached sources.

### Zhou, Mai & Yip 2020 — object realization

Jiangling Zhou, Ziyin Mai & Virginia Yip. 2020. “Bidirectional cross-linguistic influence in object realization in Cantonese–English bilingual children.” *Bilingualism: Language and Cognition* 24(1): 96–110.

The controlled production study explicitly investigates Cantonese object realization with different verb types and reports a Cantonese pattern of omitting objects specified in prior discourse. This supports treating **discourse-licensed object omission** as a real Cantonese behavior requiring explicit context licensing, not as evidence that any objectless action verb is an ordinary AB78 positive.

### Matthews & Yip 2017 — noun-modifying clauses

Stephen Matthews & Virginia Yip. 2017. “Noun-modifying clauses in Cantonese.” In *Noun-Modifying Clause Constructions in Languages of Eurasia*, 105–120.

The authors distinguish noun-modifying clauses in which the head noun bears a grammatical argument relation to the modifying clause. This independently supports an object-related gap/profile in relative/noun-modifying material, but it does not make a surface bare verb inside that modifier identical to the overt `V NP` core.

### Cantonese ditransitive studies

Wong et al. 2009/2010 and Lam 2007 independently describe Cantonese dative/double-object structures with recipient/theme argument organization. They reinforce Alderete et al.'s decision to keep ditransitive argument structures separate from simple monotransitive `V NP`.

## Behavior-first combined profile

### Profile A — overt object core

The strongest common directly supported behavior is:

```text
lexical verbal predicate + overt NP object
```

The object may itself be a simple, quantified, demonstrative, or independently licensed wh NP. Those internal NP properties belong to the NP construction; AB78 evidence concerns the predicate–object relation.

Directly compatible examples include ordinary patterns like:

- `食一個蘋果`
- `講廣東話`
- `問問題`
- `講呢個故事`
- in-situ wh-object profiles such as `睇邊本書` or `搵邊個` when the wh expression is independently an object NP.

### Profile B — transitive predicate with non-overt object realization

Cantonese independently allows transitive predicates whose object is recoverable from prior discourse. Relative/noun-modifying clauses can also establish an argument relation to a head noun outside the narrow predicate span.

These behaviors are not the same surface construction as overt `V NP`. A later runtime specification must decide whether AB78 is an umbrella valency identity with explicit realization subtypes or whether an overt-object core plus separate context/gap wrappers better matches the parser architecture. This research task does not force that ontology decision.

### Profile C — outer composition around a narrow predicate–object relation

Aspect, negation, modal/question material, clause embedding, and serial/purpose hosts may contain an independently licensed transitive predicate–object child. Their outer material is not AB78 evidence merely because the child occurs inside them.

### Profile D — neighboring structures excluded from automatic AB78 inheritance

The attached and cross-check sources distinguish:

- CP/clausal complements;
- ditransitives/datives;
- pivotal structures;
- serial-verb constructions;
- resultative/causative structures;
- existential and copular structures;
- topicalized object structures at the clause level.

These may contain verbs and nominal material but require their own structural evidence.

### Profile E — lexical/semantic compatibility is separate from transitive syntax

A structurally possible `V + NP` string can still be semantically or lexically anomalous. `食香港` and `飲香港`, for example, are poor grammatical-boundary probes because rejection can arise from predicate–argument compatibility rather than transitive constituent order.

They may remain useful implementation compatibility diagnostics, but they have no clean negative evidentiary force for AB78 syntax.

### Profile F — quantity/measure material requires an object analysis

A predicate followed by a quantity/measure expression is not automatically `V + NP object`. The current attached sources do not license approximate quantity strings such as `飲七杯度` as ordinary AB78 merely because runtime metadata exposes an `object` affordance. Such profiles require independently justified quantity/measure semantics and argument structure.

## Unresolved / deliberately not inferred

- Whether Canto Span should retain one canonical identity `TransitiveVP` spanning overt and licensed-null object realization, or split implementation representation while preserving one linguistic valency claim.
- Which lexical verb classes freely allow object omission and under exactly which discourse conditions.
- Whether every wh-object profile currently typed by the parser has independently adequate NP/selection support.
- Whether conventional activity collocations such as `講電話`, `食晏`, or `煮飯` should always be represented compositionally as ordinary transitive `V + object` rather than lexicalized or construction-specific predicates.
- Whether approximate quantity/measure complements instantiate direct objects in the specific runtime profiles now covered.

## Disposition

`RETAIN_NARROW_RESEARCH_PENDING`.

AB78 has a well-supported Cantonese predicate–object core, but its historical runtime/test family mixes that core with separate realization strategies, outer composition, semantic-selection controls, and at least one quantity/measure profile whose object status is not established by the attached evidence.

No runtime, fixture expectation, identity, or linguistic-status change is authorized by this source inventory.
