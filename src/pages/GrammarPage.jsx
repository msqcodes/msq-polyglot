// src/pages/GrammarPage.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import { useLanguage } from "../context/LanguageContext";
import { getContentForLanguage } from "../data/languageContent";
import { ROUTES } from "../constants/routes";

export default function GrammarPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const content = getContentForLanguage(language.id);
  const [expandedId, setExpandedId] = useState(null);

  if (!content) {
    return (
      <EmptyState
        title={`${language.name} grammar is coming soon`}
        description="Switch to German in the navbar to explore grammar topics."
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
        <h1 className="text-h1 font-bold text-slate-900">Grammar</h1>
        <p className="mt-1 text-body text-slate-600">
          Core {language.name} grammar concepts, explained with examples.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {content.grammar.map((topic) => {
          const isExpanded = expandedId === topic.id;
          return (
            <Card key={topic.id}>
              <button
                type="button"
                onClick={() => setExpandedId(isExpanded ? null : topic.id)}
                aria-expanded={isExpanded}
                className="flex w-full items-center justify-between px-6 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-caption font-semibold text-primary">
                    {topic.level}
                  </span>
                  <span className="text-h3 font-semibold text-slate-900">{topic.title}</span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-slate-400 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isExpanded && (
                <Card.Body className="border-t border-slate-100">
                  <p className="text-body text-slate-700">{topic.explanation}</p>
                  <div className="mt-4 flex flex-col gap-2">
                    {topic.examples.map((example) => (
                      <div
                        key={example.de}
                        className="rounded-lg bg-slate-50 px-4 py-3 text-body"
                      >
                        <p className="font-semibold text-slate-900">{example.de}</p>
                        <p className="text-caption text-slate-500">{example.en}</p>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              )}
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}