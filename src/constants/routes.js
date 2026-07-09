// src/constants/routes.js

/**
 * Single source of truth for every application path.
 * Never hardcode a URL string anywhere else in the codebase.
 */

export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  PRICING: "/pricing",
  BLOG: "/blog",
  CONTACT: "/contact",

  LOGIN: "/login",
  REGISTER: "/register",

  STUDENT_ROOT: "/student",
  TEACHER_ROOT: "/teacher",
  ADMIN_ROOT: "/admin",

  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",

  COURSES: "/courses",
  LESSONS: "/lessons",
  LESSON_DETAILS: "/lessons/:lessonId",
  GRAMMAR: "/grammar",
  FLASHCARDS: "/flashcards",
  QUIZZES: "/quizzes",
  VOCABULARY: "/vocabulary",
  VOCABULARY_DETAILS: "/student/vocabulary/:wordId",

  NOT_FOUND: "*",
};

export const buildLessonDetailsPath = (lessonId) => `/lessons/${lessonId}`;
export const buildVocabularyDetailsPath = (wordId) => `/student/vocabulary/${wordId}`;