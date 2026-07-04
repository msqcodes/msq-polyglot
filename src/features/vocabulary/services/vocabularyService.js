
// src/features/vocabulary/services/vocabularyService.js
import { toVocabularyModel } from "../adapters/vocabularyAdapter";
import { getContentForLanguage } from "../../../data/languageContent";

class VocabularyService {
  /**
   * Returns all vocabulary for the selected language.
   */
  getVocabulary(languageId) {
    const content = getContentForLanguage(languageId);

    const vocabulary = content?.vocabulary ?? [];

    return vocabulary.map(word =>
        toVocabularyModel(word, languageId)
    );
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

    return words.filter(word =>
        word.term.toLowerCase().includes(normalizedQuery) ||
        word.translation.toLowerCase().includes(normalizedQuery)
    );
  }

  /**
   * Returns a single vocabulary word by ID.
   */
  getWordById(languageId, id) {
    return this.getVocabulary(languageId).find(
      (word) => word.id === id
    );
  }

  /**
   * Returns all unique categories.
   */
  getCategories(languageId) {
    return [
      ...new Set(
        this.getVocabulary(languageId).map(
          (word) => word.category
        )
      ),
    ].sort();
  }

  /**
   * Returns all unique CEFR levels.
   */
  getLevels(languageId) {
    return [
      ...new Set(
        this.getVocabulary(languageId).map(
          (word) => word.level
        )
      ),
    ].sort();
  }
}

export const vocabularyService = new VocabularyService();

