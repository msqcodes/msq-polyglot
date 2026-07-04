// src/features/auth/RegisterForm.jsx

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, AlertCircle } from "lucide-react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { ROUTES } from "../../constants/routes";
import { USER_ROLES } from "../../context/AuthContext";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const { register: createAccount, isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const password = watch("password");

  const onSubmit = async (formData) => {
    setSubmitError("");
    try {
      await createAccount({
        name: formData.name,
        email: formData.email,
        role: formData.role,
      });
      const destination =
        formData.role === USER_ROLES.TEACHER ? ROUTES.TEACHER_ROOT : ROUTES.STUDENT_ROOT;
      navigate(destination, { replace: true });
    } catch {
      setSubmitError("We couldn't create your account. Please try again.");
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
        label="Full Name"
        type="text"
        required
        leftIcon={User}
        placeholder="Anna Schmidt"
        error={errors.name?.message}
        {...register("name", { required: "Full name is required" })}
      />

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
        placeholder="Create a password"
        error={errors.password?.message}
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Password must be at least 6 characters" },
        })}
      />

      <Input
        label="Confirm Password"
        type="password"
        required
        leftIcon={Lock}
        placeholder="Re-enter your password"
        error={errors.confirmPassword?.message}
        {...register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) => value === password || "Passwords do not match",
        })}
      />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="role" className="text-caption font-medium text-slate-700">
          I am joining as a
        </label>
        <select
          id="role"
          defaultValue={USER_ROLES.STUDENT}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-body text-slate-900 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          {...register("role")}
        >
          <option value={USER_ROLES.STUDENT}>Student</option>
          <option value={USER_ROLES.TEACHER}>Teacher</option>
        </select>
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth isLoading={isAuthLoading}>
        Create Account
      </Button>

      <p className="text-center text-caption text-slate-500">
        Already have an account?{" "}
        <Link to={ROUTES.LOGIN} className="font-medium text-primary hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}