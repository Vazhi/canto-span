const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const sourceId = 'GLOSSIKA-YUEHK-A1-DLG-009-20260201';
const root = `data/pedagogical-corpus/glossika/${sourceId}`;
const metaPath = 'tools/tmp/cs-work-0324-dialog009-meta.json';
const turnParts = Array.from({ length: 3 }, (_, i) => `tools/tmp/cs-work-0324-dialog009-turns.part${String(i).padStart(2, '0')}.tsv`);
const vocabParts = Array.from({ length: 2 }, (_, i) => `tools/tmp/cs-work-0324-dialog009-vocab.part${String(i).padStart(2, '0')}.tsv`);
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
  const expectedSpeaker = expected % 2 === 1 ? '陳先生' : '黃小姐';
  const prefix = `${speaker}: `;
  if (turn !== expected || speaker !== expectedSpeaker) throw new Error(`Turn sequence or speaker mismatch at ${expected}`);
  if (!sourceLine.startsWith(prefix)) throw new Error(`Source line prefix mismatch at turn ${expected}`);
  if (!jyutpingLine.startsWith('/') || !jyutpingLine.endsWith('/')) throw new Error(`Jyutping delimiters missing at turn ${expected}`);
  const upperCheck = jyutpingLine.replace(/send/g, '').replace(/email/g, '');
  if (/[A-Z]/.test(upperCheck)) throw new Error(`Unexpected uppercase source romanization at turn ${expected}`);
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
const canonicalFiles = listTextFiles(['src/', 'src/runtime-resources/'], [root + '/', 'tools/tmp/cs-work-0324-', '.github/workflows/cs-work-0324-']);
const supportingFiles = listTextFiles(['tests/', 'test-data/', 'data/', 'docs/', 'grammar/', 'config/'], [root + '/', 'tools/tmp/cs-work-0324-', '.github/workflows/cs-work-0324-']);
if ([...canonicalFiles, ...supportingFiles].some((entry) => entry.path === 'main.js')) throw new Error('Generated main.js leaked into ownership scan');

const naturalnessTurns = new Set([3,4,5,6,7,8,9,10,11,12,13,15,16,17,19,20,21,22,23,24,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40]);
const constructionRoutes = {
  1: ['workplace_greeting_vocative'],
  2: ['reciprocal_greeting_vocative'],
  3: ['ordinal_day_work_frame', 'feeling_manner_question'],
  4: ['dou1_gei2_degree', 'contrast_bat1gwo3', 'continuative_zung6_jau5di1'],
  5: ['m4_sai2_deontic_negation', 'reduplicated_manner', 'zau6_dak1_sufficiency'],
  6: ['modal_commitment', 'source_ge3_gaa3_discrepancy'],
  7: ['deontic_jiu3', 'quantity_classifier_joeng6'],
  8: ['wh_object_fragment'],
  9: ['discourse_sau2sin1', 'deontic_instruction', 'demonstrative_plural'],
  10: ['method_question'],
  11: ['classification_instruction', 'on3_date_ordering', 'result_complement_ho2'],
  12: ['saai3_completion', 'sin1_jau4_ordering', 'nominal_ellipsis_ge3'],
  13: ['superlative_zeoi3', 'nominal_ellipsis_ge3', 'locative_placement'],
  14: ['immediate_time_start'],
  15: ['completion_jyun4', 'postevent_zihau6', 'copy_quantity_classifier_fan6'],
  16: ['locative_wh_question'],
  17: ['adjacent_room_locative', 'motion_purpose_chain'],
  18: ['m4_goi1_saai3_formula'],
  19: ['demonstrative_classifier_bou6', 'identificational_zau6_hai6'],
  20: ['sik1_jung6_ability', 'evaluative_predication'],
  21: ['gam2_zau6_hou2_transition', 'gan1zyu6_sequence', 'deontic_task'],
  22: ['phone_recipient_bei2_wh'],
  23: ['phone_recipient_bei2', 'purpose_confirmation', 'future_meeting'],
  24: ['meeting_time_question'],
  25: ['future_time_fragment'],
  26: ['resultative_gei3_dai1', 'perfective_zo2'],
  27: ['continuative_zung6jau5', 'deontic_prepare'],
  28: ['wh_object_fragment'],
  29: ['coordination_tung4', 'object_list_instruction'],
  30: ['human_quantity_question'],
  31: ['approximate_quantity'],
  32: ['modal_completion_commitment'],
  33: ['discourse_zeoi3hau6', 'english_send_borrowing', 'report_classifier_fan6', 'recipient_bei2'],
  34: ['instrument_choice_ding6hai6', 'english_email_borrowing', 'directional_ceot1lai4'],
  35: ['english_email_borrowing', 'zau6_dak1_sufficiency'],
  36: ['possessive_ge3', 'identification_question'],
  37: ['perfective_zo2', 'locative_hai2', 'delimitative_tai2haa5'],
  38: ['modal_wui5', 'saai3_completion'],
  39: ['m4_sai2_deontic_negation', 'reduplicated_manner', 'zau6_dak1_sufficiency'],
  40: ['gratitude_vocative', 'inchoative_start', 'work_object', 'sentence_final_laa3']
};
const lexicalFlags = {
  '辦公室': ['title_only_glossary_surface'],
  '指示': ['title_only_glossary_surface'],
  '點樣': ['manner_interrogative_review'],
  '都幾好': ['degree_construction_review'],
  '呀': ['sentence_particle_gloss_review'],
  '仲': ['continuative_adverb_review'],
  '有啲': ['indefinite_degree_quantity_review'],
  '唔使': ['deontic_negation_review'],
  '慢慢': ['reduplication_manner_review'],
  '就得': ['sufficiency_sequence_review'],
  '會': ['future_ability_modal_review'],
  '嘅': ['source_turn_gaa3_gloss_ge3_discrepancy'],
  '有': ['possession_existential_polysemy_review'],
  '得': ['ability_permission_sufficiency_polysemy_review'],
  '幾': ['degree_quantity_polysemy_review'],
  '都': ['polyfunction_gloss_review'],
  '點': ['manner_wh_polysemy_review'],
  '返': ['return_directional_polysemy_review'],
  '第': ['ordinal_prefix_review'],
  '使': ['need_use_polysemy_review'],
  '就': ['sequence_focus_polysemy_review']
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
    formatBoundary: 'Source romanization without speaker prefixes is preserved, including source-authored Latin tokens send and email.',
    sourceBlockBoundary: 'Vocabulary is an independent ordered source block; title-only entries absent from the dialog remain source records and are flagged.',
    sourceRomanizationBoundary: 'Turn 6 writes 嘅 but gives gaa3; the glossary gives 嘅 with ge3. All source fields remain unchanged pending review.',
    sourceGlossBoundary: 'Particle, modal, degree, ordinal, and polysemy glosses are source pedagogical metadata, not Canto Span analysis.',
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
      { scope: `${sourceId}-I033,${sourceId}-I034,${sourceId}-I035,${sourceId}-I036`, type: 'source_authored_latin_tokens', status: 'source_preserved', note: 'The dialog preserves the source-authored Latin tokens send and email in both Cantonese and romanization fields.' },
      { scope: 'vocabulary_block', type: 'vocabulary_dialog_surface_mismatch', status: 'source_preserved_review_required', note: `${absentVocabulary.length} vocabulary surfaces do not occur exactly in the dialog and remain separate source records.` },
      { scope: `${sourceId}-I006,${sourceId}-I064`, type: 'romanization_discrepancy', status: 'requires_pronunciation_and_particle_review', note: 'Turn 6 writes 嘅 but romanizes it gaa3, while the glossary gives 嘅 /ge3/; no source value is corrected during ingress.' },
      { scope: 'vocabulary_glosses', type: 'source_function_and_polysemy_glosses', status: 'not_evidence', note: 'Glosses for particles, modality, degree, ordinal marking, and polysemous forms remain source metadata.' },
      { scope: `${sourceId}-I003,${sourceId}-I004,${sourceId}-I005,${sourceId}-I006,${sourceId}-I007,${sourceId}-I008`, type: 'orientation_emotion_task_assignment_review', status: 'route_to_parent_130', note: 'Ordinal work frames, degree evaluation, contrast, continuative quantity, 唔使, reduplicated manner, 就得, modality, task classifiers, and wh objects require separate review.' },
      { scope: `${sourceId}-I009,${sourceId}-I010,${sourceId}-I011,${sourceId}-I012,${sourceId}-I013,${sourceId}-I015`, type: 'document_order_completion_review', status: 'route_to_parent_130', note: 'Instruction sequencing, method questions, classification, 按 phrases, result complements, 晒, 先由 ordering, superlatives, locative placement, completion, and copy quantities remain contextual attestations.' },
      { scope: `${sourceId}-I016,${sourceId}-I017,${sourceId}-I019,${sourceId}-I020,${sourceId}-I021`, type: 'equipment_location_sequence_review', status: 'route_to_parent_130', note: 'Locative wh questions, adjacent-room phrases, motion-purpose chains, classifier 部, identificational 就係, ability, evaluation, and 跟住 sequencing require bounded analysis.' },
      { scope: `${sourceId}-I022,${sourceId}-I023,${sourceId}-I024,${sourceId}-I025,${sourceId}-I026`, type: 'phone_meeting_result_review', status: 'route_to_parent_130', note: 'Recipient 畀, confirmation purpose, meeting-time questions, temporal fragments, resultative 記低, and perfective 咗 remain contextual attestations.' },
      { scope: `${sourceId}-I027,${sourceId}-I028,${sourceId}-I029,${sourceId}-I030,${sourceId}-I031,${sourceId}-I032`, type: 'meeting_room_quantity_preparation_review', status: 'route_to_parent_130', note: 'Continuation, deontic preparation, wh fragments, object-list coordination, human quantity questions, approximation, and result preparation require separate review.' },
      { scope: `${sourceId}-I033,${sourceId}-I034,${sourceId}-I035,${sourceId}-I036,${sourceId}-I037,${sourceId}-I038,${sourceId}-I039,${sourceId}-I040`, type: 'report_email_completion_review', status: 'route_to_parent_130', note: 'English borrowing, report classifiers, recipient marking, alternative questions, directional printing, 就得, possessives, identification, perfective and locative writing, delimitatives, modal 晒 completion, and task-start formulae require separate research.' }
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

fs.writeFileSync(`${root}/README.md`, `# Glossika Cantonese A1 dialog 009 corpus package\n\n- Source ID: \`${sourceId}\`\n- Title: 辦公室指示\n- English title: Office Instructions\n- Source date: 2026-02-01\n- Gmail message: \`19c1b38474acaadb\`\n- Intake issue: #145\n- Work claim: #324\n- Records: 40 dialog turns + 40 vocabulary entries = 80\n- Source payload hash: \`${payloadHash}\`\n\n## Source fidelity\n\nThe interactive-dialog email format omits speaker-name prefixes from romanization lines and preserves the source-authored Latin tokens \`send\` and \`email\`. Cantonese, punctuation, romanization, vocabulary order, and glosses are preserved. The source contains no per-turn English translations; turn records retain \`english: null\`.\n\n## Source-block and romanization audit\n\n${absentVocabulary.length} vocabulary surfaces are absent from the dialog by exact string matching and remain immutable glossary records. Turn 6 writes \`嘅\` but gives \`gaa3\`; the glossary lists \`嘅 /ge3/\`. All source values are preserved and flagged.\n\n## Modular ownership\n\nCanonical runtime ownership comes from \`src/**\` and \`src/runtime-resources/**\`. Generated \`main.js\` is excluded.\n\nNo parser, lexicon, identity/status, survey, version, release, or deployment change is included.\n`);

fs.writeFileSync('docs/research/GLOSSIKA-YUEHK-A1-DLG-009-20260201-CORPUS-INGRESS.md', `# Glossika dialog 009 corpus ingress — 辦公室指示\n\n- Source ID: \`${sourceId}\`\n- Intake: #145\n- Work claim: #324\n- Parent research: #130\n- Status: source-preserving ingress complete; expert review required\n\n## Coverage\n\n- 40 ordered dialog turns\n- 40 ordered vocabulary entries\n- 80 total records\n- source payload hash: \`${payloadHash}\`\n- classifications: \`${JSON.stringify(classificationCounts)}\`\n- deduplication relations: \`${JSON.stringify(relationCounts)}\`\n- vocabulary surfaces absent from dialog: \`${absentVocabulary.length}\`\n\n## Source-format and discrepancy audit\n\nRomanization lines without speaker-name prefixes and the Latin tokens \`send\` and \`email\` are preserved. Missing turn translations remain null. Vocabulary entries absent from the dialog remain source records. The turn-6 \`嘅 /gaa3/\` versus glossary \`嘅 /ge3/\` difference is flagged without correction.\n\n## Research routing\n\nThe package routes workplace orientation, task instructions, document ordering, completion, equipment and location, phone recipients, meeting preparation, quantities, email/report workflow, English borrowing, and particle/aspect questions to #130 without making grammar decisions.\n\n## Stop boundary\n\nNo parser test, grammar promotion, runtime source, generated \`main.js\`, version, survey, or release state changed.\n`);

console.log({ payloadHash, absentVocabularyCount: absentVocabulary.length, classificationCounts, relationCounts });
