// src/pages/SettingsPage.jsx

import { motion } from "framer-motion";
import { Moon, Sun, Globe2 } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function SettingsPage() {
  const { isDark, toggleTheme } = useTheme();
  const { language, languages, selectLanguage } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto flex max-w-2xl flex-col gap-6"
    >
      <h1 className="text-h1 font-bold text-slate-900">Settings</h1>

      <Card>
        <Card.Header>
          <Card.Title>Appearance</Card.Title>
        </Card.Header>
        <Card.Body className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isDark ? (
              <Moon className="h-5 w-5 text-primary" aria-hidden="true" />
            ) : (
              <Sun className="h-5 w-5 text-accent" aria-hidden="true" />
            )}
            <div>
              <p className="text-body font-medium text-slate-900">Theme</p>
              <p className="text-caption text-slate-500">
                Currently using {isDark ? "dark" : "light"} mode
              </p>
            </div>
          </div>
          <Button variant="secondary" onClick={toggleTheme}>
            Switch to {isDark ? "Light" : "Dark"}
          </Button>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-primary" aria-hidden="true" />
            <Card.Title>Learning Language</Card.Title>
          </div>
        </Card.Header>
        <Card.Body>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {languages.map((lang) => (
              <button
                key={lang.id}
                type="button"
                disabled={lang.status !== "available"}
                onClick={() => selectLanguage(lang.id)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-caption font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  lang.id === language.id
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span aria-hidden="true">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}