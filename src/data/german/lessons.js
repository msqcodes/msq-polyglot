// src/data/german/lessons.js

export const GERMAN_LESSONS = [
  {
    id: "l001",
    title: "Greetings and Introductions",
    level: "A1",
    duration: 15,
    description: "Learn how to greet people, introduce yourself, and ask basic questions.",
    objectives: [
      "Greet someone formally and informally",
      "Introduce your name and where you're from",
      "Ask someone's name politely",
    ],
    content:
      "In German, greetings vary depending on formality and time of day. 'Guten Morgen' is used until around 11am, 'Guten Tag' during the day, and 'Guten Abend' in the evening. Among friends, 'Hallo' or 'Hi' work in any context. When introducing yourself, use 'Ich heiße...' or 'Mein Name ist...' followed by your name.",
  },
  {
    id: "l002",
    title: "Numbers and Counting",
    level: "A1",
    duration: 20,
    description: "Master German numbers from zero to one thousand.",
    objectives: [
      "Count from 0 to 100",
      "Use numbers in everyday context like prices and phone numbers",
      "Understand compound number formation",
    ],
    content:
      "German numbers from 21 onward are formed by joining the units digit, 'und' (and), and the tens digit — for example, 'einundzwanzig' is twenty-one. This reversed order takes practice but becomes intuitive with repetition.",
  },
  {
    id: "l003",
    title: "Ordering Food and Drinks",
    level: "A2",
    duration: 25,
    description: "Navigate restaurants and cafés with confidence.",
    objectives: [
      "Order food and drinks politely",
      "Ask about menu items and prices",
      "Handle the bill and payment",
    ],
    content:
      "Common restaurant phrases include 'Ich hätte gern...' (I would like...) for ordering, and 'Die Rechnung, bitte' (The bill, please) when you're ready to pay. Servers often ask 'Haben Sie schon gewählt?' (Have you decided?).",
  },
  {
    id: "l004",
    title: "Talking About Daily Routines",
    level: "B1",
    duration: 30,
    description: "Describe your day using reflexive verbs and time expressions.",
    objectives: [
      "Use reflexive verbs like 'sich waschen' and 'sich anziehen'",
      "Sequence daily events with time expressions",
      "Describe habitual actions",
    ],
    content:
      "Many everyday actions in German use reflexive verbs, where the subject and object are the same person. 'Ich wasche mich' means 'I wash myself.' Time expressions like 'zuerst' (first), 'dann' (then), and 'danach' (afterward) help sequence your routine.",
  },
];

export const getLessonById = (lessonId) =>
  GERMAN_LESSONS.find((lesson) => lesson.id === lessonId) ?? null;

export const getLessonsByLevel = (level) =>
  GERMAN_LESSONS.filter((lesson) => lesson.level === level);