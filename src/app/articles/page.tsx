import { ArticlesList } from "@/components/articles";
import { getAllArticles, getAllTags } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getAllArticles();
  const tags = getAllTags();

  return <ArticlesList articles={articles} tags={tags} />;
}
