"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, FileText, Home, FlaskConical, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ArticleMeta } from "@/lib/article-types";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  articles?: ArticleMeta[];
}

export function CommandPalette({ open, onOpenChange, articles = [] }: CommandPaletteProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  // Close on escape
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const runCommand = useCallback(
    (command: () => void) => {
      onOpenChange(false);
      command();
    },
    [onOpenChange]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-xl">
        <Command
          className="relative rounded-lg border border-border bg-background shadow-2xl overflow-hidden"
          loop
        >
          {/* Search input */}
          <div className="flex items-center border-b border-border px-4">
            <Search className="w-4 h-4 text-foreground-muted shrink-0" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search articles, pages..."
              className="flex-1 h-12 px-3 text-sm bg-transparent outline-none placeholder:text-foreground-muted"
            />
            <button
              onClick={() => onOpenChange(false)}
              className="p-1 text-foreground-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          <Command.List className="max-h-80 overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-foreground-muted">
              No results found.
            </Command.Empty>

            {/* Navigation */}
            <Command.Group
              heading="Navigation"
              className="text-xs font-medium text-foreground-muted px-2 py-1.5"
            >
              <CommandItem
                onSelect={() => runCommand(() => router.push("/"))}
                icon={Home}
              >
                Home
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.push("/#research"))}
                icon={FlaskConical}
              >
                Research
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => router.push("/articles"))}
                icon={FileText}
              >
                Articles
              </CommandItem>
            </Command.Group>

            {/* Articles */}
            <Command.Group
              heading="Articles"
              className="text-xs font-medium text-foreground-muted px-2 py-1.5 mt-2"
            >
              {articles.map((article) => (
                <CommandItem
                  key={article.slug}
                  onSelect={() =>
                    runCommand(() => router.push(`/articles/${article.slug}`))
                  }
                  icon={FileText}
                >
                  <div className="flex flex-col">
                    <span>{article.title}</span>
                    <span className="text-xs text-foreground-muted">
                      {article.tags.join(", ")}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </Command.Group>
          </Command.List>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-foreground-muted">
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded bg-background-muted font-mono">
                ↑↓
              </kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded bg-background-muted font-mono">
                ↵
              </kbd>
              <span>Select</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded bg-background-muted font-mono">
                esc
              </kbd>
              <span>Close</span>
            </div>
          </div>
        </Command>
      </div>
    </div>
  );
}

interface CommandItemProps {
  children: React.ReactNode;
  onSelect: () => void;
  icon: React.ComponentType<{ className?: string }>;
}

function CommandItem({ children, onSelect, icon: Icon }: CommandItemProps) {
  return (
    <Command.Item
      onSelect={onSelect}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer",
        "text-sm text-foreground-secondary",
        "data-[selected=true]:bg-background-muted data-[selected=true]:text-foreground",
        "transition-colors duration-100"
      )}
    >
      <Icon className="w-4 h-4 shrink-0 text-foreground-muted" />
      <div className="flex-1 truncate">{children}</div>
    </Command.Item>
  );
}
