// src/features/vocabulary/providers/localVocabularyProvider.js
//
// LocalVocabularyProvider
// ------------------------
// Data access layer for vocabulary sourced from local static language
// content (src/data/*). This is the only place in the vocabulary feature
// that talks to the local data registry, and the only place that invokes
// the adapter — callers always receive the canonical model, never raw data.
//
// Contract (informal for now — will be extracted into a shared interface
// once a second provider exists, e.g. FreeDictionaryProvider or
// BackendVocabularyProvider):
//
//   getWords(languageId: string): VocabularyModel[]
//     Returns the full vocabulary list for a language, already adapted
//     into the canonical VocabularyModel shape defined in
//     adapters/vocabularyAdapter.js.
//
// Any future provider must expose this same getWords(languageId) method
// and return this same canonical shape, so VocabularyService can stay
// provider-agnostic.

import { getContentForLanguage } from "../../../data/languageContent";
import { toVocabularyModel } from "../adapters/vocabularyAdapter";

class LocalVocabularyProvider {
  /**
   * Returns all vocabulary words for a language, adapted to the
   * canonical VocabularyModel shape.
   */
  getWords(languageId) {
    const content = getContentForLanguage(languageId);
    const rawWords = content?.vocabulary ?? [];

    return rawWords.map((word) => toVocabularyModel(word, languageId));
  }
}

export const localVocabularyProvider = new LocalVocabularyProvider();
export { LocalVocabularyProvider };