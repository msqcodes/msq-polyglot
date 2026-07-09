// src/features/dictionary/adapters/dictionaryAdapter.js
//
// Converts raw FreeDictionaryAPI JSON (an array of entry objects) into the
// canonical DictionaryEntryModel shape used throughout the dictionary
// feature:
//
//   {
//     term: string,
//     phonetic: string | null,
//     meanings: [{ partOfSpeech, definitions: [{ definition, example }], synonyms }],
//     sourceUrls: string[],
//     languageId: string,
//     metadata: {}
//   }

export function toDictionaryEntryModel(rawEntries, term, languageId) {
  if (!Array.isArray(rawEntries) || rawEntries.length === 0) {
    return null;
  }

  const phonetic = rawEntries.find((entry) => entry.phonetic)?.phonetic ?? null;

  const meanings = rawEntries.flatMap((entry) =>
    (entry.meanings ?? []).map((meaning) => ({
      partOfSpeech: meaning.partOfSpeech ?? null,
      definitions: (meaning.definitions ?? []).map((def) => ({
        definition: def.definition ?? "",
        example: def.example ?? null,
      })),
      synonyms: meaning.synonyms ?? [],
    }))
  );

  const sourceUrls = [
    ...new Set(rawEntries.flatMap((entry) => entry.sourceUrls ?? [])),
  ];

  return {
    term,
    phonetic,
    meanings,
    sourceUrls,
    languageId,
    metadata: {},
  };
}