// src/pages/VocabularyPage.jsx

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import EmptyState from "../components/ui/EmptyState";
import { useLanguage } from "../context/LanguageContext";
import { getContentForLanguage } from "../data/languageContent";
import { ROUTES } from "../constants/routes";

export default function VocabularyPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const content = getContentForLanguage(language.id);
  const [query, setQuery] = useState("");

  const filteredWords = useMemo(() => {
    if (!content) return [];
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return content.vocabulary;
    return content.vocabulary.filter(
      (word) =>
        word.german.toLowerCase().includes(normalizedQuery) ||
        word.english.toLowerCase().includes(normalizedQuery)
    );
  }, [content, query]);

  if (!content) {
    return (
      <EmptyState
        title={`${language.name} vocabulary is coming soon`}
        description="Switch to German in the navbar to browse vocabulary."
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
        <h1 className="text-h1 font-bold text-slate-900">Vocabulary</h1>
        <p className="mt-1 text-body text-slate-600">
          Browse and search {language.name} words by meaning.
        </p>
      </div>

      <Input
        leftIcon={Search}
        placeholder="Search words..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        aria-label="Search vocabulary"
        containerClassName="max-w-md"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredWords.map((word) => (
          <Card key={word.id}>
            <Card.Body>
              <div className="flex items-center justify-between">
                <p className="text-h3 font-semibold text-slate-900">{word.german}</p>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-caption font-semibold text-primary">
                  {word.level}
                </span>
              </div>
              <p className="mt-1 text-body text-slate-600">{word.english}</p>
              <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-caption italic text-slate-500">
                {word.example}
              </p>
            </Card.Body>
          </Card>
        ))}

        {filteredWords.length === 0 && (
          <p className="col-span-full text-center text-body text-slate-500">
            No words match your search.
          </p>
        )}
      </div>
    </motion.div>
  );
}