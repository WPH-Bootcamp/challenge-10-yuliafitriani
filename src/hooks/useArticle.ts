import { useQuery } from "@tanstack/react-query";
import {
  articleRecommendedQueryKey,
  articleRecommendedQueryFn,
  articleMostLikedQueryKey,
  articleMostLikedQueryFn,
  articleSearchQueryKey,
  articleSearchQueryFn,
} from "@/queries/article.query";
import type { ArticleParams, ArticleSearchParams } from "@/types/article";

export const useRecommendedArticles = (options: ArticleParams) => {
  const params = options;

  return useQuery({
    queryKey: articleRecommendedQueryKey.list(params),
    queryFn: articleRecommendedQueryFn,
    staleTime: 1000 * 60 * 5, // 5 minutes only
  });
};

export const useMostLikedArticles = (options: ArticleParams) => {
  const params = options;

  return useQuery({
    queryKey: articleMostLikedQueryKey.list(params),
    queryFn: articleMostLikedQueryFn,
    staleTime: 1000 * 60 * 5, // 5 minutes only
  });
};

export const useSearchArticles = (options: ArticleSearchParams) => {
  const params = options;

  return useQuery({
    queryKey: articleSearchQueryKey.list(params),
    queryFn: articleSearchQueryFn,
    staleTime: 1000 * 60 * 5, // 5 minutes only
  });
};
