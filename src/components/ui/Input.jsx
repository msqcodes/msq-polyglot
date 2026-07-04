// src/components/ui/Input.jsx

import { forwardRef, useId } from "react";
import { AlertCircle } from "lucide-react";

const Input = forwardRef(
  (
    {
      label,
      error,
      hint,
      type = "text",
      required = false,
      className = "",
      containerClassName = "",
      leftIcon: LeftIcon,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = rest.id ?? generatedId;
    const hintId = hint ? `${inputId}-hint` : undefined;
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
        {label && (
          <label htmlFor={inputId} className="text-caption font-medium text-slate-700">
            {label}
            {required && (
              <span className="ml-0.5 text-danger" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          {LeftIcon && (
            <LeftIcon
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
            className={`w-full rounded-lg border bg-white text-body text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
              LeftIcon ? "pl-10 pr-4" : "px-4"
            } py-2.5 ${
              error
                ? "border-danger focus:ring-danger/40"
                : "border-slate-300 focus:border-primary focus:ring-primary/30"
            } ${className}`}
            {...rest}
          />
        </div>

        {hint && !error && (
          <p id={hintId} className="text-caption text-slate-500">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} className="flex items-center gap-1.5 text-caption font-medium text-danger">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;