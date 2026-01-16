"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Header, Footer, SmoothScroll } from "@/components/layout";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import type { ArticleMeta } from "@/lib/article-types";

interface ArticlePageWrapperProps {
  article: ArticleMeta;
  relatedArticles: ArticleMeta[];
  allArticles: ArticleMeta[];
  children: ReactNode;
}

export function ArticlePageWrapper({
  article,
  relatedArticles,
  allArticles,
  children,
}: ArticlePageWrapperProps) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <SmoothScroll>
      <Header onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <CommandPalette
        open={commandPaletteOpen}
        onOpenChange={setCommandPaletteOpen}
        articles={allArticles}
      />

      <main className="min-h-screen pt-24 pb-16 px-4">
        <article className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to articles
          </Link>

          {/* Header */}
          <header className="mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs font-mono text-accent bg-accent-muted rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-balance">
              {article.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-foreground-secondary">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </span>
              <span className="text-foreground-faint">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {article.readingTime} min read
              </span>
            </div>
          </header>

          {/* Content */}
          <div className="prose-article max-w-none">
            {children}
          </div>

          {/* Author */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center text-accent font-mono text-sm">
                PL
              </div>
              <div>
                <p className="font-medium text-foreground">{article.author}</p>
                <p className="text-sm text-foreground-muted">AI Research Lab</p>
              </div>
            </div>
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <h2 className="text-lg font-semibold mb-6">Related articles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/articles/${related.slug}`}
                    className="group p-4 border border-border rounded-lg hover:border-border-strong transition-colors"
                  >
                    <h3 className="font-medium text-foreground group-hover:text-accent transition-colors mb-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-foreground-muted line-clamp-2">
                      {related.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>

      <Footer />
    </SmoothScroll>
  );
}
