import api from "./api";
import type {
  ArticleParams,
  ArticleResponse,
  ArticleSearchParams,
} from "@/types/article";

export const ArticleRecomendedApi = async (
  params: ArticleParams,
): Promise<ArticleResponse> => {
  const { data } = await api.get<ArticleResponse>("/posts/recommended", {
    params,
  });

  return data;
};

export const ArticleMostLikedApi = async (
  params: ArticleParams,
): Promise<ArticleResponse> => {
  const { data } = await api.get<ArticleResponse>("/posts/most-liked", {
    params,
  });

  return data;
};

export const ArticleSearchApi = async (
  params: ArticleSearchParams,
): Promise<ArticleResponse> => {
  const { data } = await api.get<ArticleResponse>("/posts/search", {
    params,
  });

  return data;
};
