"use client";

import { cn } from "@/lib/utils";

interface ArticleFilterProps {
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
}

export function ArticleFilter({
  tags,
  activeTag,
  onTagChange,
}: ArticleFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onTagChange(null)}
        className={cn(
          "px-3 py-1.5 text-sm rounded-md border transition-all duration-150",
          activeTag === null
            ? "border-accent bg-accent-muted text-accent"
            : "border-border text-foreground-secondary hover:text-foreground hover:border-border-strong"
        )}
      >
        All
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagChange(tag)}
          className={cn(
            "px-3 py-1.5 text-sm rounded-md border transition-all duration-150",
            activeTag === tag
              ? "border-accent bg-accent-muted text-accent"
              : "border-border text-foreground-secondary hover:text-foreground hover:border-border-strong"
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
