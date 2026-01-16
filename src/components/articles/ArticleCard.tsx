"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { ArticleMeta } from "@/lib/article-types";

interface ArticleCardProps {
  article: ArticleMeta;
  index?: number;
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link
        href={`/articles/${article.slug}`}
        className="group block p-6 border border-border rounded-lg bg-background hover:border-border-strong hover:bg-background-subtle transition-all duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            <time dateTime={article.date} className="font-mono">
              {formatDate(article.date)}
            </time>
            <span className="text-foreground-faint">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readingTime} min read
            </span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-foreground-muted opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-200 mb-2">
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-foreground-secondary line-clamp-2 mb-4">
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-xs font-mono text-foreground-muted bg-background-muted rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}
