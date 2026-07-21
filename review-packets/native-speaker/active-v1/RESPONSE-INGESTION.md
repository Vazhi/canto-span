# Response ingestion

## Export

Each generated form has a linked Google Sheets response file. In the sheet, use **File → Download → Comma-separated values (.csv)** for the response tab.

Do not edit question headers before export. The importer maps exact generated headers back to internal item IDs while keeping those IDs hidden from respondents.

## Normalize

```bash
node tools/import-native-review-csv.js \
  --form PFV01-SPEAKER-B-PUBLIC-R1 \
  --csv "$HOME/Downloads/Form responses 1.csv" \
  --out /tmp/pfv01-speaker-b-normalized
```

For the other forms, use `RUL01-SPEAKER-A-PRIVATE-R1` or `RUL01-SPEAKER-B-PUBLIC-R1`.

The output contains:

- `responses.json` — full normalized judgments and eligibility checks;
- `responses.tsv` — one row per respondent and sentence;
- `summary.json` — counts only.

## Adjudication

Normalization does not alter construction notes or count speakers. Before a response can satisfy an independent-speaker requirement:

1. native-Cantonese screening must pass;
2. every judgment item must be answered;
3. the independence declaration must be confirmed;
4. public-use consent must be confirmed for public forms;
5. reviewer codes and response patterns must be screened for likely duplicate submissions;
6. corrections/context must be manually reviewed;
7. a result record must be committed and linked from `active-review-state.json` and the construction note.


## Pilot-panel exception handling

A protocol exception must be explicit, construction-specific, and committed. It must record both:

- total retained panel responses; and
- the smaller `promotion_eligible_independent_speaker_count`.

The RUL01 public R1 snapshot retains 23 responses as panel evidence and sets the promotion-eligible count to 0. Do not overwrite that snapshot when more live responses arrive; create a new dated snapshot and record the changed cutoff.
