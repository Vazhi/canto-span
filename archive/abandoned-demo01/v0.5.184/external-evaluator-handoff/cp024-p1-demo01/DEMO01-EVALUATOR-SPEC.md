# DEMO01 independent prospective evaluator specification

## Role

Act as an independent prospective evaluator. Do not inspect the Canto Span runtime, visible research cases, parser output, or implementation before sealing the archive.

## Public target specification

Target: an overt Cantonese noun phrase with:

`proximal_or_distal_demonstrative + overt_classifier + overt_complete_nominal_head`

No overt numeral and no hidden material.

Out of scope and normally negative for this exact label:

- headless demonstrative+classifier;
- demonstrative+numeral+classifier+noun;
- demonstrative+啲+noun;
- numeral/classifier noun phrases without a demonstrative;
- classifier+noun without a demonstrative;
- wh-classifier phrases;
- demonstrative+noun without a classifier;
- incomplete or unknown nominal material;
- non-deictic/filler uses whose constituency is not clear.

## Create the sealed set

Create 10–14 unseen cases. Do not copy any surface from documentation or prior Canto Span packets. Include:

- at least 5 positive overt-head targets;
- both proximal and distal demonstratives;
- at least 4 different classifiers and 4 noun semantic classes;
- at least 2 headless negatives;
- at least 1 D-Num-C-N negative;
- at least 1 D-啲-N or wh-C-N negative;
- at least 1 clause-embedded positive;
- at least 1 incomplete/unknown-span negative;
- expected exact target span(s), allowed ambiguity, and forbidden label leakage for every case.

Use natural Cantonese or source-backed examples. Record source or elicitation provenance for each non-invented case. Evaluator-created minimal contrasts are evaluation cases, not natural attestations.

## Seal before implementation

Place the cases in `heldout-cases.json`. Create `commitments.json` specifying exact scoring rules and rollback conditions. Compute SHA-256 for both files and record them in `seal-manifest.json`. Zip those three files. Do not reveal the case surfaces in the conversation that performs implementation.

Return only the sealed ZIP and its SHA-256 to the project owner before implementation. Keep an independent copy.

## Later scoring

After the candidate package is frozen, open the seal once, run or manually inspect the candidate, and produce `evaluator-results.json`. Record every mismatch; do not revise expected outcomes after seeing parser output. The consumed packet may never be reused as prospective held out.
