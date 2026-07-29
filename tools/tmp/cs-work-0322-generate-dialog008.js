const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const sourceId = 'GLOSSIKA-YUEHK-A1-DLG-008-20260125';
const root = `data/pedagogical-corpus/glossika/${sourceId}`;
const metaPath = 'tools/tmp/cs-work-0322-dialog008-meta.json';
const turnParts = Array.from({ length: 3 }, (_, i) => `tools/tmp/cs-work-0322-dialog008-turns.part${String(i).padStart(2, '0')}.tsv`);
const vocabParts = Array.from({ length: 2 }, (_, i) => `tools/tmp/cs-work-0322-dialog008-vocab.part${String(i).padStart(2, '0')}.tsv`);
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
  const expectedSpeaker = expected % 2 === 1 ? '志明' : '美華';
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
const canonicalFiles = listTextFiles(['src/', 'src/runtime-resources/'], [root + '/', 'tools/tmp/cs-work-0322-', '.github/workflows/cs-work-0322-']);
const supportingFiles = listTextFiles(['tests/', 'test-data/', 'data/', 'docs/', 'grammar/', 'config/'], [root + '/', 'tools/tmp/cs-work-0322-', '.github/workflows/cs-work-0322-']);
if ([...canonicalFiles, ...supportingFiles].some((entry) => entry.path === 'main.js')) throw new Error('Generated main.js leaked into ownership scan');

const naturalnessTurns = new Set([1,2,3,4,5,6,7,8,10,11,13,14,15,16,17,18,19,22,23,24,26,27,28,29,30,31,33,34,35,36,38,40]);
const constructionRoutes = {
  1: ['locative_a_not_a_presence_question'],
  2: ['locative_answer', 'directional_complement_jap6_lai4', 'sentence_final_laa1'],
  3: ['polite_preface', 'desire_borrow_use_chain'],
  4: ['identificational_lai4_gaa3_question'],
  5: ['borrow_classifier_object', 'dak1_m4_dak1_permission'],
  6: ['permission_response', 'classifier_wh_ellipsis'],
  7: ['nominal_ellipsis_ge3', 'zau6_dak1_sufficiency'],
  8: ['demonstrative_classifier', 'bei2_recipient'],
  9: ['m4_goi1_saai3_formula'],
  10: ['zung6_jau5_mou5_question', 'other_object'],
  11: ['borrow_classifier_umbrella', 'dak1_m4_dak1_permission'],
  12: ['weather_question'],
  13: ['outside_locative', 'progressive_weather'],
  14: ['possessed_classifier_np', 'locative_predicate'],
  15: ['resultative_gin3_dou2', 'sentence_final_laa3'],
  16: ['return_time_question'],
  17: ['future_return_recipient', 'dak1_m4_dak1_permission'],
  18: ['m4_sai2_deontic_negation'],
  19: ['zoi3_borrow_request', 'classifier_cup', 'delimitative_haa5', 'dak1_m4_dak1_permission'],
  20: ['purpose_inference_question'],
  21: ['degree_state_predication'],
  22: ['container_localizer_existential'],
  23: ['demonstrative_classifier_echo_question'],
  24: ['imperative_lo2', 'distal_demonstrative'],
  25: ['m4_goi1_formula'],
  26: ['zung6_jiu3_wh_fragment'],
  27: ['jau5_mou5_object_question'],
  28: ['quantity_classifier_question'],
  29: ['approximate_numeral', 'zau6_gau3_sufficiency'],
  30: ['demonstrative_plural', 'bei2_recipient'],
  31: ['do1_ze6_saai3_formula'],
  32: ['m4_sai2_haak3_hei3_formula'],
  33: ['evaluative_hou2_jan4'],
  34: ['identificational_lai4_gaa3_maa3'],
  35: ['next_time_conditional', 'jiu3_zau6_sequence'],
  36: ['modal_prediction'],
  37: ['departure_announcement'],
  38: ['reduplicated_leave_taking_manner'],
  39: ['leave_taking_formula'],
  40: ['leave_taking_reminder', 'gei3_dak1_complement']
};
const lexicalFlags = {
  '借': ['borrow_lend_source_gloss_polysemy_review'],
  '喺唔喺度': ['locative_a_not_a_review'],
  '喺': ['locative_coverb_or_verb_review'],
  '度': ['localizer_gloss_review'],
  '啦': ['sentence_particle_gloss_review'],
  '想': ['desire_cognition_polysemy_review'],
  '啲': ['classifier_quantifier_degree_review'],
  '嚟': ['directional_identificational_polysemy_review'],
  '㗎': ['sentence_particle_gloss_review'],
  '支': ['classifier_gloss_review'],
  '得唔得': ['permission_or_ability_review'],
  '得': ['ability_permission_sufficiency_polysemy_review'],
  '要': ['desire_need_deontic_polysemy_review'],
  '呀': ['sentence_particle_gloss_review'],
  '好': ['adjective_degree_polysemy_review'],
  '仲有': ['continuative_existential_review'],
  '有': ['possession_existential_polysemy_review'],
  '可以': ['modal_gloss_review'],
  '返': ['return_directional_polysemy_review'],
  '畀': ['source_orthography_dialog_bei2_written_俾'],
  '先': ['temporal_order_particle_review'],
  '嘅': ['attributive_nominalizer_review'],
  '同': ['coordination_coverb_polysemy_review']
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
    formatBoundary: 'Source romanization without speaker prefixes is preserved.',
    sourceBlockBoundary: 'Vocabulary is an independent ordered source block; entries absent from the dialog remain source records and are flagged.',
    sourceOrthographyBoundary: 'The dialog form 俾 and glossary form 畀 are preserved independently and are not normalized into one source value.',
    sourceGlossBoundary: 'Particle, classifier, modal, and polysemy glosses are source pedagogical metadata, not Canto Span analysis.',
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
      { scope: 'vocabulary_block', type: 'vocabulary_dialog_surface_mismatch', status: 'source_preserved_review_required', note: `${absentVocabulary.length} vocabulary surfaces do not occur exactly in the dialog and remain separate source records.` },
      { scope: `${sourceId}-I008,${sourceId}-I030,${sourceId}-I076`, type: 'orthography_discrepancy', status: 'requires_orthography_review', note: 'The dialog writes the giving verb as 俾 while the vocabulary block lists 畀; both source forms and the shared bei2 romanization are preserved.' },
      { scope: 'vocabulary_glosses', type: 'source_function_and_polysemy_glosses', status: 'not_evidence', note: 'Glosses such as borrow/lend, [verb suffix], [sentence particle], can/may/possible, and with/and remain source metadata.' },
      { scope: `${sourceId}-I001,${sourceId}-I002,${sourceId}-I003,${sourceId}-I004`, type: 'arrival_presence_request_opening_review', status: 'route_to_parent_130', note: 'Locative A-not-A, directional entry, polite prefaces, borrowing-purpose chains, and identificational questions require separate review.' },
      { scope: `${sourceId}-I005,${sourceId}-I006,${sourceId}-I007,${sourceId}-I008,${sourceId}-I009,${sourceId}-I010,${sourceId}-I011`, type: 'borrowing_permission_classifier_review', status: 'route_to_parent_130', note: 'Borrowing requests, classifiers, 得唔得, nominal ellipsis, 就得, recipient 俾, gratitude formulae, and continuation questions remain contextual attestations.' },
      { scope: `${sourceId}-I012,${sourceId}-I013,${sourceId}-I014,${sourceId}-I015,${sourceId}-I016,${sourceId}-I017,${sourceId}-I018`, type: 'weather_location_return_review', status: 'route_to_parent_130', note: 'Weather predicates, progressive aspect, locative possession, resultatives, return-time questions, recipient order, and 唔使 require bounded analysis.' },
      { scope: `${sourceId}-I019,${sourceId}-I020,${sourceId}-I021,${sourceId}-I022,${sourceId}-I023,${sourceId}-I024`, type: 'cup_request_container_demonstrative_review', status: 'route_to_parent_130', note: 'Repeated requests, delimitative 用下, inferred purpose, container localizers, existentials, demonstrative echoes, and imperatives require separate review.' },
      { scope: `${sourceId}-I026,${sourceId}-I027,${sourceId}-I028,${sourceId}-I029,${sourceId}-I030,${sourceId}-I031,${sourceId}-I032`, type: 'tissue_quantity_formula_review', status: 'route_to_parent_130', note: 'Continuation fragments, 有冇, quantity classifiers, approximate numerals, 就夠, plural demonstratives, recipient 俾, and gratitude formulae remain contextual attestations.' },
      { scope: `${sourceId}-I034,${sourceId}-I035,${sourceId}-I036,${sourceId}-I037,${sourceId}-I038,${sourceId}-I040`, type: 'friendship_reciprocity_departure_review', status: 'route_to_parent_130', note: 'Identificational particles, next-time conditionals, 要…就 sequencing, modal predictions, departure announcements, reduplicated manner, and reminder complements require separate research.' }
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

fs.writeFileSync(`${root}/README.md`, `# Glossika Cantonese A1 dialog 008 corpus package\n\n- Source ID: \`${sourceId}\`\n- Title: 借嘢\n- English title: Borrowing Things\n- Source date: 2026-01-25\n- Gmail message: \`19bf72ba0f4339e0\`\n- Intake issue: #144\n- Work claim: #322\n- Records: 40 dialog turns + 40 vocabulary entries = 80\n- Source payload hash: \`${payloadHash}\`\n\n## Source fidelity\n\nThe interactive-dialog email format omits speaker-name prefixes from romanization lines. Cantonese, punctuation, romanization, vocabulary order, and glosses are preserved. The source contains no per-turn English translations; turn records retain \`english: null\`.\n\n## Source-block and orthography audit\n\n${absentVocabulary.length} vocabulary surfaces are absent from the dialog by exact string matching and remain immutable glossary records. The dialog writes the giving verb as \`俾\`, while the glossary lists \`畀\`; both source values and the shared \`bei2\` romanization are preserved and flagged.\n\n## Modular ownership\n\nCanonical runtime ownership comes from \`src/**\` and \`src/runtime-resources/**\`. Generated \`main.js\` is excluded.\n\nNo parser, lexicon, identity/status, survey, version, release, or deployment change is included.\n`);

fs.writeFileSync('docs/research/GLOSSIKA-YUEHK-A1-DLG-008-20260125-CORPUS-INGRESS.md', `# Glossika dialog 008 corpus ingress — 借嘢\n\n- Source ID: \`${sourceId}\`\n- Intake: #144\n- Work claim: #322\n- Parent research: #130\n- Status: source-preserving ingress complete; expert review required\n\n## Coverage\n\n- 40 ordered dialog turns\n- 40 ordered vocabulary entries\n- 80 total records\n- source payload hash: \`${payloadHash}\`\n- classifications: \`${JSON.stringify(classificationCounts)}\`\n- deduplication relations: \`${JSON.stringify(relationCounts)}\`\n- vocabulary surfaces absent from dialog: \`${absentVocabulary.length}\`\n\n## Source-format and discrepancy audit\n\nRomanization lines without speaker-name prefixes are preserved. Missing turn translations remain null. Vocabulary entries absent from the dialog remain source records. The dialog/glossary orthography difference \`俾\` versus \`畀\` is flagged without correction.\n\n## Research routing\n\nThe package routes presence and entry, borrowing and permission, classifier selection, weather and location, return timing, container existentials, quantities, recipient marking, formulae, reciprocity, and departure sequences to #130 without making grammar decisions.\n\n## Stop boundary\n\nNo parser test, grammar promotion, runtime source, generated \`main.js\`, version, survey, or release state changed.\n`);

console.log({ payloadHash, absentVocabularyCount: absentVocabulary.length, classificationCounts, relationCounts });
