// src/features/vocabulary/adapters/vocabularyAdapter.js

export function toVocabularyModel(word, languageId) {
  return {
    id: word.id,

    term: word.german,

    translation: word.english,

    example: word.example,

    category: word.category,

    level: word.level,

    languageId,

    metadata: {}
  };
}