// src/features/dictionary/services/dictionaryService.js
//
// DictionaryService
// ------------------
// Business-facing entry point for the dictionary feature. Any UI wanting a
// word definition calls this — never the repository or provider directly.
// Deliberately swallows and logs errors rather than throwing: a failed or
// unsupported lookup should never break a page that merely wants to show
// supplemental information.

import { dictionaryRepository } from "../repositories/dictionaryRepository";

class DictionaryService {
  constructor(repository = dictionaryRepository) {
    this.repository = repository;
  }

  /**
   * Returns a DictionaryEntryModel for a term, or null if unavailable for
   * any reason (unsupported language, not found, or a request failure).
   */
  async lookup(languageId, term) {
    if (!term) {
      return null;
    }

    try {
      return await this.repository.lookup(languageId, term);
    } catch (error) {
      console.error("DictionaryService lookup failed:", error);
      return null;
    }
  }
}

export const dictionaryService = new DictionaryService();
export { DictionaryService };