// src/features/auth/LoginForm.jsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Mail, Lock, AlertCircle } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../constants/routes";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const { login, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (formData) => {
    setSubmitError("");
    try {
      await login({ email: formData.email });
      const redirectTo = location.state?.from?.pathname ?? ROUTES.STUDENT_ROOT;
      navigate(redirectTo, { replace: true });
    } catch {
      setSubmitError("We couldn't log you in. Please check your details and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {submitError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-lg bg-danger/10 px-4 py-3 text-caption font-medium text-danger"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          {submitError}
        </div>
      )}

      <Input
        label="Email Address"
        type="email"
        required
        leftIcon={Mail}
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        })}
      />

      <Input
        label="Password"
        type="password"
        required
        leftIcon={Lock}
        placeholder="Enter your password"
        error={errors.password?.message}
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Password must be at least 6 characters" },
        })}
      />

      <div className="flex items-center justify-between text-caption">
        <label className="flex items-center gap-2 text-slate-600">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-primary" />
          Remember me
        </label>
        <Link to={ROUTES.CONTACT} className="font-medium text-primary hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isAuthLoading}>
        Log In
      </Button>

      <p className="text-center text-caption text-slate-500">
        Don't have an account?{" "}
        <Link to={ROUTES.REGISTER} className="font-medium text-primary hover:underline">
          Create one
        </Link>
      </p>
    </form>
  );
}