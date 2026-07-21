# CP021B Proposition Extraction Freeze

- Date: 2026-07-17
- Lifecycle event: `PROPOSITION_EXTRACTION_FREEZE_WITH_ACCESS_BOUNDARIES`
- Scope: research evidence only
- Project language claim: none
- Runtime authorization: none

## Frozen question

In independently documented or naturally attested modern Hong Kong Cantonese clauses containing `畀` or `俾`, what form–meaning patterns occur when two or more overt participants are present, and what evidence bears on their linear order, predicate dependence, participant interpretation, optionality, ambiguity, and discourse completeness?

## Frozen artifacts

- `CP021B-PROPOSITION-EXTRACTION.tsv`: 79 atomic, source-attributed proposition records.
- `CP021B-EXTRACTION-STATUS.tsv`: one extraction or non-extraction disposition for each of the 32 frozen source-screen rows.
- `SOURCE-SCREENING-LOG-CP021B.tsv`: corrected provenance for SCREEN-CP021B-014.

Each proposition record preserves its source locator, surface example or data basis, variety/register/period, evidence direction, directness, independence scope, limitations, and verification state. Source terminology is not silently translated into a Canto Span construction inventory.

## Evidence contour, not synthesis

The frozen ledger contains:

- 20 propositions that support an observed pattern;
- 39 scope restrictions;
- 10 competing analyses;
- 6 attestation-only records;
- 3 historical or variety boundaries; and
- 1 explicitly nonresponsive/non-target record.

These categories describe what the sources say. They are not votes, and their counts are not evidence weights. Overlapping datasets and author families are marked so they cannot be counted as independent replication.

The source record now makes several disagreements explicit for later synthesis: lexical versus productive order constraints; double-object, prepositional, serial-verb, constructional, and grammaticalization analyses; categorical versus graded heavy-theme judgments; and transfer/beneficiary versus causative/passive functions sharing `畀/俾` forms.

## Correction record

SCREEN-CP021B-014 previously misidentified the author team and used DOI `10.1177/1367006910371025`, which belongs to an unrelated article. The corrected source is Wing Shan Angel Chan, *The Cantonese Double Object Construction with bei2 'give' in Bilingual Children: The Role of Input*, DOI `10.1177/1367006909356653`. Its extraction is now limited to propositions visible in the official abstract; no adult distribution table is claimed.

## Access and evidence boundaries

- SCREEN-CP021B-002 is frozen with a chapter-level locator boundary because the current PDF path did not yield reliable page-level text extraction. Its four propositions cannot be sole support until exact example pages are recovered.
- SCREEN-CP021B-005, 014, and 015 are abstract-bounded.
- SCREEN-CP021B-011 is linked to the accessible dissertation evidence family and adds no independent proposition in this checkpoint.
- SCREEN-CP021B-017 preserves the full parser-independent lexical candidate inventory, but lexical hits are not grammatical analyses. Fresh utterance-level review requires recovery of the source utterance records.
- Five access-limited screens have no proposition extraction; seven screens are excluded by their frozen decisions; one discovery lead contributes no independent proposition.

These boundaries are terminally recorded rather than filled by inference. They do not block freezing the extraction event, but they constrain later synthesis.

## Integrity anchors

- Source-screen log SHA-256 at CP021B-EX freeze: `3a3e1749b144b20d3270a4284a92bf3ca7713d35721d260a0e58ef63a8c6b6b4`
- CP021B-SY correction notice: SCREEN-CP021B-007's Wong DOI punctuation was corrected; the current source-screen log hash is `3705887061d8567f360ecfcb9d39e0a1d426ac17c02104b37537ca3c23172e29`.
- Proposition ledger SHA-256: `c11c90fc2434aaecd0ba2604f815142fc8830d2af841e4330b00b63f6e17dc38`
- Extraction-status ledger SHA-256: `2d24839e8f5a351e8c5f8340f120f6a79be60b59007ccf521bb386c25b9dd601`
- Runtime `main.js` SHA-256: `05e441cb4c90fe7835c2c2ea976f00f8d33691da88d880ee79ef94d13f4b5821`
- Runtime `manifest.json` SHA-256: `6164e0b3ee6f20ebad8aaf1e32d52f577ab795400f1172223e738536e9377e1e`

## Freeze decision

`CP021B-EX` is frozen as a complete disposition ledger with explicit access boundaries. No Canto Span language claim, claim-source edge, evaluation fixture, parser design, or runtime behavior has been created.

## Next event

After user confirmation, begin `CP021B-SY` source-derived synthesis. Reconcile propositions without suppressing contradictions; draft the narrowest claim set the evidence can support, or an explicit no-claim result. Do not begin evaluation or implementation in the same event.
