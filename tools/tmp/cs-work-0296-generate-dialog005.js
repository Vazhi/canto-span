const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const sourceId = 'GLOSSIKA-YUEHK-A1-DLG-005-20251228';
const root = `data/pedagogical-corpus/glossika/${sourceId}`;
const metaPath = 'tools/tmp/cs-work-0296-dialog005-meta.json';
const turnParts = Array.from({ length: 4 }, (_, i) => `tools/tmp/cs-work-0296-dialog005-turns.part${String(i).padStart(2, '0')}.tsv`);
const vocabParts = Array.from({ length: 3 }, (_, i) => `tools/tmp/cs-work-0296-dialog005-vocab.part${String(i).padStart(2, '0')}.tsv`);
const seedPaths = [metaPath, ...turnParts, ...vocabParts];

function stable(value) {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}
function sha(text) { return crypto.createHash('sha256').update(text, 'utf8').digest('hex'); }
function countBy(values) {
  return Object.fromEntries([...values.reduce((map, value) => map.set(value, (map.get(value) || 0) + 1), new Map())].sort(([a], [b]) => a.localeCompare(b)));
}
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
if (turnRows.length !== 56 || vocabRows.length !== 58) throw new Error(`Expected 56 turns and 58 vocabulary entries, found ${turnRows.length}/${vocabRows.length}`);

const turnRecords = turnRows.map(([turnText, speaker, sourceLine, jyutpingLine], index) => {
  const turn = Number(turnText);
  const expected = index + 1;
  const expectedSpeaker = expected % 2 === 1 ? '阿文' : '阿芬';
  const prefix = `${speaker}: `;
  if (turn !== expected || speaker !== expectedSpeaker) throw new Error(`Turn sequence or speaker mismatch at ${expected}`);
  if (!sourceLine.startsWith(prefix)) throw new Error(`Source line prefix mismatch at turn ${expected}`);
  if (!jyutpingLine.startsWith('/') || !jyutpingLine.endsWith('/')) throw new Error(`Jyutping delimiters missing at turn ${expected}`);
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
const vocabularyRecords = vocabRows.map(([ordinalText, traditional, jyutping, english], index) => {
  const vocabularyOrdinal = Number(ordinalText);
  if (vocabularyOrdinal !== index + 1) throw new Error(`Vocabulary order mismatch at ${index + 1}`);
  return { itemType: 'lexical_entry', vocabularyOrdinal, source: { traditional, jyutping, english } };
});
const records = [...turnRecords, ...vocabularyRecords];
if (records.length !== 114) throw new Error(`Expected 114 records, found ${records.length}`);
const payloadHash = `sha256:${sha(stable(records.map((record) => record.source)))}`;
const items = records.map((record, index) => ({
  id: `${sourceId}-I${String(index + 1).padStart(3, '0')}`,
  ordinal: index + 1,
  itemType: record.itemType,
  ...(record.turn ? { turn: record.turn, speaker: record.speaker } : {}),
  ...(record.vocabularyOrdinal ? { vocabularyOrdinal: record.vocabularyOrdinal } : {}),
  source: record.source,
  sourceHash: `sha256:${sha(stable(record.source))}`
}));

const tokenPairs = require('../../src/runtime-resources/lexicon/token-lexicon');
const tokenMap = new Map(tokenPairs);
const tokenRoot = 'src/runtime-resources/lexicon/token-lexicon';
const tokenFiles = fs.readdirSync(tokenRoot).filter((file) => file.endsWith('.js')).map((file) => path.join(tokenRoot, file)).sort();
const tokenText = Object.fromEntries(tokenFiles.map((file) => [file, fs.readFileSync(file, 'utf8')]));
const canonicalFiles = listTextFiles(['src/', 'src/runtime-resources/'], [root + '/', 'tools/tmp/cs-work-0296-', '.github/workflows/cs-work-0296-']);
const supportingFiles = listTextFiles(['tests/', 'test-data/', 'data/', 'docs/', 'grammar/', 'config/'], [root + '/', 'tools/tmp/cs-work-0296-', '.github/workflows/cs-work-0296-']);
if ([...canonicalFiles, ...supportingFiles].some((entry) => entry.path === 'main.js')) throw new Error('Generated main.js leaked into ownership scan');

const naturalnessTurns = new Set([1, 6, 8, 10, 12, 17, 19, 20, 21, 24, 25, 29, 32, 33, 34, 36, 37, 38, 39, 41, 42, 46, 47, 50, 51, 52, 55, 56]);
const constructionRoutes = {
  1: ['jau5_mou5_cognition_question', 'approaching_event_dou3'],
  3: ['wh_fragment_question'],
  6: ['change_measure_object'],
  7: ['manner_wh_question'],
  8: ['motion_goal_purpose_chain'],
  10: ['date_fragment', 'ne1_continuation', 'jau5_mou5_ellipsis'],
  12: ['classifier_language_selection'],
  17: ['instrument_coordination_or_ellipsis', 'english_loan_app'],
  19: ['frequency_fragment', 'mui5_measure'],
  20: ['encouragement_dak1', 'sentence_final_gaa3'],
  21: ['additive_dou1', 'encouragement_dak1'],
  24: ['habitual_temporal_fragment', 'post_time_hau6'],
  25: ['degree_fragment', 'deoi3_evaluative_predicate'],
  26: ['so2ji5_consequence', 'omitted_complement_goi2'],
  29: ['parallel_early_sleep_wake', 'evaluative_fragment'],
  32: ['wh_dou1_free_choice_or_universal'],
  33: ['time_frame_quantity_question', 'book_classifier'],
  34: ['time_frame_frequency', 'book_classifier'],
  36: ['parallel_activity_chain'],
  37: ['creation_verb_zing2', 'book_club_classifier_go3'],
  38: ['topic_echo_fragment', 'degree_gei2'],
  39: ['habitual_frequency_question_without_particle'],
  40: ['locative_wh_question'],
  41: ['modal_motion_goal'],
  42: ['reciprocal_rotation_activity'],
  43: ['zung6_jau5_wh_nominal'],
  45: ['quantity_wh_fragment'],
  46: ['large_money_numeral'],
  47: ['measure_echo_fragment', 'sentence_final_wo3'],
  50: ['comparative_reduction_scope', 'activity_chain'],
  51: ['inferential_activity_fragment'],
  52: ['contextual_comparative_hou2do1'],
  54: ['reciprocal_wussoeng1'],
  55: ['parallel_nominal_slogan'],
  56: ['formulaic_encouragement', 'encouragement_dak1']
};
const lexicalFlags = {
  '諗': ['nam2_soeng2_lexical_contrast_review'],
  '點樣': ['manner_wh_compositionality_review'],
  '邊隻': ['language_classifier_review'],
  '日文': ['capitalization_in_source_jyutping_preserved'],
  '每個禮拜': ['distributive_frequency_review'],
  '一定得': ['encouragement_formula_and_dak1_review'],
  '十二點後': ['temporal_compositionality_review'],
  '對身體': ['coverb_or_relational_phrase_review'],
  '早瞓早起': ['parallel_formula_review'],
  '乜都': ['wh_dou1_interpretation_review'],
  '一個月': ['time_frame_measure_review'],
  '本': ['classifier_compatibility_review'],
  '讀書會': ['lexicalized_compound_review'],
  '輪流': ['reciprocal_distribution_review'],
  '五萬蚊': ['currency_numeral_review'],
  '少啲': ['comparative_quantity_scope_review'],
  '出街食飯': ['activity_chain_compositionality_review'],
  '互相': ['reciprocal_argument_structure_review'],
  '新開始': ['nominal_compound_review'],
  '加油': ['formulaic_encouragement_review']
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
  if (item.itemType === 'dialog_turn') reviewFlags.push('source_turn_translation_not_provided');
  let ingressClassification;
  if (item.itemType === 'dialog_turn' && naturalnessTurns.has(item.turn)) ingressClassification = 'naturalness_review_candidate';
  else if (item.itemType === 'lexical_entry' && runtimeEntry) ingressClassification = 'lexical_only_attestation';
  else if (deduplicationRelation === 'exact_duplicate_candidate') ingressClassification = 'exact_duplicate';
  else if (deduplicationRelation === 'normalized_duplicate_candidate') ingressClassification = 'normalized_duplicate';
  else ingressClassification = 'new_attestation';
  const previousTurnId = item.itemType === 'dialog_turn' && item.turn > 1 ? `${sourceId}-I${String(item.turn - 1).padStart(3, '0')}` : null;
  const nextTurnId = item.itemType === 'dialog_turn' && item.turn < 56 ? `${sourceId}-I${String(item.turn + 1).padStart(3, '0')}` : null;
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
    adjacency: item.itemType === 'dialog_turn' ? {
      previousTurnId,
      nextTurnId,
      previousSpeaker: item.turn > 1 ? turnRecords[item.turn - 2].speaker : null,
      nextSpeaker: item.turn < 56 ? turnRecords[item.turn].speaker : null
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
const source = {
  schema: 'canto-span-pedagogical-dialog-source-v1',
  source: {
    sourceId: meta.sourceId,
    provider: meta.provider,
    course: meta.course,
    dialogNumber: meta.dialogNumber,
    title: meta.title,
    scenario: meta.scenario,
    sourceDate: meta.sourceDate,
    gmailMessageId: meta.gmailMessageId,
    sourceType: meta.sourceType,
    language: meta.language,
    authorization: meta.authorization,
    sourceNotes: meta.sourceNotes
  },
  ingress: {
    ...meta.ingress,
    recordCount: items.length,
    turnCount: turnRecords.length,
    vocabularyCount: vocabularyRecords.length,
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
  summary: { recordCount: 114, turnCount: 56, vocabularyCount: 58, classificationCounts, relationCounts },
  items: crosswalkItems
};
const review = {
  schema: 'canto-span-pedagogical-dialog-review-v1',
  sourceId,
  sourcePayloadHash: payloadHash,
  policy: {
    sourceLayer: 'source.json is immutable.',
    translationBoundary: 'Missing per-turn translations are preserved and must not be generated during ingress.',
    sourceClaimBoundary: 'The source notes on 諗/想, 有冇, 邊隻, 點樣, 一定得, and 乜都 are pedagogical claims requiring independent verification.',
    deduplicationBoundary: 'Exact and normalized repository matches are candidates until reviewed.',
    evidenceBoundary: 'Dialog adjacency and pedagogical attestation do not establish productivity, construction identity, classifier rules, formula status, or parser behavior.'
  },
  summary: {
    recordCount: 114,
    reviewedCount: 0,
    unreviewedCount: 114,
    classificationCounts,
    relationCounts,
    knownSourceAlerts: [
      { scope: 'all_dialog_turns', type: 'missing_turn_english_translation', status: 'source_omission_preserved', note: 'The email supplies Cantonese and Jyutping but no per-turn English translations.' },
      { scope: 'source_notes', type: 'source_grammar_and_confidence_claims', status: 'not_evidence', note: 'Claims about 諗/想, 有冇, 邊隻, 點樣, 一定得, 乜都, and Confidence Level: High remain metadata rather than Canto Span adjudication.' },
      { scope: `${sourceId}-I001,${sourceId}-I010`, type: 'existential_question_and_discourse_review', status: 'route_to_parent_130', note: '有冇諗 and context-linked 有冇大計 require lexical, A-not-A, ellipsis, and discourse analysis.' },
      { scope: `${sourceId}-I008,${sourceId}-I017`, type: 'motion_instrument_coordination_review', status: 'route_to_parent_130', note: '去健身室做運動 and 用app同上堂 require bounded motion-purpose, instrumental, coordination, and ellipsis analysis.' },
      { scope: `${sourceId}-I012,${sourceId}-I032`, type: 'source_generalization_review', status: 'route_to_parent_130', note: '邊隻語言 and 乜都睇 are preserved without accepting the source classifier or wh-plus-都 generalizations.' },
      { scope: `${sourceId}-I019,${sourceId}-I033,${sourceId}-I034,${sourceId}-I039`, type: 'frequency_time_frame_review', status: 'route_to_parent_130', note: 'Weekly/monthly frequency and time-frame quantity strings require measure, aspect, topic, and fragment analysis.' },
      { scope: `${sourceId}-I020,${sourceId}-I021,${sourceId}-I056`, type: 'encouragement_dak1_review', status: 'route_to_parent_130', note: '一定得 is preserved as contextual encouragement without treating 得 as a single unrestricted ability construction.' },
      { scope: `${sourceId}-I037,${sourceId}-I038,${sourceId}-I041,${sourceId}-I042`, type: 'book_club_planning_review', status: 'route_to_parent_130', note: 'Creation, echo fragments, habitual meeting questions, motion goals, and reciprocal rotation remain contextual attestations.' },
      { scope: `${sourceId}-I046,${sourceId}-I047,${sourceId}-I050,${sourceId}-I051,${sourceId}-I052`, type: 'money_comparative_fragment_review', status: 'route_to_parent_130', note: 'Large currency numerals, echo fragments, 少啲 scope, inferential fragments, and contextual comparatives require separate review.' }
    ]
  },
  records: reviewRecords
};

fs.mkdirSync(root, { recursive: true });
fs.mkdirSync('docs/research', { recursive: true });
fs.writeFileSync(`${root}/source.json`, JSON.stringify(source, null, 2) + '\n');
fs.writeFileSync(`${root}/crosswalk.json`, JSON.stringify(crosswalk, null, 2) + '\n');
fs.writeFileSync(`${root}/review.json`, JSON.stringify(review, null, 2) + '\n');

const header = ['id','ordinal','item_type','turn','speaker','vocabulary_ordinal','source_cantonese','source_jyutping','source_english','source_hash','previous_turn_id','next_turn_id','deduplication_relation','ingress_classification','runtime_lexical_owners','canonical_exact_owners','supporting_exact_owners','review_flags','review_state'];
const rows = items.map((item, index) => {
  const record = reviewRecords[index];
  const walk = crosswalkItems[index];
  const sourceJyutping = item.source.jyutpingLine || item.source.jyutping || '';
  const sourceEnglish = item.source.english === null ? '' : item.source.english || '';
  return [item.id,item.ordinal,item.itemType,item.turn||'',item.speaker||'',item.vocabularyOrdinal||'',item.source.traditional,sourceJyutping,sourceEnglish,item.sourceHash,walk.adjacency?.previousTurnId||'',walk.adjacency?.nextTurnId||'',record.deduplicationRelation,record.ingressClassification,(walk.runtimeLexicalOwner?.owners||[]).join('|'),walk.canonicalExactOwners.join('|'),walk.supportingExactOwners.join('|'),record.reviewFlags.join('|'),meta.ingress.reviewState].map(tsv).join('\t');
});
fs.writeFileSync(`${root}/items.tsv`, [header.join('\t'), ...rows].join('\n') + '\n');

fs.writeFileSync(`${root}/README.md`, `# Glossika Cantonese A1 dialog 005 corpus package\n\n- Source ID: \`${sourceId}\`\n- Title: 新年大計同朋友傾\n- Source date: 2025-12-28\n- Gmail message: \`19b66a73d4bba360\`\n- Intake issue: #141\n- Work claim: #296\n- Records: 56 dialog turns + 58 vocabulary entries = 114\n- Source payload hash: \`${payloadHash}\`\n\n## Source fidelity\n\nSpeaker labels, Cantonese, spacing, punctuation, Jyutping lines, vocabulary glosses, scenario, notes, and order are preserved. The source contains no per-turn English translations; turn records retain \`english: null\`.\n\n## Modular ownership\n\nCanonical runtime ownership comes from \`src/**\` and \`src/runtime-resources/**\`. Generated \`main.js\` is excluded.\n\n## Files\n\n- \`source.json\`: immutable ordered source records.\n- \`crosswalk.json\`: adjacency, modular owners, and deduplication candidates.\n- \`review.json\`: review classifications and source alerts.\n- \`items.tsv\`: flat review rendering.\n\nNo parser, lexicon, identity/status, survey, version, release, or deployment change is included.\n`);

fs.writeFileSync('docs/research/GLOSSIKA-YUEHK-A1-DLG-005-20251228-CORPUS-INGRESS.md', `# Glossika dialog 005 corpus ingress — 新年大計同朋友傾\n\n- Source ID: \`${sourceId}\`\n- Intake: #141\n- Work claim: #296\n- Parent research: #130\n- Status: source-preserving ingress complete; expert review required\n\n## Coverage\n\n- 56 ordered dialog turns\n- 58 ordered vocabulary entries\n- 114 total records\n- source payload hash: \`${payloadHash}\`\n- classifications: \`${JSON.stringify(classificationCounts)}\`\n- deduplication relations: \`${JSON.stringify(relationCounts)}\`\n\n## Source omissions and claims\n\nThe email provides no turn-level English translations. Source-authored claims about 諗/想, 有冇, 邊隻, 點樣, 一定得, 乜都, and high confidence remain unverified metadata.\n\n## Research routing\n\nThe package routes existential questions, motion-purpose chains, instrumental coordination, classifier selection, wh-plus-都, frequency frames, encouragement 得, fragments, currency numerals, quantity scope, and comparatives to #130 without making grammar decisions.\n\n## Stop boundary\n\nNo parser test, grammar promotion, runtime source, generated \`main.js\`, version, survey, or release state changed.\n`);

console.log({ payloadHash, classificationCounts, relationCounts });
