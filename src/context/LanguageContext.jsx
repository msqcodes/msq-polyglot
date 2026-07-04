// src/context/LanguageContext.jsx

import { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";
import { LANGUAGES, DEFAULT_LANGUAGE_ID, getLanguageById } from "../config/languages";

const LANGUAGE_STORAGE_KEY = "msq-polyglot-selected-language";

const LanguageContext = createContext(undefined);

const getInitialLanguageId = () => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE_ID;

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored && getLanguageById(stored)) {
    return stored;
  }

  return DEFAULT_LANGUAGE_ID;
};

export function LanguageProvider({ children }) {
  const [languageId, setLanguageId] = useState(getInitialLanguageId);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, languageId);
  }, [languageId]);

  const selectLanguage = useCallback((id) => {
    if (getLanguageById(id)) {
      setLanguageId(id);
    }
  }, []);

  const value = useMemo(() => {
    const activeLanguage = getLanguageById(languageId) ?? getLanguageById(DEFAULT_LANGUAGE_ID);

    return {
      languageId: activeLanguage.id,
      language: activeLanguage,
      languages: LANGUAGES,
      selectLanguage,
    };
  }, [languageId, selectLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}