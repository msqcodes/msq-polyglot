// src/pages/CoursesPage.jsx

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BookOpen, Clock } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { useLanguage } from "../context/LanguageContext";
import { getContentForLanguage } from "../data/languageContent";
import { buildLessonDetailsPath } from "../constants/routes";
import { ROUTES } from "../constants/routes";

export default function CoursesPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const content = getContentForLanguage(language.id);

  if (!content) {
    return (
      <EmptyState
        title={`${language.name} content is coming soon`}
        description="This language module hasn't launched yet. Switch to German to explore available courses."
        actionLabel="Back to Dashboard"
        onAction={() => navigate(ROUTES.STUDENT_ROOT)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6"
    >
      <div>
        <h1 className="text-h1 font-bold text-slate-900">{language.name} Courses</h1>
        <p className="mt-1 text-body text-slate-600">
          Structured lessons organized by level, from beginner to advanced.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.lessons.map((lesson) => (
          <Card key={lesson.id} hoverable className="flex flex-col">
            <Card.Header>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-caption font-semibold text-primary">
                  {lesson.level}
                </span>
                <span className="flex items-center gap-1 text-caption text-slate-500">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {lesson.duration} min
                </span>
              </div>
              <Card.Title className="mt-3">{lesson.title}</Card.Title>
            </Card.Header>
            <Card.Body className="flex-1">
              <p className="text-body text-slate-600">{lesson.description}</p>
            </Card.Body>
            <Card.Footer>
              <Button
                variant="secondary"
                fullWidth
                leftIcon={BookOpen}
                onClick={() => navigate(buildLessonDetailsPath(lesson.id))}
              >
                Start Lesson
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}