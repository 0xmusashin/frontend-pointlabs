"use client";

import { useState } from "react";
import { Header, Footer, SmoothScroll } from "@/components/layout";
import { ArticleCard } from "./ArticleCard";
import { ArticleFilter } from "./ArticleFilter";
import { CommandPalette } from "@/components/ui/CommandPalette";
import type { ArticleMeta } from "@/lib/article-types";

interface ArticlesListProps {
  articles: ArticleMeta[];
  tags: string[];
}

export function ArticlesList({ articles, tags }: ArticlesListProps) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filteredArticles = activeTag
    ? articles.filter((article) => article.tags.includes(activeTag))
    : articles;

  return (
    <SmoothScroll>
      <Header onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
        articles={articles}
      />

      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span className="font-mono text-sm text-accent mb-2 block">
              // articles
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Research & Insights
            </h1>
            <p className="text-foreground-secondary text-lg max-w-2xl">
              Exploring the frontiers of AI, cryptography, and decentralized
              systems. Our latest research and thoughts.
            </p>
          </div>

          {/* Filter */}
          <div className="mb-8">
            <ArticleFilter
              tags={tags}
              activeTag={activeTag}
              onTagChange={setActiveTag}
            />
          </div>

          {/* Articles grid */}
          <div className="grid grid-cols-1 gap-4">
            {filteredArticles.map((article, index) => (
              <ArticleCard key={article.slug} article={article} index={index} />
            ))}
          </div>

          {/* Empty state */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-foreground-muted">
                No articles found for this tag.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
