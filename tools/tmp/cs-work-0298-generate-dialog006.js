const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const sourceId = 'GLOSSIKA-YUEHK-A1-DLG-006-20260104';
const root = `data/pedagogical-corpus/glossika/${sourceId}`;
const metaPath = 'tools/tmp/cs-work-0298-dialog006-meta.json';
const turnParts = Array.from({ length: 3 }, (_, i) => `tools/tmp/cs-work-0298-dialog006-turns.part${String(i).padStart(2, '0')}.tsv`);
const vocabParts = Array.from({ length: 2 }, (_, i) => `tools/tmp/cs-work-0298-dialog006-vocab.part${String(i).padStart(2, '0')}.tsv`);
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
  const expectedSpeaker = expected % 2 === 1 ? '家豪' : '詠思';
  const prefix = `${speaker}: `;
  if (turn !== expected || speaker !== expectedSpeaker) throw new Error(`Turn sequence or speaker mismatch at ${expected}`);
  if (!sourceLine.startsWith(prefix)) throw new Error(`Source line prefix mismatch at turn ${expected}`);
  if (!jyutpingLine.startsWith('/') || !jyutpingLine.endsWith('/')) throw new Error(`Jyutping delimiters missing at turn ${expected}`);
  if (/[A-Z]/.test(jyutpingLine)) throw new Error(`Expected lowercase source romanization at turn ${expected}`);
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
const canonicalFiles = listTextFiles(['src/', 'src/runtime-resources/'], [root + '/', 'tools/tmp/cs-work-0298-', '.github/workflows/cs-work-0298-']);
const supportingFiles = listTextFiles(['tests/', 'test-data/', 'data/', 'docs/', 'grammar/', 'config/'], [root + '/', 'tools/tmp/cs-work-0298-', '.github/workflows/cs-work-0298-']);
if ([...canonicalFiles, ...supportingFiles].some((entry) => entry.path === 'main.js')) throw new Error('Generated main.js leaked into ownership scan');

const naturalnessTurns = new Set([1, 4, 6, 8, 9, 11, 14, 15, 18, 19, 20, 21, 23, 24, 25, 26, 27, 29, 31, 32, 33, 34, 36, 37, 38, 40]);
const constructionRoutes = {
  1: ['future_modal_desire_wh', 'occupation_object'],
  2: ['degree_negation_m4hai6hou2', 'ne1_continuation'],
  3: ['occupation_copular_or_light_verb', 'purpose_or_apposition'],
  4: ['particle_cluster_gaa3_wo3', 'evaluative_predication'],
  6: ['progressive_education_question', 'assumptive_laa1'],
  8: ['zung6_jau5_duration', 'sin1_temporal_boundary'],
  9: ['duration_fragment', 'ne1_continuation', 'wh_object_me1'],
  11: ['echo_question_progressive'],
  12: ['mei6_fragment', 'progressive_study'],
  14: ['reported_speech_waa6', 'wan2_sik6_lexicalization', 'comparative_di1'],
  15: ['biased_question_me1'],
  18: ['experiential_nam2_gwo3', 'fear_complement'],
  19: ['sin1_condition_or_sequence', 'nominalized_ge3_je5'],
  20: ['manner_result_gong2_dak1_ngaam1', 'delimitative_haa5'],
  21: ['future_present_contrast', 'zau6_necessity'],
  23: ['jau5_mou5_online_learning_question'],
  24: ['progressive_media_learning', 'english_proper_name'],
  25: ['reduplicated_manner_maan6maan6', 'resultative_zou6_dou2'],
  26: ['jau5_mou5_experiential_question', 'ne1_continuation'],
  27: ['benefactive_bong1', 'tutoring_object'],
  28: ['hai6_mai6_degree_question'],
  29: ['jau5_si4_temporal', 'jau5_abstract_possession'],
  30: ['sik1_hap6_complement'],
  31: ['future_topic', 'additive_dou1', 'encouragement_dak1'],
  32: ['hope_complement', 'dreams_dou1'],
  33: ['modal_wui5_particle_gaa3', 'superlative_zeoi3'],
  34: ['post_time_zi1hau6', 'particle_cluster_gaa3_laa3'],
  36: ['gei2si4_zau6_sequence_question'],
  37: ['post_event_zi1hau6', 'resultative_wan2_dou2'],
  38: ['degree_gam3', 'resultative_wan2_dou2'],
  40: ['future_dou1_wui5', 'sentence_final_gaa3']
};
const lexicalFlags = {
  '都': ['polyfunction_gloss_review'],
  '呢': ['question_particle_gloss_review'],
  '嘩': ['source_pronunciation_discrepancy_waa1_vs_waa3'],
  '㗎喎': ['particle_cluster_gloss_review'],
  '同': ['coordination_coverb_polysemy_review'],
  '讀緊': ['compositional_progressive_review'],
  '啦': ['particle_function_gloss_review'],
  '未': ['negation_aspect_review'],
  '緊': ['progressive_marker_review'],
  '吖': ['suggestion_particle_gloss_review'],
  '啱唔啱': ['a_not_a_predicate_review'],
  '幾': ['wh_degree_polysemy_review'],
  '啲': ['classifier_quantifier_degree_review']
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
    formatBoundary: 'Lowercase source romanization without speaker prefixes is preserved and not normalized to earlier dialog formats.',
    sourceBlockBoundary: 'Vocabulary is an independent ordered source block; entries absent from the dialog remain source records and are flagged.',
    sourceGlossBoundary: 'Bracketed particle and function glosses are source pedagogical metadata, not Canto Span analysis.',
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
      { scope: 'all_dialog_turns', type: 'missing_turn_english_translation', status: 'source_omission_preserved', note: 'The email supplies Cantonese and lowercase Jyutping but no per-turn English translations.' },
      { scope: 'romanization_format', type: 'new_source_format', status: 'source_preserved', note: 'Jyutping lines omit speaker-name prefixes and remain lowercase.' },
      { scope: 'vocabulary_block', type: 'vocabulary_dialog_surface_mismatch', status: 'source_preserved_review_required', note: `${absentVocabulary.length} vocabulary surfaces do not occur exactly in the dialog and remain separate source records.` },
      { scope: `${sourceId}-I053`, type: 'pronunciation_discrepancy', status: 'requires_pronunciation_review', note: 'The dialog romanizes 嘩 as waa3 while the vocabulary block gives waa1; neither source value is corrected during ingress.' },
      { scope: 'vocabulary_glosses', type: 'source_function_glosses', status: 'not_evidence', note: 'Glosses such as [emphasis + hearsay], [assumption particle], and [suggestion particle] remain source metadata.' },
      { scope: `${sourceId}-I006,${sourceId}-I008,${sourceId}-I009,${sourceId}-I011,${sourceId}-I012`, type: 'study_progressive_fragment_review', status: 'route_to_parent_130', note: 'Progressive study predicates, assumption questions, duration-before-graduation, continuation, echo, and 未 fragments require separate review.' },
      { scope: `${sourceId}-I014,${sourceId}-I015,${sourceId}-I018,${sourceId}-I019,${sourceId}-I020`, type: 'reported_attitude_sequence_review', status: 'route_to_parent_130', note: 'Reported speech, lexicalized livelihood, biased questions, experiential thought, fear complements, 先 ordering, and result evaluation remain contextual attestations.' },
      { scope: `${sourceId}-I023,${sourceId}-I024,${sourceId}-I025,${sourceId}-I026,${sourceId}-I027`, type: 'online_learning_tutoring_review', status: 'route_to_parent_130', note: '有冇 questions, progressive media learning, reduplicated manner, resultatives, experiential tutoring, and benefactives require bounded analysis.' },
      { scope: `${sourceId}-I031,${sourceId}-I032,${sourceId}-I033,${sourceId}-I034,${sourceId}-I036,${sourceId}-I037,${sourceId}-I038,${sourceId}-I040`, type: 'future_goal_result_particle_review', status: 'route_to_parent_130', note: 'Future goals, 都, modal predictions, resultatives, superlatives, particle clusters, temporal 就 questions, and final 㗎 remain contextual attestations.' }
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

fs.writeFileSync(`${root}/README.md`, `# Glossika Cantonese A1 dialog 006 corpus package\n\n- Source ID: \`${sourceId}\`\n- Title: 將來想做乜？\n- English title: What Do You Want to Do in the Future?\n- Source date: 2026-01-04\n- Gmail message: \`19b8b06b61f9e2e1\`\n- Intake issue: #142\n- Work claim: #298\n- Records: 40 dialog turns + 40 vocabulary entries = 80\n- Source payload hash: \`${payloadHash}\`\n\n## Source fidelity\n\nThe newer email format uses lowercase Jyutping without speaker-name prefixes. Cantonese, punctuation, romanization, vocabulary order, and glosses are preserved. The source contains no per-turn English translations; turn records retain \`english: null\`.\n\n## Source-block audit\n\n${absentVocabulary.length} vocabulary surfaces are absent from the dialog by exact string matching. They remain immutable glossary records. The dialog/glossary pronunciation difference for 嘩 (\`waa3\` versus \`waa1\`) is flagged without correction.\n\n## Modular ownership\n\nCanonical runtime ownership comes from \`src/**\` and \`src/runtime-resources/**\`. Generated \`main.js\` is excluded.\n\nNo parser, lexicon, identity/status, survey, version, release, or deployment change is included.\n`);

fs.writeFileSync('docs/research/GLOSSIKA-YUEHK-A1-DLG-006-20260104-CORPUS-INGRESS.md', `# Glossika dialog 006 corpus ingress — 將來想做乜？\n\n- Source ID: \`${sourceId}\`\n- Intake: #142\n- Work claim: #298\n- Parent research: #130\n- Status: source-preserving ingress complete; expert review required\n\n## Coverage\n\n- 40 ordered dialog turns\n- 40 ordered vocabulary entries\n- 80 total records\n- source payload hash: \`${payloadHash}\`\n- classifications: \`${JSON.stringify(classificationCounts)}\`\n- deduplication relations: \`${JSON.stringify(relationCounts)}\`\n- vocabulary surfaces absent from dialog: \`${absentVocabulary.length}\`\n\n## Source-format and discrepancy audit\n\nThe lowercase Jyutping format is preserved. Missing turn translations remain null. Vocabulary entries absent from the dialog remain source records. 嘩 is romanized \`waa3\` in the dialog and \`waa1\` in the glossary; review is required.\n\n## Research routing\n\nThe package routes progressive study predicates, fragments, reported attitudes, experiential aspect, 先 ordering, online-learning and tutoring sequences, future goals, resultatives, modality, 都, and particle clusters to #130 without making grammar decisions.\n\n## Stop boundary\n\nNo parser test, grammar promotion, runtime source, generated \`main.js\`, version, survey, or release state changed.\n`);

console.log({ payloadHash, absentVocabularyCount: absentVocabulary.length, classificationCounts, relationCounts });
