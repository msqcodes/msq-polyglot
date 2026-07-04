// src/data/german/vocabulary.js

export const GERMAN_VOCABULARY = [
  { id: "v001", german: "Hallo", english: "Hello", category: "Greetings", level: "A1", example: "Hallo, wie geht es dir?" },
  { id: "v002", german: "Danke", english: "Thank you", category: "Greetings", level: "A1", example: "Danke für deine Hilfe." },
  { id: "v003", german: "Bitte", english: "Please / You're welcome", category: "Greetings", level: "A1", example: "Bitte schön!" },
  { id: "v004", german: "das Haus", english: "the house", category: "Home", level: "A1", example: "Das Haus ist sehr groß." },
  { id: "v005", german: "die Familie", english: "the family", category: "People", level: "A1", example: "Meine Familie wohnt in Berlin." },
  { id: "v006", german: "arbeiten", english: "to work", category: "Verbs", level: "A1", example: "Ich arbeite jeden Tag." },
  { id: "v007", german: "der Freund", english: "the friend (male)", category: "People", level: "A1", example: "Er ist mein bester Freund." },
  { id: "v008", german: "essen", english: "to eat", category: "Verbs", level: "A1", example: "Wir essen um sieben Uhr." },
  { id: "v009", german: "das Wetter", english: "the weather", category: "Nature", level: "A2", example: "Das Wetter ist heute schön." },
  { id: "v010", german: "verstehen", english: "to understand", category: "Verbs", level: "A2", example: "Ich verstehe die Frage nicht." },
  { id: "v011", german: "die Reise", english: "the trip", category: "Travel", level: "A2", example: "Die Reise nach München war toll." },
  { id: "v012", german: "erfahren", english: "to experience / to find out", category: "Verbs", level: "B1", example: "Ich habe viel Neues erfahren." },
  { id: "v013", german: "die Verantwortung", english: "the responsibility", category: "Work", level: "B1", example: "Er trägt viel Verantwortung." },
  { id: "v014", german: "wahrscheinlich", english: "probably", category: "Adverbs", level: "B1", example: "Es wird wahrscheinlich regnen." },
  { id: "v015", german: "die Entscheidung", english: "the decision", category: "Abstract", level: "B2", example: "Das war eine schwierige Entscheidung." },
];

export const getVocabularyByLevel = (level) =>
  GERMAN_VOCABULARY.filter((word) => word.level === level);