import { useQuery } from "@tanstack/react-query";
import {
  articleRecommendedQueryKey,
  articleRecommendedQueryFn,
} from "@/queries/article.query";
import type { ArticleParams } from "@/types/article";

export const useRecommendedArticles = (options: ArticleParams) => {
  const params = options;

  return useQuery({
    queryKey: articleRecommendedQueryKey.list(params),
    queryFn: articleRecommendedQueryFn,
  });
};
