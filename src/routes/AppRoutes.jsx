// src/routes/AppRoutes.jsx

import { Routes, Route, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, LayoutDashboard } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { ROUTES } from "../constants/routes";
import { useLanguage } from "../context/LanguageContext";

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35, ease: "easeOut" },
};

function HomeRouteContent() {
  const { language } = useLanguage();

  return (
    <motion.section
      {...pageTransition}
      className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center"
    >
      <span className="text-5xl" role="img" aria-label={`${language.name} flag`}>
        {language.flag}
      </span>
      <h1 className="text-hero font-bold leading-tight text-slate-900">
        Learn {language.name}. Connect Cultures.
      </h1>
      <p className="max-w-xl text-body text-slate-600">{language.tagline}</p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="primary" size="lg">
          Start Learning Free
        </Button>
        <Button variant="secondary" size="lg">
          Explore Courses
        </Button>
      </div>
    </motion.section>
  );
}

function DashboardHomeContent() {
  return (
    <motion.div {...pageTransition} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <Card.Header>
          <div className="flex items-center gap-3">
            <LayoutDashboard className="h-5 w-5 text-primary" aria-hidden="true" />
            <Card.Title>Your Progress</Card.Title>
          </div>
        </Card.Header>
        <Card.Body>
          <p className="text-body text-slate-600">
            Your lessons, streaks, and achievements will appear here as you learn.
          </p>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <div className="flex items-center gap-3">
            <Compass className="h-5 w-5 text-secondary" aria-hidden="true" />
            <Card.Title>Continue Learning</Card.Title>
          </div>
        </Card.Header>
        <Card.Body>
          <p className="text-body text-slate-600">
            Pick up where you left off and keep your momentum going.
          </p>
        </Card.Body>
      </Card>
    </motion.div>
  );
}

function NotFoundContent() {
  return (
    <motion.section
      {...pageTransition}
      className="mx-auto flex max-w-lg flex-col items-center gap-4 px-6 py-32 text-center"
    >
      <h1 className="text-h1 font-bold text-slate-900">404</h1>
      <p className="text-body text-slate-600">
        We couldn't find the page you're looking for.
      </p>
      <Button as="a" href={ROUTES.HOME} variant="primary">
        Back to Home
      </Button>
    </motion.section>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomeRouteContent />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundContent />} />
      </Route>

      <Route element={<DashboardLayout role="student" />}>
        <Route path={ROUTES.STUDENT_ROOT} element={<DashboardHomeContent />} />
        <Route path={ROUTES.DASHBOARD} element={<Navigate to={ROUTES.STUDENT_ROOT} replace />} />
      </Route>

      <Route element={<DashboardLayout role="teacher" />}>
        <Route path={ROUTES.TEACHER_ROOT} element={<DashboardHomeContent />} />
      </Route>

      <Route element={<DashboardLayout role="admin" />}>
        <Route path={ROUTES.ADMIN_ROOT} element={<DashboardHomeContent />} />
      </Route>
    </Routes>
  );
}