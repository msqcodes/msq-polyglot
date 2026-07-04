// src/constants/navigation.js

import {
  Home,
  Info,
  Tag,
  Newspaper,
  Mail,
  LayoutDashboard,
  BookOpen,
  Layers,
  SpellCheck,
  Brain,
  ListChecks,
  User,
  Settings,
  Users,
  GraduationCap,
  BarChart3,
  CalendarDays,
  ClipboardList,
  ShieldCheck,
  Globe2,
} from "lucide-react";
import { ROUTES } from "./routes";

/** Public marketing navigation, shown to all visitors. */
export const MAIN_NAV_LINKS = [
  { label: "Home", path: ROUTES.HOME, icon: Home },
  { label: "About", path: ROUTES.ABOUT, icon: Info },
  { label: "Pricing", path: ROUTES.PRICING, icon: Tag },
  { label: "Blog", path: ROUTES.BLOG, icon: Newspaper },
  { label: "Contact", path: ROUTES.CONTACT, icon: Mail },
];

/** Unauthenticated call-to-action links. */
export const AUTH_NAV_LINKS = [
  { label: "Log In", path: ROUTES.LOGIN },
  { label: "Get Started", path: ROUTES.REGISTER },
];

/** Sidebar navigation per role — additive, never mutate in place. */
export const STUDENT_NAV_LINKS = [
  { label: "Dashboard", path: ROUTES.STUDENT_ROOT, icon: LayoutDashboard },
  { label: "Courses", path: ROUTES.COURSES, icon: BookOpen },
  { label: "Lessons", path: ROUTES.LESSONS, icon: Layers },
  { label: "Grammar", path: ROUTES.GRAMMAR, icon: SpellCheck },
  { label: "Flashcards", path: ROUTES.FLASHCARDS, icon: Brain },
  { label: "Quizzes", path: ROUTES.QUIZZES, icon: ListChecks },
  { label: "Vocabulary", path: ROUTES.VOCABULARY, icon: Globe2 },
  { label: "Profile", path: ROUTES.PROFILE, icon: User },
  { label: "Settings", path: ROUTES.SETTINGS, icon: Settings },
];

export const TEACHER_NAV_LINKS = [
  { label: "Dashboard", path: ROUTES.TEACHER_ROOT, icon: LayoutDashboard },
  { label: "Students", path: `${ROUTES.TEACHER_ROOT}/students`, icon: Users },
  { label: "Lessons", path: ROUTES.LESSONS, icon: Layers },
  { label: "Assignments", path: `${ROUTES.TEACHER_ROOT}/assignments`, icon: ClipboardList },
  { label: "Analytics", path: `${ROUTES.TEACHER_ROOT}/analytics`, icon: BarChart3 },
  { label: "Schedule", path: `${ROUTES.TEACHER_ROOT}/schedule`, icon: CalendarDays },
  { label: "Profile", path: ROUTES.PROFILE, icon: User },
  { label: "Settings", path: ROUTES.SETTINGS, icon: Settings },
];

export const ADMIN_NAV_LINKS = [
  { label: "Dashboard", path: ROUTES.ADMIN_ROOT, icon: LayoutDashboard },
  { label: "Users", path: `${ROUTES.ADMIN_ROOT}/users`, icon: Users },
  { label: "Teachers", path: `${ROUTES.ADMIN_ROOT}/teachers`, icon: GraduationCap },
  { label: "Students", path: `${ROUTES.ADMIN_ROOT}/students`, icon: User },
  { label: "Courses", path: `${ROUTES.ADMIN_ROOT}/courses`, icon: BookOpen },
  { label: "Languages", path: `${ROUTES.ADMIN_ROOT}/languages`, icon: Globe2 },
  { label: "Analytics", path: `${ROUTES.ADMIN_ROOT}/analytics`, icon: BarChart3 },
  { label: "Reports", path: `${ROUTES.ADMIN_ROOT}/reports`, icon: ShieldCheck },
  { label: "Settings", path: ROUTES.SETTINGS, icon: Settings },
];

/** Maps a role string to its sidebar navigation set. */
export const ROLE_NAV_MAP = {
  student: STUDENT_NAV_LINKS,
  teacher: TEACHER_NAV_LINKS,
  admin: ADMIN_NAV_LINKS,
};

export const getNavLinksForRole = (role) => ROLE_NAV_MAP[role] ?? [];