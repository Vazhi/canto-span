const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const sourceId = 'GLOSSIKA-YUEHK-A1-DLG-003-20251214';
const root = `data/pedagogical-corpus/glossika/${sourceId}`;
const metaPath = 'tools/tmp/cs-work-0292-dialog003-meta.json';
const turnParts = Array.from({ length: 4 }, (_, i) => `tools/tmp/cs-work-0292-dialog003-turns.part${String(i).padStart(2, '0')}.tsv`);
const vocabParts = Array.from({ length: 2 }, (_, i) => `tools/tmp/cs-work-0292-dialog003-vocab.part${String(i).padStart(2, '0')}.tsv`);
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
  return Object.fromEntries([...values.reduce((m, v) => m.set(v, (m.get(v) || 0) + 1), new Map())].sort(([a], [b]) => a.localeCompare(b)));
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
if (turnRows.length !== 50 || vocabRows.length !== 46) throw new Error(`Expected 50 turns and 46 vocabulary entries, found ${turnRows.length}/${vocabRows.length}`);

const turnRecords = turnRows.map(([turnText, speaker, sourceLine, jyutpingLine], index) => {
  const turn = Number(turnText);
  const expected = index + 1;
  const expectedSpeaker = expected % 2 === 1 ? '阿明' : '小紅';
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
const canonicalFiles = listTextFiles(['src/', 'src/runtime-resources/'], [root + '/', 'tools/tmp/cs-work-0292-', '.github/workflows/cs-work-0292-']);
const supportingFiles = listTextFiles(['tests/', 'test-data/', 'data/', 'docs/', 'grammar/', 'config/'], [root + '/', 'tools/tmp/cs-work-0292-', '.github/workflows/cs-work-0292-']);
if ([...canonicalFiles, ...supportingFiles].some((entry) => entry.path === 'main.js')) throw new Error('Generated main.js leaked into ownership scan');

const naturalnessTurns = new Set([5, 7, 11, 14, 16, 18, 20, 21, 26, 29, 30, 32, 39, 43, 45, 49]);
const constructionRoutes = {
  4: ['distributive_mui5_dou1'],
  5: ['alternative_question_ding6'],
  7: ['negative_experiential_mei6_gwo3'],
  11: ['instrumental_jung6', 'mixing_verb_selection'],
  14: ['instrument_subject_or_topic', 'potential_comparative_dak1'],
  16: ['result_dou3', 'similative_hou2ci5_gam3', 'zau6_dak1_laa3'],
  18: ['classifier_reduplication'],
  20: ['similative_measure', 'zau6_dak1'],
  21: ['a_not_a_question', 'sentence_final_gaa3'],
  22: ['modal_scope_dou1'],
  26: ['nominal_ellipsis_ge3'],
  28: ['postposed_approximation_zo2jau6'],
  29: ['perfective_mei6_question'],
  30: ['condition_result_zau6', 'change_particle_laa3'],
  32: ['potential_result_sik6_dak1', 'condition_result_zau6'],
  33: ['cultural_explanation_question', 'sentence_final_gaa3'],
  36: ['nominal_predication_ge3', 'cultural_semantics'],
  39: ['inferential_fragment_question'],
  42: ['relative_temporal_phrase'],
  43: ['motion_goal_or_omitted_coverb'],
  45: ['offer_question_without_overt_particle', 'deictic_motion_lai4'],
  46: ['universal_saai3', 'change_particle_laa3'],
  49: ['activity_chain_fragment', 'evaluative_fragment']
};
const lexicalFlags = {
  '屋企': ['home_family_gloss_polysemy'],
  '整': ['source_colloquiality_claim_not_adopted'],
  '定': ['alternative_question_function_review'],
  '未試過': ['compositionality_and_aspect_review'],
  '粒': ['classifier_compatibility_review'],
  '左右': ['postposed_approximation_review'],
  '圓': ['lexical_homophony_cultural_review'],
  '團圓': ['lexical_cultural_review'],
  '聚埋': ['inclusive_particle_and_event_structure_review'],
  '前一日': ['temporal_compositionality_review'],
  '到時見': ['formula_and_compositionality_review']
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
  const nextTurnId = item.itemType === 'dialog_turn' && item.turn < 50 ? `${sourceId}-I${String(item.turn + 1).padStart(3, '0')}` : null;
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
      nextSpeaker: item.turn < 50 ? turnRecords[item.turn].speaker : null
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
  summary: { recordCount: 96, turnCount: 50, vocabularyCount: 46, classificationCounts, relationCounts },
  items: crosswalkItems
};
const review = {
  schema: 'canto-span-pedagogical-dialog-review-v1',
  sourceId,
  sourcePayloadHash: payloadHash,
  policy: {
    sourceLayer: 'source.json is immutable.',
    translationBoundary: 'Missing per-turn translations are preserved and must not be generated during ingress.',
    sourceClaimBoundary: 'The source notes on 整, 好似...咁, classifier reduplication, 定, and 左右 are pedagogical claims requiring independent verification.',
    deduplicationBoundary: 'Exact and normalized repository matches are candidates until reviewed.',
    evidenceBoundary: 'Dialog adjacency and pedagogical attestation do not establish productivity, construction identity, register, cultural generalization, or parser status.'
  },
  summary: {
    recordCount: 96,
    reviewedCount: 0,
    unreviewedCount: 96,
    classificationCounts,
    relationCounts,
    knownSourceAlerts: [
      { scope: 'all_dialog_turns', type: 'missing_turn_english_translation', status: 'source_omission_preserved', note: 'The email supplies Cantonese and Jyutping but no per-turn English translations.' },
      { scope: 'source_notes', type: 'source_grammar_and_confidence_claims', status: 'not_evidence', note: 'The source-authored claims and Confidence Level: High remain metadata rather than Canto Span adjudication.' },
      { scope: `${sourceId}-I005`, type: 'alternative_question_review', status: 'route_to_parent_130', note: '自己整定買㗎 requires alternative-question and particle analysis.' },
      { scope: `${sourceId}-I007`, type: 'negative_experiential_review', status: 'route_to_parent_130', note: '未試過整 preserves negation, experiential aspect, and complement structure without promotion.' },
      { scope: `${sourceId}-I014,${sourceId}-I016,${sourceId}-I020`, type: 'comparison_result_review', status: 'route_to_parent_130', note: '得, 到, 好似...咁, and 就得 sequences require separate comparison, result, potential, and particle analysis.' },
      { scope: `${sourceId}-I018`, type: 'classifier_reduplication_review', status: 'route_to_parent_130', note: '粒粒 is preserved without accepting the source plurality/distributivity generalization.' },
      { scope: `${sourceId}-I026`, type: 'nominal_ellipsis_review', status: 'route_to_parent_130', note: '整芝麻嘅 requires ellipsis and nominalization analysis.' },
      { scope: `${sourceId}-I029,${sourceId}-I030,${sourceId}-I032`, type: 'completion_condition_potential_review', status: 'route_to_parent_130', note: '熟咗未, 浮起就熟喇, and 就食得喇 require bounded aspect, condition, result, and potential analysis.' },
      { scope: `${sourceId}-I033,${sourceId}-I034,${sourceId}-I036,${sourceId}-I037`, type: 'cultural_explanation_review', status: 'source_context_only', note: 'Winter Solstice symbolism and 圓/團圓 relations are source cultural content, not grammar evidence.' },
      { scope: `${sourceId}-I039,${sourceId}-I043,${sourceId}-I045,${sourceId}-I049`, type: 'fragment_and_motion_review', status: 'route_to_parent_130', note: 'Inferential fragments, motion-goal questions, offer questions, and evaluative fragments require contextual review.' }
    ]
  },
  records: reviewRecords
};

fs.mkdirSync(root, { recursive: true });
fs.mkdirSync('docs/research', { recursive: true });
fs.writeFileSync(`${root}/source.json`, JSON.stringify(source, null, 2) + '\n');
fs.writeFileSync(`${root}/crosswalk.json`, JSON.stringify(crosswalk, null, 2) + '\n');
fs.writeFileSync(`${root}/review.json`, JSON.stringify(review, null, 2) + '\n');

const header = ['id', 'ordinal', 'item_type', 'turn', 'speaker', 'vocabulary_ordinal', 'source_cantonese', 'source_jyutping', 'source_english', 'source_hash', 'previous_turn_id', 'next_turn_id', 'deduplication_relation', 'ingress_classification', 'runtime_lexical_owners', 'canonical_exact_owners', 'supporting_exact_owners', 'review_flags', 'review_state'];
const rows = items.map((item, index) => {
  const record = reviewRecords[index];
  const walk = crosswalkItems[index];
  const sourceJyutping = item.source.jyutpingLine || item.source.jyutping || '';
  const sourceEnglish = item.source.english === null ? '' : item.source.english || '';
  return [item.id, item.ordinal, item.itemType, item.turn || '', item.speaker || '', item.vocabularyOrdinal || '', item.source.traditional, sourceJyutping, sourceEnglish, item.sourceHash, walk.adjacency?.previousTurnId || '', walk.adjacency?.nextTurnId || '', record.deduplicationRelation, record.ingressClassification, (walk.runtimeLexicalOwner?.owners || []).join('|'), walk.canonicalExactOwners.join('|'), walk.supportingExactOwners.join('|'), record.reviewFlags.join('|'), meta.ingress.reviewState].map(tsv).join('\t');
});
fs.writeFileSync(`${root}/items.tsv`, [header.join('\t'), ...rows].join('\n') + '\n');

fs.writeFileSync(`${root}/README.md`, `# Glossika Cantonese A1 dialog 003 corpus package\n\n- Source ID: \`${sourceId}\`\n- Title: 同朋友整湯圓慶祝冬至\n- Source date: 2025-12-14\n- Gmail message: \`19b1e8e465b300ea\`\n- Intake issue: #139\n- Work claim: #292\n- Records: 50 dialog turns + 46 vocabulary entries = 96\n- Source payload hash: \`${payloadHash}\`\n\n## Source fidelity\n\nSpeaker labels, Cantonese, spacing, punctuation, Jyutping lines, vocabulary glosses, scenario, notes, and order are preserved. The source contains no per-turn English translations; turn records retain \`english: null\`.\n\n## Modular ownership\n\nCanonical runtime ownership comes from \`src/**\` and \`src/runtime-resources/**\`. Generated \`main.js\` is excluded.\n\n## Files\n\n- \`source.json\`: immutable ordered source records.\n- \`crosswalk.json\`: adjacency, modular owners, and deduplication candidates.\n- \`review.json\`: review classifications and source alerts.\n- \`items.tsv\`: flat review rendering.\n\nNo parser, lexicon, identity/status, survey, version, release, or deployment change is included.\n`);

fs.writeFileSync('docs/research/GLOSSIKA-YUEHK-A1-DLG-003-20251214-CORPUS-INGRESS.md', `# Glossika dialog 003 corpus ingress — 同朋友整湯圓慶祝冬至\n\n- Source ID: \`${sourceId}\`\n- Intake: #139\n- Work claim: #292\n- Parent research: #130\n- Status: source-preserving ingress complete; expert review required\n\n## Coverage\n\n- 50 ordered dialog turns\n- 46 ordered vocabulary entries\n- 96 total records\n- source payload hash: \`${payloadHash}\`\n- classifications: \`${JSON.stringify(classificationCounts)}\`\n- deduplication relations: \`${JSON.stringify(relationCounts)}\`\n\n## Adjacency and source omissions\n\nEach turn records its preceding and following source turn. The email provides no turn-level English translations. Source-authored claims about 整, 好似...咁, 粒粒, 定, 左右, cultural meaning, and confidence remain unverified metadata.\n\n## Research routing\n\nThe package routes alternative questions, negative experiential aspect, comparisons, result and potential structures, classifier reduplication, nominal ellipsis, completion questions, conditional/result sequences, fragments, and motion-goal questions to #130 without making grammar decisions.\n\n## Stop boundary\n\nNo parser test, grammar promotion, runtime source, generated \`main.js\`, version, survey, or release state changed.\n`);

console.log({ payloadHash, classificationCounts, relationCounts });
