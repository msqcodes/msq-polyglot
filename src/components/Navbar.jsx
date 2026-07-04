// src/components/Navbar.jsx

import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X, ChevronDown, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { MAIN_NAV_LINKS, AUTH_NAV_LINKS } from "../constants/navigation";
import { ROUTES } from "../constants/routes";
import { useLanguage } from "../context/LanguageContext";
import Button from "./ui/Button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { language, languages, selectLanguage } = useLanguage();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-surface/80 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link to={ROUTES.HOME} className="flex items-center gap-2" onClick={closeMenu}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-sm font-bold text-white">
            MQ
          </span>
          <span className="text-body font-bold text-slate-900">MSQ Polyglot</span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {MAIN_NAV_LINKS.map(({ label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `text-body font-medium transition-colors ${
                    isActive ? "text-primary" : "text-slate-600 hover:text-slate-900"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLanguageMenuOpen((open) => !open)}
              aria-haspopup="listbox"
              aria-expanded={isLanguageMenuOpen}
              className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-body text-slate-700 hover:bg-slate-100"
            >
              <span aria-hidden="true">{language.flag}</span>
              {language.name}
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>

            <AnimatePresence>
              {isLanguageMenuOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  role="listbox"
                  className="absolute right-0 mt-2 max-h-80 w-56 overflow-y-auto rounded-lg border border-slate-200 bg-surface p-1.5 shadow-lg"
                >
                  {languages.map((lang) => (
                    <li key={lang.id}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={lang.id === language.id}
                        onClick={() => {
                          selectLanguage(lang.id);
                          setIsLanguageMenuOpen(false);
                        }}
                        disabled={lang.status !== "available"}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-caption text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <span className="flex items-center gap-2">
                          <span aria-hidden="true">{lang.flag}</span>
                          {lang.name}
                          {lang.status !== "available" && (
                            <span className="text-slate-400">(Soon)</span>
                          )}
                        </span>
                        {lang.id === language.id && (
                          <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                        )}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <Button as={Link} to={ROUTES.LOGIN} variant="ghost" size="sm">
            {AUTH_NAV_LINKS[0].label}
          </Button>
          <Button as={Link} to={ROUTES.REGISTER} variant="primary" size="sm">
            {AUTH_NAV_LINKS[1].label}
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="rounded-md p-2 text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-slate-200 bg-surface lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {MAIN_NAV_LINKS.map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `block rounded-md px-3 py-2 text-body font-medium ${
                        isActive ? "bg-primary/10 text-primary" : "text-slate-700 hover:bg-slate-100"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-2 border-t border-slate-100 px-4 py-4">
              <Button as={Link} to={ROUTES.LOGIN} variant="ghost" fullWidth onClick={closeMenu}>
                {AUTH_NAV_LINKS[0].label}
              </Button>
              <Button as={Link} to={ROUTES.REGISTER} variant="primary" fullWidth onClick={closeMenu}>
                {AUTH_NAV_LINKS[1].label}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}