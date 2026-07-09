// src/features/vocabulary/services/vocabularyService.js
//
// VocabularyService
// ------------------
// Business logic layer for vocabulary: search, lookup, category/level
// aggregation. Depends on the VocabularyRepository for data access —
// the repository decides which provider to use and whether to serve
// from cache. The service never talks to a provider directly.
//
// A repository is injected via the constructor, defaulting to
// vocabularyRepository, so the exported `vocabularyService` singleton
// — and every existing caller of it — keeps working unchanged.

import { vocabularyRepository } from "../repositories/vocabularyRepository";

class VocabularyService {
  constructor(repository = vocabularyRepository) {
    this.repository = repository;
  }

  /**
   * Returns all vocabulary for the selected language.
   */
  getVocabulary(languageId) {
    return this.repository.getWords(languageId);
  }

  /**
   * Searches vocabulary by German term or English translation.
   */
  search(languageId, query) {
    const words = this.getVocabulary(languageId);

    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return words;
    }

    return words.filter(
      (word) =>
        word.term.toLowerCase().includes(normalizedQuery) ||
        word.translation.toLowerCase().includes(normalizedQuery)
    );
  }

  /**
   * Returns a single vocabulary word by ID.
   */
  getWordById(languageId, id) {
    return this.getVocabulary(languageId).find((word) => word.id === id);
  }

  /**
   * Returns all unique categories.
   */
  getCategories(languageId) {
    return [
      ...new Set(this.getVocabulary(languageId).map((word) => word.category)),
    ].sort();
  }

  /**
   * Returns all unique CEFR levels.
   */
  getLevels(languageId) {
    return [
      ...new Set(this.getVocabulary(languageId).map((word) => word.level)),
    ].sort();
  }
}

export const vocabularyService = new VocabularyService();
export { VocabularyService };