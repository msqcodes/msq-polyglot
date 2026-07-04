// src/pages/LoginPage.jsx

import { motion } from "framer-motion";
import LoginForm from "../features/auth/LoginForm";
import Card from "../components/ui/Card";

export default function LoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md flex-col justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="mb-8 text-center">
          <h1 className="text-h1 font-bold text-slate-900">Welcome Back</h1>
          <p className="mt-2 text-body text-slate-600">
            Log in to continue your language learning journey.
          </p>
        </div>

        <Card className="p-6 sm:p-8">
          <LoginForm />
        </Card>
      </motion.div>
    </div>
  );
}