// src/features/dictionary/config/dictionaryLanguageMap.js
//
// Maps this app's internal languageId (from src/config/languages.js) to the
// language codes FreeDictionaryAPI expects. Owned entirely by the dictionary
// feature — the learning experience's language config is never modified to
// accommodate this. Languages not listed here simply aren't supported by
// this dictionary provider yet; callers must handle a null result.

const DICTIONARY_LANGUAGE_CODES = {
  german: "de",
  english: "en",
  french: "fr",
  spanish: "es",
  italian: "it",
  portuguese: "pt-BR",
  dutch: "nl",
  russian: "ru",
  turkish: "tr",
  arabic: "ar",
  hindi: "hi",
  japanese: "ja",
  korean: "ko",
};

/**
 * Returns the FreeDictionaryAPI language code for a given languageId,
 * or null if that language isn't supported by this provider.
 */
export function getDictionaryLanguageCode(languageId) {
  return DICTIONARY_LANGUAGE_CODES[languageId] ?? null;
}