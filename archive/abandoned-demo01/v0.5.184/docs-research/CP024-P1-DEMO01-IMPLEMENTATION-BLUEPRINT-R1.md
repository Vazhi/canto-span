# CP024-P1-DEMO01 implementation blueprint R1

Runtime baseline: **v0.5.182**  
Status: **design only; implementation forbidden until external gates close**

## Current behavior

- required exact target spans: **8/9**
- required absent: **1** — `呢隻貓。` is not assembled because the current lexicon/nominal path does not supply a compatible complete head span.
- forbidden leakage: **2/8** — headless `呢個。` and `呢本。` receive the broad `DemonstrativeClassifierNP` label.
- full-root coverage: **16/20**.

Parser success is not evidence for the construction. The baseline only identifies the smallest future code change and its regression risks.

## Required representation

1. Add or expose an internal `OvertHeadDemonstrativeClassifierNP` subtype requiring exactly:
   - overt demonstrative;
   - overt classifier;
   - overt complete nominal head.
2. Keep `DemonstrativeClassifierNP` only as a compatibility display alias if it cannot independently broaden the subtype.
3. Route headless D-C to a separate future `HeadlessDemonstrativeClassifierNP` packet with discourse/antecedent conditions.
4. Retire `DemonstrativeHeadNP`; its documented `呢個 + 蘋果` example is D-C-N because `個` is the classifier.
5. Keep D-Num-C-N, D-啲-N, C-N, Num-C-N, wh-C-N, and D-N outside the subtype.
6. Insert no hidden `一`, noun, referent, or clause role.
7. Preserve ambiguity for non-deictic or attachment-sensitive corpus strings.

## Lexicon constraint

The target must not depend on the generic `head_noun` slot alone. Every included noun and classifier must have externally defensible lexical/category provenance, but lexical coverage and grammar acceptance remain separate changes. The missing `呢隻貓` baseline is therefore not fixed by weakening the NP template.

## Evaluation design

Visible packet: 9 required, 8 forbidden, 3 unresolved.  
Prospective held-out: independently created outside the recovery tree after receiving only the public specification and exclusion contract.  
Minimum held-out commitments:

- multiple demonstratives, classifiers, and noun semantic classes;
- at least two headless D-C negatives;
- D-Num-C-N and D-啲-N boundaries;
- one unknown or incomplete nominal span that must not be wrapped;
- one clause-embedded target;
- no copied visible surface.

## Acceptance criteria

- exact target coverage on all required visible and held-out cases;
- zero target leakage into forbidden profiles;
- no hidden-token insertion;
- no regression to accepted 545-case suite;
- semantic acceptance blockers remain effective;
- rendered nesting, labels, roles, Jyutping, hover text, and fragments pass review;
- exact-family natural evidence and custody gates closed before implementation.

## Rollback criteria

Rollback if the subtype requires broad noun-class guessing, treats headless D-C as overt-head, inserts hidden material, creates clause-role semantics inside the NP, or changes unrelated classifier families.
