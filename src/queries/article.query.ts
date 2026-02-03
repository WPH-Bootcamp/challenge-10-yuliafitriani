import type { QueryFunctionContext } from "@tanstack/react-query";
import { ArticleRecomendedApi } from "@/lib/article.api";

const articleRecommendedQueryKey = {
  all: ["recomendedArticles"] as const,
  list: (params: { limit: number; page: number }) =>
    [...articleRecommendedQueryKey.all, "list", params] as const,
};

type RecomendedArticlesListKey = ReturnType<
  typeof articleRecommendedQueryKey.list
>;

const articleRecommendedQueryFn = async ({
  queryKey,
}: QueryFunctionContext<RecomendedArticlesListKey>) => {
  const [, , params] = queryKey;
  return ArticleRecomendedApi(params);
};

export { articleRecommendedQueryKey, articleRecommendedQueryFn };
