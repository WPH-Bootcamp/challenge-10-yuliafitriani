import { ArticleList } from "@/components/organism/ArticleList";
import type { Article } from "@/types/article";
import { toast } from "sonner";

type Props = {
  title: string;
  articles?: Article[] | null | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  onRetry: () => void;
};

export const ArticleTemplate = ({
  title,
  articles,
  isLoading,
  isFetching,
  isError,
  onRetry,
}: Props) => {
  if (isError) toast.error("Failed to load data.");

  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
      <ArticleList articles={articles} />
    </div>
  );
};
