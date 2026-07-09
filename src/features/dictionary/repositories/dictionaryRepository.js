// src/features/dictionary/repositories/dictionaryRepository.js
//
// DictionaryRepository
// ---------------------
// Orchestrates the dictionary provider and owns caching — same division of
// responsibility as VocabularyRepository. Caching matters more here than in
// vocabulary: every lookup is a real network call, and the same word is
// likely to be looked up repeatedly as a user browses.
//
// Also responsible for resolving languageId -> API language code and
// failing gracefully (returning null) for unsupported languages, so callers
// never need to know FreeDictionaryAPI's language coverage.

import { freeDictionaryProvider } from "../providers/freeDictionaryProvider";
import { getDictionaryLanguageCode } from "../config/dictionaryLanguageMap";

class DictionaryRepository {
  constructor(provider = freeDictionaryProvider) {
    this.provider = provider;
    this._cache = new Map(); // "languageId:lowercased-term" -> DictionaryEntryModel | null
  }

  /**
   * Looks up a term for a language. Returns null if the language isn't
   * supported, the term is empty, or no definition was found.
   */
  async lookup(languageId, term) {
    const languageCode = getDictionaryLanguageCode(languageId);
    if (!languageCode) {
      return null;
    }

    const trimmedTerm = term?.trim();
    if (!trimmedTerm) {
      return null;
    }

    // German (and some other languages) capitalize nouns meaningfully, so
    // the term sent to the API keeps its original casing. Only the cache
    // key is lowercased, so "Hallo" and "hallo" still share one entry.
    const cacheKey = `${languageId}:${trimmedTerm.toLowerCase()}`;
    if (this._cache.has(cacheKey)) {
      return this._cache.get(cacheKey);
    }

    const entry = await this.provider.lookup(
      trimmedTerm,
      languageCode,
      languageId
    );

    this._cache.set(cacheKey, entry);
    return entry;
  }

  /**
   * Clears cached lookups. Omit both args to clear everything, pass only
   * languageId to clear one language, or both to clear one entry.
   */
  invalidate(languageId, term) {
    if (languageId === undefined) {
      this._cache.clear();
      return;
    }

    if (term === undefined) {
      for (const key of this._cache.keys()) {
        if (key.startsWith(`${languageId}:`)) {
          this._cache.delete(key);
        }
      }
      return;
    }

    this._cache.delete(`${languageId}:${term.trim().toLowerCase()}`);
  }
}

export const dictionaryRepository = new DictionaryRepository();
export { DictionaryRepository };