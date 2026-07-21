# Canto Span v0.5.183 DEMO01 Render Review

Accepted baseline: **v0.5.182**  
Candidate: **v0.5.183**  
Internal target: `OvertHeadDemonstrativeClassifierNP`  
Public compatibility label: `DemonstrativeClassifierNP`  
Separate non-target subtype: `HeadlessDemonstrativeClassifierNP`

## Review rules

Inspect every rendered block and its full diagnostics. Do not judge only by whether all characters are colored.

For positive rows, verify:

- exactly one internal `OvertHeadDemonstrativeClassifierNP` spans the complete visible D-CL-N phrase;
- the public compatibility label is `DemonstrativeClassifierNP`;
- demonstrative, classifier, and noun remain separate visible tokens;
- the noun is not hidden or reconstructed;
- the classifier has the measure-word/classifier role;
- the nominal head has its appropriate learner role;
- Jyutping and hover text are accurate;
- no clause role is invented by the NP itself.

For forbidden rows, verify that `OvertHeadDemonstrativeClassifierNP` is absent. Headless D-CL may show `HeadlessDemonstrativeClassifierNP`, but it must not contain a noun/head-noun slot or hidden antecedent.

For unresolved rows, verify that the candidate does not force the entire string into the narrow subtype. A smaller explicitly overt D-CL prefix may remain separately represented only if diagnostics do not claim an overt nominal head.

## Required positive rows

### DEMO-R01 — book classifier
```canto-span
呢本書。
```

### DEMO-R02 — distal person NP
```canto-span
嗰個人。
```

### DEMO-R03 — organization head
```canto-span
呢間公司。
```

### DEMO-R04 — document head
```canto-span
嗰份文件。
```

### DEMO-R05 — abstract head
```canto-span
呢個問題。
```

### DEMO-R06 — container/measure classifier profile
```canto-span
呢杯水。
```

### DEMO-R07 — vehicle classifier
```canto-span
嗰架車。
```

### DEMO-R08 — animal classifier and new lexical prerequisite
```canto-span
呢隻貓。
```

### DEMO-R09 — must not use `DemonstrativeHeadNP`
```canto-span
呢個蘋果。
```

## Forbidden target rows

### DEMO-F01 — headless D-CL
```canto-span
呢個。
```

### DEMO-F02 — headless D-CL with lexical classifier
```canto-span
呢本。
```

### DEMO-F03 — overt numeral subtype
```canto-span
呢兩個人。
```

### DEMO-F04 — `啲` subtype
```canto-span
呢啲書。
```

### DEMO-F05 — no demonstrative
```canto-span
一個人。
```

### DEMO-F06 — bare classifier+noun
```canto-span
個人。
```

### DEMO-F07 — wh-classifier phrase
```canto-span
邊個人？
```

### DEMO-F08 — no overt classifier
```canto-span
呢人。
```

## Unresolved attachment rows

These must remain outside the complete narrow target pending separate nominal analysis.

### DEMO-U01
```canto-span
呢間好大嘅公司。
```

### DEMO-U02
```canto-span
中國移動嗰個業績。
```

### DEMO-U03
```canto-span
嗰個少數族裔嘅福利同埋權利。
```

## Return files

Export and return both diagnostics for this note:

1. the acceptance-summary JSON;
2. the full-diagnostics JSON.

Also return a brief statement identifying any row with incorrect span, nesting, role, Jyutping, hover wording, missing character coverage, or misleading learner presentation. If every row renders correctly, state that all 20 rows were visually reviewed and no defect was found.

Do not open or inspect the sealed held-out ZIP.
