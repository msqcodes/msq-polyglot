// src/components/ui/Button.jsx

import { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

const VARIANT_CLASSES = {
  primary: "bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary",
  secondary:
    "bg-white text-primary border border-primary/30 hover:bg-primary/5 focus-visible:outline-primary",
  accent: "bg-accent text-white hover:bg-accent/90 focus-visible:outline-accent",
  danger: "bg-danger text-white hover:bg-danger/90 focus-visible:outline-danger",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:outline-slate-400",
};

const SIZE_CLASSES = {
  sm: "px-3 py-1.5 text-caption",
  md: "px-4 py-2.5 text-body",
  lg: "px-6 py-3 text-body",
};

const motionComponentCache = new Map();

function getMotionComponent(as) {
  if (typeof as === "string") {
    return motion[as] ?? motion.button;
  }
  if (motionComponentCache.has(as)) {
    return motionComponentCache.get(as);
  }
  const wrapped = motion.create(as);
  motionComponentCache.set(as, wrapped);
  return wrapped;
}

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      as = "button",
      isLoading = false,
      disabled = false,
      fullWidth = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      className = "",
      ...rest
    },
    ref
  ) => {
    const Component = useMemo(() => getMotionComponent(as), [as]);
    const isDisabled = disabled || isLoading;

    return (
      <Component
        ref={ref}
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        whileHover={isDisabled ? undefined : { scale: 1.02 }}
        disabled={typeof as === "string" && as === "button" ? isDisabled : undefined}
        aria-disabled={isDisabled}
        className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
          VARIANT_CLASSES[variant]
        } ${SIZE_CLASSES[size]} ${fullWidth ? "w-full" : ""} ${className}`}
        {...rest}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          LeftIcon && <LeftIcon className="h-4 w-4" aria-hidden="true" />
        )}
        <span>{children}</span>
        {!isLoading && RightIcon && <RightIcon className="h-4 w-4" aria-hidden="true" />}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;