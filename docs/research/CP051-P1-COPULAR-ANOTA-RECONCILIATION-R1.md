# CP051-P1 — Copular A-not-A source/runtime reconciliation R1

Date: 2026-07-22
Release: v0.5.208
Target: `CopularANotAQuestion`
Status change: none

## Why this label was selected

`CopularANotAQuestion` was one of the remaining implementation-only labels and
is learner-facing because overt `係唔係` is a transparent polar-question form.
The old public note described only a vague possible construction, while the
runtime accepted nominal and possessive complements and admitted some predicate
complements without stating or testing the distinction. It also lacked an
executable boundary separating clause-internal questions from terminal tags.

## Checked evidence

The source-verification table is
`CP051-P1-COPULAR-ANOTA-SOURCE-VERIFICATION-R1.tsv`.

- Law (2001), examples (60) and (63), gives full overt `係唔係` before an
  overt clause or predicate complement. The executable written-Cantonese forms
  normalize Law's romanized examples; they are not independent corpus hits.
- Wong (2023), printed pp. 54-55, explicitly separates copula questions, where
  `係唔係` or contracted `係咪` precedes the main predicate, from terminal tag
  questions such as `你唔去喇，係唔係呀？`.
- Li (2017) records the analytical dispute and tag evidence. Its three-film
  sample does not provide a positive ordinary `係唔係` token and is not used as
  evidence that the form is absent or rare.
- Yip (1988) supports the separate negation-family boundary between ordinary
  `唔` and suppletive `有／冇`; it does not define this node's complement scope.

## Runtime defect and correction

Before v0.5.208, the fallback recognized the overt full form but did not
explicitly classify its complement. Some nested constructions passed through,
while a checked modal-predicate example failed and the documentation still
centered an unverified possessive probe. The runtime therefore described a
cleaner and narrower analysis than it actually implemented.

v0.5.208 makes the complement decision explicit:

1. preserve overt positive and negative copular arms in `係唔係`;
2. accept a typed predicate or clause complement;
3. retain a bounded nominal or possessive complement profile without treating
   that implementation probe as independent linguistic evidence;
4. reject the no-complement terminal tag profile from this node;
5. leave contracted `係咪` on the existing `PolarQuestionFrame` path rather
   than silently merging two internal representations.

Broad NP wrappers such as `ModifiedNP` are not accepted merely because they
inherit generic predicate slots. This prevents accidental complement licensing
through unrelated wrapper metadata.

## Executable evidence

Canonical packet:
`review-packets/cp051-p1-copular-anota-r1/focused-evaluation-packet.json`

| Case | Surface | Assertion | Evidence role |
|---|---|---|---|
| `COPA-E01` | `你係唔係識講德文咋？` | `CopularANotAQuestion` present | source-attested predicate complement |
| `COPA-E02` | `係唔係每個學生都鍾意睇電視呀？` | `CopularANotAQuestion` present | source-attested clause complement |
| `COPA-N01` | `你唔去喇，係唔係呀？` | `CopularANotAQuestion` absent | published terminal-tag boundary |

The historical `係唔係你嘅？` case remains a zero-weight implementation probe.
The three new cases use the existing standardized construction-test framework.

## Status decision

The label remains `unsupported_generalization`.

The checkpoint reconciles a narrow full-form profile and one tag boundary. It
does not provide checked source support for every nominal or possessive
complement, settle the competing syntactic analyses, unify contracted `係咪`,
cover every predicate class, or provide role-neutral panel judgments.
Implementation validation and linguistic confidence remain separate.

## Known remaining boundaries

- The exact relationship between full `係唔係` and contracted `係咪` remains an
  ontology question; no label merge is made here.
- Nominal and possessive complements need direct pattern-specific evidence.
- Some lexical predicate shapes, including preference material that is first
  wrapped as an NP modifier, still require structural review.
- Terminal tags remain outside this node; no separate tag construction is
  added by this checkpoint.
- Particle, discourse, regional, and panel boundaries remain incomplete.

## Result

- two checked positive profiles and one checked tag boundary made executable;
- the complement decision made explicit and broad wrapper leakage narrowed;
- no label added or retired;
- no linguistic status promoted;
- PFV and RUL survey work unchanged.
