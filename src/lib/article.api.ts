import api from "./api";
import type {
  ArticleParams,
  ArticleResponse,
  ArticleSearchParams,
  Article,
  ArticleCreatePayload,
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

export const ArticleByIdApi = async (id: number): Promise<Article> => {
  const { data } = await api.get<Article>(`/posts/${id}`);
  return data;
};

export const ArticleMyPostApi = async (
  params: ArticleParams,
): Promise<ArticleResponse> => {
  const { data } = await api.get<ArticleResponse>("/posts/my-posts", {
    params,
  });

  return data;
};

export const CreateArticleApi = async (payload: ArticleCreatePayload) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("content", payload.content);
  payload.tags.forEach((tag) => formData.append("tags[]", tag));
  // formData.append("image", payload.image);
  formData.append("image", payload.image); // <-- name = filename

  const { data } = await api.post("/posts", formData);

  return data;
};
