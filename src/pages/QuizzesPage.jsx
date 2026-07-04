// src/pages/QuizzesPage.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { useLanguage } from "../context/LanguageContext";
import { getContentForLanguage } from "../data/languageContent";
import { ROUTES } from "../constants/routes";

function QuizRunner({ quiz, onExit }) {
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectAnswer = (questionId, optionIndex) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const score = quiz.questions.filter(
    (question) => answers[question.id] === question.correctIndex
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-h1 font-bold text-slate-900">{quiz.title}</h1>
        <Button variant="ghost" onClick={onExit}>
          Exit Quiz
        </Button>
      </div>

      {quiz.questions.map((question, questionIndex) => {
        const selected = answers[question.id];
        return (
          <Card key={question.id}>
            <Card.Body>
              <p className="text-h3 font-semibold text-slate-900">
                {questionIndex + 1}. {question.question}
              </p>
              <div className="mt-4 flex flex-col gap-2">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selected === optionIndex;
                  const isCorrect = optionIndex === question.correctIndex;
                  const showResult = isSubmitted;

                  let stateClasses = "border-slate-200 hover:bg-slate-50";
                  if (showResult && isCorrect) {
                    stateClasses = "border-success bg-success/10";
                  } else if (showResult && isSelected && !isCorrect) {
                    stateClasses = "border-danger bg-danger/10";
                  } else if (isSelected) {
                    stateClasses = "border-primary bg-primary/5";
                  }

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => selectAnswer(question.id, optionIndex)}
                      disabled={isSubmitted}
                      className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-body font-medium text-slate-700 transition-colors disabled:cursor-not-allowed ${stateClasses}`}
                    >
                      {option}
                      {showResult && isCorrect && (
                        <CheckCircle2 className="h-4 w-4 text-success" aria-hidden="true" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="h-4 w-4 text-danger" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            </Card.Body>
          </Card>
        );
      })}

      {!isSubmitted ? (
        <Button
          variant="primary"
          size="lg"
          onClick={() => setIsSubmitted(true)}
          disabled={Object.keys(answers).length < quiz.questions.length}
        >
          Submit Answers
        </Button>
      ) : (
        <Card className="bg-primary/5">
          <Card.Body className="flex items-center justify-between">
            <div>
              <p className="text-h3 font-semibold text-slate-900">
                You scored {score} out of {quiz.questions.length}
              </p>
              <p className="text-body text-slate-600">Great effort — keep practicing!</p>
            </div>
            <Button
              variant="secondary"
              leftIcon={RefreshCw}
              onClick={() => {
                setAnswers({});
                setIsSubmitted(false);
              }}
            >
              Retry
            </Button>
          </Card.Body>
        </Card>
      )}
    </motion.div>
  );
}

export default function QuizzesPage() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const content = getContentForLanguage(language.id);
  const [activeQuizId, setActiveQuizId] = useState(null);

  if (!content) {
    return (
      <EmptyState
        title={`${language.name} quizzes are coming soon`}
        description="Switch to German in the navbar to test your knowledge."
        actionLabel="Back to Dashboard"
        onAction={() => navigate(ROUTES.STUDENT_ROOT)}
      />
    );
  }

  const activeQuiz = content.quizzes.find((quiz) => quiz.id === activeQuizId) ?? null;

  if (activeQuiz) {
    return <QuizRunner quiz={activeQuiz} onExit={() => setActiveQuizId(null)} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-6"
    >
      <div>
        <h1 className="text-h1 font-bold text-slate-900">Quizzes</h1>
        <p className="mt-1 text-body text-slate-600">Check your progress with quick quizzes.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.quizzes.map((quiz) => (
          <Card key={quiz.id} hoverable>
            <Card.Header>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-caption font-semibold text-primary">
                {quiz.level}
              </span>
              <Card.Title className="mt-3">{quiz.title}</Card.Title>
            </Card.Header>
            <Card.Body>
              <p className="text-body text-slate-600">{quiz.questions.length} questions</p>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" fullWidth onClick={() => setActiveQuizId(quiz.id)}>
                Start Quiz
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </motion.div>
  );
}