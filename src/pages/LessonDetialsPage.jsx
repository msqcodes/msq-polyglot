// src/pages/LessonDetailsPage.jsx

import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { useLanguage } from "../context/LanguageContext";
import { getContentForLanguage } from "../data/languageContent";
import { ROUTES } from "../constants/routes";

export default function LessonDetailsPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const content = getContentForLanguage(language.id);
  const lesson = content?.lessons.find((item) => item.id === lessonId) ?? null;

  if (!lesson) {
    return (
      <EmptyState
        title="Lesson not found"
        description="This lesson may have been moved or doesn't exist for the selected language."
        actionLabel="Back to Lessons"
        onAction={() => navigate(ROUTES.LESSONS)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto flex max-w-3xl flex-col gap-6"
    >
      <button
        type="button"
        onClick={() => navigate(ROUTES.LESSONS)}
        className="flex w-fit items-center gap-1.5 text-caption font-medium text-slate-500 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to Lessons
      </button>

      <div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-caption font-semibold text-primary">
            {lesson.level}
          </span>
          <span className="flex items-center gap-1 text-caption text-slate-500">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {lesson.duration} min
          </span>
        </div>
        <h1 className="mt-3 text-h1 font-bold text-slate-900">{lesson.title}</h1>
        <p className="mt-2 text-body text-slate-600">{lesson.description}</p>
      </div>

      <Card>
        <Card.Header>
          <Card.Title>What You'll Learn</Card.Title>
        </Card.Header>
        <Card.Body>
          <ul className="flex flex-col gap-2">
            {lesson.objectives.map((objective) => (
              <li key={objective} className="flex items-start gap-2 text-body text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                {objective}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Lesson Content</Card.Title>
        </Card.Header>
        <Card.Body>
          <p className="leading-relaxed text-body text-slate-700">{lesson.content}</p>
        </Card.Body>
      </Card>

      <Button variant="primary" size="lg" onClick={() => navigate(ROUTES.QUIZZES)}>
        Test Your Knowledge
      </Button>
    </motion.div>
  );
}