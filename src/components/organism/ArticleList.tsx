import type { Article } from "@/types/article";
import ArticleCard from "@/components/molecules/ArticleCard";
import ArticleShortCard from "../molecules/ArticleShortCard";

type Props = {
  articles?: Article[] | null | undefined;
};

export const ArticleList = ({ articles }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {articles ? (
        articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      ) : (
        <p>No data display</p>
      )}
    </div>
  );
};

export const ArticleMostLikeList = ({ articles }: Props) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {articles ? (
        articles.map((article) => (
          <ArticleShortCard key={article.id} article={article} />
        ))
      ) : (
        <p>No data display</p>
      )}
    </div>
  );
};
