import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArticlePageWrapper } from "@/components/articles";
import { mdxComponents } from "@/components/mdx";
import {
  getArticleBySlug,
  getAllArticles,
  getAllArticleSlugs,
} from "@/lib/articles";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Get related articles (same tags)
  const allArticles = getAllArticles();
  const relatedArticles = allArticles
    .filter(
      (a) =>
        a.slug !== article.slug &&
        a.tags.some((tag) => article.tags.includes(tag))
    )
    .slice(0, 2);

  // Article metadata (without content) for the wrapper
  const articleMeta = {
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    date: article.date,
    tags: article.tags,
    author: article.author,
    readingTime: article.readingTime,
  };

  return (
    <ArticlePageWrapper
      article={articleMeta}
      relatedArticles={relatedArticles}
      allArticles={allArticles}
    >
      <MDXRemote source={article.content} components={mdxComponents} />
    </ArticlePageWrapper>
  );
}
