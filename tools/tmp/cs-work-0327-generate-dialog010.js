const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const sourceId = 'GLOSSIKA-YUEHK-A1-DLG-010-20260208';
const root = `data/pedagogical-corpus/glossika/${sourceId}`;
const metaPath = 'tools/tmp/cs-work-0327-dialog010-meta.json';
const turnParts = Array.from({ length: 3 }, (_, i) => `tools/tmp/cs-work-0327-dialog010-turns.part${String(i).padStart(2, '0')}.tsv`);
const vocabParts = Array.from({ length: 2 }, (_, i) => `tools/tmp/cs-work-0327-dialog010-vocab.part${String(i).padStart(2, '0')}.tsv`);
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
  const expectedSpeaker = expected % 2 === 1 ? '黃志強' : '張美玲';
  const prefix = `${speaker}: `;
  if (turn !== expected || speaker !== expectedSpeaker) throw new Error(`Turn sequence or speaker mismatch at ${expected}`);
  if (!sourceLine.startsWith(prefix)) throw new Error(`Source line prefix mismatch at turn ${expected}`);
  if (!jyutpingLine.startsWith('/') || !jyutpingLine.endsWith('/')) throw new Error(`Jyutping delimiters missing at turn ${expected}`);
  if (/[A-Z]/.test(jyutpingLine)) throw new Error(`Unexpected uppercase source romanization at turn ${expected}`);
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
const canonicalFiles = listTextFiles(['src/', 'src/runtime-resources/'], [root + '/', 'tools/tmp/cs-work-0327-', '.github/workflows/cs-work-0327-']);
const supportingFiles = listTextFiles(['tests/', 'test-data/', 'data/', 'docs/', 'grammar/', 'config/'], [root + '/', 'tools/tmp/cs-work-0327-', '.github/workflows/cs-work-0327-']);
if ([...canonicalFiles, ...supportingFiles].some((entry) => entry.path === 'main.js')) throw new Error('Generated main.js leaked into ownership scan');

const naturalnessTurns = new Set([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30,31,32,33,34,35,36,37,38]);
const constructionRoutes = {
  1: ['jau5_mou5_experiential_question', 'demonstrative_classifier_restaurant'],
  2: ['classifier_wh_fragment', 'progressive_discourse_reference', 'locative_wh'],
  3: ['identificational_zau6_hai6', 'distal_classifier_np', 'newly_opened_modifier'],
  4: ['locative_wh_question', 'knowledge_negation', 'wo3_particle'],
  5: ['locative_topic', 'reported_speech', 'degree_reduplication'],
  6: ['echo_hai6_me1', 'experiential_gwo3', 'mei6_question'],
  7: ['mei6_answer', 'desire_delimitative'],
  8: ['attitude_complement', 'similarity_hou2ci5', 'degree_evaluation'],
  9: ['price_category_predication', 'restrictive_ze1', 'm4_syun3_evaluation'],
  10: ['per_person_quantity', 'approximate_price_question'],
  11: ['approximate_numeral', 'currency_amount', 'zo2_jau6_approximation'],
  12: ['degree_dou1_gei2', 'prospective_nam2zyu6', 'comparative_di1'],
  13: ['possessive_plural', 'food_evaluation', 'gaa3_assertive'],
  14: ['manner_knowledge_question', 'dou1_mei6_gwo3'],
  15: ['reported_experience', 'reported_evaluation'],
  16: ['identificational_wh_person'],
  17: ['past_time_frame', 'perfective_zo2'],
  18: ['habitual_seng4jat6', 'attributive_ge3'],
  19: ['jau5_mou5_interest_question', 'delimitative_si3haa5'],
  20: ['deliberative_nam2haa5_sin1', 'epistemic_probability', 'degree_taai3'],
  21: ['environment_evaluation', 'suitability_purpose'],
  22: ['negative_indefinite_object', 'deontic_jiu3'],
  23: ['proposal_bat1jyu4', 'joek3maai4_associative', 'motion_group_chain'],
  24: ['modal_permission', 'comparative_di1', 'average_distribution', 'zau6_result'],
  25: ['attitude_time_deliberative_question'],
  26: ['future_time_frame', 'dak1_m4_dak1_permission'],
  27: ['verb_reduplication', 'sin1_deliberative', 'epistemic_jing1goi1'],
  28: ['remember_complement', 'deontic_jiu3', 'english_book_borrowing'],
  29: ['future_phone_motion'],
  30: ['special_dish_wh_question'],
  31: ['coordination_tung4maai4', 'additive_dou1', 'fame_evaluation'],
  32: ['preference_food', 'wo3_particle'],
  33: ['coincidence_gam2ngaam1hou2', 'motion_delimitative', 'sentence_final_laa1'],
  34: ['contrast_bat1gwo3', 'prohibitive_m4hou2_taai3'],
  35: ['reassurance_formula', 'attitude_complement', 'value_evaluation_dai2sik6'],
  36: ['trust_once', 'sentence_final_laa1'],
  37: ['english_book_borrowing', 'completion_jyun4', 'zau6_report_sequence'],
  38: ['english_ok_token', 'waiting_message'],
  39: ['meeting_formula_dou3si4'],
  40: ['leave_taking_formula']
};
const lexicalFlags = {
  '覺得': ['attitude_predicate_review'],
  '點樣': ['title_only_manner_interrogative'],
  '餐廳': ['restaurant_lexical_attestation'],
  '有冇': ['a_not_a_existential_review'],
  '聽過': ['experiential_aspect_review'],
  '呢間': ['classifier_gaan1_review'],
  '邊間': ['classifier_wh_review'],
  '講緊': ['progressive_aspect_review'],
  '就係': ['identificational_focus_review'],
  '嗰間': ['distal_classifier_review'],
  '㗎': ['sentence_particle_gloss_review'],
  '喎': ['sentence_particle_gloss_review'],
  '話': ['reported_speech_polysemy_review'],
  '係咩': ['echo_question_formula_review'],
  '去過': ['experiential_aspect_review'],
  '未': ['negative_completion_review'],
  '講': ['speech_verb_review'],
  '下次': ['glossary_surface_absent_from_dialog'],
  '得': ['ability_permission_sufficiency_polysemy_review'],
  '啦': ['sentence_particle_gloss_review'],
  '咁': ['discourse_demonstrative_polysemy_review'],
  '定': ['decision_or_alternative_marker_review'],
  '可以': ['modal_gloss_review'],
  '唔該': ['glossary_surface_absent_from_dialog'],
  '冇問題': ['glossary_surface_absent_from_dialog']
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
    formatBoundary: 'Source romanization without speaker prefixes is preserved. Cantonese fields retain source-authored Latin casing Book and OK while romanization retains book1 and ok1.',
    sourceBlockBoundary: 'Vocabulary is an independent ordered source block; entries absent from the dialog remain source records and are flagged.',
    sourceGlossBoundary: 'Particle, classifier, aspect, modality, and polysemy glosses are source pedagogical metadata, not Canto Span analysis.',
    deduplicationBoundary: 'Exact and normalized repository matches are candidates until reviewed.',
    evidenceBoundary: 'Dialog adjacency and pedagogical attestation do not establish productivity, construction identity, register, code-switching status, or parser behavior.'
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
      { scope: `${sourceId}-I028,${sourceId}-I037,${sourceId}-I038`, type: 'source_authored_latin_tokens', status: 'source_preserved', note: 'The dialog preserves source-authored Book and OK casing while the romanization supplies book1 and ok1.' },
      { scope: 'vocabulary_block', type: 'vocabulary_dialog_surface_mismatch', status: 'source_preserved_review_required', note: `${absentVocabulary.length} vocabulary surfaces do not occur exactly in the dialog and remain separate source records.` },
      { scope: 'vocabulary_glosses', type: 'source_function_and_polysemy_glosses', status: 'not_evidence', note: 'Glosses for particles, classifiers, aspect, modality, and polysemous forms remain source metadata.' },
      { scope: `${sourceId}-I001,${sourceId}-I002,${sourceId}-I003,${sourceId}-I004,${sourceId}-I005,${sourceId}-I006,${sourceId}-I007`, type: 'restaurant_identification_experience_review', status: 'route_to_parent_130', note: 'Experiential 有冇…過, classifier questions, progressive reference, identificational 就係, locatives, reported speech, echo questions, 未, and delimitative 試吓 require separate review.' },
      { scope: `${sourceId}-I008,${sourceId}-I009,${sourceId}-I010,${sourceId}-I011,${sourceId}-I012,${sourceId}-I013,${sourceId}-I014`, type: 'price_attitude_quantity_review', status: 'route_to_parent_130', note: 'Attitude complements, similarity, price categories, restrictive 啫, per-person questions, approximation, currency amounts, 諗住, comparative 啲, possessive plural, and 未…過 require bounded analysis.' },
      { scope: `${sourceId}-I015,${sourceId}-I016,${sourceId}-I017,${sourceId}-I018,${sourceId}-I019,${sourceId}-I020`, type: 'reported_experience_interest_review', status: 'route_to_parent_130', note: 'Reported experience, identificational wh, past-time perfective, habituality, 有冇興趣, deliberative 諗吓先, probability, and degree 太 remain contextual attestations.' },
      { scope: `${sourceId}-I021,${sourceId}-I022,${sourceId}-I023,${sourceId}-I024,${sourceId}-I025,${sourceId}-I026,${sourceId}-I027`, type: 'environment_group_planning_review', status: 'route_to_parent_130', note: 'Environment evaluation, suitability, negative indefinite objects, 不如 proposals, 約埋, group motion, average distribution, comparative results, meeting-time deliberation, 得唔得, reduplication, 先, and 應該 require separate review.' },
      { scope: `${sourceId}-I028,${sourceId}-I029,${sourceId}-I030,${sourceId}-I031,${sourceId}-I032,${sourceId}-I033`, type: 'booking_dish_preference_review', status: 'route_to_parent_130', note: 'Remember complements, Book borrowing, phone motion, special-dish wh questions, coordination, additive 都, preference, coincidence, motion-purpose, and delimitative 試吓 remain contextual attestations.' },
      { scope: `${sourceId}-I034,${sourceId}-I035,${sourceId}-I036,${sourceId}-I037,${sourceId}-I038,${sourceId}-I039,${sourceId}-I040`, type: 'price_reassurance_booking_completion_review', status: 'route_to_parent_130', note: 'Prohibitive degree, reassurance, 抵食 evaluation, trust-once, Book completion, 就 sequencing, OK code-switching, waiting, and meeting/leave-taking formulae require separate research.' }
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

fs.writeFileSync(`${root}/README.md`, `# Glossika Cantonese A1 dialog 010 corpus package\n\n- Source ID: \`${sourceId}\`\n- Title: 你覺得呢間餐廳點樣\n- English title: What Do You Think of This Restaurant\n- Source date: 2026-02-08\n- Gmail message: \`19c3f44af6d8071d\`\n- Intake issue: #146\n- Work claim: #327\n- Records: 40 dialog turns + 40 vocabulary entries = 80\n- Source payload hash: \`${payloadHash}\`\n\n## Source fidelity\n\nThe interactive-dialog email format omits speaker-name prefixes from romanization lines. Cantonese, punctuation, romanization, vocabulary order, and glosses are preserved. The source-authored forms \`Book\` and \`OK\` remain in the Cantonese fields, with \`book1\` and \`ok1\` in romanization. The source contains no per-turn English translations; turn records retain \`english: null\`.\n\n## Source-block audit\n\n${absentVocabulary.length} vocabulary surfaces are absent from the dialog by exact string matching and remain immutable glossary records: ${absentVocabulary.map((item) => `\`${item.traditional}\``).join(', ')}.\n\n## Modular ownership\n\nCanonical runtime ownership comes from \`src/**\` and \`src/runtime-resources/**\`. Generated \`main.js\` is excluded.\n\nNo parser, lexicon, identity/status, survey, version, release, or deployment change is included.\n`);

fs.writeFileSync('docs/research/GLOSSIKA-YUEHK-A1-DLG-010-20260208-CORPUS-INGRESS.md', `# Glossika dialog 010 corpus ingress — 你覺得呢間餐廳點樣\n\n- Source ID: \`${sourceId}\`\n- Intake: #146\n- Work claim: #327\n- Parent research: #130\n- Status: source-preserving ingress complete; expert review required\n\n## Coverage\n\n- 40 ordered dialog turns\n- 40 ordered vocabulary entries\n- 80 total records\n- source payload hash: \`${payloadHash}\`\n- classifications: \`${JSON.stringify(classificationCounts)}\`\n- deduplication relations: \`${JSON.stringify(relationCounts)}\`\n- vocabulary surfaces absent from dialog: \`${absentVocabulary.length}\`\n\n## Source-format audit\n\nRomanization lines without speaker-name prefixes are preserved. Missing turn translations remain null. Vocabulary entries absent from the dialog remain source records. Source-authored \`Book\` and \`OK\` casing is preserved alongside \`book1\` and \`ok1\` romanization.\n\n## Research routing\n\nThe package routes restaurant identification, experiential aspect, attitude and price evaluation, reported experience, group planning, booking, code-switching, completion, and formulae to #130 without making grammar decisions.\n\n## Stop boundary\n\nNo parser test, grammar promotion, runtime source, generated \`main.js\`, version, survey, or release state changed.\n`);

console.log({ payloadHash, absentVocabularyCount: absentVocabulary.length, classificationCounts, relationCounts });
