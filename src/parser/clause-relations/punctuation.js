"use strict";

function hasSentencePunctuation(text) {
  return /[，。！？、；：,.!?;:]/u.test(String(text || ""));
}

function isClauseSequenceSeparator(node) {
  return node && node.kind === "text" && /[，,；;]/u.test(String(node.text || ""));
}

function isClauseSequenceTerminal(node) {
  return node && node.kind === "text" && /[。！？.!?]/u.test(String(node.text || ""));
}

module.exports = { hasSentencePunctuation, isClauseSequenceSeparator, isClauseSequenceTerminal };
