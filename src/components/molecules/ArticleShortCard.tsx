import { ArticleAction } from "@/components/molecules/ArticleAction";
import type { Article } from "@/types/article";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  article: Article;
};

const ArticleShortCard = ({ article }: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-row w-full gap-6 border-b border-neutral-300 py-6">
      <div className="flex flex-col gap-4">
        <h2
          role="button"
          tabIndex={0}
          className={cn(
            "font-bold text-md cursor-pointer",
            "hover:underline",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300",
          )}
          onClick={() => router.push(`/article/${article.id}`)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/article/${article.id}`);
            }
          }}
        >
          {article.title}
        </h2>
        <p className="text-xs lg:text-sm text-neutral-900 line-clamp-2">
          {article.content}
        </p>
        <ArticleAction likes={article.likes} comments={article.comments} />
      </div>
    </div>
  );
};

export default ArticleShortCard;
