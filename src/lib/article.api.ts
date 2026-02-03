import api from "./api";
import type { ArticleParams, ArticleResponse } from "@/types/article";

export const ArticleRecomendedApi = async (
  params: ArticleParams,
): Promise<ArticleResponse> => {
  const { data } = await api.get<ArticleResponse>("/posts/recommended", {
    params,
  });

  return data;
};
