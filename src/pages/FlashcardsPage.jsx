// src/pages/FlashcardsPage.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCw } from "lucide-react";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { useLanguage } from "../context/LanguageContext";
import { getContentForLanguage } from "../data/languageContent";
import { ROUTES } from "../constants/routes";

export default function FlashcardsPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const content = getContentForLanguage(language.id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!content) {
    return (
      <EmptyState
        title={`${language.name} flashcards are coming soon`}
        description="Switch to German in the navbar to start practicing with flashcards."
        actionLabel="Back to Dashboard"
        onAction={() => navigate(ROUTES.STUDENT_ROOT)}
      />
    );
  }

  const cards = content.flashcards;
  const currentCard = cards[currentIndex];

  const goToNext = () => {
    setIsFlipped(false);
    setCurrentIndex((index) => (index + 1) % cards.length);
  };

  const goToPrevious = () => {
    setIsFlipped(false);
    setCurrentIndex((index) => (index - 1 + cards.length) % cards.length);
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-6 py-8">
      <div className="text-center">
        <h1 className="text-h1 font-bold text-slate-900">Flashcards</h1>
        <p className="mt-1 text-body text-slate-600">
          Card {currentIndex + 1} of {cards.length}
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.button
          key={currentCard.id + String(isFlipped)}
          type="button"
          onClick={() => setIsFlipped((flipped) => !flipped)}
          initial={{ opacity: 0, rotateY: 90 }}
          animate={{ opacity: 1, rotateY: 0 }}
          exit={{ opacity: 0, rotateY: -90 }}
          transition={{ duration: 0.25 }}
          aria-label="Flip flashcard"
          className="flex h-64 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-surface px-8 shadow-md"
        >
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-caption font-semibold text-primary">
            {currentCard.level}
          </span>
          <p className="text-h1 font-bold text-slate-900">
            {isFlipped ? currentCard.back : currentCard.front}
          </p>
          <span className="flex items-center gap-1.5 text-caption text-slate-400">
            <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
            Tap to flip
          </span>
        </motion.button>
      </AnimatePresence>

      <div className="flex items-center gap-4">
        <Button variant="ghost" leftIcon={ArrowLeft} onClick={goToPrevious}>
          Previous
        </Button>
        <Button variant="primary" rightIcon={ArrowRight} onClick={goToNext}>
          Next
        </Button>
      </div>
    </div>
  );
}