// src/data/german/quizzes.js

export const GERMAN_QUIZZES = [
  {
    id: "q001",
    title: "Greetings Quiz",
    level: "A1",
    questions: [
      {
        id: "q001-1",
        question: "How do you say 'Good morning' in German?",
        options: ["Guten Abend", "Guten Morgen", "Gute Nacht", "Guten Tag"],
        correctIndex: 1,
      },
      {
        id: "q001-2",
        question: "What does 'Wie heißt du?' mean?",
        options: ["How are you?", "Where are you from?", "What is your name?", "How old are you?"],
        correctIndex: 2,
      },
      {
        id: "q001-3",
        question: "Which phrase means 'Thank you very much'?",
        options: ["Bitte schön", "Danke schön", "Auf Wiedersehen", "Es tut mir leid"],
        correctIndex: 1,
      },
    ],
  },
  {
    id: "q002",
    title: "Articles Quiz",
    level: "A1",
    questions: [
      {
        id: "q002-1",
        question: "What is the correct article for 'Buch' (book)?",
        options: ["der", "die", "das", "den"],
        correctIndex: 2,
      },
      {
        id: "q002-2",
        question: "What is the correct article for 'Lampe' (lamp)?",
        options: ["der", "die", "das", "dem"],
        correctIndex: 1,
      },
    ],
  },
];

export const getQuizById = (quizId) =>
  GERMAN_QUIZZES.find((quiz) => quiz.id === quizId) ?? null;