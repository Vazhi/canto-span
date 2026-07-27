"use strict";

module.exports = function createVocativeAddressDetector(dependencies = {}) {
  const {
    ADDRESS_FOLLOWERS,
    ADDRESS_PREFIXES,
    ADDRESS_SUFFIXES,
    COMMON_SURNAME_CHARS,
    PROTECTED_ADDRESS_TERMS,
    PUNCT_RE,
    categorySubspanFor,
    construction,
    parserInactiveTokenClone,
    phraseMatch,
    token,
    traceInfo,
  } = dependencies;

  function isLikelyCjkNameChar(ch) {
    return /^[\p{Script=Han}]$/u.test(ch || "");
  }

  function addressBoundaryFollows(text) {
    if (!text) return true;
    if (PUNCT_RE.test(text)) return true;
    return ADDRESS_FOLLOWERS.some((surface) => text.startsWith(surface));
  }

  function protectedAddressTermAt(rest) {
    return [...PROTECTED_ADDRESS_TERMS]
      .sort((a, b) => b.length - a.length || a.localeCompare(b))
      .find((surface) => rest.startsWith(surface) && addressBoundaryFollows(rest.slice(surface.length)));
  }

  function addressPartToken(surface, syntax, note) {
    return parserInactiveTokenClone(token(surface, {
      label: "who",
      syntax,
      note,
    }), {
      label: "who",
      pos: "noun",
      syntax,
      slots: [syntax],
      reason: "Token is parser-inactive inside a category-based Cantonese address-form candidate; the parent exposes vocative/address affordances.",
    });
  }

  function makeVocativeAddressTerm(parts, detail) {
    const surface = parts.map((part) => part.surface).join("");
    const children = parts.map((part) => addressPartToken(part.surface, part.syntax, part.note));
    const templated = categorySubspanFor(children, ["VocativeAddressTerm"]);
    if (templated) return templated;
    return construction("VocativeAddressTerm", "Address", children, {
      slots: ["vocative_address_term", "named_address_term", "address_term", "vocative"],
      note: "Guarded Cantonese named address/vocative candidate. It preserves a likely name + address-form span while protected kinship/title words stay ungenerated.",
      trace: traceInfo("generative_or_heuristic_slot_rule", {
        rule: "candidate name/prefix + Cantonese address suffix",
        surface,
        pattern: detail.pattern,
        confidence: detail.confidence || "medium",
        guardrail: "Fallback only after protected address terms such as 家姐/小姐/姐姐/姐夫/阿姐 are refused and no category template matched.",
      }),
    });
  }

  function candidateNamedAddressFormFromRest(rest) {
    if (protectedAddressTermAt(rest)) return null;
    const chars = Array.from(rest);
    if (!chars.length) return null;

    // 阿 + name + suffix, e.g. 阿霞姐. Try this before 阿 + name.
    for (const prefix of ADDRESS_PREFIXES) {
      if (!rest.startsWith(prefix)) continue;
      for (const suffix of ADDRESS_SUFFIXES) {
        const nameStart = prefix.length;
        const name = rest.slice(nameStart, nameStart + 1);
        const candidate = `${prefix}${name}${suffix}`;
        if (!isLikelyCjkNameChar(name)) continue;
        if (!rest.startsWith(candidate)) continue;
        if (!addressBoundaryFollows(rest.slice(candidate.length))) continue;
        if (PROTECTED_ADDRESS_TERMS.has(candidate)) continue;
        return phraseMatch(candidate.length, makeVocativeAddressTerm([
          { surface: prefix, syntax: "address_prefix", note: "Familiar Cantonese name/address prefix 阿." },
          { surface: name, syntax: "name_element", note: "Name element inside a fallback address-form candidate." },
          { surface: suffix, syntax: "address_suffix", note: "Cantonese address suffix/title element." },
        ], { pattern: "address_prefix + name_element + address_suffix" }));
      }

      const name = rest.slice(prefix.length, prefix.length + 1);
      const candidate = `${prefix}${name}`;
      if (isLikelyCjkNameChar(name) && rest.startsWith(candidate) && addressBoundaryFollows(rest.slice(candidate.length)) && !PROTECTED_ADDRESS_TERMS.has(candidate)) {
        return phraseMatch(candidate.length, makeVocativeAddressTerm([
          { surface: prefix, syntax: "address_prefix", note: "Familiar Cantonese name/address prefix 阿." },
          { surface: name, syntax: "name_element", note: "Name element inside a fallback address-form candidate." },
        ], { pattern: "address_prefix + name_element", confidence: "medium_low" }));
      }
    }

    // Name/surname + suffix, e.g. 霞姐, 明哥, 陳生, 陳先生.
    for (const suffix of ADDRESS_SUFFIXES) {
      const name = rest.slice(0, 1);
      const candidate = `${name}${suffix}`;
      if (!isLikelyCjkNameChar(name)) continue;
      if (!rest.startsWith(candidate)) continue;
      if (!addressBoundaryFollows(rest.slice(candidate.length))) continue;
      if (PROTECTED_ADDRESS_TERMS.has(candidate)) continue;
      if ((suffix === "生" || suffix === "先生") && !COMMON_SURNAME_CHARS.has(name)) continue;
      return phraseMatch(candidate.length, makeVocativeAddressTerm([
        { surface: name, syntax: suffix === "生" || suffix === "先生" ? "surname_element" : "name_element", note: "Name/surname element inside a fallback address-form candidate." },
        { surface: suffix, syntax: "address_suffix", note: "Cantonese address suffix/title element." },
      ], { pattern: "name_or_surname_element + address_suffix" }));
    }

    return null;
  }


  return {
    candidateNamedAddressFormFromRest,
  };
};
