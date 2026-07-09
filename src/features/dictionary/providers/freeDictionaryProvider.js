// src/features/dictionary/providers/freeDictionaryProvider.js
//
// FreeDictionaryProvider
// ------------------------
// Data access layer talking to the public FreeDictionaryAPI. Mirrors the
// LocalVocabularyProvider pattern: the adapter is called inside the
// provider, so callers only ever receive the canonical DictionaryEntryModel,
// never raw API JSON.
//
// Informal contract (no shared interface yet — this feature has only one
// provider so far):
//
//   lookup(term: string, languageCode: string, languageId: string): Promise<DictionaryEntryModel | null>
//     Returns null when the word isn't found (API 404) or the response is
//     empty. Throws on network/unexpected-status errors so the repository
//     / service can decide how to handle those.

import { toDictionaryEntryModel } from "../adapters/dictionaryAdapter";

const API_BASE = "https://api.dictionaryapi.dev/api/v2/entries";

class FreeDictionaryProvider {
  async lookup(term, languageCode, languageId) {
    const url = `${API_BASE}/${languageCode}/${encodeURIComponent(term)}`;

    const response = await fetch(url);

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(
        `FreeDictionaryAPI request failed with status ${response.status}`
      );
    }

    const rawEntries = await response.json();
    return toDictionaryEntryModel(rawEntries, term, languageId);
  }
}

export const freeDictionaryProvider = new FreeDictionaryProvider();
export { FreeDictionaryProvider };