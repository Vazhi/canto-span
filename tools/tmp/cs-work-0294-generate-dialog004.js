const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const sourceId = 'GLOSSIKA-YUEHK-A1-DLG-004-20251221';
const root = `data/pedagogical-corpus/glossika/${sourceId}`;
const metaPath = 'tools/tmp/cs-work-0294-dialog004-meta.json';
const eventParts = Array.from({ length: 4 }, (_, i) => `tools/tmp/cs-work-0294-dialog004-events.part${String(i).padStart(2, '0')}.tsv`);
const vocabParts = Array.from({ length: 2 }, (_, i) => `tools/tmp/cs-work-0294-dialog004-vocab.part${String(i).padStart(2, '0')}.tsv`);
const seedPaths = [metaPath, ...eventParts, ...vocabParts];

function stable(value) {
  if (Array.isArray(value)) return `[${value.map(stable).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stable(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}
function sha(text) { return crypto.createHash('sha256').update(text, 'utf8').digest('hex'); }
function countBy(values) { return Object.fromEntries([...values.reduce((m, v) => m.set(v, (m.get(v) || 0) + 1), new Map())].sort(([a], [b]) => a.localeCompare(b))); }
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
const eventRows = readRows(eventParts, 6);
const vocabRows = readRows(vocabParts, 4);
if (eventRows.length !== 44 || vocabRows.length !== 44) throw new Error(`Expected 44 dialog events and 44 vocabulary entries, found ${eventRows.length}/${vocabRows.length}`);

let stageDirectionOrdinal = 0;
const eventRecords = eventRows.map(([eventOrdinalText, itemType, turnText, speaker, sourceLine, romanizationLine], index) => {
  const eventOrdinal = Number(eventOrdinalText);
  if (eventOrdinal !== index + 1) throw new Error(`Event order mismatch at ${index + 1}`);
  if (!['dialog_turn', 'stage_direction'].includes(itemType)) throw new Error(`Unexpected event type ${itemType}`);
  if (itemType === 'dialog_turn') {
    const turn = Number(turnText);
    if (!turn || !speaker || !sourceLine.startsWith(`${speaker}: `)) throw new Error(`Invalid spoken event ${eventOrdinal}`);
    if (!romanizationLine.startsWith('/') || !romanizationLine.endsWith('/')) throw new Error(`Missing Jyutping delimiters at event ${eventOrdinal}`);
    return {
      itemType,
      eventOrdinal,
      turn,
      speaker,
      source: {
        sourceLine,
        traditional: sourceLine.slice(`${speaker}: `.length),
        jyutpingLine: romanizationLine,
        english: null
      }
    };
  }
  stageDirectionOrdinal += 1;
  if (turnText || speaker || !sourceLine || !romanizationLine || romanizationLine.startsWith('/')) throw new Error(`Invalid stage direction ${eventOrdinal}`);
  return {
    itemType,
    eventOrdinal,
    stageDirectionOrdinal,
    source: {
      sourceLine,
      traditional: sourceLine,
      romanizationLine,
      english: null
    }
  };
});
const spokenTurns = eventRecords.filter((record) => record.itemType === 'dialog_turn');
if (spokenTurns.length !== 41 || stageDirectionOrdinal !== 3) throw new Error(`Expected 41 spoken turns and 3 stage directions, found ${spokenTurns.length}/${stageDirectionOrdinal}`);
if (spokenTurns.some((record, index) => record.turn !== index + 1)) throw new Error('Spoken turn order is not contiguous');
const expectedSpeakers = ['阿輝','阿珊','阿輝','阿珊','阿輝','阿珊','阿輝','阿珊','阿輝','阿珊','阿輝','阿珊','阿輝','阿珊','老細','阿輝','老細','阿輝','老細','阿輝','老細','阿輝','老細','阿輝','老細','阿珊','老細','阿珊','老細','阿珊','老細','阿珊','老細','阿強','老細','阿強','老細','阿強','老細','全部人','老細'];
if (spokenTurns.some((record, index) => record.speaker !== expectedSpeakers[index])) throw new Error('Speaker sequence mismatch');

const vocabularyRecords = vocabRows.map(([ordinalText, traditional, jyutping, english], index) => {
  const vocabularyOrdinal = Number(ordinalText);
  if (vocabularyOrdinal !== index + 1) throw new Error(`Vocabulary order mismatch at ${index + 1}`);
  return { itemType: 'lexical_entry', vocabularyOrdinal, source: { traditional, jyutping, english } };
});
const records = [...eventRecords, ...vocabularyRecords];
if (records.length !== 88) throw new Error(`Expected 88 source records, found ${records.length}`);
const payloadHash = `sha256:${sha(stable(records.map((record) => record.source)))}`;
const items = records.map((record, index) => ({
  id: `${sourceId}-I${String(index + 1).padStart(3, '0')}`,
  ordinal: index + 1,
  itemType: record.itemType,
  ...(record.eventOrdinal ? { eventOrdinal: record.eventOrdinal } : {}),
  ...(record.turn ? { turn: record.turn, speaker: record.speaker } : {}),
  ...(record.stageDirectionOrdinal ? { stageDirectionOrdinal: record.stageDirectionOrdinal } : {}),
  ...(record.vocabularyOrdinal ? { vocabularyOrdinal: record.vocabularyOrdinal } : {}),
  source: record.source,
  sourceHash: `sha256:${sha(stable(record.source))}`
}));

const tokenPairs = require('../../src/runtime-resources/lexicon/token-lexicon');
const tokenMap = new Map(tokenPairs);
const tokenRoot = 'src/runtime-resources/lexicon/token-lexicon';
const tokenFiles = fs.readdirSync(tokenRoot).filter((file) => file.endsWith('.js')).map((file) => path.join(tokenRoot, file)).sort();
const tokenText = Object.fromEntries(tokenFiles.map((file) => [file, fs.readFileSync(file, 'utf8')]));
const canonicalFiles = listTextFiles(['src/', 'src/runtime-resources/'], [root + '/', 'tools/tmp/cs-work-0294-', '.github/workflows/cs-work-0294-']);
const supportingFiles = listTextFiles(['tests/', 'test-data/', 'data/', 'docs/', 'grammar/', 'config/'], [root + '/', 'tools/tmp/cs-work-0294-', '.github/workflows/cs-work-0294-']);
if ([...canonicalFiles, ...supportingFiles].some((entry) => entry.path === 'main.js')) throw new Error('Generated main.js leaked into ownership scan');

const naturalnessTurns = new Set([2, 5, 9, 10, 13, 17, 20, 21, 23, 26, 27, 33, 34, 35, 36, 37, 38]);
const constructionRoutes = {
  2: ['temporal_fragment_question', 'negative_completion_mei6'],
  3: ['existential_have_task_expression'],
  5: ['pickup_school_serial_or_purpose_chain'],
  9: ['zung6_mei6_completion'],
  10: ['reassurance_particle_gaa3', 'communication_recipient_omission'],
  12: ['imperative_heoi3_laa1'],
  13: ['departure_order_zau2_sin1', 'change_particle_laa3'],
  15: ['motion_goal_wh_question'],
  17: ['temporal_motion_fragment', 'why_fragment'],
  20: ['negative_necessity_fragment'],
  21: ['contextual_comparative_di1'],
  23: ['degree_adverb_imperative', 'negative_imperative'],
  26: ['additive_dou1', 'departure_request'],
  27: ['additive_dou1_question', 'why_question'],
  30: ['clock_time_expression'],
  33: ['collective_subject', 'saai3_with_evaluative_predicate'],
  34: ['potential_a_not_a_question'],
  35: ['why_fragment', 'existential_task_fragment'],
  36: ['duration_after_perfective', 'meeting_event_duration'],
  37: ['meeting_completion_predicate', 'change_particle_laa1'],
  38: ['finally_completion_fragment'],
  39: ['permission_modal', 'change_particle_laa3'],
  40: ['collective_speaker_label'],
  41: ['formulaic_work_acknowledgment']
};
const lexicalFlags = {
  '晒': ['not_present_as_standalone_vocabulary_but_source_claimed'],
  '多謝晒': ['formula_and_saai3_review'],
  '走先': ['word_order_and_discourse_review'],
  '仔女': ['collective_kin_term_gloss_review'],
  '站起身': ['result_directional_compositionality_review'],
  '出咗去': ['directional_aspect_sequence_review'],
  '辛苦': ['formulaic_and_predicative_gloss_review'],
  '剩返': ['verb_sequence_and_residual_state_review'],
  '可唔可以': ['potential_or_permission_a_not_a_review'],
  '開咗': ['context_bound_duration_gloss_review'],
  '三個鐘': ['duration_classifier_review'],
  '全部人': ['collective_np_review']
};

const reviewRecords = [];
const crosswalkItems = [];
const eventItems = items.filter((item) => item.itemType !== 'lexical_entry');
const turnItems = items.filter((item) => item.itemType === 'dialog_turn');
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
  if (item.itemType === 'stage_direction') reviewFlags.push('stage_direction_context');
  for (const route of constructionRoutes[item.turn] || []) reviewFlags.push(route);
  for (const flag of lexicalFlags[surface] || []) reviewFlags.push(flag);
  if (item.itemType !== 'lexical_entry') reviewFlags.push('source_event_translation_not_provided');
  let ingressClassification;
  if (item.itemType === 'dialog_turn' && naturalnessTurns.has(item.turn)) ingressClassification = 'naturalness_review_candidate';
  else if (item.itemType === 'lexical_entry' && runtimeEntry) ingressClassification = 'lexical_only_attestation';
  else if (deduplicationRelation === 'exact_duplicate_candidate') ingressClassification = 'exact_duplicate';
  else if (deduplicationRelation === 'normalized_duplicate_candidate') ingressClassification = 'normalized_duplicate';
  else ingressClassification = 'new_attestation';

  let adjacency = null;
  if (item.itemType !== 'lexical_entry') {
    const eventIndex = eventItems.findIndex((candidate) => candidate.id === item.id);
    adjacency = {
      previousEventId: eventIndex > 0 ? eventItems[eventIndex - 1].id : null,
      nextEventId: eventIndex < eventItems.length - 1 ? eventItems[eventIndex + 1].id : null,
      previousEventType: eventIndex > 0 ? eventItems[eventIndex - 1].itemType : null,
      nextEventType: eventIndex < eventItems.length - 1 ? eventItems[eventIndex + 1].itemType : null,
      previousTurnId: null,
      nextTurnId: null,
      previousSpeaker: null,
      nextSpeaker: null
    };
    if (item.itemType === 'dialog_turn') {
      const turnIndex = turnItems.findIndex((candidate) => candidate.id === item.id);
      adjacency.previousTurnId = turnIndex > 0 ? turnItems[turnIndex - 1].id : null;
      adjacency.nextTurnId = turnIndex < turnItems.length - 1 ? turnItems[turnIndex + 1].id : null;
      adjacency.previousSpeaker = turnIndex > 0 ? turnItems[turnIndex - 1].speaker : null;
      adjacency.nextSpeaker = turnIndex < turnItems.length - 1 ? turnItems[turnIndex + 1].speaker : null;
    }
  }

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
    adjacency,
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
    dialogEventCount: eventRecords.length,
    turnCount: spokenTurns.length,
    stageDirectionCount: stageDirectionOrdinal,
    vocabularyCount: vocabularyRecords.length,
    itemTypeCounts: countBy(items.map((item) => item.itemType)),
    sourcePayloadHash: payloadHash,
    sourcePayloadHashPolicy: 'SHA-256 of canonical key-sorted JSON for the ordered source-field array.',
    eventEnglishPolicy: 'The source email provides no English translation for spoken turns or stage directions; each event preserves english=null.'
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
  summary: { recordCount: 88, dialogEventCount: 44, turnCount: 41, stageDirectionCount: 3, vocabularyCount: 44, classificationCounts, relationCounts },
  items: crosswalkItems
};
const review = {
  schema: 'canto-span-pedagogical-dialog-review-v1',
  sourceId,
  sourcePayloadHash: payloadHash,
  policy: {
    sourceLayer: 'source.json is immutable.',
    translationBoundary: 'Missing event translations are preserved and must not be generated during ingress.',
    stageDirectionBoundary: 'Narrated stage directions are source context records, not spoken turns or grammar proof.',
    sourceClaimBoundary: 'The source notes on 晒, 走先, duration 咗, 仔女, and 剩返 are pedagogical claims requiring independent verification.',
    deduplicationBoundary: 'Exact and normalized repository matches are candidates until reviewed.',
    evidenceBoundary: 'Dialog adjacency and pedagogical attestation do not establish productivity, construction identity, register, formula status, or parser behavior.'
  },
  summary: {
    recordCount: 88,
    reviewedCount: 0,
    unreviewedCount: 88,
    classificationCounts,
    relationCounts,
    knownSourceAlerts: [
      { scope: 'all_dialog_events', type: 'missing_event_english_translation', status: 'source_omission_preserved', note: 'The email supplies Cantonese and Jyutping/romanization but no event-level English translations.' },
      { scope: 'stage_directions', type: 'narrative_context_preserved', status: 'source_context_only', note: 'Three narrated transitions are preserved in event order and excluded from spoken-turn counts.' },
      { scope: 'source_notes', type: 'source_grammar_and_confidence_claims', status: 'not_evidence', note: 'Claims about 晒, 走先, duration 咗, 仔女, 剩返, and Confidence Level: High remain metadata rather than Canto Span adjudication.' },
      { scope: `${sourceId}-I002,${sourceId}-I009,${sourceId}-I018`, type: 'completion_and_fragment_review', status: 'route_to_parent_130', note: '而家?, 未完/仲未完, and temporal-motion fragments require separate completion, discourse, and particle analysis.' },
      { scope: `${sourceId}-I005,${sourceId}-I019`, type: 'serial_or_purpose_chain_review', status: 'route_to_parent_130', note: '接仔女放學 is preserved without deciding serial, purpose, or lexicalized-event structure.' },
      { scope: `${sourceId}-I013,${sourceId}-I034`, type: 'departure_order_review', status: 'route_to_parent_130', note: '走先 requires discourse-order and particle analysis; the source Mandarin comparison is not adopted.' },
      { scope: `${sourceId}-I035`, type: 'saai3_formula_review', status: 'route_to_parent_130', note: '辛苦晒 requires formulaic, scalar, exhaustive, and particle analysis rather than the source generalization.' },
      { scope: `${sourceId}-I037,${sourceId}-I038,${sourceId}-I039,${sourceId}-I040,${sourceId}-I041,${sourceId}-I042,${sourceId}-I043,${sourceId}-I044`, type: 'meeting_completion_sequence_review', status: 'route_to_parent_130', note: 'Permission, fragments, duration, completion, group speech, and formulaic closing remain contextual attestations only.' }
    ]
  },
  records: reviewRecords
};

fs.mkdirSync(root, { recursive: true });
fs.mkdirSync('docs/research', { recursive: true });
fs.writeFileSync(`${root}/source.json`, JSON.stringify(source, null, 2) + '\n');
fs.writeFileSync(`${root}/crosswalk.json`, JSON.stringify(crosswalk, null, 2) + '\n');
fs.writeFileSync(`${root}/review.json`, JSON.stringify(review, null, 2) + '\n');

const header = ['id','ordinal','item_type','event_ordinal','turn','speaker','stage_direction_ordinal','vocabulary_ordinal','source_cantonese','source_jyutping_or_romanization','source_english','source_hash','previous_event_id','next_event_id','previous_turn_id','next_turn_id','deduplication_relation','ingress_classification','runtime_lexical_owners','canonical_exact_owners','supporting_exact_owners','review_flags','review_state'];
const rows = items.map((item, index) => {
  const record = reviewRecords[index];
  const walk = crosswalkItems[index];
  const sourceRomanization = item.source.jyutpingLine || item.source.romanizationLine || item.source.jyutping || '';
  const sourceEnglish = item.source.english === null ? '' : item.source.english || '';
  return [item.id,item.ordinal,item.itemType,item.eventOrdinal||'',item.turn||'',item.speaker||'',item.stageDirectionOrdinal||'',item.vocabularyOrdinal||'',item.source.traditional,sourceRomanization,sourceEnglish,item.sourceHash,walk.adjacency?.previousEventId||'',walk.adjacency?.nextEventId||'',walk.adjacency?.previousTurnId||'',walk.adjacency?.nextTurnId||'',record.deduplicationRelation,record.ingressClassification,(walk.runtimeLexicalOwner?.owners||[]).join('|'),walk.canonicalExactOwners.join('|'),walk.supportingExactOwners.join('|'),record.reviewFlags.join('|'),meta.ingress.reviewState].map(tsv).join('\t');
});
fs.writeFileSync(`${root}/items.tsv`, [header.join('\t'), ...rows].join('\n') + '\n');

fs.writeFileSync(`${root}/README.md`, `# Glossika Cantonese A1 dialog 004 corpus package\n\n- Source ID: \`${sourceId}\`\n- Title: 想走但唔想失禮\n- Source date: 2025-12-21\n- Gmail message: \`19b429ac74c22911\`\n- Intake issue: #140\n- Work claim: #294\n- Records: 41 spoken turns + 3 stage directions + 44 vocabulary entries = 88\n- Source payload hash: \`${payloadHash}\`\n\n## Source fidelity\n\nSpeaker labels, Cantonese, spacing, punctuation, Jyutping lines, stage-direction romanization, vocabulary glosses, scenario, notes, and order are preserved. The source contains no event-level English translations; dialog-event records retain \`english: null\`.\n\n## Adjacency\n\nAll 44 dialog events preserve previous/next event links. Spoken turns additionally preserve previous/next spoken-turn links across intervening stage directions.\n\n## Modular ownership\n\nCanonical runtime ownership comes from \`src/**\` and \`src/runtime-resources/**\`. Generated \`main.js\` is excluded.\n\nNo parser, lexicon, identity/status, survey, version, release, or deployment change is included.\n`);

fs.writeFileSync('docs/research/GLOSSIKA-YUEHK-A1-DLG-004-20251221-CORPUS-INGRESS.md', `# Glossika dialog 004 corpus ingress — 想走但唔想失禮\n\n- Source ID: \`${sourceId}\`\n- Intake: #140\n- Work claim: #294\n- Parent research: #130\n- Status: source-preserving ingress complete; expert review required\n\n## Coverage\n\n- 41 ordered spoken turns\n- 3 ordered stage directions\n- 44 ordered vocabulary entries\n- 88 total records\n- source payload hash: \`${payloadHash}\`\n- classifications: \`${JSON.stringify(classificationCounts)}\`\n- deduplication relations: \`${JSON.stringify(relationCounts)}\`\n\n## Source omissions and claims\n\nThe email provides no event-level English translations. Source-authored claims about 晒, 走先, duration 咗, 仔女, 剩返, and high confidence remain unverified metadata.\n\n## Research routing\n\nThe package routes completion, fragments, serial/purpose chains, departure order, comparison, imperatives, permission, duration, group speech, formulae, and completion sequences to #130 without making grammar decisions.\n\n## Stop boundary\n\nNo parser test, grammar promotion, runtime source, generated \`main.js\`, version, survey, or release state changed.\n`);

console.log({ payloadHash, classificationCounts, relationCounts });
