"use strict";

module.exports = function createWrapCore(dependencies = {}) {
  const {
    aNotAQuestionFallback,
    acceptabilityANotAQuestionFallback,
    availabilityPredicateWrapCoreFallback,
    ambiguousNeedsContextCandidate,
    approximateQuantityFallback,
    bareNumeralObjectMalformedCandidate,
    completionQuestionFallback,
    completionQuestionWithPerfectiveMarkerFallback,
    completionThenClauseRelation,
    completionThenStandaloneWalkResolution,
    conditionalGeWaaClauseFallback,
    coordinatedNPFragmentFallback,
    coordinatedSubjectModalPredicateClauseFallback,
    copularANotAQuestionFallback,
    copularExplanatoryCompositionFallback,
    copularIdentificationFrameFallback,
    cognitionContentFrameFallback,
    cognitionStatementFallback,
    coverbFrameFallback,
    cp021bBoundaryReviewFallback,
    desiderativeANotAQuestionFallback,
    desiderativeVPWrapCoreFallback,
    directionalCompositionFallback,
    downwardMotionPredicateFallback,
    durativeAspectCompositionFallback,
    existentialLocationPresentationalFallback,
    existentialQuestionWithVpMalformedCandidate,
    existentialWhQuestionFallback,
    experientialQuestionBoundaryFallback,
    experientialYesNoQuestionFallback,
    fragmentQuestionFallback,
    hasSurface,
    impersonalEnvironmentalClauseFallback,
    inlineANotAQuestionFallback,
    incompatibleAspectCompositionMalformedCandidate,
    incompleteContextualPredicateCandidate,
    incompleteLocativeNeedsContextCandidate,
    incompleteModalNeedsContextCandidate,
    incompletePotentialResultCandidate,
    incompleteProhibitiveNeedsContextCandidate,
    incompleteRestrictiveFocusBoundaryCandidate,
    intendedFunctionRelationFallback,
    interiorExistentialFrameFallback,
    interestDomainExistentialQuestionFallback,
    leaveTakingFormulaFallback,
    lexicalGiveRelationFallback,
    locativePostureVPFallback,
    locativeWhQuestionFallback,
    mandarinNegatorNeedsContextCandidate,
    mandarinReviewNeedsContextCandidate,
    mannerAdverbialVPFallback,
    modalPredicateWrapCoreFallback,
    motionEventSpatialFallback,
    namingSelfIntroductionFrameFallback,
    negativeCognitionFragmentFallback,
    nominalMeasurePredicateFallback,
    opinionSeemingFallback,
    opinionStanceFrameFallback,
    overtObjectSelectionReviewCandidate,
    passivePermissiveRelationFallback,
    perfectiveResultCompositionFallback,
    permissionANotAQuestionFallback,
    politePathImperativeFallback,
    politeRequestAdjustmentFallback,
    polarQuestionFrameFallback,
    possessiveFragmentAnswerCandidate,
    postThemeParticipantRelationFallback,
    postverbalZoPerfectiveFromRawNodes,
    postverbalZoPerfectiveFromWrappedNodes,
    potentialResultComplementFallback,
    potentialResultVPFallback,
    predicateOmissionCandidate,
    preferenceVPWrapCoreFallback,
    progressiveWhObjectQuestionFallback,
    prohibitiveImperativeFallback,
    protectedOpaqueFormulaPassthrough,
    purposeLinkingMotionFallback,
    rawPreferenceTemplateFallback,
    reportedSpeechFrameFallback,
    reportedSpeechSurfaceFallback,
    restorativeRepetitiveComplementFallback,
    scalarEvaluationFallback,
    scalarValueQuestionFallback,
    sourceLinkedDegreeMannerModifiedVPFallback,
    sourceLinkedIntentionFrameFallback,
    sourceLinkedPreferenceVPFallback,
    sourceLinkedPriorityMarkerClauseFallback,
    sourceMotionClauseFallback,
    subjectLocativePredicateClauseFallback,
    subjectStativePredicateClauseFallback,
    suggestionQuestionFallback,
    templateConstructionFor,
    temporalClauseFallback,
    topicCommentFallback,
    transitionMotionPredicateFallback,
    transparentDiscourseFormulaFallback,
    wrapAgreementResponseSubspans,
    wrapCategorySubspans,
    wrapChangeIntoPredicateSubspans,
    wrapDirectionalMotionSubspans,
    wrapNegatedVPSubspans,
    wrapPermissionAcceptabilitySubspans,
    wrapPossessiveClassifierNPSubspans,
    wrapPredicate,
    wrapPriorityMarkerSubspans,
    wrapSerialPurposeTemplateSubspans,
    wrapSerialVerbPurposeSubspans,
  } = dependencies;

function wrapCore(core) {
  if (!core.length) return core;

  const ambiguousNeedsContext = ambiguousNeedsContextCandidate(core);
  if (ambiguousNeedsContext) return [ambiguousNeedsContext];

  const fragmentQuestion = fragmentQuestionFallback(core);
  if (fragmentQuestion) return [fragmentQuestion];

  const conditionalClause = conditionalGeWaaClauseFallback(core);
  if (conditionalClause) return [conditionalClause];

  // Preserve frozen CP021B double-marker, 將, and fronting boundaries before
  // broad VP/relative-NP composition can invent an unrelated inner analysis.
  const earlyCp021bBoundaryReviewSpan = cp021bBoundaryReviewFallback(core);
  if (earlyCp021bBoundaryReviewSpan) return [earlyCp021bBoundaryReviewSpan];

  const environmentalClause = impersonalEnvironmentalClauseFallback(core);
  if (environmentalClause) return [environmentalClause];

  const downwardMotionSpan = downwardMotionPredicateFallback(core);
  if (downwardMotionSpan) return [downwardMotionSpan];

  const existentialLocationPresentational = existentialLocationPresentationalFallback(core);
  if (existentialLocationPresentational) return [existentialLocationPresentational];

  const nominalMeasurePredicate = nominalMeasurePredicateFallback(core);
  if (nominalMeasurePredicate) return [nominalMeasurePredicate];

  const availabilityPredicateSpan = availabilityPredicateWrapCoreFallback(core);
  if (availabilityPredicateSpan) return availabilityPredicateSpan;

  const motionEventSpatial = motionEventSpatialFallback(core);
  if (motionEventSpatial) return [motionEventSpatial];

  const incompatibleAspectComposition = incompatibleAspectCompositionMalformedCandidate(core);
  if (incompatibleAspectComposition) return [incompatibleAspectComposition];

  const durativeAspectComposition = durativeAspectCompositionFallback(core);
  if (durativeAspectComposition) return [durativeAspectComposition];

  const perfectiveResultComposition = perfectiveResultCompositionFallback(core);
  if (perfectiveResultComposition) return [perfectiveResultComposition];

  const copularExplanatoryComposition = copularExplanatoryCompositionFallback(core);
  if (copularExplanatoryComposition) return [copularExplanatoryComposition];

  const directionalComposition = directionalCompositionFallback(core);
  if (directionalComposition) return [directionalComposition];

  const restorativeRepetitiveComposition = restorativeRepetitiveComplementFallback(core);
  if (restorativeRepetitiveComposition) return [restorativeRepetitiveComposition];

  const purposeLinkingMotion = purposeLinkingMotionFallback(core);
  if (purposeLinkingMotion) return [purposeLinkingMotion];

  const bareNumeralMalformed = bareNumeralObjectMalformedCandidate(core);
  if (bareNumeralMalformed) return [bareNumeralMalformed];

  const existentialVpMalformed = existentialQuestionWithVpMalformedCandidate(core);
  if (existentialVpMalformed) return [existentialVpMalformed];

  const mandarinNegatorNeedsContext = mandarinNegatorNeedsContextCandidate(core);
  if (mandarinNegatorNeedsContext) return [mandarinNegatorNeedsContext];

  const incompleteProhibitiveNeedsContext = incompleteProhibitiveNeedsContextCandidate(core);
  if (incompleteProhibitiveNeedsContext) return [incompleteProhibitiveNeedsContext];

  const incompleteRestrictiveFocusBoundary = incompleteRestrictiveFocusBoundaryCandidate(core);
  if (incompleteRestrictiveFocusBoundary) return [incompleteRestrictiveFocusBoundary];

  const typedPredicateOmission = predicateOmissionCandidate(core);
  if (typedPredicateOmission) return [typedPredicateOmission];

  const incompleteModalNeedsContext = incompleteModalNeedsContextCandidate(core);
  if (incompleteModalNeedsContext) return [incompleteModalNeedsContext];

  const incompleteContextualPredicate = incompleteContextualPredicateCandidate(core);
  if (incompleteContextualPredicate) return [incompleteContextualPredicate];

  const incompleteLocativeNeedsContext = incompleteLocativeNeedsContextCandidate(core);
  if (incompleteLocativeNeedsContext) return [incompleteLocativeNeedsContext];

  const possessiveFragmentAnswer = possessiveFragmentAnswerCandidate(core);
  if (possessiveFragmentAnswer) return [possessiveFragmentAnswer];

  const mandarinReviewNeedsContext = mandarinReviewNeedsContextCandidate(core);
  if (mandarinReviewNeedsContext) return [mandarinReviewNeedsContext];

  const copularANotAQuestion = copularANotAQuestionFallback(core);
  if (copularANotAQuestion) return [copularANotAQuestion];

  const rawDesiderativeANotAQuestion = desiderativeANotAQuestionFallback(core);
  if (rawDesiderativeANotAQuestion) return [rawDesiderativeANotAQuestion];

  const rawPermissionANotAQuestion = permissionANotAQuestionFallback(core);
  if (rawPermissionANotAQuestion) return [rawPermissionANotAQuestion];

  const templateANotAQuestion = templateConstructionFor(core, ["ANotAQuestion"]);
  if (templateANotAQuestion) return [templateANotAQuestion];

  const rawANotAQuestion = aNotAQuestionFallback(core);
  if (rawANotAQuestion) return [rawANotAQuestion];

  const potentialResultSpan = potentialResultVPFallback(core);
  if (potentialResultSpan) return [potentialResultSpan];

  const incompletePotentialResult = incompletePotentialResultCandidate(core);
  if (incompletePotentialResult) return [incompletePotentialResult];

  const transitionMotionSpan = transitionMotionPredicateFallback(core);
  if (transitionMotionSpan) return [transitionMotionSpan];

  const sourceLinkedDegreeMannerSpan = sourceLinkedDegreeMannerModifiedVPFallback(core);
  if (sourceLinkedDegreeMannerSpan) return [sourceLinkedDegreeMannerSpan];

  const sourceLinkedPrioritySpan = sourceLinkedPriorityMarkerClauseFallback(core);
  if (sourceLinkedPrioritySpan) return [sourceLinkedPrioritySpan];

  const sourceLinkedPreferenceSpan = sourceLinkedPreferenceVPFallback(core);
  if (sourceLinkedPreferenceSpan) return [sourceLinkedPreferenceSpan];

  // Preference needs a top-level pass before broad NP category wrapping.
  // Otherwise 鍾意 + VP can be mis-wrapped as ModifiedNP because the VP exports noun/object slots from its object child.
  const rawPreferenceSpan = rawPreferenceTemplateFallback(core);
  if (rawPreferenceSpan) return [rawPreferenceSpan];

  const negativeCognitionSpan = negativeCognitionFragmentFallback(core);
  if (negativeCognitionSpan) return [negativeCognitionSpan];

  const cognitionStatementSpan = cognitionStatementFallback(core);
  if (cognitionStatementSpan) return [cognitionStatementSpan];

  const cognitionContentSpan = cognitionContentFrameFallback(core);
  if (cognitionContentSpan) return [cognitionContentSpan];

  const opinionStanceSpan = opinionStanceFrameFallback(core);
  if (opinionStanceSpan) return [opinionStanceSpan];

  const reportedSpeechSpan = reportedSpeechFrameFallback(core);
  if (reportedSpeechSpan) return [reportedSpeechSpan];

  // The narrow intended-function relation must precede generic VP-complement
  // routing; otherwise 用嚟 is prematurely reanalysed as lexical 用 plus
  // directional 嚟, especially after classifier-led topics such as 部電腦.
  const intendedFunctionSpan = intendedFunctionRelationFallback(core);
  if (intendedFunctionSpan) return [intendedFunctionSpan];

  const sourceLinkedIntentionSpan = sourceLinkedIntentionFrameFallback(core);
  if (sourceLinkedIntentionSpan) return [sourceLinkedIntentionSpan];

  const namingSelfIntroductionSpan = namingSelfIntroductionFrameFallback(core);
  if (namingSelfIntroductionSpan) return [namingSelfIntroductionSpan];

  const politeRequestAdjustmentSpan = politeRequestAdjustmentFallback(core);
  if (politeRequestAdjustmentSpan) return [politeRequestAdjustmentSpan];

  const transparentDiscourseFormulaSpan = transparentDiscourseFormulaFallback(core);
  if (transparentDiscourseFormulaSpan) return [transparentDiscourseFormulaSpan];

  const leaveTakingFormulaSpan = leaveTakingFormulaFallback(core);
  if (leaveTakingFormulaSpan) return [leaveTakingFormulaSpan];

  const politePathImperativeSpan = politePathImperativeFallback(core);
  if (politePathImperativeSpan) return [politePathImperativeSpan];

  const polarQuestionSpan = polarQuestionFrameFallback(core);
  if (polarQuestionSpan) return [polarQuestionSpan];

  const interiorExistentialSpan = interiorExistentialFrameFallback(core);
  if (interiorExistentialSpan) return [interiorExistentialSpan];

  const copularIdentificationSpan = copularIdentificationFrameFallback(core);
  if (copularIdentificationSpan) return [copularIdentificationSpan];

  const passivePermissiveSpan = passivePermissiveRelationFallback(core);
  if (passivePermissiveSpan) return [passivePermissiveSpan];

  const lexicalGiveSpan = lexicalGiveRelationFallback(core);
  if (lexicalGiveSpan) return [lexicalGiveSpan];

  const postThemeParticipantSpan = postThemeParticipantRelationFallback(core);
  if (postThemeParticipantSpan) return [postThemeParticipantSpan];

  const mannerAdverbialSpan = mannerAdverbialVPFallback(core);
  if (mannerAdverbialSpan) return [mannerAdverbialSpan];

  const sourceMotionSpan = sourceMotionClauseFallback(core);
  if (sourceMotionSpan) return [sourceMotionSpan];

  const locativePostureSpan = locativePostureVPFallback(core);
  if (locativePostureSpan) return [locativePostureSpan];

  const subjectLocativePredicateSpan = subjectLocativePredicateClauseFallback(core);
  if (subjectLocativePredicateSpan) return [subjectLocativePredicateSpan];

  const coordinatedNPFragmentSpan = coordinatedNPFragmentFallback(core);
  if (coordinatedNPFragmentSpan) return [coordinatedNPFragmentSpan];

  const coverbFrameSpan = coverbFrameFallback(core);
  if (coverbFrameSpan) return [coverbFrameSpan];

  const coordinatedSubjectModalSpan = coordinatedSubjectModalPredicateClauseFallback(core);
  if (coordinatedSubjectModalSpan) return [coordinatedSubjectModalSpan];

  const rawCompositionalPostverbalZo = postverbalZoPerfectiveFromRawNodes(core);
  if (rawCompositionalPostverbalZo) return rawCompositionalPostverbalZo;

  core = wrapAgreementResponseSubspans(core);
  core = wrapDirectionalMotionSubspans(core);
  core = wrapSerialPurposeTemplateSubspans(core);
  core = wrapSerialVerbPurposeSubspans(core);
  core = wrapPriorityMarkerSubspans(core);
  core = wrapChangeIntoPredicateSubspans(core);
  core = wrapPossessiveClassifierNPSubspans(core);
  core = wrapPermissionAcceptabilitySubspans(core);
  core = wrapCategorySubspans(core);
  core = wrapNegatedVPSubspans(core);
  core = wrapCategorySubspans(core);
  core = wrapCategorySubspans(core);

  const postSubspanMotionEventSpatial = motionEventSpatialFallback(core);
  if (postSubspanMotionEventSpatial) return [postSubspanMotionEventSpatial];

  const postSubspanTransitionMotionSpan = transitionMotionPredicateFallback(core);
  if (postSubspanTransitionMotionSpan) return [postSubspanTransitionMotionSpan];

  const recomposedPostverbalZo = postverbalZoPerfectiveFromWrappedNodes(core);
  if (recomposedPostverbalZo) core = recomposedPostverbalZo;

  // Retry result/phase + perfective composition after NP subspans have formed.
  // This is required for independently attested V + 完 + 咗 + multi-token NP
  // objects such as 啲飯 and 本書, which cannot match the raw four-node fallback.
  const postSubspanPerfectiveResultComposition = perfectiveResultCompositionFallback(core);
  if (postSubspanPerfectiveResultComposition) return [postSubspanPerfectiveResultComposition];

  const postSubspanExistentialVpMalformed = existentialQuestionWithVpMalformedCandidate(core);
  if (postSubspanExistentialVpMalformed) return [postSubspanExistentialVpMalformed];

  const postSubspanMandarinNegatorNeedsContext = mandarinNegatorNeedsContextCandidate(core);
  if (postSubspanMandarinNegatorNeedsContext) return [postSubspanMandarinNegatorNeedsContext];

  const postSubspanPossessiveFragmentAnswer = possessiveFragmentAnswerCandidate(core);
  if (postSubspanPossessiveFragmentAnswer) return [postSubspanPossessiveFragmentAnswer];

  const postSubspanMandarinReviewNeedsContext = mandarinReviewNeedsContextCandidate(core);
  if (postSubspanMandarinReviewNeedsContext) return [postSubspanMandarinReviewNeedsContext];

  const progressiveWhObjectSpan = progressiveWhObjectQuestionFallback(core);
  if (progressiveWhObjectSpan) return [progressiveWhObjectSpan];

  const subjectStativeSpan = subjectStativePredicateClauseFallback(core);
  if (subjectStativeSpan) return [subjectStativeSpan];

  const scalarValueQuestionSpan = scalarValueQuestionFallback(core);
  if (scalarValueQuestionSpan) return [scalarValueQuestionSpan];

  const protectedOpaqueFormulaSpan = protectedOpaqueFormulaPassthrough(core);
  if (protectedOpaqueFormulaSpan) return [protectedOpaqueFormulaSpan];

  // Preserve an already-resolved overt predicate-object construction before broad
  // category templates can rewrap it (for example, TransitiveVP as NominalHeadSpan).
  // Review decorates the resolved structure; it does not replace or flatten it.
  if (core.length === 1 && core[0].kind === "construction") {
    const reviewedResolvedConstruction = overtObjectSelectionReviewCandidate(core);
    if (reviewedResolvedConstruction) return [reviewedResolvedConstruction];
  }

  core = completionThenStandaloneWalkResolution(core);
  const generativeSpan = templateConstructionFor(core);
  if (generativeSpan) {
    const reviewedGenerativeSpan = overtObjectSelectionReviewCandidate([generativeSpan]);
    return [reviewedGenerativeSpan || generativeSpan];
  }

  const completionQuestion = completionQuestionFallback(core);
  if (completionQuestion) {
    const reviewedCompletionQuestion = overtObjectSelectionReviewCandidate([completionQuestion]);
    return [reviewedCompletionQuestion || completionQuestion];
  }

  if (core.length === 1 && core[0].kind === "construction") {
    const reviewedExistingConstruction = overtObjectSelectionReviewCandidate(core);
    return [reviewedExistingConstruction || core[0]];
  }

  const opinionSeemingSpan = opinionSeemingFallback(core);
  if (opinionSeemingSpan) return [opinionSeemingSpan];

  const experientialYesNoQuestion = experientialYesNoQuestionFallback(core);
  if (experientialYesNoQuestion) return [experientialYesNoQuestion];

  const interestDomainExistentialQuestion = interestDomainExistentialQuestionFallback(core);
  if (interestDomainExistentialQuestion) return [interestDomainExistentialQuestion];

  const locativeWhQuestion = locativeWhQuestionFallback(core);
  if (locativeWhQuestion) return [locativeWhQuestion];
  const completionThenRelation = completionThenClauseRelation(core);
  if (completionThenRelation) return [completionThenRelation];

  const reportedSpeechSurfaceSpan = reportedSpeechSurfaceFallback(core);
  if (reportedSpeechSurfaceSpan) return [reportedSpeechSurfaceSpan];

  const experientialQuestionBoundary = experientialQuestionBoundaryFallback(core);
  if (experientialQuestionBoundary) return [experientialQuestionBoundary];

  const desiderativeSpan = desiderativeVPWrapCoreFallback(core);
  if (desiderativeSpan) return [desiderativeSpan];

  const scalarEvaluationSpan = scalarEvaluationFallback(core);
  if (scalarEvaluationSpan) return [scalarEvaluationSpan];
  // Scalar value question patterns. Price is domain metadata, not the construction label.
  if (hasSurface(core, "幾錢")) {
    const scalar = scalarValueQuestionFallback(core);
    if (scalar) return [scalar];
  }
  const approximateQuantitySpan = approximateQuantityFallback(core);
  if (approximateQuantitySpan) return [approximateQuantitySpan];

  const suggestionQuestion = suggestionQuestionFallback(core);
  if (suggestionQuestion) return [suggestionQuestion];
  const acceptabilityANotAQuestion = acceptabilityANotAQuestionFallback(core);
  if (acceptabilityANotAQuestion) return [acceptabilityANotAQuestion];

  const existentialWhQuestion = existentialWhQuestionFallback(core);
  if (existentialWhQuestion) return [existentialWhQuestion];

  // Preference fallback: normally handled by the PreferenceVP template before broad NP category wrapping.
  const preferenceFallbackSpan = preferenceVPWrapCoreFallback(core);
  if (preferenceFallbackSpan) return [preferenceFallbackSpan];

  const temporalClauseSpan = temporalClauseFallback(core);
  if (temporalClauseSpan) return [temporalClauseSpan];

  const topicCommentSpan = topicCommentFallback(core);
  if (topicCommentSpan) return [topicCommentSpan];

  const prohibitiveImperativeSpan = prohibitiveImperativeFallback(core);
  if (prohibitiveImperativeSpan) return [prohibitiveImperativeSpan];

  const inlineANotAQuestion = inlineANotAQuestionFallback(core);
  if (inlineANotAQuestion) return [inlineANotAQuestion];

  const completionQuestionWithPerfectiveMarker = completionQuestionWithPerfectiveMarkerFallback(core);
  if (completionQuestionWithPerfectiveMarker) return [completionQuestionWithPerfectiveMarker];

  const potentialResultComplementSpan = potentialResultComplementFallback(core);
  if (potentialResultComplementSpan) return [potentialResultComplementSpan];

  // Modal + VP/predicate: NP? Modal Predicate.
  // v0.5.56: prefer governed generative ModalVP; retain the old slot heuristic only as a final fallback.
  const modalPredicateWrapSpan = modalPredicateWrapCoreFallback(core);
  if (modalPredicateWrapSpan) return modalPredicateWrapSpan;

  return wrapPredicate(core);
}

  return {
    wrapCore,
  };
};
