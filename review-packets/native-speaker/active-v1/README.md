# Active native-speaker review packet v1

This directory is the canonical Phase 7 review packet for the two active construction re-audits.

## Files

- `form-specs.json` — canonical stimuli, display order, audience, privacy, and form state.
- `active-review-state.json` — source-checking links and counted/pending speaker state.
- `Code.gs` — generated Google Apps Script; do not hand-edit.
- `SOCIAL-MEDIA-POST.md` — public recruitment copy with URL placeholders.
- `RESPONSE-INGESTION.md` — export and normalization procedure.

## Create the forms

1. Open a new Apps Script project.
2. Replace `Code.gs` with this directory's generated `Code.gs`.
3. Run one of:
   - `createPublicSpeakerBForms` — both public Speaker B forms;
   - `createPrivateSpeakerAForm` — the private `ResourceUseLaiFunctionRelation` Speaker A form;
   - `createAllActiveNativeReviewForms` — all three forms.
4. Authorize the script.
5. Copy the edit URL, public URL, and linked response-spreadsheet URL from the execution log.

Running a creation function twice creates duplicate forms. The script deliberately does not collect names or email addresses. Public forms use a self-chosen reviewer code because requiring Google sign-in would reduce accessibility and would still not by itself prove independent-speaker eligibility.

## Evidence rule

A submitted response is not automatically evidence. Export the linked sheet as CSV and normalize it with `tools/import-native-review-csv.js`. Only responses that pass the recorded native-language, independence, completeness, consent, and duplicate-screening checks may be adjudicated into a result record. Construction-note speaker counts remain unchanged until that adjudication is committed.
