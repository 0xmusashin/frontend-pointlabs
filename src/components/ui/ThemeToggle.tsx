"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, isHydrated } = useTheme();

  if (!isHydrated) {
    return (
      <div
        className={cn(
          "w-8 h-8 rounded-md border border-border bg-background-subtle",
          className
        )}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative flex items-center justify-center",
        "w-8 h-8 rounded-md",
        "border border-border",
        "bg-transparent hover:bg-background-subtle",
        "text-foreground-secondary hover:text-foreground",
        "transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
      style={{ transitionTimingFunction: "var(--ease-out)" }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="sr-only">
        {isDark ? "Switch to light mode" : "Switch to dark mode"}
      </span>

      <div className="relative w-4 h-4">
        <Sun
          weight="regular"
          className={cn(
            "absolute inset-0 w-4 h-4",
            "transition-all duration-150",
            isDark
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100"
          )}
          style={{ transitionTimingFunction: "var(--ease-out)" }}
        />
        <Moon
          weight="regular"
          className={cn(
            "absolute inset-0 w-4 h-4",
            "transition-all duration-150",
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          )}
          style={{ transitionTimingFunction: "var(--ease-out)" }}
        />
      </div>
    </button>
  );
}
