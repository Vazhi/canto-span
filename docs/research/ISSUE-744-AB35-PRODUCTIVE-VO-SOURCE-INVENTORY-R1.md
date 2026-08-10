# Issue 744 — AB35 ProductiveVO source inventory R1

Date: 2026-08-10
Construction: AB35 `ProductiveVO`
Audit role: behavior-first linguistic source inventory
Runtime/test frequency: implementation evidence only; independent linguistic evidence weight 0

## Research question

Does the legacy runtime family called `ProductiveVO` correspond to one independently supported Cantonese construction, or does it conflate ordinary transitive V–NP syntax with lexical/separable verb–object compounds and higher compositional material?

## Source 1 — Alderete et al. 2017, Cantonese Grammar Synopsis

**Reference**

Alderete, John, et al. 2017. *Cantonese Grammar Synopsis*. Simon Fraser University. Current verified PDF: `https://www.sfu.ca/~alderete/pubs/aldereteEtal2017_cantgsyn2017-10-31.pdf`.

Canonical repo source id already attached to AB35: `SRC-ALDERETE-ETAL-2017-SYNOPSIS`.

### Exact locators and directly relevant claims

#### pp. 21–23, §3.3 Compounding, examples (49)–(52)

The synopsis explicitly says that verb–object compounds are difficult to distinguish from ordinary verb + direct-object phrases because both may occupy the same slots and may permit aspect/verbal material to intervene. It nevertheless treats **verb–object compounds as a separate compound type**.

Example (52) gives:

- input: `V + Object`;
- grammatical function: **Intransitive Verb, Noun Phrase**;
- example: `duk22-sy55` ‘study’ (literally study-book).

The notes state that these combinations mirror verb–object order but need not be semantically transparent. `jam35-tsaː21` is given with the lexical meaning ‘have dim sum’ rather than ordinary literal ‘drink tea’. The same section states that interruption possibilities are construction-sensitive and that classifier/measure separation can destroy an idiomatic compound reading.

**Claim limit:** this supports a Cantonese lexical/morphological V–O-compound domain whose surface resembles ordinary V–O syntax. It does **not** license treating any transparent verb followed by a noun as a compound.

#### p. 24, §4.1, example (56)

The synopsis separately defines ordinary verbs by subcategorization:

- intransitive: `[ V (Asp) ]`;
- transitive: `[ V (Asp) NP ]`;
- CP-complement-taking verb: `[ V (Asp) CP ]`;
- ditransitive: `[ V NP NP ]`.

Explicit examples include transitive `sau55 tsin35` ‘receive money’, CP-complement `gei33dak55 [kœi23 gei35 lek55]` ‘remember she is quite smart’, and ditransitive `gaːu33 kœi23 dzuŋ55man35` ‘teach him/her Chinese’.

**Claim limit:** ordinary V–NP transitivity is independently represented and cannot be collapsed into the lexical V–O-compound class solely because both have V–O surface order.

#### p. 37, §5.2, example (104)

The simple-VP inventory includes ordinary compositional VPs such as:

- `[V Asp NP]` `dzou22-gan35 guŋ55fo33` ‘doing homework’;
- `[V (Asp) NP NP]` `gaːu33 kœi23 dzuŋ55man35` ‘teach him/her Chinese’;
- serial/complex VP profiles as separately structured combinations.

**Claim limit:** `做功課`-type material is directly illustrated inside ordinary VP syntax. This is evidence against treating `做功課` as evidence for a distinct ProductiveVO construction merely because the runtime whitelist contains it.

## Source 2 — Bodomo, Yu & Che 2017, Verb-Object Compounds and Idioms in Chinese

**Reference**

Bodomo, Adams, So-sum Yu & Dewei Che. 2017. “Verb-Object Compounds and Idioms in Chinese.” In *Computational and Corpus-Based Phraseology*, Lecture Notes in Computer Science 10596: 383–396. DOI `10.1007/978-3-319-69805-2_27`.

This source is not currently one of AB35’s canonical frontmatter `source_ids`; it is used here as an independent primary-source cross-check and does not by itself change the canonical source registry.

### Exact locators and directly relevant claims

#### pp. 383–385, Introduction and §2

The paper describes Chinese verb–object compounds (VOCs) as having mixed lexical and syntactic properties. For Cantonese it gives `jau-seoi` ‘swim’ (literally swim-water) as a VOC whose two parts can be interrupted by perfective aspect and duration material while retaining unitary lexical semantics.

The authors explicitly distinguish ordinary verb–object phrases from VOCs. Their Cantonese diagnostics include ordinary objects following verbs, topicalization, and modification.

#### pp. 386–388, examples (13)–(17)

A particularly useful Cantonese contrast is:

- ordinary VP `paa saan` ‘climb mountains’;
- VOC `paa-tau` ‘overtake’ (literally climb-head).

The ordinary VP permits conjunction of compatible nominal objects (`paa saan tung sek` ‘climb mountains and rocks’). Applying the same operation to the VOC destroys its lexical meaning. The paper uses this and related diagnostics to argue that VOCs have a morphological/semantic unity absent from ordinary transparent V–NP phrases.

#### pp. 389–390, example (18)

The separated Cantonese VOC `jau-seoi` is analyzed as retaining a single lexical semantics ‘SWIM’ even though verbal and nominal components are non-contiguous.

**Claim limit:** the paper directly supports a Cantonese V–O-compound/idiom domain and explicit diagnostics distinguishing it from ordinary V–NP syntax. It does not establish that every activity-like V–O expression belongs to one homogeneous class, and it does not license arbitrary productive V+noun generation.

## Source 3 — Chan & Cheung 2020, Morpho-Syntax of Non-VO Separable Compound Verbs in Cantonese

**Reference**

Chan, Sheila S. L. & Lawrence Y. L. Cheung. 2020. “Morpho-Syntax of Non-VO Separable Compound Verbs in Cantonese.” *Studies in Chinese Linguistics* 41(2):185–206. DOI `10.2478/scl-2020-0007`. Open-access article published by the Chinese University of Hong Kong T. T. Ng Chinese Language Research Centre.

This source is used as an independent primary-source cross-check and does not by itself change AB35’s canonical source registry.

### Exact locators and directly relevant claims

#### pp. 190–194, §§2.3–2.5

The paper emphasizes that separability is **not homogeneous even within VO compounds**. It presents separability as a continuum, and states that which VO compound permits which separation pattern must be learned individually rather than supplied by one unrestricted rule.

A Cantonese example shows long-distance topicalization of the object-like component in a highly separable compound. The authors then state that Cantonese separable compounds share the general mixed lexical/phrasal problem discussed in the literature.

#### pp. 194–197, §3.1

The study collected 878 VO compounds from two Cantonese dictionaries as a comparison set while investigating Cantonese separability. The authors/native speakers separately classified the morphological relationships of the forms.

#### pp. 196–201, §§3.1.3–4.2

Only 62% of the Cantonese VO compounds in their study met the study’s separability criterion; 38% were inseparable. The discussion therefore rejects a simple assumption that VO-compound surface structure automatically predicts unrestricted phrasal behavior. The authors repeatedly characterize VO/non-VO separability as lexically restricted and gradient.

**Claim limit:** there is a real Cantonese VO-compound domain, but membership and internal separability are lexical/diagnostic questions. This is evidence **against** a generic runtime label whose name implies unrestricted “ProductiveVO”.

## Source 4 — Wong et al. 2022 / Wong 2023 GACS framework

**Reference**

Wong, Anita Mei-Yin, Candice Chi-Hang Cheung, Jessica Man-Wai Lo & Emily Ka-Hei Wan. 2022. “Grammatical Analysis of Cantonese Samples.” In Anita Mei-Yin Wong, *Understanding Development and Disorder in Cantonese using Language Sample Analysis*, pp. 19–64. Routledge. DOI `10.4324/9780367824013-2`.

The repo’s existing canonical source id is `SRC-WONG-2023-LANGUAGE-SAMPLE`; that identifier is retained here even though the chapter citation is 2022 and publisher/book metadata spans the 2022–2023 edition/copyright cycle.

### Exact locator and directly relevant claim

#### p. 23, §2.3 “A type-based scoring system”

GACS uses a **type-based developmental/clinical scoring system** modeled on the Index of Productive Syntax. Up to four unique exemplars of an item are scored, with four treated as a practical threshold for inferring that a child has some abstract knowledge of the item.

The framework is designed for speech-language therapists and child-language researchers analyzing conversational samples. Its items include forms, clauses, and larger structures such as SVO and serial-verb constructions.

**Claim limit:** “productive” here is a property of **child language-sample scoring / evidence of abstract knowledge**, not a linguistic claim that every observed V+O lexical pair is generated by one productive adult Cantonese construction. The scoring term must not determine parser ontology.

## Source synthesis

The sources converge on a distinction the legacy runtime label obscures:

```text
ordinary transitive syntax:       lexical V predicate + independently typed NP object
                                  (AB78 behavior domain)

verb–object compound/idiom:       lexical/morphological unit with V–O-shaped components,
                                  potentially separable under item-specific restrictions,
                                  often with unitary or non-transparent lexical semantics

GACS “productive” scoring:        developmental/clinical evidence from multiple unique exemplars;
                                  not a parser construction class
```

No reviewed source supports the current AB35 interpretation as a generic whitelist of arbitrary V+O activities under a construction named `ProductiveVO`.

## Source-scope decision

**Decision: `MIXED_LEGACY_FAMILY_REQUIRES_REHOMING`**

The evidence supports both ordinary Cantonese transitive V–NP syntax and a separate Cantonese V–O-compound domain, but it does not support combining them under one `ProductiveVO` construction.

This research task does not decide a new permanent identity. Runtime rehoming/retirement must be a separate accepted-specification task after the current fixture and runtime inventory are classified against this distinction.
