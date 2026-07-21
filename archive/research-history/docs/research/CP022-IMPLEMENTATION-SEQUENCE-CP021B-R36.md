# CP022 controlled remediation sequence (CP021B-R36)

Date: 2026-07-19  
Status: **design frozen; implementation not authorized**

## Non-negotiable entry rule

No work package may change parser behavior until its evaluation packet is populated and frozen. Where the packet manifest requires prospective held-out evaluation, examples must be selected, hashed, and hidden from implementation before code changes begin.

## Work packages

### 1. `CP022-I1A_INTERNAL_WRAPPER_CLEANUP`

Rename, merge, retire, or keep internal-only wrappers and diagnostics without intended semantic change.

- Labels currently assigned: **24**
- Families touched: **9**

### 2. `CP022-I1B_TRANSPARENT_WRAPPER_CLEANUP`

Remove duplicate compositional nodes while preserving children, roles, spans, provenance, and compatibility aliases.

- Labels currently assigned: **27**
- Families touched: **14**

### 3. `CP022-I2A_PARTICLE_QUESTION_NEGATION_NARROWING`

Apply high-confidence lexical, marker, question, negation, directive, and formula boundaries.

- Labels currently assigned: **26**
- Families touched: **13**

### 4. `CP022-I2B_NOMINAL_MEASURE_AND_SCALAR_BOUNDARIES`

Realign classifier, quantity, nominal modification, possession, ordinal, manner, and scalar structures.

- Labels currently assigned: **23**
- Families touched: **10**

### 5. `CP022-I3_LOCATIVE_MOTION_SERIAL_RELATIONS`

Separate locative, source, path, goal, direction, deixis, purpose serial, and environmental frames.

- Labels currently assigned: **21**
- Families touched: **8**

### 6. `CP022-I4_ASPECT_RESULT_AND_CLAUSE_RELATIONS`

Separate aspect from completion/result/change and type temporal/conditional relations.

- Labels currently assigned: **22**
- Families touched: **7**

### 7. `CP022-I5_VALENCY_COMPLEMENTS_STANCE_ARCHITECTURE`

Rebuild valency, complement types, modality, stative predication, fragments, cognition, and speech architecture last.

- Labels currently assigned: **26**
- Families touched: **13**

### 8. `HOLD_RESEARCH_OR_EXACT_EVIDENCE_GAP`

Do not implement until exact source gaps or unresolved competing analyses are closed.

- Labels currently assigned: **13**
- Families touched: **10**

## Review separation

1. **Native naturalness:** one checkbox, “Sounds unnatural,” plus optional correction.  
2. **Structural analysis:** evaluated against the source-linked target relation and explicit forbidden analyses.  
3. **Parser behavior:** automated and rendered diagnostics.  

None of these judgments substitutes for another.

## LX1 boundary

The inherited LX1 lexicon/Jyutping candidate remains render-pending and unaccepted. It must not be silently accepted through a grammar implementation checkpoint.
