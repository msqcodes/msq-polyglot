// src/features/vocabulary/repositories/vocabularyRepository.js
//
// VocabularyRepository
// ---------------------
// Orchestration layer between VocabularyService and a vocabulary provider.
// This is where caching lives — not in the provider, and not in the
// service. The provider's only job is fetching/adapting data from one
// source; the service's only job is business logic (search, filtering,
// aggregation). Deciding *whether to re-fetch* belongs here.
//
// Today there is a single provider (LocalVocabularyProvider), so caching
// mainly avoids redundant work re-reading the local data registry and
// re-running the adapter on every call. It matters more once a provider
// does real I/O (a backend call, an imported Kaikki dataset, etc.).
//
// No formal provider contract exists yet (informal shape only — see
// localVocabularyProvider.js). This repository is written against that
// same informal shape: any provider passed in must expose
// getWords(languageId) and return VocabularyModel[].

import { localVocabularyProvider } from "../providers/localVocabularyProvider";

class VocabularyRepository {
  constructor(provider = localVocabularyProvider) {
    this.provider = provider;
    this._cache = new Map(); // languageId -> VocabularyModel[]
  }

  /**
   * Returns vocabulary for a language, using the cache when available.
   */
  getWords(languageId) {
    if (this._cache.has(languageId)) {
      return this._cache.get(languageId);
    }

    const words = this.provider.getWords(languageId);
    this._cache.set(languageId, words);
    return words;
  }

  /**
   * Forces a re-fetch from the provider for a language, refreshing the cache.
   */
  refresh(languageId) {
    const words = this.provider.getWords(languageId);
    this._cache.set(languageId, words);
    return words;
  }

  /**
   * Clears cached data. Omit languageId to clear everything.
   */
  invalidate(languageId) {
    if (languageId === undefined) {
      this._cache.clear();
      return;
    }
    this._cache.delete(languageId);
  }
}

export const vocabularyRepository = new VocabularyRepository();
export { VocabularyRepository };