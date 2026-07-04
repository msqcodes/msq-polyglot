// src/data/german/grammar.js

export const GERMAN_GRAMMAR_TOPICS = [
  {
    id: "g001",
    title: "Personal Pronouns",
    level: "A1",
    explanation:
      "German personal pronouns change form based on grammatical case. In the nominative case, they identify the subject performing the action.",
    examples: [
      { de: "Ich lerne Deutsch.", en: "I am learning German." },
      { de: "Du sprichst gut Deutsch.", en: "You speak German well." },
      { de: "Sie wohnt in Hamburg.", en: "She lives in Hamburg." },
    ],
  },
  {
    id: "g002",
    title: "Definite Articles: der, die, das",
    level: "A1",
    explanation:
      "Every German noun has a grammatical gender: masculine (der), feminine (die), or neuter (das). The article must match the noun's gender.",
    examples: [
      { de: "der Tisch", en: "the table (masculine)" },
      { de: "die Lampe", en: "the lamp (feminine)" },
      { de: "das Buch", en: "the book (neuter)" },
    ],
  },
  {
    id: "g003",
    title: "Present Tense Verb Conjugation",
    level: "A1",
    explanation:
      "Regular German verbs in the present tense follow a consistent pattern of endings based on the subject pronoun.",
    examples: [
      { de: "ich spiele", en: "I play" },
      { de: "du spielst", en: "you play" },
      { de: "wir spielen", en: "we play" },
    ],
  },
  {
    id: "g004",
    title: "The Accusative Case",
    level: "A2",
    explanation:
      "The accusative case marks the direct object of a sentence — the thing directly affected by the verb's action.",
    examples: [
      { de: "Ich sehe den Hund.", en: "I see the dog." },
      { de: "Sie kauft einen Apfel.", en: "She buys an apple." },
    ],
  },
  {
    id: "g005",
    title: "Modal Verbs",
    level: "A2",
    explanation:
      "Modal verbs express ability, permission, necessity, or desire, and push the main verb to the end of the sentence in its infinitive form.",
    examples: [
      { de: "Ich kann gut kochen.", en: "I can cook well." },
      { de: "Du musst früh aufstehen.", en: "You must get up early." },
    ],
  },
  {
    id: "g006",
    title: "The Perfect Tense (Perfekt)",
    level: "B1",
    explanation:
      "The Perfekt tense is the most common way to talk about the past in spoken German, formed with haben or sein plus a past participle.",
    examples: [
      { de: "Ich habe das Buch gelesen.", en: "I have read the book." },
      { de: "Wir sind nach Berlin gefahren.", en: "We traveled to Berlin." },
    ],
  },
];

export const getGrammarByLevel = (level) =>
  GERMAN_GRAMMAR_TOPICS.filter((topic) => topic.level === level);