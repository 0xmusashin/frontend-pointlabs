"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Command, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/#research" },
  { label: "Articles", href: "/articles" },
];

interface HeaderProps {
  onOpenCommandPalette?: () => void;
}

export function Header({ onOpenCommandPalette }: HeaderProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-mono text-accent text-sm">&gt;|&lt;</span>
            <span className="font-semibold tracking-tight">Point Labs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-1.5 text-sm rounded-md transition-colors duration-150",
                  pathname === item.href
                    ? "text-foreground bg-background-muted"
                    : "text-foreground-secondary hover:text-foreground hover:bg-background-subtle"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle className="hidden md:flex" />

            {/* Command Palette Trigger */}
            <button
              onClick={onOpenCommandPalette}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-foreground-secondary border border-border rounded-md hover:bg-background-subtle transition-colors duration-150"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="text-foreground-muted">Search</span>
              <kbd className="ml-2 font-mono text-xs text-foreground-faint bg-background-muted px-1.5 py-0.5 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle (Mobile) */}
            <ThemeToggle className="md:hidden" />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-foreground-secondary hover:text-foreground"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-3 py-2 text-sm rounded-md transition-colors duration-150",
                  pathname === item.href
                    ? "text-foreground bg-background-muted"
                    : "text-foreground-secondary hover:text-foreground hover:bg-background-subtle"
                )}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette?.();
              }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground-secondary hover:text-foreground hover:bg-background-subtle rounded-md"
            >
              <Command className="w-4 h-4" />
              Search
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
