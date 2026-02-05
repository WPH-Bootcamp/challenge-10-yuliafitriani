import type { Article } from "@/types/article";
import ArticleCard from "@/components/molecules/ArticleCard";
import ArticleMyPostCard from "@/components/molecules/ArticleMyPostCard";
import ArticleShortCard from "@/components/molecules/ArticleShortCard";

type Props = {
  articles?: Article[] | null | undefined;
};

type MyPostProps = {
  articles?: Article[] | null | undefined;
  onDelete: () => void;
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

export const ArticleMyPostList = ({ articles, onDelete }: MyPostProps) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {articles ? (
        articles.map((article) => (
          <ArticleMyPostCard
            key={article.id}
            article={article}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>No data display</p>
      )}
    </div>
  );
};
