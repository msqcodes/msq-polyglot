// src/data/languageContent.js

import { GERMAN_VOCABULARY } from "./german/vocabulary";
import { GERMAN_GRAMMAR_TOPICS } from "./german/grammar";
import { GERMAN_LESSONS } from "./german/lessons";
import { GERMAN_QUIZZES } from "./german/quizzes";
import { GERMAN_FLASHCARDS } from "./german/flashcards";

/**
 * Central registry mapping a language id to its learning content.
 * To add a new language module, create its data files under
 * src/data/{languageId}/ and register the bundle here.
 * No other file should ever import language-specific data directly.
 */
const LANGUAGE_CONTENT_REGISTRY = {
  german: {
    vocabulary: GERMAN_VOCABULARY,
    grammar: GERMAN_GRAMMAR_TOPICS,
    lessons: GERMAN_LESSONS,
    quizzes: GERMAN_QUIZZES,
    flashcards: GERMAN_FLASHCARDS,
  },
};

export const getContentForLanguage = (languageId) =>
  LANGUAGE_CONTENT_REGISTRY[languageId] ?? null;