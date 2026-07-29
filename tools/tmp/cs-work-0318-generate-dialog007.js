const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const sourceId = 'GLOSSIKA-YUEHK-A1-DLG-007-20260111';
const root = `data/pedagogical-corpus/glossika/${sourceId}`;
const metaPath = 'tools/tmp/cs-work-0318-dialog007-meta.json';
const turnParts = Array.from({ length: 3 }, (_, i) => `tools/tmp/cs-work-0318-dialog007-turns.part${String(i).padStart(2, '0')}.tsv`);
const vocabParts = Array.from({ length: 2 }, (_, i) => `tools/tmp/cs-work-0318-dialog007-vocab.part${String(i).padStart(2, '0')}.tsv`);
const seedPaths = [metaPath, ...turnParts, ...vocabParts];

function stable(value) {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}
function sha(text) { return crypto.createHash('sha256').update(text, 'utf8').digest('hex'); }
function countBy(values) { return Object.fromEntries([...values.reduce((map, value) => map.set(value, (map.get(value) || 0) + 1), new Map())].sort(([a], [b]) => a.localeCompare(b))); }
function normalize(text) { return String(text || '').normalize('NFC').replace(/[\p{P}\p{S}\p{Z}\s]/gu, ''); }
function tsv(value) { return String(value ?? '').replace(/\t/g, ' ').replace(/\r?\n/g, ' '); }
function readRows(files, expectedColumns) {
  return files.flatMap((file) => fs.readFileSync(file, 'utf8').trimEnd().split(/\r?\n/).filter(Boolean).map((line) => {
    const cells = line.split('\t');
    if (cells.length !== expectedColumns) throw new Error(`${file}: expected ${expectedColumns} columns, found ${cells.length}`);
    return cells;
  }));
}
function listTextFiles(prefixes, excludedPrefixes = []) {
  const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' }).split('\0').filter(Boolean);
  const files = [];
  for (const file of tracked) {
    if (file === 'main.js' || !prefixes.some((prefix) => file.startsWith(prefix)) || excludedPrefixes.some((prefix) => file.startsWith(prefix))) continue;
    let stat;
    try { stat = fs.statSync(file); } catch { continue; }
    if (!stat.isFile() || stat.size > 5_000_000) continue;
    let text;
    try { text = fs.readFileSync(file, 'utf8'); } catch { continue; }
    files.push({ path: file, text, normalized: normalize(text) });
  }
  return files.sort((a, b) => a.path.localeCompare(b.path));
}
const exactPaths = (surface, files) => files.filter((entry) => entry.text.includes(surface)).map((entry) => entry.path);
const normalizedPaths = (surface, files) => {
  const folded = normalize(surface);
  if (folded.length < 2) return [];
  return files.filter((entry) => !entry.text.includes(surface) && entry.normalized.includes(folded)).map((entry) => entry.path);
};

if (!seedPaths.every((file) => fs.existsSync(file))) {
  if (!fs.existsSync(`${root}/source.json`)) throw new Error('Neither complete source seeds nor generated package exists');
  console.log('Generated package already exists; validation-only run.');
  process.exit(0);
}

const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
const turnRows = readRows(turnParts, 4);
const vocabRows = readRows(vocabParts, 4);
if (turnRows.length !== 40 || vocabRows.length !== 40) throw new Error(`Expected 40 turns and 40 vocabulary entries, found ${turnRows.length}/${vocabRows.length}`);

const turnRecords = turnRows.map(([turnText, speaker, sourceLine, jyutpingLine], index) => {
  const turn = Number(turnText);
  const expected = index + 1;
  const expectedSpeaker = expected % 2 === 1 ? '李明' : '張莉';
  const prefix = `${speaker}: `;
  if (turn !== expected || speaker !== expectedSpeaker) throw new Error(`Turn sequence or speaker mismatch at ${expected}`);
  if (!sourceLine.startsWith(prefix)) throw new Error(`Source line prefix mismatch at turn ${expected}`);
  if (!jyutpingLine.startsWith('/') || !jyutpingLine.endsWith('/')) throw new Error(`Jyutping delimiters missing at turn ${expected}`);
  const unexpectedUppercase = jyutpingLine.replace(/OK/g, '').replace(/\bA\b/g, '');
  if (/[A-Z]/.test(unexpectedUppercase)) throw new Error(`Unexpected uppercase source token at turn ${expected}`);
  return {
    itemType: 'dialog_turn',
    turn,
    speaker,
    source: {
      sourceLine,
      traditional: sourceLine.slice(prefix.length),
      jyutpingLine,
      english: null
    }
  };
});
const dialogText = turnRecords.map((record) => record.source.traditional).join('\n');
const vocabularyRecords = vocabRows.map(([ordinalText, traditional, jyutping, english], index) => {
  const vocabularyOrdinal = Number(ordinalText);
  if (vocabularyOrdinal !== index + 1) throw new Error(`Vocabulary order mismatch at ${index + 1}`);
  return {
    itemType: 'lexical_entry',
    vocabularyOrdinal,
    source: { traditional, jyutping, english },
    sourceDialogOccurrence: {
      exactSurfacePresent: dialogText.includes(traditional),
      normalizedSurfacePresent: normalize(dialogText).includes(normalize(traditional))
    }
  };
});
const records = [...turnRecords, ...vocabularyRecords];
if (records.length !== 80) throw new Error(`Expected 80 records, found ${records.length}`);
const payloadHash = `sha256:${sha(stable(records.map((record) => record.source)))}`;
const items = records.map((record, index) => ({
  id: `${sourceId}-I${String(index + 1).padStart(3, '0')}`,
  ordinal: index + 1,
  itemType: record.itemType,
  ...(record.turn ? { turn: record.turn, speaker: record.speaker } : {}),
  ...(record.vocabularyOrdinal ? { vocabularyOrdinal: record.vocabularyOrdinal, sourceDialogOccurrence: record.sourceDialogOccurrence } : {}),
  source: record.source,
  sourceHash: `sha256:${sha(stable(record.source))}`
}));

const tokenPairs = require('../../src/runtime-resources/lexicon/token-lexicon');
const tokenMap = new Map(tokenPairs);
const tokenRoot = 'src/runtime-resources/lexicon/token-lexicon';
const tokenFiles = fs.readdirSync(tokenRoot).filter((file) => file.endsWith('.js')).map((file) => path.join(tokenRoot, file)).sort();
const tokenText = Object.fromEntries(tokenFiles.map((file) => [file, fs.readFileSync(file, 'utf8')]));
const canonicalFiles = listTextFiles(['src/', 'src/runtime-resources/'], [root + '/', 'tools/tmp/cs-work-0318-', '.github/workflows/cs-work-0318-']);
const supportingFiles = listTextFiles(['tests/', 'test-data/', 'data/', 'docs/', 'grammar/', 'config/'], [root + '/', 'tools/tmp/cs-work-0318-', '.github/workflows/cs-work-0318-']);
if ([...canonicalFiles, ...supportingFiles].some((entry) => entry.path === 'main.js')) throw new Error('Generated main.js leaked into ownership scan');

const naturalnessTurns = new Set([2,3,4,5,6,7,9,10,11,12,13,14,15,17,18,21,22,24,25,26,27,28,29,30,31,32,35,36,37,38,39]);
const constructionRoutes = {
  1: ['vocative_greeting'],
  2: ['greeting_status_question'],
  3: ['degree_evaluation', 'ne1_continuation'],
  4: ['english_ok_predicate', 'sentence_final_laa1'],
  5: ['current_weekend_frame', 'jau5_mou5_availability_question'],
  6: ['dang2_ngo5_deliberative', 'verb_reduplication', 'wh_day_fragment'],
  7: ['disjunction_waak6ze2', 'dou1_dak1_free_choice'],
  8: ['jiu3_work_obligation'],
  9: ['dak1_m4_dak1_polar_question'],
  10: ['epistemic_jing1goi1', 'mou5_man6tai4_formula'],
  11: ['exclamative_taai3', 'motion_goal_wh'],
  12: ['motion_goal_wh_fragment'],
  13: ['proposal_hou2_m4_hou2', 'motion_activity_chain'],
  14: ['echo_question', 'locative_path_question'],
  15: ['motion_goal', 'demonstrative_locative', 'quantity_predication'],
  16: ['desire_purchase'],
  17: ['completion_jyun4', 'event_sequence'],
  18: ['deliberative_wh_hou2'],
  19: ['preference_wh'],
  21: ['topic_evaluation', 'additive_dou1'],
  22: ['locative_existential', 'classifier_gaan1', 'attributive_ge3'],
  23: ['hai6_mai6_degree_question'],
  24: ['degree_negation_m4hai6hou2', 'dou1_ok_evaluation'],
  25: ['meeting_time_question'],
  26: ['time_dak1_m4_dak1'],
  27: ['comparative_di1', 'time_evaluation'],
  28: ['time_echo_fragment', 'ok_acceptance'],
  29: ['locative_wh_waiting'],
  30: ['locative_phrase', 'station_exit_endpoint', 'sentence_final_laa1'],
  31: ['classifier_wh_fragment'],
  32: ['latin_letter_exit_label', 'sik1_m4_sik1_question'],
  33: ['habitual_seng4jat6'],
  34: ['meeting_formula'],
  35: ['conditional_jyu4gwo2', 'dim2_syun3_contingency'],
  36: ['conditional_topic_dou1', 'zau6_dak1_sufficiency'],
  37: ['alternative_activity_dou1_dak1'],
  38: ['dou1_dak1_acceptance', 'future_time_decision'],
  39: ['agreement_formula_gam2_zau6_gam2_waa6'],
  40: ['leave_taking_formula']
};
const lexicalFlags = {
  '呀': ['sentence_particle_gloss_review'],
  '你呢': ['continuation_formula_review'],
  'OK': ['source_romanization_asymmetry_dialog_token_vs_gloss'],
  '啦': ['sentence_particle_gloss_review'],
  '今個': ['demonstrative_classifier_phrase_review'],
  '有冇': ['a_not_a_existential_review'],
  '等我': ['deliberative_or_wait_polysemy_review'],
  '諗諗': ['verb_reduplication_review'],
  '個': ['general_classifier_gloss_review'],
  '呢': ['question_particle_gloss_review'],
  '都': ['polyfunction_gloss_review'],
  '幾': ['degree_wh_polysemy_review'],
  '有': ['existential_possession_polysemy_review'],
  '冇': ['negative_existential_review'],
  '等': ['wait_let_polysemy_review'],
  '劃': ['source_gloss_script_mismatch_review'],
  '間': ['classifier_lexeme_polysemy_review']
};

const reviewRecords = [];
const crosswalkItems = [];
for (const item of items) {
  const surface = item.source.traditional;
  const canonicalExact = exactPaths(surface, canonicalFiles);
  const canonicalNormalized = normalizedPaths(surface, canonicalFiles);
  const supportingExact = exactPaths(surface, supportingFiles);
  const supportingNormalized = normalizedPaths(surface, supportingFiles);
  const allExact = [...new Set([...canonicalExact, ...supportingExact])].sort();
  const allNormalized = [...new Set([...canonicalNormalized, ...supportingNormalized])].sort();
  const deduplicationRelation = allExact.length ? 'exact_duplicate_candidate' : allNormalized.length ? 'normalized_duplicate_candidate' : 'no_project_match';
  const runtimeEntry = item.itemType === 'lexical_entry' ? (tokenMap.get(surface) || null) : null;
  const runtimeOwners = item.itemType === 'lexical_entry' ? tokenFiles.filter((file) => tokenText[file].includes(JSON.stringify(surface))) : [];
  const reviewFlags = [];
  if (item.itemType === 'dialog_turn' && naturalnessTurns.has(item.turn)) reviewFlags.push('naturalness_review_candidate');
  for (const route of constructionRoutes[item.turn] || []) reviewFlags.push(route);
  for (const flag of lexicalFlags[surface] || []) reviewFlags.push(flag);
  if (item.itemType === 'lexical_entry' && !item.sourceDialogOccurrence.exactSurfacePresent) reviewFlags.push('vocabulary_surface_absent_from_dialog');
  if (item.itemType === 'dialog_turn') reviewFlags.push('source_turn_translation_not_provided');
  let ingressClassification;
  if (item.itemType === 'dialog_turn' && naturalnessTurns.has(item.turn)) ingressClassification = 'naturalness_review_candidate';
  else if (item.itemType === 'lexical_entry' && runtimeEntry) ingressClassification = 'lexical_only_attestation';
  else if (deduplicationRelation === 'exact_duplicate_candidate') ingressClassification = 'exact_duplicate';
  else if (deduplicationRelation === 'normalized_duplicate_candidate') ingressClassification = 'normalized_duplicate';
  else ingressClassification = 'new_attestation';
  const previousTurnId = item.itemType === 'dialog_turn' && item.turn > 1 ? `${sourceId}-I${String(item.turn - 1).padStart(3, '0')}` : null;
  const nextTurnId = item.itemType === 'dialog_turn' && item.turn < 40 ? `${sourceId}-I${String(item.turn + 1).padStart(3, '0')}` : null;
  reviewRecords.push({
    id: item.id,
    sourceHash: item.sourceHash,
    normalizedCantonese: normalize(surface),
    deduplicationRelation,
    ingressClassification,
    reviewFlags,
    reviewedValues: {},
    reviewerNote: '',
    evidenceUse: 'not_authorized'
  });
  crosswalkItems.push({
    sourceItemId: item.id,
    ordinal: item.ordinal,
    itemType: item.itemType,
    sourceDisplay: surface,
    sourceHash: item.sourceHash,
    sourceDialogOccurrence: item.sourceDialogOccurrence || null,
    adjacency: item.itemType === 'dialog_turn' ? {
      previousTurnId,
      nextTurnId,
      previousSpeaker: item.turn > 1 ? turnRecords[item.turn - 2].speaker : null,
      nextSpeaker: item.turn < 40 ? turnRecords[item.turn].speaker : null
    } : null,
    deduplicationRelation,
    ingressClassification,
    canonicalExactOwners: canonicalExact,
    canonicalNormalizedOwners: canonicalNormalized,
    supportingExactOwners: supportingExact,
    supportingNormalizedOwners: supportingNormalized,
    runtimeLexicalOwner: item.itemType === 'lexical_entry' ? { entry: runtimeEntry, owners: runtimeOwners } : null,
    reviewFlags,
    constructionRouting: (constructionRoutes[item.turn] || []).map((cluster) => ({ parentIssue: 130, cluster, status: 'research_route_only' }))
  });
}

const classificationCounts = countBy(reviewRecords.map((record) => record.ingressClassification));
const relationCounts = countBy(reviewRecords.map((record) => record.deduplicationRelation));
const absentVocabulary = items.filter((item) => item.itemType === 'lexical_entry' && !item.sourceDialogOccurrence.exactSurfacePresent).map((item) => ({ id: item.id, traditional: item.source.traditional, jyutping: item.source.jyutping }));
const source = {
  schema: 'canto-span-pedagogical-dialog-source-v1',
  source: {
    sourceId: meta.sourceId,
    provider: meta.provider,
    course: meta.course,
    dialogNumber: meta.dialogNumber,
    title: meta.title,
    englishTitle: meta.englishTitle,
    sourceDate: meta.sourceDate,
    gmailMessageId: meta.gmailMessageId,
    sourceType: meta.sourceType,
    language: meta.language,
    sourceFormat: meta.sourceFormat,
    authorization: meta.authorization
  },
  ingress: {
    ...meta.ingress,
    recordCount: items.length,
    turnCount: turnRecords.length,
    vocabularyCount: vocabularyRecords.length,
    vocabularyExactSurfaceAbsentFromDialogCount: absentVocabulary.length,
    itemTypeCounts: countBy(items.map((item) => item.itemType)),
    sourcePayloadHash: payloadHash,
    sourcePayloadHashPolicy: 'SHA-256 of canonical key-sorted JSON for the ordered source-field array.',
    turnEnglishPolicy: 'The source email provides no per-turn English translation; each turn preserves english=null.'
  },
  items
};
const crosswalk = {
  schema: 'canto-span-pedagogical-dialog-crosswalk-v1',
  sourceId,
  sourcePayloadHash: payloadHash,
  architecture: {
    canonicalRuntimeInputs: ['src/**', 'src/runtime-resources/**'],
    generatedExcluded: ['main.js'],
    supportingRecords: ['tests/**', 'test-data/**', 'data/**', 'docs/**', 'grammar/**', 'config/**']
  },
  summary: { recordCount: 80, turnCount: 40, vocabularyCount: 40, vocabularyExactSurfaceAbsentFromDialogCount: absentVocabulary.length, classificationCounts, relationCounts },
  sourceBlockAudit: { absentVocabulary },
  items: crosswalkItems
};
const review = {
  schema: 'canto-span-pedagogical-dialog-review-v1',
  sourceId,
  sourcePayloadHash: payloadHash,
  policy: {
    sourceLayer: 'source.json is immutable.',
    translationBoundary: 'Missing per-turn translations are preserved and must not be generated during ingress.',
    formatBoundary: 'Source romanization without speaker prefixes is preserved, including source-authored Latin-script tokens such as OK and A.',
    sourceBlockBoundary: 'Vocabulary is an independent ordered source block; entries absent from the dialog remain source records and are flagged.',
    sourceGlossBoundary: 'Bracketed particle and classifier glosses are source pedagogical metadata, not Canto Span analysis.',
    deduplicationBoundary: 'Exact and normalized repository matches are candidates until reviewed.',
    evidenceBoundary: 'Dialog adjacency and pedagogical attestation do not establish productivity, construction identity, particle analysis, or parser behavior.'
  },
  summary: {
    recordCount: 80,
    reviewedCount: 0,
    unreviewedCount: 80,
    classificationCounts,
    relationCounts,
    vocabularyExactSurfaceAbsentFromDialogCount: absentVocabulary.length,
    knownSourceAlerts: [
      { scope: 'all_dialog_turns', type: 'missing_turn_english_translation', status: 'source_omission_preserved', note: 'The email supplies Cantonese and source romanization but no per-turn English translations.' },
      { scope: 'romanization_format', type: 'source_authored_latin_tokens', status: 'source_preserved', note: 'Romanization lines omit speaker-name prefixes and preserve Latin-script tokens such as OK and the exit label A.' },
      { scope: 'vocabulary_block', type: 'vocabulary_dialog_surface_mismatch', status: 'source_preserved_review_required', note: `${absentVocabulary.length} vocabulary surfaces do not occur exactly in the dialog and remain separate source records.` },
      { scope: `${sourceId}-I004,${sourceId}-I024,${sourceId}-I028,${sourceId}-I039,${sourceId}-I049`, type: 'romanization_asymmetry', status: 'requires_pronunciation_review', note: 'Dialog romanization preserves OK as Latin script while the vocabulary block gives ou1 kei1; neither source value is corrected during ingress.' },
      { scope: 'vocabulary_glosses', type: 'source_function_glosses', status: 'not_evidence', note: 'Glosses such as [sentence particle], [general classifier], and this (classifier phrase) remain source metadata.' },
      { scope: `${sourceId}-I005,${sourceId}-I006,${sourceId}-I007,${sourceId}-I008,${sourceId}-I009,${sourceId}-I010`, type: 'availability_day_choice_review', status: 'route_to_parent_130', note: 'Availability questions, deliberative reduplication, day fragments, disjunction, 都得, work obligation, polar choice, and epistemic response require separate review.' },
      { scope: `${sourceId}-I011,${sourceId}-I012,${sourceId}-I013,${sourceId}-I014,${sourceId}-I015,${sourceId}-I017`, type: 'motion_activity_sequence_review', status: 'route_to_parent_130', note: 'Motion goals, proposal questions, echo paths, locative quantity, completion, and event sequencing remain contextual attestations.' },
      { scope: `${sourceId}-I018,${sourceId}-I021,${sourceId}-I022,${sourceId}-I023,${sourceId}-I024`, type: 'food_evaluation_existential_review', status: 'route_to_parent_130', note: 'Deliberative wh questions, topic evaluation, locative existential structure, classifier choice, biased questions, and degree negation require bounded analysis.' },
      { scope: `${sourceId}-I025,${sourceId}-I026,${sourceId}-I027,${sourceId}-I028,${sourceId}-I029,${sourceId}-I030,${sourceId}-I031,${sourceId}-I032`, type: 'meeting_time_place_review', status: 'route_to_parent_130', note: 'Meeting-time questions, 得唔得, comparative 啲, echo fragments, locative waiting, endpoint phrases, classifier wh, Latin exit labels, and 識唔識 remain contextual attestations.' },
      { scope: `${sourceId}-I035,${sourceId}-I036,${sourceId}-I037,${sourceId}-I038,${sourceId}-I039`, type: 'contingency_alternative_agreement_review', status: 'route_to_parent_130', note: '如果 contingencies, 都 scope, 就得 sufficiency, alternative activities, deferred decisions, and 咁就咁話 require separate research.' }
    ]
  },
  records: reviewRecords
};

fs.mkdirSync(root, { recursive: true });
fs.mkdirSync('docs/research', { recursive: true });
fs.writeFileSync(`${root}/source.json`, JSON.stringify(source, null, 2) + '\n');
fs.writeFileSync(`${root}/crosswalk.json`, JSON.stringify(crosswalk, null, 2) + '\n');
fs.writeFileSync(`${root}/review.json`, JSON.stringify(review, null, 2) + '\n');

const header = ['id','ordinal','item_type','turn','speaker','vocabulary_ordinal','source_cantonese','source_jyutping','source_english','source_hash','source_dialog_exact_surface_present','previous_turn_id','next_turn_id','deduplication_relation','ingress_classification','runtime_lexical_owners','canonical_exact_owners','supporting_exact_owners','review_flags','review_state'];
const rows = items.map((item, index) => {
  const record = reviewRecords[index];
  const walk = crosswalkItems[index];
  const sourceJyutping = item.source.jyutpingLine || item.source.jyutping || '';
  const sourceEnglish = item.source.english === null ? '' : item.source.english || '';
  return [item.id,item.ordinal,item.itemType,item.turn||'',item.speaker||'',item.vocabularyOrdinal||'',item.source.traditional,sourceJyutping,sourceEnglish,item.sourceHash,item.sourceDialogOccurrence?String(item.sourceDialogOccurrence.exactSurfacePresent):'',walk.adjacency?.previousTurnId||'',walk.adjacency?.nextTurnId||'',record.deduplicationRelation,record.ingressClassification,(walk.runtimeLexicalOwner?.owners||[]).join('|'),walk.canonicalExactOwners.join('|'),walk.supportingExactOwners.join('|'),record.reviewFlags.join('|'),meta.ingress.reviewState].map(tsv).join('\t');
});
fs.writeFileSync(`${root}/items.tsv`, [header.join('\t'), ...rows].join('\n') + '\n');

fs.writeFileSync(`${root}/README.md`, `# Glossika Cantonese A1 dialog 007 corpus package

- Source ID: \`${sourceId}\`
- Title: 週末計劃
- English title: Weekend Plans
- Source date: 2026-01-11
- Gmail message: \`19baf2034d90f4e4\`
- Intake issue: #143
- Work claim: #318
- Records: 40 dialog turns + 40 vocabulary entries = 80
- Source payload hash: \`${payloadHash}\`

## Source fidelity

The interactive-dialog email format omits speaker-name prefixes from romanization lines and preserves source-authored Latin tokens such as \`OK\` and \`A\`. Cantonese, punctuation, romanization, vocabulary order, and glosses are preserved. The source contains no per-turn English translations; turn records retain \`english: null\`.

## Source-block audit

${absentVocabulary.length} vocabulary surfaces are absent from the dialog by exact string matching and remain immutable glossary records. The dialog keeps \`OK\` as Latin script while the glossary gives \`ou1 kei1\`; both source forms are preserved and flagged.

## Modular ownership

Canonical runtime ownership comes from \`src/**\` and \`src/runtime-resources/**\`. Generated \`main.js\` is excluded.

No parser, lexicon, identity/status, survey, version, release, or deployment change is included.
`);

fs.writeFileSync('docs/research/GLOSSIKA-YUEHK-A1-DLG-007-20260111-CORPUS-INGRESS.md', `# Glossika dialog 007 corpus ingress — 週末計劃

- Source ID: \`${sourceId}\`
- Intake: #143
- Work claim: #318
- Parent research: #130
- Status: source-preserving ingress complete; expert review required

## Coverage

- 40 ordered dialog turns
- 40 ordered vocabulary entries
- 80 total records
- source payload hash: \`${payloadHash}\`
- classifications: \`${JSON.stringify(classificationCounts)}\`
- deduplication relations: \`${JSON.stringify(relationCounts)}\`
- vocabulary surfaces absent from dialog: \`${absentVocabulary.length}\`

## Source-format and discrepancy audit

Romanization lines without speaker-name prefixes are preserved, including \`OK\` and \`A\`. Missing turn translations remain null. Vocabulary entries absent from the dialog remain source records. The dialog/glossary asymmetry \`OK\` versus \`ou1 kei1\` is flagged without correction.

## Research routing

The package routes availability and day choice, motion/activity sequencing, food evaluation and existential structure, meeting time/place, contingency, alternatives, and agreement formulae to #130 without making grammar decisions.

## Stop boundary

No parser test, grammar promotion, runtime source, generated \`main.js\`, version, survey, or release state changed.
`);

console.log({ payloadHash, absentVocabularyCount: absentVocabulary.length, classificationCounts, relationCounts });
