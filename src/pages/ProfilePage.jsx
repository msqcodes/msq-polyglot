// src/pages/ProfilePage.jsx

import { motion } from "framer-motion";
import { Mail, ShieldCheck } from "lucide-react";
import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const { language } = useLanguage();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto flex max-w-2xl flex-col gap-6"
    >
      <h1 className="text-h1 font-bold text-slate-900">Profile</h1>

      <Card>
        <Card.Body className="flex items-center gap-4">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-h2 font-semibold text-primary">
            {initials}
          </span>
          <div>
            <p className="text-h3 font-semibold text-slate-900">{user?.name}</p>
            <p className="flex items-center gap-1.5 text-body text-slate-500">
              <Mail className="h-4 w-4" aria-hidden="true" />
              {user?.email}
            </p>
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Account Details</Card.Title>
        </Card.Header>
        <Card.Body className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-body text-slate-500">Role</span>
            <span className="flex items-center gap-1.5 text-body font-medium capitalize text-slate-900">
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              {user?.role}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-body text-slate-500">Learning</span>
            <span className="flex items-center gap-1.5 text-body font-medium text-slate-900">
              <span aria-hidden="true">{language.flag}</span>
              {language.name}
            </span>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}