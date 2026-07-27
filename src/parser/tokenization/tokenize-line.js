"use strict";

const PUNCT_RE = require("./punctuation");

module.exports = function createTokenizer(dependencies = {}) {
  const {
    FORMULAS,
    NEGATED_LEXICALIZED_STATIVE_SPLITS,
    PRODUCTIVE_TERMS,
    candidateNamedAddressFormFromRest,
    construction,
    contextualLexiconOverrides,
    productiveVoComponentTokens,
    protectedConditionalMarkerToken,
    pushNegatedLexicalizedStativeSplit,
    pushSpecialNotGoodEat,
    selectLexiconTerm,
    textNode,
    token,
    traceInfo,
    transparentCupNounDemonstrativeNpFromRest,
    transparentDemonstrativeClassifierSplitFromRest,
    transparentEllipticalDemonstrativeClassifierFromRest,
    transparentNominalDiDeterminerFromRest,
    transparentOneCountClassifierSplitFromRest,
    transparentQuantifiedPersonNpFromRest,
  } = dependencies;

  function tokenizeLine(source) {
    const text = String(source || "");
    const nodes = [];
    let cursor = 0;

    while (cursor < text.length) {
      const rest = text.slice(cursor);
      const punctuation = rest.match(PUNCT_RE);
      if (punctuation) {
        nodes.push(textNode(punctuation[0]));
        cursor += punctuation[0].length;
        continue;
      }

      if (rest.startsWith("唔好食")) {
        cursor += pushSpecialNotGoodEat(nodes, text, cursor);
        continue;
      }

      const negatedLexicalizedStative = NEGATED_LEXICALIZED_STATIVE_SPLITS.find((spec) => spec.surface !== "唔好食" && rest.startsWith(spec.surface));
      if (negatedLexicalizedStative) {
        cursor += pushNegatedLexicalizedStativeSplit(nodes, text, cursor, negatedLexicalizedStative);
        continue;
      }

      const formula = FORMULAS.find((surface) => rest.startsWith(surface));
      if (formula) {
        nodes.push(construction("FormulaDiscourseUnit", "Formula", [token(formula)], {
          note: "Protected formula stays grouped.",
          trace: traceInfo("protected_formula_table", { surface: formula, reason: "Protected formula is intentionally opaque." }),
        }));
        cursor += formula.length;
        continue;
      }

      const addressForm = candidateNamedAddressFormFromRest(rest);
      if (addressForm) {
        nodes.push(addressForm.node);
        cursor += addressForm.length;
        continue;
      }

      const vo = PRODUCTIVE_TERMS.find((surface) => rest.startsWith(surface));
      if (vo) {
        nodes.push(...productiveVoComponentTokens(vo));
        cursor += vo.length;
        continue;
      }

      const cupNounDemonstrativeNp = transparentCupNounDemonstrativeNpFromRest(rest);
      if (cupNounDemonstrativeNp) {
        nodes.push(cupNounDemonstrativeNp.node);
        cursor += cupNounDemonstrativeNp.length;
        continue;
      }

      const demonstrativeClassifierSplit = transparentDemonstrativeClassifierSplitFromRest(rest);
      if (demonstrativeClassifierSplit) {
        nodes.push(...demonstrativeClassifierSplit.node);
        cursor += demonstrativeClassifierSplit.length;
        continue;
      }

      const ellipticalDemonstrativeClassifier = transparentEllipticalDemonstrativeClassifierFromRest(rest);
      if (ellipticalDemonstrativeClassifier) {
        nodes.push(ellipticalDemonstrativeClassifier.node);
        cursor += ellipticalDemonstrativeClassifier.length;
        continue;
      }

      const oneCountClassifierSplit = transparentOneCountClassifierSplitFromRest(rest);
      if (oneCountClassifierSplit) {
        nodes.push(...oneCountClassifierSplit.node);
        cursor += oneCountClassifierSplit.length;
        continue;
      }

      const quantifiedPersonNp = transparentQuantifiedPersonNpFromRest(rest);
      if (quantifiedPersonNp) {
        nodes.push(quantifiedPersonNp.node);
        cursor += quantifiedPersonNp.length;
        continue;
      }

      const nominalDiDeterminer = transparentNominalDiDeterminerFromRest(rest);
      if (nominalDiDeterminer) {
        nodes.push(nominalDiDeterminer.node);
        cursor += nominalDiDeterminer.length;
        continue;
      }

      const termChoice = selectLexiconTerm(rest);
      if (termChoice) {
        nodes.push(termChoice.surface === "嘅話"
          ? protectedConditionalMarkerToken()
          : token(termChoice.surface, {
            selection_decision: termChoice.selection_decision,
            ...contextualLexiconOverrides(termChoice.surface, rest),
          }));
        cursor += termChoice.surface.length;
        continue;
      }

      const char = Array.from(rest)[0] || "";
      nodes.push(token(char, { label: "neutral", syntax: "unknown_cjk_or_text", note: "Unknown item; shown neutrally." }));
      cursor += char.length;
    }

    return nodes;
  }

  return { tokenizeLine };
};
