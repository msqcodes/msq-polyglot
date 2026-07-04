// src/pages/LessonsPage.jsx

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { useLanguage } from "../context/LanguageContext";
import { getContentForLanguage } from "../data/languageContent";
import { buildLessonDetailsPath, ROUTES } from "../constants/routes";

export default function LessonsPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const content = getContentForLanguage(language.id);

  if (!content) {
    return (
      <EmptyState
        title={`${language.name} lessons are coming soon`}
        description="Switch to German in the navbar to see available lessons."
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
        <h1 className="text-h1 font-bold text-slate-900">Lessons</h1>
        <p className="mt-1 text-body text-slate-600">
          Every {language.name} lesson, in one place.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {content.lessons.map((lesson) => (
          <Card key={lesson.id} hoverable>
            <Card.Body className="flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-caption font-semibold text-primary">
                    {lesson.level}
                  </span>
                  <h3 className="text-h3 font-semibold text-slate-900">{lesson.title}</h3>
                </div>
                <p className="mt-1 text-body text-slate-600">{lesson.description}</p>
              </div>
              <Button
                variant="ghost"
                rightIcon={ArrowRight}
                onClick={() => navigate(buildLessonDetailsPath(lesson.id))}
              >
                Open
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}