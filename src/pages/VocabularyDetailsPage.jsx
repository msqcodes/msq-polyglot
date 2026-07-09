// src/pages/VocabularyDetailsPage.jsx
//
// Phase 3 — Vocabulary Details Feature.
// Reads a single word from vocabularyService (the existing, unmodified
// architecture) and displays its full detail. No backend or external API
// is used here — Audio, Related Words, Grammar Notes, and Practice are
// deliberate placeholders for future phases.

import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Volume2,
  Link2,
  SpellCheck,
  Sparkles,
} from "lucide-react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";

import { useLanguage } from "../context/LanguageContext";
import { vocabularyService } from "../features/vocabulary/services/vocabularyService";
import { ROUTES } from "../constants/routes";

function DetailField({ label, value }) {
  return (
    <div>
      <p className="text-caption font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 text-body text-slate-700">
        {value || value === 0 ? value : "—"}
      </p>
    </div>
  );
}

function PlaceholderSection({ icon: Icon, title, children }) {
  return (
    <Card>
      <Card.Header>
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-slate-400" aria-hidden="true" />
          <Card.Title>{title}</Card.Title>
        </div>
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}

export default function VocabularyDetailsPage() {
  const { wordId } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const word = useMemo(
    () => vocabularyService.getWordById(language.id, wordId),
    [language.id, wordId]
  );

  if (!word) {
    return (
      <EmptyState
        title="Word not found"
        description="This word may have been removed or the link is incorrect."
        actionLabel="Back to Vocabulary"
        onAction={() => navigate(ROUTES.VOCABULARY)}
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
      <Button
        variant="ghost"
        size="sm"
        leftIcon={ArrowLeft}
        onClick={() => navigate(ROUTES.VOCABULARY)}
        className="self-start"
      >
        Back to Vocabulary
      </Button>

      <Card>
        <Card.Body>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-h1 font-bold text-slate-900">
                {word.article ? `${word.article} ` : ""}
                {word.term}
              </h1>
              <p className="mt-1 text-h3 text-slate-600">{word.translation}</p>
            </div>
            <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-caption font-semibold text-primary">
              {word.level || "—"}
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <DetailField label="Category" value={word.category} />
            <DetailField label="Part of Speech" value={word.partOfSpeech} />
            <DetailField label="Article" value={word.article} />
            <DetailField label="Plural" value={word.plural} />
            <DetailField label="IPA" value={word.ipa} />
          </div>

          {word.example && (
            <p className="mt-6 rounded-lg bg-slate-50 px-4 py-3 text-body italic text-slate-600">
              {word.example}
            </p>
          )}
        </Card.Body>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <PlaceholderSection icon={Volume2} title="Audio">
          {word.audio ? (
            <p className="text-body text-slate-600">
              Audio pronunciation available.
            </p>
          ) : (
            <p className="text-body text-slate-500">
              Audio pronunciation is coming soon for this word.
            </p>
          )}
        </PlaceholderSection>

        <PlaceholderSection icon={Link2} title="Related Words">
          <p className="text-body text-slate-500">
            Related words will appear here in a future update.
          </p>
        </PlaceholderSection>

        <PlaceholderSection icon={SpellCheck} title="Grammar Notes">
          <p className="text-body text-slate-500">
            Grammar notes for this word are coming soon.
          </p>
        </PlaceholderSection>

        <PlaceholderSection icon={Sparkles} title="Practice">
          <Button variant="secondary" disabled fullWidth>
            Practice this word (coming soon)
          </Button>
        </PlaceholderSection>
      </div>
    </motion.div>
  );
}