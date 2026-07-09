// src/features/vocabulary/adapters/vocabularyAdapter.js
//
// Converts a raw vocabulary word (from src/data/*) into the canonical
// VocabularyModel used everywhere downstream (service, page, details page).
//
// Phase 3 note: `term`/`translation` are the established field names for
// the German word and its English meaning — kept unchanged so existing
// consumers (VocabularyPage's rendering and search) keep working exactly
// as before. The fields below are additive: every existing vocabulary
// entry lacks them today, so they resolve to null/[]/{} automatically,
// with no data migration required. Future entries in data/german/*.js
// (or any future language) can populate them simply by including the
// matching property on the raw word object.

export function toVocabularyModel(word, languageId) {
  return {
    id: word.id,

    term: word.german,

    translation: word.english,

    example: word.example ?? "",

    category: word.category ?? "",

    level: word.level ?? "",

    languageId,

    // Phase 3 — Vocabulary Details fields (optional on raw data today)
    partOfSpeech: word.partOfSpeech ?? null,

    article: word.article ?? null,

    plural: word.plural ?? null,

    ipa: word.ipa ?? null,

    image: word.image ?? null,

    audio: word.audio ?? null,

    tags: word.tags ?? [],

    metadata: word.metadata ?? {}
  };
}