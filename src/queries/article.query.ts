import type { QueryFunctionContext } from "@tanstack/react-query";
import {
  ArticleRecomendedApi,
  ArticleMostLikedApi,
  ArticleSearchApi,
  ArticleMyPostApi,
} from "@/lib/article.api";

const articleRecommendedQueryKey = {
  all: ["recomendedArticles"] as const,
  list: (params: { limit: number; page: number }) =>
    [...articleRecommendedQueryKey.all, "list", params] as const,
};

const articleMostLikedQueryKey = {
  all: ["mostLikedArticles"] as const,
  list: (params: { limit: number; page: number }) =>
    [...articleMostLikedQueryKey.all, "list", params] as const,
};

const articleSearchQueryKey = {
  all: ["searchArticles"] as const,
  list: (params: { query: string; limit: number; page: number }) =>
    [...articleSearchQueryKey.all, "list", params] as const,
};

const articleMyPostQueryKey = {
  all: ["myPostArticles"] as const,
  list: (params: { limit: number; page: number }) =>
    [...articleMyPostQueryKey.all, "list", params] as const,
};

type RecomendedArticlesListKey = ReturnType<
  typeof articleRecommendedQueryKey.list
>;

type MostLikedArticlesListKey = ReturnType<
  typeof articleMostLikedQueryKey.list
>;

type SearchArticlesListKey = ReturnType<typeof articleSearchQueryKey.list>;
type MyPostArticlesListKey = ReturnType<typeof articleMyPostQueryKey.list>;

const articleRecommendedQueryFn = async ({
  queryKey,
}: QueryFunctionContext<RecomendedArticlesListKey>) => {
  const [, , params] = queryKey;
  return ArticleRecomendedApi(params);
};

const articleMostLikedQueryFn = async ({
  queryKey,
}: QueryFunctionContext<MostLikedArticlesListKey>) => {
  const [, , params] = queryKey;
  return ArticleMostLikedApi(params);
};

const articleSearchQueryFn = async ({
  queryKey,
}: QueryFunctionContext<SearchArticlesListKey>) => {
  const [, , params] = queryKey;
  return ArticleSearchApi(params);
};

const articleMyPostQueryFn = async ({
  queryKey,
}: QueryFunctionContext<MyPostArticlesListKey>) => {
  const [, , params] = queryKey;
  return ArticleMyPostApi(params);
};

export {
  articleRecommendedQueryKey,
  articleRecommendedQueryFn,
  articleMostLikedQueryKey,
  articleMostLikedQueryFn,
  articleSearchQueryKey,
  articleSearchQueryFn,
  articleMyPostQueryKey,
  articleMyPostQueryFn,
};
