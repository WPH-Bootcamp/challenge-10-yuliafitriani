import { ArticleAction } from "@/components/molecules/ArticleAction";
import type { Article } from "@/types/article";

type Props = {
  article: Article;
};

const ArticleShortCard = ({ article }: Props) => {
  return (
    <div className="flex flex-row w-full gap-6 border-b border-neutral-300 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-md">{article.title}</h2>
        <p className="text-xs lg:text-sm text-neutral-900 line-clamp-2">
          {article.content}
        </p>
        <ArticleAction likes={article.likes} comments={article.comments} />
      </div>
    </div>
  );
};

export default ArticleShortCard;
