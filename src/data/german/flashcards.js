// src/data/german/flashcards.js

export const GERMAN_FLASHCARDS = [
  { id: "f001", front: "Hallo", back: "Hello", level: "A1" },
  { id: "f002", front: "Danke", back: "Thank you", level: "A1" },
  { id: "f003", front: "das Haus", back: "the house", level: "A1" },
  { id: "f004", front: "die Familie", back: "the family", level: "A1" },
  { id: "f005", front: "arbeiten", back: "to work", level: "A1" },
  { id: "f006", front: "das Wetter", back: "the weather", level: "A2" },
  { id: "f007", front: "verstehen", back: "to understand", level: "A2" },
  { id: "f008", front: "die Reise", back: "the trip", level: "A2" },
  { id: "f009", front: "die Verantwortung", back: "the responsibility", level: "B1" },
  { id: "f010", front: "die Entscheidung", back: "the decision", level: "B2" },
];

export const getFlashcardsByLevel = (level) =>
  GERMAN_FLASHCARDS.filter((card) => card.level === level);